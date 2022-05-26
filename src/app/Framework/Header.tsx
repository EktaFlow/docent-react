import './Framework.scss';
import { IonButton, IonPopover, IonContent } from '@ionic/react';
import {logoutUser} from '../../api/api';

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Header: React.FC<{ showAssessment?: boolean, assessmentId?: number }> = ({ showAssessment, assessmentId }) => {
  // const [popoverState, setShowPopover] = useState({ showPopover: false, event: undefined });
  const [reportsPopover, showReportsPopover] = useState(false);
  const [helpPopover, showHelpPopover] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (assessmentId) {
      // console.log("Reports assessment id: " + assessmentId)
    }
  }, [assessmentId]);

  async function navigateToAssessment() {
    history.push({
      pathname: '/questions',
      state: {
        assessment_id: assessmentId as number,
      }
    })
  }

  async function logout(){
    var logout = await logoutUser();
    if (logout.data) {
      localStorage.removeItem("token");
      history.push('/login')
    }
  }

  async function navigateToReports(value: string) {
    history.push({
      pathname: `/${value}`,
      state: {
        assessment_id: assessmentId as number,
      }
    })
  }

  return (
    <div className="header-wrapper">
      <h2 className="header-title">docent</h2>
      <div className="header-nav-wrapper">
        <IonButton expand='full' color="light" routerLink="/home">Home</IonButton>

        {showAssessment && <IonButton id="" expand='full' color="light" onClick={navigateToAssessment}>Continue Assessment</IonButton>}
        {showAssessment && <IonButton id="trigger-reports" expand='full' color="light">Reports</IonButton>}
        {/* {showAssessment && <IonButton expand='full' color="light" onClick={() => showReportsPopover(!reportsPopover)}>Reports</IonButton>} */}

        <IonPopover trigger="trigger-reports">
          <IonButton color="light" expand="full" onClick={() => navigateToReports("mrl-summary")}>MRL Summary</IonButton>
          <IonButton color="light" expand="full" onClick={() => navigateToReports("questions-list")}>Questions List</IonButton>
          <IonButton color="light" expand="full" onClick={() => navigateToReports("review-report")}>Review</IonButton>
          <IonButton color="light" expand="full" onClick={() => navigateToReports("comprehensive-report")}>Comprehensive</IonButton>
          <IonButton color="light" expand="full" onClick={() => navigateToReports("action-items")}>Action Items</IonButton>
          <IonButton color="light" expand="full" onClick={() => navigateToReports("risk-summary")}>MRL Risk Summary</IonButton>
          <IonButton color="light" expand="full" onClick={() => navigateToReports("detailed-risk")}>Detailed Risk Report</IonButton>
        </IonPopover>
        <IonPopover
          className="reports-popover"
          isOpen={reportsPopover}
          onDidDismiss={() => showReportsPopover(!reportsPopover)}
        >
          <IonButton color="light" expand="full">MRL Summary</IonButton>
          <IonButton color="light" expand="full">Questions List</IonButton>
          <IonButton color="light" expand="full" routerLink="review-report">Review</IonButton>
          <IonButton color="light" expand="full" routerLink="comprehensive-report">Comprehensive</IonButton>
          <IonButton color="light" expand="full" routerLink="action-items">Action Items</IonButton>
          <IonButton color="light" expand="full" routerLink="risk-summary">MRL Risk Summary</IonButton>
          <IonButton color="light" expand="full" routerLink="detailed-risk">Detailed Risk Report</IonButton>
        </IonPopover>

        <IonButton expand='full' color="light" onClick={() => showHelpPopover(!helpPopover)}>Help</IonButton>

        <IonPopover
          className="help-popover"
          isOpen={helpPopover}
          onDidDismiss={() => showHelpPopover(!helpPopover)}
        >
          <IonButton color="light" expand="full" routerLink="criteria">Criteria</IonButton>
          <IonButton color="light" expand="full" routerLink="definitions">Definitions</IonButton>
          <IonButton color="light" expand="full" routerLink="acronyms">Acronyms</IonButton>
          <IonButton color="light" expand="full" routerLink="faqs">FAQs</IonButton>
          <IonButton color="light" expand="full">User's Guide</IonButton>
          <IonButton color="light" expand="full" href="http://www.dodmrl.com/MRL%20Deskbook%20V2020.pdf">MRL Deskbook</IonButton>
        </IonPopover>

        <IonButton expand='full' color="light" onClick={logout}>Logout</IonButton>
      </div>
    </div>
  )
}
export default Header;
