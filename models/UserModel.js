import { Sequelize } from "sequelize";
import db from "../config/db.js";

const { DataTypes } = Sequelize;
const Users = db.define('users', 
{
    verified: {
        type: DataTypes.STRING
    },
    role: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING // Perbaikan: Ganti DataType menjadi DataTypes
    },
    username: {
        type: DataTypes.STRING
    },
    avatar: {
        type: DataTypes.TEXT
    },
    location: {
        type: DataTypes.STRING
    },
    country: {
        type: DataTypes.STRING
    },
    facebook: {
        type: DataTypes.STRING
    },
    github: {
        type: DataTypes.STRING
    },
    instagram: {
        type: DataTypes.STRING
    },
    dribble: {
        type: DataTypes.STRING
    },
    linkedin: {
        type: DataTypes.STRING
    },
    quote: {
        type: DataTypes.TEXT
    },
    emailShow: {
        type: DataTypes.BOOLEAN
    },
    default_pageSetting: {
        type: DataTypes.STRING
    },
    default_folder: {
        type: DataTypes.STRING
    },
    refresh_token: {
        type: DataTypes.TEXT
    },
    AuthToken:{
        type: DataTypes.STRING
    },
    reputation:{
        type: DataTypes.INTEGER
    },
    saved:{
        type: DataTypes.INTEGER
    },
    credit:{
        type: DataTypes.INTEGER
    }
},
{
    freezeTableName: true
});

export default Users;
