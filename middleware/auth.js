const jwt = require('jsonwebtoken')
require('dotenv').config()

async function signtoken(id,username,role) {
    try {
        const token = await jwt.sign(
            {id: id,username: username,role: role},
            process.env.JWT_SECRET,
            {expiresIn : "2h"}
        )
        return token
    } catch (error) {
        return null
    }
}

const user = async (req,res,next) => {
    const authheader = req.headers['authorization']; 
    try {
        if(!authheader || !authheader.startsWith('Bearer ')) return res.status(401).json({error: "Access denind. No token provided"})
        const token = authheader.split(' ')[1]
        if(!token) return res.status(401).json({message: "Access denind. Malformed Token"})
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        if(decoded.role != 1) return res.status(403).json({error: "unauthorized"})
        req.user = decoded
        next()
    } catch (error) {
        res.status(403).json({message: "unauthorized"})
    }
}

const admin = async (req,res,next) => {
    const authheader = req.headers['authorization']; // e.g., "Bearer abc123xyz"
    try {
        if(!authheader || !authheader.startsWith('Bearer ')) return res.status(401).json({error: "Access denind. No token provided"})
        const token = authheader.split(' ')[1]
        if(!token) return res.status(401).json({message: "Access denind. Malformed Token"})
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        if(decoded.role != 1) return res.status(403).json({error: "unauthorized"})
        req.user = decoded
        next()
    } catch (error) {
        res.status(403).json({message: "unauthorized"})
    }
}
module.exports = {signtoken,user,admin};