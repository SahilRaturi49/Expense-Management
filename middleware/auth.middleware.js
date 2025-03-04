import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

export const protect = async(req, resizeBy, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
    }

    if(!token) {
        return res.status(401).json({message: "Not authorized, no token"})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password")
        next();
    } catch (error) {
        res.status(401).json({message: "Not authorized, token failed"})
        
    }
};