// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  updateDoc,
  query,
  where,
  getDoc,
  orderBy,
  limit,
} from "firebase/firestore";
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
    const userUid = res.user.uid;

    localStorage.setItem("userUid", userUid);

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
  password: string,
  highestTranslateRift: number,
  highestBlankCraft: number
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    const res2 = await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      highestTranslateRift: highestTranslateRift,
      highestBlankCraft: highestBlankCraft,
    });
    return {
      isRegistered: true,
      data: res2,
    };
  } catch (err) {
    return handleAuthError(err);
  }
};

// Function untuk update highest Translate Rift score
const updateHighestTranslateRiftInFirebase = async (
  uid: string,
  score: number
) => {
  try {
    // Query to get the user's document in the 'users' collection based on UID
    const userQuery = query(collection(db, "users"), where("uid", "==", uid));

    // Execute the query
    const querySnapshot = await getDocs(userQuery);

    if (!querySnapshot.empty) {
      // Dokumen ditemukan, ambil referensi dokumen
      const userDocRef = querySnapshot.docs[0].ref;
      const userDoc = await getDoc(userDocRef);
      const currentScore = userDoc.data()?.highestTranslateRift ?? 0;

      // Update the 'score' field in the user's document
      if (score > currentScore) {
        await updateDoc(userDocRef, {
          score: score,
        });
        console.log("Score updated successfully in Firebase!");
      }
    } else {
      // Dokumen tidak ditemukan
      console.error("User document not found for UID:", uid);
    }
  } catch (error) {
    console.error("Error updating score in Firebase:", error);
  }
};

// Function untuk update highest blank craft score
const updateHighestBlankCraftScoreInFirebase = async (
  uid: string,
  score: number
) => {
  try {
    // Query to get the user's document in the 'users' collection based on UID
    const userQuery = query(collection(db, "users"), where("uid", "==", uid));

    // Execute the query
    const querySnapshot = await getDocs(userQuery);

    if (!querySnapshot.empty) {
      // Dokumen ditemukan, ambil referensi dokumen
      const userDocRef = querySnapshot.docs[0].ref;
      const userDoc = await getDoc(userDocRef);
      const currentScore = userDoc.data()?.highestBlankCraft || 0;

      // Update the 'score' field in the user's document
      if (score > currentScore) {
        await updateDoc(userDocRef, {
          score2: score,
        });
        console.log("Score updated successfully in Firebase!");
      }
    } else {
      // Dokumen tidak ditemukan
      console.error("User document not found for UID:", uid);
    }
  } catch (error) {
    console.error("Error updating score in Firebase:", error);
  }
};

//dapetin score top 10
interface UserScore {
  name: string;
  score: number;
}

const getTopScores = async (): Promise<{
  topScores1: UserScore[];
  topScores2: UserScore[];
}> => {
  const usersCollection = collection(getFirestore(), "users");

  const scoresQuery = query(
    usersCollection,
    orderBy("highestTranslateRift", "desc"),
    limit(10)
  );
  const scores2Query = query(
    usersCollection,
    orderBy("highestBlankCraft", "desc"),
    limit(10)
  );

  try {
    const querySnapshot = await getDocs(scoresQuery);
    const querySnapshot2 = await getDocs(scores2Query);

    let topScores1: UserScore[] = [];
    let topScores2: UserScore[] = [];

    if (!querySnapshot.empty) {
      topScores1 = querySnapshot.docs.map((doc) => {
        const userData = doc.data();
        const userScore = userData?.score || 0;
        return { name: userData.name, score: userScore } as UserScore;
      });
    }

    if (!querySnapshot2.empty) {
      topScores2 = querySnapshot2.docs.map((doc) => {
        const userData = doc.data();
        const userScore = userData?.score2 || 0;
        return { name: userData.name, score: userScore } as UserScore;
      });
    }

    // Sort topScores1 array by score in descending order
    topScores1.sort((a, b) => b.score - a.score);

    // Sort topScores2 array by score in descending order
    topScores2.sort((a, b) => b.score - a.score);

    // Get the top 10 scores for each category
    topScores1 = topScores1.slice(0, 10);
    topScores2 = topScores2.slice(0, 10);

    console.log("Top Scores 1:", topScores1);
    console.log("Top Scores 2:", topScores2);

    return { topScores1, topScores2 };
  } catch (error) {
    console.error("Error fetching top scores from Firestore:", error);
    return { topScores1: [], topScores2: [] };
  }
};

// Export variable and function
export {
  auth,
  db,
  storage,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  updateHighestTranslateRiftInFirebase,
  updateHighestBlankCraftScoreInFirebase,
  getTopScores,
};
