import { IonPage, IonContent, IonRow, IonCol, IonButton, IonItem, IonLabel, IonSelect, IonSelectOption, IonCard, IonCardHeader, IonCardTitle } from '@ionic/react';
import React, { useState, useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';

import './Questions.scss';
import Header from '../../Framework/Header';
import InfoCard from '../InfoCard';
import ReportsTopbar from '../ReportsTopbar';

import { grabSingleAssessment } from '../../../api/api'

const QuestionsList: React.FC = () => {
  const [assessmentId, setAssessmentId] = useState<number>();
  const [assessmentData, setAssessmentData] = useState<any>();
  const [questionData, setQuestionData] = useState<any>([]);
  const [filteringData, setFilteringData] = useState<any>([]);

  const [selectedMRL, setSelectedMRL] = useState<string>('all-levels');
  const [filteredMRL, setFilteredMRL] = useState('all-levels');

  const [selectedAnswer, setSelectedAnswer] = useState<string>('all-answers');
  const [filteredAnswer, setFilteredAnswer] = useState('all-answers');

  const history = useHistory();

  async function navigateToAssessment(questionId: number) {
    history.push({
      pathname: '/questions',
      state: {
        assessment_id: assessmentId as number,
        question_id: questionId as number
      }
    })
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
      setSelectedMRL(assessmentData.info.current_mrl.toString())
      setFilteredMRL(assessmentData.info.current_mrl.toString())

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
              thread_name: thread.name,
              subthread_name: subthread.name,
              questionInfo: questionArray,
            }])
          }
        })
      ));
    }
  }, [assessmentData]);

  useEffect(() => {
    if (filteredMRL) {
      filterData()
    }
  }, [filteredMRL]);

  useEffect(() => {
    if (filteredAnswer) {
      filterData()
    }
  }, [filteredAnswer]);

  useEffect(() => {
    if (questionData) {
      console.log(questionData)
    }
  }, [questionData]);

  const handleMRLevelChange = (value: any) => {
    setSelectedMRL(value)
  }

  const handleAnswerChange = (value: any) => {
    setSelectedAnswer(value);
  }

  const filterData = () => {
    async function filter() {
      if (filteredMRL === 'all-levels') {
        if (filteredAnswer === 'all-answers') {
          await setQuestionData(filteringData);
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
          await setQuestionData(filteringData.filter((question: any) => Number(filteredMRL) === assessmentData.info.current_mrl))
        }
        else {
          let questionArray: any[] = [];
          filteringData.map((question: any) => {
            question.questionInfo.map((question_info: any) => {
              if(question_info.current_answer === filteredAnswer && Number(filteredMRL) === assessmentData.info.current_mrl) {
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

  const handleFilterClick = () => {
    setFilteredMRL(selectedMRL);
    setFilteredAnswer(selectedAnswer);
  }

  const handleClearClick = () => {
    setFilteredMRL('all-levels');
    setFilteredAnswer('all-answers');
  }

  return (
    <IonPage>
      <Header showAssessment={true} assessmentId={assessmentId} />
      <ReportsTopbar text="Questions List" />
      <IonContent>
        <div className="questions-list-wrapper">
          <InfoCard assessmentId={assessmentId} />
          <IonRow className="questions-list-toolbar">
            <IonCol size="12" size-lg="2" className="filter-button1 ion-padding-bottom">
              {/* <IonButton expand="block" color="dsb">Close All</IonButton> */}
            </IonCol>
            <IonCol size="12" size-lg="3" className="filter-item">
              <IonItem color="dark">
                <IonLabel position="floating">Filter MR Level</IonLabel>
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
              <IonItem color="dark">
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
              <IonCard className="thread-card" color="dark">
                <IonCardHeader>
                  <IonCardTitle><img src="assets/if_icon-arrow-down.png" className="down-arrow"></img>{question.thread_name}</IonCardTitle>
                </IonCardHeader>
                <IonCard className="subthread-card" color="dark">
                  <IonCardHeader>
                    <IonCardTitle><img src="assets/if_icon-arrow-down.png" className="down-arrow"></img>{question.subthread_name}</IonCardTitle>
                  </IonCardHeader>
                  <div className="mrl">
                    <h6><b>MR Level: {question.MRL}</b></h6>
                    {question.questionInfo.map((question_info: any, index: any) => (
                      <div className="question">
                        <h5 className="navigate-links">
                          <span>
                            {question_info.current_answer === 'yes' &&
                              <IonButton size="small" className="status-button green-button ion-no-padding">Yes</IonButton>
                            }
                            {question_info.current_answer === 'no' &&
                              <IonButton size="small" color="danger" className="status-button ion-no-padding">No</IonButton>
                            }
                            {(question_info.current_answer === 'na' || !question_info.current_answer) &&
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
