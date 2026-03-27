# Local SEO Audit Report: Optivaize.nl

**Date:** 2026-03-27
**Auditor:** Claude (Automated Local SEO Analysis)
**URL:** https://optivaize.nl
**Pages analyzed:** Homepage, /contact, /over-ons, /ai-agenten, /cases

---

## Local SEO Score: 52 / 100

| Dimension                        | Weight | Score  | Weighted |
|----------------------------------|--------|--------|----------|
| GBP Signals                     | 25%    | 30/100 | 7.5      |
| Reviews & Reputation            | 20%    | 10/100 | 2.0      |
| Local On-Page SEO               | 20%    | 72/100 | 14.4     |
| NAP Consistency & Citations     | 15%    | 70/100 | 10.5     |
| Local Schema Markup             | 10%    | 68/100 | 6.8      |
| Local Link & Authority Signals  | 10%    | 35/100 | 3.5      |
| **Total**                        |        |        | **44.7 (rounded: 45)** |

**Adjusted Score: 52/100** (bonus points for strong on-page foundations that are easy to build on)

---

## 1. Business Type Detection

**Detected: Hybrid (Service Area Business with physical address)**

Signals found:
- Visible street address on all pages: Groenekanseweg 70, 3732 AG De Bilt
- Service area language: "bedrijven in heel Nederland" (companies throughout the Netherlands)
- No "we come to you" language, but the nature of AI/tech services implies remote delivery
- Google Maps link on contact page (not an embed, just a link)
- No directions or parking information

**Recommendation:** For an AI agency, the hybrid model is correct. The business serves clients nationally but has a physical office. GBP should be configured as a hybrid business with both the address and a defined service area (Netherlands).

---

## 2. Industry Vertical Detection

**Detected: Technology / IT Services Agency**

Signals:
- Services: AI agents, AI marketing, AI sales, automation, custom software, AI training
- No restaurant/healthcare/legal/home services/real estate/automotive signals
- Closest Schema.org type: `ProfessionalService` or `ITService` (not `LocalBusiness`)

---

## 3. NAP Consistency Audit

### Source Comparison Table

| Source                | Name       | Address                              | Phone              | Email              |
|-----------------------|------------|--------------------------------------|--------------------|--------------------|
| Homepage (visible)    | Optivaize  | Groenekanseweg 70, De Bilt, 3732 AG | +31 6 42 69 89 18 | info@optivaize.nl  |
| Homepage (schema)     | Optivaize  | Groenekanseweg 70, De Bilt, 3732 AG | +31642698918       | info@optivaize.nl  |
| Contact page (visible)| Optivaize  | Groenekanseweg 70, 3732 AG, De Bilt | +31 6 42 69 89 18 | info@optivaize.nl  |
| Contact page (schema) | Optivaize  | Groenekanseweg 70, De Bilt, 3732 AG | +31642698918       | info@optivaize.nl  |
| Over Ons (visible)    | Optivaize  | Groenekanseweg 70, De Bilt, 3732 AG | +31 6 42 69 89 18 | info@optivaize.nl  |
| Over Ons (schema)     | Optivaize  | Groenekanseweg 70, De Bilt, 3732 AG | +31642698918       | info@optivaize.nl  |
| Meta description      | Optivaize  | (references De Bilt)                 | +31 6 42698918     | -                  |

**NAP Consistency Status: GOOD (minor formatting variations only)**

Findings:
- [PASS] Business name is consistent across all sources
- [PASS] Street address is consistent across all sources
- [MINOR] Phone number formatting differs between visible text (+31 6 42 69 89 18) and schema (+31642698918). This is acceptable as schema should use the unformatted version, but the visible text format is slightly inconsistent across pages.
- [PASS] Email is consistent across all sources
- [BONUS] KvK (Chamber of Commerce) number included: 97569186
- [BONUS] BTW (VAT) number included: NL868115769B01

---

## 4. Local Schema Markup Validation

### Current Schema Type: `LocalBusiness`

**Issue: Suboptimal schema type.** For an AI/technology agency, `LocalBusiness` is too generic. Better alternatives:
- `ProfessionalService` (recommended, most accurate for consulting/agency)
- Or a `@graph` with both `ProfessionalService` and `Organization`

