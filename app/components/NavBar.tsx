import { IoIosSearch } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { TbShoppingBag } from "react-icons/tb";
import Link from "next/link";
import Menu from "./Menu";

export default function NavBar() {
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

  const links = [
    {
      path: "/",
      name: "Home",
    },
    {
      path: "/products",
      name: "Shop All",
    },
    {
      path: "/catgories",
      name: "Categories",
    },
  ];
  return (
    <header className="fixed py-5.5 px-4 z-50 w-full bg-white shadow">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-semibold">
          <Link href={"/"}>forma.</Link>
        </h1>

        <ul className="hidden lg:flex gap-8 mt-2.5">
          {links.map((link, id) => (
            <li key={id}>
              <Link href={link.path} className="text-[17px]">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4 mt-2.5">
          <IoIosSearch className="text-[30px]" />
          {linkIcons.map((linkIcon, id) => (
            <div key={id}>{linkIcon.icon}</div>
          ))}
          <Menu links={links} />
        </div>
      </div>
    </header>
  );
}
