import type { NextRequest } from "next/server"
import { compositeImages, downloadImage } from "@/lib/image-composite"

export async function POST(request: NextRequest) {
  try {
    console.log("Starting image generation...")

    const formData = await request.formData()
    const image = formData.get("image") as File
    const style = formData.get("style") as string || "Clay"
    const prompt = formData.get("prompt") as string || "a cute 3D emoji character in island tropical style with vibrant colors"
    const position = formData.get("position") as string || "bottom-right"

    if (!image) {
      console.error("No image provided")
      return Response.json({ error: "No image provided" }, { status: 400 })
    }

    console.log("Image received:", image.name, image.size, image.type)

    // Get API token from environment
    const apiToken = process.env.REPLICATE_API_TOKEN
    
    if (!apiToken) {
      console.error("No REPLICATE_API_TOKEN found in environment variables")
    }

    if (!apiToken || apiToken === "demo_mode") {
      console.log("Running in demo mode - no API token found")

      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Convert original image to base64 for demo
      const bytes = await image.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const base64 = buffer.toString("base64")
      const originalUrl = `data:${image.type};base64,${base64}`

      // Return a placeholder result for demo
      return Response.json({
        original_url: originalUrl,
        model_3d_url: "/3d-avatar-placeholder.svg",
        composite_url: originalUrl, // In demo mode, return original as composite
        prediction_id: "demo_" + Date.now(),
        status: "succeeded",
        demo_mode: true,
      })
    }

    // Convert image to base64 and save buffer for later use
    const bytes = await image.arrayBuffer()
    const originalBuffer = Buffer.from(bytes)
    const base64 = originalBuffer.toString("base64")
    const dataUrl = `data:${image.type};base64,${base64}`

    console.log("Image converted to base64, size:", base64.length)

    // Step 1: Generate 3D model first
    console.log("Step 1: Generating 3D model...")
    
    const payload = {
      version: "a07f252abbbd832009640b27f063ea52d87d7a23a185ca165bec23b5adc8deaf",
      input: {
        image: dataUrl, // Use original image for 3D generation
        style: style,
        prompt: prompt,
        instant_id_strength: 0.8,
      },
    }

    console.log("Calling Replicate API...")

    // Call Replicate API with timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

    let response
    try {
      response = await fetch("https://api.replicate.com/v1/predictions", {
        method: "POST",
        headers: {
          Authorization: `Token ${apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      })
    } catch (fetchError) {
      clearTimeout(timeoutId)
      console.error("Fetch error:", fetchError)

      if (fetchError instanceof Error) {
        if (fetchError.name === "AbortError") {
          return Response.json({ error: "Request timeout - please try again" }, { status: 408 })
        }
        return Response.json({ error: `Network error: ${fetchError.message}` }, { status: 500 })
      }

      return Response.json({ error: "Network error occurred" }, { status: 500 })
    }

    clearTimeout(timeoutId)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Replicate API error:", response.status, errorText)

      if (response.status === 401) {
        return Response.json({ error: "API authentication failed" }, { status: 500 })
      }

      return Response.json(
        {
          error: `API error: ${response.status} - ${errorText}`,
        },
        { status: 500 },
      )
    }

    const prediction = await response.json()
    console.log("Prediction created:", prediction.id, prediction.status)

    // Poll for completion with better error handling
    let result = prediction
    let attempts = 0
    const maxAttempts = 30 // 30 attempts * 2 seconds = 60 seconds max

    while (result.status !== "succeeded" && result.status !== "failed" && attempts < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Wait 2 seconds

      try {
        const pollController = new AbortController()
        const pollTimeoutId = setTimeout(() => pollController.abort(), 10000) // 10 second timeout for polling

        const pollResponse = await fetch(`https://api.replicate.com/v1/predictions/${result.id}`, {
          headers: {
            Authorization: `Token ${apiToken}`,
          },
          signal: pollController.signal,
        })

        clearTimeout(pollTimeoutId)

        if (!pollResponse.ok) {
          console.error("Poll error:", pollResponse.status)
          throw new Error(`Failed to poll prediction status: ${pollResponse.status}`)
        }

        result = await pollResponse.json()
        console.log(`Poll attempt ${attempts + 1}:`, result.status)
        attempts++
      } catch (pollError) {
        console.error("Polling error:", pollError)
        attempts++
        continue // Continue trying
      }
    }

    if (result.status === "failed") {
      console.error("Generation failed:", result.error)
      return Response.json(
        {
          error: result.error || "Generation failed - please try again",
        },
        { status: 500 },
      )
    }

    if (result.status !== "succeeded") {
      console.error("Generation timed out after", attempts, "attempts")
      return Response.json(
        {
          error: "Generation is taking longer than expected - please try again",
        },
        { status: 408 },
      )
    }

    // Handle the output - it's an array of objects with url() method
    let outputUrl = null
    
    if (result.output && result.output.length > 0) {
      // The output is an array of file objects
      // Access the URL directly if it's a string, or use the url property if it's an object
      const firstOutput = result.output[0]
      outputUrl = typeof firstOutput === 'string' ? firstOutput : firstOutput.url || firstOutput
    }

    if (!outputUrl) {
      console.error("No output generated")
      return Response.json({ error: "No output generated - please try again" }, { status: 500 })
    }

    console.log("3D model generation successful:", outputUrl)

    // Step 2: Remove background from 3D model
    console.log("Step 2: Removing background from 3D model...")
    let bgRemoved3DUrl = outputUrl // fallback to original 3D model if removal fails
    
    try {
      const bgRemovalPayload = {
        version: "a029dff38972b5fda4ec5d75d7d1cd25aeff621d2cf4946a41055d7db66b80bc", // 851-labs/background-remover
        input: {
          image: outputUrl // Remove background from 3D model
        }
      }

      const bgRemovalResponse = await fetch("https://api.replicate.com/v1/predictions", {
        method: "POST",
        headers: {
          Authorization: `Token ${apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bgRemovalPayload),
      })

      if (bgRemovalResponse.ok) {
        const bgRemovalPrediction = await bgRemovalResponse.json()
        console.log("Background removal started for 3D model:", bgRemovalPrediction.id)
        
        // Poll for background removal completion
        let bgResult = bgRemovalPrediction
        let bgAttempts = 0
        const bgMaxAttempts = 15 // 30 seconds max
        
        while (bgResult.status !== "succeeded" && bgResult.status !== "failed" && bgAttempts < bgMaxAttempts) {
          await new Promise((resolve) => setTimeout(resolve, 2000))
          
          const pollResponse = await fetch(`https://api.replicate.com/v1/predictions/${bgResult.id}`, {
            headers: {
              Authorization: `Token ${apiToken}`,
            },
          })
          
          if (pollResponse.ok) {
            bgResult = await pollResponse.json()
            console.log(`3D model background removal attempt ${bgAttempts + 1}:`, bgResult.status)
            bgAttempts++
          }
        }
        
        if (bgResult.status === "succeeded" && bgResult.output) {
          // 处理输出
          if (typeof bgResult.output === 'string') {
            bgRemoved3DUrl = bgResult.output
          } else if (Array.isArray(bgResult.output) && bgResult.output[0]) {
            bgRemoved3DUrl = bgResult.output[0]
          }
          console.log("3D model background removed successfully:", bgRemoved3DUrl)
        }
      }
    } catch (bgError) {
      console.error("3D model background removal error:", bgError)
      // Continue with original 3D model
    }

    try {
      // Download the background-removed 3D model image
      console.log("Downloading background-removed 3D model for compositing...")
      const model3DBuffer = await downloadImage(bgRemoved3DUrl)

      // Composite the images
      console.log("Compositing images...")
      const compositeBuffer = await compositeImages(originalBuffer, model3DBuffer, {
        position: position as any,
        scale: 0.25,
        padding: 20
      })

      // Convert buffers to base64 for response
      const originalBase64 = `data:${image.type};base64,${originalBuffer.toString("base64")}`
      const compositeBase64 = `data:image/png;base64,${compositeBuffer.toString("base64")}`

      return Response.json({
        original_url: originalBase64,
        model_3d_url: outputUrl, // Original 3D model
        composite_url: compositeBase64,
        prediction_id: result.id,
        status: result.status,
        bg_removed_url: bgRemoved3DUrl !== outputUrl ? bgRemoved3DUrl : null, // 3D model with background removed
        bg_removed: bgRemoved3DUrl !== outputUrl,
      })
    } catch (compositeError) {
      console.error("Composite error:", compositeError)
      // Fall back to returning just the 3D model if compositing fails
      return Response.json({
        original_url: dataUrl,
        model_3d_url: outputUrl,
        composite_url: outputUrl,
        prediction_id: result.id,
        status: result.status,
        composite_error: true,
        bg_removed_url: bgRemoved3DUrl !== outputUrl ? bgRemoved3DUrl : null,
        bg_removed: bgRemoved3DUrl !== outputUrl,
      })
    }
  } catch (error) {
    console.error("Unexpected error:", error)

    if (error instanceof Error) {
      return Response.json(
        {
          error: `Unexpected error: ${error.message}`,
        },
        { status: 500 },
      )
    }

    return Response.json(
      {
        error: "An unexpected error occurred - please try again",
      },
      { status: 500 },
    )
  }
}
