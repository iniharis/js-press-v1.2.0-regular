import { Sequelize } from "sequelize";
import db from "../config/db.js";

const { DataTypes } = Sequelize;

const PageSetting = db.define('pagesetting', 
{
    owner: {
        type: DataTypes.INTEGER
    },
    pagesetting_key: {
        type: DataTypes.STRING
    },
    pagesetting_name: {
        type: DataTypes.STRING
    },
    pagesetting_default: {
        type: DataTypes.BOOLEAN
    },
    private: {
        type: DataTypes.BOOLEAN
    },
    body_font: {
        type: DataTypes.STRING
    },
    overflow_x: {
        type: DataTypes.STRING
    },
    background_color: {
        type: DataTypes.STRING
    },
    background_opacity: {
        type: DataTypes.INTEGER
    },
    background_val: {
        type: DataTypes.STRING
    },
    margin_parameter: {
        type: DataTypes.STRING
    },
    margin_top: {
        type: DataTypes.INTEGER
    },
    margin_right: {
        type: DataTypes.INTEGER
    },
    margin_bottom: {
        type: DataTypes.INTEGER
    },
    margin_left: {
        type: DataTypes.INTEGER
    },
    padding_parameter: {
        type: DataTypes.STRING
    },
    padding_top: {
        type: DataTypes.INTEGER
    },
    padding_right: {
        type: DataTypes.INTEGER
    },
    padding_bottom: {
        type: DataTypes.INTEGER
    },
    padding_left: {
        type: DataTypes.INTEGER
    },
    additional_css: {
        type: DataTypes.TEXT
    },
    mobile_breakpoint: {
        type: DataTypes.INTEGER
    },
    tablet_breakpoint: {
        type: DataTypes.INTEGER
    },
    font_selection: {
        type: DataTypes.TEXT
    },
    color_palatte: {
        type: DataTypes.TEXT
    },
    custom_css: {
        type: DataTypes.TEXT
    },
    custom_js: {
        type: DataTypes.TEXT
    },
    css_framework: {
        type: DataTypes.TEXT
    },
    animation_array: {
        type: DataTypes.TEXT
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
    thanks: {
        type: DataTypes.INTEGER
    },
    views: {
        type: DataTypes.INTEGER
    },
    css_target: {
        type: DataTypes.STRING
    },
},
{
    freezeTableName: true
});

export default PageSetting;
