import React, { useState, useEffect } from 'react'

import { IonContent, IonIcon, IonAccordionGroup, IonAccordion, IonItem, IonLabel, IonList, IonButton, IonInput, IonPage, IonPopover, IonToast } from '@ionic/react';

import Header from '../../Framework/Header';
import './Home.scss';
import AssessmentItem from './AssessmentItem';
import Sidebar from './Sidebar';
import FilterPopover from './FilterPopover';
import InviteTMPopover from './InviteTMPopover';

import { useHistory } from 'react-router-dom';

import { grabAssessments, deleteAssessment, createTeamMember } from '../../../api/api'

const Home: React.FC = () => {
  const [assessments, setAssessments] = useState<Array<any>>([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({message: '', status: ''})
  const [filters, setFilters] = useState<any>({
    listBy: 'Created At',

  });
  const [invitePopover, setInvitePopover] = useState(false);
  const [currentAssessment, setCurrentAssesment] = useState(null);

  const [prevInAssessment, setPrevInAssessment] = useState(false)
  const [passedAId, setPassedAId] = useState()

  const history = useHistory();

  useEffect(() => {
    async function getAssessments() {
      var asts = await grabAssessments();
      var ats = asts.assessments.assessments
      setAssessments(asts.assessments)
    }
    getAssessments()
    var his: any = history
    if (his["location"]["state"]) {
      console.log(his["location"]["state"]);
      setPrevInAssessment(his["location"]["state"]["prevInAssessment"]);
      setPassedAId(his["location"]["state"]["assessmentId"])
    }
  }, [])

  function openPopover() {
    setIsPopoverOpen(!isPopoverOpen)
  }

  function openInviteTM(assessmentId:any) {
    setCurrentAssesment(assessmentId);
    setInvitePopover(true);
  }

  async function processNewTM(tm:any){
    tm['assessment_id'] = currentAssessment
    var newTm = await createTeamMember(tm);
    if (newTm.data.team_member) {
      setInvitePopover(false);
      var index = assessments.findIndex((ast) => ast.id == tm['assessment_id']);
      var astclone = Object.create(assessments);
      astclone[index] = newTm.data.assessment;
      setAssessments(astclone);
      setShowToast(true);
      if (newTm.data.newUser) {
        setToastMessage({message: `${newTm.data.team_member} has been invited to the assessment: ${newTm.data.assessment.name}`, status: 'success'})
      } else {
        setToastMessage({message: `${newTm.data.team_member} has been invited to Docent as a new user and been invited to the assessment: ${newTm.data.assessment.name}`, status: 'success'})
      }

    }

  }

  async function deleteAssessmentFromBack(id: number) {
    var deleted = await deleteAssessment(id);
    var asts = assessments;
    var currentAst = assessments.find((assessment) => assessment.assessment.id == id).name
    var ats = assessments.filter((assess) => assess.assessment.id !== id);
    // setDeletedAssess(currentAst);
    setShowToast(true);
    setToastMessage({message: `Assessment ${currentAst} has been deleted`, status: 'success'})
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
                    <AssessmentItem assessmentInfo={assessment.assessment} teamMembers={assessment.team_members} deleteAssessmentFromBack={deleteAssessmentFromBack} openInviteTM={openInviteTM}/>
                  </IonItem>
                </IonAccordion>
              ))
            }

          </IonAccordionGroup>
          <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message={toastMessage.message}
            duration={2000}
          />

        </div>
        <Sidebar prevInAssessment={prevInAssessment} passedAId={passedAId} />
      </div>
    </IonPage>
  );
};

export default Home;
// <IonButton expand="full" color="light" id="trigger-button" onClick={openPopover}>Filter</IonButton>
// <IonPopover trigger="trigger-button" isOpen={isPopoverOpen}>
//   <FilterPopover filters={filters} setFilters={setFilters}/>
// </IonPopover>
