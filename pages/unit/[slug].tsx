import { GetStaticProps } from "next/types";
import React from "react";
import Header from "../../components/Header";
import { sanityClient, urlFor } from "../../sanity";
import { Unit } from "../../typings";

interface Props {
  unit: Unit;
}

const textColor = {
  "United States Army": "text-green-600",
  "United States Marine Corps": "text-red-500",
  "United States Navy": "text-blue-500",
  "United States Air Force": "text-blue-400",
  "United States Coast Guard": "text-orange-500",
  "United States Space Force": "text-blue-500",
  "United States National Guard": "text-black",
};

function Unit({ unit }: Props) {
  return (
    <main>
      <Header />
      <img
        className="w-full h-40 object-cover"
        src={urlFor(unit.mainImage).url()}
        alt=""
      />
      <article className="max-w-3xl mx-auto p-5">
        <div className="flex items-center mb-1 mt-8 justify-between">
          <div className="space-x-2 flex">
            <img
              className="h-10 w-10 rounded-full"
              src={urlFor(unit.branch.image).url()!}
              alt=""
            />
            <h1 className="text-3xl flex items-end">{unit.title}</h1>
          </div>
          <p className="font-extralight text-sm">
            <span className={textColor[unit.branch.name as keyof object]}>
              {unit.branch.name}
            </span>
          </p>
        </div>
        <h2 className="text-xl font-light text-gray-500 mb-2 mt-7">
          {unit.description}
        </h2>
      </article>
    </main>
  );
}

export default Unit;

export const getStaticPaths = async () => {
  const query = `*[_type == "unit"]{
    _id,
    slug {
      current
    }
  }`;

  const units = await sanityClient.fetch(query);

  const paths = units.map((unit: Unit) => ({
    params: {
      slug: unit.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "unit" && slug.current == $slug][0]{
    _id,
    _createdAt,
    title,
    branch-> {
      name,
      image
    },
    'comments': *[
      _type == "comment" &&
      post._ref == ^.id &&
      approved == true
    ],
    description,
    mainImage,
    slug,
    body
  }`;

  const unit = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  if (!unit) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      unit,
    },
    revalidate: 86400, // after 1 day, updates old cached version...ISR implementation
  };
};
