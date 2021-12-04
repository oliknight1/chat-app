import { Box, Text } from "@chakra-ui/react";

interface ChatMessageProps {
	message : string,
	received : boolean
}

const ChatMessage = ( { message, received } : ChatMessageProps ) => {
	console.log( received )
	return (
		<Box alignSelf={ received ?  'flex-start' : 'flex-end'}>
			<Box backgroundColor={ received ? 'gray.400' : 'teal.dark' } my={ 5 } w='fit-content' py={ 3 } px={ 6 } borderRadius='xl' >
				<Text>{ message }</Text>
			</Box>
		</Box>
	)
}

export default ChatMessage;
