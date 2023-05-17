'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const Home = () => {
  const { push } = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    console.log(session)
    if(session) {
      push('/chat');
    } else {
      push('/login')
    }
  }, [])
  
  return <></>
}

export default Home
