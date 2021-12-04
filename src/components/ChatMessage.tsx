import { Box, Text, Image, ScaleFade, Flex } from "@chakra-ui/react";
import {useState} from "react";
import {get_doc_by_id} from "../services/database_helpers";

interface ChatMessageProps {
	message : string,
	received : boolean,
	sender_uid : string,
	timestamp : Date
}

const ChatMessage = ( { message, received, sender_uid, timestamp } : ChatMessageProps ) => {
	const [ photo_url, set_photo_url ] = useState<string>( '' );
	const [ img_loaded, set_img_loaded ] = useState<boolean>( false )

	get_doc_by_id( 'users', sender_uid ).then ( doc => doc.data() ).then( data => set_photo_url( data.photo_url ) );

	return (
		<Box alignSelf={ received ?  'flex-start' : 'flex-end'}>
			<ScaleFade in={ img_loaded }>
				<Flex flexDir={ received ? 'row' : 'row-reverse' } alignItems='center'>
					<Image src={ photo_url } onLoad={ () => set_img_loaded( true ) } borderRadius='full' w='4rem' h='4rem' mx={ 5 }/>
						<Box pos='relative' backgroundColor={ received ? 'gray.400' : 'teal.dark' } my={ 5 } w='fit-content' py={ 3 } px={ 6 } borderRadius='xl' >
							<Text>{ message }</Text>
							<Text
								pos='absolute'
								bottom='-60%'
								right={ received ? '75%' : 0 }
								mt={ -2 }
								textAlign={ received ? 'left' : 'right' }
								color='gray'
								fontWeight='light'
								fontSize='sm'
								whiteSpace='nowrap'
							>
							{ timestamp.toLocaleString() }
							</Text>
						</Box>
				</Flex>
			</ScaleFade>
		</Box>
	)
}

export default ChatMessage;
