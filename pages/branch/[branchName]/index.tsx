import Link from "next/link";
import { GetStaticProps } from "next/types";
import React from "react";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import Stars from "../../../components/Stars";
import { sanityClient, urlFor } from "../../../sanity";
import { Branch, Unit } from "../../../typings";

interface Props {
  branch: Branch;
}

function truncate(str: string, n: number) {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

const styles = {
  textColor: {
    "United States Army": "text-green-600",
    "United States Marine Corps": "text-red-500",
    "United States Navy": "text-blue-500",
    "United States Air Force": "text-blue-400",
    "United States Coast Guard": "text-orange-500",
    "United States Space Force": "text-blue-500",
    "United States National Guard": "text-black",
  },
  lineStyle: {
    "United States Army": "max-w-lg mx-auto border my-5 border-green-600",
    "United States Marine Corps": "max-w-lg mx-auto border my-5 border-red-500",
    "United States Navy": "max-w-lg mx-auto border my-5 border-blue-500",
    "United States Air Force": "max-w-lg mx-auto border my-5 border-blue-400",
    "United States Coast Guard":
      "max-w-lg mx-auto border my-5 border-orange-500",
    "United States Space Force": "max-w-lg mx-auto border my-5 border-blue-500",
    "United States National Guard": "max-w-lg mx-auto border my-5 border-black",
  },
};

function Branch({ branch }: Props) {
  return (
    <main>
      <head>
        <title>{branch.name} installations for review</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content={`Select ${branch.name} installations to view and share real reviews from those who have been stationed there.`}
        />
        <meta
          property="og:title"
          content={`Select ${branch.name} installations to view real reviews from those who have been stationed there.`}
        />
        <meta
          property="og:description"
          content={`${branch.name} installations for review`}
        />
        <meta
          property="og:url"
          content={`https://rate-my-unit.vercel.app/branch/${branch.slug.current}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={urlFor(branch.mainImage).url()!} />
      </head>
      <Header />
      <img
        className="w-full h-[30rem] object-cover overflow-hidden"
        src={urlFor(branch.mainImage).url()!}
        alt=""
      />
      <article className="max-w-3xl mx-auto p-5">
        <div className="flex items-center mb-1 mt-8 justify-center space-x-2">
          <img
            className="h-10 w-10 rounded-full"
            src={urlFor(branch.logo).url()!}
            alt=""
          />
          <h1 className="text-3xl flex items-end">{branch.name}</h1>
        </div>
        <hr className={styles.lineStyle[branch.name as keyof object]} />
        <h2 className="text-xl font-light text-gray-500 mb-2 mt-7">
          {branch.description}
        </h2>
        <hr className={styles.lineStyle[branch.name as keyof object]} />
      </article>

      {/** Units Listed */}
      <div className="text-3xl py-[5rem]">
        <h2 className="text-center">Listed Units:</h2>
      </div>
      <div className="flex flex-wrap justify-center">
        {branch.units.map((unit) => (
          <Link
            key={unit._id}
            href={`${branch.slug.current}/unit/${unit.slug.current}`}
          >
            <div className="w-full mx-[1.5rem] sm:w-[19rem] md:sm:w-[22rem] justify-between sm:mx-[.5rem] border rounded-lg group cursor-pointer overflow-hidden m-3 shadow">
              <img
                className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                src={urlFor(unit.mainImage).url()!}
                alt=""
              />
              <div className="flex flex-col justify-between py-5 px-2 bg-white">
                <div className="flex justify-between pb-2">
                  <div className="flex-col">
                    <p className="font-bold text-lg">{unit.title}</p>
                    <p className="text-gray-500 text-xs">{branch.name}</p>
                    <p className="flex space-x-2 font-italic text-md">
                      <span
                        className={
                          styles.textColor[branch.name as keyof object]
                        }
                      >
                        Rated:{" "}
                      </span>
                      <Stars />
                    </p>
                  </div>
                  <img
                    className="h-12 w-12 rounded-full"
                    src={urlFor(branch.logo).url()!}
                    alt=""
                  />
                </div>
                <div>
                  <p className="text-md">{truncate(unit.description, 150)}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Footer />
    </main>
  );
}

export default Branch;

export const getStaticPaths = async () => {
  const query = `*[_type == "unit"]{
    _id,
    slug {
      current
    },
    branch->{
      slug {
      current
    },
    }
  }`;

  const units = await sanityClient.fetch(query);

  const paths = units.map((unit: Unit) => ({
    params: {
      branchName: unit.branch.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[ _type == "branch" && slug.current == $branchName][0]{
    _id,
    name,
    logo,
    mainImage,
    slug,
    description,
    "units": *[ _type == "unit" && references(^._id) ]{
      _id,
      title,
      description,
      mainImage,
      slug
    } | order(title asc)
    }`;

  const branch = await sanityClient.fetch(query, {
    branchName: params?.branchName,
  });

  if (!branch) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      branch,
    },
  };
};
