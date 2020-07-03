import React, { Component } from 'react';
import weather from './Forecast.module.css';
import city from './city';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWind, faSpinner } from '@fortawesome/free-solid-svg-icons'

class Forecast extends Component {

   constructor() {
      super();
      this.state = {
         loading: true,
         input: '',
         id: '1835847',
         weather: {
            name: '',
            main: '',
            description: '',
            temp: '',
            feels_like: '',
            wind: '',
         },
         icon: '01d',
         date: new Date(),
      };
   }

   handleChange = (e) => {
      this.setState({
         input: e.target.value
      });
   }

   fetchWithId = (id) => {
      fetch(`http://api.openweathermap.org/data/2.5/weather?id=${id}&units=metric&APPID=30742e5b36b25c75ceb4b039caaf558f`)
         .then(results => {
            return results.json();
         }).then((data) => {
            console.log(data);
            this.setState({
               input: '',
               id: id,
               weather: {
                  name: data.name,
                  main: data.weather[0].main,
                  description: data.weather[0].description,
                  temp: data.main.temp,
                  feels_like: data.main.feels_like,
                  wind: data.wind.speed
               },
               icon: data.weather[0].icon,
               date: new Date(),
               loading: false
            });
            console.log("updated " + data.name);
         }).catch(error => console.log("error!! ", error));
   }

   handleSubmit = (e) => {
      e.preventDefault(); //need to understand
      const matched = city.filter((data) => {
         return (data.name.toLowerCase() === (this.state.input.toLowerCase()));
      });

      if (matched.length > 0) {
         this.setState({loading: true});
         this.fetchWithId(matched[0].id);
      };
   }

   // handleKeyPress = (e) => {
   //    if (e.key === 'Enter') {
   //       this.handleSubmit();
   //    }
   // }

   componentDidMount() {
      this.fetchWithId(this.state.id);
   }

   render() {
      const {
         handleChange,
         handleSubmit,
      } = this;
      if (this.state.lodaing) return (
         <div>
            <FontAwesomeIcon icon={faSpinner} pulse/>
         </div>
      )
      return (
         <div className="weather">
            <div className="form">
               <form onSubmit={handleSubmit}>
                  <input type="text" id="city" name="city" value={this.state.input} onChange={handleChange} />
                  <div className="create-button" onClick={handleSubmit}>
                     Find
                  </div>
               </form>
            </div>
            <div className={weather.name}>
               {this.state.weather.name}, {this.state.weather.temp}°C
            </div>
            <div className="time">
               {this.state.date.toLocaleTimeString()}
            </div>
            <img src={`http://openweathermap.org/img/wn/${this.state.icon}@2x.png`} alt="Icon" />

            <div className={weather.main}>
               {this.state.weather.main} <FontAwesomeIcon icon={faWind}/>
               {this.state.weather.wind}m/s
            </div>
            <div className={weather.description}>
               {this.state.weather.description}  
            </div>
         </div>
      )
   }
}
export default Forecast;