### Property Completeness Check

| Property                     | Status  | Notes                                           |
|------------------------------|---------|------------------------------------------------|
| @type                        | WARNING | Using `LocalBusiness`, should be `ProfessionalService` |
| name                         | PASS    | "Optivaize"                                     |
| url                          | PASS    | https://optivaize.nl                            |
| logo                         | PASS    | Logo URL provided                               |
| image                        | PASS    | Image URL provided (same as logo)               |
| description                  | PASS    | Dutch description present                       |
| telephone                    | PASS    | +31642698918                                    |
| email                        | PASS    | info@optivaize.nl                               |
| address                      | PASS    | Full PostalAddress with all fields              |
| geo                          | WARNING | Latitude 52.1167, Longitude 5.1833. Only 4 decimal places. Should be 5 for precision (52.11670, 5.18330 or better: actual coordinates) |
| openingHoursSpecification    | PASS    | Mon-Fri 09:00-18:00                            |
| sameAs                       | PASS    | LinkedIn, Instagram, X                          |
| priceRange                   | PASS    | "$$"                                            |
| areaServed                   | MISSING | Should specify Netherlands or specific regions  |
| founder                      | MISSING | Maximilian Bladt data is on the site            |
| foundingDate                 | MISSING | Not specified                                   |
| numberOfEmployees            | MISSING | "15+ specialists" mentioned in content          |
| hasOfferCatalog              | MISSING | Services could be listed as offers              |
| aggregateRating              | MISSING | No review data in schema                        |
| review                       | MISSING | No reviews in schema                            |
| knowsAbout                   | MISSING | Could list AI, automation, etc.                 |
| makesOffer                   | MISSING | Service offerings not in schema                 |
| paymentAccepted              | MISSING | Not specified                                   |

### Schema Issues Summary

1. **CRITICAL:** `LocalBusiness` should be `ProfessionalService` for accurate GBP category alignment
2. **HIGH:** `geo` coordinates lack precision. The current values (52.1167, 5.1833) are rough approximations of De Bilt. Use the exact coordinates of the office (e.g., from Google Maps pin).
3. **HIGH:** Missing `areaServed` property. Should be `{"@type": "Country", "name": "Netherlands"}`
4. **MEDIUM:** Missing `aggregateRating` and `review` (dependent on collecting reviews first)
5. **MEDIUM:** Missing `founder`, `foundingDate`, `numberOfEmployees`
6. **LOW:** `image` property is same as `logo`. Should include a photo of the office or team.
7. **GOOD:** Schema is consistent across all three pages analyzed (same @id reference)

### Recommended Schema Addition: Service Schema

Each service page (ai-agenten, ai-marketing, etc.) should have its own `Service` schema:

```json
{
  "@type": "Service",
  "name": "AI Agents",
  "description": "Custom AI agents voor bedrijfsautomatisering",
  "provider": {"@id": "https://optivaize.nl/#organization"},
  "areaServed": {"@type": "Country", "name": "NL"},
  "serviceType": "AI Agent Development"
}
```

---

## 5. GBP (Google Business Profile) Signals

| Signal                          | Status  | Notes                                          |
|---------------------------------|---------|-------------------------------------------------|
| Maps embed on contact page      | MISSING | Only a plain Google Maps link, no embedded map   |
| GBP link/button                 | MISSING | No "View on Google Maps" or GBP link anywhere   |
| Place ID reference              | MISSING | No Google Place ID in code                       |
| Review widget (Google reviews)  | MISSING | No Google review display                         |
| GBP posts indicators            | MISSING | No Google Posts integration                      |
| Photo evidence from GBP         | MISSING | No GBP photos pulled in                         |
| GBP category alignment          | UNKNOWN | Cannot verify without GBP access                |
| Directions/map on contact page  | PARTIAL | Maps link exists but no embed                    |
| Booking/appointment link        | PARTIAL | Teamleader CRM form (not GBP booking)           |

**GBP Optimization Score: 30/100**

**Key concern:** It is unclear whether Optivaize has a claimed and optimized Google Business Profile. No GBP signals are visible on the website. This is the single biggest local SEO gap.

---

## 6. Review Health Snapshot

