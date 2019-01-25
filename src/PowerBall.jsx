import React, { useState, useEffect } from 'react';

const PowerBall = () => {

  const calcNums = () => {
    return 'nothing here yet';
  }

  return (
    <>
      <h3>This is the PowerBall component.</h3>
      <button className="pb" onClick={calcNums}>
        Gimme numbas!
      </button>
    </>
  )
}

export default PowerBall;