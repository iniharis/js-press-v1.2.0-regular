import Media from "../models/MediaModel.js";
import WebConfig from "../models/WebConfigModel.js";
import fs from 'fs'; 
import { Op } from 'sequelize';
import {getHexa2} from '../utils/generaterandomAlphabet.js';

export const UploadMedia = async(req,res) =>{
    const {
        name,
        extention,
        dataImage,
        folder
    } = req.body;
    let new_media_name = name;
    const newHexa = getHexa2();
    try {
        // Ambil data konfigurasi situs dari database
        const media = await Media.findOne({
            where: {
                media_name : name
            }
        });
        if(media){
            
            new_media_name = name + newHexa;
        }
        if(new_media_name == ''){
            return res.status(403).json({ msg: "Name cannot be blank" });
        }

        const URL = `./Media/stocks/${new_media_name}.${extention}`;
        const dataUrl = `Media/stocks/${new_media_name}.${extention}`
        const imageData = dataImage.replace(/^data:image\/\w+;base64,/, '');
        const imageBuffer = Buffer.from(imageData, 'base64');
        fs.writeFileSync(URL, imageBuffer);

        const newMedia = await Media.create({
            media_name : new_media_name,
            media_ext : extention,
            media_url : dataUrl,
            media_folder : folder
        });

        // Kirim respons ke client jika pembaruan berhasil
        return res.status(200).json({ msg: "Media saved",newMedia });
    } catch (error) {
        console.error('Terjadi kesalahan saat memperbarui konfigurasi situs:', error);
        return res.status(500).json({ msg: "Failed to save media", error: error.message });
    }
}

export const getMedia = async (req, res) => {
    const {keyword, dataoffset,searchFolder } = req.query;
    const offset = parseInt(dataoffset, 10);
    const renderLimit = 12;
    let orderCriteria = [['createdAt', 'DESC']];
    let folder = searchFolder;
    let whereClause = {media_folder: folder};
    if(folder == 'all-folder'){
        folder = ''
        whereClause = {};
    }
    if (typeof keyword === 'string' && keyword.trim() !== '') {
        if(searchFolder == 'all-folder'){
            whereClause = {
                [Op.and]: [
                    {
                        [Op.or]: [
                            { media_name: { [Op.like]: `%${keyword}%` } },
                            { media_url: { [Op.like]: `%${keyword}%` } },
                        ],
                    },
                ],
            };
        } else {
            whereClause = {
                media_folder: folder,
                [Op.and]: [
                    {
                        [Op.or]: [
                            { media_name: { [Op.like]: `%${keyword}%` } },
                            { media_url: { [Op.like]: `%${keyword}%` } },
                        ],
                    },
                ],
            };
        }
        
    } 
    try {
        const totalCount = await Media.count({
            where: whereClause,
        });

        const components = await Media.findAll({
            where: whereClause,
            order: orderCriteria,
            offset: parseInt(offset) || 0,
            limit: renderLimit,
        });
        const newOffset = offset + renderLimit;
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

export const deleteMedia = async (req,res) =>{
    const {mediaID,url} = req.query;  
    const mediaId = parseInt(mediaID, 10);
    const filePath = `./${url}`
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ msg: "Media Not Found"});
    } 
    try {
        const media = await Media.findByPk(mediaId);
        if(!media){
            return res.status(404).json({ msg: "Media Not Found"});
        }
        await media.destroy();
        fs.unlinkSync(filePath);
        return res.status(200).json({ msg: "Media Deleted" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Failed to delete media", error: error.message });
    }
}

export const editMedia = async (req,res) =>{

    const {mediaID,newName,newFolder} = req.query;  
    const mediaId = parseInt(mediaID, 10);
    let new_name = newName;
    const newHexa = getHexa2();

    try {
        const media = await Media.findByPk(mediaId);
        if(!media){
            return res.status(404).json({ msg: "Media Not Found"});
        }
        const media2 = await Media.findOne({
            where: {
                media_name : new_name
            }
        });
        if(media2 && media2.id !== mediaId){
            new_name = newName + "-"+newHexa;
        }
        const oldURL = `./Media/stocks/${media.media_name}.${media.media_ext}`;
        const newURL = `./Media/stocks/${new_name}.${media.media_ext}`;
        const dataUrl = `Media/stocks/${new_name}.${media.media_ext}`

        if (!fs.existsSync(oldURL)) {
            return res.status(404).json({ msg: "Media Not Found"});
        } 

        media.media_name = new_name;
        media.media_folder = newFolder;
        media.media_url = dataUrl;

        await media.save();
        fs.renameSync(oldURL, newURL);

        return res.status(200).json({ msg: "Media Updated",media });
    } catch (error) {
        console.error(error)
        return res.status(500).json({ msg: "Failed to edit media", error: error.message });
    }
}
