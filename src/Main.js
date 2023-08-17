import LocationList from "./LocationList"
import runEngine from "./Engine"
import * as fxs from "./GPTFunctions"
import Map from "./Map"
import Header from "./header"
import Selector from "./Selector";
import { useEffect, useState, useContext } from 'react';
import LoadingScreen from "./loadingScreen";
import { ProfileContext } from "./ProfileContext"
import { Button, ButtonGroup, Box } from '@mui/material';


let lat = 0;

let lon = 0;

let outputLocations = [];

let mapPins = [];

function Main() {
    const [appState, setAppState] = useState("loading");
    const [pins, setPins] = useState([]);
    const [displayedLocations, setDisplayedLocations] = useState([]);
    const [lat, setLat] = useState(0);
    const [lon, setLon] = useState(0);
    const [radius , setRadius] = useState(1000)
    const [numResults, setNumResults] = useState(6)
    const [loadingState, setLoadingState] = useState("");
    const context = useContext(ProfileContext);
    const profile = context.profile
    let preferences;
    let food_preferences;
    let drink_preferences;
    let general_preferences;
    let dietary_restrictions;
    console.log(profile)
    
    let loggedIn = false;
   

    function setUserLocation() {
        fxs.getLocation(setLon, setLat, setAppState);
    }

    
    
    
    function addMarker(marker) {
        console.log("placegolde")
    }

    async function makeSelection(selection) {
        
        setAppState("loading")
        console.log(selection)
        const output = await runEngine(setLoadingState ,selection , lat , lon , radius , numResults, food_preferences, drink_preferences, dietary_restrictions, general_preferences)
        // vv problem child
        displayLocations(output)
    }
    console.log(profile)

    async function displayLocations(locations) {
        console.log("test")
        
        let locPins = [];
        
        console.log(locations)
        const locationArr = locations.split(",")
        for(let i=0;i<locationArr.length;i++) {
            locationArr[i] = locationArr[i].replace(" ","")
        }
        const data = await fxs.getPlaceFromId(locationArr)
        console.log(data)
        for(let place of data) {
            try {
            console.log(place.result.geometry.location)
            locPins.push({ name: place.result.name, id: 1, lat: place.result.geometry.location.lat, lon: place.result.geometry.location.lng })
            outputLocations.push(place)
            } catch(e) {
                console.log(e)
            }
        }
        setAppState("finished");
        setDisplayedLocations(outputLocations)
        mapPins = locPins;
        

        
    }
    useEffect(() => setUserLocation(),[])
    useEffect(()=> setPins(mapPins), [mapPins]);
    if(profile !== "") {
        loggedIn = true;
        console.log("profile:")
        console.log(profile)
        food_preferences = profile.profile.food_preferences;
        drink_preferences = profile.profile.drink_preferences;
        dietary_restrictions = profile.profile.dietary_restrictions;
        general_preferences = profile.profile.general_preferences;
        console.log(food_preferences)
    }

    //useEffect(() => setTimeout(() => mapPins = testPins, 1000),[])

    //mapPins = testPins

    if(appState === "default") {
    return(
        
        <div>
        <Map pins={pins} lat={lat} lon={lon} radius={radius} height={"70vh"}/>
        {loggedIn ? <Selector makeSelection={makeSelection} radius={radius} setRadius={setRadius} numResults={numResults} setNumResults={setNumResults}/> :<h1>Please Select or Create a Profile to Continue</h1>}
        </div>
        
    )
    } else if(appState === "loading") {
        return(
            <div>
            <LoadingScreen loadingState={loadingState}/>
            
            </div>
        )
    } else if(appState === "finished") {
        return (
            <div>
            <Map pins={pins} lat={lat} lon={lon} height={"40vh"}/>
            <LocationList locations={displayedLocations}/>
            <Button onClick={() => window.location.reload()}>Go Back to Main Page</Button>
            </div>

        )

    }
}

export default Main;