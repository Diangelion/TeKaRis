import React from "react";
import { IonAlert } from "@ionic/react";

interface AlertDialogueProps {
  header: string;
  message: string;
  actionText: string;
  action: () => void;
}

const AlertDialogue: React.FC<AlertDialogueProps> = ({
  header,
  message,
  actionText,
  action,
}) => {
  return (
    <IonAlert
      isOpen={true}
      backdropDismiss={false}
      header={header}
      message={message}
      buttons={[
        {
          text: actionText,
          handler: action,
        },
      ]}
    ></IonAlert>
  );
};

export default AlertDialogue;
