"use client";

import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Check,
  Clock3,
  Menu,
  PenLine,
  Search,
  Send,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Articles", href: "#articles" },
  { label: "Categories", href: "#categories" },
  { label: "Popular", href: "#popular" },
  { label: "About", href: "#about" },
];

const categories = ["Productivity", "Technology", "Design", "Lifestyle", "Writing"];

const topStories = [
  { tag: "Design", title: "Why Simple Design Still Feels More Premium", readTime: "5 min read" },
  { tag: "Technology", title: "The Best Tools for Organizing Your Ideas", readTime: "7 min read" },
  { tag: "Writing", title: "The Quiet Power of Writing Things Down", readTime: "6 min read" },
];

const articles = [
  {
    tag: "Productivity",
    title: "How to Make Your Digital Workspace Feel Less Messy",
    excerpt: "A calm reset for tabs, tools, files, and daily systems without starting over.",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=90",
  },
  {
    tag: "Lifestyle",
    title: "Small Habits That Make Creative Work Easier",
    excerpt: "Simple routines for reducing friction and building a more consistent creative rhythm.",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1495364141860-b0d03eccd065?auto=format&fit=crop&w=900&q=90",
  },
  {
    tag: "Technology",
    title: "A Cleaner Way to Save Ideas Before They Disappear",
    excerpt: "How to capture thoughts quickly and return to them when they are actually useful.",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=90",
  },
  {
    tag: "Design",
    title: "What Editorial Layouts Teach Us About Better Screens",
    excerpt: "Spacing, hierarchy, rhythm, and restraint from magazines applied to modern web design.",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=90",
  },
  {
    tag: "Writing",
    title: "How to Turn Loose Notes Into Useful Posts",
    excerpt: "A lightweight method for shaping scattered ideas into readable, focused articles.",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=90",
  },
  {
    tag: "Productivity",
    title: "How to Plan a Week Without Overplanning",
    excerpt: "A practical weekly planning approach that leaves enough room for real life.",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=900&q=90",
  },
];

const popularPosts = [
  "7 Simple Ways to Organize Your Ideas",
  "How to Create a Personal Knowledge System",
  "The Minimal Workspace Setup for Creators",
  "Why Long-Form Writing Still Matters",
  "The Best Free Tools for Digital Notes",
];

const notes = [
  "A cleaner reading experience starts with better spacing.",
  "Useful posts do not need to be loud to be memorable.",
  "The best digital systems are the ones you actually return to.",
];

function categoryCopy(category: string) {
  const copy = {
    Productivity: "Systems, planning, habits, and focus.",
    Technology: "Apps, AI tools, digital workflows, and web trends.",
    Design: "UI, branding, visual inspiration, and creative direction.",
    Lifestyle: "Personal growth, routines, mindset, and modern living.",
    Writing: "Notes, storytelling, blogging tips, and content ideas.",
  };

  return copy[category as keyof typeof copy];
}

