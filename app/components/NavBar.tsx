import { IoIosSearch } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { TbShoppingBag } from "react-icons/tb";
import Link from "next/link";
import Menu from "./Menu";

export default function NavBar() {
  const linkIcons = [
    {
      path: "/wishlist",

      icon: <FaRegHeart className="text-xl" />,
    },
    {
      path: "/cart",
      icon: <TbShoppingBag className="text-2xl" />,
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
    {
      path: "/about",
      name: "About",
    },
  ];
  return (
    <header className="py-5 px-4">
      <div className="flex justify-between items-center max-w-360 mx-auto">
        <div className="space-y-1.5">
          <h1 className="text-4xl sm:text-5xl font-semibold">
            <Link href={"/"}>forma.</Link>
          </h1>
          <p className="hidden sm:block text-sm text-center text-[#222]/80">
            Thoughtfully chosen. Made for everyday.
          </p>
        </div>

        <ul className="hidden lg:flex gap-8">
          {links.map((link, id) => (
            <li key={id}>
              <Link href={link.path}>{link.name}</Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <IoIosSearch className="text-[28px]" />
          {linkIcons.map((linkIcon, id) => (
            <div key={id}>{linkIcon.icon}</div>
          ))}
          <Menu links={links} />
        </div>
      </div>
    </header>
  );
}
