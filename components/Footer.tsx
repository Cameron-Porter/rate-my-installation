import React from "react";
import Image from "next/image";
import logo from "../public/media/white_logo.png";

function Footer() {
  return (
    <div className="mt-[3rem] bg-yellow-900 p-5 text-white flex justify-between align-middle">
      <div className="flex align-middle">
        <h3 className="p-2 my-auto">
          Copyright © 2022 Porter. All rights reserved.
        </h3>
      </div>
      <div className="rounded-full">
        <Image
          className="object-contain"
          src={logo}
          alt=""
          width="100"
          height="100"
        />
      </div>
    </div>
  );
}

export default Footer;
