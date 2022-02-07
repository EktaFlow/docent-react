import { IonRow, IonCol, IonPopover, IonContent, IonIcon } from '@ionic/react';
import React, { useState } from 'react';

import './Topbar.scss';

const Topbar: React.FC = () => {
    const [thread, showThread] = useState(false);
    const [subThread, showSubthread] = useState(false);
    const [subheader, showSubheader] = useState(false);
    const [questionHistory, showQuestionHistory] = useState(false);
    const [additionalInfo, showAdditionalInfo] = useState(false);

    const [threadHeaders, setThreadHeaders] = useState(["Technology Maturity",
        "Technology and Industrial Base",
        "Design", "Cost & Funding",
        "Materials", "Process Capability & Control",
        "Quality Management", "Mfg Personnel", "Facilities", "Mfg Management"]);

    return (
        <div className="topbar-wrapper">
            <IonRow>
                <IonCol className="topbar-header" size="12">
                    <h1>Technology Maturity</h1>
                </IonCol>
                <IonCol size="12" size-md="6">
                    <p><span onClick={() => showThread(true)}>Current MR Level: 1 | Thread: Technology Maturity</span> | <span onClick={() => showSubthread(true)}> SubThread: Technology Maturity</span>
                    </p>
                    <IonPopover className="thread-popover" isOpen={thread} onDidDismiss={() => showThread(false)}>
                        <div className="thread-popup">
                            <h4>Navigate around the assessment.</h4>
                            {threadHeaders.map((thread, index) => (
                                <div>
                                    <div className="thread-header" onClick={() => showSubheader(!subheader)}>
                                        <p>{thread}</p>
                                    </div>
                                    {subheader && <div className="subheader">
                                        <p>Cost Analysis</p>
                                    </div>}
                                </div>

                            ))}
                        </div>
                    </IonPopover>
                    <IonPopover isOpen={subThread} onDidDismiss={() => showSubthread(false)}>
                        <div className="subthread-box">
                            <h4>Navigate Subthread: <small>Technology Maturity</small></h4>
                            <h6>Questions:</h6>
                            <div className="question">
                                <p>Is the Technology Readiness at TRL 1 or greater?</p>
                            </div>
                        </div>
                    </IonPopover>
                    <p>Question 1 out of 24</p>
                    <p>
                        <span>Show All Questions</span> | <span onClick={() => showQuestionHistory(true)}>Show Question History</span>
                    </p>
                    <IonPopover className="question-history-popover" isOpen={questionHistory} onDidDismiss={() => showQuestionHistory(false)}>
                        <div className="question-history">
                            <div className="header">
                                <h2>This Question's History:</h2>
                            </div>
                            <div className="answers-list">
                                <h2>You have not answered this question yet.</h2>
                            </div>
                        </div>
                    </IonPopover>
                </IonCol>
                <IonCol size="12" size-md="6" push-md="2">
                    <p>Target MRL: 1 | Target Date: No date set</p>
                    <p><span onClick={() => showAdditionalInfo(true)}>Show Additional Information</span></p>

                    <IonPopover isOpen={additionalInfo} onDidDismiss={() => showAdditionalInfo(false)}>
                        <div className="additional-info">
                            <p><b>Additional Information: </b><br></br>No additional information</p>
                        </div>
                    </IonPopover>
                </IonCol>
            </IonRow>
        </div>
    )

}

export default Topbar;