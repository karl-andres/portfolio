import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function MenuWrap({ isOpen, menuLinks, handleHover }) {
  const menuWrapRef = useRef(null);

  useGSAP(() => {
    gsap.set(menuWrapRef.current, { xPercent: 150 });
  }, []);

  useEffect(() => {
    gsap.killTweensOf(menuWrapRef.current);
    gsap.to(menuWrapRef.current, {
      xPercent: isOpen ? 0 : 150,
      duration: 0.5,
      ease: isOpen ? "power4.out" : "power4.in",
    });
  }, [isOpen]);

  return (
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
  );
}