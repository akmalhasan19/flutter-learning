import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { MainNav } from "@/components/layout/MainNav";
import { LogOut } from "lucide-react";
import { logout } from "@/app/auth/actions/auth-actions"; // adjust if needed
import { RealtimeProvider } from "@/components/providers/RealtimeProvider";
import { LiveUserStats } from "@/components/layout/LiveUserStats";

export default async function AppLayout({
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
      <div className="min-h-screen bg-[#09090B] text-slate-300 font-sans selection:bg-[#05b7d6] selection:text-[#09090B] overflow-x-hidden flex flex-col">
        <header className="sticky top-0 z-30 w-full bg-[#09090B]/80 backdrop-blur-md border-b border-[#27272A] shadow-sm">
          <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-6">
              <Link href="/dashboard" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#05b7d6] flex items-center justify-center text-[#09090B] font-bold text-xl shadow-[0_0_12px_rgba(5,183,214,0.4)]">
                  F
                </div>
                <span className="font-bold text-2xl tracking-tight text-slate-100 hidden sm:block font-[family-name:var(--font-space-grotesk),sans-serif]">
                  FlutterCamp
                </span>
              </Link>
              <MainNav />
            </div>
            
            <div className="flex items-center gap-4">
              <LiveUserStats />

              <form action={logout}>
                <button className="flex items-center justify-center w-10 h-10 rounded-full border border-[#27272A] bg-[#18181B] hover:bg-[#27272A] transition-colors text-slate-400 hover:text-slate-200">
                  <LogOut className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </header>

        <main className="flex-1 container mx-auto max-w-6xl px-4 sm:px-6 py-8">
          {children}
        </main>
      </div>
    </RealtimeProvider>
  );
}