import React, { useState, useEffect } from 'react'

import { IonContent, IonIcon, IonAccordionGroup, IonAccordion, IonItem, IonLabel, IonList, IonButton, IonInput, IonPage, IonPopover, useIonToast, IonToast } from '@ionic/react';

import Header from '../../Framework/Header';
import './Home.scss';
import AssessmentItem from './AssessmentItem';
import Sidebar from './Sidebar';
import FilterPopover from './FilterPopover';
import InviteTMPopover from './InviteTMPopover';

import { grabAssessments, deleteAssessment, createTeamMember } from '../../../api/api'


const Home: React.FC = () => {
  const [assessments, setAssessments] = useState<Array<any>>([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [deletedAssess, setDeletedAssess] = useState(null);
  const [showToast1, setShowToast1] = useState(false);
  const [filters, setFilters] = useState<any>({
    listBy: 'Created At',

  });
  const [present, dismiss] = useIonToast();
  const [invitePopover, setInvitePopover] = useState(false);
  const [currentAssessment, setCurrentAssesment] = useState(null);

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

  function openInviteTM(assessmentId:any) {
    setCurrentAssesment(assessmentId);
    console.log('opening invite popover');
    setInvitePopover(true);
  }

  async function processNewTM(tm:any){
    tm['assessment_id'] = currentAssessment
    var newTm = await createTeamMember(tm);
    console.log(newTm);

  }

  async function deleteAssessmentFromBack(id: number) {
    console.log(id)
    var deleted = await deleteAssessment(id);
    var asts = assessments;
    var currentAst = assessments.find((assessment) => assessment.assessment.id == id).name
    var ats = assessments.filter((assess) => assess.assessment.id !== id);
    console.log(ats);
    setDeletedAssess(currentAst);
    setShowToast1(true);
    setAssessments(ats);
  }

  return (
    <IonPage className="home-page-wrapper">
      <Header showAssessment={false} />
      <div className="content-wrapper">
        <div className="home-ls">
          <div className="assessment-toolbar">
            <h2>Assessments</h2>
            <div className="filter-toolbar">

              <IonPopover trigger="invite-trigger" alignment="center" isOpen={invitePopover} translucent={true} onDidDismiss={() => setInvitePopover(false)}>
                <InviteTMPopover processNewTM={processNewTM}/>
              </IonPopover>
            </div>
          </div>
          <IonAccordionGroup className="assessments-accordion">
            {
              assessments && assessments.map((assessment, index) => (
                <IonAccordion value={assessment.assessment.id} color="secondary">
                  <IonItem slot="header" id="invite-trigger">
                    <IonLabel>Assessment Name: {assessment.assessment.name}</IonLabel>
                  </IonItem>
                  <IonItem slot="content" color="dark">
                    <AssessmentItem assessmentInfo={assessment.assessment} deleteAssessmentFromBack={deleteAssessmentFromBack} openInviteTM={openInviteTM}/>
                  </IonItem>
                </IonAccordion>
              ))
            }

          </IonAccordionGroup>
          <IonToast
            isOpen={showToast1}
            onDidDismiss={() => setShowToast1(false)}
            message={`Assessment ${deletedAssess} has been deleted`}
            duration={2000}
          />

        </div>
        <Sidebar />
      </div>
    </IonPage>
  );
};

export default Home;
// <IonButton expand="full" color="light" id="trigger-button" onClick={openPopover}>Filter</IonButton>
// <IonPopover trigger="trigger-button" isOpen={isPopoverOpen}>
//   <FilterPopover filters={filters} setFilters={setFilters}/>
// </IonPopover>
