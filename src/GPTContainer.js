import { Configuration, OpenAIApi } from "openai";
import keys from "./apiKey.js"




async function GPTResponse(messages, temperature=0.2) {
    try {
    const config = new Configuration({
        apiKey:keys["gpt"]})
    //console.log(messages)
    const openai = new OpenAIApi(config);
    //const aiprompt = {"role":"system", "content":systemPrompt}
    //console.log(messages)
        let tempMessages = []
    // create tempMessages to hide system prompt and function calls from user
    // if(!showFirstMsg) {
    //     tempMessages = [...messages]
    //     tempMessages.unshift(aiprompt);
    // } else {
    //     tempMessages = messages
    // }


    // create response object - specifies gpt model and functions, importantly it also feeds the gpt the conversation, giving it context
    const responseObject = {
        model: 'gpt-3.5-turbo-16k',
        messages: [messages],
        temperature: temperature,
        //functions: fxs.functions,
        //function_call: "auto"
    }
    console.log("response object")
    console.log(responseObject)
    // api call to openai - assign this to resonse
    let response = await openai.createChatCompletion(responseObject)
    const message = response.data.choices[0].message;
    //console.log("gpt response")
    //console.log(message)

    // check if the response contains a function call
    // if(message.function_call) {
    //     const functionName = message.function_call.name;
    //     const functionArgs = JSON.parse(message.function_call.arguments);

    //     console.log(functionArgs)

    //     // define availible functions Note: fxs prefix is due to function import
    //     const availableFunctions = {
    //         "GetCurrentTime": fxs.GetCurrentTime, 
    //         "doMath" :fxs.doMath,
    //         "getWeather": fxs.getWeather
    //     };

    //     // if the function called in availible, then parse args and call function 
    //     if (availableFunctions[functionName]) {
    //         const functionResponse = await availableFunctions[functionName](...Object.values(functionArgs));

    //         // push message to the tempmessages so gpt can see the reponse to its function call
    //         // NOTE: content must be a string 
    //         tempMessages.push(message);
    //         tempMessages.push({
    //             role: "function",
    //             name: functionName,
    //             content: functionResponse.toString()
    //         });
    //         // call the api again with the function result 
    //         const payload = {
    //             model: 'gpt-3.5-turbo-16k-0613',
    //             messages: tempMessages
    //         }
    //         console.log(payload)
    //         response = await openai.createChatCompletion(payload);

    //         console.log(functionResponse);
    //     }
    // }

    return response.data.choices[0].message;
} catch(e) {
    console.log(e);
    return "";
}
}
export default GPTResponse;