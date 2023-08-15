import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import { Box, Input, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

function ChatBar({submitMessage}) {
    const [inputValue, setInputValue] = useState("");

    function handleEnter(e) {
        if(e.key === 'Enter') {
            handleSubmit(e)
        }
    }

    function handleSubmit(e) {

        console.log(e)
        e.preventDefault();
        const message = {"role":"user", "content":inputValue};
        submitMessage(message);
        setInputValue("");
    }

    return (
        <Box 
        display="flex" 
        textItems="center" 
        justifyContent="center"
        padding={0.5} 
        borderTop="5px solid #ccc"
        component="div"
      sx={{
        height:"75px",
        position: 'fixed',
        bottom: '0',
        width: '100%',
        zIndex: 1000,
        
        // Add any other desired styles here
      }}>
        <Input
        variant="filled" 
        placeholder="Type a message..." 
        fullWidth
        sx ={{
            fontSize: '25px',
            padding:"10px",
        }}
        
        value={inputValue} 
        onKeyDown={(event) => handleEnter(event)} 
        onChange={(e) => setInputValue(e.target.value)}>
        
        </Input>
           
            <Button padding="5px" onClick={handleSubmit} variant="contained" type="submit" >Chat</Button>
       
        </Box>
    )

}

export default ChatBar;