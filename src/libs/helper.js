import winston from 'winston';

const messageOut = (code, message,result = null) => {
    switch (code) {
        case 0:
            return {
                code: code,
                status: 'Success',
                message: message,
                result: result
            }
        case 1:
            return {
                code: code,
                status: 'Error',
                message: message
            }
        case 2:
            return {
                code: code,
                status: 'Warning',
                message: message
            }
        default:
        break;
    }
    
}

const messageErrorCatch = (error,res,pointError) =>{
    winston.info(error,`Error en ${pointError}`)
    res.status(400).json(messageOut(1,'Error inesperado, contactar con administrador'));
}

module.exports = {
    messageOut,
    messageErrorCatch
}