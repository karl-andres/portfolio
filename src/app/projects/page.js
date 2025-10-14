'use client';

import Link from "next/link";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { ExternalLink } from "lucide-react";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

const projects = [
  {
    title: "Portfolio Website",
    description: "Code for my portfolio showcasing my work and skills.",
    links: [
      { icon: <FaGithub />, url: "https://github.com/karl-andres/portfolio", label: "GitHub" },
    ],
    tech: ["Next.js", "TailwindCSS", "GSAP"],
  },
  {
    title: "TuneSpy",
    description: "Fullstack project utilizing an existing deep learning model for musical chord recognition",
    links: [
      { icon: <FaGithub />, url: "https://github.com/karl-andres/TuneSpy", label: "GitHub" },
    ],
    tech: ["Next.js", "FastAPI", "Prisma (ORM)", "PostgreSQL"],
  },
  {
    title: "ChordCaster",
    description: "An Arduino-based device that controls a DFPlayer Mini MP3 module to play songs, adjust volume, and modify tempo using physical buttons.",
    links: [
      { icon: <FaGithub />, url: "https://github.com/karl-andres/ChordCaster", label: "Github" },
      { icon: <FaExternalLinkAlt />, url: "https://root-spleen-f5f.notion.site/Project-Three-ChordCaster-1c9adbb3a79e81149a06c027c8d5b576", label: "External"}
    ],
    tech: ["C++ (Arduino)"]
  },
  {
    title: "Musica",
    description: "AI Music Generation SaaS that generates original music and cover art from text prompts",
    links: [
      { icon: <FaGithub />, url: "https://github.com/karl-andres/music-generation-app", label: "Github" },
      { icon: <FaExternalLinkAlt />, url: "https://music-generation-app-nine.vercel.app/", label: "External" },
    ],
    tech: ["Next.js", "AWS", "Modal", "Inngest",  "PostgreSQL with Prisma ORM"]
  }
];

const menuLinks = ["Home", "Projects", "About", "Contact"];

export default function Projects() {
  const menuWrapRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [btnText, setBtnText] = useState("( Menu )");

  useGSAP(() => {
    gsap.set(menuWrapRef.current, { xPercent: 150 });
    setIsOpen(false);
    setBtnText("( Menu )")
  }, [])

  const toggleMenu = () => {
    gsap.killTweensOf(menuWrapRef.current);
    if (!isOpen) {
      gsap.to(menuWrapRef.current, {
        xPercent: 0,
        duration: 0.5,
        ease: "power4.out"
      });
      setBtnText("( Close )");
    } else {
      gsap.to(menuWrapRef.current, {
        xPercent: 150,
        duration: 0.5,
        ease: "power4.in"
      });
      setBtnText("( Menu )");
    }
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[99] flex items-center justify-center w-full p-[2rem] box-border pointer-events-auto">
        <div className="absolute left-8"><Link href="/">( Back )</Link></div>
        <div>PROJECTS</div>
        <button className="absolute right-8 hover:cursor-pointer" onClick={toggleMenu}>{btnText}</button>
      </header>
      <div className="flex flex-col justify-center m-0 min-h-screen w-screen bg-transparent py-[120px] px-24">
        <div className="flex items-center justify-center shrink">
          <div ref={menuWrapRef} className="fixed top-0 bottom-0 right-0 h-screen min-w-[30rem] w-auto bg-zinc-900/98 z-50 rounded-l-2xl">
            <div className="flex flex-col items-stretch justify-start py-20 bg-transparent">
              {menuLinks.map((text, index) => (
                <Link
                  href={text === "Home" ? "/" : `/${text.toLowerCase()}`}
                  key={index}
                  className="group menu-link relative flex flex-col shrink items-start justify-center px-[1em] py-[0.4em] w-auto h-auto overflow-clip text-5xl"
                >
                  <p className="menu-link-text tracking-tighter font-medium">{text}</p>
                  <div className="menu-link-indicator absolute top-0 bottom-0 left-0 w-0 group-hover:w-2 bg-white transition-all duration-300"></div>
                </Link>
              ))}
            </div>
          </div>
          {/* Projects Grid */}
          <div className="w-full">
            <h1 className="mb-4 text-5xl font-bold tracking-tighter">projects</h1>
            <p className="text-xl text-zinc-300 mb-8">A selection of things I&apos;ve built and contributed to.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl">
              {projects.map((project, idx) => (
                <div
                  key={idx}
                  className="bg-zinc-800/70 rounded-2xl p-8 flex flex-col justify-between shadow-lg border border-zinc-700 hover:scale-105 transition-transform"
                >
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
                    <p className="text-zinc-300 mb-4">{project.description}</p>
                  </div>
                  <div className="mb-4 flex gap-4">
                    {project.links.map((link, i) => (
                      <Link
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-200 hover:text-cyan-300 text-2xl"
                        aria-label={link.label}
                      >
                        {link.icon}
                      </Link>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="bg-zinc-700 text-zinc-200 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <footer className="fixed bottom-0 left-0 right-0 z-[99] flex items-center justify-center w-full p-[2rem] box-border pointer-events-auto">
          <button className="absolute right-8 hover:cursor-pointer text-white">
            <Link rel="noreferrer noopener" href="https://github.com/karl-andres">GitHub</Link>
            <ExternalLink className="inline ml-2" />
          </button>
          <button className="absolute left-8 hover:cursor-pointer text-white"> </button>
        </footer>
      </div>
    </>
  )
};