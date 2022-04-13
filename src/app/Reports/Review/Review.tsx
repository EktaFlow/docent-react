import { IonPage, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonItem, IonLabel, IonSelect, IonSelectOption, IonContent } from '@ionic/react';
import React, { useState, useEffect } from 'react';

import './Review.scss';
import Header from '../../Framework/Header';
import InfoCard from '../InfoCard';
import ReportsTopbar from '../ReportsTopbar';

import { grabAssessments, grabThreads, grabSubthreads } from '../../../api/api'

const Review: React.FC = () => {

  useEffect(() => {
    async function getAssessments() {
      var asts = await grabAssessments();
      console.log(asts);
    }

    getAssessments();
  }, [])

  const data = [
    {
      question: {
        question_text: "Have industrial base capabilities and gaps/risks been identified for key technologies, components, and/or key processes?",
        current_answer: "no"
      },
      thread: {
        name: 'Technology & Industrial Base',
        mr_level: '4',
      },
      subthread: {
        name: 'A.1 - Technology Transition to Production'
      },
      answer: {
        objective_evidence: 'Some objective evidence'
      }
    },
    {
      question: {
        question_text: "Have pertinent Manufacturing Science (MS) and Advanced Manufacturing Technology requirements been identified?",
        current_answer: "yes"
      },
      thread: {
        name: 'Technology & Industrial Base',
        mr_level: '4',
      },
      subthread: {
        name: 'A.2 - Manufacturing Technology Development'
      },
      answer: {
        objective_evidence: ''
      }
    },
  ];

  const [reviewData, setReviewData] = useState(data);

  return (
    <IonPage>
      <Header />
      <ReportsTopbar text="Review" />
      <IonContent>
        <div className="review-wrapper">
          <InfoCard />
          <IonRow className="review-filter-toolbar">
            <IonCol size="12" size-lg="2" className="filter-button1">
              <IonButton expand="block" color="dsb">Export As XLS</IonButton>
            </IonCol>
            <IonCol size="12" size-lg="3" className="filter-item">
              <IonItem color="dark">
                <IonLabel position="floating">Filter MR Level</IonLabel>
                <IonSelect interface="popover">
                  <IonSelectOption value="all-levels">All Levels</IonSelectOption>
                  <IonSelectOption value="1">1</IonSelectOption>
                  <IonSelectOption value="2">2</IonSelectOption>
                  <IonSelectOption value="3">3</IonSelectOption>
                  <IonSelectOption value="4">4</IonSelectOption>
                  <IonSelectOption value="5">5</IonSelectOption>
                  <IonSelectOption value="6">6</IonSelectOption>
                  <IonSelectOption value="7">7</IonSelectOption>
                  <IonSelectOption value="8">8</IonSelectOption>
                  <IonSelectOption value="9">9</IonSelectOption>
                  <IonSelectOption value="10">10</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonCol>
            <IonCol size="12" size-lg="3" className="filter-item">
              <IonItem color="dark">
                <IonLabel position="floating">Filter Answer Type</IonLabel>
                <IonSelect interface="popover">
                  <IonSelectOption value="yes">Yes</IonSelectOption>
                  <IonSelectOption value="no">No</IonSelectOption>
                  <IonSelectOption value="n/a">N/A</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonCol>
            <IonCol size="6" size-lg="1" className="filter-button2">
              <IonButton expand="block" color="dsb" className="filter-buttons">Filter</IonButton>
            </IonCol>
            <IonCol size="6" size-lg="1" className="filter-button3">
              <IonButton expand="block" color="dsb" className="filter-buttons">Clear</IonButton>
            </IonCol>
          </IonRow>

          {reviewData.map((review, index) => (
            <div className="survey-info">
              <IonCard className="review-card">
                <IonCardHeader>
                  <IonCardTitle className="review-header">{review.question.question_text}</IonCardTitle>
                  {review.question.current_answer === 'yes' && <IonCardSubtitle className="box yes"><b>Yes</b></IonCardSubtitle>}
                  {review.question.current_answer === 'no' && <IonCardSubtitle className="box no"><b>No</b></IonCardSubtitle>}
                  {review.question.current_answer === 'na' && <IonCardSubtitle className="box na"><b>N/A</b></IonCardSubtitle>}
                </IonCardHeader>

                <IonCardContent className="review-card-content">
                  <h4>Thread: {review.thread.name} | SubThread: {review.subthread.name}</h4>
                  <h4>MRLevel: {review.thread.mr_level}</h4>
                  <h2><b>Objective Evidence:</b> {(review.answer.objective_evidence) ? <span>{review.answer.objective_evidence}</span> : <span>No objective evidence</span>}</h2>
                  {/* <h2><b>Objective Evidence:</b> {review.answer.objective_evidence}</h2> */}
                  <h2><b>Attachments:</b> No file attached to this question</h2>
                  <IonButton size="small" color="dsb">Go To Question</IonButton>
                </IonCardContent>
              </IonCard>
            </div>
          ))}
        </div>
      </IonContent>
    </IonPage>
  )
}
export default Review;
