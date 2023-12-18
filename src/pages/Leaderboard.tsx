import { IonButton, IonContent, IonPage, IonIcon } from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router";

// Icon
import { arrowBackCircle } from "ionicons/icons";

// Component
import CardLeaderboard from "../components/CardLeaderboard";

// Styling
import "../styles/Leaderboard.scss";

interface dataLeaderboard {
  nama: string;
  point: string;
}

const Leaderboard: React.FC = () => {
  // Define variables
  const history = useHistory();

  // Define state
  const [mode, setMode] = useState<number>(1);
  const [dataMode1, setDataMode1] = useState<dataLeaderboard[]>([
    {
      nama: "John Wick",
      point: "10,000",
    },
    {
      nama: "John Wick",
      point: "10,000",
    },
    {
      nama: "John Wick",
      point: "10,000",
    },
    {
      nama: "John Wick",
      point: "10,000",
    },
    {
      nama: "John Wick",
      point: "10,000",
    },
    {
      nama: "John Wick",
      point: "10,000",
    },
    {
      nama: "John Wick",
      point: "10,000",
    },
    {
      nama: "John Wick",
      point: "10,000",
    },
    {
      nama: "John Wick",
      point: "10,000",
    },
    {
      nama: "John Wick",
      point: "10,000",
    },
  ]);

  const [dataMode2, setDataMode2] = useState<dataLeaderboard[]>([
    {
      nama: "John Doe",
      point: "11,000",
    },
    {
      nama: "John Doe",
      point: "11,000",
    },
    {
      nama: "John Doe",
      point: "11,000",
    },
    {
      nama: "John Doe",
      point: "11,000",
    },
    {
      nama: "John Doe",
      point: "11,000",
    },
    {
      nama: "John Doe",
      point: "11,000",
    },
    {
      nama: "John Doe",
      point: "11,000",
    },
    {
      nama: "John Doe",
      point: "11,000",
    },
    {
      nama: "John Doe",
      point: "11,000",
    },
    {
      nama: "John Doe",
      point: "11,000",
    },
  ]);

  return (
    <IonPage id="LeaderboardPage">
      <IonContent className="ion-padding">
        <div className="header-section">
          <IonIcon
            icon={arrowBackCircle}
            size="large"
            onClick={() => history.goBack()}
          ></IonIcon>
          <h1>Leaderboard</h1>
        </div>

        <div className="choose-mode-section">
          <IonButton
            className="button"
            color="warning"
            onClick={() => setMode(1)}
          >
            Mode 1
          </IonButton>
          <IonButton
            className="button"
            color="warning"
            onClick={() => setMode(2)}
          >
            Mode 2
          </IonButton>
        </div>

        <div className="leaderboard-content-section">
          {mode == 1 &&
            dataMode1.map((item, index) => (
              <CardLeaderboard
                number={index + 1}
                name={item.nama}
                point={item.point}
              />
            ))}
          {mode == 2 &&
            dataMode2.map((item, index) => (
              <CardLeaderboard
                number={index + 1}
                name={item.nama}
                point={item.point}
              />
            ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Leaderboard;