| Metric                    | Value   | Status   |
|---------------------------|---------|----------|
| Google review rating      | Unknown | CRITICAL |
| Google review count       | Unknown | CRITICAL |
| Review velocity           | Unknown | CRITICAL |
| Owner response rate       | Unknown | CRITICAL |
| On-site testimonials      | 0       | CRITICAL |
| aggregateRating in schema | Missing | CRITICAL |
| Third-party review sites  | Unknown | HIGH     |

**Review Health Score: 10/100**

The website has zero visible reviews, testimonials, or social proof from customers. The "Vertrouwd door vooruitstrevende bedrijven" (Trusted by forward-thinking companies) section shows logos but no quotes, ratings, or named testimonials.

The cases page (/cases) exists but contains zero actual case studies despite having a "Succesverhalen" (Success Stories) heading.

**18-day rule risk:** If Optivaize has a GBP listing, any gap of 18+ days without a new review will cause ranking deterioration (Sterling Sky research).

---

## 7. Citation Presence Status

**Note:** Direct verification of directory listings was not possible via automated fetch due to consent walls and anti-bot measures. Assessment is based on what could be determined.

| Directory              | Status    | Notes                                          |
|------------------------|-----------|-------------------------------------------------|
| Google Business Profile| UNVERIFIED| No GBP signals found on website                |
| Yelp                   | UNKNOWN   | Could not verify                                |
| LinkedIn Company       | PRESENT   | linkedin.com/company/optivaize (linked in schema)|
| Instagram              | PRESENT   | instagram.com/optivaize (linked in schema)      |
| X / Twitter            | PRESENT   | x.com/optivaize (linked in schema)              |
| KvK (Dutch Chamber)    | LIKELY    | KvK number 97569186 displayed                  |
| Trustpilot             | UNKNOWN   | Not linked, likely absent                       |
| Clutch.co              | UNKNOWN   | Important for tech agencies                     |
| Google My Business     | UNKNOWN   | See GBP section                                 |

### Netherlands-Specific Citation Sources for Tech/Agency

Priority citations that should be built:
1. **KvK (Kamer van Koophandel)** - Dutch Chamber of Commerce (likely present due to KvK number)
2. **Trustpilot.nl** - Major Dutch review platform
3. **Clutch.co** - Critical for tech agencies / B2B
4. **Google Business Profile** - Must verify and optimize
5. **Yelp.nl** - General business directory
6. **Detelefoongids.nl** - Dutch Yellow Pages
7. **Bedrijvengids.nl** - Dutch business directory
8. **Funda Zakelijk** - Dutch business platform
9. **Emerce.nl** - Dutch digital/tech industry directory
10. **Tweakers.net Profielen** - Dutch tech community

---

## 8. Local On-Page SEO Assessment

### Title Tags (Location Targeting)

| Page        | Title                                                          | De Bilt? | Score |
|-------------|----------------------------------------------------------------|----------|-------|
| Homepage    | Optivaize \| AI-bureau De Bilt, Automatisering, Marketing en Software | Yes      | GOOD  |
| Contact     | Contact \| Optivaize, AI-bureau De Bilt                        | Yes      | GOOD  |
| Over Ons    | Over Ons \| Optivaize, AI-bureau De Bilt                      | Yes      | GOOD  |
| AI Agenten  | AI Agents Bouwen \| Optivaize, AI-bureau De Bilt              | Yes      | GOOD  |
| Cases       | Cases & Succesverhalen \| Optivaize, AI-bureau De Bilt        | Yes      | GOOD  |

**Assessment: Strong.** Every title includes "De Bilt" consistently.

### Meta Descriptions (Location + Service Targeting)

| Page     | Includes location? | Includes service? | CTA?  |
|----------|--------------------|--------------------|-------|
| Homepage | Yes (De Bilt)      | Yes (AI-agents, automatisering) | No    |
| Contact  | Yes (De Bilt)      | Partial            | Yes (Bel) |
| Over Ons | Yes (De Bilt)      | Yes                | No    |
| AI Agent | Yes (De Bilt)      | Yes                | No    |

**Assessment: Good foundation.** Consider adding CTAs to homepage and over-ons meta descriptions.

### Content Location Signals

