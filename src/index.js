import app from './app';
import './database';
import {Logs} from './logging';
import config from './config';
import winston from 'winston';


Logs();

app.listen(config.port, () => {console.log('server on port '+ config.port); winston.info('server on port ' + config.port)});