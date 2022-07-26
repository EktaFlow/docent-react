import { IonPage, IonContent, IonRow, IonCol, IonButton } from '@ionic/react';
import React, { useState, useEffect, Fragment, useRef } from 'react';

import { useHistory } from 'react-router-dom';

import './MRLSummary.scss';
import Header from '../../Framework/Header';
import InfoCard from '../InfoCard';
import ReportsTopbar from '../ReportsTopbar';

import { grabSingleAssessment } from '../../../api/api';

import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from 'react-component-export-image';
import html2canvas from 'html2canvas';


// const ComponentToScreenShot = React.forwardRef((props, ref) => (
//   <div ref={ref}>Hello World</div>
// ));

const MRLSummary: React.FC = () => {
  const screenshotRef = useRef<HTMLDivElement>(); 
  const mrLevel = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const history = useHistory();
  const [assessmentId, setAssessmentId] = useState<number>();
  const [assessmentData, setAssessmentData] = useState<any>();
  const [questionData, setQuestionData] = useState<any>([]);

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
      let answerYes = false;
      let answerNo = false;
      let answerArray: { answer: string, subthread_name: string; }[] = [];

      let insertQuestionData = assessmentData.threads.map((thread: any) => (
        thread.subthreads.map((subthread: any) => {
          subthread.questions.map((question: any) => {

            if (question.answer.answer === 'yes') {
              answerYes = true;
            }
            else if (question.answer.answer === 'no') {
              answerNo = true;
            }
          })
          // console.log(subthread);
          if (answerYes === true && answerNo === false) {
            answerArray.push(
              { answer: 'yes', subthread_name: subthread.name }
            )
          }
          else if (answerNo === true) {
            answerArray.push(
              { answer: 'no', subthread_name: subthread.name }
            )
          }
          else if (!subthread.questions[0]) {
            answerArray.push(
              { answer: '', subthread_name: subthread.name }
            )
          }
          else {
            answerArray.push(
              { answer: 'na', subthread_name: subthread.name }
            )
          }
          setQuestionData(answerArray);
          answerYes = false;
          answerNo = false
        })
      ));
    }
  }, [assessmentData]);

  // const handleDownloadImage = async () => {
  //   const element = screenshotRef.current;
  //   const canvas = await html2canvas(element as <HTMLElement>);

  //   const data = canvas.toDataURL('mrl_summary/png');
  //   const link = document.createElement('a');

  //   if (typeof link.download === 'string') {
  //     link.href = data;
  //     link.download = 'mrl_summary.png';

  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   } else {
  //     window.open(data);
  //   }
  // };

  // <InfoCard assessmentId={assessmentId} />

  return (
    <IonPage>
      <Header showAssessment={true} assessmentId={assessmentId} />
      <ReportsTopbar text="MRL Summary" />
      {/* <Fragment>
        <ComponentToScreenShot ref={screenshot}/>
      </Fragment> */}

      <div>
        <div className="mrl-summary-wrapper">
          <IonRow className="mrl-summary-toolbar">
            <IonCol size="12" size-lg="2" className="download-image ion-padding-bottom">
              <div onClick={() => exportComponentAsPNG(screenshotRef as React.RefObject<HTMLDivElement>)}>
              <IonButton color="dsb" >Download Image</IonButton> 
              </div>
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

          <div className="desktop" ref={screenshotRef as React.RefObject<HTMLDivElement>}>
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
                        {questionData.map((question: any, index: any) => (
                          <div>
                            {(question.answer === 'yes' && mrLevel === assessmentData.info.current_mrl && question.subthread_name === subthread.name) &&
                              <div className="yes dashbox">
                                <img className="dashpic" alt="" src="assets/check-mark-256.png"></img>
                              </div>
                            }
                            {(question.answer === 'no' && mrLevel === assessmentData.info.current_mrl && question.subthread_name === subthread.name) &&
                              <div className="no dashbox">
                                <img className="dashpic" src="assets/x-mark-256.ico" alt=""></img>
                              </div>
                            }
                            {((question.answer === 'na' || question.answer === 'Unanswered') && mrLevel === assessmentData.info.current_mrl && question.subthread_name === subthread.name) &&
                              <div className="na dashbox">
                                <img className="dashpic" src="assets/x-mark-256.ico" alt=""></img>
                              </div>
                            }
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
                          {questionData.map((question: any, index: any) => (
                            <div>
                              {(question.answer === 'yes' && mrLevel === assessmentData.info.current_mrl && question.subthread_name === subthread.name) &&
                                <div className="yes dashbox">
                                  <img className="dashpic" alt="" src="assets/check-mark-256.png"></img>
                                </div>
                              }
                              {(question.answer === 'no' && mrLevel === assessmentData.info.current_mrl && question.subthread_name === subthread.name) &&
                                <div className="no dashbox">
                                  <img className="dashpic" src="assets/x-mark-256.ico" alt=""></img>
                                </div>
                              }
                              {((question.answer === 'na' || question.answer === 'Unanswered') && mrLevel === assessmentData.info.current_mrl && question.subthread_name === subthread.name) &&
                                <div className="na dashbox">
                                  <img className="dashpic" src="assets/x-mark-256.ico" alt=""></img>
                                </div>
                              }
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
      </div>
    </IonPage >
  )
}
export default MRLSummary;
