import { topicSummaries } from '@/data/topicSummaries';
import { AppShell } from '@/components/AppShell';
import { ThemeProvider } from '@/components/ThemeProvider';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <AppShell summaries={topicSummaries}>{children}</AppShell>
    </ThemeProvider>
  );
}
