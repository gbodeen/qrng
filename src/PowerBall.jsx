import React, { useState, useEffect } from 'react';

const PowerBall = (props) => {
  const { bits } = props;

  const calcNums = () => {
    return 'nothing here yet';
  }

  return (
    <>
      <h3>This is the PowerBall component.</h3>
      <button className="pb" onClick={calcNums}>
        Gimme numbas!
      </button>
      <p>{bits}</p>
    </>
  )
}

export default PowerBall;