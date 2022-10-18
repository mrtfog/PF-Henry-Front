import React from "react";
import style from "../../../scss/components/Users/UserPanel/_navbarUser.module.scss";
import { NavLink, Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'


const NavbarUser = () => {

  const history = useHistory()
  const {currentUser, logOut} =  useAuth()

  function handleLogOut(){

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

  return (
    <nav className={style.mainNav}>
      <ul>
        <li>
          <div className={style.user}>
            <img
              src={
                currentUser.photoURL
                  ? currentUser.photoURL
                  : "https://media.istockphoto.com/photos/beautiful-woman-posing-against-dark-background-picture-id638756792?k=20&m=638756792&s=612x612&w=0&h=PAiwpR6vmkBlctx0kmvGKX3HsBcMdd2PFD4BlEEI7Ac="
              }
              alt="user-logo"
            ></img>
            <span>{currentUser.displayName}</span>
          </div>
        </li>
        <li>
          <NavLink to="/" className={style.link}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              id="magicoon-Filled"
            >
              <title>home</title>
              <g id="home-Filled">
                <path
                  id="home-Filled-2"
                  data-name="home-Filled"
                  className="cls-1"
                  d="M21.5,11.01V17A4.5,4.5,0,0,1,17,21.5H14.5V17a2.5,2.5,0,0,0-5,0V21.5H7A4.5,4.5,0,0,1,2.5,17V11.01a4.477,4.477,0,0,1,1.678-3.5l5-4.018a4.529,4.529,0,0,1,5.643,0l5,4.018A4.475,4.475,0,0,1,21.5,11.01Z"
                />
              </g>
            </svg>
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile/edit" className={style.link}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
              <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H322.8c-3.1-8.8-3.7-18.4-1.4-27.8l15-60.1c2.8-11.3 8.6-21.5 16.8-29.7l40.3-40.3c-32.1-31-75.7-50.1-123.9-50.1H178.3zm435.5-68.3c-15.6-15.6-40.9-15.6-56.6 0l-29.4 29.4 71 71 29.4-29.4c15.6-15.6 15.6-40.9 0-56.6l-14.4-14.4zM375.9 417c-4.1 4.1-7 9.2-8.4 14.9l-15 60.1c-1.4 5.5 .2 11.2 4.2 15.2s9.7 5.6 15.2 4.2l60.1-15c5.6-1.4 10.8-4.3 14.9-8.4L576.1 358.7l-71-71L375.9 417z" />
            </svg>
            <span>Profile</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile/payments" className={style.link}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              id="Capa_1"
              viewBox="0 0 946.812 946.812"
              xmlSpace="preserve"
            >
              <g>
                <g>
                  <path d="M106.812,428.258c0-38.6,31.4-70,70-70h677.8l-80.2-253.9c-7.5-23.6-32.8-36.8-56.5-29.3l-686.5,217    c-23.7,7.5-36.8,32.8-29.3,56.5l104.8,331.4v-251.7H106.812z" />
                  <path d="M136.812,833.858c0,22.1,17.9,40,40,40h730c22.1,0,40-17.9,40-40v-54h-810V833.858L136.812,833.858z" />
                  <path d="M946.812,428.258c0-22.1-17.9-40-40-40h-42.7h-687.3c-22.1,0-40,17.9-40,40v276.5h199.7h610.3V428.258L946.812,428.258z" />
                </g>
              </g>
            </svg>
            <span>Payments</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/" className={style.link}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M22 6.62219V17.245C22 18.3579 21.2857 19.4708 20.1633 19.8754L15.0612 21.7977C14.7551 21.8988 14.449 22 14.0408 22C13.5306 22 12.9184 21.7977 12.4082 21.4942C12.2041 21.2918 11.898 21.0895 11.7959 20.8871H7.91837C6.38776 20.8871 5.06122 19.6731 5.06122 18.0544V17.0427C5.06122 16.638 5.36735 16.2333 5.87755 16.2333C6.38776 16.2333 6.69388 16.5368 6.69388 17.0427V18.0544C6.69388 18.7626 7.30612 19.2684 7.91837 19.2684H11.2857V4.69997H7.91837C7.20408 4.69997 6.69388 5.20582 6.69388 5.91401V6.9257C6.69388 7.33038 6.38776 7.73506 5.87755 7.73506C5.36735 7.73506 5.06122 7.33038 5.06122 6.9257V5.91401C5.06122 4.39646 6.28572 3.08125 7.91837 3.08125H11.7959C12 2.87891 12.2041 2.67657 12.4082 2.47423C13.2245 1.96838 14.1429 1.86721 15.0612 2.17072L20.1633 4.09295C21.1837 4.39646 22 5.50933 22 6.62219Z"
                fill="#030D45"
              />
              <path
                d="M4.85714 14.8169C4.65306 14.8169 4.44898 14.7158 4.34694 14.6146L2.30612 12.5912C2.20408 12.49 2.20408 12.3889 2.10204 12.3889C2.10204 12.2877 2 12.1865 2 12.0854C2 11.9842 2 11.883 2.10204 11.7819C2.10204 11.6807 2.20408 11.5795 2.30612 11.5795L4.34694 9.55612C4.65306 9.25261 5.16327 9.25261 5.46939 9.55612C5.77551 9.85963 5.77551 10.3655 5.46939 10.669L4.7551 11.3772H8.93878C9.34694 11.3772 9.7551 11.6807 9.7551 12.1865C9.7551 12.6924 9.34694 12.7936 8.93878 12.7936H4.65306L5.36735 13.5017C5.67347 13.8052 5.67347 14.3111 5.36735 14.6146C5.26531 14.7158 5.06122 14.8169 4.85714 14.8169Z"
                fill="#030D45"
              />
            </svg>
            <span onClick={()=> handleLogOut()}>LogOut</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarUser;
