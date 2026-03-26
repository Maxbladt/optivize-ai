# SEO Action Plan: optivaize.nl

**Generated:** 2026-03-26
**Overall SEO Health Score:** 22 / 100

---

## CRITICAL (Fix Immediately)

### 1. Implement Server-Side Rendering or Pre-rendering
**Impact:** +30-40 points across all categories
**Effort:** HIGH (2-4 weeks)
**Files:** Entire client architecture

This is the #1 blocker. Every other SEO improvement is diminished without it because crawlers see an empty page.

**Options (ordered by effectiveness):**
1. **Next.js migration** (best long-term): SSR/SSG for all public pages, keep admin client-side
2. **Prerendering service** (fastest): Deploy Prerender.io or Rendertron at the Cloudflare/Nginx level to serve static HTML to bot user agents
3. **react-snap** (minimum viable): Pre-render static routes at build time

### 2. Rotate Hardcoded Admin Credentials
**Impact:** Security (not SEO, but critical)
**Effort:** LOW (15 minutes)
**File:** `server/index.js` lines 12-13

- Set `ADMIN_PASSWORD` and `JWT_SECRET` environment variables in production
- Remove or change the fallback defaults in source code
- Verify env vars are set and differ from the committed values

### 3. Add robots.txt
**Impact:** +5 points (Technical SEO)
**Effort:** LOW (30 minutes)
**File:** Create `client/public/robots.txt`

```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin/
Disallow: /stats/
Disallow: /bedankt
Disallow: /api/

Sitemap: https://optivaize.nl/sitemap.xml
```

### 4. Add sitemap.xml
**Impact:** +5 points (Technical SEO)
**Effort:** MEDIUM (2-4 hours)
**File:** `server/index.js` (dynamic generation)

Generate a dynamic sitemap from Express that includes:
- All static public routes (/, /ai-agenten, /ai-marketing, /ai-sales, /automatisering, /custom-software, /ai-business, /ai-chatbot, /ai-training, /over-ons, /contact, /cases, /blog, /hiring, /crypto-blockchain)
- All published blog posts (`/blog/:slug`)
- All published case studies (`/cases/:slug`)

Add a Nginx location block to proxy `/sitemap.xml` to the backend.

### 5. Claim/Verify Google Business Profile
**Impact:** +15-20 points (Local SEO)
**Effort:** LOW (1 hour)

- Create or claim GBP for "Optivaize" at Groenekanseweg 70, 3732 AG, De Bilt
- Primary category: "IT consulting" or "Software company"
- Add all services, hours (Mon-Fri 9:00-18:00), phone, website, photos

---

## HIGH (Fix Within 1 Week)

### 6. Add JSON-LD Structured Data to index.html
**Impact:** +8 points (Schema + AI readiness)
**Effort:** LOW (1-2 hours)
**File:** `client/public/index.html`

Add a `@graph` block with Organization, LocalBusiness/ProfessionalService, and WebSite schemas directly in the HTML shell. This works even without SSR. See `schema-audit.md` for ready-to-use code.

### 7. Fix HTML lang Attribute
**Impact:** +3 points (On-Page + Local SEO)
**Effort:** LOW (5 minutes)
**File:** `client/public/index.html` line 1

Change `<html lang="en">` to `<html lang="nl">`.

### 8. Fix manifest.json Business Name
**Impact:** +2 points (Local SEO, brand consistency)
**Effort:** LOW (5 minutes)
**File:** `client/public/manifest.json`

Change `"Optivize AI"` to `"Optivaize"` in both `short_name` and `name`.

### 9. Implement Code Splitting
**Impact:** +10 points (Performance)
**Effort:** MEDIUM (2-4 hours)
**File:** `client/src/App.js`

Replace static imports with `React.lazy()` for:
- All admin components (AdminLogin, AdminLayout, AdminDashboard, etc.)
- StatsDashboard
- BlogListPage, BlogDetailPage, CaseDetailPage, CasesPage
- Secondary service pages

Expected: Main bundle drops from ~716 KB to ~400-450 KB.

### 10. Add Security Headers
**Impact:** +3 points (Technical SEO) + security improvement
**Effort:** LOW (30 minutes)
**File:** `nginx.conf` or Cloudflare Transform Rules

```nginx
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
```

### 11. Add SEOHead to All Public Pages
**Impact:** +5 points (On-Page SEO, once SSR/prerendering is in place)
**Effort:** MEDIUM (2-3 hours)
**Files:** All page components (HomePage, ContactPage, TeamPage, all service pages, CasesPage)

