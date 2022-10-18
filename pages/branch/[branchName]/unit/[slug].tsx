import { GetStaticProps } from "next/types";
import React, { useState } from "react";
import Header from "../../../../components/Header";
import { sanityClient, urlFor } from "../../../../sanity";
import { Unit } from "../../../../typings";
import { useSession } from "next-auth/react";
import Form from "../../../../components/Form";
import CommentCard from "../../../../components/CommentCard";
import FullStarDisplay from "../../../../components/FullStarDisplay";
import StarDisplay from "../../../../components/StarDisplay";
import Comments from "../../../../components/Comments";

interface Props {
  unit: Unit;
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
  form: {
    label: "block mb-5",
    span: "text-gray-700",
    inputs: {
      "United States Army":
        "ring-green-600 shadow border rounded py-2 px-3 form-input mt-1 block w-full outline-none focus:ring-1",
      "United States Marine Corps":
        "ring-red-500 shadow border rounded py-2 px-3 form-input mt-1 block w-full outline-none focus:ring-1",
      "United States Navy":
        "ring-blue-500 shadow border rounded py-2 px-3 form-input mt-1 block w-full outline-none focus:ring-1",
      "United States Air Force":
        "ring-blue-400 shadow border rounded py-2 px-3 form-input mt-1 block w-full outline-none focus:ring-1",
      "United States Coast Guard":
        "ring-orange-500 shadow border rounded py-2 px-3 form-input mt-1 block w-full outline-none focus:ring-1",
      "United States Space Force":
        "ring-blue-500 shadow border rounded py-2 px-3 form-input mt-1 block w-full outline-none focus:ring-1",
      "United States National Guard":
        "ring-black shadow border rounded py-2 px-3 form-input mt-1 block w-full outline-none focus:ring-1",
    },
    textarea: {
      "United States Army":
        "ring-green-600 shadow border rounded py-2 px-3 form-textarea mt-1 block w-full outline-none focus:ring-1",
      "United States Marine Corps":
        "ring-red-500 shadow border rounded py-2 px-3 form-textarea mt-1 block w-full outline-none focus:ring-1",
      "United States Navy":
        "ring-blue-500 shadow border rounded py-2 px-3 form-textarea mt-1 block w-full outline-none focus:ring-1",
      "United States Air Force":
        "ring-blue-400 shadow border rounded py-2 px-3 form-textarea mt-1 block w-full outline-none focus:ring-1",
      "United States Coast Guard":
        "ring-orange-500 shadow border rounded py-2 px-3 form-textarea mt-1 block w-full outline-none focus:ring-1",
      "United States Space Force":
        "ring-blue-500 shadow border rounded py-2 px-3 form-textarea mt-1 block w-full outline-none focus:ring-1",
      "United States National Guard":
        "ring-black shadow border rounded py-2 px-3 form-textarea mt-1 block w-full outline-none focus:ring-1",
    },
    submit: {
      "United States Army":
        "shadow text-white bg-green-600 hover:bg-green-500 focus:shadow-outline focus:outline-none font-bold py-2 px-4 rounded cursor-pointer",
      "United States Marine Corps":
        "shadow text-white bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none font-bold py-2 px-4 rounded cursor-pointer",
      "United States Navy":
        "shadow text-white bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none font-bold py-2 px-4 rounded cursor-pointer",
      "United States Air Force":
        "shadow text-white bg-blue-400 hover:bg-blue-300 focus:shadow-outline focus:outline-none font-bold py-2 px-4 rounded cursor-pointer",
      "United States Coast Guard":
        "shadow text-white bg-orange-500 hover:bg-orange-400 focus:shadow-outline focus:outline-none font-bold py-2 px-4 rounded cursor-pointer",
      "United States Space Force":
        "shadow text-white bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none font-bold py-2 px-4 rounded cursor-pointer",
      "United States National Guard":
        "shadow text-white bg-black hover:bg-gray focus:shadow-outline focus:outline-none font-bold py-2 px-4 rounded cursor-pointer",
    },
  },
};

