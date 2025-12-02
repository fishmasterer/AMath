'use client';

import { ToastProvider } from '@/components/tutor';

export default function TutorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      {children}
    </ToastProvider>
  );
}
