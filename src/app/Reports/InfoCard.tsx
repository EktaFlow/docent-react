import React, { useState, useEffect } from 'react';

import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';
import './InfoCard.scss';

import { grabAssessments } from '../../api/api'

const InfoCard: React.FC = () => {
  const dataStructure = [
    {
      assessment: {
        name: '',
        target_mrl: '',
        target: '',
        location: ''
      }
    }
  ]

  const [assessment, setAssessment] = useState<any>()

  const [teamMembers, setTeamMembers] = useState<any>()

  useEffect(() => {
    async function getAssessments() {
      var asts = await grabAssessments();
      // console.log(asts);
      setAssessment(asts.assessments[0].assessment);
      setTeamMembers(asts.assessments[0].team_members);
    }
    getAssessments();
  }, [])

  // useEffect(() => {
  //   if(assessmentData) {
  //     console.log(assessmentData)
  //   }
  // }, [assessmentData])

  return (
    <IonCard className="info-card" color="dark">
      <IonCardHeader>
        <IonCardTitle>Assessment Information</IonCardTitle>
      </IonCardHeader>
      <IonCardContent className="info-card-content">
        <p><b>Assessment Name:</b> {assessment && assessment.name}</p>
        <p><b>Target MRL:</b> {assessment && assessment.target_mrl}</p>
        <p><b>Target Date:</b> {assessment && assessment.target}</p>
        <p><b>Location:</b> {assessment && assessment.location}</p>
        <p><b>Team Members:</b></p>
      </IonCardContent>
    </IonCard>
  )
}
export default InfoCard;
