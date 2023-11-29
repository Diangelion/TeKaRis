import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonToast,
} from "@ionic/react";
import React, { useContext, useRef, useState } from "react";
import { eye, eyeOff } from "ionicons/icons";
import { useHistory } from "react-router";

import "../styles/Login.scss";

import { getFirestore } from "firebase/firestore";
import { app } from "../firebaseConfig";
import { auth } from "../firebaseConfig";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import CryptoJS, { AES } from "crypto-js";

interface LoginDataProps {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginDataProps>({
    email: "",
    password: "",
  });
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState<boolean>();
  // const secretPass = import.meta.env.SECRET_PASS;
  const secretPass = "kcB7sDfPq09R";
  
  // Toast Message
  const [toastWishlistMessage, setToastWishlistMessage] = useState('');

  const validateEmail = (email: string) => {
    return email.match(
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );
  };

  const validate = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;
    setIsValid(undefined);
    if (value === "") return;
    validateEmail(value) !== null ? setIsValid(true) : setIsValid(false);
  };

  const markTouched = () => {
    setIsTouched(true);
  };

  const handleInputChange = (ev: Event) => {
    const { value, name } = ev.target as HTMLInputElement;
    setLoginData((prevLoginData) => ({
      ...prevLoginData,
      [name]: value,
    }));
  };

  const db = getFirestore(app);
  const history = useHistory();

  const handleLogin = async () => {
    try {
      // const { email, password } = loginData;
      const email = loginData.email;
      const password = loginData.password;
      // Make sure email and password are provided
      if (!email || !password) {
        console.error("Email and password are required for login.");
        setToastWishlistMessage("Email and password are required for login!");
        return;
      }

      // Replace 'users' with the actual name of your Firestore collection
      const usersCollection = collection(db, "users");
      // Query for user with the specified email and password
      const q = query(usersCollection, where("email", "==", email));

      const querySnapshot = await getDocs(q);
      const bytes = AES.decrypt(
        querySnapshot.docs[0].data().password,
        secretPass
      );
      const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

      // Check if there's at least one document in the query result
      if (!querySnapshot.empty && password == decryptedPassword) {
        // console.log("Login successful. User data:", querySnapshot.docs[0].data());
        history.push("/home");
        // Redirect to home or perform other actions after successful login
      } else {
        console.log("Login failed. User not found or invalid credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  // Toggle Show Password
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <IonToast
      isOpen={!!toastWishlistMessage}
      message={toastWishlistMessage}
      duration={2000}
      onDidDismiss={() => {setToastWishlistMessage('')}} />
      <IonPage id="LoginPageContainer">
        <IonContent className="ion-padding">
          <div className="border-logo ion-text-center">
            <IonLabel className="logo">TeKaRis</IonLabel>
          </div>
          <h1 className="judul">Login</h1>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonInput
                  className={`${isValid && "ion-valid"} ${
                    isValid === false && "ion-invalid"
                  } ${isTouched && "ion-touched"}`}
                  type="email"
                  fill="solid"
                  label="Email"
                  name="email"
                  labelPlacement="floating"
                  helperText="Enter a valid email"
                  errorText="Invalid email"
                  onIonInput={(event) => {
                    validate(event);
                    handleInputChange(event);
                  }}
                  onIonBlur={() => markTouched()}
                ></IonInput>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol className="inputPasswordField">
                <IonInput
                  type={showPassword ? "text" : "password"}
                  fill="solid"
                  label="Password"
                  name="password"
                  labelPlacement="floating"
                  helperText="Enter your password"
                  onIonInput={(event) => {
                    handleInputChange(event);
                  }}
                  onIonBlur={() => markTouched()}
                ></IonInput>
                <IonIcon
                  className="eyeIcon"
                  icon={showPassword ? eye : eyeOff}
                  onClick={toggleShowPassword}
                />
              </IonCol>
            </IonRow>

            <IonRow className="ion-margin-vertical ">
              <IonCol>
                <IonButton shape="round" onClick={handleLogin}>
                  Login
                </IonButton>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonLabel className="text-font">
                  Does not have an account?{" "}
                </IonLabel>
                <a href="/register">Register</a>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Login;
