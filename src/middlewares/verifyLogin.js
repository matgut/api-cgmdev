import {ROLES} from '../models/Role';
import User from '../models/User';
import {messageOut} from '../libs/helper'


const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (user) return res.status(400).json(messageOut(3,'Warning','Email ya se encuentra registrado'));

        const email = await User.findOne({ email: req.body.email });
        if (email) return res.status(400).json(messageOut(3,'Warning','Nombre de usuario ya se encuentra registrado'));

        next();
    } catch (error) {
        res.status(500).json(messageOut(1,'Error',error));
    }
};


const checkRolesExisted = (req, res, next) => {
    if(req.body.roles){
        for (let i = 0; i < req.body.roles.length; i++) {
            if(!ROLES.includes(req.body.roles[i])){
                return res.status(400).json({ code:1, message: `Role ${req.body.roles[i]} No existe`})
            } 
        }
    }

    next();
};


module.exports = {
    checkRolesExisted,
    checkDuplicateUsernameOrEmail
}