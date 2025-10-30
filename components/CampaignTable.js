import React from 'react'

export default function CampaignTable({ campaigns, emailGenerated }) {
  const email = emailGenerated
  return (
    <div className="bg-gray-900 rounded-2xl w-full h-full py-6 shadow-lg">
      <h2 className="text-xl font-semibold text-white p-2 px-4 mb-4">Your Campaigns</h2>

      <div className=" overflow-x-auto">
        <table className="w-full text-sm text-gray-300">
          <thead>
            <tr className="border-b border-gray-700 text-gray-400 text-left">
              <th className="py-1 px-4">Title</th>
              <th className="py-1 px-4">Emails Generated</th>
              <th className="py-1 px-4">Emails Sent</th>
              <th className="py-1 px-4">Replies</th>
              <th className="py-1 px-4">Conversion</th>
              <th className="py-1 px-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {campaigns && campaigns.map((c) => (
              <tr
                key={c.id}
                className="border-b w-full border-gray-800 hover:bg-gray-800 transition-colors"
              >
                <td className="py-2 px-4 mr-8 font-medium text-white">{c.title}</td>

                <td className="py-1 px-4 ">{email}</td>
                <td className="py-1 px-4 ">{c.emailSent}</td>
                <td className="py-1 px-4">{c.replies}</td>
                <td className="py-1 px-4">
                  {c.conversionRate.toFixed(1)}%
                </td>
                <td className="py-1 px-4">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${c.status === "ACTIVE"
                        ? "bg-green-500/20 text-green-400"
                        : c.status === "PAUSED"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-gray-600/20 text-gray-400"
                      }`}
                  >
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
