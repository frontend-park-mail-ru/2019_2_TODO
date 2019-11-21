import React from 'react';
import {Link} from 'react-router-dom';
import './InfoBar.scss'

export const InfoBarTemplate = (props) =>{
    return (
        <div className="infoBar">
            <Link id="infoAvatar" className="infoBar__avatar" to={'/smt'} style={{
                backgroundImage: 'url("'+props.src+'")',
                backgroundSize: '100% 100%'
            }}/>
                <button className="infoBar__logOutButton" type="submit" onClick={props.onClick}>
                    <i id="logout" className="fa fa-sign-out"></i>
                </button>
        </div>
    );
};
