import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import style from '../../../scss/components/Users/UserPanel/_card.module.scss'

function Card({status, paymentType, amount, date, ticket, title}) {
    const [screenWidth, setScreenWidth] = useState(document.body.clientWidth)

    window.addEventListener('resize', ()=>{
  
      setScreenWidth(document.body.clientWidth)
  })
  return (
    <div className={style.card}>
        <Link className={style.type} >
            {
             status ?             
             <span>
             {status} {/*Acá iria el ESTADO de suscripción, si la traemos desde el estado.*/}
            </span>
            : paymentType ?
            <span style={screenWidth > 570 ? { display: 'flex' } : { display: 'none' }}>
            {paymentType} {/*Acá iria el TIPO de transacción, si la traemos desde el estado.*/}
           </span>
            : null
            }
        </Link>
        
        {
        title && <span>{title}</span> 
        }


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