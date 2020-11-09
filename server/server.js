/*
   Started on 19/10/20 By ALOK P

*/

// express dependencies

import express  from 'express';
import dotenv from 'dotenv';
import http from 'http';
import cors from 'cors';
import compression from 'compression';
import path from 'path';
import morgan from 'morgan';
import helmet from 'helmet'

import pool from '../databaseConfig/databaseConfig.js'
import index from '../server/router/index.js'
import bodyParser from 'body-parser'


const app = express();
dotenv.config()

app.use(compression());

app.use(morgan('dev'));

app.options('*', cors());
app.use(cors({ origin: 'http://localhost:5000'}));

// security config
app.use(helmet());

pool.query('USE QAForum');
global.pool;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


const PORT = process.env.PORT

//body-parser
console.log(PORT)


app.use('/api', index)

app.listen(PORT ,  () => {
     console.log(`Server is running on the port ${PORT} ${process.env.USER}`)
})


