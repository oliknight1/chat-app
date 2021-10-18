import express, { Request, Response } from 'express';
import { auth } from '../../config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export const user_router = express.Router();

// TODO: Handle invalid login / register
// TODO: Handle error for user already existing

user_router.post( '/login', ( req : Request, res : Response ) => {
	const email : string = req.body.email;
	const password : string = req.body.password;
	signInWithEmailAndPassword( auth, email, password )
		.then( ( user_credential ) => {
			const uid = user_credential.user.uid;
			res.status( 200 ).send( uid );
		} )
	.catch();
} );

user_router.post( '/register', ( req : Request, res : Response ) => {
	const email : string = req.body.email;
	const password : string = req.body.password;
	console.log( 'run' );
	createUserWithEmailAndPassword( auth, email, password )
		.then( ( user_credential ) => {
			const uid = user_credential.user.uid;
			res.status( 201 ).send( uid );
		} )
	.catch( ( Error ) => {
		console.log( 'itnhas errored', Error );
	} );

} );

user_router.post( '/logout', ( req : Request, res : Response ) => {
	signOut( auth ).then(

	);
} );

