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
} from "@ionic/react";
import React, { useState } from "react";
import { eye, eyeOff } from "ionicons/icons";

import "../styles/Register.scss";

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
            <IonCol>
              <IonItem>
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
                  slot="end"
                  icon={showPassword ? eye : eyeOff}
                  onClick={toggleShowPassword}
                />
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
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
                  slot="end"
                  icon={showConfirmPassword ? eye : eyeOff}
                  onClick={toggleShowConfirmPassword}
                />
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow className="ion-margin-vertical">
            <IonCol>
              {/* <IonButton onClick={handleRegister}>Register</IonButton> */}
              <IonButton shape="round" routerLink="/home">
                Register
              </IonButton>
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
  );
};

export default Register;
