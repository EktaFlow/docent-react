import { IonPage, IonContent, IonGrid, IonItem, IonLabel, IonInput, IonRow, IonCol, IonToast, IonSelect, IonSelectOption, IonText, IonPopover, IonDatetime, IonButton, IonChip, IonIcon, IonTextarea } from '@ionic/react';
import { useHistory } from 'react-router-dom';

import './Edit.scss';
import Header from '../../Framework/Header';
import React, { useState, useEffect } from 'react';

import ChooseThreads from '../New/ChooseThreads';

import { updateAssessment, createTeamMember, grabSingleAssessment, grabTeamMemberInfo } from '../../../api/api';

import { format, parseISO } from 'date-fns';
import {  closeCircle, removeCircleOutline, trashOutline } from 'ionicons/icons';

const Edit: React.FC = () => {
  type ThreadsType = {t: boolean, a: boolean, b: boolean, c: boolean, d: boolean, e: boolean, f: boolean, g: boolean, h: boolean, i: boolean}

  const[ assessData, setAssessData ] = useState(); 
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
  // const [newTM, setNewTM] = useState({
  //   name: '',
  //   role: '',
  //   email: ''
  // })
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({message: '', status: ''})

  const [tempTM, setTempTM] = useState({
    email: '',
    role: ''
  })
  const [tms, setTms] = useState<any>([]);
  const [missingTMValues, setMissingTMValues] = useState(false); 
  const [currTms, setCurrTms] = useState<any>([]);
  const [validationErrors, setValidationErrors] = useState({
    name: false,
    target_mrl: false
  });

  const [threads, setThreads] = useState<ThreadsType>({t: true, a: true, b: true, c: true, d: true, e: true, f: true, g: true, h: true, i: true});

  const [selectedDate, setSelectedDate] = useState('');
  const formatDate = (value: string) => {
    return format(parseISO(value), 'MMM dd yyyy');
  };

  async function getSingleAssessment(id: Number) {
    var ast = await grabSingleAssessment(id);

    const data = {
      id: id
    }
    var tmss = await grabTeamMemberInfo(id)
    console.log(tmss.team_members)
    // var ats = asts.assessments.assessments
    console.log(ast)
    setAssessData(ast)
    // console.log(ast.team_members)
    setCurrTms(tmss.team_members)
  }
//USE FOR GETTING ASSESSMENT ID TO UPDATE
  useEffect(() => {
    // let id = 0
    async function getAssessmentInfo() {
      var his: any = history
      var assessment_id = his["location"]["state"]["assessment_id"]
      // id = assessment_id
      console.log(assessment_id)
      getSingleAssessment(assessment_id)
      await setAtts({...atts, id: assessment_id})
    }
    
    getAssessmentInfo()
    // getSingleAssessment()
    console.log(currTms)
    
  }, []);

  // useEffect(() => {
    
  //   getSingleAssessment()
  // }, [atts.id])

  
  async function update() {
    if(selectedDate) {
      setAtts ({
        ...atts, 
        target: selectedDate
      })
    }

    let assmUpdate = {...atts}
    //filter out blank attributes so does not update to blank??
    // assmUpdate.filter({

    // })

    // const {[name]: removedProperty, ...employeeRest } = assmUpdate
    // const { name, target, ...assmRest } = assmUpdate;
    // console.log(assmRest)

    console.log(atts)
    console.log(Object.keys(assmUpdate))
    // for(const key in assmUpdate) {
    //   if(assmUpdate[key])
    // }
    // Object.keys(atts).forEach(key => {
    //   if(assmUpdate[key] === null || assmUpdate[key] === '') {
    //     delete assmUpdate[key];
    //   }
    // });

    
    //need to add team members
    // console.log(typeof assmUpdate)
    // assmUpdate["team_members"].push(newTM); 
    if(atts.name == '' || atts.target_mrl == null) {
      setValidationErrors({
        name: atts.name == '' ? true : false,
        target_mrl: atts.target_mrl == null ? true : false
      })
    }
    else {
      var assm = await updateAssessment(atts)
      .then((res) => {
        console.log(res)
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
    

    
  }

  function updateTM(e: any){
    setTempTM({
      ...tempTM,
      [e.target.name]: e.target.value
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

  async function removeTM(tm:any) {

  }

  async function processNewTM(tm:any){
    tm['assessment_id'] = atts.id
    console.log(tm)
    var newTm = await createTeamMember(tm);
    console.log(newTm)
    if (newTm.team_member) {
      //is this needed?:
      // var index = assessments.findIndex((ast) => ast.id == tm['assessment_id']);
      // var astclone = Object.create(assessments);
      // astclone[index] = newTm.assessment;
      // setAssessments(astclone);
      
      if (newTm.newUser) {
        setShowToast(true);
        setToastMessage({message: `${newTm.team_member} has been invited to the assessment: ${newTm.assessment.name}`, status: 'success'})
      } else {
        setShowToast(true);
        setToastMessage({message: `${newTm.team_member} has been invited to Docent as a new user and been invited to the assessment: ${newTm.assessment.name}`, status: 'success'})
      }
      // window.location.reload(); 
    }

  }


  const handleAnswerChange = (e: any) => {
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
    <IonPage className="new-page-wrapper">
      <Header />
      <div className="content-wrapper">
        <div className="header-info">
          <h2>Edit Assessment</h2>
        </div>
        <div className="panel-wrappers">
          <div className="assessment-info">
            <h3>Assessment Information</h3>
            <IonItem color={validationErrors.name == false ? 'docentlight' : 'danger'}>
              <IonLabel position="floating">Assessment Name* (50 characters max)</IonLabel>
              <IonInput
                name="name"
                value={atts.name}
                onIonChange={handleAnswerChange}
                maxlength={50}
                required
              ></IonInput>
            </IonItem>
            <IonItem color={validationErrors.target_mrl == false ? 'docentlight' : 'danger'}>
              <IonLabel position="floating">Target MRL*</IonLabel>
              <IonSelect
                name="target_mrl"
                value={atts.target_mrl}
                onIonChange={handleAnswerChange}
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
                value={atts.level_switching}
                onIonChange={handleAnswerChange}
                interface="popover"
              >
                <IonSelectOption value="yes">Yes</IonSelectOption>
                <IonSelectOption value="no">No</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem button={true} id="open-date-input" color="docentlight">
                   <IonLabel>Date</IonLabel>
                   <IonText slot="end">{selectedDate}</IonText>
                   <IonPopover trigger="open-date-input" showBackdrop={false}>
                     <IonDatetime
                      presentation="date"
                      showDefaultButtons={true}
                      onIonChange={ev => {setSelectedDate(formatDate(ev.detail.value!));}}
                    />
                  </IonPopover>
                </IonItem>
            <IonItem color="docentlight"   >
              <IonLabel position="floating">Location</IonLabel>
              <IonInput
                name="location"
                value={atts.location}
                onIonChange={handleAnswerChange}
              ></IonInput>
            </IonItem>
            <IonItem color="docentlight"   >
              <IonLabel position="floating">Additional Information/Scope (250 characters max)</IonLabel>
              <IonTextarea
                name="scope"
                value={atts.scope}
                onIonChange={handleAnswerChange}
                maxlength={250}
              ></IonTextarea>
            </IonItem>

            <div className="start-button">
              {/* <p><i>Make sure the correct threads have been selected and team members have been added</i></p> */}
              <IonButton color="dsb" expand='full' onClick={() => update()}>Update Assessment</IonButton>
            </div>
          </div>
          
          <div className="assessment-choices">
            <h3>Add New Team Members</h3>
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
                <IonChip key={index} color="docentdark">
                  <IonLabel color="docentdark" >Email: <b>{tm.email}</b> Role: <b>{tm.role}</b></IonLabel>
                  <span onClick={() => removeIcon(index)}><IonIcon  icon={closeCircle} /></span>
                </IonChip>
              ))
              }
            </div>

            <div className="current-members">
              <br />
              <h3>Remove Current Team Members</h3>
              <IonRow>
                {currTms.length > 0 && currTms.map((tm:any, index: any) => (
                  <IonChip color="docentdark" >
                    <IonLabel color="docentdark">Email: <b>{tm.email}</b> Role: <b>{tm.role}</b></IonLabel>
                    <span ><IonIcon color="danger" icon={closeCircle} onClick={() => removeTM(tm)} /></span>
                  </IonChip>
                ))}
                
                {/* <IonCol size="12" size-lg="6">
                  <span className="file-name-content">team member </span>
                  <IonIcon icon={removeCircleOutline} color="docentdark"></IonIcon>
                </IonCol>         */}
              </IonRow>
            </div>


            {/* <ChooseThreads setThreads={setThreads} threads={threads}/> */}
            <IonToast
              isOpen={showToast}
              onDidDismiss={() => setShowToast(false)}
              message={`Updating Assessment`}
            />
          </div>
        </div>
      </div>
    </IonPage>

    // <IonPage>
    //   <Header />
    //   <IonContent>
    //     <div className="edit-assessment-wrapper">

    //       <h1>Edit Assessment</h1>

    //       <IonGrid>
    //         <IonRow>
    //           <IonCol size="12" size-lg="4">
    //             <IonItem color="docentlight">
    //               <IonLabel position="floating">Assessment Name</IonLabel>
    //               <IonInput 
    //                 placeholder="Name"
    //                 name={"name"}
    //                 value={atts.name}
    //                 onIonChange={e => handleAnswerChange(e)}
    //               >
    //               </IonInput>
    //             </IonItem>
    //           </IonCol>
    //         </IonRow>

    //         <IonRow>
    //           <IonCol size="12" size-lg="5">
    //             <IonItem color="docentlight">
    //               <IonLabel position="floating">Additional Info</IonLabel>
    //               <IonInput 
    //                 placeholder="Enter Additional Information Here"
    //                 name="scope"
    //                 value={atts.scope}
    //                 onIonChange={e => handleAnswerChange(e)}
    //               >
    //               </IonInput>
    //             </IonItem>
    //           </IonCol>

    //           <IonCol size="12" size-lg="2">
    //             <IonItem color="docentlight">
    //               <IonLabel position="floating">Target MRL*</IonLabel>
    //               <IonSelect 
    //                 interface="popover"
    //                 name="target_mrl"
    //                 value={atts.target_mrl}
    //                 onIonChange={e => handleAnswerChange(e)}
    //               >
    //                 <IonSelectOption value="1">1</IonSelectOption>
    //                 <IonSelectOption value="2">2</IonSelectOption>
    //                 <IonSelectOption value="3">3</IonSelectOption>
    //                 <IonSelectOption value="4">4</IonSelectOption>
    //                 <IonSelectOption value="5">5</IonSelectOption>
    //                 <IonSelectOption value="6">6</IonSelectOption>
    //                 <IonSelectOption value="7">7</IonSelectOption>
    //                 <IonSelectOption value="8">8</IonSelectOption>
    //                 <IonSelectOption value="9">9</IonSelectOption>
    //                 <IonSelectOption value="10">10</IonSelectOption>
    //               </IonSelect>
    //             </IonItem>
    //           </IonCol>

    //           <IonCol size="12" size-lg="2">
    //             <IonItem color="docentlight">
    //               <IonLabel position="floating">Level Switching</IonLabel>
    //               <IonSelect 
    //                 interface="popover"
    //                 name="level_switching"
    //                 // value={atts.level_switching}
    //                 onIonChange={e => handleAnswerChange(e)}
    //               >
    //                 <IonSelectOption value="yes">Yes</IonSelectOption>
    //                 <IonSelectOption value="no">No</IonSelectOption>
    //               </IonSelect>
    //             </IonItem>
    //           </IonCol>

    //           <IonCol size="12" size-lg="3">
    //             <IonItem button={true} id="open-date-input" color="docentlight">
    //               <IonLabel>Date</IonLabel>
    //               <IonText slot="end">{selectedDate}</IonText>
    //               <IonPopover trigger="open-date-input" showBackdrop={false}>
    //                 <IonDatetime
    //                   presentation="date"
    //                   showDefaultButtons={true}
    //                   onIonChange={ev => {setSelectedDate(formatDate(ev.detail.value!));}}
    //                 />
    //               </IonPopover>
    //             </IonItem>
    //           </IonCol>

    //           <IonCol size="12" size-lg="6">
    //             <IonItem className="date-picker" color="docentlight">
    //               <IonLabel position="floating">Location</IonLabel>
    //               <IonInput 
    //                 placeholder="Enter Location"
    //                 name="location"
    //                 value={atts.location}
    //                 onIonChange={e => handleAnswerChange(e)}
    //               >
    //               </IonInput>
    //             </IonItem>
    //           </IonCol>

    //           <IonCol size="12" size-lg="6">

    //           </IonCol>

    //           {/* <IonCol size="12" size-lg="6">
    //             <h6>Choose Threads <img src="assets/if_icon-arrow-down.png" className="down-arrow"></img></h6>
    //           </IonCol> */}

    //           {/* <IonCol className="ion-text-end" size="12" size-lg="6">
    //             <IonButton color="dsb" onClick={update}>Update Assessment</IonButton>
    //           </IonCol> */}
    //         </IonRow>

    //         <h4>Add New Team Members</h4>
    //         <IonRow>  
    //           {/* <IonCol size="12" size-lg="4">
    //               <IonItem color="docentlight">
    //                 <IonLabel position="floating">Member Name</IonLabel>
    //                 <IonInput 
    //                   name="name"
    //                   value={newTM.name}
    //                   onIonChange={e => handleAnswerChange(e)}
    //                 >
    //                 </IonInput>
    //               </IonItem>
    //           </IonCol>
    //           <IonCol size="12" size-lg="4">
    //             <IonItem color="docentlight">
    //               <IonLabel position="floating">Member Email</IonLabel>
    //               <IonInput 
    //                 name="email"
    //                 value={newTM.email}
    //                 onIonChange={e => handleAnswerChange(e)}
    //               >
    //               </IonInput>
    //             </IonItem>
    //           </IonCol>
    //           <IonCol size="12" size-lg="4">
    //             <IonItem color="docentlight">
    //               <IonLabel position="floating">Member Role</IonLabel>
    //               <IonInput 
    //                 name="role"
    //                 value={newTM.role}
    //                 onIonChange={e => handleAnswerChange(e)}
    //               >
    //               </IonInput>
    //             </IonItem>
    //           </IonCol> */}

    //           {/* <div className="tm-fields-wrapper"> */}
    //             <IonCol size="12" size-lg="5">
    //               <IonItem color={(missingTMValues == true && tempTM.email == '') ? 'danger' : 'docentlight'}>
    //                 <IonLabel position="floating">Member Email</IonLabel>
    //                 <IonInput
    //                   name="email"
    //                   value={tempTM.email}
    //                   onIonChange={updateTM}
    //                 ></IonInput>
    //               </IonItem>
    //             </IonCol>

    //             <IonCol size="12" size-lg="5">
    //               <IonItem color={(missingTMValues == true && tempTM.role == '') ? 'danger' : 'docentlight'}>
    //                 <IonLabel position="floating">Member Role</IonLabel>
    //                 <IonInput
    //                   name="role"
    //                   value={tempTM.role}
    //                   onIonChange={updateTM}
    //                   placeholder="">
    //                 </IonInput>
    //               </IonItem>
    //             </IonCol>

    //             <IonCol size="12" size-lg="2">
    //               <IonButton color="dsb" expand='full' onClick={() => {checkMissingTMValues()}}>Add Team Member</IonButton>
    //             </IonCol>
                
    //           {/* </div> */}

               

    //           <IonCol className="added-members" size="12" size-lg="6">
    //             {/* <h5>New Team Members</h5> */}
    //             { tms.length > 0 ? tms.map((tm:any, index:any) => (
    //               <IonChip color="docentlight" >
    //                 <IonLabel color="docentlight" >Email: <b>{tm.email}</b> Role: <b>{tm.role}</b></IonLabel>
    //                 <span onClick={() => removeIcon(index)}><IonIcon  icon={closeCircle} /></span>
    //               </IonChip>
    //             ))
    //             :
    //               <IonLabel>No New Team Members Added</IonLabel>
    //             }
    //           </IonCol>


    //         </IonRow>

    //         <h4>Edit Current Team Members</h4>
    //         <IonRow>
              
    //         </IonRow>

            

    //         <IonRow>
    //           <IonCol className="ion-text-end" size="12" size-lg="6">
    //             <IonButton color="dsb" onClick={update}>Update Assessment</IonButton>
    //           </IonCol>
    //         </IonRow>
    //       </IonGrid>

    //     </div>
    //     <IonToast
    //         isOpen={showToast}
    //         onDidDismiss={() => setShowToast(false)}
    //         message={toastMessage.message}
    //         color={toastMessage.status}
    //         duration={2000}
    //       />
    //   </IonContent>
    // </IonPage>
  )
}
export default Edit;
