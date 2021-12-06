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
	const pathname = window.location.pathname;
	return (
		<AuthProvider>
			<Router>
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
