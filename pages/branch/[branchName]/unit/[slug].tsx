import { GetStaticProps } from "next/types";
import React from "react";
import Header from "../../../../components/Header";
import { sanityClient } from "../../../../sanity";
import { Unit } from "../../../../typings";
import Form from "../../../../components/Form";
import FullStarDisplay from "../../../../components/FullStarDisplay";
import Comments from "../../../../components/Comments";
import Image from "next/image";
import StarDisplay from "../../../../components/StarDisplay";

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
  return (
    <main>
      <head>
        <title>Real reviews of {unit.title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="content-language" content="en-us" />
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
        <meta property="og:image" content={unit.image!} />
      </head>
      <Header />
      <div className="flex mt-7 mx-5 justify-around items-center flex-wrap">
        <div className="">
          <Image
            className="object-cover rounded-lg"
            src={unit.image}
            alt=""
            height={400}
            width={600}
          />
        </div>
        <div className="px-5 mt-3 max-w-3xl">
          <div className="flex items-center justify-center xs:justify-between flex-wrap">
            <div className="flex mb-1 flex-col mx-5">
              <div className="space-x-2 flex">
                <h1 className="text-3xl flex items-end flex-wrap xs:w-[25rem]">
                  {unit.title}
                </h1>
              </div>
              <p className="flex font-extralight items-center space-x-1 text-sm">
                <Image
                  className="h-10 w-10 rounded-full"
                  src={unit.branch.logoImg!}
                  alt=""
                  height={30}
                  width={30}
                />
                <span
                  className={styles.textColor[unit.branch.name as keyof object]}
                >
                  {unit.branch.name}
                </span>
              </p>
            </div>
            {unit.avgOverall ? (
              <div className="flex space-x-1 items-center mx-5">
                <StarDisplay initRating={unit.avgOverall} h={20} w={20} />
                <span className="text-sm text-gray-500">
                  ({unit.avgOverall}/5)
                </span>
              </div>
            ) : (
              <></>
            )}
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
        </div>
      </div>
      <div className="flex justify-center">
        <h2 className="text-xl max-w-3xl p-5 font-light text-gray-500 mb-2 mt-7">
          {unit.description}
        </h2>
      </div>
      <hr className={styles.lineStyle[unit.branch.name as keyof object]} />
      <Form unit={unit} />

      {/* Comments */}
      <div className="p-4 max-w-3xl mx-auto space-y-2">
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
      logoImg,
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
    image,
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
    revalidate: 60, // 28800 Revalidates data every 8hrs, updates old cached version...ISR implementation
  };
};
