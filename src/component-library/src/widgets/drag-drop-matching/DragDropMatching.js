'use strict';
import React from 'react';
import Matching from './components/Matching';
import "../../../styles/drag-drop-matching/style.scss";

function DragDropMatching(props) {
  return (
    props.config !== undefined && props.config !== "" ? (
      <div className='matching-container'>
      <Matching config={props.config} id={props.id} />
      </div>
  ) : (
    <div className="alert">No config file found for Drag and drop matching</div>
  ))
}

export default DragDropMatching;
