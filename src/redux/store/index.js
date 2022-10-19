import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk'; 
import { composeWithDevTools } from 'redux-devtools-extension';
import moviesReducer from '../reducer/movies'
import reviewsReducer from '../reducer/reviews'
import showtimesReducer from '../reducer/showtimes'
import playlistsReducer from '../reducer/playlists'
import usersReducer from '../reducer/users'
import cartReducer from '../reducer/cart'
import roomReducer from '../reducer/rooms'
import graphicReducer from '../reducer/graphics';
import subscribeReducer from '../reducer/subscribe'

const rootReducer = combineReducers({

  moviesReducer: moviesReducer,
  reviewsReducer: reviewsReducer,
  showtimesReducer: showtimesReducer,
  playlistsReducer: playlistsReducer,
  usersReducer: usersReducer,
  cartReducer: cartReducer,
  roomReducer: roomReducer,
  graphicReducer: graphicReducer,
  subscribeReducer: subscribeReducer,
})

const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25});

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk)),
);

export default store;