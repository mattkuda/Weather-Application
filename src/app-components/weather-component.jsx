import React from "react";
import "../index.css";
import "../weather-icons-master/css/weather-icons.css";

const Weather = props => {
    return (
        <div>
            <div className="location-box">
                <div className="location">
                    {props.city}
                </div>
            </div>
            
            <div className="weather-box">
                <i 
                    className={`wi ${props.weatherIcon}`}
                    
                />
                <div className="temp">
                    {Math.round(props.temp)}°F
                </div>
                <div>
                    
                </div>
                <div className="weather">
                    {props.description}
                </div>
            </div>
        </div>
    );
};
  
export default Weather;