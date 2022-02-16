import { IonPage, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonItem, IonLabel, IonSelect, IonSelectOption, IonContent } from '@ionic/react';

import './Comprehensive.scss';
import Header from '../../Framework/Header';
import InfoCard from '../InfoCard';
import ReportsTopbar from '../ReportsTopbar';

const Comprehensive: React.FC = () => {
  return (
    <IonPage>
      <Header />
      <ReportsTopbar text="Comprehensive Report" />
      <IonContent>
        <div className="comprehensive-wrapper">
          <InfoCard />
          <IonRow className="comprehensive-filter-toolbar">
            <IonCol size="12" size-lg="2" className="filter-button1">
              <IonButton expand="block" color="dsb">Export As XLS</IonButton>
            </IonCol>
            <IonCol size="12" size-lg="3" className="filter-item">
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
              </IonItem></IonCol>
            <IonCol size="12" size-lg="3" className="filter-item">
              <IonItem color="dark">
                <IonLabel position="floating">Filter Answer Type</IonLabel>
                <IonSelect interface="popover">
                  <IonSelectOption value="yes">Yes</IonSelectOption>
                  <IonSelectOption value="no">No</IonSelectOption>
                  <IonSelectOption value="n/a">N/A</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonCol>
            <IonCol size="6" size-lg="1" className="filter-button2">
              <IonButton expand="full" color="dsb" className="filter-buttons">Filter</IonButton>
            </IonCol>
            <IonCol size="6" size-lg="1" className="filter-button3">
              <IonButton expand="full" color="dsb" className="filter-buttons">Clear</IonButton>
            </IonCol>
          </IonRow>

          <div className="survey-info">
            <IonCard className="review-card">
              <IonCardHeader>
                <IonCardTitle className="review-header">Is the Technology Readiness at TRL 1 or greater?</IonCardTitle>
                <IonCardSubtitle className="box yes"><b>Yes</b></IonCardSubtitle>
              </IonCardHeader>

              <IonCardContent className="review-card-content">
                <h4>Thread: Technology Maturity | SubThread: Technology Maturity</h4>
                <h4>MRLevel: 1</h4>
                <h2><b>Objective Evidence:</b> No objective evidence given</h2>
                <h2><b>Assumptions:</b> No assumptions given</h2>
                <h2><b>Notes:</b> No notes given</h2>
                <hr />

                <h2><i>Risk Assessment</i></h2>
                <h2><b>Risk Score:</b> No risk given</h2>
                <h2><b>Greatest Impact:</b> No greatest impact given</h2>
                <h2><b>Risk Response:</b> No risk response given</h2>
                <h2><b>MMP Summary:</b> No MMP summary given</h2>

                <hr />
                <h2><b>Attachments:</b> No file attached to this question</h2>
                <IonButton size="small" color="dsb">Go To Question</IonButton>
              </IonCardContent>
            </IonCard>
          </div>

          <div className="survey-info">
            <IonCard className="review-card">
              <IonCardHeader>
                <IonCardTitle className="review-header">Is the Technology Readiness at TRL 1 or greater?</IonCardTitle>
                <IonCardSubtitle className="box no"><b>No</b></IonCardSubtitle>
                {/* <IonCardSubtitle className="box na"><b>N/A</b></IonCardSubtitle> */}
              </IonCardHeader>

              <IonCardContent className="review-card-content">
                <h4>Thread: Technology Maturity | SubThread: Technology Maturity</h4>
                <h4>MRLevel: 1</h4>
                <h2><b>Owner:</b> No owner given</h2>
                <h2><b>Due Date:</b> No due date given</h2>
                <h2><b>Action Plan:</b> No action plan given</h2>
                <h2><b>Reason:</b> No reason given</h2>
                <h2><b>Assumptions:</b> No assumptions given</h2>
                <h2><b>Notes:</b> No notes given</h2>
                <hr />

                <h2><i>Risk Assessment</i></h2>
                <h2><b>Risk Score:</b> No risk given</h2>
                <h2><b>Greatest Impact:</b> No greatest impact given</h2>
                <h2><b>Risk Response:</b> No risk response given</h2>
                <h2><b>MMP Summary:</b> No MMP summary given</h2>

                <hr />
                <h2><b>Attachments:</b> No file attached to this question</h2>
                <IonButton size="small" color="dsb">Go To Question</IonButton>
              </IonCardContent>
            </IonCard>
          </div>

          <div className="survey-info">
            <IonCard className="review-card">
              <IonCardHeader>
                <IonCardTitle className="review-header">Have global trends in manufacturing science and technology been identified (i.e., concepts, capabilities)?</IonCardTitle>
                <IonCardSubtitle className="box na"><b>N/A</b></IonCardSubtitle>
              </IonCardHeader>

              <IonCardContent className="review-card-content">
                <h4>Thread: Technology Maturity | SubThread: Technology Maturity</h4>
                <h4>MRLevel: 1</h4>

                <h2><i>Risk Assessment</i></h2>
                <h2><b>Risk Score:</b> No risk given</h2>
                <h2><b>Greatest Impact:</b> No greatest impact given</h2>
                <h2><b>Risk Response:</b> No risk response given</h2>
                <h2><b>MMP Summary:</b> No MMP summary given</h2>

                <hr />
                <h2><b>Attachments:</b> No file attached to this question</h2>
                <IonButton size="small" color="dsb">Go To Question</IonButton>
              </IonCardContent>
            </IonCard>
          </div>
        </div>

      </IonContent>
    </IonPage>
  )
}
export default Comprehensive;

