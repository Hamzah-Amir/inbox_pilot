import Image from "next/image";

export default function Home() {
  return (
    <>
      <main>
        <section className="hero p-10">
          <div className="mx-[5vw] mt-5 border-2 bg-linear-to-l from-[#4408c7]  via-[#4e399c]  to-[#68389e] border-purple-700 w-44 h-12 flex items-center rounded-4xl">
            <p className="mx-auto font-thin text-sm ">Powered by GPT-4</p>
          </div>
          <div className="section flex ">
            <div className="left-section px-12 my-4 w-[45vw]">
              <span><p className="text-6xl my-1.5">Cold Emails That</p></span>
              <span><p className="text-6xl my-1.5">Feel Like They&apos;re</p></span>
              <span><p className="text-6xl my-1.5">Written Just For</p></span>
              <span><p className="text-6xl my-1.5">Them</p></span>
              <span>
                <p className="text-xl text-neutral-400">Leverage GPT-4 to craft hyper-personalized cold emails at scale. Boost your response rates by 3x with AI that understands context, tone, and human connection</p>
              </span>
              <div className="buttons flex gap-6 mt-8">
                <button className=" border rounded-lg p-2 px-6 font-bold bg-linear-to-l from-[#4854b955] via-[#2a519755] to-[#9c41b3]">
                  <p>Start free Trial</p>
                </button>
                <button className=" border rounded-lg p-2 px-6 font-bold bg-neutral-900">
                  Watch Demo
                </button>
              </div>
              <div className="seperation border h-0.5 my-6 border-gray-600"></div>
              <div className="flex">
                <span><p className="text-3xl text-purple-400">3x</p>
                  <p className="text-gray-400">Higher Response Rate</p>
                </span>
                <span className="mx-6"><p className="text-3xl text-purple-400">100+</p>
                  <p className="text-gray-400">Emails Sent Daily</p>
                </span>
                <span className="mx-6">
                  <p className="text-3xl text-purple-400">90%</p>
                  <p className="text-gray-400"> personalization Score</p>
                </span>
              </div>
            </div>
            <div className="right-section w-[50vw] flex justify-center items-start">
              <Image className="mx-auto rounded-2xl shadow-5xl ring-4 ring-[#4e399c]/20 object-cover" src='/email_image.png' height={700} width={700} alt="Email Image" />
            </div>
          </div>
        </section>

        <section className="below-Section min-h-screen my-10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-semibold">Why Your Cold Emails Get Ignored</h2>
              <p className="mx-auto max-w-2xl text-xl mt-4 text-gray-400">Generic templates kill response rates. Our GPT-4 engine writes emails that feel human, relevant, and impossible to ignore.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <article className="bg-[#071021] border border-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-36 h-12 rounded-full bg-linear-to-r from-pink-500 to-violet-500 flex items-center px-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                    <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" fill="white" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mt-5">GPT-4 Powered Personalization</h3>
                <p className="text-gray-400 text-sm mt-3">Advanced AI analyzes recipient data, company info, and context to craft emails that resonate on a personal level.</p>
              </article>

              <article className="bg-[#071021] border border-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-36 h-12 rounded-full bg-linear-to-r from-blue-400 to-cyan-500 flex items-center px-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 12H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 6L21 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 18L21 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-lg font-medium mt-5">3x Higher Response Rates</h3>
                <p className="text-gray-400 text-sm mt-3">Personalized emails outperform generic templates. Watch your reply rates soar with context-aware messaging.</p>
              </article>

              <article className="bg-[#071021] border border-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-36 h-12 rounded-full bg-linear-to-r from-green-400 to-emerald-500 flex items-center px-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="7" width="18" height="12" rx="2" stroke="white" strokeWidth="1.5"/>
                    <path d="M7 11L12 14L17 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-lg font-medium mt-5">Perfect Tone &amp; Style</h3>
                <p className="text-gray-400 text-sm mt-3">GPT-4 adapts writing style to match your brand voice while maintaining authenticity and human connection.</p>
              </article>

              <article className="bg-[#071021] border border-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-36 h-12 rounded-full bg-linear-to-r from-orange-400 to-yellow-500 flex items-center px-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L12 22" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5 12H19" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-lg font-medium mt-5">Scale Without Limits</h3>
                <p className="text-gray-400 text-sm mt-3">Generate hundreds of unique, personalized emails in minutes. Quality personalization at unprecedented speed.</p>
              </article>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
