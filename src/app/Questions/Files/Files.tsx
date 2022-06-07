import React, { useEffect, useState, Fragment } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonRow, IonCol, IonLabel } from '@ionic/react';
import './Files.scss';

const Files: React.FC<{ files?: any, question_id?: any }> = ({ files, question_id }) => {
  const [currentFiles, setCurrentFiles] = useState<any>([]);

  useEffect(() => {
    if (files) {
      setCurrentFiles([]);
      let insertFileData = files.map((file: any, index: any) => {
        let attachedToQuestion = false;
        let questionArray: { id: number }[] = [];
        file.questions.map((question: any, index: any) => {
          questionArray.push({ id: question.id })
          if (question.id === question_id) {
            attachedToQuestion = true
          }
        })
        if (attachedToQuestion) {
          setCurrentFiles((fileData: any) => [...fileData, {
            name: file.name,
            date: file.created_at.slice(0, 10),
            url: file.url,
            id: file.id,
          }])
        }
      });
    }
  }, [files]);

  useEffect(() => {
    if (currentFiles) {
      console.log(currentFiles)
    }
  }, [currentFiles]);

  const openURL = (url: any) => {
    window.open(url)
  }

  return (
    <div className="display-files">
      <IonHeader>
        <IonToolbar className="toolbar">
          <IonTitle>Attachments</IonTitle>
        </IonToolbar>
      </IonHeader>

      <div className="attachments-content">
        <table className="attachments-table">
          {/* Attachments Header */}

          <div className="attachments-header">
            <IonRow>
              <IonCol className="ion-no-padding">
                <IonLabel className="attachment-label file-name-label">File</IonLabel>
              </IonCol>
              <IonCol className="ion-no-padding">
                <IonLabel className="attachment-label date-label">Date Added</IonLabel>
              </IonCol>
              <IonCol id="view" className="ion-no-padding">
                <IonLabel className="attachment-label view-label">View</IonLabel>
              </IonCol>
              {/* <IonCol id="delete" className="ion-no-padding">
                <IonLabel className="attachment-label delete-label">Delete</IonLabel>
              </IonCol> */}
            </IonRow>

            {currentFiles && currentFiles.map((file: any, index: any) => (
              <IonRow>
                <IonCol color="dark" className="ion-no-padding">
                  <span className="file-name-content">{file.name}</span>
                </IonCol>
                <IonCol className="ion-no-padding">
                  <span className="date-content">{file.date}</span>
                </IonCol>
                <IonCol id="view" className="ion-no-padding">
                  <span className="file-link view-content" onClick={() => openURL(file.url)}>View</span>
                </IonCol>
                {/* <IonCol id="delete" className="ion-no-padding">
                  <span className="delete-content">Delete</span>
                </IonCol> */}
              </IonRow>
            ))}
          </div>
        </table>
      </div>
    </div>
  )
}
export default Files;
