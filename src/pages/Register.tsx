import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonIcon,
  IonToast,
} from "@ionic/react";
import React, { useState } from "react";
import { eye, eyeOff } from "ionicons/icons";
import { useHistory } from "react-router";

import "../styles/Register.scss";

//import Firebase
import { collection, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { useEffect } from "react";
import { app, auth } from "../firebaseConfig";
import { AES } from "crypto-js";

interface RegisterDataProps {
  name: string;
  email: string;
  password: string;
  confirmationPassword: string;
}

const Register: React.FC = () => {
  const [registerData, setRegisterData] = useState<RegisterDataProps>({
    name: "",
    email: "",
    password: "",
    confirmationPassword: "",
  });
  const [isTouched, setIsTouched] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState<boolean>();
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>();
  // const secretPass = import.meta.env.SECRET_PASS;
  const secretPass = "kcB7sDfPq09R";

  // Toast Message
  const [toastWishlistMessage, setToastWishlistMessage] = useState('');

  const emailValidation = (email: string) => {
    return email.match(
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );
  };

  const validateEmail = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;
    setIsValidEmail(undefined);
    if (value === "") return;
    emailValidation(value) !== null
      ? setIsValidEmail(true)
      : setIsValidEmail(false);
  };

  const validatePassword = (ev: Event) => {
    const { value, name } = ev.target as HTMLInputElement;
    if (
      value === "" ||
      registerData.confirmationPassword === "" ||
      registerData.password === ""
    ) {
      setIsPasswordMatch(true);
      return;
    }

    if (name === "password") {
      setIsPasswordMatch(value === registerData.confirmationPassword);
    } else if (name === "confirmationPassword") {
      setIsPasswordMatch(value === registerData.password);
    }
  };

  const markTouched = () => {
    setIsTouched(true);
  };

  const handleInputChange = (ev: Event) => {
    const { value, name } = ev.target as HTMLInputElement;
    setRegisterData((prevRegisterData) => ({
      ...prevRegisterData,
      [name]: value,
    }));
  };

  const db = getFirestore(app);
  const history = useHistory();

  const handleRegister = async () => {
    try {
      if (!registerData.email || !registerData.name || !registerData.password || !registerData.confirmationPassword) {
        console.error("Please fill the form before register!");
        setToastWishlistMessage("Please fill the form before register!");
        return;
      }
      else if(registerData.password != registerData.confirmationPassword) {
        console.error("Password must be same with confirm password!");
        setToastWishlistMessage("Password must be same with confirm password!");
        return;
      }

      // Add user data to Firestore
      const encryptedPassword = AES.encrypt(
        registerData.password,
        secretPass
      ).toString();
      const usersCollection = collection(db, "users");
      await addDoc(usersCollection, {
        name: registerData.name,
        email: registerData.email,
        password: encryptedPassword,
      });
      console.log("User registered successfully");
      history.push("/login");
    } catch (err) {
      console.error("Error during registration:", err);
    }
  };

  // Toggle Show Password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <IonToast
      isOpen={!!toastWishlistMessage}
      message={toastWishlistMessage}
      duration={2000}
      onDidDismiss={() => {setToastWishlistMessage('')}} />
      <IonPage id="RegisterPageContainer">
        <IonContent className="ion-padding">
          <div className="border-logo ion-text-center">
            <IonLabel className="logo">TeKaRis</IonLabel>
          </div>
          <h1 className="judul">Register</h1>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonInput
                  type="text"
                  fill="solid"
                  label="Name"
                  labelPlacement="floating"
                  helperText="Enter your name"
                  name="name"
                  onIonBlur={() => markTouched()}
                  onIonInput={(e) => handleInputChange(e)}
                ></IonInput>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonInput
                  className={`${isValidEmail && "ion-valid"} ${
                    isValidEmail === false && "ion-invalid"
                  } ${isTouched && "ion-touched"}`}
                  type="email"
                  fill="solid"
                  label="Email"
                  labelPlacement="floating"
                  helperText="Enter a valid email"
                  errorText="Invalid email"
                  name="email"
                  onIonInput={(e) => {
                    validateEmail(e);
                    handleInputChange(e);
                  }}
                  onIonBlur={() => markTouched()}
                ></IonInput>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol className="inputPasswordField">
                <IonInput
                  className={`${isPasswordMatch && "ion-valid"} ${
                    isPasswordMatch === false && "ion-invalid"
                  } ${isTouched && "ion-touched"}`}
                  type={showPassword ? "text" : "password"}
                  fill="solid"
                  label="Password"
                  labelPlacement="floating"
                  helperText="Enter your password"
                  errorText="Password and Confirmation Password does not match"
                  name="password"
                  onIonInput={(e) => {
                    handleInputChange(e);
                    validatePassword(e);
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

            <IonRow>
              <IonCol className="inputPasswordField">
                <IonInput
                  className={`${isPasswordMatch && "ion-valid"} ${
                    isPasswordMatch === false && "ion-invalid"
                  } ${isTouched && "ion-touched"}`}
                  type={showConfirmPassword ? "text" : "password"}
                  fill="solid"
                  label="Confirmation Password"
                  labelPlacement="floating"
                  helperText="Confirm your password"
                  errorText="Password and Confirmation Password does not match"
                  name="confirmationPassword"
                  onIonInput={(e) => {
                    handleInputChange(e);
                    validatePassword(e);
                  }}
                  onIonBlur={() => markTouched()}
                ></IonInput>
                <IonIcon
                  className="eyeIcon"
                  icon={showConfirmPassword ? eye : eyeOff}
                  onClick={toggleShowConfirmPassword}
                />
              </IonCol>
            </IonRow>

            <IonRow className="ion-margin-vertical">
              <IonCol>
                <IonButton onClick={handleRegister}>Register</IonButton>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonLabel className="text-font">
                  Already have an account?{" "}
                </IonLabel>
                <a href="/login">Login</a>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Register;
