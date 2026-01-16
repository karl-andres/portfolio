import { Montserrat } from "next/font/google";
import "./globals.css";
import { unstable_ViewTransition as ViewTransition } from 'react'
import SilkBackground from '@/components/SilkBackground'

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata = {
  title: "Karl",
  description: "Portfolio for Karl Andres",
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({ children }) {
  return (
    <ViewTransition>
      <html lang="en">
        <body
          className={`${montserrat.className} antialiased block m-0 p-0 font-normal text-base leading-none rounded-none outline-none cursor-auto text-white`}
        >
          <SilkBackground />
          {children}
        </body>
      </html>
    </ViewTransition>
  );
}
