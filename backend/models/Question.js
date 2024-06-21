import { DataTypes } from "sequelize";
import { Question, Quiz, User } from "./Database.js";

/**
 * Creates Question Model
 * @param {Sequelize} database 
 */
export function createModel(database) {
    database.define('Question', {
        quizId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: Quiz,
                key: 'id'
            }
        },
        questionNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        question: {
            type: DataTypes.STRING,
            allowNull: false
        },
        correctAnswer: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        firstWrongAnswer: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        secondWrongAnswer: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        thirdWrongAnswer: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    }, {
        hooks: {
            beforeValidate: async (question, options) => {
                const lastQuestion = await Question.findOne({
                    where: { quizId: question.quizId },
                    order: [['questionNumber', 'DESC']]
                });
                question.questionNumber = lastQuestion ? lastQuestion.questionNumber + 1 : 1;
            }
        }
    });
}