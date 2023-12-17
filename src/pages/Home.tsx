import { IonButton, IonContent, IonPage, IonModal } from "@ionic/react";
import React, { useRef } from "react";

import "../styles/Home.scss";

const Home: React.FC = () => {
  const modal = useRef<HTMLIonModalElement>(null);

  return (
    <IonPage id="HomePageContainer">
      <IonContent className="ion-padding">
        <div className="logo-section">
          <h1>TeKaRis</h1>
        </div>

        <div className="options-section">
          <IonButton className="option-ion-button" id="open-modal">
            Play Game
          </IonButton>
          <IonButton className="option-ion-button">Leaderboard</IonButton>
          <IonButton className="option-ion-button" routerLink="/profile">
            Profile
          </IonButton>
          <IonButton className="option-ion-button">Exit</IonButton>
        </div>

        <IonModal ref={modal} trigger="open-modal">
          <IonContent className="ion-padding">
            <div className="modal-title-section">
              <h1>Select Game Mode</h1>
            </div>

            <div className="modal-content">
              <IonButton
                className="option-ion-button"
                routerLink="/translate-rift"
                onClick={() => modal.current?.dismiss()}
              >
                Translate Rift
              </IonButton>
              <IonButton
                className="option-ion-button"
                routerLink="/blank-craft"
                onClick={() => modal.current?.dismiss()}
              >
                Blank Craft
              </IonButton>
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

export default Home;
