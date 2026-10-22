import Link from "next/link";

export default function Footer() {
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
    <footer className="py-13 px-5 bg-white">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-5xl font-semibold text-center md:text-left">
              forma.
            </h2>
            <p>Thoughtfully chosen. Made for everyday.</p>
          </div>
          <ul className="flex gap-2">
            {links.map((link, id) => (
              <li key={id} className="flex gap-2 items-center">
                <Link href={link.path} className="text-[#222]/80">
                  {link.name}
                </Link>
                <p
                  className="text-[#222]/80 text-sm"
                  style={{ display: id === 2 ? "none" : "" }}
                >
                  &bull;
                </p>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-[#222]/80 text-center md:text-left">
          Copyright &copy;2026 forma. All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
