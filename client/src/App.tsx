import React from 'react';
import {
	BrowserRouter as Router,
	Link,
	Switch,
	Route
} from 'react-router-dom';
import Register from './components/Register';

const App = () => {
	return (
		<Router>
			<nav style={{ position: 'fixed' }}>
				<ul>
					<li>
						<Link to ='/'>Home</Link>
						<br />

						<Link to ='/login'>Login</Link>
						<br />
						<Link to ='/register'>Register</Link>
					</li>
				</ul>
			</nav>
			<Switch>
				<Route exact path='/'></Route>
				<Route path='/login'></Route>
				<Route path='/register'>
					<Register/>
				</Route>
			</Switch>
		</Router>
	);
}
export default App;
