import cookieParser from "cookie-parser";
import { AuthController } from "../controllers/AuthController.js";

/**
 * This middleware ensures that the user is currently authenticated. If not,
 * redirects to login with an error message.
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
export function enforceAuthentication(req, res, next) {
    //TODO:: Per quale motivo utilizzare queste 2 istruzioni?
    //const authHeader = req.headers['authorization'];
    //const token = authHeader?.split(' ')[1];
    const token = req.cookies.jwt;
    if(!token){
        next({status: 401, message: "Unauthorized"});
        return;
    }
    AuthController.isTokenValid(token, (err, decodedToken) => {
        if(err){
            next({status: 401, message: "Unauthorized"});
        } else {
            req.username = decodedToken.user;
            next();
        }
    });
}

//TODO::Implementare la funzione
export async function ensureUsersModifyOnlyOwnQuizzes(req, res, next) {
    next();
}