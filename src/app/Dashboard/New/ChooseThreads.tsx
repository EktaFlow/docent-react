import {IonItem, IonCheckbox, IonLabel} from '@ionic/react';
import './ChooseThreads.scss'
const ChooseThreads: React.FC = () => {
  return(
    <div className="choose-threads-wrapper">
      <h3>Choose Threads</h3>
      <p>Unselecting a thread will remove it from your MRA. Typically, all threads are selected.</p>
      <div className="choose-threads-inner">
        <div className="left-side-picks">
          <IonItem color="dark">
            <IonCheckbox checked={true} slot="start" color="dsb" />
            <IonLabel>Technology Maturity</IonLabel>
          </IonItem>
          <IonItem color="dark">
            <IonCheckbox checked={true} slot="start" color="dsb" />
            <IonLabel>A. Technology & Industrial Base</IonLabel>
          </IonItem>
          <IonItem color="dark">
            <IonCheckbox checked={true} slot="start" color="dsb" />
            <IonLabel>B. Design</IonLabel>
          </IonItem>
          <IonItem color="dark">
            <IonCheckbox checked={true} slot="start" color="dsb" />
            <IonLabel>C. Cost & Funding</IonLabel>
          </IonItem>
          <IonItem color="dark">
            <IonCheckbox checked={true} slot="start" color="dsb" />
            <IonLabel>D. Materials</IonLabel>
          </IonItem>
        </div>
        <div className="right-side-picks">
          <IonItem color="dark">
            <IonCheckbox checked={true} slot="start" color="dsb" />
            <IonLabel>E. Process Capability & Control</IonLabel>
          </IonItem>
          <IonItem color="dark">
            <IonCheckbox checked={true} slot="start" color="dsb" />
            <IonLabel>F. Quality Management</IonLabel>
          </IonItem>
          <IonItem color="dark">
            <IonCheckbox checked={true} slot="start" color="dsb" />
            <IonLabel>G. Mfg Personnel</IonLabel>
          </IonItem>
          <IonItem color="dark">
            <IonCheckbox checked={true} slot="start" color="dsb" />
            <IonLabel>H. Facilities</IonLabel>
          </IonItem>
          <IonItem color="dark">
            <IonCheckbox checked={true} slot="start" color="dsb" />
            <IonLabel>I. Mfg Management</IonLabel>
          </IonItem>
        </div>
      </div>
    </div>
  )
}
export default ChooseThreads;
