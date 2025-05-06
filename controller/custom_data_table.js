import fs from 'fs';
import { Op } from 'sequelize';
import CD_Table from '../models/custom_data_table_Model.js';
import CD_Item from '../models/custom_data_item_Model.js';
import Comments from '../models/CommentModel.js';
import Pages from '../models/PageModel.js';
import Users from "../models/UserModel.js";
import {get_date_format} from '../utils/date.js';
import WebConfig from '../models/WebConfigModel.js';

export const req_post_table = async(req,res)=> {
const {table_name,table_type,fieldsets} = req.body;
const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        // Jika tidak ada refreshToken, arahkan pengguna ke halaman login
        return res.redirect('/login');
    }
const createTable = await create_table(table_name,table_type,fieldsets,refreshToken);
if(createTable === 'Success'){
    return res.status(200).json({ msg: 'Custom Table Saved'});
} else {
    return res.status(500).json({ msg: createTable});
}
}

const create_table = async (table_name,table_type,fieldsets,refreshToken)=> {
    if(!table_name || !table_type || !fieldsets){
        return 'Table name or table type must be filled and fieldsets cannot be blanked'
    }
    try {
        const user = await Users.findOne({
            where: {
                refresh_token: refreshToken,
                role : "Administrator"
            }
        });
        if(!user){
            return 'You Must Login With Your Administrator Account';
        }

        await CD_Table.create({
            name : table_name,
            type : table_type,
            custom_fields: fieldsets,
        });
        return 'Success'
    } catch (error) {
        return `Something went wrong : ${error}`
    }
}

export const req_get_table = async(req,res)=> {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.redirect('/login');
    }
    try {
        const user = await Users.findOne({
            where: {
                refresh_token: refreshToken,
                role : "Administrator"
            }
        });
        if(!user){
            return 'You Must Login With Your Administrator Account';
        }
        const custom_table = await CD_Table.findAll({});
        return res.status(200).json({ custom_table});
    } catch (error) {
        return res.status(500).json({ msg: `Something went wrong : ${error}`});
    }
    }

export const delete_table = async(req,res) => {
    const {table_id} = req.query;
    if(!table_id){
        return res.status(404).json({msg: 'Custom Table Not Found'})
    }
    const tableId = parseInt(table_id,10);
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.redirect('/login');
    }
    try {
        const user = await Users.findOne({
            where: {
                refresh_token: refreshToken,
                role : "Administrator"
            }
        });
        if(!user){
            return 'You Must Login With Your Administrator Account';
        }
        const custom_table = await CD_Table.findByPk(tableId);
        if(!custom_table){
            return res.status(404).json({msg: 'Custom Table Not Found'})
        }
        if(custom_table.dynamic_page !== null){
            let err_msg = 'Custom Table is still linked to the page, Unlink it first';
            const page = await Pages.findByPk(custom_table.dynamic_page);
            if(page){
                err_msg = `Custom Table is still linked to the ${page.name} page, Unlink it first`;
            }

            return res.status(404).json({msg: `${err_msg}`})
        }
        
        const count_data = await CD_Item.count({
            where : {
                custom_post_tabel : custom_table.id
            }
        });
        if(count_data >= 1){
            const data_table = await CD_Item.findAll({
                where : {
                    custom_post_tabel : custom_table.id
                }
            });
            for(const data of data_table){
                const count_comments = await Comments.count({
                    where : {
                        custom_data_id : data.id
                    }
                });
                if(count_comments >= 1){
                    const comments = await Comments.findAll({
                        where : {
                            custom_data_id : data.id
                        }
                    }); 
                    for(const com of comments){
                        await com.destroy();
                    }
                }
                await data.destroy();
            }
        }
        await custom_table.destroy();
        return res.status(200).json({ msg: "Custom Table Deleted" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: `Internal server error : ${error}` });
    }
}

export const get_table = async(req,res)=>{
    const {table_id} = req.query;
    if(!table_id){
        return res.status(404).json({msg: 'Custom Table Not Found'})
    }
    const tableId = parseInt(table_id,10);
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.redirect('/login');
    }
    try {
        const user = await Users.findOne({
            where: {
                refresh_token: refreshToken,
                role : "Administrator"
            }
        });
        if(!user){
            return 'You Must Login With Your Administrator Account';
        }
        const custom_table = await CD_Table.findByPk(tableId);
        if(!custom_table){
            return res.status(404).json({msg: 'Custom Table Not Found'})
        }
        return res.status(200).json({ custom_table });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: `Internal server error : ${error}` });
    }
}

