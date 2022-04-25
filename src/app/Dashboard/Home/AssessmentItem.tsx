import React, { useEffect, useState } from 'react'

import './Components.scss';
import { IonButton } from '@ionic/react';

import { deleteAssessment } from '../../../api/api'
import { id } from 'date-fns/locale';

const AssessmentItem: React.FC<({ assessmentInfo: any })> = ({ assessmentInfo }) => {

  useEffect(() => {
    setAssessment(assessmentInfo.assessment);
    setTeamMembers(assessmentInfo.team_members);
  }, [])

  const [assessment, setAssessment] = useState<any>()
  const [teamMembers, setTeamMembers] = useState<any>()

  useEffect(() => {
    if (assessment) {
      console.log(assessment.id)
    }
  }, [assessment])

  // useEffect(() => {
  //   if (teamMembers) {
  //     console.log(teamMembers)
  //   }
  // }, [teamMembers])

  const removeAssessment = (id: number) => {
    deleteAssessment(id);
  }

  return (
    <div className="assessment-inner">
      <div className="assessment-info">
        <p><b>Name: </b>{assessment && assessment.name}</p>
        <p><b>3 out of 50 </b>questions answered</p>
        <p><b>MRL: </b>5</p>
        <p><b>Target Date: </b>{assessment && assessment.target}</p>
        <p><b>Additional Information: </b>{assessment && assessment.scope}</p>
        <p><b>Location: </b>{assessment && assessment.location}</p>
        <p><b>Level Switching On?: </b>{assessment && assessment.location}</p>
        <p><b>Team Members: </b>james@ekta.co</p>
      </div>
      <div className="assessment-actions">
        <IonButton size="small" expand="full" color="light" routerLink='/questions'>Continue Assessment</IonButton>
        <IonButton size="small" expand="full" color="light" routerLink="/mrl-summary">MRL Summary</IonButton>
        <IonButton size="small" expand="full" color="light" routerLink="/action-items">Action Items</IonButton>
        <IonButton size="small" expand="full" color="light">Invite Team Members</IonButton>
        <IonButton size="small" expand="full" color="light">Edit Assessment Info</IonButton>
        <IonButton size="small" expand="full" color="light" onClick={() => removeAssessment(assessment.id)}>Delete Assessment</IonButton>
        <IonButton size="small" expand="full" color="light">Export Assessment</IonButton>
      </div>
    </div>
  )
}
export default AssessmentItem;
