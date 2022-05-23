import React, { useEffect, useState } from 'react'

import './Components.scss';
import { IonButton } from '@ionic/react';

import { deleteAssessment } from '../../../api/api'
import { id } from 'date-fns/locale';
import { useHistory } from 'react-router-dom';




const AssessmentItem: React.FC<{ assessmentInfo:any} > = (assessmentInfo) => {
  const history = useHistory();
  async function navigateToPage(value: string) {
    history.push({
      pathname: `/${value}`,
      state: {
        assessment_id: assessmentInfo.assessment.id as number
      }
    })
  }
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

  const removeAssessment = (id: number) => {
    deleteAssessment(id);
  }

  return (
    <div className="assessment-inner">
      <div className="assessment-info">
        <p><b>Name: </b>{assessment.name}</p>
        <p><b>{assessment.count} out of {assessment.length} </b>questions answered</p>
        <p><b>MRL: </b>{assessment.target_mrl}</p>
        <p><b>Target Date: </b>{assessment.target}</p>
        <p><b>Additional Information: </b>{assessment.scope}</p>
        <p><b>Location: </b>{assessment.location}</p>
        <p><b>Level Switching On?: </b>{assessment.level_switching ? 'Yes' : 'No'}</p>
        <p><b>Team Members: </b>{assessment.team_members}</p>
      </div>
      <div className="assessment-actions">
        <IonButton size="small" expand="full" color="light" onClick={() => navigateToPage('questions')}>Continue Assessment</IonButton>
        <IonButton size="small" expand="full" color="light" onClick={() => navigateToPage('mrl-summary')}>MRL Summary</IonButton>
        <IonButton size="small" expand="full" color="light" onClick={() => navigateToPage('action-items')}>Action Items</IonButton>
        <IonButton size="small" expand="full" color="light">Invite Team Members</IonButton>
        <IonButton size="small" expand="full" color="light">Edit Assessment Info</IonButton>
        <IonButton size="small" expand="full" color="light" onClick={() => removeAssessment(assessment.id)}>Delete Assessment</IonButton>
        <IonButton size="small" expand="full" color="light">Export Assessment</IonButton>
      </div>
    </div>
  )
}
export default AssessmentItem;
