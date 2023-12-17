import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonInput,
  IonLabel,
  IonPage,
  IonRow,
  IonIcon,
  IonText,
} from "@ionic/react";
import React, { useState } from "react";

//import Firebase
import { registerWithEmailAndPassword } from "../firebaseConfig";

// Icons
import { eye, eyeOff } from "ionicons/icons";

// Style
import "../styles/Register.scss";

interface RegisterDataProps {
  name: string;
  email: string;
  password: string;
  confirmationPassword: string;
}

const Register: React.FC = () => {
  // Define state
  const [registerData, setRegisterData] = useState<RegisterDataProps>({
    name: "",
    email: "",
    password: "",
    confirmationPassword: "",
  });
  const [isTouched, setIsTouched] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState<boolean>();
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resultMessage, setResultMessage] = useState<string>("");
  const [failedRegis, setFailedRegis] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Function untuk validasi format email yang diinput user
  const emailValidation = (email: string) => {
    return email.match(
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );
  };

  // Function untuk validasi awal, dipakai untuk mengecek input empty juga sebelum masuk ke validasi email
  const validateEmail = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;
    setIsValidEmail(undefined);
    if (value === "") return;
    emailValidation(value) !== null
      ? setIsValidEmail(true)
      : setIsValidEmail(false);
  };

  // Function untuk pengecekan apakah password dan confirmation psasword sama atau tidak
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

  // Function menandakan user sedang menginput di suatu field tersebut (focus)
  const markTouched = () => {
    setIsTouched(true);
  };

  // Function untuk mencatat semua input user sesuai name attribute pada tag input
  const handleInputChange = (ev: Event) => {
    const { value, name } = ev.target as HTMLInputElement;
    setRegisterData((prevRegisterData) => ({
      ...prevRegisterData,
      [name]: value,
    }));
  };

  // Function untuk handle logic register
  const handleRegister = async () => {
    setIsLoading(true);
    try {
      if (
        !registerData.email ||
        !registerData.name ||
        !registerData.password ||
        !registerData.confirmationPassword
      ) {
        setFailedRegis(true);
        setIsLoading(false);
        setResultMessage("Mohon isi semua input.");
        return;
      }

      if (registerData.password != registerData.confirmationPassword) {
        setFailedRegis(true);
        setIsLoading(false);
        setResultMessage("Password dan konfirmasi password tidak sama.");
        return;
      }

      setResultMessage("");

      const result = (await registerWithEmailAndPassword(
        registerData.name,
        registerData.email,
        registerData.password
      )) as any;

      if (result.isRegistered) {
        setRegisterData({
          name: "",
          email: "",
          password: "",
          confirmationPassword: "",
        });
        setFailedRegis(false);
        setResultMessage("Berhasil mendaftar.");
      } else {
        setFailedRegis(true);
        setResultMessage(result.error);
      }
      setIsLoading(false);
    } catch (err) {
      console.log("Failed to register user!");
      setIsLoading(false);
    }
  };

  // Function untuk show/hide password
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Function untuk show/hide confirmation password
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
                helperText="Masukkan nama"
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
                helperText="Masukkan email"
                errorText="Email tidak valid"
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
                helperText="Masukkan password"
                errorText="Password dan konfirmasi password tidak sama"
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
                label="Konfirmasi Password"
                labelPlacement="floating"
                helperText="Masukkan konfirmasi password"
                errorText="Password dan konfirmasi password tidak sama"
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
              <IonButton onClick={handleRegister} disabled={isLoading}>
                Register
              </IonButton>
            </IonCol>
          </IonRow>

          {resultMessage !== "" && (
            <IonRow>
              <IonGrid>
                <IonText color={`${failedRegis ? "danger" : "success"}`}>
                  {resultMessage}
                </IonText>
              </IonGrid>
            </IonRow>
          )}

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
