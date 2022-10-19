import React, { useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import style from "../scss/components/_navbar.module.scss";
import { useAuth } from "./contexts/AuthContext";
import userIMG from '../assets/user.png'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import { clearCart } from "../redux/actions/cart";
import { useDispatch, useSelector } from "react-redux";
import { is } from "date-fns/locale";
import { useEffect } from "react";
import { getUserRole } from "../redux/actions/users";

export default function Navbar() {

  const dispatch = useDispatch()
  const role = useSelector(state => state.usersReducer.userRole)

  const { currentUser, logOut } = useAuth()
  const history = useHistory()
  const { pathname } = useLocation();
  const [color, setColor] = useState(false);

  const [display, setDisplay] = useState('none')

  useEffect(() => {
    if (currentUser) dispatch(getUserRole(currentUser.accessToken))
  }, [])

  const changeColor = () => {
    if (window.scrollY >= 60) {
      setColor(true);
    }
    if (window.scrollY === 0) {
      setColor(false);
    }
  };

  async function handleLogOut() {

    Swal.fire({
      text: 'Are you sure you want to log out?',
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
      .then((result) => {

        if (result.isConfirmed) {
          logOut()
            .then(() => history.push('/'))
            .catch(e => console.log(e))
        }
      })


  }

  function handleUserPopUp() {

    display === 'none' ? setDisplay('flex') : setDisplay('none')
  }

  /*======================== EVENT STICKY BAR ======================== */


  window.addEventListener("scroll", changeColor);

  /* ======================== BURGER MENU SECTION ========================  */


  /* To change burger classes */
  const [burger, setBurgerClass] = useState(`${style.burgerBar} ${style.unclicked}`)
  const [menu, setMenuClass] = useState(`${style.menu} ${style.hidden} ${style.navBtnContainer}`)
  const [isMenuClicked, setIsMenuClicked] = useState(false)

  /* Toggle burger menu change */

  const updateMenu = () => {
    if (!isMenuClicked) {
      setBurgerClass(`${style.burgerBar} ${style.clicked}`)
      setMenuClass(`${style.menu} ${style.visible} ${style.navBtnContainer}`)
    } else {
      setBurgerClass(`${style.burgerBar} ${style.unclicked}`)
      setMenuClass(`${style.menu} ${style.hidden} ${style.navBtnContainer}`)
    }

    setIsMenuClicked(!isMenuClicked)
  }


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
        <h2 onClick={() => setDisplay('none')} >Moviefy <span>+</span></h2>
      </Link>
      {pathname === "/login" ? null :

        <div className={style.burgerMenu} onClick={updateMenu}>
          <span className={burger}></span>
          <span className={burger}></span>
          <span className={burger}></span>
        </div>

      }

      <div className={menu}>

        {pathname === "/login" ? null :
          (
            currentUser ?

              <>
                <NavLink to="/movies">
                  {pathname === "/movies" ? null : <button onClick={() => setDisplay('none')}>Movies</button>}
                </NavLink>

                <NavLink to="/playlists">
                  {pathname === "/playlists" ? null : <button onClick={() => setDisplay('none')}>My playlist</button>}
                </NavLink>

                <NavLink to="/cart">
                  {pathname === "/cart" ? null : <button onClick={() => setDisplay('none')}>Cart</button>}
                </NavLink>

                <img onClick={handleUserPopUp} src={currentUser.photoURL ? currentUser.photoURL : userIMG} alt='userImg' />

                <div className={style.userPopUp} style={{ display: display }}>

                  <h3>{currentUser.displayName}</h3>

                  <NavLink to="/profile/edit">
                    <button className={style.profile} onClick={() => setDisplay('none')}> My Profile</button>
                  </NavLink>

                  {
                    typeof role === "object" ?
                      <NavLink to="/admin/statistics/graphics">
                        <button onClick={() => setDisplay('none')}> Admin Dashboard</button>
                      </NavLink>
                      : null
                  }

                  <button onClick={() => handleLogOut()}>Log Out</button>

                </div>

              </>

              :

              <>
                <NavLink to="/cart">
                  <button onClick={() => setDisplay('none')}>Cart</button>
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
