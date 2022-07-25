import { IonPage, IonContent, IonGrid, IonItem, IonLabel, IonInput, IonRow, IonCol, IonTextarea, IonSelect, IonSelectOption, IonText, IonPopover, IonDatetime, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';

import './Edit.scss';
import Header from '../../Framework/Header';
import React, { useState, useEffect } from 'react';

import { updateAssessment } from '../../../api/api';

import { format, parseISO } from 'date-fns';

const Edit: React.FC = () => {
  const [atts, setAtts] = useState({
    id: 0, 
    name: '',
    scope: '', //additional_info
    target_mrl: null, 
    target: '', //date
    level_switching: false, //boolean 
    location: '',
    // team_members: []
  })
  const history = useHistory();
  const [newTM, setNewTM] = useState({
    name: '',
    role: '',
    email: ''
  })

  const [selectedDate, setSelectedDate] = useState('');
  const formatDate = (value: string) => {
    return format(parseISO(value), 'MMM dd yyyy');
  };

//USE FOR GETTING ASSESSMENT ID TO UPDATE
  useEffect(() => {
    async function getAssessmentInfo() {
      var his: any = history
      var assessment_id = his["location"]["state"]["assessment_id"]
      // console.log(assessment_id)
      await setAtts({...atts, id: assessment_id})
    }
    getAssessmentInfo()
    
    
  }, []);

  
  async function update() {
    if(selectedDate) {
      setAtts ({
        ...atts, 
        target: selectedDate
      })
    }
    var assmUpdate = atts
    //filter out blank attributes so does not update to blank??
    // assmUpdate.filter({

    // })

    //need to add team members
    // console.log(typeof assmUpdate)
    // assmUpdate["team_members"].push(newTM); 

    var assm = await updateAssessment(atts.id, atts)
      .then((res) => {
        history.push({
          pathname: './home',
          state: {
            assessment_id: atts.id as number
          }
        })
      })
      .catch((error) => {
        console.log(error)
      })

    
  }

  const handleAnswerChange = (e: any) => {
    if(e.target.name == 'level_switching') {
      e.target.value == 'yes' ? setAtts({...atts, level_switching: true}) : setAtts({...atts, level_switching: false}) 
    }
    else {
      setAtts({
        ...atts, 
        [e.target.name]: e.target.value
      })
    }
  }
  

  return (
    <IonPage>
      <Header />
      <IonContent>
        <div className="edit-assessment-wrapper">

          <h1>Edit Assessment</h1>

          <IonGrid>
            <IonRow>
              <IonCol size="12" size-lg="4">
                <IonItem color="docentlight">
                  <IonLabel position="floating">Assessment Name</IonLabel>
                  <IonInput 
                    placeholder="Name"
                    name={"name"}
                    value={atts.name}
                    onIonChange={e => handleAnswerChange(e)}
                  >
                  </IonInput>
                </IonItem>
              </IonCol>
            </IonRow>

            <h6>Add Team Member</h6>
            <IonRow>
              <IonCol size="12" size-lg="4">
                <IonItem color="docentlight">
                  <IonLabel position="floating">Member Name</IonLabel>
                  <IonInput 
                    name="name"
                    value={newTM.name}
                    onIonChange={e => handleAnswerChange(e)}
                  >
                  </IonInput>
                </IonItem>
              </IonCol>
              <IonCol size="12" size-lg="4">
                <IonItem color="docentlight">
                  <IonLabel position="floating">Member Email</IonLabel>
                  <IonInput 
                    name="email"
                    value={newTM.email}
                    onIonChange={e => handleAnswerChange(e)}
                  >
                  </IonInput>
                </IonItem>
              </IonCol>
              <IonCol size="12" size-lg="4">
                <IonItem color="docentlight">
                  <IonLabel position="floating">Member Role</IonLabel>
                  <IonInput 
                    name="role"
                    value={newTM.role}
                    onIonChange={e => handleAnswerChange(e)}
                  >
                  </IonInput>
                </IonItem>
              </IonCol>

              <IonCol size="12" size-lg="5">
                <IonItem color="docentlight">
                  <IonLabel position="floating">Additional Info</IonLabel>
                  <IonInput 
                    placeholder="Enter Additional Information Here"
                    name="scope"
                    value={atts.scope}
                    onIonChange={e => handleAnswerChange(e)}
                  >
                  </IonInput>
                </IonItem>
              </IonCol>

              <IonCol size="12" size-lg="2">
                <IonItem color="docentlight">
                  <IonLabel position="floating">Target MRL*</IonLabel>
                  <IonSelect 
                    interface="popover"
                    name="target_mrl"
                    value={atts.target_mrl}
                    onIonChange={e => handleAnswerChange(e)}
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
              </IonCol>

              <IonCol size="12" size-lg="2">
                <IonItem color="docentlight">
                  <IonLabel position="floating">Level Switching</IonLabel>
                  <IonSelect 
                    interface="popover"
                    name="level_switching"
                    // value={atts.level_switching}
                    onIonChange={e => handleAnswerChange(e)}
                  >
                    <IonSelectOption value="yes">Yes</IonSelectOption>
                    <IonSelectOption value="no">No</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </IonCol>

              <IonCol size="12" size-lg="3">
                <IonItem button={true} id="open-date-input" color="docentlight">
                  <IonLabel>Date</IonLabel>
                  <IonText slot="end">{selectedDate}</IonText>
                  <IonPopover trigger="open-date-input" showBackdrop={false}>
                    <IonDatetime
                      presentation="date"
                      onIonChange={ev => {setSelectedDate(formatDate(ev.detail.value!));}}
                    />
                  </IonPopover>
                </IonItem>
              </IonCol>

              <IonCol size="12" size-lg="6">
                <IonItem className="date-picker" color="docentlight">
                  <IonLabel position="floating">Location</IonLabel>
                  <IonInput 
                    placeholder="Enter Location"
                    name="location"
                    value={atts.location}
                    onIonChange={e => handleAnswerChange(e)}
                  >
                  </IonInput>
                </IonItem>
              </IonCol>

              <IonCol size="12" size-lg="6">

              </IonCol>

              <IonCol size="12" size-lg="6">
                <h6>Choose Threads <img src="assets/if_icon-arrow-down.png" className="down-arrow"></img></h6>
              </IonCol>

              <IonCol className="ion-text-end" size="12" size-lg="6">
                <IonButton color="dsb" onClick={update}>Update Assessment</IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>

        </div>
      </IonContent>
    </IonPage>
  )
}
export default Edit;
