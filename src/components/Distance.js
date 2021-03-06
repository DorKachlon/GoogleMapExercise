import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "../styles/Distance.css";
export default function Distance({ chosenLocation, currentLocation, distance, setDistance }) {
    function haversine_distance(mk1, mk2) {
        var R = 3958.8; // Radius of the Earth in miles
        var rlat1 = mk1.lat * (Math.PI / 180); // Convert degrees to radians
        var rlat2 = mk2.location.lat * (Math.PI / 180); // Convert degrees to radians
        var difflat = rlat2 - rlat1; // Radian difference (latitudes)
        var difflon = (mk2.location.lng - mk1.lng) * (Math.PI / 180); // Radian difference (longitudes)

        var d =
            2 *
            R *
            Math.asin(
                Math.sqrt(
                    Math.sin(difflat / 2) * Math.sin(difflat / 2) +
                        Math.cos(rlat1) *
                            Math.cos(rlat2) *
                            Math.sin(difflon / 2) *
                            Math.sin(difflon / 2)
                )
            );
        return Math.round(d);
    }
    useEffect(() => {
        if (distance < 16) {
            Swal.fire({
                icon: "success",
                title: "כל הכבוד !",
                text: `קמ ${distance} המרחק בין המיקומים הינו `,
            });
        }
    }, [distance]);
    useEffect(() => {
        if (!!Object.keys(chosenLocation).length && !!Object.keys(currentLocation).length) {
            setDistance(haversine_distance(chosenLocation, currentLocation));
        }
    }, [chosenLocation, currentLocation]);
    return (
        <>
            <div
                style={
                    distance < 16
                        ? { backgroundColor: "green" }
                        : distance
                        ? { backgroundColor: "red" }
                        : {}
                }
                className="distanceContainer"
            >
                The distance is {distance}
            </div>
        </>
    );
}
