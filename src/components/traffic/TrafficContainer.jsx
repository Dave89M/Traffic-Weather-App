import React from "react";
import TrafficImages from "./TrafficImages";
import Loader from "../loader/Loader"

const TrafficContainer = ({
  isLoading,
  locationNameMapping,
  selectedLocation,
}) => (
  <>
    {isLoading ? (
       <Loader/>
    ) : (
      <TrafficImages
        images={locationNameMapping[selectedLocation]?.images}
        location={selectedLocation}
      />
    )}
  </>
);

export default TrafficContainer;
