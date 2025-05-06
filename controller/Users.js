import Users from "../models/UserModel.js";
import Folders from '../models/FolderModel.js';
import PageSetting from "../models/PageSettingModel.js";
import Components from '../models/ComponentModel.js';
import { Op, Sequelize } from 'sequelize';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import { response } from 'express';

const usernameChecker = async(data) => {
    try {
      const user = await Users.findOne({
        where:{
            username: data
        }
    });
    if(user){
      return 'username already taken'
    }
    else {
      return 'Clear'
    }
    } catch (error) {
      console.error('Error:', error);
          throw new Error('Error in eraseFeaturingComment');
    }
  }

export const Register = async(req,res) => {
    const {name, email, username, password, confirmPassword} = req.body;

    if(password !== confirmPassword) return res.status(400).json
    ({msg: "Password and Confirm Password didn't match"});

    const usernamecheck = await usernameChecker(username);
    if(usernamecheck !== 'Clear'){
      return res.status(400).json
      ({msg: usernamecheck});
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    try {
        const newUser = await Users.create({
          verified: "unverified",
          role: "Regular member",
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
        additional_css: `display: flex;
        flex-direction: column;
        min-height: 100vh;
        
        `, 
        mobile_breakpoint: 600,
        tablet_breakpoint: 900,
        font_selection: "Lato,",
        color_palatte: `{"name": "Main Color", "value": "rgba(0, 255, 255, 0.842)"}|`,
        custom_css: `
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
            font-size: 1.4vh; /* 1em for potrait mode */
          }
        }
        
        `,
        custom_js: "",
        css_framework: "Bootstrap450,videojs830",
        animation_array: "gsap,",
        css_target: "Main CSS Class",
        description: '',
        tags: '',
        downloaded: 0,
        thanks: 0,
        views: 0,
      }); 

        res.json({msg: "Register Successful"})

    } catch (error) {
        console.log("error terjadi di controller Users" + error);
    }
}

// Fungsi untuk membuat cookie
function createCookie(res, name, value, options) {
  console.log('masuk createCookie')
  const serializedCookie = `${name}=${value};`;
  res.setHeader('Set-Cookie', serializedCookie);
}

export const LoginSession = async (req, res) => {
  console.log('masuk login')
  const { username, password,rememberMe } = req.body;
      if (!username || !password) {
          return res.status(400).json({ msg: "Invalid username or password" });
      }
  try {
      // Validasi input

      // Cari pengguna berdasarkan nama pengguna
      const user = await Users.findOne({
          where: {
              username: username
          }
      });

      if (!user) {
          return res.status(400).json({ msg: "Invalid username or password" });
      }

      // Bandingkan kata sandi
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
          return res.status(400).json({ msg: "Invalid username or password" });
      }

      // Buat token akses dan penyegar
      const { id, name, email, default_folder, defaultPageSetting } = user;

      let refreshJWT = jwt.sign({ id, name, email, default_folder, defaultPageSetting }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '1d'
    });
    let cookieAge = 24 * 60 * 60 * 1000;
    if(rememberMe === true){
      refreshJWT = jwt.sign({ id, name, email, default_folder, defaultPageSetting }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '30d'
    });
    cookieAge = 30 * 24 * 60 * 60 * 1000;
    }
      const accessToken = jwt.sign({ id, name, email, default_folder, defaultPageSetting }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '20s'
      });
      const refreshToken = refreshJWT;

      // Simpan refreshToken ke dalam database
      await Users.update({ refresh_token: refreshToken }, { where: { id: id } });

      // Atur cookie refreshToken dalam respons
      res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          maxAge: cookieAge,
      });

      // Kirim respons dengan accessToken
      // res.json({ msg: "sip" });
      res.json({ accessToken, msg:'success' });
  } catch (error) {
      console.error("Error in Login:", error);
      res.status(500).json({ msg: "Internal server error" });
  }
};

