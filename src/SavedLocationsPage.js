import React from "react";
import LocationList from "./LocationList";
import { useContext, useState, useEffect } from 'react';
import { ProfileContext } from "./ProfileContext";
import * as fxs from "./GPTFunctions";
import { getProfileLoader } from "./loaders";


export default function SavedLocations() {
    const { profiles, profile, setProfile, setProfiles} = useContext(ProfileContext);
    const [data , setData] = useState([])

    useEffect(() => {
        async function fetchData() {
          if(profile && profile.saved_locs) {
            try {
              const result = await fxs.getPlaceFromId(profile.saved_locs);
              console.log(result)
              setData(result);
            } catch(error) {
              console.error("Failed to fetch data:", error);
            }
          }
        }
        fetchData()
    },[profile])
    
    if(profile !== "") {
        return(
            <LocationList saved={true} locations={data}/>
        )
    } else {
        return (
            <h1>Please Log In</h1>
        )
    }


    
}