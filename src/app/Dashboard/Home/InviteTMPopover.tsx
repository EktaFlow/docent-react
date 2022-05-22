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

  return(
    <IonContent color="light" className="invite-popover">
      <h1>Invite New Team Member to Assessment</h1>
      <IonItem color="dark">
        <IonLabel position="floating">Email</IonLabel>
        <IonInput
          name="email"
          value={tm.email}
          onIonChange={handleChange}
        ></IonInput>
      </IonItem>
      <IonItem color="dark">
        <IonLabel position="floating">Role</IonLabel>
        <IonInput
          name="role"
          value={tm.role}
          onIonChange={handleChange}
        ></IonInput>
      </IonItem>
      <IonButton color="dsb" onClick={() => processNewTM(tm)}>Add Team Member</IonButton>
    </IonContent>
  )
};

export default InviteTMPopover;
