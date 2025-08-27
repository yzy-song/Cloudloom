/*
 * @Author: yzy
 * @Date: 2025-08-27 02:07:10
 * @LastEditors: yzy
 * @LastEditTime: 2025-08-27 02:08:35
 */
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAkDjterKZCX7W1QPCwQWQNFjys3CK723k',
  authDomain: 'cloudloom-ac7e2.firebaseapp.com',
  projectId: 'cloudloom-ac7e2',
  storageBucket: 'cloudloom-ac7e2.firebasestorage.app',
  messagingSenderId: '349730912492',
  appId: '1:349730912492:web:965714f9579dae83ed4dc9',
  measurementId: 'G-6VTZY63JS5',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

export { auth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup }
