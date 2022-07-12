import React, { useState, useEffect, useRef, Fragment } from 'react';
import { IonButton } from '@ionic/react';
import {ProSidebar, SidebarHeader, SidebarFooter, SidebarContent, Menu, MenuItem, SubMenu} from 'react-pro-sidebar'; 

import { grabSingleAssessment, grabNextQuestion, grabSpecificQuestion } from '../../api/api';
import Moment from 'moment';
import "./Sidebar.scss";
// import "react-pro-sidebar/dist/css/styles.css";
import {FaListOl, FaQuestion, FaArrowCircleRight, FaArrowCircleLeft} from "react-icons/fa";
import {TbZoomQuestion} from "react-icons/tb";
import { useHistory } from 'react-router-dom';

const Sidebar: React.FC<({ getSQ: any, assessmentId: any, thread: any, subthread: any, question: any, assessmentInfo: any })> = ({getSQ, assessmentId, thread, subthread, question, assessmentInfo}) => {

  const [assessmentData, setAssessmentData] = useState<any>();
  const [threadData, setThreadData] = useState<any>([]);
  const [assessInfo, setAssessInfo] = useState({
    targetDate: null, additionalInfo: ''
  })

  const [menuCollapse, setMenuCollapse] = useState(false); 
  const [subOpen, setSubOpen] = useState(false); 

  const history = useHistory(); 
  
  useEffect(() => {
    async function getAssessment() {
      if (assessmentId) {
        var assessmentInfo = await grabSingleAssessment(assessmentId);
        console.log(assessmentInfo)
        await setAssessmentData(assessmentInfo);
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



  async function navigateToQuestionsList() {
    history.push({
        pathname: '/questions-list',
        state: {
            assessment_id: assessmentId as number,
        }
    })
}

  const icon = null; 

  const menuClickOut = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true); 
  }

  async function navigateToSpecificQuestion(questionId: number) {
    console.log(`Question id: ${questionId}`)
    history.push({
      pathname: '/questions',
      state: {
        assessment_id: assessmentId as number,
        question_id: questionId as number
      }
    })
    
  }

  return (
      <ProSidebar collapsed={menuCollapse} style={{top: "86px", maxWidth: "285px"}}>
        <SidebarHeader>
          {/* <div className="sidebar-header-text">
            <h2>Nav</h2>  
          </div> */}

          <div className="close-menu-arrow" onClick={menuClickOut}>
            {menuCollapse ? <FaArrowCircleRight style={{color: "white"}} size={30}/> : <FaArrowCircleLeft style={{color: "white"}} size={30}/>}
          </div>
            
        </SidebarHeader> 

        <SidebarContent>
          <Menu className="sidebar-menu" iconShape="circle">

            <SubMenu title="Current Question Info" icon={<FaQuestion/>} defaultOpen={false}>
              <MenuItem>Question {question.position} out of {question.assessment_length}</MenuItem>
              <MenuItem style={{overflowWrap: "break-word", whiteSpace: "normal"}}>Thread: {thread.name}</MenuItem>
              <MenuItem>Subthread: {subthread.name}</MenuItem>
              <MenuItem>Question: {question.question_text}</MenuItem>
              <MenuItem>Target MRL: {thread.mr_level} </MenuItem>
              <MenuItem>Current MRL: {thread.mr_level}</MenuItem>

              <MenuItem>Target Date: {assessInfo.targetDate !== null ? Moment(assessInfo.targetDate).format('MM/DD/YYYY') : 'No date set'}</MenuItem>
              <MenuItem>Additional Info: {assessInfo.additionalInfo ? assessInfo.additionalInfo : "None"}</MenuItem>
              
            </SubMenu> 

            <MenuItem icon={<FaListOl/>} onClick={() => navigateToQuestionsList()}>Questions List</MenuItem>

            <SubMenu title="All Questions" icon={<TbZoomQuestion/>} defaultOpen={false}>
              {assessmentData && assessmentData.threads.map((threadInfo: any) => (
                <SubMenu title={threadInfo.name} defaultOpen={false}>

                  {threadInfo.subthreads.map((sub: any,) => (
                  
                    <SubMenu title={sub.name} defaultOpen={false}>
                      {sub.questions.map((q: any) => (
                        <MenuItem onClick={() => getSQ(q.id)}>{q.question_text}</MenuItem>
                      ))}
                    </SubMenu>

                  ))}
                  
                </SubMenu>

              ))}
            </SubMenu>
            
          </Menu>
        </SidebarContent>
      </ProSidebar>
   
  )
}
export default Sidebar;