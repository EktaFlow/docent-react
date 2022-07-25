import { IonPage, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonButton, IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import React, { useState, useEffect, Fragment } from 'react';
import ReactExport from "react-export-excel";

import { useHistory } from 'react-router-dom';

import './DetailedRisk.scss';
import Header from '../../Framework/Header';
import InfoCard from '../InfoCard';
import ReportsTopbar from '../ReportsTopbar';

import { grabSingleAssessment } from '../../../api/api';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const DetailedRisk: React.FC = () => {
  const history = useHistory();
  const [assessmentId, setAssessmentId] = useState<number>();
  const [assessmentData, setAssessmentData] = useState<any>();
  const [questionData, setQuestionData] = useState<any>([]);
  const [filteringData, setFilteringData] = useState<any>([]);

  const [excelData, setExcelData] =  useState<any>([]);

  const [selectedMRL, setSelectedMRL] = useState<string>('all-levels');
  const [filteredMRL, setFilteredMRL] = useState('all-levels');

  const [reportName, setReportName] = useState<string>('')

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
      // console.log(assessmentData)
      setSelectedMRL(assessmentData.info.current_mrl.toString())
      setFilteredMRL(assessmentData.info.current_mrl.toString())

      setReportName(assessmentData.info.name + "-detailed_risk")

      let threadData = assessmentData.threads.map((thread: any) => (
        thread.subthreads.map((subthread: any) => {
          subthread.questions.map((question: any) => (
            question.answer !== "Unanswered" &&
            setExcelData((data: any) => [...data, {
              thread_name: thread.name,
              subthread_name: subthread.name,
              MRL: assessmentData.info.current_mrl,
              question_text: question.question_text,
              risk_score: question.answer.risk,
              greatest_impact: question.answer.greatest_impact,
              risk_response: question.answer.risk_response,
              mmp_summary: question.answer.mmp_summary,
            }])
          ))
        })
      ))

      let insertQuestionData = assessmentData.threads.map((thread: any) => (
        thread.subthreads.map((subthread: any) => {
          let questionArray: { question_text: string, risk_score: any, greatest_impact: string, risk_response: string, mmp_summary: string; }[] = [];
          subthread.questions.map((question: any) => (
            question.answer !== "Unanswered" &&
            questionArray.push({
              question_text: question.question_text,
              risk_score: question.answer.risk,
              greatest_impact: question.answer.greatest_impact,
              risk_response: question.answer.risk_response,
              mmp_summary: question.answer.mmp_summary,
            })
          ))
          if (questionArray.length > 0) {
            setQuestionData((questionData: any) => [...questionData, {
              thread_name: thread.name,
              subthread_name: subthread.name,
              MRL: assessmentData.info.current_mrl,
              questionInfo: questionArray,
            }])
          }
        })
      ));

      let insertFilteringData = assessmentData.threads.map((thread: any) => (
        thread.subthreads.map((subthread: any) => {
          let questionArray: { question_text: string, risk_score: any, greatest_impact: string, risk_response: string, mmp_summary: string; }[] = [];
          subthread.questions.map((question: any) => (
            question.answer !== "Unanswered" &&
            questionArray.push({
              question_text: question.question_text,
              risk_score: question.answer.risk,
              greatest_impact: question.answer.greatest_impact,
              risk_response: question.answer.risk_response,
              mmp_summary: question.answer.mmp_summary,
            })
          ))
          if (questionArray.length > 0) {
            setFilteringData((questionData: any) => [...questionData, {
              thread_name: thread.name,
              subthread_name: subthread.name,
              MRL: assessmentData.info.current_mrl,
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
    if (questionData) {
      console.log(questionData)
    }
  }, [questionData]);

  const handleMRLevelChange = (value: any) => {
    setSelectedMRL(value)
  }

  const filterData = () => {
    if (filteredMRL === 'all-levels') {
      setQuestionData(filteringData);
    }
    else {
      setQuestionData(filteringData.filter((data: any) => Number(filteredMRL) === assessmentData.info.current_mrl))
    }
  }

  const handleFilterClick = () => {
    setFilteredMRL(selectedMRL)
  }

  const handleClearClick = () => {
    setFilteredMRL('all-levels');
  }
  // <InfoCard assessmentId={assessmentId} />

  return (
    <IonPage>
      <Header showAssessment={true} assessmentId={assessmentId} />
      <ReportsTopbar text="Detailed Risk Report" />
      <IonContent>
        <div className="detailed-risk-wrapper">
          {assessmentData && <h2>Risk Report for MRL Level {assessmentData.info.current_mrl}</h2>}

          <IonRow className="detailed-risk-toolbar">
            <IonCol size="12" size-lg="2" className="filter-button1 ion-padding-bottom">
              {excelData &&
                <ExcelFile filename={reportName} element={<IonButton expand="block" color="dsb">Export As XLS</IonButton>}>
                  <ExcelSheet data={excelData} name="Detailed Risk">
                    <ExcelColumn label="Thread Name" value="thread_name" />
                    <ExcelColumn label="Subthread Name" value="subthread_name" />
                    <ExcelColumn label="MRL" value="MRL" />
                    <ExcelColumn label="Question Text" value="question_text" />
                    <ExcelColumn label="Risk Score" value="risk_score" />
                    <ExcelColumn label="Greatest Impact" value="greatest_impact" />
                    <ExcelColumn label="Risk Response" value="risk_response" />
                    <ExcelColumn label="MMP Summary" value="mmp_summary" />
                  </ExcelSheet>
                </ExcelFile>}
            </IonCol>
            <IonCol size="12" size-lg="3" className="ion-no-padding"></IonCol>
            <IonCol size="12" size-lg="3" className="filter-item ion-no-padding">
              <IonItem color="docentlight" >
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
            <IonCol size="6" size-lg="1" className="filter-button2 ion-padding-bottom">
              <IonButton expand="full" color="dsb" className="filter-buttons" onClick={() => handleFilterClick()}>Filter</IonButton>
            </IonCol>
            <IonCol size="6" size-lg="1" className="filter-button3 ion-padding-bottom">
              <IonButton expand="full" color="dsb" className="filter-buttons" onClick={() => handleClearClick()}>Clear</IonButton>
            </IonCol>
          </IonRow>

          <div className="detailed-card-wrapper">
            {questionData && questionData.map((question: any, index: any) => (
              <IonCard className="detailed-risk-card" color="docentlight" >
                <IonCardHeader>
                  <IonCardTitle>Thread: {question.thread_name}</IonCardTitle>
                </IonCardHeader>

                <IonCard className="subthread-card" color="docentlight" >
                  <IonCardHeader>
                    <IonCardTitle>Subthread: {question.subthread_name}</IonCardTitle>
                  </IonCardHeader>
                  {question.questionInfo.map((question_info: any, index: any) => (
                    <div className="question">
                      <div>
                        <h4>{question_info.question_text}</h4>
                      </div>
                      <div>
                        {(question_info.risk_score) ?
                          <p className="red"><b>Risk Score: </b>{question_info.risk_score}</p> : <p><b>Risk Score: </b></p>
                        }
                        <div className="extra-risk">
                          <p><b>Greatest Impact: </b>{question_info.greatest_impact}</p>
                          <p><b>Risk Response: </b>{question_info.risk_response}</p>
                          <p><b>MMP Summary: </b>{question_info.mmp_summary}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </IonCard>
              </IonCard>
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}
export default DetailedRisk;
