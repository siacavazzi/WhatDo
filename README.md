
### How to start.

1. Install and start cors-anywhere - (google maps api calls unfortunately violate cors policy so this is required).
2. Get API keys - 3 are required: Google Maps, OpenAI and OpenWeatherMap.
3. Create a file called apiKey.js with this structure:
```   
      const keys = {
    "gpt":"YOUR OPENAI KEY",
    "weather":"YOUR OPENWEATHERMAP KEY",
    "google":"YOUR GOOGLE MAPS KEY"
}
export default keys;
```
4. Run npm install
5. Run json-server --watch db.json
6. Run npm start





