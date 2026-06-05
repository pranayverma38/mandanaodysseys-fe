import SectionGridPosts from '@/components/blog/section-grid-posts'
import SectionMagazine5 from '@/components/blog/section-magazine5'
import { Divider } from '@/components/divider'
import NewsletterSection from '@/components/newsletter-section-1'
import { getBlogPosts } from '@/data/data'
import { createPageMetadata } from '@/lib/seo'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = createPageMetadata({
  title: 'Travel Blog',
  description:
    'Travel tips, destination guides, and tour inspiration from Mandana Odysseys. Stay informed on the latest international travel trends and vacation ideas.',
  path: '/blog',
})

const BlogPage: React.FC = async () => {
  const blogPosts = await getBlogPosts()

  return (
    <div className="container flex flex-col gap-24 pt-12 pb-24 sm:pt-14 xl:gap-28 xl:pb-28">
      <SectionMagazine5 posts={blogPosts} />
      <Divider />
      <SectionGridPosts posts={blogPosts} />
      <NewsletterSection />
    </div>
  )
}

export default BlogPage
