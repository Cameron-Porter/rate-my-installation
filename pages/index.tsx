import Head from "next/head";
import Link from "next/link";
import Banner from "../components/Banner";
import Header from "../components/Header";
import { sanityClient, urlFor } from "../sanity";
import { Unit } from "../typings";

interface Props {
  units: [Unit];
}

export default function Home({ units }: Props) {
  console.log(units);
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Rate My Unit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Banner />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:gap-6 p-2 lg:grid-cols-3 gap-3 p-6">
        {units.map((unit) => (
          <Link key={unit._id} href={`/unit/${unit.slug.current}`}>
            <div className="border rounded-lg group coursor-pointer overflow-hidden">
              <img
                className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                src={urlFor(unit.mainImage).url()!}
                alt=""
              />
              <div className="flex justify-between p-5 bg-white">
                <div>
                  <p className="font-bold text-lg">{unit.title}</p>
                  <p className="text-gray-500 text-xs">{unit.branch.name}</p>
                  <p className="text-md">{unit.description}</p>
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
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = `*[_type == "unit"]{
    _id,
    title,
    branch-> {
      name,
      image
    },
    description,
    mainImage,
    slug
  }`;

  const units = await sanityClient.fetch(query);

  return {
    props: {
      units,
    },
  };
};
