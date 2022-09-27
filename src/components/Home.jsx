import React from 'react'
import style from '../scss/components/_home.module.scss'
import Cards from './Cards'

export default function Home() {
  return (
    <div className={style.container_home}>
        <Cards />
    </div>
  )
}
