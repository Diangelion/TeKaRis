import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonMenuButton,
  IonButtons,
  IonText,
  IonCard,
  IonBadge,
  IonButton,
  IonIcon,
  IonCardContent,
  IonLabel,
} from "@ionic/react";

// Icon
import { person } from "ionicons/icons";

// Styling
import "./Profile.css";

const Profile: React.FC = () => {
  return (
    <IonPage>
      <IonContent color="tertiary">
        <div className="box-header">
          <div className="box-judul">
            <IonLabel>Hello</IonLabel>
            <IonLabel>Bryan Richie!</IonLabel>
          </div>
          <IonButton color="tertiary" routerLink="/profile">
            <IonIcon icon={person} />
          </IonButton>
        </div>
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
            <div>Bryan Richie</div>
            <div>00000056044</div>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
