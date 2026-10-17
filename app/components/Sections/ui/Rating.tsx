import { IoMdStar, IoMdStarHalf } from "react-icons/io";

interface IProps {
  rating: number;
}

export default function Rating({ rating }: IProps) {
  return (
    <div className="flex">
      {new Array(Math.floor(rating)).fill(0).map((_, id) => (
        <IoMdStar key={id} className="text-yellow-500" />
      ))}
      {!Number.isInteger(rating) && (
        <IoMdStarHalf className="text-yellow-500" />
      )}
    </div>
  );
}
