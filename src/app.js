import express  from 'express';
import morgan from 'morgan';
import pkg from '../package.json';
import productsRoutes from './routes/productsRoutes';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes'; 
import { createRoles } from './libs/initialSetup';

const app = express();
createRoles();

app.set('pkg', pkg);


app.use(morgan('dev'));
app.use(express.json());


app.get('/', (req, res) => {
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        desciption: app.get('pkg').description,
        version: app.get('pkg').version
    });
});

app.use('/api/v1/products',productsRoutes);
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/user',userRoutes);


export default app;