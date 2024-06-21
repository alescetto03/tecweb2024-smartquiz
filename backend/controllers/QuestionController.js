import { Question } from "../models/Database.js";

export class QuestionController {
    /**
     * Returns all questions of a specific quiz
     * @param {import("express").Request} req 
     * @returns {Promise<Question[]>}
     */
    static async getQuestionsFromQuiz(req){
        return Question.findAll({
            where: {
                quizId: req.quiz
            }
        })
    }

    /**
     * Tries to create and save a Question into the database
     * @param {import("express").Request} req 
     * @returns {Promise<Quiz>}
     */
    static async create(req) {
        return await Question.create({
            quizId: req.params.id,
            question: req.body.qstn,
            correctAnswer: req.body.ca
        }, {
            individualHooks: true
        });
    }
}