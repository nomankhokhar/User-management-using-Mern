const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');

const connectDB = require('./server/database/connection');

const app = express();

dotenv.config({ path: 'config.env' });
const PORT = process.env.PORT;



//  Log requests

app.use(morgan('tiny'));

//  MONGO DB CONNECTION

connectDB();

//  parse request body-parser

app.use(bodyparser.urlencoded({ extended: true }));

// set view engin


app.set("view engine", 'ejs');
// app.set("views",path.resolve(__dirname,"views/ejs")); // if you not use views folder ya another folder you should use method



// load assets

app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));
// css/style.css

// load router

app.use('/', require('./server/routes/router'))



app.listen(PORT, () => {
    console.log(`Server is run`);
})