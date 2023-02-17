import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import UserProfile from "./UserProfile.js";
import LandingPage from "./LandingPage.js";
import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import VenueList from "./VenueList.js";
import VenueShowPage from "./VenueShowPage.js";
import EventShowPage from "./EventShowPage.js";
import Footer from "./layout/Footer.js";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [savedEventsList, setSavedEventsList] = useState([])

  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch(err) {
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/venues" component={VenueList}/>
        <Route exact path="/venues/:id" component={VenueShowPage} />
        <Route 
          exact path="/venues/:venueId/events/:id"
          render={props => <EventShowPage {...props} savedEventsList={savedEventsList} setSavedEventsList={setSavedEventsList}/>}
        />
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <Route 
          exact path="/users/:id" 
          render={props => <UserProfile {...props} savedEventsList={savedEventsList} setSavedEventsList={setSavedEventsList}/>}
        />
      </Switch>
      <Footer />
    </Router>
  );
};

export default hot(App);