function updateCarouselIndex(element: HTMLDivElement | null, setIndex: (index: number) => void) {
  if (!element) return;
  const cards = Array.from(element.querySelectorAll<HTMLElement>("article"));
  if (!cards.length) return;

  const center = element.scrollLeft + element.clientWidth / 2;
  let activeIndex = 0;
  let smallestDistance = Number.POSITIVE_INFINITY;

  cards.forEach((card, index) => {
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    const distance = Math.abs(cardCenter - center);
    if (distance < smallestDistance) {
      smallestDistance = distance;
      activeIndex = index;
    }
  });

  setIndex(activeIndex);
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [articleIndex, setArticleIndex] = useState(0);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const articleRef = useRef<HTMLDivElement | null>(null);
  const categoryRef = useRef<HTMLDivElement | null>(null);

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
      { threshold: 0.14, rootMargin: "0px 0px -70px 0px" }
    );

    elements.forEach((element, index) => {
      element.classList.add("reveal-on-scroll");
      element.style.setProperty("--reveal-delay", `${Math.min(index * 45, 260)}ms`);
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
    <main className="w-full min-h-screen overflow-hidden bg-[#f3efe6] text-[#211a14]">
      {toast && (
        <button
          onClick={() => setToast("")}
          className="fixed right-5 top-5 z-50 rounded-full border border-[#d7c8b2] bg-[#211a14] px-5 py-3 text-sm font-semibold text-[#fffaf0] shadow-2xl shadow-black/15"
        >
          {toast}
        </button>
      )}

      <header className="fixed left-0 right-0 top-0 z-40 w-full border-b border-[#ded1bd]/90 bg-[#f3efe6]/90 backdrop-blur-2xl">
        <div className="hidden border-b border-[#ded1bd]/80 px-5 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#7a6a58] lg:block lg:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <span>NoteView Weekly Edition</span>
            <span>Productivity · Technology · Design · Writing</span>
          </div>
        </div>

        <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
          <a href="#home" className="group flex min-w-0 items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#211a14] text-[#fffaf0] shadow-xl shadow-black/10 transition group-hover:-rotate-6 group-hover:scale-105">
              <BookOpen size={20} />
            </span>
            <span className="min-w-0">
              <span className="block font-serif text-3xl font-semibold leading-none tracking-[-0.06em]">NoteView</span>
              <span className="mt-1 block text-[11px] font-bold uppercase tracking-[0.26em] text-[#b45309]">Digital Journal</span>
            </span>
          </a>

          <div className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="nav-link text-sm font-semibold text-[#675a4d] hover:text-[#211a14]">
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <button className="grid h-11 w-11 place-items-center rounded-full border border-[#d7c8b2] bg-[#fffaf0] text-[#675a4d] hover:-translate-y-0.5 hover:text-[#211a14]" aria-label="Search articles">
              <Search size={18} />
            </button>
            <a href="#subscribe" className="header-cta inline-flex min-h-11 items-center justify-center rounded-full border border-[#211a14]/20 bg-[#fffaf0] px-6 text-sm font-extrabold text-[#211a14] shadow-xl shadow-black/10 hover:-translate-y-0.5 hover:bg-white">
              Subscribe
            </a>
          </div>

          <button onClick={() => setMenuOpen((value) => !value)} className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#d7c8b2] bg-[#fffaf0] lg:hidden" aria-label="Open navigation menu">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {menuOpen && (
          <div className="border-t border-[#ded1bd] bg-[#f3efe6] px-5 py-5 lg:hidden">
            <div className="grid gap-3">
              {navItems.map((item) => (
                <a key={item.label} onClick={() => setMenuOpen(false)} href={item.href} className="rounded-2xl border border-[#ded1bd] bg-[#fffaf0] px-4 py-3 text-sm font-bold text-[#675a4d]">
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <section id="home" className="px-5 pb-16 pt-32 lg:px-8 lg:pb-24 lg:pt-44">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-10 border-b border-[#211a14] pb-8 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#b45309]">Modern Blog & Digital Journal</p>
            <h1 className="mx-auto mt-5 max-w-6xl break-words font-serif text-[clamp(3.4rem,9.4vw,7.6rem)] font-semibold leading-[0.9] tracking-[-0.07em]">
              Ideas, stories, and notes worth reading.
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-lg font-medium leading-8 text-[#675a4d]">
              NoteView brings together thoughtful blog posts, practical guides, and fresh perspectives for readers who want useful ideas without the noise.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(330px,0.75fr)] lg:items-stretch">
            <article data-reveal className="story-cover flex h-full min-h-[520px] overflow-hidden rounded-[2.2rem] border border-[#d7c8b2] bg-[#fffaf0] shadow-2xl shadow-black/[0.06] lg:min-h-[650px]">
              <div className="relative min-h-[520px] flex-1 overflow-hidden lg:min-h-[650px]">
                <img src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1400&q=90" alt="Desk workspace for featured productivity article" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#211a14]/88 via-[#211a14]/28 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-[#fffaf0] sm:p-9 lg:p-12">
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#fffaf0]/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] backdrop-blur"><Sparkles size={14} /> Featured Post</div>
                  <h2 className="max-w-3xl break-words font-serif text-[clamp(2.5rem,5.1vw,4.6rem)] font-semibold leading-[0.95] tracking-[-0.06em]">How to Build a Simple System for Better Focus</h2>
                  <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-[#efe6d5]">A practical guide to organizing your tasks, reducing distractions, and creating a workflow that actually supports your day.</p>
                  <div className="mt-7 flex flex-wrap items-center gap-4 text-sm font-semibold text-[#efe6d5]">
                    <span>Mara Ellis</span><span>•</span><span>July 8, 2026</span><span>•</span><span>8 min read</span>
                  </div>
                </div>
              </div>
            </article>

            <aside data-reveal className="flex h-full min-h-[520px] flex-col rounded-[2.2rem] border border-[#d7c8b2] bg-[#fffaf0] p-6 shadow-xl shadow-black/[0.04] lg:min-h-[650px] lg:p-8">
              <div className="mb-7 flex items-center justify-between border-b border-[#d7c8b2] pb-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#b45309]">Editor Desk</p>
                  <h2 className="mt-2 font-serif text-3xl font-semibold tracking-[-0.04em]">Top Stories</h2>
                </div>
                <TrendingUp className="text-[#b45309]" />
              </div>

              <div className="space-y-5">
                {topStories.map((story, index) => (
                  <article key={story.title} className="story-link group border-b border-[#e5d9c8] pb-5 last:border-b-0 last:pb-0">
                    <div className="mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[#b45309]"><span>0{index + 1}</span><span>{story.tag}</span></div>
                    <h3 className="break-words font-serif text-[clamp(1.75rem,2vw,2.15rem)] font-semibold leading-tight tracking-[-0.04em] group-hover:text-[#b45309]">{story.title}</h3>
                    <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-[#7a6a58]"><Clock3 size={15} /> {story.readTime}</div>
                  </article>
                ))}
              </div>

              <a href="#articles" style={{ color: "#fffaf0" }} className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#211a14] px-5 py-4 text-sm font-bold !text-[#fffaf0] hover:-translate-y-1 hover:bg-[#b45309]">
                Start Reading <ArrowRight size={16} />
              </a>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-y border-[#d7c8b2] bg-[#211a14] px-5 py-4 text-[#fffaf0] lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-5 text-center text-xs font-bold uppercase tracking-[0.26em] text-[#d9cbb8] lg:justify-between">
          {categories.map((category) => <a key={category} href="#categories" className="hover:text-white">{category}</a>)}
        </div>
      </section>

      <section id="articles" data-reveal className="px-5 py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-6 border-b border-[#d7c8b2] pb-8 lg:flex-row lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#b45309]">Latest Blog Posts</p>
              <h2 className="mt-4 font-serif text-5xl font-semibold tracking-[-0.06em] sm:text-6xl">Latest from NoteView</h2>
            </div>
            <p className="max-w-md text-base font-medium leading-7 text-[#675a4d]">Fresh articles, practical guides, and simple ideas for modern digital work and everyday clarity.</p>
          </div>

          <div ref={articleRef} onScroll={() => updateCarouselIndex(articleRef.current, setArticleIndex)} className="[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3">
            {articles.map((post) => (
              <article key={post.title} data-reveal className="article-card flex h-full min-w-[86vw] snap-center flex-col overflow-hidden rounded-[2rem] border border-[#d7c8b2] bg-[#fffaf0] shadow-sm md:min-w-0">
                <div className="relative h-56 shrink-0 overflow-hidden">
                  <img src={post.image} alt={`${post.tag} article preview for ${post.title}`} className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-5 flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-[0.18em] text-[#b45309]"><span>{post.tag}</span><span className="shrink-0 text-[#8a7b68]">{post.readTime}</span></div>
                  <h3 className="break-words font-serif text-3xl font-semibold leading-tight tracking-[-0.04em]">{post.title}</h3>
                  <p className="mt-4 text-sm font-medium leading-7 text-[#675a4d]">{post.excerpt}</p>
                  <a href="#subscribe" className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-bold text-[#211a14] hover:text-[#b45309]">Read article <ArrowRight size={15} /></a>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-4 flex justify-center gap-2 md:hidden" aria-hidden="true">
            {articles.map((post, index) => <span key={post.title} className={`h-2 rounded-full transition-all ${articleIndex === index ? "w-7 bg-[#b45309]" : "w-2 bg-[#b45309]/30"}`} />)}
          </div>
        </div>
      </section>

      <section id="categories" data-reveal className="bg-[#fffaf0] px-5 py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-6 border-b border-[#d7c8b2] pb-8 lg:flex-row lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#b45309]">Browse Blog Categories</p>
              <h2 className="mt-4 font-serif text-5xl font-semibold leading-tight tracking-[-0.06em] sm:text-6xl">Browse by interest.</h2>
            </div>
            <p className="max-w-md text-base font-medium leading-7 text-[#675a4d]">Choose the kind of ideas you want to read, from better systems to creative direction.</p>
          </div>

          <div ref={categoryRef} onScroll={() => updateCarouselIndex(categoryRef.current, setCategoryIndex)} className="[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-5">
            {categories.map((category, index) => (
              <article key={category} className="topic-card flex min-h-[230px] min-w-[82vw] snap-center flex-col rounded-[1.75rem] border border-[#d7c8b2] bg-[#f3efe6] p-6 md:min-w-0">
                <div className="mb-8 flex items-center justify-between">
                  <span className="font-serif text-4xl font-semibold text-[#b45309]">0{index + 1}</span>
                  <PenLine size={20} className="text-[#7a6a58]" />
                </div>
                <h3 className="font-serif text-3xl font-semibold tracking-[-0.04em]">{category}</h3>
                <p className="mt-auto pt-5 text-sm font-medium leading-6 text-[#675a4d]">{categoryCopy(category)}</p>
              </article>
            ))}
          </div>

          <div className="mt-4 flex justify-center gap-2 md:hidden" aria-hidden="true">
            {categories.map((category, index) => <span key={category} className={`h-2 rounded-full transition-all ${categoryIndex === index ? "w-7 bg-[#b45309]" : "w-2 bg-[#b45309]/30"}`} />)}
          </div>
        </div>
      </section>

      <section id="popular" data-reveal className="px-5 py-20 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.72fr)]">
          <div className="rounded-[2.2rem] border border-[#d7c8b2] bg-[#211a14] p-7 text-[#fffaf0] shadow-2xl shadow-black/10 lg:p-10">
            <div className="mb-8 flex items-center justify-between border-b border-white/15 pb-6">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#f2b66d]">Popular Articles</p>
                <h2 className="mt-4 font-serif text-5xl font-semibold tracking-[-0.06em] sm:text-6xl">Popular This Week</h2>
              </div>
              <TrendingUp className="hidden shrink-0 text-[#f2b66d] md:block" size={34} />
            </div>

            <div className="space-y-3">
              {popularPosts.map((post, index) => (
                <article key={post} className="popular-row group flex items-center gap-5 rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-5">
                  <span className="font-serif text-4xl font-semibold text-[#f2b66d]">0{index + 1}</span>
                  <h3 className="flex-1 text-lg font-bold tracking-[-0.02em] text-[#fffaf0]">{post}</h3>
                  <ArrowRight className="shrink-0 text-[#d9cbb8] transition group-hover:translate-x-1 group-hover:text-white" size={20} />
                </article>
              ))}
            </div>
          </div>

          <aside className="rounded-[2.2rem] border border-[#d7c8b2] bg-[#fffaf0] p-7 shadow-xl shadow-black/[0.04] lg:p-8">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full bg-[#f3efe6] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#b45309]"><CalendarDays size={14} /> Column Notes</div>
            <h2 className="font-serif text-4xl font-semibold leading-tight tracking-[-0.05em]">Small observations from the reading desk.</h2>
            <div className="mt-7 space-y-4">
              {notes.map((note) => (
                <div key={note} className="flex gap-3 border-b border-[#e5d9c8] pb-4 last:border-b-0">
                  <Check className="mt-1 shrink-0 text-[#b45309]" size={17} />
                  <p className="text-sm font-medium leading-7 text-[#675a4d]">{note}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section id="subscribe" data-reveal className="px-5 py-20 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2.5rem] border border-[#211a14] bg-[#fffaf0] shadow-2xl shadow-black/[0.06] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-[360px] overflow-hidden">
            <img src="https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=1200&q=90" alt="Laptop and notes for newsletter reading" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#211a14]/80 via-[#211a14]/15 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-[#fffaf0]">
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#f2b66d]">Subscribe to NoteView</p>
              <h2 className="mt-4 font-serif text-5xl font-semibold leading-none tracking-[-0.06em]">Get fresh notes in your inbox.</h2>
            </div>
          </div>
          <div className="p-7 lg:p-12">
            <p className="text-lg font-medium leading-8 text-[#675a4d]">Join the NoteView newsletter for weekly articles, useful guides, and curated ideas from the blog.</p>
            <form onSubmit={handleSubscribe} className="mt-10 flex flex-col gap-4 sm:flex-row">
              <input name="email" type="email" className="min-h-14 flex-1 rounded-full border border-[#d7c8b2] bg-[#f3efe6] px-5 text-[#211a14] outline-none placeholder:text-[#8a7b68] focus:border-[#b45309]" placeholder="Enter your email" />
              <button className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#211a14] px-6 text-sm font-bold !text-[#fffaf0] hover:-translate-y-1 hover:bg-[#b45309]">Subscribe <Send size={16} /></button>
            </form>
            <div className="mt-8 grid gap-3 text-sm font-semibold text-[#675a4d] sm:grid-cols-3">
              {["Weekly articles", "Curated guides", "No noise"].map((item) => <div key={item} className="flex items-center gap-2"><Check size={16} className="text-[#b45309]" /> {item}</div>)}
            </div>
          </div>
        </div>
      </section>

      <section id="about" data-reveal className="px-5 pb-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 rounded-[2.3rem] border border-[#d7c8b2] bg-[#fffaf0] p-8 shadow-sm lg:grid-cols-[0.8fr_1.2fr] lg:p-12">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#b45309]">About NoteView</p>
            <h2 className="mt-4 font-serif text-5xl font-semibold leading-tight tracking-[-0.06em] sm:text-6xl">Built for readers who prefer clarity over noise.</h2>
          </div>
          <div className="grid gap-6 text-base font-medium leading-8 text-[#675a4d] lg:grid-cols-2">
            <p>NoteView is a digital journal created for people who enjoy thoughtful writing, useful guides, and simple ideas that make work, life, and creativity easier to understand.</p>
            <p>It brings together productivity, technology, design, lifestyle, writing, and creative work in a focused, distraction-free reading experience.</p>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#d7c8b2] bg-[#211a14] px-5 py-14 text-[#d9cbb8] lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 text-sm font-medium md:grid-cols-[1.25fr_0.8fr_0.8fr_1fr]">
          <div>
            <div className="font-serif text-4xl font-semibold tracking-[-0.06em] text-[#fffaf0]">NoteView</div>
            <p className="mt-4 max-w-md leading-7">Ideas, stories, and notes worth reading.</p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.26em] text-[#f2b66d]">Categories</h3>
            <div className="mt-5 space-y-3">
              {categories.map((category) => <a key={category} href="#categories" className="block hover:text-[#fffaf0]">{category}</a>)}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.26em] text-[#f2b66d]">Explore</h3>
            <div className="mt-5 space-y-3">
              <a href="#articles" className="block hover:text-[#fffaf0]">Latest Posts</a>
              <a href="#popular" className="block hover:text-[#fffaf0]">Popular Articles</a>
              <a href="#home" className="block hover:text-[#fffaf0]">Featured Story</a>
              <a href="#about" className="block hover:text-[#fffaf0]">About</a>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.26em] text-[#f2b66d]">Subscribe</h3>
            <p className="mt-5 leading-7">Get weekly notes and fresh articles in your inbox.</p>
            <a href="#subscribe" className="footer-cta mt-5 inline-flex items-center gap-2 rounded-full bg-[#fffaf0] px-4 py-2 text-sm font-extrabold text-[#211a14] hover:-translate-y-1 hover:bg-white">Join Newsletter <ArrowRight size={15} /></a>
          </div>
        </div>
      </footer>
    </main>
  );
}
