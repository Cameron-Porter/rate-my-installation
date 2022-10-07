import Image from "next/image";
import React from "react";
import lh from "../public/media/lighthouse-w.png";

function Banner() {
  return (
    <div className="justify-between items-center bg-[url('../public/media/hero.jpg')]  bg-cover bg-center lg:py-0">
      <div className="bg-gradient-to-b from-white to-transparent h-[4rem] w-full"></div>
      <div className="px-10 space-y-5 py-[8rem]">
        <h1 className="hidden sm:block text-4xl lg:text-6xl max-w-xl">
          <span className="underline decoration-blue-400 decoration-4">
            Rate My Unit
          </span>
          , shining a light on military units
        </h1>
        <h2 className="hidden sm:block">
          Helping you plan your next move through first hand insights.
        </h2>
      </div>
      <div className="hidden md:inline-flex">
        <Image
          className="object-contain h-32 lg:h-full"
          src={lh}
          alt=""
          width="400"
          height="400"
        />
      </div>
      <div className="bg-gradient-to-b from-transparent via-white/[.6] to-white h-[10rem] w-full mb-7"></div>
    </div>
  );
}

export default Banner;
