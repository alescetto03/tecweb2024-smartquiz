import express from "express";

export const homepageRouter = express.Router();

homepageRouter.all("/", (req, res) => {
    const authHeader = req.headers['authorization'];
    res.render("homepage");
})