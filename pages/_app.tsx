import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import Link from "next/link";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <header className="w-full text-gray-700 bg-white border-t border-gray-100 shadow-sm body-font">
        <div className="container flex flex-col flex-wrap items-center p-5 mx-auto md:flex-row">
          <nav className="flex flex-wrap items-center text-base lg:w-2/5">
            <Link href="/" className="mr-5 font-medium hover:text-gray-900">
              Basic
            </Link>
            <Link
              href="/optimistic"
              className="mr-5 font-medium hover:text-gray-900"
            >
              Optimistic
            </Link>
            <Link
              href="/invalidate"
              className="font-medium hover:text-gray-900"
            >
              Invalidation
            </Link>
          </nav>
        </div>
      </header>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} position="top-left" />
    </QueryClientProvider>
  );
}
