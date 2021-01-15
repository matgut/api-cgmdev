import User from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config';
import Role from '../models/Role';
import { messageOut,messageErrorCatch } from '../libs/helper';

const registerUser = async (req,res) => {
    try {
        const { username, email, password, roles} = req.body;

        const newUser = new User({username, email, password: await User.encryptPassword(password)});

        if(roles) {
            const foundRole =  await Role.find({name: {$in: roles}});
            newUser.roles = foundRole.map(role => role._id);
        }else{
            const role = await Role.findOne({name: 'user'}); 
            newUser.roles = [role._id];
        }
        const saveUser = await newUser.save();
        console.log(saveUser);

        res.status(200).json(messageOut(0,'Usuario creado satisfactoriamente'));

    } catch (error) {
        messageErrorCatch(error,res,'registerUser');
    }
};

const login = async (req,res) => {
    try {
        const userFound = await User.findOne({email: req.body.email}).populate("roles");//populate puebla la propiedad roles del usuario

        if(!userFound) return res.status(400).json(messageOut(2,'Usuario Invalido'));

        const matchPassword = await User.comparePassword(req.body.password, userFound.password);

        if(!matchPassword) return res.status(401).json(messageOut(2,'Contraseña Incorrecta'));
        console.log(userFound);

        const token = jwt.sign({id: userFound._id}, config.secretJwt, {
            expiresIn: 86400//24 hrs
        });

        res.json(messageOut(0,'Login Ok',{token: token}));

    } catch (error) {
        messageErrorCatch(error,res,'login');
    }
};

module.exports = {
    registerUser,
    login
}