import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function City(props) {
  const d = props.data;
  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        {d.City}
      </div>
      <div className="panel-body">
        <ul>
          <li>State: {d.State}</li>
          <li>Location: ({d.Lat}, {d.Long})</li>
          <li>Population(estimated): {d.EstimatedPopulation}</li>
          <li>Total Wages: {d.TotalWages}</li>
        </ul>
      </div>
    </div>
  );
}

function ZipSearchField(props) {
  return (
    <div className="text-center">
      <label>Zip Code: </label>
      <input type="number" onChange={props.handleChange} name={props.value} />
    </div>
  );
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      input: "",
      output: [],
    }
    this.zipChanged = this.zipChanged.bind(this);
  }

  zipChanged(event) {
    const input = event.target.value;
    this.setState({
      input: input,
    });

    if(input.length === 5) {
      fetch("http://ctp-zip-api.herokuapp.com/zip/"+input)
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        const output = jsonData.map(c => {
          return <City data={c} />;
        });
        this.setState({
          input: input,
          output: output,
        });
      })
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <div>
          <ZipSearchField handleChange={this.zipChanged} value={this.state.input}/>
        </div>
        <div>{this.state.output}</div>
      </div>
    );
  }
}

export default App;
