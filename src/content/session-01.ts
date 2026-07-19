import type { BuiltSessionContent } from './types';

export const session01: BuiltSessionContent = {
  id: 1,

  welcome:
    "Today is about getting comfortable. No jargon, no pressure, nothing to break. By the end of this session you'll have had your first genuinely useful conversation with Claude — and you'll know the handful of rules that keep you, your customers and the business safe.",

  heroImage: {
    src: '/images/session-01-meet-teammate.jpg',
    alt: 'Watercolour illustration of an office admin team meeting their new AI teammate, who hands over a neat stack of paperwork',
  },

  selfAssessment: {
    intro:
      "Before we start: five quick questions about where you're at today. There are no wrong answers and this isn't a test — it helps your champion pitch the course at the right level, and in two weeks you'll enjoy looking back at it.",
    items: [
      'I have used an AI tool (ChatGPT, Claude, Copilot or similar) before',
      'I feel confident picking up new software at work',
      'I write emails or documents as a regular part of my day',
      'I know what I would ask an AI assistant to help me with',
      'I feel positive about AI becoming part of my job',
    ],
  },

  sections: [
    {
      id: 'meet',
      kicker: 'Big idea',
      title: 'Claude is a very well-read new teammate',
      blocks: [
        {
          kind: 'p',
          text: 'Claude is an AI assistant made by a company called Anthropic. The simplest way to think about it: a bright new teammate who has read an enormous amount of the written world — books, articles, manuals, websites — and is brilliant with words.',
        },
        {
          kind: 'p',
          text: "Like any new teammate on their first day, Claude is capable but knows nothing about YOUR business — your customers, your prices, your way of doing things — until you tell it. The better you brief it, the better it performs. That one idea is most of this course.",
        },
        {
          kind: 'callout',
          tone: 'info',
          title: 'It predicts, it does not look things up',
          text: "Claude isn't a search engine or a database. It generates responses based on patterns in what it has read. That's why it's superb at drafting and explaining — and why you always sense-check facts.",
        },
      ],
      keyPoint: 'Claude = a capable new teammate. It only knows about your business what you tell it.',
    },
    {
      id: 'goodbad',
      kicker: 'Strengths & limits',
      title: "What it's brilliant at — and where it falls over",
      blocks: [
        {
          kind: 'goodbad',
          goodTitle: 'Brilliant at',
          good: [
            'Drafting — emails, letters, quotes, job ads, social posts',
            'Summarising — long documents into the bits that matter',
            'Rewriting — change the tone, length or audience of anything',
            'Checklists & plans — turning a jumble into ordered steps',
            'Explaining — unfamiliar terms, documents or processes, in plain English',
            'Brainstorming — ten options in seconds when you are stuck on one',
          ],
          badTitle: 'Watch out for',
          bad: [
            'Facts it cannot check — it can state wrong things confidently',
            'Anything about YOUR business it has not been told',
            'Very recent events — its knowledge has a cut-off date',
            'Judgement calls that are yours to make — it advises, you decide',
            'Perfect first drafts — treat every output as a draft to review',
          ],
        },
      ],
      keyPoint: 'Use it for drafts, summaries and structure. Never let it be the last set of eyes.',
    },
    {
      id: 'verify',
      kicker: 'The confidence trick',
      title: 'Sometimes wrong, never in doubt',
      blocks: [
        {
          kind: 'p',
          text: 'AI assistants have a famous quirk: when they don\'t know something, they can fill the gap with something plausible — delivered in the same confident tone as everything else. The industry calls these "hallucinations".',
        },
        {
          kind: 'p',
          text: "This isn't a reason to avoid AI. It's a reason to use it the way you'd use a keen new teammate: wonderful first drafts, but a senior person reads things before they go out the door. In this office, you are the senior person.",
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'The rule: trust, but verify',
          text: 'Names, numbers, dates, prices, legal or medical claims — if it matters and you didn\'t supply it, check it before you use it.',
        },
      ],
      keyPoint: "If a fact matters and you didn't supply it, verify it before it leaves the office.",
    },
    {
      id: 'rules',
      kicker: 'Safety',
      title: 'The five Golden Rules',
      blocks: [
        {
          kind: 'p',
          text: 'These apply to every session in this course and to every day after it. They are also printed on the poster in the Golden Rules page — worth a spot on the office wall.',
        },
        {
          kind: 'rules',
          rules: [
            {
              icon: '🪪',
              title: 'Real customer details never go in',
              text: 'No real names, contact details, health or financial information. Practise with made-up examples — "Jane Citizen" is the busiest customer in Australia.',
            },
            {
              icon: '🔑',
              title: 'Passwords and logins — never',
              text: 'No passwords, PINs, bank details or security codes, yours or anyone else\'s. No exceptions, no matter how convenient.',
            },
            {
              icon: '👀',
              title: 'You check everything before it goes out',
              text: 'Every email, document or figure gets human eyes — yours — before a customer sees it. You own the output, not Claude.',
            },
            {
              icon: '📜',
              title: 'Our own privacy promises still apply',
              text: 'The privacy policy and terms on our own website bind how we handle customer information — with or without AI. Using Claude never overrides them.',
            },
            {
              icon: '🙋',
              title: 'Not sure? Ask the champion',
              text: 'If you\'re ever unsure whether something is OK to paste in, stop and ask. Asking is always the right move.',
            },
          ],
        },
        {
          kind: 'callout',
          tone: 'gold',
          title: 'Where this course happens',
          text: 'All course activity happens here in the office, on work machines and work accounts. Keep practice files in the course folder your champion set up.',
        },
      ],
      keyPoint: 'Made-up examples only. Check everything. When unsure, ask.',
    },
    {
      id: 'plan',
      kicker: 'Your setup',
      title: 'Know what plan you are on',
      blocks: [
        {
          kind: 'p',
          text: "Claude comes in several plans, and it matters which one the business uses. This course is written for the Claude Team plan — the business plan where everyone has a work seat, the company manages access centrally, and (as Anthropic states) your content isn't used to train their models by default.",
        },
        {
          kind: 'figure',
          mockup: 'plancheck',
          caption: 'Your champion confirms the plan before Day 1 — today you just confirm you can log in.',
        },
        {
          kind: 'callout',
          tone: 'info',
          title: 'If something looks different',
          text: "Screens change and plans differ slightly. If a button in this course isn't where we say it is, tell your champion — the course gets updated, and you get points for spotting it.",
        },
      ],
      keyPoint: "Course baseline: Claude Team plan, logged in with your work account. Champion confirms the details.",
    },
  ],

  walkthroughs: [
    {
      id: 'w1',
      title: 'Your first conversation',
      intro: "Time to actually talk to it. You'll give Claude a small, real-shaped job — with made-up details — and then improve its answer with a follow-up. Tick each step as you go.",
      minutes: 12,
      steps: [
        {
          text: 'Open Claude and sign in with your work account',
          detail: 'Use the Claude desktop app, or go to claude.ai in your browser. Your champion set up your login before today — wave them over if it doesn\'t work.',
        },
        {
          text: 'Start a new chat',
          detail: 'Click the New chat button — top of the left-hand sidebar. You get a fresh, empty conversation. Each chat is separate, like a new phone call.',
          mockup: 'newchat',
        },
        {
          text: 'Type this message, then press Enter',
          detail: 'Copy it exactly, or use the copy button. Notice it has three parts: who you are, what you need, and how you want it.',
          copyText:
            "I'm an office administrator at a small local business. Draft a short, friendly email to a customer, Jane Citizen, letting her know her Thursday 2pm appointment needs to move to Friday at 9:30am. Keep it under 120 words and end with a question so she can confirm.",
        },
        {
          text: 'Read the reply like a reviewer',
          detail: "Is the tone right for your customers? Is anything missing? You're not admiring it — you're checking it. That habit starts today.",
          mockup: 'conversation',
        },
        {
          text: 'Ask for a change, in plain English',
          detail: "Don't start over — just reply. Claude remembers the whole conversation.",
          copyText: 'Warmer please, and add a short apology for the reshuffle. Keep it under 100 words.',
        },
        {
          text: 'Tick this when you saw the answer improve',
          detail: "That reply-and-refine loop is how professionals use AI: first answer, then better answer. You never have to accept draft one.",
        },
      ],
      notice:
        'Notice what you did NOT do: you didn\'t learn any commands, and you didn\'t use any real customer details. Plain English + made-up examples — that\'s the whole game.',
    },
    {
      id: 'w2',
      title: 'The context test',
      intro: "Now see the single biggest lever you have: context. Same request, asked two ways — watch the quality gap.",
      minutes: 10,
      steps: [
        {
          text: 'Start another new chat',
          detail: 'Fresh chat, so the last conversation doesn\'t help it.',
        },
        {
          text: 'First, ask the lazy version',
          detail: 'Type exactly this — deliberately vague:',
          copyText: 'Write an email about a price change.',
        },
        {
          text: 'Skim the result',
          detail: "It will be generic — wrong business, wrong tone, invented details. Not because Claude is bad, but because it knows nothing about the situation. A new teammate would produce the same mush from that brief.",
        },
        {
          text: 'Now give the same job a proper brief',
          copyText:
            "Let's try that again with proper context. We're a small family-run business with loyal long-term customers. From 1 September our standard service price rises from $95 to $105 — our first increase in three years, due to supplier costs. Write a warm, honest email to existing customers announcing this. Thank them for their loyalty, be straight about the reason, no corporate waffle. Under 150 words.",
        },
        {
          text: 'Compare the two answers side by side',
          detail: 'Same tool, same day, same request — the difference is entirely the brief. Tick when you can honestly see the gap.',
        },
      ],
      notice:
        "Context in, quality out. Tomorrow's session turns this into a repeatable four-part formula you'll use for everything.",
    },
  ],

  assessments: [
    {
      id: 's1-email',
      after: 'w1',
      title: 'Submit your work: the finished email',
      brief:
        "Paste the FINAL version of the reschedule email — the one you got after asking Claude to make it warmer. Claude will mark it against the brief and tell you what worked.",
      placeholder: 'Paste the final email here — subject line included if you have one…',
      lookingFor: [
        'The Thursday → Friday 9:30am change is clear',
        'Warm tone with an apology for the shuffle',
        'Ends by asking Jane to confirm',
        'Under about 130 words',
        'Made-up details only',
      ],
      minChars: 100,
    },
    {
      id: 's1-brief',
      after: 'w2',
      title: 'Submit your work: write your own brief',
      brief:
        "New scenario, your turn. A made-up mobile dog-grooming business has to cancel next Tuesday's appointments — the van needs repairs. Write the brief YOU would give Claude for the customer email. Don't run it through Claude — submit your prompt itself. That's the skill being marked.",
      placeholder: "Write your brief to Claude here — who you are, what you need, the details, how you want it…",
      lookingFor: [
        'Says who the business is',
        'States the job: an email about cancelling Tuesday',
        'Includes the made-up specifics (day, van repairs, rebooking)',
        'Sets the tone and a length cap',
        'No real customer details',
      ],
      minChars: 80,
    },
  ],

  quiz: [
    {
      q: 'Which best describes what Claude is?',
      options: [
        'A search engine that looks up answers on the internet',
        'An AI assistant that generates responses from patterns in what it has read',
        'A database containing your business records',
        'A person in a call centre typing very fast',
      ],
      correct: 1,
      explain: 'Claude generates responses from patterns learned in training. It isn\'t looking your answer up — which is why it drafts brilliantly and why you verify facts.',
    },
    {
      q: 'Claude states something that sounds plausible but you suspect is wrong. What\'s going on?',
      options: [
        'Impossible — AI is always accurate',
        'A "hallucination" — AI can fill gaps with confident-sounding but wrong information',
        'It is deliberately lying to you',
        'Your computer has a virus',
      ],
      correct: 1,
      explain: 'AI assistants can fill gaps with plausible-but-wrong content, delivered confidently. That\'s why the rule is trust, but verify.',
    },
    {
      q: 'Which of these is OK to paste into a chat with Claude?',
      options: [
        "A real customer's phone number and address",
        'Your login password, so Claude can help you faster',
        'A made-up example invoice for "Jane Citizen"',
        "A patient's health record with the name removed",
      ],
      correct: 2,
      explain: 'Made-up examples only. Real customer details, passwords and health records never go in — even "de-identified" records can identify someone from the details that remain.',
    },
    {
      q: 'How much does Claude know about your business?',
      options: [
        'Everything — it is connected to our systems',
        'Only what you tell it in the conversation (or files you deliberately give it)',
        'It knows whatever Google knows',
        'It learns everything automatically over time',
      ],
      correct: 1,
      explain: 'Claude only knows what you provide. That\'s why briefing it well — context, details, examples — transforms the quality of what you get back.',
    },
    {
      q: 'The first answer Claude gives you is a bit generic. Best move?',
      options: [
        'Accept it — first answers are final',
        'Give up — the tool clearly doesn\'t work',
        'Reply with more context and ask for the change you want',
        'Retype the identical question in capital letters',
      ],
      correct: 2,
      explain: 'Claude remembers the conversation, so you refine by replying: add context, state the change. First answer, then better answer.',
    },
    {
      q: 'On the Claude Team plan, what happens with the content of your work chats?',
      options: [
        'It is published on the internet',
        'Anthropic states business content is not used to train their models by default',
        'It is emailed to Anthropic staff for review',
        'It trains the model so competitors can see it',
      ],
      correct: 1,
      explain: 'Anthropic states that on business plans your content is not used for model training by default. Your champion confirms the company\'s exact plan and settings.',
    },
    {
      q: "You're about to paste something in and you're not sure it's OK. What do you do?",
      options: [
        'Paste it quickly before anyone notices',
        'Stop and ask the champion first',
        'Paste it, then delete the chat afterwards',
        'Ask Claude whether it is OK to paste',
      ],
      correct: 1,
      explain: 'When unsure, stop and ask. Deleting afterwards doesn\'t un-share something — the check happens before you paste.',
    },
    {
      q: 'Claude drafts an email and you hit send without reading it. Who is responsible for what it said?',
      options: [
        'Claude',
        'Anthropic',
        'You — the human who sent it',
        'Nobody, if you say AI wrote it',
      ],
      correct: 2,
      explain: 'You own everything that leaves the office, whoever drafted it. Golden Rule: your eyes on everything before it goes out.',
    },
  ],

  homework: {
    intro:
      "Fifteen minutes at your desk before tomorrow's session. Made-up details only — Jane Citizen is expecting your call.",
    estMinutes: 15,
    tasks: [
      {
        title: 'Draft a rescheduling email',
        detail: 'A different scenario than the walkthrough: a made-up tradesperson needs to move a made-up site visit. Brief Claude properly, then improve the draft once with a follow-up.',
      },
      {
        title: 'Summarise something long',
        detail: 'Find a long public webpage or document — a supplier\'s terms page or a government business guide works. Paste the text in and ask for the five points that matter, in plain English.',
      },
      {
        title: 'Turn a mess into a checklist',
        detail: 'Type a rambling brain-dump of a task you know well (opening the office, month-end, onboarding a customer). Ask Claude to turn it into a tidy ordered checklist.',
      },
    ],
    reflectionPrompt: 'One task in my working week Claude could genuinely help with is…',
  },
};
