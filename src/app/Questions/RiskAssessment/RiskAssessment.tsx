import { IonGrid, IonRow, IonCol, IonItem, IonLabel, IonSelect, IonSelectOption, IonTextarea, IonModal, IonContent } from '@ionic/react';
import './RiskAssessment.scss';

import React, { useState, useEffect } from 'react';

import RiskPopover from './RiskPopover';

const RiskAssessment: React.FC<{ answer: any, handleAnswerChange: any, getRiskScore: Function }> = ({ answer, handleAnswerChange, getRiskScore }) => {
  const [riskScore, setRiskScore] = useState<number | null>();

  const [descriptionModal, setDescriptionModal] = useState(false);
  const [modalDescription, setModalDescription] = useState<string>('');

  useEffect(() => {
    let riskMatrix = [
      [null],
      [null, 1, 3, 5, 8, 12],
      [null, 2, 7, 11, 14, 17],
      [null, 4, 10, 15, 19, 21],
      [null, 6, 12, 18, 22, 24],
      [null, 9, 16, 20, 23, 25],
    ];
    if (answer.likelihood && answer.consequence) {
      setRiskScore(riskMatrix[answer.likelihood][answer.consequence]);
    }
    else {
      setRiskScore(riskMatrix[0][0]);
    }

  }, [answer.likelihood, answer.consequence]);

  useEffect(() => {
    if (riskScore && answer.likelihood && answer.consequence) {
      console.log(riskScore)
      getRiskScore(riskScore);
    }
    else {
      getRiskScore('')
    }
  }, [riskScore]);

  const showLikelihoodDescription = () => {
    setDescriptionModal(true);
    setModalDescription('Likelihood');
  }

  const showConsequenceDescription = () => {
    setDescriptionModal(true);
    setModalDescription('Consequence');
  }

  return (
    <div className="risk-assessment-wrapper">
      <IonGrid>
        <IonRow>
          <IonCol size="12">
            <h5>Risk Assessment</h5>

            <IonRow>
              <IonCol size="10" className="ion-no-padding">
                <IonItem color="docentlight">
                  <IonLabel position="floating">Likelihood</IonLabel>
                  <IonSelect name="likelihood" value={answer.likelihood ? (answer.likelihood).toString() : null} interface="popover" onIonChange={handleAnswerChange}>
                    <IonSelectOption value="1">1 - Not Likely</IonSelectOption>
                    <IonSelectOption value="2">2 - Low Likelihood</IonSelectOption>
                    <IonSelectOption value="3">3 - Moderate</IonSelectOption>
                    <IonSelectOption value="4">4 - Highly Likely</IonSelectOption>
                    <IonSelectOption value="5">5 - Near Certainty</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </IonCol>
              <IonCol size="2" className="qmark-col">
                <img src="assets/qmark.png"
                  alt=""
                  height="20"
                  onClick={() => showLikelihoodDescription()}>
                </img>
              </IonCol>
              <IonCol size="10" className="ion-no-padding">
                <IonItem color="docentlight">
                  <IonLabel position="floating">Consequence</IonLabel>
                  <IonSelect name="consequence" value={answer.consequence ? (answer.consequence).toString() : null} interface="popover" onIonChange={handleAnswerChange}>
                    <IonSelectOption value="1">1 - Negligible</IonSelectOption>
                    <IonSelectOption value="2">2 - Marginal</IonSelectOption>
                    <IonSelectOption value="3">3 - Moderate</IonSelectOption>
                    <IonSelectOption value="4">4 - Critical</IonSelectOption>
                    <IonSelectOption value="5">5 - Catastrophic</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </IonCol>
              <IonCol size="2" className="qmark-col">
                <img src="assets/qmark.png"
                  alt=""
                  height="20"
                  onClick={() => showConsequenceDescription()}>
                </img>
              </IonCol>
            </IonRow>

            <IonModal isOpen={descriptionModal}
              className="full-screen"
              onDidDismiss={() => setDescriptionModal(false)}>
              <IonContent>
                <RiskPopover
                  description={modalDescription}
                  setDescription={setModalDescription}
                />
              </IonContent>
            </IonModal>

            <h6>Risk Score: {riskScore && riskScore}</h6>

            <IonItem color="docentlight">
              <IonLabel position="floating">Greatest Impact</IonLabel>
              <IonSelect
                name="greatest_impact" value={answer.greatest_impact ? (answer.greatest_impact).toString() : null} interface="popover" onIonChange={handleAnswerChange}>
                <IonSelectOption value="cost">Cost</IonSelectOption>
                <IonSelectOption value="schedule">Schedule</IonSelectOption>
                <IonSelectOption value="performance">Performance</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem color="docentlight"   >
              <IonLabel position="floating">Risk Response</IonLabel>
              <IonSelect
                name="risk_response" value={answer.risk_response ? (answer.risk_response).toString() : null} interface="popover" onIonChange={handleAnswerChange}>
                <IonSelectOption value="accept">Accept</IonSelectOption>
                <IonSelectOption value="transfer">Transfer</IonSelectOption>
                <IonSelectOption value="avoid">Avoid</IonSelectOption>
                <IonSelectOption value="mitigate">Mitigate</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem color="docentlight"   >
              <IonLabel position="floating">MMP Summary</IonLabel>
              <IonTextarea
                name="mmp_summary"
                value={answer.mmp_summary}
                onIonChange={handleAnswerChange}></IonTextarea>
            </IonItem>

          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  )
}
export default RiskAssessment;
