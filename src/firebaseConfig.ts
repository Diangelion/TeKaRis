// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgXt8gYfPgGHoYTjNgkgUpMp6S5thGgoE",
  authDomain: "tekaris-32613.firebaseapp.com",
  projectId: "tekaris-32613",
  storageBucket: "tekaris-32613.appspot.com",
  messagingSenderId: "1069840624907",
  appId: "1:1069840624907:web:52df30cc8a8bf97b6d060e",
  measurementId: "G-6LZ1NMNSGZ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//Implementasi
// import {collection, addDoc, getDocs, query, where, updateDoc} from "firebase/firestore";
// import { getFirestore } from "firebase/firestore";
// import { useEffect } from "react";
// import { app } from "../firebaseConfig";
// const db = getFirestore(app);
// const addData = async () => {
//     try{
//         const docRef = await addDoc(collection(db, "users"), {
//             first: "Ada",
//             last: "Lovelace",
//             born: 1815,
//             score: 0
//         });
//     } catch (e) {
//         console.error("Error adding document: ", e);
//     }
// }
// const updateData = async () => {
//   try {
//     const usersCollectionRef = collection(db, "users");

//     // Query for users with the specified first name ("Ada")
//     const querySnapshot = await getDocs(query(usersCollectionRef, where("first", "==", "Ada")));

//     // Check if there's at least one document in the query result
//     if (!querySnapshot.empty) {
//       // Assuming you want to update the first matching document
//       const userDoc = querySnapshot.docs[0];

//       // Use the updateDoc method to update the document with new data
//       await updateDoc(userDoc.ref, {
//         born: 1815,
//         score: 100 // Update the 'score' field to a new value
//       });

//       console.log("Document successfully updated!");
//     } else {
//       console.log("No user with the specified first name found.");
//     }
//   } catch (e) {
//     console.error("Error updating document: ", e);
//   }
// };
