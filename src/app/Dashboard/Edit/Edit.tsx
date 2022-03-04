import { IonPage, IonContent, IonGrid, IonItem, IonLabel, IonInput, IonRow, IonCol, IonTextarea, IonSelect, IonSelectOption, IonText, IonPopover, IonDatetime, IonButton } from '@ionic/react';

import './Edit.scss';
import Header from '../../Framework/Header';
import React, { useState } from 'react';

import { format, parseISO } from 'date-fns';

const Edit: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const formatDate = (value: string) => {
    return format(parseISO(value), 'MMM dd yyyy');
  };

  return (
    <IonPage>
      <Header />
      <IonContent>
        <div className="edit-assessment-wrapper">

          <h1>Edit Assessment</h1>

          <IonGrid>
            <IonRow>
              <IonCol size="12" size-lg="4">
                <IonItem color="dark">
                  <IonLabel position="floating">Assessment Name</IonLabel>
                  <IonInput placeholder="Name"></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>

            <h6>Add Team Member</h6>
            <IonRow>
              <IonCol size="12" size-lg="4">
                <IonItem color="dark">
                  <IonLabel position="floating">Member Name</IonLabel>
                  <IonInput placeholder=""></IonInput>
                </IonItem>
              </IonCol>
              <IonCol size="12" size-lg="4">
                <IonItem color="dark">
                  <IonLabel position="floating">Member Email</IonLabel>
                  <IonInput placeholder=""></IonInput>
                </IonItem>
              </IonCol>
              <IonCol size="12" size-lg="4">
                <IonItem color="dark">
                  <IonLabel position="floating">Member Role</IonLabel>
                  <IonInput placeholder=""></IonInput>
                </IonItem>
              </IonCol>

              <IonCol size="12" size-lg="5">
                <IonItem color="dark">
                  <IonLabel position="floating">Additional Info</IonLabel>
                  <IonInput placeholder="Enter Additional Information Here"></IonInput>
                </IonItem>
              </IonCol>

              <IonCol size="12" size-lg="2">
                <IonItem color="dark">
                  <IonLabel position="floating">Target MRL*</IonLabel>
                  <IonSelect interface="popover">
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

              <IonCol size="12" size-lg="2">
                <IonItem color="dark">
                  <IonLabel position="floating">Level Switching</IonLabel>
                  <IonSelect interface="popover">
                    <IonSelectOption value="yes">Yes</IonSelectOption>
                    <IonSelectOption value="no">No</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </IonCol>

              <IonCol size="12" size-lg="3">
                <IonItem button={true} id="open-date-input" color="dark">
                  <IonLabel>Date</IonLabel>
                  <IonText slot="end">{selectedDate}</IonText>
                  <IonPopover trigger="open-date-input" showBackdrop={false}>
                    <IonDatetime
                      presentation="date"
                      onIonChange={ev => setSelectedDate(formatDate(ev.detail.value!))}
                    />
                  </IonPopover>
                </IonItem>
              </IonCol>

              <IonCol size="12" size-lg="6">
                <IonItem className="date-picker" color="dark">
                  <IonLabel position="floating">Location</IonLabel>
                  <IonInput placeholder="Enter Location"></IonInput>
                </IonItem>
              </IonCol>

              <IonCol size="12" size-lg="6">

              </IonCol>

              <IonCol size="12" size-lg="6">
                <h6>Choose Threads <img src="assets/if_icon-arrow-down.png" className="down-arrow"></img></h6>
              </IonCol>

              <IonCol className="ion-text-end" size="12" size-lg="6">
                <IonButton color="dsb">Update Assessment</IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>

        </div>
      </IonContent>
    </IonPage>
  )
}
export default Edit;
