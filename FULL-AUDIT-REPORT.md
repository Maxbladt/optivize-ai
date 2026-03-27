# Full SEO Audit Report: optivaize.nl

**Date:** 2026-03-27
**Business:** Optivaize, AI-bureau, De Bilt, Netherlands
**Technology:** Next.js App Router, styled-components, Cloudflare CDN
**Pages crawled:** 28 (15 static + 7 case studies + 6 blog posts)

---

## Executive Summary

### Overall SEO Health Score: 54/100

| Category | Score | Weight | Weighted |
|----------|-------|--------|----------|
| Technical SEO | 62/100 | 22% | 13.6 |
| Content Quality | 62/100 | 23% | 14.3 |
| On-Page SEO | 65/100 | 20% | 13.0 |
| Schema / Structured Data | 45/100 | 10% | 4.5 |
| Performance (CWV) | 35/100 | 10% | 3.5 |
| AI Search Readiness (GEO) | 52/100 | 10% | 5.2 |
| Images | 25/100 | 5% | 1.3 |
| **Total** | | | **55.4** |

### Business Type Detected
**Local Service Business (SAB/Hybrid)** - AI/Technology agency serving clients nationwide from a physical office in De Bilt.

### Top 5 Critical Issues

1. **Blog and case study content is client-side rendered.** Google and AI crawlers see empty page shells. Your most valuable content is invisible to search engines.
2. **`next/image` is not used anywhere.** All images are raw `<img>` tags with no WebP conversion, no srcset, no lazy loading. Homepage loads ~6.3 MB of images.
3. **www.optivaize.nl returns a 404.** Any external links pointing to the www subdomain are completely broken and pass zero link equity.
4. **Sitemap contains an invalid URL with a space** in `/blog/ ai-agent-vs-chatbot-verschil`. This is caused by a leading space in the database slug.
5. **All security headers are missing.** No HSTS, CSP, X-Frame-Options, or X-Content-Type-Options.

### Top 5 Quick Wins

1. **Create `llms.txt`** for AI search discoverability (1 hour).
2. **Add security headers** via `next.config.js` `headers()` function (30 minutes).
3. **Fix the blog slug** in the database: `UPDATE blogs SET slug = TRIM(slug)` (5 minutes).
4. **Set `poweredByHeader: false`** in `next.config.js` (1 minute).
5. **Add `www` redirect** in Cloudflare (10 minutes).

---

## 1. Technical SEO (62/100)

### Crawlability
- **robots.txt:** Well-configured. Correctly blocks `/admin`, `/stats/`, `/bedankt`, `/api/`.
- **Sitemap:** Present at `/sitemap.xml`, dynamically generated, 28 URLs.
- **CRITICAL:** Sitemap URL `https://optivaize.nl/blog/ ai-agent-vs-chatbot-verschil` contains a space. Invalid per RFC 3986.

### Indexability
- **Canonical tags:** Correct on all 17 public pages, using HTTPS, no trailing slashes.
- **www subdomain:** Returns Cloudflare 404. Must add 301 redirect to non-www.
- **Soft 404s:** Blog "not found" pages return HTTP 200 instead of 404 status codes.
- **Trailing slashes:** Properly handled with 308 redirects (Next.js default).

### Security Headers (all MISSING)

| Header | Status |
|--------|--------|
| Strict-Transport-Security (HSTS) | MISSING |
| X-Frame-Options | MISSING |
| X-Content-Type-Options | MISSING |
| Content-Security-Policy | MISSING |
| Referrer-Policy | MISSING |
| Permissions-Policy | MISSING |
| x-powered-by: Next.js | EXPOSED (should hide) |

### Mobile Optimization
- Viewport meta tag: correct on all pages.
- Responsive breakpoints: 1100px, 1024px, 768px, 640px, 480px.
- Mobile hamburger menu: present and functional.
- **Issue:** 27 of 45 touch targets are below the 48x48px minimum (hamburger menu is 37x37px).

### SSR/Rendering
- Static/service pages: SSR via App Router. Content visible to crawlers.
- Blog/case pages: Metadata is SSR, but **body content is client-rendered** via `useEffect` + `fetch`. Critical gap.
- ISR active with `s-maxage=31536000, stale-while-revalidate`.

### IndexNow
Not implemented. No key file detected.

---

## 2. Content Quality (62/100)

