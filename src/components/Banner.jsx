import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import TypingEffect from "../utils/TypingEffect";
import requests, { image_url } from "../utils/Requests";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showModalDetail } from "../features/modalSlice";

export default function Banner() {
  const [movie, setMovie] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Function to call when banner button is clicked
  const clickHandle = () => {
    if (movie) {
      navigate("/detailScreen", { state: movie });

      dispatch(showModalDetail({ modal: true }));
    }
  };

  useEffect(() => {
    let isApiSubscribed = false;
    async function fetchData() {
      if (isApiSubscribed) return;
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }

    fetchData(); //calling the async function in callback of useEffect
    return () => {
      // cancel the subscription
      isApiSubscribed = true;
    };
  }, []);

  function truncate(string, num) {
    // function to cut down the description if it is too long
    return string?.length > num ? string.substr(0, num - 1) + "..." : string;
  }

  return (
    <div className="flex flex-col space-y-2 py-16  md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12 ">
      {/* Banner Image */}
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen ">
        <img
          alt=""
          src={`${image_url}${movie?.backdrop_path}`}
          className="object-cover md:w-screen"
        />
      </div>

      {/* Movie title with typing effect */}
      <h1 className="font-bold text-2xl md:text-4xl lg:text-7xl text-left">
        {(movie?.title || movie?.name || movie?.original_name) && (
          <TypingEffect
            text={truncate(
              `${movie?.title || movie?.name || movie?.original_name}`,
              25
            )}
          />
        )}
      </h1>

      {/* Movie Description */}
      <h1 className="max-w-xs text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl text-left">
        {truncate(`${movie?.overview}`, 150)}
      </h1>
      <div className="flex space-x-3">
        {/* Banner buttons */}
        <>
          <button
            className="bannerButton bg-red-600 shadow-xl shadow-red-800"
            onClick={clickHandle}
          >
            <FaPlay className="h-4 w-4 lg:w-5 lg:h-5" />
            Play
          </button>
          <button
            className="bannerButton bg-white text-black shadow-inner shadow-slate-500"
            onClick={clickHandle}
          >
            More Information
          </button>
        </>
      </div>
    </div>
  );
}
