import React, {useState} from 'react'
import './App.css';

const API = {
  key: process.env.REACT_APP_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/"
}
const dateBuilder = (d)=>{
let date = String(new window.Date())
date = date.slice(3,15)
return date
}

function App() {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})

  const search = e =>{
    if (e.key === "Enter"){
      fetch(`${API.base}weather?q=${query}&units=metric&APPID=${API.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result)
        setQuery('')})
    }
  }

  const getLocation= () =>(
    navigator.geolocation.getCurrentPosition((position)=>{
          fetch(`${API.base}weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&APPID=${API.key}`)
          .then(res => res.json())
          .then(result => {
            setWeather(result)
            setQuery('')})
    }
  ))

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16)? 'App-warm':'App') : 'App'}>
      <main>
        <div className="title">Weather Finder</div>
        <div className="search-box">
          <input 
          type="text"
          className="search-bar"
          placeholder="Search..."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}>

          </input>
          <button className="location-button" onClick={getLocation}>Get Location</button>
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
          <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className="weather-box">
          <div className="temp">
            {Math.round(weather.main.temp)}°C
          </div>
          <div className="weather">
          <img  alt="weather-icon" src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}/>
            {weather.weather[0].main}
            <img  alt="weather-icon" src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}/>
          </div>
        </div>
        </div>
        ): ('')}
      </main>
    </div>
  );
}

export default App;
