import PageSetting from "../models/PageSettingModel.js";
import WebConfig from "../models/WebConfigModel.js";
import {getHexa} from '../utils/generaterandomAlphabet.js';
import { Op } from 'sequelize';
import Users from "../models/UserModel.js";
import fs from 'fs';
import {decoded_function,UniversalencodeChar} from '../utils/encoded_decode.js';
import Pages from "../models/PageModel.js";

export const getPagsetting = async (req, res) => {
    const {keyword, dataoffset } = req.query;
    const offset = parseInt(dataoffset, 10);
    const renderLimit = 6;
    let orderCriteria = [['createdAt', 'DESC']];
  
    try {
        // let whereClause = {publicity : 'public',};
        let whereClause = {};
  
  // Hanya terapkan kriteria pencarian jika keyword tidak kosong
  if (typeof keyword === 'string' && keyword.trim() !== '') {
    whereClause = {
        // publicity : 'public',
        [Op.and]: [
            {
                [Op.or]: [
                    { pagesetting_name: { [Op.like]: `%${keyword}%` } },
                    { tags: { [Op.like]: `%${keyword}%` } },
                    { description: { [Op.like]: `%${keyword}%` } },
                ],
            },
        ],
    };
  }
        // Hitung total komponen
        const totalCount = await PageSetting.count({
            where: whereClause,
        });
        const totalremain = totalCount - renderLimit - offset;
        // Dapatkan data komponen dengan pengaturan yang diberikan
        const components = await PageSetting.findAll({
            attributes: ['pagesetting_name','pagesetting_key', 'pagesetting_default','id', 'owner'],
            where: whereClause,
            order: orderCriteria,
            offset: parseInt(offset) || 0,
            limit: renderLimit,
        });
        const newOffset = offset + renderLimit;
        const componentrender = [];
        // for (const comp of components) {
        //     // const user = await Users.findByPk(parseInt(comp.owner, 10));
        //     // let desc = comp.content;
        //     // if (desc.length > 300) {
        //     //     desc = desc.substring(0, 300) + '...';
        //     // }
        //     //===================================//
        //     const transformedComp = {
        //         title: comp.title,
        //         key : comp.key,
        //         owner : comp.owner,
        //         description: desc,
        //         id: comp.id,
        //         link : comp.key,
        //         // username : user.username,
        //         // avatar : user.avatar,
        //         // name : user.name,
        //         views : comp.views,
        //         thanks : comp.thanks,
        //     };
        //     componentrender.push(transformedComp);
        //     //===================================//
        // }
        res.json({
            totalCount,
            keyword,
            offset,
            newOffset,
            components,
            renderLimit
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  export const deletePS = async (req, res) => {
    const { dataId } = req.query;
    const dataID = parseInt(dataId, 10);
    const refreshToken = req.cookies.refreshToken;
    
    // Check if refreshToken is missing or null
    if (!refreshToken) {
        return res.status(401).json({ msg: 'Unauthorized' });
    }

    try {
        const user = await Users.findOne({
            where: {
                refresh_token: refreshToken
            }
        });

        if (!user) {
            return res.status(403).json({ msg: 'Forbidden' });
        }

        const PS = await PageSetting.findByPk(dataID);
        // Check if folder is not found
        if (!PS) {
            return res.status(404).json({ msg: 'File Not Found' });
        }
        if(PS.pagesetting_default === true){
            return res.status(403).json({ msg: 'Default Pagesetting Cannot Be Delete' });
        }
        const checkPages = await Pages.count({
          where : {
            pagesetting : PS.pagesetting_key
          }
        });
        if(checkPages >= 1){
          const pages = await Pages.findAll({
            where : {
              pagesetting : PS.pagesetting_key
            }
          });
          let number = 1;
          let errorText = `<p>Page's bellow still linked from this pagesetting :</p>`;
          for (const page of pages) {
            const text = `\n <p>${number}. ${page.name}</p>`;
            errorText += text;
          }
          errorText += `Unlink it first before deleting this pagesetting. </br><button style="width: 100%; margin-top: 15px;" id="js-popup-button-error" class="js-popup-button-true" lazydev="18e5af550451" type="button">
          <icon id="icon-18e5af550451" class="fa fa-check" style="padding-right: 1em;">
          
          </icon>
    
          Understood
          </button>`;
          return res.status(403).json({ msg: errorText });
        }
        // Try to delete the folder
        try {
          const DeletePS = await deletePsEJS(PS.id,checkPages);
          if(DeletePS === 'success'){
            await PS.destroy();
            return res.status(200).json({ msg: "Pagesetting Deleted" });
          } else {
            return res.status(403).json({ msg: `Pagesetting Deleting Failed, ${DeletePS} Please Reload and try again` });
          }
        } catch (error) {
            return res.status(500).json({ msg: "Failed to delete Pagesetting", error: error.message });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Internal server error' });
    }
}

export const createNewPageSetting = async (req,res)=>{
    const { userID } = req.query;

      const thisDate = Date.now();
      const page_key = getHexa(userID,thisDate,"PageSetting_"); 
      const newPageName = getHexa(userID,thisDate," "); 
    try {
      const newPageSetting = await PageSetting.create({
        owner: userID,
        pagesetting_key: page_key,
        pagesetting_name: "New PageSetting"+newPageName,
        pagesetting_default: false,
        private: true,
        body_font: "Lato",
        overflow_x: "hidden",
        background_color: "#e0e0e0",
        background_opacity: 1,
        background_val: "rgba(224, 224, 224, 1)",
        margin_parameter: "px",
        margin_top: 0,
        margin_right: 0,
        margin_bottom: 0,
        margin_left: 0,
        padding_parameter: "px",
        padding_top: 0,
        padding_right: 0,
        padding_bottom: 0,
        padding_left: 0,
        additional_css: `
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        
        `, 
        mobile_breakpoint: 480,
        tablet_breakpoint: 900,
        font_selection: "Lato,",
        color_palatte: `{"name": "Main Color", "value": "rgba(0, 255, 255, 0.842)"}|`,
        custom_css: `
  @media only screen and (orientation: landscape) {
    html {
        font-size: 1vw; /* 1em for landscape mode */
          }
      }
        
  @media only screen and (orientation: portrait) {
    html {
          font-size: 1.4vh; /* 1em for potrait mode */
          }
      }
        
        `,
        custom_js: "",
        css_framework: "Bootstrap450,videojs830",
        animation_array: "gsap,",
        css_target: "Main CSS Class",
        description: '',
        tags: ''
      }); 
      const createFile = await createPsEJS(newPageSetting);
      if(createFile === 'Success'){
        return res.status(200).json({message: "Success"})
      } else {
        return res.status(403).json({ message: 'Even Pagesetting Created, something weird happend, please reload, Open Pagesetting And save again' });
      }
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed Create PageSetting Object' });
    }
  }

export const duplicatePageSetting = async (req,res) => {
    const { userID, AuthToken, PsId } = req.body;
  
    const permission = await verifyAuthToken(AuthToken, userID);
     if (permission === "forbidden") {
      return res.status(403).json({ message: permission });
    }
    try {
       const pagesetting = await PageSetting.findByPk(PsId);
      if (!pagesetting) {
        return res.status(404).json({ message: "Not Found" });
      }
      const PageOwner = pagesetting.owner;
      if (PageOwner !== userID) {
        return res.status(403).json({ auth: permission });
      }
      const thisDate = Date.now();
      const page_key = await getHexa(userID,thisDate,"PageSetting_"); 
      const duplicate = await PageSetting.create({
        owner: userID,
        pagesetting_key: page_key,
        pagesetting_name: pagesetting.pagesetting_name+'(Duplicate)',
        pagesetting_default: false,
        private: true,
        body_font: pagesetting.body_font,
        overflow_x: pagesetting.overflow_x,
        background_color: pagesetting.background_color,
        background_opacity: pagesetting.background_opacity,
        background_val: pagesetting.background_val,
        margin_parameter: pagesetting.margin_parameter,
        margin_top: pagesetting.margin_top,
        margin_right: pagesetting.margin_right,
        margin_bottom: pagesetting.margin_bottom,
        margin_left: pagesetting.margin_left,
        padding_parameter: pagesetting.padding_parameter,
        padding_top: pagesetting.padding_top,
        padding_right: pagesetting.padding_right,
        padding_bottom: pagesetting.padding_bottom,
        padding_left: pagesetting.padding_left,
        additional_css: pagesetting.additional_css,
        mobile_breakpoint: pagesetting.mobile_breakpoint,
        tablet_breakpoint: pagesetting.tablet_breakpoint,
        font_selection: pagesetting.font_selection,
        color_palatte: pagesetting.color_palatte,
        custom_js: pagesetting.custom_js,
        css_framework: pagesetting.css_framework,
        animation_array: pagesetting.animation_array,
        css_target: pagesetting.css_target,
        tags : pagesetting.tags,
        description : pagesetting.description,
        downloaded : 0,
        thanks : 0,
        views : 0,
      });
      res.status(200).json({ auth: permission });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Gagal duplikasi objek PageSetting' });
    }
  }

  export const getOnePagsetting = async (req, res) => {
    const {dataID } = req.query;
    const psID = parseInt(dataID, 10);
  
    try {
        const MyPS = await PageSetting.findByPk(psID);
        if(!MyPS){
          return res.status(404).json({ msg: 'File Not Found' });
        }
        return res.status(200).json({ PS:MyPS });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  };

const createPsEJS = async(Pagesetting)=>{
    if(!Pagesetting){
      return 'failed'
    }

try {
  const webconfig = await WebConfig.findOne();

//=== Link fontawesome, 3rd party css and js libraries start===//
  const PSLink = `<link rel="stylesheet" href="/public/ps_css_${Pagesetting.id}.css">`;
  const icon = `<link rel="icon" href="/public/logo/favicon.ico" type="image/x-icon">`;
  let fontawesome = ``;

  if(webconfig.font_awesome_cdn !== ''){
    fontawesome += `\n<link rel="stylesheet" href="${webconfig.font_awesome_cdn}">`
  }

  const googlefonts = Pagesetting.font_selection.split(',');
  let validFont = `\n`;
  googlefonts.forEach(font => {
    if(font !== ""){
      const googlefont = `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=${font}:wght@100;200;300;400;500;600;700;800;900&display=swap">\n`;
      validFont += googlefont;
    }
});

let validcssFramework = `\n`;
const cssframeworks = JSON.parse(webconfig.css_framework);
const pscssframework = Pagesetting.css_framework.split(',');
pscssframework.forEach(element => {
  cssframeworks.forEach(anim => {
    if(anim.value === element && anim.value !== '' && anim.rawLink !== ''){
      validcssFramework += `<link id="${anim.value}" rel="stylesheet" href="${anim.rawLink}" data-css-framework="true" data-css-name="${anim.name}">\n`;
    }
  });
});

let validjsFramework = `\n`;
const jsframeworksRAW = JSON.parse(webconfig.js_framework);
const jslibrary = [];
jsframeworksRAW.forEach(anim => {
  let linkScript = ``;
    const dataLinks = anim.link.split(',')
    dataLinks.forEach(element => {
      if(element !== ""){
        const link = `<script src="${element}"></script>\n`
      linkScript += link;
      }
    });
    const newObject = {
      name : anim.name,
      value : anim.value,
      link : linkScript,
      rawLink : dataLinks,
    }
    // console.log(newObject)
    jslibrary.push(newObject)
});
const psjsframework = Pagesetting.animation_array.split(',');
psjsframework.forEach(element => {
  jslibrary.forEach(anim => {
    if(anim.value === element && anim.value !== ''){
      anim.rawLink.forEach(link => {
        if(link !== ''){
          validjsFramework += `<script src="${link}" data-js-framework="true"></script>\n`;
        }
      });
    }
  });
});

//=== Link fontawesome, 3rd party css and js libraries End===//
//=== Pagesetting Css File Start===//
const coreCSS = `\n${Pagesetting.custom_css}\n`;

let bodyFonts = `\n`;

if(Pagesetting.body_font !== ''){
  bodyFonts = `font-family: ${Pagesetting.body_font};`;
}

const bodyCSS = `\nbody {
  ${bodyFonts}
  margin-top: ${Pagesetting.margin_top}${Pagesetting.margin_parameter};
  margin-right: ${Pagesetting.margin_right}${Pagesetting.margin_parameter};
  margin-bottom: ${Pagesetting.margin_bottom}${Pagesetting.margin_parameter};
  margin-left: ${Pagesetting.margin_left}${Pagesetting.margin_parameter};
  padding-top: ${Pagesetting.padding_top}${Pagesetting.padding_parameter};
  padding-right: ${Pagesetting.padding_right}${Pagesetting.padding_parameter};
  padding-bottom: ${Pagesetting.padding_bottom}${Pagesetting.padding_parameter};
  padding-left: ${Pagesetting.padding_left}${Pagesetting.padding_parameter};
  background-color: ${Pagesetting.background_val};
  overflow-x: ${Pagesetting.overflow_x};
  ${Pagesetting.additional_css}     
}`;
//=== Pagesetting Css File End===//

//=== Make Content File Start===//
  const headContent = `
  <!-- PS ${Pagesetting.pagesetting_name} START -->${fontawesome}
  ${validjsFramework}
  ${validcssFramework}
  ${validFont}
  ${PSLink}
  ${icon}
  <!-- PS ${Pagesetting.pagesetting_name} END -->
  `;
  const scriptContent = `
  <script id="bodyScript">
  ${Pagesetting.custom_js}
  </script>`;
  const cssContent = `${coreCSS}${bodyCSS}`;
//=== Make Content File End===//

//=== Saving File Start===//
  const cssPath = `./public/ps_css_${Pagesetting.id}.css`;
  const headPath = `./views/Pagesettings/ps-head-${Pagesetting.id}.ejs`;
  const scriptPath = `./views/Pagesettings/ps-script-${Pagesetting.id}.ejs`;
  fs.writeFile(headPath, headContent, (err) => {
    if (err) {
      console.log(err)
      return 'failed'
    }
  });
  fs.writeFile(scriptPath, scriptContent, (err) => {
    if (err) {
      console.log(err)
      return 'failed'
    }
  });
  fs.writeFile(cssPath, cssContent, (err) => {
    if (err) {
      console.log(err)
      return 'failed'
    }
  });
  //=== Saving File End===//
  return 'Success'
} catch (error) {
  return 'failed'
}
  }
const deletePsEJS = async (PagesettingID,checkPages)=>{
  if(!PagesettingID){
    return 'failed'
  }
  if(checkPages >= 1){
    return 'failed'
  }

  const cssPath = `./public/ps_css_${PagesettingID}.css`;
  const headPath = `./views/Pagesettings/ps-head-${PagesettingID}.ejs`;
  const scriptPath = `./views/Pagesettings/ps-script-${PagesettingID}.ejs`;

  try {
  fs.unlinkSync(cssPath);
  fs.unlinkSync(headPath);
  fs.unlinkSync(scriptPath);
  return 'success';
  } catch (error) {
    return `failed ${error}`
  }
}

  export const updatePageSetting = async (req,res)=>{
    const {
      IDS,key,pagename,desc,tags,bodyfont,overflowX,
      bgcolor,bgop,bgval,mPar,mTop,mRight,mBottom,mLeft,
      pPar,pTop,pRight,pBottom,pLeft,addCSS,mobile,tablet,fonts,palattes,
      css,js,cssFramework,animateArray,cssTarget,
    } = req.body;
    const dataID = parseInt(IDS,10);
  try {
    const Update = await PageSetting.findByPk(dataID);
    if(!Update){
      return res.status(404).json({ message: 'Page Setting not found' });
    } 
    // const user = parseInt(userId, 10);
    // console.log(Update.owner)
    // console.log(IDS)
    // Update Pagesetting
    Update.pagesetting_name = pagename;
    Update.body_font = bodyfont;
    Update.overflow_x = overflowX;
    Update.background_color = bgcolor;
    Update.background_opacity = bgop;
    Update.background_val = bgval;
    Update.margin_parameter = mPar;
    Update.margin_top = mTop;
    Update.margin_right = mRight;
    Update.margin_bottom = mBottom;
    Update.margin_left = mLeft;
    Update.padding_parameter = pPar;
    Update.padding_top = pTop;
    Update.padding_right = pRight;
    Update.padding_bottom = pBottom;
    Update.padding_left = pLeft;
    Update.additional_css = addCSS;
    Update.mobile_breakpoint = mobile;
    Update.tablet_breakpoint = tablet;
    Update.font_selection = fonts;
    Update.color_palatte = palattes;
    Update.custom_css = css;
    Update.custom_js = js;
    Update.css_framework = cssFramework;
    Update.animation_array = animateArray;
    Update.css_target = cssTarget;
    Update.description = desc;
    Update.tags = tags;
  
    await Update.save();
    const createFile = await createPsEJS(Update);
    if(createFile === 'Success'){
      return res.status(200).json({ message: 'Page Setting Saved Succesfully' });
    } else {
      return res.status(403).json({ message: 'Even Pagesetting saved, something weird happend, please save again' });
    }
  } catch (error) {
    console.error('Terjadi kesalahan saat mengupdate komponen:', error);
        return res.status(500).json({ message: 'Terjadi kesalahan saat mengupdate komponen' });
  }
   
    
  }

export const SavePageSettingOnEditor = async (req,res)=>{
  const {
    IDS,key,pagename,bodyfont,overflowX,
    bgcolor,bgop,bgval,mPar,mTop,mRight,mBottom,mLeft,
    pPar,pTop,pRight,pBottom,pLeft,addCSS,mobile,tablet,fonts,palattes,
    css,js,cssFramework,animateArray,cssTarget,
  } = req.body;
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
    return res.status(403).json({ content: 'You Must Login With Your Administrator Account',task: "error-response" });
}

  const Update = await PageSetting.findOne({
    where: {
      pagesetting_key: key
  }
  });
  if(!Update){
    return res.status(404).json({ content: 'Page Setting not found',task: "error-response" });
  } 

  // Update Pagesetting
  Update.pagesetting_name = pagename;
  Update.body_font = bodyfont;
  Update.overflow_x = overflowX;
  Update.background_color = bgcolor;
  Update.background_opacity = bgop;
  Update.background_val = bgval;
  Update.margin_parameter = mPar;
  Update.margin_top = mTop;
  Update.margin_right = mRight;
  Update.margin_bottom = mBottom;
  Update.margin_left = mLeft;
  Update.padding_parameter = pPar;
  Update.padding_top = pTop;
  Update.padding_right = pRight;
  Update.padding_bottom = pBottom;
  Update.padding_left = pLeft;
  Update.additional_css = addCSS;
  Update.mobile_breakpoint = mobile;
  Update.tablet_breakpoint = tablet;
  Update.font_selection = fonts;
  Update.color_palatte = palattes;
  Update.custom_css = css;
  Update.custom_js = js;
  Update.css_framework = cssFramework;
  Update.animation_array = animateArray;
  Update.css_target = cssTarget;

  await Update.save();
  const createFile = await createPsEJS(Update);
    if(createFile === 'Success'){
      return res.status(200).json({ content: 'Page Setting Saved Succesfully',task: "save-response-page" });
    }

} catch (error) {
  console.error('Terjadi kesalahan saat mengupdate komponen:', error);
      return res.status(500).json({ content: 'Error 500: Something went Wrong',task: "error-response" });
}
 
  
}

export const getOnePageSettingEncoded = async (req,res) =>{
  const {encoded} = req.query;
  if (!encoded) {
    return res.status(400).json({ msg: 'No pagesetting key be provided' });
  }
  const key = decoded_function(encoded);
  try {
    let page_setting;
    const PS = await PageSetting.findOne({
      where: {
        pagesetting_key: key
    }
    });
    if(PS){
      page_setting = PS;
    } else {
      const defaultPS = await PageSetting.findOne({
        where: {
          pagesetting_default: true
      }
      });
      page_setting = defaultPS;
    }
    res.json({ page_setting });
  } catch (error) {
    return res.status(403).json({ message: 'no pagesetting found' });
  }
}

export const getPagesettingcoreOnly = async (req,res) => {

try {
  const pagesettings = await PageSetting.findAll({
    attributes: ['pagesetting_key','id','pagesetting_name'],
  });
  res.status(200).json({pagesettings})
} catch (error) {
  res.status(500).json({ error: `Internal Server Error : ${error}` });
}
}

