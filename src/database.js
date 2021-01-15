import mongoose from 'mongoose';
import config from './config';
import winston from 'winston';

mongoose.connect(config.mongodbUri ,{
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then((db) => {console.log('db is connected'); winston.info('db is connected!')} )
.catch(error => console.error(error));