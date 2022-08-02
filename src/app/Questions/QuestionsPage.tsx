import React, { useState, useEffect, useRef, Fragment } from 'react';
import { IonPage, IonItem, IonLabel, IonSelect, IonSelectOption, IonButton, IonHeader, IonRow, IonCol, IonContent, IonGrid, IonTextarea, IonInput, IonDatetime, IonText, IonPopover, IonToast, IonSplitPane, IonMenu, IonAccordion, IonAccordionGroup, IonRouterOutlet} from '@ionic/react';
import { useHistory } from 'react-router-dom';

import { RouteComponentProps } from 'react-router-dom';

import Header from '../Framework/Header';
import './QuestionsPage.scss';
import QuestionHistory from './Popovers/QuestionHistory';

import { format, parseISO } from 'date-fns';

import { createAnswers, grabNextQuestion, grabSpecificQuestion, addFileToAssessment, addFileToQuestion, grabFiles, grabNextQuestionAction, grabAnswers, deleteFileFromQuestion, deleteFileFromAssessment } from '../../api/api';

import Topbar from './Topbar';
import Sidebar from './Sidebar'; 
import RiskAssessment from './RiskAssessment/RiskAssessment';
import RiskMatrix from './RiskAssessment/RiskMatrix';

import FilePopover from './Files/FilePopover';
import Files from './Files/Files';

