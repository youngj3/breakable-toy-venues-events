import React from "react"
import { Loader } from "@googlemaps/js-api-loader"

const SimpleJsApiLoaderGoogleMap = (props) => {

  const targetLocation = props.location
  const location = {
    lat: parseFloat(targetLocation.latitude),
    lng: parseFloat(targetLocation.longitude)
  }

  const loader = new Loader({
    apiKey: 'AIzaSyAfRs5ivkpcrV14qQL9I75Ve4gz3AaBpDM',
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
  })

  return (
    <>
      <div id="map" style={{height:400}}></div>
    </>
  )
}

export default SimpleJsApiLoaderGoogleMap