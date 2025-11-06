import { GoogleGenerativeAI } from "@google/generative-ai";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import rs from 'text-readability';
import { authOptions } from "../../auth/[...nextauth]/route";
import { getCampaign } from "@/actions/useractions";
import puppeteer from "puppeteer";
import * as cheerio from 'cheerio'
import { prisma } from "@/lib/prisma";
import { parse } from "tldts";

function extractCompanyName(domain) {
    const url = domain.startsWith("http") ? domain : `https://${domain}`;
    const parsed = parse(url);

    return parsed.domainWithoutSuffix || parsed.domain || "";
}

export async function POST(req) {
    const session = await getServerSession(authOptions)
    try {
        const campaign = await getCampaign(session.user.id)
        const body = await req.json();
        console.log("body", body)
        const campaignId = body.campaignId;
        console.log("campaign ID", campaignId)
        const domain = body.website;
        const recipientName = body.recipientName;
        const recipientRole = body.recipientRole;
        const yourName = body.yourName;
        const emailType = body.emailType;

        if (!domain) {
            return new Response(JSON.stringify({ error: "Domain required" }), { status: 400 });
        }

        const url = domain.startsWith("http") ? domain : `https://${domain}`;
        let companyName = extractCompanyName(url)

        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        console.log("Opened Browser!")
        await page.goto(url, { waitUntil: "networkidle2", timeout: 360000 });
        console.log("Page Opened!")
        const html = await page.content()
        const $ = cheerio.load(html)
        let headline =
            $("main h1").first().text().trim() ||
            $("section h1").first().text().trim() ||
            $("header h1").first().text().trim() ||
            $("h1").first().text().trim();
        if (!headline) {
            headline =
                $("main h2").first().text().trim() ||
                $("section h2").first().text().trim() ||
                $("h2").first().text().trim();
        }
        let subHeadline =
            $("main h2").eq(1).text().trim() ||
            $("section h2").eq(1).text().trim() ||
            $("h2").eq(1).text().trim();
        if (!subHeadline) {
            subHeadline = $(headline).parent().find("p").first().text().trim();
        }
        let valueProps = $("ul li")
            .map((_, el) => $(el).text().trim())
            .get()
            .filter(text => text.length > 0)
            .slice(0, 3);
        if (valueProps.length === 0) {
            valueProps = $("strong")
                .map((_, el) => $(el).text().trim())
                .get()
                .slice(0, 3);
        }
        let cta =
            $("a[href*='contact'], a[href*='demo'], button").first().text().trim() ||
            $("a, button").first().text().trim();

        function clean(str) {
            return str?.replace(/\s+/g, " ").trim() || "";
        }

        headline = clean(headline)
        subHeadline = clean(subHeadline)
        valueProps = valueProps.map(clean)
        cta = clean(cta)
        console.log("Headline: ", headline)
        console.log("Sub-headline: ", subHeadline)
        console.log("Value Proposition: ", valueProps)
        console.log("Call-To-Action: ", cta)

        let pageText = $("main p")
            .map((i, el) => $(el).text().trim())
            .get()
            .slice()
            .join(" ");


        pageText = pageText.slice(0, 1200); // Limiting content to 1.2k characters
        console.log(pageText)

        await browser.close();

        const email = await prisma.email.create({
            data: {
                userId: session.user.id,
                campaignId: campaignId,
                recipentEmail: "",
                companyName: companyName,
                recipentName: recipientName,
                emailType: "WEBSITE_PERSONALIZED",
                output: "",
            }
        })

        await prisma.websiteData.create({
            data: {
                emailId: email.id,
                domain: domain,
                headline: headline,
                subHeadline: subHeadline,
                pageText: pageText
            }
        })

        const prompt = `You are an expert outbound copywriter. You write short, concise, articulate emails that sound human — not AI. You do not guess or invent details. You base every line on the context provided.

### Context About Recipient & Their Company (from website)
- Headline / Main Positioning: ${headline || "Not found"}
- Subheadline / Supporting Message: ${subHeadline || "Not found"}
- Core Value Proposition: ${valueProps || "Not found"}
- Primary Call-to-Action or Offer: ${cta || "Not found"}

### Fallback (Use ONLY if the above does not contain meaningful strategic insight)
- General Page Text: ${pageText || "Not found"}

### Outreach Details
- Recipient Name: ${recipientName || "Not provided"}
- Recipient Role: ${recipientRole || "Not provided"}
- Sender Name: ${yourName}
- Campaign Focus / Goal: ${campaign.goal}
- Email Type: ${emailType}
- Tone: concise, direct, professional. No hype language. No “hope you're doing well.” No emojis.

### Requirements
1. The opening sentence must directly reference a meaningful part of the company's positioning or messaging (headline, wording tone, or strategic theme).
2. Avoid flattery, hype, or filler phrases (e.g., “amazing work”, “innovative solution”, “saw you're doing great things”).
3. Write in a confident, friendly, adult tone. No corporate fluff. No emojis.
4. Keep the full email between **50 and 90 words**.
5. Show a clear angle of relevance to their work (e.g., efficiency, product velocity, workflow clarity, collaboration speed).
6. End with **one simple question** about interest in continuing the conversation.
7. Do NOT mention: scraping, websites, browsing, AI, algorithms, personalization processes, or data extraction.
8. Do NOT add a subject line.

### Output Format
Return only the email body. No headings. No commentary.

---

Write the email now.`

        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        // Start streaming content
        const result = await model.generateContentStream(prompt);

        let fullEmail = '';
        // Create a ReadableStream for the frontend
        const readableStream = new ReadableStream({
            async start(controller) {
                for await (const chunk of result.stream) {
                    const chunkText = chunk.text();
                    fullEmail += chunkText
                    controller.enqueue(new TextEncoder().encode(chunkText));
                }
                await prisma.email.update({
                    where: {
                        id: email.id
                    },
                    data: {
                        output: fullEmail
                    }
                })
                controller.close();
            },
        });

        function countOccurrences(text, term) {
            if (!text || !term) return 0;

            const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            const regex = new RegExp(`\\b${escapedTerm}\\b`, "gi");
            const matches = text.match(regex);

            return matches ? matches.length : 0;
        }

        const extractKeywords = (text) => {
            if (!text) return [];

            return text
                .toLowerCase()
                .replace(/[^a-z0-9\s]/gi, " ")
                .split(/\s+/)
                .filter(word => word.length > 3 && !STOP_WORDS.includes(word))
                .reduce((acc, word) => {
                    acc[word] = (acc[word] || 0) + 1;
                    return acc;
                }, {});
        }

        function getTopKeywords(freqMap, limit = 5) {
            return Object.entries(freqMap)
                .sort((a, b) => b[1] - a[1])
                .slice(0, limit)
                .map(([word]) => word);
        }

        function detectTone(text) {
            const formality = /(?:we are pleased|furthermore|our mission)/i.test(text) ? "formal" : "casual";
            const avgSentenceLength = text.split(/[.!?]/).map(s => s.trim().split(/\s+/).length).reduce((a, b) => a + b) / text.split(/[.!?]/).length;
            const pronounStyle = text.includes("you") ? "personal" : "corporate";

            return { formality, avgSentenceLength, pronounStyle };
        }

        const personalizationScore = countOccurrences(fullEmail, companyName)
        const freq = extractKeywords(pageText);
        const keywords = getTopKeywords(freq, 3);
        const usedKeywords = keywords.filter(k => fullEmail.includes(k))
        const websiteContextScore = usedKeywords.length
        const readabilityGrade = rs.fleschKincaidGrade(fullEmail)
        const siteTone = detectTone(pageText.toLowerCase())
        const emailTone = detectTone(fullEmail.toLowerCase())
        const toneMatched =
            siteTone.formality === emailTone.formality &&
            Math.abs(siteTone.avgSentenceLength - emailTone.avgSentenceLength) < 5 &&
            siteTone.pronounStyle === emailTone.pronounStyle;

        await prisma.emailQuality.create({
            data: {
                emailId: email.id,
                personalizationScore: personalizationScore,
                websiteContextScore: websiteContextScore,
                readabilityGrade: readabilityGrade,
                toneMatched: toneMatched
            }
        })

        return new NextResponse(readableStream, {
            headers: { "Content-Type": "text/plain" },
        });

    } catch (error) {
        console.log("Error while streaming", error.message)
        return new Response(JSON.stringify({ error: "Failed to scrape website" }), { status: 500 });
    }
}