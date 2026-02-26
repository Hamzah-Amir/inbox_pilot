'use client'
import React from 'react'
import { useForm } from 'react-hook-form';
import Sidebar from '@/components/Sidebar';
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { getCampaign } from '@/actions/useractions';
import { useRouter } from 'next/navigation'
import { Router } from 'next/router';
import Link from 'next/link';

const WebsiteProPersonalization = () => {

  const router = useRouter()
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  const { data: session, status } = useSession()
  const [campaigns, setCampaigns] = useState([])
  const [error, setError] = useState("");
  const [emailType, setEmailType] = useState()
  const [geminiResponse, setGeminiResponse] = useState({
    subject: "",
    intro: "",
    body: "",
    cta: "",
    closing: ""
  });
  const [loading, setloading] = useState(false)
  
  const { onChange: registerOnChange, ...registerProps } = register("campaignId", { required: true });
  const recipientEmail = watch("recipientEmail")
  const recipientName = watch("recipientName")
  const yourName = watch("yourName")

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push("/login")
    }
  }, [status])

  const getCampaignData = async () => {
    const campaignData = await getCampaign(session.user.id)
    const mapped = campaignData.map(c => ({
      id: c.id,
      title: c.title,
      goal: c.goal,
    }))
    setCampaigns(mapped)
  }

  useEffect(() => {
    if (session?.user?.id) {
      getCampaignData()
    }

  }, [session])

  const handleCampaignChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "create-campaign") {
      router.push("/dashboard/campaigns/create");
      return;
    }
    // Call react-hook-form's onChange handler
    registerOnChange(e);
  };

  const onSubmit = async (data) => {
    console.log(data)
    setloading(true)
    setGeminiResponse("")
    setError("");
    try {

      const response = await fetch("/api/personalize/website-pro", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          website: data.website,
          campaignId: data.campaignId,
          recipientName: data.recipientName,
          recipientRole: data.recipientRole,
          yourName: data.yourName,
          emailType: data.emailType,
          description: data.instructions,
          tone: data.tone
        })
      })

      const res = await response.json()
      const emailData = { subject: res.subject, intro: res.intro, body: res.body, cta: res.cta, closing: res.closing }
      setGeminiResponse(emailData)
      console.log("Response", res)
      router.push("/dashboard/generate/website-pro/#output")
    } catch (error) {
      console.log("Streaming Error:", error.message);
      setError(error.message || "Something broke while generating email."); // ← now user know
    } finally {
      setloading(false)
    };
  };


  return (
    <>
      <main className='min-h-screen ml-0 md:ml-[17.5vw] mt-20 md:mt-8 px-4 md:px-0'>
        <Sidebar />
        <section className='max-w-7xl mx-auto'>
          <h1 className='text-3xl md:text-4xl font-bold animate-fade-in'>Generate AI Emails</h1>
          <p className='text-gray-300 mt-2 text-sm md:text-base'>Create personalized emails for your selected campaign.</p>
          <form className='my-6 w-full md:w-[60vw] md:mx-[12vw] min-h-[70vh] border flex flex-col space-y-4 border-[#030b1b] p-4 md:p-6 rounded-[14px] shadow-[#030b1b] shadow-2xl bg-[#0B1624] animate-fade-in-up'
            onSubmit={handleSubmit(onSubmit)} >

            <div>
              <label htmlFor='campaignId' className='block mb-2'>Select Campaign</label>
              <select 
                className='border w-full mb-0.5 rounded-lg p-2 h-11 placeholder:text-[#8b99ad] focus:border-[#22D3EE] outline-none'
                id='campaignId'
                {...registerProps}
                onChange={handleCampaignChange}
              >
                <option value="">Select a campaign...</option>
                <option value="create-campaign">+ Create Campaign</option>
                {campaigns && campaigns.map(c => (
                  <option key={c.id} value={c.id}>{c.title} ({c.goal})</option>
                ))}
              </select>
            </div>

            {/* Website URL */}
            <div>
              <label className="block mb-1 font-medium text-sm md:text-base">Website URL</label>
              <input
                {...register("website", { required: true })}
                type="url"
                placeholder="https://example.com"
                className="w-full border border-gray-700 bg-[#0D1A2B] text-white p-2.5 md:p-3 rounded-lg focus:border-[#22D3EE] focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
              />
              {errors.website && <p className="text-red-500 text-sm mt-1">Website is required</p>}
            </div>

            {/* Recipient Name */}
            <div>
              <label className="block mb-1 font-medium text-sm md:text-base">Recipient Name</label>
              <input
                {...register("recipientName", { required: true })}
                type="text"
                placeholder="John Doe"
                className="w-full border border-gray-700 bg-[#0D1A2B] text-white p-2.5 md:p-3 rounded-lg focus:border-[#22D3EE] focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
              />
              {errors.recipientName && <p className="text-red-500 text-sm mt-1">Recipient name is required</p>}
            </div>

            {/* Recipient Role */}
            <div>
              <label className="block mb-1 font-medium text-sm md:text-base">Recipient Role</label>
              <input
                {...register("recipientRole")}
                type="text"
                placeholder="Founder, Marketing Manager, etc."
                className="w-full border border-gray-700 bg-[#0D1A2B] text-white p-2.5 md:p-3 rounded-lg focus:border-[#22D3EE] focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
              />
            </div>

            {/* Recipient Email */}
            <div>
              <label className="block mb-1 font-medium text-sm md:text-base">Recipient Email</label>
              <input
                {...register("recipientEmail", {
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address"
                  }
                })}
                type="email"
                placeholder="recipient@example.com"
                className="w-full border border-gray-700 bg-[#0D1A2B] text-white p-2.5 md:p-3 rounded-lg focus:border-[#22D3EE] focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
              />
              {errors.recipientEmail && <p className="text-red-500 text-sm mt-1">{errors.recipientEmail.message}</p>}
            </div>

            {/* Your Name */}
            <div>
              <label className="block mb-1 font-medium text-sm md:text-base">Your Name</label>
              <input
                {...register("yourName", { required: true })}
                type="text"
                placeholder="Hamza / Your Name"
                className="w-full border border-gray-700 bg-[#0D1A2B] text-white p-2.5 md:p-3 rounded-lg focus:border-[#22D3EE] focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
              />
              {errors.yourName && <p className="text-red-500 text-sm mt-1">Your name is required</p>}
            </div>

            {/* Email Type Selector (useState handled) */}
            <div>
              <label className="block mb-1 font-medium text-sm md:text-base">Type of Email</label>
              <select
                {...register("emailType", { required: true })}
                value={emailType}
                onChange={(e) => setEmailType(e.target.value)}
                className="w-full border border-gray-700 bg-[#0D1A2B] text-white p-2.5 md:p-3 rounded-lg focus:border-[#22D3EE] focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
              >
                <option value="cold Outreach">Cold Outreach</option>
                <option value="followup">Follow-up</option>
                <option value="inquiry">Information Inquiry</option>
                <option value="value">Value Add Message</option>
              </select>
              {errors.emailType && <p className="text-red-500 text-sm mt-1">Email type is required</p>}
            </div>
            <div>
              <label htmlFor='tone' className='block mb-2 text-sm md:text-base font-medium'>Select Tone <span className='text-red-500'>*</span></label>
              <select className='border border-gray-700 bg-[#0D1A2B] text-white w-full mb-6 rounded-lg p-2.5 md:p-3 h-11 placeholder:text-[#8b99ad] focus:border-[#22D3EE] focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all'
                id='tone'
                {...register("tone", { required: true })}
              >
                <option value="Professional & Witty">Inbox Pilot's default</option>
                <option value="Professional">Professional</option>
                <option value="Persuasive">Persuasive</option>
                <option value="Friendly">Friendly</option>
                <option value="Confident">Confident</option>
                <option value="Data-Driven">Data-Driven</option>
              </select>
            </div>
            {/* Custom Instructions */}
            <div>
              <label className="block mb-1 font-medium text-sm md:text-base">Extra Instructions (Optional)</label>
              <textarea
                {...register("instructions")}
                placeholder="Any tone, angle or personalization notes..."
                className="w-full border border-gray-700 bg-[#0D1A2B] text-white p-2.5 md:p-3 rounded-lg h-28 focus:border-[#22D3EE] focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all resize-none"
              />
            </div>
            {error && (
              <div className="text-red-500 text-sm mb-4 border border-red-500/30 bg-red-500/10 p-3 rounded-lg animate-shake">
                {error}
              </div>
            )}
            <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-cyan-600 to-cyan-500 text-white py-3 rounded-lg hover:from-cyan-500 hover:to-cyan-400 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-cyan-500/20">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                  Generating...
                </span>
              ) : 'Generate Email'}
            </button>
          </form>
        </section>
        <section className='my-6 w-full md:w-[60vw] md:mx-[12vw] min-h-[70vh] border flex flex-col space-y-4 border-[#030b1b] p-4 md:p-6 rounded-[14px] shadow-[#030b1b] shadow-2xl bg-[#0B1624] animate-fade-in-up' id='output'>
          <div className='flex items-center justify-between mb-2'>
            <h1 className='text-2xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent'>Generated Email</h1>
            {geminiResponse.subject && (
              <button 
                onClick={() => {
                  const emailContent = `Subject: ${geminiResponse.subject}\n\n${geminiResponse.intro}\n\n${geminiResponse.body}\n\n${geminiResponse.cta}\n\n${geminiResponse.closing}`;
                  navigator.clipboard.writeText(emailContent);
                }}
                className='px-3 py-1.5 text-sm bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 rounded-lg transition-all duration-200 flex items-center gap-2 border border-cyan-600/30 hover:border-cyan-600/50'
                title="Copy email"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </button>
            )}
          </div>
          <div className='w-full min-h-[300px] p-4 md:p-6 border border-gray-700 rounded-xl bg-gradient-to-br from-[#0D1A2B] to-[#0a1520] text-white shadow-inner relative overflow-hidden'>
            {/* Decorative gradient overlay */}
            <div className='absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl'></div>
            <div className='absolute bottom-0 left-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl'></div>
            
            <div className='relative z-10'>
              {loading && !geminiResponse.subject ? (
                // Loading Skeleton with better animation
                <div className="space-y-3 animate-pulse">
                  <div className="h-5 bg-gray-700/50 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-700/40 rounded w-full"></div>
                  <div className="h-4 bg-gray-700/40 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-700/40 rounded w-4/5"></div>
                  <div className="h-5 bg-gray-700/50 rounded w-2/3 mt-4"></div>
                  <div className="h-4 bg-gray-700/40 rounded w-full"></div>
                  <div className="h-4 bg-gray-700/40 rounded w-3/4"></div>
                </div>
              ) : geminiResponse.subject ? (
                // Final Render with better styling
                <div className="space-y-4 animate-fade-in">
                  <div className='pb-3 border-b border-gray-700/50'>
                    <div className='flex items-center gap-2 mb-2'>
                      <span className='text-xs font-semibold text-cyan-400 uppercase tracking-wide'>Subject</span>
                    </div>
                    <p className='text-lg md:text-xl font-semibold text-cyan-300'>{geminiResponse.subject}</p>
                  </div>
                  
                  <div className='space-y-3 text-gray-200 leading-relaxed'>
                    {geminiResponse.intro && (
                      <p className='text-base md:text-lg'>{geminiResponse.intro}</p>
                    )}
                    {geminiResponse.body && (
                      <p className='text-base md:text-lg'>{geminiResponse.body}</p>
                    )}
                    {geminiResponse.cta && (
                      <p className='text-base md:text-lg font-medium text-cyan-300'>{geminiResponse.cta}</p>
                    )}
                    {geminiResponse.closing && (
                      <p className='text-base md:text-lg mt-4'>{geminiResponse.closing}</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className='flex flex-col items-center justify-center h-[300px] text-gray-500'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <p className='text-lg'>Your generated email will appear here</p>
                  <p className='text-sm mt-2 text-gray-600'>Fill out the form above and click "Generate Email"</p>
                </div>
              )}
            </div>
          </div>
        </section>

      </main>
    </>
  )
}

export default WebsiteProPersonalization