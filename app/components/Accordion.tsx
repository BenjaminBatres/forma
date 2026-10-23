import { ParamValue } from "next/dist/server/request/params";
import Link from "next/link";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

interface IAccordion {
  id: ParamValue;
  title: string;
  listItems: string[];
  sortBy?: string | string[];
  setSortBy?: React.Dispatch<React.SetStateAction<string | string[]>>;
  onClick?: (item: string) => void;
}

export default function Accordion({
  id,
  title,
  listItems,
  onClick,
  sortBy,
}: IAccordion) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`overflow-hidden border-b border-zinc-200 pb-4.5`}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center cursor-pointer"
      >
        <p className="font-medium">{title}</p>
        <IoIosArrowBack
          className={`text-sm ${isOpen ? "rotate-180" : "rotate-0"} duration-300`}
        />
      </div>
      <div
        className={`overflow-hidden ${isOpen ? (listItems.length > 2 ? "max-h-47" : "max-h-20") : "max-h-0 h-auto"} cursor-pointer transition-[max-height] duration-300`}
      >
        <div className="mt-4 space-y-3">
          {id ? (
            <>
              {listItems.map((item, idx) => (
                <Link
                  href={
                    item === "All" ? "/products" : `/products/category/${item}`
                  }
                  className="flex gap-2 items-center"
                  onClick={() => onClick?.(item)}
                  key={idx}
                >
                  <div
                    className={`${sortBy === item ? "bg-black" : ""} border border-zinc-300 rounded h-4.5 w-4.5`}
                  />
                  <p className="capitalize">{item}</p>
                </Link>
              ))}
            </>
          ) : (
            <>
              {listItems.map((item, idx) => (
                <div
                  className="flex gap-2 items-center"
                  onClick={() => onClick?.(item)}
                  key={idx}
                >
                  <div
                    className={`${sortBy === item ? "bg-black" : ""} border border-zinc-300 rounded h-4.5 w-4.5`}
                  />
                  <p className="capitalize">{item}</p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
