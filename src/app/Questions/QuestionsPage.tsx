import { IonPage, IonItem, IonLabel, IonSelect, IonSelectOption, IonButton, IonHeader, IonToolbar, IonTitle, IonRow, IonCol, IonContent, IonGrid, IonTextarea, IonInput, IonDatetime, IonModal, IonText, IonPopover, IonToast } from '@ionic/react';
import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { RouteComponentProps } from 'react-router-dom';

import Header from '../Framework/Header';
import './QuestionsPage.scss';

import { format, parseISO } from 'date-fns';

// import { assessmentId } from '../../variables.jsx'

import { createAnswers, grabAnswers, grabNextQuestion, grabNextQuestionAction } from '../../api/api';


import Topbar from './Topbar';
import RiskAssessment from './RiskAssessment/RiskAssessment';
import RiskMatrix from './RiskAssessment/RiskMatrix';

const QuestionsPage: React.FC = (props) => {

  // const [questionList, setQuestionList] = useState(questions);
  const [answer, setAnswer] = useState({
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
  const history = useHistory();

  const [questionCount, setQuestionCount] = useState(0);

  const [explanationText, showExplanationText] = useState(false);

  const [yes, setYes] = useState(false);
  const [no, setNo] = useState(false);
  const [na, setNA] = useState(false);

  const [likelihood, setLikelihood] = useState<number>();
  const [consequence, setConsequence] = useState<number>();
  const [riskScore, setRiskScore] = useState<number>();

  const [selectedDate, setSelectedDate] = useState('');
  const [question, setQuestion] = useState({
    question_text: '', answered: false, assessment_length: 0, current_answer_text: '', current_mrl: 0, position: 0, question_id: 0
  })
  const [subthread, setSubthread] = useState({
    help_text: '', id: null, name: ''
  })
  const [thread, setThread] = useState({
    id: null, mr_level: null, name: ''
  })
  const [assessInfo, setAssessInfo] = useState({
    targetDate: null, additionalInfo: ''
  })
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({message: '', status: ''});
  const [valuesChanged, setValuesChanged] = useState(false)

  const fileInput = useRef(null);

  useEffect(() => {
    // console.log(history)
    var his: any = history
    if (his["location"]["state"]){
      var ast_id = his["location"]["state"]["assessment_id"]
      // console.log(ast_id)
      var question = grabQ(ast_id)
    }
  }, []);

  useEffect(() => {
    var his: any = history
    // console.log(his)
    if (his["location"]["state"]){
      var ast_id = his["location"]["state"]["assessment_id"]
      // console.log(ast_id)
      var question = grabQ(ast_id)
    }
  }, [history])

  async function grabQ(assessment_id: Number) {
    console.log(assessment_id)

    var next_question = await grabNextQuestion(assessment_id)
      .then((res) => {
        setUpQuestionsPage(res)
        return res
      })
      .catch((error) => {
        console.log(error)
      })
  }


  async function getNextQuestion(movement_action:any){
    //will run and grab the right question
    if (yes == true || no == true || na == true){
      if (valuesChanged == true) {
        console.log('in save answers')
        saveAnswers();
      }
    }
    var his:any = history
    var ast_id = his["location"]["state"]["assessment_id"]
    // getNextQuestion('next')
    console.log('moving on');
    // console.log(movement_action);
    setShowToast(true);
    setToastMessage({message: 'Navigating to Question', status: 'primary'})
    await grabNextQuestionAction(ast_id, movement_action, question.question_id)
    .then((res) => {
      setUpQuestionsPage(res)
      setShowToast(false);
    })
    .catch((err) => {
      setToastMessage({message: 'Error navigating to next question, please refresh', status: 'danger'})
      setTimeout(() => {
        setShowToast(false)
      }, 2000)
    })

  }

  function setUpQuestionsPage(res:any) {
    setQuestion(res.question)
    setSubthread(res.subthread)
    setThread(res.thread)
    setAssessInfo(res.assessment_info)
    if (res.question.current_answer !== []){
      setAnswer(res.question.current_answer);
      console.log(res.question.current_answer)
      var ci = changeInterface(res.question.current_answer.answer);
      console.log(ci)
      if (ci == 'done'){
        setValuesChanged(false)
      }

    }
  }


  async function saveAnswers() {
    var data = {
      question_id: question.question_id,
      answer: answer
    }
    setShowToast(true)
    setToastMessage({message: 'Answers Saving', status: 'primary'})
    await createAnswers(data)
      .then((res) => {
        setToastMessage({message: 'Answers have Saved', status: 'success'})
        setTimeout(() => {
          setShowToast(false)
        }, 2000)
        return res
      })
      .catch((error) => {
        // setShowToast(true)
        setToastMessage({message: 'Error saving answers', status: 'danger'})
        setTimeout(() => {
          setShowToast(false)
        }, 2000)
      })
  }

  const handleAnswerChange = (e: any) => {
    setAnswer({
      ...answer,
      [e.target.name]: e.target.value
    });
    console.log('values')
    setValuesChanged(true)
  };

  const getLikelihood = (data: any) => {
    setLikelihood(data);
    setAnswer({
      ...answer,
      likelihood: data
    });
    console.log('values')
    setValuesChanged(true)
  }

  const getConsequence = (data: any) => {
    setConsequence(data);
    setAnswer({
      ...answer,
      consequence: data
    });
    console.log('values')
    setValuesChanged(true)
  }

  const getRiskScore = (data: any) => {
    setRiskScore(data);
    setAnswer({
      ...answer,
      risk: data
    });
    console.log('values')
    setValuesChanged(true)
  }

  const changeInterface = (answer: any) => {
    if (answer === "yes") {
      setYes(true);
      setNo(false);
      setNA(false);
      setAnswer({
        ...answer,
        answer: 'yes'
      });
      console.log('values')
      setValuesChanged(true)
      return 'done'
    }
    else if (answer === "no") {
      setYes(false);
      setNo(true);
      setNA(false);
      setAnswer({
        ...answer,
        answer: 'no'
      });
      console.log('values')
      setValuesChanged(true)
      return 'done'
    }
    else if (answer === "n/a") {
      setYes(false);
      setNo(false);
      setNA(true);
      setAnswer({
        ...answer,
        answer: 'na'
      });
      console.log('values')
      setValuesChanged(true)
      return 'done'
    }
  }


  const getWhen = (value: any) => {
    setAnswer({
      ...answer,
      when: value
    });
    console.log('values')
    setValuesChanged(true)
  }

  const getRiskResponse = (value: any) => {
    setAnswer({
      ...answer,
      risk_response: value
    });
    console.log('values')
    setValuesChanged(true)
  }

  const getMMPSummary = (value: any) => {
    console.log(value)
    // setAnswer({
    //   ...answer,
    //   mmp_summary: value
    // });
    // console.log('values')
    // setValuesChanged(true)
  }

  const getGreatestImpact = (value: any) => {
    setAnswer({
      ...answer,
      greatest_impact: value
    });
    console.log('values')
    setValuesChanged(true)
  }

  const getAssumptions = (value: any) => {
    if (yes) {
      setAnswer({
        ...answer,
        assumptions_yes: value,
        assumptions_no: '',
        assumptions_na: ''
      });
      console.log('values')
      setValuesChanged(true)
    }
    else if (no) {
      setAnswer({
        ...answer,
        assumptions_yes: '',
        assumptions_no: value,
        assumptions_na: ''
      });
      console.log('values')
      setValuesChanged(true)
    }
    else if (na) {
      setAnswer({
        ...answer,
        assumptions_yes: '',
        assumptions_no: '',
        assumptions_na: value
      });
      console.log('values')
      setValuesChanged(true)
    }
  }

  const getNotes = (value: any) => {
    if (yes) {
      setAnswer({
        ...answer,
        notes_yes: value,
        notes_no: '',
        notes_na: ''
      });
      console.log('values')
      setValuesChanged(true)
    }
    else if (no) {
      setAnswer({
        ...answer,
        notes_yes: '',
        notes_no: value,
        notes_na: ''
      });
      console.log('values')
      setValuesChanged(true)
    }
    else if (na) {
      setAnswer({
        ...answer,
        notes_yes: '',
        notes_no: '',
        notes_na: value
      });
      console.log('values')
      setValuesChanged(true)
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
      <Topbar getNextQuestion={getNextQuestion} saveAnswers={saveAnswers} question={question} subthread={subthread} thread={thread} assessInfo={assessInfo}/>
      <IonContent>

        <div className="content-wrapper">
          <IonGrid>
            <IonRow>
              <IonCol size="9"><h2>{question.question_text}</h2></IonCol>


              <IonCol size="12" size-lg="5">
                <IonItem color="dark">
                  <IonLabel position="floating">Select Answer</IonLabel>
                  <IonSelect
                    name="answer"
                    value={answer.answer}
                    interface="popover"
                    onIonChange={e => changeInterface(e.detail.value)}>
                    <IonSelectOption value="yes">Yes</IonSelectOption>
                    <IonSelectOption value="no">No</IonSelectOption>
                    <IonSelectOption value="n/a">N/A</IonSelectOption>
                  </IonSelect>
                </IonItem>

                <IonButton color="dsb" onClick={() => showExplanationText(!explanationText)}>Explanation Text</IonButton>

                {explanationText && <div className="explanation-text">
                  <p>{subthread.help_text}</p>
                </div>}

                {yes && <div>
                  <IonItem color="dark">
                    <IonLabel position="floating">Objective Evidence</IonLabel>
                    <IonTextarea
                      name="objective_evidence"
                      value={answer.objective_evidence}
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
                          value={answer.who}
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
                      value={answer.what}
                      placeholder="What needs to be done to meet this objective?"
                      onIonChange={handleAnswerChange}>
                    </IonTextarea>
                  </IonItem>
                  <IonItem color="dark">
                    <IonLabel position="floating">Reason</IonLabel>
                    <IonTextarea
                      name="reason"
                      value={answer.reason}
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
                      value={answer.documentation_no}
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
                  greatest_impact={answer.greatest_impact}
                  risk_response={answer.risk_response}
                  mmp_summary={answer.mmp_summary}
                />
              </IonCol>
              <IonCol size="12" size-lg="4">
                <RiskMatrix
                  likelihood={likelihood} consequence={consequence} riskScore={riskScore}
                />
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            position="top"
            message={toastMessage.message}
            color={toastMessage.status}
          />
        </div>

      </IonContent>
    </IonPage>
  )
}
export default QuestionsPage;
