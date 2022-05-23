
import { IonPage, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonItem, IonLabel, IonSelect, IonSelectOption, IonContent } from '@ionic/react';
import React, { useState, useEffect, Fragment } from 'react';
import ReactExport from "react-export-excel";

import { useHistory } from 'react-router-dom';

import './Review.scss';
import Header from '../../Framework/Header';
import InfoCard from '../InfoCard';
import ReportsTopbar from '../ReportsTopbar';

import { grabSingleAssessment, grabFiles } from '../../../api/api'

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const Review: React.FC = () => {
  const [assessmentId, setAssessmentId] = useState<number>();
  const [assessmentData, setAssessmentData] = useState<any>();
  const [questionData, setQuestionData] = useState<any>([]);
  const [filteringData, setFilteringData] = useState<any>([]);

  const [selectedMRL, setSelectedMRL] = useState<string>('all-levels');
  const [filteredMRL, setFilteredMRL] = useState('all-levels');

  const [selectedAnswer, setSelectedAnswer] = useState<string>('all-answers');
  const [filteredAnswer, setFilteredAnswer] = useState('all-answers');

  const [loadedFiles, setLoadedFiles] = useState<any>([]);

  let excelData: Array<any> = [];

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
      await setAssessmentId(assessment_id);
      loadFiles(assessment_id);
    }
    async function loadFiles(assessmentId: any) {
      await grabFiles(assessmentId).then((res) => {
        // console.log(res);
        setLoadedFiles(res.files);
      })
        .catch((error) => {
          console.log(error)
        })
    }
    getAssessmentInfo()
  }, []);

  useEffect(() => {
    async function getAssessment() {
      if (assessmentId) {
        var assessmentInfo = await grabSingleAssessment(assessmentId);
        await setAssessmentData(assessmentInfo);
      }
    }
    getAssessment();
  }, [assessmentId]);

  useEffect(() => {
    if (assessmentData) {
      console.log(assessmentData);
      let threadData = assessmentData.threads.map((thread: any) => (
        thread.subthreads.map((subthread: any) => (
          subthread.questions.map((question: any) => (
            question.answer !== "Unanswered" &&
            excelData.push({
              MRL: assessmentData.info.current_mrl,
              question_text: question.question_text,
              current_answer: question.answer.answer,
              objective_evidence: question.answer.objective_evidence,
              // question_id: question.id
            })
          ))
        ))
      ));

      let insertQuestionData = assessmentData.threads.map((thread: any) => (
        thread.subthreads.map((subthread: any) => (
          subthread.questions.map((question: any) => (
            question.answer !== "Unanswered" &&
            setQuestionData((questionData: any) => [...questionData, {
              thread_name: thread.name,
              subthread_name: subthread.name,
              MRL: assessmentData.info.current_mrl,
              question_text: question.question_text,
              current_answer: question.answer.answer,
              objective_evidence: question.answer.objective_evidence,
              question_id: question.id
            }])
          ))
        ))
      ));

      let insertFilteringData = assessmentData.threads.map((thread: any) => (
        thread.subthreads.map((subthread: any) => (
          subthread.questions.map((question: any) => (
            question.answer !== "Unanswered" &&
            setFilteringData((questionData: any) => [...questionData, {
              thread_name: thread.name,
              subthread_name: subthread.name,
              MRL: assessmentData.info.current_mrl,
              question_text: question.question_text,
              current_answer: question.answer.answer,
              objective_evidence: question.answer.objective_evidence,
              question_id: question.id,
            }])
          ))
        ))
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
    if (loadedFiles) {
      console.log(loadedFiles)
    }
  }, [loadedFiles]);

  const handleMRLevelChange = (value: any) => {
    setSelectedMRL(value)
  }

  const handleAnswerChange = (value: any) => {
    setSelectedAnswer(value);
  }

  const filterData = () => {
    if (filteredMRL === 'all-levels') {
      if (filteredAnswer === 'all-answers') {
        setQuestionData(filteringData);
      }
      else {
        setQuestionData(filteringData.filter((question: any) => question.current_answer === filteredAnswer))
      }
    }
    else {
      if (filteredAnswer === 'all-answers') {
        setQuestionData(filteringData.filter((question: any) => Number(filteredMRL) === assessmentData.info.current_mrl))
      }
      else {
        setQuestionData(filteringData.filter((question: any) => (Number(filteredMRL) === assessmentData.info.current_mrl && question.current_answer === filteredAnswer)))
      }
    }
  }

  const openURL = (url: any) => {
    window.open(url)
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
      <ReportsTopbar text="Review" />
      <IonContent>
        <div className="review-wrapper">
          <InfoCard assessmentId={assessmentId} />
          <IonRow className="review-filter-toolbar">
            <IonCol size="12" size-lg="2" className="filter-button1">
              {assessmentData &&
                <ExcelFile element={<IonButton expand="block" color="dsb">Export As XLS</IonButton>}>
                  <ExcelSheet data={excelData} name="Review">
                    <ExcelColumn label="MRL" value="MRL" />
                    <ExcelColumn label="Question Text" value="question_text" />
                    <ExcelColumn label="Current Answer" value="current_answer" />
                    <ExcelColumn label="Objective Evidence" value="objective_evidence" />
                  </ExcelSheet>
                </ExcelFile>}
            </IonCol>
            <IonCol size="12" size-lg="3" className="filter-item">
              <IonItem color="dark">
                <IonLabel position="floating">Filter MR Level</IonLabel>
                <IonSelect interface="popover" onIonChange={e => handleMRLevelChange(e.detail.value)}>
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
                <IonSelect interface="popover" onIonChange={e => handleAnswerChange(e.detail.value)}>
                  <IonSelectOption value="all-answers">All Answers</IonSelectOption>
                  <IonSelectOption value="yes">Yes</IonSelectOption>
                  <IonSelectOption value="no">No</IonSelectOption>
                  <IonSelectOption value="na">N/A</IonSelectOption>
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

          <div className="survey-info">
            {questionData && questionData.map((question: any, index: any) => (
              <IonCard className="review-card">
                <IonCardHeader>
                  <IonCardTitle className="review-header">{question.question_text}</IonCardTitle>
                  {question.current_answer === 'yes' && <IonCardSubtitle className="box yes"><b>Yes</b></IonCardSubtitle>}
                  {question.current_answer === 'no' && <IonCardSubtitle className="box no"><b>No</b></IonCardSubtitle>}
                  {question.current_answer === 'na' && <IonCardSubtitle className="box na"><b>N/A</b></IonCardSubtitle>}
                </IonCardHeader>
                <IonCardContent className="review-card-content">
                  <h4>Thread: {question.thread_name} | SubThread: {question.subthread_name}</h4>
                  <h4>MRLevel: {question.MRL}</h4>
                  {question.current_answer === 'yes' &&
                    <h2><b>Objective Evidence:</b> {(question.objective_evidence) ? <span>{question.objective_evidence}</span> : <span>No objective evidence</span>}</h2>
                  }
                  <h2><b>Attachments:</b> {loadedFiles.map((file: any, index: any) => (
                    file.questions.length !== 0 &&
                    <Fragment>
                      {file.questions[0].id === question.question_id &&
                        <span><span className="open-file" onClick={() => openURL(file.url)}>{file.name}</span>, </span>
                      }
                    </Fragment>
                    //No attachments
                  ))}
                  </h2>
                  <IonButton size="small" color="dsb" onClick={() => navigateToAssessment(question.question_id)}>Go To Question</IonButton>
                </IonCardContent>
              </IonCard>
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}
export default Review;
