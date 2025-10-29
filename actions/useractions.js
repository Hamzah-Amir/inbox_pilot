'use server'
import { prisma } from "@/lib/prisma";

export async function getCampaign(id) {
    const campaign = await prisma.campaign.findMany({
        where: {
            userId: id
        },

        include: {
            emails: {
                include: { replies: true }
            }
        }
    })
    return campaign
}

export async function createCampaign(id, data) {
    const campaign = await prisma.campaign.create({
        data: {
            userId: id,
            title: data.campaignTitle,
            goal: data.goal,
            status: data.status,
            startDate: new Date(data.startDate),
            endDate: data.endDate ? new Date(data.endDate) : null,
        }
    })
    return campaign
}

export async function fetchEmailById(emailId) {
    const email = await prisma.email.findUnique({
        where: {
            id: emailId
        }
    })

    return email
}