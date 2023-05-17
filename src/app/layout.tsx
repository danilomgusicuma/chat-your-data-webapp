'use client'
import { SessionProvider } from "next-auth/react"
import React from 'react'

interface RootLayoutProps {
  children: React.ReactNode
  session: any
}

const RootLayout: React.FC<RootLayoutProps> = ({
  children,
  session
}) => {
  return (
    <html lang="en" style={{height: '100%'}}>
      <body
        suppressHydrationWarning={true} 
        style={{
          display: 'flex',
          justifyContent: 'center',
          height: '100%',
          margin: 0
        }}
      >
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}

export default RootLayout
