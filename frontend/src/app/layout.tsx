import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import React from 'react';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'StockPulse - Financial News & Stock Data',
  description:
    'Empowering retail investors with aggregated financial news, stock market data, and educational content',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto flex h-16 items-center justify-between py-4">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
                <span className="text-xl font-bold">StockPulse</span>
              </Link>
            </div>
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              <Link href="/" className="transition-colors hover:text-primary">
                Home
              </Link>
              <Link href="/news" className="transition-colors hover:text-primary">
                News
              </Link>
              <Link href="/stocks" className="transition-colors hover:text-primary">
                Stocks
              </Link>
              <Link href="/education" className="transition-colors hover:text-primary">
                Education
              </Link>
              <Link href="/watchlist" className="transition-colors hover:text-primary">
                Watchlist
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex">
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                  Sign In
                </button>
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 ml-2">
                  Sign Up
                </button>
              </div>
              <button className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
                <span className="sr-only">Open menu</span>
              </button>
            </div>
          </div>
        </header>
        <main className="container mx-auto py-8 px-4">{children}</main>
        <footer className="bg-secondary py-8 px-4 mt-12">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-secondary-foreground">StockPulse</h3>
                <p className="text-secondary-foreground/80 text-sm">
                  Empowering retail investors with aggregated financial news, stock market data, and
                  educational content.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-secondary-foreground">
                  Quick Links
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="/"
                      className="text-secondary-foreground/80 hover:text-secondary-foreground"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/news"
                      className="text-secondary-foreground/80 hover:text-secondary-foreground"
                    >
                      News
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/stocks"
                      className="text-secondary-foreground/80 hover:text-secondary-foreground"
                    >
                      Stocks
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/education"
                      className="text-secondary-foreground/80 hover:text-secondary-foreground"
                    >
                      Education
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-secondary-foreground">Legal</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="/terms"
                      className="text-secondary-foreground/80 hover:text-secondary-foreground"
                    >
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/privacy"
                      className="text-secondary-foreground/80 hover:text-secondary-foreground"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/disclaimer"
                      className="text-secondary-foreground/80 hover:text-secondary-foreground"
                    >
                      Disclaimer
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-secondary-foreground">Connect</h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="text-secondary-foreground/80 hover:text-secondary-foreground"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-secondary-foreground/80 hover:text-secondary-foreground"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-secondary-foreground/80 hover:text-secondary-foreground"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-secondary-foreground/10 text-center text-secondary-foreground/80 text-sm">
              <p>
                © {new Date().getFullYear()} StockPulse. For informational purposes only, not
                investment advice.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
