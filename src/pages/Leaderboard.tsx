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
        <div>
          <CardLeaderboard number={1} name="John Wick" point="10,000" />
          <CardLeaderboard number={2} name="Rici" point="9,500" />
          <CardLeaderboard number={3} name="John Doe" point="9,200" />
          <CardLeaderboard number={4} name="John John" point="9,000" />
          <CardLeaderboard number={5} name="Bobby" point="8,100" />
          <CardLeaderboard number={6} name="Edu" point="7,800" />
          <CardLeaderboard number={7} name="Axel" point="7,500" />
          <CardLeaderboard number={8} name="John John John" point="7,300" />
          <CardLeaderboard number={9} name="John Rici" point="7,100" />
          <CardLeaderboard number={10} name="John Cena" point="7,000" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Leaderboard;
