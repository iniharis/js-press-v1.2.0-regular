import Pages from '../models/PageModel.js';
import Comments from '../models/CommentModel.js';
import CD_Item from '../models/custom_data_item_Model.js';
import Users from "../models/UserModel.js";
import { Op } from 'sequelize';
import {get_webconfig_date_format,get_date_format} from '../utils/date.js';

export const createComment = async (req,res)=>{
    const {url,user_name,user_email,comment_content,user_avatar} = req.body;
    if(!url || !user_name || !user_email || !comment_content){
        return res.status(403).json({ msg: 'Comment Rejected, something missing' });
    }
    const path = url.split('/');
    const path1 = path[1] || "";
    const path2 = path[2] || "";
    console.log(path1 + ' and ' + path2)
    if(path1 === ''){
        return res.status(403).json({ msg: 'Comment Rejected, page not found' });
    }
    try {
    const page = await Pages.findOne({
        where : {
            url : path1
        }
    });
    if(!page){
        return res.status(404).json({ msg: 'Page not found' });
    }

    if(path2 !== ''){
        const custom_data = await CD_Item.findOne({
            where : {
                url: path2
            }
        });
        if(custom_data){
            await Comments.create({
                pageID : page.id,
                custom_data_id : custom_data.id,
                name : user_name,
                email : user_email,
                content : comment_content,
                publicity : false,
                avatar : user_avatar
            });
            return res.status(200).json({msg: "Comment has been created and need an approval by admin"})
        }
    } else {
        await Comments.create({
            pageID : page.id,
            custom_data_id : 0,
            name : user_name,
            email : user_email,
            content : comment_content,
            publicity : false,
            avatar : user_avatar
        });
        return res.status(200).json({msg: "Comment has been created and need an approval by admin"})
    }
    } catch (error) {
        return res.status(500).json({ msg: `Error : ${error}` });
    }
}

export const getcommentFrontend = async (req,res)=>{
    const {url,dataoffset} = req.query;
    if(!url){
        return res.status(403).json({ msg: 'Request Rejected' });
    }

    let orderCriteria = [['createdAt', 'DESC']];
    const offset = parseInt(dataoffset, 10);
    const renderLimit = 10;

    const path = url.split('/');
    let path1 = path[1] || "";
    let path2 = path[2] || "";
    let userdata = '';
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
        const user = await Users.findOne({
            attributes: ['username','avatar','email'],
            where: {
                refresh_token: refreshToken,
            }
        });
        if(user){
            userdata = user; 
        }
        }
    const date_format = await get_webconfig_date_format();
    try {
        const page = await Pages.findOne({
            where : {
                url : path1
            }
        });
        if(!page){
            return res.status(404).json({ msg: 'Page not found' });
        }
        const newOffset = offset + renderLimit;
        if(path2 !== ''){
            const data_list = await CD_Item.findOne({
                where : {
                    url : path2
                }
            });
            if(!data_list){
                return res.status(404).json({ msg: 'Content Page not found' });
            }
            const totalCount = await Comments.count({
                where : {
                    pageID : page.id,
                    custom_data_id : data_list.id,
                    publicity : true
                }
            });
            const render = await Comments.findAll({
                where : {
                    pageID : page.id,
                    custom_data_id : data_list.id,
                    publicity : true
                },
                order: orderCriteria,
                offset: parseInt(offset) || 0,
                limit: renderLimit,
            });
            const comment = []
            for(const com of render){
                const date_formated = get_date_format(date_format,com.createdAt);
                let user_avatar = com.avatar;
                if(user_avatar == null){
                    user_avatar = `/Media/avatar/Default-avatar.jpg`;
                } else {
                    user_avatar = `/Media/avatar/${com.avatar}`;
                }
                const Datapush = {
                    avatar : user_avatar,
                    content : com.content,
                    date : date_formated,
                    id : com.id,
                    name : com.name,
                }
                comment.push(Datapush) 
            }
            res.status(200).json({
                totalCount,
                offset,
                newOffset,
                comment,
                userdata,
                renderLimit,
                msg: `See more comment (${totalCount-(offset+1)})`
            });
        } else {
            const totalCount = await Comments.count({
                where : {
                    pageID : page.id,
                    publicity : true
                }
            });
            const render = await Comments.findAll({
                where : {
                    pageID : page.id,
                    publicity : true
                },
                order: orderCriteria,
                offset: parseInt(offset) || 0,
                limit: renderLimit,
            });
            const comment = []
            for(const com of render){
                const date_formated = get_date_format(date_format,com.createdAt);
                let user_avatar = com.avatar;
                if(user_avatar == null){
                    user_avatar = `/Media/avatar/Default-avatar.jpg`;
                } else {
                    user_avatar = `/Media/avatar/${com.avatar}`;
                }
                const Datapush = {
                    avatar : user_avatar,
                    content : com.content,
                    date : date_formated,
                    id : com.id,
                    name : com.name,
                }
                comment.push(Datapush) 
            }
            res.status(200).json({
                totalCount,
                offset,
                newOffset,
                comment,
                userdata,
                renderLimit,
                msg: `See more comment (${totalCount-(offset+1)})`
            });
        }
    } catch (error) {
        
    }
}

export const getCommentAdminPanel = async (req, res) => {
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
                    { name: { [Op.like]: `%${keyword}%` } },
                    { email: { [Op.like]: `%${keyword}%` } },
                    { content: { [Op.like]: `%${keyword}%` } },
                ],
            },
        ],
    };
  }
        // Hitung total komponen
        const totalCount = await Comments.count({
            where: whereClause,
        });
        const totalremain = totalCount - renderLimit - offset;
        // Dapatkan data komponen dengan pengaturan yang diberikan
        const components = await Comments.findAll({
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

export const commentPublished = async (req,res) => {
    const {comment_id} = req.query;
    if(!comment_id){
        return res.status(403).json({ msg: 'Comment id missing' });
    }
    const commentID = parseInt(comment_id,10);
    try {
        const comment = await Comments.findByPk(commentID);
        if(!comment){
            return res.status(404).json({ msg: 'Comment Not Found, please reload and try again' });
        }
        comment.publicity = true;
        await comment.save();
        return res.status(200).json({ msg: "Comment Published" });
    } catch (error) {
        res.status(500).json({ msg: `Internal Server Error : ${error}` });
    }
}

export const commentUnPublished = async (req,res) => {
    const {comment_id} = req.query;
    if(!comment_id){
        return res.status(403).json({ msg: 'Comment id missing' });
    }
    const commentID = parseInt(comment_id,10);
    try {
        const comment = await Comments.findByPk(commentID);
        if(!comment){
            return res.status(404).json({ msg: 'Comment Not Found, please reload and try again' });
        }
        comment.publicity = false;
        await comment.save();
        return res.status(200).json({ msg: "Comment Unpublished" });
    } catch (error) {
        res.status(500).json({ msg: `Internal Server Error : ${error}` });
    }
}

export const deleteComment = async (req,res) => {
    const {comment_id} = req.query;
    if(!comment_id){
        return res.status(403).json({ msg: 'Comment id missing' });
    }
    const commentID = parseInt(comment_id,10);
    try {
        const comment = await Comments.findByPk(commentID);
        if(!comment){
            return res.status(404).json({ msg: 'Comment Not Found, please reload and try again' });
        }
        await comment.destroy();
        return res.status(200).json({ msg: "Comment Deleted" });
    } catch (error) {
        res.status(500).json({ msg: `Internal Server Error : ${error}` });
    }
}