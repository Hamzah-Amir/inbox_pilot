import React from 'react'
import Link from 'next/link'

export const metadata = {
  title: 'Pricing — Inbox Pilot',
  description: 'Choose the right plan for your cold email personalization needs. Start with our free plan or upgrade to Pro for advanced features.',
}

const PricingPage = () => {
  return (
    <main className="min-h-screen bg-[#071021] text-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-400">Start personalizing your cold emails today</p>
        </header>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {/* Free Plan */}
          <div className="bg-[#0b1724] border border-gray-800 rounded-2xl p-8 hover:border-cyan-900 transition-colors">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Free Plan</h2>
              <p className="text-gray-400">Perfect for testing the waters</p>
            </div>

            <div className="mb-8">
              <p className="text-4xl font-bold mb-2">$0<span className="text-lg text-gray-400 font-normal">/month</span></p>
              <p className="text-cyan-400">5 emails per month</p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-cyan-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>GPT-4 powered personalization</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-cyan-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Basic templates</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-cyan-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Email validation</span>
              </li>
            </ul>

            <Link className="block text-center py-3 px-6 rounded-lg border-2 border-cyan-600 text-cyan-400 hover:bg-cyan-600/10 transition" href="/dashboard">
                Get Started Free
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="bg-[#0b1724] border-2 border-cyan-600 rounded-2xl p-8 relative">
            <div className="absolute -top-4 left-4">
              <span className="bg-cyan-600 text-white px-3 py-1 rounded-full text-sm">Most Popular</span>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Pro Plan</h2>
              <p className="text-gray-400">For serious email campaigns</p>
            </div>

            <div className="mb-8">
              <p className="text-4xl font-bold mb-2">$20<span className="text-lg text-gray-400 font-normal">/month</span></p>
              <p className="text-cyan-400">50 emails per month</p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-cyan-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Everything in Free, plus:</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-cyan-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Advanced personalization options</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-cyan-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Custom templates</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-cyan-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>A/B testing</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-cyan-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Priority support</span>
              </li>
            </ul>

            <Link className="block text-center py-3 px-6 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 transition" href="/dashboard">
           
                Upgrade to Pro
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-[#0b1724] border border-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-2">What happens when I reach my email limit?</h3>
              <p className="text-gray-400">You&apos;ll be notified when you&apos;re close to your limit. Free users can upgrade to Pro for more emails, while Pro users can contact support for custom solutions.</p>
            </div>

            <div className="bg-[#0b1724] border border-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-2">Can I switch between plans?</h3>
              <p className="text-gray-400">Yes! You can upgrade to Pro at any time. If you need to downgrade, you can switch back to the Free plan at the end of your billing cycle.</p>
            </div>

            <div className="bg-[#0b1724] border border-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-2">Do unused emails roll over?</h3>
              <p className="text-gray-400">No, email quotas reset at the beginning of each month to ensure consistent service quality for all users.</p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-semibold mb-4">Ready to get started?</h2>
          <p className="text-gray-400 mb-8">Try our free plan or go Pro — no credit card required for free plan</p>
          <Link href="/dashboard" className="inline-block py-3 px-8 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 transition">
              Start Free Trial
          </Link>
        </div>
      </div>
    </main>
  )
}

export default PricingPage