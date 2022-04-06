require('dotenv').config()
const express = require( 'express' );
const app = express();
const todoRouter = require( '../app/todo/todo.router' );

app.use( express.json() );

app.use( '/todo', todoRouter );

app.listen( 3005, () => console.log( 'Server is running on port 3005' ) )