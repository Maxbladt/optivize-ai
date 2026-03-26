export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/stats/', '/bedankt', '/api/'],
      },
    ],
    sitemap: 'https://optivaize.nl/sitemap.xml',
  };
}
