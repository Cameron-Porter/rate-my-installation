import React, { useEffect, useState } from "react";
import _ from "lodash";
import star from "../public/media/star.png";
import unstar from "../public/media/unstar.png";
import Image from "next/image";

function Stars({ initRating, onRatingChanged, h, w }) {
  const [rating, setRating] = useState(initRating);

  useEffect(() => {
    setRating(initRating);
  }, [initRating]);

  function changeRating(newRating) {
    setRating(newRating);
    onRatingChanged(newRating);
  }

  return (
    <div className="flex items-center space-x-3 my-1">
      {_.times(5, (index) => (
        <Image
          className=""
          alt="rating stars"
          src={rating >= index + 1 ? star : unstar}
          key={index}
          onClick={() => changeRating(index + 1)}
          width={w}
          height={h}
        />
      ))}{" "}
    </div>
  );
}

export default Stars;
