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