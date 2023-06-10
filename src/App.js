import React, { useState, useEffect } from "react";
import DateSelector from "./components/date/DateSelector";
import TimeSelector from "./components/time/TimeSelector";
import {} from "./api/Apihelper";
import LocationSelector from "./components/location/LocationSelector";
import { getLocationDetails } from "./api/Apihelper";
import "react-dropdown/style.css";
import "./components/css/Dropdown.css";
import Weather from "./components/weather/Weather";
import style from "./App.module.css";
import TrafficContainer from "./components/traffic/TrafficContainer";
import Row from "./hoc/Row";
import ErrorMessage from "./components/ErrorMessage";
const API_ERROR_MESSAGE = "There is an error, please try again later.";

function App() {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState("2022-06-04");
  const [selectedTime, setSelectedTime] = useState("15:30");
  const [locations, setLocations] = useState([]);
  const [locationNameMapping, setLocationNameMapping] = useState({});

  useEffect(() => {
    setLoading(true);
    const getLocationMappingAndWeather = async () => {
      try {
        const { availableLocations, locationNameMapping } =
          await getLocationDetails(selectedDate, selectedTime);
        setLocations(availableLocations);
        setLocationNameMapping(locationNameMapping);
        setLoading(false);
        setError(false);
      } catch (error) {
        setLoading(false);
        setError(true);        
      }
    };
    getLocationMappingAndWeather();
  }, [selectedDate, selectedTime]);

  useEffect(() => {
    const currentLocation = selectedLocation || locations[0];
    setSelectedLocation(currentLocation);
    console.log('locations', locations);
  }, [locations, selectedLocation]);

  const handleLocationChange = (event) => {
    setSelectedLocation(event.value);
    console.log(locationNameMapping[selectedLocation]);
  };

  return (
    <div className={style.mainContainer}>
      <Row>        
        <DateSelector
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <TimeSelector
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />        
      </Row>
      <Row>
        <LocationSelector
          selectedLocation={selectedLocation}
          locations={locations}
          handleChange={handleLocationChange}
        />
        <Weather
          weather={locationNameMapping[selectedLocation]?.weather?.forecast}
        />
      </Row>
      <div className={style.contentContainer}>
        {isError ? (
          <ErrorMessage text={API_ERROR_MESSAGE} />          
        ) : (
          <TrafficContainer
            isLoading={isLoading}
            locationNameMapping={locationNameMapping}
            selectedLocation={selectedLocation}
          />
        )}
      </div>
    </div>
  );
}

export default App;
