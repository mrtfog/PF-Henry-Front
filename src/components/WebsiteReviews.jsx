import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getWebsiteReviews, setFormDisplay } from '../redux/actions/reviews'
import style from '../scss/components/_websiteReviews.module.scss'
import ReviewTemplate from './ReviewTemplate'

import axios from "axios"
import { useAuth } from './contexts/AuthContext'
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

export default function WebsiteReviews() {

    const { currentUser } = useAuth()
    const dispatch = useDispatch()
    const history = useHistory()

    const websiteReviews = useSelector(state => state.reviewsReducer.websiteReviews)

    const [reservationBoolean, setReservationBoolean] = useState(false)
    const [subscriptionBoolean, setsubscriptionBoolean] = useState(false)



    if (currentUser) {
        axios.get("https://pf-henry-back.herokuapp.com/reservation/getPayedByUser", { headers: { "user": currentUser.accessToken } }).then(r => setReservationBoolean(r.data.length !== 0))
        axios.get("https://pf-henry-back.herokuapp.com/subscription/hasActiveSubscription", { headers: { "user": currentUser.accessToken } }).then(r => { setsubscriptionBoolean(r.data) })
    }

    useEffect(() => {
        dispatch(getWebsiteReviews())
    }, [])

    const onClickReview = () => {
        if (reservationBoolean || subscriptionBoolean) {
            return dispatch(setFormDisplay('flex'))
        }
        
        return Swal.fire({
            text: "In order to post a website review, you need to be subcribed, or have a paid reservation",
            icon: "error",
            iconColor: "#bf0d31",
            showCloseButton: true,
            confirmButtonText: "Okay",
            allowEnterKey: false,
            customClass: {
                popup: "Alert",
                closeButton: "closeButton",
                confirmButton: "confirmButton",
                denyButton: "denyButton",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                history.push(`/reviews`);
            }
        });
    }


    return (

        <div className={style.container}>
            <div className={style.titleAndButton}>
                <h1>Reviews</h1>
                {websiteReviews.length ? <button className={style.sideButton} onClick={onClickReview}>Add Review</button> : null}
            </div>

            <hr></hr>

            <div className={style.reviews}>

                {websiteReviews.length ? websiteReviews.map(r => <ReviewTemplate stars={r.stars} description={r.description} username={r.username} />)
                    :
                    <div className={style.noReviews}>
                        <p>There are no reviews</p>
                        <button onClick={onClickReview}>Add Review</button>

                    </div>
                }

            </div>
        </div>
    )
}
