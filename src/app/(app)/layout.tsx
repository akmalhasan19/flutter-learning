import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { MainNav } from "@/components/layout/MainNav";
import { LogOut, User } from "lucide-react";
import { logout } from "@/app/auth/actions/auth-actions"; // adjust if needed

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
            <div className="hidden sm:flex items-center gap-3 bg-slate-100 rounded-full px-4 py-1.5 text-sm font-medium">
              <div className="flex items-center gap-1.5">
                <span className="text-orange-500">🔥</span>
                <span>{profile?.current_streak || 0}</span>
              </div>
              <div className="w-px h-4 bg-slate-300"></div>
              <div className="flex items-center gap-1.5">
                <span className="text-yellow-500">🏆</span>
                <span>{profile?.total_xp || 0} XP</span>
              </div>
            </div>

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
  );
}