function Unit({ unit }: Props) {
  const { data: session } = useSession();
  const [submitted, setSubmitted] = useState(false);

  return (
    <main>
      <head>
        <title>Real reviews of {unit.title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content={`Real reviews of ${unit.title} from those who have been stationed there.`}
        />
        <meta
          property="og:title"
          content={`Share and view reviews for ${unit.title}`}
        />
        <meta
          property="og:description"
          content={`Real reviews of ${unit.title} from those who have been stationed there.`}
        />
        <meta
          property="og:url"
          content={`https://rate-my-unit.vercel.app/branch/${unit.branch.slug.current}/unit/${unit.slug.current}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={urlFor(unit.mainImage).url()!} />
      </head>
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
              src={urlFor(unit.branch.logo).url()!}
              alt=""
            />
            <h1 className="text-3xl flex items-end">{unit.title}</h1>
          </div>
          <p className="font-extralight text-sm">
            <span
              className={styles.textColor[unit.branch.name as keyof object]}
            >
              {unit.branch.name}
            </span>
          </p>
        </div>
        <div className="text-sm">
          <FullStarDisplay
            overall={unit.avgOverall}
            ba={unit.avgBaseAmenities}
            bl={unit.avgBaseLogistics}
            ho={unit.avgHousingOptions}
            lc={unit.avgLocalCommunity}
            lr={unit.avgLocalRecreation}
            sd={unit.avgSchoolDistrict}
          />
        </div>

        <h2 className="text-xl font-light text-gray-500 mb-2 mt-7">
          {unit.description}
        </h2>
      </article>
      <hr className={styles.lineStyle[unit.branch.name as keyof object]} />

      <Form unit={unit} />

      {/* Comments */}
      <div className="p-10 max-w-3xl mx-auto space-y-2">
        <h3 className="text-4xl mb-10 text-center">Ratings</h3>

        <hr className={styles.lineStyle[unit.branch.name as keyof object]} />

        <Comments unit={unit} />
      </div>
    </main>
  );
}

export default Unit;

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
      slug: unit.slug.current,
      branchName: unit.branch.slug.current,
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
      logo,
      slug
    },
    'comments': *[
      _type == "comment" &&
      unit._ref == ^._id &&
      approved == true
    ],
    'avgBaseAmenities': round(math::avg(*[
      _type == "comment" &&
      unit._ref == ^._id &&
      approved == true
    ].baseAmenities),2),
'avgBaseLogistics': round(math::avg(*[
      _type == "comment" &&
      unit._ref == ^._id &&
      approved == true
    ].baseLogistics),2),
'avgHousingOptions': round(math::avg(*[
      _type == "comment" &&
      unit._ref == ^._id &&
      approved == true
    ].housingOptions),2),
'avgLocalCommunity': round(math::avg(*[
      _type == "comment" &&
      unit._ref == ^._id &&
      approved == true
    ].localCommunity),2),
'avgLocalRecreation': round(math::avg(*[
      _type == "comment" &&
      unit._ref == ^._id &&
      approved == true
    ].localRecreation),2),
'avgSchoolDistrict': round(math::avg(*[
      _type == "comment" &&
      unit._ref == ^._id &&
      approved == true
    ].schoolDistrict),2),
'avgOverall': round(math::avg(*[
      _type == "comment" &&
      unit._ref == ^._id &&
      approved == true
    ].baseAmenities + *[
      _type == "comment" &&
      unit._ref == ^._id &&
      approved == true
    ].baseLogistics + *[
      _type == "comment" &&
      unit._ref == ^._id &&
      approved == true
    ].housingOptions + *[
      _type == "comment" &&
      unit._ref == ^._id &&
      approved == true
    ].localCommunity + *[
      _type == "comment" &&
      unit._ref == ^._id &&
      approved == true
    ].localRecreation + *[
      _type == "comment" &&
      unit._ref == ^._id &&
      approved == true
    ].schoolDistrict),2),
    description,
    mainImage,
    slug,
  }`;

  const unit = await sanityClient.fetch(query, {
    slug: params?.slug,
    branchName: params?.branchName,
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
    revalidate: 28800, // Revalidates data every 8hrs, updates old cached version...ISR implementation
  };
};
