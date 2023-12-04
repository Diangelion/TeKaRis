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
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../firebaseConfig";


import "../styles/GameMode1.css";

const db = getFirestore(app);

interface Question {
  id: string;
  question: string;
  answers: string[];
  correctAnswer: string;
}

let currentQuestionIndex = -1;
let pertanyaan: Question[] = [];

const getNextQuestion = async () => {
  try {
    if (currentQuestionIndex === -1 || currentQuestionIndex === pertanyaan.length - 1) {
      const soalCollectionRef = collection(db, 'Soal');
      const snapshot = await getDocs(soalCollectionRef);
      pertanyaan = snapshot.docs.map((doc) => ({
        id: doc.id,
        question: doc.data().Soal,
        answers: [doc.data().p1, doc.data().p2, doc.data().p3, doc.data().p4],
        correctAnswer: doc.data().Jawaban,
      }));
      currentQuestionIndex = 0;
    } else {
      currentQuestionIndex++;
    }

    const currentQuestion = pertanyaan[currentQuestionIndex];

    console.log('Question:', currentQuestion.question);
    console.log('Possible Answers:', currentQuestion.answers);
    console.log('Correct Answer:', currentQuestion.correctAnswer);

  } catch (error) {
    console.error('Error retrieving data from Firestore:', error);
  }
};



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
          <IonButton onClick={getNextQuestion}color="warning" className="button-attack">
            Attack
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default GameMode1;
