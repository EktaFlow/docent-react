import { IonGrid, IonRow, IonCol, IonItem, IonLabel, IonSelect, IonSelectOption, IonTextarea, IonModal, IonContent } from '@ionic/react';
import './RiskAssessment.scss';

import React, { useState, useEffect } from 'react';

import RiskPopover from './RiskPopover';

const RiskAssessment: React.FC<{ getLikelihood: Function, getConsequence: Function, getRiskScore: Function, getRiskResponse: Function, getMMPSummary: Function, getGreatestImpact: Function, greatest_impact: string, risk_response: string, mmp_summary: string }> = ({ getLikelihood, getConsequence, getRiskScore, getRiskResponse, getMMPSummary, getGreatestImpact, greatest_impact, risk_response, mmp_summary }) => {
  const [likelihood, setLikelihood] = useState<number>();
  const [consequence, setConsequence] = useState<number>();

  const [riskScore, setRiskScore] = useState<number | null>();

  const [descriptionModal, setDescriptionModal] = useState(false);
  const [modalDescription, setModalDescription] = useState<string>('');

  useEffect(() => {
    if (likelihood) {
      getLikelihood(likelihood);
    }
    if (consequence) {
      getConsequence(consequence);
    }
    if (likelihood && consequence) {
      let riskMatrix = [
        [null],
        [null, 1, 3, 5, 8, 12],
        [null, 2, 7, 11, 14, 17],
        [null, 4, 10, 15, 19, 21],
        [null, 6, 12, 18, 22, 24],
        [null, 9, 16, 20, 23, 25],
      ];
      setRiskScore(riskMatrix[likelihood][consequence]);
    }

  }, [likelihood, consequence]);

  useEffect(() => {
    if (riskScore) {
      getRiskScore(riskScore);
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
                <IonItem color="dark">
                  <IonLabel position="floating" >Likelihood</IonLabel>
                  <IonSelect interface="popover" onIonChange={e => setLikelihood(e.detail.value)}>
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
                <IonItem color="dark">
                  <IonLabel position="floating">Consequence </IonLabel>
                  <IonSelect interface="popover" onIonChange={e => setConsequence(e.detail.value)}>
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
              {/* <IonCol size="12" size-lg="6">
                <IonItem color="dark">
                  <IonLabel position="floating">Greatest Impact</IonLabel>
                  <IonSelect interface="popover">
                    <IonSelectOption value="cost">Cost</IonSelectOption>
                    <IonSelectOption value="schedule">Schedule</IonSelectOption>
                    <IonSelectOption value="performance">Performance</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </IonCol>
              <IonCol size="12" size-lg="6">
                <IonItem color="dark">
                  <IonLabel position="floating">Risk Response</IonLabel>
                  <IonSelect interface="popover">
                    <IonSelectOption value="accept">Accept</IonSelectOption>
                    <IonSelectOption value="transfer">Transfer</IonSelectOption>
                    <IonSelectOption value="avoid">Avoid</IonSelectOption>
                    <IonSelectOption value="mitigate">Mitigate</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </IonCol> */}
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

            <IonItem color="dark">
              <IonLabel position="floating">Greatest Impact</IonLabel>
              <IonSelect
                value={greatest_impact}
                interface="popover"
                onIonChange={e => getGreatestImpact(e.detail.value)}>
                <IonSelectOption value="cost">Cost</IonSelectOption>
                <IonSelectOption value="schedule">Schedule</IonSelectOption>
                <IonSelectOption value="performance">Performance</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem color="dark">
              <IonLabel position="floating">Risk Response</IonLabel>
              <IonSelect
                value={risk_response}
                interface="popover"
                onIonChange={e => getRiskResponse(e.detail.value)}>
                <IonSelectOption value="accept">Accept</IonSelectOption>
                <IonSelectOption value="transfer">Transfer</IonSelectOption>
                <IonSelectOption value="avoid">Avoid</IonSelectOption>
                <IonSelectOption value="mitigate">Mitigate</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem color="dark">
              <IonLabel position="floating">MMP Summary</IonLabel>
              <IonTextarea
                value={mmp_summary}
                placeholder=""
                onIonChange={e => getMMPSummary(e.detail.value)}></IonTextarea>
            </IonItem>

          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  )
}
export default RiskAssessment;
