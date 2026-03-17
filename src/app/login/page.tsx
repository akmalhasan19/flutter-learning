import { login } from '@/app/auth/actions/auth-actions'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Login</h1>
      <form className="flex flex-col gap-4 w-full max-w-sm">
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email:</label>
          <input id="email" name="email" type="email" required className="border p-2 rounded text-black" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password:</label>
          <input id="password" name="password" type="password" required className="border p-2 rounded text-black" />
        </div>
        <button formAction={login} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Log in
        </button>
      </form>
    </div>
  )
}
