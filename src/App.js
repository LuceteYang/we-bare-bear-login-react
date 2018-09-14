import React, { Component } from 'react';
import BearComponent from './components/BearComponent';

class App extends Component {

  render() {

    return (
      <div className="App">
          <form>
            <BearComponent/>
          </form>
      </div>
    );
  }
}

export default App;
