import React, { useEffect, useState } from 'react'

import './Components.scss';
import { IonButton, IonIcon } from '@ionic/react';

import { id } from 'date-fns/locale';
import { useHistory } from 'react-router-dom';
import InviteTMPopover from './InviteTMPopover';
import {FaUserPlus} from "react-icons/fa";

const AssessmentItem: React.FC<({ assessmentInfo: any, deleteAssessmentFromBack: any, openInviteTM: any, teamMembers: any, processNewTM: any })> = ({ assessmentInfo, deleteAssessmentFromBack, openInviteTM, teamMembers, processNewTM }) => {
  const [showTM, setShowTM] = useState(false); 
  const history = useHistory();

  async function navigateToPage(value: string) {
    console.log(value)
    history.push({
      pathname: `/${value}`,
      state: {
        assessment_id: assessmentInfo.id as number
      }
    })
    window.location.reload()
  }

  useEffect(() => {
    if (assessmentInfo) {
      console.log(assessmentInfo);
    }
  }, [assessmentInfo]);

  // useEffect(() => {
    
  // })

  const removeAssessment = (id: number) => {
    console.log(id)
    deleteAssessmentFromBack(id);
  }

  function clickTM(id:any){
    showTM ? setShowTM(false) : setShowTM(true); 
    openInviteTM(id); 
  }

  return (
    <div className="assessment-inner">
      <div className="assessment-info">
        <p><b>Name: </b>{assessmentInfo.name}</p>
        <p><b>{assessmentInfo.count} out of {assessmentInfo.length} </b>questions answered</p>
        <p><b>MRL: </b>{assessmentInfo.target_mrl}</p>
        <p><b>Target Date: </b>{assessmentInfo.target}</p>
        <p><b>Additional Information: </b>{assessmentInfo.scope}</p>
        <p><b>Location: </b>{assessmentInfo.location}</p>
        <p><b>Level Switching On?: </b>{assessmentInfo.level_switching ? 'Yes' : 'No'}</p>
        <span>
          
          <p><b>Team Members: </b> {
            teamMembers.length == 0 ?
            <span> No Team Members</span> 
            :
            teamMembers.map((tm:any, index:number) => (
              <p>{tm.email} (dev) {index !== teamMembers.length - 1 ? ', ' : ''}</p>
            ))
          }
             <IonButton 
              size="small" 
              color="docentsuccess" 
              onClick={() => {clickTM(assessmentInfo.id)}
              }>
               <FaUserPlus/>
             </IonButton>
          </p>
          {showTM &&
            <p>
              <InviteTMPopover processNewTM={processNewTM}/>
            </p>
          }
        </span>
        
        
        
        {/* <IonButton size="small" color="docentdark"  onClick={() => clickTM()} >Invite Team Members</IonButton> */}
        {/* {showTM &&
          <div>
            <InviteTMPopover  />
          </div>
        } */}

      </div>
      <div className="assessment-actions">
        <IonButton size="small" expand="full" color="docentdark"  onClick={() => navigateToPage('questions')}>Continue Assessment</IonButton>
        <IonButton size="small" expand="full" color="docentdark"  onClick={() => navigateToPage('mrl-summary')}>MRL Summary</IonButton>
        <IonButton size="small" expand="full" color="docentdark"  onClick={() => navigateToPage('action-items')}>Action Items</IonButton>
        {/* <IonButton size="small" expand="full" color="docentdark"  onClick={() => openInviteTM(assessmentInfo.id)} >Invite Team Members</IonButton> */}
        <IonButton size="small" expand="full" color="docentdark" onClick={() => navigateToPage('edit-assessment')}>Edit Assessment Info</IonButton>
        <IonButton size="small" expand="full" color="docentdark"  onClick={() => removeAssessment(assessmentInfo.id)}>Delete Assessment</IonButton>
        <IonButton size="small" expand="full" color="docentdark" >Export Assessment</IonButton>
      </div>
    </div>
  )
}
export default AssessmentItem;
