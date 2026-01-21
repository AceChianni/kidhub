// /app/after-school/page.tsx

import ScreenTitle from "@/components/screen-title";

export default function AfterSchoolPage() {
  return (
    <div className="space-y-5">
      <ScreenTitle
        title="After School Reset"
        subtitle="Coming next. Keep the MVP small first."
      />
      <div className="rounded-2xl border p-4 text-sm text-muted-foreground">
        This page will become a “soft landing” routine: snack → decompress → transition.
      </div>
    </div>
  );
}
