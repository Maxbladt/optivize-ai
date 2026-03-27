# Optivaize.nl - Schema / Structured Data Audit

**Date:** 2026-03-27
**Site:** https://optivaize.nl
**Business type:** AI Agency (LocalBusiness), De Bilt, Netherlands
**Framework:** Next.js (App Router with server-side rendering)

---

## Executive Summary

The site has a single global JSON-LD block injected via `app/layout.js` containing LocalBusiness, WebSite, and SiteNavigationElement schema. This identical block appears on all 8 audited pages. There are zero page-specific schemas anywhere on the site.

The global schema is well-structured and valid JSON-LD. However, the site is missing significant schema opportunities on service pages, blog posts, case studies, and informational pages. Adding page-specific structured data would unlock rich result eligibility (breadcrumbs, article cards) and strengthen AI/LLM discoverability.

**Findings summary:**
- Critical (missing high-impact schema): 4
- Warning (improvements to existing schema): 4
- Info (nice-to-have additions): 3

---

## 1. Global Schema Validation (All Pages)

All 8 audited pages contain the same JSON-LD block from `app/layout.js`. This block uses a `@graph` array with three entities.

### 1.1 LocalBusiness

**Validation: PASS with warnings**

| Check | Result |
|-------|--------|
| @context is "https://schema.org" | PASS |
| @type is valid and not deprecated | PASS |
| @id uses fragment identifier | PASS |
| Required: name | PASS - "Optivaize" |
| Required: address (PostalAddress) | PASS |
| Recommended: telephone | PASS - "+31642698918" |
| Recommended: openingHoursSpecification | PASS |
| Recommended: geo (GeoCoordinates) | PASS |
| Recommended: sameAs | PASS - 3 profiles |
| Recommended: logo | PASS (string URL) |
| URLs are absolute | PASS |
| No placeholder text | PASS |
| Dates are ISO 8601 | N/A |

**Warnings:**

- **W-01: `logo` is a plain string.** Google recommends `ImageObject` with `url`, `width`, and `height` properties for the logo. The current string URL works but is less optimal.

- **W-02: Missing `addressRegion`.** The PostalAddress is missing `addressRegion`. For the Netherlands, add `"addressRegion": "Utrecht"` (the province where De Bilt is located).

- **W-03: Missing `areaServed`.** For a business serving all of the Netherlands, adding `areaServed` signals the geographic service area to search engines and AI systems.

- **W-04: Missing `foundingDate` and `numberOfEmployees`.** These are recommended properties for LocalBusiness that strengthen business credibility signals and feed AI knowledge panels.

### 1.2 WebSite

**Validation: PASS**

| Check | Result |
|-------|--------|
| @type is valid | PASS |
| @id uses fragment identifier | PASS |
| Required: name | PASS |
| Required: url | PASS |
| Recommended: publisher | PASS - references @id |
| Recommended: inLanguage | PASS - "nl-NL" |
| potentialAction (SearchAction) | PASS |
| SearchAction target format | PASS |

**Note:** The SearchAction points to `https://optivaize.nl/blog?q={search_term_string}`. Verify that this URL actually returns search results. If the blog page does not support query-parameter-based search, Google may eventually drop the sitelinks search box. If it does not work, remove the `potentialAction` block.

### 1.3 SiteNavigationElement

**Validation: PASS**

| Check | Result |
|-------|--------|
| @type is valid | PASS |
| URLs are absolute | PASS |
| All nav items present | PASS - 9 items |

SiteNavigationElement does not produce Google rich results but helps AI/LLM systems understand site structure. No issues found.

---

## 2. Page-by-Page Analysis

### 2.1 Homepage (https://optivaize.nl)

**Existing schema:** LocalBusiness, WebSite, SiteNavigationElement (global)
**Page-specific schema:** None

**Missing opportunities:**

| Priority | Schema Type | Benefit |
|----------|-------------|---------|
| Info | `WebPage` with `speakable` | Helps voice assistants identify key homepage content |

The homepage is adequately covered by the global LocalBusiness and WebSite schema. No critical gaps.

---

### 2.2 AI Agenten - Service Page (https://optivaize.nl/ai-agenten)

**Existing schema:** Global only
**Page-specific schema:** None

**Missing opportunities:**

| Priority | Schema Type | Benefit |
|----------|-------------|---------|
| **Critical** | `Service` | Describes the AI agents service offering, connects it to the LocalBusiness entity |
| **Critical** | `BreadcrumbList` | Enables breadcrumb rich results in Google SERPs. The page has visual breadcrumbs in the UI but no matching schema. |

