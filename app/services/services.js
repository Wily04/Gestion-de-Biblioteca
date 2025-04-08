'use strict';

const jwt = require('jwt-simple');
const moment = require('moment');

function createToken(user) {
    const payload = {
        sub: user,  // Aquí 'user' puede ser el ID o un objeto con más datos del usuario
        iat: moment().unix(),  // Fecha de creación
        exp: moment().add(15, 'days').unix()  // Expira en 15 días
    };
    
    if (!process.env.SECRET_TOKEN) {
        throw new Error('SECRET_TOKEN no está configurado en las variables de entorno');
    }
    
    return jwt.encode(payload, process.env.SECRET_TOKEN);
}

function decodeToken(token) {
    const decode = new Promise((resolve, reject) => {
        try {
            if (!token) {
                return reject({ 
                    status: 401, 
                    message: "Token no proporcionado" 
                });
            }

            const payload = jwt.decode(token, process.env.SECRET_TOKEN);
            
            if (payload.exp <= moment().unix()) {
                return reject({ 
                    status: 401, 
                    message: "Token expirado" 
                });
            }
            
            resolve(payload.sub);  // Devuelve los datos del usuario (sub)
            
        } catch (error) {
            reject({ 
                status: 500, 
                message: "Token inválido",
                error: error.message 
            });
        }
    });
    
    return decode;
}

module.exports = { 
    createToken, 
    decodeToken 
};