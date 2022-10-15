import React, { useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import style from "../scss/components/_navbar.module.scss";
import { useAuth } from "./contexts/AuthContext";
import userIMG from '../assets/user.png'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import { clearCart } from "../redux/actions/cart";
import { useDispatch } from "react-redux";

export default function Navbar() {


  const dispatch = useDispatch()

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

    Swal.fire({
      text:'Are you sure you want to log out?',
      icon: 'question',
      iconColor: '#497aa6',
      showCloseButton: true,
      showDenyButton: true,
      denyButtonText: 'No, stay logged in',
      confirmButtonText: 'Yes, I am sure',
      allowEnterKey: false,
      customClass: {
          popup: 'Alert',
          closeButton: 'closeButton',
          confirmButton: 'confirmButton',
          denyButton: 'denyButton',
      }
    })
    .then((result)=>{

      if(result.isConfirmed){
        logOut()
        .then(()=> history.push('/'))
        .catch(e => console.log(e))
      }
    })


  }

  function handleUserPopUp(){

    display === 'none' ? setDisplay('flex') : setDisplay('none')
  }

  /*======================== EVENT STICKY BAR ======================== */
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
    >
      <Link to="/" className={style.navLogo}>
        <h2 onClick={()=> setDisplay('none')} >HPFC</h2>
      </Link>

      <div className={style.navBtnContainer}>
        
        {pathname === "/login" ? null :
        (
          currentUser ? 

            <>
              <NavLink to="/movies">
                {pathname === "/movies" ? null : <button onClick={()=> setDisplay('none')}>Movies</button>}
              </NavLink>

              <NavLink to="/playlists">
                {pathname === "/playlists" ? null : <button onClick={()=> setDisplay('none')}>My playlist</button>}
              </NavLink>
              
              <NavLink to="/cart">
                {pathname === "/cart" ? null : <button onClick={()=> setDisplay('none')}>Cart</button>}
              </NavLink>

              <img onClick={handleUserPopUp} src={currentUser.photoURL ? currentUser.photoURL : userIMG} alt='userImg'/>

              <div className={style.userPopUp} style={{display: display}}>

                <h3>{currentUser.displayName}</h3>

                  <NavLink to="/profile/edit">
                    <button className={style.profile} onClick={()=> setDisplay('none')}> My Profile</button>
                  </NavLink>

                  <NavLink to="/admin/statistics/graphics">
                    <button onClick={()=> setDisplay('none')}> Admin Dashboard</button>
                  </NavLink>

                  <button onClick={()=> handleLogOut()}>Log Out</button>

              </div>

            </>

          :

          <>
            <NavLink to="/cart">
              <button onClick={()=> setDisplay('none')}>Cart</button>
            </NavLink>

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
