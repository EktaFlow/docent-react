import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonButton, IonItem, IonLabel, IonInput, IonIcon, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/react';
import './Register.scss';
import Header from '../../Framework/LoginHeader';
const Register: React.FC = () => {
  return (
    <IonPage>
      <Header />
      <IonContent>
        <IonCard>
          <div className="register-wrapper">
            <IonGrid>
              <IonRow>
                <IonCol size="12">
                  <div className="register-container">
                    <div className="top-container">
                      <h1>Register</h1>
                    </div>
                    <IonRow>
                      <IonCol class="logo" size="6" >
                        <img src="assets/docentLogo.png" width="400" height="120"></img>
                      </IonCol>
                      
                      <IonCol size="6">
                        <IonItem>
                          <IonLabel position="floating"><IonIcon name="person-outline"></IonIcon>First Name</IonLabel>
                          <IonInput placeholder=""></IonInput>
                        </IonItem>
                      
                        <IonItem>
                          <IonLabel position="floating"><IonIcon name="person-outline"></IonIcon>Last Name</IonLabel>
                          <IonInput placeholder=""></IonInput>
                        </IonItem>

                        <IonItem>
                          <IonLabel position="floating"><IonIcon name="mail"></IonIcon>Email</IonLabel>
                          <IonInput type="email" placeholder=""></IonInput>
                        </IonItem>

                        <IonItem>
                          <IonLabel position="floating"><IonIcon name="lock-closed-outline"></IonIcon>Password</IonLabel>
                          <IonInput placeholder=""></IonInput>
                        </IonItem>

                        <IonItem>
                          <IonLabel position="floating"><IonIcon name="lock-closed-outline"></IonIcon>Repeat Password</IonLabel>
                          <IonInput placeholder=""></IonInput>
                        </IonItem>

                        <IonButton color="dsb">Register</IonButton>

                        <div className="notes-container">
                          <p>
                            <b>Passwords must be at least 10 characters in length, with at least one digit, special character, and uppercase letter.</b>
                          </p>
                        </div>
                      </IonCol>
                    </IonRow>                
                  </div>

                  <div className="bottom-container">
                    <h6 id="register-link"> <a href="/login">Back to Login</a> </h6>
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>

        </IonCard>

      </IonContent>
    </IonPage>

  )
}
export default Register;
