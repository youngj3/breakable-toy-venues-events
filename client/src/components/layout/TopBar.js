import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";
import SelectUSState from 'react-select-us-states'
import StateSelectionDropdown from "./state-select/StateSelectionDropdown";

const TopBar = ({ user }) => {
  const [showMenu, setShowMenu] = useState(false)

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

  const showStateMenu = e => {
    console.log('click')
    setShowMenu(showMenu ? false : true)
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
            <input type="button" className="dropbtn" onClick={showStateMenu} value="Our Locations" />
              <StateSelectionDropdown showMenu={showMenu}/>
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
