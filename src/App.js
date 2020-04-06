import React, {Component} from 'react';
import Form from "./app-components/search-component";
import Weather from "./app-components/weather-component";
import "./index.css";

import "./weather-icons-master/css/weather-icons.css";

const api = {
  key: "a1633b48e867eac96bb6ac0784745acb",
  base: "https://api.openweathermap.org/data/2.5/"
}



class App extends Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      temp: undefined,
      temp_max: null,
      temp_min: null,
      description: "",
      error: false,
      bg: 'normal-bg',
      bg_weather: null

    };

    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
  }

  get_BgColor(bg_temp){
    switch (true){
      case bg_temp >= 70:
        this.setState({ bg: "hot-bg" });
        break;
      case bg_temp < 70 && bg_temp > 32:
        this.setState({ bg: "normal-bg" });
        break;
      case bg_temp <= 32 :
        this.setState({ bg: "cold-bg" });
        break;
      default:
        this.setState({ bg: "normal-bg" });
    }
    
  }

  get_BgWeather(rangeId){
    switch (true){
      case rangeId >= 200 && rangeId <= 521:
        this.setState({ bg_weather: 'rain' });
        break;
        case rangeId >= 600 && rangeId <= 622:
          this.setState({ bg_weather: 'snow1 snow2' });
          break;
      default:
        this.setState({ bg_weather: null });
    }
  }

  get_WeatherIcon(icons, rangeId){
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        this.setState({ icon: icons.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: icons.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 521:
        this.setState({ icon: icons.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: icons.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: icons.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: icons.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: icons.Clouds });
        break;
      default:
        this.setState({ icon: icons.Clouds });
    }
  }

  getWeather = async e => {
    e.preventDefault();

    const country = e.target.elements.country.value;
    const city = e.target.elements.city.value;

    if (country && city) {
      const api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=imperial&APPID=${api.key}`
      );
      

      try{
        
        const response = await api_call.json();

        this.setState({
          city: `${response.name}, ${response.sys.country}`,
          country: response.sys.country,
          general: response.weather[0].main,
          temp: response.main.temp,
          description: response.weather[0].description,
          error: false
        });
        
        this.get_WeatherIcon(this.weatherIcon, response.weather[0].id);
        this.get_BgColor(response.main.temp);
        this.get_BgWeather(response.weather[0].id);

      } catch {
        // Handle errors
        this.setState({
          error: true
        });
      }    

    } else {
      this.setState({
        error: true
      });
    }
  };

  render(){
    return (
      <div className={`${this.state.bg}`}>
        <div className={`${this.state.bg_weather}`}> 
          <main>
              <Form loadweather={this.getWeather} error={this.state.error} />
              {(typeof this.state.temp != "undefined") ? ( //and error false? TODO
                <Weather
                  city={this.state.city}
                  temp={this.state.temp}
                  description={this.state.description}
                  weatherIcon={this.state.icon}
                />
              ):('')}
          </main>
        </div> 
      </div>
    );
  }
}

export default App;
