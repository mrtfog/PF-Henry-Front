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
            const { data } = await axios.get(`https://pf-henry-back.herokuapp.com/auth/success`);
            return dispatch({ type: "GET_USER_SESSION", payload: data });
        } 
        catch (e) {
            console.log(e);
        }
    };
}

export function postLogIn(payload){
    return async (dispatch) => {
        try {
            const response = await axios.post(`https://pf-henry-back.herokuapp.com/auth/login`, payload);
            return dispatch({ type: "POST_LOG_IN", payload: response});
        } 
        catch (e) {
            console.log(e);
        }
    };
}


  
export function postNewUser(payload){

    return async(dispatch)=>{

        try{
            const response = await axios.post('https://pf-henry-back.herokuapp.com/auth/register', payload, {withCredentials:true})
            return dispatch({type:'POST_NEW_USER', payload: response.status})
        }
        catch(e){
            alert(e.response.data)
        }

    }

}


export function clearRegisterStatus(){
    return (dispatch) =>{
        return dispatch({type:'CLEAR_REGISTER_STATUS'})
    }
}