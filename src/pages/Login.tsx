import {
  IonContent,
  IonPage,
  IonItem,
  IonLabel,
  IonImg,
  IonList,
  IonInput,
} from "@ionic/react";
import React from "react";

const Login: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <IonItem>
          <IonLabel className="ion-text-center">
            <IonImg
              src="https://docs-demo.ionic.io/assets/madison.jpg"
              alt="The Wisconsin State Capitol building in Madison, WI at night"
            ></IonImg>
            <h1>LOGIN</h1>
          </IonLabel>
        </IonItem>

        <IonList>
          <IonItem>
            <IonInput
              label="Email"
              labelPlacement="floating"
              placeholder="Enter your email"
            ></IonInput>
          </IonItem>
        </IonList>

        <IonList>
          <IonItem>
            <IonInput
              label="Password"
              labelPlacement="floating"
              placeholder="Enter your password"
            ></IonInput>
          </IonItem>
        </IonList>

        <div>
          <small>
            Does not have an account? <a href="/register">Register</a>
          </small>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