const QuestionsPage: React.FC = (props) => {

  // const [questionList, setQuestionList] = useState(questions);
  const [answer, setAnswer] = useState({
    answer: null, 
    likelihood: null,
    consequence: null,
    risk_response: null,
    greatest_impact: null,
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

  const [allChanges, setAllChanges] = useState(['']);

  const [showHistory, setShowHistory] = useState(false); 
  const history = useHistory();

  const [explanationText, showExplanationText] = useState(false);

  const [yes, setYes] = useState(false);
  const [no, setNo] = useState(false);
  const [na, setNA] = useState(false);

  const [selectedDate, setSelectedDate] = useState('');
  const [question, setQuestion] = useState<any>({
    question_text: '', answered: false, assessment_length: 0, current_answer_text: '', current_answer_id: 0, current_mrl: 0, position: 0, question_id: 0,
  })
  const [subthread, setSubthread] = useState({
    help_text: '', id: null, name: ''
  })
  const [thread, setThread] = useState({
    id: null, mr_level: null, name: ''
  })
  const [assessInfo, setAssessInfo] = useState({
    targetDate: null, additionalInfo: '', levelSwitching: false
  })
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({ message: '', status: '' });
  const [valuesChanged, setValuesChanged] = useState(false)
  const [isNewQ, setIsNewQ] = useState(false)

  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [loadedFiles, setLoadedFiles] = useState([])
  const [fileModal, setFileModal] = useState(false);
  const fileInput = useRef(null);
  const [showFiles, setShowFiles] = useState(false); 

  const [assessmentId, setAssessmentId] = useState<number>();

  const [fieldNames, setFieldNames] = useState({
    assumptions_name: '',
    notes_name: ''
  });

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
      console.log(his["location"]["state"]["question_id"]);
      var ast_id = his["location"]["state"]["assessment_id"]
      // var q_id; 
      if(his["location"]["state"]["question_id"]){
        console.log("grabbing specific question")
        var q_id = his["location"]["state"]["question_id"]
        var q = grabSQ(q_id)
        // setIsNewQ(true)
      }
      else {
        setAssessmentId(ast_id)
        var question = grabQ(ast_id)
        // setIsNewQ(true)
      }
      loadFiles(ast_id)
    }
    
    
  }, []);

  useEffect(() => {
    var his: any = history
    console.log(his["location"]["state"])
    if (his["location"]["state"]) {
      // console.log(his["location"]["state"]["question_id"]);
      var ast_id = his["location"]["state"]["assessment_id"]
      console.log(ast_id)
      setAssessmentId(ast_id)
      if(his["location"]["state"]["question_id"]){
        if(question.id != his["location"]["state"]["question_id"]) {
          var q_id = his["location"]["state"]["question_id"]
          var q = grabSQ(q_id)       
          // setIsNewQ(true)
        }
      }
      else {
        setAssessmentId(ast_id)
        var q = grabQ(ast_id)
        // setIsNewQ(true)
      }
      loadFiles(ast_id)
    }
    
  }, [history])

  useEffect(() => {
    // console.log(question.question_text)
    // if level switching on, change position variable

    // else (if level switching is off) keep normal
    if(question.current_answer_text === '' || question.all_answers.length == 0) {
      setAnswer({
        answer: null, 
        likelihood: null,
        consequence: null,
        risk_response: null,
        greatest_impact: null,
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
        documentation_no: '', //should be na
        assumptions_na: '',
        assumptions_skipped: '',
        notes_skipped: '',
        notes_no: '',
        notes_na: '',
      })
    }
    // else {
    //   revertBack(question.all_answers[0])
    // }
    console.log(question)
    // console.log(answer['answer'])
    

  }, [question.question_id])

  // useEffect(() => {
  //   console.log(answer)
  // }, [answer])

  useEffect(() => {
    if (selectedFile) {
      setShowToast(true)
      setToastMessage({ message: 'File attached, save answer to save file', status: 'primary' })
      setTimeout(() => {
        setShowToast(false)
      }, 3000)
    }
  }, [selectedFile]);

  // useEffect(() => {
  //   console.log("grab first question")
  //   grabSQ(1)
  // })

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
    // console.log(question_id)
    var next_question = await grabSpecificQuestion(question_id)
      .then((res) => {
        setUpQuestionsPage(res)
        return res
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async function getNextQuestion(movement_action: any) {
    //will run and grab the right question
    console.log("valuesChanged in getNextQ: " + valuesChanged);
    if (yes == true || no == true || na == true) {
      if (valuesChanged == true && answer.answer != null) {
        console.log("saving answers")
        saveAnswers();
      }
    }
    
    await grabNextQuestionAction(assessmentId, movement_action, question.question_id)
      .then((res) => {
        console.log(res)
        setUpQuestionsPage(res)
        loadFiles(assessmentId)
        setToastMessage({ message: 'Navigating to Question', status: 'primary' })
        setShowToast(true)
        setTimeout(() => {
          setShowToast(false)
        }, 1000)
      })
      .catch((err) => {
        setToastMessage({ message: 'Error navigating to next question, please refresh', status: 'danger' })
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false)
        }, 2000)
      })
  }

  function setUpQuestionsPage(res: any) {
    console.log("setting up new questions page: ");
    console.log(res); 
    setShowHistory(false)
    setShowFiles(false)
    setQuestion(res.question)
    setSubthread(res.subthread)
    setThread(res.thread)
    setAssessInfo(res.assessment_info)
    // var all_ans = res.question.all_answers
    if(res.question.all_answers.length > 0) {
      revertBack(res.question.all_answers[0])
      // console.log("reverting back")
    }
    
  }

  const revertBack = (ans:any) => {
    changeInterface(ans.answer)
    setAnswer(ans)
    // setAnswer(ans)
    setShowHistory(false)
    setValuesChanged(false)
  }

  const checkIfAnswerChanged = (ans:any) => {
    // var name = e.target.name.toString()
    //should go through all the values in each to see if they are equal
    if(question.all_answers.length > 0) {
      var most_recent = question.all_answers[0]
      for(const prop in ans) {
        console.log(prop)
        console.log("check changed" + (prop !== most_recent[`${prop}`]))
        if(prop !== most_recent[`${prop}`]) {
          return true; 
        }
      }
      return false
    }
    return true
    
    // if(ans === question.all_answers[0]) {
    //   return false
    // }
    // else {
    //   return true
    // }
  }

  async function saveAnswers() {
    var data = {
      question_id: question.question_id,
      answer: answer
    }
    
    if (yes === true || no === true || na === true) {
      let check = checkIfAnswerChanged(answer)
      if (valuesChanged === true && check) {
        await createAnswers(data)
          .then((res) => {
            setToastMessage({ message: 'Answers have Saved Successfully', status: 'success' })
            setShowToast(true)
            setTimeout(() => {
              setShowToast(false)
            }, 1000)
            console.log(res)
            return res
          })
          .catch((error) => {
            setToastMessage({ message: 'Error saving answers', status: 'danger' })
            setShowToast(true)
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
            saveFileToQuestion(res.file.id);
          })
            .catch((error) => {
              console.log(error)
            })
        }
      }
      else {
        setToastMessage({ message: 'Answers have Saved', status: 'primary' })        
        setShowToast(true)
        setTimeout(() => {
          setShowToast(false)
        }, 2000)
      }
      //if values have not been changed
      setValuesChanged(false)
    }
    else {
      setToastMessage({ message: 'Select an answer before saving', status: 'danger' })
      setShowToast(true)
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

    var ques = await addFileToQuestion(data).then((res) => {
      loadFiles(assessmentId)
      setToastMessage({ message: 'File added to question', status: 'success' })
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false)
      }, 2000)
    })
      .catch((error) => {
        // console.log('2')
        setToastMessage({ message: 'Error attaching file question', status: 'danger' })
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false)
        }, 2000)
        console.log(error)
      })
  };

  async function deleteQuestionFile(file_id: any) {
    var data = {
      question_id: question.question_id, 
      file_id: file_id
    }

    var file = await deleteFileFromQuestion(data).then((res) => {
      // console.log(showToast)
      loadFiles(assessmentId)
      setToastMessage({ message: 'Removed file from question', status: 'success' })
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false)
      }, 2000)
    })
    .catch((error) => {
      // console.log('2')
      setToastMessage({ message: 'Error removing file from question', status: 'danger' })
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false)
      }, 2000)
      console.log(error)
    })
  }

  async function deleteAssessmentFile(file_id: any) {
    var data = {
      assessment_id: assessmentId, 
      file_id: file_id
    }
    var file = await deleteFileFromAssessment(data).then((res) => {
      loadFiles(assessmentId)
      setToastMessage({ message: 'Removed file from assessment', status: 'success' })
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false)
      }, 2000)
    })
    .catch((error) => {
      setToastMessage({ message: 'Error removing file from assessment', status: 'danger' })
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false)
      }, 2000)
      console.log(error)
    })
  }

  const handleFileChange = (e: any) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleAnswerChange = (e: any) => {
    // console.log(e)
    if (e.target.name === "answer") {
      changeInterface(e.target.value)
    }
    else {
      // console.log("name: " + e.target.name + "\nvalue: " + (typeof e.target.value))
      // console.log(e.target.name)
      setAnswer({
        ...answer,
        [e.target.name]: e.target.value
      });
    }
  };
  

  const changeInterface = (answer: any) => {
    // console.log("yes: " + yes + "\nno: " + no + "\nna: " + na)
    if (answer === "yes") {
      setYes(true);
      setNo(false);
      setNA(false);
      setFieldNames({ 
        assumptions_name: "assumptions_yes",
        notes_name: "notes_yes"
      })
      setAnswer({
        ...answer,
        answer: 'yes'
      });
      
      setValuesChanged(true); 
    }
    else if (answer === "no") {
      setYes(false);
      setNo(true);
      setNA(false);
      setFieldNames({ 
        assumptions_name: "assumptions_no",
        notes_name: "notes_no"
      })
      setAnswer({
        ...answer,
        answer: 'no'
      });
      setValuesChanged(true); 
    }
    else if (answer === "na") {
      setYes(false);
      setNo(false);
      setNA(true);
      setFieldNames({ 
        assumptions_name: "assumptions_na",
        notes_name: "notes_na"
      })
      setAnswer({
        ...answer,
        answer: 'na'
      });
      setValuesChanged(true); 
    }
    else {
      setYes(false);
      setNo(false);
      setNA(false);
      setValuesChanged(false); 
      setFieldNames({ 
        assumptions_name: '',
        notes_name: ''
      })
    }
    // setValuesChanged(true); 
    // console.log("valuesChanged in changeInterface: " + valuesChanged)
    return 'done'
  }

  const setAssumptions = (value: any) => {
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
    else {
      setAnswer({
        ...answer,
        assumptions_yes: '',
        assumptions_no: '',
        assumptions_na: '',
        assumptions_skipped: ''
      });
    }
  }

  const getAssumptions = () => {
    if(yes) {
      return answer.assumptions_yes
    }
    else if(no) {
      return answer.assumptions_no
    }
    else if(na) {
      return answer.assumptions_na
    }
    else {
      return ''
    }
  }

  const setNotes = (value: any) => {
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

  const getNotes = () => {
    if(yes) {
      return answer.notes_yes
    }
    else if(no) {
      return answer.notes_no
    }
    else if(na) {
      return answer.notes_na
    }
    else {
      return ''
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
      // console.log(data)
      setValuesChanged(true)
  }

  const formatDate = (value: any) => {
    let formattedDate = format(parseISO(value), 'MMM dd yyyy');
    setSelectedDate(formattedDate);
    return formattedDate;
  };

  const showHistoryToggle = () => {
    showHistory ? setShowHistory(false) : setShowHistory(true)
    // console.log(showHistory)
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
                        <QuestionHistory question={question} revertBack={revertBack} />
                      </IonCol>
                      :
                      <>
                        <IonCol size="12" size-lg="5">
                          <IonItem color="docentlight" >
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
                            <IonItem color="docentlight" >
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
                                <IonItem color="docentlight" >
                                  <IonLabel position="floating">Owner</IonLabel>
                                  <IonInput
                                    name="who"
                                    value={answer.who}
                                    onIonChange={handleAnswerChange}>
                                  </IonInput>
                                </IonItem>
                              </IonCol>
                              <IonCol size="12" size-lg="6" className="ion-no-padding due-date-col">
                                <IonItem button={true} color="docentlight"  id="open-date-input">
                                  <IonLabel>Due Date</IonLabel>
                                  <IonText slot="end">{selectedDate}</IonText>
                                  <IonPopover trigger="open-date-input" showBackdrop={false}>
                                    <IonDatetime
                                      name="when"
                                      value={answer.when}
                                      presentation="date"
                                      showDefaultButtons={true}
                                      onIonChange={e => getWhen(formatDate(e.detail.value))} />
                                  </IonPopover>
                                </IonItem>
                              </IonCol>
                            </IonRow>

                            <IonItem color="docentlight" >
                              <IonLabel position="floating">Action Item</IonLabel>
                              <IonTextarea
                                name="what"
                                value={answer.what}
                                placeholder="What needs to be done to meet this objective?"
                                onIonChange={handleAnswerChange}>
                              </IonTextarea>
                            </IonItem>
                            <IonItem color="docentlight" >
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
                            <IonItem color="docentlight" >
                              <IonLabel position="floating">Documentation</IonLabel>
                              <IonTextarea
                                name="documentation_no"
                                value={answer.documentation_no}
                                placeholder="Document why this question is not applicable..."
                                onIonChange={handleAnswerChange}>
                              </IonTextarea>
                            </IonItem>
                          </div>}

                          <IonItem color="docentlight" >
                            <IonLabel position="floating">Assumptions</IonLabel>
                            <IonTextarea
                              name={fieldNames.assumptions_name}
                              placeholder={(!yes && !no && !na) ? "Select answer value before entering":"Enter any assumptions here..."}
                              readonly={!yes && !no && !na}
                              onIonChange={e => setAssumptions(e.detail.value)}
                              value={getAssumptions()}
                              // value={!answer.answer && ''}
                              >
                            </IonTextarea>
                          </IonItem>

                          <IonItem color="docentlight">
                            <IonLabel position="floating">Notes</IonLabel>
                            <IonTextarea
                              name={fieldNames.notes_name}
                              placeholder={(!yes && !no && !na) ? "Select answer value before entering":"Enter any notes here..."}
                              readonly={!yes && !no && !na}
                              onIonChange={e => setNotes(e.detail.value)}
                              value={getNotes()}
                              >
                            </IonTextarea>
                          </IonItem>
                          
                          <IonButton color="dsb" onClick={() => setShowFiles(!showFiles)}>{showFiles ? "Show Question" : "Manage Files"}</IonButton>
                          
                          <br />

                          <IonButton color="dsb" onClick={() => {
                            // @ts-ignore
                            fileInput?.current?.click();
                          }}>
                            Attach File
                          </IonButton>

                          <input type="file" ref={fileInput} onChange={handleFileChange} hidden>
                          </input>

                          <br />

                          {/* <IonButton color="dsb" onClick={() => setFileModal(!fileModal)}>Manage Files</IonButton>

                          <IonPopover isOpen={fileModal}
                            onDidDismiss={() => setFileModal(false)} className="file-popover">
                            <FilePopover saveFileToQuestion={saveFileToQuestion} files={loadedFiles} question_id={question.question_id} />
                          </IonPopover> */}

                        

                          <Files files={loadedFiles} question_id={question.question_id} answer_id={question.current_answer_id} />
                        </IonCol>

                        {showFiles ? 
                          <IonCol size="12" size-lg="7">
                            <FilePopover saveFileToQuestion={saveFileToQuestion} files={loadedFiles} question_id={question.question_id} deleteQuestionFile={deleteQuestionFile} deleteAssessmentFile={deleteAssessmentFile}/>
                          </IonCol>
                          
                        :
                        <>
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
                              {/* <IonButton size="large"></IonButton> */}
                          </IonCol>
                        </>
                        
                        }
                        
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