# The AI-Ready Office — Full Curriculum

**Product:** The AI-Ready Office — a Smash It Marketing programme
**Format:** 10 × 90-minute champion-led sessions, Monday–Friday over two weeks
**Audience:** Admin/office staff (5–10 people) at any small business — accountants, dentists, trades, services. No niche assumed, no skill level assumed (Day 1 opens with a self-assessment).
**Baseline setup:** Claude Team plan (confirmed by the champion before Day 1), work accounts, office machines only.
**Assessment:** Per-session quiz (70% pass, retakes allowed, best score counts) + capstone project + final assessment → Certificate of Completion.
**Reporting:** Zero backend. Progress and scores live in each learner's browser; a one-click pre-filled email sends each day's scorecard to the champion.

## Hard guard rails (baked into every session)

- No Claude Code anywhere in the course.
- Never assume skillset — Day 1 self-assessment asks; quizzes test.
- No real customer data, no passwords — made-up examples only ("Jane Citizen").
- The company's own website privacy policy and terms continue to bind all data handling.
- All course activity happens in the office, on work machines and accounts.
- The champion confirms which Claude plan the company is on before Day 1.
- Truth rule: any claim about Anthropic products is sourced from official Anthropic pages (claude.com, support.claude.com); where UI may vary, the course says "if it looks different, tell your champion".

## Session rhythm (identical every day)

Warm-up → Lesson (bite-size parts with key points) → Walkthroughs (tick-each-step, copy-ready prompts, stylised UI mockups) → **Marked exercises** (learner submits their actual work; Claude assesses it live against a rubric — score /100, strengths, one improvement, Golden-Rules data check; submitting is required to progress, passing is encouraged with resubmits) → Quiz (instant feedback) → Homework (~15 min, example data) → Finish (confetti, badge, scorecard → email to champion).

Champion timing: 10 min welcome / 15 warm-up / 30 lesson / 25 walkthroughs / 10 quiz & wrap.

---

## Week 1 — Foundations

### Day 1 — Meet Your New Teammate  ✅ BUILT
What AI actually is (plain-English "well-read new teammate" model), strengths vs limits, hallucinations and trust-but-verify, the five Golden Rules, plan check, first conversation, the context test.
**Walkthroughs:** Your first conversation (structured ask + refine loop) · The context test (vague vs briefed).
**Quiz:** 8 questions. **Badge:** First Contact 🤝

### Day 2 — The Art of the Ask
2026-standard prompting for office work: the four-part ask (role, context, task, format), specificity, examples-in-prompts, tone control, the two follow-up moves (add context / state the change), building personal prompt templates.
**Walkthroughs:** Rebuild three bad prompts into four-part asks · Create your first two reusable templates (email reply, document summary).
**Quiz:** 8 q. **Badge:** Prompt Apprentice ✍️

### Day 3 — Everyday Wins
The daily-bread tasks done properly: customer emails in company voice, summarising long documents into decisions/actions, rewriting for audience, meeting notes → minutes → actions, checklists, and "ask me questions first" briefing.
**Walkthroughs:** Draft-review-refine a tricky customer email · Summarise a 3-page supplied document into a 5-line brief · Have Claude interview YOU before it answers.
**Quiz:** 8 q. **Badge:** Daily Driver 📮

### Day 4 — Projects & Folders
Give Claude a memory: what Projects are, project instructions (set tone/context once), uploading reference documents, one-Project-per-purpose habit, team folder conventions for course practice files, and what NEVER goes in a Project.
**Walkthroughs:** Build an "Our Voice" Project with instructions + a style sample · Use it to redo Day 3's email and compare · Set up the practice folder structure.
**Quiz:** 8 q. **Badge:** Organiser 🗂️

### Day 5 — Working With Documents
Files in, answers out: summarise a long PDF, extract specific answers, compare two versions, messy notes → clean outputs, simple spreadsheet/CSV questions. Week 1 consolidation.
**Walkthroughs:** Interrogate a supplied example PDF · Turn supplied messy notes into minutes + action list + follow-up email · Week 1 checkpoint quiz (double length, covers Days 1–5).
**Quiz:** 12 q checkpoint. **Badge:** Paper Tamer 📄

## Week 2 — Cowork & Real Workflows

### Day 6 — Meet Cowork
Chat answers messages; Cowork completes goals. What Cowork is (agentic multi-step work, desktop app), granting ONE practice folder ("you choose the folders — Claude can't reach anything else"), folder instructions, watching it plan → work → deliver, and review-before-you-trust.
**Walkthroughs:** Grant the practice folder · First delegated task (organise + summarise the folder's example files) · Review the output like a supervisor.
**Quiz:** 8 q. **Badge:** Delegator 🤖

### Day 7 — Cowork in Action
Three real office jobs, all on example data: folder tidy-and-rename to a naming convention; batch-draft documents from a template + list; build a one-page report from a folder of files. Writing folder instructions for consistent results.
**Walkthroughs:** The rename job · The batch job · The report job.
**Quiz:** 8 q. **Badge:** Operator ⚙️

### Day 8 — Build Your Playbook
From personal wins to team process: the shared prompt library (where it lives, how entries are written), the four-point quality check before anything leaves the office, team etiquette (disclosure, review, sign-off), when NOT to use AI, and keeping the Golden Rules alive after the course.
**Walkthroughs:** Contribute two library entries · Run the quality check on a supplied flawed output (find the planted errors) · Draft the team's one-page AI etiquette agreement.
**Quiz:** 8 q. **Badge:** Playmaker 📘

### Day 9 — Capstone: Your Workflow Project
Each learner picks one real, repeatable task from their own role, rebuilds it with Claude/Cowork using example data, times before vs after, and documents it as a one-page SOP. Champion approves choices at 0:15; reflections from Days 1–8 emails are the shortlist.
**Deliverable:** Working workflow + SOP + minutes-saved estimate. **Badge:** Builder 🏗️

### Day 10 — Showcase & Certification
Five-minute presentations (what I automated, live demo, minutes saved, what I'd do next), final assessment (15 q across all sessions), team adoption list (which capstones go live Monday), certificates printed and presented.
**Assessment:** Final 15 q. **Badge:** AI-Ready 🏆 → Certificate of Completion

---

## Scoring & gamification

- Points: 5/walkthrough step · 10/correct quiz answer · 10/homework task · 10/self-assessment · 50/session completion bonus.
- Badges: one per session (shown on the dashboard badge shelf).
- Struggling path: quiz < 70% flags the champion email; champion pairs the learner up, re-runs the walkthrough with them driving, retake counts best score. Nobody fails; some people take an extra day.
- Certificate unlocks only when all ten sessions are complete.

## Per-client deployment

Everything client-specific lives in `src/config/client.ts` (company name, industry flavour, champion name/email, cohort label, confirmed plan). Redeploy = edit one file, `npm run build`, `npx vercel --prod`.
