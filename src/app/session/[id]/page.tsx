import { SESSIONS } from '@/content/curriculum';
import { SessionView } from '@/components/SessionView';

export function generateStaticParams() {
  return SESSIONS.map((s) => ({ id: String(s.id) }));
}

export default async function SessionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <SessionView id={Number(id)} />;
}
