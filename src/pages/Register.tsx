import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonLabel,
  IonPage,
  IonRow,
} from "@ionic/react";
import React, { useState } from "react";

import "../styles/Register.css";

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

  const handleRegister = async () => {
    try {
      console.log(registerData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <div className="border-logo ion-text-center">
          <IonLabel className="logo">TeKaRis</IonLabel>
          <IonLabel className="judul">Register</IonLabel>
        </div>
      </IonHeader>

      {/* <IonContent color="dark" className="ion-text-center"> */}
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol>
              {/* <IonItem className="input" color="medium">
                <IonLabel position="floating">Enter your name</IonLabel>
                <IonInput></IonInput>
              </IonItem> */}
              <IonInput
                type="text"
                fill="solid"
                label="Name"
                labelPlacement="floating"
                helperText="Enter your name"
                name="name"
                // value={registerData.name}
                onIonBlur={() => markTouched()}
                onIonInput={(e) => handleInputChange(e)}
              ></IonInput>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              {/* <IonItem className="input" color="medium">
                <IonLabel position="floating">Enter your email </IonLabel>
                <IonInput></IonInput>
              </IonItem> */}
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
                // value={registerData.email}
                onIonInput={(e) => {
                  validateEmail(e);
                  handleInputChange(e);
                }}
                onIonBlur={() => markTouched()}
                // onIonChange={(e) => handleInputChange(e)}
              ></IonInput>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              {/* <IonItem className="input" color="medium">
                <IonLabel position="floating">Enter your password</IonLabel>
                <IonInput></IonInput>
              </IonItem> */}
              <IonInput
                className={`${isPasswordMatch && "ion-valid"} ${
                  isPasswordMatch === false && "ion-invalid"
                } ${isTouched && "ion-touched"}`}
                type="password"
                fill="solid"
                label="Password"
                labelPlacement="floating"
                helperText="Enter your password"
                errorText="Password and Confirmation Password does not match"
                name="password"
                // value={registerData.password}
                onIonInput={(e) => {
                  handleInputChange(e);
                  validatePassword(e);
                }}
                onIonBlur={() => markTouched()}
                // onIonChange={(e) => handleInputChange(e)}
              ></IonInput>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              {/* <IonItem className="input" color="medium">
                <IonLabel position="floating">
                  Enter your coofirm password
                </IonLabel>
                <IonInput></IonInput>
              </IonItem> */}
              <IonInput
                className={`${isPasswordMatch && "ion-valid"} ${
                  isPasswordMatch === false && "ion-invalid"
                } ${isTouched && "ion-touched"}`}
                type="password"
                fill="solid"
                label="Confirmation Password"
                labelPlacement="floating"
                helperText="Confirm your password"
                errorText="Password and Confirmation Password does not match"
                name="confirmationPassword"
                // value={registerData.confirmationPassword}
                onIonInput={(e) => {
                  handleInputChange(e);
                  validatePassword(e);
                }}
                onIonBlur={() => markTouched()}
                // onIonChange={(e) => handleInputChange(e)}
              ></IonInput>
            </IonCol>
          </IonRow>

          <IonRow className="ion-margin-vertical">
            <IonCol>
              {/* <IonButton onClick={handleRegister}>Register</IonButton> */}
              <IonButton routerLink="/home">Register</IonButton>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonLabel className="text-font">
                Already have an account?{" "}
              </IonLabel>
              {/* <IonButton routerLink="/login" className="text-font">
                Login
              </IonButton> */}
              <a href="/login">Login</a>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Register;
