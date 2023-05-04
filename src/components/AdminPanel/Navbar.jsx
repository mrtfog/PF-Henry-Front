import React from "react";
import style from "../../scss/components/AdminPanel/_navbar.module.scss";

import { NavLink, useHistory, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'

const NavbarAdmin = () => {
  const { currentUser, logOut } = useAuth();
  const [isShown, setIsShown] = useState(false);
  const [screenWidth, setScreenWidth] = useState(document.body.clientWidth)

  window.addEventListener('resize', ()=>{

    setScreenWidth(document.body.clientWidth)
  })

  const {pathname} = useLocation()
  const history = useHistory();

  function handleLogOut() {

    Swal.fire({
      text:'Are you sure you want to log out?',
      icon: 'question',
      iconColor: '#497aa6',
      showCloseButton: true,
      confirmButtonText: 'Yes, I am sure',
      denyButtonText: 'No, stay logged in',
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
        .then(()=> history.push("/"))
        .catch(e =>  console.log(e))
      }
  
    })
  }

  return (
    <nav className={style.mainNav}>
      <ul>
        <li>
          <div className={style.user}>
            <img src={currentUser.photoURL ? currentUser.photoURL : "https://media.istockphoto.com/photos/beautiful-woman-posing-against-dark-background-picture-id638756792?k=20&m=638756792&s=612x612&w=0&h=PAiwpR6vmkBlctx0kmvGKX3HsBcMdd2PFD4BlEEI7Ac="} alt="user-logo"></img>
            <span>{currentUser.displayName}</span>
          </div>
        </li>
        <li>
          <NavLink to="/" className={style.link}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="magicoon-Filled">
              <title>home</title>
              <g id="home-Filled">
                <path id="home-Filled-2" data-name="home-Filled" d="M21.5,11.01V17A4.5,4.5,0,0,1,17,21.5H14.5V17a2.5,2.5,0,0,0-5,0V21.5H7A4.5,4.5,0,0,1,2.5,17V11.01a4.477,4.477,0,0,1,1.678-3.5l5-4.018a4.529,4.529,0,0,1,5.643,0l5,4.018A4.475,4.475,0,0,1,21.5,11.01Z"/>
              </g>
            </svg>
            <span>Home</span>
          </NavLink>
        </li>
        <li className={style.statistics}>
          <NavLink to={screenWidth > 570 ? "/admin/statistics/graphics" : pathname} className={style.link} onClick={()=> setIsShown(isShown ? false : true)}>
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" viewBox="0 0 300.576 300.576" xmlSpace="preserve">
              <g>
                <path d="M285.576,2.075c-8.284,0-15,6.716-15,15v251.426H19.15c-8.284,0-15,6.716-15,15s6.716,15,15,15h266.426   c8.284,0,15-6.716,15-15V17.075C300.576,8.791,293.86,2.075,285.576,2.075z" />
                <path d="M190.678,111.676c-1.429-0.618-2.789-1.328-4.091-2.105v127.828c0,5.247,4.253,9.5,9.5,9.5h42c5.247,0,9.5-4.253,9.5-9.5   V68.224l-10.896,25.21C229.023,111.175,208.424,119.345,190.678,111.676z" />
                <path d="M110.296,246.899h42c5.247,0,9.5-4.253,9.5-9.5V104.693l-61,24.183v108.523   C100.796,242.646,105.049,246.899,110.296,246.899z" />
                <path d="M15.004,160.247v77.152c0,5.247,4.253,9.5,9.5,9.5h42c5.247,0,9.5-4.253,9.5-9.5v-98.695l-48.102,19.069   c-4.233,1.679-8.597,2.474-12.889,2.474C15.01,160.247,15.007,160.247,15.004,160.247z" />
                <path d="M20.532,139.182l149.037-59.084l22.223-8.81l-0.998,2.309c-3.287,7.604,0.213,16.434,7.817,19.72   c7.6,3.287,16.433-0.212,19.72-7.817l15.473-35.8c3.287-7.604-0.213-16.434-7.817-19.72l-35.799-15.473   c-7.608-3.292-16.434,0.214-19.72,7.817c-3.287,7.604,0.213,16.434,7.817,19.72l2.807,1.213l-22.446,8.898L9.476,111.293   c-7.701,3.053-11.469,11.771-8.416,19.473C4.11,138.459,12.821,142.237,20.532,139.182z" />
              </g>
            </svg>
            <span>Statistics</span>
            {screenWidth > 570 ?
            <div className={style.divIcon} onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}>
              <svg className={!isShown ? style.dropDownIcon : style.dropFaceDown} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 492.432 492.432" xmlSpace="preserve">
                <g id="XMLID_134_">
                  <path id="XMLID_135_" d="M142.238,492.432c-9.79,0-19.588-3.736-27.05-11.209c-14.945-14.934-14.945-39.162,0-54.098l180.9-180.909   l-180.9-180.91c-14.945-14.935-14.945-39.163,0-54.098c14.926-14.944,39.172-14.944,54.098,0l207.96,207.958   c14.943,14.935,14.943,39.164,0,54.1l-207.96,207.957C161.824,488.697,152.026,492.432,142.238,492.432z"
                  />
                </g>
              </svg>
            </div>
            : null}
          </NavLink>
          {isShown && (
            <div className={style.dropDownMenu} onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)} onClick={screenWidth < 570 ? ()=> setIsShown(false) : null}>
              <ul>
                <li>
                  <NavLink className={style.linkDropDown} to="/admin/statistics/graphics" style={{display: "flex",justifyContent: "center", alignContent: "center",height: "5rem",}}>
                    <span className={style.spanDropDown}>Graphics</span>
                  </NavLink>
                </li>
                <li className={style.liDropDown} style={{width: "100%",}}>
                  <NavLink className={style.linkDropDown} to="/admin/statistics/sales" style={{ display: "flex",justifyContent: "center",alignContent: "center",height: "5rem",}}>
                    <span className={style.spanDropDown}>Sales</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink className={style.linkDropDown} to="/admin/statistics/subscriptions" style={{display: "flex",justifyContent: "center", alignContent: "center",height: "5rem",}}>
                    <span className={style.spanDropDown}>Subscriptions</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
        </li>
      
        <li>
          <NavLink to="/admin/showtime" className={style.link}>
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" viewBox="0 0 512 512" xmlSpace="preserve">
              <g>
                <g>
                  <path d="M49.073,286.157l-27.547-13.108C10.96,269.527,0,277.422,0,288.567v163.578c0,11.123,10.938,19.051,21.527,15.518    c34.82-16.569,18.103-8.617,76.62-36.445V309.494L49.073,286.157z" />
                </g>
              </g>
              <g>
                <g>
                  <path d="M441.661,239.592H179.936c-27.155,0-49.073,21.918-49.073,49.073v163.578c0,27.153,21.918,49.073,49.073,49.073h261.725    c27.155,0,49.073-21.921,49.073-49.073V288.665C490.735,261.511,468.816,239.592,441.661,239.592z" />
                </g>
              </g>
              <g>
                <g>
                  <path d="M414.049,10.683c-54.161-0.022-97.969,43.772-97.951,97.951c-0.017,54.159,43.772,97.969,97.951,97.948    c54.163,0.02,97.969-43.776,97.951-97.948C512.017,54.47,468.228,10.66,414.049,10.683z M414.113,141.284h-0.096    c-18.265,0-32.619-14.666-32.619-32.619c0-18.211,14.524-32.682,32.587-32.682c18.456,0,32.715,14.699,32.715,32.619    C446.7,126.969,432.02,141.284,414.113,141.284z" />
                </g>
              </g>
              <g>
                <g>
                  <path d="M207.548,10.683c-54.161-0.022-97.969,43.772-97.951,97.951c-0.017,54.159,43.772,97.969,97.951,97.948    c54.163,0.02,97.969-43.776,97.951-97.948C305.517,54.47,261.727,10.66,207.548,10.683z M207.612,141.284h-0.096    c-18.265,0-32.619-14.666-32.619-32.619c0-18.211,14.524-32.682,32.587-32.682c18.456,0,32.715,14.699,32.715,32.619    C240.198,126.969,225.52,141.284,207.612,141.284z" />
                </g>
              </g>
            </svg>
            <span>Showtimes</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/rooms" className={style.link}>
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" viewBox="0 0 496.887 496.887" xmlSpace="preserve">
              <g>
                <g>
                  <path d="M248.443,73.85c-52.294,0-94.839,42.544-94.839,94.839c0,52.294,42.544,94.838,94.839,94.838    c52.295,0,94.838-42.544,94.838-94.838C343.281,116.394,300.736,73.85,248.443,73.85z M297.195,179.433l-58.214,42.28    c-2.311,1.678-5.051,2.535-7.804,2.535c-2.059,0-4.125-0.478-6.028-1.447c-4.449-2.267-7.25-6.84-7.25-11.832v-84.561    c0-4.993,2.801-9.564,7.25-11.831c4.447-2.269,9.792-1.848,13.832,1.087l58.214,42.281c3.439,2.498,5.476,6.492,5.476,10.743    S300.635,176.935,297.195,179.433z" />
                  <path d="M75.214,271.822c3.234-2.771,6.842-5.266,10.725-7.416l2.55-1.412V31.379H408.4v231.615l2.549,1.412    c3.877,2.148,7.486,4.645,10.725,7.416c5.23,4.48,9.582,9.722,12.928,15.574l9.242,16.164V21.225    C443.844,9.522,434.32,0,422.617,0H74.27C62.566,0,53.045,9.521,53.045,21.225v282.335l9.242-16.166    C65.633,281.541,69.982,276.301,75.214,271.822z" />
                  <path d="M252.173,332.635c15.976,0,30.633,4.906,42.047,13.045v-34.287c0-20.16-19.085-36.504-42.627-36.504h-4.26    c-23.541,0-42.624,16.344-42.624,36.504v34.568c11.464-8.305,26.268-13.326,42.421-13.326H252.173L252.173,332.635z" />
                  <path d="M124.022,274.889h-4.259c-23.542,0-42.626,16.344-42.626,36.504v23.615c5.979-1.536,12.307-2.373,18.858-2.373h5.046    c31.042,0,57.118,18.52,64.01,43.333c1.031-3.146,1.595-6.46,1.595-9.892v-54.684    C166.647,291.232,147.564,274.889,124.022,274.889z" />
                  <path d="M400.891,332.635c6.555,0,12.881,0.837,18.857,2.373v-23.615c0-20.16-19.082-36.504-42.623-36.504h-4.26    c-23.541,0-42.627,16.344-42.627,36.504v54.686c0,3.431,0.566,6.744,1.596,9.891c6.893-24.814,32.969-43.333,64.012-43.333    L400.891,332.635L400.891,332.635z" />
                  <path d="M252.173,353.215h-5.043c-27.89,0-50.499,18.391-50.499,41.074v61.525c0,22.682,22.609,41.072,50.499,41.072h5.043    c27.892,0,50.5-18.391,50.5-41.072v-61.525C302.673,371.605,280.064,353.215,252.173,353.215z" />
                  <path d="M101.041,353.215h-5.046c-27.889,0-50.497,18.391-50.497,41.074v61.525c0,22.682,22.608,41.072,50.497,41.072h5.046    c27.89,0,50.498-18.391,50.498-41.072v-61.525C151.539,371.605,128.931,353.215,101.041,353.215z" />
                  <path d="M400.891,353.215h-5.043c-27.893,0-50.5,18.391-50.5,41.074v61.525c0,22.682,22.607,41.072,50.5,41.072h5.043    c27.889,0,50.498-18.391,50.498-41.072v-61.525C451.389,371.605,428.779,353.215,400.891,353.215z" />
                </g>
              </g>
            </svg>
            <span>Movie theater</span>
          </NavLink>
        </li>
        <li>
          <div className={style.link}  onClick={() => handleLogOut()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none">
              <path d="M22 6.62219V17.245C22 18.3579 21.2857 19.4708 20.1633 19.8754L15.0612 21.7977C14.7551 21.8988 14.449 22 14.0408 22C13.5306 22 12.9184 21.7977 12.4082 21.4942C12.2041 21.2918 11.898 21.0895 11.7959 20.8871H7.91837C6.38776 20.8871 5.06122 19.6731 5.06122 18.0544V17.0427C5.06122 16.638 5.36735 16.2333 5.87755 16.2333C6.38776 16.2333 6.69388 16.5368 6.69388 17.0427V18.0544C6.69388 18.7626 7.30612 19.2684 7.91837 19.2684H11.2857V4.69997H7.91837C7.20408 4.69997 6.69388 5.20582 6.69388 5.91401V6.9257C6.69388 7.33038 6.38776 7.73506 5.87755 7.73506C5.36735 7.73506 5.06122 7.33038 5.06122 6.9257V5.91401C5.06122 4.39646 6.28572 3.08125 7.91837 3.08125H11.7959C12 2.87891 12.2041 2.67657 12.4082 2.47423C13.2245 1.96838 14.1429 1.86721 15.0612 2.17072L20.1633 4.09295C21.1837 4.39646 22 5.50933 22 6.62219Z" fill="#030D45"/>
              <path d="M4.85714 14.8169C4.65306 14.8169 4.44898 14.7158 4.34694 14.6146L2.30612 12.5912C2.20408 12.49 2.20408 12.3889 2.10204 12.3889C2.10204 12.2877 2 12.1865 2 12.0854C2 11.9842 2 11.883 2.10204 11.7819C2.10204 11.6807 2.20408 11.5795 2.30612 11.5795L4.34694 9.55612C4.65306 9.25261 5.16327 9.25261 5.46939 9.55612C5.77551 9.85963 5.77551 10.3655 5.46939 10.669L4.7551 11.3772H8.93878C9.34694 11.3772 9.7551 11.6807 9.7551 12.1865C9.7551 12.6924 9.34694 12.7936 8.93878 12.7936H4.65306L5.36735 13.5017C5.67347 13.8052 5.67347 14.3111 5.36735 14.6146C5.26531 14.7158 5.06122 14.8169 4.85714 14.8169Z" fill="#030D45"/>
            </svg>
            <span>LogOut</span>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarAdmin;
