import Link from "next/link";
import { auth } from "./lib/auth"; // Import auth from your route
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth(); // Check session server-side

  if (!session) {
    redirect("/login"); // Redirect to login if not authenticated
  }

  // If authenticated, show the page
  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto flex max-w-2xl flex-col gap-4 px-4 py-10">
        <h1 className="text-3xl font-semibold text-slate-900">
          Jaden’s Athlete Management MVP
        </h1>
        <p className="text-slate-600">
          Early prototype. Manage athletes and experiment with features here as you learn.
        </p>
        <Link
          href="/athletes"
          className="inline-flex w-fit items-center rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
        >
          Go to Athletes Page
        </Link>
      </div>
    </main>
  );
}