import axios from 'axios';


export function getAllRooms() {
    
    return async (dispatch) => {

        try {

            const { data } = await axios.get("https://pf-henry-back.herokuapp.com/room/getAll");
    
            return dispatch({ type: "GET_ROOMS", payload: data });
        } 
        
        catch (e) {
            console.log(e);
        }
    };
}

export function postNewRoom(room, currentUser){

    return async(dispatch)=>{

        try{
            await axios.post('https://pf-henry-back.herokuapp.com/room/post', room, {headers: { "user": currentUser.accessToken}})
            return dispatch({type:'POST_NEW_ROOM'})
        }
        catch(e){
            console.log(e)
        }

    }
}


export function logicDeleteRoom(id, currentUser){

    return async(dispatch)=>{

        try{

            await axios.delete(`http://localhost:8082/room/delete/${id}`, {headers: { "user": currentUser.accessToken}})
            
            return dispatch({type:'DELETE_ROOM', payload: id})
        }
        catch(e){
            console.log(e)
        }
    }
}