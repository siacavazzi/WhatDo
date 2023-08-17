import React from "react";
import GoogleMapReact from 'google-map-react';
import keys from "./apiKey"

//import MapMarker from "./MapMarker"



export default function SimpleMap({ lat , lon , pins , radius ,height}){

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
      
    new maps.Marker({
        position: myLatLng,
        map,
        title: "Hello World!",
        icon: {
        url: "https://png.pngtree.com/png-vector/20230201/ourmid/pngtree-map-pin-icon-with-you-are-here-png-image_6582049.png",
        scaledSize: new maps.Size(100, 100),
    }
      });
  };

 
    // Important! Always set the container height explicitly
    return (
    <div style={{ height: height, width: '100%' }}>
        
      <GoogleMapReact
        bootstrapURLKeys={{ key: keys["google"] }}
        center={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
  
      </GoogleMapReact>
    </div>
  );
    

}