import Users from "../models/UserModel.js";
import Components from '../models/ComponentModel.js';
import PageSetting from "../models/PageSettingModel.js";
import Folders from "../models/FolderModel.js";
import WebConfig from "../models/WebConfigModel.js";
import Pages from '../models/PageModel.js';
import CD_Item from '../models/custom_data_item_Model.js';
import CD_Table from "../models/custom_data_table_Model.js";
import Custom_function from '../models/custom_functionModel.js';
import Media from '../models/MediaModel.js';
import bcrypt from 'bcrypt';
import { restartServer } from "../server.js";
import {getHexa} from '../utils/generaterandomAlphabet.js';
import {setupData} from '../utils/WebSetup.js';
import fs from 'fs';

let dataSetup;
async function createSETUPData(){
  const data = setupData
  console.log(data)
  dataSetup = data
}




export const registerAndSetup = async(req,res) =>{
    const {name, email, username, password, confirmPassword} = req.query;

    if(!name || !email || !username || !password || !confirmPassword) 
    return res.status(400).json
    ({msg: "Please fill up all the field correctly"});

    if(password !== confirmPassword) return res.status(400).json
    ({msg: "Password and Confirm Password didn't match"});
    createSETUPData();
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        const newUser = await Users.create({
          verified: "verified",
          role: "Administrator",
          name: name,
          username: username,
          email: email,
          password: hashPassword,
          country: '',
          location: '',
          quote: "My life, my adventure, Where laughter and pixels come together.",
          avatar: `Default-avatar.jpg`,
          facebook: '',
          github: '',
          instagram: '',
          dribble: '',
          linkedin: '',
          reputation: 0,
          saved: 0,
          credit: 10000
        });
        const thisDate = Date.now();
        const userId = newUser.id;
        const defaultFolderKey = getHexa(userId,thisDate,"folder_");
        const defaultPageSetting = getHexa(userId,thisDate,"PageSetting_");
        let Pagesettingsetup = dataSetup.Pagesetting[0];

        // Mengupdate data user yang baru dibuat dengan defaultFolder dan defaultPageSetting
        await Users.update(
        {
            default_pageSetting: defaultPageSetting,
            default_folder: defaultFolderKey
        },
        {
          where: { id: userId } // Menggunakan ID user yang baru dibuat sebagai kriteria
        }
      ); 

      // Membuat folder default untuk pengguna baru
      await Folders.create({
        owner: userId, // Gunakan ID pengguna baru sebagai pemilik folder
        default_folder: true, // Sesuaikan dengan kebutuhan Anda
        folder_name: "Default", // Sesuaikan dengan nama default yang Anda inginkan
        folder_key: defaultFolderKey // Sesuaikan dengan kunci default yang Anda inginkan
    });

    await PageSetting.create({
        owner: userId,
        pagesetting_key: defaultPageSetting,
        pagesetting_name: "Default",
        pagesetting_default: true,
        private: true,
        body_font: Pagesettingsetup.body_font,
        overflow_x: Pagesettingsetup.overflow_x,
        background_color: Pagesettingsetup.background_color,
        background_opacity: Pagesettingsetup.background_opacity,
        background_val: Pagesettingsetup.background_val,
        margin_parameter: Pagesettingsetup.margin_parameter,
        margin_top: 0,
        margin_right: 0,
        margin_bottom: 0,
        margin_left: 0,
        padding_parameter: "px",
        padding_top: 0,
        padding_right: 0,
        padding_bottom: 0,
        padding_left: 0,
        additional_css: Pagesettingsetup.additional_css, 
        mobile_breakpoint: 600,
        tablet_breakpoint: 900,
        font_selection: Pagesettingsetup.font_selection,
        color_palatte: Pagesettingsetup.color_palatte,
        custom_css: Pagesettingsetup.custom_css,
        custom_js: Pagesettingsetup.custom_js,
        css_framework: Pagesettingsetup.css_framework,
        animation_array: Pagesettingsetup.animation_array,
        css_target: Pagesettingsetup.css_target,
        description: '',
        tags: '',
        downloaded: 0,
        thanks: 0,
        views: 0,
      });
      const PSHead = `
  <!-- PS Default START -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js" data-js-framework="true"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.8.0/ScrollTrigger.min.js" data-js-framework="true"></script>

  
<link id="Bootstrap450" rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" data-css-framework="true" data-css-name="Bootstrap 4.5.0">
<link id="videojs830" rel="stylesheet" href="https://vjs.zencdn.net/8.3.0/video-js.css" data-css-framework="true" data-css-name="Video Js">

  
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lato:wght@100;200;300;400;500;600;700;800;900&display=swap">

  <link rel="stylesheet" href="/public/ps_css_1.css">
  <link rel="icon" href="/public/logo/favicon.ico" type="image/x-icon">
  <!-- PS Default END -->
  `
  const PSScript = `
  <script id="bodyScript">
  
  </script>`;
  const PSCSS = `
  

        input:focus {
          outline: none;
        }
        
        @media only screen and (orientation: landscape) {
          html {
            font-size: 1vw; /* 1em for landscape mode */
          }
        }
        
        @media only screen and (orientation: portrait) {
          html {
            font-size: 2vh; /* 1em for potrait mode */
          }
        }
        @media only screen and (min-width: 768px) and (max-width: 1024px) {
        html {
            font-size: 2vmin; /* 1em for Tablet mode */
          }
        }
        @media only screen and (min-aspect-ratio: 1/1) and (max-aspect-ratio: 1/1) {
         html {
            font-size: 4vmax;/* 1em for 1:1 Ratio mode */
          }
        }
               
@keyframes fadeIn {
  0% {
    opacity: 0;
    filter: grayscale(100%) blur(5px);
  }
  100% {
    opacity: 1;
    filter: grayscale(0%) blur(0px);
  }
}
.blog-list {
  opacity: 0;
  filter: grayscale(100%) blur(5px); 
  animation: fadeIn 1.5s ease forwards; 
}

body {
  font-family: Lato;
  margin-top: 0px;
  margin-right: 0px;
  margin-bottom: 0px;
  margin-left: 0px;
  padding-top: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
  padding-left: 0px;
  background-color: rgba(224, 224, 224, 1);
  overflow-x: hidden;
  display: flex;
flex-direction: column;
min-height: 100vh;
        
        
               
}
  `;
  const PSHeadEJS = `./views/Pagesettings/ps-head-1.ejs`;
  const PSScriptEJS = `./views/Pagesettings/ps-script-1.ejs`;
  const PSCSSPath = `./public/ps_css_1.css`;
        fs.writeFile(PSHeadEJS, PSHead, (err) => {
          if (err) {
            console.error('Failed to write file.', err);
          }
        });
        fs.writeFile(PSScriptEJS, PSScript, (err) => {
          if (err) {
            console.error('Failed to write file.', err);
          }
        });
        fs.writeFile(PSCSSPath, PSCSS, (err) => {
          if (err) {
            console.error('Failed to write file.', err);
          }
        });

      const createSetup = await setupdata(defaultPageSetting,defaultFolderKey,userId);
      if(createSetup === 'success'){
        res.json({msg: "Register Successful"})
      }

    } catch (error) {
        console.log("error terjadi di controller Users" + error);
    }
}

