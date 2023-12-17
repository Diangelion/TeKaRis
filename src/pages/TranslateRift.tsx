// React
import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router";

// Ionic
import {
  IonContent,
  IonIcon,
  IonPage,
  IonLoading,
  IonButton,
} from "@ionic/react";

// Component
import AlertDialogue from "../components/AlertDialogue";
import ConfirmationDialogue from "../components/ConfirmationDialogue";

// Axios
import { post, get } from "../services/api/axios/axiosClient";

// Icon
import { arrowBackCircle } from "ionicons/icons";

// Style
import "../styles/GameMode.scss";

// Asset

const TranslateRift: React.FC = () => {
  // Define variable
  const history = useHistory();
  const translateRef = useRef(false);
  const randomWordEnglishAPI = import.meta.env.VITE_RANDOM_ENGLISH_WORD_URL;
  const translateWordAPI = import.meta.env.VITE_TRANSLATE_WORD_URL;
  const translateFrom = "en";
  const translateTo = "id";

  // Define state
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [wordShown, setWordShown] = useState<string>("");
  const [keyAnswer, setKeyAnswer] = useState<string>("");
  const [answerChoice, setAnswerChoice] = useState<string[]>([]);
  const [hp, setHp] = useState<number>(3);
  const [score, setScore] = useState<number>(0);
  const [showConfirmationExit, setShowConfirmationExit] =
    useState<boolean>(false);
  const [showAlertDie, setShowAlertDie] = useState<boolean>(false);
  const [alertHeader, setAlertHeader] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string>("");

  // Function untuk generate random english word sebagai kata yang akan ditebak
  const generateWord = async () => {
    try {
      const response = (await get(
        `${randomWordEnglishAPI}/api?words=1&type=capitalized`
      )) as any;
      if (response && response?.status === 200) {
        const { data } = response;
        setWordShown(data[0]);
        getTranslation(data[0], true);
      } else {
        console.log("Failed to fetch data");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Function untuk melakukan translate terhadap kata english yang di dapat
  const getTranslation = async (
    word: string,
    isKey: boolean,
    last?: boolean
  ) => {
    try {
      const response = await post(
        `${translateWordAPI}?q=${word}&langpair=${translateFrom}|${translateTo}`
      );
      if (response && response.responseStatus === 200) {
        const newWord = response?.responseData?.translatedText;
        if (isKey) setKeyAnswer(newWord);
        setAnswerChoice((prevAnswerChoice) => [...prevAnswerChoice, newWord]);
        if (last) setIsLoading(false);
      } else {
        console.log(`Failed to translate word: ${word}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Function untuk mendapatkan kata bahasa indonesia
  const getRandomIndoWord = async () => {
    try {
      // Mendapatkan 2 kata bahasa inggris
      const response = (await get(
        `${randomWordEnglishAPI}/api?words=2&type=capitalized`
      )) as any;
      if (response && response?.status === 200) {
        const { data } = response;
        // 2 kata tadi dilakukan translate ke bahasa indonesia melalui function getTranslation
        data.forEach((item: string, index: number) => {
          getTranslation(item, false, index === data.length - 1);
        });
      } else {
        console.log("Failed to fetch data");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Function untuk pencocokan apakah kata translate yang dipilih user benar/salah
  const playerAnswer = (choice: string) => {
    let isPlayerAlive = true;
    if (choice == keyAnswer) {
      // Jika benar melakukan penambahan score sebanyak 100
      setScore(score + 100);
    } else {
      // Jika salah akan mengurangi 1 hp (hp awal sebanyak 3)
      setHp((prevHp) => {
        const newHp = prevHp - 1;
        if (newHp === 0) {
          isPlayerAlive = false;
          setWordShown("");
          setKeyAnswer("");
          setAnswerChoice([]);
          setAlertHeader("Game Over!");
          setAlertMessage("You have died.");
          setShowAlertDie(true);
        }
        return newHp;
      });
    }
    setWordShown("");
    setKeyAnswer("");
    setAnswerChoice([]);
    if (!isPlayerAlive) return;
    generateWord();
    getRandomIndoWord();
  };

  // Function untuk exit/kembali ke home ketika game masih berjalan (player belum mati)
  const handleExit = () => {
    setAlertHeader("Exit match?");
    setAlertMessage("Are you sure want to exit?");
    setShowConfirmationExit(true);
  };

  // Function untuk handle back
  const handleDie = () => {
    history.goBack();
  };

  // Menjalakna fungsi generateWord() dan getRandomIndoWord ketika pertama kali component mount
  useEffect(() => {
    if (translateRef.current === false) {
      generateWord();
      getRandomIndoWord();
    }
    return () => {
      translateRef.current = true;
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
                <h1>Translate Rift</h1>
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
                  <h2>{wordShown}</h2>
                </div>

                <div className="choice-section">
                  {answerChoice.map((choice, i) => {
                    return (
                      <IonButton
                        key={i}
                        className="choice-ion-button"
                        onClick={() => {
                          playerAnswer(choice);
                        }}
                      >
                        {choice}
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

export default TranslateRift;
