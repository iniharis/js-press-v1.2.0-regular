document.addEventListener("DOMContentLoaded", async function() {
    try {
        const response = await fetch('/api/adm/get-dashboard');
        const response2 = await fetch(`/api/adm/component?keyword=&dataoffset=${0}&searchFolder=all-folder`);
        const response3 = await fetch(`/api/adm/get-pages?keyword=&dataoffset=${0}&searchFolder=all-folder`);
        
        if (!response.ok) {
            throw new Error('Failed Get Dashbord Stats');
        }
        if (!response2.ok) {
            throw new Error('Failed get Components List');
        }
        if (!response3.ok) {
            throw new Error('Failed get Page List');
        }
        
        const data = await response.json();
        const data2 = await response2.json();
        const data3 = await response3.json();
        
        createStats(data.datares)
        MakeAComponentList(data2.components)
        MakeAPageList(data3.components)
        
    } catch (error) {
        // console.error('Error:', error);
        window.location.href ='/login'
    }
});
//------------------------//
function createStats(data){
document.getElementById('js-press-dashboard-condition-wrapper-pages-value').textContent = `${data.totalComponents}`;
document.getElementById('dashboard_total_page').textContent = `${data.totalPages}`;
document.getElementById('dashboard_total_post').textContent = `${data.totalPosts}`;
document.getElementById('dashboard_total_users').textContent = `${data.totalUsers}`;
}
function MakeAComponentList(datas){
const componentWrapper = document.getElementById('js-press-dashboard-components-wrapper');
let index = 1;
datas.forEach(data => {
    if(index <6){
        let component_name = data.component_name;
        if (component_name.length >= 50) {
            component_name = component_name.substring(0, 50) + "...";
        }
        const div = document.createElement('div');
        div.classList.add('js-press-dashboard-top_pages-wrapper-list');
        div.innerHTML = `
                <span id="js-press-recent-component-${data.id}" class="js-press-dashboard-top_pages-wrapper-list-pagename">
                ${component_name}
                </span>
                  <a href="/open-component/${data.viewlink}" id="view-component-${data.id}" class="js-press-component-list-export  fa-solid fa-eye" style="text-decoration: none;" title="View Component"></a>
                  <i id="edit-component-${data.id}" class="js-press-component-list-open_editor  fas fa-pen-nib" lazydev="18e08b0aff51" title="Open Editor"></i>`;
        componentWrapper.appendChild(div);
        const edit = document.getElementById(`edit-component-${data.id}`);
        edit.addEventListener('click',()=>{
            const url = `/component-builder/${data.id}`;
            window.open(url, '_blank'); 
        })
    }
    index ++;
});
document.getElementById('js-press-dashboard-components').classList.remove('none-mode');
}
function MakeAPageList(datas){
    const pageWrapper = document.getElementById('js-press-dashboard-top_pages-wrapper');
    let index = 1;
    datas.forEach(data => {
        if(index <6){
            let component_name = data.name;
            if (component_name.length >= 50) {
                component_name = component_name.substring(0, 50) + "...";
            }
            const div = document.createElement('div');
            div.classList.add('js-press-dashboard-top_pages-wrapper-list');
            div.innerHTML = `
                    <span id="js-press-recent-page-${data.id}" class="js-press-dashboard-top_pages-wrapper-list-pagename">
                    ${component_name}
                    </span>
                      <a style="text-decoration: none;" href="/${data.url}" id="view-component-${data.id}" class="js-press-component-list-export  fa-solid fa-eye" title="View Page"></a>`;
            pageWrapper.appendChild(div);
        }
        index ++;
    });
    document.getElementById('js-press-dashboard-pages').classList.remove('none-mode');
    }
//------------------------//
