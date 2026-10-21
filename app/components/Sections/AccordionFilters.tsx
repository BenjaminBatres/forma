import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

interface IListItems {
  id: string;
  name: string;
}

interface IProps {
  title: string;
  name: string;
  listItems: IListItems[];
  handleSortByFilter: (item: string, id: string) => void;
}
export default function AccordionFilters({
  listItems,
  title,
  handleSortByFilter,
  name,
}: IProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(0);
  return (
    <div className={`overflow-hidden border-b border-zinc-200 pb-4.5`}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center cursor-pointer"
      >
        <p className="font-medium">{name}</p>
        <IoIosArrowBack
          className={`text-sm ${isOpen ? "rotate-180" : "rotate-0"} duration-300`}
        />
      </div>
      <div
        className={`overflow-hidden ${isOpen ? "max-h-20" : "max-h-0 h-auto"} cursor-pointer transition-[max-height] duration-300`}
      >
        <div className="mt-4 space-y-3">
          {listItems.map((item, id) => (
            <div
              className="flex gap-2 items-center"
              onClick={() => (
                handleSortByFilter(title, item.id),
                setActive(id)
              )}
              key={id}
            >
              <div
                className={`${active === id ? "bg-black" : ""} border border-zinc-300 rounded h-4.5 w-4.5`}
              />
              <p className="capitalize">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
