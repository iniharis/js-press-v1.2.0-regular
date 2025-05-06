import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path'; // Import modul path
import fs from 'fs/promises'; // Import modul fs dari promises
import Pages from '../models/PageModel.js';
import {requireLogin,CheckAdmin,isAdminCheck} from '../controller/token.js';
import {getURL,clientUrl} from  '../utils/urlmain.js';
import {getDynamicPageOR404} from '../controller/Pages.js';
import {menus} from '../utils/JSPressAdminUtils.js';

const app = express();

app.use(cookieParser());

export const router = express.Router();

export const __dirname = path.resolve();

// static route

//---UTILITAS PAGEBUILDER--------------------------------------------------
const utils = [
    // 'AuthToken',
    'encoded_decode',
    // 'generaterandomAlphabet',
    'urlmain',
    'pagebuilderArrays',
  ];
  utils.forEach((utility) => {
    router.get(`/utils-${utility}`, (req, res) => {
      const indexPath = path.join(
        __dirname,
        'utils',
        `${utility}.js`
      );
      res.sendFile(indexPath);
    });
  });
//---UTILITAS PAGEBUILDER--------------------------------------------------
// Router Path ------------------------------------------------------------
export const data_route = [
  {route: '/public',process : 'static',path : 'public'},
  {route: '/media',process : 'static',path : 'Media'},
  {route : '/js-setup*', process : 'middleware', function: CheckAdmin},
  {route : '/admin', process : 'middleware', function: requireLogin},
  {route : '/api/adm', process : 'middleware', function: requireLogin},

  {route: '/js-builder',process : 'static',path : 'PageBuilder'},
  {route : '/component-builder', process : 'middleware', function: requireLogin},
  {route : '/component-builder',process : 'static-route',step: 2, path: ['PageBuilder','pagebuilder.html']},
  {route : '/component-builder/*',process : 'static-route',step: 2, path: ['PageBuilder','pagebuilder.html']},
  
  {route: '/js-slicer',process : 'static',path : 'slicer'},
  {route : '/component-slicer', process : 'middleware', function: requireLogin},
  {route : '/component-slicer',process : 'static-route',step: 2, path: ['slicer','slicer.html']},
  {route : '/component-slicer/*',process : 'static-route',step: 2, path: ['slicer','slicer.html']},

  {route: '/js-dynamic_page',process : 'static',path : 'Dynamic_page'},
  {route : '/dynamic-page-builder', process : 'middleware', function: requireLogin},
  {route : '/dynamic-page-builder',process : 'static-route',step: 2, path: ['Dynamic_page','builder.html']},
  {route : '/dynamic-page-builder/*',process : 'static-route',step: 2, path: ['Dynamic_page','builder.html']},

  {route: '/js-pageview',process : 'static',path : 'pageview'},
  {route : '/open-component', process : 'middleware', function: requireLogin},
  {route : '/open-component',process : 'static-route',step: 2, path: ['pageview','pageview.html']},
  {route : '/open-component/*',process : 'static-route',step: 2, path: ['pageview','pageview.html']},
  {ejsfile: "login-page.ejs",route: "/login",process : 'login'},
  {ejsfile: "js-admin-dashboard",route: "/admin",process : 'admin'},
  {ejsfile: "js-admin-component",route: "/admin/component",process : 'admin'},
  {ejsfile: "js-admin-comment",route: "/admin/comment",process : 'admin'},
  {ejsfile: "js-admin-configuration",route: "/admin/configuration",process : 'admin'},
  {ejsfile: "js-admin-custom-function",route: "/admin/custom-function",process : 'admin'},
  {ejsfile: "js-admin-media",route: "/admin/media",process : 'admin'},
  {ejsfile: "js-admin-page",route: "/admin/page",process : 'admin'},
  {ejsfile: "js-admin-plugin",route: "/admin/plugin",process : 'admin'},
  {ejsfile: "js-admin-post",route: "/admin/post",process : 'admin'},
  {ejsfile: "js-admin-ps",route: "/admin/ps",process : 'admin'},
  {ejsfile: "js-admin-custom-data-table",route: "/admin/custom-table-form*",process : 'admin'},
  {ejsfile: "js-admin-custom-data-list",route: "/admin/custom-data-form*",process : 'admin'},
  {ejsfile: "js-admin-user",route: "/admin/user",process : 'admin'},
  {ejsfile: "js-setup",route: "/js-setup/setup",process : 'admin'},
  {ejsfile: "js-admin-folder",route: "/admin/folder",process : 'admin'},
]

let isAdmin = false;
router.get(`/*`, async (req, res,next) => {
  if(clientUrl === ''){
    getURL(req);
  }
  if(!isAdmin){
    isAdmin = await isAdminCheck();
    if(!isAdmin){
      return res.render(`JS Press Admin/js-setup.ejs`);
    }
  }
  let parts = req.url;
  
  const excludedKeywords = [
          '/public',
          '/media',
          '/js-builder',
          '/component-builder',
          '/js-slicer',
          '/component-slicer',
          '/js-dynamic_page',
          '/dynamic-page-builder',
          '/js-pageview',
          '/open-component',
          '/admin',
          '/login',
          '/api/adm',
          '/api/isAdmin',
          '/api/login',
          '/api/logout',
          '/api/check',
          '/api/token',
          '/api/token-2',
          '/api/setup',
          '/api-public',
          '/Media',
          '/js-setup',
          '/public_api/',
          '/Plugins',
      ];
      if (!excludedKeywords.some(keyword => parts.includes(keyword))){
        parts = parts.substring(1)
        if (parts.endsWith('/')) {
        parts = parts.slice(0, -1);
}
        try {
          if (parts === '/' || parts === '') {
            const home = await Pages.findOne({
                where: {
                    homepage: true
                }
            });
            if (home) {
                res.render(`JS-Press-Public/page-${home.id}.ejs`);
            } else {
                throw new Error("Homepage not found");
            }
        } else {
            const page = await Pages.findOne({
                where: {
                    url: parts
                }
            });
            if (page && page.dynamic_page === null) {
                res.render(`JS-Press-Public/page-${page.id}.ejs`);
            } else {
              const getPage = await getDynamicPageOR404(parts);
              if(getPage.getContent === 'true'){
                const jsonData = JSON.stringify(getPage);
                return res.render(`JS-Press-Public/page-${getPage.url}.ejs`, { jsonData: jsonData });
              } else {
                res.render(`JS-Press-Public/page-${getPage.url}.ejs`);
              }
            }
        }
      } catch (error) {
          console.error(error);
          res.status(500).send("Internal Server Error");
      } 
      } else {
        next();
      }
});

export const js_route = (array_route)=>{
  console.log('Executing The Admin Route')
  array_route.forEach(element => {
    if(element.process === 'static'){
      router.use(`${element.route}`, express.static(path.join(__dirname, `${element.path}`)));
    }
    if(element.process === 'middleware'){
      router.use(`${element.route}`, element.function);
    }
    if(element.process === 'static-route'){
      router.get(`${element.route}`, (req, res) => {
        const indexPath = path.join(__dirname, `${element.path[0]}`, `${element.path[1]}`);
        res.sendFile(indexPath);
      });
    }
    if(element.process === 'admin'){
      router.get(`${element.route}`, (req, res) => {
        res.render(`JS Press Admin/${element.ejsfile}`, { Data: menus });
    });
    }
    if(element.process === 'login'){
      router.get(`${element.route}`, (req, res) => {
      res.render(`JS-Press-Public/${element.ejsfile}`);
    });
    }
    if(element.process === 'js-press-page'){
    }
  });

}
// Router Path ------------------------------------------------------------

export default router;
