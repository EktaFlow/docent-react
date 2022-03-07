import './Components.scss';
import {IonButton} from '@ionic/react';

const AssessmentItem: React.FC = () => {
  return(
    <div className="assessment-inner">
      <div className="assessment-info">
        <p><b>Name: </b>xxx</p>
        <p><b>3 out of 50 </b>questions answered</p>
        <p><b>MRL: </b>5</p>
        <p><b>Target Date: </b>Feb 28, 2022</p>
        <p><b>Additional Information: </b>This assessment covers only manufacturered parts</p>
        <p><b>Location: </b>Chicago, IL</p>
        <p><b>Level Switching On?: </b>No</p>
        <p><b>Team Members: </b>james@ekta.co</p>
      </div>
      <div className="assessment-actions">
        <IonButton size="small" expand="full" color="light" routerLink="/questions">Continue Assessment</IonButton>
        <IonButton size="small" expand="full" color="light">MRL Summary</IonButton>
        <IonButton size="small" expand="full" color="light">Action Items</IonButton>
        <IonButton size="small" expand="full" color="light">Invite Team Members</IonButton>
        <IonButton size="small" expand="full" color="light">Edit Assessment Info</IonButton>
        <IonButton size="small" expand="full" color="light">Delete Assessment</IonButton>
        <IonButton size="small" expand="full" color="light">Export Assessment</IonButton>
      </div>
    </div>
  )
}
export default AssessmentItem;
