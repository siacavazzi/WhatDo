import React from 'react';
import { useState } from 'react';
import { Button, ButtonGroup, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

const StyledButtonGroup = styled(ButtonGroup)`
  & .MuiButton-root {
    font-size: 1.5rem; // Adjust the font size as needed
    padding: 30px 50px; // Increase padding to make the button bigger
  }
`;

const RestaurantButton = styled(Button)`
  color: #f00; // Your desired color for the Restaurants button
`;

const BarsButton = styled(Button)`
  color: #0f0; // Your desired color for the Bars button
`;

const ActivitiesButton = styled(Button)`
  color: #00f; // Your desired color for the Activities button
`;

const CustomButton = styled(Button)`
  color: #00f; // Your desired color for the Activities button
`;

const SettingsBox = styled(Box)({
    backgroundColor: '#f0f0f0', // Light gray background
    padding: '16px',
  });

export default function Selector({ makeSelection , radius , setRadius,  numResults , setNumResults}) {
    //const [radius, setRadius] = useState();
    //const [numResults, setNumResults] = useState()
    return (
        <Box display="flex" justifyContent="flex-start" flexDirection="row" alignItems="center" gap={2} p={2}>
        
        <Box flexGrow={1} display="flex" justifyContent="center">
          <StyledButtonGroup size="large" aria-label="large button group">
            <RestaurantButton onClick={() => makeSelection("restaurants")} color="secondary">Restaurants</RestaurantButton>
            <BarsButton onClick={() => makeSelection("bars")}>Bars</BarsButton>
            <ActivitiesButton onClick={() => makeSelection("activities")}>Activities</ActivitiesButton>
            <CustomButton>Custom</CustomButton>
          </StyledButtonGroup>
        </Box>
        </Box>
    );
}


