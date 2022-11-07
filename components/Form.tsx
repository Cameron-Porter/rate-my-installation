import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Unit } from "../typings";
import Stars from "./Stars";

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

interface FormInput {
  _id: string;
  email: string;
  baseAmenities: number;
  baseLogistics: number;
  housingOptions: number;
  localCommunity: number;
  localRecreation: number;
  schoolDistrict: number;
  comment?: string;
}

interface Props {
  unit: Unit;
}

function Form({ unit }: Props) {
  const { data: session } = useSession();
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();
  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    data.baseAmenities === null ? (data.baseAmenities = 5) : data.baseAmenities,
      data.baseLogistics === null
        ? (data.baseLogistics = 5)
        : data.baseLogistics,
      data.housingOptions === null
        ? (data.housingOptions = 5)
        : data.housingOptions,
      data.localCommunity === null
        ? (data.localCommunity = 5)
        : data.localCommunity,
      data.localRecreation === null
        ? (data.localRecreation = 5)
        : data.localRecreation,
      data.schoolDistrict === null
        ? (data.schoolDistrict = 5)
        : data.schoolDistrict,
      fetch("/api/createComment", {
        method: "POST",
        body: JSON.stringify(data),
      })
        .then(() => {
          setSubmitted(true);
        })
        .catch((err) => {
          console.log(err);
          setSubmitted(false);
        });
  };

  const [baseAmenitiesRating, setBaseAmenitiesRating] = useState(5);
  const [baseLogisticsRating, setBaseLogisticsRating] = useState(5);
  const [housingOptionsRating, setHousingOptionsRating] = useState(5);
  const [localCommunityRating, setLocalCommunityRating] = useState(5);
  const [localRecreationRating, setLocalRecreationRating] = useState(5);
  const [schoolDistrictRating, setSchoolDistrictRating] = useState(5);

  return (
    <div>
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
            <input
              {...register("email")}
              type="hidden"
              name="email"
              value={session.user!.email!}
            />
            <div className="flex justify-around align-center mb-8">
              <div className="space-y-8">
                <label className={styles.form.label}>
                  <span className={styles.form.span}>Base Amenities</span>
                  <input
                    className="hidden"
                    {...register("baseAmenities")}
                    type="radio"
                    name="baseAmenities"
                    value={baseAmenitiesRating}
                  />
                  <Stars
                    h={20}
                    w={20}
                    initRating={5}
                    onRatingChanged={(newRating: number) => {
                      setBaseAmenitiesRating(newRating);
                    }}
                  />
                </label>
                <label className={styles.form.label}>
                  <span className={styles.form.span}>Base Logistics</span>
                  <input
                    className="hidden"
                    {...register("baseLogistics")}
                    type="radio"
                    name="baseLogistics"
                    value={baseLogisticsRating}
                  />
                  <Stars
                    h={20}
                    w={20}
                    initRating={5}
                    onRatingChanged={(rating: number) => {
                      setBaseLogisticsRating(rating);
                    }}
                  />
                </label>
                <label className={styles.form.label}>
                  <span className={styles.form.span}>Housing Options</span>
                  <input
                    className="hidden"
                    {...register("housingOptions")}
                    type="radio"
                    name="housingOptions"
                    value={housingOptionsRating}
                  />
                  <Stars
                    h={20}
                    w={20}
                    initRating={5}
                    onRatingChanged={(rating: number) => {
                      setHousingOptionsRating(rating);
                    }}
                  />
                </label>
              </div>
              <div className="space-y-8">
                <label className={styles.form.label}>
                  <span className={styles.form.span}>Local Community</span>
                  <input
                    className="hidden"
                    {...register("localCommunity")}
                    type="radio"
                    name="localCommunity"
                    value={localCommunityRating}
                  />
                  <Stars
                    h={20}
                    w={20}
                    initRating={5}
                    onRatingChanged={(rating: number) => {
                      setLocalCommunityRating(rating);
                    }}
                  />
                </label>
                <label className={styles.form.label}>
                  <span className={styles.form.span}>Local Recreation</span>
                  <input
                    className="hidden"
                    {...register("localRecreation")}
                    type="radio"
                    name="localRecreation"
                    value={localRecreationRating}
                  />
                  <Stars
                    h={20}
                    w={20}
                    initRating={5}
                    onRatingChanged={(rating: number) => {
                      setLocalRecreationRating(rating);
                    }}
                  />
                </label>
                <label className={styles.form.label}>
                  <span className={styles.form.span}>School District</span>
                  <input
                    className="hidden"
                    {...register("schoolDistrict")}
                    type="radio"
                    name="schoolDistrict"
                    value={schoolDistrictRating}
                  />
                  <Stars
                    h={20}
                    w={20}
                    initRating={5}
                    onRatingChanged={(rating: number) => {
                      setSchoolDistrictRating(rating);
                    }}
                  />
                </label>
              </div>
            </div>
            <label className={styles.form.label}>
              <span className={styles.form.span}>Comment</span>
              <textarea
                {...register("comment", { required: true })}
                className={
                  styles.form.textarea[unit.branch.name as keyof object]
                }
                placeholder="Your Comment Here"
                rows={8}
              />
            </label>
            <div className="flex flex-col p-5">
              {errors.comment && (
                <span className="text-red-500">
                  - The comment field is required
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
          <h3 className="text-3xl text-center font-bold">
            Please Sign In to Leave a Rating
          </h3>
          <p></p>
        </div>
      )}
    </div>
  );
}

export default Form;
