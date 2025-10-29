import { GoogleGenAI } from "@google/genai";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
    const session = await getServerSession(authOptions)
    const body = await req.json()

    prompt = `You are InboxPilot — an AI expert in writing short, personalized cold email intros that sound human and spark replies.

Your job: generate *2 personalized cold email openers* (each 2--3 sentences max) based on the prospect’s data below.

Focus on:
- 100% personalization (make it about *them*, not the sender)
- Natural tone (no “AI” vibe, no fake enthusiasm)
- Mention something relevant from their background, company, or work
- Keep it casual, warm, and conversational
- End each with a soft transition into a pitch (not a hard sell)

Input Data:
- Name: ${body.name}
- Role: ${body.role}
- Company: ${body.company}
- LinkedIn Bio: ${body.bio}
- Tone: ${body.tone}
- Product Description: ${body.product}
- Value Proposition: ${body.value}

Output Format (JSON):
{
  "openers": [
    "First opener here...",
    "Second opener here..."
  ]
}
`
    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY })
    const llm = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
    })

    const response = llm.text
    return new Response(JSON.stringify({ success: true, recieved: response }))
}