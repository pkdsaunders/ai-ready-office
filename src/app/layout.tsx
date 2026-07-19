import type { Metadata } from 'next';
import { Newsreader } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import { productConfig } from '@/config/client';
import { Header } from '@/components/Header';
import './globals.css';

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'The AI-Ready Office — Claude training for admin teams',
  description:
    'A two-week, champion-led Claude training programme for small-business admin teams — ten guided sessions with quizzes, scorecards and certification.',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${newsreader.variable} ${GeistSans.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6">{children}</main>
        <footer className="no-print border-t border-line bg-paper-deep/50">
          <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-ink-faint sm:flex-row sm:px-6">
            <span>
              {productConfig.productName} · {productConfig.byline} · {productConfig.website}
            </span>
            <span>{productConfig.version}</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
