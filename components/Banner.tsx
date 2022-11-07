import React from "react";
import Image from "next/image";

function Banner() {
  return (
    <div className="relative mx-auto my-0">
      <Image
        className="w-full h-[20rem] object-cover overflow-hidden"
        src="https://res.cloudinary.com/dz58encu1/image/upload/w_1450/q_auto,f_auto/v1666793434/286590861_378543417641534_6470475454945430459_n_zbvy8f.jpg"
        alt=""
        height={300}
        width={1450}
      />
      <div className="absolute bottom-0 bg-black bg-opacity-30 h-full w-full py-20">
        <h1 className="text-center text-5xl sm:text-left sm:text-6xl pt-[1rem] px-[2rem] text-white font-bold max-w-xl">
          Rate My Installation
        </h1>
        <h2 className="hidden text-xl px-[2rem] pb-[1rem] text-white font-bold md:block">
          Helping you plan your next move through first hand insights.
        </h2>
      </div>
    </div>
  );
}

export default Banner;
