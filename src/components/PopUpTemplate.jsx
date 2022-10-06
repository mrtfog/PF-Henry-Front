import React from 'react'
import style from '../scss/components/_popUpTemplate.module.scss'

export default function PopUpTemplate({content, displayState, handleOnClose}) {

    return (

        <div className={style.container} style={{display: displayState}}>

            <div className={style.popup}>
                <button className={style.close} onClick={handleOnClose}>x</button>
                {content}
            </div>

        </div>
    )
}