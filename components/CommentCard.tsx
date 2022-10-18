import React from "react";
import StarDisplay from "./StarDisplay";

interface Comment {
  postedAt: string;
  comment: string;
  baseAmenities: number;
  baseLogistics: number;
  housingOptions: number;
  localCommunity: number;
  localRecreation: number;
  schoolDistrict: number;
}

function CommentCard({
  postedAt,
  baseAmenities,
  baseLogistics,
  housingOptions,
  localCommunity,
  localRecreation,
  schoolDistrict,
  comment,
}: Comment) {
  const createdAt = new Date(postedAt).toLocaleDateString();

  return (
    <div className="shadow px-10 pb-10 pt-2 w-2xl mb-4 flex flex-col">
      <div className="flex justify-center underline text-sm mb-4">
        {`Posted: ${createdAt}`}
      </div>
      <div className="flex justify-around mb-6">
        <div className="space-y-5">
          <p className="">
            Base Amenities:{" "}
            <span>
              <StarDisplay initRating={baseAmenities} h={20} w={20} />
            </span>
          </p>
          <p className="">
            Base Logistics:{" "}
            <span>
              <StarDisplay initRating={baseLogistics} h={20} w={20} />
            </span>
          </p>
          <p className="">
            Housing Options:{" "}
            <span>
              <StarDisplay initRating={housingOptions} h={20} w={20} />
            </span>
          </p>
        </div>
        <div className="space-y-5">
          <p className="">
            Local Community:{" "}
            <span>
              <StarDisplay initRating={localCommunity} h={20} w={20} />
            </span>
          </p>
          <p className="">
            Local Recreation:{" "}
            <span>
              <StarDisplay initRating={localRecreation} h={20} w={20} />
            </span>
          </p>
          <p className="">
            School District:{" "}
            <span>
              <StarDisplay initRating={schoolDistrict} h={20} w={20} />
            </span>
          </p>
        </div>
      </div>
      <div>
        <p className="underline text-center font-bold">Additional Details:</p>
        <p>{comment}</p>
      </div>
    </div>
  );
}

export default CommentCard;
