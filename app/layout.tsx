import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { generateSEO, organizationSchema, websiteSchema, educationalAppSchema } from "@/lib/seo";
import SmoothScroll from "@/components/providers/SmoothScroll";
import MobileAppBanner from "@/components/ui/MobileAppBanner";

export const metadata: Metadata = generateSEO();

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const GADS_ID = process.env.NEXT_PUBLIC_GADS_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Resource hints — load external origins before they're needed */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://bzlqlohvbraclvvmbfdt.supabase.co" />

        <link rel="icon" href="/images/favicon.png" sizes="any" />
        <link rel="apple-touch-icon" href="/images/webclip.png" />
        <meta name="theme-color" content="#0a2824" />
        <meta name="msvalidate.01" content="B2998FFBBF03BEFCCC4706DBA744ADF6" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalAppSchema) }}
        />
      </head>
      <body className="antialiased">
        <SmoothScroll>{children}</SmoothScroll>
        <MobileAppBanner />
        {/* GA — loaded after page is interactive, never blocks render */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="lazyOnload"
            />
            <Script id="ga-init" strategy="lazyOnload">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');${GADS_ID ? `gtag('config','${GADS_ID}');` : ""}`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
