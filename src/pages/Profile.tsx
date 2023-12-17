import React, { useContext, useEffect, useRef, useState } from "react";
import {
  IonContent,
  IonPage,
  IonCard,
  IonButton,
  IonIcon,
  IonCardContent,
  IonModal,
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
} from "@ionic/react";
import { useHistory } from "react-router";

// Firebase
import { db, logout } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

// Context
import { AuthContext } from "../context/ContextProvider";
import { TeKaRisContextType } from "../context/ContextProvider";

// Icon
import { arrowBackCircle } from "ionicons/icons";

// Styling
import "../styles/Profile.scss";

// Data type untuk profile state
interface ProfileProps {
  name: string;
  email: string;
}

const Profile: React.FC = () => {
  // Define variable
  const history = useHistory();
  const profileRef = useRef(false);
  const modal = useRef<HTMLIonModalElement>(null);
  const authContext = useContext(AuthContext) as TeKaRisContextType;
  const { auth, setAuth } = authContext;

  // Define state
  const [profile, setProfile] = useState<ProfileProps | null>(null);
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState<boolean>();
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  // Function untuk validasi email ketika edit profile
  const validateEmail = (email: string) => {
    return email.match(
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );
  };

  // Function awal sebelum validasi email, bisa dipakai untuk pengencekan empty value juga ketika edit profile
  const validate = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;
    setIsValid(undefined);
    if (value === "") return;
    validateEmail(value) !== null ? setIsValid(true) : setIsValid(false);
  };

  // Function menandakan user sedang menginput di suatu field tersebut (focus) ketika edit profile
  const markTouched = () => {
    setIsTouched(true);
  };

  const handleInputChange = (ev: Event) => {
    // const { value, name } = ev.target as HTMLInputElement;
    // setProfile((prevProfile) => ({
    //   ...prevProfile,
    //   [name]: value,
    // }));
  };

  // Function untuk mendapatkan user data dari firebase dengan melakukan perbandingan uid di session dengan uid di setiap data user di firestore
  const getUserProfile = async () => {
    if (!auth) return;
    const uid = auth.uid;
    const soalCollectionRef = collection(db, "users");
    const snapshot = await getDocs(soalCollectionRef);
    // Memakai "find" untuk mencocokan uid
    const currentProfile = snapshot.docs.find(
      (user) => user.data().uid === uid
    );

    const profile = {
      name: currentProfile?.data().name,
      email: currentProfile?.data().email,
    } as ProfileProps;
    setProfile(profile);
  };

  // Function untuk logout
  const handleLogout = () => {
    logout();
    localStorage.clear();
    setAuth(null);
    history.push("/");
  };

  useEffect(() => {
    if (profileRef.current === false) {
      getUserProfile();
    }

    return () => {
      profileRef.current = true;
    };
  }, []);

  return (
    <IonPage id="ProfilePage">
      <IonContent className="ion-padding">
        <div className="header-section">
          <IonIcon
            icon={arrowBackCircle}
            size="large"
            onClick={() => history.goBack()}
          ></IonIcon>
          <h1>Profile</h1>
        </div>

        <div className="profile-content-section">
          <IonCard
            style={{
              textAlign: "center",
              padding: "40px 0",
              width: "75%",
              margin: "20px auto",
            }}
          >
            <div className="profile-photo-container">
              <img
                alt="Silhouette of a person's head"
                src="https://ionicframework.com/docs/img/demos/avatar.svg"
              />
            </div>

            <IonCardContent>
              <div>{profile?.name ? profile.name : "Getting name..."}</div>
              <div>{profile?.email ? profile.email : "Getting email..."}</div>
            </IonCardContent>
          </IonCard>

          <div className="button-section">
            <IonButton id="open-modal">Edit Profile</IonButton>
            <IonButton onClick={handleLogout}>Logout</IonButton>
          </div>
        </div>

        <IonModal ref={modal} trigger="open-modal">
          <IonContent className="ion-padding">
            <div className="edit-profile-header">
              <h1>Edit Profile</h1>
            </div>

            <div className="edit-profile-content">
              <div className="profile-photo-container">
                <img
                  alt="Silhouette of a person's head"
                  src="https://ionicframework.com/docs/img/demos/avatar.svg"
                />
              </div>

              <IonGrid>
                <IonRow>
                  <IonCol className="inputPasswordField">
                    <IonInput
                      type="text"
                      fill="solid"
                      label="Nama"
                      name="name"
                      labelPlacement="floating"
                      helperText="Masukkan nama"
                      onIonInput={(event) => {
                        handleInputChange(event);
                      }}
                      onIonBlur={() => markTouched()}
                    ></IonInput>
                  </IonCol>
                </IonRow>
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
              </IonGrid>

              <IonButton
                className="option-ion-button"
                onClick={() => modal.current?.dismiss()}
              >
                Back
              </IonButton>
            </div>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
