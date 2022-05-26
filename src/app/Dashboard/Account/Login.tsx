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
    var user = await loginUser(newUser);
    if (user.data.user) {
      localStorage.setItem("token", user.data.token)
      localStorage.setItem("user", JSON.stringify(user.data.user))
      setShowToast(true);
      setToastMessage({message: "Logged in!", status: "success"});
      setNewUser({email: '', password: ''})
      history.push({
        pathname: `/home`
        // state: {
        //   assessment_id: assessmentInfo.id as number
        // }
      })
    } else if (user.data.message) {
      setShowToast(true);
      setToastMessage({message: "Error logging in, please try again", status: "danger"});
    }
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
              <IonButton color="dsb" routerLink="register">Register for Docent</IonButton>
            </IonCardContent>
          </IonCard>
          <IonCard className="login-card" color="dark">
            <IonCardContent className="inner-card-content">
              <h2>Login to Docent</h2>
              <IonItem color="tertiary">
                <IonLabel position="floating">Email</IonLabel>
                <IonInput name="email" value={newUser.email} onIonChange={handleChange}></IonInput>
              </IonItem>
              <IonItem color="tertiary">
                <IonLabel position="floating">Password</IonLabel>
                <IonInput name="password" value={newUser.password} onIonChange={handleChange} type="password"></IonInput>
              </IonItem>
              <IonButton onClick={loginNewUser} color="dsb">Login</IonButton>
              <h3>Forgot Your Password? <a href="/password-reset">Reset Here</a></h3>
            </IonCardContent>
          </IonCard>
        </div>

      </IonContent>
    </IonPage>

  )
}
export default Login;

//
// <IonGrid>
//   <IonRow>
//     <IonCol size="12">
//       <div className="top-container">
//         <h1>Login</h1>
//       </div>
//
//       <div className="login-container">
//         <IonRow>
//           <IonCol size="12">
//             <IonItem color="dark">
//               <IonLabel position="floating">Email</IonLabel>
//               <IonInput type="email" placeholder=""></IonInput>
//             </IonItem>
//           </IonCol>
//           <IonCol size="12">
//             <IonItem color="dark">
//               <IonLabel position="floating">Password</IonLabel>
//               <IonInput placeholder=""></IonInput>
//             </IonItem>
//           </IonCol>
//         </IonRow>
//
//         <IonButton color="dsb">Login</IonButton>
//
//         <div className="notes-container">
//           <p> If you have issues registering or logging into the Docent tool, please contact
//             <a href="mailto:support@mfgdocent.com?Subject=Support%20Request" target="_top"> support@mfgdocent.com.</a>
//           </p>
//         </div>
//       </div>
//
//       <div className="bottom-container">
//         <h6 id="register-link"> <a href="/register">Register for Docent</a> </h6>
//         <h6 id="forgot-password"><a href="/password-reset"> Forgot Password? </a> </h6>
//       </div>
//     </IonCol>
//   </IonRow>
// </IonGrid>
