"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { EB_Garamond } from "next/font/google";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

gsap.registerPlugin(useGSAP);

export default function Home() {
  const menuWrapRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [btnText, setBtnText] = useState("( Menu )")
  const lastIndexRef = useRef(null);
  const offsetEm = 1.6;

  // Make sure menu initially starts off-screen
  useGSAP(() => {
    gsap.set(menuWrapRef.current, { xPercent: 150 });
    setIsOpen(false);
    setBtnText("( Menu )")
  }, [])

  // Handle menu toggle
  const toggleMenu = () => {
    gsap.killTweensOf(menuWrapRef.current);

    if (!isOpen) {
      gsap.to(menuWrapRef.current, {
        xPercent: 0,
        duration: 0.5,
        ease: "power4.out"
      });

      setBtnText("( Close )")
    } else {
      gsap.to(menuWrapRef.current, {
        xPercent: 150,
        duration: 0.5,
        ease: "power4.in"
      });

      setBtnText("( Menu )")
    }

    setIsOpen(!isOpen);
  }

  const handleHover = (index, e) => {
    const direction =
      lastIndexRef.current === null
        ? -1
        : index > lastIndexRef.current
          ? -1
          : 1;

    lastIndexRef.current = index;

    const spans = e.currentTarget.querySelectorAll(".menu-link-text");
    gsap.killTweensOf(spans);
    gsap.fromTo(
      spans,
      { y: `${direction * offsetEm}em` },
      {
        y: "0em",
        duration: 0.6,
        ease: "power4.out",
      }
    );
  };

  const menuLinks = ["Home", "Projects", "About", "Contact"];

  useGSAP(() => {

    gsap.from(".hero-text", {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
      delay: 0.3
    });

    gsap.from(".hero-subtext", {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
      delay: 0.5
    });

    gsap.from(".hero-cta", {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
      delay: 0.7
    });
  }, []);

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-[99] flex items-center justify-center w-full p-[2rem] box-border pointer-events-auto">
        <div className="absolute left-8 font-semibold">Karl Andres</div>
        <div>HOME</div>
        <button className="absolute right-8 hover:cursor-pointer" onClick={toggleMenu}>{btnText}</button>
      </header>
      {/* Main Content */}
      <div className="relative flex flex-col items-center justify-center m-0 h-screen w-screen bg-transparent overflow-hidden">
        {/* Animated art / gradient blob */}
        {/* <div className="animated-blob" aria-hidden="true" /> */}
        <div className="relative z-10 shrink">
          <div className="flex flex-col items-center justify-center text-center space-y-5 mt-[-4rem] px-6">
            <h1 className={`${ebGaramond.className} text-white text-4xl sm:text-5xl md:text-6xl tracking-tight hero-text`}>
              hey, karl here
            </h1>
            <p className="text-zinc-200 text-base sm:text-lg md:text-xl max-w-xl hero-subtext">
              Hi! I&apos;m a software engineer that&apos;s based in Ontario{" "}
              <span className="hidden sm:inline">with a special interest in AI, data, and music.</span>
            </p>
            {/* <p className="text-zinc-300 text-sm sm:text-base md:text-lg hero-subtext">
              Currently building AI-powered music tools and fullstack apps that feel fast, reliable, and fun to use.
            </p> */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 hero-cta">
              <Link
                href="/about"
                className="px-6 py-3 bg-white text-black rounded-full text-base sm:text-lg font-semibold hover:scale-105 transition-transform"
              >
                About Me
              </Link>
              <Link
                href="/projects"
                className="px-6 py-3 border border-white/70 text-white rounded-full text-base sm:text-lg font-semibold hover:bg-white/10 hover:scale-105 transition-transform"
              >
                View Projects
              </Link>
            </div>
            {/* <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-zinc-300">
              <span className="px-3 py-1 rounded-full bg-zinc-900/70 border border-zinc-700/80">
                Next.js &nbsp;•&nbsp; React &nbsp;•&nbsp; TypeScript
              </span>
              <span className="px-3 py-1 rounded-full bg-zinc-900/70 border border-zinc-700/80">
                Python &nbsp;•&nbsp; FastAPI &nbsp;•&nbsp; PostgreSQL
              </span>
              <span className="px-3 py-1 rounded-full bg-zinc-900/70 border border-zinc-700/80">
                AI &nbsp;•&nbsp; Music &nbsp;•&nbsp; Creative tools
              </span>
            </div> */}
          </div>
          {/* Menu-wrap */}
          <div ref={menuWrapRef} className="fixed top-0 bottom-0 right-0 h-screen min-w-[30rem] w-auto bg-zinc-900/98 z-50 rounded-l-2xl">
            <div className="flex flex-col items-stretch justify-start py-20 bg-transparent">
              {menuLinks.map((text, index) => (
                <Link
                  href={text === "Home" ? "/" : `/${text.toLowerCase()}`}
                  key={index}
                  className="group menu-link relative flex flex-col shrink items-start justify-center px-[1em] py-[0.4em] w-auto h-auto overflow-clip text-5xl"
                  onMouseEnter={(e) => handleHover(index, e)}
                >
                  <p className="menu-link-text tracking-tighter font-medium">{text}</p>
                  <div className="menu-link-indicator absolute top-0 bottom-0 left-0 w-0 group-hover:w-2 bg-white transition-all duration-300"></div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <footer className="fixed bottom-0 left-0 right-0 z-[99] flex items-center justify-center w-full p-[2rem] box-border pointer-events-auto">
          <div className="absolute left-8"> </div>
          <button className="absolute right-8 hover:cursor-pointer text-white">
            <Link rel="noreferrer noopener" href="https://github.com/karl-andres">GitHub</Link>
            <ExternalLink className="inline ml-2" />
          </button>
        </footer>
      </div>

    </>
  );
}
