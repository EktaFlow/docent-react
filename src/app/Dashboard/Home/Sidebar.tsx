import {IonItem, IonAccordionGroup, IonInput, IonLabel, IonButton, IonIcon, IonAccordion} from '@ionic/react';
import {settingsOutline} from 'ionicons/icons';
import './Components.scss';

const Sidebar: React.FC = () => {
  return(
    <div className="home-rs">

    <div className="rs-bottom">
      <div className="action-group">
        <IonButton expand="full" color="dark" routerLink="/start-new">Start New Assessment</IonButton>
        <div className="port-group">
          <IonButton expand="full" color="dark">Import</IonButton>
          <IonButton expand="full" color="dark">Export</IonButton>
        </div>
      </div>
      <div className="footer">
        <div className="name-section">
          <h2>Dominique Goncalves</h2>
          <h5>Ekta Flow</h5>
        </div>
        <IonIcon icon={settingsOutline} size="large" color="dark"/>
      </div>
    </div>
    </div>

  )
}
export default Sidebar;
// <div className="rs-top">
//   <IonItem className="search-input">
//     <IonInput placeholder="Search Through Assessments"></IonInput>
//   </IonItem>
//   <IonAccordionGroup className="assessments-accordion">
//     <IonAccordion value="assessment1" color="secondary">
//       <IonItem slot="header">
//         <IonLabel>Docent Metrics</IonLabel>
//       </IonItem>
//       <IonItem slot="content">
//         <div>docent metrics</div>
//       </IonItem>
//     </IonAccordion>
//   </IonAccordionGroup>
// </div>
