import { IonPage, IonItem, IonLabel, IonSelect, IonSelectOption, IonButton, IonHeader, IonToolbar, IonTitle, IonRow, IonCol, IonContent, IonGrid, IonTextarea, IonInput } from '@ionic/react';
import React, { useState, useEffect } from 'react';

import Header from '../Framework/Header';
import './QuestionsPage.scss';

import Topbar from './Topbar';
import RiskAssessment from './RiskAssessment/RiskAssessment';
import RiskMatrix from './RiskAssessment/RiskMatrix';

const QuestionsPage: React.FC = () => {
  const [explanationText, showExplanationText] = useState(false);

  const [yes, setYes] = useState(false);
  const [no, setNo] = useState(false);
  const [na, setNA] = useState(false);

  const [likelihood, setLikelihood] = useState<number>();
  const [consequence, setConsequence] = useState<number>();
  const [riskScore, setRiskScore] = useState<number>();

  useEffect(() => {
    if (likelihood) {
      console.log("Likelihood: " + likelihood);
    }

  }, [likelihood]);

  useEffect(() => {
    if (consequence) {
      console.log("Consequence: " + consequence);
    }

  }, [consequence]);


  useEffect(() => {
    if (riskScore) {
      console.log("Risk Score: " + riskScore);
    }

  }, [riskScore]);

  const getLikelihood = (data: any) => {
    setLikelihood(data);
  }

  const getConsequence = (data: any) => {
    setConsequence(data);
  }

  const getRiskScore = (data: any) => {
    setRiskScore(data);
  }

  const changeInterface = (answer: any) => {
    if (answer === "yes") {
      setYes(true);
      setNo(false);
      setNA(false);
    }
    else if (answer === "no") {
      setYes(false);
      setNo(true);
      setNA(false);
    }
    else if (answer === "n/a") {
      setYes(false);
      setNo(false);
      setNA(true);
    }
  }

  return (
    <IonPage className="question-page-wrapper">
      <Header />
      <Topbar />
      <IonContent>

        <div className="content-wrapper">
          <IonGrid>
            <IonRow>
              <IonCol size="12">
                <div className="title-wrapper">
                  <h2>Is the Technology Readiness at TRL 1 or greater?</h2>
                  <div>
                    <IonButton color="dsb">Previous</IonButton>
                    <IonButton color="dsb">Next</IonButton>
                    <IonButton color="dsb">Save</IonButton>
                  </div>
                </div>
              </IonCol>

              <IonCol size="12" size-lg="5">
                <IonItem color="dark">
                  <IonLabel position="floating">Select Answer</IonLabel>
                  <IonSelect interface="popover" onIonChange={e => changeInterface(e.detail.value)}>
                    <IonSelectOption value="yes">Yes</IonSelectOption>
                    <IonSelectOption value="no">No</IonSelectOption>
                    <IonSelectOption value="n/a">N/A</IonSelectOption>
                  </IonSelect>
                </IonItem>


                {yes && <div>
                  <IonItem color="dark">
                    <IonLabel position="floating">Objective Evidence</IonLabel>
                    <IonTextarea placeholder="What needs to be done to meet this objective?"></IonTextarea>
                  </IonItem>
                </div>}

                {no && <div>
                  <h3><b>Action Plan</b></h3>
                  <IonItem color="dark">
                    <IonLabel position="floating">Owner</IonLabel>
                    <IonInput placeholder=""></IonInput>
                  </IonItem>
                  <IonItem color="dark">
                    <IonLabel position="floating">Action Item</IonLabel>
                    <IonTextarea placeholder="What needs to be done to meet this objective?"></IonTextarea>
                  </IonItem>
                  <IonItem color="dark">
                    <IonLabel position="floating">Reason</IonLabel>
                    <IonTextarea placeholder="Reason that the criteria is not met..."></IonTextarea>
                  </IonItem>
                </div>}

                {na && <div>
                  <IonItem color="dark">
                    <IonLabel position="floating">Documentation</IonLabel>
                    <IonTextarea placeholder="Document why this question is not applicable..."></IonTextarea>
                  </IonItem>
                </div>}

                <IonButton color="dsb" onClick={() => showExplanationText(!explanationText)}>Explanation Text</IonButton>

                {explanationText && <div className="explanation-text">
                  <p>TRL 1: Basic principles observed and reported
                  </p>
                  <p>
                    Description:<br />
                    Lowest level of technology readiness. Scientific research begins to be translated into applied research and development (R&D). Examples might include paper studies of a technology’s basic properties.
                  </p>
                  <p>
                    Supporting Information:
                    Published research that identifies the principles that underlie this technology. References to who, where, when.
                  </p>
                  <p>
                    Examples of ‘Objective Evidence’:<br />
                    ● TRA Report is TRL of 1 or greater
                  </p>
                </div>}


                <IonItem color="dark">
                  <IonLabel position="floating">Assumptions</IonLabel>
                  <IonTextarea placeholder="Enter any assumptions here..."></IonTextarea>
                </IonItem>

                <IonItem color="dark">
                  <IonLabel position="floating">Notes</IonLabel>
                  <IonTextarea placeholder="Enter any notes here..."></IonTextarea>
                </IonItem>

                <IonButton color="dsb">Attach File</IonButton>

                <IonHeader>
                  <IonToolbar className="toolbar">
                    <IonTitle>Attachments</IonTitle>
                  </IonToolbar>
                </IonHeader>

                <div className="attachments-content">
                  {/* <table className="attachments-table"> */}
                    <IonRow>
                      <IonCol className="ion-no-padding">
                        <IonLabel className="attachment-label file-name-label">File</IonLabel>
                      </IonCol>
                      <IonCol className="ion-no-padding">
                        <IonLabel className="attachment-label date-label">Date Added</IonLabel>
                      </IonCol>
                      <IonCol id="view" className="ion-no-padding">
                        <IonLabel className="attachment-label view-label">View</IonLabel>
                      </IonCol>
                      <IonCol id="delete" className="ion-no-padding">
                        <IonLabel className="attachment-label delete-label">Delete</IonLabel>
                      </IonCol>
                    </IonRow>
                  {/* </table> */}
                </div>
              </IonCol>
              <IonCol size="12" size-lg="3">
                <RiskAssessment getLikelihood={getLikelihood} getConsequence={getConsequence} getRiskScore={getRiskScore} />
              </IonCol>
              <IonCol size="12" size-lg="4">
                <RiskMatrix likelihood={likelihood} consequence={consequence} riskScore={riskScore} />
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>

      </IonContent>
    </IonPage>
  )
}
export default QuestionsPage;
