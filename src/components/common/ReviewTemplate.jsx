import React from 'react'
import style from '../../scss/components/common/_reviewTemplate.module.scss'

export default function ReviewTemplate({stars, description, username}) {
    
    function getStars(num){
        let stars = ''

        while(num > 0){

            stars += '★'
            num--
        } 

        return stars
    }

    return (
        <div className={style.review}>
                                
            <p><span className={style.stars}>{getStars(stars)}</span><br/> {stars}/10</p>
            <p className={style.text}>"{description}"</p>
            <p className={style.username}>by: {username}</p>

        </div>
    )
}
