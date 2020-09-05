import Rebase from 're-base'
import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBb4IrqEuCVdlHNLrGtwr5OvJucy7oAJ-k",
  authDomain: "catch-of-the-day-beb67.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-beb67.firebaseio.com",
  projectId: "catch-of-the-day-beb67",
  storageBucket: "catch-of-the-day-beb67.appspot.com",
  messagingSenderId: "807287291306",
  appId: "1:807287291306:web:78767b2ee4118662a87fd3",
  measurementId: "G-SYKTTTCMFG"
})

const base = Rebase.createClass(firebaseApp.database())

export { firebaseApp }

export default base