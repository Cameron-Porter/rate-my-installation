import Head from "next/head";
import React from "react";
import Image from "next/image";
import Footer from "../components/Footer";
import Header from "../components/Header";

function about() {
  return (
    <div>
      <Head>
        <title>About</title>
        <link rel="icon" href="../favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="content-language" content="en-us" />
        <meta
          name="description"
          content={`Learn about Rate My Installation, and how it hopes to help military personel during their PCS.`}
        />
        <meta property="og:title" content={`Contact RateMI`} />
        <meta
          property="og:description"
          content={`Learn about Rate My Installation, and how it hopes to help military personel during their PCS.`}
        />
        <meta
          property="og:url"
          content="https://rate-my-unit.vercel.app/about"
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
          src="https://res.cloudinary.com/dz58encu1/image/upload/w_1450/v1666793414/5shipsbanner_tnhp9p.jpg"
          alt=""
          height={300}
          width={1450}
        />
        <div className="absolute bottom-0 bg-black bg-opacity-50 h-full w-full p-20">
          <h1 className="text-center sm:text-left text-7xl pt-[1rem] px-[3rem] text-white font-bold max-w-xl">
            About Us!
          </h1>
        </div>
      </div>
      <div className="flex flex-col width-full">
        <h2 className="text-center mx-auto underline text-5xl pt-10 pb-[3rem]">
          Our Story
        </h2>
        <div className="px-[3rem] space-y-5 text-lg max-w-3xl mx-auto">
          <p>
            Veteran owned and operated,{" "}
            <span className="italic">Rate My Installation</span> was born to
            help our service members make more informed decisions when selecting
            their next installation. Though it is not ultimately up to the
            member where they may go, it is always best to plan with all the
            details at hand.
          </p>
          <p>
            It is our goal to help provide a platform where servicemembers can
            anonymously and freely share their experiences at various
            installations. Logging in is for our own security; however, your
            information will never be displayed when leaving a review.
          </p>
          <p>
            So please take a moment to find installations you have previously
            been stationed at. Leave an honest review, and feel free to contact
            us with feedback. We look forward to hearing from you!
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default about;
