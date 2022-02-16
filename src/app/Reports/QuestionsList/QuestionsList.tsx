import { IonPage, IonContent, IonRow, IonCol, IonButton, IonItem, IonLabel, IonSelect, IonSelectOption, IonCard, IonCardHeader, IonCardTitle } from '@ionic/react';

import './Questions.scss';
import Header from '../../Framework/Header';
import InfoCard from '../InfoCard';
import ReportsTopbar from '../ReportsTopbar';

const QuestionsList: React.FC = () => {
  return (
    <IonPage>
      <Header />
      <ReportsTopbar text="Questions List" />
      <IonContent>
        <div className="questions-list-wrapper">
          <InfoCard />

          <IonRow className="questions-list-toolbar">
            <IonCol size="12" size-lg="2" className="filter-button1 ion-padding-bottom">
              <IonButton expand="block" color="dsb">Close All</IonButton>
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
              </IonItem>
            </IonCol>

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
              <IonButton expand="block" color="dsb" className="filter-buttons">Filter</IonButton>
            </IonCol>
            <IonCol size="6" size-lg="1" className="filter-button3">
              <IonButton expand="block" color="dsb" className="filter-buttons">Clear</IonButton>
            </IonCol>
          </IonRow>

          <div className="thread">
            <IonCard className="thread-card" color="dark">
              <IonCardHeader>
                <IonCardTitle><img src="assets/if_icon-arrow-down.png" className="down-arrow"></img>Cost & Funding</IonCardTitle>
              </IonCardHeader>
              <IonCard className="subthread-card" color="dark">
                <IonCardHeader>
                  <IonCardTitle><img src="assets/if_icon-arrow-down.png" className="down-arrow"></img>C.1 - Production Cost Knowledge (Cost modeling)</IonCardTitle>
                </IonCardHeader>
                <div className="mrl">
                  <h6><b>MR Level 1:</b></h6>
                  <div className="question">
                    <h5 className="navigate-links">
                      <span>
                        <IonButton size="small" className="status-button ion-no-padding">
                          Unanswered
                        </IonButton>
                      </span>
                      Have hypotheses been developed regarding technology impact on affordability?
                    </h5>
                  </div>
                </div>
              </IonCard>
              <IonCard className="subthread-card" color="dark">
                <IonCardHeader>
                  <IonCardTitle><img src="assets/if_icon-arrow-down.png" className="down-arrow"></img>C.2 - Cost Analysis</IonCardTitle>
                </IonCardHeader>
                <div className="mrl">
                  <h6><b>MR Level 1:</b></h6>
                  <div className="question">
                    <h5 className="navigate-links">
                      <span>
                        <IonButton size="small" className="status-button ion-no-padding">
                          Unanswered
                        </IonButton>
                      </span>
                      Have initial manufacturing and quality costs been identified?
                    </h5>
                  </div>
                </div>
              </IonCard>
            </IonCard>
          </div>

        </div>
      </IonContent>
    </IonPage>
  )
}
export default QuestionsList;
