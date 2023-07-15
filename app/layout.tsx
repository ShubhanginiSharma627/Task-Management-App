import React from 'react';
import './globals.css';
import type { Metadata } from 'next';

const metadata: Metadata = {
  title: 'Task Management App',
  description: 'A task management application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div >
      <html lang="en">
        <head>
        <title>{String(metadata.title)}</title>
          <meta name="description" content={metadata.description || ''} />
        </head>
        <body >{children}</body>
      </html>
    </div>
  );
}
