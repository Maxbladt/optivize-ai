# Schema.org Structured Data Audit - optivaize.nl

**Date:** 2026-03-26
**Site type:** React SPA (client-side rendered, no SSR)

---

## 1. Detection Results

### HTML Shell (`client/public/index.html`)
- **JSON-LD:** None
- **Microdata:** None
- **RDFa:** None
- **Verdict:** The HTML shell contains zero structured data. Since this is a client-rendered SPA, Google may not execute JavaScript reliably enough to pick up dynamically injected schema.

### Existing Schema (injected via JavaScript)

**BlogDetailPage.js** - Article schema (injected dynamically via SEOHead component):
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[blog.title]",
  "description": "[blog.meta_description || blog.excerpt]",
  "image": "[ogImage]",
  "author": { "@type": "Organization", "name": "[blog.author || 'Optivaize']" },
  "publisher": {
    "@type": "Organization",
    "name": "Optivaize",
    "logo": { "@type": "ImageObject", "url": "[origin]/uploads/optivaize_logo_new.png" }
  },
  "datePublished": "[blog.published_at]",
  "dateModified": "[blog.updated_at || blog.published_at]",
  "mainEntityOfPage": { "@type": "WebPage", "@id": "[canonicalUrl]" },
  "url": "[canonicalUrl]"
}
```

**Validation of existing Article schema:**
- PASS: @context is "https://schema.org"
- PASS: @type is valid (Article)
- PASS: Required properties present (headline, image, datePublished, author, publisher)
- INFO: author is typed as Organization, not Person. If blog posts have individual author names, consider using Person type instead.
- WARN: publisher.logo as ImageObject is technically valid but Google now prefers a simple URL string for logo.
- CRITICAL: This schema is injected via client-side JavaScript only. Googlebot may or may not render it. It should also exist in the static HTML or be server-rendered.

### Pages Using SEOHead Component
- BlogListPage.js - SEOHead for meta tags only, no jsonLd prop
- BlogDetailPage.js - SEOHead with jsonLd (Article schema)
- All other pages (HomePage, service pages, TeamPage, ContactPage, CasesPage, CaseDetailPage) - No SEOHead usage at all

---

## 2. Missing Schema Opportunities (Priority Order)

### CRITICAL - Must Implement in Static HTML

#### A. Organization + LocalBusiness (homepage, static index.html)
**Why:** This is the single most important schema for any business website. It tells Google who you are, where you are, and how to reach you. Enables Knowledge Panel eligibility.

#### B. WebSite with SearchAction (homepage, static index.html)
**Why:** Enables sitelinks search box in Google results.

#### C. BreadcrumbList (all pages)
**Why:** Enables breadcrumb rich results. Particularly valuable for service pages and blog posts.

### HIGH - Should Implement

#### D. Service (each service page)
**Why:** Describes your service offerings with structured data. While Service does not trigger a specific rich result type, it strengthens topical relevance and feeds AI/LLM systems.

#### E. BlogPosting (upgrade from Article)
**Why:** BlogPosting is more specific than Article and better matches the content type. The existing Article schema works but BlogPosting is semantically more accurate.

### MODERATE - Good to Have

#### F. ProfilePage (team page /over-ons)
**Why:** Strengthens E-E-A-T signals by connecting team members to the organization.

#### G. FAQPage
**INFO:** Since August 2023, Google restricts FAQ rich results to government and healthcare sites. Optivaize is a commercial AI agency, so FAQPage markup will NOT produce Google rich results. However, it can still benefit AI/LLM citation and discoverability (GEO). Only recommended if you prioritize AI discoverability over pure SEO ROI.

### NOT APPLICABLE
- HowTo: Deprecated (rich results removed September 2023). Do not use.
- Product/Offer: Not an e-commerce site. Not applicable.
- VideoObject: No video content detected on the site.
- JobPosting: The /hiring page could use this if there are specific open positions with structured data (salary, location, etc.).

---

## 3. SPA-Specific Implementation Guidance

Since optivaize.nl is a React SPA without SSR, dynamically injected JSON-LD via the SEOHead component has a significant reliability problem: Googlebot's JavaScript rendering is delayed (days to weeks) and not guaranteed.

**Recommended approach (in order of preference):**

1. **Best: Add critical schemas to the static `index.html`** - Organization, LocalBusiness, and WebSite schema should go directly in the HTML shell since they apply site-wide and do not depend on dynamic data.

2. **Better: Server-side inject via Express middleware** - The Express server (`server/index.js`) already serves the React app. Add middleware that injects page-specific JSON-LD into the HTML before sending it to the client. This gives you static, crawlable schema for every page.

3. **Acceptable: Keep SEOHead for dynamic content** - For blog posts and case studies where data comes from the database, the current SEOHead approach is reasonable as a supplement, but should not be the only schema delivery method.

---

## 4. Ready-to-Use JSON-LD

### 4A. Organization + LocalBusiness (add to index.html)

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://optivaize.nl/#organization",
  "name": "Optivaize",
  "alternateName": "Optivize AI",
  "description": "AI agency specializing in intelligent automation, AI agents, marketing, sales, and custom software solutions for businesses.",
  "url": "https://optivaize.nl",
  "logo": "https://optivaize.nl/uploads/optivaize_logo_new.png",
  "image": "https://optivaize.nl/uploads/optivaize_logo_new.png",
  "telephone": "+31642698918",
  "email": "info@optivaize.nl",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Groenekanseweg 70",
    "addressLocality": "De Bilt",
    "addressCountry": "NL"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 52.1188,
    "longitude": 5.1736
  },
  "sameAs": [
    "https://www.instagram.com/optivaize",
    "https://www.linkedin.com/company/optivaize",
    "https://x.com/optivaize"
  ],
  "knowsAbout": [
    "Artificial Intelligence",
    "AI Agents",
    "Marketing Automation",
    "Sales Automation",
    "Business Process Automation",
    "AI Chatbots",
    "Custom Software Development",
    "AI Training",
    "Blockchain"
  ],
  "foundingDate": "2024",
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "value": 3
  },
  "priceRange": "$$"
}
```

