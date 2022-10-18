import React from "react";
import { Unit } from "../typings";
import CommentCard from "./CommentCard";

interface Props {
  unit: Unit;
}

const styles = {
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

function Comments({ unit }: Props) {
  return (
    <div className="">
      {unit.comments[0] ? (
        <div>
          {unit.comments.map((comment) => (
            <div className="p-1 " key={comment._id}>
              <CommentCard
                postedAt={comment._createdAt}
                baseAmenities={comment.baseAmenities}
                baseLogistics={comment.baseLogistics}
                housingOptions={comment.housingOptions}
                localCommunity={comment.localCommunity}
                localRecreation={comment.localRecreation}
                schoolDistrict={comment.schoolDistrict}
                comment={comment.comment}
              />
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div className="flex py-4 justify-center">
            <h3>Be the first to review!</h3>
          </div>
          <hr className={styles.lineStyle[unit.branch.name as keyof object]} />
        </div>
      )}
    </div>
  );
}

export default Comments;
