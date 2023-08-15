import Message from "./message.js"
import {Box } from "@mui/material"

function MessageContainer({messages}) {
    console.log(messages)
    //messages.pop();
    return (
    <Box flexGrow={1} overflowY="auto" p={2}>
        {messages.map(message => <Message message={message}/>)}
    </Box>

    )
}

export default MessageContainer;