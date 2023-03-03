import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";
import StateSelectionDropdown from "./state-select/StateSelectionDropdown";

const TopBar = ({ user }) => {
  const [showMenu, setShowMenu] = useState(false)
  const dropdownRef = useRef(null);

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
    setShowMenu(showMenu ? false : true)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <ul className="menu">
          <li className="menu-text">GigGuide</li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <div className="dropdown" ref={dropdownRef}>
            <input type="button" className="dropbtn" onClick={showStateMenu} value="Our Locations"/>
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
