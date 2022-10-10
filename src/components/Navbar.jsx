import React, { useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { useLocation } from "react-router-dom";
import style from "../scss/components/_navbar.module.scss";
import { useAuth } from "./contexts/AuthContext";
import GoogleSignIn from "./Users/GoogleSignIn";
import userIMG from '../assets/user.png'

export default function Navbar() {

  const {currentUser, logOut} =  useAuth()
  const history = useHistory()
  const { pathname } = useLocation();
  const [color, setColor] = useState(false);

  const [display, setDisplay] = useState('none')

  const changeColor = () => {
    if (window.scrollY >= 60) {
      setColor(true);
    }
    if (window.scrollY === 0) {
      setColor(false);
    }
  };

  async function handleLogOut(){

    try{

      await logOut()

      history.push('/')

    }
    catch(e){

      console.log(e)

    }
  }

  function handleUserPopUp(){

    display === 'none' ? setDisplay('flex') : setDisplay('none')
  }
  window.addEventListener("scroll", changeColor);
  return (
    <nav
      className={style.navMain}
      style={
        color
          ? {
              backgroundColor: "#040405",
              boxShadow: "0 0 10px rgba(255, 49, 90, 0.5)",
              transition: ".4s linear",
            }
          : { backgroundColor: "transparent", transition: ".4s linear" }
      }
      // style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
    >
      <Link to="/" className={style.navLogo}>
        <h2 onClick={()=> setDisplay('none')} >HPFC</h2>
      </Link>

      <div className={style.navBtnContainer}>
        <div className={style.searchbar}>
          {pathname === "/" ? <SearchBar /> : null}
        </div>
        
        {pathname === "/login" ? null : 

        (
          currentUser ? 

            <>
              <NavLink to="/playlists">
                <button onClick={()=> setDisplay('none')}>My playlist</button>
              </NavLink>
              
              <NavLink to="/cart">
                <button onClick={()=> setDisplay('none')}>Cart</button>
              </NavLink>

              <img onClick={handleUserPopUp} src={currentUser.photoURL ? currentUser.photoURL : userIMG} alt='userImg'/>

              <div className={style.userPopUp} style={{display: display}}>

                <h3>{currentUser.displayName}</h3>

                  <NavLink to="/profile/edit">
                    <button className={style.profile} onClick={()=> setDisplay('none')}> My Profile</button>
                  </NavLink>

                  <button onClick={()=> handleLogOut()}>Log Out</button>

              </div>

            </>

          :

          <>
            <NavLink to="/register">
              <button className={style.btn_primary} onClick={handleUserPopUp}>Sign Up</button>
            </NavLink>

            <NavLink to="/login">
              <button className={style.btn_primary} onClick={handleUserPopUp}>Log in</button>
            </NavLink>
          </>
          
        )}

      </div>
    </nav>
  );
}
