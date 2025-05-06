import Custom_function from '../models/custom_functionModel.js';
import { Op } from 'sequelize';
import Users from "../models/UserModel.js";
import Pages from "../models/PageModel.js";
import fs from 'fs';

export const createFunction = async (req,res)=> {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(404).json({ msg: 'There is No Users, Please reload' });
            }
        const user = await Users.findOne({
            where: {
                refresh_token: refreshToken,
                role : 'Administrator'
            }
        });
        if(!user){
            console.log('gaada')
            return res.status(404).json({ msg: 'There is No Users, Please reload' });
        }

        const new_function = await Custom_function.create();

        new_function.name = `New Function ${new_function.id}`;
        const txtpath = `./views/CF-txt/custom_function-${new_function.id}.txt`;
        const ejspath = `./views/CF-EJS/custom_function-${new_function.id}.ejs`;
        const datatxt = ``;
        const dataEJS = `<script></script>`;

      fs.writeFile(txtpath, datatxt, (err) => {
        if (err) {
          console.error('Gagal menulis file:', err);
        }
      });
      fs.writeFile(ejspath, dataEJS, (err) => {
        if (err) {
          console.error('Gagal menulis file:', err);
        }
      });

        new_function.ejs_path = ejspath;
        new_function.txt_path = txtpath;
        await new_function.save();
        return res.status(200).json({msg: "Publish Successful"})
    } catch (error) {
        return res.status(500).json({ msg: `Internal server error ${error}` });
    }
}

export const getCustomFunction = async (req, res) => {
    const {keyword, dataoffset } = req.query;
    const offset = parseInt(dataoffset, 10);
    const renderLimit = 6;
    let orderCriteria = [['createdAt', 'DESC']];
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(404).json({ msg: 'There is No Users, Please reload' });
        }
    const user = await Users.findOne({
        where: {
            refresh_token: refreshToken,
            role : 'Administrator'
        }
    });
    if(!user){
        console.log('gaada')
        return res.status(404).json({ msg: 'There is No Users, Please reload' });
    }
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
                ],
            },
        ],
    };
  }
        // Hitung total komponen
        const totalCount = await Custom_function.count({
            where: whereClause,
        });
        const totalremain = totalCount - renderLimit - offset;
        // Dapatkan data komponen dengan pengaturan yang diberikan
        const data = await Custom_function.findAll({
            where: whereClause,
            order: orderCriteria,
            offset: parseInt(offset) || 0,
            limit: renderLimit,
        });
        const newOffset = offset + renderLimit;
        const components = [];
        for (const comp of data) {
            
            //===================================//
            const transformedComp = {
                id: comp.id,
                name : comp.name,
                content_path : comp.content_path,
                content : ''
            };
            components.push(transformedComp);
            //===================================//
        }
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

  export const deleteCustomFunction = async (req,res) => {
    const {function_id} = req.query;
    if(!function_id){
        return res.status(403).json({ msg: 'Function id missing' });
    }
    const functionid = parseInt(function_id,10);
    const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(404).json({ msg: 'There is No Users, Please reload' });
            }
        const user = await Users.findOne({
            where: {
                refresh_token: refreshToken,
                role : 'Administrator'
            }
        });
        if(!user){
            return res.status(404).json({ msg: 'There is No Users, Please reload' });
        }
    try {
        const custom_function = await Custom_function.findByPk(functionid);
        if(!custom_function){
            return res.status(404).json({ msg: 'Comment Not Found, please reload and try again' });
        }
        
        const checkPages = await Pages.count({
            where: {
                custom_function: {
                    [Op.like]: `%${custom_function.id}_%`
                }
            }
          });
          
          if(checkPages >= 1){
            const pages = await Pages.findAll({
                where: {
                    custom_function: {
                        [Op.like]: `%${custom_function.id}_%`
                    }
                }
            });
            let number = 1;
            let errorText = `<p>Page's bellow still linked from this custom function :</p>`;
            for (const page of pages) {
              const text = `\n <p>${number}. ${page.name}</p>`;
              errorText += text;
            }
            errorText += `Unlink it first before deleting this custom function. </br><button style="width: 100%; margin-top: 15px;" id="js-popup-button-error" class="js-popup-button-true" lazydev="18e5af550451" type="button">
            <icon id="icon-18e5af550451" class="fa fa-check" style="padding-right: 1em;">
            
            </icon>
      
            Understood
            </button>`;
            return res.status(403).json({ msg: errorText });
          } else {
            const ejs_path =custom_function.ejs_path;
            const txt_path =custom_function.txt_path;
            fs.unlink(ejs_path, (err) => {
                if (err) {
                  console.error('Error deleting file:', err);
                  return;
                }
                console.log('File deleted successfully');
              });
            fs.unlink(txt_path, (err) => {
                if (err) {
                  console.error('Error deleting file:', err);
                  return;
                }
                console.log('File deleted successfully');
              });
          }

        await custom_function.destroy();
        return res.status(200).json({ msg: "Custom Function Deleted" });
    } catch (error) {
        res.status(500).json({ msg: `Internal Server Error : ${error}` });
    }
}

