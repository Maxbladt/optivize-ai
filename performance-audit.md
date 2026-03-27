# Core Web Vitals Performance Audit: optivaize.nl

**Date:** 2026-03-27
**Pages audited:** Homepage (`/`) and AI Agents page (`/ai-agenten`)
**Stack:** Next.js (App Router, RSC), styled-components, Cloudflare, framer-motion

---

## 1. Server and Infrastructure

| Metric | Homepage | AI Agents |
|--------|----------|-----------|
| HTTP Status | 200 | 200 |
| TTFB | 56ms | 55ms |
| Total Response Time | 60ms | 61ms |
| HTML Size | 84.8 KB | 74.5 KB |
| Next.js Cache | HIT (SSG) | HIT (SSG) |
| Cache-Control | `s-maxage=31536000, stale-while-revalidate` | same |
| CDN | Cloudflare (AMS) | same |
| Protocol | HTTP/2 (h3 available) | same |

**Verdict:** TTFB is excellent at ~55ms. Static generation is working correctly with aggressive CDN caching. No issues here.

---

## 2. Resource Inventory

### JavaScript (Homepage)

| Chunk | Size (uncompressed) |
|-------|---------------------|
| `fd9d1056` (React/framework) | 168 KB |
| `2117` (framework) | 121 KB |
| `polyfills` | 109 KB |
| `1002` | 100 KB |
| `9604` | 36 KB |
| `1801` | 32 KB |
| `8124` | 27 KB |
| `1451` | 26 KB |
| `page` | 51 KB |
| `966` | 7 KB |
| `webpack` | 3 KB |
| `main-app` | <1 KB |
| `layout` | 1 KB |
| `not-found` | 8 KB |
| **Total JS** | **695 KB (uncompressed)** |

Plus Cloudflare email-decode script.

### CSS

| Source | Size |
|--------|------|
| External CSS (`48f7c349c782d924.css`) | 7.6 KB |
| Inline styled-components CSS | 31.4 KB |
| **Total CSS** | **39 KB** |

### Images (Homepage)

| File | Size | Format | Notes |
|------|------|--------|-------|
| `max_bladt_upclose.png` | **2.44 MB** | PNG | CRITICAL: No lazy loading on desktop |
| `wimhof.png` | **1.85 MB** | PNG | Has lazy loading |
| `passion_icebaths_logo.png` | **819 KB** | PNG | Preloaded unnecessarily |
| `stakepvp_logo.png` | **451 KB** | PNG | Preloaded unnecessarily |
| `sony.png` | **192 KB** | PNG | Preloaded unnecessarily |
| `openclaw_cool.png` | 164 KB | PNG | Preloaded unnecessarily |
| `aanhuis.png` | 139 KB | PNG | Preloaded unnecessarily |
| `optivaize_logo_new.png` | 108 KB | PNG | Preloaded (appropriate) |
| `marie_stella_maris.png` | 52 KB | PNG | Preloaded unnecessarily |
| `fonteyn.png` | 45 KB | PNG | Preloaded unnecessarily |
| `freebird.png` | 14 KB | PNG | Preloaded unnecessarily |
| `blosh.png` | 12 KB | PNG | Preloaded unnecessarily |
| `red_button_logo.png` | 10 KB | PNG | Preloaded unnecessarily |
| **Total Images** | **~6.3 MB** | | |

### Video

| File | Size | Format |
|------|------|--------|
| `Openclaw intro.mp4` | **62 MB** | MP4 |

### Font

| File | Size | Format |
|------|------|--------|
| Inter (woff2 subset) | preloaded | woff2 |

Font loading is done correctly: `next/font` with `display: 'swap'` and woff2 preload.

---

## 3. Core Web Vitals Risk Assessment

### LCP (Largest Contentful Paint) - HIGH RISK

**Estimated status: Needs Improvement to Poor (likely 3.0-5.0s on mobile)**

Issues identified:

1. **No `next/image` usage anywhere in the codebase (0 instances).** All images use raw `<img>` tags. This means:
   - No automatic WebP/AVIF conversion
   - No responsive `srcset` generation (0 srcset attributes found)
   - No automatic size optimization
   - No blur placeholder for perceived performance

