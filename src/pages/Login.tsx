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
} from "@ionic/react";
import React, { useContext, useRef, useState } from "react";

import "../styles/Login.css";

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

  const handleLogin = async () => {
    try {
      console.log(loginData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <div className="border-logo ion-text-center">
          <IonLabel className="logo">TeKaRis</IonLabel>
          <IonLabel className="judul">Login</IonLabel>
        </div>
      </IonHeader>

      {/* <IonContent color="dark" className="ion-text-center"> */}
      <IonContent className="ion-padding ">
        <IonGrid>
          <IonRow className="ion-margin-bottom">
            <IonCol>
              {/* <IonLabel position="floating">Enter your email</IonLabel>
              <IonInput></IonInput> */}
              <IonInput
                className={`${isValid && "ion-valid"} ${
                  isValid === false && "ion-invalid"
                } ${isTouched && "ion-touched"}`}
                type="email"
                fill="solid"
                label="Email"
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
            <IonCol>
              {/* <IonLabel position="floating">Enter your password </IonLabel>
                <IonInput></IonInput> */}
              <IonInput
                type="password"
                fill="solid"
                label="Password"
                labelPlacement="floating"
                helperText="Enter your password"
                onIonInput={(event) => {
                  handleInputChange(event);
                }}
                onIonBlur={() => markTouched()}
              ></IonInput>
            </IonCol>
          </IonRow>

          <IonRow className="ion-margin-vertical">
            <IonCol>
              {/* <IonButton onClick={handleLogin}>Login</IonButton> */}
              <IonButton routerLink="/home">Login</IonButton>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonLabel className="text-font">
                Does not have an account?{" "}
              </IonLabel>
              <a href="/register">Register</a>
              {/* <IonButton
                routerLink="/register"
                className="text-font"
                fill="clear"
              >
                Register
              </IonButton> */}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;
