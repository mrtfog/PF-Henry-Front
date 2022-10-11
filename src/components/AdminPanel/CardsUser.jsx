import React from "react";
import { Link } from "react-router-dom";
import style from "../../scss/components/Users/UserPanel/_card.module.scss";

function CardAdmin({
  Name,
  rol,
  email,
  status,
  img,
  userId,
  paymentDate,
  amount,
  btnText,
  btnLink,
}) {
  return (
    <div className={style.card}>
      <Link className={style.type}>
        {img && (
          <img
            style={{ width: "5rem", height: "5rem", borderRadius: "50%" }}
            src={img}
            alt="avatar"
          />
        )}
      </Link>

      <span>
        {rol} {/*Fecha en la que se realizó el pago*/}
      </span>

      <span>{Name}</span>

      <span>
        {email} {/*Id del usuario que realizó la transacción o la suscripción*/}
      </span>

      <Link to={btnLink ? btnLink : "#"} className={style.deleteBtn}>
        {" "}
        {/* Tenemos que pasarle un btnLink para que el componente nos redirija a algun lado*/}
        <span>
          {" "}
          {/* btnText indica un el texto que debe tener el botón, pero tiene que venir con una que sea btnLink para indicar el lugar
            a donde te lleva ese botón, sino por defecto será un botón que diga "View details" y no te lleve a ningun lado (por ahora)*/}
          {btnText ? btnText : "View details"}
        </span>
      </Link>
    </div>
  );
}

export default CardAdmin;
