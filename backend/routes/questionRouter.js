import express from "express";
import { QuestionController } from "../controllers/QuestionController.js";

export const questionRouter = new express.Router();

questionRouter.post("/quizzes/:id/questions", (req, res, next) => {
    QuestionController.create(req).then( result => {
        res.json(result);
    }).catch(err => {
        next(err);
    });
});