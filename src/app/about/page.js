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
      <div className="flex flex-col justify-center m-0 min-h-screen w-screen bg-transparent py-[120px] px-24">
        <div className="flex items-center justify-between shrink">
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
          {/* Writing Section */}
          <div className="max-w-[50%]">
            <h1 className="mb-4">/ about me</h1>
            <p className="text-4xl tracking-tighter">I am currently a <em>software engineer</em> with a strong interest in problem-solving and technology. I am also a student at <Link rel="noreferrer noopener" className="font-bold text-cyan-200" href="https://www.mcmaster.ca/">McMaster University</Link> pursuing the Software Engineering program. I chose this path because I love the challenge of breaking down complex problems and building innovative solutions.</p>
            <p className="text-4xl tracking-tighter my-14">Outside of coding, I enjoy playing the guitar, video games, and watching anime.</p>

            <h1 className="mb-4">/ technical skills</h1>
            <p className="text-4xl tracking-tighter mb-4">These are the list of technologies I have worked with:</p>
            <ul className="list-disc ml-6">
              <li className="tracking-tighter text-xl">Javascript</li>
              <li className="tracking-tighter text-xl">Python</li>
              <li className="tracking-tighter text-xl">Java</li>
              <li className="tracking-tighter text-xl">Next.js/React</li>
            </ul>
          </div>
          {/* Image Section */}
          <div className="flex-1 flex justify-center items-center">
            <Image className="rounded-xl object-cover"src="/me.jpg" alt="Picture of me" width={500} height={735}/>
          </div>
        </div>
        <footer className="fixed bottom-0 left-0 right-0 z-[99] flex items-center justify-center w-full p-[2rem] box-border pointer-events-auto">
          <button className="absolute right-8 hover:cursor-pointer text-white">
            <Link rel="noreferrer noopener" href="https://github.com/karl-andres">GitHub</Link>
            <ExternalLink className="inline ml-2" />
          </button>
          <button className="absolute left-8 hover:cursor-pointer text-white">Bottom Left</button>
        </footer>
      </div>
    </>
  );
} 