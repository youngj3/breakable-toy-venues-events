import React from 'react'
import { FaGithub, FaLinkedin } from "react-icons/fa"

const Footer = () => {
  return(
    <div className="footer">
    <ul className="menu simple align-center">
      <li>
        <a href="https://www.linkedin.com/in/young-james-j/">
          <FaLinkedin />
        </a>
      </li>
      <li>
        <a href="https://github.com/youngj3">
          <FaGithub />
        </a>
      </li>
      <li>
        Developed By <b>James Young</b>
      </li>
    </ul>
    <br />
    <ul className="menu simple align-center">
      <a href="/aboutTheDeveloper"><b>About</b></a>
    </ul>
  </div>
  )
}

export default Footer