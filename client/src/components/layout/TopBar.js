import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";
import SelectUSState from 'react-select-us-states'

const TopBar = ({ user }) => {
  const history = useHistory();
  const unauthenticatedListItems = [
    <li key="sign-in">
      <Link to="/user-sessions/new">Sign In</Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new" className="button">
        Sign Up
      </Link>
    </li>,
  ];

  const authenticatedListItems = [
    <li key="sign-out">
      <SignOutButton />
    </li>,
    <li key='profile-link'>
      <Link to={`/users/${user?.id}`}>My Profile</Link>
    </li>
  ];

  const handleStateChange = (stateCode) => {
    history.push(`/venues?state=${stateCode}`);
  }

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <ul className="menu">
          <li className="menu-text">GigGuide</li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <div className="dropdown">
            <button className="dropbtn">Our Locations
            <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-content">
              <SelectUSState onChange={handleStateChange}/>
            </div>
          </div>
        </ul>
      </div>
      <div className="top-bar-right">
        <ul className="menu">{user ? authenticatedListItems : unauthenticatedListItems}</ul>
      </div>
    </div>
  );
};

export default TopBar;
