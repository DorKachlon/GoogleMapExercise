import React from "react";
import "../styles/NewTargetGui.css";
import Button from "@material-ui/core/Button";
export default function NewTargetGui({
    places,
    currentLocation,
    setCurrentLocation,
    setChosenLocation,
    setDistance

}) {
    const CreateNewTarget = () => {
        const random = Math.floor(Math.random() * (places.length - 1) + 1);
        setCurrentLocation(places[random]);
        setChosenLocation({});
        setDistance();
    };
    console.log(currentLocation);
    const GetType = (type) => {
        if (type.includes("מושבים")) {
            return "מושב";
        } else if (type.includes("ישובים")) {
            return "מושב";
        } else if (type.includes("קיבוצים")) {
            return "קיבוץ";
        } else if (type.includes("תושבים")) {
            return "עיר";
        }
    };
    return (
        <>
            <div className="targetContainer">
                {currentLocation && (
                    <div className="targetDetailsContainer">
                        <div>מיקום : {currentLocation.NAME}</div>
                        <div>סוג : {GetType(currentLocation.TYPE)}</div>
                    </div>
                )}
                <Button style={{ margin: "20px" }} variant="contained" onClick={CreateNewTarget}>
                    {currentLocation ? "Next" : "Get Start"}
                </Button>
            </div>
        </>
    );
}
