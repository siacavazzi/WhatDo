import React from 'react';
import keys from './apiKey'
import { useState, useEffect, useContext } from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material';
import { ProfileContext } from './ProfileContext';

const proxyUrl = "http://0.0.0.0:8080/"

const LocationCard = ({ location , isSaved=false}) => {
    const [photo, setPhoto] = useState("")
    const { profiles, profile, setProfile, setProfiles} = useContext(ProfileContext);


    useEffect(() => {
        const setPhotoRef = async () => {
            try {
                const getPhoto = async () => {
                    const photoRef = location.result.photos[0].photo_reference;
                    const url = proxyUrl + `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${1000}&photoreference=${photoRef}&key=${keys["google"]}`;
                    const response = await fetch(url);
                    return response.blob();
                };
                const img = await getPhoto();
                console.log(URL.createObjectURL(img));
                setPhoto(URL.createObjectURL(img));
            } catch (e) {
                console.log(e);
                setPhoto("https://liftlearning.com/wp-content/uploads/2020/09/default-image.png");
            }
        };
    
        setPhotoRef();
    }, []);
    let description = location.result.name
    if (location.result.editorial_summary) {
        description = location.result.editorial_summary.overview;
    }
    console.log("PLACE ID:")
    console.log(location.place_id)
    const googleMapsUrl = `https://www.google.com/maps/place/?q=place_id:${location.place_id}`


    function saveLocation() {
        const newList = [...profile.saved_locs, location.place_id]
        const OPTIONS = {
            method: "PATCH", 
            headers: {
              "Accept":"application/json",
              "Content-Type":"application/json"
            },
            body: JSON.stringify({"saved_locs":newList})
        }
        fetch("http://localhost:3000/users/"+profile.id, OPTIONS)
        .then(resp => resp.json())
        .then(data => setProfile(data))
    }

    function deleteLocation() {
        const newList = profile.saved_locs.filter(loc => loc !== location.place_id)
        console.log("list")
        console.log(newList)
        const OPTIONS = {
            method: "PATCH", 
            headers: {
              "Accept":"application/json",
              "Content-Type":"application/json"
            },
            body: JSON.stringify({"saved_locs":newList})
        }
        fetch("http://localhost:3000/users/"+profile.id, OPTIONS)
        .then(resp => resp.json())
        .then(data => setProfile(data))

    }


    return (
        <Card style={{ width: 500, height: 400 }}>
            <CardActionArea component="a" href={googleMapsUrl} target="_blank">
                <CardMedia
                    component="img"
                    alt={location.result.name}
                    height="170"
                    image={photo}
                    title={location.result.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {location.result.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                    
                    <Box display="flex" alignItems="center" mt={2}>
                        <Rating
                            name="location-rating"
                            value={location.result.rating}
                            precision={0.5}
                            readOnly
                        />
                        <Typography variant="body2" color="text.secondary" ml={1}>
                            {location.result.rating}
                        </Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
            {isSaved ? <Button onClick={() => deleteLocation()}>Delete Location</Button> :<Button onClick={() => saveLocation()}>Save Location</Button>}
        </Card >
    );

};

export default LocationCard;