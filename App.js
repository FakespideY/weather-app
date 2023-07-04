import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import { ReactDOM } from 'react';
import ReactAnimatedWeather from 'react-animated-weather';


function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');


  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=6117dc0081ee562ae393f62faa48f67a`;



  const defaults = {
    icon: '',
    color: 'white',
    size: 70,
    animate: true
  };



  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;

  };

  const searchLocation = (event) => {
    if (event.key === 'Enter') {

      axios.get(url).then((response) => {



        setData(response.data)


      })
      setLocation('')

    }

  }


  let time = new Date().toLocaleTimeString();
  const [ctime, setCtime] = useState(time);

  const updateTime = () => {
    time = new Date().toLocaleTimeString();
    setCtime(time);
  }
  setInterval(updateTime, 1000);











  return (


    < div className="app" >

      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          placeholder='Enter Location'
          onKeyPress={searchLocation}
          type="text" />
      </div>
      <div className="container">
        <div className="top">

          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp} °F </h1> : null}
          </div>
          <div className="description">

            {data.weather ? <p>{data.weather[0].main}</p> : null}

          </div>

          <div className="dmy">

            <div className="current-time">

              {ctime}

            </div>
            <div className="current-date">{dateBuilder(new Date())}</div>
          </div>
        </div>


        <div className="bottom">
          <div className="feels">
            {data.main ? <p className='bold'>{data.main.feels_like} °F</p> : null}

            <p>Feels Like</p>
          </div>
          <div className="humidity">
            {data.main ? <p className='bold'>{data.main.humidity} %</p> : null}

            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.wind ? <p className='bold'>{data.wind.speed} MPH</p> : null}

            <p>Wind Speed</p>
          </div>
        </div>
      </div>

    </div >
  );
}

export default App;