Each page needs unique: title (with Dutch keywords + location), meta description, canonical URL, OG tags.

### 12. Reduce Google Fonts Weights
**Impact:** +2 points (Performance, LCP improvement ~300-500ms)
**Effort:** LOW (10 minutes)
**File:** `client/public/index.html`

Change from `Inter:wght@300;400;500;600;700;800;900` to `Inter:wght@400;600;700;800`.

---

## MEDIUM (Fix Within 1 Month)

### 13. Fix Hero.js mousemove Performance
**Impact:** +2 points (Performance, INP improvement)
**Effort:** LOW (30 minutes)
**File:** `client/src/components/Hero.js` lines 163-168

Replace `useState` with `useRef` for mouse position. Apply transforms directly to DOM elements instead of triggering React re-renders on every pixel.

### 14. Create llms.txt
**Impact:** +3 points (AI Search Readiness)
**Effort:** LOW (1 hour)
**File:** Create `client/public/llms.txt`

Structured summary of Optivaize for LLM consumption: company name, location, services, differentiators, contact info.

### 15. Build Review Generation System
**Impact:** +5-10 points (Local SEO)
**Effort:** LOW (ongoing)

- Request Google reviews from existing clients
- Add review link to the `/bedankt` thank-you page
- Target 1-2 reviews per week

### 16. Submit to Business Directories
**Impact:** +5 points (Local SEO citations)
**Effort:** MEDIUM (4-6 hours)

Submit to with exact NAP ("Optivaize", "Groenekanseweg 70, 3732 AG De Bilt", "+31 6 42 69 89 18"):
- Gouden Gids
- De Telefoongids
- Clutch.co
- G2.com
- Trustpilot

### 17. Write GDPR-Compliant Privacy Policy
**Impact:** +2 points (Trust signals)
**Effort:** MEDIUM (consult legal)

Current policy is ~4 paragraphs in a modal. Replace with a full, legally compliant privacy policy page.

### 18. Add Cookie Consent Mechanism
**Impact:** +1 point (Trust + compliance)
**Effort:** MEDIUM (4-8 hours)

### 19. Add KvK and BTW Numbers to Footer
**Impact:** +2 points (Trust, Local SEO)
**Effort:** LOW (10 minutes)
**File:** `client/src/components/Footer.js`

### 20. Lazy-Load the 3D Globe
**Impact:** +2 points (Performance)
**Effort:** LOW (30 minutes)
**File:** `client/src/pages/HomePage.js`

Use `React.lazy()` for `InteractiveGlobe` and render only when in viewport.

---

## LOW (Backlog)

### 21. Replace framer-motion with LazyMotion
**Impact:** +1 point (Performance, ~115 KB savings)
**Effort:** MEDIUM

### 22. Implement IndexNow
**Impact:** +1 point (instant indexing for Bing/Yandex)
**Effort:** LOW

### 23. Add Google Maps Embed to Contact Page
**Impact:** +1 point (Local SEO)
**Effort:** LOW

### 24. Standardize Phone/Postal Code Formats
**Impact:** +1 point (NAP consistency)
**Effort:** LOW

### 25. Build External Brand Presence
**Impact:** +5-10 points (AI Search, Authority)
**Effort:** HIGH (ongoing)

- YouTube: AI education content (strongest AI citation correlation at ~0.737)
- LinkedIn: Thought leadership articles
- Reddit: Authentic participation in AI/tech communities
- Dutch tech press: Sprout, Emerce, Tweakers

### 26. Consider Vite Migration
**Impact:** +3 points (Performance, DX)
**Effort:** HIGH

CRA is unmaintained. Vite provides automatic vendor chunking, faster builds, and better tree-shaking.

---

## Estimated Score After All Fixes

| Category | Current | After Critical+High | After All |
|----------|---------|---------------------|-----------|
| Technical SEO | 18 | 55 | 75 |
| Content Quality | 38 | 45 | 65 |
| On-Page SEO | 20 | 50 | 70 |
| Schema | 8 | 45 | 70 |
| Performance | 25 | 50 | 70 |
| AI Search | 12 | 35 | 60 |
| Images | 30 | 35 | 50 |
| **Overall** | **22** | **~47** | **~68** |

The biggest single lever is SSR/prerendering (#1). Without it, the ceiling is roughly 35-40 regardless of all other improvements. With it, the path to 65-70 opens up.
