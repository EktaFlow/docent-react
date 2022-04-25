import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import Home from './app/Dashboard/Home/Home';
import New from './app/Dashboard/New/New';
import Questions from './app/Questions/QuestionsPage';

// authentication pages
import Login from './app/Dashboard/Account/Login';
import Register from './app/Dashboard/Account/Register';
import PasswordReset from './app/Dashboard/Account/PasswordReset';
import CCForm from './app/Dashboard/Account/Stripe';
import StripeAPI from './app/Dashboard/Account/StripeApi';

// reports pages
import Review from './app/Reports/Review/Review';
import Comprehensive from './app/Reports/Comprehensive/Comprehensive';
import RiskSummary from './app/Reports/RiskSummary/RiskSummary';
import ActionItems from './app/Reports/ActionItems/ActionItems';
import DetailedRisk from './app/Reports/DetailedRisk/DetailedRisk';
import QuestionsList from './app/Reports/QuestionsList/QuestionsList';

// help pages
import Definitions from './app/Help/Definitions/Definitions';
import Acronyms from './app/Help/Acronyms/Acronyms';
import FAQs from './app/Help/Faqs/Faqs';
import Criteria from './app/Help/Criteria/Criteria';

// other pages
import Edit from './app/Dashboard/Edit/Edit';
import Settings from './app/Dashboard/Settings/Settings';

import { setupIonicReact } from '@ionic/react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact({
  mode: 'md'
});


const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/start-new">
          <New />
        </Route>
        <Route exact path="/questions">
          <Questions />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/purchase">
          <CCForm />
        </Route>
        <Route exact path="/purchase-api">
          <StripeAPI />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/password-reset">
          <PasswordReset />
        </Route>
        <Route exact path="/questions">
          <Questions />
        </Route>
        <Route exact path="/review-report">
          <Review />
        </Route>
        <Route exact path="/comprehensive-report">
          <Comprehensive />
        </Route>
        <Route exact path="/risk-summary">
          <RiskSummary />
        </Route>
        <Route exact path="/action-items">
          <ActionItems />
        </Route>
        <Route exact path="/detailed-risk">
          <DetailedRisk />
        </Route>
        <Route exact path="/questions-list">
          <QuestionsList />
        </Route>
        <Route exact path="/definitions">
          <Definitions />
        </Route>
        <Route exact path="/acronyms">
          <Acronyms />
        </Route>
        <Route exact path="/faqs">
          <FAQs />
        </Route>
        <Route exact path="/criteria">
          <Criteria />
        </Route>
        <Route exact path="/edit-assessment">
          <Edit />
        </Route>
        <Route exact path="/settings">
          <Settings />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