### 4B. WebSite with SearchAction (add to index.html)

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://optivaize.nl/#website",
  "name": "Optivaize",
  "url": "https://optivaize.nl",
  "publisher": {
    "@id": "https://optivaize.nl/#organization"
  },
  "inLanguage": "nl-NL"
}
```

Note: SearchAction (sitelinks search box) is omitted because the site does not have a search results page. If you add site search in the future, add this property:
```json
"potentialAction": {
  "@type": "SearchAction",
  "target": {
    "@type": "EntryPoint",
    "urlTemplate": "https://optivaize.nl/search?q={search_term_string}"
  },
  "query-input": "required name=search_term_string"
}
```

### 4C. BreadcrumbList (example for service pages)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://optivaize.nl"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "AI Agenten",
      "item": "https://optivaize.nl/ai-agenten"
    }
  ]
}
```

Breadcrumb mappings for all service pages:
| Page | Breadcrumb name | URL path |
|------|----------------|----------|
| AI Agenten | AI Agenten | /ai-agenten |
| AI Marketing | AI Marketing | /ai-marketing |
| AI Sales | AI Sales | /ai-sales |
| Automatisering | Automatisering | /automatisering |
| Custom Software | Custom Software | /custom-software |
| AI Business | AI Business | /ai-business |
| AI Chatbot | AI Chatbot | /ai-chatbot |
| AI Training | AI Training | /ai-training |
| Crypto & Blockchain | Crypto & Blockchain | /crypto-blockchain |
| Cases | Cases | /cases |
| Blog | Blog | /blog |
| Over Ons | Over Ons | /over-ons |
| Contact | Contact | /contact |

For blog detail pages, add a 3-level breadcrumb: Home > Blog > [Post Title].

### 4D. Service Schema (one per service page)

