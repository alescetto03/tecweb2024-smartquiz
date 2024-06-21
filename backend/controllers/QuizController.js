import { Quiz } from "../models/Database.js";

export class QuizController {
    /**
     * Returns all quizzes created by the current logged user
     * @param {import("express").Request} req 
     * @returns {Promise<Quiz[]>}
     */
    static async getCurrentUserQuizzes(req){
        return Quiz.findAll({
            where: {
                authorUsername: req.username
            }
        })
    }
    /**
     * Search for a Quiz by his ID. If no quiz is found, returns null
     * @param {number} req 
     * @returns {Promise<Quiz | null>}
     */
    static async findById(id) {
        return Quiz.findByPk(id);
    }

    /**
     * Tries to create and save a Quiz into the database
     * @param {import("express").Request} req 
     * @returns {Promise<Quiz>}
     */
    static async create(req) {
        let quiz = new Quiz({
            title: req.body.title,
            description: req.body.desc,
            authorUsername: req.username
        });
        return quiz.save();
    }

    /**
     * Tries to update a Quiz into the database
     * @param {import("express").Request} req 
     * @returns {Promise<Quiz | null>}
     */
    static async update(req) {
        let quiz = await this.findById(req.params.id);
        quiz?.setDataValue('title', req.body.title);
        quiz?.setDataValue('description', req.body.desc);
        return quiz?.save();
    }

    /**
     * Tries to delete a Quiz from the database
     * @param {import("express").Request} req 
     * @returns {Promise<Quiz>}
     */
    static async delete(req) {
        return new Promise( (resolve, reject) => {
            this.findById(req.params.id).then( item => {
                console.log(item);
                item?.destroy().then( () => {resolve(item)});
            });
        });
    }
}