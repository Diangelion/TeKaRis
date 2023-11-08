import {
    IonButton,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import React, { useContext, useRef, useState } from "react";
import { person } from "ionicons/icons";

import "../styles/GameMode1.css";

const GameMode1: React.FC = () => {
    return (
        <IonPage>
            <IonHeader></IonHeader>
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
                <div className="konten ion-padding">
                    <IonLabel className="text-mode">Mode 1</IonLabel>
                    <IonLabel className="soal">HOME</IonLabel>
                    <div className="box-player">
                        <div className="player">
                            <IonLabel className="player-hp">HP: 100</IonLabel>
                            <IonIcon className="player-icon" icon={person} />
                        </div>
                        <div className="player">
                            <IonLabel className="player-hp">HP: 100</IonLabel>
                            <IonIcon className="player-icon" icon={person} />
                        </div>
                    </div>
                    <IonItem className="input" color="warning">
                        <IonLabel position="floating">INPUT WORD</IonLabel>
                        <IonInput></IonInput>
                    </IonItem>
                    <IonButton color="warning" className="button-attack">Attack</IonButton>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default GameMode1;