'use client'
import { useSession, signIn, signOut } from "next-auth/react"
import { redirect } from 'next/navigation'

export default function Login() {
  const { data: session } = useSession()
  if (session) {
    redirect('/chat')
  }
  return (
    <div>
       <h1 className="title">Create Next App</h1>
      <div>
        <h2> You are not signed in!!</h2>
        <button
          onClick={() => signIn('google')}
        >
          Sign in with google
        </button>
      </div>
    </div>
  )
}