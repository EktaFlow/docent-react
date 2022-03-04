import { IonPage, IonContent, IonRow, IonCol, IonButton, IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';

import DataTable from 'react-data-table-component'

import './ActionItems.scss';
import Header from '../../Framework/Header';
import InfoCard from '../InfoCard';
import ReportsTopbar from '../ReportsTopbar';

const ActionItems: React.FC = () => {

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
