import express from 'express';
import {getWebconfig,putWebConfig,putGoogleFonts,putcssframework,putjsframework,ContactForm,save_SMTP_config,
    getdataDashboard,getAlldata
} from '../controller/WebConfig.js';
import {LoginSession,Logout,
getUsers,createUser,EditUser,DeleteUser,getUserByCookies} from '../controller/Users.js';
import {consoleLOGger,CreateComponent,getComponent,DuplicateComponent,
DeleteComponent,EditDetailComponent,getComponentOnBuilder,openSlicer,sliceComponent,getOneComponentEncoded,
openEditor,saveComponentOnEditor,saveComponentOnBuilderAndCreateNew,getComponentToExport,
CreateComponentFromImport,getComponentscoreOnly} from '../controller/Components.js';
import {registerAndSetup} from '../config/setup.js';
import {refreshToken,refreshToken2} from '../controller/token.js';
import {getFolders,createFolder,deleteFolder,editFolderName,getAllFolders} from '../controller/Folder.js';
import {getPagsetting,deletePS,createNewPageSetting,getOnePagsetting,
updatePageSetting,SavePageSettingOnEditor,getOnePageSettingEncoded,getPagesettingcoreOnly} 
from '../controller/Pagesetting.js';
import {UploadMedia,getMedia,deleteMedia,editMedia} from '../controller/Media.js';
import {CreatePage,getPages,DeletePage,DuplicatePage,setHome,set404,
edit_page,getPageOnEditor,save_dynamic_page,get_dynamic_page,dynamicBuilderGETallPagenameAndID} 
from '../controller/Pages.js';
import {getCommentAdminPanel,getcommentFrontend,createComment,commentPublished,commentUnPublished,deleteComment
} from '../controller/Comments.js';
import {createFunction,getCustomFunction,deleteCustomFunction,duplicateCustomFunction,
getDetailCF,saveDetailCF,get_all_CF} from '../controller/custom_function.js';
import {req_post_table,req_get_table,delete_table,get_table,edit_table,get_all_table_Pagebuilder,
} from '../controller/custom_data_table.js';
import {req_get_data,post_data,getDatas,deleteDatas,duplicateDatas,getDatasADM,
getDynamicContent} from '../controller/custom_data_item.js';
import Users from "../models/UserModel.js";

