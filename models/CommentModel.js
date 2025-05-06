import { Sequelize } from "sequelize";
import db from "../config/db.js";

const { DataTypes } = Sequelize;

const Comments = db.define('comment', 
{
    pageID: {
        type: DataTypes.INTEGER
    }, 
    custom_data_id: {
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    content: {
        type: DataTypes.TEXT('long')
    },
    publicity : {
        type: DataTypes.BOOLEAN
    },
    avatar : {
        type: DataTypes.TEXT('long')
    }
},
{
    freezeTableName: true
});

export default Comments;