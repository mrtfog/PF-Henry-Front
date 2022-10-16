import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getWebsiteReviews, setFormDisplay } from '../redux/actions/reviews'
import style from '../scss/components/_websiteReviews.module.scss'
import ReviewTemplate from './ReviewTemplate'

export default function WebsiteReviews() {

    const dispatch = useDispatch()

    const websiteReviews = useSelector( state => state.reviewsReducer.websiteReviews)
    
    useEffect(()=>{
        dispatch(getWebsiteReviews())
    }, [])
    
    return (

        <div className={style.container}>
            <div className={style.titleAndButton}>
                <h1>Reviews</h1>
                {websiteReviews.length ? <button className={style.sideButton}onClick={()=> dispatch(setFormDisplay('flex'))}>Add Review</button> : null}
            </div>
          
            <hr></hr>

            <div className={style.reviews}>

                {websiteReviews.length ? websiteReviews.map( r => <ReviewTemplate stars={r.stars} description={r.description} username={r.username} />) 
                : 
                <div className={style.noReviews}>
                    <p>There are no reviews</p>
                    <button onClick={()=> dispatch(setFormDisplay('flex'))}>Add Review</button>

                </div>
                }

            </div>
        </div>
    )
}
