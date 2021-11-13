import {Redirect, Route, RouteComponentProps} from "react-router-dom";
import {useAuth} from "../contexts/auth_context";

interface PrivateRouteProps {
	component :  React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>,
	exact : boolean,
	path : string
}

const PrivateRoute = ( { component : Component, ...rest } : PrivateRouteProps ) => {
	const { current_user } = useAuth();
	return (
		<Route
			{ ...rest }
			render={ props => {
				return current_user ? <Component { ...props } /> : <Redirect to='/login' /> 
			} }
		>
		</Route>
	);
};
export default PrivateRoute;
