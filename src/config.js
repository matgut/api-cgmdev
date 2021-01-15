import { config } from 'dotenv';
import dotenvExpand  from 'dotenv-expand';

const myEnv = config();//con esto lee el .env y busca las variables
dotenvExpand(myEnv);

export default {
    mongodbUser: process.env.MONGODB_USER,
    mongodbPass: process.env.MONGODB_PASS,
    mongodbDomain: process.env.MONGODB_DOMAIN,
    mongodbUri: process.env.MONGODB_URI,
    secretJwt: process.env.SECRET_JWT,
    port:process.env.PORT
}
