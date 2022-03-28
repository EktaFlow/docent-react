import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonItem } from '@ionic/react'

import './Acronyms.scss';
import Header from '../../Framework/Header';
import HelpTopbar from '../HelpTopbar';

const Acronyms: React.FC = () => {
  return (
    <IonPage>
      <Header />
      <HelpTopbar text="Acronyms" />

      <IonContent>
        <div className="acronyms-wrapper">
          <IonGrid>
            <IonRow>
              <IonCol size="6">
                <IonItem className="acronym odd" color="none">A/W</IonItem>
              </IonCol>

              <IonCol size="6">
                <IonItem className="spelled-name odd" color="none">Air Worthiness</IonItem>
              </IonCol>

              <IonCol size="6">
                <IonItem className="acronym even" color="dark">AAC</IonItem>
              </IonCol>

              <IonCol size="6">
                <IonItem className="spelled-name even" color="dark">Air Armament Center</IonItem>
              </IonCol>

              <IonCol size="6">
                <IonItem className="spelled-name odd" color="none">ACO</IonItem>
              </IonCol>

              <IonCol size="6">
                <IonItem className="spelled-name odd" color="none">Administrative Contracting Officer</IonItem>
              </IonCol>

              <IonCol size="6">
                <IonItem className="acronym even" color="dark">ACTD</IonItem>
              </IonCol>

              <IonCol size="6">
                <IonItem className="spelled-name even" color="dark">Advanced Concept Technology Demonstration</IonItem>
              </IonCol>

            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  )
}
export default Acronyms;
