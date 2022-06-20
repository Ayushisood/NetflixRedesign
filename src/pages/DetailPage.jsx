import React, { useState, useEffect } from "react";
// import { Modal } from "@mui/material";
import { Modal } from "@material-ui/core";
import { showModalDetail, selectModal } from "../features/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import ReactPlayer from "react-player/youtube";
import requests, { image_url } from "../utils/Requests";
import { FaVolumeOff, FaVolumeUp, FaThumbsUp } from "react-icons/fa";
import { IoIosClose, IoIosAdd, IoIosCheckmark } from "react-icons/io";
import { BsFillPlayCircleFill } from "react-icons/bs";
import axios from "../utils/axios";
import { useLocation, useNavigate } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { auth, db, users } from "../firebase";
import toast, { Toaster } from "react-hot-toast";

export default function DetailPage() {
  const navigate = useNavigate();
  const movie = useLocation().state;
  const showModal = useSelector(selectModal);

  const [trailer, setTrailer] = useState("");
  const [muted, setMuted] = useState(true);
  const [likedVideo, setLikedVideo] = useState(false);
  const [playVideo, setPlayVideo] = useState(false);
  const [genres, setGenres] = useState([]);
  const [addedToList, setAddedToList] = useState(false);
  const [listMovies, setListMovies] = useState([]);
  const [errorMsg, setError] = useState(false);

  // styling of toast component
  const toastStyle = {
    background: "white",
    color: "black",
    fontWeight: "bold",
    fontSize: "16px",
    padding: "15px",
    borderRadius: "9999px",
    maxWidth: "1000px",
  };

  const dispatch = useDispatch();

  //fetch movie trailer if any
  useEffect(() => {
    if (!movie) return;

    async function fetchMovie() {
      const response = await axios
        .get(`/movie/${movie?.id}${requests.fetchTrailer}`)
        .catch((err) => {
          console.log(err.message);
          setError(true);
        });

      const data = response?.data;

      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element) => element.type === "Trailer" || element.type === "Teaser"
        );
        if (data?.videos.results.length === 0) setError(true);
        setTrailer(data.videos?.results[index]?.key);
      }
      if (data?.genres) {
        setGenres(data.genres);
      }
    }

    fetchMovie();
  }, [movie]);

  //find all movies in user's list
  useEffect(() => {
    if (auth) {
      return onSnapshot(
        collection(db, "users", auth.currentUser.email, "myList"),
        (snapshot) => setListMovies(snapshot.docs)
      );
    }
  }, [movie?.id]);

  //check if movie is already in myList
  useEffect(
    () =>
      setAddedToList(
        listMovies.findIndex((res) => res.data().id === movie?.id) !== -1
      ),
    [listMovies, movie?.id]
  );

  //if movie is added to a list show toast with msg and add that movie to firebase , if movie is removed from list delete that movie from firebase and show toast msg
  const handleList = async () => {
    if (addedToList) {
      //delete added list
      await deleteDoc(
        doc(users, auth.currentUser.email, "myList", movie?.id.toString())
      );

      toast(
        `${
          movie?.name || movie?.title || movie?.original_name
        } has been removed from My List`,
        { duration: 8000, style: toastStyle }
      );
    } else {
      await setDoc(
        doc(users, auth.currentUser.email, "myList", movie?.id.toString()),
        { ...movie }
      );

      toast(
        `${
          movie?.name || movie?.title || movie?.original_name
        } has been added to My List`,
        { duration: 8000, style: toastStyle }
      );
    }
  };

  const handleClose = () => {
    dispatch(showModalDetail({ modal: false }));
    navigate(-1); //go back to previous page using stack
  };

  if (!showModal) return null;

  return (
    // background poster
    <div
      className="relative object-contain bg-cover bg-center h-screen"
      style={{
        backgroundImage: `url("${image_url}${movie?.backdrop_path}")`,
      }}
    >
      {/* Modal to show  */}
      <Modal
        open={showModal}
        onClose={handleClose}
        className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
      >
        <>
          <Toaster position="bottom-center" />

          {/* Modal close button */}
          <button
            className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818] "
            onClick={handleClose}
          >
            <IoIosClose className="h-7 w-7" />
          </button>

          {/* show video if present else show error image */}
          <div className="relative pt-[56.25%]">
            {errorMsg ? (
              <img
                src="https://beaumonthfsi.com/img/no-video.gif"
                height="100%"
                width="100%"
                alt=""
                style={{ position: "absolute", top: "0", left: "0" }}
              />
            ) : (
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${trailer}`}
                width="100%"
                height="100%"
                style={{ position: "absolute", top: "0", left: "0" }}
                playing={playVideo}
                muted={muted}
              />
            )}

            {/* Video handling buttons */}
            <div className="absolute bottom-6 md:bottom-10 flex w-full items-center justify-between px-10">
              <div className="flex space-x-2">
                {/* Video play button */}
                <button
                  className="flex items-center gap-x-2 rounded bg-white px-4 md:px-6 text-xl font-bold text-black transition hover:bg-[#e6e6e6]"
                  onClick={() => setPlayVideo(!playVideo)}
                >
                  <BsFillPlayCircleFill className="h-5 w-5 md:h-7 md:w-7 text-black" />
                  Play
                </button>

                {/* Add/Remove to/from my List button */}
                <button className="modalButton" onClick={handleList}>
                  {addedToList ? (
                    <IoIosCheckmark className="h-7 w-7 md:h-9 md:w-9" />
                  ) : (
                    <IoIosAdd className="h-7 w-7 md:h-9 md:w-9" />
                  )}
                </button>

                {/* Video like button */}
                <button className="modalButton">
                  <FaThumbsUp
                    className={`h-6 w-6 ${likedVideo ? "text-blue-500" : ""}`}
                    onClick={() => setLikedVideo(!likedVideo)}
                  />
                </button>
              </div>

              {/* Video mute button */}
              <button className="modalButton" onClick={() => setMuted(!muted)}>
                {muted ? (
                  <FaVolumeOff className="h-6 w-6" />
                ) : (
                  <FaVolumeUp className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Movie details */}
          <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
            <div className="space-y-6 text-lg">
              <div className="flex items-center space-x-2 text-sm">
                <p className="font-semibold text-green-400">
                  {movie?.vote_average * 10}% Match
                </p>
                <p className="font-light">
                  {movie?.release_date || movie?.first_air_date || "N / A"}
                </p>
                <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                  HD
                </div>
              </div>
              <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
                <p className="w-5/6">{movie?.overview || "N / A"}</p>
                <div className="flex flex-col space-y-3 text-sm">
                  <div>
                    <span className="text-[gray]">Genres:</span>{" "}
                    {genres.map((genre) => genre.name).join(", ") || "N / A"}
                  </div>

                  <div>
                    <span className="text-[gray]">Original language:</span>{" "}
                    {movie?.original_language || "N / A"}
                  </div>

                  <div>
                    <span className="text-[gray]">Total votes:</span>{" "}
                    {movie?.vote_count || "N / A"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </Modal>
    </div>
  );
}
