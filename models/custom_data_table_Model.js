import { Sequelize } from "sequelize";
import db from "../config/db.js";

const { DataTypes } = Sequelize;

const CD_Table = db.define('custom_data_table', 
{
    name: {
        type: DataTypes.STRING
    }, 
    type: {
        type: DataTypes.STRING
    },
    dynamic_page: {
        type: DataTypes.INTEGER
    },
    custom_fields: {
        type: DataTypes.TEXT('long')
    },
},
{
    freezeTableName: true
});

export default CD_Table;