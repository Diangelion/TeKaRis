// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

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
  measurementId: "G-6LZ1NMNSGZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage();

// Function untuk menampilkan error message berdasarkan kode
const getFirebaseErrorMessage = (code: string) => {
  const errorMessages = {
    "auth/email-already-in-use": "Email sudah terdaftar.",
    "auth/invalid-email": "Email tidak valid.",
    "auth/weak-password": "Kata sandi terlalu lemah.",
    "auth/invalid-login-credentials": "Email atau password salah.",
  } as any;

  if (errorMessages.hasOwnProperty(code)) {
    return errorMessages[code];
  }

  // Pesan default jika kode error tidak ditemukan
  return "Terjadi kesalahan pada Firebase.";
};

// Function untuk handling error message dari response code yang didapat dari firebase
const handleAuthError = (err: any) => ({
  isRegistered: false,
  error: getFirebaseErrorMessage(err.code),
});

// Function untuk login
const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return {
      isLogged: true,
      data: res,
    };
  } catch (err) {
    return handleAuthError(err);
  }
};

// Function untuk register
const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    const res2 = await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    return {
      isRegistered: true,
      data: res2,
    };
  } catch (err) {
    return handleAuthError(err);
  }
};

// Export variable and function
export {
  auth,
  db,
  storage,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
};
