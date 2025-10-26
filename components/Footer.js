import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-[#071021] text-gray-300 py-8 mt-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="font-bold text-2xl">Inbox Pilot</div>
        </div>

        <div className="text-sm text-gray-400">© {new Date().getFullYear()} Inbox Pilot. All rights reserved.</div>

        <div className="flex items-center gap-4">
          <a className="text-cyan-400 hover:underline" href="mailto:hello@inboxpilot.com">hello@inboxpilot.com</a>
          <Link href="/blog">Blog</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer