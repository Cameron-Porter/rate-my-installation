import React from "react";
import StarDisplay from "./StarDisplay";

function FullStarDisplay({ overall, ba, bl, ho, lc, lr, sd }) {
  return (
    <div>
      {overall ? (
        <div>
          <div className="flex items-center space-x-2">
            <p>Overall Rating:</p>
            <span>
              <StarDisplay h={20} w={20} initRating={overall} />
            </span>
            <span>({overall} / 5)</span>
          </div>
          <div className="flex justify-center mt-6">
            <h2 className="underline text-xl">Breakdown:</h2>
          </div>
          <div className="flex justify-around my-6">
            <div className="space-y-5">
              <p className="">
                Base Amenities: <span>({ba} / 5)</span>
                <span>
                  <StarDisplay initRating={ba} h={20} w={20} />
                </span>
              </p>
              <p className="">
                Base Logistics: <span>({bl} / 5)</span>
                <span>
                  <StarDisplay initRating={bl} h={20} w={20} />
                </span>
              </p>
              <p className="">
                Housing Options: <span>({ho} / 5)</span>
                <span>
                  <StarDisplay initRating={ho} h={20} w={20} />
                </span>
              </p>
            </div>
            <div className="space-y-5">
              <p className="">
                Local Community: <span>({lc} / 5)</span>
                <span>
                  <StarDisplay initRating={lc} h={20} w={20} />
                </span>
              </p>
              <p className="">
                Local Recreation: <span>({lr} / 5)</span>
                <span>
                  <StarDisplay initRating={lr} h={20} w={20} />
                </span>
              </p>
              <p className="">
                School District: <span>({sd} / 5)</span>
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
