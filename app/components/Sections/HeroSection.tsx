import Image from "next/image";
import HeroImg from "../../assets/HeroImg.png";
export default function HeroSection() {
  return (
    <section className="sm:h-[calc(100vh-100px)] relative">
      <Image
        src={HeroImg}
        alt="hero img"
        className="object-cover object-right sm:object-center w-full sm:h-full"
      />

      <div className="sm:absolute top-[45%] w-full">
        <div className="max-w-360 mx-auto">
          <div className="sm:bg-white p-5 w-fit space-y-3">
            <h2 className="font-dm-sans! text-4xl sm:text-5xl lg:text-6xl font-bold capitalize">
              Simple things <br /> Better living.
            </h2>
            <p className="max-w-lg">
              Explore everyday essentials chosen for their thoughtful design,
              lasting appeal, and effortless place in your life.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
