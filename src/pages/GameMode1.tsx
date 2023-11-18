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

  // Yang axel tambah
  const [englishWord, setEnglishWord] = useState<string>("");
  const [translatedWord, setTranslatedWord] = useState<string>("");
  const [bahasaWord1, setBahasaWord1] = useState<string>("");
  const [bahasaWord2, setBahasaWord2] = useState<string>("");
  const [answer, setAnswer] = useState<string[]>([]);
  const [lives, setLives] = useState<number>(3);
  const [score, setScore] = useState<number>(0);

  const shuffleAnswer = (array: string[]) => {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  const playerAnswer = (answerWord: string) => {
    if(answerWord == translatedWord) {
      setScore(score + 100);
    }
    else {
      setLives(lives - 1);
    }
    generateWord();
  }

  const generateWord = () => {
    // Generate random english word
    axios.get(randomWordEnglishAPI).then((response) => {
      setEnglishWord(response.data[0]);
      // Translate english word
      const url = `${translateWordAPI}?q=${response.data[0]}&langpair=${translateFrom}|${translateTo}`;
      axios.get(url).then((response) => {
        setTranslatedWord(response.data.matches[0].translation);
      });
    });

    // Generate random bahasa word 1
    axios.get(randomWordIndoAPI, {
      headers: {
        "X-Api-Key": randomWordIndoAPIKEY
      }
    }).then((response) => {
      setBahasaWord1(response.data.word);
    });

    // Generate random bahasa word 2
    axios.get(randomWordIndoAPI, {
      headers: {
        "X-Api-Key": randomWordIndoAPIKEY
      }
    }).then((response) => {
        setBahasaWord2(response.data.word);
    });
  }

  useEffect(() => {
    generateWord();
  }, []);

  // Insert answer to array
  useEffect(() => {
    const answerArray = [translatedWord, bahasaWord1, bahasaWord2];
    setAnswer(shuffleAnswer(answerArray));
    // setAnswer([translatedWord, bahasaWord1, bahasaWord2]);
  }, [translatedWord])

  useEffect(() => {
    console.log(answer);
  }, [answer]);

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
          <IonLabel className="text-mode">Score: {score}</IonLabel>
          <IonLabel className="soal">{englishWord}</IonLabel>
          <div className="box-player">
            <div className="player">
              <IonLabel className="player-hp">LIVES: {lives}</IonLabel>
              <IonIcon className="player-icon" icon={person} />
            </div>
          </div>
          <div className="box-answer">
            {answer.map((word) => {
              return (
                <IonButton color="warning" className="button-answer" onClick={() => {playerAnswer(word)}}>
                  {word}
                </IonButton>
              )
            })}
          </div>
          {/* <IonItem className="input" color="warning">
            <IonLabel position="floating">INPUT WORD</IonLabel>
            <IonInput></IonInput>
          </IonItem>
          <IonButton color="warning" className="button-attack">
            Attack
          </IonButton> */}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default GameMode1;
