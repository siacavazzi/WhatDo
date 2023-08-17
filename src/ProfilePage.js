import React from 'react';
import { useState, useContext } from 'react';
import { Button, ButtonGroup, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { ProfileContext } from './ProfileContext';
import { useNavigate } from 'react-router-dom';
let firstRender = true

export function ProfilePage() {
    const {profile, setProfile, profiles, setProfiles}= useContext(ProfileContext);
    const [dietaryRestrictions, setDietaryRestrictions] = useState("");
    const [foodPreferences, setFoodPreferences] = useState("");
    const [drinkPreferences, setDrinkPreferences] = useState("");
    const [generalPreferences, setGeneralPreferences] = useState("")
    const navigate = useNavigate();
    


    if(profile === "") {
        firstRender = true;
        return(<h1>Select Profile To Edit</h1>)
        
    } else {

        if(firstRender) {
            console.log("what")
        firstRender = false;
        setDietaryRestrictions(profile.profile.dietary_restrictions);
        setFoodPreferences(profile.profile.food_preferences);
        setDrinkPreferences(profile.profile.drink_preferences);
        setGeneralPreferences(profile.profile.general_preferences);
        }
    }
    function handleEdit() {
        navigate("/");
        window.location.reload();
    }
    
    console.log(profile.profile.dietary_restrictions)
    async function handleSubmit(e) {
       
            console.log(e)
            const new_profile = {
                "name":profile.profile.name,
                "dietary_restrictions":dietaryRestrictions,
                "food_preferences":foodPreferences,
                "drink_preferences":drinkPreferences,
                "general_preferences":generalPreferences
            }
            const OPTIONS = {
                method: "PATCH", 
                headers: {
                  "Accept":"application/json",
                  "Content-Type":"application/json"
                },
                body: JSON.stringify({"profile":new_profile})
            }
            fetch("http://localhost:3000/users/"+profile.id, OPTIONS)
            .then(resp => resp.json())
            .then(data => handleEdit())
            
    
            console.log(profile)
        
    }


    return (
        <Box>
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