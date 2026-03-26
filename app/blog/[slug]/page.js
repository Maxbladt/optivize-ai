export const dynamic = 'force-dynamic';
import BlogDetailPage from '@/pages/BlogDetailPage';
import Layout from '@/components/Layout';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/blogs/${slug}`, { cache: 'no-store' });
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
        images: blog.featured_image ? [blog.featured_image] : ['/uploads/optivaize_logo_new.png'],
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

export default function Page() {
  return <Layout><BlogDetailPage /></Layout>;
}
