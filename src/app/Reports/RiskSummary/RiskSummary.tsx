import { IonPage, IonContent, IonRow, IonCol, IonButton, IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import React, { useState, useEffect, Fragment } from 'react';
import ReactExport from "react-export-excel";

import { useHistory } from 'react-router-dom';

import './RiskSummary.scss';
import Header from '../../Framework/Header';
import InfoCard from '../InfoCard';
import ReportsTopbar from '../ReportsTopbar';

import { grabSingleAssessment } from '../../../api/api'

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const RiskSummary: React.FC = () => {
  const [assessmentId, setAssessmentId] = useState<number>();
  const [assessmentData, setAssessmentData] = useState<any>();

  const [excelData, setExcelData] =  useState<any>([]);

  const [selectedMRL, setSelectedMRL] = useState<string>('');
  const [filteredMRL, setFilteredMRL] = useState('all-levels');

  const [reportName, setReportName] = useState<string>('')

  const history = useHistory();

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
      setSelectedMRL(assessmentData.info.current_mrl.toString())
      setFilteredMRL(assessmentData.info.current_mrl.toString())

      setReportName(assessmentData.info.name + "-risk_summary")

      let threadData = assessmentData.threads.map((thread: any) => (
        thread.subthreads.map((subthread: any) => (
          subthread.questions.map((question: any) => (
            setExcelData((data: any) => [...data, {
              MRL: assessmentData.info.current_mrl,
              thread_name: thread.name,
              subthread_name: subthread.name,
              risk_score: question.answer.risk,
            }])
          ))
        ))
      ));
    }
  }, [assessmentData]);

  const handleMRLevelChange = (value: any) => {
    setSelectedMRL(value)
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
      <ReportsTopbar text="MRL Risk Summary" />
      <IonContent>
        <div className="risk-summary-wrapper">
          <IonRow className="summary-filter-toolbar">
            <IonCol size="12" size-lg="2" className="filter-button1 ion-padding-bottom">
              {excelData &&
                <ExcelFile filename={reportName} element={<IonButton expand="block" color="dsb">Export As XLS</IonButton>}>
                  <ExcelSheet data={excelData} name="Risk Summary">
                    <ExcelColumn label="MRL" value="MRL" />
                    <ExcelColumn label="Thread Name" value="thread_name" />
                    <ExcelColumn label="Subthread Name" value="subthread_name" />
                    <ExcelColumn label="Risk Score" value="risk_score" />
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

          <table>
            <tr>
              {assessmentData && <th className="summary-title" colSpan={7}>
                MRL {assessmentData.info.current_mrl} Criteria Summary
              </th>
              }
            </tr>
            <tr>
              <th className="summary-header thread">Threads</th>
              <th className="summary-header subthread">Subthreads</th>
              <th className="summary-header">Criteria 1</th>
              <th className="summary-header">Criteria 2</th>
              <th className="summary-header">Criteria 3</th>
              <th className="summary-header">Criteria 4</th>
              <th className="summary-header">Criteria 5</th>
            </tr>

            {assessmentData && assessmentData.threads.map((thread: any, index: any) => (
              <Fragment>
                {filteredMRL === "all-levels" && thread.subthreads.map((subthread: any, index: any) => (
                  <tr className="summary-row">
                    <td className="row-border">{thread.name}</td>
                    <td className="row-border">{subthread.name}</td>

                    {!subthread.questions[0] &&
                      <td className="row-border"></td>
                    }
                    {subthread.questions.map((question: any, index: any) => (
                      <Fragment>
                        {(question.answer === 'Unanswered' || !question.answer.risk) &&
                          <td className="row-border"></td>
                        }
                        {(Number(question.answer.risk) <= 11 && Number(question.answer.risk) >= 0 && question.answer.risk !== null) &&
                          <td className="row-border risk-score green">{question.answer.risk}</td>
                        }
                        {(Number(question.answer.risk) <= 19 && Number(question.answer.risk) >= 12) &&
                          <td className="row-border risk-score yellow">{question.answer.risk}</td>
                        }
                        {(Number(question.answer.risk) <= 25 && Number(question.answer.risk) >= 20) &&
                          <td className="row-border risk-score red">{question.answer.risk}</td>
                        }
                      </Fragment>
                    ))}
                    <td className="row-border"></td>
                    <td className="row-border"></td>
                    <td className="row-border"></td>
                    <td className="row-border"></td>
                  </tr>
                ))}
                {filteredMRL !== "all-levels" && thread.subthreads.filter((data: any) => Number(filteredMRL) === assessmentData.info.current_mrl).map((subthread: any, index: any) => (
                  <tr className="summary-row">
                    <td className="row-border">{thread.name}</td>
                    <td className="row-border">{subthread.name}</td>

                    {!subthread.questions[0] &&
                      <td className="row-border"></td>
                    }
                    {subthread.questions.map((question: any, index: any) => (
                      <Fragment>
                        {(question.answer === 'Unanswered' || !question.answer.risk) &&
                          <td className="row-border"></td>
                        }
                        {(Number(question.answer.risk) <= 11 && Number(question.answer.risk) >= 0 && question.answer.risk !== null) &&
                          <td className="row-border risk-score green">{question.answer.risk}</td>
                        }
                        {(Number(question.answer.risk) <= 19 && Number(question.answer.risk) >= 12) &&
                          <td className="row-border risk-score yellow">{question.answer.risk}</td>
                        }
                        {(Number(question.answer.risk) <= 25 && Number(question.answer.risk) >= 20) &&
                          <td className="row-border risk-score red">{question.answer.risk}</td>
                        }
                      </Fragment>
                    ))}
                    <td className="row-border"></td>
                    <td className="row-border"></td>
                    <td className="row-border"></td>
                    <td className="row-border"></td>
                  </tr>
                ))}
              </Fragment>
            ))}
          </table>
        </div>
      </IonContent>
    </IonPage>
  )
}
export default RiskSummary;
