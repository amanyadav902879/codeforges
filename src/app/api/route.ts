import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'CodeForge API is running' })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { messages } = body

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Messages array required' }, { status: 400 })
    }

    // Use z-ai-web-dev-sdk for AI responses
    const { createChatCompletion } = await import('z-ai-web-dev-sdk')

    const response = await createChatCompletion({
      messages: messages.map((m: any) => ({
        role: m.role,
        content: m.content
      }))
    })

    const aiMessage = response.choices?.[0]?.message?.content || response.content || 'I could not generate a response.'

    return NextResponse.json({ message: aiMessage })
  } catch (error) {
    console.error('AI API error:', error)
    return NextResponse.json({ error: 'Failed to get AI response' }, { status: 500 })
  }
}
