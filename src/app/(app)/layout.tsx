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
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <header className="sticky top-0 z-30 w-full border-b border-border bg-white shadow-sm">
          <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-6">
              <Link href="/dashboard" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white font-bold">F</div>
                <span className="font-bold tracking-tight hidden sm:block">FlutterCamp</span>
              </Link>
              <MainNav />
            </div>
            
            <div className="flex items-center gap-4">
              <LiveUserStats />

              <form action={logout}>
                <button className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 hover:bg-slate-100 transition-colors text-slate-600">
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