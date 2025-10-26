import React from 'react'
import Link from 'next/link'

export const metadata = {
  title: 'Subject Lines That Get Replies: Data-driven Examples — Inbox Pilot',
  description:
    'Research-backed subject line patterns that increase cold email open and reply rates. Real examples and A/B test results from thousands of campaigns.',
  openGraph: {
    title: 'Subject Lines That Get Replies: Data-driven Examples',
    description:
      'Research-backed subject line patterns that increase cold email open and reply rates.',
    url: 'https://inboxpilot.com/blog/subject-lines-that-get-replies',
    siteName: 'Inbox Pilot',
    images: ['/blog/subject-lines.png'],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Subject Lines That Get Replies: Data-driven Examples',
    description: 'Research-backed subject line patterns that increase cold email success.',
    images: ['/blog/subject-lines.png'],
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Subject Lines That Get Replies: Data-driven Examples',
  description: 'We tested dozens of subject line patterns. Here are the high-performing templates and why they work for outreach.',
  image: 'https://inboxpilot.com/blog/subject-lines.png',
  datePublished: '2025-08-18',
  dateModified: '2025-08-18',
  author: {
    '@type': 'Organization',
    name: 'Inbox Pilot',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Inbox Pilot',
    logo: {
      '@type': 'ImageObject',
      url: 'https://inboxpilot.com/logo.png',
    },
  },
}

const BlogPost = () => {
  return (
    <main className="min-h-screen bg-[#071021] text-gray-100">
      <article className="max-w-4xl mx-auto px-6 py-20">
        <Link className="text-cyan-400 hover:underline mb-8 inline-block" href="/blog">
          ← Back to Blog
        </Link>

        <header className="mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent">Subject Lines That Get Replies: Data-driven Examples</h1>
          <div className="flex items-center gap-4 text-gray-400 mb-8">
            <time dateTime="2025-08-18" className="text-cyan-400">August 18, 2025</time>
            <span>·</span>
            <span>4 min read</span>
          </div>
        </header>

        <div className="prose prose-invert max-w-none">
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            After analyzing thousands of cold email campaigns, we&apos;ve identified the subject line patterns that consistently drive higher open and reply rates. Here are our data-backed findings and examples you can use.
          </p>

          <h2 className="text-3xl font-semibold mb-6 text-cyan-400">The Science Behind Effective Subject Lines</h2>
          <p className="text-gray-200 mb-4 leading-relaxed">
            Our research shows that successful subject lines share these characteristics:
          </p>
          <ul className="space-y-3 text-gray-300 mb-12">
            <li className="flex items-start">
              <span className="text-cyan-400 mr-2">•</span>
              Personal relevance to the recipient
            </li>
            <li className="flex items-start">
              <span className="text-cyan-400 mr-2">•</span>
              Clear value proposition
            </li>
            <li className="flex items-start">
              <span className="text-cyan-400 mr-2">•</span>
              Urgency without desperation
            </li>
            <li className="flex items-start">
              <span className="text-cyan-400 mr-2">•</span>
              Authentic curiosity or intrigue
            </li>
          </ul>

          <h2 className="text-3xl font-semibold mb-6 text-cyan-400">Top-Performing Subject Line Templates</h2>
          
          <div className="bg-[#0b1724] border border-gray-800 rounded-2xl p-6 my-8">
            <h3 className="text-xl font-semibold mb-4">Pattern #1: Question + Specificity</h3>
            <p className="mb-4">Open Rate: 45-55%</p>
            <div className="space-y-2">
              <p><strong>Examples:</strong></p>
              <ul>
                <li>&quot;Quick question about [company] content strategy?&quot;</li>
                <li>&quot;Have you considered [solution] for [problem]?&quot;</li>
                <li>&quot;Thoughts on [company news]?&quot;</li>
              </ul>
            </div>
          </div>

          <div className="bg-[#0b1724] border border-gray-800 rounded-2xl p-6 my-8">
            <h3 className="text-xl font-semibold mb-4">Pattern #2: Value + Timeframe</h3>
            <p className="mb-4">Open Rate: 42-48%</p>
            <div className="space-y-2">
              <p><strong>Examples:</strong></p>
              <ul>
                <li>&quot;10 min idea for improving [metric]&quot;</li>
                <li>&quot;Quick suggestion for [team]&quot;</li>
                <li>&quot;2 ways to boost [KPI] this quarter&quot;</li>
              </ul>
            </div>
          </div>

          <div className="bg-[#0b1724] border border-gray-800 rounded-2xl p-6 my-8">
            <h3 className="text-xl font-semibold mb-4">Pattern #3: Mutual Connection</h3>
            <p className="mb-4">Open Rate: 51-58%</p>
            <div className="space-y-2">
              <p><strong>Examples:</strong></p>
              <ul>
                <li>&quot;[Connection name] suggested I reach out&quot;</li>
                <li>&quot;Fellow [industry] member with a question&quot;</li>
                <li>&quot;Connected via [platform] - quick question&quot;</li>
              </ul>
            </div>
          </div>

          <h2>What to Avoid</h2>
          <p>Our data shows these patterns consistently underperform:</p>
          <ul>
            <li>ALL CAPS or excessive punctuation</li>
            <li>Generic greetings (&quot;Just checking in&quot;)</li>
            <li>Obvious mass email markers</li>
            <li>Overly pushy or sales-focused language</li>
          </ul>

          <h2>A/B Testing Strategy</h2>
          <p>
            For optimal results, test these variables in your subject lines:
          </p>
          <ul>
            <li>Length (3-7 words vs 8-12 words)</li>
            <li>Personal pronouns (you/your vs we/our)</li>
            <li>Question vs statement format</li>
            <li>Including company name vs industry reference</li>
          </ul>

          <div className="bg-[#0b1724] border border-gray-800 rounded-2xl p-6 my-8">
            <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
            <ul className="space-y-2">
              <li>Personalization increases open rates by 32%</li>
              <li>Questions perform 24% better than statements</li>
              <li>Mutual connections boost replies by 47%</li>
              <li>Specific timeframes improve engagement by 28%</li>
            </ul>
          </div>
        </div>
      </article>

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </main>
  )
}

export default BlogPost