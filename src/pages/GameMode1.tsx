// React
import React, { useEffect, useState } from "react";

// Ionic
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

// Axios
import axios from "axios";
import { post, get } from "../services/api/axios/axiosClient";

// Icon
import { person } from "ionicons/icons";

// Style
import "../styles/GameMode1.css";

interface ChoiceAnswerProps {
  word: string;
}

const GameMode1: React.FC = () => {
  const randomWordEnglishAPI = import.meta.env.VITE_RANDOM_ENGLISH_WORD_URL;
  const randomWordIndoAPI = import.meta.env.VITE_RANDOM_INDO_WORD_URL;
  const randomWordIndoAPIKEY = import.meta.env.VITE_RANDOM_INDO_WORD_APIKEY;
  const translateWordAPI = import.meta.env.VITE_TRANSLATE_WORD_URL;
  const translateFrom = "en";
  const translateTo = "id";

  const [keyAnswer, setKeyAnswer] = useState<string>("");
  const [randomAnswer, setRandomAnswer] = useState<ChoiceAnswerProps[]>([]);
  const [answerChoice, setAnswerChoice] = useState<ChoiceAnswerProps[]>([]);

  const translateEnglishWord = async (word: string) => {
    try {
      const response = await post(
        `${translateWordAPI}?q=${word}&langpair=${translateFrom}|${translateTo}`
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const getRandomEnglishWord = async () => {
    try {
      const response = (await get(`${randomWordIndoAPI}`, {
        headers: {
          "X-Api-Key": randomWordIndoAPIKEY,
        },
      })) as any;
      console.log("Full Response", response);
      if (response.status === 200) {
        const { data } = response;
        const { word } = data || {};
        translateEnglishWord(word);
      } else {
        console.log("Failed to fetch data");
      }
    } catch (err) {
      console.log("Error ", err);
    }
  };

  useEffect(() => {
    getRandomEnglishWord();
  }, []);

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
          <IonButton color="warning" className="button-attack">
            Attack
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default GameMode1;
