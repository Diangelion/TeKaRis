import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonInput,
  IonText,
  IonLabel,
  IonPage,
  IonRow,
} from "@ionic/react";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router";

// Firebase
import { logInWithEmailAndPassword } from "../firebaseConfig";

// Iocns
import { eye, eyeOff } from "ionicons/icons";

// Style
import "../styles/Login.scss";
import { AuthContext, AuthProps } from "../context/ContextProvider";

interface LoginDataProps {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const history = useHistory();
  // Mengambil session user dari context
  const { setAuth } = useContext(AuthContext) ?? {};

  // Define state
  const [loginData, setLoginData] = useState<LoginDataProps>({
    email: "",
    password: "",
  });
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState<boolean>();
  const [showPassword, setShowPassword] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Function untuk validasi format email yang diketik user
  const validateEmail = (email: string) => {
    return email.match(
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );
  };

  // Function awal sebelum validasi email, bisa dipakai untuk pengencekan empty value juga
  const validate = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;
    setIsValid(undefined);
    if (value === "") return;
    validateEmail(value) !== null ? setIsValid(true) : setIsValid(false);
  };

  // Function menandakan user sedang menginput di suatu field tersebut (focus)
  const markTouched = () => {
    setIsTouched(true);
  };

  // Function untuk mencatat semua input user sesuai name attribute pada tag input
  const handleInputChange = (ev: Event) => {
    const { value, name } = ev.target as HTMLInputElement;
    setLoginData((prevLoginData) => ({
      ...prevLoginData,
      [name]: value,
    }));
  };

  // Function untuk show/hide password
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Function untuk handle logic login user
  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const email = loginData.email;
      const password = loginData.password;

      if (!email || !password) {
        setErrMsg("Mohon isi email dan password.");
        return;
      }

      const result = (await logInWithEmailAndPassword(email, password)) as any;
      if (result.isLogged) {
        setIsLoading(false);
        setErrMsg("");
        setLoginData({
          email: "",
          password: "",
        });
        saveToLocalStorage(result.data);
        history.push("/home");
      } else {
        setIsLoading(false);
        setErrMsg(result.error);
      }
    } catch (err) {
      setIsLoading(false);
      console.log("Login failed: ", err);
    }
  };

  // Function untuk menyimpan session user ketika berhasil login
  const saveToLocalStorage = (data: any) => {
    console.log(data);
    const storeData = {
      uid: data.user.uid,
      email: data.user.email,
      token: data.user.stsTokenManager,
    } as AuthProps;
    if (setAuth) setAuth(storeData);
    localStorage.setItem("auth", JSON.stringify(storeData));
  };

  return (
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
                helperText="Masukkan email"
                errorText="Email tidak valid"
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
                helperText="Masukkan password"
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
              <IonButton onClick={handleLogin} disabled={isLoading}>
                Login
              </IonButton>
            </IonCol>
          </IonRow>

          {errMsg !== "" && (
            <IonRow>
              <IonGrid>
                <IonText color="danger">{errMsg}</IonText>
              </IonGrid>
            </IonRow>
          )}

          <IonRow>
            <IonCol>
              <IonLabel className="text-font">Belum punya akun? </IonLabel>
              <a href="/register">Register</a>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;
