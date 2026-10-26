import Image from "next/image";
import HeroImg from "../../assets/HeroImg.png";
import HeroImg2 from "../../assets/HeroImg2.jpg";
import HeroImg3 from "../../assets/HeroImg3.jpg";
import HeroImg4 from "../../assets/HeroImg4.jpg";
import Link from "next/link";
import * as motion from "motion/react-client";

export default function page() {
  const categories = [
    {
      id: "beauty",
      image: HeroImg,
      title: "Beauty",
      imagePostion: "object-right",
    },
    {
      id: "fragrances",
      image: HeroImg2,
      title: "Fragrances",
      imagePostion: "object-center",
    },
    {
      id: "groceries",
      image: HeroImg3,
      title: "Groceries",
      imagePostion: "object-[65%_50%]",
    },
    {
      id: "furniture",
      image: HeroImg4,
      title: "Furniture",
      imagePostion: "object-[65%_50%]",
    },
  ];
  return (
    <>
      <section className="pt-35 md:pt-45 pb-10 md:pb-20 px-5">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[38px] sm:text-[44px] leading-[120%] md:text-5xl lg:text-[54px] font-bold"
            >
              Shop by Category
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-Muted text-sm max-w-xl"
            >
              Explore our collections and find exactly what you’re looking for.
              Shop your favorite categories to discover products that fit your
              style, needs, and everyday essentials.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {categories.map((category, id) => (
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: id * 0.15, duration: 0.5 }}
                className="h-80 md:h-115 relative group overflow-hidden"
                key={id}
              >
                <Link href={`/products/category/${category.id}`}>
                  <Image
                    src={category.image}
                    alt=""
                    className={`group-hover:scale-110 duration-500 ease-in-out h-full object-cover ${category.imagePostion}`}
                    quality={100}
                    loading="eager"
                    sizes="100vw"
                  />
                  {id === 1 && (
                    <div className="absolute inset-0 bg-linear-to-b from-black/45" />
                  )}
                  {id === 3 && (
                    <div className="absolute inset-0 bg-linear-to-b from-black/45 md:from-black/25" />
                  )}
                  <div className="absolute inset-0 py-7.5 flex flex-col justify-between items-center">
                    <h2 className="text-[32px] text-white font-bold">
                      {category.title}
                    </h2>
                    <div className="py-3 px-4 bg-white rounded font-medium">
                      Shop Now
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
