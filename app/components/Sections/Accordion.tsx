import { useState } from "react"
import { IoIosArrowBack } from "react-icons/io";

interface IAccordion {
    title: string
    listItems: string[]
}

export default function Accordion({title, listItems}: IAccordion) {
    const [isOpen, setIsOpen] = useState(false)
    
  return (
    <div className={`overflow-hidden border-b border-zinc-200 pb-4.5`}>
        <div onClick={() => setIsOpen(!isOpen)} className="flex justify-between items-center cursor-pointer">
        <p className="font-medium">{title}</p>
        <IoIosArrowBack className="text-sm" />
        </div>
        <div className={`overflow-hidden ${isOpen ? "max-h-20" : 'max-h-0 h-auto'} cursor-pointer transition-[max-height] duration-300`}>
            <div className="mt-4 space-y-3">
                {listItems.map((item, id) => (
            <div className="flex gap-2" key={id}>
                <div className="border h-4.5 w-4.5"/>
                <p>Highest to Lowest</p>
            </div>

                ))}
            <div className="flex gap-2">
                <div className="border h-4.5 w-4.5"/>
                <p>Highest to Lowest</p>
            </div>

            </div>
        </div>
    </div>
  )
}
