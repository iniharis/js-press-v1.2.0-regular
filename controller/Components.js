import Components from '../models/ComponentModel.js';
import Folders from '../models/FolderModel.js';
import Users from "../models/UserModel.js";
import PageSetting from "../models/PageSettingModel.js";
import {checkFolder} from "../controller/Folder.js";
import fs from 'fs';
import { Op } from 'sequelize';
import jwt from "jsonwebtoken";
import {getHexaverA,getHexa} from '../utils/generaterandomAlphabet.js';
import {decoded_function,UniversalencodeChar,encoderArray} from '../utils/encoded_decode.js';
import Pages from "../models/PageModel.js";

export const CreateComponent = async (req,res) => {
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
    const page_key = getHexaverA(user.id,thisDate,"Component "); 
    const newComponent = await Components.create({
        owner: user.id,
        publicity: 'private',
        component_name: page_key,
        component_folder: folder.folder_key,
        pagesetting: PS.pagesetting_key,
        content: '',
        description: '',
        tags: '',
        downloaded : 0,
        views : 0,
        thanks : 0,
    });
    const filePath = `./views/Components/component-${newComponent.id}.ejs`;
    const filePath2 = `./views/Components/component-${newComponent.id}.txt`;
      const dataContent = ``;
      fs.writeFile(filePath, dataContent, (err) => {
        if (err) {
          console.error('Gagal menulis file:', err);
        }
      });
      fs.writeFile(filePath2, dataContent, (err) => {
        if (err) {
          console.error('Gagal menulis file:', err);
        }
      });
    return res.status(200).json({msg: "Publish Successful"})
} catch (error) {
    return res.status(500).json({ msg: `Internal server error ${error}` });
}
}

export const CreateComponentFromImport = async (req,res) => {
    const {importedname,importedcontent} = req.body;
    if(!importedname || !importedcontent){
        return res.status(403).json({ msg: 'Json Rejected' });
    }
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

        await Components.create({
            owner: user.id,
            publicity: 'private',
            component_name: importedname,
            component_folder: folder.folder_key,
            pagesetting: PS.pagesetting_key,
            content: importedcontent,
            description: '',
            tags: '',
            downloaded : 0,
            views : 0,
            thanks : 0,
        });
        return res.status(200).json({msg: "Import Successful"})
    } catch (error) {
        return res.status(500).json({ msg: `Internal server error ${error}` });
    }
    }

export const EditDetailComponent = async (req,res) =>{
    const {compID,newName,newFolder,newTags,newDesc} = req.body;  

    if(!compID || !newName || !newFolder || !newTags || !newDesc){
        return res.status(403).json({ msg: "Something missing" });
    }
    const compId = parseInt(compID, 10);

    try {

      const component_to_edit = await Components.findByPk(compId);
      if(!component_to_edit){
        return res.status(404).json({ msg: "Component Not Found" });
      }
      component_to_edit.component_name = newName;
      component_to_edit.component_folder = newFolder;
      component_to_edit.tags = newTags;
      component_to_edit.description = newDesc;

      await component_to_edit.save();
      return res.status(200).json({ msg: "Component Updated",edited_component:{
        component_name : component_to_edit.component_name,
        component_folder : component_to_edit.component_folder,
        tags : component_to_edit.tags,
        description : component_to_edit.description,
        id : component_to_edit.id
    } });
    } catch (error) {
        console.error(error)
        return res.status(500).json({ msg: "Failed to edit Component", error: error.message });
    }
}

