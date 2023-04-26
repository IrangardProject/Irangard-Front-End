import React from 'react';
import { useState } from 'react';
import OpenLauncher from '../assets/launcher_button.svg';
import CloseLauncher from '../assets/clear-button.svg';
import './style.scss';

function Launcher(props) {
  return (
    <div>
      <button type="button" className={props.showChat ? "rcw-launcher rcw-close-launcher-button" : "rcw-launcher "} onClick={props.toggleShowChat}>
        {props.showChat && <img src={CloseLauncher} className="rcw-close-launcher" alt="close launcher" />}
        {!props.showChat && <img src={OpenLauncher} className="rcw-open-launcher" alt="open launcher" />}
      </button>
    </div>
  );
}

export default Launcher;
