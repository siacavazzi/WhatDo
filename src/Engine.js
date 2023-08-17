
import GPTResponse from "./GPTContainer.js"
import './App.css';
import * as fxs from "./GPTFunctions";

//const preferences = ["scenic spots", "nature reserves", "abandoned places", "aerospace", "aviation", "astronomy"]
//const food_preferences = "Mexican, Donuts, Brewery, Steakhouse, Pizza, Japanese, Thai, Moroccan, Indian, Bagel Shop, Fondue, Mexican Grill, Turkish, and Korean BBQ."
let numSearches;
//const searchItem = "restaurants"




async function runEngine(setLoadingState, selection, lat, lon, radius, numResults, food_preferences, drink_preferences, dietaryRestrictions, preferences) {
  numSearches = numResults;
  setLoadingState("Step 1/5: Getting Weather and Time Recommendation... ⛈️")
  console.log(selection)

  const weather = await fxs.getWeather(lat, lon);
  console.log(weather)
  const currentTime = fxs.GetCurrentTime();

  const weatherRecommendation = await identifyWeather(weather, currentTime)
  setLoadingState("Step 2/5: Generating Search Strings... 💬")
  const searchStrings = await getSearchStrings(weatherRecommendation, selection);
  console.log(searchStrings);
  setLoadingState("Step 3/5: Searching For Places... 🔎")
  const placesInfo = await getPlaceDetails(searchStrings, lat, lon, radius);
  const resolvedPlaces = await Promise.all(placesInfo);
  console.log(resolvedPlaces)
  setLoadingState("Step 4/5: Reading Reviews and Place Details... 🤖📖")
  const summaryDetailsPromises = await summarizeDetails(resolvedPlaces, 5)
  const summaryDetails = await Promise.all(summaryDetailsPromises)

  console.log(summaryDetails)
  setLoadingState("Step 5/5: Making Final Recomendations... 🤔")
  const finalDecision = await recommendLocations(summaryDetails, weather, selection, currentTime);
  console.log(finalDecision)
  return finalDecision;





  async function recommendLocations(locations, weather, selection, currentTime) {
    let formattedLocations = "";
    for (let location of locations) {
      formattedLocations = formattedLocations + location.content + "\n";
    }
    let conditionalStatement;
    let searchType;
    switch (selection) {
      case "restaurants":
        conditionalStatement = `dietary preferences: ${food_preferences}. The user also has the following dietary restrictions: ${dietaryRestrictions}. Make sure to recommend restaruants compatible with these restrictions and avoid recommending chain restaurants.`
        searchType = "restaurants"
        break;
      case "bars":
        conditionalStatement = `drink preferences: ${drink_preferences}. Do not overly rely on these preferences in your decision.`
        searchType = "bars"
      case "activites":
        conditionalStatement = `activity preferences: ${preferences}. Do not overly rely on these preferences in your decision.`
        searchType = "activities"
      default:
        conditionalStatement = `activity preferences: ${preferences} \n drink preferences: ${drink_preferences} \n dietary preferences: ${food_preferences}.`
        searchType = selection;

    }

    const gptInput = {
      "role": "system",
      "content": `Choose ${numSearches} diverse ${searchType} appropriate for a user with the following ${conditionalStatement}. \n Prioritize ${searchType} with the highest ratings and the most diversity. Try not to suggest similar locations. \n Locations: \n ${formattedLocations} \n
      Remember to choose ${numSearches} locations and respond with a comma seperated list of the chosen location codes and no other text. Do not modify the codes in any way.`
    };
    //console.log(formattedLocations);

    const response = await GPTResponse(gptInput, 0.5);
    return response.content;
  }



  //filter locations, then use GPT to summarize them
  async function summarizeDetails(placeSearches, limit) {
    let GPTsummaries = [];
    let j = 0;
    
    for (let search of placeSearches) {
      let loopStop = 0
      try {
      if (search.length > limit) {
        search = search.slice(0, limit)
      }
    } catch (e) {
      console.log("no results returned")
      search = ["no locations were found"];
    }

      let locationsFromSearch = ""
      // create GPT response promises
      for (let i = 0; i < search.length; i++) {
        locationsFromSearch = locationsFromSearch + search[i] + "\n \n"
      }
      const gptInput = {
        "role": "system",
        "content": `Provide 5 sentence summaries for the following locations. Please include the place code, name, and overall rating at the start of each summary. Cater the summaries to someone with the interests ${preferences}\n: 
          ${locationsFromSearch} \n Please include the place code, name, and overall rating at the start of each summary.`
      };
      GPTsummaries.push(GPTResponse(gptInput));
    }
    return GPTsummaries;
  }

  /// call getSearchStrings then get details of search results
  async function getPlaceDetails(response, lat, lon, radius) {
    let responses = [];
    try {
      console.log(response)
      let searches = response.split(",")
      console.log(searches)
      if (searches.length > numSearches) {
        searches = fxs.randomSplice(searches, numSearches);
      }
      let outputLocations = [];
      for (let search of searches) {
        console.log(search);

        responses.push(fxs.queryLocations(search, lat, lon, radius));
      }
      console.log("ALL RESPONSES:::")
      // call next fx
      return responses;

    } catch (e) {
      console.log(e)
    }

  }

  function getMeal() {
    let now = new Date();
    let hour = now.getHours();

    if (hour >= 5 && hour < 11) {
      return 'Breakfast';
    } else if (hour >= 11 && hour < 15) {
      return 'Lunch';
    } else if (hour >= 15 && hour < 17) {
      return 'Snack';
    } else if (hour >= 17 && hour < 22) {
      return 'Dinner';
    } else {
      return 'Late Night Snack';
    }
  }

  async function identifyWeather(weather, currentTime) {
    try {
      const gptInput = {
        "role": "system",
        "content": `Given the current weather: ${weather} and current time: ${currentTime} respond with a short recommendation for types of activities or types of restaurants to visit. For example if the weather is bad, your suggestion should be for indoor activities or indoor restaurants. Keep your suggestion short.`
      };
      const response = await GPTResponse(gptInput, 0.3);
      console.log(response.content)
      return response.content;
    } catch (e) {
      console.log(e)
    }
  }


  async function getSearchStrings(conditionRecommendation, selection) {
    try {
      let conditionalDirective = ""
      let userContext = ""
      switch (selection) {
        case "restaurants":
          conditionalDirective = `Create a comma separated list of ${numSearches} search strings for places to get ${getMeal()}. Do not search for takeout or delivery. Do not overly rely on user likes. Do not include location. Only return a comma seperated list of places to get ${getMeal()} and no other text. Please remember to keep the list comma seperated.`
          userContext = `Food preferences: ${food_preferences}`;
          break;
        case "bars":
          conditionalDirective = `Create a comma separated list of ${numSearches} search strings for bars and nightlife activities. Do not suggest restaurants and do not overly rely on user likes. Please remember to keep the list comma seperated.`
          userContext = `Drink preferences: ${drink_preferences}`
          break;
        case "activities":
          conditionalDirective = `Create a comma separated list of ${numSearches} search strings for fun activities. Do not suggest bars, cafes or restaurants. Do not overly rely on the user preferences, they would prefer you suggest them new things. Only return a comma seperated list and no other text. Please remember to keep the list comma seperated.`
          userContext = `Activity preferences: ${preferences}`
          break;
        default:
          conditionalDirective = `Create a comma separated list of ${numSearches} search strings for ${selection}.`
          userContext = `Activity preferences: ${preferences} \n Food preferences: ${food_preferences} \n Drink preferences: ${drink_preferences}`

      }

      let content = `
        User Information:
        - ${userContext}

        Suggestion for ${selection} given the current time and weather: ${conditionRecommendation}. Please utilize this suggestion, the weather plays a significant role here.
        
        
        ${conditionalDirective}`

      const gptInput = {
        "role": "system",
        "content": content
      };
      console.log(gptInput)
      const response = await GPTResponse(gptInput, 0.5);
      return response.content
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

}
export default runEngine;
