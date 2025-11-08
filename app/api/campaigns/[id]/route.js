import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'

export async function GET(request, { params }) {
  const { id } = params
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // only return campaign if it belongs to the current user
    const campaign = await prisma.campaign.findFirst({
      where: { id: id, userId: session.user.id },
    })

    if (!campaign) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(campaign)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  const { id } = params
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // ensure the campaign exists and belongs to the current user
    const existing = await prisma.campaign.findFirst({ where: { id: id, userId: session.user.id } })
    if (!existing) return NextResponse.json({ error: 'Not found or forbidden' }, { status: 404 })

    const body = await request.json()
    const data = {}
    if (body.title !== undefined) data.title = body.title
    if (body.goal !== undefined) data.goal = body.goal
    if (body.status !== undefined) data.status = body.status
    if (body.startDate !== undefined) data.startDate = body.startDate ? new Date(body.startDate) : null
    if (body.endDate !== undefined) data.endDate = body.endDate ? new Date(body.endDate) : null

    const updated = await prisma.campaign.update({
      where: { id },
      data,
    })
    return NextResponse.json(updated)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }
}
