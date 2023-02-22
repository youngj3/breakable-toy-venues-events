import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {
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
              <a href="/venues?state=MA">MASS</a>
              <a href="/venues?state=RI">RI</a>
              <a href="/venues?state=CT">CT</a>
              <a href="/venues?state=NY">NY</a>
              {/* <Link to='/venues?state=MA'>Massachusets</Link>
              <Link to='/venues?state=RI'>Rhode Island</Link>
              <Link to='/venues?state=CT'>Connecticut</Link>
              <Link to='/venues?state=NY'>New York</Link> */}
            </div>
          </div>
          {/* <li>
          <Link to="/venues">Mass Locations</Link>
          </li> */}
        </ul>
      </div>
      <div className="top-bar-right">
        <ul className="menu">{user ? authenticatedListItems : unauthenticatedListItems}</ul>
      </div>
    </div>
  );
};

export default TopBar;
