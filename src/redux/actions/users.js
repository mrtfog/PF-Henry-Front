import axios from 'axios';

export function getUserById(id) {

    return async (dispatch) => {
        try {
            const { data } = await axios.get(`https://pf-henry-back.herokuapp.com/auth/${id}`);
            return dispatch({ type: "GET_USER_BY_ID", payload: data });
        } 
        
        catch (e) {
            console.log(e);
        }
    };
}

export function getUserSession(id) {

    return async (dispatch) => {
        try {
            const { data } = await axios.get(`http://localhost:8082/auth/login/success`);
            return dispatch({ type: "GET_USER_SESSION", payload: data });
        } 
        catch (e) {
            console.log(e);
        }
    };
}


  
export function postNewUser(payload){

    return async(dispatch)=>{

        try{
            await axios.post('http://localhost:8082/auth/register', payload)
            return dispatch({type:'POST_NEW_USER'})
        }
        catch(e){
            console.log(e)
        }

    }

}