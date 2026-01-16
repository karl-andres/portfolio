"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

gsap.registerPlugin(useGSAP);

export default function About() {
  const menuWrapRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [btnText, setBtnText] = useState("( Menu )");
  const lastIndexRef = useRef(null);
  const offsetEm = 1.6;

  useGSAP(() => {
    gsap.set(menuWrapRef.current, { xPercent: 150 });
  }, []);

  const toggleMenu = () => {
    gsap.killTweensOf(menuWrapRef.current);
    if (!isOpen) {
      gsap.to(menuWrapRef.current, {
        xPercent: 0,
        duration: 0.5,
        ease: "power4.out",
      });
      setBtnText("( Close )");
    } else {
      gsap.to(menuWrapRef.current, {
        xPercent: 150,
        duration: 0.5,
        ease: "power4.in",
      });
      setBtnText("( Menu )");
    }
    setIsOpen(!isOpen);
  };

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

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-[99] flex items-center justify-center w-full p-[2rem] box-border pointer-events-auto">
        <div className="absolute left-8"><Link href="/">( Back )</Link></div>
        <div>ABOUT</div>
        <button className="absolute right-8 hover:cursor-pointer" onClick={toggleMenu}>{btnText}</button>
      </header>
      {/* Main Content */}
      <div className="flex flex-col justify-center m-0 min-h-screen w-screen bg-transparent py-[120px] px-4 md:px-24">
        <div className="flex flex-col md:flex-row items-center justify-center shrink gap-10 md:gap-20">
          {/* Image Section */}
          <div className="w-full md:w-1/3 flex justify-center items-center mb-8 md:mb-0">
            <Image
              className="rounded-xl object-cover shadow-lg"
              src="/me.jpg"
              alt="Picture of me"
              width={300}
              height={400}
              priority
            />
          </div>
          {/* Writing Section */}
          <div className="w-full md:w-2/3 flex flex-col gap-8">
            <section>
              <h1 className="mb-6 text-2xl md:text-5xl tracking-tighter">/ about me</h1>
              <p className="text-lg md:text-2xl tracking-tight mb-4">
                Hi, I&apos;m Karl, a{" "}
                <span className="font-semibold text-cyan-200">software engineer</span> and student at{" "}
                <Link
                  rel="noreferrer noopener"
                  className="font-bold text-cyan-200"
                  href="https://www.mcmaster.ca/"
                >
                  McMaster University
                </Link>
                . I love breaking down complex problems and building end-to-end products—from fast UIs to reliable
                backend systems.
              </p>
              <p className="text-lg md:text-2xl tracking-tight mb-4">
                I&apos;m especially excited about the intersection of{" "}
                <span className="font-semibold text-cyan-200">AI, audio, and creative tools</span>. Lately I&apos;ve
                been building AI-powered music generation experiences and tools that plug directly into FL Studio to
                streamline music production.
              </p>
              <p className="text-lg md:text-2xl tracking-tight mb-4">
                Outside of tech, I&apos;m a <span className="font-semibold text-cyan-200">music producer</span> and
                guitarist. When I&apos;m not coding, you&apos;ll usually find me writing tracks, playing games, or
                watching anime.
              </p>
            </section>
            {/* <section>
              <h2 className="mb-2 text-2xl md:text-4xl tracking-tighter">/ technical skills</h2>
              <p className="text-lg md:text-2xl tracking-tight mb-4">Technologies I&apos;ve worked with:</p>
              <div className="flex flex-wrap gap-3">
                {[
                  "TypeScript",
                  "Python",
                  "C++",
                  "Next.js",
                  "React",
                  "Node.js",
                  "FastAPI",
                  "PostgreSQL",
                  "Prisma ORM",
                  "AWS",
                  "Tailwind CSS",
                  "Git",
                ].map((tech, idx) => (
                  <span
                    key={idx}
                    className="bg-zinc-700 text-zinc-200 px-4 py-2 rounded-full text-base md:text-lg font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section> */}
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
        {/* Footer */}
        <footer className="fixed bottom-0 left-0 right-0 z-[99] flex items-center justify-center w-full p-[2rem] box-border pointer-events-auto">
          <button className="absolute right-8 hover:cursor-pointer text-white">
            <Link rel="noreferrer noopener" href="https://github.com/karl-andres">GitHub</Link>
            <ExternalLink className="inline ml-2" />
          </button>
          <button className="absolute left-8 hover:cursor-pointer text-white"> </button>
        </footer>
      </div>
    </>
  );
}