2. **Massive unoptimized images.** The hero area likely renders `max_bladt_upclose.png` (2.44 MB PNG) or the video preview (`openclaw_cool.png`, 164 KB) as the LCP element. On mobile, downloading a 2.44 MB PNG over 4G will push LCP well past 2.5s.

3. **Excessive preloading (11 image preloads).** The homepage preloads 11 images in the `<head>`, including all client logos for the scrolling carousel. Preloading competes for bandwidth with the actual LCP element and delays it. Only the LCP image and the logo should be preloaded.

4. **62 MB video file.** While the video appears to use a click-to-play pattern (not autoplay), the `<video>` element has no `preload="none"` attribute, so the browser may begin buffering the video immediately, competing with LCP resources.

5. **All images are PNG format.** No WebP or AVIF is used anywhere. PNG files are typically 2-5x larger than WebP equivalents for photographic content.

### INP (Interaction to Next Paint) - MODERATE RISK

**Estimated status: Good to Needs Improvement (likely 150-300ms)**

Issues identified:

1. **695 KB of JavaScript (uncompressed).** After gzip, this is likely ~200-250 KB transferred, which is acceptable but not great. The main concern is parse and execution time on low-end mobile devices.

2. **framer-motion used in 29 files.** This library is heavy (~30-50 KB gzipped itself) and runs animations on the main thread. Every `motion.div` component adds event listeners and layout calculations. On pages with many animated sections, scroll-triggered animations can cause long tasks that delay interaction responses.

3. **styled-components runtime.** The `'use client'` directive on HomePage.js means the entire homepage component tree hydrates on the client. styled-components adds runtime CSS-in-JS overhead during hydration, generating and injecting styles.

4. **No evidence of React.lazy for below-fold sections.** Only `InteractiveGlobe` is lazily loaded. Other heavy sections (testimonials, process steps, FAQ, contact form) all hydrate eagerly.

5. **Cloudflare email-decode script.** An additional third-party script runs on the main thread.

### CLS (Cumulative Layout Shift) - MODERATE RISK

**Estimated status: Needs Improvement (likely 0.05-0.15)**

Issues identified:

1. **Images without explicit width/height attributes.** Out of 25 `<img>` tags on the homepage, only 1 has a `width` attribute and 0 have `height` attributes. This means the browser cannot reserve space for images before they load, causing layout shifts when they appear.

2. **Client logo carousel without reserved dimensions.** The scrolling client logo strip uses images without width/height, wrapped in a container with `width: 180px; height: 80px`. The container has fixed dimensions (good), but the images inside do not, which can still cause micro-shifts.

3. **Styled-components FOUC risk.** While SSR is configured for styled-components (`StyledComponentsRegistry`), the 31.4 KB of inline CSS in `<style data-styled>` tags means the styling is present on first paint. However, client-side hydration can cause brief style recalculations.

4. **Fixed navbar height (76px desktop, 64px mobile).** This is good practice as it reserves space. However, there is a "sticky" announcement banner above the navbar with no explicit height reservation visible in the CSS, which could shift content if loaded asynchronously.

5. **No `font-display` in the external CSS file.** The `next/font` setup uses `display: 'swap'` correctly, which prevents invisible text but can cause text reflow. The font is preloaded, which mitigates this.

---

## 4. Missing Performance Optimizations

### Not Present

- `preconnect` hints: **0 found.** The AI agents page loads images from `cdn.simpleicons.org` but has no `<link rel="preconnect">` for that domain.
- `dns-prefetch` hints: **0 found.**
- `fetchpriority="high"` on LCP image: **Not used.**
- `next/image` component: **Not used at all (0 imports).**
- WebP/AVIF image formats: **0 instances.**
- `srcset` responsive images: **0 instances.**
- `preload="none"` on video: **Missing.**
- `loading="lazy"` on below-fold images: Only 2 out of 25 images have it.
- Content-Security-Policy header: Not observed.
- `content-encoding: br` (Brotli): Not observed on image responses (only gzip inferred from Cloudflare).

### Present and Working Well

- SSG with CDN caching (excellent TTFB)
- Font preload with woff2 subset
- `font-display: swap`
- `async` attribute on all JS chunks (14 scripts)
- Code splitting via Next.js (page-level chunks)
- `React.lazy` for InteractiveGlobe component
- HTTP/2 multiplexing
- Cloudflare CDN with edge caching
- 30-day image cache-control headers

