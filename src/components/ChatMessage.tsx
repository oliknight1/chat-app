import { Box, Text, Image, ScaleFade, Flex } from "@chakra-ui/react";
import {useState} from "react";
import {get_user_by_id} from "../services/database_helpers";

interface ChatMessageProps {
	message : string,
	received : boolean,
	sender_uid : string
}

const ChatMessage = ( { message, received, sender_uid } : ChatMessageProps ) => {
	const [ photo_url, set_photo_url ] = useState<string>( '' );
	const [ img_loaded, set_img_loaded ] = useState<boolean>( false )
	get_user_by_id( sender_uid ).then ( doc => doc.data() ).then( data => set_photo_url( data.photo_url ) );
	return (
			<Box alignSelf={ received ?  'flex-start' : 'flex-end'}>
		<ScaleFade in={ img_loaded }>
				<Flex flexDir={ received ? 'row' : 'row-reverse' } alignItems='center'>
					<Image src={ photo_url } onLoad={ () => set_img_loaded( true ) } borderRadius='full' w='4rem' h='4rem' mx={ 5 }/>
					<Box backgroundColor={ received ? 'gray.400' : 'teal.dark' } my={ 5 } w='fit-content' py={ 3 } px={ 6 } borderRadius='xl' >
						<Text>{ message }</Text>
					</Box>
				</Flex>
		</ScaleFade>
			</Box>
	)
}

export default ChatMessage;
