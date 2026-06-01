import Link from "next/link";
import { Coffee } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="fixed inset-0 z-100 flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <div className="mb-6 rounded-full border p-4">
        <Coffee className="h-10 w-10" />
      </div>

      <span className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
        Error 404
      </span>

      <h1 className="mb-4 text-4xl font-bold md:text-6xl">
        This Page Is Still Brewing
      </h1>

      <p className="mb-8 max-w-md text-muted-foreground">
        Looks like the page you&apos;re looking for has wandered off for a coffee
        break. Let&apos;s get you back to somewhere delicious.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="rounded-full border px-6 py-3 font-medium transition-all hover:scale-105"
        >
          Back to Home
        </Link>

        <Link
          href="/menu"
          className="rounded-full border px-6 py-3 font-medium transition-all hover:scale-105"
        >
          Explore Our Menu
        </Link>
      </div>

      <p className="mt-10 text-sm text-muted-foreground">
        ☕ While you&apos;re here, why not discover your next favorite drink?
      </p>
    </div>
  );
};

export default NotFoundPage;