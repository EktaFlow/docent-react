import { IonRow, IonCol, IonPopover, IonButton } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import Moment from 'moment';

import './Topbar.scss';
import './QuestionsPage.scss';
import QuestionHistory from './Popovers/QuestionHistory';

const Topbar: React.FC<({ getNextQuestion:any, saveAnswers:any, question: any, thread: any, subthread: any, assessInfo: any })> = ({ getNextQuestion, saveAnswers, question, subthread, thread, assessInfo }) => {
    const [threadPop, showThreadPop] = useState(false);
    const [subThreadPop, showSubthreadPop] = useState(false);
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
        if (index !== threadIndex) {
            showSubheader(true);
        }
        else {
            showSubheader(!subheader);
        }
        setThreadIndex(index);

    }

    useEffect(() => {
      console.log(subthread)
    }, [subthread]);

    return (
        <div className="topbar-wrapper">
            <IonRow>
                <IonCol className="topbar-header" size="12">
                    <h1>{thread.name}</h1>
                </IonCol>
                <IonCol size="12" size-md="6">
                    <p><span className="popover-link" onClick={() => showThreadPop(true)}>Current MR Level: {thread.mr_level} | Thread: {thread.name}</span> | <span className="popover-link" onClick={() => showSubthreadPop(true)}> SubThread: {subthread.name}</span>
                    </p>
                    <IonPopover className="thread-popover" isOpen={threadPop} onDidDismiss={() => showThreadPop(false)}>
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
                    <IonPopover isOpen={subThreadPop} onDidDismiss={() => showSubthreadPop(false)}>
                        <div className="subthread-box">
                            <h4>Navigate Subthread: <small>{subthread.name}</small></h4>
                            <h6>Questions:</h6>
                            <div className="question">
                                <p>Is the Technology Readiness at TRL 1 or greater?</p>
                            </div>
                        </div>
                    </IonPopover>
                    <p>Question {question.position} out of {question.assessment_length}</p>
                    <p>
                        <span className="popover-link">Show All Questions</span> | <span className="popover-link" onClick={() => showQuestionHistory(true)}>Show Question History</span>
                    </p>

                    <IonPopover className="question-history-popover" isOpen={questionHistory} onDidDismiss={() => showQuestionHistory(false)}>
                        <QuestionHistory />
                    </IonPopover>

                </IonCol>
                <IonCol size="12" size-md="6" push-md="3">
                    <p>Target MRL: {thread.mr_level} | Target Date: {assessInfo.targetDate !== null ? Moment(assessInfo.targetDate).format('MM/DD/YYYY') : 'No date set'}</p>
                    <p>
                        <span className="popover-link" onClick={() => showAdditionalInfo(true)}>Show Additional Information</span>
                    </p>
                    <div className="title-wrapper">
                    <IonButton color="dsb" onClick={() => getNextQuestion('prev')} disabled={question.position == 1}>Previous</IonButton>
                    <IonButton color="dsb" onClick={() => getNextQuestion('next')} disabled={question.position == question.assessment_length}>Next</IonButton>
                    <IonButton color="dsb" onClick={() => saveAnswers()}>Save</IonButton>

                    </div>
                    <IonPopover isOpen={additionalInfo} onDidDismiss={() => showAdditionalInfo(false)}>
                        <div className="additional-info">
                            <p><b>Additional Information: </b><br /> {assessInfo.additionalInfo}</p>
                        </div>
                    </IonPopover>

                </IonCol>

            </IonRow>
        </div>
    )

}

export default Topbar;
