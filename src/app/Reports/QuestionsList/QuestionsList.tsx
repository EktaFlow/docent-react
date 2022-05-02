import { IonPage, IonContent, IonRow, IonCol, IonButton, IonItem, IonLabel, IonSelect, IonSelectOption, IonCard, IonCardHeader, IonCardTitle } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import './Questions.scss';
import Header from '../../Framework/Header';
import InfoCard from '../InfoCard';
import ReportsTopbar from '../ReportsTopbar';

import { grabSingleAssessment } from '../../../api/api'

const QuestionsList: React.FC = () => {
  const data = [
    {
      name: 'Technology & Industrial Base',
      mr_level: '4',
      subthread: [{
        name: 'A.1 - Technology Transition to Production',
        questions: [
          {
            question_text: "Have industrial base capabilities and gaps/risks been identified for key technologies, components, and/or key processes?",
            current_answer: "yes",
            skipped: false,
            answered: true,
            subthread_id: 1
          },
          {
            question_text: "Have pertinent Manufacturing Science (MS) and Advanced Manufacturing Technology requirements been identified?",
            current_answer: "no",
            skipped: false,
            answered: true,
            subthread_id: 2
          },
          {
            question_text: "Have pertinent Manufacturing Science (MS) and Advanced Manufacturing Technology requirements been identified?",
            current_answer: "na",
            skipped: false,
            answered: true,
            subthread_id: 2
          }
        ]
      }]
    },
  ];

  const [segmentData, setSegmentData] = useState(data);
  const [assessmentId, setAssessmentId] = useState<number>();
  const [assessmentData, setAssessmentData] = useState<any>();

  const history = useHistory();

  const [MRLevel, setMRLevel] = useState('all-levels');
  const [answerType, setAnswerType] = useState('all-answers');

  const [MRFilter, setMRFilter] = useState('all-levels');
  const [answerFilter, setAnswerFilter] = useState('all-answers');

  useEffect(() => {
    async function getAssessmentInfo() {
      var his: any = history
      var assessment_id = his["location"]["state"]["assessment_id"]
      await setAssessmentId(assessment_id)
    }
    getAssessmentInfo()
  }, []);

  useEffect(() => {
    async function getAssessment() {
      if (assessmentId) {
        var assessmentInfo = await grabSingleAssessment(assessmentId);
        await setAssessmentData(assessmentInfo)
      }
    }
    getAssessment();
  }, [assessmentId]);

  useEffect(() => {
    if (assessmentData) {
      console.log(assessmentData)
    }
  }, [assessmentData]);

  const setFilter = () => {
    setMRFilter(MRLevel);
    setAnswerFilter(answerType);
  };

  return (
    <IonPage>
      <Header showAssessment={true} assessmentId={assessmentId} />
      <ReportsTopbar text="Questions List" />
      <IonContent>
        <div className="questions-list-wrapper">
          <InfoCard assessmentId={assessmentId} />

          <IonRow className="questions-list-toolbar">
            <IonCol size="12" size-lg="2" className="filter-button1 ion-padding-bottom">
              <IonButton expand="block" color="dsb">Close All</IonButton>
            </IonCol>

            <IonCol size="12" size-lg="3" className="filter-item">
              <IonItem color="dark">
                <IonLabel position="floating">Filter MR Level</IonLabel>
                <IonSelect value={MRLevel} interface="popover" onIonChange={e => setMRLevel(e.detail.value)}>
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
                <IonSelect value={answerType} interface="popover" onIonChange={e => setAnswerType(e.detail.value)}>
                  <IonSelectOption value="all-answers">All Answers</IonSelectOption>
                  <IonSelectOption value="yes">Yes</IonSelectOption>
                  <IonSelectOption value="no">No</IonSelectOption>
                  <IonSelectOption value="n/a">N/A</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonCol>

            <IonCol size="6" size-lg="1" className="filter-button2">
              <IonButton expand="block" color="dsb" className="filter-buttons" onClick={() => setFilter}>Filter</IonButton>
            </IonCol>
            <IonCol size="6" size-lg="1" className="filter-button3">
              <IonButton expand="block" color="dsb" className="filter-buttons">Clear</IonButton>
            </IonCol>
          </IonRow>

          <div className="thread">
            {
              assessmentData && assessmentData.threads.map((thread: any, index: any) => (
                <IonCard className="thread-card" color="dark">
                  <IonCardHeader>
                    <IonCardTitle><img src="assets/if_icon-arrow-down.png" className="down-arrow"></img>{thread.name}</IonCardTitle>
                  </IonCardHeader>
                  {thread.subthreads.map((subthread: any, index: any) => (
                    <IonCard className="subthread-card" color="dark">
                      <IonCardHeader>
                        <IonCardTitle><img src="assets/if_icon-arrow-down.png" className="down-arrow"></img>{subthread.name}</IonCardTitle>
                      </IonCardHeader>
                      <div className="mrl">
                        <h6><b>MR Level: {assessmentData.info.current_mrl}</b></h6>
                        {subthread.questions.map((question: any, index: any) => (
                          <div className="question">
                            <h5 className="navigate-links">
                              <span>
                                {question.answer.answer === 'yes' &&
                                  <IonButton size="small" className="status-button green-button ion-no-padding">Yes</IonButton>
                                }
                                {question.answer.answer === 'no' &&
                                  <IonButton size="small" color="danger" className="status-button ion-no-padding">No</IonButton>
                                }
                                {(question.answer.answer === 'na' || question.answer === 'Unanswered' ) &&
                                  <IonButton size="small" className="status-button ion-no-padding">Unanswered</IonButton>
                                }
                              </span>
                              {question.question_text}
                            </h5>
                          </div>
                        ))}
                      </div>
                    </IonCard>
                  ))}
                </IonCard>
              ))}
          </div>

          {/* <div className="thread">
            {segmentData.map((segment, index) => (
              <IonCard className="thread-card" color="dark">
                <IonCardHeader>
                  <IonCardTitle><img src="assets/if_icon-arrow-down.png" className="down-arrow"></img>{segment.name}</IonCardTitle>
                </IonCardHeader>
                {segment.subthread.map((subthread, index) => (
                  <div>
                    <IonCard className="subthread-card" color="dark">
                      <IonCardHeader>
                        <IonCardTitle><img src="assets/if_icon-arrow-down.png" className="down-arrow"></img>{subthread.name}</IonCardTitle>
                      </IonCardHeader>
                      <div className="mrl">
                        <h6><b>MR Level {segment.mr_level}:</b></h6>
                        {subthread.questions.map((question, index) => (
                          <div className="question">
                            <h5 className="navigate-links">
                              <span>
                                {question.current_answer === 'yes' &&
                                  <IonButton size="small" className="status-button green-button ion-no-padding">Yes</IonButton>
                                }
                                {question.current_answer === 'no' &&
                                  <IonButton size="small" color="danger" className="status-button ion-no-padding">No</IonButton>
                                }
                                {question.current_answer === 'na' &&
                                  <IonButton size="small" className="status-button ion-no-padding">Unanswered</IonButton>
                                }
                              </span>
                              {question.question_text}
                            </h5>
                          </div>
                        ))}
                      </div>
                    </IonCard>
                  </div>
                ))}
              </IonCard>
            ))}
          </div> */}
        </div>
      </IonContent>
    </IonPage>
  )
}
export default QuestionsList;
