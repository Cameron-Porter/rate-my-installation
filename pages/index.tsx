import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Banner from "../components/Banner";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { sanityClient } from "../sanity";
import { Unit, Branch } from "../typings";
import StarDisplay from "../components/StarDisplay";

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
        <title>Rate My Installation</title>
        <link rel="icon" href="../favicon.ico" />
        <meta
          name="description"
          content={`A place for servicemen and women to share and view reviews of their branch's installations.`}
        />
        <meta property="og:title" content={`Rate My Installation`} />
        <meta
          property="og:description"
          content={`A place for servicemen and women to share and view reviews of their branch's installations.`}
        />
        <meta property="og:url" content={`https://ratemyinstallation.com`} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={`https://cdn.sanity.io/images/07k2mc8t/production/d1f10bb9502e1153c5d48b9b47adb09edacf8981-2048x1367.jpg`}
        />
        <meta
          property="og:image:alt"
          content="Rows of planes lead by a helicopter."
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2802002003003896"
          crossOrigin="anonymous"
        ></script>
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
              <Image
                className="h-[9rem] w-auto mx-auto grayscale object-conatin group-hover:scale-105 transition-transform duration-300 ease-in-out group-hover:grayscale-0"
                src={branch.logoImg!}
                alt=""
                height={100}
                width={100}
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
                    <p className="text-gray-500 text-xs">{unit.branch.name}</p>
                    <div className="flex space-x-2 font-italic text-md">
                      {unit.avgOverall ? (
                        <div className="flex items-center space-x-2">
                          <span className="">Rated: </span>
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
                  <div className="">
                    <Image
                      className="rounded-full"
                      src={unit.branch.logoImg!}
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
                    <p className="text-gray-500 text-xs">{unit.branch.name}</p>
                    <div className="flex space-x-2 font-italic text-md">
                      {unit.avgOverall ? (
                        <div className="flex items-center space-x-2">
                          <span className="">Rated: </span>
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
                  <div className="">
                    <Image
                      className="rounded-full"
                      src={unit.branch.logoImg!}
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
    </div>
  );
}

export const getStaticProps = async () => {
  const queryTopUnits = `*[_type == "unit"]{
    _id,
    title,
    branch-> {
      name,
      logoImg,
      slug
    },
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
  } | order(avgOverall asc)[0...10]`;

  const queryBottomUnits = `*[_type == "unit"]{
    _id,
    title,
    branch-> {
      name,
      logoImg,
      slug
    },
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
  } | order(avgOverall desc, title asc)[0...10]`;

  const queryBranches = `*[_type == "branch"]{
    _id,
    name,
    logoImg,
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
