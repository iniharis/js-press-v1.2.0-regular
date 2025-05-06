import Pages from '../models/PageModel.js';
import Custom_function from '../models/custom_functionModel.js';
import CD_Table from '../models/custom_data_table_Model.js';
import CD_Item from '../models/custom_data_item_Model.js';
import Components from '../models/ComponentModel.js';
import WebConfig from "../models/WebConfigModel.js";
import Folders from '../models/FolderModel.js';
import Users from "../models/UserModel.js";
import PageSetting from "../models/PageSettingModel.js";
import Sequelize, { INTEGER } from 'sequelize';
import fs from 'fs';
import { Op } from 'sequelize';
import {getHexaverA,getHexa} from '../utils/generaterandomAlphabet.js';
import {get_date_format} from '../utils/date.js';

export const CreatePage = async (req,res) => {
    try {
        const folder = await Folders.findOne({
            where: {
                default_folder : true,
            }
        });
        const PS = await PageSetting.findOne({
            where: {
                pagesetting_default : true,
            }
        });
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            // Jika tidak ada refreshToken, arahkan pengguna ke halaman login
            return res.redirect('/login');
        }
    
        // Temukan pengguna yang sesuai dengan refreshToken
        const user = await Users.findOne({
            where: {
                refresh_token: refreshToken
            }
        });
        if(!user){
            return res.status(404).json({ msg: 'There is No Users, Please reload' });
        }
        const thisDate = Date.now();
        const page_key = getHexaverA(user.id,thisDate,"Page_"); 
        const newPage = await Pages.create({
            name: 'New Page',
            publicity: false,
            page_key: page_key,
            folder: folder.folder_key,
            pagesetting: PS.pagesetting_key,
            url : page_key,
            homepage : false,
            page404 : false,
            tags : '',
            description : '',
            components: '',
            custom_function : '',
            url_query : false,
        });
        const filePath = `./views/JS-Press-Public/page-${newPage.id}.ejs`;
        const pageScriptFilePath = await getPageScriptEJS(newPage.id,'');
          const dataContent = `
\n<html>
<head>
<meta charset="UTF-8">  
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${newPage.name}</title>
<meta name="keywords" content="${newPage.tags}">
<meta name="description" content="${newPage.description}">
<%- include('../Pagesettings/ps-head-${PS.id}') %>
</head>
<body>
<%- include('../Pagesettings/ps-script-${PS.id}') %>
${pageScriptFilePath}
</body>
</html>
      
          `;
          fs.writeFile(filePath, dataContent, (err) => {
            if (err) {
              console.error('Failed to write the file:', err);
            }
          });
        return res.status(200).json({msg: "Publish Successful"})
    } catch (error) {
        return res.status(500).json({ msg: `Internal server error ${error}` });
    }
    }

