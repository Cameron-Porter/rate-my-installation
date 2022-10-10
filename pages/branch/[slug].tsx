import Link from "next/link";
import { GetStaticProps } from "next/types";
import React, { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { sanityClient, urlFor } from "../../sanity";
import { Branch } from "../../typings";

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-6 lg:grid-cols-4 xl:grid-cols-5 justify-around">
        {branch.units.map((unit) => (
          <Link key={unit._id} href={`unit/${unit.slug.current}`}>
            <div className="border rounded-lg group cursor-pointer overflow-hidden m-3 shadow">
              <img
                className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                src={urlFor(unit.mainImage).url()!}
                alt=""
              />
              <div className="flex justify-between py-5 px-2 bg-white">
                <div>
                  <p className="font-bold text-lg">{unit.title}</p>
                  <p className="text-gray-500 text-xs">{branch.name}</p>
                  <p className="flex space-x-2 font-italic text-md">
                    <span
                      className={styles.textColor[branch.name as keyof object]}
                    >
                      Rated:{" "}
                    </span>
                    <div className="flex items-center">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>First star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Second star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Third star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Fourth star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-300 dark:text-gray-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Fifth star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    </div>
                  </p>
                  <p className="text-md">{truncate(unit.description, 150)}</p>
                </div>
                <img
                  className="h-12 w-12 rounded-full"
                  src={urlFor(branch.logo).url()!}
                  alt=""
                />
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
  const query = `*[_type == "branch"]{
    _id,
    slug {
      current
    }
  }`;

  const branches = await sanityClient.fetch(query);

  const paths = branches.map((branch: Branch) => ({
    params: {
      slug: branch.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[ _type == "branch" && slug.current == $slug][0]{
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
    slug: params?.slug,
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
