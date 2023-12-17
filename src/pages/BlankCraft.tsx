import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";

import {
  IonButton,
  IonContent,
  IonIcon,
  IonPage,
  IonLoading,
} from "@ionic/react";

// Component
import AlertDialogue from "../components/AlertDialogue";
import ConfirmationDialogue from "../components/ConfirmationDialogue";

// Firebase
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

// Icons
import { arrowBackCircle } from "ionicons/icons";

// Style
import "../styles/GameMode.scss";

// Define data type untuk state question
interface QuestionProps {
  id: string;
  question: string;
  answers: string[];
  correctAnswer: string;
}

const BlankCraft: React.FC = () => {
  // Define variable
  const history = useHistory();
  const blankRef = useRef(false);

  // Define state
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [question, setQuestion] = useState<QuestionProps[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [hp, setHp] = useState<number>(3);
  const [score, setScore] = useState<number>(0);
  const [showConfirmationExit, setShowConfirmationExit] =
    useState<boolean>(false);
  const [showAlertDie, setShowAlertDie] = useState<boolean>(false);
  const [alertHeader, setAlertHeader] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string>("");

  // Function untuk melakukan get all question, beserta optionnya, dan kunci jawabannya dari firebase
  const generateQuestion = async () => {
    try {
      const soalCollectionRef = collection(db, "Soal");
      const snapshot = await getDocs(soalCollectionRef);
      const newQuestions = snapshot.docs.map((doc) => ({
        id: doc.id,
        question: doc.data().Soal,
        answers: [doc.data().p1, doc.data().p2, doc.data().p3, doc.data().p4],
        correctAnswer: doc.data().Jawaban,
      }));

      setQuestion(newQuestions);
      generateRandomIndex(newQuestions);
      setIsLoading(false);
    } catch (err) {
      console.error("Error retrieving data from Firestore:", err);
    }
  };

  // Function untuk generate random index dari 0 hingga object array question.length-1 sehingga index soal yang akan muncul random, tidak selalu sama
  const generateRandomIndex = (data: QuestionProps[]) => {
    setCurrentIndex(
      data.length === 0 ? 0 : Math.floor(Math.random() * data.length - 1)
    );
  };

  // Function untuk pengecekan jawaban pengguna
  const answerCheck = (answer: string) => {
    let isPlayerAlive = true;
    if (answer == question[currentIndex]?.correctAnswer) {
      // Jika benar, menambahkan poin sebanyak 100
      setScore(score + 100);
    } else {
      // Jika salah, mengurangi 1 hp (inisialisasi hp awal sebanyak 3)
      setHp((prevHp) => {
        const newHp = prevHp - 1;
        if (newHp === 0) {
          isPlayerAlive = false;
          setAlertHeader("Game Over!");
          setAlertMessage("You have died.");
          setShowAlertDie(true);
        }
        return newHp;
      });
    }
    if (!isPlayerAlive) return;
    generateRandomIndex(question);
  };

  // Function untuk handle exit ketika sedang dalam match
  const handleExit = () => {
    setAlertHeader("Exit match?");
    setAlertMessage("Are you sure want to exit?");
    setShowConfirmationExit(true);
  };

  // Function untuk kembali ke halaman home
  const handleDie = () => {
    history.goBack();
  };

  useEffect(() => {
    if (blankRef.current === false) {
      generateQuestion();
    }

    return () => {
      blankRef.current = true;
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <IonLoading isOpen={isLoading} spinner="circles" />
      ) : (
        <IonPage className="GameModePage">
          <IonContent className="ion-padding">
            <div className="header-section">
              <div className="header-exit-section">
                <IonIcon
                  icon={arrowBackCircle}
                  size="large"
                  onClick={handleExit}
                ></IonIcon>
                <h1>Blank Craft</h1>
              </div>

              <h2>Current Score: {score}</h2>
            </div>

            {showAlertDie ? (
              <AlertDialogue
                header={alertHeader}
                message={alertMessage}
                actionText="Confirm"
                action={handleDie}
              />
            ) : showConfirmationExit ? (
              <ConfirmationDialogue
                header={alertHeader}
                message={alertMessage}
                actionText1="Stay"
                actionText2="Exit"
                action1={() => setShowConfirmationExit(false)}
                action2={handleDie}
              />
            ) : (
              <>
                <div className="content-section">
                  <h2>{question[currentIndex]?.question}</h2>
                </div>

                <div className="choice-section">
                  {question[currentIndex]?.answers.map((answer, i) => {
                    return (
                      <IonButton
                        key={i}
                        className="choice-ion-button"
                        onClick={() => {
                          answerCheck(answer);
                        }}
                      >
                        {answer}
                      </IonButton>
                    );
                  })}
                </div>
              </>
            )}
          </IonContent>
        </IonPage>
      )}
    </>
  );
};

export default BlankCraft;
