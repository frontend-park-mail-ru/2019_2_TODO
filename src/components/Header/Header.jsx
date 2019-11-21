import React from 'react'
import {Link} from 'react-router-dom';
import './Header.scss'
export const HeaderTemplate = (props) =>{
  return (
      <div id="topSection" className="header header__top-section">
        <div className="header__top-section__left-container">
          <img src="../../assets/pokerdom.png" className="logo"/>
          <Link className="header__top-section__left-container__label" to={'/'}>JustPoker</Link>
        </div>
        <div hidden={props.isAuth} className="header__top-section__right-container">
          <Link className=" header__sign-in-button" to={'/signIn'}>Login</Link>
          <Link className=" header__sign-in-button" to={"/signUp"}>Sign Up</Link>
        </div>
      </div>
  )
};

