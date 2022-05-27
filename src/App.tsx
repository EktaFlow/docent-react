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

// reports pages
import Review from './app/Reports/Review/Review';
import Comprehensive from './app/Reports/Comprehensive/Comprehensive';
import RiskSummary from './app/Reports/RiskSummary/RiskSummary';
import ActionItems from './app/Reports/ActionItems/ActionItems';
import DetailedRisk from './app/Reports/DetailedRisk/DetailedRisk';
import QuestionsList from './app/Reports/QuestionsList/QuestionsList';
import MRLSummary from './app/Reports/MRLSummary/MRLSummary';

// help pages
import Definitions from './app/Help/Definitions/Definitions';
import Acronyms from './app/Help/Acronyms/Acronyms';
import FAQs from './app/Help/Faqs/Faqs';
import Criteria from './app/Help/Criteria/Criteria';

// other pages
import Edit from './app/Dashboard/Edit/Edit';
import Settings from './app/Dashboard/Settings/Settings';
import Test from './app/Dashboard/Settings/Test';

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

import { IntercomProvider, useIntercom } from 'react-use-intercom';

import React, {useEffect, useState} from 'react'


setupIonicReact({
  mode: 'md'
});


const App: React.FC = () => {
  const onShow = () => console.log('Intercom did show the Messenger');
  const INTERCOM_APP_ID = 'olfft7tm';

  const isAuthed = () => {
    var token = localStorage.getItem("token");
    if (token) {
      return true
    } else {
      return false
    }
  }

  return (
  <IntercomProvider appId={INTERCOM_APP_ID} autoBoot onShow={onShow}>
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/">
            {
              isAuthed() ? <Redirect to="/home"/> : <Redirect to="/login" />
            }
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/password-reset">
            <PasswordReset />
          </Route>
          <Route
            exact
            path="/home"
            render={(props) => {
              return isAuthed() ? <Home /> : <Login />;
            }}
          />
          <Route
            exact
            path="/start-new"
            render={(props) => {
              return isAuthed() ? <New /> : <Login />;
            }}
          />
          <Route
            exact
            path="/questions/:ast_id"
            render={(props) => {
              return isAuthed() ? <Questions /> : <Login />;
            }}
          />
          <Route
            exact
            path="/questions"
            render={(props) => {
              return isAuthed() ? <Questions /> : <Login />;
            }}
          />
          <Route
            exact
            path="/review-report"
            render={(props) => {
              return isAuthed() ? <Review /> : <Login />;
            }}
          />
          <Route
            exact
            path="/review-report/:ast_id"
            render={(props) => {
              return isAuthed() ? <Review /> : <Login />;
            }}
          />
          <Route
            exact
            path="/comprehensive-report"
            render={(props) => {
              return isAuthed() ? <Comprehensive /> : <Login />;
            }}
          />
          <Route
            exact
            path="/risk-summary"
            render={(props) => {
              return isAuthed() ? <RiskSummary /> : <Login />;
            }}
          />
          <Route
            exact
            path="/action-tiem"
            render={(props) => {
              return isAuthed() ? <ActionItems /> : <Login />;
            }}
          />
          <Route
            exact
            path="/detailed-risk"
            render={(props) => {
              return isAuthed() ? <DetailedRisk /> : <Login />;
            }}
          />
          <Route
            exact
            path="/questions-list"
            render={(props) => {
              return isAuthed() ? <QuestionsList /> : <Login />;
            }}
          />
          <Route
            exact
            path="/mrl-summary"
            render={(props) => {
              return isAuthed() ? <MRLSummary /> : <Login />;
            }}
          />
          <Route
            exact
            path="/definitions"
            render={(props) => {
              return isAuthed() ? <Definitions /> : <Login />;
            }}
          />
          <Route
            exact
            path="/acronyms"
            render={(props) => {
              return isAuthed() ? <Acronyms /> : <Login />;
            }}
          />
          <Route
            exact
            path="/faqs"
            render={(props) => {
              return isAuthed() ? <FAQs /> : <Login />;
            }}
          />
          <Route
            exact
            path="/criteria"
            render={(props) => {
              return isAuthed() ? <Criteria /> : <Login />;
            }}
          />
          <Route
            exact
            path="/edit-assessment"
            render={(props) => {
              return isAuthed() ? <Edit /> : <Login />;
            }}
          />
          <Route
            exact
            path="/settings"
            render={(props) => {
              return isAuthed() ? <Settings /> : <Login />;
            }}
          />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  </IntercomProvider>
)};

export default App;
