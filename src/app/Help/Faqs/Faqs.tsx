import { IonPage, IonContent, IonGrid, IonRow, IonCard, IonCardHeader, IonCardContent } from '@ionic/react'

import './Faqs.scss';
import Header from '../../Framework/Header';
import HelpTopbar from '../HelpTopbar';

const Faqs: React.FC = () => {
  return (
    <IonPage>
      <Header />
      <HelpTopbar text="Frequently Asked Questions" />

      <IonContent>
        <div className="faqs-wrapper">
          <IonGrid>
            <IonRow>
              <IonCard>
                <IonCardHeader>
                  <b>Contact: Elizabeth Loiacono</b>
                </IonCardHeader>
                <IonCardContent>
                  <ul>AFRL/RXMS</ul>
                  <ul><a>elizabeth.loiacono@us.af.mil</a></ul>
                </IonCardContent>
              </IonCard>

              <IonCard>
                <IonCardHeader>
                  <b>Contact: Docent Users Group</b>
                </IonCardHeader>
                <IonCardContent>
                  <ul>Ekta</ul>
                  <ul><a>docentmra@googlegroups.com</a></ul>
                </IonCardContent>
              </IonCard>
            </IonRow>

            <IonRow>
              <IonCard>
                <IonCardHeader><b>Where do I start?</b></IonCardHeader>
                <IonCardContent> To start a new assessment, go to the Start page by selecting the 'Start' option from the 'Assessment' menu.  Then fill out the data fields and click 'Start'.  The name provided under 'Name of Assessment' will be used to save your assessment to the DMC's cloud storage.</IonCardContent>
              </IonCard>
              <IonCard>
                <IonCardHeader><b>How do I import an assessment?</b></IonCardHeader>
                <IonCardContent> If you already have an assessment you've created in the DMC, you can reopen it by selecting the 'Start' option from the 'Assessment' menu, then choosing 'Import Assessment' on the right side of the screen. This will present all of the assessments created in the workspace you are running Docent from. Once you've chosen your import file, you should see the specific details of that assessment populate in the fields on the left.</IonCardContent>
              </IonCard>
              <IonCard>
                <IonCardHeader><b>How do I return to a previous question?</b></IonCardHeader>
                <IonCardContent>If you want to return to a previous question, you can use the 'back' button at the top right of the question page. This will back track through questions you've previously answered.", "Alternatively, you can also choose 'Review' option from the 'Assessment' menu. Here, you'll see a summary of all questions you've answered and you can return to any of them by clicking on it's title.</IonCardContent>
              </IonCard>
              <IonCard>
                <IonCardHeader><b>How do I share an assessment with others?</b></IonCardHeader>
                <IonCardContent><b>Sharing and Editing:</b> <br /> If you want to allow others to open and edit your assessment in this application, you will need to give them access to your DMC workspace. Once they are able to access the workspace, they can run the Docent app and see any assessments you've saved in that workspace.", "<br /><b>Reporting:</b> <br /> If you simply want to share the current state of your assessment with others, there are options available. Please see the section in this help text titled 'Can I generate a report of my assessment?'.</IonCardContent>
              </IonCard>
              <IonCard>
                <IonCardHeader><b>Can I generate a report of my assessment?</b></IonCardHeader>
                <IonCardContent> <b>Graphic Summary:</b> <br /> Select the 'Dashboard' option from the 'Assessment' menu. Here you'll see a table outlining the various threads and subthreads and your status within them. You can also click 'save image' at the bottom of this page to export this table as an image.", "<br /><b>Report of items requiring action:</b> <br /> Select the 'Action Items' option from the 'Assessment' menu.  Here's you'll see a summary of all of the questions marked 'no' along with the answer information.  You can export this to a csv format by clicking 'export.'", "<br /><b>Report of all answered questions:</b> <br /> Select the 'Review' option from the 'Assessment' menu.  Here, you'll see a summary of all questions you've answered. You can export this to a csv format by clicking 'export.'</IonCardContent>
              </IonCard>
              <IonCard>
                <IonCardHeader><b>What are the benefits of performing a Manufacturing Readiness Assessment?</b></IonCardHeader>
                <IonCardContent>Performing a Manufacturing Readiness Assessment is a key factor in identifying and mitigating manufacturing risks. Following the MRL Criteria will help to address problems before they end up in the production line. Docent will take you through the process of performing an assessment, and prompt you to create an action plan for any criteria that have not been met. These plans can be exported from Docent and used to develop a Manufacturing Maturation Plan.</IonCardContent>
              </IonCard>
              <IonCard>
                <IonCardHeader><b>What should my target level be?</b></IonCardHeader>
                <IonCardContent>The target levels are steps along the path to full rate production.   The criteria are structured such that each level corresponds to a stage of manufacturing.   Choose the stage that you are currently at and the MRL Criteria will guide you through the appropriate steps at this stage to prepare for the next stage."," <br /><b>MRL 1:</b> Basic Manufacturing Implications Identified"," <br /><b>MRL 2:</b> Manufacturing Concepts Identified"," <br /><b>MRL 3:</b> Manufacturing Proof of Concept Developed"," <br /><b>MRL 4:</b> Capability to produce the technology in a laboratory environment"," <br /><b>MRL 5:</b> Capability to produce prototype components in a production relevant environment"," <br /><b>MRL 6:</b> Capability to produce a prototype system or subsystem in a production relevant environment"," <br /><b>MRL 7:</b> Capability to produce systems, subsystems, or components in a production representative environment"," <br /><b>MRL 8:</b> Pilot line capability demonstrated; ready to begin Low Rate Initial Production (LRIP)"," <br /><b>MRL 9:</b> Low rate production demonstrated; Capability in place to begin Full Rate Production (FRP)"," <br /><b>MRL 10:</b> Full Rate Production demonstrated and lean production practices in place</IonCardContent>
              </IonCard>
              <IonCard>
                <IonCardHeader><b>How can I find questions I skipped?</b></IonCardHeader>
                <IonCardContent>Navigate to Questions List page.</IonCardContent>
              </IonCard>
            </IonRow>
            <IonRow>
              <IonCard>
                <IonCardHeader><b>How can I find questions I marked 'not applicable'?</b></IonCardHeader>
                <IonCardContent>Navigate to the Questions List page.</IonCardContent>
              </IonCard>
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>

    </IonPage>
  )
}
export default Faqs;
