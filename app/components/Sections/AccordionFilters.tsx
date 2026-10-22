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
  activeFilter: string | null;
  setActiveFilter: (filter: string | null) => void;
}

export default function AccordionFilters({
  listItems,
  title,
  handleSortByFilter,
  name,
  activeFilter,
  setActiveFilter,
}: IProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="overflow-hidden border-b border-zinc-200 pb-4.5">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center cursor-pointer"
      >
        <p className="font-medium">{name}</p>
        <IoIosArrowBack
          className={`text-sm ${
            isOpen ? "rotate-180" : "rotate-0"
          } duration-300`}
        />
      </div>

      <div
        className={`overflow-hidden ${
          isOpen ? "max-h-20" : "max-h-0"
        } cursor-pointer transition-[max-height] duration-300`}
      >
        <div className="mt-4 space-y-3">
          {listItems.map((item) => {
            const isActive = activeFilter === `${title}-${item.id}`;

            return (
              <div
                className="flex gap-2 items-center"
                onClick={() => {
                  const filterKey = `${title}-${item.id}`;

                  setActiveFilter(filterKey);
                  handleSortByFilter(title, item.id);
                }}
                key={item.id}
              >
                <div
                  className={`${
                    isActive ? "bg-black" : ""
                  } border border-zinc-300 rounded h-4.5 w-4.5`}
                />
                <p className="capitalize">{item.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