export const getPages = async (req, res) => {
        const {keyword, dataoffset,searchFolder } = req.query;
        const offset = parseInt(dataoffset, 10);
        const renderLimit = 6;
        let orderCriteria = [['createdAt', 'DESC']];
        let folder = searchFolder;
        let whereClause = {folder: folder};
        if(folder == 'all-folder'){
            folder = ''
            whereClause = {};
        }
        if(folder === 'main-page'){
            whereClause = {
                [Sequelize.Op.or]: [
                { homepage: true },
                { page404: true } ]
            };
        }
        if (typeof keyword === 'string' && keyword.trim() !== '' && searchFolder!== 'main-page') {
            if(folder == ''){
                whereClause = {
                    [Op.and]: [
                        {
                            [Op.or]: [
                                { name: { [Op.like]: `%${keyword}%` } },
                                { tags: { [Op.like]: `%${keyword}%` } },
                                { description: { [Op.like]: `%${keyword}%` } },
                            ],
                        },
                    ],
                };  
            } else {
                whereClause = {
                    folder: folder, // Gunakan folder yang sudah diperiksa
                    [Op.and]: [
                        {
                            [Op.or]: [
                                { name: { [Op.like]: `%${keyword}%` } },
                                { tags: { [Op.like]: `%${keyword}%` } },
                                { description: { [Op.like]: `%${keyword}%` } },
                            ],
                        },
                    ],
                };
            }
        }
        try {
            // Hitung total komponen
            const totalCount = await Pages.count({
                where: whereClause,
            });
    
            // Dapatkan data komponen dengan pengaturan yang diberikan
            const  componentrender = await Pages.findAll({
                // attributes: ['component_name','id','tags','description','component_folder','pagesetting'],
                where: whereClause,
                order: orderCriteria,
                offset: parseInt(offset) || 0,
                limit: renderLimit,
            });
            const newOffset = offset + renderLimit;
    
            const components = [];
            for (const comp of componentrender) {
                // const pagesettingkey = encodingWORD(comp.pagesetting);
                // const contentID = encodingWORD(comp.id);
                // const message = 'view'
                // const idNumber = Date.now();
                // const hyperlink = message + '--' + contentID + '--' + pagesettingkey + '--' + idNumber;
                // function encodingWORD(word){
                //     const keyword = word.toString();
                //     // console.log(keyword)
                //     const keywordArray = keyword.split('');
                //     const newArray = [];
                    
                //     keywordArray.forEach((element) => {
                //         let newElement = encodeChar(element.toLowerCase());
                //         newArray.push(newElement);
                //     });
                //     let newkeyword = ''
                //     newArray.forEach(element => {
                //         newkeyword+=element
                //     });
                    
                //     return newkeyword
                //     }
                    
                // function encodeChar(character){
                //         let encoded  = character;
                //         encoderArray.forEach(element => {
                //             if(element.decode === encoded){
                //                 encoded = element.encode;
                //             }
                //         });
                //         return encoded
                //     }
                // //===================================//
                // const transformedComp = {
                //     component_name: comp.component_name,
                //     id : comp.id,
                //     content : comp.content,
                //     tags: comp.tags,
                //     description : comp.description,
                //     component_folder : comp.component_folder,
                //     pagesetting : comp.pagesetting,
                //     viewlink : hyperlink,
                // };
                components.push(comp);
                //===================================//
            }
            
            res.status(200).json({
                totalCount,
                keyword,
                offset,
                newOffset,
                components,
                folder_search :searchFolder,
                renderLimit
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
      };

export const getPageOnEditor = async (req,res) =>{
    const {pageID} = req.query;
    const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            // Jika tidak ada refreshToken, arahkan pengguna ke halaman login
            return res.redirect('/login');
        }
    
        // Temukan pengguna yang sesuai dengan refreshToken
        const user = await Users.findOne({
            where: {
                refresh_token: refreshToken
            }
        });
        if(!user){
            return res.status(404).json({ msg: 'There is No Users, Please reload' });
        }
        const pageId = parseInt(pageID,10);
        try {
            const page = await Pages.findByPk(pageId);
            if(!page){
                return res.status(404).json({ msg: "Page Not Found"});
            }
            const components = [];
            const custom_functions = await getCustomFunction(page.custom_function.split('--'));
            let dynamic_table = await getTableandContent(page.dynamic_page);
            let pagesettings = await getPageSetting(page.pagesetting);
            let getScriptObject = await getScriptTXT(page.id);
            const pageComponents = page.components.split('--');
            for (let comps of pageComponents){
                if(comps !== ''){
                    const dataTXT = await getComponentTXT(comps);
                    components.push(dataTXT)
                }
            }
            const webConfig = await WebConfig.findOne();
            return res.status(200).json({task: 'new-render', page,webConfig,components,custom_functions,pagesettings,dynamic_table,object: getScriptObject });
        } catch (error) {
            return res.status(500).json({ msg: `Failed to get a Page ${error.message}`, error: error.message });
        }
}

const getCustomFunction = async (pageCF)=>{
const custom_functions = [];
for (let custom of pageCF) {
    if (custom !== '') {
        const CF = custom.split('_');
            const cf_position = CF[1];
            const custom_function = await Custom_function.findByPk(CF[0]);
            if(custom_function){
                const datatxt = await fs.promises.readFile(custom_function.txt_path, 'utf8');
                const customFunction = {
                    name :custom_function.name,
                    code : datatxt,
                    position : cf_position
                }
                custom_functions.push(customFunction)
            }
    }
}
    return custom_functions
}

export const getScriptTXT = async (pageid)=>{
    const filePath = `./views/Page-Script/dynamic-script-${pageid}.txt`;
    const datatxt = await fs.promises.readFile(filePath, 'utf8');
    return datatxt
}

export const getScriptEJS = async (pageid)=>{
    const filePath = `./views/Page-Script/dynamic-script-${pageid}.ejs`;
    const datatxt = await fs.promises.readFile(filePath, 'utf8');
    return datatxt
}

const getTableandContent = async(tableID)=>{
    const tableId = parseInt(tableID,10);
    let orderCriteria = [['createdAt', 'DESC']];
    let custom_table = {};
    const custom_table_check = await CD_Table.findByPk(tableId);
        if(!custom_table_check){
            return 'not found'
        }
    if(custom_table_check){
        custom_table = custom_table_check
    }
    let dataContent = {};
    const componentrender = await CD_Item.findOne({
            where: {
                custom_post_tabel: tableId,
            },
            order: orderCriteria,
        });
    if(componentrender){
        const config = await WebConfig.findOne();
        dataContent = componentrender;
        dataContent.content = JSON.parse(dataContent.content);
        const date = get_date_format(config.date_format,dataContent.createdAt);
        const getDate = {name : 'Date',value : date,}
        const dateField = {type : 'Text',name : 'Date',label : 'Date',value : date,}
        custom_table.custom_fields = JSON.parse(custom_table.custom_fields);
        const authors = await Users.findByPk(dataContent.author);
        let authorProfile = {name : 'Author Avatar',value : '/Media/avatar/Default-avatar.jpg'};
        let authorProfile_field = {type : 'Text',label : 'Author Avatar',name : 'Author Avatar',value : '/Media/avatar/Default-avatar.jpg'};
        let authorName = {name : 'Author Name', value : 'Anonym'};
        let authorName_field = {type : 'Text',label : 'Author Name',name : 'Author Name', value : 'Anonym'};
        let authorUser = {name : 'Author Username', value : 'Anonym'};
        let authorUser_field = {type : 'Text',label : 'Author Username',name : 'Author Username', value : 'Anonym'};
        if(authors){
            authorProfile.value = `/Media/avatar/${authors.username}.png`;
            authorName.value = authors.name;
            authorUser.value = authors.username;
            authorProfile_field.value = `/Media/avatar/${authors.username}.png`;
            authorName_field.value = authors.name;
            authorUser_field.value = authors.username;
        }
        //=============================//
        dataContent.content.push(getDate)
        dataContent.content.push(authorProfile)
        dataContent.content.push(authorName)
        dataContent.content.push(authorUser)
        dataContent.content = JSON.stringify(dataContent.content);

        custom_table.custom_fields.push(dateField);
        custom_table.custom_fields.push(authorProfile_field);
        custom_table.custom_fields.push(authorName_field);
        custom_table.custom_fields.push(authorUser_field);
        custom_table.custom_fields = JSON.stringify(custom_table.custom_fields);
    }

    const dataTable = {
        id: custom_table.id,
        name: custom_table.name,
        type: custom_table.type,
        custom_fields: custom_table.custom_fields,
        data: dataContent,
        dynamic_page : custom_table.dynamic_page,
    };
    return dataTable
}

const getComponentTXT = async (ComponentID)=>{
    const filePath = `./views/Components/component-${ComponentID}.txt`;
    const datatxt = await fs.promises.readFile(filePath, 'utf8');
    return datatxt
}

const getPageScriptEJS = async (pageID, dynamic_data) => {
    const filePath = `./views/Page-Script/dynamic-script-${pageID}.ejs`;
    const objectPath = `./views/Page-Script/dynamic-script-${pageID}.txt`;
    // Jika dynamic_data adalah string kosong, overwrite file dengan isi kosong dan return
    if (dynamic_data === '') {
        await fs.promises.writeFile(filePath, '');
        await fs.promises.writeFile(objectPath, '');
        return `<%- include('../Page-Script/dynamic-script-${pageID}') %>`;
    }

    // Cek apakah file ada atau tidak
    try {
        const datatxt = await fs.promises.readFile(filePath, 'utf8');
        return `<%- include('../Page-Script/dynamic-script-${pageID}') %>`;
    } catch (err) {
        if (err.code === 'ENOENT') {
            await fs.promises.writeFile(filePath, '');
            await fs.promises.writeFile(objectPath, '');
            return `<%- include('../Page-Script/dynamic-script-${pageID}') %>`;
        } else {
            // Tangani kesalahan lainnya
            throw err;
        }
    }
}

const getPageSetting = async (pagesettingkey)=>{
let pagesetting = {};
const PS = await PageSetting.findOne({
    where : {
        pagesetting_key : pagesettingkey
    }
})
if(PS){
    pagesetting = PS  
}
return pagesetting
}

export const DeletePage = async (req,res) => {
    const {CompID} = req.query;  
    const pageId = parseInt(CompID, 10);
    try {
        const page = await Pages.findByPk(pageId);
        if(!page){
            return res.status(404).json({ msg: "Page Not Found"});
        }

        if(page.homepage === true){
            return res.status(403).json({ msg: "You cannot delete Homepage"});
        }
        if(page.page404 === true){
            return res.status(403).json({ msg: "You cannot delete Page 404"});
        }
        if(page.dynamic_page !== null){
            return res.status(403).json({ msg: "Unattached Table First before delete this page"});
        }

        await page.destroy();

        const filePath = `./views/JS-Press-Public/page-${page.id}.ejs`;
        const scriptPath = `./views/Page-Script/dynamic-script-${page.id}.ejs`;
        const objectPath = `./views/Page-Script/dynamic-script-${page.id}.txt`;
        fs.unlink(filePath, (err) => {
            if (err) {
              console.error('Failed deleting file:', err);
            } else {
              console.log('Delete Success:', filePath);
            }
          });
        fs.unlink(scriptPath, (err) => {
            if (err) {
              console.error('Failed deleting file:', err);
            } else {
              console.log('Delete Success:', filePath);
            }
          });
        fs.unlink(objectPath, (err) => {
            if (err) {
              console.error('Failed deleting file:', err);
            } else {
              console.log('Delete Success:', filePath);
            }
          });

        return res.status(200).json({ msg: "Page Deleted" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Failed to delete Page", error: error.message });
    }
}
export const DuplicatePage = async (req,res) => {
    const {original_component_ID} = req.body
    if(!original_component_ID){
        return res.status(403).json({msg: "No Original Component"})
    } 
    const original_component_Id = parseInt(original_component_ID, 10);
    try {
        const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        // Jika tidak ada refreshToken, arahkan pengguna ke halaman login
        return res.redirect('/login');
    }
        const original_page = await Pages.findByPk(original_component_Id);
        if(!original_page){
            return res.status(404).json({ msg: 'There is No Page, Please reload' });
        }
        if(original_page.dynamic_page !== null){
            return res.status(403).json({ msg: 'Cannot Duplicate Dynamic Page' });
        }
        const user = await Users.findOne({
            where: {
                refresh_token: refreshToken
            }
        });
        if(!user){
            return res.status(404).json({ msg: 'There is No Users, Please reload' });
        }
        const thisDate = Date.now();
        const page_key = getHexaverA(user.id,thisDate,"Page_"); 
        const dup_page = await Pages.create({
            name: original_page.name+"_duplicate",
            publicity: false,
            page_key: page_key,
            folder: original_page.folder,
            pagesetting: original_page.pagesetting,
            url : page_key,
            homepage : false,
            page404 : false,
            tags : original_page.tags,
            description : original_page.description,
            components: original_page.components,
            custom_function : original_page.custom_function
        });
        const filePath = `./views/JS-Press-Public/page-${original_page.id}.ejs`;
        const newFilePath = `./views/JS-Press-Public/page-${dup_page.id}.ejs`;
      // Membaca konten dari file yang ada
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Failed reading file:', err);
      return;
    }
  
    // Menulis konten yang dibaca ke file baru
    fs.writeFile(newFilePath, data, 'utf8', (err) => {
      if (err) {
        console.error('failed duplicating file:', err);
        return;
      }
      console.log('File ejs duplicated successfully:', newFilePath);
    });
  });
        return res.status(200).json({msg: "Publish Successful"})
    } catch (error) {
        return res.status(500).json({ msg: `Internal server error ${error}` });
    }
}

