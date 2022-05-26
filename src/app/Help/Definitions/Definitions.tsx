import { IonPage, IonContent, IonGrid, IonCard, IonCardHeader, IonCardContent, IonRow } from '@ionic/react'

import './Definitions.scss';
import Header from '../../Framework/Header';
import HelpTopbar from '../HelpTopbar';

import definitions from "./definitions.json";

const Definitions: React.FC = () => {
  return (
    <IonPage>
      <Header />
      <HelpTopbar text="Definitions" />

      <IonContent>
        <div className="definitions-wrapper">
          <IonGrid>
            <IonRow>
              {definitions.map((def, index) => (
                <IonCard>
                  <IonCardHeader><b>{def.term}</b></IonCardHeader>
                  <IonCardContent>{def.definition}</IonCardContent>
                </IonCard>
              ))}
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Definitions;
