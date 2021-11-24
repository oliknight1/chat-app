import { Button, Flex, VStack } from "@chakra-ui/react"
import { HomeIcon, AddIcon, AccountIcon, LogOutIcon } from "../utils/icons"

const Sidebar = () => {
	return (
		<Flex h='100%' backgroundColor='teal.dark' p={ 8 } flexDir='column' justifyContent='space-between'>
			<VStack spacing={ 8 }>
				<HomeIcon boxSize={ 10 } color='white' />	
				<AddIcon boxSize={ 10 } color='white' />

			</VStack>
			<VStack spacing={ 8 }>
				<AccountIcon boxSize={ 10 } color='white' />
				<Button><LogOutIcon boxSize={ 10 } color='white' /></Button>
			</VStack>
		</Flex>
	)
}
export default Sidebar
