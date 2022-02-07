import { IonGrid, IonRow, IonCol, IonItem, IonLabel, IonSelect, IonSelectOption, IonTextarea } from '@ionic/react';
import './RiskAssessment.scss';

const RiskAssessment: React.FC = () => {
  return(
    <div className="risk-assessment-wrapper">
      <IonGrid>
        <IonRow>
          <IonCol size="12">
            <h5>Risk Assessment</h5>

            <IonItem color="dark">
              <IonLabel position="floating">Likelihood</IonLabel>
              <IonSelect interface="popover">
                <IonSelectOption value="1">1 - Not Likely</IonSelectOption>
                <IonSelectOption value="2">2 - Low Likelihood</IonSelectOption>
                <IonSelectOption value="3">3 - Moderate</IonSelectOption>
                <IonSelectOption value="4">4 - Highly Likely</IonSelectOption>
                <IonSelectOption value="5">5 - Near Certainty</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem color="dark">
              <IonLabel position="floating">Consequence</IonLabel>
              <IonSelect interface="popover">
                <IonSelectOption value="1">1 - Negligible</IonSelectOption>
                <IonSelectOption value="2">2 - Marginal</IonSelectOption>
                <IonSelectOption value="3">3 - Moderate</IonSelectOption>
                <IonSelectOption value="4">4 - Critical</IonSelectOption>
                <IonSelectOption value="5">5 - Catastrophic</IonSelectOption>
              </IonSelect>
            </IonItem>

            <h6>Risk Score: </h6>

            <IonItem color="dark">
              <IonLabel position="floating">Greatest Impact</IonLabel>
              <IonSelect interface="popover">
                <IonSelectOption value="cost">Cost</IonSelectOption>
                <IonSelectOption value="schedule">Schedule</IonSelectOption>
                <IonSelectOption value="performance">Performance</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem color="dark">
              <IonLabel position="floating">Risk Response</IonLabel>
              <IonSelect interface="popover">
                <IonSelectOption value="accept">Accept</IonSelectOption>
                <IonSelectOption value="transfer">Transfer</IonSelectOption>
                <IonSelectOption value="avoid">Avoid</IonSelectOption>
                <IonSelectOption value="mitigate">Mitigate</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem color="dark">
              <IonLabel position="floating">MMP Summary</IonLabel>
              <IonTextarea placeholder=""></IonTextarea>
            </IonItem>

          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  )
}
export default RiskAssessment;
