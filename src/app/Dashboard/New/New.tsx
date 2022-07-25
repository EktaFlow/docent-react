import { IonButton, IonPage, IonLabel, IonInput, IonItem, IonTextarea, IonSelect, IonSelectOption, IonDatetime, IonText, IonPopover, IonChip, IonIcon, IonToast } from '@ionic/react';
import { pin, heart, closeCircle, close } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';

import Header from '../../Framework/Header';
import './New.scss';
import ChooseThreads from './ChooseThreads';
import { format, parseISO } from 'date-fns';
import { createAssessment } from '../../../api/api';
import {useHistory} from "react-router-dom";

const New: React.FC = () => {
  type ThreadsType = {t: boolean, a: boolean, b: boolean, c: boolean, d: boolean, e: boolean, f: boolean, g: boolean, h: boolean, i: boolean}
  const [selectedDate, setSelectedDate] = useState('');
  const [openDate, setOpenDate] = useState(false); 
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
  const [missingTMValues, setMissingTMValues] = useState(false); 
  let history = useHistory();
  const [validationErrors, setValidationErrors] = useState({
    name: false,
    target_mrl: false
  });
  const [threads, setThreads] = useState<ThreadsType>({t: true, a: true, b: true, c: true, d: true, e: true, f: true, g: true, h: true, i: true});
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setNewAssessment({
      name: '',
      scope: '',
      target_mrl: null,
      current_mrl: null,
      level_switching: '',
      target: null,
      location: '',
      deskbook_version: '2020',
      team_members: ''
    })
  }, [])

  useEffect(() => {
    console.log(threads);
  }, [threads])

  useEffect(() => {
    console.log(tms); 
    // if(tms != []) {
    //   let tm = tms[0];
    //   console.log(tm['email']);
    //   console.log(typeof tms.last)
    // }
    
  }, [tms])

  const handleAssessmentChange = (e: any) => {
    if (e.target.name == 'name' && validationErrors.name == true) {
      var v = validationErrors
      v.name = false;
      setValidationErrors(v)
    }
    if (e.target.name == 'target_mrl' && validationErrors.target_mrl == true) {
      var v = validationErrors
      v.target_mrl = false;
      setValidationErrors(v)
    }
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

  const checkMissingTMValues = () => {
    if(tempTM.email == '' || tempTM.role == '') {
      setMissingTMValues(true)
    }
    else {
      setMissingTMValues(false)
      saveTeamMember()
    }
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
    // console.log(ts)
    setTempTM({email: '', role: ''})
  }

  function removeIcon(spot:any){
    var t = [...tms]
    t.splice(spot, 1)
    setTms(t)
  }

  async function saveAssessment() {
    if (newAssessment.name == '' || newAssessment.target_mrl == null){
      console.log('missing fields!')
      setValidationErrors({
        name: newAssessment.name == '' ? true : false,
        target_mrl: newAssessment.target_mrl == null ? true : false
      })
    } else {
      var ths:any = [];
      var keys = Object.keys(threads);
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach((count) => {
        var thname = keys[count]
        if (threads[thname as keyof ThreadsType] == true) {
          ths.push(count);
        }
      });
      console.log(ths);

      var nA = newAssessment
      nA["team_members"] = tms
      console.log(nA)
      setShowToast(true);

      var assm = await createAssessment(nA)
        .then((res) => {
          console.log(res);
          setShowToast(false);
          history.push({
            pathname: '/questions',
            state: {
              assessment_id: res.assessment_id
            }
          })
        })
        .catch((error) => {
          console.log(error)
        })
    }

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
            <IonItem color={validationErrors.name == false ? 'docentlight' : 'danger'}>
              <IonLabel position="floating">Assessment Name* (50 characters max)</IonLabel>
              <IonInput
                name="name"
                value={newAssessment.name}
                onIonChange={handleAssessmentChange}
                maxlength={50}
                required
              ></IonInput>
            </IonItem>
            <IonItem color={validationErrors.target_mrl == false ? 'docentlight' : 'danger'}>
              <IonLabel position="floating">Target MRL*</IonLabel>
              <IonSelect
                name="target_mrl"
                value={newAssessment.target_mrl}
                onIonChange={handleAssessmentChange}
                interface="popover"
              >
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
            <IonItem color="docentlight"   >
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
            <IonItem button={true} id="open-date-input" color="docentlight"   >
              <IonLabel>Date</IonLabel>
              <IonText slot="end">{selectedDate}</IonText>
              <IonPopover trigger="open-date-input" showBackdrop={false} isOpen={openDate}>
                <IonDatetime
                  presentation="date"
                  showDefaultButtons={true}
                  onIonChange={ev => {setSelectedDate(formatDate(ev.detail.value!)); setOpenDate(false);}}
                />
              </IonPopover>
            </IonItem>
            <IonItem color="docentlight"   >
              <IonLabel position="floating">Location</IonLabel>
              <IonInput
                name="location"
                value={newAssessment.location}
                onIonChange={handleAssessmentChange}
              ></IonInput>
            </IonItem>
            <IonItem color="docentlight"   >
              <IonLabel position="floating">Additional Information/Scope (250 characters max)</IonLabel>
              <IonTextarea
                name="scope"
                value={newAssessment.scope}
                onIonChange={handleAssessmentChange}
                maxlength={250}
              ></IonTextarea>
            </IonItem>
            <IonItem color="docentlight"   >
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
              <IonItem color={(missingTMValues == true && tempTM.email == '') ? 'danger' : 'docentlight'}>
                <IonLabel position="floating">Member Email</IonLabel>
                <IonInput
                  name="email"
                  value={tempTM.email}
                  onIonChange={updateTM}
                ></IonInput>
              </IonItem>
              <IonItem color={(missingTMValues == true && tempTM.role == '') ? 'danger' : 'docentlight'}>
                <IonLabel position="floating">Member Role</IonLabel>
                <IonInput
                  name="role"
                  value={tempTM.role}
                  onIonChange={updateTM}
                  placeholder="">
                </IonInput>
              </IonItem>
            </div>
            <IonButton color="dsb" expand='full' onClick={() => {checkMissingTMValues()}}>Add Team Member</IonButton>

            <div className="added-members">
              { tms.length > 0 && tms.map((tm:any, index:any) => (
                <IonChip color="docentlight" >
                  <IonLabel color="docentlight" >Email: <b>{tm.email}</b> Role: <b>{tm.role}</b></IonLabel>
                  <span onClick={() => removeIcon(index)}><IonIcon  icon={closeCircle} /></span>
                </IonChip>
              ))
              }

            </div>
            <ChooseThreads setThreads={setThreads} threads={threads}/>
            <IonToast
              isOpen={showToast}
              onDidDismiss={() => setShowToast(false)}
              message={`Creating Assessment`}
            />
          </div>
        </div>
      </div>
    </IonPage>
  )
}
export default New;
