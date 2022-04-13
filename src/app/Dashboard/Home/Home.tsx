import React, { useState, useEffect } from 'react'

import { IonContent, IonIcon, IonAccordionGroup, IonAccordion, IonItem, IonLabel, IonList, IonButton, IonInput, IonPage } from '@ionic/react';

import Header from '../../Framework/Header';
import './Home.scss';
import AssessmentItem from './AssessmentItem';
import Sidebar from './Sidebar';

import { grabAssessments } from '../../../api/api'

const Home: React.FC = () => {

  const [assessments, setAssessments] = useState([]);

  useEffect(() => {
    async function getAssessments() {
      var asts = await grabAssessments();
      setAssessments(asts.assessments);
    }

    getAssessments()
  }, [])

  // useEffect(() => {
  //   if (assessments) {
  //     console.log(assessments)
  //   }
  // }, [assessments])

  return (
    <IonPage className="home-page-wrapper">
      <Header />
      <div className="content-wrapper">
        <div className="home-ls">
          <div className="assessment-toolbar">
            <h2>Assessments</h2>
            <div className="filter-toolbar">
              <h4>List By</h4>
              <IonButton expand="full" color="light">Filter</IonButton>
            </div>
          </div>
          <IonAccordionGroup className="assessments-accordion">
            {assessments.map((assessment, index) => (
              <IonAccordion color="secondary">
                <IonItem slot="header">
                  <IonLabel>Assessment Name: xxx</IonLabel>
                </IonItem>
                <IonItem slot="content" color="dark">
                  <AssessmentItem assessmentInfo={assessment} />
                </IonItem>
              </IonAccordion>
            ))}
            {/* <IonAccordion value="assessment1" color="secondary">
              <IonItem slot="header">
                <IonLabel>Assessment Name: xxx</IonLabel>
              </IonItem>
              <IonItem slot="content" color="dark">
                <AssessmentItem />
              </IonItem>
            </IonAccordion>
            <IonAccordion value="assessment2" color="secondary">
              <IonItem slot="header">
                <IonLabel>Assessment Name: yyy</IonLabel>
              </IonItem>
              <IonItem slot="content" color="dark">
                <AssessmentItem />
              </IonItem>
            </IonAccordion>
            <IonAccordion value="assessment3" color="secondary">
              <IonItem slot="header">
                <IonLabel>Assessment Name: ddd</IonLabel>
              </IonItem>
              <IonItem slot="content" color="dark">
                <AssessmentItem />
              </IonItem>
            </IonAccordion>
            <IonAccordion value="assessment4" color="secondary">
              <IonItem slot="header">
                <IonLabel>Assessment Name: eee</IonLabel>
              </IonItem>
              <IonItem slot="content" color="dark">
                <AssessmentItem />
              </IonItem>
            </IonAccordion> */}
          </IonAccordionGroup>
        </div>
        <Sidebar />
      </div>
    </IonPage>
  );
};

export default Home;