export const Logout = async(req,res) => {
  const refreshToken = req.cookies.refreshToken;
      if(!refreshToken) return res.sendStatus(204);
      const user = await Users.findAll({
          where: {
              refresh_token: refreshToken
          }
      });
      if(!user[0]) return res.sendStatus(204);
      const userId = user[0].id;
      await Users.update(
{
  refresh_token: null,
  AuthToken: null // Menyertakan null untuk menghapus AuthToken
},
{
  where: {
    id: userId
  }
}
);
      res.clearCookie('refreshToken');
      return res.sendStatus(200);
}

export const getUsers = async (req, res) => {
  const {keyword, dataoffset } = req.query;
  const offset = parseInt(dataoffset, 10);
  const renderLimit = 6;
  let orderCriteria = [['createdAt', 'DESC']];

  try {
    const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(201);
        const user = await Users.findOne({
            where: {
                refresh_token: refreshToken
            }
        });
      // let whereClause = {publicity : 'public',};
      let whereClause = {};

// Hanya terapkan kriteria pencarian jika keyword tidak kosong
if (typeof keyword === 'string' && keyword.trim() !== '') {
  whereClause = {
      // publicity : 'public',
      [Op.and]: [
          {
              [Op.or]: [
                  { username: { [Op.like]: `%${keyword}%` } },
                  { name: { [Op.like]: `%${keyword}%` } },
                  { email: { [Op.like]: `%${keyword}%` } },
              ],
          },
      ],
  };
}
      // Hitung total komponen
      const totalCount = await Users.count({
          where: whereClause,
      });
      const totalremain = totalCount - renderLimit - offset;
      // Dapatkan data komponen dengan pengaturan yang diberikan
      const components = await Users.findAll({
          attributes: ['name','role', 'email','id', 'password','username','avatar'],
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
          renderLimit,
          user
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createUser = async (req,res) =>{
  const {namedata,
  roledata,
  usernamedata,
  emaildata,
  passworddata,
  repassworddata,
  dataImage,
  ext} = req.body;

  if(passworddata !== repassworddata){
    return res.status(403).json({ msg: "Password Not Same" });
  }
  if(emaildata === '' || usernamedata === '' || namedata === ''){
    return res.status(403).json({ msg: "Name or Username or Email cannot be blank" });
  }
  try {
    const sameEmail = await Users.findOne({
      where: {
        email : emaildata,
      }
    });
    if(sameEmail){
      return res.status(403).json({ msg: "Email Already Exist" });
    }
    const sameUsername = await Users.findOne({
      where: {
        username : usernamedata,
      }
    });
    if(sameUsername){
      return res.status(403).json({ msg: "Username Already Exist" });
    }
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(passworddata, salt);
    const newUser = await Users.create({
      name : namedata,
      role : roledata,
      username : usernamedata,
      email : emaildata,
      password : hashPassword,
      avatar : 'Default-avatar.jpg'
    });
    if(dataImage !== ''){
      const URL = `./Media/avatar/${usernamedata}.${ext}`;
      const imageData = dataImage.replace(/^data:image\/\w+;base64,/, '');
      const imageBuffer = Buffer.from(imageData, 'base64');
      fs.writeFileSync(URL, imageBuffer);
      newUser.avatar = `${usernamedata}.${ext}`;
      await newUser.save();
    }
    if(roledata === 'Administrator'){
      const defaultFolder = await Folders.findOne({
        where: {
          default_folder : true
        }
      });
      newUser.default_folder = defaultFolder.folder_key;
      await newUser.save();
      const defaultPS = await PageSetting.findOne({
        where: {
          pagesetting_default : true
        }
      });
      newUser.default_pageSetting = defaultPS.pagesetting_key;
      await newUser.save();
      return res.status(200).json({ msg: "Success" });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', msg: 'Internal Server Error' });
  }
}

export const EditUser = async (req,res) =>{
  const {
  userID,
  namedata,
  roledata,
  usernamedata,
  emaildata,
  passworddata,
  repassworddata,
  dataImage,
  ext} = req.body;

  if(passworddata !== repassworddata){
    return res.status(403).json({ msg: "Password Not Same" });
  }
  if(emaildata === '' || usernamedata === '' || namedata === ''){
    return res.status(403).json({ msg: "Name or Username or Email cannot be blank" });
  }
  if(!userID || userID === ''){
    return res.status(403).json({ msg: "Something went wrong, please Reload" });
  }
  const userId = parseInt(userID, 10);

  try {
   
    const user = await Users.findByPk(userId);
    if(!user){
      return res.status(404).json({ msg: "Something went wrong, please Reload" });
    }

    const adminCount = await Users.count({
      where: {
        role : 'Administrator'
      }
    });

    if(adminCount <= 1 && roledata !== 'Administrator'){
      return res.status(403).json({ msg: "You Need Atleast One Administrator" });
    }

    const sameEmail = await Users.findOne({
      where: {
        email : emaildata,
      }
    });

    if(sameEmail && sameEmail.id !== userId){
      return res.status(403).json({ msg: "Email Already Exist" });
    }
    
    user.name = namedata;
    user.role = roledata;
    user.email = emaildata;
    
    if(passworddata !== user.password){
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(passworddata, salt);
      user.password = hashPassword;
    }
    if(dataImage !== ''){
      const URL = `./Media/avatar/${usernamedata}.png`;
      const imageData = dataImage.replace(/^data:image\/\w+;base64,/, '');
      const imageBuffer = Buffer.from(imageData, 'base64');
      user.avatar = `${usernamedata}.png`
      fs.writeFileSync(URL, imageBuffer);
    }
    await user.save();
    return res.status(200).json({ msg: "Success",user });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', msg: `Internal Server Error ${error}` });
  }
}

export const DeleteUser = async (req,res) => {
  const {
    userID,
    MyID} = req.query;
    if(!userID || userID === ''){
      return res.status(403).json({ msg: "Something went wrong, please Reload" });
    }
    if(!MyID || MyID === ''){
      return res.status(403).json({ msg: "Something went wrong, please Reload" });
    }
    const userId = parseInt(userID, 10);
    const adminId = parseInt(MyID, 10);
    if(userId === adminId){
      return res.status(403).json({ msg: "You can't Delete Your Own Account" });
    }
    try {
      const user = await Users.findByPk(userId);
      if(!user){
        return res.status(404).json({ msg: "Something went wrong, please Reload" });
      }
      const adminCount = await Users.count({
        where: {
          role : 'Administrator'
        }
      });
  
      if(adminCount <= 1 && user.role === 'Administrator'){
        return res.status(403).json({ msg: "You Need Atleast One Administrator" });
      };
      const otherAdmins = Users.findOne({
        where: {
          role : 'Administrator',
          id: {
            [Sequelize.Op.not]: userId // Exclude the user being deleted
          }
        },
        order: [['createdAt', 'ASC']]
      });

      
    const myPS = await PageSetting.findAll({ where: { owner: userId } });
    for (const pageSetting of myPS) {
      pageSetting.owner = otherAdmins.id;
      await pageSetting.save(); // Save changes to database
    }

    const myComp = await Components.findAll({ where: { owner: userId } });
    for (const component of myComp) {
      component.owner = otherAdmins.id;
      await component.save(); // Save changes to database
    }

    const myFolder = await Folders.findAll({ where: { owner: userId } });
    for (const folder of myFolder) {
      folder.owner = otherAdmins.id;
      await folder.save(); // Save changes to database
    }
      if(user && user.avatar !== 'Default-avatar.jpg'){
        const URL = `./Media/avatar/${user.avatar}`;
        fs.unlinkSync(URL);
      }
      await user.destroy();
      return res.status(200).json({ msg: "Success" });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error', msg: `Internal Server Error ${error}` });
    }
}

export const getUserByCookies = async (req,res) => {
  const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(404).json({ msg: 'There is No Users, Please reload' });
            }
    try {
      const user = await Users.findOne({
        attributes: ['username',],
        where: {
            refresh_token: refreshToken,
        }
    });
    if(!user){
        return res.status(404).json({ msg: 'There is No Users, Please reload' });
    }
    res.status(200).json({user})
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error', msg: `Internal Server Error ${error}` });
    }
}