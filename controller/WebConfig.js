import WebConfig from "../models/WebConfigModel.js";
import Pages from '../models/PageModel.js';
import Components from '../models/ComponentModel.js';
import CD_Item from '../models/custom_data_item_Model.js';
import CD_Table from "../models/custom_data_table_Model.js";
import Custom_function from '../models/custom_functionModel.js';
import Media from '../models/MediaModel.js';
import Folders from "../models/FolderModel.js";
import Users from '../models/UserModel.js';
import PageSetting from "../models/PageSettingModel.js";
import fs from 'fs'; 
import nodemailer from 'nodemailer';
import {getComponentTXT,getComponentEJS} from '../controller/Components.js';
import {getPagesEJS,getScriptTXT,getScriptEJS} from '../controller/Pages.js';

export const getAlldata = async(req,res) =>{
let order = 1;
try {
    const renderComponent = await Components.findAll();
    const components = [];
    for(const comp of renderComponent){
        const ContentTxt = await getComponentTXT(comp.id);
        const contentEJS = await getComponentEJS(comp.id);
        const component = {
            order : order,
            oldID : comp.id,
            owner : comp.owner,
            publicity : comp.publicity,
            component_name : comp.component_name,
            component_folder : comp.component_folder,
            pagesetting : comp.pagesetting,
            content : `'./views/Components/component-${order}.ejs'`,
            tags : comp.tags,
            description : comp.description,
            ContentTxt,
            contentEJS,
        }
        components.push(component)
        order += 1;
    };
    order = 1;
    const renderCF = await Custom_function.findAll();
    const custom_functions = [];
    for (const cf of renderCF){
        const datatxt = await fs.promises.readFile(cf.txt_path, 'utf8');
        const custom_function = {
            order : order,
            name : cf.name,
            ejs_path : cf.ejs_path,
            txt_path : cf.txt_path,
            datatxt,
        }
        custom_functions.push(custom_function);
        order += 1;
    }
    order = 1;
    const dataTable = await CD_Table.findAll();
    const Tables = []
    for (const tb of dataTable){
        const newTable = {
            order : order,
            name : tb.name,
            type : tb.type,
            dynamic_page : tb.dynamic_page,
            custom_fields : tb.custom_fields,
        };
        Tables.push(newTable)
        order += 1;
    }
    order = 1;
    const dataPosts = await CD_Item.findAll();
    const Posts = []
    for (const pos of dataPosts){
        let tableID = 1;
        const newPost = {
            order : order,
            custom_post_tabel : tableID,
            author : pos.author,
            title : pos.title,
            url : pos.url,
            content : pos.content,
        }
        Posts.push(newPost)
        order += 1;
    }
    const Medias = await Media.findAll();
    const renderPages = await Pages.findAll();
    const renderConfig = await WebConfig.findAll();
    const Pagesetting = await PageSetting.findAll();
    const pagesettings = [];
    for (const ps of Pagesetting){
        const PSHead = await getPSScriptEJS(ps.id,'ps-head-');
        const PSScript = await getPSScriptEJS(ps.id,'ps-script-');
        const pagesetting = {
            PSHead,
            PSScript,
            additional_css : ps.additional_css,
            animation_array : ps.animation_array,
            background_color: ps.animation_array,
            background_opacity: ps.background_opacity,
            background_val: ps.background_val,
            body_font: ps.body_font,
            color_palatte: ps.color_palatte,
            css_framework : ps.css_framework,
            css_target : ps.css_target,
            custom_css : ps.custom_css,
            custom_js: ps.custom_js,
            description: ps.description,
            font_selection: ps.font_selection,
            margin_bottom: ps.margin_bottom,
            margin_left: ps.margin_left,
            margin_parameter: ps.margin_parameter,
            margin_right: ps.margin_right,
            margin_top: ps.margin_top,
            mobile_breakpoint: ps.mobile_breakpoint,
            overflow_x: ps.overflow_x,
            owner: ps.owner,
            padding_bottom: ps.padding_bottom,
            padding_left: ps.padding_left,
            padding_parameter: ps.padding_parameter,
            padding_right: ps.padding_right,
            padding_top: ps.padding_top,
            pagesetting_default: ps.pagesetting_default,
            pagesetting_key: ps.pagesetting_key,
            pagesetting_name: ps.pagesetting_name,
            private: ps.private,
            tablet_breakpoint: ps.tablet_breakpoint,
            tags: ps.tags,
        }
        pagesettings.push(pagesetting);
    }
    const Folder = await Folders.findAll();
    const pages = [];
    order = 1;
    for (const pg of renderPages){
        const PageEJS = await getPagesEJS(pg.id);
        const dynamicScriptTXT = await getScriptTXT(pg.id);
        const dynamicScriptEJS = await getScriptEJS(pg.id);
        const page = {
            order : order,
            name : pg.name,
            publicity : pg.publicity,
            page_key : pg.page_key,
            folder : pg.folder,
            pagesetting : pg.pagesetting,
            url : pg.url,
            homepage : pg.homepage,
            page404 : pg.page404,
            tags : pg.tags,
            description : pg.description,
            components : pg.components,
            custom_function : pg.custom_function,
            dynamic_page : pg.dynamic_page,
            redirect : pg.redirect,
            url_query : pg.url_query,
            PageEJS,
            dynamicScriptTXT,
            dynamicScriptEJS,
        }
        pages.push(page);
        order+= 1;
    }
    order = 1;
    return res.status(200).json({message : "success", datares : {
        components,
        custom_functions,
        Tables,
        Posts,
        Medias,
        pages,
        renderConfig,
        Pagesetting,
        Folder,
    }});
} catch (error) {
    return res.status(500).json({message : "failed", datares : {}});
}
}

