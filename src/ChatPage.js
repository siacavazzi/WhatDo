
// import ChatBar from "./chatBar.js";
// import { useState, useEffect } from 'react';
// import MessageContainer from './messageContainer.js'
// import GPTResponse from "./GPTContainer.js"
// import './App.css';
// import { Box } from '@mui/material';
// import Header from "./header.js"
// import * as fxs from "./GPTFunctions";

// let flipflop = true;

// function App() {
//   const [chatMessages, setChatMessages] = useState([]);
 
//   function submitMessage(message) {
//     setChatMessages([...chatMessages,message])
//   }


//   useEffect(() => {
//     if (chatMessages.length > 0) { 
//       if(flipflop) {// To avoid calling on initial render
//         GPTResponse({"user":`given the current time: ${fxs.GetCurrentTime()} and weather:`}).then(response => setChatMessages([...chatMessages, response]))
//         flipflop = false;
//     } else {
//     flipflop = true
//     }
    
//   }
// }, [chatMessages]);

//   return (
//     <Box display="flex" flexDirection="column">
//       <Header/>
//       <MessageContainer  messages={chatMessages} />

//       <ChatBar submitMessage={submitMessage}></ChatBar>

//       </Box>
    
//   );
// }

// export default App;