**Note:** The same gaps apply to all 5 service pages: `/ai-agenten`, `/ai-marketing`, `/ai-sales`, `/automatisering`, `/custom-software`.

---

### 2.3 Blog Listing (https://optivaize.nl/blog)

**Existing schema:** Global only
**Page-specific schema:** None

**Missing opportunities:**

| Priority | Schema Type | Benefit |
|----------|-------------|---------|
| **Critical** | `BreadcrumbList` | Breadcrumb rich results |
| Info | `CollectionPage` | Identifies this as a blog index/listing page |

---

### 2.4 Blog Post (https://optivaize.nl/blog/ai-statistieken-nederland-2026)

**Existing schema:** Global only
**Page-specific schema:** None

**Missing opportunities:**

| Priority | Schema Type | Benefit |
|----------|-------------|---------|
| **Critical** | `BlogPosting` | Enables article rich results with headline, image, date, and author in SERPs. This is the single highest-value missing schema. |
| **Critical** | `BreadcrumbList` | Breadcrumb rich results (Home > Blog > Post Title) |

**Note on FAQPage:** Since Optivaize is a commercial site (not government or healthcare), FAQPage schema will not produce Google rich results as of August 2023. It could benefit AI/LLM citation if GEO is a priority, but is not recommended for Google benefit.

**Data availability:** The `app/blog/[slug]/page.js` file already fetches blog data (title, published_at, author, featured_image, meta_description, excerpt) in `generateMetadata`. This same data can be used to generate BlogPosting JSON-LD server-side.

---

### 2.5 Cases Listing (https://optivaize.nl/cases)

**Existing schema:** Global only
**Page-specific schema:** None

**Missing opportunities:**

| Priority | Schema Type | Benefit |
|----------|-------------|---------|
| **Critical** | `BreadcrumbList` | Breadcrumb rich results |
| Info | `CollectionPage` | Identifies this as a collection/listing page |

---

### 2.6 Case Study - Fonteyn (https://optivaize.nl/cases/fonteyn)

**Existing schema:** Global only
**Page-specific schema:** None

**Missing opportunities:**

| Priority | Schema Type | Benefit |
|----------|-------------|---------|
| **Critical** | `Article` | Enables article rich results for the case study content |
| **Critical** | `BreadcrumbList` | Breadcrumb rich results (Home > Cases > Fonteyn) |

**Data availability:** The `app/cases/[slug]/page.js` file already fetches case data (title_nl, company, preview_nl, image, published_at) in `generateMetadata`.

---

### 2.7 Contact (https://optivaize.nl/contact)

**Existing schema:** Global only
**Page-specific schema:** None

**Missing opportunities:**

| Priority | Schema Type | Benefit |
|----------|-------------|---------|
| **Critical** | `BreadcrumbList` | Breadcrumb rich results |
| Warning | `ContactPage` (WebPage subtype) | Identifies this as a contact page for search engines and AI |

---

### 2.8 Over Ons / About (https://optivaize.nl/over-ons)

**Existing schema:** Global only
**Page-specific schema:** None

**Missing opportunities:**

| Priority | Schema Type | Benefit |
|----------|-------------|---------|
| **Critical** | `BreadcrumbList` | Breadcrumb rich results |
| Warning | `AboutPage` (WebPage subtype) | Identifies this as an about page |
| Info | `Person` entries for team members | Strengthens E-E-A-T signals, helps Google connect authors to their content |

---

## 3. Site-Wide Issues

### Issue 1: No BreadcrumbList on any page (Critical)

Every inner page is missing BreadcrumbList schema. This is one of the highest-value schema types because Google actively renders breadcrumb trails in search results. The AI Agenten page even has visual breadcrumbs in the UI (built with a `Breadcrumb` styled component) but no corresponding structured data.

### Issue 2: No BlogPosting schema on blog posts (Critical)

Blog posts have proper OpenGraph metadata (article type, publishedTime, author) but zero Article/BlogPosting structured data. This means blog posts are ineligible for article rich results (headline, image, date display in SERPs). The data needed to generate BlogPosting schema is already available server-side in `generateMetadata`.

### Issue 3: No Service schema on any service page (Critical)

The site has 5 service pages and none have Service schema. Adding Service schema connects the service offerings to the LocalBusiness entity and strengthens topical relevance signals.

### Issue 4: Identical schema on every page (Warning)