### E-E-A-T Assessment

| Factor | Score | Key Gap |
|--------|-------|---------|
| Experience | 48/100 | No project walkthroughs, no before/after metrics |
| Expertise | 55/100 | No team credentials, certifications, or LinkedIn links |
| Authoritativeness | 45/100 | No press mentions, awards, or partner certifications |
| Trustworthiness | 65/100 | KvK/BTW present, but no verifiable testimonials |

### Content Rendering Issue (CRITICAL)
- **BlogDetailPage** loads content via client-side `useEffect` + `fetch('/api/blogs/...')`. Google receives ~250 words of shell markup and zero article content.
- **CasesPage** renders only a hero section (~311 words) server-side. Case study cards load client-side.
- **Blog listing** renders ~277 words server-side. Post titles/excerpts load client-side.

### Heading Structure
- Homepage has **9 H1 tags** (should be exactly 1).
- Service pages have proper H1 > H2 > H3 hierarchy.

### Internal Linking
- Navigation-only linking. No contextual in-body links between related pages.
- No related posts/cases sections.

### Thin Content Detection
- Service pages: ~2000 words each (good depth).
- Homepage: Strong content volume.
- Cases page: Hero section only when JS is disabled.
- Blog listing: Shell only when JS is disabled.

### AI Citation Readiness: 48/100
- Passages are too short for citation (15-25 words vs. 134-167 optimal).
- Statistics lack source attribution.
- No question-based headings matching user queries.
- No FAQ sections on any page.

---

## 3. On-Page SEO (65/100)

### Title Tags
- All pages have unique, descriptive title tags.
- Homepage: 68 characters (good, within 60-70 sweet spot).
- All titles include brand name "Optivaize".
- Service page titles include "De Bilt" for local relevance.

### Meta Descriptions
- Present on all pages with appropriate length (130-160 chars).
- Homepage: 139 characters (good).

### Open Graph / Twitter Cards
- Fully configured on all pages (title, description, url, image, type, locale).
- Twitter card: summary_large_image on all pages.

### Heading Issues
- **Homepage:** 9 H1 tags (CRITICAL, should be 1).
- **Service pages:** Proper hierarchy.
- **No question-format headings** for FAQ/AI optimization.

---

## 4. Schema / Structured Data (45/100)

### Current Implementation (Global, on every page)
- **LocalBusiness:** Complete with NAP, geo, hours, social links. Valid.
- **WebSite:** With SearchAction. Valid (but SearchAction may not work).
- **SiteNavigationElement:** All nav links included. Valid.

### Validation Warnings
- `logo` should be an `ImageObject`, not a plain URL string.
- Missing `addressRegion: "Utrecht"` in PostalAddress.
- Missing `areaServed` for geographic coverage.
- Missing `foundingDate` and `numberOfEmployees`.
- Schema type should be `ProfessionalService` instead of generic `LocalBusiness`.

### Missing Schema (High Impact)

| Schema Type | Pages Affected | Impact |
|-------------|---------------|--------|
| BreadcrumbList | All inner pages | High (rich results) |
| BlogPosting | 6 blog posts | High (article rich results) |
| Service | 5 service pages | Medium (service rich results) |
| Article | 7 case studies | Medium |
| FAQPage | 0 pages (none exist) | High (AI Overviews, featured snippets) |

### Key Gap
Visual breadcrumbs are rendered in the UI on service pages, but no BreadcrumbList schema exists. The data for BlogPosting and Article schemas is already fetched server-side in `generateMetadata`, so adding schemas requires minimal work.

---

## 5. Performance / Core Web Vitals (35/100)

### Estimated CWV Scores

| Metric | Estimate | Status |
|--------|----------|--------|
| TTFB | 55ms | Excellent |
| LCP | 3.0-5.0s (mobile) | Poor |
| INP | 150-300ms | Needs Improvement |
| CLS | 0.05-0.15 | Needs Improvement |

### Critical Performance Issues

1. **`next/image` not used anywhere** (0 imports across entire codebase). Every image is a raw `<img>` tag. No WebP/AVIF, no srcset, no automatic lazy loading, no width/height.

2. **~6.3 MB of images on homepage alone:**
   - `max_bladt_upclose.png`: 2.44 MB
   - `wimhof.png`: 1.85 MB
   - Multiple client logos: 100-800 KB each

