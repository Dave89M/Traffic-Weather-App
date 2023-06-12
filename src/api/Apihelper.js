import axios from 'axios';
import { getCoordinatesList, getAlphabeticallySortedArray, getLocationNameMapping } from '../util/util';

const API_URL = "https://api.data.gov.sg/v1/";
const MAP_API_URL = "https://www.mapquestapi.com/geocoding/v1/batch";
const MAP_API_KEY = 'bv8WWVYj1hbjhPfE02ANUSaZdzLALiNt';
const API_ENDPOINTS = {
  WEATHER: "environment/2-hour-weather-forecast",
  TRAFFIC: "transport/traffic-images",
};

export async function getLocationNamesFromCoordinates(coordinates) {
    const payload = {
      locations: coordinates,
    };  
    const data = await axios.post(`${MAP_API_URL}?key=${MAP_API_KEY}`, payload);    
    return data;
  }

export async function getWeatherData(dateTimeQueryString) {
    const weatherData = await axios.get(API_URL + API_ENDPOINTS.WEATHER + dateTimeQueryString);
    return weatherData;
  }
  
  export async function getTrafficData(dateTimeQueryString) {
    const trafficData = await axios.get(API_URL + API_ENDPOINTS.TRAFFIC + dateTimeQueryString);
    return trafficData;
  }

  export async function getLocationDetails(selectedDate, selectedTime){
    const dateTimeQueryString = `?${selectedDate}T${selectedTime}:00`;  
    const trafficData = await getTrafficData(dateTimeQueryString);
    const weatherData = await getWeatherData(dateTimeQueryString);

    const coordinatesList = getCoordinatesList(trafficData);

    const {results} = (await getLocationNamesFromCoordinates(coordinatesList)).data;

    const locationNameList = results

    const locationNameMapping = getLocationNameMapping(
        trafficData,
        weatherData,
        locationNameList
      );

      const availableLocations = getAlphabeticallySortedArray(
        Object.keys(locationNameMapping)
      );
    
      return { availableLocations, locationNameMapping };
  }
  