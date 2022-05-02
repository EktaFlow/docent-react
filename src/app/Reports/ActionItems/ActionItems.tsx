// @ts-nocheck
import { IonPage, IonContent, IonRow, IonCol, IonButton, IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import React, { useState, useEffect } from 'react';

import DataTable from 'react-data-table-component'
import { useHistory } from 'react-router-dom';

import './ActionItems.scss';
import Header from '../../Framework/Header';
import InfoCard from '../InfoCard';
import ReportsTopbar from '../ReportsTopbar';

import { grabSingleAssessment } from '../../../api/api'

const ActionItems: React.FC = () => {
  const history = useHistory();
  const [assessmentId, setAssessmentId] = useState<number>();
  const [assessmentData, setAssessmentData] = useState<any>();

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
      console.log(assessmentData)
      for (var i = 0; i < assessmentData.threads.length; i++) {
        if (assessmentData.threads[i].subthreads[0].questions.length !== 0) {
          console.log(assessmentData.threads[i])
          newData.push({
            id: assessmentData.threads[i].id,
            MRL: assessmentData.info.current_mrl,
            Threads: assessmentData.threads[i].name,
            Questions: assessmentData.threads[i].subthreads[0].questions[0].question_text,
            Answer: (assessmentData.threads[i].subthreads[0].questions[0].answer.answer ? assessmentData.threads[i].subthreads[0].questions[0].answer.answer : ''),
            Due: assessmentData.info.target,
            Risk: (assessmentData.threads[i].subthreads[0].questions[0].answer.risk ? assessmentData.threads[i].subthreads[0].questions[0].answer.risk : ''),
          })
        }
      }
      console.log(newData);
    }
  }, [assessmentData]);

  // table info
  const columns = [
    {
      name: 'Title',
      selector: (row: { MRL: any; }) => row.MRL,
    },
    {
      name: 'Threads',
      selector: (row: { Threads: any; }) => row.Threads,
      wrap: true,
    },
    {
      name: 'Questions',
      selector: (row: { Questions: any; }) => row.Questions,
      width: '280px',
      wrap: true,
    },
    {
      name: 'Answer',
      selector: (row: { Answer: any; }) => row.Answer,
    },
    {
      name: 'Action',
      selector: (row: { Action: any; }) => row.Action,
    },
    {
      name: 'Due',
      selector: (row: { Due: any; }) => row.Due,
    },
    {
      name: 'Owner',
      selector: (row: { Owner: any; }) => row.Owner,
    },
    {
      name: 'Risk',
      selector: (row: { Risk: any; }) => row.Risk,
    },
  ];

  const data = [
    {
      id: 1,
      MRL: '1',
      Threads: 'Technology & Industrial Base',
      Questions: 'Have global trends in emerging industrial base capabilities been identified?',
      Answer: 'No',
      Action: 'null',
      Due: '',
      Owner: 'null',
      Risk: '',
    }
  ]

  const newData = [

  ];

  return (
    <IonPage>
      <Header showAssessment={true} assessmentId={assessmentId} />
      <ReportsTopbar text="Action Items" />
      <IonContent>
        <div className="action-items-wrapper">
          <InfoCard assessmentId={assessmentId} />
          <IonRow className="action-filter-toolbar">
            <IonCol size="12" size-lg="2" className="filter-button1 ion-padding-bottom">
              <IonButton expand="block" color="dsb">Export As XLS</IonButton>
            </IonCol>
            <IonCol size="12" size-lg="3" className="ion-no-padding"></IonCol>
            <IonCol size="12" size-lg="3" className="filter-item ion-no-padding">
              <IonItem color="dark">
                <IonLabel position="floating">Filter MR Level</IonLabel>
                <IonSelect interface="popover">
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
              <IonButton expand="full" color="dsb" className="filter-buttons">Filter</IonButton>
            </IonCol>
            <IonCol size="6" size-lg="1" className="filter-button3 ion-padding-bottom">
              <IonButton expand="full" color="dsb" className="filter-buttons">Clear</IonButton>
            </IonCol>
          </IonRow>

          {/* <table>
            <tr>
              <th className="action-header">MRL</th>
              <th className="action-header thread">Threads</th>
              <th className="action-header subthread">Subthreads</th>
              <th className="action-header question">Question</th>
              <th className="action-header">Answer</th>
              <th className="action-header">Action</th>
              <th className="action-header">Due</th>
              <th className="action-header">Owner</th>
              <th className="action-header">Risk</th>
            </tr>

            <tr className="action-row">
              <td className="row-border">1</td>
              <td className="row-border">Technology & Industrial Base</td>
              <td className="row-border">A.1 - Technology Transition to Production</td>
              <td className="row-border">Have global trends in emerging industrial base capabilities been identified?</td>
              <td className="row-border">No</td>
              <td className="row-border">null</td>
              <td className="row-border"></td>
              <td className="row-border">null</td>
              <td className="row-border"></td>
            </tr>
          </table> */}

          <DataTable
            columns={columns}
            data={data}
          />
        </div>
      </IonContent>
    </IonPage>
  )
}
export default ActionItems;