export const getComponent = async (req, res) => {
    const {keyword, dataoffset,searchFolder } = req.query;
    const offset = parseInt(dataoffset, 10);
    const renderLimit = 6;
    let orderCriteria = [['createdAt', 'DESC']];
    let folder = searchFolder;
    let whereClause = {};
    if(folder == 'all-folder'){
        whereClause = {
            [Op.and]: [
                {
                    [Op.or]: [
                        { component_name: { [Op.like]: `%${keyword}%` } },
                        { tags: { [Op.like]: `%${keyword}%` } },
                        { description: { [Op.like]: `%${keyword}%` } },
                    ],
                },
            ],
        };  
    } else {
        whereClause = {
            component_folder: folder, // Gunakan folder yang sudah diperiksa
            [Op.and]: [
                {
                    [Op.or]: [
                        { component_name: { [Op.like]: `%${keyword}%` } },
                        { tags: { [Op.like]: `%${keyword}%` } },
                        { description: { [Op.like]: `%${keyword}%` } },
                    ],
                },
            ],
        };
    }
    try {

        // Hitung total komponen
        const totalCount = await Components.count({
            where: whereClause,
        });

        // Dapatkan data komponen dengan pengaturan yang diberikan
        const  componentrender = await Components.findAll({
            attributes: ['component_name','id','tags','description','component_folder','pagesetting'],
            where: whereClause,
            order: orderCriteria,
            offset: parseInt(offset) || 0,
            limit: renderLimit,
        });
        const newOffset = offset + renderLimit;

        const components = [];
        for (const comp of componentrender) {
            const pagesettingkey = encodingWORD(comp.pagesetting);
            const contentID = encodingWORD(comp.id);
            const message = 'view'
            const idNumber = Date.now();
            const hyperlink = message + '--' + contentID + '--' + pagesettingkey + '--' + idNumber;
            function encodingWORD(word){
                const keyword = word.toString();
                // console.log(keyword)
                const keywordArray = keyword.split('');
                const newArray = [];
                
                keywordArray.forEach((element) => {
                    let newElement = encodeChar(element.toLowerCase());
                    newArray.push(newElement);
                });
                let newkeyword = ''
                newArray.forEach(element => {
                    newkeyword+=element
                });
                
                return newkeyword
                }
                
            function encodeChar(character){
                    let encoded  = character;
                    encoderArray.forEach(element => {
                        if(element.decode === encoded){
                            encoded = element.encode;
                        }
                    });
                    return encoded
                }
            //===================================//
            const transformedComp = {
                component_name: comp.component_name,
                id : comp.id,
                content : comp.content,
                tags: comp.tags,
                description : comp.description,
                component_folder : comp.component_folder,
                pagesetting : comp.pagesetting,
                viewlink : hyperlink,
            };
            components.push(transformedComp);
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

export const getComponentToExport = async (req,res) =>{
const {DataID} = req.query;
const dataId = parseInt(DataID,10);
try {
    const component = await Components.findByPk(dataId);
    if(!component){
        return res.status(404).json({ msg: "Component Not Found" });
    }
    const dataContent = await getComponentTXT(component.id)
    res.status(200).json({component,dataContent})
} catch (error) {
    return res.status(500).json({ msg: `Internal server error ${error}` });
}
}

export const DuplicateComponent = async (req,res) => {
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
        const original_component = await Components.findByPk(original_component_Id);
        if(!original_component){
            return res.status(404).json({ msg: 'There is No Components, Please reload' });
        }
        const user = await Users.findOne({
            where: {
                refresh_token: refreshToken
            }
        });
        if(!user){
            return res.status(404).json({ msg: 'There is No Users, Please reload' });
        }
        const newComponent = await Components.create({
            owner: user.id,
            publicity: 'private',
            component_name: original_component.component_name+"_Duplicate",
            component_folder: original_component.component_folder,
            pagesetting: original_component.pagesetting,
            content: '',
            description: original_component.description,
            tags: original_component.tags,
            downloaded : 0,
            views : 0,
            thanks : 0,
        });
        const filePath = `./views/Components/component-${original_component.id}.ejs`;
        const newFilePath = `./views/Components/component-${newComponent.id}.ejs`;
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
  const ContentTxt = await getComponentTXT(original_component.id);
  const createTXT = saveComponentTXT(ContentTxt,newComponent.id);
  newComponent.content = newFilePath;
  await newComponent.save();
        return res.status(200).json({msg: "Publish Successful"})
    } catch (error) {
        return res.status(500).json({ msg: `Internal server error ${error}` });
    }
}

export const DeleteComponent = async (req,res) => {
    const {CompID} = req.query;  
    const componentId = parseInt(CompID, 10);
    try {
        const component = await Components.findByPk(componentId);
        if(!component){
            return res.status(404).json({ msg: "Component Not Found"});
        }
        
        const checkPages = await Pages.count({
            where: {
                components: {
                    [Op.like]: `%${CompID}--%`
                }
            }
          });
          
          if(checkPages >= 1){
            const pages = await Pages.findAll({
                where: {
                    components: {
                        [Op.like]: `%${CompID}--%`
                    }
                }
            });
            let number = 1;
            let errorText = `<p>Page's bellow still linked from this component :</p>`;
            for (const page of pages) {
              const text = `\n <p>${number}. ${page.name}</p>`;
              errorText += text;
            }
            errorText += `Unlink it first before deleting this component. </br><button style="width: 100%; margin-top: 15px;" id="js-popup-button-error" class="js-popup-button-true" lazydev="18e5af550451" type="button">
            <icon id="icon-18e5af550451" class="fa fa-check" style="padding-right: 1em;">
            
            </icon>
      
            Understood
            </button>`;
            return res.status(403).json({ msg: errorText });
          } else {
            const filePath = `./views/Components/component-${component.id}.ejs`;
            const txtPath = `./views/Components/component-${component.id}.txt`;
            fs.unlink(filePath, (err) => {
                if (err) {
                    return res.status(403).json({ msg: "Component failed to delete"});
                } else {
                  console.log('Delete Success:', filePath);
                }
              });
              fs.unlink(txtPath, (err) => {
                if (err) {
                    return res.status(403).json({ msg: "Component failed to delete"});
                } else {
                  console.log('Delete Success:', filePath);
                }
              });
          }
        await component.destroy();

        return res.status(200).json({ msg: "Component Deleted" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Failed to delete Component", error: error.message });
    }
}

export const consoleLOGger = async (req,res) =>{
    try {
        res.json({msg: "API Successful"})
    } catch (error) {
        console.log(error);
            return res.status(500).json({ message: 'Internal server error' });
    }
}

export const openEditor = async (req,res) => {
    const {urlID} = req.query;
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        // Jika tidak ada refreshToken, arahkan pengguna ke halaman login
        return res.redirect('/login');
    }
    const componentId = parseInt(urlID,10);
    const ContentTxt = await getComponentTXT(urlID);
    try {
        const component = await Components.findByPk(componentId);
        if(!component){
            res.status(404).json({msg: "Not Found"});
        }
        const PSListParse = await PageSetting.findAll();
        const folderParse = await Folders.findAll();
        const componentList = await Components.findAll({
            attributes: ['id', 'owner', 'component_name','component_folder','publicity','pagesetting'],
        });
        const user = await Users.findOne({
            where: {
                refresh_token: refreshToken
            }
        });
        if(!user){
            return res.status(404).json({ msg: 'There is No Users, Please reload' });
        }

        const PSList = JSON.stringify(PSListParse);
        const folder = JSON.stringify(folderParse);
        const dataFromParent = {
            task : "new-render",
            component_id : component.id,
            owner : component.owner,
            // dataContent : component.content,
            dataContent : ContentTxt,
            folder,
            PSList,
            pagesetting : component.pagesetting,
            name : component.component_name,
            component_folder : component.component_folder,
            componentList,
            userId : user.id
        }
        return res.status(200).json(dataFromParent);
    } catch (error) {
        return res.status(500)
        // .json({ msg: `Internal server error ${error}` });
    }
}

export const saveComponentOnEditor = async (req, res) => {
    const { componentID, componentContent, componentFolder, componentpagesetting,componentName,
        dataHTML,dataCss,dataJs } = req.body;
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        // Jika tidak ada refreshToken, arahkan pengguna ke halaman login
        return res.redirect('/login');
    }
   const folderCheck = await checkFolder(componentFolder);
   if(folderCheck === 'null'){
    return res.status(404).json({ content: 'Error...! Folder not found',task: "error-response" });
   }
   const user = await Users.findOne({
    where: {
        refresh_token: refreshToken,
        role : "Administrator"
    }
});
    if(!user){
    return res.status(403).json({ content: 'You Must Login With Your Administrator Account',task: "error-response" });
        }
   const createTXT = saveComponentTXT(componentContent,componentID);
   if(createTXT === false){
    return res.status(403).json({ content: 'Error...! Cannot Write the component content, Please try again',task: "error-response" });
   }
    try {

      // Cari komponen berdasarkan componentID
      const component = await Components.findByPk(componentID);
      const filePath = `./views/Components/component-${component.id}.ejs`;
  
      if (!component) {
        return res.status(404).json({ content: 'Error...! Component not found',task: "error-response" });
      }
      component.component_name = componentName;
      component.content = filePath;
      component.component_folder = componentFolder;
      component.pagesetting = componentpagesetting;
  
      // Simpan perubahan
      await component.save();

    //   const filePath = `./views/Components/component-${component.id}.ejs`;
      const dataContent = `
      <style>
      ${dataCss}
      </style>

      ${dataHTML}

      <script>
      ${dataJs}
      </script>
      `;
      fs.writeFile(filePath, dataContent, (err) => {
        if (err) {
          console.error('Gagal menulis file:', err);
        }
      });

      return res.status(200).json({ content: 'Component Saved Succesfully',task:"save-response" });
    } catch (error) {
      console.error('Terjadi kesalahan saat mengupdate komponen:', error);
      return res.status(500).json({ content: 'Terjadi kesalahan saat mengupdate komponen', task: "error-response" });
    }
  };

const saveComponentTXT = (Content,ComponentID)=>{
    const filePath = `./views/Components/component-${ComponentID}.txt`;
    let createTXT;
    fs.writeFile(filePath, Content, (err) => {
        if (err) {
            createTXT = false;
        }
      });
      createTXT = true;
      return createTXT
}

export const getComponentTXT = async (ComponentID)=>{
    const filePath = `./views/Components/component-${ComponentID}.txt`;
    const datatxt = await fs.promises.readFile(filePath, 'utf8');
    return datatxt
}

export const getComponentEJS = async (ComponentID)=>{
    const filePath = `./views/Components/component-${ComponentID}.ejs`;
    const datatxt = await fs.promises.readFile(filePath, 'utf8');
    return datatxt
}

export const saveComponentOnBuilderAndCreateNew = async (req, res) => {
    const { userID, componentID, componentContent, 
        componentFolder, componentpagesetting,componentName,dataHTML,dataCss,dataJs } = req.body;
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            // Jika tidak ada refreshToken, arahkan pengguna ke halaman login
            return res.redirect('/login');
        }
        const user = await Users.findOne({
            where: {
                refresh_token: refreshToken,
                role : "Administrator"
            }
        });
        if(!user){
            return res.status(403).json({ content: 'You Must Login With Your Administrator Account',task: "error-response" });
        }
    const createTXT = saveComponentTXT(componentContent,componentID);
   if(createTXT === false){
    return res.status(403).json({ content: 'Error...! Cannot Write the component content, Please try again',task: "error-response" });
   }
    try {
      // Cari komponen berdasarkan componentID
      const component = await Components.findByPk(componentID);
  
      if (!component) {
        return res.status(404).json({ content: 'Component not found',task: "error-response" });
      }
      // Periksa apakah pengguna adalah pemilik komponen sebelum mengupdate
      const thisDate = Date.now();
      const getnewKey = getHexa(userID,thisDate,"folder_"); 
      const filePath = `./views/Components/component-${component.id}.ejs`;
      //Bikin Folder Baru
      await Folders.create({
        owner: userID, // Gunakan ID pengguna baru sebagai pemilik folder
        default_folder: false, // Sesuaikan dengan kebutuhan Anda
        folder_name: componentFolder, // Sesuaikan dengan nama default yang Anda inginkan
        folder_key: getnewKey// Sesuaikan dengan kunci default yang Anda inginkan
    });

      // Update konten dan folder komponen componentName
      component.component_name = componentName;
      component.content = filePath;
      component.component_folder = getnewKey;
      component.pagesetting = componentpagesetting;
  
      // Simpan perubahan
      await component.save();

      const dataContent = `
      <style>
      ${dataCss}
      </style>

      ${dataHTML}

      <script>
      ${dataJs}
      </script>
      `;
      fs.writeFile(filePath, dataContent, (err) => {
        if (err) {
          console.error('Gagal menulis file:', err);
        }
      });
  
      return res.status(200).json({ content: 'Component Saved Succesfully',task: "save-response-folder",folderkey:getnewKey,foldername:componentFolder });
    } catch (error) {
      console.error('Terjadi kesalahan saat mengupdate komponen:', error);
      return res.status(500).json({ content: 'Terjadi kesalahan saat mengupdate komponen',task: "error-response" });
    }
  };

export const getComponentOnBuilder = async (req, res) => {
    const {componentID} = req.body;
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
        const component = await Components.findByPk(componentID);
        if(!component){
            return res.status(404).json({ content: 'Component Not Found',task: "error-response" });
        }
        const ContentTxt = await getComponentTXT(component.id);
        return res.status(200).json({content: ContentTxt,task: "component-rendered"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ content: 'Internal server error',task: "error-response" });
    }
};

