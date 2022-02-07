import { IonRow, IonCol, IonButton } from '@ionic/react';
import './RiskPopover.scss';

import React, { useState } from 'react';

const RiskPopover: React.FC<{ description: string, setDescription: Function }> = ({description, setDescription}) => {

    const showLikelihood = () => {
        setDescription('Likelihood');
    }

    const showConsequence = () => {
        setDescription('Consequence');
    }

    return (
        <div className="popover-wrapper">
            <IonRow>
                <IonCol size="12">
                    <div className="title-wrapper">
                        <h4>Manufacturing Readiness Level Risk Matrix</h4>
                        <div className="button-group-1">
                            <IonButton color="dsb" onClick={() => showLikelihood()}>Likelihood Description</IonButton>
                            <IonButton color="dsb" onClick={() => showConsequence()}>Consequence Description</IonButton>
                        </div>
                    </div>
                </IonCol>
                <IonCol size="12" size-xl="6">
                    <div className="wrapper desktop">
                        <div className="matrix-table-container">
                            <div className="likelihood-label">
                                <p>Likelihood</p>
                            </div>
                            <table className="risk-matrix-table">
                                <tr className="popover-matrix-row">
                                    <th className="likelihood-cell">Near Certainty</th>
                                    <th className="input-cell">5</th>
                                    <th className="low-risk-cell">9</th>
                                    <th className="med-risk-cell">16</th>
                                    <th className="high-risk-cell">20</th>
                                    <th className="high-risk-cell">23</th>
                                    <th className="high-risk-cell">25</th>
                                </tr>
                                <tr className="popover-matrix-row">
                                    <th className="likelihood-cell">Highly Likely</th>
                                    <th className="input-cell">4</th>
                                    <th className="low-risk-cell">6</th>
                                    <th className="med-risk-cell">13</th>
                                    <th className="med-risk-cell">18</th>
                                    <th className="high-risk-cell">22</th>
                                    <th className="high-risk-cell">24</th>
                                </tr>
                                <tr className="popover-matrix-row">
                                    <th className="likelihood-cell">Moderate</th>
                                    <th className="input-cell">3</th>
                                    <th className="low-risk-cell">4</th>
                                    <th className="low-risk-cell">10</th>
                                    <th className="med-risk-cell">15</th>
                                    <th className="med-risk-cell">19</th>
                                    <th className="high-risk-cell">21</th>
                                </tr>
                                <tr className="popover-matrix-row">
                                    <th className="likelihood-cell">Low Likelihood</th>
                                    <th className="input-cell">2</th>
                                    <th className="low-risk-cell">2</th>
                                    <th className="low-risk-cell">7</th>
                                    <th className="low-risk-cell">11</th>
                                    <th className="med-risk-cell">14</th>
                                    <th className="med-risk-cell">17</th>
                                </tr>
                                <tr className="popover-matrix-row">
                                    <th className="likelihood-cell">Not Likely</th>
                                    <th className="input-cell">1</th>
                                    <th className="low-risk-cell">1</th>
                                    <th className="low-risk-cell">3</th>
                                    <th className="low-risk-cell">5</th>
                                    <th className="low-risk-cell">8</th>
                                    <th className="med-risk-cell">12</th>
                                </tr>
                                <tr className="popover-matrix-row">
                                    <th className="empty-cell"></th>
                                    <th className="empty-cell"></th>
                                    <th className="input-cell">1</th>
                                    <th className="input-cell">2</th>
                                    <th className="input-cell">3</th>
                                    <th className="input-cell">4</th>
                                    <th className="input-cell">5</th>
                                </tr>
                                <tr className="consequence-row">
                                    <th className="empty-cell"></th>
                                    <th className="empty-cell"></th>
                                    <th className="consequence-cell">Negligible</th>
                                    <th className="consequence-cell">Marginal</th>
                                    <th className="consequence-cell">Moderate</th>
                                    <th className="consequence-cell">Critical</th>
                                    <th className="consequence-cell">Catastrophic</th>
                                </tr>
                                <tr id="con-label" className="consequence-row">
                                    <th className="empty-cell"></th>
                                    <th className="empty-cell"></th>
                                    <th id="empty-consequence-cell-left"></th>
                                    <th className="empty-consequence-cell-middle"></th>
                                    <th className="consequence-label">Consequence</th>
                                    <th className="empty-consequence-cell-middle"></th>
                                    <th id="empty-consequence-cell-right"></th>
                                </tr>
                            </table>
                        </div>
                    </div>
                </IonCol>
                <IonCol size="12" size-xl="1">
                    <div className="color-coding">
                        <div id="color-code-cell1">Low Risk</div>
                        <div id="color-code-cell2">Medium Risk</div>
                        <div id="color-code-cell3">High Risk</div>
                    </div>
                </IonCol>
                <IonCol size="12" size-xl="5">
                    <div className="button-group-2">
                        <IonButton color="dsb" onClick={() => showLikelihood()}>Likelihood Description</IonButton>
                        <IonButton color="dsb" onClick={() => showConsequence()}>Consequence Description</IonButton>
                    </div>

                    {description === "Likelihood" && <div className="explainer">
                        <table className="criteria-table">
                            <tr>
                                <h4 className="explainer-heading">Likelihood</h4>
                            </tr>
                            <tr className="crit-table-row">
                                <th className="crit-table-left-col">Rating</th>
                                <th className="crit-table-right-col" id="rating-descrip-heading">
                                    Description
                                </th>
                            </tr>
                            <tr className="crit-table-row">
                                <th className="crit-table-left-col">5 - Near Certainty</th>
                                <th className="crit-table-right-col">
                                    Assume and Anticipate Occurrence ({'>'}90%)<br />
                                    Approach and processes cannot mitigate risk; Immature technology;
                                    System very complex
                                </th>
                            </tr>
                            <tr className="crit-table-row">
                                <th className="crit-table-left-col">4 - Highly Likely</th>
                                <th className="crit-table-right-col">
                                    Very High Chance of Occurrence (65% to 90%)<br />
                                    Approach and processes not well documented; Technology available but
                                    not validated
                                </th>
                            </tr>
                            <tr className="crit-table-row">
                                <th className="crit-table-left-col">3 - Moderate</th>
                                <th className="crit-table-right-col">
                                    Significant Chance of Occurrence (40% to 65%)<br />
                                    Approach and processes are partially documented; Un-validated
                                    technology has been shown to be feasible by analogy, test or
                                    analysis
                                </th>
                            </tr>
                            <tr className="crit-table-row">
                                <th className="crit-table-left-col">2 - Low Likelihood</th>
                                <th className="crit-table-right-col">
                                    Occurrence Possible but Less Than Likely (10% to 40%)<br />
                                    Current approach and processes understood and documented; most
                                    technology has been validated
                                </th>
                            </tr>
                            <tr className="crit-table-row">
                                <th className="crit-table-left-col">1 - Not Likely</th>
                                <th className="crit-table-right-col">
                                    Occurrence is Possible but Very Unlikely ({'<'}10%)<br />
                                    Approach and processes are well understood and documented
                                </th>
                            </tr>
                        </table>
                    </div>}
                    {description === "Consequence" && <div className="explainer">
                        <table className="criteria-table">
                            <tr>
                                <h4 className="explainer-heading">Consequence</h4>
                            </tr>
                            <tr className="cons-table-row">
                                <th className="cons-rating-col">Rating</th>
                                <th className="cons-cost-col">Cost</th>
                                <th className="cons-sched-col">Schedule</th>
                                <th className="cons-perf-col">Performance</th>
                            </tr>
                            <tr className="cons-table-row">
                                <th className="cons-rating-col">5 - Catastrophic</th>
                                <th className="cons-cost-col">{'>'}50%</th>
                                <th className="cons-sched-col">{'>'}4.5 months</th>
                                <th className="cons-perf-col">User exit criteria not achieved</th>
                            </tr>
                            <tr className="cons-table-row">
                                <th className="cons-rating-col">4 - Critical</th>
                                <th className="cons-cost-col">35% to 50%</th>
                                <th className="cons-sched-col">3 to 4.5 months</th>
                                <th className="cons-perf-col">
                                    User exit criteria will not be achieved; all margin has been
                                    exceeded (performance failure)
                                </th>
                            </tr>
                            <tr className="cons-table-row">
                                <th className="cons-rating-col">3 - Moderate</th>
                                <th className="cons-cost-col">25% to 35%</th>
                                <th className="cons-sched-col">1.5 to 3 months</th>
                                <th className="cons-perf-col">
                                    User exit criteria achieved with no margin
                                </th>
                            </tr>
                            <tr className="cons-table-row">
                                <th className="cons-rating-col">2 - Marginal</th>
                                <th className="cons-cost-col">10% to 25%</th>
                                <th className="cons-sched-col">0.5 to 1.5 months</th>
                                <th className="cons-perf-col">
                                    User exit criteria achieved with reduced margin
                                </th>
                            </tr>
                            <tr className="cons-table-row">
                                <th className="cons-rating-col">1 - Negligible</th>
                                <th className="cons-cost-col">{'<'}10%</th>
                                <th className="cons-sched-col">{'<'}0.5 months</th>
                                <th className="cons-perf-col">
                                    User exit criteria will be met with adequate margins
                                </th>
                            </tr>
                        </table>
                    </div>}
                </IonCol>

            </IonRow>
        </div>
    )
}

export default RiskPopover;