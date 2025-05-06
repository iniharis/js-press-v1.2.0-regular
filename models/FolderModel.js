import { Sequelize } from "sequelize";
import db from "../config/db.js";

const { DataTypes } = Sequelize;

const Folders = db.define('folder', 
{
    owner: {
        type: DataTypes.INTEGER
    }, 
    default_folder: {
        type: DataTypes.BOOLEAN
    },
    folder_name: {
        type: DataTypes.STRING
    },
    folder_key: {
        type: DataTypes.STRING
    },
},
{
    freezeTableName: true
});

export default Folders;