import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';

import './InfoCard.scss';

const InfoCard: React.FC = () => {
  return (
    <IonCard className="info-card" color="dark">
      <IonCardHeader>
        <IonCardTitle>Assessment Information</IonCardTitle>
      </IonCardHeader>
      <IonCardContent className="info-card-content">
        <p><b>Assessment Name:</b> Name</p>
        <p><b>Target MRL:</b> 1</p>
        <p><b>Target Date:</b> </p>
        <p><b>Location:</b> </p>
        <p><b>Team Members:</b></p>
      </IonCardContent>
    </IonCard>
  )
}
export default InfoCard;
