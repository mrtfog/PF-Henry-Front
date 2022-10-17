import React from "react";
import { Link } from "react-router-dom";
import style from "../../scss/components/AdminPanel/_cardsAdmin.module.scss";

function CardAdmin({
  subscriptionStatus,
  saleType,
  userId,
  paymentDate,
  amount,
  btnText,
  btnLink,
}) {
  return (
    <div className={style.card}>
      <div className={style.type}>
        {subscriptionStatus ? (
          <span>
            {subscriptionStatus}{" "}
            {/*Acá renderiza estado de la suscripción (activa, pausada, cancelada)*/}
          </span>
        ) : saleType ? (
          <span>
            {saleType}{" "}
            {/*Y sino, renderiza el tipo de transacción, es decir "ticket" o "suscrición"*/}
          </span>
        ) : null}
      </div>

      <span>
        {paymentDate} {/*Fecha en la que se realizó el pago*/}
      </span>

      <span>
        USD ${amount}{" "}
        {/*Monto del ultimo pago realizado, si la traemos desde el estado.*/}
      </span>

      <span>
        {userId}{" "}
        {/*Id del usuario que realizó la transacción o la suscripción*/}
      </span>
    </div>
  );
}

export default CardAdmin;
