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
  IonText,
} from "@ionic/react";
import { useHistory } from "react-router";
import { isPlatform } from "@ionic/react";

// Firebase
import { db, storage } from "../firebaseConfig";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  where,
  query,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Context
import { AuthContext } from "../context/ContextProvider";
import { TeKaRisContextType } from "../context/ContextProvider";

// Capacitor
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from "@capacitor/camera";
import { Directory, Filesystem } from "@capacitor/filesystem";

// Icon
import { arrowBackCircle, cameraReverseOutline } from "ionicons/icons";

// Styling
import "../styles/Profile.scss";
import { Capacitor } from "@capacitor/core";

// Data type untuk profile state
interface ProfileProps {
  name: string;
  email: string;
  photoURL: string;
}

// Data type untuk foto
interface PhotoProps {
  filePath: string;
  webviewPath?: string;
}

// Profile foto default user
const defaultProfile = "https://ionicframework.com/docs/img/demos/avatar.svg";

const Profile: React.FC = () => {
  // Define variable
  const history = useHistory();
  const profileRef = useRef(false);
  const modal = useRef<HTMLIonModalElement>(null);
  const authContext = useContext(AuthContext) as TeKaRisContextType;
  const { auth, setAuth } = authContext;

  // Define state
  const [profile, setProfile] = useState<ProfileProps | null>({
    name: "",
    email: "",
    photoURL: "",
  });
  const [newProfile, setNewProfile] = useState<ProfileProps | null>({
    name: "",
    email: "",
    photoURL: "",
  });
  const [photo, setPhoto] = useState<PhotoProps | null>(null);
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState<boolean>();
  const [isLoading, setIsLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState<string>("");
  const [failedSave, setFailedSave] = useState<boolean>(false);

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

  // Function untuk menerima input user dan memasukkan ke dalam state
  const handleInputChange = (ev: Event) => {
    const { value, name } = ev.target as HTMLInputElement;
    setNewProfile((prevNewProfile) => {
      if (!prevNewProfile) {
        return null;
      }
      return {
        ...prevNewProfile,
        [name]: value,
      };
    });
  };

  // Function untuk mendapatkan user data dari firebase dengan melakukan perbandingan uid di session dengan uid di setiap data user di firestore
  const getUserProfile = async () => {
    if (!auth) return;

    const uid = auth.uid;
    const usersCollectionRef = collection(db, "users");

    try {
      const snapshot = await getDocs(
        query(usersCollectionRef, where("uid", "==", uid))
      );
      const currentProfile = snapshot.docs[0] as any;

      if (currentProfile) {
        const profile = {
          name: currentProfile.data().name,
          email: currentProfile.data().email,
          photoURL: currentProfile.data().photoURL ?? defaultProfile,
        } as ProfileProps;
        setProfile(profile);
        setNewProfile(profile);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  // Function untuk logout
  const handleLogout = () => {
    localStorage.clear();
    setAuth(null);
    history.push("/");
  };

  // Function untuk membuka kamera dan melakukan pengambilan foto
  const takePhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });

    const fileName = new Date().getTime() + ".jpeg";
    const savedFileImage = await savePhoto(photo, fileName);
    setPhoto(savedFileImage);
    setNewProfile((prevNewProfile: any) => {
      if (!prevNewProfile) {
        return null;
      }
      return {
        ...prevNewProfile,
        photoURL: savedFileImage?.webviewPath ?? defaultProfile,
      };
    });
  };

  // Funciton untuk menyimpan foto yang diambil
  const savePhoto = async (
    photo: Photo,
    fileName: string
  ): Promise<PhotoProps> => {
    let base64data: string;

    if (isPlatform("hybrid")) {
      const file = await Filesystem.readFile({
        path: fileName,
        directory: Directory.Data,
      });
      base64data = file.data as string;
    } else {
      base64data = await base64FromPath(photo.webPath!);
    }

    const savedFile = await Filesystem.writeFile({
      path: fileName,
      directory: Directory.Data,
      data: base64data,
    });

    if (isPlatform("hybrid")) {
      return {
        filePath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    }
    return {
      filePath: fileName,
      webviewPath: photo.webPath,
    };
  };

  // Function untuk mengambil path file dan mengembalikan representasi base64 dari file tersebut dalam bentuk string
  const base64FromPath = async (path: string): Promise<string> => {
    const response = await fetch(path);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject("Method didn't return a string.");
        }
      };

      reader.readAsDataURL(blob);
    });
  };

  // Function upload foto ke firebase
  const savePhotoToFirebase = async (photo: PhotoProps) => {
    try {
      // Membuat ref ke firebase storage
      const storageRef = ref(
        storage,
        `user_profile_photo/${auth?.uid}/${photo.filePath}`
      );

      // System read the file content
      const fileContent = await Filesystem.readFile({
        path: photo.filePath,
        directory: Directory.Data,
      });

      // Melakukan decode Base64 string to binary
      const binaryString = atob(fileContent.data as string);

      // Membuat Blob dari binary string
      const blob = new Blob(
        [new Uint8Array([...binaryString].map((char) => char.charCodeAt(0)))],
        { type: "image/jpeg" }
      );

      // Membuat File object
      const file = new File([blob], photo.filePath, { type: "image/jpeg" });

      // Upload file ke firestore
      await uploadBytes(storageRef, file);

      // Melakukan return download URL
      return await getDownloadURL(storageRef);
    } catch (error) {
      return error;
    }
  };

  // Function untuk update profile
  const handleSaveProfile = async () => {
    if (
      profile?.name === newProfile?.name &&
      profile?.email === newProfile?.email &&
      !photo
    ) {
      setResultMessage("Profile successfully saved.");
      return;
    }

    setResultMessage("");
    setIsLoading(true);
    try {
      // Save the updated profile information to Firestore
      if (auth?.uid) {
        const usersCollectionRef = collection(db, "users");
        const snapshot = await getDocs(
          query(usersCollectionRef, where("uid", "==", auth.uid))
        );

        if (!snapshot.empty) {
          const userDocRef = snapshot.docs[0].ref;

          await updateDoc(userDocRef, {
            name: newProfile?.name,
            email: newProfile?.email,
          });

          // Cek apakah ada update pada profile foto
          let downloadURL: string | null = null;
          if (photo) {
            downloadURL = (await savePhotoToFirebase(photo)) as string;
            await updateDoc(userDocRef, {
              photoURL: downloadURL,
            });
          }

          // Fetch the updated profile data from Firestore
          await getUserProfile();

          setFailedSave(false);
          setResultMessage("Berhasil memperbarui profile.");
        } else {
          setFailedSave(true);
          setResultMessage("Pengguna tidak ditemukan.");
        }
      } else {
        setFailedSave(true);
        setResultMessage("Sesi pengguna tidak ditemukan.");
      }
    } catch (error) {
      setResultMessage("Gagal memperbarui profile. Silakan coba kembali.");
      setFailedSave(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackModal = () => {
    setResultMessage("");
    setPhoto(null);
    modal.current?.dismiss();
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
              <img src={profile?.photoURL} />
            </div>

            <IonCardContent>
              <div>{profile?.name ?? "Getting name..."}</div>
              <div>{profile?.email ?? "Getting email..."}</div>
            </IonCardContent>
          </IonCard>

          <div className="button-section">
            <IonButton id="open-edit-profile">Edit Profile</IonButton>
            <IonButton onClick={handleLogout}>Logout</IonButton>
          </div>
        </div>

        <IonModal ref={modal} trigger="open-edit-profile">
          <IonContent className="ion-padding">
            <div className="edit-profile-header">
              <IonIcon
                icon={arrowBackCircle}
                size="large"
                onClick={handleBackModal}
              ></IonIcon>
              <h1>Edit Profile</h1>
            </div>

            <div className="edit-profile-content">
              <div className="profile-photo-container">
                <img src={newProfile?.photoURL} />
                <IonIcon
                  icon={cameraReverseOutline}
                  size="large"
                  onClick={takePhoto}
                ></IonIcon>
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
                      value={newProfile?.name}
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
                      value={newProfile?.email}
                      onIonInput={(event) => {
                        validate(event);
                        handleInputChange(event);
                      }}
                      onIonBlur={() => markTouched()}
                    ></IonInput>
                  </IonCol>
                </IonRow>

                {resultMessage !== "" && (
                  <IonRow>
                    <IonGrid>
                      <IonText color={`${failedSave ? "danger" : "success"}`}>
                        {resultMessage}
                      </IonText>
                    </IonGrid>
                  </IonRow>
                )}

                <IonRow>
                  <IonButton
                    className="edit-profile-save-button"
                    onClick={handleSaveProfile}
                    disabled={isLoading}
                  >
                    Save
                  </IonButton>
                </IonRow>
              </IonGrid>
            </div>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