export const duplicateCustomFunction = async (req,res) => {
    const {function_id} = req.query;
    if(!function_id){
        return res.status(403).json({ msg: 'Function id missing' });
    }
    const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(404).json({ msg: 'There is No Users, Please reload' });
            }
        const user = await Users.findOne({
            where: {
                refresh_token: refreshToken,
                role : 'Administrator'
            }
        });
        if(!user){
            return res.status(404).json({ msg: 'There is No Users, Please reload' });
        }
    const functionid = parseInt(function_id,10);

try {
    const custom_function = await Custom_function.findByPk(functionid);
        if(!custom_function){
            return res.status(404).json({ msg: 'Comment Not Found, please reload and try again' });
        }
        let datatxt = '';
        let dataejs = '';
        datatxt = await fs.promises.readFile(custom_function.txt_path, 'utf8');
        dataejs = await fs.promises.readFile(custom_function.ejs_path, 'utf8');
    const new_cf = await Custom_function.create();
    const txtpath = `./views/CF-txt/custom_function-${new_cf.id}.txt`;
    const ejspath = `./views/CF-EJS/custom_function-${new_cf.id}.ejs`;
    fs.writeFile(txtpath, datatxt, (err) => {
        if (err) {
          console.error('Gagal menulis file:', err);
        }
      });
      fs.writeFile(ejspath, dataejs, (err) => {
        if (err) {
          console.error('Gagal menulis file:', err);
        }
      });
    new_cf.name = `${custom_function.name}_duplicate`;
    new_cf.txt_path = txtpath;
    new_cf.ejs_path = ejspath;
    await new_cf.save();
    return res.status(200).json({ msg: "Duplicate Function Success" });
} catch (error) {
    res.status(500).json({ msg: `Internal Server Error : ${error}` });
}

}

export const getDetailCF = async (req,res) => {
    const {function_id} = req.query;
    if(!function_id){
        return res.status(403).json({ msg: 'Function id missing' });
    }
    const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(404).json({ msg: 'There is No Users, Please reload' });
            }
        const user = await Users.findOne({
            where: {
                refresh_token: refreshToken,
                role : 'Administrator'
            }
        });
        if(!user){
            return res.status(404).json({ msg: 'There is No Users, Please reload' });
        }
    const functionid = parseInt(function_id,10);
    try {
        const custom_function = await Custom_function.findByPk(functionid);
        if(!custom_function){
            return res.status(404).json({ msg: 'Comment Not Found, please reload and try again' });
        }
        let datatxt = '';
        datatxt = await fs.promises.readFile(custom_function.txt_path, 'utf8');
        const detail = {
            name :custom_function.name,
            code : datatxt
        }
        return res.status(200).json({ detail });
    } catch (error) {
        res.status(500).json({ msg: `Internal Server Error : ${error}` });
    }
}

export const saveDetailCF = async (req,res) => {
    const {function_id,newName,newCode} = req.body;
    if(!function_id || !newName){
        return res.status(403).json({ msg: 'Function id missing and/or Name Input Blank' });
    }
    const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(404).json({ msg: 'There is No Users, Please reload' });
            }
        const user = await Users.findOne({
            where: {
                refresh_token: refreshToken,
                role : 'Administrator'
            }
        });
        if(!user){
            return res.status(404).json({ msg: 'There is No Users, Please reload' });
        }
    const functionid = parseInt(function_id,10);
    try {
        const custom_function = await Custom_function.findByPk(functionid);
        if(!custom_function){
            return res.status(404).json({ msg: 'Comment Not Found, please reload and try again' });
        }
        const ejs_path = custom_function.ejs_path;
        const txt_path = custom_function.txt_path;
        const new_ejs = `<script>\n${newCode}\n</script>`;
        const new_txt = newCode;
        fs.writeFile(txt_path, new_txt, (err) => {
            if (err) {
              console.error('Gagal menulis file:', err);
            }
          });
          fs.writeFile(ejs_path, new_ejs, (err) => {
            if (err) {
              console.error('Gagal menulis file:', err);
            }
          });
          custom_function.name = newName;
          await custom_function.save();
          return res.status(200).json({ msg: "Function updated successfully" });
    } catch (error) {
        res.status(500).json({ msg: `Internal Server Error : ${error}` });
    }
}

export const get_all_CF = async (req,res) => {
    const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(404).json({ msg: 'There is No Users, Please reload' });
            }
        const user = await Users.findOne({
            where: {
                refresh_token: refreshToken,
                role : 'Administrator'
            }
        });
        if(!user){
            return res.status(404).json({ msg: 'There is No Users, Please reload' });
        }
    try {
        const custom_function = await Custom_function.findAll({
            attributes: ['name','id',],
        });
        return res.status(200).json({ custom_function });
    } catch (error) {
        res.status(500).json({ msg: `Internal Server Error : ${error}` });
    }
}