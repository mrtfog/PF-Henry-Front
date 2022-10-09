import React,{ useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import style from '../../scss/components/Cart/_cart.module.scss'
import { getCart, getShowtimeByMovieId } from '../../redux/actions/cart'

export default function Cart() {

    const dispatch = useDispatch()

    const movie = useSelector( state => state.cartReducer.takenTickets)
    const cart = useSelector((state) => state.cartReducer.cart);
    const showtime = useSelector((state) => state.cartReducer.showtime);
    
    // {
    //     showtimeId: "633d84a8454ea464def96467",
    //     movieId: '550',
    //     tickets: '3',
    //     room: '1',
    //     format: '2D',
    //     dateTime: '2022-10-06T13:19:10.000Z',
    //     poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg"
    // },
    // {
    //     showtimeId: "633f208f2e588110d481ecd6",
    //     movieId: '616037',
    //     tickets: '5',
    //     room: '3',
    //     format: '3D',
    //     dateTime: '2022-10-09T13:19:10.000Z',
    //     poster_path: "/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg"
    // },
    // {
    //     showtimeId: "633f93177775cfc170bdea81",
    //     movieId: '760161',
    //     tickets: '2',
    //     room: '2',
    //     format: '3D',
    //     dateTime: '2022-10-11T13:19:10.000Z',
    //     poster_path: "/wSqAXL1EHVJ3MOnJzMhUngc8gFs.jpg"
    // }

    useEffect(() => {
        dispatch(getCart())
    }, [])

    return (
        <div className={style.container_cart}>

            <div className={style.title}>
                <h2>My Cart</h2>
                <button className={style.clearCart}>Clear cart</button>
            </div>

            <div className={style.cart}>
                {cart.length ? 
                
                cart.map( c => {

                    return(
                        
                        <div className={style.movies}>
                            <img src={'https://image.tmdb.org/t/p/original' + c.image} />
                            <h3>{c.movieTitle}</h3>
                            <p>Movie Theater {c.room}</p>
                            <p>{c.format} • {c.tickets} tickets</p>
                            <p>{new Date(c.dateTime).toLocaleString().replace(",", " -").substring(0, 17)}Hs</p>
                            <p>Seats</p>
                            <p>Amount</p>

                            <div>
                                <button className={style.delete}>X</button>
                            </div>
                        </div>
                    )
                })
            :
            <p style={{color: '#fff'}}>You haven't ticktes in your cart yet!</p> }

            </div>
            
            <div className={style.footerBtn}>

                <div className={style.addCombo}>
                    <h3 style={{color: 'white'}}>Add combo</h3>
                </div>

                <div className={style.paymentGateway}>
                    <form action = "http://localhost:8082/payment/payment" method = "POST">
                        <input type = "hidden" name = "title" value = "Minnios" ></input>
                        <input type = "hidden" name =  "price" value = "780"></input>
                        <button type = "submit" className={style.btn_finish}>Buy Now</button>
                    </form>
                </div>


            </div>
        </div>
      )
}
