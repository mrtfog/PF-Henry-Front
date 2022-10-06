import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk'; 
import { composeWithDevTools } from 'redux-devtools-extension';
import moviesReducer from '../reducer/movies'
import reviewsReducer from '../reducer/reviews'
import showtimesReducer from '../reducer/showtimes'
import playlistsReducer from '../reducer/playlists'
import usersReducer from '../reducer/users'

const rootReducer = combineReducers({

  moviesReducer: moviesReducer,
  reviewsReducer: reviewsReducer,
  showtimesReducer: showtimesReducer,
  playlistsReducer: playlistsReducer,
  usersReducer: usersReducer
})

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)),
);

export default store;