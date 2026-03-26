# Full SEO Audit Report: optivaize.nl

**Audit Date:** 2026-03-26
**Business:** Optivaize, AI Agency, De Bilt, Netherlands
**Site Stack:** React SPA (Create React App), Express.js, PostgreSQL, Cloudflare

---

## Executive Summary

### Overall SEO Health Score: 22 / 100

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Technical SEO | 22% | 18/100 | 3.96 |
| Content Quality | 23% | 38/100 | 8.74 |
| On-Page SEO | 20% | 20/100 | 4.00 |
| Schema / Structured Data | 10% | 8/100 | 0.80 |
| Performance (CWV) | 10% | 25/100 | 2.50 |
| AI Search Readiness | 10% | 12/100 | 1.20 |
| Images | 5% | 30/100 | 1.50 |
| **Total** | **100%** | | **22.7** |

**Business type detected:** Hybrid (office address + national/international service delivery), IT Services / Digital Agency

### Top 5 Critical Issues

1. **React SPA with no server-side rendering.** Every crawler sees an empty `<div id="root"></div>`. All content, meta tags, structured data, and OG tags are invisible to search engines and AI crawlers.
2. **No robots.txt.** Admin pages (`/admin`, `/stats`) are exposed. No sitemap reference. No crawl directives.
3. **No sitemap.xml.** Search engines have no efficient way to discover the 20+ public pages or dynamic blog/case content.
4. **No structured data.** Zero JSON-LD in the HTML shell. Only blog detail pages inject Article schema via JavaScript (unreliable).
5. **Hardcoded admin credentials in source code.** `server/index.js` lines 12-13 contain fallback password `Groenekanseweg12!` and JWT secret.

### Top 5 Quick Wins

1. **Add robots.txt** to `client/public/` blocking `/admin`, `/stats`, `/bedankt`, `/api` (30 minutes)
2. **Fix manifest.json** business name from "Optivize AI" to "Optivaize" (5 minutes)
3. **Fix `<html lang="en">` to `<html lang="nl">`** in index.html (5 minutes)
4. **Add JSON-LD `@graph` block** (Organization + LocalBusiness + WebSite) to index.html (1 hour)
5. **Reduce Google Fonts** from 7 weights to 4 (400, 600, 700, 800) (10 minutes)

---

## 1. Technical SEO (18/100)

### 1.1 Crawlability: FAIL (5/100)

The site is a client-side-only React SPA. The HTML served to all crawlers is:

```html
<noscript>You need to enable JavaScript to run this app.</noscript>
<div id="root"></div>
```

While Googlebot can execute JavaScript on a delayed "second wave," Bingbot, social media crawlers, and all AI crawlers (GPTBot, ClaudeBot, PerplexityBot) do not execute JavaScript. They see a blank page.

The `SEOHead.js` component dynamically injects meta tags via `document.createElement()`, which is invisible to crawlers that do not execute JS.

**Nginx catch-all routing** (`try_files $uri $uri/ /index.html`) means:
- Every URL returns 200 with identical HTML (including `/asdfghjkl`)
- No proper 404 responses
- Admin pages are served to crawlers

### 1.2 Missing Technical Files

| File | Status |
|------|--------|
| robots.txt | MISSING (returns SPA HTML shell) |
| sitemap.xml | MISSING (returns SPA HTML shell) |
| security.txt | MISSING |
| llms.txt | MISSING |

### 1.3 Security Headers: FAIL (0/6 present)

| Header | Status |
|--------|--------|
| Strict-Transport-Security (HSTS) | MISSING |
| X-Content-Type-Options | MISSING |
| X-Frame-Options | MISSING |
| Content-Security-Policy | MISSING |
| Referrer-Policy | MISSING |
| Permissions-Policy | MISSING |

### 1.4 Admin Exposure

Routes `/admin`, `/admin/login`, `/admin/blogs`, `/admin/cases`, `/admin/presentation` are accessible to crawlers with no `noindex` directives. The hidden stats dashboard at `/stats/123121221213213` is also discoverable from the JS bundle.

### 1.5 URL Structure: PARTIAL (55/100)

**Positive:** Clean, readable URLs with Dutch slugs (`/ai-agenten`, `/automatisering`, `/over-ons`).

**Issues:**
- Mixed language URLs: some Dutch (`/over-ons`), some English (`/hiring`, `/contact`, `/custom-software`)
- `/crypto-blockchain` maps to `SubsidyPage` component (misleading)
- `/bedankt` (thank-you page) is indexable
- No 404 route exists in the React router

### 1.6 IndexNow: NOT IMPLEMENTED

No IndexNow integration for instant indexing of new blog posts and case studies.

---

## 2. Content Quality (38/100)

### 2.1 E-E-A-T Assessment

| Factor | Score | Weight | Weighted |
|--------|-------|--------|----------|
| Experience | 45/100 | 20% | 9.0 |
| Expertise | 50/100 | 25% | 12.5 |
| Authoritativeness | 30/100 | 25% | 7.5 |
| Trustworthiness | 40/100 | 30% | 12.0 |
| **Total** | | | **41.0** |

