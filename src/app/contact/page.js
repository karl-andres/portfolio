"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

gsap.registerPlugin(useGSAP);

export default function Contact() {
  const menuWrapRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [btnText, setBtnText] = useState("( Menu )");
  const [form, setForm] = useState({ name: "", subject: "", message: "" });
  const [status, setStatus] = useState("");
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   setStatus("Sending...");
    
  //   try {
  //     const res = await fetch("/api/contact", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(form)
  //     });
  //     if (res.ok) {
  //       setStatus("Message sent!");
  //       setForm({ name: "", subject: "", message: ""});
  //     } else {
  //       setStatus("Failed to send.");
  //     }
  //   } catch {
  //     setStatus("Error sending message.")
  //   }
  // }

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-[99] flex items-center justify-center w-full p-[2rem] box-border pointer-events-auto">
        <div className="absolute left-8"><Link href="/">( Back )</Link></div>
        <div>CONTACT</div>
        <button className="absolute right-8 hover:cursor-pointer" onClick={toggleMenu}>{btnText}</button>
      </header>
      {/* Main Content */}
      <div className="flex flex-col justify-center m-0 min-h-screen w-screen bg-transparent py-[120px] px-24">
        <div className="flex items-center justify-center shrink">
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

          {/* Contact Form Section */}
          <div className="max-w-screen">
            <h1 className="mb-4">/ get in touch</h1>
            <p className="text-4xl tracking-tighter mb-8">Feel free to reach out for collaborations or just a friendly hello</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input 
                  type="text" 
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full p-4 bg-zinc-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-200"
                />
              </div>
              <div>
                <input 
                  type="text" 
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className="w-full p-4 bg-zinc-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-200"
                />
              </div>
              <div>
                <textarea 
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Message"
                  rows="6"
                  className="w-full p-4 bg-zinc-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-200"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="px-8 py-4 bg-cyan-200 text-black rounded-lg font-medium hover:bg-cyan-300 transition-colors"
              >
                Send Message
              </button>
              {status && <p className="mt-2 text-sm">{status}</p>}
            </form>

            <div className="mt-12 flex gap-6">
              <Link 
                href="https://www.linkedin.com/in/karl-andres/" 
                rel="noreferrer noopener"
                target="_blank"
                className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                LinkedIn
              </Link>
              <Link 
                href="mailto:andreskarl129@gmail.com"
                className="px-6 py-3 bg-zinc-700 rounded-lg hover:bg-zinc-600 transition-colors"
              >
                Email Me
              </Link>
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