async function setupdata(pskey,folderkey,ownerID){
  const data = dataSetup;
  const components = data.components;
  components.sort((a, b) => a.order - b.order);
  const custom_functions = data.custom_functions;
  custom_functions.sort((a, b) => a.order - b.order);
  const Table = data.Tables[0];
  const dataposts = data.Posts;
  dataposts.sort((a, b) => a.order - b.order);
  const Medias = data.Medias;
  const dataPages = data.pages;
  dataPages.sort((a, b) => a.order - b.order);

    for (const comp of components) {
        const newComponent = await Components.create({
        owner: ownerID,
        publicity: comp.publicity,
        component_name: comp.component_name,
        component_folder: folderkey,
        pagesetting: pskey,
        content: comp.content,
        });
        const filePathEjs = `./views/Components/component-${newComponent.id}.ejs`;
        const filePathTxt = `./views/Components/component-${newComponent.id}.txt`;
        fs.writeFile(filePathEjs, comp.contentEJS, (err) => {
          if (err) {
            console.error('Failed to write file.', err);
          }
        });
        fs.writeFile(filePathTxt, comp.ContentTxt, (err) => {
          if (err) {
            console.error('Failed to write file.', err);
          }
        });
    }
    for (const cf of custom_functions){
      const newFunc = await Custom_function.create({
        name : cf.name,
        ejs_path : './views/CF-EJS/custom_function-1.ejs',
        txt_path : './views/CF-txt/custom_function-1.txt',
      });
      fs.writeFile(newFunc.txt_path, cf.datatxt, (err) => {
        if (err) {
          console.error('Failed to write file.', err);
        }
      });
      const dataEJS = `
<script>
${cf.datatxt}
</script>`
      fs.writeFile(newFunc.ejs_path, dataEJS, (err) => {
        if (err) {
          console.error('Failed to write file.', err);
        }
      });
    }
    const newTable = await CD_Table.create({
      name : Table.name,
      type : Table.type,
      dynamic_page : 4,
      custom_fields : Table.custom_fields,
    });
    for (const post of dataposts){
      const newPost = await CD_Item.create({
        custom_post_tabel : newTable.id,
        author : ownerID,
        title : post.title,
        url : post.url,
        content : post.content,
      })
    };
    for (const md of Medias){
      const newmedia = await Media.create({
        media_name : md.media_name,
        media_ext : md.media_ext,
        media_url : md.media_url,
        media_folder : folderkey,
      })
    }
    for (const pg of dataPages){
      const newpage = await Pages.create({
        name : pg.name,
        publicity : true,
        folder : folderkey,
        pagesetting : pskey,
        url : pg.url,
        homepage : pg.homepage,
        page404 : pg.page404,
        components : pg.components,
        custom_function : pg.custom_function,
        tags : pg.tags,
        description : pg.description,
        dynamic_page : pg.dynamic_page,
        redirect : pg.redirect,
        url_query : pg.url_query,
      })
      const EJSPath = `./views/JS-Press-Public/page-${newpage.id}.ejs`;
      const ScriptTXT = `./views/Page-Script/dynamic-script${newpage.id}.txt`;
      const ScriptEjs = `./views/Page-Script/dynamic-script-${newpage.id}.ejs`;
        fs.writeFile(EJSPath, pg.PageEJS, (err) => {
          if (err) {
            console.error('Failed to write file.', err);
          }
        });
        fs.writeFile(ScriptTXT, pg.dynamicScriptTXT, (err) => {
          if (err) {
            console.error('Failed to write file.', err);
          }
        });
        fs.writeFile(ScriptEjs, pg.dynamicScriptEJS, (err) => {
          if (err) {
            console.error('Failed to write file.', err);
          }
        });
    }
 return 'success'
}