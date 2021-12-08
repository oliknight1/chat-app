import ChatBox from "./ChatBox";
import Sidebar from './Sidebar';
import ChatList from './ChatList';
import {Box, Flex, Heading, useDisclosure, Text, Fade, useBreakpoint, BoxProps} from "@chakra-ui/react";
import {useState} from "react";
import AddChatDialog from "./AddChatDialog";
import ChatDashboard from "./ChatDashboard";

const ChatPage = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [ invite_error, set_invite_error ] = useState<string | null>( null );
	const [ chatroom_uid, set_chatroom_uid ] = useState<string| null>( null )
	// State used for mobile styling
	const [ chat_list_open, set_chat_list_open ] = useState<boolean>( true );

	const current_breakpoint = useBreakpoint()

	// Make sure to remove the error once the dialog is closed
	const dialog_close_handler = () => {
		set_invite_error( null )
		return onClose();
	}

	const bg_props : BoxProps = {
		background: 'gray.100',
		w: '100%',
		h: '100%',
		position: 'relative',
		display: ( ['base', 'sm', 'md'].includes( current_breakpoint as string ) ) && chat_list_open === true ? 'none' : 'initial'
	}


	return (
		<Flex height='100vh' background='grey.100' width='100vw' >
			<Flex background='gray.100'>
				<Sidebar dialog_hanlder={ onOpen } set_chatroom={ set_chatroom_uid } visible={ chat_list_open } />
				<ChatList set_chatroom={ set_chatroom_uid } open={ chat_list_open } set_open={ set_chat_list_open } set_no_chats={ set_no_chats } />
			</Flex>
			<Box { ...bg_props } >
				<NoChatsDialog visible={ chatroom_uid === null } />
				{
					chatroom_uid !== null &&
						<ChatBox chatroom_uid={ chatroom_uid } set_chat_list_open={ set_chat_list_open } />
				}
			</Box>
			<AddChatDialog
				is_open={ isOpen }
				on_close={ dialog_close_handler }
				title='Start a chat with a user'
				error_message={ invite_error }
				set_error_message={ set_invite_error }
				set_chatroom_uid={ set_chatroom_uid }
				set_chat_list_open={ set_chat_list_open }
			/>
		</Flex>
	);
}



export default ChatPage;
