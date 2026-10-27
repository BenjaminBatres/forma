'use client'
import { useState } from "react";
import Menu from "./Menu";
import SearchBar from "./SearchBar";
import { FaRegHeart } from "react-icons/fa";
import { TbShoppingBag } from "react-icons/tb";

interface ILinks {
  path: string;
  name: string;
}

interface IProps {
  links: ILinks[];
}
export default function NavActions({ links }: IProps) {
    const [isOpen, setIsOpen] = useState(false);
  const linkIcons = [
    {
      path: "/wishlist",

      icon: <FaRegHeart className="text-2xl" />,
    },
    {
      path: "/cart",
      icon: <TbShoppingBag className="text-[28px]" />,
    },
  ];
  return (
    <div className="flex items-center gap-4 mt-2.5">
      <SearchBar />
      {linkIcons.map((linkIcon, id) => (
        <div key={id}>{linkIcon.icon}</div>
      ))}
      <Menu links={links} />
    </div>
  );
}
