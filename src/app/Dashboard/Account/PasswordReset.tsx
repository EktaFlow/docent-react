import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonButton, IonItem, IonLabel, IonInput,IonIcon, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/react';
import './PasswordReset.scss';
import Header from '../../Framework/LoginHeader';

const PasswordReset: React.FC = () => {
  return (
    <IonPage>
      <Header />
      <IonContent>
        <div className="password-wrapper">
          <IonGrid>
            <IonRow>
              <IonCol class="logo"  size="6">
                <img src="assets/docentLogo.png" width="400" height="120"></img>
              </IonCol>
              <IonCol size="6">
                <div className="password-container">
                  <IonRow>
                    <IonCol size="12">  
                      <div className="top-container">
                        <h1>Reset Password</h1>
                      </div>
                    </IonCol>
                    <IonCol size="12">
                      <IonItem>
                        <IonLabel position="floating"><IonIcon name="mail"></IonIcon>Email</IonLabel>
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
