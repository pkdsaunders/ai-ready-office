export type Block =
  | { kind: 'p'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'goodbad'; goodTitle: string; good: string[]; badTitle: string; bad: string[] }
  | { kind: 'callout'; tone: 'info' | 'warn' | 'gold'; title: string; text: string }
  | { kind: 'rules'; rules: { icon: string; title: string; text: string }[] }
  | { kind: 'figure'; mockup: 'newchat' | 'conversation' | 'plancheck'; caption: string }
  | { kind: 'prompt'; label: string; text: string };

export interface LessonSection {
  id: string;
  kicker: string;
  title: string;
  blocks: Block[];
  keyPoint: string;
}

export interface WalkthroughStep {
  text: string;
  detail?: string;
  copyText?: string;
  mockup?: 'newchat' | 'conversation' | 'plancheck';
}

export interface WalkthroughDef {
  id: string;
  title: string;
  intro: string;
  minutes: number;
  steps: WalkthroughStep[];
  notice: string;
}

export interface AssessmentDef {
  /** Server-side rubric key, e.g. 's1-email' */
  id: string;
  /** Which walkthrough this follows, e.g. 'w1' */
  after: string;
  title: string;
  /** What to paste, in plain instructions */
  brief: string;
  placeholder: string;
  /** Shown to the learner so the marking expectations are transparent */
  lookingFor: string[];
  minChars: number;
}

export interface AssessmentResult {
  score: number;
  pass: boolean;
  strengths: string[];
  improvement: string;
  safetyFlag: boolean;
  safetyNote: string;
}

export interface QuizQuestion {
  q: string;
  options: string[];
  correct: number;
  explain: string;
}

export interface HomeworkTask {
  title: string;
  detail: string;
}

export interface BuiltSessionContent {
  id: number;
  welcome: string;
  /** Optional illustration shown on the warm-up screen (path under /public) */
  heroImage?: { src: string; alt: string };
  selfAssessment: { intro: string; items: string[] };
  sections: LessonSection[];
  walkthroughs: WalkthroughDef[];
  assessments: AssessmentDef[];
  quiz: QuizQuestion[];
  homework: {
    intro: string;
    estMinutes: number;
    tasks: HomeworkTask[];
    reflectionPrompt: string;
  };
}
