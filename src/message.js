import { Box, Typography, Paper } from '@mui/material';
import React from 'react';


function ChatMessage({message}) {

    const GetCurrentTime = () => {
        const date = new Date();
        const hours = String(date.getHours()).padStart(2, '0');  // get hours and ensure it's two digits
        const minutes = String(date.getMinutes()).padStart(2, '0');  // get minutes and ensure it's two digits
        return <p>{hours}:{minutes}</p>
      }
      let isUser = false;
      if(message.role.includes("user")) {
        isUser = true;
      }

    return(
        <Box mb={2} display="flex" justifyContent={isUser ? "flex-start" : "flex-end"}>

            <Paper elevation={3} style={{maxWidth:"70%", padding: '10px 15px', backgroundColor: isUser ? '#659df7' : '#FFFFFF'}}>
             <div className="time">
                <GetCurrentTime/>
            </div>
            <div>
                <Typography sx={{fontSize:"20px"}} variant="body1">{message.role}: {message.content}</Typography>
            </div>
            
            </Paper>
            
        </Box>
    )
}

export default ChatMessage;