export const openSlicer = async (req,res) => {
    const {urlID,URL} = req.query;
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        // Jika tidak ada refreshToken, arahkan pengguna ke halaman login
        return res.redirect('/login');
    }
    const componentId = parseInt(urlID,10);
    try {
        const component = await Components.findByPk(componentId);
        if(!component){
            res.status(404).json({msg: "Not Found"});
        }
        let dataPS = {};
        const Checkpagesetting = await PageSetting.findOne({
            where: {
                pagesetting_key : component.pagesetting
            }
        });
        if(!Checkpagesetting || Checkpagesetting === null){
            let orderCriteria = [['createdAt', 'ASC']];
            const defaultpagesetting = await PageSetting.findOne({
                order: orderCriteria
            });
            dataPS = defaultpagesetting;
        }
        if(Checkpagesetting){
            dataPS = Checkpagesetting;
        }
        const folder = await Folders.findAll();
        const user = await Users.findOne({
            where: {
                refresh_token: refreshToken
            }
        });
        if(!user){
            return res.status(404).json({ msg: 'There is No Users, Please reload' });
        }
        const ContentTxt = await getComponentTXT(component.id);

        const dataFromParent = {
            task : "new-render",
            component,
            content : ContentTxt,
            owner : user.id,
            dataURL : URL,
            folder,
            pagesetting : dataPS,
        }
        return res.status(200).json(dataFromParent);
    } catch (error) {
        console.log(error)
        return res.status(500)
        // .json({ msg: `Internal server error ${error}` });
    }
}

