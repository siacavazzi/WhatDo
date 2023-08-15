import React from 'react';
import keys from './apiKey'
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
const proxyUrl = "http://0.0.0.0:8080/"

const LocationCard = ({ location }) => {
    const [photo, setPhoto] = useState("")

    async function getPhoto() {
        const photoRef = location.result.photos[0].photo_reference
        const url = proxyUrl+`https://maps.googleapis.com/maps/api/place/photo?maxwidth=${1000}&photoreference=${photoRef}&key=${keys["google"]}`
        const response = await fetch(url)
        return response.blob();

    }
    async function setPhotoRef() {
        const img = await getPhoto();
        console.log(URL.createObjectURL(img))
        setPhoto(URL.createObjectURL(img))
    }

useEffect(() => setPhotoRef(),[])
let description = location.result.name
if(location.result.editorial_summary) {
    description = location.result.editorial_summary.overview;
}
console.log("PLACE ID:")
console.log(location.place_id)
const googleMapsUrl = `https://www.google.com/maps/place/?q=place_id:${location.place_id}`

    
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
            <LocationOnIcon />
            <Typography variant="body2" color="text.secondary" ml={1}>
              {'address'}
            </Typography>
          </Box>
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
    </Card>
  );

};

export default LocationCard;