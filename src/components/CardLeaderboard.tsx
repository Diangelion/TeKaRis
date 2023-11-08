import {
    IonButton,
    IonCard,
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

import "../styles/CardLeaderboard.css";

const CardLeaderboard:React.FC<{number: number, name: string, point: string}> = props => {
    return (
        <IonCard className="card-leaderboard ion-padding" color="warning">
            <div>
                <IonLabel className="card-number" >{props.number}</IonLabel>
                <IonIcon className="card-image" icon={person} />
                <IonLabel className="card-name">{props.name}</IonLabel>
            </div>
            <IonLabel className="card-point">{props.point}</IonLabel>
        </IonCard>
    )
}

export default CardLeaderboard;