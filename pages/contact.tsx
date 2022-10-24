import Head from "next/head";
import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

function contact() {
  return (
    <div>
      <Head>
        <title>Contact</title>
        <link rel="icon" href="../favicon.ico" />
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
          content={`https://cdn.sanity.io/images/07k2mc8t/production/d1f10bb9502e1153c5d48b9b47adb09edacf8981-2048x1367.jpg`}
        />
        <meta
          property="og:image:alt"
          content="Rows of planes lead by a helicopter."
        />
      </Head>
      <Header />
      <div className="justify-between items-center bg-[url('https://cdn.sanity.io/images/07k2mc8t/production/d1f10bb9502e1153c5d48b9b47adb09edacf8981-2048x1367.jpg')]  bg-cover bg-center lg:py-0 saturate-150">
        <div className="flex items-center bg-gradient-to-b from-white via-transparent to-white h-[30rem] sm:h-[40rem] w-full">
          <div className="mx-auto flex flex-col justify-center h-[10rem] sm:ml-[2rem] md:ml-[3rem] md:h-[15rem] items-center max-w-lg bg-gradient-radial from-black rounded-3xl">
            <h1 className="text-center sm:text-left text-7xl pt-[1rem] px-[3rem] text-white font-bold max-w-xl">
              Contact Us!
            </h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col width-full">
        <h2 className="text-center mx-auto underline text-5xl pt-10 pb-[3rem]">
          Coming Soon...
        </h2>
      </div>
      <Footer />
    </div>
  );
}

export default contact;
