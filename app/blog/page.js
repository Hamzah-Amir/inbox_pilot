import React from 'react'
import Link from 'next/link'

export const metadata = {
    title: 'Blog — Inbox Pilot',
    description:
        'Insights, tutorials, and best practices for cold email personalization using GPT-4. Learn templates, personalization strategies, and case studies to boost response rates.',
    openGraph: {
        title: 'Blog — Inbox Pilot',
        description:
            'Insights, tutorials, and best practices for cold email personalization using GPT-4.',
        url: 'https://inboxpilot.com/blog',
        siteName: 'Inbox Pilot',
        images: ['/og-image.png'],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Blog — Inbox Pilot',
        description:
            'Insights and best practices for cold email personalization using GPT-4.',
        images: ['/og-image.png'],
    },
    robots: 'index, follow',
}

const posts = [
    {
        title: 'How GPT-4 Personalizes Cold Emails at Scale',
        slug: 'gpt4-personalizes-cold-emails',
        date: '2025-10-01',
        excerpt:
            'A practical walkthrough of how to use recipient signals and GPT-4 prompts to generate highly personalized cold emails without manual effort.',
        readingTime: '6 min',
    },
    {
        title: 'Subject Lines That Get Replies: Data-driven Examples',
        slug: 'subject-lines-that-get-replies',
        date: '2025-08-18',
        excerpt:
            'We tested dozens of subject line patterns. Here are the high-performing templates and why they work for outreach.',
        readingTime: '4 min',
    },
    {
        title: 'A/B Testing Cold Email Copy with Automation',
        slug: 'ab-testing-cold-email-copy',
        date: '2025-07-10',
        excerpt:
            'Automating A/B tests at scale and interpreting results to improve reply rates without spending hours on manual analysis.',
        readingTime: '5 min',
    },
]

const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Inbox Pilot Blog',
    description:
        'Insights, tutorials, and best practices for cold email personalization using GPT-4.',
    url: 'https://inboxpilot.com/blog',
    publisher: {
        '@type': 'Organization',
        name: 'Inbox Pilot',
    },
    blogPost: posts.map((p) => ({
        '@type': 'BlogPosting',
        headline: p.title,
        url: `https://inboxpilot.com/blog/${p.slug}`,
        datePublished: p.date,
        description: p.excerpt,
    })),
}

const BlogPage = () => {
    return (
        <main className="min-h-screen bg-[#071021] text-gray-100">
            <div className="max-w-6xl mx-auto px-6 py-20">
                <header className="mb-12">
                    <h1 className="text-5xl font-semibold">Inbox Pilot Blog</h1>
                    <p className="mt-4 text-lg text-gray-400 max-w-3xl">
                        Practical guides, case studies, and technical tips on writing persuasive cold emails using GPT-4
                        personalization. Learn how to craft messages that cut through the noise and get replies.
                    </p>
                </header>

                <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <article key={post.slug} className="bg-[#0b1724] border border-gray-800 rounded-2xl p-6 hover:shadow-lg transition">
                            <div className="flex items-center justify-between text-sm text-gray-400">
                                <span>{new Date(post.date).toLocaleDateString()}</span>
                                <span>{post.readingTime}</span>
                            </div>
                            <h2 className="mt-4 text-xl font-semibold text-gray-100">
                                <Link href={`/blog/${post.slug}`}>
                                    {post.title}
                                </Link>
                            </h2>
                            <p className="mt-3 text-gray-400 text-sm">{post.excerpt}</p>
                            <div className="mt-6">
                                <Link className="inline-block px-4 py-2 border border-cyan-600 text-cyan-400 rounded-lg hover:bg-cyan-600/10" href={`/blog/${post.slug}`}>
                                    Read article
                                </Link>
                            </div>
                        </article>
                    ))}
                </section>
            </div>

            {/* JSON-LD structured data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
        </main>
    )
}

export default BlogPage