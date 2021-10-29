import { Box, Flex } from "@chakra-ui/react";
import BackgroundImage from "./BackgroundImage"
import UserAuthForm from "./UserAuthForm"

const Register = () => {
	return (
		<>
			<Flex alignItems='center' height='100vh'>

			<UserAuthForm title='Create an account'/>
			</Flex>
			<BackgroundImage />
		</>
	);
}
export default Register;
