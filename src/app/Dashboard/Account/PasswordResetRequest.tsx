import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonButton, IonItem, IonLabel, IonInput, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonToast } from '@ionic/react';
import './PasswordReset.scss';
import React, {useEffect, useState} from 'react';
import {sendPasswordReset} from '../../../api/api';

const PasswordResetRequest: React.FC = (props:any) => {
  const [email, setEmail] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({message: '', status: ''})

  async function sendPwdReset(){
    console.log('here');
    if (email != '') {
      var next_question = await sendPasswordReset(email)
        .then((res) => {
          setToastMessage({message: 'Check your email for password reset link', status: 'success'})
          setShowToast(true)
        })
        .catch((error) => {
          setToastMessage({message: 'Error requesting password, please make sure you have an account', status: 'danger'})
          setShowToast(true)
        })
    }
  }

  const updateEmail = (e:any) => {
    setEmail(e.target.value)
  }

  return (
    <IonPage>
      <IonContent>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          position="bottom"
          message={toastMessage.message}
          color={toastMessage.status}
        />
        <div className="password-wrapper">
          <IonGrid>
            <IonRow>
              <IonCol size="12">
                <div className="top-container">
                  <h1>Request to Reset Password</h1>
                </div>

                <div className="password-container">
                  <IonRow>
                    <IonCol size="12">
                      <IonItem color="dark">
                        <IonLabel position="floating">Email</IonLabel>
                        <IonInput value={email} onIonChange={updateEmail} type="email" placeholder=""></IonInput>
                      </IonItem>
                    </IonCol>
                  </IonRow>

                  <IonButton color="dsb" onClick={sendPwdReset}>Reset</IonButton>

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
export default PasswordResetRequest;
// e.target.value ? setEmail(e.target.value) : null
