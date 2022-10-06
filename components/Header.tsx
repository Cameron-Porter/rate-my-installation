import Link from "next/link";
import Image from "next/image";
import rmu from "../public/media/rmu.png";
import React from "react";

function Header() {
  return (
    <header className="flex justify-between p-5 max-w-7xl mx-auto">
      <div className="flex items-center space-x-5">
        <Link href="/">
          <Image
            className="w-44 object-contain cursor-pointer"
            src={rmu}
            alt=""
            width="100"
            height="100"
          />
        </Link>
        <div className="hidden sm:inline-flex items-center space-x-5">
          <h3 className="cursor-pointer">About</h3>
          <h3 className="cursor-pointer">Contact</h3>
        </div>
      </div>
      <div className="flex items-center space-x-5 text-blue-700">
        <h3 className="cursor-pointer border px-4 py-1 rounded-full">
          Sign In
        </h3>
      </div>
    </header>
  );
}

export default Header;
