import React, { useEffect, useState } from 'react'

import './Components.scss';
import { IonButton } from '@ionic/react';

import { deleteAssessment } from '../../../api/api'
import { id } from 'date-fns/locale';

import { useHistory } from 'react-router-dom';

type AIP = {
  ast: {
    id: number,
    name: string,
    count: number,
    length: number,
    target_mrl: number,
    target: string,
    scope: string,
    level_switching: boolean,
    location: string,
  }
}

const AssessmentItem: React.FC<AIP> = (props) => {
  const history = useHistory();
  async function navigateToPage(value: string) {
    history.push({
      pathname: `/${value}`,
      state: {
        assessment_id: props.ast.id as number
      }
    })
  }

  const removeAssessment = (id: number) => {
    deleteAssessment(id);
  }

  return (
    <div className="assessment-inner">
      <div className="assessment-info">
        <p><b>Name: </b>{props.ast.name}</p>
        <p><b>{props.ast.count} out of {props.ast.length} </b>questions answered</p>
        <p><b>MRL: </b>{props.ast.target_mrl}</p>
        <p><b>Target Date: </b>{props.ast.target}</p>
        <p><b>Additional Information: </b>{props.ast.scope}</p>
        <p><b>Location: </b>{props.ast.location}</p>
        <p><b>Level Switching On?: </b>{props.ast.level_switching ? 'Yes' : 'No'}</p>
        <p><b>Team Members: </b>james@ekta.co</p>
      </div>
      <div className="assessment-actions">
        <IonButton size="small" expand="full" color="light" onClick={() => navigateToPage('questions')}>Continue Assessment</IonButton>
        <IonButton size="small" expand="full" color="light" onClick={() => navigateToPage('mrl-summary')}>MRL Summary</IonButton>
        <IonButton size="small" expand="full" color="light" onClick={() => navigateToPage('action-items')}>Action Items</IonButton>
        <IonButton size="small" expand="full" color="light">Invite Team Members</IonButton>
        <IonButton size="small" expand="full" color="light">Edit Assessment Info</IonButton>
        <IonButton size="small" expand="full" color="light" onClick={() => removeAssessment(props.ast.id)}>Delete Assessment</IonButton>
        <IonButton size="small" expand="full" color="light">Export Assessment</IonButton>
      </div>
    </div>
  )
}
export default AssessmentItem;
