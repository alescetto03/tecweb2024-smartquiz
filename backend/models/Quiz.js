import { DataTypes, Sequelize } from "sequelize";
import { User } from "./Database.js";

/**
 * Creates Quiz Model
 * @param {Sequelize} database 
 */
export function createModel(database) {
    database.define('Quiz', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        authorUsername: {
            type: DataTypes.STRING,
            references: {
                model: User,
                key: 'username'
            }
        }
    });
}

