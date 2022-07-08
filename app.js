import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import config from './src/config/config.js';


const app = express();
const port = config.PORT;
const uri= `mongodb+srv://${config.NAME}:${config.PASSWORD}@${config.HOST}`


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true, useUnifiedTopology: true}));


mongoose.connect(uri, {useNewUrlParser: true});


app.listen(port, () => {
    console.log(`Server is Running on Port: ${port}`)
})