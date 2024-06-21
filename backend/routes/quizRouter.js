import express from "express";
import { QuizController } from "../controllers/QuizController.js";
import { ensureUsersModifyOnlyOwnQuizzes } from "../middlewares/authorization.js";

export const quizRouter = new express.Router();

quizRouter.get("/quizzes", (req, res, next) => {
    QuizController.getCurrentUserQuizzes(req).then(quizItems => {
        res.json(quizItems);
    }).catch(err => {
    next(err);
  });
});

quizRouter.post("/quizzes", (req, res, next) => {
    QuizController.create(req).then( result => {
        res.json(result);
    }).catch(err => {
        next(err);
    });
});

quizRouter.get("/quizzes/:id", ensureUsersModifyOnlyOwnQuizzes, (req, res, next) => {
    QuizController.findById(req.params.id).then( (item) => {
        if(item)
            res.json(item);
        else 
            next({status: 404, message: "Quiz not found"});
    }).catch( err => {
        next(err);
    })
});

quizRouter.delete("/quizzes/:id", ensureUsersModifyOnlyOwnQuizzes, (req, res, next) => {
    QuizController.delete(req).then( (item) => {
        if(item)
            res.json(item);
        else 
            next({status: 404, message: "Quiz not found"});
    }).catch( err => {
        next(err);
    })
});
  
  
quizRouter.put("/quizzes/:id", ensureUsersModifyOnlyOwnQuizzes, (req, res, next) => {
    QuizController.update(req).then( (item) => {
        if(item)
            res.json(item);
        else 
            next({status: 404, message: "Quiz not found"});
    }).catch( err => {
        next(err);
    })
});