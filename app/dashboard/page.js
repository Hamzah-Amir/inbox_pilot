'use client'
import { fetchRecentEmails } from '@/actions/useractions'
import CampaignTable from '@/components/CampaignTable'
import Sidebar from '@/components/Sidebar'
import Link from 'next/link'
import { getUser } from '@/actions/useractions'
import { useSession } from 'next-auth/react'
import { useState, useEffect, use } from 'react'
import React from 'react'
import { set } from 'react-hook-form'
import WebsiteDashboard from '@/components/WebsiteDashboard'
import TemplateDashboard from '@/components/TemplateDashboard'
import PricingPage from '../pricing/page'

const page = () => {

  const [campaign, setCampaign] = useState([])
  const [email, setEmail] = useState([])
  const [emailData, setEmailData] = useState([])
  const [plan, setPlan] = useState(null)
  const [emailsGenerated, setEmailsGenerated] = useState(null)
  const [limit, setLimit] = useState(null)
  const { data: session } = useSession()

  const fetchEmailGenerated = async () => {
    const user = await getUser(session.user.email)
    const emailGenerated = user.emailsGenerated
    const limit = user.emailLimit
    setLimit(limit)
    setEmailsGenerated(emailGenerated)
  }

  const fetchCampaignData = async () => {
    const campaignData = await fetch("/api/dashboard/campaigns", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
    })


    let res = await campaignData.json()
    console.log(res)
    let content = res.map(c => {
      const id = c.id;
      const title = c.title;
      const emailsSent = c.emailSent;
      const replies = c.replies
      const conversionRate = c.conversionRate;
      const status = c.status
      let data = { id: id, title: title, emailSent: emailsSent, replies: replies, conversionRate: conversionRate, status: status }
      return data
    })
    setCampaign(content)
  }

  const fetchRecentEmailData = async () => {
    const res = await fetch("/api/emails/recent", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const data = await res.json()
    const content = data.content
    console.log("Res ", content)
    const emailData = data.recentEmails
    console.log("Emails", emailData)
    setEmail(content)
    setEmailData(emailData)
  }

  const fetchUser = async () => {
    const user = await getUser(session.user.email)
    const plan = user.plan
    setPlan(plan)
    console.log("Plan", plan)
    return user
  }

  useEffect(() => {
    if (session) {
      fetchUser()
      fetchCampaignData()
      fetchRecentEmailData()
      fetchEmailGenerated()
    }
  }, [session])

  const used = emailsGenerated ?? 0
  const max = limit ?? 0

  if (plan == 'free') {

    return <TemplateDashboard campaigns={campaign} emails={emailData} content={email} plan={plan} used={used} limit={limit} />
  }

  if (plan === 'WEBSITE_PERSONALIZATION') {
    return <WebsiteDashboard used={used} max={max} plan={plan} campaign={campaign} emailsGenerated={emailsGenerated} email={email} emailData={emailData}/>
  }

  return <PricingPage />

}

export default page