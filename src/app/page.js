"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

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

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-[99] flex items-center justify-center w-full p-[2rem] box-border pointer-events-auto">
        <div className="absolute left-8 font-semibold">Karl Andres</div>
        <div>PORTFOLIO</div>
      </header>
      {/* Main Content */}
      <div className="flex flex-col items-center justify-center m-0 h-screen w-screen bg-transparent">
        <div className="shrink">
          {/* Button */}
          <button className="hover:cursor-pointer text-white" onClick={toggleMenu}>
            {btnText}
          </button>
          {/* Menu-wrap */}
          <div ref={menuWrapRef} className="fixed top-0 bottom-0 right-0 h-screen min-w-[30rem] w-auto bg-zinc-900/90 z-50 rounded-l-2xl">
            <div className="flex flex-col items-stretch justify-start py-20 bg-transparent">
              {menuLinks.map((text, index) => (
                <Link
                  href={text === "Home" ? "/" : `/${text.toLowerCase()}`}
                  key={index}
                  className="group menu-link relative flex flex-col shrink items-start justify-center px-[1em] py-[0.4em] w-auto h-auto overflow-clip text-5xl"
                  onMouseEnter={(e) => handleHover(index, e)}
                >
                  <p className="menu-link-text tracking-tighter">{text}</p>
                  <div className="menu-link-indicator absolute top-0 bottom-0 left-0 w-0 group-hover:w-2 bg-white transition-all duration-300"></div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
}
