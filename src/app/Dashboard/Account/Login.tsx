import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonButton, IonItem, IonLabel, IonInput, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/react';
import './Login.scss';

const Login: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <div className="login-wrapper">
          <IonGrid>
            <IonRow>
              <IonCol size="12">
                <div className="top-container">
                  <h1>Login</h1>
                </div>

                <div className="login-container">
                  <IonRow>
                    <IonCol size="12">
                      <IonItem color="dark">
                        <IonLabel position="floating">Email</IonLabel>
                        <IonInput type="email" placeholder=""></IonInput>
                      </IonItem>
                    </IonCol>
                    <IonCol size="12">
                      <IonItem color="dark">
                        <IonLabel position="floating">Password</IonLabel>
                        <IonInput placeholder=""></IonInput>
                      </IonItem>
                    </IonCol>     
                  </IonRow>

                  <IonButton color="dsb">Login</IonButton>

                  <div className="notes-container">
                    <p> If you have issues registering or logging into the Docent tool, please contact
                      <a href="mailto:support@mfgdocent.com?Subject=Support%20Request" target="_top"> support@mfgdocent.com.</a>
                    </p>
                  </div>
                </div>

                <div className="bottom-container">
                  <h6 id="register-link"> <a href="/register">Register for Docent</a> </h6>
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