### 2.2 Experience (45/100)

**Positive:**
- Real case study (Fonteyn): "+180% organic traffic in 3 months," "40+ blogs per month"
- Office photo at a real address
- Client slider component suggesting real relationships
- Partnership with Elevate Digital (CEO previously "Head of AI Implementation" there)

**Missing:**
- No customer testimonials with named individuals
- Statistics like "90% of internal requests automated" lack attribution

### 2.3 Expertise (50/100)

**Positive:**
- Named team: Maximilian Bladt (CEO), Geronimo Saija (Head of Operations), Willem Bladt (Head of Finance)
- LinkedIn profiles linked for all team members
- Technical specificity: OpenClaw framework, Gateway architecture, n8n, fine-tuning GPT models

**Missing:**
- No author bylines on blog posts
- No certifications or formal qualifications
- "15+ specialists in 3 countries" claimed but only 3 people shown

### 2.4 Authoritativeness (30/100)

**Missing:** No KvK number, no external reviews (Google/Trustpilot/Clutch), no press mentions, no industry association memberships, no awards.

### 2.5 Trustworthiness (40/100)

**Positive:** Full contact info, privacy policy, cookie policy, terms PDF available, business hours displayed.

**Missing:** Privacy policy is ~4 short paragraphs (not GDPR-compliant), no cookie consent banner, no BTW/KvK number, contact form goes to external Teamleader URL.

### 2.6 Language Mismatch

`<html lang="en">` but default language is Dutch. Static meta title/description are English. No hreflang tags exist despite bilingual NL/EN content.

### 2.7 Content Depth

| Page | Est. Words (NL) | Status |
|------|-----------------|--------|
| Homepage | 600-800 | Borderline |
| AI Agents | 800-1000 | PASS |
| AI Marketing | 900-1100 | PASS |
| Automation | 800-1000 | PASS |
| About/Over Ons | 400-500 | BORDERLINE |
| Contact | 150-200 | THIN |

Service pages contain substantial content with step-by-step processes. Content quality is good, but invisible behind the JavaScript wall.

---

## 3. On-Page SEO (20/100)

### 3.1 Title Tags

Only the homepage has a static title in the HTML shell: "Optivaize - Transform Your Business with Intelligent AI Solutions" (English, on a Dutch site). All other pages set titles via JavaScript (unreliable for crawlers).

### 3.2 Meta Descriptions

Only the homepage has a static meta description: "Transform your business with intelligent AI solutions. Optivaize provides cutting-edge automation, optimization, and growth strategies." (English, generic, no location signals).

### 3.3 Heading Structure

Good H1/H2 structure exists in JSX components but is entirely invisible to crawlers without JavaScript rendering.

### 3.4 Canonical URLs

Only `BlogListPage` uses canonical URLs. All other pages (homepage, 9 service pages, contact, about, cases) have no canonical tags.

### 3.5 Open Graph Tags

Only blog pages use OG tags via `SEOHead`. Homepage and all service pages have no OG tags, meaning social sharing previews will be broken.

### 3.6 Internal Linking

Good internal link structure exists within the React app (navigation, footer, cross-linking between service pages). However, since all links are React Router `<Link>` components rendered by JavaScript, crawlers that do not execute JS cannot follow any internal links.

---

## 4. Schema / Structured Data (8/100)

### 4.1 Current Implementation

| Page | Schema | Status |
|------|--------|--------|
| Homepage | None | MISSING |
| Service Pages (9) | None | MISSING |
| Blog Detail | Article (JS-injected) | PARTIAL |
| Blog List | None | MISSING |
| Contact | None | MISSING |
| About | None | MISSING |
| Cases | None | MISSING |

### 4.2 Blog Article Schema Issues

- Injected via client-side JS only (unreliable for crawlers)
- `author` typed as `Organization` even for named authors (should be `Person`)
- `publisher.logo` uses nested `ImageObject` (Google prefers simple URL)

### 4.3 Missing Critical Schemas

1. **LocalBusiness / ProfessionalService** (CRITICAL)
2. **Organization** (CRITICAL)
3. **WebSite** with SearchAction (HIGH)
4. **BreadcrumbList** (HIGH)
5. **Service** for each service page (HIGH)
6. **BlogPosting** upgrade from Article (MEDIUM)
7. **ProfilePage** for team page (MEDIUM)

Ready-to-use JSON-LD has been generated in `schema-audit.md`.

---

## 5. Performance / Core Web Vitals (25/100)

### 5.1 Bundle Analysis

| Asset | Size | Issue |
|-------|------|-------|
| main.js | 716 KB (uncompressed) | Single monolithic bundle, no code splitting |
| Google Fonts | 7 weights loaded | Excessive (300, 400, 500, 600, 700, 800, 900) |
| framer-motion | ~140 KB (within bundle) | Large animation library |
| cobe (3D globe) | WebGL shaders + texture | Loaded eagerly on every page |
| styled-components | Runtime CSS-in-JS | CSS generated at runtime |

### 5.2 Core Web Vitals Estimates

