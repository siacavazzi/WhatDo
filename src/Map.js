import React from "react";
import GoogleMapReact from 'google-map-react';
import keys from "./apiKey"
import { useState } from "react";
//import MapMarker from "./MapMarker"



export default function SimpleMap({ lat , lon , pins , height}){
  const [places, setPlaces] = useState([])
  const defaultProps = {
    center: {
      lat: lat,
      lng: lon
    },
    zoom: 13
  };

  

  const myLatLng = { lat: lat, lng: lon };

  const handleApiLoaded = (map, maps) => {
    for(let pin of pins) {
        /// pin.id pin.lat pin.lon pin.name
        let marker = new maps.Marker({position:{lat: pin.lat, lng: pin.lon}, map,label:pin.name})
      }

    // new maps.Marker({
    //     position: myLatLng,
    //     map,
    //     title: "Hello World!",
    //   });
    // use map and maps objects
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: height, width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: keys["google"] }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
  
      </GoogleMapReact>
    </div>
  );
}