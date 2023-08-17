import LocationCard from './Location';
import Grid from '@mui/material/Grid';


export default function LocationList({ locations , saved=false}) {
    console.log(locations)
    return (
        <Grid container spacing={2}>
    {locations.map(location => (
    <Grid item xs={12} sm={6} md={6} lg={4} key={location.result.name}>
         <LocationCard isSaved={saved} location={location}/>
         </Grid>
         ))}
    </Grid>
    )
}