3. **11 images preloaded in `<head>`** on homepage. Only the logo and LCP hero image should be preloaded. The rest saturate browser connections.

4. **Only 2 of 25 images have `loading="lazy"`.**

5. **62 MB video element** without `preload="none"`, so browsers may buffer immediately.

6. **Images lack width/height attributes** (1 of 25 has width, 0 have height), causing CLS.

### What Works Well
- TTFB is excellent (55ms) thanks to SSG + Cloudflare CDN.
- Font loading is optimized (woff2 preload, `display: swap`).
- JS chunks use `async` attribute.
- Code splitting at page level.

---

## 6. Images (25/100)

| Issue | Count | Severity |
|-------|-------|----------|
| No WebP/AVIF format | 28/28 images | Critical |
| No srcset/responsive | 28/28 images | Critical |
| Missing loading="lazy" | 23/25 images | High |
| Missing width/height | 24/25 images | High |
| Oversized source files | 6+ images | High |
| Weak/missing alt text | Multiple | Medium |
| Duplicate DOM images (carousel) | ~10 images | Medium |

### Oversized Images

| Image | Size | Context |
|-------|------|---------|
| sony.png | 3840x2160 (4K!) | Displayed as a small logo |
| max_bladt_upclose.png | 2.44 MB | Team photo |
| wimhof.png | 1.85 MB | Case study |
| aanhuis.png | 1610x1617 | Logo, served twice |
| stakepvp_logo.png | 1280x834 | Logo |

---

## 7. AI Search Readiness / GEO (52/100)

### GEO Score Breakdown

| Dimension | Score |
|-----------|-------|
| Citability | 45/100 |
| Structural Readability | 55/100 |
| Multi-Modal Content | 40/100 |
| Authority & Brand Signals | 60/100 |
| Technical Accessibility | 60/100 |

### AI Crawler Access
All AI search crawlers (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot) are allowed via wildcard rule. However, training-only crawlers (CCBot, anthropic-ai, cohere-ai) are also allowed and should be blocked.

### llms.txt: MISSING
No `llms.txt` file exists. This is a quick win for AI discoverability.

### Platform Scores

| Platform | Score | Key Gap |
|----------|-------|---------|
| Google AI Overviews | 55/100 | Multiple H1s, no FAQ schema |
| ChatGPT Web Search | 45/100 | No llms.txt, short passages, no YouTube |
| Perplexity | 50/100 | No citable definition blocks |
| Bing Copilot | 45/100 | No FAQ schema, weak entity signals |

### Missing Signals
- No YouTube presence (0.737 correlation with AI citations, the strongest signal).
- No Wikipedia/Wikidata entity.
- No hreflang tags for English content.
- No `speakable` schema.

---

## 8. Local SEO (52/100)

### What Works
- NAP consistency is excellent across homepage, contact, and over-ons pages.
- Every page title includes "De Bilt".
- Service pages have ~2000 words of unique content each.
- KvK and BTW numbers displayed in footer.
- Full contact details in footer on every page.

### Critical Gaps

| Issue | Impact |
|-------|--------|
| Google Business Profile not optimized/linked | #1 local ranking factor missing |
| Zero reviews or testimonials visible | No social proof for local trust |
| Schema type is `LocalBusiness` (too generic) | Should be `ProfessionalService` |
| No Google Maps embed on contact page | Maps link exists but no embed |
| No `areaServed` in schema | Missing geographic coverage signal |
| No geo-modified landing pages | No pages targeting "AI bureau Utrecht/Amsterdam" |
| No hreflang for nl-NL | Missing language signal |
| No WhatsApp contact | Dominant channel in Netherlands missing |

---

## Visual Audit Summary

### Above-the-Fold: Strong
- H1, value proposition, social proof (150+ clients, 40+ hours saved), and CTA all visible without scrolling on all viewports.
- Primary CTA ("Plan gratis gesprek") appears 3 times above the fold.

### Mobile Issues
- 27/45 touch targets below 48x48px minimum.
- Hamburger menu icon: 37x37px (below minimum).
- Announcement bar link: 110x13px (far too small).

---

## Sitemap Audit Summary

### Issues Found

| Check | Result | Severity |
|-------|--------|----------|
| Space in blog URL slug | FAIL | Critical |
| XML validity (excluding space) | PASS | - |
| Missing lastmod on 15 static pages | Present only on dynamic pages | Low |
| priority/changefreq usage | Present but ignored by Google | Info |
| Missing pages vs app routes | All exclusions intentional | PASS |
| Silent DB error fallback | No logging in catch block | Medium |

