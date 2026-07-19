export type SessionStatus = 'built' | 'outline';

export interface SessionMeta {
  id: number;
  week: 1 | 2;
  day: number; // day within the fortnight, 1–10
  title: string;
  subtitle: string;
  minutes: number;
  badge: { name: string; emoji: string };
  outcomes: string[];
  status: SessionStatus;
}

export const SESSIONS: SessionMeta[] = [
  {
    id: 1, week: 1, day: 1,
    title: 'Meet Your New Teammate',
    subtitle: 'What AI actually is, what Claude is good (and bad) at, and the Golden Rules that keep everyone safe.',
    minutes: 90,
    badge: { name: 'First Contact', emoji: '🤝' },
    outcomes: [
      'Explain in plain English what Claude is and is not',
      'Hold your first useful conversation with Claude',
      'Know the five Golden Rules — what never goes into a chat',
      'Confirm your login works and which Claude plan the company is on',
    ],
    status: 'built',
  },
  {
    id: 2, week: 1, day: 2,
    title: 'The Art of the Ask',
    subtitle: 'Prompting fundamentals, 2026-style: role, context, task, format — and why iteration beats perfection.',
    minutes: 90,
    badge: { name: 'Prompt Apprentice', emoji: '✍️' },
    outcomes: [
      'Use the four-part ask: role, context, task, format',
      'Turn a vague request into a precise brief',
      'Improve any answer with two follow-up moves',
      'Build your first three personal prompt templates',
    ],
    status: 'outline',
  },
  {
    id: 3, week: 1, day: 3,
    title: 'Everyday Wins',
    subtitle: 'The daily bread: emails, summaries, rewrites, checklists and meeting notes — with tone control.',
    minutes: 90,
    badge: { name: 'Daily Driver', emoji: '📮' },
    outcomes: [
      'Draft and polish customer emails in the company voice',
      'Summarise long documents into decisions and actions',
      'Rewrite anything for tone, length and audience',
      'Ask Claude to ask YOU questions before it answers',
    ],
    status: 'outline',
  },
  {
    id: 4, week: 1, day: 4,
    title: 'Projects & Folders',
    subtitle: 'Give Claude a memory: Projects, project instructions, reference files and sensible folder habits.',
    minutes: 90,
    badge: { name: 'Organiser', emoji: '🗂️' },
    outcomes: [
      'Create a Project with instructions that set tone and context once',
      'Upload reference documents Claude can lean on every chat',
      'Set up the team folder conventions used for the rest of the course',
      'Know what belongs in a Project — and what never does',
    ],
    status: 'outline',
  },
  {
    id: 5, week: 1, day: 5,
    title: 'Working With Documents',
    subtitle: 'Summarise, extract, compare and transform: PDFs, spreadsheets and messy notes into clean outputs.',
    minutes: 90,
    badge: { name: 'Paper Tamer', emoji: '📄' },
    outcomes: [
      'Pull the answers out of a long PDF without reading all of it',
      'Turn messy notes into minutes, actions and follow-up emails',
      'Compare two documents and get the differences that matter',
      'Week 1 checkpoint quiz — consolidate everything so far',
    ],
    status: 'outline',
  },
  {
    id: 6, week: 2, day: 6,
    title: 'Meet Cowork',
    subtitle: 'Claude that does multi-step work: what Cowork is, granting a folder safely, and your first delegated task.',
    minutes: 90,
    badge: { name: 'Delegator', emoji: '🤖' },
    outcomes: [
      'Explain how Cowork differs from chat — goals, not messages',
      'Grant Cowork ONE practice folder and understand its limits',
      'Run your first end-to-end task and review the result',
      'Know the review-before-you-trust rule for agent work',
    ],
    status: 'outline',
  },
  {
    id: 7, week: 2, day: 7,
    title: 'Cowork in Action',
    subtitle: 'Real office jobs: tidy a folder, batch-draft documents, build a simple report from files.',
    minutes: 90,
    badge: { name: 'Operator', emoji: '⚙️' },
    outcomes: [
      'Run a folder tidy-and-rename job on practice files',
      'Batch-produce documents from a template and a list',
      'Build a one-page report from a folder of example files',
      'Write folder instructions so results come out consistent',
    ],
    status: 'outline',
  },
  {
    id: 8, week: 2, day: 8,
    title: 'Build Your Playbook',
    subtitle: 'Turn wins into team process: a shared prompt library, quality checks, and when NOT to use AI.',
    minutes: 90,
    badge: { name: 'Playmaker', emoji: '📘' },
    outcomes: [
      'Document your best prompts into the shared team library',
      'Apply the four-point quality check before anything leaves the office',
      'Agree the team etiquette: disclosure, review and sign-off',
      'Spot the tasks where AI should NOT be used',
    ],
    status: 'outline',
  },
  {
    id: 9, week: 2, day: 9,
    title: 'Capstone: Your Workflow Project',
    subtitle: 'Pick one real process from your role and rebuild it with Claude — example data only, before/after timed.',
    minutes: 90,
    badge: { name: 'Builder', emoji: '🏗️' },
    outcomes: [
      'Choose one genuine, repeatable task from your own week',
      'Design and build the AI-assisted version with example data',
      'Measure it: minutes before vs minutes after',
      'Document it as a one-page SOP anyone on the team could follow',
    ],
    status: 'outline',
  },
  {
    id: 10, week: 2, day: 10,
    title: 'Showcase & Certification',
    subtitle: 'Present your capstone to the team, sit the final assessment, and collect your certificate.',
    minutes: 90,
    badge: { name: 'AI-Ready', emoji: '🏆' },
    outcomes: [
      'Present your workflow project in five minutes',
      'Pass the final assessment covering all nine sessions',
      'Agree the team adoption list — what goes live next Monday',
      'Receive your Certificate of Completion',
    ],
    status: 'outline',
  },
];

export const TOTAL_SESSIONS = SESSIONS.length;

export function getSession(id: number): SessionMeta | undefined {
  return SESSIONS.find((s) => s.id === id);
}
