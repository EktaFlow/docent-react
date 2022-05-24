import React, { useState, useEffect } from 'react';

import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';
import './InfoCard.scss';

import { grabSingleAssessment } from '../../api/api'

const InfoCard: React.FC<{ assessmentId?: number }> = ({ assessmentId }) => {
  const [assessment, setAssessment] = useState<any>();

  useEffect(() => {
    async function getAssessment() {
      if (assessmentId) {
        var assessmentInfo = await grabSingleAssessment(assessmentId);
        setAssessment(assessmentInfo)
      }
    }
    getAssessment();
  }, [assessmentId])

  // useEffect(() => {
  //   if(assessment) {
  //     console.log(assessment)
  //   }
  // }, [assessment])

  return (
    <IonCard className="info-card" color="dark">
      <IonCardHeader>
        <IonCardTitle>Assessment Information</IonCardTitle>
      </IonCardHeader>
      <IonCardContent className="info-card-content">
        <p><b>Assessment Name:</b> {assessment && assessment.info.name}</p>
        <p><b>Target MRL:</b> {assessment && assessment.info.target_mrl}</p>
        <p><b>Target Date:</b> {assessment && assessment.info.target}</p>
        <p><b>Location:</b> {assessment && assessment.info.location}</p>
        <p><b>Team Members:</b></p>
      </IonCardContent>
    </IonCard>
  )
}
export default InfoCard;
