import React, { useEffect, useState } from 'react'

import './Components.scss';
import { IonButton } from '@ionic/react';

import { id } from 'date-fns/locale';
import { useHistory } from 'react-router-dom';

const AssessmentItem: React.FC<({ assessmentInfo: any, deleteAssessmentFromBack: any, openInviteTM: any })> = ({ assessmentInfo, deleteAssessmentFromBack, openInviteTM }) => {

  const history = useHistory();

  async function navigateToPage(value: string) {
    history.push({
      pathname: `/${value}`,
      state: {
        assessment_id: assessmentInfo.assessment.id as number
      }
    })
  }




  const removeAssessment = (id: number) => {
    console.log(id)
    deleteAssessmentFromBack(id);
  }

  return (
    <div className="assessment-inner">
      <div className="assessment-info">
        <p><b>Name: </b>{assessmentInfo.name}</p>
        <p><b>{assessmentInfo.count} out of {assessmentInfo.length} </b>questions answered</p>
        <p><b>MRL: </b>{assessmentInfo.target_mrl}</p>
        <p><b>Target Date: </b>{assessmentInfo.target}</p>
        <p><b>Additional Information: </b>{assessmentInfo.scope}</p>
        <p><b>Location: </b>{assessmentInfo.location}</p>
        <p><b>Level Switching On?: </b>{assessmentInfo.level_switching ? 'Yes' : 'No'}</p>
        <p><b>Team Members: </b>{assessmentInfo.team_members}</p>
      </div>
      <div className="assessment-actions">
        <IonButton size="small" expand="full" color="light" onClick={() => navigateToPage('questions')}>Continue Assessment</IonButton>
        <IonButton size="small" expand="full" color="light" onClick={() => navigateToPage('mrl_summary')}>MRL Summary</IonButton>
        <IonButton size="small" expand="full" color="light" onClick={() => navigateToPage('action-items')}>Action Items</IonButton>
        <IonButton size="small" expand="full" color="light" onClick={() => openInviteTM(assessmentInfo.id)} >Invite Team Members</IonButton>
        <IonButton size="small" expand="full" color="light">Edit Assessment Info</IonButton>
        <IonButton size="small" expand="full" color="light" onClick={() => removeAssessment(assessmentInfo.id)}>Delete Assessment</IonButton>
        <IonButton size="small" expand="full" color="light">Export Assessment</IonButton>
      </div>
    </div>
  )
}
export default AssessmentItem;
