import React from 'react'
import { Link } from 'react-router-dom'
import style from '../../scss/components/Users/UserPanel/_card.module.scss'

function CardAdmin({subscriptionStatus, saleType, userId, paymentDate, amount, btnText, btnLink}) {
  return (
    <div className={style.card}>
        <Link className={style.type}>
            {
             subscriptionStatus ?             
             <span>
             {subscriptionStatus} {/*Acá renderiza estado de la suscripción (activa, pausada, cancelada)*/}
            </span>
            : saleType?
            <span>
            {saleType} {/*Y sino, renderiza el tipo de transacción, es decir "ticket" o "suscrición"*/}
           </span>
            : null
            }
        </Link>
        
        <span>
            {paymentDate} {/*Fecha en la que se realizó el pago*/}
        </span>

        <span>
            ${amount} {/*Monto del ultimo pago realizado, si la traemos desde el estado.*/}
        </span>
        
        <span>
            {userId} {/*Id del usuario que realizó la transacción o la suscripción*/}
        </span>

        <Link to={btnLink ? btnLink : '#'}className={style.deleteBtn}> {/* Tenemos que pasarle un btnLink para que el componente nos redirija a algun lado*/}

            <span> {/* btnText indica un el texto que debe tener el botón, pero tiene que venir con una que sea btnLink para indicar el lugar
            a donde te lleva ese botón, sino por defecto será un botón que diga "View details" y no te lleve a ningun lado (por ahora)*/}
                {btnText ? btnText : 'View details'}
            </span>
        </Link>
    </div>
  )
}

export default CardAdmin