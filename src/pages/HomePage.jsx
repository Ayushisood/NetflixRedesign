import React, { useState, useEffect } from "react";
import Banner from "../components/Banner";
import Rows from "../components/Rows";
import requests from "../utils/Requests";
import { db, auth } from "../firebase";
import { onSnapshot, collection } from "firebase/firestore";
import Nav from "../components/Nav";
import { useSelector } from "react-redux";
import { selectModal } from "../features/modalSlice";

export default function HomePage() {
  const [myListMovies, setListMovies] = useState([]);
  const showModal = useSelector(selectModal);

  useEffect(() => {
    if (auth) {
      return onSnapshot(
        collection(db, "users", auth?.currentUser.email, "myList"),
        (snapshot) => {
          const listItems = snapshot.docs.map((doc) => ({
            //map each document into snapshot
            id: doc.id, //id and data pushed into items array
            ...doc.data(), //spread operator merges data to id.
          }));
          setListMovies(listItems);
        }
      );
    }
  }, []);

  // console.log(myListMovies);
  return (
    <div
      className={`relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh] ${
        showModal && "!h-screen overflow-hidden"
      }`}
    >
      <Nav />
      <div className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16 overflow-hidden ">
        <Banner />

        <Rows
          title="NETFLIX ORIGINALS"
          fetchURL={requests.fetchNetflixOriginals}
        />

        <Rows title="Trending Nows" fetchURL={requests.fetchTrending} />
        <Rows title="Top Rated" fetchURL={requests.fetchTopRated} />
        {myListMovies?.length > 0 && (
          <Rows title="My List" fetchURL={myListMovies} />
        )}
        <Rows title="Action Movies" fetchURL={requests.fetchActionMovies} />
        <Rows title="Horror Movies" fetchURL={requests.fetchHorrorMovies} />
        <Rows title="Romantic Movies" fetchURL={requests.fetchRomanceMovies} />
        <Rows title="Comedy Movies" fetchURL={requests.fetchComedyMovies} />
        <Rows title="Documentaries" fetchURL={requests.fetchDocumentaries} />
      </div>
    </div>
  );
}
