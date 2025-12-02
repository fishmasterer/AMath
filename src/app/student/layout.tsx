'use client';

import { StudentToastProvider, StudentMobileNav } from '@/components/student';

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StudentToastProvider>
      <div className="min-h-screen bg-slate-950">
        <StudentMobileNav />

        {/* Main content area */}
        <main className="md:ml-72 pb-20 md:pb-6">
          {children}
        </main>
      </div>
    </StudentToastProvider>
  );
}
