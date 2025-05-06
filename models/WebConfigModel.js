import { Sequelize } from "sequelize";
import db from "../config/db.js";

const { DataTypes } = Sequelize;

const WebConfig = db.define('webconfig', 
{
    site_title: {
        type: DataTypes.STRING
    }, 
    site_description: {
        type: DataTypes.STRING
    },
    site_favicon: {
        type: DataTypes.STRING
    },
    site_logo: {
        type: DataTypes.STRING
    },
    date_format: {
        type: DataTypes.STRING
    },
    google_fonts: {
        type: DataTypes.TEXT('long')
    },
    css_framework: {
        type: DataTypes.TEXT('long')
    },
    js_framework: {
        type: DataTypes.TEXT('long')
    },font_awesome_cdn: {
        type: DataTypes.STRING
    },
    mail_receiver: {
        type: DataTypes.STRING
    },
    mail_user: {
        type: DataTypes.STRING
    },
    mail_pass: {
        type: DataTypes.STRING
    },
    mail_SMTP_HOST: {
        type: DataTypes.STRING
    },
    mail_SMTP_PORT: {
        type: DataTypes.INTEGER
    },
    mail_SMTP_SECURE: {
        type: DataTypes.BOOLEAN
    },
},
{
    freezeTableName: true
});

export default WebConfig;