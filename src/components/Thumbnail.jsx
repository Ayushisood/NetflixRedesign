import React, { useState } from "react";
import { image_width } from "../utils/Requests";
import { BsPlayCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { showModalDetail } from "../features/modalSlice";
import { useNavigate } from "react-router-dom";

export default function Thumbnail({ movie, myclass }) {
  const dispatch = useDispatch(); //hook to access redux dispatch function
  const navigate = useNavigate();

  const [isHover, setIsHover] = useState(false);

  const clickHandle = () => {
    if (movie) {
      navigate("/detailScreen", { state: movie });

      dispatch(showModalDetail({ modal: true }));
    }
  };

  return (
    <div
      className={`relative h-28  px-1.5 transition duration-200 ease-out md:h-36  ${myclass}
       md:hover:scale-125   md:hover:mx-6 `}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {/* Thumbnail Image */}
      <img
        src={`${image_width}${movie?.backdrop_path || movie?.poster_path}`}
        alt={`${movie.name}`}
        className="rounded-sm object-cover md:rounded"
        layout="fill"
      />

      {/* Background color effect on hover*/}
      <div
        className={`absolute inset-x-1.5 top-0 bottom-4 md:bottom-1  bg-black opacity-40 ${
          isHover ? "visible" : "hidden"
        }`}
      ></div>

      {/* Movie title on hover */}
      <h1
        className={`absolute  inset-4 font-semibold text-sm md:text-lg text-center ${
          isHover ? "visible" : "hidden"
        }`}
      >
        {movie?.title || movie?.name || movie?.original_name}
      </h1>

      {/* Movie play button on hover */}
      <BsPlayCircle
        className={`h-5 w-5 md:h-9 md:w-9 cursor-pointer text-red-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
          isHover ? "visible" : "hidden"
        }`}
        onClick={clickHandle}
      />
    </div>
  );
}
