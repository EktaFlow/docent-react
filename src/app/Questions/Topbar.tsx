import { IonRow, IonGrid, IonCol } from '@ionic/react';

import './Topbar.scss';

const Topbar: React.FC = () => {
    return (
        <div className="topbar-wrapper">
            <IonGrid>
              <IonRow>
                <IonCol size="12">
                    <h1>Technology Maturity</h1>
                </IonCol>
                <IonCol size="12" size-md="6">
                    <p>Current MR Level: 1 | Thread: Technology Maturity | SubThread: Technology Maturity</p>
                    <p>Question 1 out of 24</p>
                    <p>Show All Questions | Show Question History</p>
                </IonCol>
                <IonCol size="12" size-md="6" push-md="2">
                    <p>Target MRL: 1 | Target Date: No date set</p>
                    <p>Show Additional Information</p>
                </IonCol>       
              </IonRow>
            </IonGrid>
        </div>
    )

}

export default Topbar;