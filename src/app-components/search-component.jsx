import React from "react";
import "../index.css";

const Form = props => {

  return (
    <div >
        <form onSubmit={props.loadweather} >
            <div>{props.error ? error() : ""}</div>
            <div className="search-box">
                <div>
                    <input
                        className="search-bar"
                        display="inline-block"
                        margin-right="20px"
                        type="text"
                        
                        placeholder="City"
                        name="city"
                        autoComplete="off"
                    />
                    <input
                        className="search-bar"
                        display="inline-block"
                        type="text"
                        
                        placeholder="Country"
                        name="country"
                        autoComplete="off"
                    />
                    <button className="button" display="inline-block"><span>
                        Get Weather 
                    </span></button>
                </div>
            </div>
        </form>
    </div>
  );
};

const error = props => {
  return (
    <div>
      <div className="error">
        Invalid location. Please try again.
        <span class="closebtn" ></span>
      </div>
    </div>
  );
};

export default Form;