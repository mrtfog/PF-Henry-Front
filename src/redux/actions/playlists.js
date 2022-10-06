import axios from "axios";

export function getUserPlaylists(){

    return {type:'GET_USER_PLAYLISTS'}
}

export function getPlaylist(id){

    return {type:'GET_PLAYLIST', payload: id}
}

export function getPlaylistMovies(movies){

    return async(dispatch)=>{

        try{
            const promises = movies.map(async(id) =>{

                let { data } = await axios.get(`https://pf-henry-back.herokuapp.com/api/${id}`)
                return data
            })
    
            let promiseAll = await Promise.all(promises)
    
            return dispatch({type: 'GET_PLAYLIST_MOVIES', payload: promiseAll})
        }

        catch(e){

            console.log(e)
        }

    }
}

export function clearPlaylistMovies(){

    return {type:'CLEAR_PLAYLIST_MOVIES'}
}

export function addToPlaylistDisplay(display){

    return {type:'ADD_TO_PLAYLIST_DISPLAY', payload: display}
}

export function selectedMovie(id,title){

    return {type:'SELECTED_MOVIE', payload: {id, title}}
}