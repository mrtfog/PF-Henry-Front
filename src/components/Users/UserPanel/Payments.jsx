import React, { useEffect } from "react";
import style from '../../../scss/components/Users/UserPanel/_payments.module.scss'
import CardPayments from "./Card";
import Swal from "sweetalert2/dist/sweetalert2.all.min.js";
import { useSelector, useDispatch } from "react-redux";
import { getUserPayments } from "../../../redux/actions/users";
import { useAuth } from "../../../contexts/AuthContext";

function Payments() {

  const dispatch = useDispatch()

  const { currentUser } = useAuth()

  const userPayments = useSelector(state => state.usersReducer.userPayments)

  useEffect(() => {
    if (!userPayments.length) dispatch(getUserPayments(currentUser))
  }, [dispatch])

  const querystring = window.location.search;
  const searchParams = new URLSearchParams(querystring);
  const status = searchParams.get("status");

  function handleOnPayment() {
    Swal.fire({
      title: "Payment successful",
      text: "Thank you, we have received your payment",
      icon: "success",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
      showCloseButton: true,
      showDenyButton: false,
      denyButtonText: false,
      confirmButtonText: "Continue",
      allowEnterKey: false,
      footer: "<b>We have sent you an email with your order</b>",
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
    if (status === "approved") {
      handleOnPayment();
    }
  }, []);
  return (
    <div className={style.mainContainer}>
      <div className={style.titleContainer}>
        <h2>Your tickets</h2>
      </div>

      <div className={style.infoContainer}>

        <div className={style.cardsContainer}>
          <div className={style.subInfoContainer}>
            <div className={style.subtitlesContainer}>
              <div className={style.subtitle1}>Type</div>
              <div className={style.subtitle2}>Title</div>
              <div className={style.subtitle3}>Date</div>
              <div className={style.subtitle4}>Tickets</div>
              <div className={style.subtitle5}>Amount</div>
            </div>
            {userPayments &&
              userPayments.map((e) => {
                return (
                  <div className={style.card}>
                    <CardPayments
                      title={e.movieTitle}
                      paymentType={e.type === 'standard' ? 'ticket' : 'subscription'}
                      date={e.payedAt.slice(0, 10)}
                      amount={e.price}
                      ticket={e.ticketAmount}
                    ></CardPayments>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payments
