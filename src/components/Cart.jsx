import React,{ useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import style from '../scss/components/_cart.module.scss'
import { getCart } from '../redux/actions/cart';

export default function Cart() {

    const dispatch = useDispatch()

    const functions = useSelector((state) => state.showtimesReducer.showtimes);
    // console.log(functions)

    return (
        <div>
        <div>Cart</div>
        <form action = "http://localhost:8082/payment/payment" method = "POST">
            <input type = "hidden" name = "title" value = "Minnios" ></input>
            <input type = "hidden" name =  "price" value = "780"></input>
            <button type = "submit" style = {{width :"80", height:"40px", borderRadius: "5px"}}>Buy Now</button>
        </form>
        </div>
      )
}
