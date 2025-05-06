import { Sequelize } from "sequelize";
import db from "../config/db.js";

const { DataTypes } = Sequelize;

const Components = db.define('components', 
{
    owner: {
        type: DataTypes.INTEGER
    }, 
    publicity: {
        type: DataTypes.STRING
    },
    component_name: {
        type: DataTypes.STRING
    },
    component_folder: {
        type: DataTypes.STRING
    },
    pagesetting: {
        type: DataTypes.STRING
    },
    content: {
        type: DataTypes.TEXT('long')
    },
    tags: {
        type: DataTypes.TEXT
    },
    description: {
        type: DataTypes.TEXT
    },
    downloaded: {
        type: DataTypes.INTEGER
    },
    views: {
        type: DataTypes.INTEGER
    },
    thanks: {
        type: DataTypes.INTEGER
    },
},
{
    freezeTableName: true
});

export default Components;