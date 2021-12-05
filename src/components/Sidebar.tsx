import { Button, Flex, VStack } from "@chakra-ui/react"
import {useHistory} from "react-router-dom";
import {useAuth} from "../contexts/auth_context"
import { HomeIcon, AddIcon, AccountIcon, LogOutIcon } from "../utils/icons"

interface SidebarProps {
	dialog_hanlder : () => void,
	set_chatroom : React.Dispatch<React.SetStateAction<any>>
}

const Sidebar = ( { dialog_hanlder, set_chatroom } : SidebarProps ) => {
	const { logout } = useAuth();
	const history = useHistory();
	const handle_logout = async () => {
		try {
			await logout();
			history.push("/login")
			
		} catch (error) {
			console.log( error )
		}
	}
	return (
		<Flex h='100%' backgroundColor='teal.dark' p={ 8 } flexDir='column' justifyContent='space-between' w='6vw'>
			<VStack spacing={ 8 }>
				<Button variant='unstyled' onClick={ () => set_chatroom( null ) }><HomeIcon boxSize={ 10 } color='white' /></Button>
				<Button variant='unstyled' onClick={ dialog_hanlder }><AddIcon boxSize={ 10 } color='white' /></Button>
			</VStack>
			<VStack spacing={ 8 }>
				<AccountIcon boxSize={ 10 } color='white' />
				<Button variant='unstyled' onClick={ handle_logout }><LogOutIcon boxSize={ 10 } color='white' /></Button>
			</VStack>
		</Flex>
	)
}
export default Sidebar
