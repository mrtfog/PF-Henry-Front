import React from "react";
import { Link, NavLink } from "react-router-dom";
import SearchBar from "../components/SearchBar";

import style from "../scss/components/_navbar.module.scss";

export default function Navbar() {
  return (
    <nav className={style.navMain}>
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
            fill="#3B88C3"
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
        <SearchBar />
        <ul>
          <li>
            <NavLink to="/function">Cargar función</NavLink>
          </li>
          <li>
            <NavLink to="#">Registrarse</NavLink>
          </li>
          <li>
            <NavLink to="#">Suscribirse</NavLink>
          </li>
          <li>
            <NavLink to="#">Mi lista</NavLink>
          </li>
          <li>
            <NavLink to="#">Perfil</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
