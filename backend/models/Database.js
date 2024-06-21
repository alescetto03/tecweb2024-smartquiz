import { Sequelize } from "sequelize";
import { createModel as createUserModel } from "./User.js";
import { createModel as createQuizModel } from "./Quiz.js";
import { createModel as createQuestionModel } from "./Question.js";

import 'dotenv/config.js';

export const database = new Sequelize(process.env.DB_CONNECTION_URI, {
    dialect: process.env.DIALECT
});

createUserModel(database);
export const User = database.models.User;
createQuizModel(database);
export const Quiz = database.models.Quiz;
createQuestionModel(database);
export const Question = database.models.Question;

User.hasMany(Quiz, { foreignKey: 'authorUsername', as: "createdQuizzes" });
Quiz.belongsTo(User, { foreignKey: 'authorUsername', as: "author" })
Quiz.hasMany(Question, { foreignKey: 'quizId' });
Question.belongsTo(Quiz, { foreignKey: 'quizId' });

database.sync().then( () => {
    console.log("Database synced correctly");
}).catch( err => {
    console.err("Error with database synchronization: " + err.message);
});