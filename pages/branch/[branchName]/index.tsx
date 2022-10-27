import Image from "next/image";
import Link from "next/link";
import { GetStaticProps } from "next/types";
import React from "react";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import StarDisplay from "../../../components/StarDisplay";
import { sanityClient } from "../../../sanity";
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
        <meta property="og:image" content={branch.image!} />
      </head>
      <Header />
      <Image
        className="w-full h-[30rem] object-cover overflow-hidden"
        src={branch.image!}
        alt=""
        height={300}
        width={1450}
      />
      <article className="max-w-3xl mx-auto p-5">
        <div className="flex items-center mb-1 mt-8 justify-center space-x-2">
          <Image
            className="h-10 w-10 rounded-full"
            src={branch.logoImg!}
            alt=""
            height={60}
            width={60}
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
            <div className="w-[22rem] mx-[1rem] sm:w-[19rem] md:w-[22rem] justify-between sm:mx-[.5rem] border rounded-lg group cursor-pointer overflow-hidden m-3 shadow">
              <Image
                className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                src={unit.image!}
                alt=""
                height={250}
                width={350}
              />
              <div className="flex flex-col justify-between py-5 px-2 bg-white">
                <div className="flex justify-between pb-2">
                  <div className="flex-col w-[14rem]">
                    <p className="font-bold text-lg">{unit.title}</p>
                    <p className="text-gray-500 text-xs">{branch.name}</p>
                    <div className="flex space-x-2 font-italic text-md">
                      {unit.avgOverall ? (
                        <div className="flex items-center space-x-2">
                          <span
                            className={
                              styles.textColor[branch.name as keyof object]
                            }
                          >
                            Rated:{" "}
                          </span>
                          <span>
                            <StarDisplay
                              h={20}
                              w={20}
                              initRating={unit.avgOverall}
                            />
                          </span>
                          <span>({unit.avgOverall} / 5)</span>
                        </div>
                      ) : (
                        <div className="text-sm text-gray-500">
                          Not Yet Rated
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <Image
                      className="h-12 w-12 rounded-full"
                      src={branch.logoImg!}
                      alt=""
                      height={50}
                      width={50}
                    />
                  </div>
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
    logoImg,
    image,
    slug,
    description,
    "units": *[ _type == "unit" && references(^._id) ]{
      _id,
      title,
      description,
      image,
      slug,
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
