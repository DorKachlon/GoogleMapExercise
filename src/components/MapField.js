import React, { useState } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker, Circle } from "google-maps-react";
import mapStyles from "../mapStyle.js";
import mapStylesLite from "../mapStyleLite.js";
import API_KEY from "../apiKey";
function MapField({ google, currentLocation, chosenLocation, setChosenLocation, darkMode }) {
    const [showCorrectLocation, setShowCorrectLocation] = useState(false);
    const defaultCenterTLV = {
        lng: 34.7773256565267,
        lat: 31.379111742506,
    };

    const mapSize = {
        width: "100%",
        height: "100%",
    };

    const _mapLoaded = (mapProps, map) => {
        map.setOptions(darkMode ? { styles: mapStyles } : { styles: mapStylesLite });
    };

    return (
        <Map
            google={google}
            zoom={7.4}
            style={mapSize}
            initialCenter={defaultCenterTLV}
            fullscreenControl={false}
            streetViewControl={false}
            mapTypeControl={false}
            onReady={(mapProps, map) => {
                _mapLoaded(mapProps, map);
            }}
            onClick={(e, b, c) => {
                if (!showCorrectLocation) {
                    setChosenLocation({
                        lat: c.latLng.lat(),
                        lng: c.latLng.lng(),
                    });
                }
            }}
        >
            <Marker position={chosenLocation} />
            {!!Object.keys(chosenLocation).length && (
                <Marker
                    icon={{
                        url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                    }}
                    position={{
                        lat: currentLocation.location.lat,
                        lng: currentLocation.location.lng,
                    }}
                />
            )}
        </Map>
    );
}

export default GoogleApiWrapper({ apiKey: API_KEY })(MapField);
