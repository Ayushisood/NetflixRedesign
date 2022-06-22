import React, { useEffect, useRef, useState } from "react";
import axios from "../utils/axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Thumbnail from "./Thumbnail";

export default function Rows(
  { title, fetchURL } //destructuring of props
) {
  const [movies, setMovies] = useState([]);
  const [isMoved, setIsMoved] = useState(false); //for showing left arrow
  const rowRef = useRef(null);

  // fetching movies for each row
  useEffect(() => {
    let isApiSubscribed = false;
    async function fetchData() {
      if (isApiSubscribed) return;
      if (title === "My List") setMovies(fetchURL);
      else {
        const request = await axios.get(fetchURL);

        setMovies(request.data.results);
        return request;
      }
    }

    fetchData();

    return () => {
      // cancel the subscription, cleanup function to reove errorCan't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
      isApiSubscribed = true;
    };
  }, [fetchURL, title]);

  // Row's Scroll functionality
  const handleClick = (direction) => {
    setIsMoved(true);

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behaviour: "smooth" }); //adjusting the arrow scroll behaviour
    }
  };

  return (
    <div className="h-40 space-y-2.5 md:space-y-5 ">
      {/* Row's Title */}
      <h2 className="w-58 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 text-left hover:text-white md:text-2xl">
        {title}
      </h2>

      {/* Row's movies element */}
      <div className="group relative md:-ml-2 md:mr-7">
        {/* Left arrow of scrollbar */}
        <FaChevronLeft
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-6 w-6 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 md:h-9 md:w-7  ${
            !isMoved && "hidden"
          }`}
          onClick={() => handleClick("left")}
        />

        <div
          ref={rowRef}
          className="flex items-center md:my-4 md:py-4 overflow-x-scroll scrollbar-hide"
        >
          {/* Mapping of fetched movies into array */}
          {movies?.map((movie) => (
            <Thumbnail
              key={movie.id}
              movie={movie}
              myclass={`${
                title === "My List"
                  ? "w-[180px] md:w-[260px]"
                  : "min-w-[180px] md:min-w-[260px]"
              }`}
            />
          ))}
        </div>

        {/* Right arrow of scrollbar */}
        <FaChevronRight
          className="absolute top-0 bottom-0 right-2 z-40 m-auto h-6 w-6 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 md:h-9 md:w-7 "
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
}
