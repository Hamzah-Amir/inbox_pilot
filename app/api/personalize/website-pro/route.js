import puppeteer from "puppeteer";
import * as cheerio from 'cheerio'

export async function POST(req) {
    try {
        const body = await req.json();
        const domain = "https://slack.com/"

        if (!domain) {
            return new Response(JSON.stringify({ error: "Domain required" }), { status: 400 });
        }

        const url = domain.startsWith("http") ? domain : `https://${domain}`;

        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        console.log("Opened Browser!")
        await page.goto(url, { waitUntil: "networkidle2", timeout: 360000 });
        console.log("Page Opened!")

        const headline = await page.$eval("h1", el => el?.innerText.trim() || null).catch(() => null);
        console.log("Headline fetched", headline)
        const subHeadline = await page.$eval("h2", el => el?.innerText.trim() || null).catch(() => null);
        console.log("Loading HTML")
        const html = await page.content()
        // console.log(html)
        console.log(" HTML Loaded")
        const $ = cheerio.load(html)
        let pageText = $("main p")
            .map((i, el) => $(el).text().trim())
            .get()
            .slice(0,6)
            .join(" ");


        pageText = pageText.slice(0, 1500); // Limiting content to 3k characters
        console.log(pageText)

        await browser.close();

        return new Response(JSON.stringify({ headline, subHeadline, pageText }), { status: 200, headers: { "Content-Type": "application/json" } });
    } catch (err) {
        console.error("Scrape error:", err.message);
        return new Response(JSON.stringify({ error: "Failed to scrape website" }), { status: 500 });
    }
}
