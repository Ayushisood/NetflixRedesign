import React, { useEffect, useState } from "react";
import { BsFillBellFill } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import BasicMenu from "../components/BasicMenu";

function Nav() {
  const [isScrolled, setScrolled] = useState(false);
  const [searchActive, setSearchActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) setScrolled(true);
      else setScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      //cleanup function to clean the effect before execution of next run
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={`${
        isScrolled && "bg-[#111]"
      } fixed top-0 z-50 flex w-full items-center justify-between px-4 py-4  transition-all lg:px-6 lg:py-6`}
    >
      <div className="flex items-center space-x-12">
        <img
          src="https://rb.gy/ulxxee"
          alt=""
          width={100}
          height={100}
          className="cursor-pointer object-contain sm:w-36"
        />
        <BasicMenu />

        <ul className="hidden space-x-8 md:flex">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "activeClass" : "navLink"
              }
            >
              Home
            </NavLink>
          </li>
          <li className="navLink">
            {/* <NavLink
              // to="movies"
              // className={({ isActive }) =>
              //   isActive ? "activeClass" : "navLink"
              // }
              //className="navLink"
            > */}
            Movies
            {/* </NavLink> */}
          </li>
          <li className="navLink">
            {/* {" "}
            <NavLink
              // className={({ isActive }) =>
              //   isActive ? "activeClass" : "navLink"
              // }
              className="navLink"
            > */}
            Series
            {/* </NavLink> */}
          </li>
          <li className="navLink">
            {/* {" "}
            <NavLink
              // className={({ isActive }) =>
              //   isActive ? "activeClass" : "navLink"
              // }
              className="navLink"
            > */}
            My List
            {/* </NavLink> */}
          </li>
        </ul>
      </div>

      {/* right side icons */}
      <div className="flex items-center space-x-6 ">
        <BsFillBellFill className="md:h-6 md:w-6 cursor-pointer hidden" />
        <div className="flex items-center">
          <BsSearch
            className="hidden md:h-6 md:w-6 sm:inline cursor-pointer"
            onClick={() => setSearchActive((searchActive) => !searchActive)}
          />
          <input
            type="text"
            placeholder="Search Movies ans Series"
            className={`bg-[#44444459] text-white border-[1px] border-solid border-white transition-[width] duration-100 h-[30px]  ${
              searchActive === true
                ? "ml-[10px] py-0 px-3 opacity-1 w-[250px]"
                : "ml-[0] p-0 opacity-0 w-0"
            }`}
          />
        </div>

        <NavLink to="profileScreen" end>
          {/* <FaUserCircle className="md:h-8 md:w-8 cursor-pointer text-red-600" /> */}
          <img
            src="https://rb.gy/g1pwyx"
            alt=""
            className="cursor-pointer rounded"
          />
        </NavLink>
      </div>
    </div>
  );
}

export default Nav;
