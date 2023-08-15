import ChatBar from "./chatBar.js";
import { useState, useEffect } from 'react';
import MessageContainer from './messageContainer.js'
import GPTResponse from "./GPTContainer.js"
import './App.css';
import { Box } from '@mui/material';
import Header from "./header.js"
import * as fxs from "./GPTFunctions";

const preferences = ["scenic spots", "nature reserves", "abandoned places", "aerospace", "aviation", "astronomy"]
const food_preferences ="Mexican, Donuts, Brewery, Steakhouse, Pizza, Japanese, Thai, Moroccan, Indian, Bagel Shop, Fondue, Mexican Grill, Turkish, and Korean BBQ."
const numSearches = 3;
const searchItem = "restaurants"
const dietaryRestrictions = "none"



   async function runEngine(selection) {
    console.log(selection)

    const weather = await "clear 72F"///fxs.getWeather();
    const currentTime = fxs.GetCurrentTime();
    
    const weatherRecommendation = await identifyWeather(weather, currentTime)

    const searchStrings = await getSearchStrings(weatherRecommendation, selection);
    console.log(searchStrings);
    
    const placesInfo = await getPlaceDetails(searchStrings);
    const resolvedPlaces = await Promise.all(placesInfo);
    console.log(resolvedPlaces)
    const summaryDetailsPromises = await summarizeDetails(resolvedPlaces, 5)
    const summaryDetails = await Promise.all(summaryDetailsPromises)

    console.log(summaryDetails)
    const finalDecision = await recommendLocations(summaryDetails, weather, searchItem, currentTime);
    console.log("HERE IT IS....")
    console.log(finalDecision)
    return finalDecision;

  }

  

  async function recommendLocations(locations, weather, searchItem, currentTime) {
    let formattedLocations ="";
    for(let location of locations) {
      formattedLocations = formattedLocations + location.content + "\n";
    }

    const gptInput = {
      "role":"system", 
      "content":`Choose ${numSearches} diverse locations appropriate for a user with the following preferences: ${preferences}. \n Prioritize locations with the highest ratings and the most diversity. \n Locations: \n ${formattedLocations} \n
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
    for(let search of placeSearches) {
      let loopStop = 0
      if(search.length > limit) {
        search = fxs.randomSplice(search, limit);
      }

      let locationsFromSearch = ""
        // create GPT response promises
        for(let i=0;i<search.length; i++) {
          locationsFromSearch = locationsFromSearch + search[i] + "\n \n"
        }
        const gptInput = {
          "role":"system", 
          "content":`Provide 5 sentence summaries for the following locations. Please include the place code, name, and overall rating at the start of each summary. Cater the summaries to someone with the interests ${preferences}\n: 
          ${locationsFromSearch} \n Please include the place code, name, and overall rating at the start of each summary.`
      };
      GPTsummaries.push(GPTResponse(gptInput));     
    }
    return GPTsummaries;
  }

  /// call getSearchStrings then get details of search results
    async function getPlaceDetails(response) {
      let responses = [];
      try {
        console.log(response)
        let searches = response.split(",")
        console.log(searches)
        if(searches.length > numSearches) {
          searches = fxs.randomSplice(searches, numSearches);
        }
        let outputLocations = [];
        for(let search of searches) {
          console.log(search);

          responses.push(fxs.queryLocations(search));
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
      return "Breakfast"
  
      if (hour >= 5 && hour < 11) {
          return 'Breakfast';
      } else if (hour >= 11 && hour < 15) {
          return 'Lunch';
      } else if (hour >= 15 && hour < 18) {
          return 'Snack';
      } else if (hour >= 18 && hour < 22) {
          return 'Dinner';
      } else {
          return 'Late Night Snack';
      }
  }

  async function identifyWeather(weather, currentTime) {
    try {
      const gptInput = {
        "role":"system", 
        "content":`Given the current weather: ${weather} and current time: ${currentTime} respond with a short recommendation for types of activities or types of restaurants to visit. For example if the weather is bad, your suggestion should be for indoor activities or indoor restaurants. Keep your suggestion short.`
    };
    const response = await GPTResponse(gptInput, 0.3);
    console.log(response.content)
    return response.content;
    } catch(e) {
      console.log(e)
    }
  }


    async function getSearchStrings(conditionRecommendation, searchItem) {
      try {
        let conditionalDirective = ""
        switch(searchItem) {
          case "restaurants":
            conditionalDirective = `Create a comma separated list of ${numSearches} search strings for places to get ${getMeal()} .Do not search for takeout or delivery. Do not overly rely on user likes. Only return a comma seperated list and no other text.`
            break;
          case "bars":
            conditionalDirective = `Create a comma separated list of ${numSearches} search strings for bars and nightlife activities. Do not suggest restaurants and do not overly rely on user likes`
            break;
          case "activities":
            conditionalDirective = `Create a comma separated list of ${numSearches} search strings for fun activities. Do not suggest bars. Do not overly rely on the user preferences, they would prefer you suggest them new things. Only return a comma seperated list and no other text.`
            break;

        }

        let content = `
        User Information:
        - Dietary Restrictions: ${dietaryRestrictions}
        - Likes: ${preferences} Do not overly rely on Likes. 

        Suggestion for activities given the current time and weather: ${conditionRecommendation}
        
        
        ${conditionalDirective}`

        const gptInput = {
          "role":"system", 
          "content":content
      };
      console.log(gptInput)
        const response = await GPTResponse(gptInput, 0.7);
        return response.content
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }


export default runEngine;
