import ChatBox from "./ChatBox";
import Sidebar from './Sidebar';
import ChatList from './ChatList';
import {Box, Flex, useBreakpoint, BoxProps, useDisclosure} from "@chakra-ui/react";
import {useState} from "react";
import AddChatDialog from "./AddChatDialog";
import with_auth from "../services/with_auth";

const ChatPage = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [ invite_error, set_invite_error ] = useState<string | null>( null );
	const [ chatroom_uid, set_chatroom_uid ] = useState<string| null>( null )

	// Refactor this in the future to use Redux state management to check if there are any chatrooms, not time to do it now

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
		display: ( ['base', 'sm', 'md'].includes( current_breakpoint as string ) ) && chat_list_open === true ? 'none' : 'initial'
	}

	return (
		<Flex maxH='100vh' width='100vw' overflow='hidden' >
			<Flex background='gray.100'>
				<Sidebar dialog_handler={ onOpen } visible={ chat_list_open } />
				<ChatList set_chatroom={ set_chatroom_uid } open={ chat_list_open } set_open={ set_chat_list_open } />
			</Flex>
			<Box { ...bg_props } h='100vh'>
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



export default with_auth( ChatPage );
