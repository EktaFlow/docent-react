import React, { useState, useEffect, Fragment } from 'react';
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonItem } from '@ionic/react'

import './Acronyms.scss';
import Header from '../../Framework/Header';
import HelpTopbar from '../HelpTopbar';

import acronyms from "./acronyms.json";

const Acronyms: React.FC = () => {
  let acronymArray = Object.keys(acronyms)

  return (
    <IonPage>
      <Header />
      <HelpTopbar text="Acronyms" />

      <IonContent>
        <div className="acronyms-wrapper">
          <IonGrid>
            <IonRow>
              {acronymArray.map((acronym, index) => (
                <Fragment>
                  {index % 2 === 0 &&
                    <Fragment>
                      <IonCol size="6">
                        <IonItem className="acronym odd" color="none">{acronym}</IonItem>
                      </IonCol>

                      <IonCol size="6">
                        {/* @ts-ignore */}
                        <IonItem className="spelled-name odd" color="none">{acronyms[acronym]}</IonItem>
                      </IonCol>
                    </Fragment>
                  }
                  {index % 2 === 1 &&
                    <Fragment>
                      <IonCol size="6">
                        <IonItem className="acronym even" color="docentdark"   >{acronym}</IonItem>
                      </IonCol>

                      <IonCol size="6">
                        {/* @ts-ignore */}
                        <IonItem className="spelled-name even" color="docentdark"   >{acronyms[acronym]}</IonItem>
                      </IonCol>
                    </Fragment>
                  }
                </Fragment>
              ))}

              {/* <IonCol size="6">
                <IonItem className="acronym even" color="docentdark"   >AAC</IonItem>
              </IonCol>

              <IonCol size="6">
                <IonItem className="spelled-name even" color="docentdark"   >Air Armament Center</IonItem>
              </IonCol>

              <IonCol size="6">
                <IonItem className="spelled-name odd" color="none">ACO</IonItem>
              </IonCol>

              <IonCol size="6">
                <IonItem className="spelled-name odd" color="none">Administrative Contracting Officer</IonItem>
              </IonCol>

              <IonCol size="6">
                <IonItem className="acronym even" color="docentdark"   >ACTD</IonItem>
              </IonCol>

              <IonCol size="6">
                <IonItem className="spelled-name even" color="docentdark"   >Advanced Concept Technology Demonstration</IonItem>
              </IonCol> */}
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  )
}
export default Acronyms;
