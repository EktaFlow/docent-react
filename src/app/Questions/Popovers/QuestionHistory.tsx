import { IonButton } from '@ionic/react';
import './QuestionHistory.scss';

import React, { useState, useEffect } from 'react';

const QuestionHistory: React.FC<({ question: any })> = ({ question }) => {
  const [showBlock, setShowBlock] = useState(false);

  useEffect(() => {
    if (question) {
      console.log(question)
    }
  }, [question]);

  return (
    <div className="question-history">
      <div className="header">
        <h2>This Question's History:</h2>
      </div>
      <div className="answers-list">
        {(!question.current_answer_text) ?
          <h2>You have not answered this question yet.</h2> : <div>
            <div className="top">
              <h3>
                {question.current_answer_text === 'yes' && <span>Yes </span>}
                {question.current_answer_text === 'no' && <span>No </span>}
                {question.current_answer_text === 'na' && <span>N/A </span>}
                | <span><small> Answered On: {question.current_answer.updated_at.slice(0, 10)} | <u onClick={() => setShowBlock(!showBlock)}>Open</u></small></span>
              </h3>
            </div>

            {showBlock && <div className="block">
              <div className="fields">
                {/* yes answer */}
                {question.current_answer_text === 'yes' &&
                  <div>
                    <p><b>Answer:</b> Yes</p>
                    <p><b>Objective Evidence:</b> {question.current_answer.objective_evidence}</p>
                    <p><b>Assumptions:</b> {question.current_answer.assumptions_yes}</p>
                    <p><b>Notes:</b> {question.current_answer.notes_yes}</p>
                  </div>
                }
                {/* no answer */}
                {question.current_answer_text === 'no' &&
                  <div>
                    <p><b>Answer:</b> No</p>
                    <p><b>Owner:</b> {question.current_answer.who}</p>
                    <p><b>Due Date:</b> {question.current_answer.when}</p>
                    <p><b>Action Item:</b> {question.current_answer.what}</p>
                    <p><b>Reason:</b> {question.current_answer.reason}</p>
                    <p><b>Assumptions:</b> {question.current_answer.assumptions_no}</p>
                    <p><b>Notes:</b> {question.current_answer.notes_no}</p>
                  </div>
                }
                {/* na answer */}
                {question.current_answer_text === 'na' &&
                  <div>
                    <p><b>Answer:</b> N/A</p>
                    <p><b>Documentation:</b> { question.current_answer.documentation_no }</p>
                    <p><b>Assumptions:</b> { question.current_answer.assumptions_na }</p>
                    <p><b>Notes:</b> {question.current_answer.notes_na}</p>
                  </div>
                }
                <p><b>User Who Answered:</b> </p>
                <p><b>Answered At:</b> {question.current_answer.updated_at.slice(0, 10)}</p>
                <div className="action-buttons">
                  <IonButton color="dsb" onClick={() => setShowBlock(!showBlock)}>Revert Back</IonButton>
                </div>
              </div>
            </div>}
          </div>
        }


      </div>
    </div>
  )
}

export default QuestionHistory;
