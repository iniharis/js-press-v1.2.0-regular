import fs from 'fs';
import { Sequelize,Op } from 'sequelize';
import Pages from '../models/PageModel.js';
import CD_Table from '../models/custom_data_table_Model.js';
import CD_Item from '../models/custom_data_item_Model.js';
import Users from "../models/UserModel.js";
import WebConfig from '../models/WebConfigModel.js';
import {getHexaverA} from '../utils/generaterandomAlphabet.js';
import {get_date_format} from '../utils/date.js';

export const req_get_data = async(req,res)=> {
    const {table_id,data_id} = req.query;
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.redirect('/login');
    }
    const TableId = parseInt(table_id);
    let data = 'new-data'
    try {
        const user = await Users.findOne({
            where: {
                refresh_token: refreshToken,
                role : "Administrator"
            }
        });
        if(!user){
            return res.status(404).json({ msg: `No Admin Account, Please Reload`});
        }
        const custom_table = await CD_Table.findByPk(TableId);
        if(!custom_table){
            return res.status(404).json({ msg: `No Custom Table Found`});
        }
        if(data_id !== 'new_data'){
            const new_data = await CD_Item.findByPk(parseInt(data_id,10));
            if(!new_data){
                return res.status(404).json({ msg: `No Custom Data Found`});
            }
            data = {
                custom_post_tabel: new_data.custom_post_tabel,
                title: new_data.title,
                url: new_data.url,
                content : new_data.content,
                id: new_data.id,
            };
            if(custom_table.dynamic_page !== null){
                const page = await Pages.findByPk(custom_table.dynamic_page);
                if(page){
                    const dataUrl = `/${page.url}/${data.url}`
                    data.urlPage = dataUrl;
                }
            }
        }

        return res.status(200).json({ custom_table,data});
    } catch (error) {
        return res.status(500).json({ msg: `Something went wrong : ${error}`});
    }
    }

export const post_data = async(req,res)=>{
    const {input_table,input_title,input_url,input_content,input_ID} = req.body;
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        // Jika tidak ada refreshToken, arahkan pengguna ke halaman login
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
            return res.status(404).json({ msg: `No Admin Account, Please Reload`});
        }
    const table = await CD_Table.findByPk(parseInt(input_table,10));
    if(!table){
        return res.status(404).json({ msg: `No Custom Table Found`}); 
    }
    let url_input = input_url;
    if(input_ID === 'new'){
        const new_input = await CD_Item.create({
            custom_post_tabel : table.id,
            title : input_title,
            url : url_input,
            content : input_content,
            author : user.id,
        });
        return res.status(200).json({ msg : `/${table.id}/${new_input.id}`});
    } else {
        const data_input = await CD_Item.findByPk(parseInt(input_ID,10));  
        if(!data_input){
            const new_input = await CD_Item.create({
                custom_post_tabel : table.id,
                title : input_title,
                url : input_url,
                content : input_content
            });
            return res.status(200).json({ msg : `/${table.id}/${new_input.id}`}); 
        }
        const count_dataInput = await CD_Item.findOne({
            where : {
                url: input_url,
                custom_post_tabel : table.id,
            }
        });
        if(count_dataInput && count_dataInput.id !== data_input.id){
            const thisDate = Date.now();
            const page_key = getHexaverA(user.id,thisDate,"url-");
            url_input = page_key.toLowerCase();
        }
        data_input.title = input_title;
        data_input.url = url_input;
        data_input.content = input_content;
        await data_input.save();
        return res.status(200).json({ msg : `/${table.id}/${data_input.id}`}); 
    }
    } catch (error) {
        return res.status(500).json({ msg: `Something went wrong : ${error}`});
    }
}

