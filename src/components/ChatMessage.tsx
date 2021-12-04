import { Box, Text } from "@chakra-ui/react";

interface ChatMessageProps {
	message : string,
	recieved_message : boolean
}

const ChatMessage = ( { message, recieved_message } : ChatMessageProps ) => {
	return (
		<Box alignSelf={ recieved_message ? 'flex-end' : 'flex-start' }>
			<Box backgroundColor={ recieved_message ? 'teal.dark' : 'gray.400' } my={ 5 } w='fit-content' py={ 3 } px={ 6 } borderRadius='xl' >
				<Text>{ message }</Text>
			</Box>
		</Box>
	)
}

export default ChatMessage;
