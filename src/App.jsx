import React, { useState } from 'react';

const App = () => {
  const [bits, setBits] = useState('');

  const getBits = () => {
    fetch('https://qrng.anu.edu.au/API/jsonI.php?length=8&type=uint16',
      { method: 'GET', mode: 'cors' })
      .then(response => response.json())
      .then(json => {
        bits = json.data.map(n => n.toString(2)).join('') + bits;
        setBits(bits);
      })
  }

  return (
    <>
      <h1>The app will go here.</h1>
      <h2>But it hasn't been written yet.</h2>
    </>
  )
}

export default App;