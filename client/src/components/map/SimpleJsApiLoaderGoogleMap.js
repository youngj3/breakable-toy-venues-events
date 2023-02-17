import React, { useEffect, useState } from "react"
import { Loader } from "@googlemaps/js-api-loader"
import geoCode from "./geoCode.js"

const SimpleJsApiLoaderGoogleMap = (props) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [location, setLocation] = useState(null);
  const apiKey = 'AIzaSyAfRs5ivkpcrV14qQL9I75Ve4gz3AaBpDM';
  
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const location = await geoCode(props.location);
        setLocation(location);
      } catch (error) {
        console.error(`error fetching location: ${error}`);
      }
    };
    
    if (location && !mapLoaded) {
      const loader = new Loader({
        apiKey,
        libraries: ["places"]
      });
      
      loader.load().then(() => {
        const map = new google.maps.Map(document.getElementById("map"), {
          center: location,
          zoom: 12,
        });
        
        new google.maps.Marker({
          position: location,
          map: map,
        });
        
        setMapLoaded(true);
      }).catch((error) => {
        console.error(`error loading map: ${error}`);
      });
    } else {
      fetchLocation();
    }
  }, [props.location, location, mapLoaded, apiKey]);
  
  return (
    <>
      <div id="map" style={{height:400}}></div>
    </>
  )
}
export default SimpleJsApiLoaderGoogleMap