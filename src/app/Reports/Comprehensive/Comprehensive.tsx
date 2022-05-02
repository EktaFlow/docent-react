import { IonPage, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonItem, IonLabel, IonSelect, IonSelectOption, IonContent } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import './Comprehensive.scss';
import Header from '../../Framework/Header';
import InfoCard from '../InfoCard';
import ReportsTopbar from '../ReportsTopbar';

import { grabSingleAssessment } from '../../../api/api'

const Comprehensive: React.FC = () => {
  const data = [
    {
      question: {
        question_text: 'Is the Technology Readiness at TRL 4 or greater?',
        current_answer: 'yes'
      },
      thread: {
        name: 'Technology Maturity',
        mr_level: '4',
      },
      subthread: {
        name: 'Technology Maturity'
      },
      answers: {
        objective_evidence: 'Evidence',
        assumptions: 'Assumptions',
        notes: 'Notes',
        who: 'John',
        when: '02/20/22',
        what: 'Action Plan',
        risk: '25',
        reason: 'reason',
        greatest_impact: 'Impact',
        risk_response: 'Response',
        mmp_summary: 'Summary'
      }
    },
    {
      question: {
        question_text: 'Have industrial base capabilities and gaps/risks been identified for key technologies, components, and/or key processes?',
        current_answer: 'no'
      },
      thread: {
        name: 'Technology & Industrial Base',
        mr_level: '4',
      },
      subthread: {
        name: 'A.1 - Technology Transition to Production'
      },
      answers: {
        objective_evidence: 'Evidence',
        assumptions: 'Assumptions',
        notes: 'Notes',
        who: 'John',
        when: '02/20/22',
        what: 'Action Plan',
        risk: '',
        reason: 'reason',
        greatest_impact: '',
        risk_response: '',
        mmp_summary: ''
      }
    },
    {
      question: {
        question_text: 'Have pertinent Manufacturing Science (MS) and Advanced Manufacturing Technology requirements been identified?',
        current_answer: 'na'
      },
      thread: {
        name: 'Technology & Industrial Base',
        mr_level: '4',
      },
      subthread: {
        name: 'A.2 - Manufacturing Technology Development'
      },
      answers: {
        objective_evidence: 'Evidence',
        assumptions: 'Assumptions',
        notes: 'Notes',
        who: 'John',
        when: '02/20/22',
        what: 'Action Plan',
        risk: '25',
        reason: 'reason',
        greatest_impact: 'Impact',
        risk_response: 'Response',
        mmp_summary: 'Summary'
      }
    },
  ];

  const history = useHistory();
  const [assessmentId, setAssessmentId] = useState<number>();
  const [comprehensiveData, setComprehensiveData] = useState(data);
  const [assessmentData, setAssessmentData] = useState<any>();

  useEffect(() => {
    async function getAssessmentInfo() {
      var his: any = history
      var assessment_id = his["location"]["state"]["assessment_id"]
      await setAssessmentId(assessment_id)
    }
    getAssessmentInfo()
  }, [])

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
      <ReportsTopbar text="Comprehensive Report" />
      <IonContent>
        <div className="comprehensive-wrapper">
          <InfoCard assessmentId={assessmentId} />
          <IonRow className="comprehensive-filter-toolbar">
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
              </IonItem></IonCol>
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
              <IonButton expand="full" color="dsb" className="filter-buttons">Filter</IonButton>
            </IonCol>
            <IonCol size="6" size-lg="1" className="filter-button3">
              <IonButton expand="full" color="dsb" className="filter-buttons">Clear</IonButton>
            </IonCol>
          </IonRow>

          {
            assessmentData && assessmentData.threads.map((thread: any, index: any) => (
              <div className="survey-info">
                {thread.subthreads.map((subthread: any, index: any) => (
                  <span>
                    {subthread.questions.map((question: any, index: any) => (
                      question.answer !== "Unanswered" &&
                      <IonCard className="review-card">
                        <IonCardHeader>
                          <IonCardTitle className="review-header">{question.question_text}</IonCardTitle>
                          {question.answer.answer === 'yes' && <IonCardSubtitle className="box yes"><b>Yes</b></IonCardSubtitle>}
                          {question.answer.answer === 'no' && <IonCardSubtitle className="box no"><b>No</b></IonCardSubtitle>}
                          {question.answer.answer === 'na' && <IonCardSubtitle className="box na"><b>N/A</b></IonCardSubtitle>}
                        </IonCardHeader>
                        <IonCardContent className="review-card-content">
                          <h4>Thread: {thread.name} | SubThread: {subthread.name}</h4>
                          <h4>MRLevel: {assessmentData.info.current_mrl}</h4>
                          {question.answer.answer === 'yes' &&
                            <span>
                              {(question.answer.objective_evidence) ?
                                <h2><b>Objective Evidence:</b> {question.answer.objective_evidence}</h2> : <h2><b>Objective Evidence:</b> No Objective Evidence Given</h2>
                              }
                              {(question.answer.assumptions_yes) ?
                                <h2><b>Assumptions:</b> {question.answer.assumptions_yes}</h2> : <h2><b>Assumptions:</b> No Assumptions Given</h2>
                              }
                              {(question.answer.notes_yes) ?
                                <h2><b>Notes:</b> {question.answer.notes_yes}</h2> : <h2><b>Notes:</b> No Notes Given</h2>
                              }
                            </span>
                          }
                          {question.answer.answer === 'no' &&
                            <span>
                              {(question.answer.who) ?
                                <h2><b>Owner:</b> {question.answer.who}</h2> : <h2><b>Owner:</b> No Owner Given</h2>
                              }
                              {(question.answer.when) ?
                                <h2><b>Due Date:</b> {question.answer.when}</h2> : <h2><b>Due Date:</b> No Due Date Given</h2>
                              }
                              {(question.answer.what) ?
                                <h2><b>Action Plan:</b> {question.answer.what}</h2> : <h2><b>Action Plan:</b> No Action Plan Given</h2>
                              }
                              {(question.answer.reason) ?
                                <h2><b>Reason:</b> {question.answer.reason}</h2> : <h2><b>Reason:</b> No Reason Given</h2>
                              }
                              {(question.answer.assumptions_no) ?
                                <h2><b>Assumptions:</b> {question.answer.assumptions_no}</h2> : <h2><b>Assumptions:</b> No Assumptions Given</h2>
                              }
                              {(question.answer.notes_no) ?
                                <h2><b>Notes:</b> {question.answer.notes_no}</h2> : <h2><b>Notes:</b> No Notes Given</h2>
                              }
                            </span>
                          }
                          <hr />
                          <h2><i>Risk Assessment</i></h2>
                          {(question.answer.risk) ?
                            <h2 id="red-text"><b>Risk Score:</b> {question.answer.risk}</h2> : <h2><b>Risk Score:</b> No Risk Given</h2>
                          }
                          {(question.answer.greatest_impact) ?
                            <h2><b>Greatest Impact:</b> {question.answer.greatest_impact}</h2> : <h2><b>Greatest Impact:</b> No Greatest Impact Given</h2>
                          }
                          {(question.answer.risk_response) ?
                            <h2><b>Risk Response:</b> {question.answer.risk_response}</h2> : <h2><b>Risk Response:</b> No Risk Response Given</h2>
                          }
                          {(question.answer.mmp_summary) ?
                            <h2><b>MMP Summary:</b> {question.answer.mmp_summary}</h2> : <h2><b>MMP Summary:</b> No MMP Summary Given</h2>
                          }
                          <hr />

                          <h2><b>Attachments:</b> No file attached to this question</h2>
                          <IonButton size="small" color="dsb">Go To Question</IonButton>
                        </IonCardContent>
                      </IonCard>
                    ))}
                  </span>
                ))}
              </div>
            ))
          }

          {/* {comprehensiveData.map((comprehensive, index) => (
            <div className="survey-info">
              <IonCard className="review-card">
                <IonCardHeader>
                  <IonCardTitle className="review-header">{comprehensive.question.question_text}</IonCardTitle>
                  {comprehensive.question.current_answer === 'yes' && <IonCardSubtitle className="box yes"><b>Yes</b></IonCardSubtitle>}
                  {comprehensive.question.current_answer === 'no' && <IonCardSubtitle className="box no"><b>No</b></IonCardSubtitle>}
                  {comprehensive.question.current_answer === 'na' && <IonCardSubtitle className="box na"><b>N/A</b></IonCardSubtitle>}
                </IonCardHeader>
                <IonCardContent className="review-card-content">
                  <h4>Thread: {comprehensive.thread.name} | SubThread: {comprehensive.subthread.name}</h4>
                  <h4>MRLevel: {comprehensive.thread.mr_level}</h4>
                  {comprehensive.question.current_answer === 'yes' &&
                    <span>
                      {(comprehensive.answers.objective_evidence) ?
                        <h2><b>Objective Evidence:</b> {comprehensive.answers.objective_evidence}</h2> : <h2><b>Objective Evidence:</b> No Objective Evidence Given</h2>
                      }
                      {(comprehensive.answers.assumptions) ?
                        <h2><b>Assumptions:</b> {comprehensive.answers.assumptions}</h2> : <h2><b>Assumptions:</b> No Assumptions Given</h2>
                      }
                      {(comprehensive.answers.notes) ?
                        <h2><b>Notes:</b> {comprehensive.answers.notes}</h2> : <h2><b>Notes:</b> No Notes Given</h2>
                      }
                    </span>
                  }
                  {comprehensive.question.current_answer === 'no' &&
                    <span>
                      {(comprehensive.answers.who) ?
                        <h2><b>Owner:</b> {comprehensive.answers.who}</h2> : <h2><b>Owner:</b> No Owner Given</h2>
                      }
                      {(comprehensive.answers.when) ?
                        <h2><b>Due Date:</b> {comprehensive.answers.when}</h2> : <h2><b>Due Date:</b> No Due Date Given</h2>
                      }
                      {(comprehensive.answers.what) ?
                        <h2><b>Action Plan:</b> {comprehensive.answers.what}</h2> : <h2><b>Action Plan:</b> No Action Plan Given</h2>
                      }
                      {(comprehensive.answers.reason) ?
                        <h2><b>Reason:</b> {comprehensive.answers.reason}</h2> : <h2><b>Reason:</b> No Reason Given</h2>
                      }
                      {(comprehensive.answers.assumptions) ?
                        <h2><b>Assumptions:</b> {comprehensive.answers.assumptions}</h2> : <h2><b>Assumptions:</b> No Assumptions Given</h2>
                      }
                      {(comprehensive.answers.notes) ?
                        <h2><b>Notes:</b> {comprehensive.answers.notes}</h2> : <h2><b>Notes:</b> No Notes Given</h2>
                      }
                    </span>
                  }
                  <hr />
                  <h2><i>Risk Assessment</i></h2>
                  {(comprehensive.answers.risk) ?
                    <h2 id="red-text"><b>Risk Score:</b> {comprehensive.answers.risk}</h2> : <h2><b>Risk Score:</b> No Risk Given</h2>
                  }
                  {(comprehensive.answers.greatest_impact) ?
                    <h2><b>Greatest Impact:</b> {comprehensive.answers.greatest_impact}</h2> : <h2><b>Greatest Impact:</b> No Greatest Impact Given</h2>
                  }
                  {(comprehensive.answers.risk_response) ?
                    <h2><b>Risk Response:</b> {comprehensive.answers.risk_response}</h2> : <h2><b>Risk Response:</b> No Risk Response Given</h2>
                  }
                  {(comprehensive.answers.mmp_summary) ?
                    <h2><b>MMP Summary:</b> {comprehensive.answers.mmp_summary}</h2> : <h2><b>MMP Summary:</b> No MMP Summary Given</h2>
                  }
                  <hr />

                  <h2><b>Attachments:</b> No file attached to this question</h2>
                  <IonButton size="small" color="dsb">Go To Question</IonButton>
                </IonCardContent>
              </IonCard>
            </div>
          ))} */}
        </div>
      </IonContent>
    </IonPage>
  )
}
export default Comprehensive;

