import { GetStaticProps } from "next/types";
import React, { useState } from "react";
import Header from "../../../../components/Header";
import { sanityClient, urlFor } from "../../../../sanity";
import { Unit } from "../../../../typings";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSession } from "next-auth/react";

interface Props {
  unit: Unit;
}

interface FormInput {
  _id: string;
  name: string;
  email: string;
  comment?: string;
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => {
        console.log(data);
        setSubmitted(true);
      })
      .catch((err) => {
        console.log(err);
        setSubmitted(false);
      });
  };

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
        <h2 className="text-xl font-light text-gray-500 mb-2 mt-7">
          {unit.description}
        </h2>
      </article>
      <hr className={styles.lineStyle[unit.branch.name as keyof object]} />

      {session ? (
        submitted ? (
          <div className="flex flex-col p-10 my-10 bg-blue-500 text-white max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold">Thank you for your Rating!</h3>
            <p>Once your Rating has been approved, it will appear below.</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col p-5 max-w-2xl mx-auto mb-10"
          >
            <h3 className="text-sm">
              <span
                className={styles.textColor[unit.branch.name as keyof object]}
              >
                Been stationed here?
              </span>
            </h3>
            <h4 className="text-3xl font-bold">Leave a Rating below!</h4>
            <hr className="py-3 mt-2" />

            <input
              {...register("_id")}
              type="hidden"
              name="_id"
              value={unit._id}
            />
            <label className={styles.form.label}>
              <span className={styles.form.span}>Name</span>
              <input
                {...register("name", { required: true })}
                className={styles.form.inputs[unit.branch.name as keyof object]}
                placeholder="Your Name Here"
                type="text"
              />
            </label>
            <label className={styles.form.label}>
              <span className={styles.form.span}>Email</span>
              <input
                {...register("email", { required: true })}
                className={styles.form.inputs[unit.branch.name as keyof object]}
                placeholder="Your Email Here"
                type="email"
              />
            </label>
            <label className={styles.form.label}>
              <span className={styles.form.span}>Comment</span>
              <textarea
                {...register("comment")}
                className={
                  styles.form.textarea[unit.branch.name as keyof object]
                }
                placeholder="Your Comment Here"
                rows={8}
              />
            </label>
            <div className="flex flex-col p-5">
              {errors.name && (
                <span className="text-red-500">
                  - The Name Field is required
                </span>
              )}
              {errors.email && (
                <span className="text-red-500">
                  - The Email Field is required
                </span>
              )}
            </div>
            <input
              type="submit"
              className={styles.form.submit[unit.branch.name as keyof object]}
            />
          </form>
        )
      ) : (
        <div className="flex flex-col p-10 my-10 bg-blue-500 text-white max-w-2xl mx-auto">
          <h3 className="text-3xl font-bold">
            Please Sign In to Leave a Rating
          </h3>
          <p>
            Signing in with ID.me and your dot MIL email will earn you a
            Verified badge on all your comments. This adds to your creditability
            as a reviewer.
          </p>
        </div>
      )}

      {/* Comments */}
      <div className="p-10 max-w-3xl mx-auto space-y-2">
        <h3 className="text-4xl mb-10 text-center">Ratings</h3>

        <hr className={styles.lineStyle[unit.branch.name as keyof object]} />

        {unit.comments.map((comment) => (
          <div className="p-1" key={comment._id}>
            <p className="shadow p-10 w-2xl my-4">
              <span
                className={styles.textColor[unit.branch.name as keyof object]}
              >
                {comment.name}:{" "}
              </span>
              {comment.comment}
            </p>
          </div>
        ))}
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
    description,
    mainImage,
    slug,
    body
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
    revalidate: 60, // 86400 for after 1 day, updates old cached version...ISR implementation
  };
};
