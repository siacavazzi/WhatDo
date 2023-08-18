import React from 'react';
import { useState } from 'react';
import { Button, ButtonGroup, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const StyledButtonGroup = styled(ButtonGroup)`
  & .MuiButton-root {
    font-size: 1.5rem; // Adjust the font size as needed
    padding: 30px 50px; // Increase padding to make the button bigger
  }
`;

const RestaurantButton = styled(Button)`
  color: #000000; // Your desired color for the Restaurants button
  background: #2A9D8F
`;

const BarsButton = styled(Button)`
color: #000000;
  background: #E9C46A; // Your desired color for the Bars button
`;

const ActivitiesButton = styled(Button)`
color: #000000;
  background: #F4A261; // Your desired color for the Activities button
`;

const CustomButton = styled(Button)`
color: #000000;
  background: #E76F51; // Your desired color for the Activities button
`;

const SettingsBox = styled(Box)({
    backgroundColor: '#f0f0f0', // Light gray background
    padding: '16px',
  });

export default function Selector({ makeSelection , radius , setRadius,  numResults , setNumResults , setNearbySearch , nearbySearch}) {
    const [displayCustom, setDisplayCustom] = useState(false);
    const [formInput, setFormInput] = useState("")
    
    //const [numResults, setNumResults] = useState()
    if(!displayCustom) {
    return (
        <Box display="flex" justifyContent="flex-start" flexDirection="row" alignItems="center" gap={2} p={2}>
            <SettingsBox>
            <FormControl variant="outlined" style={{ width: '200px', height: '50px' }}>
                        <InputLabel id="demo-simple-select-label">Search Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Choose Option"
                            value={nearbySearch}
                            onChange={((e) => setNearbySearch(e.target.value))}
                        >
                                <MenuItem value={true}>Nearby Search</MenuItem>
                                <MenuItem value={false}>Detailed Search</MenuItem>
                            
                        </Select>
                    </FormControl>
                    </SettingsBox>
        
        <Box flexGrow={1} display="flex" justifyContent="center">
          <StyledButtonGroup size="large" aria-label="large button group">
            <RestaurantButton onClick={() => makeSelection("restaurants")} color="secondary">Restaurants 🍔</RestaurantButton>
            <BarsButton onClick={() => makeSelection("bars")}>Bars 🍻</BarsButton>
            <ActivitiesButton onClick={() => makeSelection("activities")}>Activities 🎲</ActivitiesButton>
            <CustomButton onClick={() => setDisplayCustom(true)}>Custom 😵‍💫</CustomButton>
          </StyledButtonGroup>

         
        </Box>
        
        </Box>
    );
    } else {
        return (
            <div>
                <TextField fullWidth size="large" value={formInput} onChange={(e) => setFormInput(e.target.value)}
          id="standard-multiline-flexible"
          label="Custom Search"
          multiline
          rows={1}
          variant="filled"
        />
        <Button onClick={() => makeSelection(formInput)}>Search</Button>
        <Button onClick={() => setDisplayCustom(false)}>Back To Main Menu</Button>
            </div>
        )
            
        
    }
}


