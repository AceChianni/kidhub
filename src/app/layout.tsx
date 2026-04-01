// src/app/layout.tsx

// @ts-ignore
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
      <body className="bg-background text-foreground antialiased">
        <LowStimProvider>
          <div className="min-h-screen flex justify-center px-4 py-4 sm:py-8">
            <div className="w-full max-w-[420px]">
              <TopBar />
              <main className="px-1 pb-8 pt-4">{children}</main>
            </div>
          </div>
        </LowStimProvider>
      </body>
    </html>
  );
}