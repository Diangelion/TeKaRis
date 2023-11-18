import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
} from "@ionic/react";
import React, { useContext, useRef, useState } from "react";
import { person } from "ionicons/icons";

import "../styles/Home.scss";

const Home: React.FC = () => {
  return (
    <IonPage id="HomePageContainer">
      <IonHeader>
        <div className="box-header">
          <div className="box-judul">
            <IonLabel>Hello</IonLabel>
            <IonLabel>Bryan Richie!</IonLabel>
          </div>
          <IonButton color="tertiary" routerLink="/profile">
            <IonIcon icon={person} />
          </IonButton>
        </div>
      </IonHeader>

      <IonContent>
        <div className="box-mode ion-padding">
          <IonButton className="play-button" shape="round" routerLink="/mode1">
            <IonLabel className="label-button ion-padding">Mode 1</IonLabel>
          </IonButton>

          <IonButton className="play-button" shape="round">
            <IonLabel className="label-button ion-padding">Mode 2</IonLabel>
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
