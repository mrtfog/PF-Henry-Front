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
        axios.get("https://pf-henry-back2.herokuapp.com/reservation/getPayedByUser", { headers: { "user": currentUser.accessToken } }).then(r => setReservationBoolean(r.data.length !== 0))
        axios.get("https://pf-henry-back2.herokuapp.com/subscription/hasActiveSubscription", { headers: { "user": currentUser.accessToken } }).then(r => { setsubscriptionBoolean(r.data) })
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
                {websiteReviews.length ? 
                <button className={style.sideButton} onClick={onClickReview}>
                    {window.innerWidth > 570 ? 
                    'Add Review' 
                    : <svg className={style.icon} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="3px"
                    width="20" height="20" viewBox="0 0 505 440" enableBackground="new 0 0 512 512" xmlSpace="preserve">
                    <path d="M488.5,256c0,9.1-6.83,16.5-15.23,16.5H272.5v200.77c0,8.4-7.4,15.23-16.5,15.23c-9.1,0-16.5-6.83-16.5-15.23V272.5
                    H38.73c-8.4,0-15.23-7.4-15.23-16.5c0-9.1,6.83-16.5,15.23-16.5H239.5V38.73c0-8.4,7.4-15.23,16.5-15.23
                    c9.1,0,16.5,6.83,16.5,15.23V239.5h200.77C481.67,239.5,488.5,246.9,488.5,256z"/>
                    </svg>}
                    </button> 
                : null}
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
