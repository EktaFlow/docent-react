import { IonPage, IonContent, IonRow, IonCol, IonButton } from '@ionic/react';
import React, { useState } from 'react';

import './MRLSummary.scss';
import Header from '../../Framework/Header';
import InfoCard from '../InfoCard';
import ReportsTopbar from '../ReportsTopbar';

const MRLSummary: React.FC = () => {
  // const responseNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const dataStructure = [
    {
      thread: {
        name: 'Name 1'
      },
      subthread: {
        name: "Name 2"
      }
    }
  ]

  const responseData = [
    {
      num: '1',
      response: 'yes'
    },
    {
      num: '2',
      response: 'no'
    },
    {
      num: '3',
      response: 'na'
    },
    {
      num: '4',
      response: 'blank'
    },
    {
      num: '5',
      response: 'yes'
    },
    {
      num: '6',
      response: 'no'
    },
    {
      num: '7',
      response: 'na'
    },
    {
      num: '8',
      response: 'blank'
    },
    {
      num: '9',
      response: 'na'
    },
    {
      num: '10',
      response: 'blank'
    },
  ];

  return (
    <IonPage>
      <Header />
      <ReportsTopbar text="MRL Summary" />
      <IonContent>
        <div className="mrl-summary-wrapper">
          <InfoCard />
          <IonRow className="mrl-summary-toolbar">
            <IonCol size="12" size-lg="2" className="download-image ion-padding-bottom">
              <IonButton color="dsb">Download Image</IonButton>
            </IonCol>
            <IonCol size-lg="2" className="ion-padding-top ion-margin-top">
              <span>subthread passed: </span>
              <div className="yes dashbox">
                <img className="dashpic" src="assets/check-mark-256.png" alt=""></img>
              </div>
            </IonCol>
            <IonCol size-lg="2" className="ion-padding-top ion-margin-top">
              <span>subthread failed: </span>
              <div className="no dashbox">
                <img className="dashpic" src="assets/x-mark-256.ico" alt=""></img>
              </div>
            </IonCol>
            <IonCol size-lg="2" className="ion-padding-top ion-margin-top">
              <span>subthread unanswered: </span>
              <div className="na dashbox">
                <img className="dashpic" src="assets/x-mark-256.ico" alt=""></img>
              </div>
            </IonCol>
            <IonCol size-lg="2" className="ion-padding-top ion-margin-top">
              <span>no subthread at this level: </span>
              <span className="blank dashbox">
                <img className="dashpic" src="assets/x-mark-256.ico" alt=""></img>
              </span>
            </IonCol>
          </IonRow>

          <div className="desktop">
            <hr />
            <div className="questions">
              <div className="header">
                <h5><b>MRLs</b></h5>
              </div>
              {responseData.map((response, index) => (
                <div className="answers">
                  {response.num}
                </div>
              ))}
            </div>
            <hr />
            <p className="thread"><b>Thread Name</b></p>
            <hr />
            <div className="questions">
              <div className="subthread header">Subthread Name</div>
              {responseData.map((response, index) => (
                <div className="answers">
                  {response.response === 'yes' &&
                    <div className="yes dashbox">
                      <img className="dashpic" alt="" src="assets/check-mark-256.png"></img>
                    </div>
                  }
                  {response.response === 'no' &&
                    <div className="no dashbox">
                      <img className="dashpic" src="assets/x-mark-256.ico" alt=""></img>
                    </div>
                  }
                  {response.response === 'na' &&
                    <div className="na dashbox">
                      <img className="dashpic" src="assets/x-mark-256.ico" alt=""></img>
                    </div>
                  }
                  {response.response === 'blank' &&
                    <span className="blank dashbox">
                      <img className="dashpic" src="assets/x-mark-256.ico" alt=""></img>
                    </span>
                  }
                </div>
              ))}
            </div>
          </div>

          <div className="mobile">
            {/* question set */}
            <div className="single-thread">
              <h3>Thread Name</h3>
              {/* question list */}
              <div className="questions">
                <h6>Subthread Name</h6>
                <div className="answer-row">
                  {/* answers list */}
                  {responseData.map((response, index) => (
                    <div className="answers">
                      <p className="level-num">{response.num}</p>
                      {response.response === 'yes' &&
                        <div className="yes dashbox">
                          <img className="dashpic" alt="" src="assets/check-mark-256.png"></img>
                        </div>
                      }
                      {response.response === 'no' &&
                        <div className="no dashbox">
                          <img className="dashpic" src="assets/x-mark-256.ico" alt=""></img>
                        </div>
                      }
                      {response.response === 'na' &&
                        <div className="na dashbox">
                          <img className="dashpic" src="assets/x-mark-256.ico" alt=""></img>
                        </div>
                      }
                      {response.response === 'blank' &&
                        <span className="blank dashbox">
                          <img className="dashpic" src="assets/x-mark-256.ico" alt=""></img>
                        </span>
                      }
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </IonContent>

    </IonPage>
  )
}
export default MRLSummary;
