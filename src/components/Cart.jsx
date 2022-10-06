import React,{ useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import style from '../scss/components/_cart.module.scss'
import { getCart } from '../redux/actions/cart';

export default function Cart() {

    const dispatch = useDispatch()

    const functions = useSelector((state) => state.showtimesReducer.showtimes);
    // console.log(functions)

    use

  return (
    <div>

        ESTE ES EL CART
        
    </div>
  )
}
