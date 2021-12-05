import { Box, Text, Avatar, ScaleFade, Flex } from "@chakra-ui/react";
import {DocumentData} from "firebase/firestore";
import {useState} from "react";
import {get_doc_by_id} from "../services/database_helpers";

interface ChatMessageProps {
	message : string,
	received : boolean,
	sender_uid : string,
	timestamp : Date
}

const ChatMessage = ( { message, received, sender_uid, timestamp } : ChatMessageProps ) => {

	const [ user, set_user ] = useState<DocumentData>();
	get_doc_by_id( 'users', sender_uid ).then ( doc => set_user( doc.data() ));

	return (
		<Box alignSelf={ received ?  'flex-start' : 'flex-end'} px={ 5 }>
			<ScaleFade in={ true }>
				<Flex flexDir={ received ? 'row' : 'row-reverse' } alignItems='center'>
					 <Avatar name={ user?.display_name } loading='lazy' w='3.5rem' h='3.5rem' mx={ 5 }/>
						<Box pos='relative' backgroundColor={ received ? 'teal.700' : 'teal.dark' } my={ 5 } w='fit-content' py={ 3 } px={ 6 } borderRadius='xl' >
							<Text color='white'>{ message }</Text>
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
							{ timestamp?.toLocaleString() }
							</Text>
						</Box>
				</Flex>
			</ScaleFade>
		</Box>
	)
}

export default ChatMessage;
