import React from "react";

function Banner() {
  return (
    <div className="justify-between items-center bg-[url('https://res.cloudinary.com/dz58encu1/image/upload/w_1450/q_auto,f_auto/v1666793434/286590861_378543417641534_6470475454945430459_n_zbvy8f.jpg')]  bg-cover bg-center lg:py-0 saturate-150">
      <div className="flex items-center bg-gradient-to-b from-white via-transparent to-white h-[30rem] sm:h-[40rem] w-full">
        <div className="mx-auto flex flex-wrap h-[10rem] sm:ml-[2rem] md:ml-[3rem] md:h-[15rem] items-center max-w-lg bg-gradient-radial from-black rounded-3xl">
          <h1 className="text-center sm:text-left text-6xl pt-[1rem] px-[3rem] text-white font-bold max-w-xl">
            Rate My Installation
          </h1>
          <h2 className="hidden text-xl px-[3rem] pb-[1rem] text-white font-bold md:block">
            Helping you plan your next move through first hand insights.
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Banner;
