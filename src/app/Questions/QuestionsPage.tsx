import { IonPage, IonItem, IonLabel, IonSelect, IonSelectOption, IonButton, IonHeader, IonToolbar, IonTitle, IonRow, IonCol, IonContent, IonGrid, IonTextarea } from '@ionic/react';

import Header from '../Framework/Header';
import './QuestionsPage.scss';

import Topbar from './Topbar';
import RiskAssessment from './RiskAssessment/RiskAssessment';
import RiskMatrix from './RiskAssessment/RiskMatrix';

const QuestionsPage: React.FC = () => {
  return (
    <IonPage className="question-page-wrapper">
      <Header />
      <Topbar />
      <IonContent>

        <div className="content-wrapper">
          <IonGrid>
            <IonRow>
              <IonCol size="12">
                <div className="title-wrapper">
                  <h2>Is the Technology Readiness at TRL 1 or greater?</h2>
                  <div>
                    <IonButton color="dsb">Previous</IonButton>
                    <IonButton color="dsb">Next</IonButton>
                    <IonButton color="dsb">Save</IonButton>
                  </div>
                </div>
              </IonCol>

              <IonCol size="12" size-lg="5">
                <IonItem color="dark">
                  <IonLabel position="floating">Select Answer</IonLabel>
                  <IonSelect interface="popover">
                    <IonSelectOption value="1">Yes</IonSelectOption>
                    <IonSelectOption value="2">No</IonSelectOption>
                    <IonSelectOption value="3">N/A</IonSelectOption>
                  </IonSelect>
                </IonItem>

                <IonButton color="dsb">Explanation Text</IonButton>

                <IonItem color="dark">
                  <IonLabel position="floating">Assumptions</IonLabel>
                  <IonTextarea placeholder=""></IonTextarea>
                </IonItem>

                <IonItem color="dark">
                  <IonLabel position="floating">Notes</IonLabel>
                  <IonTextarea placeholder=""></IonTextarea>
                </IonItem>

                <IonButton color="dsb">Attach File</IonButton>

                <IonHeader>
                  <IonToolbar className="toolbar">
                    <IonTitle>Attachments</IonTitle>
                  </IonToolbar>
                </IonHeader>

                <div className="attachments-content">
                  <IonRow>
                    <IonCol>
                      <IonLabel class="attachment-label file-name-label">File</IonLabel>
                    </IonCol>
                    <IonCol>
                      <IonLabel class="attachment-label date-label">Date Added</IonLabel>
                    </IonCol>
                    <IonCol id="view">
                      <IonLabel class="attachment-label view-label">View</IonLabel>
                    </IonCol>
                    <IonCol id="delete">
                      <IonLabel class="attachment-label delete-label">Delete</IonLabel>
                    </IonCol>
                  </IonRow>
                </div>
              </IonCol>
              <IonCol size="12" size-lg="3">
                <RiskAssessment />
              </IonCol>
              <IonCol size="12" size-lg="4">
                <RiskMatrix />
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>

      </IonContent>
    </IonPage>

  )
}
export default QuestionsPage;
