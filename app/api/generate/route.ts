import type { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    console.log("Starting image generation...")

    const formData = await request.formData()
    const image = formData.get("image") as File

    if (!image) {
      console.error("No image provided")
      return Response.json({ error: "No image provided" }, { status: 400 })
    }

    console.log("Image received:", image.name, image.size, image.type)

    // For demo purposes, if no API token is available, return a mock response
    const apiToken = process.env.REPLICATE_API_TOKEN || "demo_mode"

    if (apiToken === "demo_mode") {
      console.log("Running in demo mode - no API token found")

      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Return a placeholder result for demo
      return Response.json({
        output_url: "/placeholder.svg?height=512&width=512&text=3D+Emoji+Demo",
        prediction_id: "demo_" + Date.now(),
        status: "succeeded",
        demo_mode: true,
      })
    }

    // Convert image to base64
    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString("base64")
    const dataUrl = `data:${image.type};base64,${base64}`

    console.log("Image converted to base64, size:", base64.length)

    // Prepare the request payload
    const payload = {
      version: "a07f252abbbd832009640b27f063ea52d87d7a23a185ca165bec23b5adc8deaf",
      input: {
        image: dataUrl,
        style: "Clay",
        prompt: "a cute 3D emoji character in island tropical style with vibrant colors",
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

    // Return the first output image URL
    const outputUrl = result.output && result.output.length > 0 ? result.output[0] : null

    if (!outputUrl) {
      console.error("No output generated")
      return Response.json({ error: "No output generated - please try again" }, { status: 500 })
    }

    console.log("Generation successful:", outputUrl)

    return Response.json({
      output_url: outputUrl,
      prediction_id: result.id,
      status: result.status,
    })
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
