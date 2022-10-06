import Image from "next/image";
import lh from "../public/media/lighthouse-w.png";

function Banner() {
  return (
    <div className="flex justify-between items-center bg-gray-700 border-y border-black py-10 px-5 lg:py-0">
      <div className="px-10 space-y-5 text-white">
        <h1 className="text-6xl max-w-xl">
          <span className="underline decoration-yellow-400 decoration-4">
            Rate My Unit
          </span>
          , shining a light on military units
        </h1>
        <h2>
          An effective way to get insights about your future unit. Helping you
          plan that next move.
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
    </div>
  );
}

export default Banner;
