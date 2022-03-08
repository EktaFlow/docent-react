
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonButton, IonItem, IonLabel, IonInput, IonTitle, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonIcon, IonHeader, IonToolbar, } from '@ionic/react';
import React, {useState} from 'react';
import './Login.scss';
import Header from '../../Framework/LoginHeader';

const Login: React.FC = () => {
  return (
    <IonPage>
      <Header />
      <IonContent>
        <div className="login-wrapper">
          <IonGrid>
            <IonRow>
              <IonCol class="logo" size="6">
                <img src="assets/docentLogo.png" width="400" height="120"></img>
              </IonCol>
              <IonCol size="6">
                <IonCard class="login-container">
                  <IonCardHeader>
                    <IonCardTitle >Log in to Docent Portal</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonItem>
                      <IonLabel position="floating"><IonIcon name="mail"></IonIcon>Email</IonLabel>
                      <IonInput type="email" placeholder=""></IonInput>
                    </IonItem>
                    <IonItem>
                      <IonLabel position="floating"><IonIcon name="lock-closed-outline"></IonIcon>Password</IonLabel>
                      <IonInput placeholder=""></IonInput>
                    </IonItem>
                    <IonButton color="dsb">Log in to Docent Portal</IonButton>
                  </IonCardContent>
                </IonCard>
                <div className="bottom-container">
                      <p> If you have issues registering or logging into the Docent tool, please contact
                        <a href="mailto:support@mfgdocent.com?Subject=Support%20Request" target="_top"> support@mfgdocent.com.</a>
                      </p>
                </div>
                <div className="bottom-container">
                    <h6 id="forgot-password"><a href="/password-reset"> Forgot Password? </a> </h6>
                  </div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>

  )
}
export default Login;
