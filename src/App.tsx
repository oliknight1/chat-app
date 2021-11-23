import {Button, Flex, Heading} from '@chakra-ui/react';
import {
	BrowserRouter as Router,
	Link,
	Switch,
	Route
} from 'react-router-dom';
import ChatPage from './components/ChatPage';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Register from './components/Register';
import AuthProvider from './contexts/auth_context';

const App = () => {
	return (
		<AuthProvider>
			<Router>
				<nav>
					<Flex justify='space-between' px={ 10 } pt={ 5 }>
						<Link to ='/'><Heading color='teal.dark'> PicChat</Heading></Link>
						<Link to ='/register'><Button _hover={{ backgroundColor: 'teal' }} background='teal.dark' color='white'>Register</Button></Link>
					</Flex>
				</nav>
				<Switch>
					<PrivateRoute exact path='/' component={ ChatPage }></PrivateRoute>
					<Route path='/login' component={ Login } />
					<Route path='/register' component={ Register } />
				</Switch>
			</Router>
		</AuthProvider>
	);
}
export default App;
