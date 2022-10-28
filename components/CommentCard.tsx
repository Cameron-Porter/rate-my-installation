import React from "react";
import FullStarDisplay from "./FullStarDisplay";

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
    <div className="shadow px-5 pb-10 pt-2 w-2xl mb-4 flex flex-col">
      <div className="flex justify-center underline text-sm mb-4">
        {`Posted: ${createdAt}`}
      </div>
      <div className="flex justify-around mb-6">
        <div className="space-y-5">
          <FullStarDisplay
            overall="1"
            ba={baseAmenities}
            bl={baseLogistics}
            ho={housingOptions}
            lc={localCommunity}
            lr={localRecreation}
            sd={schoolDistrict}
          />
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
