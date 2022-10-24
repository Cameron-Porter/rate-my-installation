import Head from "next/head";
import React from "react";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Header from "../components/Header";

function about() {
  return (
    <div>
      <Head>
        <title>About</title>
        <link rel="icon" href="../favicon.ico" />
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
          <div className="mx-auto flex flex-col h-[10rem] sm:ml-[2rem] md:ml-[3rem] md:h-[15rem] items-center justify-center max-w-lg bg-gradient-radial from-black rounded-3xl">
            <h1 className="text-center sm:text-left text-7xl pt-[1rem] px-[3rem] text-white font-bold max-w-xl">
              About Us!
            </h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col width-full">
        <h2 className="text-center mx-auto underline text-5xl pt-10 pb-[3rem]">
          Our Story
        </h2>
        <div className="px-[3rem] space-y-5 text-lg">
          <p>
            Veteran owned and operated,{" "}
            <span className="italic">Rate My Installation</span> was born to
            help our servicemembers make more informed decisions when selecting
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
