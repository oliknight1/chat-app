import * as dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import { user_router } from './controllers/routes/user_routes';

dotenv.config();

export const app = express();

app.use( cors() );
app.use( express.json() );
app.use( express.urlencoded() );
app.use( '/api/user', user_router );
