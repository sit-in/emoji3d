export const runtime = "edge"

export async function POST(request: Request) {
  try {
    const { email, wechat, timestamp } = await request.json()

    // In production, you would save this to a database
    // For now, just log it
    console.log("New lead:", { email, wechat, timestamp })

    // You could integrate with services like:
    // - Supabase for database storage
    // - Mailchimp for email marketing
    // - Webhook to notify your team

    return Response.json({ success: true })
  } catch (error) {
    console.error("Lead submission error:", error)
    return Response.json({ error: "Submission failed" }, { status: 500 })
  }
}
