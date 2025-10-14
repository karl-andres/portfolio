import Link from "next/link";

export default function Header({ title, btnText, onMenuClick }) {
    return (
      <header className="fixed top-0 left-0 right-0 z-[99] flex items-center justify-center w-full p-[2rem] box-border pointer-events-auto">
        <div className="absolute left-8"><Link href="/">( Back )</Link></div>
        <div>{title}</div>
        <button className="absolute right-8 hover:cursor-pointer" onClick={onMenuClick}>{btnText}</button>
      </header>
    )
}