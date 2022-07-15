import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonButton, IonItem, IonLabel, IonInput, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonToast } from '@ionic/react';
import './Login.scss';
import React, {useState, useEffect} from 'react'
import {resetPassword} from '../../../api/api';
import axios from 'axios';

const PasswordReset: React.FC = (props:any) => {
  const [newPwd, setNewPwd] = useState({password: '', password_confirmation: '', reset_password_token: ''});
  const [showToast, setShowToast] = useState(false);
  const [disableClick, setDisableClick] = useState(false);
  const [toastMessage, setToastMessage] = useState({message: '', status: ''})

  const handleChange = (e:any) => {
    setNewPwd({
      ...newPwd,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    if (window.location.search != ''){
      var fetchT = window.location.search.split('=')
      // console.log(window.location.search)
      if(fetchT.length >= 2){
        setNewPwd({
          ...newPwd,
          reset_password_token: fetchT[1]
        })
      }
    }
  }, [])



  async function resetPwd() {
    // var user = await registerUser(newPwd);
    setDisableClick(true)
    const result = await resetPassword(newPwd)
    .then((res) => {
      console.log(res);
      if (res.status == 200){
        setToastMessage({message: 'Your Password has been reset. Please log in to continue', status: 'success'})
        setShowToast(true);
        setDisableClick(false)
      }
    }).catch((error) => {
      console.log(error);
        setToastMessage({message: 'Error resetting your password. Please try again', status: 'danger'})
        setShowToast(true);
        setDisableClick(false)
    })

  }

  return (
    <IonPage>
      <IonContent>
        <div className="login-wrapper">
          <IonCard className="info-card" color="dark">
            <IonCardContent className="inner-card-content">
              <h1>docent</h1>
              <h3>Prove your readiness</h3>
              <p><b>The Ultimate Manufacturing Readiness assessment tool.</b> <br/>Docent is an assessment collaboration and guidance tool for completing MRAs, or Manufacturing Readiness Assessments.</p>
              <IonButton href="https://mfgdocent.com" color="dsb">Learn More</IonButton>
              <IonButton color="dsb" routerLink="login">Login to Docent</IonButton>
            </IonCardContent>
          </IonCard>
          <IonCard className="login-card" color="dark">
            <IonCardContent className="inner-card-content">
              <h2>Reset Your Docent Password</h2>
              <IonItem color="tertiary">
                <IonLabel position="floating">New Password</IonLabel>
                <IonInput name="password" value={newPwd.password} onIonChange={handleChange} type="password"></IonInput>
              </IonItem>
              <IonItem color="tertiary">
                <IonLabel position="floating">Confirm New Password</IonLabel>
                <IonInput name="password_confirmation" onIonChange={handleChange} value={newPwd.password_confirmation} type="password"></IonInput>
              </IonItem>
              <IonButton onClick={resetPwd} color="dsb" disabled={disableClick}>Reset Password</IonButton>
            </IonCardContent>
          </IonCard>
          <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            position="bottom"
            message={toastMessage.message}
            color={toastMessage.status}
            buttons={[
              {
                text: 'Done',
                role: 'cancel',
                handler: () => {
                  console.log('Cancel clicked');
                }
              }
            ]}
          />
        </div>

      </IonContent>
    </IonPage>

  )
}
export default PasswordReset;
