import React from 'react'
import { Link } from 'react-router-dom'
import style from '../../../scss/components/Users/UserPanel/_cardPayments.module.scss'

function CardPayments({state, lastPaymentAmount, lastPaymentDate}) {
  return (
    <div className={style.card}>
        <Link className={style.activeSub}>
            <span>
                {state} {/*Acá iria el tipo de suscripción, si la traemos desde el estado.*/}
            </span>
        </Link>

        <span>
            Last payment made {lastPaymentDate} {/*Fecha del ultimo pago realizado, si la traemos desde el estado.*/}
        </span>

        <span>
            ${lastPaymentAmount} {/*Monto del ultimo pago realizado, si la traemos desde el estado.*/}
        </span>

        <Link className={style.deleteBtn}>
            <span>
                Delete
            </span>
        </Link>
    </div>
  )
}

export default CardPayments