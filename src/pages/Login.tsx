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

const Login: React.FC = () => {
  return (
    <IonPage>
      <IonHeader></IonHeader>
      <IonContent color="dark" className="ion-text-center">
        <div className="border-logo">
          <IonLabel className="logo">TeKaRis</IonLabel>
          <IonLabel className="judul">Login</IonLabel>
        </div>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem className="input" color="medium">
                <IonLabel position="floating">Enter your email</IonLabel>
                <IonInput></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem className="input" color="medium">
                <IonLabel position="floating">Enter your password </IonLabel>
                <IonInput></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton routerLink="/home">Login</IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonLabel className="text-font">
                Does not have an account?{" "}
              </IonLabel>
              <IonButton routerLink="/register" className="text-font">
                Register
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;
