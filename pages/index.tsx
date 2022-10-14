import Head from "next/head";
import Link from "next/link";
import Banner from "../components/Banner";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { sanityClient, urlFor } from "../sanity";
import { Unit, Branch } from "../typings";
import Stars from "../components/Stars";

interface Props {
  topUnits: [Unit];
  bottomUnits: [Unit];
  branches: [Branch];
}

function truncate(str: string, n: number) {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

export default function Home({ topUnits, bottomUnits, branches }: Props) {
  return (
    <div className="">
      <Head>
        <title>Rate My Unit</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content={`A place for servicemen and women to share and view reviews of their branch's installations.`}
        />
        <meta property="og:title" content={`Rate My Unit`} />
        <meta
          property="og:description"
          content={`A place for servicemen and women to share and view reviews of their branch's installations.`}
        />
        <meta property="og:url" content={`https://rate-my-unit.vercel.app`} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={`https://cdn.sanity.io/images/07k2mc8t/production/e836549abc4c48f00a4d0b6a1b7d16395e359c6e-577x385.webp`}
        />
        <meta
          property="og:image:alt"
          content="Lighthouse in the middle of the sea"
        />
      </Head>
      <Header />
      <Banner />
      {/** Branches Listed */}
      <div className="text-3xl py-[5rem]">
        <h2 className="text-center">
          Select a branch below to refine your search:
        </h2>
        <hr className="max-w-xl mx-auto border my-5 border-blue-500" />
      </div>
      <div className="flex flex-wrap w-auto justify-around border-b-4 pb-[4rem]">
        {branches.map((branch) => (
          <Link key={branch._id} href={`/branch/${branch.slug.current}`}>
            <div className="cursor-pointer group overflow-hidden text-center m-3 w-[9rem]">
              <img
                className="h-[9rem] w-auto mx-auto grayscale object-conatin group-hover:scale-105 transition-transform duration-300 ease-in-out group-hover:grayscale-0"
                src={urlFor(branch.logo).url()!}
                alt=""
              />
              <div>
                <p className="font-bold text-md flex flex-wrap">
                  {branch.name}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {/** Units Listed */}
      <div className="text-3xl py-[5rem]">
        <h2 className="text-center">Top 10 Rated Units:</h2>
        <hr className="max-w-xl mx-auto border my-5 border-blue-500" />
      </div>
      <div className="flex flex-wrap justify-center">
        {topUnits.map((unit) => (
          <Link
            key={unit._id}
            href={`branch/${unit.branch.slug.current}/unit/${unit.slug.current}`}
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
                    <p className="text-gray-500 text-xs">{unit.branch.name}</p>
                    <p className="flex space-x-2 font-italic text-md">
                      <p>Rated: </p>
                      <Stars />
                    </p>
                  </div>
                  <img
                    className="h-12 w-12 rounded-full"
                    src={urlFor(unit.branch.logo).url()!}
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

      {/** Units Listed */}
      <div className="text-3xl py-[5rem]">
        <h2 className="text-center">Lowest 10 Rated Units:</h2>
        <hr className="max-w-xl mx-auto border my-5 border-blue-500" />
      </div>
      <div className="flex flex-wrap justify-center">
        {bottomUnits.map((unit) => (
          <Link
            key={unit._id}
            href={`/branch/${unit.branch.slug.current}/unit/${unit.slug.current}`}
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
                    <p className="text-gray-500 text-xs">{unit.branch.name}</p>
                    <p className="flex space-x-2 font-italic text-md">
                      <p>Rated: </p>
                      <Stars />
                    </p>
                  </div>
                  <img
                    className="h-12 w-12 rounded-full"
                    src={urlFor(unit.branch.logo).url()!}
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
    </div>
  );
}

export const getStaticProps = async () => {
  const queryTopUnits = `*[_type == "unit"][0...10]{
    _id,
    title,
    branch-> {
      name,
      logo,
      slug
    },
    description,
    mainImage,
    slug
  } | order(title asc)`;

  const queryBottomUnits = `*[_type == "unit"][11...21]{
    _id,
    title,
    branch-> {
      name,
      logo,
      slug
    },
    description,
    mainImage,
    slug
  } | order(title desc)`;

  const queryBranches = `*[_type == "branch"]{
    _id,
    name,
    logo,
    slug
  } | order(name asc)`;

  const topUnits = await sanityClient.fetch(queryTopUnits);
  const bottomUnits = await sanityClient.fetch(queryBottomUnits);
  const branches = await sanityClient.fetch(queryBranches);

  return {
    props: {
      topUnits,
      bottomUnits,
      branches,
    },
  };
};
