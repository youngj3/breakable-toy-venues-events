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

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
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
        <Route exact path="/venues/:venueId/events/:id" component={EventShowPage} />
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <Route exact path="/users/:id" component={UserProfile}/>
      </Switch>
    </Router>
  );
};

export default hot(App);
