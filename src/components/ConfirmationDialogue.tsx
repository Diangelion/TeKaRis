import React from "react";
import { IonAlert } from "@ionic/react";

interface ConfirmationDialogueProps {
  header: string;
  message: string;
  actionText1: string;
  actionText2: string;
  action1: () => void;
  action2: () => void;
}

const ConfirmationDialogue: React.FC<ConfirmationDialogueProps> = ({
  header,
  message,
  actionText1,
  actionText2,
  action1,
  action2,
}) => {
  return (
    <IonAlert
      isOpen={true}
      backdropDismiss={false}
      header={header}
      message={message}
      buttons={[
        {
          text: actionText1,
          role: "cancel",
          handler: action1,
        },
        {
          text: actionText2,
          role: "confirm",
          handler: action2,
        },
      ]}
    ></IonAlert>
  );
};

export default ConfirmationDialogue;
