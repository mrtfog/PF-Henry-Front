import axios from 'axios';
import Swal from "sweetalert2/dist/sweetalert2.all.min.js";



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
            const {data} = await axios.post('https://pf-henry-back.herokuapp.com/room/post', room, {headers: { "user": currentUser.accessToken}})
            Swal.fire({
                text: "Movie theater created",
                icon: "success",
                iconColor: "#497aa6",
                showCloseButton: true,
                confirmButtonText: "Continue",
                allowEnterKey: false,
                customClass: {
                  popup: "Alert",
                  closeButton: "closeButton",
                  confirmButton: "confirmButton",
                },
              });
            return dispatch({type:'POST_NEW_ROOM', payload: data})
        }
        catch(e){
            console.log(e);
            Swal.fire({
              title: 'Oops!',
              text: e.response.data,
              icon: "warning",
              iconColor: "#497aa6",
              showCloseButton: true,
              confirmButtonText: "Accept",
              allowEnterKey: false,
              customClass: {
                popup: "Alert",
                closeButton: "closeButton",
                confirmButton: "confirmButton",
              },
            })   
            
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
            console.log(e);
            Swal.fire({
              title: 'Oops!',
              text: e.response.data,
              icon: "warning",
              iconColor: "#497aa6",
              showCloseButton: true,
              confirmButtonText: "Accept",
              allowEnterKey: false,
              customClass: {
                popup: "Alert",
                closeButton: "closeButton",
                confirmButton: "confirmButton",
              },
            })
        }
    }
}