export const getDatas = async (req, res) => {
    const {keyword, dataoffset,table_id,dataLimit } = req.query;
    const offset = parseInt(dataoffset, 10);
    const renderLimit = parseInt(dataLimit,10);
    let orderCriteria = [['createdAt', 'DESC']];
    const tableId = parseInt(table_id,10);
    let whereClause = {custom_post_tabel : tableId};
    
    if (typeof keyword === 'string' && keyword.trim() !== '') {
        whereClause = {
            custom_post_tabel: tableId, // Gunakan folder yang sudah diperiksa
            [Op.and]: [
                {
                    [Op.or]: [
                        { title: { [Op.like]: `%${keyword}%` } },
                        { url: { [Op.like]: `%${keyword}%` } },
                        { content: { [Op.like]: `%${keyword}%` } },
                    ],
                },
            ],
        };
    }
    try {
        // Hitung total komponen
        const totalCount = await CD_Item.count({
            where: whereClause,
        });

        // Dapatkan data komponen dengan pengaturan yang diberikan
        const  componentrender = await CD_Item.findAll({
            // attributes: ['component_name','id','tags','description','component_folder','pagesetting'],
            where: whereClause,
            order: orderCriteria,
            offset: parseInt(offset) || 0,
            limit: renderLimit,
        });
        const newOffset = offset + renderLimit;

        const components = [];
        for (const comp of componentrender) {
            components.push(comp);
            //===================================//
        }
        
        res.status(200).json({
            totalCount,
            keyword,
            offset,
            newOffset,
            components,
            table_id :tableId,
            renderLimit
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  export const getDatasADM = async (req, res) => {
    const {keyword, dataoffset,table_id,dataLimit } = req.query;
    const offset = parseInt(dataoffset, 10);
    const renderLimit = parseInt(dataLimit,10);
    let orderCriteria = [['createdAt', 'DESC']];
    const tableId = parseInt(table_id,10);
    let whereClause = {custom_post_tabel : tableId};
    
    if (typeof keyword === 'string' && keyword.trim() !== '') {
        whereClause = {
            custom_post_tabel: tableId, // Gunakan folder yang sudah diperiksa
            [Op.and]: [
                {
                    [Op.or]: [
                        { title: { [Op.like]: `%${keyword}%` } },
                        { url: { [Op.like]: `%${keyword}%` } },
                        { content: { [Op.like]: `%${keyword}%` } },
                    ],
                },
            ],
        };
    }
    try {
        // Hitung total komponen
        const totalCount = await CD_Item.count({
            where: whereClause,
        });

        // Dapatkan data komponen dengan pengaturan yang diberikan
        const  componentrender = await CD_Item.findAll({
            attributes: ['title','id','url'],
            where: whereClause,
            order: orderCriteria,
            offset: parseInt(offset) || 0,
            limit: renderLimit,
        });
        const newOffset = offset + renderLimit;

        const table = await CD_Table.findByPk(tableId);
        let pageURL = null;
        if(table && table.dynamic_page !== null){
            const dynamicPage = await Pages.findByPk(table.dynamic_page);
            if(dynamicPage){
                pageURL = dynamicPage.url
            }
        }

        const components = [];
        for (const comp of componentrender) {
            let new_comp = {title : comp.title, id : comp.id}
            if(pageURL !== null){
                new_comp = {title : comp.title, id : comp.id, url: `/${pageURL}/${comp.url}`}
            }
            components.push(new_comp);
            //===================================//
        }
        
        res.status(200).json({
            totalCount,
            keyword,
            offset,
            newOffset,
            components,
            table_id :tableId,
            renderLimit
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  export const deleteDatas = async (req,res) => {
    const {data_id} = req.query;
    if(!data_id){
        return res.status(403).json({ msg: 'Comment id missing' });
    }
    const dataID = parseInt(data_id,10);
    const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(404).json({ msg: 'There is No Users, Please reload' });
            }
        const user = await Users.findOne({
            where: {
                refresh_token: refreshToken,
                role : 'Administrator'
            }
        });
        if(!user){
            return res.status(404).json({ msg: 'There is No Users, Please reload' });
        }
    try {
        const data = await CD_Item.findByPk(dataID);
        if(!data){
            return res.status(404).json({ msg: 'Comment Not Found, please reload and try again' });
        }
        await data.destroy();
        return res.status(200).json({ msg: "Data Deleted" });
    } catch (error) {
        res.status(500).json({ msg: `Internal Server Error : ${error}` });
    }
}

export const duplicateDatas = async (req,res) => {
    const {data_id} = req.body;
    if(!data_id){
        return res.status(403).json({ msg: 'Data id missing' });
    }
    const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(404).json({ msg: 'There is No Users, Please reload' });
            }
        const user = await Users.findOne({
            where: {
                refresh_token: refreshToken,
                role : 'Administrator'
            }
        });
        if(!user){
            return res.status(404).json({ msg: 'There is No Users, Please reload' });
        }
    const dataId = parseInt(data_id,10);
    try {
        const data = await CD_Item.findByPk(dataId);
            if(!data){
                return res.status(404).json({ msg: 'Data Not Found, please reload and try again' });
            }
        const new_data = await CD_Item.create();
        new_data.custom_post_tabel = data.custom_post_tabel;
        new_data.title =  `${data.title}-${new_data.id}`;
        new_data.url = `${data.url}-${new_data.id}`;
        new_data.content =  data.content;
        await new_data.save();
        return res.status(200).json({ msg: "Duplicate Data Success" });
    } catch (error) {
        res.status(500).json({ msg: `Internal Server Error : ${error}` });
    }
}

export const getDynamicContent = async (req, res) => {
    const { tableid, filters, Offset, renderlimit,searchquery,orderQuery } = req.query;
    const tableId = parseInt(tableid, 10);
    const renderLimit = parseInt(renderlimit, 10);
    const offset = parseInt(Offset, 10);
    let dataorder = [['createdAt', 'DESC']];
  if(orderQuery){
    switch (orderQuery) {
        case 'CreatedAt Desc':
            dataorder = [['createdAt', 'DESC']];
            break;
        case 'CreatedAt Asc':
            dataorder = [['createdAt', 'ASC']];
            break;
        case 'UpdatedAt Desc':
            dataorder = [['UpdatedAt', 'DESC']];
            break;
        case 'UpdatedAt Asc':
            dataorder = [['UpdatedAt', 'ASC']];
            break;
        case 'Title A-Z':
            dataorder = [['title', 'ASC']]
            break;
        case 'Title Z-A':
            dataorder = [['title', 'DESC']]
            break;
        case 'Random':
            dataorder = Sequelize.literal('RAND()')
            break;
    
        default:
            dataorder = [['createdAt', 'DESC']];
            break;
    }
  }
    // Convert filters from string to JSON if necessary
    let parsedFilters = [];
    try {
      parsedFilters = JSON.parse(filters);
      if(searchquery){
        let searchFilter = JSON.parse(searchquery)
        searchFilter.forEach(element => {
            parsedFilters.push(element)
        });
      }
    } catch (error) {
      return res.status(400).json({ error: 'Invalid filters format' });
    }
  
    // Build the whereClause
    const whereClause = buildWhereClause(parsedFilters,tableId);
    
    try {
      const config = await WebConfig.findOne();
      const data = [];
      let dataPage = null;
      const dataList = await CD_Item.findAll({
        where: whereClause,
        limit: renderLimit,
        offset: offset,
        order: dataorder
      });
      let dataURL = '#';
      const table = await CD_Table.findByPk(tableId);
      if(table.dynamic_page !== null){
        const page = await Pages.findByPk(table.dynamic_page);
        if(page){
            dataPage = page;
            dataURL = `/${page.url}/`
        }
      }
      let data_offset = offset;
      for(let dt of dataList){
        data_offset += 1;
        if(dataPage !== null){
            dt.url = dataURL + `${dt.url}`;
        } else {
            dt.url = dataURL;
        }
        const authors = await Users.findByPk(dt.author);
        const date = get_date_format(config.date_format,dt.createdAt);
        let authorUsername = {name : 'Author Username', value : 'Anonnym'};
        let authorName = {name : 'Author Name', value : 'Anonnym'};
        let authorAvatar = {name : 'Author Avatar', value : `/Media/avatar/Default-avatar.jpg`};
        const getDate = {name : 'Date',value : date};
        let Offset_Number = {name : 'Offset Number', value : `${data_offset}`};
        if(authors){
            authorUsername.value = authors.username;
            authorName.value = authors.name;
            authorAvatar.value = `/Media/avatar/${authors.username}.png`;
        }
        dt.content = JSON.parse(dt.content);
        dt.content.push(authorUsername);
        dt.content.push(authorName);
        dt.content.push(authorAvatar);
        dt.content.push(getDate);
        dt.content.push(Offset_Number);
        dt.content = JSON.stringify(dt.content);
        data.push(dt)
      }
      const total = await CD_Item.count({
        where: whereClause
      });
      const nextoffset = renderLimit + offset;
      res.status(200).json({data,total,nextoffset});
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

function buildWhereClause(filters,tableId) {
    const where = {};
    where.custom_post_tabel = tableId;
    if(filters === null){
        return where
    }
    filters.forEach(filter => {
      let { field, type, condition, value } = filter;
      condition = condition.toLowerCase();
      switch (field) {
        case 'title':
            if (condition === 'include') {
                where[field] = { [Op.like]: `%${value}%` };
              }
              else if (condition === 'exclude') {
                where[field] = { [Op.notLike]: `%${value}%` };
              }
            break;
      
        default:
            if (condition === 'include') {
                if(type === 'Checkbox'){
                     where.content = {[Op.like]: `%{"name":"${field}","value":${value}}%`};
                } else {
                    where.content = {[Op.like]: `%{"name":"${field}","value":"%${value}%"}%`};
                }
            } else if (condition === 'exclude') {
                if(field === 'Checkbox'){
                    where.content = { [Op.notLike]: `%{"name":"${field}","value":${value}}%` };
                } else {
                    where.content = { [Op.notLike]: `%{"name":"${field}","value":"%${value}%"}%` };
                }
            }
            break;
      }
    });
    return where;
  }