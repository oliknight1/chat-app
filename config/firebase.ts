import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDwM42BAWw2orsr58Q4VULe9jdlIR66loI",
    authDomain: "picchat-6f594.firebaseapp.com",
    projectId: "picchat-6f594",
    storageBucket: "picchat-6f594.appspot.com",
    messagingSenderId: "394003318257",
    appId: "1:394003318257:web:c121a92e74ad87d12cb050"
};

const app = initializeApp( firebaseConfig );
export const db = getFirestore();
export const auth = getAuth( app );

