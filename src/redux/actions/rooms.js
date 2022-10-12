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
    //{number: 1, rows:5, columns: 10}

    return async(dispatch)=>{

        try{
            await axios.post('http://localhost:8082/room/post', room, {headers: { "user": currentUser.accessToken}})
            return dispatch({type:'POST_NEW_ROOM'})
        }
        catch(e){
            console.log(e)
        }

    }
}