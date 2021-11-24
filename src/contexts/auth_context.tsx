import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from '../utils/typings';
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword, UserCredential, onAuthStateChanged, User, signInWithEmailAndPassword } from 'firebase/auth';
const AuthContext = React.createContext( {} as AppContext );

export const useAuth = () => useContext( AuthContext );

const AuthProvider = ( { children } : any ) => {
	const [ current_user, set_current_user ] = useState<User | null>();
	const [loading, set_loading] = useState<boolean>( true )

	// Returns a promise to be consumed by register/login component
	const signup = ( email : string, password : string ) : Promise<UserCredential> => {
		return createUserWithEmailAndPassword( auth, email, password )
	}
	const login = ( email : string, password: string ) : Promise<UserCredential> => {
		return signInWithEmailAndPassword( auth, email, password );
	}
	
	const logout = () => auth.signOut()

	// Make sure to unsubscribe from listener once component is mounted
	useEffect( () => {
		const unsubscribe = onAuthStateChanged( auth, ( user ) => {
			set_current_user( user );
			set_loading( false );
		});
		return unsubscribe;
	}, [] );

	const value : AppContext = {
		current_user,
		signup,
		login,
		logout
	}

	return (
		<AuthContext.Provider value={ value }>
			{ !loading && children }
		</AuthContext.Provider>
	);

}
export default AuthProvider;