export const setHome = async (req,res) => {
    const {CompID} = req.query;  
    const pageId = parseInt(CompID, 10);
    try {
        const page = await Pages.findByPk(pageId);
        if(!page){
            return res.status(404).json({ msg: "Page Not Found"});
        }

        const oldhomepage = await Pages.findOne({
            where : {
                homepage : true
            }
        });

        if(oldhomepage.id === pageId){
            return res.status(403).json({ msg: "This is Homepage"});
        }

        if(oldhomepage){
            oldhomepage.homepage = false;
            await oldhomepage.save();
        }

        page.homepage = true;

        await page.save();

        return res.status(200).json({ msg: "Homepage changed" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Failed to delete Page", error: error.message });
    }
}

export const set404 = async (req,res) => {
    const {CompID} = req.query;  
    const pageId = parseInt(CompID, 10);
    try {
        const page = await Pages.findByPk(pageId);
        if(!page){
            return res.status(404).json({ msg: "Page Not Found"});
        }

        const oldhomepage = await Pages.findOne({
            where : {
                page404 : true
            }
        });

        if(oldhomepage.id === pageId){
            return res.status(403).json({ msg: "This is already 404 Page"});
        }

        if(oldhomepage){
            oldhomepage.page404 = false;
            await oldhomepage.save();
        }

        page.page404 = true;

        await page.save();

        return res.status(200).json({ msg: "404 Page changed" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Failed to delete Page", error: error.message });
    }
}

export const edit_page = async (req,res) => {
    const {
        compID,
        new_title,
        new_folder,
        new_url,
        new_ps,
        new_tags,
        new_publicity,
        new_desc,
        selected_component,
        selected_cf, 
        dynamic_data,
        URL_Query,} = req.body
    const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            // Jika tidak ada refreshToken, arahkan pengguna ke halaman login
            return res.redirect('/login');
        }
        if(!compID || !new_title || !new_folder || !new_url || !new_ps || !new_tags || !new_publicity || !new_desc || !selected_component ){
            return res.status(403).json({ msg: "Something missing, please correct your input" });
        }
        if(URL_Query === true && dynamic_data !== ''){
            return res.status(403).json({ msg: "Dynamic Page Cannot Use URL Query, Please set URL Query to false" });
        }
        const pageId = parseInt(compID,10);
        let tableList = '';
        try {

            const user = await Users.findOne({
                where: {
                    refresh_token: refreshToken
                }
            });
            if(!user){
                return res.status(404).json({ msg: 'There is No Users, Please reload' });
            }

            const PS = await PageSetting.findOne({
                where: {
                    pagesetting_key : new_ps,
                }
            });

            if(!PS){
                return res.status(404).json({ msg: 'Something went wrong, There is no Pagesetting' });
            }

            const page_selected = await Pages.findByPk(pageId);
            if(!page_selected){
                return res.status(404).json({ msg: "Page Not Found, Plese reload and try again" });
              }
              let tagsdata = new_tags;
              if(new_tags === ' '){tagsdata = ''}
              let desc = new_desc;
              if(desc === ' '){desc = ''}
              
              if(page_selected.dynamic_page !== null && dynamic_data === ''){
                const oldtable = await CD_Table.findOne({
                    where : {
                        dynamic_page : page_selected.id
                    }
                })
                if(oldtable){
                    oldtable.dynamic_page = null;
                    tableList = oldtable;
                    await oldtable.save();
                }
              }
              page_selected.name = new_title;
              page_selected.publicity = new_publicity;
              page_selected.folder = new_folder;
              page_selected.pagesetting = new_ps;
              page_selected.url = new_url;
              page_selected.tags = tagsdata;
              page_selected.description = desc;
              page_selected.components = selected_component;
              page_selected.custom_function = selected_cf;

              const pageScriptFilePath = await getPageScriptEJS(page_selected.id,dynamic_data);
              if(dynamic_data !== ''){
                const table = await getTable(dynamic_data);
                if(table === 'error'){
                    page_selected.dynamic_page = null;
                } else {
                    tableList = table;
                    table.dynamic_page = parseInt(page_selected.id,10);
                    page_selected.dynamic_page = parseInt(dynamic_data,10);
                    await table.save();
                }
              } else {
                page_selected.dynamic_page = null;
              }

              if(URL_Query === true && dynamic_data === ''){
                page_selected.url_query = true;
            } else {
                page_selected.url_query = false;
            }
              await page_selected.save();

              const keyword_list = new_tags.split(' ');
              let keywords = ``;
              keyword_list.forEach(element => {
                keywords += `${element}, `
              });

              const component_lists = selected_component.split('--');
              let page_components_list = ``;
              component_lists.forEach(element => {
                if(element !== ''){
                    page_components_list += `\n        <%- include('../Components/component-${element}') %>`
                }
              });
              let CF_top_head = '';
              let CF_bot_head = '';
              let CF_top_body = '';
              let CF_bot_body = '';
              const cf_lists = selected_cf.split('--');
              cf_lists.forEach(arr => {
                const cf = arr.split('_');
                if(cf[1] && cf[1]!== ''){
                    if(cf[1] === 'top head'){
                        CF_top_head += `\n        <%- include('../CF-EJS/custom_function-${cf[0]}') %>`
                    }
                    if(cf[1] === 'bot head'){
                        CF_bot_head += `\n        <%- include('../CF-EJS/custom_function-${cf[0]}') %>`
                    }
                    if(cf[1] === 'top body'){
                        CF_top_body += `\n        <%- include('../CF-EJS/custom_function-${cf[0]}') %>`
                    }
                    if(cf[1] === 'bot body'){
                        CF_bot_body += `\n        <%- include('../CF-EJS/custom_function-${cf[0]}') %>`
                    }
                }
            });

              const filePath = `./views/JS-Press-Public/page-${page_selected.id}.ejs`;
                const dataContent = `
        \n<html>
        <head>
        ${CF_top_head}
        <meta charset="UTF-8">  
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${page_selected.name}</title>
        <meta name="keywords" content="${keywords}">
        <meta name="description" content="${page_selected.description}">
        <%- include('../Pagesettings/ps-head-${PS.id}') %>
        ${CF_bot_head}
        </head>
        <body>
        ${pageScriptFilePath}
        ${CF_top_body}
        ${page_components_list}
        <%- include('../Pagesettings/ps-script-${PS.id}') %>
        ${CF_bot_body}
        </body>
        </html>
            
                `;
                fs.writeFile(filePath, dataContent, (err) => {
                    if (err) {
                    console.error('Failed to write the file:', err);
                    }
                });

                return res.status(200).json({ msg: "Page Updated",
                edited_page:{
                    name : page_selected.name,
                    publicity : page_selected.publicity,
                    folder : page_selected.folder,
                    pagesetting : page_selected.pagesetting,
                    url : page_selected.url,
                    tags : page_selected.tags,
                    description : page_selected.description,
                    components : page_selected.components,
                    id : page_selected.id,
                    custom_function : page_selected.custom_function,
                    dynamic_page : page_selected.dynamic_page,
                    URLQuery : page_selected.url_query,
                },table: tableList,
             });
              
        } catch (error) {
        console.error(error)
        return res.status(500).json({ msg: "Failed to edit Component", error: error.message });
        }
}



export const save_dynamic_page = async (req,res) =>{
    const {
        id,
        dynamicScript,
        dynamic_object,
        redirectPage} = req.body;

        const pageId = parseInt(id,10);

    const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            // Jika tidak ada refreshToken, arahkan pengguna ke halaman login
            return res.redirect('/login');
        }
         try {

            const user = await Users.findOne({
                where: {
                    refresh_token: refreshToken
                }
            });
            if(!user){
                return res.status(404).json({ task: "error-response", content: 'There is No Users, Please reload' });
            }

            const page_selected = await Pages.findByPk(pageId);
            if(!page_selected){
                return res.status(404).json({ task: "error-response", content: "Page Not Found, Plese reload and try again" });
              }
            if(page_selected.dynamic_page === null){
                return res.status(404).json({task: "error-response", content: 'This page is static page' });
            }

            const filePath = `./views/Page-Script/dynamic-script-${page_selected.id}.ejs`;
            const objectPath = `./views/Page-Script/dynamic-script-${page_selected.id}.txt`;

        await fs.promises.writeFile(filePath, dynamicScript);
        await fs.promises.writeFile(objectPath, dynamic_object);

        if(redirectPage !== null){
            page_selected.redirect = parseInt(redirectPage,10);
            await page_selected.save();
        } else {
            page_selected.redirect = null;
            await page_selected.save();
        }

        return res.status(200).json({ task: 'save-response-success', content: 'File saved successfully' });
              
        } catch (error) {
        console.error(error)
        return res.status(500).json({ task: "error-response", content:`Failed to edit Page cause : Internal server error` });
        }
}

const getTable = async(tableID) =>{
    const tableId = parseInt(tableID, 10);
    try {
    const thisTable = await CD_Table.findByPk(tableId);
    if(!thisTable){
        return 'error'
    }
    return thisTable
    } catch (error) {
        return 'error'
    }
}

export const get_dynamic_page = async (req,res) =>{
    const {pageURL,itemURL} = req.query;
    let page404 = '/';
    try {
        const notFound = await Pages.findOne({
            where : {
                page404 : true
            }
        });
        if(notFound){
            page404 =  notFound.url;
        }
        const page = await Pages.findOne({
            where : {
                url :  pageURL
            }
        });
        if(!page){
            return res.status(404).json({ msg: 'page not found',page404 });
        }
        if(page.dynamic_page === null){
            return res.status(404).json({ msg: 'page is static',page404 });
        }
        const tableID = parseInt(page.dynamic_page, 10);
        const content = await CD_Item.findOne({
            where : {
                custom_post_tabel : tableID,
                url : itemURL
            }
        });
        if(!content){
            return res.status(404).json({ msg: 'Content not found',page404 });
        }
        return res.status(200).json({msg : 'success',page404,content})
    } catch (error) {
        return res.status(500).json({ msg: 'Internal Server Error',page404 });
    }
}

export const getDynamicPageOR404 = async (parts) =>{
    const dataURL = parts.split('/');
    let datapage = {};
    const pageDynamic = await Pages.findOne({
        where: {
            url: dataURL[0]
        }
    });
    let content = null;
    if(pageDynamic && pageDynamic.dynamic_page !== null){
        if(dataURL[1] === undefined){
            if(pageDynamic.redirect !== null){
                const redirectPage = await Pages.findByPk(pageDynamic.redirect);
                if(redirectPage){
                    content = {name : '',}
                    datapage = {getContent : 'true', url : `${redirectPage.id}`, content}
                } else {
                    content = {name : '',}
                    datapage = {getContent : 'true', url : `${pageDynamic.id}`, content}
                }
            } else {
                content = {name : '',}
                datapage = {getContent : 'true', url : `${pageDynamic.id}`, content}
            }
        }
        else {
            const tableID = parseInt(pageDynamic.dynamic_page, 10);
            content = await CD_Item.findOne({
                where : {
                    custom_post_tabel : tableID,
                    url : dataURL[1]
                }
            });
            if(content){
            const config = await WebConfig.findOne();
            const date = get_date_format(config.date_format,content.createdAt);
            const getDate = {name : 'Date',value : date,}
            content.content = JSON.parse(content.content);
            const authors = await Users.findByPk(content.author);
            let authorProfile = {name : 'Author Avatar',value : '/Media/avatar/Default-avatar.jpg'};
            let authorName = {name : 'Author Name', value : 'Anonym'};
            let authorUser = {name : 'Author Username', value : 'Anonym'};
            if(authors){
                authorProfile.value = `/Media/avatar/${authors.username}.png`;
                authorName.value = authors.name;
                authorUser.value = authors.username;
            }
            content.content.push(getDate)
            content.content.push(authorProfile)
            content.content.push(authorName)
            content.content.push(authorUser)
            content.content = JSON.stringify(content.content);
    
            datapage = {getContent : 'true',name : `${pageDynamic.url}${content.url}`, url : pageDynamic.id, content}
            }
            if(!content){
                content = null;
            }
        }
    }
    if(!pageDynamic || pageDynamic.dynamic_page === null || content === null){
    if(pageDynamic && pageDynamic.url_query === true){
        datapage = {getContent : 'false', url : pageDynamic.id}
    } else {
        const page404 = await Pages.findOne({
            where: {
                page404: true
            }
        });
        datapage = {getContent : 'false', url : page404.id}
    }
    }
    return datapage
    
}

export const getPagesEJS = async (pageID)=>{
    const filePath = `./views/JS-Press-Public/page-${pageID}.ejs`;
    const datatxt = await fs.promises.readFile(filePath, 'utf8');
    return datatxt
}

export const dynamicBuilderGETallPagenameAndID = async (req,res) =>{
    try {
        const pages = await Pages.findAll({
            attributes : ['name','id','url',]
        });
        if(!pages){
            res.status(200).json({data_pages : []}); 
        }
    res.status(200).json({data_pages : pages}); 
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}