Every page outputs the exact same JSON-LD block from `layout.js`. This is not harmful, but it means Google sees the same LocalBusiness + WebSite block on every URL. The global block should remain, but page-specific schema should be added alongside it in each page's component.

---

## 4. Recommended JSON-LD Additions

### 4A. Enhanced LocalBusiness (update in `app/layout.js`)

Replace the current `logo` string and add missing recommended properties:

```javascript
{
  '@type': 'LocalBusiness',
  '@id': 'https://optivaize.nl/#organization',
  name: 'Optivaize',
  url: 'https://optivaize.nl',
  logo: {
    '@type': 'ImageObject',
    url: 'https://optivaize.nl/uploads/optivaize_logo_new.png',
    width: 600,
    height: 60,
  },
  image: 'https://optivaize.nl/uploads/optivaize_logo_new.png',
  description: 'AI-bureau gespecialiseerd in AI-agents, automatisering, marketing en custom software voor bedrijven in Nederland.',
  telephone: '+31642698918',
  email: 'info@optivaize.nl',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Groenekanseweg 70',
    addressLocality: 'De Bilt',
    addressRegion: 'Utrecht',
    postalCode: '3732 AG',
    addressCountry: 'NL',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 52.1167, longitude: 5.1833 },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
  areaServed: {
    '@type': 'Country',
    name: 'NL',
  },
  knowsLanguage: ['nl', 'en'],
  sameAs: [
    'https://www.linkedin.com/company/optivaize',
    'https://www.instagram.com/optivaize',
    'https://x.com/optivaize',
  ],
  priceRange: '$$',
}
```

**Changes from current:**
- `logo` upgraded from string to ImageObject with width/height (update width/height to actual logo dimensions)
- Added `addressRegion: "Utrecht"`
- Added `areaServed` for geographic coverage
- Added `knowsLanguage` for multilingual signaling

### 4B. BreadcrumbList Component (create new reusable component)

Create a reusable component that can be included in each page:

```jsx
// components/BreadcrumbJsonLd.js
export default function BreadcrumbJsonLd({ items }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
```

Usage example in `app/ai-agenten/page.js`:

```jsx
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://optivaize.nl' },
        { name: 'AI Agents', url: 'https://optivaize.nl/ai-agenten' },
      ]} />
      <Layout><AIAgentsPage /></Layout>
    </>
  );
}
```

**Breadcrumb mappings for all pages:**

| Page | Breadcrumb trail |
|------|-----------------|
| /ai-agenten | Home > AI Agents |
| /ai-marketing | Home > AI Marketing |
| /ai-sales | Home > AI Sales |
| /automatisering | Home > Automatisering |
| /custom-software | Home > Custom Software |
| /blog | Home > Blog |
| /blog/[slug] | Home > Blog > [Post Title] |
| /cases | Home > Cases |
| /cases/[slug] | Home > Cases > [Company Name] |
| /over-ons | Home > Over Ons |
| /contact | Home > Contact |

### 4C. BlogPosting Schema (add to `app/blog/[slug]/page.js`)

Since `generateMetadata` already fetches the blog data, add a server component that generates the JSON-LD. Restructure the page to pass data to both metadata and the JSON-LD script:

```jsx
export default async function Page({ params }) {
  const { slug } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  let blog = null;
  try {
    const res = await fetch(`${baseUrl}/api/blogs/${slug}`, { cache: 'no-store' });
    if (res.ok) blog = await res.json();
  } catch {}

  const blogPostingJsonLd = blog ? {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.meta_description || blog.excerpt,
    url: `https://optivaize.nl/blog/${slug}`,
    datePublished: blog.published_at,
    dateModified: blog.updated_at || blog.published_at,
    author: {
      '@type': 'Person',
      name: blog.author || 'Optivaize',
      url: 'https://optivaize.nl/over-ons',
    },
    publisher: {
      '@id': 'https://optivaize.nl/#organization',
    },
    image: blog.featured_image || 'https://optivaize.nl/uploads/optivaize_logo_new.png',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://optivaize.nl/blog/${slug}`,
    },
    isPartOf: {
      '@id': 'https://optivaize.nl/#website',
    },
    inLanguage: 'nl-NL',
  } : null;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://optivaize.nl' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://optivaize.nl/blog' },
      ...(blog ? [{ '@type': 'ListItem', position: 3, name: blog.title, item: `https://optivaize.nl/blog/${slug}` }] : []),
    ],
  };

  return (
    <>
      {blogPostingJsonLd && (
        <script type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }} />
      )}
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Layout><BlogDetailPage /></Layout>
    </>
  );
}
```

### 4D. Article Schema for Case Studies (add to `app/cases/[slug]/page.js`)

Follow the same pattern as BlogPosting:

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[caseData.title_nl or caseData.company + ' Case Study']",
  "description": "[caseData.preview_nl]",
  "url": "https://optivaize.nl/cases/[slug]",
  "datePublished": "[caseData.published_at or caseData.created_at]",
  "author": {
    "@id": "https://optivaize.nl/#organization"
  },
  "publisher": {
    "@id": "https://optivaize.nl/#organization"
  },
  "image": "[caseData.image or fallback logo]",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://optivaize.nl/cases/[slug]"
  },
  "about": {
    "@type": "Organization",
    "name": "[caseData.company]"
  },
  "inLanguage": "nl-NL"
}
```

