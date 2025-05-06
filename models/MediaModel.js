import { Sequelize } from "sequelize";
import db from "../config/db.js";

const { DataTypes } = Sequelize;

const Media = db.define('media', 
{
    media_name: {
        type: DataTypes.STRING
    }, 
    media_ext: {
        type: DataTypes.STRING
    },
    media_url: {
        type: DataTypes.STRING
    },
    media_folder: {
        type: DataTypes.STRING
    },
},
{
    freezeTableName: true
});

export default Media;