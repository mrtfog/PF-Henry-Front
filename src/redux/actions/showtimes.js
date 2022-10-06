import axios from 'axios';

export function getAllShowtimes() {

    return async (dispatch) => {

        try {

            const { data } = await axios.get("https://pf-henry-back.herokuapp.com/showtime/getAll");
    
            return dispatch({ type: "GET_FUNCTIONS", payload: data });
        } 
        
        catch (e) {
            console.log(e);
        }
    };
}
  
export function postShowtime(payload){

    return async(dispatch)=>{

        try{

            await axios.post('https://pf-henry-back.herokuapp.com/showtime/post', payload)
            
            return dispatch({type:'POST_FUNCTION'})
        }
        catch(e){
            console.log(e)
        }

    }

}