const APIroute = express.Router();
APIroute.get('/api/isAdmin', async (req, res) => {
    try {
        const adminUser = await Users.findOne({ where: { role: 'Administrator' } });

        if (adminUser) {
            res.status(200).json({ message: 'Ada' });
        } else {
            res.status(200).json({ message: 'Tidak ada' });
        }
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
        res.status(500).json({ message: 'Terjadi kesalahan' });
    }
}); 
//Login And Token
APIroute.post('/api/login', LoginSession);
APIroute.post('/api/logout', Logout);
APIroute.get('/api/check', consoleLOGger);
APIroute.get('/api/token', refreshToken);
APIroute.get('/api/token-2', refreshToken2);
APIroute.post('/api/setup', registerAndSetup);
//Users 
APIroute.get('/api/adm/get-users', getUsers);
APIroute.get('/api/adm/get-this-users', getUserByCookies);
APIroute.post('/api/adm/create-users', createUser);
APIroute.put('/api/adm/edit-users', EditUser);
APIroute.delete('/api/adm/del-users', DeleteUser);
//Custom_Table 
APIroute.get('/api/adm/get-one-table', get_table);
APIroute.get('/api/adm/get-table', req_get_table);
APIroute.get('/api/adm/get-table-on-pagebuilder', get_all_table_Pagebuilder);
APIroute.post('/api/adm/create-table', req_post_table);
APIroute.put('/api/adm/edit-table', edit_table);
APIroute.delete('/api/adm/del-table', delete_table);
//Custom_Data 
APIroute.delete('/api/adm/del-di', deleteDatas);
APIroute.get('/public_api/get-custom-datas', getDatas);
APIroute.get('/public_api/get-custom-content', getDynamicContent);
APIroute.get('/api/adm/get-custom-data-adm', getDatasADM);
APIroute.get('/api/adm/get-custom-data', req_get_data);
APIroute.post('/api/adm/create-data', post_data);
APIroute.post('/api/adm/dup-data', duplicateDatas);
//Custom Function 
APIroute.delete('/api/adm/del-cf', deleteCustomFunction);
APIroute.put('/api/adm/edit-cf', saveDetailCF);
APIroute.post('/api/adm/duplicate-cf', duplicateCustomFunction);
APIroute.post('/api/adm/create-cf', createFunction);
APIroute.get('/api/adm/get-cf-core', get_all_CF);
APIroute.get('/api/adm/get-cf-code', getDetailCF);
APIroute.get('/api/adm/get-cf', getCustomFunction);
//Comment 
APIroute.get('/api/adm/get-comments', getCommentAdminPanel);
APIroute.get('/api-public/get-comments', getcommentFrontend);
APIroute.put('/api/adm/publish-comments', commentPublished);
APIroute.put('/api/adm/unpublish-comments', commentUnPublished);
APIroute.delete('/api/adm/del-comments', deleteComment);
APIroute.post('/api-public/post-comments', createComment);
//Page 
APIroute.get('/public_api/get-page-datas', get_dynamic_page);
APIroute.get('/api/adm/get-pages-dynamic-builder', dynamicBuilderGETallPagenameAndID);
APIroute.put('/api/adm/update-page', edit_page);
APIroute.put('/api/adm/update-page-dynamic', save_dynamic_page);
APIroute.post('/api/adm/dup-page', DuplicatePage);
APIroute.post('/api/adm/create-page', CreatePage);
APIroute.get('/api/adm/get-pages', getPages);
APIroute.get('/api/adm/get-page-on-builder', getPageOnEditor);
APIroute.put('/api/adm/set-home', setHome);
APIroute.put('/api/adm/set-404', set404);
APIroute.delete('/api/adm/del-page', DeletePage);
// Component 
APIroute.get('/api/adm/component-core', getComponentscoreOnly);
APIroute.post('/api/adm/component-import', CreateComponentFromImport);
APIroute.get('/api/adm/component-export', getComponentToExport);
APIroute.get('/api/adm/component-view', getOneComponentEncoded);
APIroute.post('/api/adm/component-slicer', sliceComponent);
APIroute.get('/api/adm/component-slicer', openSlicer);
APIroute.post('/api/adm/get-component-on-editor', getComponentOnBuilder);
APIroute.put('/api/adm/save-component-and-folder-on-editor', saveComponentOnBuilderAndCreateNew);
APIroute.put('/api/adm/save-component-on-editor', saveComponentOnEditor);
APIroute.put('/api/adm/edit-component', EditDetailComponent);
APIroute.get('/api/adm/component-editor', openEditor);
APIroute.get('/api/adm/component', getComponent);
APIroute.post('/api/adm/component', CreateComponent);
APIroute.post('/api/adm/dup-component', DuplicateComponent);
APIroute.delete('/api/adm/del-component', DeleteComponent);
// Media 
APIroute.put('/api/adm/put-media', editMedia);
APIroute.delete('/api/adm/del-media', deleteMedia);
APIroute.get('/api/adm/get-media', getMedia);
APIroute.post('/api/adm/new-media', UploadMedia);
// Web Config 
APIroute.get('/api/adm/get-dashboard', getdataDashboard);
APIroute.get('/api/adm/get-all', getAlldata);
APIroute.get('/api/adm/web-config', getWebconfig);
APIroute.put('/api/adm/web-config', putWebConfig);
APIroute.put('/api/adm/google-fonts', putGoogleFonts);
APIroute.put('/api/adm/web-css', putcssframework);
APIroute.put('/api/adm/web-js', putjsframework);
//Mailer 
APIroute.post('/mail/contact-form-send', ContactForm);
APIroute.put('/api/adm/smtp-config', save_SMTP_config);
// Folder 
APIroute.get('/api/adm/get-all-folder', getAllFolders);
APIroute.get('/api/adm/get-folder', getFolders);
APIroute.post('/api/adm/create-folder', createFolder);
APIroute.put('/api/adm/edit-folder', editFolderName);
APIroute.delete('/api/adm/delete-folder', deleteFolder);
// PageSetting 
APIroute.get('/api/adm/get-ps-core', getPagesettingcoreOnly);
APIroute.get('/api/adm/get-one-ps-encode', getOnePageSettingEncoded);
APIroute.put('/api/adm/-ps-save-on-editor', SavePageSettingOnEditor);
APIroute.put('/api/adm/-ps', updatePageSetting);
APIroute.post('/api/adm/-ps', createNewPageSetting);
APIroute.get('/api/adm/get-one-ps', getOnePagsetting);
APIroute.get('/api/adm/get-ps', getPagsetting);
APIroute.delete('/api/adm/delete-ps', deletePS);

export default APIroute;