export const saveSlicedComponent = async(data,ID)=>{
    try {
        const new_component = await Components.create({
            owner: ID,
            publicity: data.publicity,
            component_name: data.name,
            component_folder: data.component_folder,
            pagesetting: data.pagesetting,
            content: '',
            tags : '',
            description : '',
        });
        const createTXT = saveComponentTXT(data.content,new_component.id);
        const filePath = `./views/Components/component-${new_component.id}.ejs`;
      fs.writeFile(filePath, data.content, (err) => {
        if (err) {
          console.error('Gagal menulis file:', err);
        }
      });
      new_component.content = filePath;
      await new_component.save();
    } catch (error) {
        console.log(error);
        
    }
}

export const sliceComponent = async (req, res) => {
    const { data } = req.body;
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
            return res.status(404).json({ msg: 'There is No Users, Please reload' });
        }
        await Promise.all(data.map(element => saveSlicedComponent(element, user.id)));
        return res.status(200).json({ content: "Sliced Component Saved Successfully",task: "save-response-success" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ content: "Internal Server Error",task: "error-response" });
    }
}

export const getOneComponentEncoded = async (req,res) =>{
    const {encoded} = req.query;
    if (!encoded) {
      return res.status(400).json({ msg: 'No component key be provided' });
    }
    const key = decoded_function(encoded);
    try {
    const comps = await Components.findByPk(parseInt(key, 10));
    if(!comps){
        return res.redirect('/login');
    }
    const ContentTxt = await getComponentTXT(comps.id);
      res.json({ comps,dataContent:ContentTxt });
    } catch (error) {
      return res.status(403)
    //   .json({ message: 'no component found' });
    }
  }