| Metric | Estimate | Rating | Target |
|--------|----------|--------|--------|
| LCP | 3.5-5.0s (mobile 4G) | POOR | < 2.5s |
| INP | 200-350ms | NEEDS IMPROVEMENT | < 200ms |
| CLS | 0.0-0.05 | GOOD | < 0.1 |

### 5.3 Key Bottlenecks

1. **No code splitting:** All 20+ pages, admin panel, stats dashboard, styled-components, framer-motion, cobe globe shipped in one bundle. Admin code is downloaded by every public visitor.
2. **Render-blocking fonts:** Google Fonts stylesheet blocks first paint.
3. **`mousemove` handler in Hero.js:** Calls `setState` on every pixel of mouse movement, causing continuous React re-renders.
4. **No content in HTML shell:** Browser shows blank white screen until full JS downloads, parses, and executes.
5. **Cloudflare not caching HTML:** `cf-cache-status: DYNAMIC` on every request.

---

## 6. AI Search Readiness (12/100)

### 6.1 AI Crawler Access

| Crawler | Platform | Can Access? | Can See Content? |
|---------|----------|-------------|-----------------|
| GPTBot | ChatGPT | Yes (no robots.txt) | NO (no JS rendering) |
| OAI-SearchBot | OpenAI Search | Yes | NO |
| ClaudeBot | Claude | Yes | NO |
| PerplexityBot | Perplexity | Yes | NO |
| Googlebot | Google AI Overviews | Yes | PARTIAL (delayed JS rendering) |
| BingBot | Bing Copilot | Yes | PARTIAL (limited JS) |

### 6.2 Platform Scores

| Platform | Score | Notes |
|----------|-------|-------|
| Google AI Overviews | 15/100 | Partial JS rendering, no structured data |
| ChatGPT | 3/100 | Sees empty page |
| Perplexity | 3/100 | Sees empty page |
| Bing Copilot | 10/100 | Limited JS rendering |

### 6.3 Citability Score: 5/100

AI crawlers can extract exactly: one meta description (113 chars) and one title tag. Nothing else. The site is effectively invisible to AI search.

**The irony:** An AI agency selling AI solutions is invisible to AI-powered search platforms.

---

## 7. Images (30/100)

- Images exist but are loaded via JavaScript (invisible to most crawlers)
- No alt text in the static HTML shell
- Favicon uses PNG format (`optivaize_logo_square.png`), works but not optimal
- Team photos exist (`foto_max.png`, `geronimo.png`, `willem.png`)
- No WebP or AVIF optimization detected
- No lazy loading indicators in HTML shell
- manifest.json only references `favicon.ico`

---

## 8. Local SEO (22/100)

### 8.1 NAP Consistency Issues

| Issue | Severity |
|-------|----------|
| manifest.json says "Optivize AI" vs "Optivaize" everywhere else | CRITICAL |
| Phone format varies: `+31 6 42 69 89 18` vs `+31 6 42698918` | MINOR |
| Postal code: `3732 AG` vs `3732AG` | MINOR |

### 8.2 GBP Status: UNCONFIRMED

Unable to verify if a Google Business Profile exists. If not claimed, this is the single highest-impact local SEO action.

### 8.3 Reviews: ZERO

No review signals from any platform. No aggregateRating schema. No review widgets.

### 8.4 Citations: UNKNOWN

No confirmed presence on Dutch directories (Gouden Gids, De Telefoongids) or tech directories (Clutch, G2).

### 8.5 Local Schema: MISSING

No LocalBusiness, ProfessionalService, or areaServed markup. No Google Maps embed (only a plain link).

---

## Security Alert

**Hardcoded credentials in source code** (`server/index.js` lines 12-13):
```javascript
const JWT_SECRET = process.env.JWT_SECRET || 'optivaize-secret-key-change-in-production';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Groenekanseweg12!';
```

If environment variables are not set in production, the admin panel is accessible with publicly visible credentials. **Rotate immediately.**

---

## Brand Consistency Issue

| Source | Name Used |
|--------|-----------|
| Domain | optivaize.nl |
| HTML title | Optivaize |
| manifest.json | Optivize AI |
| Meta description | Optivaize |
| Footer/Contact | Optivaize |

The manifest.json spelling differs from all other sources. This hurts Google entity recognition and brand consistency.

---

## Files Referenced

| File | Key Issues |
|------|-----------|
| `client/public/index.html` | Wrong lang, no schema, no robots/sitemap, generic meta |
| `client/public/manifest.json` | Wrong business name spelling |
| `client/src/App.js` | No code splitting, no 404 route |
| `client/src/components/SEOHead.js` | JS-only meta injection, only used on blog pages |
| `client/src/components/Hero.js` | mousemove setState performance issue |
| `client/src/components/Footer.js` | NAP data source |
| `client/src/LanguageContext.js` | Bilingual content, slight NAP format inconsistencies |
| `nginx.conf` | No security headers, catch-all returns 200 for all URLs |
| `server/index.js` | Hardcoded credentials (lines 12-13) |
