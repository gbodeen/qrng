import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bits: ''
    }
  }

  getBits = () => {
    fetch('https://qrng.anu.edu.au/API/jsonI.php?length=8&type=uint16',
      { method: 'GET', mode: 'cors' })
      .then(response => response.json())
      .then(json => {
        let bits = json.data.map(n => n.toString(2)).join('') + this.state.bits;
        this.setState({ bits },
          () => console.log('supply: ', this.state.bits))
      })
  }

  render() {
    return (
      <>
        <h1>The app will go here.</h1>
        <h2>But it hasn't been written yet.</h2>
      </>
    )
  }
}

export default App;