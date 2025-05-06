import fs from 'fs';
import {menus} from '../utils/JSPressAdminUtils.js';
import {data_route,js_route} from '../routes/index.js';

//Add Sidebar Menu
export const plugin_menus = [];
const add_admin_sidebar_menu = (data)=>{
    menus.push(data)
}
//Add New Admin Page
export const plugin_admin_pages = [];
const add_admin_page = (page)=>{
    let pagename = page.pagename;
    let ejsFile  = page.ejsFile;
    let path = page.path;
    let command = 'reg';
    if(page.command){
        command = page.command
    }
    const filePath = `./views/JS Press Admin/${path}.ejs`;
    let file = `<html>
    <head>
        <title>${pagename}</title>
        <%- include('jsa-head') %>
    </head>
    <body>
        <section id="js-press-dashboard-container" class="js-press-dashboard-container">
        <section class="js-admin-Plugins-dashboard">${ejsFile}</section>
            <%- include('jsa-sidebar') %>
        </section>
        
    </body>
</html>`;
if(command === 'full'){
    file = ejsFile;
}
    fs.writeFile(filePath, file, (err) => {
        if (err) {
          console.error('failed creating file:', err);
        }
      });
}
// Add New Route
export const plugin_routes = [];
export const add_data_route = (data)=>{
    data_route.push(data)
    }

// Add Function in Array
export const plugin_function_array = [];


export const pluginExecute = ()=>{
console.log('Execute the Plugins...')
plugin_menus.forEach(menu =>{
    add_admin_sidebar_menu(menu)
});
plugin_admin_pages.forEach(page =>{
    add_admin_page(page)
});
plugin_routes.forEach(route =>{
    add_data_route(route)
});

plugin_function_array.forEach(func => {
    func();
})
const adminDashboar = {ejsfile: "js-admin-dashboard",route: "/admin/*",process : 'admin'};
const loginPage = {ejsfile: "Login Page",route: "/*",process : 'js-press-page'};
console.log('adding Login Page & Dashboard...')
add_data_route(adminDashboar)
add_data_route(loginPage)

js_route(data_route);
}