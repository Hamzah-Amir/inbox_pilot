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

export async function deleteCampaign(id) {
  try {
    await prisma.campaign.delete({
      where: { id },
    });
    console.log(`✅ Campaign ${id} deleted successfully.`);
    return { success: true };
  } catch (error) {
    console.error(`❌ Failed to delete campaign ${id}:`, error.message);
    return { success: false, error: error.message };
  }
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

export const fetchRecentEmails = async (session) => {
    const recentEmails = await prisma.email.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: 'desc' },
        take: 3,
    });
    return recentEmails;
}

export async function getUser (email) {
    const user = prisma.user.findUnique({
        where: {
            email: email
        }
    })
    return user
} 

export async function getEmailsByUserId(userId) {
    const emails = await prisma.email.findMany({
        where: {
            userId: userId
        },
        include: {
            replies: true
        }
    })
    return emails
}