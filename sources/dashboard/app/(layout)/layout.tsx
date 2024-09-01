import '@/styles/globals.css';
import { Metadata, Viewport } from 'next';
import { Link } from '@nextui-org/link';
import clsx from 'clsx';

import { Providers } from '../providers';

import { siteConfig } from '@/config/site';
import { fontSans } from '@/config/fonts';
import { Component } from '@/components/navbar';

import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    icons: {
        icon: '/favicon.ico',
    },
};

export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: 'white' },
        { media: '(prefers-color-scheme: dark)', color: 'black' },
    ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head />
            <body className={clsx('min-h-screen bg-[#EDE9E2] font-sans antialiased', fontSans.variable)}>
                <Toaster position="top-center" gutter={8} />
                <Providers themeProps={{ attribute: 'class', children: null }}>
                    <div className="relative flex flex-col h-screen">
                        <Component />
                        <main className=" flex-grow h-screen">
                            {children}
                        </main>
                        {/* <footer className="w-full flex items-center justify-center">
                            <Link isExternal className="flex items-center gap-1 text-current" href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template" title="nextui.org homepage">
                                <span className="text-default-600">Powered by</span>
                                <p className="text-primary">NextUI</p>
                            </Link>
                        </footer> */}
                    </div>
                </Providers>
            </body>
        </html>
    );
}
