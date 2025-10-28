import { prisma } from "@/lib/prisma";

export async function getCampaign(id) {
    const campaign = await prisma.campaign.findMany({
        where: {
            userId: id
        },

        include: {
            email: {
                include: { replies: true }
            }
        }
    })
    return campaign
}