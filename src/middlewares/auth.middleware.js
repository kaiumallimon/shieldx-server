const jwt = require('jsonwebtoken');

const authMiddleware = (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(401).json({
            message: "Unauthorized"
        });
    }


    jwt.verify(token,process.env.JWT_SECRET,(error,decoded)=>{
        if(error){
            return res.status(403).json({
                message: "Invalid Token"
            })
        }

        req.user = decoded;

        next();
    });
};


module.exports = authMiddleware;