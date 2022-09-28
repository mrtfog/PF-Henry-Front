import React,{useState} from 'react'
import style from '../scss/components/_home.module.scss'
import Cards from './Cards'
import Filters from './Filters'

export default function Home() {

    // Estado local de ordenamiento + función seteadora //
    const [order, setOrder] = useState('');

  
  return (
    <div className={style.container_home}>
        <Filters setOrder={setOrder} order={order}/>
        <Cards order={order}/>
    </div>
  )
}
