# Portfolio Site: Notion-powered with Next.js, Tailwind & Windsurf

## Scope & Assumptions
- Build a personal portfolio website using Next.js, Tailwind, shadcnUI, deployed on Vercel.
- All content managed in Notion (Headless CMS), integrated via Windsurf + Notion MCP.
- Site should auto-update when Notion content changes (ISR or webhook).
- Assumes access to Notion, Vercel, and Windsurf/MCP credentials.
- Goal: Developer-friendly, scalable, and marketing-ready portfolio with minimal manual sync.

## Phases
### 1. Discovery & Setup
**Goal:** Define requirements, set up environments, clarify unknowns  
**Deliverables:** Project repo, Notion workspace, initial stack config  
**Effort:** S  
**Risks:** Credential issues, unclear Notion schema
#### Checklist
- [ ] Confirm Notion database structure (fields, collections)
- [ ] Set up Notion Integration & share database
- [ ] Create/clone Next.js repo, add Tailwind & shadcnUI
- [ ] Configure Vercel project & environment variables
- [ ] Enable Windsurf + Notion MCP access

### 2. Content Integration (MCP)
**Goal:** Connect Next.js to Notion via MCP, fetch & render content  
**Deliverables:** Working data fetch, type-safe content access  
**Effort:** M  
**Risks:** API mismatch, schema drift, type generation issues
#### Checklist
- [ ] Install MCP SDK in Next.js project
- [ ] Generate types from Notion schema via MCP
- [ ] Implement data fetching (getCollection, etc.)
- [ ] Render main content (projects, posts) from Notion
- [ ] Test with sample content/edge cases

### 3. UI Implementation
**Goal:** Build responsive, accessible UI using Tailwind/shadcnUI  
**Deliverables:** Portfolio pages, project cards, detail views  
**Effort:** M  
**Risks:** Design drift, component gaps
#### Checklist
- [ ] Design homepage, project list, project detail templates
- [ ] Implement UI components (cards, nav, footer)
- [ ] Integrate dynamic content (dangerouslySetInnerHTML for HTML blocks)
- [ ] Add SEO/meta tags, Open Graph

### 4. Automation & Deployment
**Goal:** Ensure auto-updates from Notion, CI/CD, production readiness  
**Deliverables:** Live site, auto-revalidation, webhooks or ISR  
**Effort:** S-M  
**Risks:** Webhook config, cache invalidation bugs
#### Checklist
- [ ] Set up ISR or webhook-triggered revalidation
- [ ] Test Notion → site update flow
- [ ] Finalize environment configs (tokens, DB IDs)
- [ ] Deploy to production (Vercel)
- [ ] Smoke test live site

### 5. QA & Polish
**Goal:** Validate UX, fix bugs, prepare for launch  
**Deliverables:** Bug-free, polished MVP  
**Effort:** S  
**Risks:** Missed edge cases
#### Checklist
- [ ] Cross-browser/device test
- [ ] Accessibility review
- [ ] Content QA (formatting, links)
- [ ] Final code cleanup

## Next Steps
- Confirm Notion database schema/fields
- Provide Windsurf/MCP credentials if not yet set
- Approve or adjust phase breakdown/plan

## Current Goal
Define Notion schema and set up project environments