// app/dashboard/layout.jsx
'use client'
import Sidebar from '@/components/Sidebar'

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar stays permanent */}
      <Sidebar />

      {/* Scrollable content section */}
      <main className="flex-1 overflow-y-auto px-8 py-6">
        {children}
      </main>
    </div>
  )
}
