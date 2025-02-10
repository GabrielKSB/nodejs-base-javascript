/*
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET
//const JWT_SECRET = "9e0a77e143feb7a51acdc810b1b839d4edd4847716d62a9269335723a8a5a6bd"

const auth = (req, res, next) => {

    const token = req.headers.authorization

    if(!token){
        return res.status(401).json({message: 'Acesso Negado'})
    }

    try{
        const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET)

        req.userId = decoded.id

    }catch(err){
        return res.status(401).json({message: 'Token Inválido'})
    }

    next()
}

export default auth
*/