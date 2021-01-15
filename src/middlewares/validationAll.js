import {messageOut,messageErrorCatch} from '../libs/helper'

const checkParametersFindUser = (req, res, next) => {
    try {
        let keyObject = Object.keys(req.body);
        console.log(keyObject)
        if(keyObject.length > 0){
            for (let i = 0; i < keyObject.length; i++) {
                if(keyObject[i] !== 'username' || keyObject[i] !== 'id' || keyObject[i] !== 'email'){
                    return res.status(400).json(messageOut(1,'Error',`Parametro ${keyObject[i]} No admitido`));
                } 
            }
        }
    
        next();

    } catch (error) {
        messageErrorCatch(error,res,'checkParametersFindUser');
    }
};


module.exports = {
    checkParametersFindUser
}