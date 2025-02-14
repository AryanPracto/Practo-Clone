import jwt from "jsonwebtoken"
import { ENV_VARS } from "../config/envVars.js"

export const generateToken=(userId)=>{
    return jwt.sign({userId},ENV_VARS.JWT_SECRET,{expiresIn:'15d'})
}