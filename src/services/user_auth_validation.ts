
export const handle_auth_code = ( code : string ) => {
	console.log( code )
	switch( code ) {
		case ( 'auth/weak-password' ) :
			return 'Password is too weak';

		case ( 'auth/email-already-in-use' ) :
			return 'Email is already in use';

		case ( 'auth/user-not-found' ) :
			return 'Email / password was not found';

		case ( 'auth/wrong-password' ) :
			return 'Email / password was not found';

		default :
			return 'There was an error, please try again'
	}
}
