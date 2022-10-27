import React from "react";
import StarDisplay from "./StarDisplay";

function FullStarDisplay({ overall, ba, bl, ho, lc, lr, sd }) {
  return (
    <div>
      {overall ? (
        <div className="">
          <div className="flex justify-center mt-6">
            <h2 className="underline text-xl">Breakdown:</h2>
          </div>
          <div className="flex justify-between space-x-5 my-6">
            <div className="space-y-5">
              <p className="flex items-center">
                <span className="pr-2">Base Amenities:</span>
                <span>
                  <StarDisplay initRating={ba} h={20} w={20} />
                </span>
              </p>
              <p className="flex items-center">
                <span className="pr-2">Base Logistics:</span>
                <span>
                  <StarDisplay initRating={bl} h={20} w={20} />
                </span>
              </p>
              <p className="flex items-center">
                <span className="pr-2">Housing Options:</span>
                <span>
                  <StarDisplay initRating={ho} h={20} w={20} />
                </span>
              </p>
            </div>
            <div className="space-y-5">
              <p className="flex items-center">
                <span className="pr-2">Local Community:</span>
                <span>
                  <StarDisplay initRating={lc} h={20} w={20} />
                </span>
              </p>
              <p className="flex items-center">
                <span className="pr-2">Local Recreation:</span>
                <span>
                  <StarDisplay initRating={lr} h={20} w={20} />
                </span>
              </p>
              <p className="flex items-center">
                <span className="pr-2">School District:</span>
                <span>
                  <StarDisplay initRating={sd} h={20} w={20} />
                </span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div>Be the first to review!</div>
      )}
    </div>
  );
}

export default FullStarDisplay;
