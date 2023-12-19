import { IonButton, IonContent, IonPage, IonIcon } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

// Icon
import { arrowBackCircle } from "ionicons/icons";

// Component
import CardLeaderboard from "../components/CardLeaderboard";

// Firestore
import { getTopScores } from "../firebaseConfig";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  where,
  query,
} from "firebase/firestore";

// Styling
import "../styles/Leaderboard.scss";

interface UserScore {
  nama: string;
  point: number;
}

const Leaderboard: React.FC = () => {
  // Define variables
  const history = useHistory();

  // Define state
  const [mode, setMode] = useState<number>(1);
  const [scoreMode1, setScoreMode1] = useState<UserScore[]>([]);
  const [scoreMode2, setScoreMode2] = useState<UserScore[]>([]);

  useEffect(() => {
    const fetchTopScore = async () => {
      try {
        const { topScores1, topScores2 } = await getTopScores();
    
        // Set top score mode 1
        const updatedScoreMode1 = topScores1.map((item) => ({
          nama: item.name,
          point: item.score,
        }));
        setScoreMode1(updatedScoreMode1);

        // Set top score mode 2
        const updatedScoreMode2 = topScores2.map((item) => ({
          nama: item.name,
          point: item.score,
        }));
        setScoreMode2(updatedScoreMode2);
        
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchTopScore();
  },[]);

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
          {mode == 1 && scoreMode1.length > 0 &&
            scoreMode1.map((item, index) => (
              <CardLeaderboard
                key={index}
                number={index + 1}
                name={item.nama}
                point={item.point.toString()}
              />
            ))}
          {mode == 2 && scoreMode2.length > 0 &&
            scoreMode2.map((item, index) => (
              <CardLeaderboard
                key={index}
                number={index + 1}
                name={item.nama}
                point={item.point.toString()}
              />
            ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Leaderboard;
