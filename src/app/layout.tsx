// src/app/layout.tsx

import "./globals.css";
import { LowStimProvider } from "@/components/low-stim-provider";
import TopBar from "@/components/top-bar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LowStimProvider>
          <div className="min-h-screen px-4 py-6 flex items-start justify-center">
            <div className="w-full max-w-[420px]">
              
              <div className="rounded-[28px] border border-soft shadow-sm p-[1px] overflow-hidden bg-card">
  <div className="rounded-[27px] overflow-hidden">
    <TopBar />
    <main className="px-4 pb-10 pt-4">{children}</main>
  </div>
</div>

            </div>
          </div>
        </LowStimProvider>
      </body>
    </html>
  );
}
