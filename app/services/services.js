'use strict';

const jwt=require('jwt-simple');
const moment= require('moment');


function createToken(){
    const payload={
        sub: user,
        iat: moment().unix(),
        exp: moment().add(15,'days').unix()
    };

    return jwt.encode(payload,process.env.SECRET_TOKEN);    
}

function decodeToken(){

}

module.exports={createToken, decodeToken};