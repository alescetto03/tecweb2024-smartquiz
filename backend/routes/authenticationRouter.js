import express from "express";
import { AuthController } from "../controllers/AuthController.js";

export const authenticationRouter = express.Router();

authenticationRouter.get("/signup", (req, res) => {
    res.render("signup");
});

authenticationRouter.post("/signup", (req, res, next) => {
    AuthController.registerUser(req).then((user) => {
        res.json(user);
    }).catch((err) => {
        if (next) {
            next({status: 500, message: "Could not save user"});
        }
    })        
});

authenticationRouter.get("/login", (req, res) => {
    res.render("login");
});

authenticationRouter.post("/login", async (req, res) => {
    let isAuthenticated = await AuthController.checkUserCredentials(req).then(result => result);
    if(isAuthenticated) {
        let token = AuthController.issueToken(req.body.usr);
        //TODO::Vale la pena utilizzare i cookie per questo approccio?
        res.cookie('jwt', token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({message: "Authentication successful"});
    } else {
        res.status(401);
        res.json({error: "Invalid credentials. Try again."});
    }
});