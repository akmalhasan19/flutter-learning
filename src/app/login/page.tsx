import { login } from '@/app/auth/actions/auth-actions'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#09090B] text-slate-300 font-sans selection:bg-[#05b7d6] selection:text-[#09090B] flex flex-col">
      {/* HEADER */}
      <header className="p-4 md:p-6 flex justify-between items-center z-50">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-[#05b7d6] flex items-center justify-center text-[#09090B] font-bold text-xl shadow-[0_0_12px_rgba(5,183,214,0.4)] group-hover:shadow-[0_0_20px_rgba(5,183,214,0.6)] transition-all">
            F
          </div>
          <span className="font-bold text-2xl tracking-tight text-slate-100 hidden sm:block font-[family-name:var(--font-space-grotesk),sans-serif]">
            FlutterCamp
          </span>
        </Link>
        <Link
          href="/"
          className="text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-2 text-sm font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-12 relative">
        {/* Decorative Background Blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#05b7d6]/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="w-full max-w-md relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-slate-100 font-[family-name:var(--font-space-grotesk),sans-serif]">
              Welcome back
            </h1>
            <p className="text-slate-400">
              Log in to continue your Flutter learning journey.
            </p>
          </div>

          <div className="bg-[#18181B] p-6 md:p-8 rounded-2xl border border-[#27272A] shadow-2xl relative">
            <form className="relative flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-300">Email Address</label>
                <input 
                  id="email" 
                  name="email" 
                  type="email" 
                  required 
                  placeholder="you@example.com"
                  className="w-full bg-[#09090B] border border-[#27272A] rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-[#05b7d6] focus:ring-1 focus:ring-[#05b7d6] transition-all" 
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="password" className="text-sm font-medium text-slate-300">Password</label>
                </div>
                <input 
                  id="password" 
                  name="password" 
                  type="password" 
                  required 
                  placeholder="••••••••"
                  className="w-full bg-[#09090B] border border-[#27272A] rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-[#05b7d6] focus:ring-1 focus:ring-[#05b7d6] transition-all" 
                />
              </div>

              <button 
                formAction={login} 
                className="w-full mt-2 bg-[#05b7d6] hover:bg-[#0891B2] text-[#09090B] font-bold py-3 px-4 rounded-xl transition-all shadow-[0_0_12px_rgba(5,183,214,0.3)] hover:shadow-[0_0_20px_rgba(5,183,214,0.5)] flex items-center justify-center gap-2"
              >
                Log In
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-slate-400">
              Don't have an account?{' '}
              <Link href="/signup" className="text-[#05b7d6] hover:text-[#0891B2] font-semibold transition-colors">
                Sign up for free
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
