import { IonPage, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonItem, IonLabel, IonSelect, IonSelectOption, IonContent } from '@ionic/react';
import React, { useState, useEffect, Fragment } from 'react';
import ReactExport from "react-export-excel";

import { useHistory } from 'react-router-dom';

import './Comprehensive.scss';
import Header from '../../Framework/Header';
import InfoCard from '../InfoCard';
import ReportsTopbar from '../ReportsTopbar';

import { grabSingleAssessment, grabFiles } from '../../../api/api'

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const Comprehensive: React.FC = () => {
  const history = useHistory();
  const [assessmentId, setAssessmentId] = useState<number>();
  const [assessmentData, setAssessmentData] = useState<any>();
  const [questionData, setQuestionData] = useState<any>([]);
  const [filteringData, setFilteringData] = useState<any>([]);

  const [selectedMRL, setSelectedMRL] = useState<string>('all-levels');
  const [filteredMRL, setFilteredMRL] = useState('all-levels');

  const [selectedAnswer, setSelectedAnswer] = useState<string>('all-answers');
  const [filteredAnswer, setFilteredAnswer] = useState('all-answers');

  const [loadedFiles, setLoadedFiles] = useState<any>([])

  let excelData: Array<any> = [];

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
      loadFiles(assessment_id);
    }
    async function loadFiles(assessmentId: any) {
      await grabFiles(assessmentId).then((res) => {
        // console.log(res.files);
        setLoadedFiles(res.files);
      })
        .catch((error) => {
          console.log(error)
        })
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
      setSelectedMRL(assessmentData.info.current_mrl.toString())
      setFilteredMRL(assessmentData.info.current_mrl.toString())

      let threadData = assessmentData.threads.map((thread: any) => (
        thread.subthreads.map((subthread: any) => (
          subthread.questions.map((question: any) => (
            question.answer !== "Unanswered" &&
            excelData.push({
              thread_name: thread.name,
              subthread_name: subthread.name,
              MRL: assessmentData.info.current_mrl,
              question_text: question.question_text,
              current_answer: question.answer.answer,
              //
              yes_fields: question.answer.yes_fields,
              objective_evidence: question.answer.objective_evidence,
              assumptions_yes: question.answer.assumptions_yes,
              notes_yes: question.answer.notes_yes,
              //
              no_fields: question.answer.no_fields,
              owner: question.answer.who,
              due_date: question.answer.when,
              action_plan: question.answer.what,
              reason: question.answer.reason,
              assumptions_no: question.answer.assumptions_no,
              notes_no: question.answer.notes_no,
              documentation_no: question.answer.documentation_no,
              //
              na_fields: question.answer.na_fields,
              assumptions_na: question.answer.assumptions_na,
              notes_na: question.answer.notes_na,
              //
              risk_fields: question.answer.risk_fields,
              risk_score: question.answer.risk,
              likelihood: question.answer.likelihood,
              consequence: question.answer.consequence,
              greatest_impact: question.answer.greatest_impact,
              risk_response: question.answer.risk_response,
              mmp_summary: question.answer.mmp_summary,
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
              //
              objective_evidence: question.answer.objective_evidence,
              assumptions_yes: question.answer.assumptions_yes,
              notes_yes: question.answer.notes_yes,
              //
              owner: question.answer.who,
              due_date: question.answer.when,
              action_plan: question.answer.what,
              reason: question.answer.reason,
              assumptions_no: question.answer.assumptions_no,
              notes_no: question.answer.notes_no,
              documentation_no: question.answer.documentation_no,
              //
              assumptions_na: question.answer.assumptions_na,
              notes_na: question.answer.notes_na,
              //
              risk_score: question.answer.risk,
              likelihood: question.answer.likelihood,
              consequence: question.answer.consequence,
              greatest_impact: question.answer.greatest_impact,
              risk_response: question.answer.risk_response,
              mmp_summary: question.answer.mmp_summary,
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
              //
              objective_evidence: question.answer.objective_evidence,
              assumptions_yes: question.answer.assumptions_yes,
              notes_yes: question.answer.notes_yes,
              //
              owner: question.answer.who,
              due_date: question.answer.when,
              action_plan: question.answer.what,
              reason: question.answer.reason,
              assumptions_no: question.answer.assumptions_no,
              notes_no: question.answer.notes_no,
              documentation_no: question.answer.documentation_no,
              //
              assumptions_na: question.answer.assumptions_na,
              notes_na: question.answer.notes_na,
              //
              risk_score: question.answer.risk,
              likelihood: question.answer.likelihood,
              consequence: question.answer.consequence,
              greatest_impact: question.answer.greatest_impact,
              risk_response: question.answer.risk_response,
              mmp_summary: question.answer.mmp_summary,
              question_id: question.id
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

  const handleMRLevelChange = (value: any) => {
    setSelectedMRL(value)
  }

  const handleAnswerChange = (value: any) => {
    setSelectedAnswer(value);
  }

  const filterData = () => {
    // console.log(filteringData);
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
    setFilteredMRL(selectedMRL)
    setFilteredAnswer(selectedAnswer);
  }

  const handleClearClick = () => {
    setFilteredMRL('all-levels');
    setFilteredAnswer('all-answers');
  }
  // <InfoCard assessmentId={assessmentId} />

  return (
    <IonPage>
      <Header showAssessment={true} assessmentId={assessmentId} />
      <ReportsTopbar text="Comprehensive Report" />
      <IonContent>
        <div className="comprehensive-wrapper">
          <IonRow className="comprehensive-filter-toolbar">
            <IonCol size="12" size-lg="2" className="filter-button1">
              {assessmentData &&
                <ExcelFile element={<IonButton expand="block" color="dsb">Export As XLS</IonButton>}>
                  <ExcelSheet data={excelData} name="Comprehensive">
                    <ExcelColumn label="Thread Name" value="thread_name" />
                    <ExcelColumn label="Subthread Name" value="subthread_name" />
                    <ExcelColumn label="MRL" value="MRL" />
                    <ExcelColumn label="Question Text" value="question_text" />
                    <ExcelColumn label="Current Answer" value="current_answer" />
                    <ExcelColumn label="Yes Fields" value="yes_fields" />
                    <ExcelColumn label="Objective Evidence" value="objective_evidence" />
                    <ExcelColumn label="Yes Assumptions" value="assumptions_yes" />
                    <ExcelColumn label="Yes Notes" value="notes_yes" />
                    <ExcelColumn label="No Fields" value="no_fields" />
                    <ExcelColumn label="Owner" value="owner" />
                    <ExcelColumn label="Due Date" value="due_date" />
                    <ExcelColumn label="Action Plan" value="action_plan" />
                    <ExcelColumn label="Reason" value="reason" />
                    <ExcelColumn label="Assumptions No" value="assumptions_no" />
                    <ExcelColumn label="Notes No" value="notes_no" />
                    <ExcelColumn label="Na Fields" value="na_fields" />
                    <ExcelColumn label="NA Assumptions" value="assumptions_na" />
                    <ExcelColumn label="NA Notes" value="notes_na" />
                    <ExcelColumn label="Risk Fields" value="risk_fields" />
                    <ExcelColumn label="Risk Score" value="risk_score" />
                    <ExcelColumn label="Likelihood" value="likelihood" />
                    <ExcelColumn label="Consequence" value="consequence" />
                    <ExcelColumn label="Greatest Impact" value="greatest_impact" />
                    <ExcelColumn label="Risk Response" value="risk_response" />
                    <ExcelColumn label="MMP Summary" value="mmp_summary" />
                  </ExcelSheet>
                </ExcelFile>}
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
              </IonItem></IonCol>
            <IonCol size="12" size-lg="3" className="filter-item">
              <IonItem color="dark">
                <IonLabel position="floating">Filter Answer Type</IonLabel>
                <IonSelect interface="popover" value={selectedAnswer} onIonChange={e => handleAnswerChange(e.detail.value)}>
                  <IonSelectOption value="all-answers">All Answers</IonSelectOption>
                  <IonSelectOption value="yes">Yes</IonSelectOption>
                  <IonSelectOption value="no">No</IonSelectOption>
                  <IonSelectOption value="na">N/A</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonCol>
            <IonCol size="6" size-lg="1" className="filter-button2">
              <IonButton expand="full" color="dsb" className="filter-buttons" onClick={() => handleFilterClick()}>Filter</IonButton>
            </IonCol>
            <IonCol size="6" size-lg="1" className="filter-button3">
              <IonButton expand="full" color="dsb" className="filter-buttons" onClick={() => handleClearClick()}>Clear</IonButton>
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
                    <span>
                      {(question.objective_evidence) ?
                        <h2><b>Objective Evidence:</b> {question.objective_evidence}</h2> : <h2><b>Objective Evidence:</b> No Objective Evidence Given</h2>
                      }
                      {(question.assumptions_yes) ?
                        <h2><b>Assumptions:</b> {question.assumptions_yes}</h2> : <h2><b>Assumptions:</b> No Assumptions Given</h2>
                      }
                      {(question.notes_yes) ?
                        <h2><b>Notes:</b> {question.notes_yes}</h2> : <h2><b>Notes:</b> No Notes Given</h2>
                      }
                    </span>
                  }
                  {question.current_answer === 'no' &&
                    <span>
                      {(question.owner) ?
                        <h2><b>Owner:</b> {question.owner}</h2> : <h2><b>Owner:</b> No Owner Given</h2>
                      }
                      {(question.due_date) ?
                        <h2><b>Due Date:</b> {question.due_date}</h2> : <h2><b>Due Date:</b> No Due Date Given</h2>
                      }
                      {(question.action_plan) ?
                        <h2><b>Action Plan:</b> {question.action_plan}</h2> : <h2><b>Action Plan:</b> No Action Plan Given</h2>
                      }
                      {(question.reason) ?
                        <h2><b>Reason:</b> {question.reason}</h2> : <h2><b>Reason:</b> No Reason Given</h2>
                      }
                      {(question.assumptions_no) ?
                        <h2><b>Assumptions:</b> {question.assumptions_no}</h2> : <h2><b>Assumptions:</b> No Assumptions Given</h2>
                      }
                      {(question.notes_no) ?
                        <h2><b>Notes:</b> {question.notes_no}</h2> : <h2><b>Notes:</b> No Notes Given</h2>
                      }
                    </span>
                  }
                  <hr />
                  <h2><i>Risk Assessment</i></h2>
                  {(question.risk_score) ?
                    <h2 id="red-text"><b>Risk Score:</b> {question.risk_score}</h2> : <h2><b>Risk Score:</b> No Risk Given</h2>
                  }
                  {(question.greatest_impact) ?
                    <h2><b>Greatest Impact:</b> {question.greatest_impact}</h2> : <h2><b>Greatest Impact:</b> No Greatest Impact Given</h2>
                  }
                  {(question.risk_response) ?
                    <h2><b>Risk Response:</b> {question.risk_response}</h2> : <h2><b>Risk Response:</b> No Risk Response Given</h2>
                  }
                  {(question.mmp_summary) ?
                    <h2><b>MMP Summary:</b> {question.mmp_summary}</h2> : <h2><b>MMP Summary:</b> No MMP Summary Given</h2>
                  }
                  <hr />
                  <h2><b>Attachments:</b> {loadedFiles.map((file: any, index: any) => (
                      file.questions.length !== 0 &&
                      <Fragment>
                        {file.questions[0].id === question.question_id &&
                          <span><span className="open-file" onClick={() => openURL(file.url)}>{file.name}</span>, </span>
                        }
                      </Fragment>
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
export default Comprehensive;
