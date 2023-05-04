import React, { useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import style from "../../scss/components/common/_navbar.module.scss";
import { useAuth } from "../../contexts/AuthContext";
import userIMG from '../../assets/user.png'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserRole } from "../../redux/actions/users";
import { getReservations } from "../../redux/actions/cart";

export default function Navbar() {

  const dispatch = useDispatch()
  const role = useSelector(state => state.usersReducer.userRole)
  const reservations = useSelector(state => state.cartReducer.newReservations)

  const { currentUser, logOut } = useAuth()
  const history = useHistory()
  const { pathname } = useLocation();
  const [color, setColor] = useState(false);

  const [display, setDisplay] = useState('none')

  
  const sessionCart = JSON.parse(sessionStorage.getItem("newCart")) || []


  useEffect(() => {
    if (currentUser) dispatch(getUserRole(currentUser.accessToken))
    if(currentUser) dispatch(getReservations(currentUser.accessToken))
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

  function handleUserPopUp(element) {

    display === 'none' ? setDisplay('flex') : setDisplay('none')
    if(element !== 'photo') updateMenu()
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

  function handleButtonClick(){

    setDisplay('none')
    updateMenu()
  }


  return (
    <nav
      className={style.navMain}
      style={
        color
          ? {
            backgroundColor: "#121212",
            boxShadow: "0 0 10px rgba(255, 255, 255, .1)",
            transition: ".4s linear",
            borderBottom: ".5px solid #374151",
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
                  {pathname === "/movies" ? null : <button onClick={() => handleButtonClick()}>Movies</button>}
                </NavLink>

                <NavLink to="/playlists">
                  {pathname === "/playlists" ? null : <button onClick={() => handleButtonClick()}>My playlist</button>}
                </NavLink>

                <NavLink to="/cart">

                  {pathname === "/cart" ? null : 
                    <div className={style.cart}>
                     { reservations.length ? <span onClick={() => handleButtonClick()}>•</span> : null}
                      <svg width="45" height="45" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M59.8401 17.77C59.442 17.2201 58.9188 16.7728 58.3137 16.465C57.7086 16.1573 57.039 15.9979 56.3601 16H15.8901L14.7701 9.99995C14.6069 9.01073 14.0985 8.11132 13.3351 7.46141C12.5717 6.8115 11.6027 6.45314 10.6001 6.44995H4.6001C4.26858 6.44995 3.95063 6.58165 3.71621 6.81607C3.48179 7.05049 3.3501 7.36843 3.3501 7.69995C3.3501 8.03147 3.48179 8.34941 3.71621 8.58383C3.95063 8.81826 4.26858 8.94995 4.6001 8.94995H10.6001C11.0081 8.95199 11.4027 9.09572 11.7165 9.35657C12.0302 9.61742 12.2436 9.97917 12.3201 10.38L19.2601 48.08C19.3179 48.3631 19.472 48.6175 19.6963 48.7999C19.9206 48.9822 20.2011 49.0812 20.4901 49.08H23.3001C22.8378 49.7931 22.5481 50.6042 22.4539 51.4488C22.3597 52.2935 22.4635 53.1485 22.7573 53.946C23.0511 54.7435 23.5266 55.4615 24.1463 56.0432C24.7659 56.6249 25.5125 57.0542 26.327 57.2971C27.1414 57.54 28.0012 57.5897 28.8383 57.4424C29.6753 57.2951 30.4665 56.9548 31.149 56.4485C31.8316 55.9421 32.3868 55.2837 32.7706 54.5254C33.1544 53.7671 33.3563 52.9298 33.3601 52.08C33.3626 51.016 33.0569 49.974 32.4801 49.08H38.0901C37.5548 49.9057 37.2522 50.8606 37.2142 51.844C37.1762 52.8273 37.4041 53.8027 37.8741 54.6674C38.344 55.532 39.0385 56.2539 39.8843 56.7569C40.7301 57.2598 41.696 57.5253 42.6801 57.5253C43.6642 57.5253 44.6301 57.2598 45.4759 56.7569C46.3217 56.2539 47.0162 55.532 47.4861 54.6674C47.9561 53.8027 48.184 52.8273 48.146 51.844C48.108 50.8606 47.8054 49.9057 47.2701 49.08H49.0001C49.3316 49.08 49.6496 48.9483 49.884 48.7138C50.1184 48.4794 50.2501 48.1615 50.2501 47.83C50.2501 47.4984 50.1184 47.1805 49.884 46.9461C49.6496 46.7116 49.3316 46.58 49.0001 46.58H21.5301L20.6301 41.68H50.0901C50.9623 41.6803 51.8135 41.4129 52.5288 40.914C53.2442 40.415 53.7891 39.7085 54.0901 38.8899L60.3601 21.64C60.5874 21 60.6588 20.3151 60.5684 19.642C60.4779 18.969 60.2283 18.3272 59.8401 17.77ZM30.8401 52.08C30.8401 52.6733 30.6642 53.2533 30.3345 53.7467C30.0049 54.24 29.5363 54.6245 28.9881 54.8516C28.44 55.0787 27.8368 55.1381 27.2548 55.0223C26.6729 54.9065 26.1383 54.6208 25.7188 54.2013C25.2992 53.7817 25.0135 53.2472 24.8977 52.6652C24.782 52.0833 24.8414 51.4801 25.0685 50.9319C25.2955 50.3837 25.68 49.9152 26.1734 49.5855C26.6667 49.2559 27.2468 49.08 27.8401 49.08C28.2357 49.0773 28.628 49.153 28.9943 49.3025C29.3606 49.4521 29.6937 49.6727 29.9744 49.9515C30.2551 50.2304 30.4778 50.562 30.6298 50.9273C30.7819 51.2925 30.8601 51.6843 30.8601 52.08H30.8401ZM45.6301 52.08C45.6301 52.6733 45.4542 53.2533 45.1245 53.7467C44.7949 54.24 44.3263 54.6245 43.7781 54.8516C43.23 55.0787 42.6268 55.1381 42.0448 55.0223C41.4629 54.9065 40.9283 54.6208 40.5088 54.2013C40.0892 53.7817 39.8035 53.2472 39.6877 52.6652C39.572 52.0833 39.6314 51.4801 39.8585 50.9319C40.0855 50.3837 40.47 49.9152 40.9634 49.5855C41.4567 49.2559 42.0368 49.08 42.6301 49.08C43.0257 49.0773 43.418 49.153 43.7843 49.3025C44.1506 49.4521 44.4837 49.6727 44.7644 49.9515C45.0451 50.2304 45.2678 50.562 45.4198 50.9273C45.5719 51.2925 45.6501 51.6843 45.6501 52.08H45.6301ZM58.0001 20.81L51.7301 38.0499C51.6073 38.3864 51.3842 38.6771 51.0909 38.8828C50.7976 39.0884 50.4483 39.1991 50.0901 39.2H20.1701L16.3501 18.46H56.3501C56.6307 18.4573 56.9078 18.5233 57.157 18.6523C57.4063 18.7813 57.6202 18.9693 57.7801 19.2C57.945 19.4302 58.0512 19.6971 58.0896 19.9777C58.1279 20.2583 58.0972 20.5439 58.0001 20.81V20.81Z" fill="black"/>
                      </svg>
                    
                    </div>
                    }
                    
                </NavLink>

                <img onClick={()=> handleUserPopUp('photo')} src={currentUser.photoURL ? currentUser.photoURL : userIMG} alt='userImg' />

                <div className={style.userPopUp} style={{ display: display }}>

                  <h3>{currentUser.displayName}</h3>

                  <NavLink to="/profile/edit">
                    <button className={style.profile} onClick={() => handleButtonClick()}> My Profile</button>
                  </NavLink>

                  {
                    typeof role === "object" ?
                      <NavLink to="/admin/statistics/graphics">
                        <button onClick={() => handleButtonClick()}> Admin Dashboard</button>
                      </NavLink>
                      : null
                  }

                  <button onClick={() => handleLogOut()}>Log Out</button>

                </div>

              </>

              :

              <>

                <NavLink to="/register">
                  <button onClick={handleUserPopUp}>Sign Up</button>
                </NavLink>

                <NavLink to="/login">
                  <button className={style.btn_primary} onClick={handleUserPopUp}>Log in</button>
                </NavLink>
                
                <NavLink to="/cart">
                  {pathname === '/cart' ? null :  
                  <div className={style.cart}>
                    { sessionCart.length ? <span onClick={() => handleButtonClick()}>•</span> : null}
                    <svg width="45" height="45" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M59.8401 17.77C59.442 17.2201 58.9188 16.7728 58.3137 16.465C57.7086 16.1573 57.039 15.9979 56.3601 16H15.8901L14.7701 9.99995C14.6069 9.01073 14.0985 8.11132 13.3351 7.46141C12.5717 6.8115 11.6027 6.45314 10.6001 6.44995H4.6001C4.26858 6.44995 3.95063 6.58165 3.71621 6.81607C3.48179 7.05049 3.3501 7.36843 3.3501 7.69995C3.3501 8.03147 3.48179 8.34941 3.71621 8.58383C3.95063 8.81826 4.26858 8.94995 4.6001 8.94995H10.6001C11.0081 8.95199 11.4027 9.09572 11.7165 9.35657C12.0302 9.61742 12.2436 9.97917 12.3201 10.38L19.2601 48.08C19.3179 48.3631 19.472 48.6175 19.6963 48.7999C19.9206 48.9822 20.2011 49.0812 20.4901 49.08H23.3001C22.8378 49.7931 22.5481 50.6042 22.4539 51.4488C22.3597 52.2935 22.4635 53.1485 22.7573 53.946C23.0511 54.7435 23.5266 55.4615 24.1463 56.0432C24.7659 56.6249 25.5125 57.0542 26.327 57.2971C27.1414 57.54 28.0012 57.5897 28.8383 57.4424C29.6753 57.2951 30.4665 56.9548 31.149 56.4485C31.8316 55.9421 32.3868 55.2837 32.7706 54.5254C33.1544 53.7671 33.3563 52.9298 33.3601 52.08C33.3626 51.016 33.0569 49.974 32.4801 49.08H38.0901C37.5548 49.9057 37.2522 50.8606 37.2142 51.844C37.1762 52.8273 37.4041 53.8027 37.8741 54.6674C38.344 55.532 39.0385 56.2539 39.8843 56.7569C40.7301 57.2598 41.696 57.5253 42.6801 57.5253C43.6642 57.5253 44.6301 57.2598 45.4759 56.7569C46.3217 56.2539 47.0162 55.532 47.4861 54.6674C47.9561 53.8027 48.184 52.8273 48.146 51.844C48.108 50.8606 47.8054 49.9057 47.2701 49.08H49.0001C49.3316 49.08 49.6496 48.9483 49.884 48.7138C50.1184 48.4794 50.2501 48.1615 50.2501 47.83C50.2501 47.4984 50.1184 47.1805 49.884 46.9461C49.6496 46.7116 49.3316 46.58 49.0001 46.58H21.5301L20.6301 41.68H50.0901C50.9623 41.6803 51.8135 41.4129 52.5288 40.914C53.2442 40.415 53.7891 39.7085 54.0901 38.8899L60.3601 21.64C60.5874 21 60.6588 20.3151 60.5684 19.642C60.4779 18.969 60.2283 18.3272 59.8401 17.77ZM30.8401 52.08C30.8401 52.6733 30.6642 53.2533 30.3345 53.7467C30.0049 54.24 29.5363 54.6245 28.9881 54.8516C28.44 55.0787 27.8368 55.1381 27.2548 55.0223C26.6729 54.9065 26.1383 54.6208 25.7188 54.2013C25.2992 53.7817 25.0135 53.2472 24.8977 52.6652C24.782 52.0833 24.8414 51.4801 25.0685 50.9319C25.2955 50.3837 25.68 49.9152 26.1734 49.5855C26.6667 49.2559 27.2468 49.08 27.8401 49.08C28.2357 49.0773 28.628 49.153 28.9943 49.3025C29.3606 49.4521 29.6937 49.6727 29.9744 49.9515C30.2551 50.2304 30.4778 50.562 30.6298 50.9273C30.7819 51.2925 30.8601 51.6843 30.8601 52.08H30.8401ZM45.6301 52.08C45.6301 52.6733 45.4542 53.2533 45.1245 53.7467C44.7949 54.24 44.3263 54.6245 43.7781 54.8516C43.23 55.0787 42.6268 55.1381 42.0448 55.0223C41.4629 54.9065 40.9283 54.6208 40.5088 54.2013C40.0892 53.7817 39.8035 53.2472 39.6877 52.6652C39.572 52.0833 39.6314 51.4801 39.8585 50.9319C40.0855 50.3837 40.47 49.9152 40.9634 49.5855C41.4567 49.2559 42.0368 49.08 42.6301 49.08C43.0257 49.0773 43.418 49.153 43.7843 49.3025C44.1506 49.4521 44.4837 49.6727 44.7644 49.9515C45.0451 50.2304 45.2678 50.562 45.4198 50.9273C45.5719 51.2925 45.6501 51.6843 45.6501 52.08H45.6301ZM58.0001 20.81L51.7301 38.0499C51.6073 38.3864 51.3842 38.6771 51.0909 38.8828C50.7976 39.0884 50.4483 39.1991 50.0901 39.2H20.1701L16.3501 18.46H56.3501C56.6307 18.4573 56.9078 18.5233 57.157 18.6523C57.4063 18.7813 57.6202 18.9693 57.7801 19.2C57.945 19.4302 58.0512 19.6971 58.0896 19.9777C58.1279 20.2583 58.0972 20.5439 58.0001 20.81V20.81Z" fill="black"/>
                    </svg>
                  </div>
                  }
                </NavLink>
              </>

          )}

      </div>
    </nav>
  );
}
