import { IonButton } from '@ionic/react';
import './QuestionHistory.scss';

import React, { useState } from 'react';

const QuestionHistory: React.FC = () => {
  const [showBlock, setShowBlock] = useState(false);

  return (
    <div className="question-history">
      <div className="header">
        <h2>This Question's History:</h2>
      </div>
      <div className="answers-list">
        {/* <h2>You have not answered this question yet.</h2> */}
        <div className="top">
          <h3>Yes | <span><small>Answered On: Feb 11, 2022, 1:49:07 PM | <u  onClick={() => setShowBlock(!showBlock)}>Open</u></small></span></h3>
        </div>

        {showBlock && <div className="block">
          <div className="fields">

            {/* yes answer */}
            <div className="yes">
              <p><b>Answer:</b> Yes</p>
              <p><b>Objective Evidence:</b> Objective Evidence</p>
              <p><b>Assumptions:</b> Assumptions</p>
              <p><b>Notes:</b> Notes</p>
            </div>
            {/* no answer */}
            {/* <div className="no">
              <p><b>Answer:</b> {{ answer.answer }}</p>
              <p><b>Owner:</b> {{ answer.who }}</p>
              <p><b>Due Date:</b> {{ answer.when }}</p>
              <p><b>Action Item:</b> {{ answer.what }}</p>
              <p><b>Reason:</b> {{ answer.reason }}</p>
              <p><b>Assumptions:</b> {{ answer.assumptionsNo }}</p>
              <p><b>Notes:</b> {{ answer.notesNo }}</p>
            </div> */}
            {/* na answer */}
            {/* <div className="na">
              <p><b>Answer:</b> {{answer.answer}}</p>
              <p><b>Documentation:</b> {{answer.documentation}}</p>
              <p><b>Assumptions:</b> {{answer.assumptionsNA}}</p>
              <p><b>Notes:</b> {{answer.notesNA}}</p>
            </div> */}
            <p><b>User Who Answered:</b> jyoo300@gmail.com</p>
            <p><b>Answered At:</b> Feb 11, 2022, 1:49:07 PM</p>
            <div className="action-buttons">
              <IonButton color="dsb">Revert Back</IonButton>
            </div>
          </div>
        </div>}

      </div>
    </div>
  )
}

export default QuestionHistory;
