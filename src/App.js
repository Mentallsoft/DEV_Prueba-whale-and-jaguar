import React, { Component } from "react";
import './App.css';
import NumberFormat from "react-number-format";
import api from './components/api';
import BarChart from './components/barchart'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countriesJSON: [],
      sortType: 'desc',
      UrlImages: 'https://flagpedia.net/data/flags/normal/',
      filteredCountry: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  state = {
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

  handleChange(event) {
    this.setState({ filteredCountry: event.target.value });
  }

  render() {

    const { countriesJSON, sortType, UrlImages, filteredCountry } = this.state;

    const sorted = countriesJSON.sort(function (a, b) {
      const sortedJSON = (sortType === 'asc') ? a.population - b.population : b.population - a.population;
      return sortedJSON;
    });

    const sorted2 = sorted.filter((countries) => countries.name.toLowerCase().includes(filteredCountry.toLowerCase()));

    var auxCountries = [];
    var auxPopulation = [];

    //Sort array by population
    sorted2.map(element => {
      auxCountries.push(element.name);
      auxPopulation.push(element.population)
    })

    //Get unique values in JSON sorted
    const prueba = new Set(sorted2.map(
      (a) => {
        return a.region
      }
    ))

    console.log(prueba)
    return (
      <div className="o-app-container">
        <h1>
          COUNTRIES
        </h1>

        <form>
          <label>Do you want to search for a country? </label>
          <br />
          <br />
          <input type="text" value={filteredCountry} onChange={this.handleChange} placeholder='Colombia' />
          <br />
          <br />
          <label htmlFor="">Region: </label>
        </form>

        <br />

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
                <div className='o-flag-container'>
                  <img className='o-flag-img' src={UrlImages + countryJSON.alpha2Code.toLowerCase() + '.png'} alt={UrlImages + countryJSON.alpha2Code.toLowerCase()} />
                </div>

                <h2 id="o-country">
                  {countryJSON.name}
                </h2>
                <h4 id="o-capital">
                  Capital: {countryJSON.capital}
                </h4>
                <p>
                  Region: {countryJSON.region}
                  <br />
                  Language: {countryJSON.languages[0].name}
                  <br />
                  Currency: {countryJSON.currencies[0].name}
                  <br />
                  Population: <NumberFormat value={countryJSON.population} displayType={'text'} thousandSeparator={true} />
                  <br />
                  Area: <NumberFormat value={countryJSON.area} displayType={'text'} thousandSeparator={true} /> Km<sup>2</sup>
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
