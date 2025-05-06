import { Sequelize } from "sequelize";
import db from "../config/db.js";

const { DataTypes } = Sequelize;

const CD_Item = db.define('custom_data_item', 
{
    custom_post_tabel: {
        type: DataTypes.INTEGER
    },
    author: {
        type: DataTypes.INTEGER
    }, 
    title: {
        type: DataTypes.STRING
    },
    url: {
        type: DataTypes.STRING
    },
    content: {
        type: DataTypes.TEXT('long')
    },
},
{
    freezeTableName: true
});

export default CD_Item;