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

import CardLeaderboard from "../components/CardLeaderboard";

import "../styles/Leaderboard.css";

//firebase
import { db, getTopScores } from "../firebaseConfig";

interface dataLeaderboard {
  nama: string,
  point: string
}

const Leaderboard: React.FC = () => {
  const [mode, setMode] = useState<number>(1);
  const [dataMode1, setDataMode1] = useState<dataLeaderboard[]>([
    {
      nama: "John Wick",
      point: "10,000"
    },
    {
      nama: "John Wick",
      point: "10,000"
    },
    {
      nama: "John Wick",
      point: "10,000"
    },
    {
      nama: "John Wick",
      point: "10,000"
    },
    {
      nama: "John Wick",
      point: "10,000"
    },
    {
      nama: "John Wick",
      point: "10,000"
    },
    {
      nama: "John Wick",
      point: "10,000"
    },
    {
      nama: "John Wick",
      point: "10,000"
    },
    {
      nama: "John Wick",
      point: "10,000"
    },
    {
      nama: "John Wick",
      point: "10,000"
    },
  ]);

  const [dataMode2, setDataMode2] = useState<dataLeaderboard[]>([
    {
      nama: "John Doe",
      point: "11,000"
    },
    {
      nama: "John Doe",
      point: "11,000"
    },
    {
      nama: "John Doe",
      point: "11,000"
    },
    {
      nama: "John Doe",
      point: "11,000"
    },
    {
      nama: "John Doe",
      point: "11,000"
    },
    {
      nama: "John Doe",
      point: "11,000"
    },
    {
      nama: "John Doe",
      point: "11,000"
    },
    {
      nama: "John Doe",
      point: "11,000"
    },
    {
      nama: "John Doe",
      point: "11,000"
    },
    {
      nama: "John Doe",
      point: "11,000"
    },
  ]);

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
        <div className="ion-text-center">
          <IonLabel className="title">Mode {mode}</IonLabel>
        </div>
        <div className="box-button">
          <IonButton className="button" color="warning" onClick={() => setMode(1)}>Mode 1</IonButton>
          <IonButton className="button" color="warning" onClick={() => setMode(2)}>Mode 2</IonButton>
        </div>
        <div>
          {mode == 1 && dataMode1.map((item, index) => (
            <CardLeaderboard number={index+1} name={item.nama} point={item.point} />
          ))}
          {mode == 2 && dataMode2.map((item, index) => (
            <CardLeaderboard number={index+1} name={item.nama} point={item.point} />
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Leaderboard;
