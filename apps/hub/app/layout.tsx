import '@/styles/globals.css'

import type { ReactNode } from 'react'
import { type Metadata } from 'next'
import { cookies } from 'next/headers'
import { TRPCReactProvider } from '@/trpc/react'

import { siteConfig } from '@/config/site'
import { fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'
import { SiteHeader } from '@/components/site-header'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { ThemeProvider } from '@/components/theme-provider'
import { StoreProvider } from '@/app/dashboard/store'

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon-16x16.png',
        apple: '/apple-touch-icon.png',
    },
}

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body
                className={cn(
                    'min-h-screen bg-background font-sans antialiased',
                    fontSans.variable
                )}
            >
                <TRPCReactProvider cookies={cookies().toString()}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                    >
                        <StoreProvider>
                            <div className="relative flex min-h-screen flex-col">
                                <SiteHeader />
                                <div className="flex-1">{children}</div>
                                <Toaster />
                            </div>
                        </StoreProvider>
                        <TailwindIndicator />
                    </ThemeProvider>
                </TRPCReactProvider>
            </body>
        </html>
    )
}
