import React from 'react';
import { useState, useEffect, useContext} from 'react';
import { Button, ButtonGroup, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { ProfileContext } from './ProfileContext';

export default function CreateProfile() {
    const [dietaryRestrictions, setDietaryRestrictions] = useState("");
    const [foodPreferences, setFoodPreferences] = useState("");
    const [drinkPreferences, setDrinkPreferences] = useState("");
    const [generalPreferences, setGeneralPreferences] = useState("")
    const [name, setName] = useState("")
    const navigate = useNavigate();
    const { profiles, profile, setProfile, setProfiles} = useContext(ProfileContext);
    function handleData(data) {
        setProfiles({"profiles":[...profiles.profiles, data]})
        
        
        navigate("/");
    }

    async function handleSubmit(e) {
        console.log(e)
        const profile = {
            "name":name,
            "dietary_restrictions":dietaryRestrictions,
            "food_preferences":foodPreferences,
            "drink_preferences":drinkPreferences,
            "general_preferences":generalPreferences
        }
        const OPTIONS = {
            method: "POST", 
            headers: {
              "Accept":"application/json",
              "Content-Type":"application/json"
            },
            body: JSON.stringify({profile})
        }
        fetch("http://localhost:3000/users", OPTIONS)
        .then(resp => resp.json())
        .then(data => handleData(data))
        

        console.log(profile)
    }


    return (
        <Box>
            <TextField size="large" value={name} onChange={(e) => setName(e.target.value)}
          id="standard-multiline-flexible"
          label="Name"
          multiline
          rows={1}
          variant="filled"
        />
            <TextField fullWidth size="large" value={dietaryRestrictions} onChange={(e) => setDietaryRestrictions(e.target.value)}
          id="standard-multiline-flexible"
          label="Dietary Restrictions"
          multiline
          rows={4}
          variant="filled"
        />
        <TextField fullWidth size="large" value={foodPreferences} onChange={(e) => setFoodPreferences(e.target.value)}
          id="standard-multiline-flexible"
          label="Food Preferences"
          multiline
          rows={4}
          variant="filled"
        />
        <TextField fullWidth size="large" value={drinkPreferences} onChange={(e) => setDrinkPreferences(e.target.value)}
          id="standard-multiline-flexible"
          label="Drink Preferences"
          multiline
          rows={4}
          variant="filled"
        />
        <TextField fullWidth size="large" value={generalPreferences} onChange={(e) => setGeneralPreferences(e.target.value)}
          id="standard-multiline-flexible"
          label="Activity Preferences"
          multiline
          rows={4}
          variant="filled"
        />
        <Button onClick={(e)=>handleSubmit(e)}>Submit</Button>
        </Box>
    )
}