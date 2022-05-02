import React, { useState, useEffect } from 'react'

import { IonContent, IonIcon, IonAccordionGroup, IonAccordion, IonItem, IonLabel, IonList, IonButton, IonInput, IonPage, IonPopover } from '@ionic/react';

import Header from '../../Framework/Header';
import './Home.scss';
import AssessmentItem from './AssessmentItem';
import Sidebar from './Sidebar';
import FilterPopover from './FilterPopover'

import { grabAssessments } from '../../../api/api'

const Home: React.FC = () => {
  const [assessments, setAssessments] = useState<Array<any>>([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [filters, setFilters] = useState<any>({
    listBy: 'Created At',

  })

  useEffect(() => {
    async function getAssessments() {
      var asts = await grabAssessments();
      console.log(asts)
      var ats = asts.assessments.assessments
      setAssessments(asts.assessments)
    }
    getAssessments()
  }, [])

  function openPopover() {
    setIsPopoverOpen(!isPopoverOpen)
  }

  return (
    <IonPage className="home-page-wrapper">
      <Header showAssessment={false} />
      <div className="content-wrapper">
        <div className="home-ls">
          <div className="assessment-toolbar">
            <h2>Assessments</h2>
            <div className="filter-toolbar">
              <IonButton expand="full" color="light" id="trigger-button" onClick={openPopover}>Filter</IonButton>
              <IonPopover trigger="trigger-button" isOpen={isPopoverOpen}>
                <FilterPopover filters={filters} setFilters={setFilters} />
              </IonPopover>
            </div>
          </div>
          <IonAccordionGroup className="assessments-accordion">
            {
              assessments && assessments.map((assessment, index) => (
                <IonAccordion value={assessment.assessment.id} color="secondary">
                  <IonItem slot="header">
                    <IonLabel>Assessment Name: {assessment.assessment.name}</IonLabel>
                  </IonItem>
                  <IonItem slot="content" color="dark">
                    <AssessmentItem ast={assessment.assessment} />
                  </IonItem>
                </IonAccordion>
              ))
            }

          </IonAccordionGroup>

        </div>
        <Sidebar />
      </div>
    </IonPage>
  );
};

export default Home;
