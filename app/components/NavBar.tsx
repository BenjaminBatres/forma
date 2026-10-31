import { FaRegHeart } from "react-icons/fa";
import Link from "next/link";
import Menu from "./Menu";
import SearchBar from "./SearchBar";
import AddToCart from "./AddToCart";

export default function NavBar() {
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
      path: "/products/category",
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
          <SearchBar />
          <Link href={"/wishlist"}>
            <FaRegHeart className="text-2xl" />
          </Link>
          <AddToCart />
          <Menu links={links} />
        </div>
      </div>
    </header>
  );
}
