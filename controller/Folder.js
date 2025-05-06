import Folders from '../models/FolderModel.js';
import Users from "../models/UserModel.js";
import Media from "../models/MediaModel.js";
import Components from '../models/ComponentModel.js';
import Pages from '../models/PageModel.js';
import jwt from "jsonwebtoken";
import {getHexa} from '../utils/generaterandomAlphabet.js';
import { Op } from 'sequelize';

export const checkFolder = async (TheKey) => {

    try {
      const folder = await Folders.findOne({
        where: {
          folder_key: TheKey
        }
      });
  
      if (!folder) {
        const message = 'null'
        return message
      }
  
      const message = 'valid'
        return message
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
export const getAllFolders = async (req,res) => {
    try {
        const folders = await Folders.findAll({
            // attributes: ['title','key', 'content','views','thanks', 'id', 'owner'],
        });
        res.status(200).json({
            folders
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error',msg: 'Internal Server Error' });
    }
}

export const getFolders = async (req, res) => {
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
                    { folder_name: { [Op.like]: `%${keyword}%` } },
                    // { tags: { [Op.like]: `%${keyword}%` } },
                ],
            },
        ],
    };
  }
        // Hitung total komponen
        const totalCount = await Folders.count({
            where: whereClause,
        });
        const totalremain = totalCount - renderLimit - offset;
        // Dapatkan data komponen dengan pengaturan yang diberikan
        const components = await Folders.findAll({
            // attributes: ['title','key', 'content','views','thanks', 'id', 'owner'],
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
        res.status(500).json({ error: 'Internal Server Error', msg : `Something went wrong : ${error}` });
    }
  };

  export const createFolder = async (req, res) => {
    const { owner } = req.query;
    const datenow = Date.now();
    const hexa = getHexa(owner, datenow, 'Folder_');
    const refreshToken = req.cookies.refreshToken;
    
    if (!refreshToken) return res.json({ name: null });
    
    try {
        const user = await Users.findOne({
            where: {
                refresh_token: refreshToken
            }
        });
        
        if (!user) return res.status(403).json({ msg: 'Forbidden' });

        if (!owner) {
            return res.status(400).json({ msg: 'You Missed Something' });
        }

        await Folders.create({
            owner: owner,
            default_folder: false,
            folder_name: `New Folder ${hexa}`,
            folder_key: hexa,
        });

        return res.status(200).json({ msg: "Folder Created" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const deleteFolder = async (req, res) => {
    const { folderID } = req.query;
    const folderId = parseInt(folderID, 10);
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

        const folder = await Folders.findByPk(folderId);
        // Check if folder is not found
        if (!folder) {
            return res.status(404).json({ msg: 'Folder Not Found' });
        }
        if(folder.default_folder === true){
            return res.status(403).json({ msg: 'Default Folder Cannot Be Delete' });
        }
        const defaultFolder = await Folders.findOne({
            where : {
                default_folder : true
            }
        })
        const AllMedia = await Media.findAll({
            where: {
                media_folder : folder.folder_key,
            }
        });
        const AllComponents = await Components.findAll({
            where: {
                component_folder : folder.folder_key,
            }
        });
        const AllPages = await Pages.findAll({
            where: {
                folder : folder.folder_key,
            }
        });
        AllMedia.forEach(async (media) => {
            media.media_folder = defaultFolder.folder_key;
            await media.save(); // Simpan perubahan ke database
        });
        AllComponents.forEach(async (comp) => {
            comp.component_folder = defaultFolder.folder_key;
            await comp.save(); // Simpan perubahan ke database
        });
        AllPages.forEach(async (page) => {
            page.folder = defaultFolder.folder_key;
            await page.save(); // Simpan perubahan ke database
        });
        // Try to delete the folder
        try {
            await folder.destroy();
            return res.status(200).json({ msg: "Folder Deleted" });
        } catch (error) {
            return res.status(500).json({ msg: "Failed to delete folder", error: error.message });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Internal server error' });
    }
}

export const editFolderName = async (req,res) => {
    const { folderID,newName } = req.query;
    const folderId = parseInt(folderID, 10);
    const refreshToken = req.cookies.refreshToken;
    
    // Check if refreshToken is missing or null
    if (!refreshToken) {
        return res.status(401).json({ msg: 'Unauthorized' });
    }
    if(newName === ''){
        return res.status(403).json({ msg: 'cannot be blank' });
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

        const folder = await Folders.findByPk(folderId);
        // Check if folder is not found
        if (!folder) {
            return res.status(404).json({ msg: 'Folder Not Found' });
        }
        if(folder.default_folder === true){
            return res.status(403).json({ msg: 'Default Folder Cannot Be Rename' });
        }

        // Try to delete the folder
        try {
            folder.folder_name = newName;
            await folder.save();
            return res.status(200).json({ msg: "Folder Name Changed Successfully",new_name : newName });
        } catch (error) {
            return res.status(500).json({ msg: "Failed to Edit folder", error: error.message });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Internal server error' });
    }
}
