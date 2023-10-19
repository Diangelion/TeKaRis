import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React, { useContext, useRef, useState } from 'react';
import { person } from "ionicons/icons";

import "../styles/Home.css";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>

      </IonHeader>
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
        <div className="box-mode ion-padding">
          <IonButton className="button-mode1" color="warning">
            <IonLabel className="label-button ion-padding">Mode 1</IonLabel>
          </IonButton>
          <IonButton className="button-mode2" color="warning">
            <IonLabel className="label-button ion-padding">Mode 2</IonLabel>
          </IonButton>
        </div>
      </IonContent>      
    </IonPage>
  );
};

export default Home;
