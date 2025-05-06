import { Sequelize } from "sequelize";
import db from "../config/db.js";

const { DataTypes } = Sequelize;

const Custom_function = db.define('custom_function', 
{
    name: {
        type: DataTypes.STRING
    }, 
    ejs_path: {
        type: DataTypes.STRING
    },
    txt_path: {
        type: DataTypes.STRING
    },
},
{
    freezeTableName: true
});

export default Custom_function;