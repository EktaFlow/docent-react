import { IonPage, IonContent, IonRow, IonCol, IonButton } from '@ionic/react';
import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import './MRLSummary.scss';
import Header from '../../Framework/Header';
import InfoCard from '../InfoCard';
import ReportsTopbar from '../ReportsTopbar';

import { grabSingleAssessment } from '../../../api/api';

const MRLSummary: React.FC = () => {
  const mrLevel = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const history = useHistory();
  const [assessmentId, setAssessmentId] = useState<number>();
  const [assessmentData, setAssessmentData] = useState<any>();

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
      console.log(assessmentData.info.current_mrl)
    }
  }, [assessmentData]);

  const handleMRLevelChange = (value: any) => {
    console.log(value);
  }

  return (
    <IonPage>
      <Header showAssessment={true} assessmentId={assessmentId} />
      <ReportsTopbar text="MRL Summary" />
      <IonContent>
        <div className="mrl-summary-wrapper">
          <InfoCard assessmentId={assessmentId} />
          <IonRow className="mrl-summary-toolbar">
            <IonCol size="12" size-lg="2" className="download-image ion-padding-bottom">
              <IonButton color="dsb">Download Image</IonButton>
            </IonCol>
            <IonCol size-lg="2" className="ion-padding-top ion-margin-top">
              <span>subthread passed: </span>
              <div className="yes dashbox">
                <img className="dashpic" src="assets/check-mark-256.png" alt=""></img>
              </div>
            </IonCol>
            <IonCol size-lg="2" className="ion-padding-top ion-margin-top">
              <span>subthread failed: </span>
              <div className="no dashbox">
                <img className="dashpic" src="assets/x-mark-256.ico" alt=""></img>
              </div>
            </IonCol>
            <IonCol size-lg="2" className="ion-padding-top ion-margin-top">
              <span>subthread unanswered: </span>
              <div className="na dashbox">
                <img className="dashpic" src="assets/x-mark-256.ico" alt=""></img>
              </div>
            </IonCol>
            <IonCol size-lg="2" className="ion-padding-top ion-margin-top">
              <span>no subthread at this level: </span>
              <span className="blank dashbox">
                <img className="dashpic" src="assets/x-mark-256.ico" alt=""></img>
              </span>
            </IonCol>
          </IonRow>

          <div className="desktop">
            <hr />
            <div className="questions">
              <div className="header">
                <h5><b>MRLs</b></h5>
              </div>
              {mrLevel.map((mrLevel, index) => (
                <div className="answers">
                  {mrLevel}
                </div>
              ))}
            </div>
            <hr />

            {assessmentData && assessmentData.threads.map((thread: any, index: any) => (
              <div>
                <p className="thread"><b>{thread.name}</b></p>
                <hr />
                {thread.subthreads.map((subthread: any, index: any) => (
                  <div className="questions">
                    <div className="subthread header">{subthread.name}</div>
                    {mrLevel.map((mrLevel, index) => (
                      <div className="answers">
                        {(!subthread.questions[0] || mrLevel !== assessmentData.info.current_mrl) &&
                          <span className="blank dashbox">
                            <img className="dashpic" src="assets/x-mark-256.ico" alt=""></img>
                          </span>
                        }
                        {subthread.questions.map((question: any, index: any) => (
                          <div>
                            {(question.answer.answer === 'yes' && mrLevel === assessmentData.info.current_mrl) &&
                              <div className="yes dashbox">
                                <img className="dashpic" alt="" src="assets/check-mark-256.png"></img>
                              </div>
                            }
                            {(question.answer.answer === 'no' && mrLevel === assessmentData.info.current_mrl) &&
                              <div className="no dashbox">
                                <img className="dashpic" src="assets/x-mark-256.ico" alt=""></img>
                              </div>
                            }
                            {((question.answer.answer === 'na' || question.answer === 'Unanswered') && mrLevel === assessmentData.info.current_mrl) &&
                              <div className="na dashbox">
                                <img className="dashpic" src="assets/x-mark-256.ico" alt=""></img>
                              </div>
                            }
                            {/* {(question.answer === 'Unanswered' && mrLevel === assessmentData.info.current_mrl) &&
                              <span className="blank dashbox">
                                <img className="dashpic" src="assets/x-mark-256.ico" alt=""></img>
                              </span>
                            } */}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
                <hr />
              </div>
            ))}
          </div>

          <div className="mobile">
            {assessmentData && assessmentData.threads.map((thread: any, index: any) => (
              <div className="single-thread">
                <h3>{thread.name}</h3>
                {thread.subthreads.map((subthread: any, index: any) => (
                  <div className="questions">
                    <h6>{subthread.name}</h6>
                    <div className="answer-row">
                      {mrLevel.map((mrLevel, index) => (
                        <div className="answers">
                          <p className="level-num">{mrLevel}</p>
                          {(!subthread.questions[0] || mrLevel !== assessmentData.info.current_mrl) &&
                            <span className="blank dashbox">
                              <img className="dashpic" src="assets/x-mark-256.ico" alt=""></img>
                            </span>
                          }
                          {subthread.questions.map((question: any, index: any) => (
                            <div>
                              {(question.answer.answer === 'yes' && mrLevel === assessmentData.info.current_mrl) &&
                                <div className="yes dashbox">
                                  <img className="dashpic" alt="" src="assets/check-mark-256.png"></img>
                                </div>
                              }
                              {(question.answer.answer === 'no' && mrLevel === assessmentData.info.current_mrl) &&
                                <div className="no dashbox">
                                  <img className="dashpic" src="assets/x-mark-256.ico" alt=""></img>
                                </div>
                              }
                              {((question.answer.answer === 'na' || question.answer === 'Unanswered') && mrLevel === assessmentData.info.current_mrl) &&
                                <div className="na dashbox">
                                  <img className="dashpic" src="assets/x-mark-256.ico" alt=""></img>
                                </div>
                              }
                              {/* {(question.answer === 'Unanswered' && mrLevel === assessmentData.info.current_mrl) &&
                                <span className="blank dashbox">
                                  <img className="dashpic" src="assets/x-mark-256.ico" alt=""></img>
                                </span>
                              } */}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage >
  )
}
export default MRLSummary;
