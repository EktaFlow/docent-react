import {IonItem, IonAccordionGroup, IonInput, IonLabel, IonButton, IonIcon, IonAccordion} from '@ionic/react';
import {settingsOutline} from 'ionicons/icons';
import './Components.scss';
import React, {useState, useEffect} from 'react';

const Sidebar: React.FC = () => {
  const [user, setUser] = useState({name: '', company_name: ''})
  useEffect(() => {
    var usr = JSON.parse(localStorage.getItem("user") || "")
    if (usr){
      setUser({name: usr.name, company_name: usr.company_name})
    }
  }, [])
  return(
    <div className="home-rs">

    <div className="rs-bottom">
      <div className="action-group">
        <IonButton expand="full" color="dark" routerLink="/start-new">Start New Assessment</IonButton>
        <div className="port-group">

        </div>
      </div>
      <div className="footer">
        <div className="name-section">
          <h2>{user.name.toUpperCase()}</h2>
          <h5>{user.company_name.toUpperCase()}</h5>
        </div>

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
// <IonButton expand="full" color="dark">Import</IonButton>
// <IonButton expand="full" color="dark">Export</IonButton>
// <IonIcon icon={settingsOutline} size="large" color="dark"/>
