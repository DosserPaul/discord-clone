import React from "react";
import {Open_Sans} from 'next/font/google'
import type {Metadata} from 'next'
import {ClerkProvider} from "@clerk/nextjs";

import './globals.css'

import {cn} from "@/lib/utils";
import {ThemeProvider} from "@/components/providers/theme-provider";
import {ModalProvider} from "@/components/providers/modal-provider";
import {SocketProvider} from "@/components/providers/socket-provider";
import {QueryProvider} from "@/components/navigation/query-provider";

const font = Open_Sans({subsets: ['latin']})

export const metadata: Metadata = {
  title: 'Discord Clone',
  description: 'Discord Clone built with Next.js',
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(font.className,
          "bg-white dark:bg-[#313338] transition-colors duration-300 ease-in-out"
        )}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            storageKey="discord-clone-theme"
          >
            <SocketProvider>
              <ModalProvider/>
              <QueryProvider>
                {children}
              </QueryProvider>
            </SocketProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
