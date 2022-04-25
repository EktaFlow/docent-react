import { IonContent, IonPage, IonButton, IonModal } from '@ionic/react';

import Header from '../../Framework/Header';
import Topbar from '../../Framework/Topbar';
import './Settings.scss';

const Settings: React.FC = () => {
  return (
    <IonPage>
      <Header />
      <Topbar text="Settings" />
      <IonContent>
        <div className="settings-wrapper">
          <div className="desktop">
            <IonButton size="small" color="dsb" routerLink="home">Go Back to Dashboard</IonButton>
          </div>
          <div className="user-settings">
            <h3>User Information</h3>
            <h6>User name: John</h6>
            <h6>User email: jyoo300@gmail.com</h6>
          </div>
          <div className="upload-download">
            <h3>Add Custom Deskbooks</h3>
            <IonButton size="small" className="desktop" color="dsb">Download 2020 Deskbook</IonButton>
            <IonButton size="small" className="desktop" color="dsb" id="upload-deskbook">Upload Deskbook Version</IonButton>


            <IonButton size="small" class="mobile" disabled color="dsb">Download 2020 Deskbook</IonButton>
            <IonButton size="small" class="mobile" disabled color="dsb" id="upload-button">Upload Deskbook Version</IonButton>

            <p className="mobile">Go onto web.mfgdocent.com to Upload and Download Deskbook Versions</p>
            <p>Your new deskbooks will appear in the Deskbook Version dropdown on the Start New Assessment Page.</p>
          </div>
          <IonModal className="settings-modal" trigger="upload-deskbook">
            <IonContent>
              <div className="upload-popover-wrapper">
                <h2>Choose a File to Upload</h2>
                <form>
                  <div className="upload-form">
                    <IonButton color="dsb" className="custom-file-upload ion-margin-bottom">
                      Select File
                    </IonButton>
                    <div>
                      <input
                        id="asdf"
                        type="file"
                        placeholder="Choose File"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </IonContent>
          </IonModal>
        </div>
      </IonContent>
    </IonPage>
  )
}
export default Settings;
