import { OutputOutlined } from "@mui/icons-material";
import keys from "./apiKey"

/// get user data - for now we will just have variables
const proxyUrl = "http://0.0.0.0:8080/"



export const GetCurrentTime = () => {
    console.log("getting the time")
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, '0');  // get hours and ensure it's two digits
    const minutes = String(date.getMinutes()).padStart(2, '0');  // get minutes and ensure it's two digits
    return (hours + ":" + minutes)
}

export function getLocation(setLon, setLat, setAppState) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        console.log("Geolocation not supported");
    }

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        setLon(longitude);
        setLat(latitude);
        setAppState("default")
    }

    function error() {
        console.log("Unable to retrieve your location");
    }
}


export function doMath(a, b, operator) {
    switch (operator) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            return a / b;
        default:
            return "unexpected operator error"
    }
}

export function randomSplice(arr, length) {
    let newArr = [];
    let index;
    for (let i = 0; i < length; i++) {
        index = Math.floor(Math.random() * arr.length);
        newArr.push(arr.splice(index, 1)[0]);
    }
    return newArr;
}
//////////////////////////// GOOGLE QUERY CODE ///////////////////////////////////
export async function queryLocations(query, lat, lon, radius) {
    const OPTIONS = {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }


    const req = proxyUrl + `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&location=${lat} ${lon}&rankby=distance&openNow&reviews&key=${keys["google"]}`;

    try {
        let response = await fetch(req, OPTIONS);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        let data = await response.json();
        //// add return here
        //// return(data.results)
        if (data.results.length > 0) {
            //console.log(data.results)

            return getPlaces(data.results)
        }
    } catch (error) {
        console.error("Error fetching locations:", error);
        return [];
    }
}

export async function getPlaceFromId(places) {
    let output = [];
    const OPTIONS = {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }
    //console.log(places)

    for (let j = 0; j < places.length; j++) {
        let place = places[j];

        const req = proxyUrl + `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place}&fields=name%2Cgeometry%2Crating%2Cphotos%2Ceditorial_summary%2Cformatted_phone_number&key=${keys["google"]}`
        try {
            let response = await fetch(req, OPTIONS);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            let data = await response.json();
            data["place_id"] = place;
            output.push(data);


        } catch (e) {
            console.log(e);
            return [];

        }
    }
    return output;
}

export async function getPlaces(places, finalResult = false) {
    let output = [];
    const OPTIONS = {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }
    //console.log(places)

    for (let j = 0; j < places.length; j++) {
        let place = places[j];
        //console.log(j)
        let hasSummary = true;
        let hasReviews = true;
        // let placeCode =""

        // if(!finalResult) { placeCode = place.place_id} else {placeCode = place}
        // console.log(placeCode)

        const req = proxyUrl + `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=name%2Crating%2Creviews%2Ceditorial_summary%2Cformatted_phone_number&key=${keys["google"]}`
        try {
            let response = await fetch(req, OPTIONS);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            let data = await response.json();
            let revLoop = data.result.reviews.length
            let reviews = ""
            if (place.user_ratings_total > 0) {
                if (revLoop > 3) { revLoop = 3 }

                for (let i = 0; i < data.result.reviews.length; i++) {
                    let review = data.result.reviews[i];

                    let curReview = `Review #${i + 1}: Rating: ${review.rating}/5 Text: ${review.text} `
                    reviews = reviews + curReview;
                }
            } else {
                hasReviews = false;
                reviews = "no user reviews"
            }
            //// REMOVE THIS LATER!!!!!!!!!!!!!!!!!!!!!!!! HVEHVERV
            //reviews = ""
            /////////// REMOVE
            let summary = [];
            if (data?.result?.editorial_summary?.overview === undefined) {
                hasSummary = false
                summary = "summary not availible"

            } else {
                summary = data.result.editorial_summary.overview;
            }

            try {
                if (!hasReviews & !hasSummary) {
                    console.log("place failed")
                    //console.log(place)
                } else {
                    //console.log(data.result.name)
                    const out = `CODE: ${place.place_id} Location: ${data.result.name}, Categories: ${place.types}, Overall rating: ${data.result.rating}/5, Summary: ${summary}, User reviews: ${reviews} `
                    //console.log(out)
                    output.push(out)

                }
            } catch (e) {
                console.log(e)
            }
        } catch (error) {
            console.log(place)
            console.error("Error fetching location:", error);
        }

    }
    //console.log(output)
    return output;
}

//////////////////////////// GOOGLE QUERY CODE ///////////////////////////////////


export async function getWeather(lat, lon) {
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${keys["weather"]}`)
        let data = await response.json();
        return `${data.weather[0].description} temp:${data.main.temp - 273.15}C humidity: ${data.main.humidity}`
    } catch (error) {
        console.log(error)
    }

}

