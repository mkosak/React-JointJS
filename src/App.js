import React from 'react';
import * as joint from 'jointjs';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.element = document.getElementById('canvas');
    this.graph = new joint.dia.Graph();
  }

  componentDidMount() {
    this.paper = new joint.dia.Paper({ 
      el: this.element, 
      width: 650, 
      height: 200, 
      gridSize: 1, 
      model: this.graph
    });
  }

  render() {
    return (
      <div className="App">
        <div id="canvas">It works!</div>
      </div>
    );
  }
}

export default App;
