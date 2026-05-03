import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import faviconUrl from "../assets/quickstart-logo.png?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "QuickStart — Talk to Verified CAs, CSs & CMAs Instantly" },
      { name: "description", content: "QuickStart connects you with verified Chartered Accountants, Company Secretaries and CMAs on demand. Free 3-minute intro call, then ₹99 for 10 minutes." },
      { name: "author", content: "QuickStart" },
      { property: "og:title", content: "QuickStart — Finance professionals on demand" },
      { property: "og:description", content: "Talk to verified CAs, CSs and CMAs in under 60 seconds. Free 3-minute intro call." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "QuickStart" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "QuickStart — Finance professionals on demand" },
      { name: "twitter:description", content: "Talk to verified CAs, CSs and CMAs in under 60 seconds. Free 3-minute intro call." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
