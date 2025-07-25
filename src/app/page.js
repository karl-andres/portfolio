"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

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
      { y: `${ direction * offsetEm}em` },
      {
        y: "0em",
        duration: 0.6,
        ease: "power4.out",
      }
    );
  };

  const menuLinks = ["Home", "Projects", "About", "Contact"];

  useGSAP(() => {
  gsap.set(menuWrapRef.current, { xPercent: 150 });

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
      <div className="flex flex-col items-center justify-center m-0 h-screen w-screen bg-transparent">
        <div className="shrink">
          <div className="flex flex-col items-center justify-center text-center space-y-4 mt-[-4rem]">
            <h1 className="text-white text-6xl font-bold hero-text">Hey, I'm Karl</h1>
            <p className="text-zinc-300 text-xl hero-subtext">I solve real-world problems through software engineering</p>
            <Link
              href="/about"
              className="px-6 py-3 bg-white text-black rounded-full text-lg font-semibold hover:scale-105 transition-transform hero-cta"
            >
              About Me
            </Link>
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
          <div className="absolute left-8">Bottom Left</div>
          <button className="absolute right-8 hover:cursor-pointer text-white">
            <Link rel="noreferrer noopener" href="https://github.com/karl-andres">GitHub</Link>
            <ExternalLink className="inline ml-2" />
          </button>
        </footer>
      </div>

    </>
  );
}
