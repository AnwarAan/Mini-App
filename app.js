import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import config from './src/config/config.js';
import userRoutes from './src/routes/users_routes.js'
import productRoutes from './src/routes/products_router.js'


const app = express();
const port = config.PORT;
const uri = `mongodb+srv://${config.NAME}:${config.PASSWORD}@${config.HOST}`


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true,useUnifiedTopology: true}));
app.use('/v1', userRoutes);
app.use('/v1/products', productRoutes);


mongoose.connect(uri, {useNewUrlParser: true})
.then(() => console.log('Server is Connect'))
.catch(error => console.log(error))


app.listen(port, () => {
    console.log(`Server is Running on Port: ${port}`)
})