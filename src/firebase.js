import {initializeApp } from 'firebase/app'
import {getAuth} from 'firebase/auth'

const app = initializeApp({

    // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    // appId: process.env.REACT_APP_FIREBASE_APP_ID

    apiKey: "AIzaSyDQQfkYjBmPlIuceyrh2bK_HFEz1WuQgYM",
    authDomain: "hp-development-7a7b1.firebaseapp.com",
    projectId: "hp-development-7a7b1",
    storageBucket: "hp-development-7a7b1.appspot.com",
    messagingSenderId: "608508174029",
    appId: "1:608508174029:web:d2b0cb6e6e2faa11d19384"

})

export const auth = getAuth(app)
export default app