---

## 5. Prioritized Recommendations

### P0: Critical Impact (expected to significantly improve LCP)

**1. Adopt `next/image` for all images**
Replace every `<img>` tag with the Next.js `<Image>` component. This single change provides:
- Automatic WebP/AVIF conversion (50-80% size reduction)
- Responsive `srcset` at appropriate breakpoints
- Automatic lazy loading for below-fold images
- Built-in blur placeholder support
- Automatic width/height (fixes CLS)

Expected LCP improvement: 1.0-2.5s on mobile.

**2. Compress the two largest images**
- `max_bladt_upclose.png` (2.44 MB): Convert to WebP, target ~100-150 KB
- `wimhof.png` (1.85 MB): Convert to WebP, target ~80-120 KB
- `passion_icebaths_logo.png` (819 KB): Convert to WebP or SVG, target ~30 KB
- `stakepvp_logo.png` (451 KB): Convert to WebP or SVG, target ~20 KB

Expected LCP improvement: 1.5-3.0s on 4G mobile.

**3. Fix preload strategy**
Remove the 10 unnecessary image preloads. Keep only:
- The font preload (already correct)
- The logo preload
- The LCP image preload (with `fetchpriority="high"`)

Currently, preloading 11 images forces the browser to download ~1.9 MB of non-critical images at high priority, directly competing with the actual LCP resource.

### P1: High Impact

**4. Add `loading="lazy"` to all below-fold images**
Only 2 of 25 images currently have lazy loading. All client logos, case study images, and footer images should be lazy loaded.

**5. Add explicit `width` and `height` to every `<img>` tag**
This prevents layout shifts when images load. With `next/image`, this is handled automatically.

**6. Set `preload="none"` on the video element**
The 62 MB video should not begin buffering until the user clicks play. Add `preload="none"` to the `<video>` tag.

**7. Add `preconnect` for third-party origins**
On the AI agents page, add:
```html
<link rel="preconnect" href="https://cdn.simpleicons.org" crossorigin />
```

### P2: Medium Impact

**8. Reduce framer-motion usage or use CSS animations**
Consider replacing simple fade/slide animations with CSS `@keyframes` and `IntersectionObserver`. framer-motion adds significant JS weight and main-thread work. For critical above-the-fold content, avoid animation entirely to reduce hydration cost.

**9. Lazy-load below-fold page sections**
Use `React.lazy` and `Suspense` for below-fold sections (testimonials, process, FAQ, CTA). This reduces the initial JS parse and hydration cost.

**10. Consider moving off styled-components**
styled-components uses a client-side runtime for CSS injection. Migrating to CSS Modules or Tailwind CSS would eliminate the 31.4 KB inline CSS overhead and remove the runtime JS cost. This is a larger effort but would improve both LCP and INP.

### P3: Lower Impact (polish)

**11. Serve logos as SVG instead of PNG**
Client logos (aanhuis, blosh, fonteyn, etc.) are simple graphics that would be much smaller as SVGs and would render crisply at any size.

**12. Use AVIF as the primary format with WebP fallback**
AVIF provides 30-50% smaller files than WebP for photographic content.

**13. Enable Brotli compression for all text assets**
Cloudflare supports Brotli, which provides ~15-20% better compression than gzip for HTML, CSS, and JS.

**14. Inline critical CSS and defer the external stylesheet**
The external CSS file (7.6 KB) blocks rendering. Inline the critical above-the-fold portion and load the rest asynchronously.

---

## 6. Summary

| Metric | Current Estimate | Target | Primary Blocker |
|--------|-----------------|--------|-----------------|
| **LCP** | 3.0-5.0s (mobile) | ≤2.5s | Unoptimized PNG images, excessive preloads |
| **INP** | 150-300ms | ≤200ms | framer-motion, styled-components hydration |
| **CLS** | 0.05-0.15 | ≤0.1 | Missing width/height on images |
| **TTFB** | 55ms | ≤200ms | Already excellent |

The most impactful single change is adopting `next/image` across the site. This would address image format optimization, responsive sizing, lazy loading, and CLS dimension issues simultaneously. Combined with removing excessive preloads and compressing the two largest images, LCP should drop below the 2.5s threshold on most connections.
