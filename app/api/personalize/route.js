import { GoogleGenAI } from "@google/genai";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
  const session = await getServerSession(authOptions)
  const body = await req.json()
  console.log(body)

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email
    }
  })

  let emailsGenerated = user.emailsGenerated

  const prompt = `You are InboxPilot — an AI expert in writing short, highly personalized cold emails that sound human and get replies.

Your job: generate *1 complete cold email* (80-120 words max) based on the prospect's data below.

Each email should include:
- A personalized intro (based on their company, role, or product)
- A natural, value-driven middle (show understanding of their context)
- A subtle pitch for the sender's product
- A polite call-to-action (like a question or soft close)

Tone: ${body.tone}

Input Data:
- Sender Email: ${user.email}
- Recipient Name: ${body.recipentName}
- Recipient Email: ${body.recipentEmail}
- Company: ${body.companyName}
- Product Description: ${body.productDescription}

Output Format (JSON):
{
  subject: "subject of email....",
  body: "body of email...",
}
`

  const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY })
  const llm = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt
  })

  let email;
  const response = llm.text
  const match = response.match(/```(?:json)?([\s\S]*?)```/);
  if (match) {
    const cleanJSON = match[1].trim();
    const data = JSON.parse(cleanJSON);
    email = data;
    console.log("Generated Emails:", email);
  }

  const savedEmail = await prisma.email.create({
    data: {
      userId: session.user.id,
      campaignId: body.campaignId,
      recipentName: body.recipentName,
      recipentEmail: body.recipentEmail,
      CompanyName: body.companyName,
      Tone: body.tone,
      output: JSON.stringify(email)
    }
  })

  await prisma.user.update({
    where: {
      id: session.user.id
    },
    data:{
      emailsGenerated: {increment: 1}
    }
  })
  
  return new Response(JSON.stringify({ success: true, recieved: savedEmail.id }))
}