export const edit_table = async(req,res) => {
    const {table_name,table_type,fieldsets,table_id} = req.body;
    if(!table_id){
        return res.status(404).json({msg: 'Custom Table Not Found'})
    }
    const tableId = parseInt(table_id,10);
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.redirect('/login');
    }
    try {
        const user = await Users.findOne({
            where: {
                refresh_token: refreshToken,
                role : "Administrator"
            }
        });
        if(!user){
            return 'You Must Login With Your Administrator Account';
        }
        const custom_table = await CD_Table.findByPk(tableId);
        if(!custom_table){
            return res.status(404).json({msg: 'Custom Table Not Found'})
        }
        custom_table.name = table_name;
        custom_table.type = table_type;
        custom_table.custom_fields = fieldsets;
        
        await custom_table.save();
        return res.status(200).json({ msg: "Custom Table Saved" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: `Internal server error : ${error}` });
    }
}

export const get_all_table_Pagebuilder = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.redirect('/login');
    }
    const user = await Users.findOne({
        where: {
            refresh_token: refreshToken,
            role: "Administrator"
        }
    });
    if (!user) {
        return res.status(401).json({ msg: 'You Must Login With Your Administrator Account' });
    }
    try {
        const config = await WebConfig.findOne();
        const tables = await CD_Table.findAll();
        const data_tables = [];
        for (const DATA of tables) {
            let DT = DATA;
            let DTData = await get_data(DT.id);
            let dt_url = '#';
            if(DT.dynamic_page !== null){
                const page = await Pages.findByPk(DT.dynamic_page);
                if(page){
                    dt_url = `/${page.url}/${DTData.url}`
                }
            }
            DTData.url = dt_url;
            const date = get_date_format(config.date_format,DTData.createdAt);
            const authors = await Users.findByPk(DTData.author);
        
            let authorProfile = `/Media/avatar/Default-avatar.jpg`;
            let authorName = `Anonym`;
            let authorUser = `Anonym`;
            if(authors){
                authorProfile = `/Media/avatar/${authors.username}.png`;
                authorName = authors.name;
                authorUser = authors.username;
            }
            const dataAuthorName = {
                name : 'Author Name',
                value : authorName,
            }
            const AuthorNameField = {
                type : 'Text',
                name : 'Author Name',
                label : 'Author Name',
                value : authorName,
            }
            const getDate = {
                name : 'Date',
                value : date,
            }
            const dateField = {
                type : 'Text',
                name : 'Date',
                label : 'Date',
                value : date,
            }
            const authorAvatarField = {
                type : 'Media',
                name : 'Author Avatar',
                label : 'Author Avatar',
                value : authorProfile,
            }
            const AuthorAvatar = {
                name : 'Author Avatar',
                value : authorProfile,
            }
            const dataAuthorUser = {
                name : 'Author Username',
                value : authorUser,
            }
            const AuthorUserField = {
                type : 'Text',
                name : 'Author Username',
                label : 'Author Username',
                value : authorUser,
            }
            const offsetNumber = {
                name : 'Offset Number',
                value : '1',
            }
            const offsetNumberField = {
                type : 'Text',
                name : 'Offset Number',
                label : 'Offset Number',
                value : '1',
            }
            DTData.content = JSON.parse(DTData.content);
            DTData.content.push(getDate);
            DTData.content.push(AuthorAvatar);
            DTData.content.push(dataAuthorName);
            DTData.content.push(dataAuthorUser);
            DTData.content.push(offsetNumber);
            DTData.content = JSON.stringify(DTData.content);
            
            DT.custom_fields = JSON.parse(DT.custom_fields);
            DT.custom_fields.push(dateField);
            DT.custom_fields.push(authorAvatarField);
            DT.custom_fields.push(AuthorNameField);
            DT.custom_fields.push(AuthorUserField);
            DT.custom_fields.push(offsetNumberField);
            DT.custom_fields = JSON.stringify(DT.custom_fields);
            //===================================//
            const transformedComp = {
                id: DT.id,
                name: DT.name,
                type: DT.type,
                custom_fields: DT.custom_fields,
                data: DTData,
                dynamic_page : DT.dynamic_page,
            };
            data_tables.push(transformedComp);
            //===================================//
        }
        return res.status(200).json({ data_tables });
    } catch (error) {
        return res.status(500).json({ msg: `Internal server error : ${error}` });
    }
}

const get_data = async(tableID) => {
    let orderCriteria = [['createdAt', 'DESC']];
    let dataRender;
    try {
        const componentrender = await CD_Item.findOne({
            where: {
                custom_post_tabel: tableID,
            },
            order: orderCriteria,
        });
        if (!componentrender) {
            dataRender = {};
        } else {
            dataRender = componentrender;
        }
        return dataRender;
    } catch (error) {
        console.error(`Error in get_data function: ${error}`);
        return null; // or handle the error according to your requirement
    }
}