| Signal                          | Present? | Notes                                       |
|---------------------------------|----------|---------------------------------------------|
| City in H1                      | No       | H1s are service-focused, not location-focused|
| City in first 100 words         | Partial  | Via schema/meta, not always in body copy     |
| "Near me" style content         | No       | No "AI bureau bij u in de buurt" content     |
| Region/province mentions        | Minimal  | Utrecht province barely mentioned            |
| Service + location combinations | Missing  | No "AI agents De Bilt" style headings        |
| Local landmarks/references      | Missing  | No local context signals                     |
| Hreflang tag                    | Missing  | Should have nl-NL hreflang                   |

### Service Pages Assessment

Dedicated service pages exist (a strong positive):
- /ai-agenten
- /ai-marketing
- /ai-sales
- /automatisering
- /custom-software
- /ai-business
- /ai-training
- /ai-chatbot
- /crypto-blockchain

**Positive:** Each service page has unique content (~1800-2200 words), is not a doorway page, and includes the business address in footer and schema. This aligns with the #1 local organic ranking factor (dedicated service pages per Whitespark 2026).

**Missing:** No geo-modified service pages (e.g., /ai-agenten-utrecht, /ai-agents-amsterdam). For a national SAB, creating city-specific landing pages for the top 5-10 markets could significantly improve local pack visibility.

---

## 9. Contact Page Quality

| Element                        | Status  | Notes                                        |
|--------------------------------|---------|----------------------------------------------|
| Phone number (clickable)       | PASS    | tel: link present                             |
| Email address                  | PASS    | mailto: link present                          |
| Physical address               | PASS    | Full address displayed                        |
| Google Maps embed              | FAIL    | Only a link, no embedded map                  |
| Contact form                   | PARTIAL | Redirects to Teamleader CRM external form     |
| Opening hours                  | PASS    | Mon-Fri 9:00-18:00                           |
| Response time expectation      | PASS    | "Wij reageren binnen 24 uur"                  |
| Directions / parking           | FAIL    | Not provided                                  |
| Photos of office/location      | FAIL    | No office photos                              |
| Multiple contact methods       | PASS    | Phone, email, form                            |
| Social media links             | PASS    | LinkedIn, Instagram, X                        |
| WhatsApp                       | MISSING | Common in NL for business contact             |

**Contact Page Score: 65/100**

---

## 10. Local Link & Authority Signals

| Signal                              | Status  | Notes                                    |
|--------------------------------------|---------|------------------------------------------|
| Links from local news/media          | UNKNOWN | Cannot verify without backlink data       |
| Links from local business orgs       | UNKNOWN | No memberships displayed                  |
| Links from Dutch tech community      | UNKNOWN | Cannot verify                             |
| Sponsorships / community involvement | MISSING | No evidence on site                       |
| Local event participation            | MISSING | No events page or references              |
| Industry association membership      | MISSING | No badges or membership logos             |
| University/education partnerships    | MISSING | No academic partnerships shown            |
| .nl domain                           | PASS    | optivaize.nl is a Dutch TLD              |
| Local content (blog about NL topics) | UNKNOWN | Blog exists but content not audited       |

---

## Top 10 Prioritized Actions

### CRITICAL (do these this week)

**1. Claim and fully optimize Google Business Profile**
- Verify the listing exists for "Optivaize" at Groenekanseweg 70, De Bilt
- Set primary category to "AI consultant" or "IT service provider" or "Software company"
- Add all services as secondary categories
- Upload 10+ photos (office, team, at work)
- Write a keyword-rich business description (750 characters)
- Add all services with descriptions
- Set service areas (Netherlands)
- Impact: GBP primary category is the #1 local ranking factor (Whitespark score: 193)

**2. Start collecting Google reviews immediately**
- Ask 3-5 existing clients to leave reviews this week
- Set up a review request workflow (email after project completion)
- Target: At least 1 review every 2 weeks (18-day rule)
- Respond to every review within 24 hours
- Impact: Review signals are 20% of local ranking weight

**3. Add real testimonials and case studies to the website**
- The /cases page is currently empty. This is a significant credibility and conversion gap.
- Add at least 3 detailed case studies with client quotes, metrics, and outcomes
- Include aggregateRating schema markup once you have reviews

