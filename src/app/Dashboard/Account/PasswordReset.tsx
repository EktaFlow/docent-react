import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonButton, IonItem, IonLabel, IonInput, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/react';
import './PasswordReset.scss';

const PasswordReset: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <div className="password-wrapper">
          <IonGrid>
            <IonRow>
              <IonCol size="12">
                <div className="top-container">
                  <h1>Reset Password</h1>
                </div>

                <div className="password-container">
                  <IonRow>
                    <IonCol size="12">
                      <IonItem color="dark">
                        <IonLabel position="floating">Email</IonLabel>
                        <IonInput type="email" placeholder=""></IonInput>
                      </IonItem>
                    </IonCol>
                  </IonRow>

                  <IonButton color="dsb">Reset</IonButton>

                  <div className="notes-container">
                    <p>
                      <b>Enter a valid Docent account email, and instructions to reset your password will be mailed.</b>
                    </p>
                  </div>
                </div>

                <div className="bottom-container">
                  <h6 id="register-link"> <a href="/login">Back to Login</a> </h6>
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>

      </IonContent>
    </IonPage>

  )
}
export default PasswordReset;
