require('dotenv').config();
const express = require('express');
const session = require('express-session');
const checkForSession = require('./middlewares/checkForSession');
const swagController = require('./controllers/swagController');
const authController = require('./controllers/authController');
const cartController = require('./controllers/cartController');
const searchController = require('./controllers/searchController');


const app = express();

const SESSION_SECRET = 'fgfehwgfh'

app.use(express.json());

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized:true
})
)

//Grabs middlware from file instead of writing it in index.js
app.use(checkForSession)

//swag endpoints
app.get('/api/swag', swagController.read);

//auth endpoints
app.post('/api/login', authController.login);
app.post('/api/register', authController.register);
app.post('/api/signout', authController.signout);
app.get('/api/user', authController.getUser);

//cart endpoints
app.post('/api/cart/checkout', cartController.checkout);
app.post('/api/cart/:id', cartController.add);
app.delete('/api/cart/:id', cartController.delete);

//search endpoints
app.get('/api/search', searchController.search);

const SERVER_PORT = 3001
app.listen(SERVER_PORT, () => { 
    console.log(`Listening on server port ${SERVER_PORT}`)})