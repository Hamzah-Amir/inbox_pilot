import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-[#071021] mx-0 md:mx-[17.5vw] text-gray-300 py-6 md:py-8 mt-12 px-4 md:px-0">
      <div className="max-w-6xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="font-bold text-xl md:text-2xl">Inbox Pilot</div>
        </div>

        <div className="text-xs md:text-sm text-gray-400 text-center md:text-left">© {new Date().getFullYear()} Inbox Pilot. All rights reserved.</div>

        <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4">
          <a className="text-cyan-400 hover:underline text-sm md:text-base transition-colors" href="mailto:hello@inboxpilot.com">support@inboxpilot.pro</a>
          <Link href="/blog" className="text-sm md:text-base hover:text-cyan-400 transition-colors">Blog</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer