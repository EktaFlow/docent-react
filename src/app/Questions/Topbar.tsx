import { IonRow, IonCol, IonPopover, IonButton } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import Moment from 'moment';

import { useHistory } from 'react-router-dom';

import './Topbar.scss';
import './QuestionsPage.scss';
import QuestionHistory from './Popovers/QuestionHistory';
import SubThreadPopover from './Popovers/SubThreadPopover';
import ThreadPopover from './Popovers/ThreadPopover';

const Topbar: React.FC<({ getNextQuestion: any, saveAnswers: any, assessmentId: any, question: any, thread: any, subthread: any, assessInfo: any })> = ({ getNextQuestion, saveAnswers, assessmentId, question, subthread, thread, assessInfo }) => {
    const [threadPop, showThreadPop] = useState(false);
    const [subThreadPop, showSubthreadPop] = useState(false);
    const [questionHistory, showQuestionHistory] = useState(false);
    const [additionalInfo, showAdditionalInfo] = useState(false);

    const history = useHistory();

    async function navigateToQuestionsList() {
        history.push({
            pathname: '/questions-list',
            state: {
                assessment_id: assessmentId as number,
            }
        })
    }

    // useEffect(() => {
    //     console.log(thread)
    // }, [thread]);

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
                        <ThreadPopover assessmentId={assessmentId} />
                    </IonPopover>
                    <IonPopover className="subthread-popover" isOpen={subThreadPop} onDidDismiss={() => showSubthreadPop(false)}>
                        <SubThreadPopover assessmentId={assessmentId} subthread={subthread} />
                    </IonPopover>

                    <p>Question {question.position} out of {question.assessment_length}</p>
                    <p>
                        <span className="popover-link" onClick={() => navigateToQuestionsList()}>Show All Questions</span> | <span className="popover-link" onClick={() => showQuestionHistory(true)}>Show Question History</span>
                    </p>

                    <IonPopover className="question-history-popover" isOpen={questionHistory} onDidDismiss={() => showQuestionHistory(false)}>
                        <QuestionHistory question={question} />
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
