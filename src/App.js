import React, { Component } from "react";
import './App.css';
import NumberFormat from "react-number-format";
import api from './components/api';
import BarChart from './components/barchart'

class App extends Component {

  state = {
    countriesJSON: [],
    sortType: 'desc'
  }

  async componentDidMount() {

    await api.get()
      .then(
        response => {
          var auxRespuesta = response.data;

          this.setState({
            countriesJSON: auxRespuesta,
          })
        }
      );
  }

  directionalSort = sortType => {
    this.setState({ sortType })
  }

  render() {

    const { countriesJSON, sortType } = this.state;

    const sorted2 = countriesJSON.sort(function (a, b) {
      const sortedJSON = (sortType === 'asc') ? a.population - b.population : b.population - a.population;
      return sortedJSON;
    });

    var auxCountries = [];
    var auxPopulation = [];

    sorted2.map(element => {
      auxCountries.push(element.name);
      auxPopulation.push(element.population)
    })

    /*const sorted = countriesJSON.sort((a, b) => {
      const isReversed = (sortType === 'asc') ? 1 : -1;
      return isReversed * a.name.localeCompare(b.name)
    });*/

    return (
      <div className="o-app-container">
        <h1>
          COUNTRIES
        </h1>
        <div className='o-container-buttons'>
          <button className='o-button' disabled={(sortType === 'asc') ? true : false} onClick={() => this.directionalSort('asc')}>Sort by asc</button>
          <button className='o-button' disabled={(sortType === 'desc') ? true : false} onClick={() => this.directionalSort('desc')}>Sort by desc</button>
        </div>
        <br />
        <BarChart olabels={auxCountries} ovalues={auxPopulation} />
        <br />
        <br />
        <div className='row'>

          {sorted2.map(
            (countryJSON, key) => (
              <div className="o-card" key={key}>
                <h2 id="o-country">
                  {countryJSON.name}
                </h2>
                <h4 id="o-capital">
                  Capital: {countryJSON.capital}
                </h4>
                <p>
                  Population: <NumberFormat value={countryJSON.population} displayType={'text'} thousandSeparator={true} />
                  <br />
                  Currency: {countryJSON.currencies[0].code}
                </p>
                <h5>
                  <a href={"https://es.wikipedia.org/wiki/" + countryJSON.name} target="_blank" rel="noopener noreferrer">
                    View more details
                  </a>
                </h5>
              </div>
            )
          )}
        </div>
      </div>
    )
  };
};

export default App;
