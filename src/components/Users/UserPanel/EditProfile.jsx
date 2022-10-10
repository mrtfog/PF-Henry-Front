import React from "react";
import { Link } from "react-router-dom";
import CardPayments from "./Card";
import style from "../../../scss/components/Users/UserPanel/_editProfile.module.scss";
import { useAuth } from "../../contexts/AuthContext";
function EditProfile() {
  const { currentUser } = useAuth();
  return (
    <div className={style.mainContainer}>
      <div className={style.titleContainer}>
        <h2>
          Edit your profile
          <span></span>
        </h2>
      </div>

      <div className={style.infoContainer}>
        <div className={style.subInfoContainer}>
          <h3>Information</h3>
          <div className={style.fieldsContainer}>
            <div className={style.field}>
              <img
                src={
                  currentUser.photoURL
                    ? currentUser.photoURL
                    : "https://media.istockphoto.com/photos/beautiful-woman-posing-against-dark-background-picture-id638756792?k=20&m=638756792&s=612x612&w=0&h=PAiwpR6vmkBlctx0kmvGKX3HsBcMdd2PFD4BlEEI7Ac="
                }
              />
              <Link to="#" className={style.pencilPhoto}>
                {" "}
                {/*En este span va el lapiz de editar */}
                <svg
                  enablBackground="new 0 0 29 30"
                  height="30px"
                  id="Layer_1"
                  version="1.1"
                  viewBox="0 0 29 30"
                  width="29px"
                  xmlSpace="preserve"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <g>
                    <rect
                      height="22.68"
                      transform="matrix(-0.7071 -0.7072 0.7072 -0.7071 10.4473 37.3449)"
                      width="10.846"
                      x="7.536"
                      y="5.169"
                    />
                    <path d="M27.638,3.996l-2.46-2.459c-1.357-1.358-3.56-1.358-4.917,0l-1.725,1.724l7.67,7.669l1.725-1.724   C29.288,7.848,28.997,5.354,27.638,3.996z" />
                    <polygon points="0,30 7.088,30 0,22.28  " />
                  </g>
                </svg>
              </Link>
            </div>

            <div className={style.field}>
              <label>Username</label>
              <div className={style.inputContainer}>
                <input type="text" placeholder="John_doe91" />
                <Link to="#" className={style.pencilIcon}>
                  {" "}
                  {/*En este span va el lapiz de editar */}
                  <svg
                    enablBackground="new 0 0 29 30"
                    height="30px"
                    id="Layer_1"
                    version="1.1"
                    viewBox="0 0 29 30"
                    width="29px"
                    xmlSpace="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <g>
                      <rect
                        height="22.68"
                        transform="matrix(-0.7071 -0.7072 0.7072 -0.7071 10.4473 37.3449)"
                        width="10.846"
                        x="7.536"
                        y="5.169"
                      />
                      <path d="M27.638,3.996l-2.46-2.459c-1.357-1.358-3.56-1.358-4.917,0l-1.725,1.724l7.67,7.669l1.725-1.724   C29.288,7.848,28.997,5.354,27.638,3.996z" />
                      <polygon points="0,30 7.088,30 0,22.28  " />
                    </g>
                  </svg>
                </Link>
              </div>
            </div>
            <div className={style.field}>
              <label>Password</label>
              <div className={style.inputContainer}>
                <input type="password" placeholder="***************" />
                <Link to="#" className={style.pencilIcon}>
                  {" "}
                  {/*En este span va el lapiz de editar */}
                  <svg
                    enablBackground="new 0 0 29 30"
                    height="30px"
                    id="Layer_1"
                    version="1.1"
                    viewBox="0 0 29 30"
                    width="29px"
                    xmlSpace="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <g>
                      <rect
                        height="22.68"
                        transform="matrix(-0.7071 -0.7072 0.7072 -0.7071 10.4473 37.3449)"
                        width="10.846"
                        x="7.536"
                        y="5.169"
                      />
                      <path d="M27.638,3.996l-2.46-2.459c-1.357-1.358-3.56-1.358-4.917,0l-1.725,1.724l7.67,7.669l1.725-1.724   C29.288,7.848,28.997,5.354,27.638,3.996z" />
                      <polygon points="0,30 7.088,30 0,22.28  " />
                    </g>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className={style.subInfoContainer}>
          <h3>Your subscription</h3>
          <div className={style.subtitlesContainer}>
            <div className={style.subtitle1}>Status</div>
            <div className={style.subtitle2}>Date</div>
            <div className={style.subtitle3}>Amount</div>
          </div>
          <CardPayments
            status="ACTIVE"
            date="08/08/2022"
            amount="3,000.99"
          ></CardPayments>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