export const getComponentscoreOnly = async (req,res) => {

try {
  const componentrender = await Components.findAll({
    attributes: ['id','component_name','component_folder','pagesetting'],
  });
  const components = [];
        for (const comp of componentrender) {
            const pagesettingkey = encodingWORD(comp.pagesetting);
            const contentID = encodingWORD(comp.id);
            const message = 'view'
            const idNumber = Date.now();
            const hyperlink = message + '--' + contentID + '--' + pagesettingkey + '--' + idNumber;
            function encodingWORD(word){
                const keyword = word.toString();
                // console.log(keyword)
                const keywordArray = keyword.split('');
                const newArray = [];
                
                keywordArray.forEach((element) => {
                    let newElement = encodeChar(element.toLowerCase());
                    newArray.push(newElement);
                });
                let newkeyword = ''
                newArray.forEach(element => {
                    newkeyword+=element
                });
                
                return newkeyword
                }
                
            function encodeChar(character){
                    let encoded  = character;
                    encoderArray.forEach(element => {
                        if(element.decode === encoded){
                            encoded = element.encode;
                        }
                    });
                    return encoded
                }
            //===================================//
            const transformedComp = {
                component_name: comp.component_name,
                id : comp.id,
                component_folder : comp.component_folder,
                pagesetting : comp.pagesetting,
                viewlink : hyperlink,
            };
            components.push(transformedComp);
            //===================================//
        }
  res.status(200).json({components})
} catch (error) {
  res.status(500).json({ error: `Internal Server Error : ${error}` });
}
}