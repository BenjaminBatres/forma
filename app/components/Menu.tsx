"use client";

import Link from "next/link";
import { useState } from "react";
import { LuArrowUpRight } from "react-icons/lu";

interface ILinks {
  path: string;
  name: string;
}

interface IProps {
  links: ILinks[];
}
export default function Menu({ links }: IProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="lg:hidden">
      <div
        className="relative size-8 flex flex-col justify-center gap-3 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          className={`w-full h-0.5 bg-black transition-all duration-400 ease-in-out ${isOpen ? "rotate-45 translate-y-1.75" : "rotate-0 "}`}
        />
        <div
          className={`w-full h-0.5 bg-black transition-all duration-400 ease-in-out ${isOpen ? "-rotate-45 -translate-y-1.75" : "rotate-0"}`}
        />
      </div>

      <div
        className={`absolute top-21 sm:top-23 left-0 w-full z-50 ${isOpen ? "max-h-105" : "pointer-events-none max-h-0"} transition-all duration-500 ease-linear  overflow-hidden shadow`}
      >
        <div className="bg-[#FAF9F6] px-4 py-6 border-y border-zinc-300">
          <ul className="flex flex-col gap-4">
            {links.map((link, id) => (
              <li key={id}>
                <Link
                  onClick={() => setIsOpen(false)}
                  href={link.path}
                  className="text-lg flex justify-between items-center"
                >
                  {link.name}
                  <LuArrowUpRight className="text-xl" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
