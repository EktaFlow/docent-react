import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonButton, IonItem, IonLabel, IonInput, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/react';
import './Register.scss';

const Register: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <div className="register-wrapper">
          <IonGrid>
            <IonRow>
              <IonCol size="12">
                <div className="top-container">
                  <h1>Register</h1>
                </div>

                <div className="register-container">
                  <IonRow>
                    <IonCol size="12">
                      <IonItem color="dark">
                        <IonLabel position="floating">Name</IonLabel>
                        <IonInput placeholder=""></IonInput>
                      </IonItem>
                    </IonCol>
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
                    <IonCol size="12">
                      <IonItem color="dark">
                        <IonLabel position="floating">Repeat Password</IonLabel>
                        <IonInput placeholder=""></IonInput>
                      </IonItem>
                    </IonCol>
                  </IonRow>                  

                  <IonButton color="dsb">Register</IonButton>

                  <div className="notes-container">
                    <p>
                      <b>Passwords must be at least 10 characters in length, with at least one digit, special character, and uppercase letter.</b>
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
export default Register;
