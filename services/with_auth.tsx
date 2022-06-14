import {NextPage} from "next";
import {useAuth} from "../contexts/auth_context";
import Login from "../pages/login";

const with_auth = (Component: NextPage) => {
	const Auth = (props: JSX.IntrinsicAttributes) => {
		const { current_user } = useAuth();

    // If user is not logged in, return login component
    if (!current_user) {
      return (
        <Login />
      );
    }

    // If user is logged in, return original component
    return (
      <Component {...props} />
    );
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default with_auth;

