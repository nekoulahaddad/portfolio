# Portfolio Text Changes Plan

## Goal

Make the site read clearly as a personal portfolio, not as a service sales page.

## Rules

- Do not change visual style.
- Do not change CSS or JS unless explicitly requested.
- Change section text step by step after approval.
- Keep current layout, classes, links, and animations.
- Change visible page text only.
- Do not change meta tags, SEO text, OpenGraph, Twitter tags, or JSON-LD.
- Avoid wording that sounds like selling services.
- Prefer portfolio wording: experience, selected work, research, background, stack, profiles.

## Words To Avoid

- consulting
- start conversation
- product goals
- available for
- engagement
- business execution
- client
- sales
- deliver solutions

## Suggested Tone

Calm, personal, and professional.

The site should feel like:

- personal profile
- work archive
- engineering background
- research and publication page
- professional reference

The site should not feel like:

- agency landing page
- consulting offer
- service catalog
- sales funnel

## Section Plan

### 1. Header Navigation

nothing should change

### 2. Hero Section

Purpose: introduce Nekoula as a software engineer and researcher.

Need to reduce commercial wording:

- Replace business-focused promise with personal portfolio intro.
- Replace strong CTA text with neutral navigation.

Possible direction:

- Title: software engineer, researcher, builder of practical systems.
- Lead: this is a personal portfolio with experience, publications, stack, and profiles.
- Buttons: view work, read blog, contact info.

### 3. Hero Meta

Purpose: quick factual summary.

Possible changes:

- `Focus`: Software Engineering, AI, Research
- `Experience`: 9+ years in development
- `Location`: Moscow, Russia

### 4. About

Purpose: background, not offer.

Need to remove:

- direct work with founders and teams
- delivery accountability as sales positioning
- measurable outcomes language if it feels commercial

Possible direction:

- mention architecture, implementation, research, frontend, backend, integrations
- keep profile links unchanged

### 5. Projects

Purpose: selected domains from experience.

Need to avoid:

- "Real products delivered"
- "custom solutions"
- "sales and support"
- client communication

Possible direction:

- rename heading to selected domains or selected work
- describe each card as experience areas, not offered services

Decision:

- Do not change this section for now.

### 6. Approach

Purpose: engineering notes or work style.

Need to avoid:

- business goals
- delivery language that sounds like selling
- support package language

Possible direction:

- system mapping
- iterative development
- quality controls
- long-term maintainability

Decision:

- Do not change this section for now.

### 7. Stack Game

Purpose: technology stack.

Probably no change needed except maybe heading text.

Possible direction:

- keep `What I Use`
- keep `Technologies I Work With`

### 8. Publications

Purpose: research credibility.

Probably keep as is.

Possible small changes:

- `My latest articles` can become `Research publications`
- links can stay unchanged

### 9. Contact

Purpose: neutral contact information.

Need to remove:

- product goals
- consulting
- full-cycle development
- automation-focused implementation
- engagement

Possible direction:

- heading: Professional correspondence
- note: personal portfolio and reference profile
- email and WhatsApp can stay

## Change Order

1. Agree on hero section wording.
2. Agree on about section wording.
3. Agree on projects section wording.
4. Agree on approach section wording.
5. Agree on contact section wording.
6. Review all text for commercial wording.
7. Apply final text-only changes to `index.html`.

## Files Expected To Change

- `index.html`
- `PORTFOLIO_TEXT_CHANGES_PLAN.md`

CSS and JS should remain unchanged.

## Proposed Exact Text Replacements

### Hero Lead

Current:

`I am Nekoula Haddad, software engineer and technical leader. I design architecture, ship production-ready products, and deliver solutions that improve business execution.`

Proposed:

`I am Nekoula Haddad, a software engineer focused on turning complex technical ideas into clear, maintainable software systems with clean architecture, AI, and automation.`

Selected: yes

### Hero Primary Button

Current:

`Start Conversation`

Proposed:

`Get in Touch`

Alternative:

`View Contact`

Selected: yes

### About First Paragraph

Current:

`I work directly with founders and teams to turn complex requirements into stable software products. My role combines architecture decisions, implementation, and delivery accountability.`

Selected replacement:

`My technical background covers architecture, full-stack development, automation, AI tools, and research.`

### About Second Paragraph

Current:

`I cover frontend, backend, integrations, and deployment workflows with strong emphasis on clean engineering and measurable outcomes.`

Selected replacement:

`My work is shaped by clean engineering, maintainable architecture, stable systems, and technical decisions that remain understandable over time.`

Selected: yes

### Contact Heading

Current:

`Let us discuss your product goals`

Proposed:

`Contact information`

Alternative:

`Contact information`

Selected: yes

### Contact Note

Current:

`I am available for consulting, product architecture, full-cycle development, and automation-focused implementation. You will communicate directly with me throughout the engagement.`

Proposed:

`You can reach me here for professional correspondence, research topics, publications, and profile-related messages.`

Selected: yes
