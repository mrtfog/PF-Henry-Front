import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { useLocation } from "react-router-dom";
import style from "../scss/components/_navbar.module.scss";

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav
      className={style.navMain}
      style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
    >
      <Link to="/" className={style.navLogo}>
        <svg
          width="36px"
          height="36px"
          viewBox="0 0 36 36"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            fill="#ff315a"
            d="M36 32a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4v28z"
          ></path>
          <path
            fill="#FFF"
            d="M21 11a6 6 0 1 1-12 0a6 6 0 0 1 12 0zm10.999 2a5 5 0 1 1-10.001-.001A5 5 0 0 1 31.999 13z"
          ></path>
          <path
            fill="#FFF"
            d="M30 20a4 4 0 0 0-4-4H15a4 4 0 0 0-4 4l-6-4H4v13h1l6-4v2a4 4 0 0 0 4 4h11a4 4 0 0 0 4-4v-7z"
          ></path>
        </svg>
      </Link>

      <div className={style.navBtnContainer}>
        <div className={style.searchbar}>
          {pathname === "/" ? <SearchBar /> : null}
        </div>

        <NavLink to="/playlists">
          <button>My playlist</button>
        </NavLink>

        <NavLink to="#">
          <button>Profile</button>
        </NavLink>

        {/* <NavLink to="/function">
          <button className={style.btn_primary}>Create Movie Showtime</button>
        </NavLink> */}

        <NavLink to="/register">
          <button className={style.btn_primary}>Sign Up</button>
        </NavLink>

        <NavLink to="/admin/statistics">
          <button className={style.btn_primary}>Log in</button>
        </NavLink>
      </div>
    </nav>
  );
}
