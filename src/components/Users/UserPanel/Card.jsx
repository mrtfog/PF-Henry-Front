import React from 'react'
import { Link } from 'react-router-dom'
import style from '../../../scss/components/Users/UserPanel/_card.module.scss'

function Card({status, paymentType, amount, date, ticket, title}) {
  return (
    <div className={style.card}>
        <Link className={style.type}>
            {
             status ?             
             <span>
             {status} {/*Acá iria el ESTADO de suscripción, si la traemos desde el estado.*/}
            </span>
            : paymentType ?
            <span>
            {paymentType} {/*Acá iria el TIPO de transacción, si la traemos desde el estado.*/}
           </span>
            : null
            }
        </Link>

        <span>{title}</span>

        <span>
            {date} {/*Fecha del ultimo pago realizado, si la traemos desde el estado.*/}
        </span>
        
        {
            ticket ? <span>{ticket}</span> : null
        }

        <span>
            ${amount} {/*Monto del ultimo pago realizado, si la traemos desde el estado.*/}
        </span>
{/* 
        <Link to={ticket ? ticket : '#'}className={style.deleteBtn}>
            <span>
                {ticket ? 'Download' : 'Delete'}
            </span>
        </Link> */}
    </div>
  )
}

export default Card