import { getCampaign } from "@/actions/useractions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req) {
    const session = await getServerSession()

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const campaigns = await getCampaign("cmh94mtka0000tze8g4a9rz99")

    return NextResponse.json(campaigns.map(c => {
        const replies = c.emails.reduce((acc, e) => acc + e.replies.length, 0);
        const emailSent = c.emailsSent;

        return {
            title: c.title,
            status: c.status,
            emailSent: emailSent,
            replies: replies,
            conversionRate: emailSent > 0 ? (replies / emailSent) * 100 : 0
        }
    })
    );
}