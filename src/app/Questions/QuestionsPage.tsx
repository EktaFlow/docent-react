import { IonPage, IonItem, IonLabel, IonSelect, IonSelectOption, IonButton, IonHeader, IonToolbar, IonTitle, IonRow, IonCol, IonContent, IonGrid, IonTextarea, IonInput, IonDatetime, IonModal, IonText, IonPopover } from '@ionic/react';
import React, { useState, useEffect, useRef } from 'react';

import { RouteComponentProps } from 'react-router-dom';

import Header from '../Framework/Header';
import './QuestionsPage.scss';

import { format, parseISO } from 'date-fns';
import { createAnswers, grabAnswers } from '../../api/api';

import { assessmentId } from '../../variables.jsx'

import Topbar from './Topbar';
import RiskAssessment from './RiskAssessment/RiskAssessment';
import RiskMatrix from './RiskAssessment/RiskMatrix';

const QuestionsPage: React.FC = () => {
  const questions = ['Have industrial base capabilities and gaps/risks been identified for key technologies, components, and/or key processes?',
    'Have pertinent Manufacturing Science (MS) and Advanced Manufacturing Technology requirements been identified?',
    'Are initial producibility and manufacturability assessments of preferred systems concepts completed?',
    'Are the results of the producibility and manufacturability assessment being considered in the selection of preferred design concepts?'
  ];

  const [questionList, setQuestionList] = useState(questions);

  const [answers, setAnswers] = useState({
    answer: '',
    likelihood: '',
    consequence: '',
    risk_response: '',
    greatest_impact: '',
    mmp_summary: '',
    objective_evidence: '',
    assumptions_yes: '',
    notes_yes: '',
    what: '',
    when: '',
    who: '',
    risk: '',
    reason: '',
    assumptions_no: '',
    documentation_no: '',
    assumptions_na: '',
    assumptions_skipped: '',
    notes_skipped: '',
    notes_no: '',
    notes_na: '',
  });

  const [questionCount, setQuestionCount] = useState(0);

  const [explanationText, showExplanationText] = useState(false);

  const [yes, setYes] = useState(false);
  const [no, setNo] = useState(false);
  const [na, setNA] = useState(false);

  const [likelihood, setLikelihood] = useState<number>();
  const [consequence, setConsequence] = useState<number>();
  const [riskScore, setRiskScore] = useState<number>();

  const [selectedDate, setSelectedDate] = useState('');

  const fileInput = useRef(null);

  useEffect(() => {
    async function getAnswers() {
      var ans = await grabAnswers();
      console.log(ans)
    }
    getAnswers()
  }, []);

  useEffect(() => {
    // console.log(match.params.id)
  }, []);

  async function saveAnswers() {
    var ans = await createAnswers(answers)
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleAnswerChange = (e: any) => {
    setAnswers({
      ...answers,
      [e.target.name]: e.target.value
    });
  };

  const getLikelihood = (data: any) => {
    setLikelihood(data);
    setAnswers({
      ...answers,
      likelihood: data
    });
  }

  const getConsequence = (data: any) => {
    setConsequence(data);
    setAnswers({
      ...answers,
      consequence: data
    });
  }

  const getRiskScore = (data: any) => {
    setRiskScore(data);
    setAnswers({
      ...answers,
      risk: data
    });
  }

  const changeInterface = (answer: any) => {
    if (answer === "yes") {
      setYes(true);
      setNo(false);
      setNA(false);
      setAnswers({
        ...answers,
        answer: 'yes'
      });
    }
    else if (answer === "no") {
      setYes(false);
      setNo(true);
      setNA(false);
      setAnswers({
        ...answers,
        answer: 'no'
      });
    }
    else if (answer === "n/a") {
      setYes(false);
      setNo(false);
      setNA(true);
      setAnswers({
        ...answers,
        answer: 'na'
      });
    }
  }

  const getWhen = (value: any) => {
    setAnswers({
      ...answers,
      when: value
    });
  }

  const getRiskResponse = (value: any) => {
    setAnswers({
      ...answers,
      risk_response: value
    });
  }

  const getMMPSummary = (value: any) => {
    setAnswers({
      ...answers,
      mmp_summary: value
    });
  }

  const getGreatestImpact = (value: any) => {
    setAnswers({
      ...answers,
      greatest_impact: value
    });
  }

  const getAssumptions = (value: any) => {
    if (yes) {
      setAnswers({
        ...answers,
        assumptions_yes: value,
        assumptions_no: '',
        assumptions_na: ''
      });
    }
    else if (no) {
      setAnswers({
        ...answers,
        assumptions_yes: '',
        assumptions_no: value,
        assumptions_na: ''
      });
    }
    else if (na) {
      setAnswers({
        ...answers,
        assumptions_yes: '',
        assumptions_no: '',
        assumptions_na: value
      });
    }
  }

  const getNotes = (value: any) => {
    if (yes) {
      setAnswers({
        ...answers,
        notes_yes: value,
        notes_no: '',
        notes_na: ''
      });
    }
    else if (no) {
      setAnswers({
        ...answers,
        notes_yes: '',
        notes_no: value,
        notes_na: ''
      });
    }
    else if (na) {
      setAnswers({
        ...answers,
        notes_yes: '',
        notes_no: '',
        notes_na: value
      });
    }
  }

  const handlePreviousPageClick = () => {
    if (questionCount > 0) {
      let questionNum = questionCount - 1;
      setQuestionCount(questionNum);
    }
  }

  const handleNextPageClick = () => {
    if (questionCount < 3) {
      let questionNum = questionCount + 1;
      setQuestionCount(questionNum);
    }
  }

  const formatDate = (value: any) => {
    let formattedDate = format(parseISO(value), 'MMM dd yyyy');
    setSelectedDate(formattedDate);
    return formattedDate;
  };

  return (
    <IonPage className="question-page-wrapper">
      <Header showReportsTab={true} />
      <Topbar />
      <IonContent>

        <div className="content-wrapper">
          <IonGrid>
            <IonRow>
              <IonCol size="9"><h2>{questionList[questionCount]}</h2></IonCol>
              <IonCol size="3">
                <div className="title-wrapper">
                  <div>
                    <IonButton color="dsb" onClick={() => handlePreviousPageClick()}>Previous</IonButton>
                    <IonButton color="dsb" onClick={() => handleNextPageClick()}>Next</IonButton>
                    <IonButton color="dsb" onClick={() => saveAnswers()}>Save</IonButton>
                  </div>
                </div>
              </IonCol>

              <IonCol size="12" size-lg="5">
                <IonItem color="dark">
                  <IonLabel position="floating">Select Answer</IonLabel>
                  <IonSelect
                    name="answer"
                    value={answers.answer}
                    interface="popover"
                    onIonChange={e => changeInterface(e.detail.value)}>
                    <IonSelectOption value="yes">Yes</IonSelectOption>
                    <IonSelectOption value="no">No</IonSelectOption>
                    <IonSelectOption value="n/a">N/A</IonSelectOption>
                  </IonSelect>
                </IonItem>

                <IonButton color="dsb" onClick={() => showExplanationText(!explanationText)}>Explanation Text</IonButton>

                {explanationText && <div className="explanation-text">
                  <p>TRL 1: Basic principles observed and reported
                  </p>
                  <p>
                    Description:<br />
                    Lowest level of technology readiness. Scientific research begins to be translated into applied research and development (R&D). Examples might include paper studies of a technology’s basic properties.
                  </p>
                  <p>
                    Supporting Information:
                    Published research that identifies the principles that underlie this technology. References to who, where, when.
                  </p>
                  <p>
                    Examples of ‘Objective Evidence’:<br />
                    ● TRA Report is TRL of 1 or greater
                  </p>
                </div>}

                {yes && <div>
                  <IonItem color="dark">
                    <IonLabel position="floating">Objective Evidence</IonLabel>
                    <IonTextarea
                      name="objective_evidence"
                      value={answers.objective_evidence}
                      placeholder="What needs to be done to meet this objective?"
                      onIonChange={handleAnswerChange}>
                    </IonTextarea>
                  </IonItem>
                </div>}

                {no && <div>
                  <h3><b>Action Plan</b></h3>
                  <IonRow>
                    <IonCol size="12" size-lg="6" className="ion-no-padding">
                      <IonItem color="dark">
                        <IonLabel position="floating">Owner</IonLabel>
                        <IonInput
                          name="who"
                          value={answers.who}
                          onIonChange={handleAnswerChange}>
                        </IonInput>
                      </IonItem>
                    </IonCol>
                    <IonCol size="12" size-lg="6" className="ion-no-padding due-date-col">
                      <IonItem button={true} color="dark" id="open-date-input">
                        <IonLabel>Due Date</IonLabel>
                        <IonText slot="end">{selectedDate}</IonText>
                        <IonPopover trigger="open-date-input" showBackdrop={false}>
                          <IonDatetime
                            presentation="date"
                            onIonChange={e => getWhen(formatDate(e.detail.value))} />
                        </IonPopover>
                      </IonItem>
                    </IonCol>
                  </IonRow>

                  <IonItem color="dark">
                    <IonLabel position="floating">Action Item</IonLabel>
                    <IonTextarea
                      name="what"
                      value={answers.what}
                      placeholder="What needs to be done to meet this objective?"
                      onIonChange={handleAnswerChange}>
                    </IonTextarea>
                  </IonItem>
                  <IonItem color="dark">
                    <IonLabel position="floating">Reason</IonLabel>
                    <IonTextarea
                      name="reason"
                      value={answers.reason}
                      placeholder="Reason that the criteria is not met..."
                      onIonChange={handleAnswerChange}>
                    </IonTextarea>
                  </IonItem>
                </div>}

                {na && <div>
                  <IonItem color="dark">
                    <IonLabel position="floating">Documentation</IonLabel>
                    <IonTextarea
                      name="documentation_no"
                      value={answers.documentation_no}
                      placeholder="Document why this question is not applicable..."
                      onIonChange={handleAnswerChange}>
                    </IonTextarea>
                  </IonItem>
                </div>}

                <IonItem color="dark">
                  <IonLabel position="floating">Assumptions</IonLabel>
                  <IonTextarea
                    name="assumptions"
                    placeholder="Enter any assumptions here..."
                    onIonChange={e => getAssumptions(e.detail.value)}>
                  </IonTextarea>
                </IonItem>

                <IonItem color="dark">
                  <IonLabel position="floating">Notes</IonLabel>
                  <IonTextarea
                    name="notes"
                    placeholder="Enter any notes here..."
                    onIonChange={e => getNotes(e.detail.value)}>
                  </IonTextarea>
                </IonItem>

                <IonButton
                  color="dsb"
                  onClick={() => {
                    // @ts-ignore
                    fileInput?.current?.click();
                  }}>
                  Attach File
                </IonButton>

                <input
                  type="file"
                  ref={fileInput}
                  hidden>
                </input>

                <IonHeader>
                  <IonToolbar className="toolbar">
                    <IonTitle>Attachments</IonTitle>
                  </IonToolbar>
                </IonHeader>

                <div className="attachments-content">
                  {/* <table className="attachments-table"> */}
                  <IonRow>
                    <IonCol className="ion-no-padding">
                      <IonLabel className="attachment-label file-name-label">File</IonLabel>
                    </IonCol>
                    <IonCol className="ion-no-padding">
                      <IonLabel className="attachment-label date-label">Date Added</IonLabel>
                    </IonCol>
                    <IonCol id="view" className="ion-no-padding">
                      <IonLabel className="attachment-label view-label">View</IonLabel>
                    </IonCol>
                    <IonCol id="delete" className="ion-no-padding">
                      <IonLabel className="attachment-label delete-label">Delete</IonLabel>
                    </IonCol>
                  </IonRow>
                  {/* </table> */}
                </div>
              </IonCol>
              <IonCol size="12" size-lg="3">
                <RiskAssessment
                  getLikelihood={getLikelihood}
                  getConsequence={getConsequence}
                  getRiskScore={getRiskScore}
                  getRiskResponse={getRiskResponse}
                  getMMPSummary={getMMPSummary}
                  getGreatestImpact={getGreatestImpact}
                  greatest_impact={answers.greatest_impact}
                  risk_response={answers.risk_response}
                  mmp_summary={answers.mmp_summary}
                />
              </IonCol>
              <IonCol size="12" size-lg="4">
                <RiskMatrix
                  likelihood={likelihood} consequence={consequence} riskScore={riskScore}
                />
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>

      </IonContent>
    </IonPage>
  )
}
export default QuestionsPage;
