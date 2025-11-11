'use client'
import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const PricingPage = () => {

  const { data: session, status } = useSession();
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push("/login")
    }

  }, [session, status])


  const templatePay = async () => {
    if (status === 'unauthenticated') {
      router.push("/login")
    }

    const a = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
      method: "POST",
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NGQ1OWNlZi1kYmI4LTRlYTUtYjE3OC1kMjU0MGZjZDY5MTkiLCJqdGkiOiIzZmM2M2YxYjlmOWUxODNhZjU1ZTg1NDE4NzAzODJhNGU5YTA4OGJmMjJjMWNkZDUzYzFkNDQ2YmY3ODEyMmRiY2ExOWFhNzVkZmRjM2U5YSIsImlhdCI6MTc2Mjg1MTIyNC43Njk3MywibmJmIjoxNzYyODUxMjI0Ljc2OTczMiwiZXhwIjoyMDc4Mzg0MDI0Ljc1Njk5NCwic3ViIjoiNTg4MDQ0NiIsInNjb3BlcyI6W119.rHf1wi3nxh1RKNu7_3RvQbyuBwoan42EB_Ca6IGs3Qjx9QgXnA9nXOci1cGvPnIVXNkhfIYCs_y9yDpTR8xrnf0jgcalaxsI3Wh87P2UxSGDKyUc7JcU4XhQLt7hZp3fx8C4AxG5HPLQDvxkuRNwrBy0PPL2dzrbYnAwLMRGzV0TI6Usslblz-8tSuNF-UqeAh0HrEoKjjH6oNOovhuUrrrOitPJdk0XJGNFw5N4yi30AH2rzDxa6NhuOMh_RYa1HchSW4ve7Ml1xSzLQ8lC4qhCghGJIrpS1zC-Dn-abDcbt5Lh4xdYVCyDDc26hscoIaPknwzOlYIc9tXzcWxzaYb1BiAb5eOEH2jV_4nvVKIeFjYg8QPCXH29kVVuz6YSsTiJO0_Igd-5-Du3getx538Kd3PVMhtkspFeoKc_wCIy6L2cPz7OOy1MHg-DYM6pBYWvLweHrK2NruBlRlhjI8baPhW1XGQ5V6k85VpU7jvLc3mosSlgohoeJ3JaHRfr93IW-__rJseo714DdBXUDOjbagvcNKSoH_L690r1x-78WsikT5WLnyMporhY5bkmRvG0Y07Jmzov-s4MrmWC7MaM-RCAjZ2XR-UFi6RogKifz8DSkUplpWk0ZqLzy7Hxf-FQzSpIHvjps7S-XVGJ00sYCfQivWqA61IQhkkfcXY`,
      },
      body: JSON.stringify({
        "data": {
          "type": "checkouts",
          "attributes": {
            "product_options": {
              "enabled_variants": [1068069]
            },
            "checkout_options": {
              "button_color": "#7047EB"
            },
            "checkout_data": {
              "custom": {
                "user_id": session?.user?.id
              }
            },
          },
          "relationships": {
            "store": {
              "data": {
                "type": "stores",
                "id": '238040'
              }
            },
            "variant": {
              "data": {
                "type": "variants",
                "id": "1068069"

              }
            }
          }
        }

      })
    })

    const res = await a.json();
    console.log("RES", res);
    window.location.href = res.data.attributes.url;
  }

  const websitePro = async () => {
    if (status === 'unauthenticated') {
      router.push("/login")
    }
    const a = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
      method: "POST",
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NGQ1OWNlZi1kYmI4LTRlYTUtYjE3OC1kMjU0MGZjZDY5MTkiLCJqdGkiOiIzZmM2M2YxYjlmOWUxODNhZjU1ZTg1NDE4NzAzODJhNGU5YTA4OGJmMjJjMWNkZDUzYzFkNDQ2YmY3ODEyMmRiY2ExOWFhNzVkZmRjM2U5YSIsImlhdCI6MTc2Mjg1MTIyNC43Njk3MywibmJmIjoxNzYyODUxMjI0Ljc2OTczMiwiZXhwIjoyMDc4Mzg0MDI0Ljc1Njk5NCwic3ViIjoiNTg4MDQ0NiIsInNjb3BlcyI6W119.rHf1wi3nxh1RKNu7_3RvQbyuBwoan42EB_Ca6IGs3Qjx9QgXnA9nXOci1cGvPnIVXNkhfIYCs_y9yDpTR8xrnf0jgcalaxsI3Wh87P2UxSGDKyUc7JcU4XhQLt7hZp3fx8C4AxG5HPLQDvxkuRNwrBy0PPL2dzrbYnAwLMRGzV0TI6Usslblz-8tSuNF-UqeAh0HrEoKjjH6oNOovhuUrrrOitPJdk0XJGNFw5N4yi30AH2rzDxa6NhuOMh_RYa1HchSW4ve7Ml1xSzLQ8lC4qhCghGJIrpS1zC-Dn-abDcbt5Lh4xdYVCyDDc26hscoIaPknwzOlYIc9tXzcWxzaYb1BiAb5eOEH2jV_4nvVKIeFjYg8QPCXH29kVVuz6YSsTiJO0_Igd-5-Du3getx538Kd3PVMhtkspFeoKc_wCIy6L2cPz7OOy1MHg-DYM6pBYWvLweHrK2NruBlRlhjI8baPhW1XGQ5V6k85VpU7jvLc3mosSlgohoeJ3JaHRfr93IW-__rJseo714DdBXUDOjbagvcNKSoH_L690r1x-78WsikT5WLnyMporhY5bkmRvG0Y07Jmzov-s4MrmWC7MaM-RCAjZ2XR-UFi6RogKifz8DSkUplpWk0ZqLzy7Hxf-FQzSpIHvjps7S-XVGJ00sYCfQivWqA61IQhkkfcXY`,
      },
      body: JSON.stringify({
        "data": {
          "type": "checkouts",
          "attributes": {
            "product_options": {
              "enabled_variants": [1084451]
            },
            "checkout_options": {
              "button_color": "#7047EB"
            },
            "checkout_data": {
              "custom": {
                "user_id": session?.user?.id
              }
            },
          },
          "relationships": {
            "store": {
              "data": {
                "type": "stores",
                "id": '238040'
              }
            },
            "variant": {
              "data": {
                "type": "variants",
                "id": "1084451"

              }
            }
          }
        }

      })
    })

    const res = await a.json();
    console.log("RES", res);
    window.location.href = res.data.attributes.url;
  }

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

          {/* Pro Plan */}
          <div className="bg-[#0b1724] border-2 border-cyan-600 rounded-2xl p-8 relative">

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

            <button onClick={() => templatePay()} className="block text-center py-3 px-6 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 transition">

              Upgrade to Pro
            </button>
          </div>

          {/* Web Personalization Plan */}
          <div className="bg-[#0b1724] border-2 border-cyan-600 rounded-2xl p-8 relative">
            <div className="absolute -top-4 left-4">
              <span className="bg-cyan-600 text-white px-3 py-1 rounded-full text-sm">Most Popular</span>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Web Personalization</h2>
              <p className="text-gray-400">For advanced cold email campaigns</p>
            </div>

            <div className="mb-8">
              <p className="text-4xl font-bold mb-2">$50<span className="text-lg text-gray-400 font-normal">/month</span></p>
              <p className="text-cyan-400">200 personalized emails per month</p>
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
                <span>Website content-based personalization</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-cyan-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Customizable email templates</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-cyan-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Performance tracking & analytics</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-cyan-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Priority support</span>
              </li>
            </ul>

            <button onClick={() => websitePro()} className="block text-center py-3 px-6 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 transition">
              Upgrade to Web Personalization
            </button>
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