const getPSScriptEJS = async (pageid,path)=>{
    const filePath = `./views/Pagesettings/${path}${pageid}.ejs`;
    const datatxt = await fs.promises.readFile(filePath, 'utf8');
    return datatxt
}

export const getdataDashboard = async(req,res) => {
    try {
        const countComponents = await Components.count();
        const countPages = await Pages.count();
        const countPost = await CD_Item.count();
        const countUsers = await Users.count();
        const datares = {
        totalComponents : countComponents,
        totalPages : countPages,
        totalPosts : countPost,
        totalUsers : countUsers,
    };
    return res.status(200).json({message : "success", datares});
    } catch (error) {
        return res.status(500).json({message : "failed", datares : {}});
    }
}

export const getWebconfig = async (req, res) => {
    let orderCriteria = [['createdAt', 'ASC']];

    try {
        const webConfig = await WebConfig.findOne({
            order: orderCriteria
        });

        if (!webConfig) {
            return res.status(404).json({ msg: 'Web Configuration Not Found' });
        }

        return res.status(200).json({ webConfig });
    } catch (error) {
        return res.status(500).json({ msg: "Failed to fetch web configuration", error: error.message });
    }
};

export const putWebConfig = async(req, res) => {
    const {
        update_title,
        update_desc,
        update_favicon,
        update_logo,
        update_date,
        update_fontawesome
    } = req.body;
    
    try {
        // Ambil data konfigurasi situs dari database
        const config = await WebConfig.findOne(); // Menggunakan findOne tanpa kriteria pencarian
        // Simpan file favicon baru ke sistem file server jika ada
        if (update_favicon !== "") {
            const faviconData = update_favicon.replace(/^data:image\/\w+;base64,/, '');
            const faviconBuffer = Buffer.from(faviconData, 'base64');
            fs.writeFileSync('./public/logo/favicon.ico', faviconBuffer);
        }

        // Simpan file logo baru ke sistem file server jika ada
        if (update_logo !== "") {
            const logoData = update_logo.replace(/^data:image\/\w+;base64,/, '');
            const logoBuffer = Buffer.from(logoData, 'base64');
            fs.writeFileSync('./public/logo/Logo.png', logoBuffer);
        }

        // Perbarui data konfigurasi situs
        config.site_title = update_title;
        config.site_description = update_desc;
        config.date_format = update_date;
        config.font_awesome_cdn = update_fontawesome;

        await config.save();

        return res.status(200).json({ msg: "web configuration saved",config });
    } catch (error) {
        
        console.error('Terjadi kesalahan saat memperbarui konfigurasi situs:', error);
       
        return res.status(500).json({ msg: "Failed to save web configuration", error: error.message });
    }
};

