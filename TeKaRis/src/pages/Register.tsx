import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React, { useContext, useRef, useState } from 'react';

import "../styles/Register.css";

const Register: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>

            </IonHeader>
            <IonContent color="dark" className="ion-text-center">
                <div className="border-logo">
                    <IonLabel className="logo">TeKaRis</IonLabel>
                    <IonLabel className="judul">Register</IonLabel>
                </div>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonItem className="input" color="medium">
                                <IonLabel position="floating">Enter your name</IonLabel>
                                <IonInput></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem className="input" color="medium">
                                <IonLabel position="floating">Enter your email </IonLabel>
                                <IonInput></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem className="input" color="medium">
                                <IonLabel position="floating">Enter your password</IonLabel>
                                <IonInput></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem className="input" color="medium">
                                <IonLabel position="floating">Enter your coofirm password</IonLabel>
                                <IonInput></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonButton routerLink="/home">
                                Register
                            </IonButton>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonLabel className="text-font">Already have an account? </IonLabel>
                            <IonButton routerLink="/login" className="text-font">Login</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
};

export default Register;