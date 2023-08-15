import React from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { styled } from '@mui/material/styles';

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

const CenteredContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh; // This takes the full height of the viewport
`;

export default function Selector({ makeSelection }) {
    return (
        <CenteredContainer>
        <StyledButtonGroup size="large" aria-label="large button group">
            <RestaurantButton onClick={() => makeSelection("restaurants")} color="secondary">Restaurants</RestaurantButton>
            <BarsButton onClick={() => makeSelection("bar")}>Bars</BarsButton>
            <ActivitiesButton onClick={() => makeSelection("activities")}>Activities</ActivitiesButton>
        </StyledButtonGroup>
        </CenteredContainer>
    );
}
