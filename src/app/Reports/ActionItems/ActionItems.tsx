// @ts-nocheck
import { IonPage, IonContent, IonRow, IonCol, IonButton, IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';

import DataTable from 'react-data-table-component'

import './ActionItems.scss';
import Header from '../../Framework/Header';
import InfoCard from '../InfoCard';
import ReportsTopbar from '../ReportsTopbar';

const columns = [
  {
    name: 'MRL',
    selector: row => row.thread.mrl_level,
    sortable: true,
  },
  {
    name: 'Threads',
    selector: row => row.thread.name,
    sortable: true,
    wrap: true,
  },
  {
    name: 'Subthreads',
    selector: row => row.subthread.name, 
    sortable: true,
    wrap: true,
  },
  {
    name: 'Questions',
    selector: row => row.question.question_text,
    width: '200px',
    sortable: true,
    wrap: true,
  },
  {
    name: 'Answer',
    selector: row => row.answers.answer,
    sortable: true,
  },
  {
    name: 'Action',
    selector: row => row.answers.what,
    sortable: true,
  },
  {
    name: 'Due',
    selector: row => row.answers.when,
    sortable: true,
  },
  {
    name: 'Owner',
    selector: row => row.answers.who,
    sortable: true,
  },
  {
    name: 'Risk',
    selector: row => row.answers.risk,
    sortable: true,
  },
];

const data = [
  {
    id: 1,
    question: {
      question_text: 'Have global trends in emerging industrial base capabilities been identified?',
    },
    thread: {
      name: 'Technology & Industrial Base',
      mrl_level: '1',
    },
    subthread: {
      name: "A.1 - Technology Transition to Production"
    },
    answers: {
      answer: 'no',
      who: 'null',
      what: 'null',
      when: '03/02/22',
      risk: 23
    },
  }
]

const ActionItems: React.FC = () => {
  return (
    <IonPage>
      <Header />
      <ReportsTopbar text="Action Items" />
      <IonContent>
        <div className="action-items-wrapper">
          <InfoCard />

          <IonRow className="action-filter-toolbar">
            <IonCol size="12" size-lg="2" className="filter-button1 ion-padding-bottom">
              <IonButton expand="block" color="dsb">Export As XLS</IonButton>
            </IonCol>
            <IonCol size="12" size-lg="3" className="ion-no-padding">

            </IonCol>
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
