import Head from "next/head";
import Link from "next/link";
import Banner from "../components/Banner";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { sanityClient, urlFor } from "../sanity";
import { Unit, Branch } from "../typings";

interface Props {
  units: [Unit];
  branches: [Branch];
}

function truncate(str: string, n: number) {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

export default function Home({ units, branches }: Props) {
  console.log(units);
  return (
    <div className="">
      <Head>
        <title>Rate My Unit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Banner />
      {/** Branches Listed */}
      <div className="text-3xl py-[5rem]">
        <h2 className="text-center">
          Select a branch below to refine your search:
        </h2>
      </div>
      <div className="flex flex-wrap w-auto justify-around border-b-4 pb-[4rem]">
        {branches.map((branch) => (
          <Link key={branch._id} href={`/branch/${branch.slug.current}`}>
            <div className="coursor-pointer group overflow-hidden text-center m-3 w-[9rem]">
              <img
                className="h-[9rem] w-auto mx-auto grayscale object-conatin group-hover:scale-105 transition-transform duration-300 ease-in-out group-hover:grayscale-0"
                src={urlFor(branch.image).url()!}
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
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:gap-6 p-6 lg:grid-cols-3 gap-3 justify-between">
        {units.map((unit) => (
          <Link key={unit._id} href={`unit/${unit.slug.current}`}>
            <div className="border rounded-lg group coursor-pointer overflow-hidden m-3">
              <img
                className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                src={urlFor(unit.mainImage).url()!}
                alt=""
              />
              <div className="flex justify-between p-5 bg-white">
                <div>
                  <p className="font-bold text-lg">{unit.title}</p>
                  <p className="text-gray-500 text-xs">{unit.branch.name}</p>
                  <p className="text-md">{truncate(unit.description, 150)}</p>
                </div>
                <img
                  className="h-12 w-12 rounded-full"
                  src={urlFor(unit.branch.image).url()!}
                  alt=""
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export const getServerSideProps = async () => {
  const queryUnits = `*[_type == "unit"]{
    _id,
    title,
    branch-> {
      name,
      image,
      slug
    },
    description,
    mainImage,
    slug
  } | order(title asc)`;

  const queryBranches = `*[_type == "branch"]{
    _id,
    name,
    image,
    slug
  } | order(name asc)`;

  const units = await sanityClient.fetch(queryUnits);
  const branches = await sanityClient.fetch(queryBranches);

  return {
    props: {
      units,
      branches,
    },
  };
};
