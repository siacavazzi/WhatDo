import {useState, useEffect } from 'react';
import Loader, { TailSpin } from "react-loader-spinner";
import { styled } from '@mui/material/styles';

const loadingMessages = [
    "Fetching the fun... 🎈",
    "Cooking up some cool spots... 🍳",
    "Rounding up the best vibes... 🎵",
    "Hang tight, adventure incoming... 🚀",
    "Searching high and low... 🌍",
    "Rolling the magic dice... 🎲",
    "Tuning into the universe's recommendations... 🌌",
    "Whispering to the clouds for a hint... ☁️",
    "Turning on our vibe radar... 📡",
    "Asking the stars for their top picks... ⭐",
    "Diving deep into the city's secrets... 🌆",
    "Waking up our wizards for some magic... 🪄",
    "Consulting with the food and fun fairies... 🧚",
    "Time-traveling for the best recommendations... ⏳",
    "Unfolding the city's treasure map... 🗺️",
    "Listening to the whispers of the wind... 🍃",
    "Deciphering the dance of the leaves... 🍂",
    "Channeling our inner foodie spirit... 🍔",
    "Cruising on the vibe wave... 🌊",
    "Dusting off our crystal ball for some clarity... 🔮",
    "Gathering the city's hidden gems... 💎",
    "Riding the recommendation rocket... 🚀",
    "Stirring up some sensational spots... 🍜",
    "Dreaming of delightful destinations... 🌙",
    "Beaming up the best bites... 🍩",
    "Catching the coolest currents... 🎏",
    "Swinging through the city's secrets... 🌳",
    "Surfing the suggestion surf... 🏄",
    "Digging for dining diamonds... ⛏️",
    "Casting our culinary net... 🎣",
    "Chasing the choicest chill spots... 🏃",
    "Flipping through the fun files... 📂",
    "Plotting the perfect path... 📍",
    "Juggling juicy joints... 🍇",
    "Baking the best bucket list... 🥖",
    "Summoning the suggestion spirits... 👻",
    "Mixing up a mood masterpiece... 🎨",
    "Hunting for the hottest hangouts... 🔥",
    "Sculpting the supreme suggestions... 🗿",
    "Combing the city's coolest corners... 🌃",
    "Peeking into playful places... 🎭",
    "Dialing up the delight... 📞",
    "Fetching the freshest fun... 🌱",
    "Zooming into the zest zones... 🚗",
    "Leaping into lively locales... 🦘",
    "Whirling through wondrous waypoints... 🌪️",
    "Picking the prime places... 🍀",
    "Steering towards the sublime spots... 🚤",
    "Vibing with the venue visionaries... 🎧",
    "Gearing up for a grand getaway... 🎡"
];



export default function LoadingScreen({ loadingState }) {
    const [loadingMessage, setLoadingMessage] = useState("Loading...");

   


    const OuterContainer = styled('div')`
    display: flex;
    justify-content: center;
    padding: 20px;
    height: height;
`;

    const CenteredContainer = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 60vh; // Take the full viewport height
    width: 80vh;
    background-color: lightblue;
    border-radius: 15px; // Rounded corners
    padding: 20px;
`;


    return (
        <OuterContainer>
        <CenteredContainer>
        <h1>{loadingState}</h1>
        <TailSpin/>
        </CenteredContainer>
        </OuterContainer>
    );
}




