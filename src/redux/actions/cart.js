import axios from "axios";

export function getCart() {

    return async (dispatch) => {
        try {
            return dispatch({ type: "GET_CART"});
        } 
        catch (e) {
            console.log(e);
        }
    };

}




export function getShowtimeByMovieId(id){

    return async(dispatch) => {

        try{
            let { data } = await axios(`https://pf-henry-back.herokuapp.com/showtime/getByMovie/${id}`)

            return dispatch({type: 'GET_SHOWTIME_BY_MOVIE_ID', payload: data})

        }catch(e){
            console.log(e)
        }

    }

}


export function takenTickets({id, title}){

    return {type:'TAKEN_TICKETS', payload: {id, title}}
}


export function addToCartDisplay(display){

    return {type:'ADD_TO_CART_DISPLAY', payload: display}
}