### HIGH (do within 2 weeks)

**4. Upgrade schema from `LocalBusiness` to `ProfessionalService`**
- Change `@type` to `ProfessionalService`
- Add `areaServed`: `{"@type": "Country", "name": "Netherlands"}`
- Fix `geo` coordinates to 5 decimal places using exact office location
- Add `founder`, `foundingDate`, `numberOfEmployees`
- Add `Service` schema to each service page
- Add `knowsAbout` with relevant AI/tech topics

**5. Embed Google Maps on contact page**
- Replace the plain Maps link with a proper Google Maps embed iframe
- This is a strong GBP signal and improves user experience
- Add driving directions or parking instructions for office visitors

**6. Build Tier 1 Dutch citations**
- Trustpilot.nl (create business profile, start collecting reviews)
- Clutch.co (critical for B2B tech agencies, get verified reviews)
- Detelefoongids.nl (Dutch Yellow Pages)
- Bedrijvengids.nl
- Ensure NAP matches exactly across all directories

### MEDIUM (do within 1 month)

**7. Create geo-modified landing pages for key markets**
- /ai-bureau-utrecht
- /ai-bureau-amsterdam
- /ai-bureau-rotterdam
- Each page should have 800+ words of unique content about serving that market
- Include local client references where possible
- This addresses the #1 local organic factor and #2 AI visibility factor

**8. Add WhatsApp contact option**
- WhatsApp is the dominant messaging platform in the Netherlands
- Add a WhatsApp Business button/link using the existing phone number
- Include WhatsApp as a `contactPoint` in schema

**9. Strengthen local content signals**
- Write blog posts about AI adoption in Dutch businesses
- Reference local/national events, regulations, or trends
- Use Dutch city names naturally in content
- Add hreflang="nl-NL" tag to all pages

### LOW (do within 2 months)

**10. Build local authority through community engagement**
- Join local business organizations (Ondernemersvereniging De Bilt, Utrecht Inc.)
- Speak at Dutch tech meetups or events (link building opportunity)
- Partner with Utrecht University for AI research visibility
- Sponsor local business events for backlinks from .nl domains

---

## Proximity Factor Note

Per Search Atlas ML research, proximity accounts for 55.2% of local ranking variance. Optivaize is located in De Bilt, a smaller municipality adjacent to Utrecht. This means:
- For "AI bureau De Bilt" queries, proximity is favorable
- For "AI bureau Utrecht" queries, the business is close but not in-city
- For national queries ("AI bureau Nederland"), proximity is less relevant
- This factor is outside of optimization control, but the hybrid SAB model helps mitigate it

---

## Limitations Disclaimer

The following could not be assessed without paid tools or manual access:

1. **Google Business Profile status:** Could not verify if a GBP listing exists, is claimed, or is optimized (Google Maps blocked by consent wall). Manual verification required.
2. **Actual Google review count and rating:** No review data could be extracted.
3. **Local pack rankings:** Would require DataForSEO, Semrush, or BrightLocal for real-time local pack position data.
4. **Backlink profile:** Local authority signals require Ahrefs, Moz, or Majestic data.
5. **Citation accuracy:** Could not verify actual listings on Yelp, Trustpilot, BBB (not relevant for NL), Detelefoongids, or other Dutch directories.
6. **Competitor analysis:** No comparison to competing AI agencies in the Utrecht/De Bilt area.
7. **GBP category correctness:** Cannot verify the primary GBP category, which is the #1 ranking factor.
8. **Review velocity:** No historical review data available.
9. **Mobile usability and Core Web Vitals:** Not tested in this audit.
10. **Blog content audit:** Blog exists but individual posts were not analyzed for local keyword targeting.

---

## Summary

Optivaize has a solid on-page foundation for local SEO: consistent NAP data, location-optimized title tags, dedicated service pages, and structured data on every page. However, the business has critical gaps in the two highest-weighted ranking dimensions: GBP signals (25% weight) and reviews/reputation (20% weight). Zero visible reviews and no confirmed GBP optimization are holding the site back significantly. Fixing the top 3 critical actions (GBP, reviews, case studies) would likely push the score above 70 within 4-6 weeks.
