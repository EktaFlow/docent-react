// @ts-nocheck
import { IonPage, IonContent, IonRow, IonCol, IonButton, IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import ReactExport from "react-export-excel";

import DataTable from 'react-data-table-component'
import { useHistory } from 'react-router-dom';

import './ActionItems.scss';
import Header from '../../Framework/Header';
import InfoCard from '../InfoCard';
import ReportsTopbar from '../ReportsTopbar';

import { grabSingleAssessment } from '../../../api/api';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ActionItems: React.FC = () => {
  const history = useHistory();
  const [assessmentId, setAssessmentId] = useState<number>();
  const [assessmentData, setAssessmentData] = useState<any>();

  const [selectedMRL, setSelectedMRL] = useState<string>('all-levels');
  const [filteredMRL, setFilteredMRL] = useState('all-levels');

  const [data, setData] = useState<any>([]);
  const [filteringData, setFilteringData] = useState<any>([]);


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
        await setAssessmentData(assessmentInfo);
      }
    }
    getAssessment();
  }, [assessmentId]);

  useEffect(() => {
    if (assessmentData) {
      let insertQuestionData = assessmentData.threads.map((thread: any) => (
        thread.subthreads.map((subthread: any) => (
          subthread.questions.map((question: any) => (
            setData((questionData: any) => [...questionData, {
              id: thread.id,
              MRL: assessmentData.info.current_mrl,
              Threads: thread.name,
              Questions: question.question_text,
              Answer: question.answer.answer,
              Action: question.answer.what,
              Due: assessmentData.info.target,
              Owner: question.answer.who,
              Risk: question.answer.risk
            }])
          ))
        ))
      ))

      let insertFilteringData = assessmentData.threads.map((thread: any) => (
        thread.subthreads.map((subthread: any) => (
          subthread.questions.map((question: any) => (
            setFilteringData((questionData: any) => [...questionData, {
              id: thread.id,
              MRL: assessmentData.info.current_mrl,
              Threads: thread.name,
              Questions: question.question_text,
              Answer: question.answer.answer,
              Action: question.answer.what,
              Due: assessmentData.info.target,
              Owner: question.answer.who,
              Risk: question.answer.risk
            }])
          ))
        ))
      ))
    }
  }, [assessmentData]);

  useEffect(() => {
    if (filteredMRL) {
      filterData()
    }
  }, [filteredMRL]);

  // table info
  const columns = [
    {
      name: 'MRL',
      selector: (row: { MRL: any; }) => row.MRL,
      sortable: true,
    },
    {
      name: 'Threads',
      selector: (row: { Threads: any; }) => row.Threads,
      wrap: true,
      sortable: true,
    },
    {
      name: 'Questions',
      selector: (row: { Questions: any; }) => row.Questions,
      width: '280px',
      wrap: true,
      sortable: true,
    },
    {
      name: 'Answer',
      selector: (row: { Answer: any; }) => row.Answer,
      sortable: true,
    },
    {
      name: 'Action',
      selector: (row: { Action: any; }) => row.Action,
      sortable: true,
    },
    {
      name: 'Due',
      selector: (row: { Due: any; }) => row.Due,
      sortable: true,
    },
    {
      name: 'Owner',
      selector: (row: { Owner: any; }) => row.Owner,
      sortable: true,
    },
    {
      name: 'Risk',
      selector: (row: { Risk: any; }) => row.Risk,
      sortable: true,
    },
  ];

  const handleMRLevelChange = (value: any) => {
    setSelectedMRL(value);
  }

  const filterData = () => {
    if (filteredMRL === 'all-levels') {
      setData(filteringData);
    }
    else {
      setData(filteringData.filter((data: any) => Number(filteredMRL) === assessmentData.info.current_mrl))
    }
  }

  const handleFilterClick = () => {
    setFilteredMRL(selectedMRL);
  }

  const handleClearClick = () => {
    setFilteredMRL('all-levels');
  }

  return (
    <IonPage>
      <Header showAssessment={true} assessmentId={assessmentId} />
      <ReportsTopbar text="Action Items" />
      <IonContent>
        <div className="action-items-wrapper">
          <InfoCard assessmentId={assessmentId} />
          <IonRow className="action-filter-toolbar">
            <IonCol size="12" size-lg="2" className="filter-button1 ion-padding-bottom">
              {assessmentData && <ExcelFile element={<IonButton expand="block" color="dsb">Export As XLS</IonButton>}>
                <ExcelSheet data={filteringData} name="Action Items">
                  <ExcelColumn label="MRL" value="MRL" />
                  <ExcelColumn label="Thread Name" value="Threads" />
                  <ExcelColumn label="Question Text" value="Questions" />
                  <ExcelColumn label="Current Answer" value="Answer" />
                  <ExcelColumn label="Action Plan" value="Action" />
                  <ExcelColumn label="Due Date" value="Due" />
                  <ExcelColumn label="Owner" value="Owner" />
                  <ExcelColumn label="Risk Score" value="Risk" />
                </ExcelSheet>
              </ExcelFile>}
            </IonCol>
            <IonCol size="12" size-lg="3" className="ion-no-padding"></IonCol>
            <IonCol size="12" size-lg="3" className="filter-item ion-no-padding">
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
            <IonCol size="6" size-lg="1" className="filter-button2 ion-padding-bottom">
              <IonButton expand="full" color="dsb" className="filter-buttons" onClick={() => handleFilterClick()}>Filter</IonButton>
            </IonCol>
            <IonCol size="6" size-lg="1" className="filter-button3 ion-padding-bottom">
              <IonButton expand="full" color="dsb" className="filter-buttons" onClick={() => handleClearClick()}>Clear</IonButton>
            </IonCol>
          </IonRow>
          {data && <DataTable columns={columns} data={data} />}
        </div>
      </IonContent>
    </IonPage>
  )
}
export default ActionItems;
