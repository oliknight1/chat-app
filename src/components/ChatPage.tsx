import ChatBox from "./ChatBox";
import Sidebar from './Sidebar';
import ChatList from './ChatList';
import {Box, Flex, Heading, useDisclosure, Text, Fade} from "@chakra-ui/react";
import {useState} from "react";
import AddChatDialog from "./AddChatDialog";
import ChatDashboard from "./ChatDashboard";

const ChatPage = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [ invite_error, set_invite_error ] = useState<string | null>( null );
	const [ chatroom_uid, set_chatroom_uid ] = useState<string| null>( null )

	console.log( 'chatroomm',chatroom_uid )

	// Make sure to remove the error once the dialog is closed
	const dialog_close_handler = () => {
		set_invite_error( null )
		return onClose();
	}
	return (
		<Flex height='100vh' background='grey.100' width='100%'>
			<Flex background='gray.100'>

			<Sidebar dialog_hanlder={ onOpen } set_chatroom={ set_chatroom_uid } />
			<ChatList set_chatroom={ set_chatroom_uid } />
			</Flex>
			<Box background='gray.100' w='100%' h='100%' position='relative' >
				<Fade in={ chatroom_uid === null }>
					<Box
						w='md'
						h='fit-content'
						background='white'
						py={ 6 }
						px={ 8 }
						rounded='2xl'
						position='absolute'
						top='50%'
						left='32%'
						boxShadow='lg'
					>

						<Heading fontSize='2xl' fontWeight='600' mb={ 3 }>No open chat</Heading>
						<Text>Please click a chat on the sidebar to view messages</Text>
					</Box>
				</Fade>
				{
					chatroom_uid !== null &&
						<ChatBox chatroom_uid={ chatroom_uid } />
				}
			</Box>
			<AddChatDialog
				is_open={ isOpen }
				on_close={ dialog_close_handler }
				title='Start a chat with a user'
				error_message={ invite_error }
				set_error_message={ set_invite_error }
				set_chatroom_uid={ set_chatroom_uid }
			/>
		</Flex>
	);
}


export default ChatPage;
