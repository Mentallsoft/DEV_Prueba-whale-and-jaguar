import React, { Component } from "react";
import './App.css';
import api from './components/api';
import BarChart from './components/barchart'
import Card from './components/card'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countriesJSON: [],
      sortType: 'desc',
      UrlImages: 'https://flagpedia.net/data/flags/normal/',
      filteredCountry: '',
      filteredRegion: ''
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
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {

    const { countriesJSON, sortType, UrlImages, filteredCountry, filteredRegion } = this.state;

    //Sort data by population values
    const sorted = countriesJSON.sort(function (a, b) {
      const sortedJSON = (sortType === 'asc') ? 1 : -1;
      return (a.population - b.population) * sortedJSON;
    });

    //Get unique values in JSON sorted
    const uniqueRegions = new Set(countriesJSON.map(
      (a) => {
        return a.region
      }
    ))

    var uniqueRegionsList = [];
    uniqueRegions.forEach(d => uniqueRegionsList.push(d))
    ///////

    //Filter data by population and region
    const auxSorted = sorted.filter(
      (countries) => countries.name.toLowerCase().includes(filteredCountry.toLowerCase()));


    const sorted2 = auxSorted.filter(
      (countries) => countries.region.toLowerCase().includes(filteredRegion.toLowerCase()));

    //Get values for visualization
    var auxCountries = [];
    var auxPopulation = [];

    sorted2.map((element, key) => {
      auxCountries.push(element.name);
      auxPopulation.push(element.population);
      return (
        console.log("Sorted")
      )
    })

    return (
      <div className="o-app-container">
        <h1>
          COUNTRIES
        </h1>
        <form>
          <label htmlFor="">Region: </label>
          <br />
          <br />
          <select name='filteredRegion' onChange={this.handleChange} value={filteredRegion}>
            {uniqueRegionsList.map(
              (opt) => {
                return (
                  <option>{opt}</option>
                )
              }
            )}
          </select>
          <br />
          <br />

          <label>Do you want to search for a country? </label>
          <br />
          <br />
          <input name='filteredCountry' type="text" value={filteredCountry} onChange={this.handleChange} placeholder='e.g. Colombia' />
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
              <Card data={countryJSON} UrlImages={UrlImages} key={key} />
            )
          )}
        </div>
      </div>
    )
  };
};

export default App;
