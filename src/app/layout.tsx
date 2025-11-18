import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AMath Tutor - O-Level Additional Mathematics',
  description: 'Quiz and homework management system for Singapore O-Level Additional Mathematics tutoring',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