---

## Complete Prioritized Action Plan

### Critical (Fix immediately)

| # | Issue | Fix | File |
|---|-------|-----|------|
| 1 | Blog/case content is client-rendered | Convert to server components or fetch data server-side and pass as props | `app/blog/[slug]/page.js`, `app/cases/[slug]/page.js` |
| 2 | www.optivaize.nl returns 404 | Add Cloudflare redirect rule: www 301 to non-www | Cloudflare dashboard |
| 3 | Sitemap URL has space in slug | `UPDATE blogs SET slug = TRIM(slug)` + add `.trim()` in sitemap.js | `app/sitemap.js` line 37 |
| 4 | `next/image` not used | Replace all `<img>` with `next/image` (fixes WebP, srcset, lazy loading, CLS) | All page components |

### High (Fix within 1 week)

| # | Issue | Fix | File |
|---|-------|-----|------|
| 5 | Security headers missing | Add `headers()` function to next.config.js | `next.config.js` |
| 6 | 6.3 MB of images on homepage | Compress images (especially 2.44 MB and 1.85 MB PNGs), convert to WebP | `public/uploads/` |
| 7 | 11 images preloaded | Remove preloads for non-LCP images, add `fetchpriority="high"` to LCP only | Homepage component |
| 8 | Homepage has 9 H1 tags | Reduce to exactly 1 H1, convert rest to H2 | `client/src/pages/HomePage.js` |
| 9 | No BreadcrumbList schema | Add JSON-LD BreadcrumbList to all inner pages | Page components |
| 10 | No BlogPosting schema | Add JSON-LD BlogPosting to blog post pages | `app/blog/[slug]/page.js` |
| 11 | x-powered-by exposed | Set `poweredByHeader: false` | `next.config.js` |

### Medium (Fix within 1 month)

| # | Issue | Fix | File |
|---|-------|-----|------|
| 12 | No llms.txt | Create llms.txt with company info and page index | `public/llms.txt` |
| 13 | No FAQ sections/schema | Add FAQ sections with FAQPage JSON-LD to service pages | Service page components |
| 14 | Schema type too generic | Change `LocalBusiness` to `ProfessionalService` | `app/layout.js` |
| 15 | No `areaServed` in schema | Add areaServed to structured data | `app/layout.js` |
| 16 | Soft 404s return HTTP 200 | Return proper 404 status for "not found" content | Blog/case page handlers |
| 17 | No contextual internal links | Add related posts/cases sections and in-body links | Page components |
| 18 | Mobile touch targets too small | Increase hamburger, announcement bar links to 48x48px min | Navigation components |
| 19 | Block AI training crawlers | Add CCBot, anthropic-ai, cohere-ai Disallow rules | `app/robots.js` |
| 20 | No Service schema | Add Service JSON-LD to service pages | Service page components |
| 21 | Add lastmod to static sitemap URLs | Query latest content timestamp for listing pages | `app/sitemap.js` |
| 22 | GBP optimization | Claim/optimize Google Business Profile, add Maps embed to contact page | External + contact page |
| 23 | 62 MB video without preload="none" | Add `preload="none"` to video element | Homepage component |
| 24 | No hreflang tags | Add hreflang for nl-NL and en if English version exists | `app/layout.js` |

### Low (Backlog)

| # | Issue | Fix |
|---|-------|-----|
| 25 | No IndexNow | Generate API key, add to public/, submit on publish |
| 26 | No YouTube presence | Publish explainer video on YouTube |
| 27 | Remove priority/changefreq from sitemap | Clean up sitemap.js (ignored by Google) |
| 28 | Add error logging to sitemap catch block | `console.error` in sitemap.js catch |
| 29 | SearchAction schema may be inaccurate | Verify `/blog?q=` works or remove SearchAction |
| 30 | Add reviews/testimonials | Display Google reviews, client testimonials |
| 31 | Add `speakable` schema | Mark key content blocks for voice assistants |
| 32 | Create geo-modified landing pages | Target "AI bureau Utrecht", "AI bureau Amsterdam" |
| 33 | Establish Wikipedia/Wikidata entity | Build third-party press coverage first |
