import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonButton, IonItem, IonLabel, IonSelect, IonSelectOption, IonCard, IonCardHeader, IonCardTitle } from '@ionic/react'

import './Criteria.scss';
import Header from '../../Framework/Header';
import HelpTopbar from '../HelpTopbar';

const Criteria: React.FC = () => {
    return (
        <IonPage>
            <Header />
            <HelpTopbar text="Criteria" />
            <IonContent>
                <div className="criteria-wrapper">
                    <IonGrid>
                        <IonRow className="criteria-filter-toolbar">
                            <IonCol size="12" size-lg="2" className="filter-button1 ion-padding-bottom">
                                <IonButton expand="block" color="dsb">Close All</IonButton>
                            </IonCol>
                            <IonCol size="12" size-lg="3" className="ion-no-padding">

                            </IonCol>       
                            <IonCol size="12" size-lg="3" className="filter-item ion-no-padding">
                                <IonItem color="dark">
                                    <IonLabel position="floating">Filter MR Level</IonLabel>
                                    <IonSelect interface="popover">
                                        <IonSelectOption value="all-levels">All Levels</IonSelectOption>
                                        <IonSelectOption value="1">1</IonSelectOption>
                                        <IonSelectOption value="2">2</IonSelectOption>
                                        <IonSelectOption value="3">3</IonSelectOption>
                                        <IonSelectOption value="4">4</IonSelectOption>
                                        <IonSelectOption value="5">5</IonSelectOption>
                                        <IonSelectOption value="6">6</IonSelectOption>
                                        <IonSelectOption value="7">7</IonSelectOption>
                                        <IonSelectOption value="8">8</IonSelectOption>
                                        <IonSelectOption value="9">9</IonSelectOption>
                                        <IonSelectOption value="10">10</IonSelectOption>
                                    </IonSelect>
                                </IonItem>
                            </IonCol>
                            <IonCol size="6" size-lg="1" className="filter-button2 ion-padding-bottom">
                                <IonButton expand="block" color="dsb" className="filter-buttons">Filter</IonButton>
                            </IonCol>
                            <IonCol size="6" size-lg="1" className="filter-button3 ion-padding-bottom">
                                <IonButton expand="block" color="dsb" className="filter-buttons">Clear</IonButton>
                            </IonCol>
                        </IonRow>

                        <IonCard className="thread-card" color="dark">
                            <IonCardHeader>
                                <IonCardTitle><img src="assets/if_icon-arrow-down.png" className="down-arrow"></img>Technology Maturity</IonCardTitle>
                            </IonCardHeader>
                            <IonCard className="subthread-card" color="dark">
                                <IonCardHeader>
                                    <IonCardTitle><img src="assets/if_icon-arrow-down.png" className="down-arrow"></img>Technology Maturity</IonCardTitle>
                                </IonCardHeader>
                                <div className="mrl">
                                    <h6><b>MR Level 1:</b></h6>
                                    <p>Should be assessed at TRL 1.</p>
                                </div>
                                <div className="mrl">
                                    <h6><b>MR Level 2:</b></h6>
                                    <p>TRA Report is TRL of 2 or greater</p>
                                </div>
                            </IonCard>
                        </IonCard>
                    </IonGrid>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Criteria;