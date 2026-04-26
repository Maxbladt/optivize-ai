import { redirect } from 'next/navigation';

export const metadata = {
  title: 'AI Voice Assistent | Optivaize',
  alternates: { canonical: 'https://optivaize.nl/ai-assistent/tandarts' },
};

export default function Page() {
  redirect('/ai-assistent/tandarts');
}
