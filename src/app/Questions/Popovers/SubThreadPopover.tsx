import React, { useState, useEffect, Fragment } from 'react';
import './SubThreadPopover.scss';

import { grabSingleAssessment } from '../../../api/api'

const SubThreadPopover: React.FC<({ assessmentId: any, subthread: any })> = ({ assessmentId, subthread }) => {
  const [assessmentData, setAssessmentData] = useState<any>();

  useEffect(() => {
    async function getAssessment() {
      if (assessmentId) {
        var assessmentInfo = await grabSingleAssessment(assessmentId);
        await setAssessmentData(assessmentInfo)
      }
    }
    getAssessment();
  }, [assessmentId]);

  useEffect(() => {
    if (assessmentData) {
      console.log(subthread)
      console.log(assessmentData)
    }
  }, [assessmentData]);

  return (
    <div className="subthread-box">
      {assessmentData && assessmentData.threads.map((thread: any, index: any) => (
        <Fragment>
          {thread.subthreads.map((subThread: any, index: any) => (
            <Fragment>
              {subThread.name === subthread.name &&
                <Fragment>
                  <h4>Navigate Subthread: <br /> <small>{subThread.name}</small></h4>
                  <h6>Questions:</h6>
                  {subThread.questions.map((question: any, index: any) => (
                    <div className="question">
                      <p>{question.question_text}</p>
                    </div>
                  ))}
                </Fragment>
              }
            </Fragment>
          ))}
        </Fragment>
      ))}
    </div>
  )
}
export default SubThreadPopover;
