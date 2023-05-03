import React from "react";
import Swal from "sweetalert2";
import CardPayments from "./Card";
import UploadImg from "../../Cloudinary/UploadImage";
import { useAuth } from "../../../contexts/AuthContext";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelUserPayment, getUserSubscription} from "../../../redux/actions/users";
import { NavLink } from "react-router-dom";
import style from "../../../scss/components/Users/UserPanel/_editProfile.module.scss";
import User from '../../../assets/user.png'


function EditProfile() {
  const dispatch = useDispatch();
  const subscription = useSelector(
    (state) => state.usersReducer.userSubscription
  );

  const { currentUser, changePassword, changeUsername } = useAuth();

  useEffect(() => {
    if (currentUser) dispatch(getUserSubscription(currentUser));
  }, []);

  const subInfo = subscription.payments
    ? {
        status: "ACTIVE",
        lastPayment: subscription.payments[subscription.payments.length - 1],
      }
    : undefined;
  function handleOnClickUnsubscribe() {
    Swal.fire({
      text: "Are you sure you want to unsubscribe?",
      icon: "question",
      iconColor: "#497aa6",
      showCloseButton: true,
      showDenyButton: true,
      denyButtonText: "Cancel",
      confirmButtonText: "Yes, I am sure",
      allowEnterKey: false,
      customClass: {
        popup: "Alert",
        closeButton: "closeButton",
        confirmButton: "confirmButton",
        denyButton: "denyButton",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(cancelUserPayment(currentUser));
      }
    });
  }

   return (
      <div className={style.mainContainer}>
         <div className={style.titleContainer}>
            <h2>Edit your profile</h2>
         </div>

         <div className={style.infoContainer}>

            <div className={style.subInfoContainer}>
               <h3>Information</h3>
               <div className={style.fieldsContainer}>
                  <div className={style.field}>
                     <div className={style.imgContainer}>
                        <img src={currentUser.photoURL ? currentUser.photoURL : User} />
                        <div className={style.editImg}>
                           <UploadImg currentUser={currentUser} />
                        </div>
                     </div>
                  </div>

                  <div className={style.field}>
                     <label>Username</label>
                     <div className={`${style.inputContainer} ${style.username}`}>
                        <p>{currentUser.displayName}</p>
                        <span onClick={() => changeUsername(currentUser)} className={style.pencilIcon}>
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
                        </span>
                     </div>
                  </div>

            {currentUser.providerData[0].providerId !== "google.com" ? (
              <div className={style.field}>
                <label>Password</label>
                <div className={style.inputContainer}>
                  <button onClick={() => changePassword(currentUser)}>
                    Change Password
                  </button>
                </div>
              </div>
            ) : null}
          </div>

               <div className={style.subInfoContainer}>
                  <h3>Your subscription</h3>
                  {
                     subInfo ?
                        <div className={style.subtitlesContainer}>
                           <div className={style.subtitle1}>Status</div>
                           <div className={style.subtitle2}>Date</div>
                           <div className={style.subtitle3}>Amount</div>
                        </div>
                        : null
                  }
                  <div className={style.cardsContainer}>
                     {
                        subInfo ?
                           <>
                              <CardPayments status={subInfo.status} date={new Date(subInfo.lastPayment.dateTime).toDateString()} amount={subInfo.lastPayment.price}></CardPayments>
                              <button className={style.unsubscribe} onClick={handleOnClickUnsubscribe}>Unsubscribe</button>
                           </>
                           :
                           <div className={style.unsubscribedContainer}>
                              <h1>You are not subscribed!</h1>
                              <NavLink className={style.subButton} to="/subscribe">Subscribe now!</NavLink>
                           </div>
                     }
                  </div>
               </div>
            </div>
          </div>
        </div>
  );
}

export default EditProfile;
