import React from 'react';
import NumberFormat from "react-number-format";
import './index.css'

const Card = (props) =>{
    return(
        <div className="o-card">
                <div className='o-flag-container'>
                  <img className='o-flag-img' src={props.UrlImages + props.data.alpha2Code.toLowerCase() + '.png'} alt={props.UrlImages + props.data.alpha2Code.toLowerCase()} />
                </div>

                <h2 id="o-country">
                  {props.data.name}
                </h2>
                <h4 id="o-capital">
                  Capital: {props.data.capital}
                </h4>
                <p>
                  Region: {props.data.region}
                  <br />
                  Language: {props.data.languages[0].name}
                  <br />
                  Currency: {props.data.currencies[0].name}
                  <br />
                  Population: <NumberFormat value={props.data.population} displayType={'text'} thousandSeparator={true} />
                  <br />
                  Area: <NumberFormat value={props.data.area} displayType={'text'} thousandSeparator={true} /> Km<sup>2</sup>
                </p>
                <h5>
                  <a href={"https://es.wikipedia.org/wiki/" + props.data.name} target="_blank" rel="noopener noreferrer">
                    View more details
                  </a>
                </h5>
              </div>
    )
};

export default Card;
