import ChatBox from "./ChatBox";
import Sidebar from './Sidebar';
import ChatList from './ChatList';
import {Container, Flex, useDisclosure} from "@chakra-ui/react";
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
		<Flex height='100vh'>
			<Sidebar dialog_hanlder={ onOpen } set_chatroom={ set_chatroom_uid } />
			<ChatList set_chatroom={ set_chatroom_uid } visible={ chatroom_uid !== null ? true : false } />
			<Container background='gray.100' maxW='100%' h='100%' p={ 10 } position='relative' >
				{
					chatroom_uid === null &&
						<ChatDashboard set_chatroom={ set_chatroom_uid } visible={ chatroom_uid === null }/>
				}
				{
					chatroom_uid !== null &&
		<ChatBox chatroom_uid={ chatroom_uid } />
				}
			</Container>
			<AddChatDialog
				is_open={ isOpen }
				on_close={ dialog_close_handler }
				title='Start a chat with a user'
				error_message={ invite_error }
				set_error_message={ set_invite_error }
			/>
		</Flex>
	);
}


export default ChatPage;
