import React from 'react'
//import style from '../../../scss/components/Users/UserPanel/_payments.module.scss'
import CardsAdmin from '../CardsAdmin'
import style from '../../../scss/components/AdminPanel/statistics/_sales.module.scss'

function Payments() {

  const fakeState = [
    {saleType:'Subscription', paymentDate: '01/10/2020', amount: '3,250.99', btnLink: '#', userId: '776'},
    {saleType:'Ticket', paymentDate: '05/10/2020', amount: '950.99', btnLink: '#', userId: '603'},
    {saleType:'Ticket', paymentDate: '07/10/2020', amount: '1,901.98', btnLink: '#', userId: '039'},
    {saleType:'Subscrition', paymentDate: '10/10/2020', amount: '3,250.99', btnLink: '#', userId: '407'},
    {saleType:'Subscrition', paymentDate: '10/10/2020', amount: '3,250.99', btnLink: '#', userId: '407'},
    {saleType:'Subscrition', paymentDate: '10/10/2020', amount: '3,250.99', btnLink: '#', userId: '407'},
  ]


  return (
    <div className={style.mainContainer}>

      <div className={style.titleContainer}>
        <h2>Total sales record
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
                <div className={style.subtitle4}>User ID</div>
            </div>
            <div className={style.cardsContainer}>
            {
              fakeState && fakeState.map((e)=>{
                return (
                  
                      <CardsAdmin className= {style.cards}
                            saleType={e.saleType}
                            paymentDate={e.paymentDate} 
                            amount={e.amount}
                            userId={e.userId}
                            btnLink={e.btnLink}>
                        </CardsAdmin>
   
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