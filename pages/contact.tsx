import Head from "next/head";
import React from "react";
import Image from "next/image";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Header from "../components/Header";

function contact() {
  return (
    <div>
      <Head>
        <title>Contact</title>
        <link rel="icon" href="../favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="content-language" content="en-us" />
        <meta
          name="description"
          content={`Contact Rate My Installation with quiestions or inquiries regarding installation reviews or the site.`}
        />
        <meta property="og:title" content={`Contact Rate My Installation`} />
        <meta
          property="og:description"
          content={`Contact Rate My Installation with quiestions or inquiries regarding installations or the site.`}
        />
        <meta
          property="og:url"
          content="https://rate-my-unit.vercel.app/contact"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={`https://res.cloudinary.com/dz58encu1/image/upload/q_auto,f_auto/v1666793434/286590861_378543417641534_6470475454945430459_n_zbvy8f.jpg`}
        />
        <meta
          property="og:image:alt"
          content="Rows of planes lead by a helicopter."
        />
      </Head>
      <Header />
      <div className="relative mx-auto my-0">
        <Image
          className="w-full h-[20rem] object-cover overflow-hidden"
          src="https://res.cloudinary.com/dz58encu1/image/upload/w_1450/v1667523369/220802-F-VS152-0032_owepci.jpg"
          alt=""
          height={300}
          width={1450}
        />
        <div className="absolute bottom-0 bg-black bg-opacity-50 h-full w-full p-20">
          <h1 className="text-center sm:text-left text-7xl pt-[1rem] px-[3rem] text-white font-bold max-w-xl">
            Contact Us!
          </h1>
        </div>
      </div>
      <Contact />
      <Footer />
    </div>
  );
}

export default contact;
