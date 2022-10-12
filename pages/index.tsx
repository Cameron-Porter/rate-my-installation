import Head from "next/head";
import Link from "next/link";
import Banner from "../components/Banner";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { sanityClient, urlFor } from "../sanity";
import { Unit, Branch } from "../typings";

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
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-6 lg:grid-cols-4 xl:grid-cols-5 justify-around">
        {topUnits.map((unit) => (
          <Link
            key={unit._id}
            href={`branch/${unit.branch.slug.current}/unit/${unit.slug.current}`}
          >
            <div className="border rounded-lg group cursor-pointer overflow-hidden m-3 shadow">
              <img
                className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                src={urlFor(unit.mainImage).url()!}
                alt=""
              />
              <div className="flex justify-between p-5 bg-white">
                <div>
                  <p className="font-bold text-lg">{unit.title}</p>
                  <p className="text-gray-500 text-xs">{unit.branch.name}</p>
                  <div className="flex space-x-2 font-italic text-md">
                    <p>Rated: </p>
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
                  </div>
                  <p className="text-md">{truncate(unit.description, 150)}</p>
                </div>
                <img
                  className="h-12 w-12 rounded-full"
                  src={urlFor(unit.branch.logo).url()!}
                  alt=""
                />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/** Units Listed */}
      <div className="text-3xl py-[5rem]">
        <h2 className="text-center">Lowest 10 Rated Units:</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-6 lg:grid-cols-4 xl:grid-cols-5 justify-around">
        {bottomUnits.map((unit) => (
          <Link
            key={unit._id}
            href={`/branch/${unit.branch.slug.current}/unit/${unit.slug.current}`}
          >
            <div className="border rounded-lg group cursor-pointer overflow-hidden m-3 shadow">
              <img
                className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                src={urlFor(unit.mainImage).url()!}
                alt=""
              />
              <div className="flex justify-between p-5 bg-white">
                <div>
                  <p className="font-bold text-lg">{unit.title}</p>
                  <p className="text-gray-500 text-xs">{unit.branch.name}</p>
                  <div className="flex space-x-2 font-italic text-md">
                    <p>Rated: </p>
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
                  </div>
                  <p className="text-md">{truncate(unit.description, 150)}</p>
                </div>
                <img
                  className="h-12 w-12 rounded-full"
                  src={urlFor(unit.branch.logo).url()!}
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
