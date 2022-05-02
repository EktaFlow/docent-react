import { IonPage, IonContent, IonRow, IonCol, IonButton, IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import './RiskSummary.scss';
import Header from '../../Framework/Header';
import InfoCard from '../InfoCard';
import ReportsTopbar from '../ReportsTopbar';

import { grabSingleAssessment } from '../../../api/api'

const RiskSummary: React.FC = () => {
  const [assessmentId, setAssessmentId] = useState<number>();
  const history = useHistory();
  const [assessmentData, setAssessmentData] = useState<any>();

  useEffect(() => {
    async function getAssessmentInfo() {
      var his: any = history
      var assessment_id = his["location"]["state"]["assessment_id"]
      await setAssessmentId(assessment_id)
    }
    getAssessmentInfo()
  }, []);

  useEffect(() => {
    async function getAssessment() {
      if (assessmentId) {
        var assessmentInfo = await grabSingleAssessment(assessmentId);
        await setAssessmentData(assessmentInfo)
      }
    }
    getAssessment();
  }, [assessmentId]);

  useEffect(() => {
    if (assessmentData) {
      console.log(assessmentData)
    }
  }, [assessmentData]);

  return (
    <IonPage>
      <Header showAssessment={true} assessmentId={assessmentId} />
      <ReportsTopbar text="MRL Risk Summary" />
      <IonContent>
        <div className="risk-summary-wrapper">
          <InfoCard assessmentId={assessmentId} />
          <IonRow className="summary-filter-toolbar">
            <IonCol size="12" size-lg="2" className="filter-button1 ion-padding-bottom">
              <IonButton expand="block" color="dsb">Export As XLS</IonButton>
            </IonCol>
            <IonCol size="12" size-lg="3" className="ion-no-padding">

            </IonCol>
            <IonCol size="12" size-lg="3" className="filter-item ion-no-padding">
              <IonItem color="dark">
                <IonLabel position="floating">Filter MR Level</IonLabel>
                <IonSelect interface="popover">
                  <IonSelectOption value="all-levels">All Levels</IonSelectOption>
                  <IonSelectOption value="1">1</IonSelectOption>
                  <IonSelectOption value="2">2</IonSelectOption>
                  <IonSelectOption value="3">3</IonSelectOption>
                  <IonSelectOption value="4">4</IonSelectOption>
                  <IonSelectOption value="5">5</IonSelectOption>
                  <IonSelectOption value="6">6</IonSelectOption>
                  <IonSelectOption value="7">7</IonSelectOption>
                  <IonSelectOption value="8">8</IonSelectOption>
                  <IonSelectOption value="9">9</IonSelectOption>
                  <IonSelectOption value="10">10</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonCol>
            <IonCol size="6" size-lg="1" className="filter-button2 ion-padding-bottom">
              <IonButton expand="full" color="dsb" className="filter-buttons">Filter</IonButton>
            </IonCol>
            <IonCol size="6" size-lg="1" className="filter-button3 ion-padding-bottom">
              <IonButton expand="full" color="dsb" className="filter-buttons">Clear</IonButton>
            </IonCol>
          </IonRow>

          <table>
            <tr>
              <th className="summary-title" colSpan={7}>
                MRL 1 Criteria Summary
              </th>
            </tr>

            <tr>
              <th className="summary-header thread">Threads</th>
              <th className="summary-header subthread">Subthreads</th>
              <th className="summary-header">Criteria 1</th>
              <th className="summary-header">Criteria 2</th>
              <th className="summary-header">Criteria 3</th>
              <th className="summary-header">Criteria 4</th>
              <th className="summary-header">Criteria 5</th>
            </tr>

            <tr className="summary-row">
              <td className="row-border">Technology Maturity</td>
              <td className="row-border">Technology Maturity</td>

              <td className="row-border risk-score green">5</td>
              <td className="row-border"></td>
              <td className="row-border"></td>
              <td className="row-border"></td>
              <td className="row-border"></td>
            </tr>

            <tr className="summary-row">
              <td className="row-border">Technology and Industrial Base</td>
              <td className="row-border">A.1 - Technology Transition to Production</td>

              <td className="row-border risk-score yellow">14</td>
              <td className="row-border"></td>
              <td className="row-border"></td>
              <td className="row-border"></td>
              <td className="row-border"></td>
            </tr>

            <tr className="summary-row">
              <td className="row-border">Cost and Funding</td>
              <td className="row-border">C.1 - Production Cost Knowledge (Cost modeling)</td>

              <td className="row-border risk-score red">24</td>
              <td className="row-border"></td>
              <td className="row-border"></td>
              <td className="row-border"></td>
              <td className="row-border"></td>
            </tr>

          </table>
        </div>
      </IonContent>
    </IonPage>
  )
}
export default RiskSummary;
