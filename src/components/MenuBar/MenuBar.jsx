import React from 'react';
import './MenuBar.scss';
import {Link} from "react-router-dom";

export const MenuBarTemplate = (props) =>{
  return (
      <div className="menu-bar">
        <Link className="menu-bar__button" to={"/online"}>
          Online
        </Link>
        <Link className="menu-bar__button" to={"/offline"}>
          Single
        </Link>
        <Link className="menu-bar__button" to={"/about"}>
          About
        </Link>
        <Link className="menu-bar__button" to={"/rules"}>
          Rules
        </Link>
      </div>
  )
}