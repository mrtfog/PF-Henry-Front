import React, { useEffect } from "react";
import video from "../../assets/videoSubscribe.webm";
import Footer from "../common/Footer";
import { useAuth } from "../../contexts/AuthContext";

import Swal from "sweetalert2";
import style from "../../scss/components/Subscription/_subscription.module.scss";

const LogoStar = () => {
  return (
    <>
      <svg
        style={{ marginRight: "10px" }}
        width="20px"
        height="20px"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
        id="Capa_1"
        x="0px"
        y="0px"
        viewBox="0 0 612 612"
        xmlSpace="preserve"
      >
        <g>
          <path
            fill="#fff"
            d="M610.089,233.999c-4.591-14.132-16.807-24.432-31.512-26.568l-164.157-23.856l-73.414-148.75   c-6.577-13.325-20.147-21.76-35.007-21.76c-14.86,0-28.43,8.435-35.005,21.76l-73.414,148.75L33.424,207.432   c-14.705,2.136-26.921,12.436-31.512,26.568s-0.762,29.645,9.879,40.015l118.785,115.787l-28.043,163.495   c-2.513,14.646,3.507,29.446,15.529,38.18s27.958,9.885,41.112,2.972l146.825-77.192l146.825,77.192   c5.713,3.004,11.949,4.485,18.162,4.485c8.095,0,16.149-2.515,22.95-7.455c12.021-8.734,18.041-23.536,15.529-38.18   l-28.041-163.495l118.785-115.789C610.851,263.642,614.68,248.129,610.089,233.999z"
          />
        </g>
      </svg>
    </>
  );
};

export default function Subscription() {
  const querystring = window.location.search;
  const searchParams = new URLSearchParams(querystring);
  const status = searchParams.get("status");
  const { currentUser } = useAuth();

  function handleOnPayment() {
    Swal.fire({
      title: "Transaction failed",
      text: "Please try again",
      icon: "error",
      showClass: {
        popup: "animate_animated animate_fadeInDown",
      },
      hideClass: {
        popup: "animate_animated animate_fadeOutUp",
      },
      showCloseButton: true,
      showDenyButton: false,
      denyButtonText: false,
      confirmButtonText: "Continue",
      allowEnterKey: false,
      customClass: {
        popup: "Alert",
        closeButton: "closeButton",
        confirmButton: "confirmButton",
        denyButton: "denyButton",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        return;
      }
    });
  }
  useEffect(() => {
    if (status === "failed") {
      handleOnPayment();
    }
  }, []);
 
  return (
    <div className={style.subscriptionContainer}>
      <div className={style.firstContainer}>
        <div className={style.infoDiv}>
          <div>
            <h1>Welcome to Moviefy + video streaming</h1>
            <p>
              Enjoy the best movies and exclusive benefits that Moviefy + brings
              to you
            </p>
            <div>
              <form
                action={`https://moviefy-lphj.onrender.com/payment/paymentSubscription?userId=${currentUser?.uid}`}
                method="POST"
              >
                {/* <form onSubmit={handleSubmit}> */}
                <input
                  type="hidden"
                  name="name"
                  value={currentUser?.displayName}
                ></input>
                <input
                  type="hidden"
                  name="email"
                  value={currentUser?.email}
                ></input>
                <input type="hidden" name="title" value="subscription"></input>
                <input type="hidden" name="price" value="30"></input>

                <button type="submit">SUBSCRIBE NOW</button>
              </form>
            </div>
          </div>
        </div>
        <div className={style.videoDiv}>
          <video autoPlay loop muted>
            <source src={video} type="video/mp4" />
          </video>
          {/* <img src={img} alt="movie"></img> */}
          <div className={style.overlay}>
            <div className={style.overlay2}></div>
          </div>
        </div>
      </div>
      <div className={style.secondContainer}>
        <div className={style.infoDiv}>
          <h2>Learn more about the benefits of our monthly plan</h2>
        </div>
        <div className={style.planDiv}>
          <div data-aos="fade-right" className={style.card}>
            <div className={style.titleDiv}>
              <span>Cinema</span>
              <div></div>
            </div>
            <ul>
              <li>
                <LogoStar />
                Take advantage of exclusive, limited-time promotional offers on
                your snacks and drinks.
              </li>
              <li>
                <LogoStar />
                Free 3D & 3D IMAX glasses with purchase
              </li>
              <li>
                <LogoStar />
                Get 10 free tickets per month
              </li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <div data-aos="fade-left" className={style.card}>
            <div className={style.titleDiv}>
              <span>Streaming</span>
              <div></div>
            </div>
            <ul>
              <li>
                <LogoStar />
                Unlimited access to more than 300 movies
              </li>
              <li>
                <LogoStar />
                High definition and 4K content.
              </li>
              <li> </li>
              <li>
                <LogoStar />
                Enjoy on all your screens
              </li>
            </ul>
          </div>
        </div>
        <span data-aos="fade-up">
          <p>
            <strong>$ 30</strong>/month
          </p>
        </span>
        <form
          data-aos="fade-up"
          action={`https://moviefy-lphj.onrender.com/payment/paymentSubscription?userId=${currentUser?.uid}`}
          method="POST"
        >
          <input
            type="hidden"
            name="name"
            value={currentUser?.displayName}
          ></input>
          <input type="hidden" name="email" value={currentUser?.email}></input>
          <input type="hidden" name="title" value="subscription"></input>
          <input type="hidden" name="price" value="30"></input>

          <button type="submit">SUBSCRIBE NOW</button>
        </form>
        <p data-aos="fade-up">*Direct debit payments at the end of 30 days</p>
        <p data-aos="fade-up">*Cancel your plan at any time</p>
      </div>
      <Footer />
    </div>
  );
}
