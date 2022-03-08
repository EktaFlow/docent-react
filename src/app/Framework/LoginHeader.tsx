import './Framework.scss';
import { IonButton, IonIcon, IonHeader } from '@ionic/react'

import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [inAssessment, setInAssessment] = useState(true);
    return (
        <IonHeader>
        <div className="header-wrapper">
          <h2 className="header-title">docent</h2>
          <div className="header-nav-wrapper">
            <IonButton color="light" class="navi-btm" routerLink="/Register">
              <IonIcon name="person-add-outline"></IonIcon>Registor
            </IonButton>
            <IonButton color="light" class="navi-btm" routerLink="/Login">
              <IonIcon name="log-in-outline"></IonIcon>Login
            </IonButton>  
          </div>
        </div>
      </IonHeader>
    );
}
 
export default Header;

