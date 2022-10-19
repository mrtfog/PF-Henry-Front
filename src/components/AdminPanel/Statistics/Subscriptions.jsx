import React from 'react'
//import style from '../../../scss/components/Users/UserPanel/_payments.module.scss'
import CardsAdmin from '../CardsAdmin'
import style from '../../../scss/components/AdminPanel/statistics/_subscriptions.module.scss'

function Subscriptions() {

  const fakeState = [
    { subStatus: 'Active', paymentDate: '01/10/2020', amount: '3,250.99', btnLink: '#', userId: '776' },
    { subStatus: 'Cancelled', paymentDate: '05/10/2020', amount: '950.99', btnLink: '#', userId: '603' },
    { subStatus: 'Cancelled', paymentDate: '07/10/2020', amount: '1,901.98', btnLink: '#', userId: '039' },
    { subStatus: 'Active', paymentDate: '10/10/2020', amount: '3,250.99', btnLink: '#', userId: '407' },
    { subStatus: 'Active', paymentDate: '10/10/2020', amount: '3,250.99', btnLink: '#', userId: '407' },
    { subStatus: 'Active', paymentDate: '10/10/2020', amount: '3,250.99', btnLink: '#', userId: '407' },
  ]


  return (
    <div className={style.mainContainer}>

      <div className={style.titleContainer}>
        <h2>Total subscriptions
        </h2>
      </div>

      <div className={style.infoContainer}>

        <div className={style.subInfoContainer}>
          <div className={style.subtitlesContainer}>
            <div className={style.subtitle1}>Type</div>
            <div className={style.subtitle2}>Date</div>
            <div className={style.subtitle3}>Amount</div>
            <div className={style.subtitle4}>User ID</div>
          </div>
          <div className={style.cardsContainer}>
            {
              fakeState && fakeState.map((e) => {
                return (

                  <CardsAdmin className={style.cards}
                    subscriptionStatus={e.subStatus}
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

export default Subscriptions