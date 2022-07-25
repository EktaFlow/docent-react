import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonButton, IonItem, IonLabel, IonInput, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonToast } from '@ionic/react';
import './Login.scss';
import React, {useState, useEffect} from 'react'
import {loginUser} from '../../../api/api';
import { useHistory } from 'react-router-dom';
import { useIntercom } from 'react-use-intercom';

const Login: React.FC = () => {
  const [newUser, setNewUser] = useState({email: '', password: ''});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({message: '', status: ''})
  const history = useHistory();
  const handleChange = (e:any) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    })
  }


  async function loginNewUser() {
    var user = await loginUser(newUser)
    .then((response:any) => {
      console.log('here in response')
      console.log(response);
      localStorage.setItem("token", response.token)
      localStorage.setItem("user", JSON.stringify(response.user))
      setToastMessage({message: "Logged in!", status: "success"});
      setShowToast(true);
      setNewUser({email: '', password: ''})
      history.push({
        pathname: `/home`
      })
    }).catch((error:any) => {
      console.log('here in error')
      console.log(error)
      setToastMessage({message: "Error logging in, please try again", status: "danger"});
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    })
  }

  return (
    <IonPage>
      <IonContent>
        <div className="login-wrapper">
          <IonCard className="info-card" color="docentlight"   >
            <IonCardContent className="inner-card-content">
              <h1>docent</h1>
              <h3>Prove your readiness</h3>
              <p><b>The Ultimate Manufacturing Readiness assessment tool.</b> <br/>Docent is an assessment collaboration and guidance tool for completing MRAs, or Manufacturing Readiness Assessments.</p>
              <IonButton href="https://mfgdocent.com" color="dsb">Learn More</IonButton>
              <IonButton color="dsb" routerLink="register">Register for Docent</IonButton>
            </IonCardContent>
          </IonCard>
          <IonCard className="login-card" color="docentlight"   >
            <IonCardContent className="inner-card-content">
              <h2>Login to Docent</h2>
              <IonItem color="docenttertiary">
                <IonLabel position="floating">Email</IonLabel>
                <IonInput name="email" value={newUser.email} onIonChange={handleChange}></IonInput>
              </IonItem>
              <IonItem color="docenttertiary">
                <IonLabel position="floating">Password</IonLabel>
                <IonInput name="password" value={newUser.password} onIonChange={handleChange} type="password"></IonInput>
              </IonItem>
              <IonButton onClick={loginNewUser} color="dsb">Login</IonButton>
              <h3>Forgot Your Password? <a href="/password-reset-request">Reset Here</a></h3>
            </IonCardContent>
          </IonCard>
        </div>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          position="bottom"
          message={toastMessage.message}
          color={toastMessage.status}
          duration={3000}
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

      </IonContent>
    </IonPage>

  )
}
export default Login;
