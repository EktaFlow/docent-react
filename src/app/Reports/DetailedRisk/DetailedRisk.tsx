import { IonPage, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonButton, IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import './DetailedRisk.scss';
import Header from '../../Framework/Header';
import InfoCard from '../InfoCard';
import ReportsTopbar from '../ReportsTopbar';
import { symlinkSync } from 'fs';

import { grabSingleAssessment } from '../../../api/api'

const DetailedRisk: React.FC = () => {
  const data = [
    {
      //thread info
      name: 'Cost & Funding',
      mrl_level: '1',
      subthread: [
        {
          name: 'C.1 - Production Cost Knowledge (Cost modeling)',
          question: {
            question_text: 'Have hypotheses been developed regarding technology impact on affordability?'
          },
          answers: {
            risk: '',
            greatest_impact: '',
            risk_response: '',
            mmp_summary: ''
          }
        },
        {
          name: 'C.2 - Cost Analysis',
          question: {
            question_text: 'Have initial manufacturing and quality costs been identified?'
          },
          answers: {
            risk: '24',
            greatest_impact: 'Greatest Impact',
            risk_response: 'Risk Response',
            mmp_summary: 'MMP Summary'
          }
        }
      ]
    }
  ];
  const history = useHistory();
  const [assessmentId, setAssessmentId] = useState<number>();
  const [assessmentData, setAssessmentData] = useState<any>();
  const [reportData, setReportData] = useState(data);

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

  return (
    <IonPage>
      <Header showAssessment={true} assessmentId={assessmentId} />
      <ReportsTopbar text="Detailed Risk Report" />
      <IonContent>
        <div className="detailed-risk-wrapper">
          <InfoCard assessmentId={assessmentId} />
          <h2>Risk Report for MRL Level {reportData[0].mrl_level}</h2>

          <IonRow className="detailed-risk-toolbar">
            <IonCol size="12" size-lg="2" className="filter-button1 ion-padding-bottom">
              <IonButton expand="block" color="dsb">Export As XLS</IonButton>
            </IonCol>
            <IonCol size="12" size-lg="3" className="ion-no-padding">

            </IonCol>
            <IonCol size="12" size-lg="3" className="filter-item ion-no-padding">
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
            <IonCol size="6" size-lg="1" className="filter-button2 ion-padding-bottom">
              <IonButton expand="full" color="dsb" className="filter-buttons">Filter</IonButton>
            </IonCol>
            <IonCol size="6" size-lg="1" className="filter-button3 ion-padding-bottom">
              <IonButton expand="full" color="dsb" className="filter-buttons">Clear</IonButton>
            </IonCol>
          </IonRow>

          <div className="detailed-card-wrapper">
            {
              assessmentData && assessmentData.threads.map((thread: any, index: any) => (
                <IonCard className="detailed-risk-card" color="dark">
                  <IonCardHeader>
                    <IonCardTitle>Thread: {thread.name}</IonCardTitle>
                  </IonCardHeader>
                  {thread.subthreads.map((subthread: any, index: any) => (
                    <IonCard className="subthread-card" color="dark">
                      <IonCardHeader>
                        <IonCardTitle>Subthread: {subthread.name}</IonCardTitle>
                      </IonCardHeader>
                      {subthread.questions.map((question: any, index: any) => (
                        <div className="question">
                          <div>
                            <h4>{question.question_text}</h4>
                          </div>
                          <div>
                            {(question.answer.risk) ?
                              <p className="red"><b>Risk Score: </b>{question.answer.risk}</p> : <p><b>Risk Score: </b></p>
                            }
                            <div className="extra-risk">
                              <p><b>Greatest Impact: </b>{question.answer.greatest_impact}</p>
                              <p><b>Risk Response: </b>{question.answer.risk_response}</p>
                              <p><b>MMP Summary: </b>{question.answer.mmp_summary}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </IonCard>
                  ))}
                </IonCard>
              ))
            }
          </div>

          {/* <div className="detailed-card-wrapper">
            {reportData.map((report, index) => (
              <IonCard className="detailed-risk-card" color="dark">
                <IonCardHeader>
                  <IonCardTitle>Thread: {report.name}</IonCardTitle>
                </IonCardHeader>
                {report.subthread.map((subthread, index) => (
                  <div>
                    <IonCard className="subthread-card" color="dark">
                      <IonCardHeader>
                        <IonCardTitle>Subthread: {subthread.name}</IonCardTitle>
                      </IonCardHeader>
                      <div className="question">
                        <div>
                          <h4>{subthread.question.question_text}</h4>
                        </div>
                        <div>
                          {(subthread.answers.risk) ?
                            <p className="red"><b>Risk Score: </b>24</p> : <p><b>Risk Score: </b></p>
                          }
                          <div className="extra-risk">
                            <p><b>Greatest Impact: </b>{subthread.answers.greatest_impact}</p>
                            <p><b>Risk Response: </b>{subthread.answers.risk_response}</p>
                            <p><b>MMP Summary: </b>{subthread.answers.mmp_summary}</p>
                          </div>
                        </div>
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
export default DetailedRisk;
