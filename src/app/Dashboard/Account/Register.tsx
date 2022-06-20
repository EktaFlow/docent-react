import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonButton, IonItem, IonLabel, IonInput, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonToast } from '@ionic/react';
import './Login.scss';
import React, {useState, useEffect} from 'react'
import {registerUser} from '../../../api/api';
import axios from 'axios';
import { apiUrl } from '../../../api/constants.js';

const Register: React.FC = () => {
  const [newUser, setNewUser] = useState({email: '', company_name: '', password: '', name: '', password_confirmation: ''});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({message: '', status: ''})

  const handleChange = (e:any) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    })
  }

  async function registerNewUser() {
    // var user = await registerUser(newUser);
    const result = await registerUser(newUser)
    .then((res) => {
      console.log(res);
      if (res.message == 'Signed up.'){
        setToastMessage({message: 'Registration Successful! Please check your email to confirm your account before logging in.', status: 'success'})
        setShowToast(true);
      } else if (res.message == 'Signed up failure.') {
        if (res.errors){
          var e = ''
          res.errors.forEach((ee:any) => {
            e = e + ' ' + ee + ';'
          })
          setToastMessage({message: e, status: 'danger'})
        } else {
          setToastMessage({message: 'Error registring your account. Please try again', status: 'danger'})
        }

        setShowToast(true);
      }
    }).catch((error) => {
      console.log(error);
      if (error == 'You have to confirm your email address before continuing.'){
        setToastMessage({message: 'Registration Successful! Please check your email to confirm your account before logging in.', status: 'success'})
        setShowToast(true);
      } else {
        setToastMessage({message: 'Error registring your account. Please try again', status: 'danger'})
      }
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
              <h2>Register for Docent</h2>
              <IonItem color="tertiary">
                <IonLabel position="floating">Name</IonLabel>
                <IonInput name="name" value={newUser.name} onIonChange={handleChange}></IonInput>
              </IonItem>
              <IonItem color="tertiary">
                <IonLabel position="floating">Company Name</IonLabel>
                <IonInput name="company_name" value={newUser.company_name} onIonChange={handleChange}></IonInput>
              </IonItem>
              <IonItem color="tertiary">
                <IonLabel position="floating">Email</IonLabel>
                <IonInput name="email" value={newUser.email} onIonChange={handleChange}></IonInput>
              </IonItem>
              <IonItem color="tertiary">
                <IonLabel position="floating">Password</IonLabel>
                <IonInput name="password" value={newUser.password} onIonChange={handleChange} type="password"></IonInput>
              </IonItem>
              <IonItem color="tertiary">
                <IonLabel position="floating">Confirm Password</IonLabel>
                <IonInput name="password_confirmation" onIonChange={handleChange} value={newUser.password_confirmation} type="password"></IonInput>
              </IonItem>
              <IonButton onClick={registerNewUser} color="dsb">Register</IonButton>
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
export default Register;