### 4E. Service Schema (add to each service page)

Example for `app/ai-agenten/page.js`:

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://optivaize.nl/ai-agenten#service",
  "name": "AI Agents Bouwen",
  "description": "Custom AI-agents die uw bedrijfsprocessen automatiseren. Van e-mail agents tot data-analyse, wij ontwikkelen AI op maat.",
  "url": "https://optivaize.nl/ai-agenten",
  "provider": {
    "@id": "https://optivaize.nl/#organization"
  },
  "serviceType": "AI Agent Development",
  "areaServed": {
    "@type": "Country",
    "name": "NL"
  }
}
```

Repeat for each service page with appropriate name, description, and serviceType:

| Page | Service name | serviceType |
|------|-------------|-------------|
| /ai-agenten | AI Agents Bouwen | AI Agent Development |
| /ai-marketing | AI Marketing | AI Marketing Services |
| /ai-sales | AI Sales | AI Sales Automation |
| /automatisering | Automatisering | Business Process Automation |
| /custom-software | Custom Software | Custom Software Development |

### 4F. ContactPage and AboutPage (add to respective pages)

**Contact page (`app/contact/page.js`):**

```json
{
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Optivaize",
  "description": "Neem contact op met Optivaize. Bel +31 6 42698918 of vul het formulier in.",
  "url": "https://optivaize.nl/contact",
  "mainEntity": {
    "@id": "https://optivaize.nl/#organization"
  }
}
```

**About page (`app/over-ons/page.js`):**

```json
{
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "Over Optivaize",
  "description": "Maak kennis met het Optivaize team. AI-bureau in De Bilt.",
  "url": "https://optivaize.nl/over-ons",
  "mainEntity": {
    "@id": "https://optivaize.nl/#organization"
  }
}
```

---

## 5. Implementation Priority

| Priority | Action | Pages affected | Effort | Impact |
|----------|--------|----------------|--------|--------|
| 1 | Add BreadcrumbList schema | All inner pages (10+) | Medium - create reusable component | High - breadcrumb rich results |
| 2 | Add BlogPosting schema | Blog post pages (dynamic) | Medium - use existing blog data | High - article rich results |
| 3 | Add Service schema | 5 service pages | Low - static JSON-LD per page | Medium - topical relevance |
| 4 | Add Article schema to case studies | Case study pages (dynamic) | Medium - use existing case data | Medium - article rich results |
| 5 | Enhance LocalBusiness (logo ImageObject, areaServed, addressRegion) | Global layout.js | Low - edit existing object | Low-Medium |
| 6 | Add ContactPage/AboutPage types | 2 pages | Low - static JSON-LD | Low |
| 7 | Add Person schema for team members on /over-ons | 1 page | Low-Medium | Low (E-E-A-T signal) |

---

## 6. Schema Types NOT Recommended

- **HowTo** - Rich results removed by Google in September 2023. Do not add.
- **FAQPage** - Google rich results restricted to government/healthcare sites since August 2023. Optivaize is a commercial site, so no Google benefit. Only consider if AI/LLM discoverability (GEO) is a priority.
- **SpecialAnnouncement** - Deprecated July 31, 2025.
- **CourseInfo / LearningVideo** - Retired June 2025.

---

## 7. Post-Implementation Validation

After deploying schema changes, validate every page with:
1. **Google Rich Results Test** - https://search.google.com/test/rich-results
2. **Schema.org Validator** - https://validator.schema.org
3. **Google Search Console** - Monitor the "Enhancements" section for new rich result types appearing

Focus validation on:
- BreadcrumbList producing breadcrumb-eligible results
- BlogPosting producing article-eligible results
- No errors or warnings in the structured data reports
