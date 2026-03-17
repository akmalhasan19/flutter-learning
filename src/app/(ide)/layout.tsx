import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { RealtimeProvider } from "@/components/providers/RealtimeProvider";

export default async function IdeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch profile stats
  const { data: profile } = await supabase
    .from("profiles")
    .select("total_xp, current_streak, display_name")
    .eq("id", user.id)
    .single();

  return (
    <RealtimeProvider userId={user.id} initialXp={profile?.total_xp || 0} initialStreak={profile?.current_streak || 0}>
      <div className="h-screen w-screen overflow-hidden flex flex-col min-w-[1024px] bg-[#09090B] text-slate-100 font-sans selection:bg-[#05b7d6] selection:text-[#09090B]">
        {children}
      </div>
    </RealtimeProvider>
  );
}
