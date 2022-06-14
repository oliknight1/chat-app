import { Button, Fade, Flex, VStack } from "@chakra-ui/react"
import {useRouter} from "next/router"
import {useAuth} from "../contexts/auth_context"
import { AddIcon, LogOutIcon } from "../utils/icons"

interface SidebarProps {
	dialog_handler : () => void,
	visible: boolean
}

const Sidebar = ( { dialog_handler, visible } : SidebarProps ) => {
	const { logout } = useAuth();
	const router = useRouter();
	const handle_logout = async () => {
		try {
			await logout();
			router.push( '/login' )
		} catch (error) {
			console.log( error )
		}
	}
	if( !visible ) {
		return null;
	}
	return (
		<Flex h='100%' backgroundColor='teal.dark' p={ 8 } flexDir='column' justifyContent='space-between' w='6vw' zIndex={ 2 }>
			<Fade in={ true }>
				<VStack spacing={ 8 }>
					<Button variant='unstyled' onClick={ dialog_handler }><AddIcon boxSize={ 10 } color='white' /></Button>
				</VStack>
			</Fade>
			<Fade in={ true }>
				<VStack spacing={ 8 }>
					<Button variant='unstyled' onClick={ handle_logout }><LogOutIcon boxSize={ 10 } color='white' /></Button>
				</VStack>
			</Fade>
		</Flex>
	)
}
export default Sidebar
