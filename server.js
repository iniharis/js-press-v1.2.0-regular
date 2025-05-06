import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import db from './config/db.js';
import router from './routes/index.js';
import path from 'path';
import { pathToFileURL } from 'url';
import { fileURLToPath } from 'url';
//------------------//
import APIroute from './routes/js-api.js'
//--------------------//
import Users from './models/UserModel.js';
import WebConfig from "./models/WebConfigModel.js";
import {WebmailConfig} from './controller/WebConfig.js';
import Components from './models/ComponentModel.js';
import Folders from './models/FolderModel.js';
import PageSetting from './models/PageSettingModel.js';
import Media from './models/MediaModel.js';
import Pages from './models/PageModel.js';
import Comments from './models/CommentModel.js';
import Custom_function from './models/custom_functionModel.js';
import CD_Table from './models/custom_data_table_Model.js';
import CD_Item from './models/custom_data_item_Model.js';
import {pluginExecute} from './Plugins/plugin.js';

//--------------------//

const port = 5000;

dotenv.config();
const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//==============================//
async function loadPlugins() {
  const pluginFolder = path.resolve(__dirname, 'Plugins');

  const loadPromises = [];

  fs.readdirSync(pluginFolder, { withFileTypes: true }).forEach(entry => {
      const fullPath = path.join(pluginFolder, entry.name);

      if (entry.isDirectory()) {
          fs.readdirSync(fullPath).forEach(file => {
              if (file.endsWith('.js')) {
                  const filePath = path.join(fullPath, file);
                  const fileUrl = pathToFileURL(filePath); // Ubah path ke URL

                  console.log(`Found .js file: ${fileUrl}`);

                  const loadPromise = import(fileUrl.href)
                      .then(plugin => {
                          console.log(`Loaded plugin:`, plugin);
                      })
                      .catch(error => {
                          console.error(`Failed to load plugin: ${fileUrl}`, error);
                      });

                  loadPromises.push(loadPromise);
              }
          });
      }
  });

  // Tunggu semua plugin selesai dimuat
  await Promise.all(loadPromises);
}

async function PluginMain() {
  await loadPlugins(); // Tunggu loadPlugins selesai
  pluginExecute(); // Jalankan pluginExecute setelah semua plugin selesai dimuat
}

//==============================//
const __root = path.resolve();
async function authenticateDatabase() {
  try {
      await db.authenticate();
      await WebConfig.sync({ alter: true });
      await Users.sync({ alter: true });
      await Components.sync({ alter: true });
      await PageSetting.sync({ alter: true });
      await Folders.sync({ alter: true });
      await Media.sync({ alter: true });
      await Pages.sync({ alter: true });
      await Custom_function.sync({ alter: true });
      await CD_Table.sync({ alter: true });
      await CD_Item.sync({ alter: true });
      await Comments.sync({ alter: true });
      console.log("database connected...");
      //----------------------//
      app.set('view engine', 'ejs');
      app.set('views', path.join(__dirname, 'views'));
      app.use('/', router);
      app.use(APIroute);
      startup();
      PluginMain();
  } catch (error) { 
      console.error(error);
  }
}
async function startup() {
  try {
    // Cek apakah sudah ada data WebConfig
    const existingConfig = await WebConfig.findOne();
    
    // Jika belum ada data WebConfig, maka buat satu dengan nilai default
    if (!existingConfig) {
      await WebConfig.create({
        site_title: "JS Press",
        site_description: "Js Press CMS Pagebuilder based",
        date_format: "ISO 8601",
        site_favicon: "/public/logo/favicon.ico",
        site_logo: "/public/logo/Logo.png",
        google_fonts : `Zilla Slab,Zilla Slab Highlight,Yanone Kaffeesatz,Work Sans,Vollkorn,Viaoda Libre,Unna,Ubuntu Condensed,Ubuntu,Trispace,Titillium Web,Tenor Sans,Teko,Syne,Spectral,Space Grotesk,Source Sans Pro,Source Code Pro,Signika,Scheherazade,Saira Extra Condensed,Rubik,Roboto Condensed,Roboto,Recursive,Raleway,Rajdhani,Quicksand,Quattrocento Sans,Prompt,Poppins,Playfair Display,Padauk,Oswald,Open Sans,Nunito,Noto Sans JP,Mukta,Montserrat,Markazi Text,Manrope,Literata,Lexend,Lato,Karla,Kanit,Jost,Inter,Inconsolata,Hind,Heebo,Halant,Grenze,Great Vibes,Fraunces,Fira Sans,Exo 2,Epilogue,Droid Sans,Dosis,Della Respira,Cormorant,Comfortaa,Chivo,Cabin,BioRhyme,Biryani,Big Shoulders Display,Be Vietnam,Archivo Black,Archivo,Amiri,ABeeZee`,
        css_framework : `[{"name":"Bootstrap 4.5.0","value":"Bootstrap450","rawLink":"https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"},{"name":"Video Js","value":"videojs830","rawLink":"https://vjs.zencdn.net/8.3.0/video-js.css"}]`,
        js_framework : `[{"name": "Gsap Animation", "value": "gsap", "link": "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js,https://cdnjs.cloudflare.com/ajax/libs/gsap/3.8.0/ScrollTrigger.min.js"}, {"name": "Smooth Scroll Js", "value": "SmoothScroll", "link": "https://cdnjs.cloudflare.com/ajax/libs/smoothscroll/1.4.10/SmoothScroll.min.js"}]`,
        font_awesome_cdn : `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css`,
      });
      console.log("WebConfig has been created.");
    } else {
      WebmailConfig();
      console.log("Webconfig already created.");
    }
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
  }
}

  let server;

  function startServer() {
    authenticateDatabase();
    server = app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }

  
  export function restartServer() {
    if (server) {
      server.close(() => {
        console.log('Server is closed');
        // Membuat server baru
        authenticateDatabase();
        server = app.listen(port, () => {
          console.log(`Server is running on port ${port}`);
        });
      });
    } else {
      console.log('Server is not running');
      authenticateDatabase();
      // Memulai server jika tidak ada server yang berjalan
      server = app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    }
  }
  
  startServer();
  //====================================