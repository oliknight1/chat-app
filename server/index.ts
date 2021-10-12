import * as http from 'http';
import { app } from './app';
import { PORT } from './utils/config';

const server : http.Server = http.createServer( app )
server.listen( PORT, () => {
	 console.log( 'server running on 3003' )
} )
