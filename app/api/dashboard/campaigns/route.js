import { getCampaign } from "@/actions/useractions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET(req) {
    const session = await getServerSession(authOptions)
    const campaigns = await getCampaign(session.user.id);

    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }


    return NextResponse.json(campaigns.map(c => {
        const replies = c.emails.reduce((acc, e) => acc + e.replies.length, 0);
        const emailSent = c.emailsSent;

        return {
            id:c.id,
            title: c.title,
            status: c.status,
            emailSent: emailSent,
            replies: replies,
            conversionRate: emailSent > 0 ? (replies / emailSent) * 100 : 0
        }
    })
    );
}