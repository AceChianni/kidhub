// ///src/app/layout tsx
// import type { Metadata } from "next";
// import "./globals.css";
// import { LowStimProvider } from "@/components/low-stim-provider";
// import TopBar from "@/components/top-bar";

// export const metadata: Metadata = {
//   title: "Parents & Kids Hub",
//   description: "Routine + Regulation for Neurodivergent Families",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{ children: React.ReactNode }>) {
//   return (
//     <html lang="en">
//       <body className="bg-app text-app">
//         <LowStimProvider>
//           <TopBar />
//           <main className="mx-auto w-full max-w-md px-4 pb-10 pt-4">
//   <div className="rounded-3xl border border-soft bg-card p-4 shadow-sm">
//     {children}
//   </div>
// </main>


//         </LowStimProvider>
//       </body>
//     </html>
//   );
// }


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
              {/* Outer frame */}
              <div className="rounded-[28px] border border-soft shadow-sm p-[1px]">
                {/* Inner clip frame (anti-alias fix) */}
                <div className="rounded-[27px] overflow-hidden bg-card">
                  <TopBar />
                  <main className="px-4 pb-8 pt-4">{children}</main>
                </div>
              </div>
            </div>
          </div>
        </LowStimProvider>
      </body>
    </html>
  );
}
