import React, { useState, useEffect } from 'react';
import './ThreadPopover.scss';

import { grabSingleAssessment } from '../../../api/api'

const ThreadPopover: React.FC<({ assessmentId: any })> = ({ assessmentId }) => {
  const [threadIndex, setThreadIndex] = useState();
  const [subheader, showSubheader] = useState(false);
  const [assessmentData, setAssessmentData] = useState<any>();
  const [threadData, setThreadData] = useState<any>([]);

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
      console.log(assessmentData)
      let insertThreadData = assessmentData.threads.map((thread: any) => {
        let subthreadNames: { name: string }[] = [];
        thread.subthreads.map((subthread: any) => {
          if (subthread.questions.length !== 0) {
            subthreadNames.push({ name: subthread.name })
          }
        })
        if (subthreadNames.length !== 0) {
          setThreadData((threadData: any) => [...threadData, {
            thread_name: thread.name,
            subthreads: subthreadNames
          }])
        }
      });
    }
  }, [assessmentData]);

  useEffect(() => {
    if (threadData) {
      console.log(threadData);
    }
  }, [threadData]);

  const clickSubheader = (index: any) => {
    if (index !== threadIndex) {
      showSubheader(true);
    }
    else {
      showSubheader(!subheader);
    }
    setThreadIndex(index);
  }

  return (
    <div className="thread-popup">
      <h4>Navigate around the assessment.</h4>
      {threadData && threadData.map((thread: any, index: any) => (
        <div key={index}>
          <div className="thread-header" onClick={() => clickSubheader(index)}>
            <p>{thread.thread_name}</p>
          </div>
          {subheader && index === threadIndex && thread.subthreads.map((subthread: any, index2: any) => (
            <div className="subheader">
                 <p>{subthread.name}</p>
            </div>
          ))}
        </div>
      ))}
      {/* {threadHeaders.map((thread, index) => (
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
      ))} */}
    </div>
  )
}
export default ThreadPopover;
