import { IonRow, IonCol, IonPopover } from '@ionic/react';
import React, { useState } from 'react';

import './Topbar.scss';
import QuestionHistory from './Popovers/QuestionHistory';

const Topbar: React.FC = () => {
    const [thread, showThread] = useState(false);
    const [subThread, showSubthread] = useState(false);
    const [subheader, showSubheader] = useState(false);
    const [threadIndex, setThreadIndex] = useState();
    const [questionHistory, showQuestionHistory] = useState(false);
    const [additionalInfo, showAdditionalInfo] = useState(false);

    const [threadHeaders, setThreadHeaders] = useState(["Technology Maturity",
        "Technology and Industrial Base",
        "Design", "Cost & Funding",
        "Materials", "Process Capability & Control",
        "Quality Management", "Mfg Personnel", "Facilities", "Mfg Management"]);

    const [subheaderInfo, setSubheaderInfo] = useState(["Technology Maturity",
        "Technology and Industrial Base",
        "Design", "Cost & Funding",
        "Materials", "Process Capability & Control",
        "Quality Management", "Mfg Personnel", "Facilities", "Mfg Management"]);

    const clickSubheader = (index: any) => {
        setThreadIndex(index);
        showSubheader(!subheader);
    }

    return (
        <div className="topbar-wrapper">
            <IonRow>
                <IonCol className="topbar-header" size="12">
                    <h1>Technology Maturity</h1>
                </IonCol>
                <IonCol size="12" size-md="6">
                    <p><span className="popover-link" onClick={() => showThread(true)}>Current MR Level: 1 | Thread: Technology Maturity</span> | <span className="popover-link" onClick={() => showSubthread(true)}> SubThread: Technology Maturity</span>
                    </p>
                    <IonPopover className="thread-popover" isOpen={thread} onDidDismiss={() => showThread(false)}>
                        <div className="thread-popup">
                            <h4>Navigate around the assessment.</h4>
                            {threadHeaders.map((thread, index) => (
                                <div key={index}>
                                    <div className="thread-header"
                                        onClick={() => clickSubheader(index)}
                                    >
                                        <p>{thread}</p>
                                    </div>
                                    {subheader && index === threadIndex && <div className="subheader">
                                        <p>{subheaderInfo[index]}</p>
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
                        <span className="popover-link">Show All Questions</span> | <span className="popover-link" onClick={() => showQuestionHistory(true)}>Show Question History</span>
                    </p>

                    <IonPopover className="question-history-popover" isOpen={questionHistory} onDidDismiss={() => showQuestionHistory(false)}>
                        <QuestionHistory />
                    </IonPopover>

                </IonCol>
                <IonCol size="12" size-md="6" push-md="2">
                    <p>Target MRL: 1 | Target Date: No date set</p>
                    <p>
                        <span className="popover-link" onClick={() => showAdditionalInfo(true)}>Show Additional Information</span>
                    </p>

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