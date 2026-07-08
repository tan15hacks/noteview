"use client";

import {
  ArrowRight,
  BookOpen,
  Bookmark,
  Check,
  Clock3,
  Compass,
  Layers3,
  Mail,
  Menu,
  PenLine,
  Search,
  Send,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

const navItems = ["Categories", "Latest Posts", "Popular", "About", "Subscribe"];

const latestPosts = [
  {
    title: "How to Make Your Digital Workspace Feel Less Messy",
    category: "Productivity",
    readTime: "6 min read",
    excerpt: "A practical look at simplifying tabs, tools, files, and daily workflows without rebuilding everything from scratch.",
  },
  {
    title: "Why Simple Design Still Feels More Premium",
    category: "Design",
    readTime: "5 min read",
    excerpt: "What quiet layouts, strong spacing, and deliberate typography teach us about trust and clarity.",
  },
  {
    title: "The Best Tools for Organizing Your Ideas",
    category: "Technology",
    readTime: "7 min read",
    excerpt: "A curated guide to apps and systems that help you capture thoughts, connect notes, and build better knowledge habits.",
  },
  {
    title: "Small Habits That Make Creative Work Easier",
    category: "Lifestyle",
    readTime: "4 min read",
    excerpt: "Simple routines for reducing friction, staying consistent, and making creative work feel lighter each day.",
  },
];

const categories = [
  {
    title: "Productivity",
    copy: "Systems, planning, habits, and focus.",
  },
  {
    title: "Technology",
    copy: "Apps, AI tools, digital workflows, and web trends.",
  },
  {
    title: "Design",
    copy: "UI, branding, visual inspiration, and creative direction.",
  },
  {
    title: "Lifestyle",
    copy: "Personal growth, routines, mindset, and modern living.",
  },
  {
    title: "Writing",
    copy: "Notes, storytelling, blogging tips, and content ideas.",
  },
];

const editorPicks = [
  "The Quiet Power of Writing Things Down",
  "How to Plan a Week Without Overplanning",
  "Why Your Notes Should Be Easier to Find",
  "Building a Better Reading Habit",
];

const popularPosts = [
  "7 Simple Ways to Organize Your Ideas",
  "How to Create a Personal Knowledge System",
  "The Minimal Workspace Setup for Creators",
  "Why Long-Form Writing Still Matters",
  "The Best Free Tools for Digital Notes",
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -80px 0px" }
    );

    elements.forEach((element, index) => {
      element.classList.add("reveal-on-scroll");
      element.style.setProperty("--reveal-delay", `${Math.min(index * 50, 260)}ms`);
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(""), 4200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  function handleSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") || "").trim();

    if (!email.includes("@")) {
      setToast("Please enter a valid email address.");
      return;
    }

    form.reset();
    setToast("You are now subscribed to NoteView.");
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#F8F7F3] text-[#111111]">
      {toast && (
        <button
          onClick={() => setToast("")}
          className="fixed right-5 top-5 z-50 rounded-full border border-[#D8D2C8] bg-[#111111] px-5 py-3 text-sm font-semibold text-white shadow-2xl shadow-black/15"
        >
          {toast}
        </button>
      )}

      <header className="fixed left-0 right-0 top-0 z-40 border-b border-[#E5E1D8]/80 bg-[#F8F7F3]/86 backdrop-blur-2xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#home" className="group flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#111111] text-white shadow-xl shadow-black/10 transition group-hover:-rotate-3 group-hover:scale-105">
              <BookOpen size={20} />
            </span>
            <span>
              <span className="block font-serif text-2xl font-semibold leading-none tracking-[-0.04em]">NoteView</span>
              <span className="mt-1 block text-[11px] font-bold uppercase tracking-[0.28em] text-[#2563EB]">Digital Journal</span>
            </span>
          </a>

          <div className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase().replaceAll(" ", "-")}`} className="nav-link text-sm font-semibold text-[#565656] hover:text-[#111111]">
                {item}
              </a>
            ))}
          </div>

          <a href="#subscribe" className="hidden rounded-full bg-[#2563EB] px-5 py-3 text-sm font-bold text-white shadow-xl shadow-blue-600/18 hover:-translate-y-0.5 hover:bg-[#1D4ED8] lg:inline-flex">
            Join Newsletter
          </a>

          <button onClick={() => setMenuOpen((value) => !value)} className="grid h-11 w-11 place-items-center rounded-full border border-[#D8D2C8] bg-white/70 lg:hidden" aria-label="Open navigation menu">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {menuOpen && (
          <div className="border-t border-[#E5E1D8] bg-[#F8F7F3] px-5 py-5 lg:hidden">
            <div className="grid gap-3">
              {navItems.map((item) => (
                <a key={item} onClick={() => setMenuOpen(false)} href={`#${item.toLowerCase().replaceAll(" ", "-")}`} className="rounded-2xl border border-[#E5E1D8] bg-white/80 px-4 py-3 text-sm font-bold text-[#565656]">
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <section id="home" className="relative px-5 pb-20 pt-32 lg:px-8 lg:pb-28 lg:pt-40">
        <div className="pointer-events-none absolute left-1/2 top-20 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
            <div className="animate-[fade-up_900ms_cubic-bezier(0.22,1,0.36,1)_both]">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#D8D2C8] bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.26em] text-[#2563EB] shadow-sm">
                <Sparkles size={14} /> Modern Blog & Digital Journal
              </div>
              <h1 className="max-w-4xl font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-6xl lg:text-[6.4rem]">
                Ideas, stories, and notes worth reading.
              </h1>
              <p className="mt-8 max-w-2xl text-lg font-medium leading-8 text-[#5F5F5F]">
                NoteView brings together thoughtful blog posts, practical guides, and fresh perspectives for readers who want useful ideas without the noise.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a href="#latest-posts" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#111111] px-7 py-4 text-sm font-bold text-white shadow-2xl shadow-black/12 hover:-translate-y-1">
                  Start Reading <ArrowRight size={17} />
                </a>
                <a href="#categories" className="inline-flex items-center justify-center gap-2 rounded-full border border-[#D8D2C8] bg-white/70 px-7 py-4 text-sm font-bold text-[#111111] hover:-translate-y-1 hover:bg-white">
                  Explore Categories
                </a>
              </div>
            </div>

            <article data-reveal className="editor-card relative overflow-hidden rounded-[2.5rem] border border-[#E5E1D8] bg-white p-4 shadow-2xl shadow-black/[0.06]">
              <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
                <div className="relative min-h-[320px] overflow-hidden rounded-[2rem] bg-[#EBF2FF]">
                  <img src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=90" alt="Minimal desk workspace for a featured blog post about focus systems" className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 rounded-full bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB] backdrop-blur">Featured Post</div>
                </div>
                <div className="flex flex-col justify-between p-2 sm:p-5">
                  <div>
                    <div className="mb-5 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#6B6B6B]"><span>Productivity</span><span>•</span><span>8 min read</span></div>
                    <h2 className="font-serif text-4xl font-semibold leading-tight tracking-[-0.04em] text-[#111111] sm:text-5xl">How to Build a Simple System for Better Focus</h2>
                    <p className="mt-5 text-base font-medium leading-7 text-[#5F5F5F]">A practical guide to organizing your tasks, reducing distractions, and creating a workflow that actually supports your day.</p>
                  </div>
                  <a href="#latest-posts" className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[#2563EB] px-5 py-3 text-sm font-bold text-white hover:-translate-y-1 hover:bg-[#1D4ED8]">Read Featured Post <ArrowRight size={16} /></a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="border-y border-[#E5E1D8] bg-white/70 px-5 py-5 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-5 text-center text-xs font-bold uppercase tracking-[0.28em] text-[#6B6B6B] lg:justify-between">
          <span>Productivity</span><span>Technology</span><span>Design</span><span>Lifestyle</span><span>Writing</span>
        </div>
      </section>

      <section id="latest-posts" data-reveal className="px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#2563EB]">Latest Blog Posts</p>
              <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-6xl">Latest from NoteView</h2>
            </div>
            <p className="max-w-md text-base font-medium leading-7 text-[#5F5F5F]">Fresh articles, practical guides, and simple ideas for modern digital work and everyday clarity.</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {latestPosts.map((post) => (
              <article key={post.title} data-reveal className="post-card rounded-[2rem] border border-[#E5E1D8] bg-white p-6 shadow-sm">
                <div className="mb-8 flex items-center justify-between text-xs font-bold uppercase tracking-[0.18em] text-[#2563EB]"><span>{post.category}</span><span className="text-[#8A8A8A]">{post.readTime}</span></div>
                <h3 className="font-serif text-3xl font-semibold leading-tight tracking-[-0.03em]">{post.title}</h3>
                <p className="mt-5 text-sm font-medium leading-7 text-[#5F5F5F]">{post.excerpt}</p>
                <a href="#subscribe" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#111111]">Read article <ArrowRight size={15} /></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="categories" data-reveal className="bg-[#111111] px-5 py-24 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-blue-300">Browse Blog Categories</p>
              <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-6xl">Browse by interest.</h2>
            </div>
            <p className="max-w-md text-base font-medium leading-7 text-zinc-400">Choose the kind of ideas you want to explore, from digital systems to creative habits.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {categories.map((category, index) => (
              <article key={category.title} data-reveal className="category-card rounded-[2rem] border border-white/10 bg-white/[0.06] p-6">
                <div className="mb-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#111111]"><span className="font-serif text-2xl">{index + 1}</span></div>
                <h3 className="font-serif text-3xl font-semibold">{category.title}</h3>
                <p className="mt-4 text-sm font-medium leading-6 text-zinc-400">{category.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section data-reveal className="px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#2563EB]">Editor&apos;s Picks</p>
              <h2 className="mt-4 font-serif text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">Editor&apos;s Picks</h2>
            </div>
            <Bookmark className="hidden text-[#2563EB] md:block" size={34} />
          </div>

          <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <article data-reveal className="editor-card overflow-hidden rounded-[2.5rem] border border-[#E5E1D8] bg-white shadow-xl shadow-black/[0.05]">
              <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
                <div className="relative min-h-[420px]">
                  <img src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=90" alt="Open notebook for a featured editor pick article" className="absolute inset-0 h-full w-full object-cover" />
                </div>
                <div className="p-8 lg:p-10">
                  <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-[#EBF2FF] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB]"><PenLine size={14} /> Writing</div>
                  <h3 className="font-serif text-5xl font-semibold leading-tight tracking-[-0.05em]">The Quiet Power of Writing Things Down</h3>
                  <p className="mt-6 text-base font-medium leading-8 text-[#5F5F5F]">Why simple notes can reduce mental clutter, make ideas easier to revisit, and turn scattered thoughts into useful direction.</p>
                  <a href="#popular" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#111111] px-5 py-3 text-sm font-bold text-white hover:-translate-y-1">Read pick <ArrowRight size={16} /></a>
                </div>
              </div>
            </article>

            <div className="grid gap-4">
              {editorPicks.slice(1).map((title, index) => (
                <article key={title} data-reveal className="post-card rounded-[2rem] border border-[#E5E1D8] bg-white p-7 shadow-sm">
                  <div className="text-xs font-bold uppercase tracking-[0.24em] text-[#2563EB]">0{index + 2} Editor Pick</div>
                  <h3 className="mt-5 font-serif text-3xl font-semibold leading-tight tracking-[-0.03em]">{title}</h3>
                  <p className="mt-4 text-sm font-medium leading-6 text-[#5F5F5F]">A focused read from the NoteView archive for readers who like useful, calm, and practical ideas.</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="popular" data-reveal className="bg-white px-5 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#2563EB]">Popular Articles</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-6xl">Popular This Week</h2>
            <p className="mt-6 max-w-md text-base font-medium leading-7 text-[#5F5F5F]">The most-read ideas from readers exploring systems, notes, focus, and creative work.</p>
          </div>

          <div className="space-y-3">
            {popularPosts.map((post, index) => (
              <article key={post} data-reveal className="popular-row group flex items-center gap-5 rounded-[1.5rem] border border-[#E5E1D8] bg-[#F8F7F3] p-5">
                <span className="font-serif text-4xl font-semibold text-[#2563EB]">0{index + 1}</span>
                <h3 className="flex-1 text-lg font-bold tracking-[-0.02em] text-[#111111]">{post}</h3>
                <ArrowRight className="text-[#8A8A8A] transition group-hover:translate-x-1 group-hover:text-[#2563EB]" size={20} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="subscribe" data-reveal className="px-5 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2.75rem] bg-[#2563EB] text-white shadow-2xl shadow-blue-600/20 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-[380px] overflow-hidden">
            <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=90" alt="Laptop with a newsletter and digital blog reading setup" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1D45] via-[#2563EB]/25 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] backdrop-blur"><Mail size={14} /> Weekly Notes</div>
              <h2 className="font-serif text-5xl font-semibold leading-none tracking-[-0.05em]">Get fresh notes in your inbox.</h2>
            </div>
          </div>
          <div className="p-7 sm:p-10 lg:p-14">
            <p className="text-lg font-medium leading-8 text-blue-50">Join the NoteView newsletter for weekly articles, useful guides, and curated ideas from the blog.</p>
            <form onSubmit={handleSubscribe} className="mt-10 flex flex-col gap-4 sm:flex-row">
              <input name="email" type="email" className="min-h-14 flex-1 rounded-full border border-white/20 bg-white/15 px-5 text-white outline-none placeholder:text-blue-100 focus:border-white" placeholder="Enter your email" />
              <button className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-[#111111] hover:-translate-y-1">Subscribe <Send size={16} /></button>
            </form>
            <div className="mt-8 grid gap-3 text-sm font-semibold text-blue-50 sm:grid-cols-3">
              {["Weekly articles", "Curated guides", "No noise"].map((item) => <div key={item} className="flex items-center gap-2"><Check size={16} /> {item}</div>)}
            </div>
          </div>
        </div>
      </section>

      <section id="about" data-reveal className="px-5 pb-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 rounded-[2.5rem] border border-[#E5E1D8] bg-white p-8 shadow-sm lg:grid-cols-[0.8fr_1.2fr] lg:p-12">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#2563EB]">About NoteView</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-6xl">Built for readers who prefer clarity over noise.</h2>
          </div>
          <div className="grid gap-6 text-base font-medium leading-8 text-[#5F5F5F] lg:grid-cols-2">
            <p>NoteView is a digital journal created for people who enjoy thoughtful writing, useful guides, and simple ideas that make work, life, and creativity easier to understand.</p>
            <p>It brings together productivity, technology, design, lifestyle, writing, and creative work in a focused, distraction-free reading experience.</p>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#E5E1D8] bg-white px-5 py-14 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 text-sm font-medium text-[#5F5F5F] md:grid-cols-[1.25fr_0.8fr_0.8fr_1fr]">
          <div>
            <div className="font-serif text-3xl font-semibold tracking-[-0.04em] text-[#111111]">NoteView</div>
            <p className="mt-4 max-w-md leading-7">Ideas, stories, and notes worth reading.</p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.26em] text-[#2563EB]">Categories</h3>
            <div className="mt-5 space-y-3">
              {categories.map((category) => <a key={category.title} href="#categories" className="block hover:text-[#111111]">{category.title}</a>)}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.26em] text-[#2563EB]">Explore</h3>
            <div className="mt-5 space-y-3">
              <a href="#latest-posts" className="block hover:text-[#111111]">Latest Posts</a>
              <a href="#popular" className="block hover:text-[#111111]">Popular Articles</a>
              <a href="#popular" className="block hover:text-[#111111]">Editor&apos;s Picks</a>
              <a href="#about" className="block hover:text-[#111111]">About</a>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.26em] text-[#2563EB]">Subscribe</h3>
            <p className="mt-5 leading-7">Get weekly notes and fresh articles in your inbox.</p>
            <a href="#subscribe" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#111111] px-4 py-2 text-sm font-bold text-white hover:-translate-y-1">Join Newsletter <ArrowRight size={15} /></a>
          </div>
        </div>
      </footer>
    </main>
  );
}
