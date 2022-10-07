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


export function takenTickets({id, title}){

    return {type:'TAKEN_TICKETS', payload: {id, title}}
}


export function addToCartDisplay(payload){

    return {type:'ADD_TO_CART_DISPLAY', payload}
}