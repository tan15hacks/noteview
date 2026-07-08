export default function Loading() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#F8F7F3] px-6 text-[#111111]">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-pulse rounded-2xl bg-[#2563EB]" />
        <p className="mt-6 font-serif text-3xl font-semibold tracking-[-0.04em]">Loading NoteView...</p>
      </div>
    </main>
  );
}
