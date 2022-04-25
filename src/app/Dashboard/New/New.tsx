import { IonButton, IonPage, IonLabel, IonInput, IonItem, IonTextarea, IonSelect, IonSelectOption, IonDatetime, IonText, IonPopover, IonChip, IonIcon } from '@ionic/react';
import { pin, heart, closeCircle, close } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';

import Header from '../../Framework/Header';
import './New.scss';
import ChooseThreads from './ChooseThreads';
import { format, parseISO } from 'date-fns';
import { createAssessment } from '../../../api/api';
import {useHistory} from "react-router-dom";

const New: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [newAssessment, setNewAssessment] = useState({
    name: '',
    scope: '',
    target_mrl: null,
    current_mrl: null,
    level_switching: '',
    target: null,
    location: '',
    deskbook_version: '',
    team_members: ''
  });
  const [tempTM, setTempTM] = useState({
    email: '',
    role: ''
  })
  const [tms, setTms] = useState<any>([]);
  let history = useHistory();

  useEffect(() => {
    setNewAssessment({
      name: '',
      scope: '',
      target_mrl: null,
      current_mrl: null,
      level_switching: '',
      target: null,
      location: '',
      deskbook_version: '',
      team_members: ''
    })
  }, [])

  function handleChange(e: Event) {
    // const { name, value } = e.currentTarget
    console.log(e.target)
    // setNewAssessment(newAssessment => ({ ...newAssessment, [e.target!.value]: e.target!.value }))
  }

  const handleAssessmentChange = (e: any) => {
    setNewAssessment({
      ...newAssessment,
      [e.target.name]: e.target.value
    });
  };

  const getDate = (value: any) => {
    setNewAssessment({
      ...newAssessment,
      target: value
    });
  }

  function updateTM(e: any){
    setTempTM({
      ...tempTM,
      [e.target.name]: e.target.value
    });
  }

  function saveTeamMember() {
    var ts:any = [...tms, tempTM]
    setTms(ts)
    setTempTM({email: '', role: ''})
  }

  // useEffect(() => {
  //   console.log(tms)
  // }, [tms])

  function removeIcon(spot:any){
    var t = [...tms]
    t.splice(spot, 1)
    setTms(t)
  }

  async function saveAssessment() {
    var nA = newAssessment
    nA["team_members"] = tms
    console.log(nA)
    var assm = await createAssessment(nA)
      .then((res) => {
        console.log(res);
        history.push('/home');
      })
      .catch((error) => {
        console.log(error)
      })
  }



  const formatDate = (value: string) => {
    let formattedDate = format(parseISO(value), 'MMM dd yyyy');
    getDate(formattedDate);
    return formattedDate;
  };

  return (
    <IonPage className="new-page-wrapper">
      <Header />
      <div className="content-wrapper">
        <div className="header-info">
          <h3>Create a New Manufacturing Readiness Assessment</h3>
          <p>Fill out the fields (* = required) to create a new assessment. You can add team members and customize which threads you want included in your assessment.</p>
        </div>
        <div className="panel-wrappers">
          <div className="assessment-info">
            <h3>Assessment Information</h3>
            <IonItem color="dark">
              <IonLabel position="floating">Assessment Name* (0/50)</IonLabel>
              <IonInput
                name="name"
                value={newAssessment.name}
                onIonChange={handleAssessmentChange}
              ></IonInput>
            </IonItem>
            <IonItem color="dark">
              <IonLabel position="floating">Target MRL*</IonLabel>
            </IonItem>
            <IonItem color="dark">
              <IonLabel position="floating">Level Switching</IonLabel>
              <IonSelect
                name="level_switching"
                value={newAssessment.level_switching}
                onIonChange={handleAssessmentChange}
                interface="popover"
              >
                <IonSelectOption value="yes">Yes</IonSelectOption>
                <IonSelectOption value="no">No</IonSelectOption>
              </IonSelect>
            </IonItem>
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
            <IonItem color="dark">
              <IonLabel position="floating">Location</IonLabel>
              <IonInput
                name="location"
                value={newAssessment.location}
                onIonChange={handleAssessmentChange}
              ></IonInput>
            </IonItem>
            <IonItem color="dark">
              <IonLabel position="floating">Additional Information/Scope</IonLabel>
              <IonTextarea
                name="scope"
                value={newAssessment.scope}
                onIonChange={handleAssessmentChange}
              ></IonTextarea>
            </IonItem>
            <IonItem color="dark">
              <IonLabel position="floating">Deskbook Version*</IonLabel>
              <IonSelect
                name="deskbook_version"
                value={newAssessment.deskbook_version}
                onIonChange={handleAssessmentChange}
                interface="popover"
              >
                <IonSelectOption value="2020">2020</IonSelectOption>
                <IonSelectOption value="2018">2018</IonSelectOption>
              </IonSelect>
            </IonItem>
            <div className="start-button">
              <p><i>Make sure the correct threads have been selected and team members have been added</i></p>
              <IonButton color="dsb" expand='full' onClick={() => saveAssessment()}>Start Assessment</IonButton>
            </div>
          </div>
          <div className="assessment-choices">
            <h3>Add Team Members</h3>
            <div className="tm-fields-wrapper">
              <IonItem color="dark">
                <IonLabel position="floating">Member Email</IonLabel>
                <IonInput
                  name="email"
                  value={tempTM.email}
                  onIonChange={updateTM}
                ></IonInput>
              </IonItem>
              <IonItem color="dark">
                <IonLabel position="floating">Member Role</IonLabel>
                <IonInput
                  name="role"
                  value={tempTM.role}
                  onIonChange={updateTM}
                  placeholder="">
                </IonInput>
              </IonItem>
            </div>
            <IonButton color="dsb" expand='full' onClick={() => saveTeamMember()}>Add Team Member</IonButton>

            <div className="added-members">
              { tms.length > 0 && tms.map((tm:any, index:any) => (
                <IonChip color="light">
                  <IonLabel color="light">Email: <b>{tm.email}</b> Role: <b>{tm.role}</b></IonLabel>
                  <span onClick={() => removeIcon(index)}><IonIcon  icon={closeCircle} /></span>
                </IonChip>
              ))
              }

            </div>
            <ChooseThreads />

          </div>
        </div>
      </div>
    </IonPage>
  )
}
export default New;

// <IonItem color="dark">
// <IonLabel position="floating">Date to Achieve Target MRL</IonLabel>
// <IonInput placeholder=""></IonInput>
//
// </IonItem>
