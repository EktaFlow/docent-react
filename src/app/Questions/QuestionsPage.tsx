import React, { useState, useEffect, useRef, Fragment } from 'react';
import { IonPage, IonItem, IonLabel, IonSelect, IonSelectOption, IonButton, IonHeader, IonRow, IonCol, IonContent, IonGrid, IonTextarea, IonInput, IonDatetime, IonText, IonPopover, IonToast, IonSplitPane, IonMenu, IonAccordion, IonAccordionGroup, IonRouterOutlet} from '@ionic/react';
import { useHistory } from 'react-router-dom';

import { RouteComponentProps } from 'react-router-dom';

import Header from '../Framework/Header';
import './QuestionsPage.scss';
import QuestionHistory from './Popovers/QuestionHistory';

import { format, parseISO } from 'date-fns';

import { createAnswers, grabNextQuestion, grabSpecificQuestion, addFileToAssessment, addFileToQuestion, grabFiles, grabNextQuestionAction } from '../../api/api';

import Topbar from './Topbar';
import Sidebar from './Sidebar'; 
import RiskAssessment from './RiskAssessment/RiskAssessment';
import RiskMatrix from './RiskAssessment/RiskMatrix';

import FilePopover from './Files/FilePopover';
import Files from './Files/Files';

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

  const [showHistory, setShowHistory] = useState(false); 
  const history = useHistory();

  const [explanationText, showExplanationText] = useState(false);

  const [yes, setYes] = useState(false);
  const [no, setNo] = useState(false);
  const [na, setNA] = useState(false);

  const [selectedDate, setSelectedDate] = useState('');
  const [question, setQuestion] = useState<any>({
    question_text: '', answered: false, assessment_length: 0, current_answer_text: '', current_mrl: 0, position: 0, question_id: 0,
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
  const [toastMessage, setToastMessage] = useState({ message: '', status: '' });
  const [valuesChanged, setValuesChanged] = useState(false)

  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [loadedFiles, setLoadedFiles] = useState([])
  const [fileModal, setFileModal] = useState(false);
  const fileInput = useRef(null);

  const [assessmentId, setAssessmentId] = useState<number>();

  // useEffect(() => {
  //   // if(history["location"]["state"]["question_id"]) {
  //   //   grabSQ()
  //   // }
  //   var his = history["location"]["state"]
  //   console.log(history["location"]["state"])
  // })

  useEffect(() => {
    var his: any = history
    console.log(his["location"]["state"])

    if (his["location"]["state"]) {
      // console.log(his["location"]["state"]["question_id"]);
      var ast_id = his["location"]["state"]["assessment_id"]
      // var q_id; 
      if(his["location"]["state"]["question_id"]){
        console.log("grabbing specific question")
        var q_id = his["location"]["state"]["question_id"]
        var q = grabSQ(q_id)
      }
      else {
        setAssessmentId(ast_id)
        var question = grabQ(ast_id)
      }
      loadFiles(ast_id)
          
      }
  }, []);

  useEffect(() => {
    var his: any = history
    // console.log(his["location"]["state"])
    if (his["location"]["state"]) {
      // console.log(his["location"]["state"]["question_id"]);
      var ast_id = his["location"]["state"]["assessment_id"]
      console.log(ast_id)
      setAssessmentId(ast_id)
      if(his["location"]["state"]["question_id"]){
        if(question.id != his["location"]["state"]["question_id"]) {
          var q_id = his["location"]["state"]["question_id"]
          var q = grabSQ(q_id)
        }
      }
      else {
        setAssessmentId(ast_id)
        var q = grabQ(ast_id)
      }
      loadFiles(ast_id)
    }
    
  }, [history])



  useEffect(() => {
    if (valuesChanged === true) {
      console.log("Value changed: " + valuesChanged);
    }
  }, [valuesChanged]);

  useEffect(() => {
    if (answer) {
      console.log(answer);
    }
  }, [answer]);

  useEffect(() => {
    if (selectedFile) {
      setShowToast(true)
      setToastMessage({ message: 'File attached, save answer to save file', status: 'primary' })
      setTimeout(() => {
        setShowToast(false)
      }, 3000)
    }
  }, [selectedFile]);

  async function loadFiles(assessmentId: any) {
    await grabFiles(assessmentId).then((res) => {
      // console.log(res);
      setLoadedFiles(res.files);
    })
      .catch((error) => {
        console.log(error)
      })
  }

  async function grabQ(assessment_id: Number) {
    var next_question = await grabNextQuestion(assessment_id)
      .then((res) => {
        setUpQuestionsPage(res)
        return res
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async function grabSQ(question_id: Number) {
    var next_question = await grabSpecificQuestion(question_id)
      .then((res) => {
        setUpQuestionsPage(res)
        // console.log(res)
        return res
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async function getNextQuestion(movement_action: any) {
    //will run and grab the right question
    if (yes == true || no == true || na == true) {
      if (valuesChanged === true) {
        saveAnswers();
      }
    }
    setShowToast(true);
    setToastMessage({ message: 'Navigating to Question', status: 'primary' })
    await grabNextQuestionAction(assessmentId, movement_action, question.question_id)
      .then((res) => {
        setUpQuestionsPage(res)
        loadFiles(assessmentId)
        setShowToast(false);
      })
      .catch((err) => {
        setToastMessage({ message: 'Error navigating to next question, please refresh', status: 'danger' })
        setTimeout(() => {
          setShowToast(false)
        }, 2000)
      })
  }

  function setUpQuestionsPage(res: any) {
    // console.log(res);
    setShowHistory(false)
    setQuestion(res.question)
    setSubthread(res.subthread)
    setThread(res.thread)
    setAssessInfo(res.assessment_info)
    if (res.question.current_answer !== []) {
      setAnswer(res.question.current_answer);
      var ci = changeInterface(res.question.current_answer.answer);
      if (ci == 'done') {
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

    if (yes === true || no === true || na === true) {
      // console.log("Answer condition activated")
      if (valuesChanged === true) {
        setToastMessage({ message: 'Answers Saving', status: 'primary' })
        await createAnswers(data)
          .then((res) => {
            setToastMessage({ message: 'Answers have Saved', status: 'success' })
            setTimeout(() => {
              setShowToast(false)
            }, 2000)
            return res
          })
          .catch((error) => {
            // setShowToast(true)
            setToastMessage({ message: 'Error saving answers', status: 'danger' })
            setTimeout(() => {
              setShowToast(false)
            }, 2000)
          })
        if (selectedFile !== null && assessmentId !== undefined) {
          const formData = new FormData();
          formData.append('question_id', question.question_id.toString());
          formData.append('assessment_id', assessmentId.toString());
          formData.append('file_name', selectedFile.name);
          formData.append('outside_file', selectedFile);

          var assm = await addFileToAssessment(formData).then((res) => {
            loadFiles(assessmentId)
            // saveFileToQuestion(res.file.id);
          })
            .catch((error) => {
              console.log(error)
            })
        }
      }
    }
    else {
      // console.log("Didn't save answer")
      setToastMessage({ message: 'Select an answer before saving', status: 'danger' })
      setTimeout(() => {
        setShowToast(false)
      }, 2000)
    }
  }

  async function saveFileToQuestion(file_id: any) {
    var data = {
      question_id: question.question_id,
      file_id: file_id
    }

    setShowToast(true);

    var ques = await addFileToQuestion(data).then((res) => {
      console.log(showToast)
      loadFiles(assessmentId)
      setToastMessage({ message: 'File added to question', status: 'success' })
      setTimeout(() => {
        setShowToast(false)
      }, 2000)
    })
      .catch((error) => {
        console.log('2')
        setToastMessage({ message: 'Error attaching question', status: 'danger' })
        setTimeout(() => {
          setShowToast(false)
        }, 2000)
        console.log(error)
      })
  };

  const handleFileChange = (e: any) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleAnswerChange = (e: any) => {
    // console.log(e.target.name)
    if (e.target.name === "answer") {
      changeInterface(e.target.value)
    }
    else if(e.target.name === "assumptions") {
      getAssumptions(e.target.value)
    }
    else if(e.target.name === "notes") {
      getNotes(e.target.value)
    }
    else {
      setAnswer({
        ...answer,
        [e.target.name]: e.target.value
      });
    }
    setValuesChanged(true)
  };

  const changeInterface = (answer: any) => {
    if (answer === "yes") {
      setYes(true);
      setNo(false);
      setNA(false);
      setAnswer({
        ...answer,
        answer: 'yes'
      });
    }
    else if (answer === "no") {
      setYes(false);
      setNo(true);
      setNA(false);
      setAnswer({
        ...answer,
        answer: 'no'
      });
    }
    else if (answer === "na") {
      setYes(false);
      setNo(false);
      setNA(true);
      setAnswer({
        ...answer,
        answer: 'na'
      });
    }
    return 'done'
  }

  const getAssumptions = (value: any) => {
    if (yes) {
      setAnswer({
        ...answer,
        assumptions_yes: value,
        assumptions_no: '',
        assumptions_na: ''
      });
    }
    else if (no) {
      setAnswer({
        ...answer,
        assumptions_yes: '',
        assumptions_no: value,
        assumptions_na: ''
      });
    }
    else if (na) {
      setAnswer({
        ...answer,
        assumptions_yes: '',
        assumptions_no: '',
        assumptions_na: value
      });
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
    }
    else if (no) {
      setAnswer({
        ...answer,
        notes_yes: '',
        notes_no: value,
        notes_na: ''
      });
    }
    else if (na) {
      setAnswer({
        ...answer,
        notes_yes: '',
        notes_no: '',
        notes_na: value
      });
    }
  }

  const getWhen = (value: any) => {
    setAnswer({
      ...answer,
      when: value
    });
    setValuesChanged(true)
  }

  const getRiskScore = (data: any) => {
    setAnswer({
      ...answer,
      risk: data
    });
    console.log('values')
    setValuesChanged(true)
  }

  const formatDate = (value: any) => {
    let formattedDate = format(parseISO(value), 'MMM dd yyyy');
    setSelectedDate(formattedDate);
    return formattedDate;
  };

  const showHistoryToggle = () => {
    showHistory ? setShowHistory(false) : setShowHistory(true)
    console.log(showHistory)
  }

  return (
    <div>
      <IonPage className="question-page-wrapper">
        <IonHeader>
          <Header showAssessment={true} inAssessment={true} assessmentId={assessmentId} />
        </IonHeader>
        
        <IonSplitPane contentId="page-content">
            <Sidebar getSQ={grabSQ} assessmentId={assessmentId} thread={thread} subthread={subthread} question={question} assessmentInfo={assessInfo} />
          
          <div id="page-content">
            <Topbar getNextQuestion={getNextQuestion} saveAnswers={saveAnswers} assessmentId={assessmentId} question={question} subthread={subthread} thread={thread} assessInfo={assessInfo} />

              <IonContent>
                <div className="content-wrapper">
                  <IonRow>
                    <IonCol size="9">
                       <h2>{question.question_text}</h2>
                    </IonCol>
                    <IonCol size="3" className="quest-history-btn">
                      <IonButton onClick={() => showHistoryToggle()}>{showHistory ? "Show Question" : "Show Question History"}</IonButton>
                    </IonCol>
                    {/* <IonRow> */}
                    {showHistory ?
                      <IonCol size="12">
                        <QuestionHistory question={question} />
                      </IonCol>
                      :
                      <>
                        <IonCol size="12" size-lg="5">
                          <IonItem color="dark">
                            <IonLabel position="floating">Select Answer</IonLabel>
                            <IonSelect
                              name="answer"
                              value={answer.answer}
                              interface="popover"
                              onIonChange={handleAnswerChange}>
                              <IonSelectOption value="yes">Yes</IonSelectOption>
                              <IonSelectOption value="no">No</IonSelectOption>
                              <IonSelectOption value="na">N/A</IonSelectOption>
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
                                      name="when"
                                      value={answer.when}
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
                              onIonChange={handleAnswerChange}>
                            </IonTextarea>
                          </IonItem>

                          <IonItem color="dark">
                            <IonLabel position="floating">Notes</IonLabel>
                            <IonTextarea
                              name="notes"
                              placeholder="Enter any notes here..."
                              onIonChange={handleAnswerChange}>
                            </IonTextarea>
                          </IonItem>

                          <IonButton color="dsb" onClick={() => {
                            // @ts-ignore
                            fileInput?.current?.click();
                          }}>
                            Attach File
                          </IonButton>

                          <input type="file" ref={fileInput} onChange={handleFileChange} hidden>
                          </input>

                          <br />

                          <IonButton color="dsb" onClick={() => setFileModal(true)}>Manage Files</IonButton>

                          <IonPopover isOpen={fileModal}
                            onDidDismiss={() => setFileModal(false)} className="file-popover">
                            <FilePopover saveFileToQuestion={saveFileToQuestion} files={loadedFiles} question_id={question.question_id} />
                          </IonPopover>

                          <Files files={loadedFiles} question_id={question.question_id} />
                        </IonCol>

                        <IonCol size="12" size-lg="3">
                          <RiskAssessment
                            answer={answer}
                            handleAnswerChange={handleAnswerChange}
                            getRiskScore={getRiskScore}
                          />
                        </IonCol>
                        <IonCol size="12" size-lg="4">
                          <RiskMatrix
                            likelihood={Number(answer.likelihood)} consequence={Number(answer.consequence)} riskScore={Number(answer.risk)}
                          />
                        </IonCol>
                      </>
                    }
                    {/* </IonRow> */}

                  </IonRow>

                  <IonToast
                    isOpen={showToast}
                    onDidDismiss={() => setShowToast(false)}
                    position="top"
                    message={toastMessage.message}
                    color={toastMessage.status}
                  />
                </div>
              </IonContent>
            
          </div>
        </IonSplitPane>

      </IonPage>
    </div> 
  )
}
export default QuestionsPage;