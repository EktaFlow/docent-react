import { IonPage, IonContent, IonGrid, IonCard, IonCardHeader, IonCardContent, IonRow } from '@ionic/react'

import './Definitions.scss';
import Header from '../../Framework/Header';
import HelpTopbar from '../HelpTopbar';

const Definitions: React.FC = () => {
  return (
    <IonPage>
      <Header />
      <HelpTopbar text="Definitions" />

      <IonContent>
        <div className="definitions-wrapper">
          <IonGrid>
            <IonRow>
              <IonCard>
                <IonCardHeader>
                  <b>Acquisition Strategy</b>
                </IonCardHeader>
                <IonCardContent>
                  A business and technical management approach designed to achieve program objectives within the resource constraints imposed. It is the framework for planning, directing, contracting for, and managing a program. It provides a master schedule for research, development, test, production, fielding, modification, post-production management, and other activities essential for program success. The acquisition strategy is the basis for formulating functional plans and strategies (e.g., Test and Evaluation Master Plan (TEMP), Systems Engineering Plan (SEP), Manufacturing Management Plan (MMP), Quality Assurance Plan (QAP), etc.). Once approved by the MDA, the Acquisition Strategy provides a basis for more detailed planning.
                </IonCardContent>
              </IonCard>

              <IonCard>
                <IonCardHeader>
                  <b>Advanced Technology Development</b>
                </IonCardHeader>
                <IonCardContent>
                  A demonstration of the maturity and potential of advanced technologies for enhanced military operational capability or cost effectiveness.
                </IonCardContent>
              </IonCard>

              <IonCard>
                <IonCardHeader>
                  <b>Affordability</b>
                </IonCardHeader>
                <IonCardContent>
                  The degree to which the life cycle cost of an acquisition program is in consonance with the long-range investment plans of the customer.
                </IonCardContent>
              </IonCard>

              <IonCard>
                <IonCardHeader>
                  <b>Alternative Systems Review (ASR)</b>
                </IonCardHeader>
                <IonCardContent>
                  A multi-disciplined technical review to ensure that requirements agree with the customers' needs and expectations and that the system under review can proceed into the Technology Maturation and Risk Reduction (TMRR) phase. The ASR should be completed prior to Milestone A.
                </IonCardContent>
              </IonCard>

              {/* <IonCard>
                <IonCardHeader>
                  <b>Analysis of Alternatives (AoA)</b>
                </IonCardHeader>
                <IonCardContent>
                  The AoA assesses potential materiel solutions to satisfy the capability need documented in the approved Initial Capabilities Document (ICD). It focuses on identification and analysis of alternatives, measures of effectiveness (MOEs), cost, schedule, concepts of operations, and overall risk, including the sensitivity of each alternative to possible changes in key assumptions or variables. The AoA also assesses critical Technologies (CTs) associated with each proposed materiel solution, including technology maturity, integration risk, manufacturing feasibility, and, where necessary, technology maturation and demonstration needs. The AoA is normally conducted during the Materiel Solution Analysis (MSA) phase of the Defense Acquisition Management System (DAMS), is a key input to the Capability Development Document (CDD), and supports the materiel solution decision at Milestone A.
                </IonCardContent>
              </IonCard>

              <IonCard>
                <IonCardHeader>
                  <b>Applied Research</b>
                </IonCardHeader>
                <IonCardContent>
                  A systematic study to gain knowledge, or understanding, necessary in order to determine the means by which a recognized and specific need may be met. From a manufacturing perspective this level is characterized by assessing the application of the manufacturing capabilities, capacities, or materials needed to meet the specific need. Applied research translates basic research into solutions for broadly defined military needs. Typically this level of readiness includes identification, paper studies and analysis of material and process approaches. An understanding of manufacturing feasibility and risk should be emerging at the point when a clear definition of how the technology fits into a military product with a good understanding of the risk at the completion of the product definition.
                </IonCardContent>
              </IonCard>

              <IonCard>
                <IonCardHeader>
                  <b>Basic Research</b>
                </IonCardHeader>
                <IonCardContent>
                  A systematic study directed toward greater knowledge or understanding of the fundamental aspects of phenomena and of observable facts without specific applications toward processes or products in mind. It includes all scientific study and experimentation directed toward increasing fundamental knowledge and understanding in those fields of the physical, engineering, environmental, and life sciences related to long-term national security needs. It is farsighted, potentially high-payoff research that provides the basis for technological progress.
                </IonCardContent>
              </IonCard>

              <IonCard>
                <IonCardHeader>
                  <b>Bill of Materials (BOM)</b>
                </IonCardHeader>
                <IonCardContent>
                  A list of the subordinate parts (electronic, electrical, mechanical) in an assembly (e.g., an SRU/SRA or a subsystem assembly). An indentured BOM depicts the top-down breakout relationship of parts to the next higher assembly components (from system to box to board). At this point, the BOM should be complete to allow for purchasing of components to be used in the Pilot Line build.
                </IonCardContent>
              </IonCard>

              <IonCard>
                <IonCardHeader>
                  <b>Capability Development Document (CDD)</b>
                </IonCardHeader>
                <IonCardContent>
                  The Capability Development Document (CDD) identifies operational performance attributes of the proposed system. The CDD is system specific and applies to a single increment of capability in an evolutionary acquisition program. Each increment of a program will either have its own CDD or a separate annex on a master CDD. Key Performance Parameters (KPP) are introduced in the CDD. Cost will be included in the CDD as life-cycle cost or, if available, total ownership costs. The format for the CDD is found at Appendix A to Enclosure F of the Manual for the Operation of the Joint Capabilities Integration and Development System, updated January 2012. The CDD is prepared during the Technology Development phase to guide the Engineering & Manufacturing Development phase by defining measurable and testable capabilities. The CDD supports the Milestone B decision and must be validated and approved before MS B.
                </IonCardContent>
              </IonCard>

              <IonCard>
                <IonCardHeader>
                  <b>Capability Production Document (CPD)</b>
                </IonCardHeader>
                <IonCardContent>
                  The Capability Production Document (CPD) identifies production attributes for a single increment of a program. The CPD is rewritten for each increment in an evolutionary acquisition program. Key Performance Parameters (KPP) and performance attributes are refined in the CPD. Cost and engineering estimates will also be refined in the CPD and will be presented as life-cycle cost. The CPD is prepared during the Engineering & Manufacturing Development phase to guide the Production and Deployment phase and is used to measure the contractor's delivery.
                </IonCardContent>
              </IonCard>

              <IonCard>
                <IonCardHeader>
                  <b>CContinuous Improvement</b>
                </IonCardHeader>
                <IonCardContent>
                  An ongoing effort to improve products, services or processes. These efforts can seek 'incremental' improvement over time or 'breakthrough' improvement all at once. Among the most widely used tools for continuous improvement is a four-step quality model�the plan-do-check-act (PDCA) cycle, also known as Deming Cycle or Shewhart Cycle, and Lean/Six Sigma models for improvement.
                </IonCardContent>
              </IonCard>

              <IonCard>
                <IonCardHeader>
                  <b>Counterfeit Part</b>
                </IonCardHeader>
                <IonCardContent>
                  An unauthorized copy or substitute part that has been identified, marked, and/or altered by a source other than the part's legally authorized source without legal right or authority to do so or one whose material, performance, or characteristics are knowingly misrepresented by a supplier in the supply chain.
                </IonCardContent>
              </IonCard> */}
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Definitions;
