import React from 'react'
import style from '../scss/components/_popUpTemplate.module.scss'

export default function PopUpTemplate({ content, displayState, handleOnClose, width, height, top}) {

    return (

        displayState === "flex" ?
            <div className={style.container} style={{ display: displayState }} >

                {
                    handleOnClose && content ?

                        <div className={style.popup} style={{width: width, height: height, top: top ? top : '15vh'}}>
                            <button className={style.close} onClick={handleOnClose}>x</button>
                            {content}
                        </div>

                        : null
                }

            </div>
            : null

    )
}