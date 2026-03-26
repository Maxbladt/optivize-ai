import { useEffect } from 'react';

function setMeta(name, content, attr = 'name') {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel, href) {
  if (!href) return;
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export default function SEOHead({ title, description, keywords, ogImage, canonicalUrl, jsonLd, breadcrumbs, noindex }) {
  useEffect(() => {
    const prevTitle = document.title;
    if (title) document.title = title;

    setMeta('description', description);
    setMeta('keywords', keywords);
    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:image', ogImage, 'property');
    setMeta('og:type', canonicalUrl === 'https://optivaize.nl' ? 'website' : 'article', 'property');
    setMeta('og:locale', 'nl_NL', 'property');
    setMeta('og:url', canonicalUrl || window.location.href, 'property');
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', ogImage);

    if (noindex) {
      setMeta('robots', 'noindex, nofollow');
    }

    if (canonicalUrl) setLink('canonical', canonicalUrl);

    const scriptEls = [];

    if (jsonLd) {
      const scriptEl = document.createElement('script');
      scriptEl.type = 'application/ld+json';
      scriptEl.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(scriptEl);
      scriptEls.push(scriptEl);
    }

    if (breadcrumbs && breadcrumbs.length > 0) {
      const breadcrumbLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((item, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: item.name,
          item: item.url,
        })),
      };
      const bcScript = document.createElement('script');
      bcScript.type = 'application/ld+json';
      bcScript.textContent = JSON.stringify(breadcrumbLd);
      document.head.appendChild(bcScript);
      scriptEls.push(bcScript);
    }

    return () => {
      document.title = prevTitle;
      scriptEls.forEach(el => el.remove());
      if (noindex) {
        const robotsMeta = document.querySelector('meta[name="robots"]');
        if (robotsMeta) robotsMeta.remove();
      }
    };
  }, [title, description, keywords, ogImage, canonicalUrl, jsonLd, breadcrumbs, noindex]);

  return null;
}
