import './Framework.scss';
import { IonButton, IonPopover, IonContent } from '@ionic/react'

import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [inAssessment, setInAssessment] = useState(true);

  return (
    <div className="header-wrapper">
      <h2 className="header-title">docent</h2>
      <div className="header-nav-wrapper">
        <IonButton expand='full' color="light" routerLink="/home">Home</IonButton>
        { inAssessment && <IonButton id="trigger-reports" expand='full' color="light">Reports</IonButton> }

        <IonPopover trigger="trigger-reports">
          <IonButton color="light" expand="full">MRL Summary</IonButton>
          <IonButton color="light" expand="full">Questions List</IonButton>
          <IonButton color="light" expand="full">Review</IonButton>
          <IonButton color="light" expand="full">Comprehensive</IonButton>
          <IonButton color="light" expand="full">Action Items</IonButton>
          <IonButton color="light" expand="full">MRL Risk Summary</IonButton>
          <IonButton color="light" expand="full">Detailed Risk Report</IonButton>
        </IonPopover>

        <IonButton id="trigger-help" expand='full' color="light">Help</IonButton>

        <IonPopover trigger="trigger-help">
          <IonButton color="light" expand="full">Criteria</IonButton>
          <IonButton color="light" expand="full">Definitions</IonButton>
          <IonButton color="light" expand="full">Acronyms</IonButton>
          <IonButton color="light" expand="full">FAQs</IonButton>
          <IonButton color="light" expand="full">User's Guide</IonButton>
          <IonButton color="light" expand="full">MRL Deskbook</IonButton>
        </IonPopover>

        <IonButton expand='full' color="light">Logout</IonButton>
      </div>
    </div>
  )
}
export default Header;
