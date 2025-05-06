import { Sequelize } from "sequelize";
import db from "../config/db.js";

const { DataTypes } = Sequelize;

const Pages = db.define('page', 
{
    name: {
        type: DataTypes.STRING
    }, 
    publicity: {
        type: DataTypes.BOOLEAN
    },
    page_key: {
        type: DataTypes.STRING
    },
    folder: {
        type: DataTypes.STRING
    },
    pagesetting: {
        type: DataTypes.STRING
    },
    url: {
        type: DataTypes.STRING
    },
    homepage: {
        type: DataTypes.BOOLEAN
    },
    page404: {
        type: DataTypes.BOOLEAN
    },
    tags: {
        type: DataTypes.TEXT('long')
    },
    description: {
        type: DataTypes.TEXT('long')
    },
    components: {
        type: DataTypes.TEXT('long')
    },
    custom_function: {
        type: DataTypes.TEXT('long')
    },
    dynamic_page : {
        type: DataTypes.INTEGER
    },
    redirect : {
        type: DataTypes.INTEGER
    },
    url_query : {
        type: DataTypes.BOOLEAN
    },
},
{
    freezeTableName: true
});

export default Pages;