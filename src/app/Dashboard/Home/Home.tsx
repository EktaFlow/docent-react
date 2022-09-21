import React, { useState, useEffect } from 'react'

import { IonContent, IonIcon, IonAccordionGroup, IonAccordion, IonItem, IonLabel, IonList, IonButton, IonInput, IonPage, IonPopover, IonToast } from '@ionic/react';
import { peopleCircleOutline } from 'ionicons/icons';
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
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({message: '', status: ''})
  const [filters, setFilters] = useState<any>({
    listBy: 'Created At',

  });
  const [invitePopover, setInvitePopover] = useState(false);
  const [currentAssessment, setCurrentAssesment] = useState(null);

  useEffect(() => {
    async function getAssessments() {
      var asts = await grabAssessments();
      var ats = asts.assessments.assessments
      setAssessments(asts.assessments)
    }
    getAssessments()
  }, [])

  useEffect(() => {
    // console.log("current open assesment: " + currentAssessment)
    console.log(assessments)
  })

  function openPopover() {
    setIsPopoverOpen(!isPopoverOpen)
  }

  function openInviteTM(assessmentId:any) {
    setCurrentAssesment(assessmentId);
    // setInvitePopover(true);
  }

  async function processNewTM(tm:any){
    tm['assessment_id'] = currentAssessment
    console.log(tm)
    var newTm = await createTeamMember(tm);
    console.log(newTm)
    if (newTm.team_member) {
      // setInvitePopover(false);
      var index = assessments.findIndex((ast) => ast.id == tm['assessment_id']);
      var astclone = Object.create(assessments);
      astclone[index] = newTm.assessment;
      setAssessments(astclone);

      if (newTm.newUser) {
        setShowToast(true);
        setToastMessage({message: `${newTm.team_member} has been invited to the assessment: ${newTm.assessment.name}`, status: 'success'})
      } else {
        setShowToast(true);
        setToastMessage({message: `${newTm.team_member} has been invited to Docent as a new user and been invited to the assessment: ${newTm.assessment.name}`, status: 'success'})
      }
      // window.location.reload();
    }

  }

  async function deleteAssessmentFromBack(id: number) {
    setShowToast(true);
    console.log(id)
    var currentAst = assessments.find((assessment) => assessment.assessment.id == id).assessment.name
    var msg = "Assessment '" + currentAst + "' has been deleted";

    var ats = assessments.filter((assess) => assess.assessment.id !== id);
    var deleted = await deleteAssessment(id)
      .then((res) => {
        setToastMessage({message: msg, status: 'success'})
        setShowToast(true)
        setTimeout(() => {
          setShowToast(false)
        }, 2000)
        setAssessments(ats);
      })
      .catch((error) => {
        setToastMessage({message: `Error deleting assessment`, status: 'danger'})
        setShowToast(true)
        setTimeout(() => {
          setShowToast(false)
        }, 2000)
      })

    console.log(deleted)
    console.log(currentAst)

    //if deleted, show toast?
    // if(deleted['success'] == true) {
    //   console.log("showing toast")

    // }
    // else {
    //   setShowToast(true)
    //   setToastMessage({message: `Error deleting assessment`, status: 'danger'})
    //   setTimeout(() => {
    //     setShowToast(false)
    //   }, 2000)
    // }


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
          {
            assessments.length == 0 &&
            <div className="no-assessments-box">
              <h2>You don't have any asessments, get started by creating a new assessment</h2>
              <IonButton color="dsb" routerLink="/start-new">Start New</IonButton>
            </div>
          }
          <IonAccordionGroup className="assessments-accordion">
            {
              assessments && assessments.map((assessment, index) => (
                <IonAccordion value={assessment.assessment.id}>
                  <IonItem slot="header" id="invite-trigger" color="docentdark">
                    { assessment.assessment.shared &&
                      <IonIcon icon={peopleCircleOutline}></IonIcon>

                    }
                    <IonLabel>Assessment Name: {assessment.assessment.name}</IonLabel>
                  </IonItem>
                  <IonItem slot="content" color="docentlight">
                    <AssessmentItem assessmentInfo={assessment.assessment}  deleteAssessmentFromBack={deleteAssessmentFromBack} openInviteTM={openInviteTM} teamMembers={assessment.team_members} processNewTM={processNewTM}/>
                  </IonItem>
                </IonAccordion>
              ))
            }

          </IonAccordionGroup>
          <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message={toastMessage.message}
            color={toastMessage.status}
            // duration={2000}
          />

        </div>
        <Sidebar />
      </div>
    </IonPage>
  );
};

export default Home;
// <IonButton expand="full" color="docentlight" id="trigger-button" onClick={openPopover}>Filter</IonButton>
// <IonPopover trigger="trigger-button" isOpen={isPopoverOpen}>
//   <FilterPopover filters={filters} setFilters={setFilters}/>
// </IonPopover>
