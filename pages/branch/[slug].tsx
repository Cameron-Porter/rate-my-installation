import { GetStaticProps } from "next/types";
import React, { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { sanityClient, urlFor } from "../../sanity";
import { Branch } from "../../typings";

interface Props {
  branch: Branch;
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
      </article>
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
  const query = `*[_type == "branch" && slug.current == $slug][0]{
    _id,
    name,
    logo,
    mainImage,
    slug,
    description
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
