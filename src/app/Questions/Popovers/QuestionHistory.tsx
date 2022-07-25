import { IonButton,IonAccordion, IonItem, IonLabel, IonAccordionGroup } from '@ionic/react';
import './QuestionHistory.scss';

import React, { useState, useEffect } from 'react';

const QuestionHistory: React.FC<({ question: any, revertBack: any })> = ({ question, revertBack }) => {
  const [showBlock, setShowBlock] = useState(false);
  const[allAnswers, setAllAnswers] = useState([]);
  const[keyBlock, setKeyBlock] = useState(); 

  useEffect(() => {
    if (question) {
      console.log(question)
    }
  }, [question]);

  useEffect(() => {
    if (question.all_answers != []) {
      setAllAnswers(question.all_answers);
      console.log(question.all_answers)
    }
  }, [allAnswers]);



  return (
    <div className="question-history">
      <div className="header">
        <h2>Question History:</h2>
      </div>
      <div className="answers-list">
        {(question.all_answers.length == 0) ?
          <h5>You have not answered this question yet.</h5> 
          : 
          <IonAccordionGroup>
            {allAnswers.map((ans: any, index: any) => (
              <IonAccordion value={ans} key={index}>
                <IonItem slot="header" id="answer-item" className="top">
                  <IonLabel>
                    {ans.answer === 'yes' && <span>Yes </span>}
                    {ans.answer === 'no' && <span>No </span>}
                    {ans.answer === 'na' && <span>N/A </span>}
                    {ans.answer && 
                      <span className="question-text" key={index}>|<small> Answered On: {ans.updated_at.slice(0, 10)}</small>  
                      {/* <u onClick={() => {setShowBlock(!showBlock)}}>Open</u> */}
                      </span>
                    }
                    
                  </IonLabel>
                </IonItem>

                <IonItem slot="content" className="block">
                  <div className="fields">
                    {/* yes answer */}
                    {ans.answer === 'yes' &&
                      <div>
                        <p><b>Answer: </b> Yes</p>
                        <p><b>Objective Evidence: </b> {ans.objective_evidence}</p>
                        <p><b>Assumptions: </b> {ans.assumptions_yes}</p>
                        <p><b>Notes: </b> {ans.notes_yes}</p>
                      </div>
                    }
                    {/* no answer */}
                    {ans.answer === 'no' &&
                      <div>
                        <p><b>Answer:</b> No</p>
                        <p><b>Owner:</b> {ans.who}</p>
                        <p><b>Due Date:</b> {ans.when}</p>
                        <p><b>Action Item:</b> {ans.what}</p>
                        <p><b>Reason:</b> {ans.reason}</p>
                        <p><b>Assumptions:</b> {ans.assumptions_no}</p>
                        <p><b>Notes:</b> {ans.notes_no}</p>
                      </div>
                    }
                    {/* na answer */}
                    {ans.answer === 'na' &&
                      <div>
                        <p><b>Answer:</b> N/A</p>
                        <p><b>Documentation:</b> { ans.documentation_no }</p>
                        <p><b>Assumptions:</b> { ans.assumptions_na }</p>
                        <p><b>Notes:</b> {ans.notes_na}</p>
                      </div>
                    }
                    <p><b>User Who Answered:</b> </p>
                    <p><b>Answered At:</b> {ans.updated_at.slice(0, 10)}</p>
                    {/* <div className="action-buttons"> */}
                      <IonButton color="dsb" onClick={() => revertBack(ans)}>Revert Back</IonButton>
                    </div>
                  </IonItem>
                 {/* </div> */}
                
              </IonAccordion>
            ))}

            
          </IonAccordionGroup>
        }


      </div>
    </div>
  )
}

export default QuestionHistory;
