import React from 'react'
import { Link } from 'react-router-dom'
//import style from '../../../scss/components/Users/UserPanel/_payments.module.scss'
import CardPayments from './Card'
import style from '../../../scss/components/Users/UserPanel/_editProfile.module.scss'

function Payments() {

  const fakeState = [
    {type:'Subscription', date: '01/10/2020', amount: '3,250.99', ticket: '#'},
    {type:'Ticket', date: '05/10/2020', amount: '950.99', ticket: '#'},
    {type:'Ticket', date: '07/10/2020', amount: '1,901.98', ticket: '#'},
  ]


  return (
    <div className={style.mainContainer}>

      <div className={style.titleContainer}>
        <h2>Your payments
        </h2>
      </div>

      <div className={style.infoContainer}>
        <div className={style.subInfoContainer}>
            <div className={style.fieldsContainer}>
                <div className={style.field}>
                  <label>Filter by type</label>
                  <select>
                    <option value="Subscription">Subscription</option>
                    <option value="Ticket">Ticket</option>
                  </select>
                </div>

                <div className={style.field}>
                  <label>Order by date</label>
                  <select>
                    <option value="Most recent">Most recent</option>
                    <option value="Last 7 days">Las 7 days</option>
                    <option value="Last 15 days">Last 15 days</option>
                    <option value="Last month">Last month</option>
                    <option value="All">All</option>
                  </select>
                </div>

                <div className={style.field}>
                  <label>Order amount</label>
                  <select>
                    <option value="Ascending">Ascending</option>
                    <option value="Descending">Descending</option>
                  </select>
                </div>
            </div>
        </div>

        <div className={style.subInfoContainer}>
            <div className={style.subtitlesContainer}>
                <div className={style.subtitle1}>Type</div>
                <div className={style.subtitle2}>Date</div>
                <div className={style.subtitle3}>Amount</div>
            </div>
            <div className={style.cardsContainer}>
            {
              fakeState && fakeState.map((e)=>{
                return (
                  <div className={style.card}>
                      <CardPayments 
                          paymentType={e.type}
                          date={e.date} 
                          amount={e.amount}
                          ticket={e.ticket}>
                        </CardPayments>
                  </div>
                  )
                })
              }
            </div>

        </div>
      </div>
    </div>
  )
}

export default Payments