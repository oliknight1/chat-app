import ChatBox from "./ChatBox";
import Sidebar from './Sidebar';
import ChatList from './ChatList';
import {Flex, useDisclosure} from "@chakra-ui/react";
import {useState} from "react";
import AddChatDialog from "./AddChatDialog";

const ChatPage = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [ invite_error, set_invite_error ] = useState<string | null>( null );


	// Make sure to remove the error once the dialog is closed
	const dialog_close_handler = () => {
		set_invite_error( null )
		return onClose();
	}

	return (
		<Flex height='100vh'>
			<Sidebar dialog_hanlder={ onOpen } />
			<ChatList />
			<ChatBox />
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
