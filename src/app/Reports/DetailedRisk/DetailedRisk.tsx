import { IonPage, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonButton, IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import React, { useState } from 'react';

import './DetailedRisk.scss';
import Header from '../../Framework/Header';
import InfoCard from '../InfoCard';
import ReportsTopbar from '../ReportsTopbar';

const DetailedRisk: React.FC = () => {

  return (
    <IonPage>
      <Header />
      <ReportsTopbar text="Detailed Risk Report" />
      <IonContent>
        <div className="detailed-risk-wrapper">
          <InfoCard />
          <h2>Risk Report for MRL Level 1</h2>

          <IonRow className="detailed-risk-toolbar">
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

          <div className="detailed-card-wrapper">
            <IonCard className="detailed-risk-card" color="dark">
              <IonCardHeader>
                <IonCardTitle>Thread: Cost & Funding</IonCardTitle>
              </IonCardHeader>
              <IonCard className="subthread-card" color="dark">
                <IonCardHeader>
                  <IonCardTitle>Subthread: C.1 - Production Cost Knowledge (Cost modeling)</IonCardTitle>
                </IonCardHeader>
                <div className="question">
                  <div>
                    <h4>Have hypotheses been developed regarding technology impact on affordability?</h4>
                  </div>
                  <div>
                    <p className="red"><b>Risk Score: </b>24</p>

                    <div className="extra-risk">
                      <p><b>Greatest Impact: </b></p>
                      <p><b>Risk Response: </b></p>
                      <p><b>MMP Summary: </b></p>
                    </div>

                  </div>
                </div>
              </IonCard>

              <IonCard className="subthread-card" color="dark">
                <IonCardHeader>
                  <IonCardTitle>Subthread: C.2 - Cost Analysis</IonCardTitle>
                </IonCardHeader>
                <div className="question">
                  <div>
                    <h4>Have initial manufacturing and quality costs been identified?</h4>
                  </div>
                  <div>
                    <p className="red"><b>Risk Score: </b>24</p>

                    <div className="extra-risk">
                      <p><b>Greatest Impact: </b></p>
                      <p><b>Risk Response: </b></p>
                      <p><b>MMP Summary: </b></p>
                    </div>

                  </div>
                </div>
              </IonCard>
            </IonCard>
          </div>

        </div>
      </IonContent>
    </IonPage>
  )
}
export default DetailedRisk;
