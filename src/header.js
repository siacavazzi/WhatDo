import React from 'react';
import Button from '@mui/material/Button';
import { Box, Typography, Paper } from '@mui/material';
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import Grid from '@mui/material/Grid';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { ProfileContext } from './ProfileContext';
import { Divider } from '@mui/material';


function Header() {
    const [expandedProfile, setExpandedProfile] = useState(false);
    const navigate = useNavigate()
    const context = useContext(ProfileContext);

    const profiles = context.profiles.profiles;
    console.log(profiles.profiles)
    const [value, setValue] = useState("");

         
    const handleChange = (event) => {
 
        console.log(event)
        context.setProfile(event.target.value);
      };

    return (
        <Grid container spacing={3} borderBottom="1px solid grey" background="#219ebc">
            {/* Left Component */}
            <Grid item xs={6}>

                <Typography onClick={() => navigate('/')} variant="h2">WhatDo 🤔</Typography>
                <Typography variant='h4'>For Indecisive People Everywhere</Typography>

            </Grid>

            {/* Right Component */}
            <Grid item xs={6}>
                <div>
                    <Button onClick={ () => navigate(`/new-profile`) }>Create New Profile</Button>
                    <Button onClick={ () => navigate(`/profile`) }>Edit Profile</Button>
                    <Button onClick={ () => navigate(`/saved-locs`) }>My Saved Locations</Button>
                    <Button onClick={ () => navigate(`/about`) }>About</Button>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="demo-simple-select-label">Choose Profile</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={context.profile}
                            onChange={(e) => handleChange(e)}
                            label="Choose Option"
                        >
                            {profiles.map((profile) => (
                                <MenuItem key={profile.id} value={profile}>
                                    {profile.profile.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

            </Grid>
            <Divider/>
        </Grid>
    );
}

export default Header;