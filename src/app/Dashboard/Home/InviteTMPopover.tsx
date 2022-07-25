import React, {useState, useEffect} from 'react'
import './Components.scss';
import {IonButton, IonContent, IonItem, IonLabel, IonInput} from '@ionic/react';


const InviteTMPopover: React.FC<({ processNewTM: any })> = ({ processNewTM }) => {
  const [tm, setTm] = useState({
    email: '', role: ''
  });
  const handleChange = (e: any) => {
    setTm({
      ...tm,
      [e.target.name]: e.target.value
    });
  }

  const setAndClearTM = () => {
    processNewTM(tm);
    setTm({
      email: '',
      role: ''
    });
    window.location.reload(); //team member shows up on reload
  }

  return(
    <div className="invite-wrapper">
      <h4>Invite New Team Member to Assessment</h4>
      <IonItem color="docentlight"   >
        <IonLabel position="floating">Email</IonLabel> 
         <IonInput
          name="email"
          value={tm.email}
          onIonChange={handleChange}
        ></IonInput>
      </IonItem>
      <IonItem color="docentlight"   >
        <IonLabel position="floating">Role</IonLabel>
        <IonInput
          name="role"
          value={tm.role}
          onIonChange={handleChange}
        ></IonInput>
      </IonItem>
      <IonButton color="dsb" onClick={() => setAndClearTM()}>Add Team Member</IonButton>
      
    </div>
    // <IonContent color="docentdark"  className="invite-popover" >
    //   <h1>Invite New Team Member to Assessment</h1>
    //   <IonItem color="docentdark"   >
    //     <IonLabel position="floating">Email</IonLabel> 
    //     <IonInput
    //       name="email"
    //       value={tm.email}
    //       onIonChange={handleChange}
    //     ></IonInput>
    //   </IonItem>
      // <IonItem color="docentdark"   >
      //   <IonLabel position="floating">Role</IonLabel>
      //   <IonInput
      //     name="role"
      //     value={tm.role}
      //     onIonChange={handleChange}
      //   ></IonInput>
      // </IonItem>
    //   <IonButton color="dsb" onClick={() => processNewTM(tm)}>Add Team Member</IonButton>
    // </IonContent>
  )
};

export default InviteTMPopover;
