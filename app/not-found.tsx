import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#F8F7F3] px-6 text-center text-[#111111]">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#2563EB]">404</p>
        <h1 className="mt-4 font-serif text-5xl font-semibold tracking-[-0.05em]">This note was not found.</h1>
        <p className="mx-auto mt-5 max-w-md text-[#5F5F5F]">The page you are looking for may have moved or does not exist.</p>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-[#111111] px-6 py-3 text-sm font-bold text-white">
          Back to NoteView
        </Link>
      </div>
    </main>
  );
}
