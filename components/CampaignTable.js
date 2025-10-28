import React from 'react'

export default function CampaignTable({ campaigns }) {

  return (
    <div className="bg-gray-900 rounded-2xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold text-white mb-4">Your Campaigns</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-gray-300">
          <thead>
            <tr className="border-b border-gray-700 text-gray-400 text-left">
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Emails Sent</th>
              <th className="py-3 px-4">Replies</th>
              <th className="py-3 px-4">Conversion</th>
            </tr>
          </thead>

          <tbody>
            {campaigns && campaigns.map((c) => (
              <tr
                key={c.id}
                className="border-b border-gray-800 hover:bg-gray-800 transition-colors"
              >
                <td className="py-3 px-4 font-medium text-white">{c.title}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      c.status === "ACTIVE"
                        ? "bg-green-500/20 text-green-400"
                        : c.status === "PAUSED"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-gray-600/20 text-gray-400"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="py-3 px-4">{c.emailsSent}</td>
                <td className="py-3 px-4">{c.replies}</td>
                <td className="py-3 px-4">
                  {c.conversionRate.toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
