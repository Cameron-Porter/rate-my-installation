import Link from "next/link";
import Image from "next/image";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import logo from "../public/media/black_logo.png";

const styles = {
  navLinks:
    "cursor-pointer bg-left-bottom bg-gradient-to-r from-yellow-900 to-yellow-900 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out text-xl p-3",
};

function Header() {
  const { data: session } = useSession();
  return (
    <header className="flex justify-between px-5 py-3 mx-auto shadow-2xl rounded-lg">
      <div className="flex items-center sm:space-x-10">
        <Link href="/">
          <Image
            className="w-[5rem] object-contain cursor-pointer rounded-full"
            src={logo}
            alt=""
            width="100"
            height="100"
          />
        </Link>
        <div className="flex sm:space-x-10">
          <Link href={`/about`}>
            <span className="group transition-all duration-300 ease-in-out">
              <h3 className={styles.navLinks}>About</h3>
            </span>
          </Link>
          <Link href={`/contact`}>
            <span className="group transition-all duration-300 ease-in-out">
              <h3 className={styles.navLinks}>Contact</h3>
            </span>
          </Link>
        </div>
      </div>
      <div className="flex items-center space-x-5 text-blue-700">
        <h3
          onClick={!session ? () => signIn() : () => signOut()}
          className="cursor-pointer border px-4 py-1 rounded-full hover:bg-blue-700 hover:text-white"
        >
          {session ? `Log Out` : `Sign In`}
        </h3>
      </div>
    </header>
  );
}

export default Header;
