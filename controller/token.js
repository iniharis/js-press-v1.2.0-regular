import Users from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(201);
        const user = await Users.findAll({
            where: {
                refresh_token: refreshToken
            }
        });
        // if(!user[0]) return res.sendStatus(403);
        if(!user[0]) return res.sendStatus(201);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) =>{
            if(err) return res.sendStatus(201);
            // if(err) return res.sendStatus(403);
            const userId = user[0].id;
            const name = user[0].name;
            const email = user[0].email;
            const username = user[0].username;
            const folder = user[0].default_folder;
            const Pagesetting = user[0].default_pageSetting;
            // const accessToken = jwt.sign({userId,name,email,username,folder,Pagesetting}, process.env.ACCESS_TOKEN_SECRET,{
            //     expiresIn: '15d'
            // });
            const accessToken = {
                userId,name,username,msg:"authorized"

            }
            res.json({ accessToken })
        })
    } catch (error) {
        console.log(error)
    }
}

// Middleware untuk memeriksa apakah pengguna sudah login
export const requireLogin = async (req, res, next) => {
    try {
        // Cek apakah ada refreshToken pada cookie
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            // Jika tidak ada refreshToken, arahkan pengguna ke halaman login
            return res.redirect('/login');
        }

        // Temukan pengguna yang sesuai dengan refreshToken
        const user = await Users.findAll({
            where: {
                refresh_token: refreshToken
            }
        });

        // Periksa apakah pengguna ditemukan
        if (!user[0]) {
            // Jika tidak ada pengguna yang sesuai, arahkan pengguna ke halaman login
            return res.redirect('/login');
        }

        // Verifikasi refreshToken
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                // Jika refreshToken tidak valid, arahkan pengguna ke halaman login
                return res.redirect('/login');
            }
            // Jika refreshToken valid, lanjutkan ke penanganan permintaan berikutnya
            next();
        });
    } catch (error) {
        console.error('Error:', error);
        // Tangani kesalahan server
        res.status(500).send('Internal Server Error');
    }
};

export const refreshToken2 = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken)return res.json({ name:null })
        const user = await Users.findAll({
            where: {
                refresh_token: refreshToken
            }
        });
        if(!user[0]) return res.sendStatus(403);
        res.json(user)
    } catch (error) {
        console.log(error)
    }
}

export const refreshToken3 = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(200);
        const user = await Users.findAll({
            where: {
                refresh_token: refreshToken
            }
        });
        if(!user[0]) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) =>{
            if(err) return res.sendStatus(403);
            const userId = user[0].id;
            const name = user[0].name;
            const email = user[0].email;
            const username = user[0].username;
            const folder = user[0].default_folder;
            const Pagesetting = user[0].default_pageSetting;
            const accessToken = jwt.sign({userId,name,email,username,folder,Pagesetting}, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: '15d'
            });
            res.json({ accessToken })
        })
    } catch (error) {
        // console.log(error)
    }
}

export const CheckAdmin = async (req, res, next) => {
    try {
        const adminUser = await Users.findOne({ where: { role: 'Administrator' } });

        if (adminUser) {
            // Jika ada admin, lakukan redirect ke halaman tertentu
            return res.redirect('/admin');
        } else {
            // Jika tidak ada admin, lanjutkan ke middleware atau handler berikutnya
            return next();
        }
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
        return res.status(500).json({ message: 'Terjadi kesalahan' });
    }
};

export const isAdminCheck = async() => {
    const adminUser = await Users.findOne({ where: { role: 'Administrator' } });
    if(adminUser){
        return true
    }
    else {
        return false
    }
}