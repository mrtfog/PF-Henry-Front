import React from 'react'
import style from '../scss/components/_home.module.scss'
import Cards from './Cards'
import Filters from './Filters'

export default function Home() {


  
  return (
    <div className={style.container_home}>
        <Filters />
        <Cards />
    </div>
  )
}
