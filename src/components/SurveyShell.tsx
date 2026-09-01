"use client";

import type { ReactNode } from "react";

interface SurveyShellProps {
  children: ReactNode;
  progress: number;
  title?: string;
}

export function SurveyShell({ children, progress, title }: SurveyShellProps) {
  return (
    <div className="min-h-screen bg-[#f7f5f0] text-[#2c2a26]">
      <header className="sticky top-0 z-10 border-b border-[#e8e4dc] bg-[#f7f5f0]/95 backdrop-blur-sm">
        <div className="mx-auto max-w-lg px-4 py-3">
          {title && (
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[#6b6560]">
              {title}
            </p>
          )}
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#e8e4dc]">
            <div
              className="h-full rounded-full bg-[#5a7a6a] transition-all duration-300"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-lg px-4 py-6 pb-24">{children}</main>
      <footer className="fixed bottom-0 left-0 right-0 border-t border-[#e8e4dc] bg-[#f7f5f0]/95 py-2 text-center text-xs text-[#8a847c] backdrop-blur-sm">
        <p>by mankasha</p>
      </footer>
    </div>
  );
}