export const putGoogleFonts = async(req,res) => {
    const {update_google_font} = req.body;
    try {
        const config = await WebConfig.findOne();
        config.google_fonts = update_google_font;

        await config.save();

        return res.status(200).json({ msg: "Google Fonts Configuration Saved" });

    } catch (error) {
           
        console.error('Terjadi kesalahan saat memperbarui konfigurasi situs:', error);
       
        return res.status(500).json({ msg: "Failed to save Google Fonts", error: error.message });
    }
}

export const putcssframework = async(req,res) => {
    const {update_css} = req.body;
    try {
        const config = await WebConfig.findOne();
        config.css_framework = update_css;

        await config.save();

        return res.status(200).json({ msg: "CSS Framework Configuration Saved Successfully" });

    } catch (error) {
           
        console.error('Terjadi kesalahan saat memperbarui konfigurasi situs:', error);
       
        return res.status(500).json({ msg: "Failed to save Google Fonts", error: error.message });
    }
}

export const putjsframework = async(req,res) => {
    const {update_js} = req.body;
    try {
        const config = await WebConfig.findOne();
        config.js_framework = update_js;

        await config.save();

        return res.status(200).json({ msg: "JS Library Configuration Saved Successfully" });

    } catch (error) {
           
        console.error('Terjadi kesalahan saat memperbarui konfigurasi situs:', error);
       
        return res.status(500).json({ msg: "Failed to save Google Fonts", error: error.message });
    }
}


let mailService = {};

export const WebmailConfig= async()=>{
    const config = await WebConfig.findOne({});
    if(!config){
        return
    }
    let new_mailService = {
        mail_receiver : config.mail_receiver,
        user : config.mail_user,
        pass : config.mail_pass,
        SMTP_HOST : config.mail_SMTP_HOST,
        SMTP_PORT : config.mail_SMTP_PORT,
        SMTP_SECURE : config.mail_SMTP_SECURE,
    }
    mailService = new_mailService;
}

function isValidEmail(email) {
    // Regular expression for validating an Email
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

export const ContactForm = (req, res) => {
    const { email, message,title } = req.body;
    if(!email || email === ''){
        return res.status(403).json({message : 'Email Field Cannot Be Blank'})
    }
    if(!title || title === ''){
        return res.status(403).json({message : 'title Field Cannot Be Blank'})
    }
    if(!message || message === ''){
        return res.status(403).json({message : 'Message Field Cannot Be Blank'})
    }
    if (!isValidEmail(email)) {
        return res.status(400).json({ message: 'Invalid Email Address' });
    }
    if(mailService.SMTP_HOST === null || mailService.SMTP_PORT === null || mailService.user === null){
        return res.status(403).json({message : "SMTP Webmail is not set up yet."})
    }
  
    let transporter;
    transporter = nodemailer.createTransport({
        host: mailService.SMTP_HOST,
        port: mailService.SMTP_PORT,
        secure: mailService.SMTP_SECURE === mailService.SMTP_SECURE,
        auth: {
            user: mailService.user,
            pass: mailService.pass,
        },
      });
  
    let mailOptions = {
      from: email,
      to: mailService.mail_receiver,
      subject: `${title}`,
      text: message,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({message : `${error.toString()}`});
      }
      res.status(200).json({message : 'success'})
    });
  };

export const save_SMTP_config = async(req,res) => {
    const { host,port,smtp_secure,username,password,mailReceiver} = req.body;
    if(!host || !port || !smtp_secure || !username || !password || !mailReceiver){
        return res.status(403).json({ message: "Failed to save SMTP Configuration, some field still blank",});
    }
    const portData = parseInt(port,10);
    try {
        const config = await WebConfig.findOne();
        config.mail_receiver = mailReceiver;
        config.mail_user = username;
        config.mail_pass = password;
        config.mail_SMTP_HOST = host;
        config.mail_SMTP_PORT = portData;
        config.mail_SMTP_SECURE = smtp_secure;
        await config.save();
        await WebmailConfig();
        res.status(200).json({message : 'SMTP Configuration Saved Successfully'})
    } catch (error) {
        res.status(500).json({message : `SMTP Saved Failed, Internal Server Error`})
    }
}