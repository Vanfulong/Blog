import React from "react";
import { Link } from "react-router-dom";
//{ urlImage, title, id }: { urlImage: string; title: string; id: string }
const Card = ({
  urlImage,
  title,
  id,
}: {
  urlImage: string;
  title: string;
  id: string;
}) => {
  return (
    <div className=" p-4 my-4  bg-white rounded-lg shadow-2xl">
      <div className="overflow-hidden rounded-lg">
        <Link to={`post/${id}`}>
          <img
            src={urlImage}
            alt={urlImage}
            className="rounded-lg w-full hover:scale-105 transition-all"
          />
        </Link>
      </div>
      <div className="py-5 text-left">
        <Link to={`post/${id}`}>
          <p className="font-bold text-xl">{title}</p>
        </Link>
      </div>
    </div>
  );
};

export default Card;