Example for AI Agenten:
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AI Agenten",
  "description": "Custom AI agents that automate complex business processes, handle customer interactions, and make intelligent decisions.",
  "provider": {
    "@id": "https://optivaize.nl/#organization"
  },
  "url": "https://optivaize.nl/ai-agenten",
  "areaServed": {
    "@type": "Country",
    "name": "NL"
  },
  "serviceType": "AI Agent Development"
}
```

Repeat this pattern for each service page, updating name, description, url, and serviceType.

### 4E. Improved BlogPosting (upgrade for BlogDetailPage.js)

Replace the existing Article jsonLd object with:
```javascript
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  'headline': blog.title,
  'description': blog.meta_description || blog.excerpt,
  'image': ogImage,
  'author': {
    '@type': 'Person',
    'name': blog.author || 'Optivaize Team'
  },
  'publisher': {
    '@id': 'https://optivaize.nl/#organization'
  },
  'datePublished': blog.published_at,
  'dateModified': blog.updated_at || blog.published_at,
  'mainEntityOfPage': {
    '@type': 'WebPage',
    '@id': canonicalUrl
  },
  'url': canonicalUrl,
  'isPartOf': {
    '@id': 'https://optivaize.nl/#website'
  }
};
```

Changes from current implementation:
- Article upgraded to BlogPosting (more specific)
- author changed from Organization to Person (more accurate for named authors)
- publisher uses @id reference to the Organization defined in index.html (avoids duplication)
- isPartOf links back to WebSite entity

---

## 5. Implementation Plan

### Step 1: Static index.html (do first)
Add a combined JSON-LD script block to `client/public/index.html` containing Organization/LocalBusiness and WebSite as a `@graph`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://optivaize.nl/#organization",
      "name": "Optivaize",
      "alternateName": "Optivize AI",
      "description": "AI agency specializing in intelligent automation, AI agents, marketing, sales, and custom software solutions for businesses.",
      "url": "https://optivaize.nl",
      "logo": "https://optivaize.nl/uploads/optivaize_logo_new.png",
      "image": "https://optivaize.nl/uploads/optivaize_logo_new.png",
      "telephone": "+31642698918",
      "email": "info@optivaize.nl",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Groenekanseweg 70",
        "addressLocality": "De Bilt",
        "addressCountry": "NL"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 52.1188,
        "longitude": 5.1736
      },
      "sameAs": [
        "https://www.instagram.com/optivaize",
        "https://www.linkedin.com/company/optivaize",
        "https://x.com/optivaize"
      ],
      "knowsAbout": [
        "Artificial Intelligence",
        "AI Agents",
        "Marketing Automation",
        "Sales Automation",
        "Business Process Automation",
        "AI Chatbots",
        "Custom Software Development",
        "AI Training",
        "Blockchain"
      ],
      "priceRange": "$$"
    },
    {
      "@type": "WebSite",
      "@id": "https://optivaize.nl/#website",
      "name": "Optivaize",
      "url": "https://optivaize.nl",
      "publisher": {
        "@id": "https://optivaize.nl/#organization"
      },
      "inLanguage": "nl-NL"
    }
  ]
}
</script>
```

### Step 2: Update BlogDetailPage.js
Upgrade the existing Article to BlogPosting with the improved structure from section 4E.

### Step 3: Add BreadcrumbList to SEOHead
Extend the SEOHead component to accept a `breadcrumbs` prop and generate BreadcrumbList schema. Add breadcrumbs to every page that uses SEOHead.

### Step 4: Add SEOHead to all pages
Currently only BlogListPage and BlogDetailPage use SEOHead. Add it to every page, including all service pages with Service schema and breadcrumbs.

### Step 5: Validate
After deployment, test every page with:
- Google Rich Results Test (https://search.google.com/test/rich-results)
- Schema.org Validator (https://validator.schema.org)

---

## 6. Summary Table

| Schema Type | Status | Priority | Rich Result Eligible | Location |
|-------------|--------|----------|---------------------|----------|
| Organization/LocalBusiness | Missing | CRITICAL | Knowledge Panel | index.html (static) |
| WebSite | Missing | CRITICAL | Sitelinks | index.html (static) |
| BreadcrumbList | Missing | CRITICAL | Breadcrumb trail | All pages |
| BlogPosting | Partial (Article exists) | HIGH | Article rich result | BlogDetailPage.js |
| Service | Missing | HIGH | None (topical signal) | Each service page |
| ProfilePage | Missing | MODERATE | None (E-E-A-T signal) | /over-ons |
| FAQPage | Missing | LOW | Not eligible (commercial site) | N/A |
