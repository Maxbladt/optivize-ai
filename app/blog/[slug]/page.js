export const revalidate = 3600;
import BlogDetailPage from '@/pages/BlogDetailPage';
import Layout from '@/components/Layout';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/blogs/${slug}`, { next: { revalidate: 3600 } });
    if (!res.ok) return { title: 'Blog niet gevonden | Optivaize' };
    const blog = await res.json();
    return {
      title: `${blog.title} | Optivaize Blog`,
      description: blog.meta_description || blog.excerpt || `Lees ${blog.title} op de Optivaize blog.`,
      keywords: blog.meta_keywords,
      alternates: { canonical: `https://optivaize.nl/blog/${slug}` },
      openGraph: {
        title: blog.title,
        description: blog.meta_description || blog.excerpt,
        url: `https://optivaize.nl/blog/${slug}`,
        type: 'article',
        images: blog.featured_image ? [blog.featured_image] : ['/images/optivaize_logo_new.webp'],
        article: {
          publishedTime: blog.published_at,
          authors: [blog.author || 'Optivaize'],
        },
      },
    };
  } catch {
    return { title: 'Blog | Optivaize' };
  }
}

export default async function Page({ params }) {
  const { slug } = await params;
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/blogs/${slug}`, { next: { revalidate: 3600 } });
    if (!res.ok) return notFound();
    const blog = await res.json();

    const canonicalUrl = `https://optivaize.nl/blog/${blog.slug}`;
    const ogImage = blog.featured_image || '/images/optivaize_logo_new.webp';

    const blogJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: blog.title,
      description: blog.meta_description || blog.excerpt,
      image: `https://optivaize.nl${ogImage}`,
      author: { '@type': 'Person', name: blog.author || 'Optivaize' },
      publisher: { '@id': 'https://optivaize.nl/#organization' },
      datePublished: blog.published_at,
      dateModified: blog.updated_at || blog.published_at,
      mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
      url: canonicalUrl,
    };

    const breadcrumbJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://optivaize.nl' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://optivaize.nl/blog' },
        { '@type': 'ListItem', position: 3, name: blog.title, item: canonicalUrl },
      ],
    };

    return (
      <Layout>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <BlogDetailPage blog={blog} />
      </Layout>
    );
  } catch {
    return notFound();
  }
}
