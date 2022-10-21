import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "../../api";
import "./search.css";
// import spaceVideo from '../assets/space.mp4';

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=1000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      });
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };
  
  


  return (
    <div className="searchBar">
      <div>
        {/* <video autoPlay loop muted id='video'>
          <source src={spaceVideo} type='video/mp4' />
        </video> */}
        <h1 className="Mainheader">
          <span className="bold-text">Search for weather forecasts on </span> 
          <span className="italic-text">any city, anytime, anywhere.</span>
        </h1>
      </div>
      <AsyncPaginate
        placeholder="Search for city"
         debounceTimeout={600}
         value={search}
         onChange={handleOnChange}
         loadOptions={loadOptions}
      />
      {/* <div>
        <img src={require('./globe (1).svg')} />
      </div> */}
      {/* <div >
        <img className="globeImage" src={require('./Earth hero img.png')} />
      </div>     */}
    </div>
  );
};

export default Search;