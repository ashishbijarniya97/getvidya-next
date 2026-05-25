# Graph Report - .  (2026-05-23)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 545 nodes · 852 edges · 52 communities (35 shown, 17 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 9 edges (avg confidence: 0.79)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d8a21c85`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Community 51|Community 51]]

## God Nodes (most connected - your core abstractions)
1. `generateSEO()` - 39 edges
2. `breadcrumbSchema()` - 33 edges
3. `createServiceClient()` - 31 edges
4. `compilerOptions` - 16 edges
5. `AnimateIn()` - 16 edges
6. `faqSchema()` - 16 edges
7. `reviewSchema()` - 13 edges
8. `createClient()` - 13 edges
9. `getPublishedPost()` - 11 edges
10. `howToSchema()` - 10 edges

## Surprising Connections (you probably didn't know these)
- `CurrentAffairsMay2026Week3()` --calls--> `breadcrumbSchema()`  [EXTRACTED]
  app/current-affairs/may-2026-week-3/page.tsx → lib/seo.ts
- `AdminSidebar()` --calls--> `clsx`  [INFERRED]
  components/admin/AdminSidebar.tsx → package.json
- `Btn()` --calls--> `clsx`  [INFERRED]
  components/admin/blog/EditorToolbar.tsx → package.json
- `generateSlug()` --calls--> `slugify`  [INFERRED]
  components/admin/blog/BlogEditor.tsx → package.json
- `sitemap()` --calls--> `getPublishedPost()`  [EXTRACTED]
  app/sitemap.ts → lib/blog.ts

## Communities (52 total, 17 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (45): generateMetadata(), CITY_SLUGS, sitemap(), Props, BlogAdminPage(), BlogPage(), metadata, tagColor() (+37 more)

### Community 1 - "Community 1"
Cohesion: 0.07
Nodes (34): generateMetadata(), container, item, NotFound(), quickLinks, GetVidyaAI, Testimonials, cityFaqs() (+26 more)

### Community 2 - "Community 2"
Cohesion: 0.05
Nodes (27): COMPARISONS, faqSchema, GETVIDYA_ADVANTAGES, metadata, faqs, cityLinks, compareLinks, examHubLinks (+19 more)

### Community 3 - "Community 3"
Cohesion: 0.06
Nodes (21): nav, FormData, LOADING_STEPS, Phase, schema, metadata, SECTIONS, STATUS_COLORS (+13 more)

### Community 4 - "Community 4"
Cohesion: 0.05
Nodes (39): AdminSidebar(), generateSlug(), Btn(), Props, dependencies, clsx, framer-motion, @google/generative-ai (+31 more)

### Community 5 - "Community 5"
Cohesion: 0.12
Nodes (20): CompareCoachingPage(), comparison, faqs, metadata, CompareOtherAppsPage(), comparison, faqs, metadata (+12 more)

### Community 6 - "Community 6"
Cohesion: 0.12
Nodes (11): metadata, CITIES, generateMetadata(), generateSEO(), organizationSchema, SEOProps, SITE_CONFIG, websiteSchema (+3 more)

### Community 7 - "Community 7"
Cohesion: 0.12
Nodes (18): AIStudyPlanPage(), faqs, HOW_IT_WORKS_STEPS, metadata, courseSchema(), howToSchema(), SSCMockTestsPage(), CSAT_TOPICS (+10 more)

### Community 8 - "Community 8"
Cohesion: 0.10
Nodes (13): CTA, CurrentAffairs, ExamGrid, Features, homeFaqs, metadata, Stats, CATEGORIES (+5 more)

### Community 9 - "Community 9"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 10 - "Community 10"
Cohesion: 0.11
Nodes (18): devDependencies, autoprefixer, eslint, eslint-config-next, @netlify/plugin-nextjs, postcss, tailwindcss, @types/node (+10 more)

### Community 11 - "Community 11"
Cohesion: 0.11
Nodes (12): metadata, values, education, metadata, personSchema, roadmap, skills, socialProof (+4 more)

### Community 12 - "Community 12"
Cohesion: 0.27
Nodes (12): GET(), buildPrompt(), gemini, generateWithGemini(), generateWithGroq(), generateWithOpenAI(), groq, openai (+4 more)

### Community 13 - "Community 13"
Cohesion: 0.17
Nodes (8): FAQ_DATA, metadata, bc, COMPARISON, faqs, metadata, TESTIMONIALS, faqSchema()

### Community 14 - "Community 14"
Cohesion: 0.17
Nodes (8): bc, comparisonSchema, faqs, metadata, TESTIMONIALS, comparison, FAQS, PLANS

### Community 15 - "Community 15"
Cohesion: 0.22
Nodes (9): CATEGORIES, CurrentAffairsPage(), DISPLAY_MONTHS, fetchWeeks(), metadata, MONTH_NAMES, steps, WeekRow (+1 more)

### Community 16 - "Community 16"
Cohesion: 0.31
Nodes (9): db, extractExcerpt(), fetchAllSlugs(), fetchFullPost(), HNPostFull, HNPostNode, hnQuery(), HNTag (+1 more)

### Community 17 - "Community 17"
Cohesion: 0.22
Nodes (6): EXAMS, Q, QUIZ_BY_EXAM, Step, SUBJECT_MAP, metadata

### Community 18 - "Community 18"
Cohesion: 0.22
Nodes (6): navLinks, articleSchema, CurrentAffairsMay2026Week3(), faqSchema, metadata, SECTIONS

### Community 19 - "Community 19"
Cohesion: 0.31
Nodes (6): DataPoint, AdminDashboard(), getDashboardStats(), getLeadChartData(), getRecentLeads(), LeadChart

### Community 20 - "Community 20"
Cohesion: 0.36
Nodes (8): buildQuizSchema(), DBQuestion, EXAM_SLUG_MAP, fetchQuestions(), generateMetadata(), PracticeTopicPage(), slugToLabel(), TOPIC_SLUG_MAP

### Community 21 - "Community 21"
Cohesion: 0.43
Nodes (5): getAllSlugs(), getPost(), getPosts(), HashnodePost, hashnodeQuery()

### Community 22 - "Community 22"
Cohesion: 0.33
Nodes (6): localBusinessSchema(), metadata, RAJASTHAN_CITIES, RAJASTHAN_EXAMS, rajasthanFaqs, RajasthanPage()

### Community 23 - "Community 23"
Cohesion: 0.33
Nodes (5): faqs, highlights, metadata, sectionWeightage, testTypes

### Community 25 - "Community 25"
Cohesion: 0.67
Nodes (3): StatCard(), stats, useCountUp()

## Knowledge Gaps
- **274 isolated node(s):** `config`, `crons`, `config`, `name`, `version` (+269 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Community 4` to `Community 10`?**
  _High betweenness centrality (0.150) - this node is a cross-community bridge._
- **Why does `generateSlug()` connect `Community 4` to `Community 0`?**
  _High betweenness centrality (0.100) - this node is a cross-community bridge._
- **What connects `config`, `crons`, `config` to the rest of the system?**
  _274 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.0601404741000878 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.06659619450317125 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.05574912891986063 - nodes in this community are weakly interconnected._