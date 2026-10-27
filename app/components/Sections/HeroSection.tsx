"use client";
import Image from "next/image";
import HeroImg from "../../assets/HeroImg.png";
import HeroImg2 from "../../assets/HeroImg2.jpg";
import HeroImg3 from "../../assets/HeroImg3.jpg";
import HeroImg4 from "../../assets/HeroImg4.jpg";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [HeroImg, HeroImg2, HeroImg3, HeroImg4];
  const heroDescritpions = [
    {
      title: "Simple things. \nBetter living.",
      desc: "Explore everyday essentials chosen for their thoughtful design, lasting appeal, and effortless place in your life.",
    },
    {
      title: "Fresh Choices. \nEveryday Goodness.",
      desc: "Discover everyday staples selected for their freshness, quality, and the little moments that make every meal more meaningful.",
    },
    {
      title: "Find Your Signature. \nLeave an Impression.",
      desc: "Explore captivating scents chosen for their unique character, lasting impressions, and the art of expressing who you are.",
    },
    {
      title: "Thoughtful Spaces. \nTimeless Living.",
      desc: "Discover thoughtfully crafted furniture chosen for its timeless design, everyday comfort, and the way it transforms your space into a place that feels like home.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 6500);
    return () => clearInterval(interval);
  }, []);
  return (
    <section className="sm:h-screen relative">
      {images.map((img, id) => (
        <Image
          key={id}
          src={img}
          alt=""
          quality={100}
          loading="eager"
          sizes="100vw"
          className={`select-none absolute object-cover object-right sm:object-center w-full h-90 sm:h-full ${currentImage === id ? "opacity-100" : "opacity-0"} duration-300`}
        />
      ))}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImage}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
            exit: {
              opacity: 0,
            },
          }}
          className="sm:absolute top-[43%] w-full sm:px-5 pt-90 pb-[30vh] small-devices:pb-50 sm:pt-0"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
            }}
            className="max-w-7xl mx-auto"
          >
            {heroDescritpions.map((info, id) => (
              <div
                key={id}
                className={`sm:bg-white pt-8 pb-10 sm:py-5 px-5 sm:p-5 w-fit space-y-3 absolute ${currentImage === id ? "opacity-100" : "opacity-0"}`}
              >
                <h2 className="font-dm-sans! text-4xl sm:text-5xl lg:text-6xl font-bold capitalize whitespace-pre-line">
                  {info.title}
                </h2>
                <p className="max-w-lg">{info.desc}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
