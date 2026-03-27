# SEO Action Plan: optivaize.nl

**Generated:** 2026-03-27
**Overall Score:** 54/100

---

## Critical (Fix immediately)

### 1. Fix client-side rendered blog and case content
**Impact:** Your blog posts and case studies are invisible to Google and AI crawlers.
- `BlogDetailPage` loads content via `useEffect` + `fetch`. Googlebot sees ~250 words of empty shell.
- `CasesPage` and case detail pages have the same issue.
- **Fix:** Fetch data server-side in the page component and pass as props, or convert to server components.
- **Files:** `app/blog/[slug]/page.js`, `app/cases/[slug]/page.js`, `client/src/pages/BlogDetailPage.js`, `client/src/pages/CaseDetailPage.js`

### 2. Fix www subdomain (returns 404)
**Impact:** All external links to www.optivaize.nl are broken.
- **Fix:** Add Cloudflare redirect rule: `www.optivaize.nl/*` 301 to `https://optivaize.nl/$1`

### 3. Fix sitemap URL with space in slug
**Impact:** Invalid URL being submitted to search engines.
- **Fix:** `UPDATE blogs SET slug = TRIM(slug) WHERE slug LIKE ' %';`
- **Safeguard:** Add `.trim()` in `app/sitemap.js` line 37

### 4. Migrate all images to next/image
**Impact:** Fixes WebP conversion, srcset, lazy loading, and CLS in one step.
- Currently: 0 uses of `next/image` across entire codebase. All images are raw `<img>`.
- Homepage loads ~6.3 MB of unoptimized PNGs.

---

## High (Fix within 1 week)

### 5. Add security headers
Add to `next.config.js`:
```js
async headers() {
  return [{
    source: '/(.*)',
    headers: [
      { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
    ],
  }];
},
poweredByHeader: false,
```

### 6. Compress oversized images
- `max_bladt_upclose.png` (2.44 MB), `wimhof.png` (1.85 MB), `sony.png` (3840x2160 for a logo!)
- Convert to WebP, resize to actual display dimensions.

### 7. Remove excessive image preloads
- Homepage preloads 11 images. Keep only logo + LCP hero image.
- Add `fetchpriority="high"` to the actual LCP element only.

### 8. Fix homepage H1 tags
- Currently 9 H1 elements. Reduce to exactly 1.
- **File:** `client/src/pages/HomePage.js`

### 9. Add BreadcrumbList schema
- Visual breadcrumbs exist in UI but no corresponding JSON-LD.
- Add to all inner pages for rich results.

### 10. Add BlogPosting schema
- Data already fetched server-side in `generateMetadata`. Add JSON-LD.
- **File:** `app/blog/[slug]/page.js`

---

## Medium (Fix within 1 month)

### 11. Create llms.txt
- Quick win for AI search discoverability.
- Place at `public/llms.txt` with structured company info.

### 12. Add FAQ sections with FAQPage schema
- Add 5-8 Q&A pairs to each service page.
- Use question-format headings matching real user queries.
- Each answer: 134-167 words, self-contained, with sourced statistics.

### 13. Change schema type to ProfessionalService
- `LocalBusiness` is too generic. Change in `app/layout.js`.
- Add `areaServed`, `foundingDate`, `numberOfEmployees`.

### 14. Fix soft 404s
- Blog/case "not found" pages return HTTP 200. Should return 404.

### 15. Add contextual internal links
- Currently navigation-only. Add related posts/cases sections.

### 16. Fix mobile touch targets
- Increase hamburger menu, announcement bar links to 48x48px minimum.

### 17. Block AI training crawlers
- Add `CCBot`, `anthropic-ai`, `cohere-ai` Disallow rules to `app/robots.js`.

### 18. Optimize Google Business Profile
- Claim/verify GBP. Add Maps embed to contact page.

### 19. Add hreflang tags
- Add `hreflang="nl-NL"` and English alternate if applicable.

---

## Low (Backlog)

### 20. Implement IndexNow protocol
### 21. Establish YouTube presence (0.737 correlation with AI citations)
### 22. Remove deprecated priority/changefreq from sitemap
### 23. Add error logging to sitemap catch block
### 24. Verify SearchAction schema accuracy
### 25. Add reviews/testimonials to site
### 26. Add speakable schema
### 27. Create geo-modified landing pages (Utrecht, Amsterdam)
### 28. Build toward Wikipedia/Wikidata entity
### 29. Add WhatsApp contact option
### 30. Add video preload="none" to 62 MB video element
