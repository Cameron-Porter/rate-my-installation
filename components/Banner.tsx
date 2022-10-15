import React from "react";

function Banner() {
  return (
    <div className="justify-between items-center bg-[url('https://cdn.sanity.io/images/07k2mc8t/production/d1f10bb9502e1153c5d48b9b47adb09edacf8981-2048x1367.jpg')]  bg-cover bg-center lg:py-0 saturate-150">
      <div className="flex items-center bg-gradient-to-b from-white via-transparent to-white h-[30rem] sm:h-[40rem] w-full">
        <div className="flex flex-wrap h-[10rem] sm:ml-[2rem] md:ml-[3rem] md:h-[15rem] items-center max-w-lg bg-gradient-radial from-black rounded-3xl">
          <h1 className="text-center sm:text-left text-4xl pt-[1rem] px-[3rem] text-white font-bold max-w-xl">
            Rate My Unit, shining a light on military units
          </h1>
          <h2 className="hidden px-[3rem] pb-[1rem] text-white font-bold md:block">
            Helping you plan your next move through first hand insights.
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Banner;
