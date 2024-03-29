import { IonPage, IonContent, IonRow, IonCol, IonButton, IonItem, IonLabel, IonSelect, IonSelectOption, IonCard, IonCardHeader, IonCardTitle } from '@ionic/react';
import React, { useState, useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';

import './Questions.scss';
import Header from '../../Framework/Header';
import InfoCard from '../InfoCard';
import ReportsTopbar from '../ReportsTopbar';

import { grabSingleAssessment, grabSpecificQuestion, grabFiles } from '../../../api/api'

const QuestionsList: React.FC = () => {
  const [assessmentId, setAssessmentId] = useState<number>();
  const [assessmentData, setAssessmentData] = useState<any>();
  const [questionData, setQuestionData] = useState<any>([]);
  const [filteringData, setFilteringData] = useState<any>([]);
  const [allThreads, setAllThreads] = useState<any>([]);

  const [selectedMRL, setSelectedMRL] = useState<string>('all-levels');
  const [filteredMRL, setFilteredMRL] = useState('all-levels');

  const [selectedAnswer, setSelectedAnswer] = useState<string>('all-answers');
  const [filteredAnswer, setFilteredAnswer] = useState('all-answers');
  const [loadedFiles, setLoadedFiles] = useState([])

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

  const history = useHistory();

  async function navigateToAssessment(questionId: number) {
    history.push({
      pathname: '/questions',
      state: {
        assessment_id: assessmentId as number,
        question_id: questionId as number
      }
    })
    window.location.reload()
    // console.log("Question pushed: ", {questionId} )
  }

  useEffect(() => {
    async function getAssessmentInfo() {
      var his: any = history
      var assessment_id = his["location"]["state"]["assessment_id"]
      await setAssessmentId(assessment_id)
    }
    getAssessmentInfo()
  }, []);

  useEffect(() => {
    console.log("assessment id effect used")
    async function getAssessment() {
      if (assessmentId) {
        var assessmentInfo = await grabSingleAssessment(assessmentId);
        await setAssessmentData(assessmentInfo)
        console.log(assessmentInfo)
      }
    }
    getAssessment();
  }, [assessmentId]);

  useEffect(() => {
    if (assessmentData) {
      // console.log(assessmentData)
      // console.log(assessmentData.info.current_mrl.toString())
      setSelectedMRL(assessmentData.info.current_mrl.toString())
      setFilteredMRL(assessmentData.info.current_mrl.toString())
      setAllThreads(assessmentData.all_threads)
      console.log(assessmentData)

      let insertQuestionData = assessmentData.threads.map((thread: any) => (
        thread.subthreads.map((subthread: any) => {
          let questionArray: { current_answer: string, question_text: string, question_id: number }[] = [];
          subthread.questions.map((question: any) => (
            // question.answer !== "Unanswered" &&
            questionArray.push({ current_answer: question.answer.answer, question_text: question.question_text, question_id: question.id })
          ))
          if (questionArray.length > 0) {
            setQuestionData((questionData: any) => [...questionData, {
              MRL: assessmentData.info.current_mrl,
              // MRL: thread.mr_level,
              thread_name: thread.name,
              subthread_name: subthread.name,
              questionInfo: questionArray,
            }])
          }
        })
      ));

      let insertFilteringData = assessmentData.threads.map((thread: any) => (
        thread.subthreads.map((subthread: any) => {
          let questionArray: { current_answer: string, question_text: string, question_id: number  }[] = [];
          subthread.questions.map((question: any) => (
            // question.answer !== "Unanswered" &&
            questionArray.push({ current_answer: question.answer.answer, question_text: question.question_text, question_id: question.id })
          ))
          if (questionArray.length > 0) {
            setFilteringData((questionData: any) => [...questionData, {
              MRL: assessmentData.info.current_mrl,
              // MRL: thread.mr_level,
              thread_name: thread.name,
              subthread_name: subthread.name,
              questionInfo: questionArray,
            }])
          }
          // questionArray = []
        })
      ));
    }
  }, [assessmentData]);

  useEffect(() => {
    if (filteredMRL) {
      filterData()
    }
  }, [filteredMRL]);

  // useEffect(() => {
  //   if (filteredAnswer) {
  //     filterData()
  //   }
  // }, [filteredAnswer]);

  // useEffect(() => {
  //   if (questionData) {
  //     console.log(questionData)
  //   }
  // }, [questionData]);

  const handleMRLevelChange = (value: any) => {
    setSelectedMRL(value)
  }

  // useEffect(() => {
  //   if(selectedMRL) {
  //     console.log(selectedMRL)
  //   }
  // }, [selectedMRL])

  const handleAnswerChange = (value: any) => {
    setSelectedAnswer(value);
  }

  const filterData = () => {
    async function filter() {
      if (filteredMRL === 'all-levels') {
        if (filteredAnswer === 'all-answers') {
          const newData = filteringData
          await setQuestionData(newData);
        }
        else {
          let questionArray: any[] = [];
          filteringData.map((question: any) => {
            question.questionInfo.map((question_info: any) => {
              if(question_info.current_answer === filteredAnswer) {
                questionArray.push(question)
              }
            })
          })
          await setQuestionData(questionArray)
        }
      }
      else {
        if (filteredAnswer === 'all-answers') {
          const newData = filteringData
          await setQuestionData(newData)
          // await setQuestionData(filteringData.filter((question: any) => Number(filteredMRL) === assessmentData.info.current_mrl))
        }
        else {
          let questionArray: any[] = [];
          filteringData.map((question: any) => {
            question.questionInfo.map((question_info: any) => {
              if(question_info.current_answer === selectedAnswer) {
                questionArray.push(question)
              }
            })
          })
          await setQuestionData(questionArray)
        }
      }
    }
    filter();
  }

  const getQuestionsAtMRL = (mrl: any) => {
    setFilteringData([])

    if(mrl === 'all-levels') {
      allThreads.map((th:any) => {
        th.subthreads.map((sub: any) => {
          let questionArray: { current_answer: string, question_text: string, question_id: number  }[] = [];

          sub.questions.map((question: any) => (
            questionArray.push({ current_answer: question.answer.answer, question_text: question.question_text, question_id: question.id })
          ))

          if (questionArray.length > 0) {
            setFilteringData((questionData: any) => [...questionData, {
              MRL: th.mr_level,
              // MRL: thread.mr_level,
              thread_name: th.name,
              subthread_name: sub.name,
              questionInfo: questionArray,
            }])
          }
        })
      })
    }
    else {
      allThreads.map((th:any) => {
        if(th.mr_level == Number(mrl)) {
          th.subthreads.map((sub: any) => {
            let questionArray: { current_answer: string, question_text: string, question_id: number  }[] = [];

            sub.questions.map((question: any) => (
              questionArray.push({ current_answer: question.answer.answer, question_text: question.question_text, question_id: question.id })
            ))

            if (questionArray.length > 0) {
              setFilteringData((questionData: any) => [...questionData, {
                MRL: th.mr_level,
                // MRL: thread.mr_level,
                thread_name: th.name,
                subthread_name: sub.name,
                questionInfo: questionArray,
              }])
            }
          })
        }
      })
    }

  }

  const handleFilterClick = () => {
    console.log(selectedMRL)
    setFilteredMRL(selectedMRL);
    setFilteredAnswer(selectedAnswer);

    //set filteringData to questions in correct mrl
    getQuestionsAtMRL(selectedMRL)

    filterData();
    //reset filtering data
    // setFilteringData([])
  }

  const handleClearClick = () => {
    setSelectedMRL(assessmentData.info.current_mrl.toString());
    setSelectedAnswer('all-answers');
  }
  // <InfoCard assessmentId={assessmentId} />

  // async function loadFiles(assessmentId: any) {
  //   await grabFiles(assessmentId).then((res) => {
  //     // console.log(res);
  //     setLoadedFiles(res.files);
  //   })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // }

  return (
    <IonPage>
      <Header showAssessment={true} assessmentId={assessmentId} />
      <ReportsTopbar text="Questions List" />
      <IonContent>
        <div className="questions-list-wrapper">
          <IonRow className="questions-list-toolbar">
            <IonCol size="12" size-lg="2" className="filter-button1 ion-padding-bottom">
              {/* <IonButton expand="block" color="dsb">Close All</IonButton> */}
            </IonCol>
            <IonCol size="12" size-lg="3" className="filter-item">
              <IonItem color="docentlight">
                <IonLabel  position="floating">Filter MR Level</IonLabel>
                <IonSelect interface="popover" value={selectedMRL} onIonChange={e => handleMRLevelChange(e.detail.value)}>
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
              <IonItem color="docentlight">
                <IonLabel position="floating">Filter Answer Type</IonLabel>
                <IonSelect interface="popover" value={selectedAnswer} onIonChange={e => handleAnswerChange(e.detail.value)}>
                  <IonSelectOption value="all-answers">All Answers</IonSelectOption>
                  <IonSelectOption value="yes">Yes</IonSelectOption>
                  <IonSelectOption value="no">No</IonSelectOption>
                  <IonSelectOption value="n/a">N/A</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonCol>

            <IonCol size="6" size-lg="1" className="filter-button2">
              <IonButton expand="block" color="dsb" className="filter-buttons" onClick={() => handleFilterClick()}>Filter</IonButton>
            </IonCol>
            <IonCol size="6" size-lg="1" className="filter-button3">
              <IonButton expand="block" color="dsb" className="filter-buttons" onClick={() => handleClearClick()}>Clear</IonButton>
            </IonCol>
          </IonRow>

          <div className="thread">
            {questionData && questionData.map((question: any, index: any) => (
              <IonCard className="thread-card" color="docentlight" key={index}>
                <IonCardHeader>
                  <IonCardTitle><img src="assets/if_icon-arrow-down.png" className="down-arrow"></img>{question.thread_name}</IonCardTitle>
                </IonCardHeader>
                <IonCard className="subthread-card" color="docentlight"   >
                  <IonCardHeader>
                    <IonCardTitle><img src="assets/if_icon-arrow-down.png" className="down-arrow"></img>{question.subthread_name}</IonCardTitle>
                  </IonCardHeader>
                  <div className="mrl">
                    <h6><b>MR Level: {question.MRL}</b></h6>
                    {question.questionInfo.map((question_info: any, index: any) => (

                      <div className="question" onClick = {() => navigateToAssessment(question_info.question_id)} key={index}>
                        <h5 className="navigate-links">
                          <span>
                            {question_info.current_answer === 'yes' &&
                              <IonButton size="small" className="status-button green-button ion-no-padding">Yes</IonButton>
                            }
                            {question_info.current_answer === 'no' &&
                              <IonButton size="small" color="docentdanger" className="status-button ion-no-padding">No</IonButton>
                            }
                            {question_info.current_answer === 'na' &&
                              <IonButton size="small" color="secondary" className="status-button ion-no-padding">N/A</IonButton>
                            }
                            {!question_info.current_answer &&
                              <IonButton size="small" className="status-button ion-no-padding">Unanswered</IonButton>
                            }
                          </span>
                          {question_info.question_text}
                        </h5>
                      </div>
                    ))}
                  </div>
                </IonCard>
              </IonCard>
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}
export default QuestionsList;
