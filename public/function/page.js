// Folders
const Myfolders = [];
const renderedFile = [];
const MyPagesettings = [];
const MyComponents = [];
const MyCF = [];
const MyTables = [];
document.addEventListener("DOMContentLoaded", async function() {
    try {
        const response = await fetch('/api/adm/get-all-folder');
        const response2 = await fetch('/api/adm/get-ps-core');
        const response3 = await fetch('/api/adm/component-core');
        const response4 = await fetch('/api/adm/get-cf-core');
        const response5 = await fetch('/api/adm/get-table-on-pagebuilder');

        if (!response.ok) {
            throw new Error('Failed Get Folder List');
        }
        if (!response2.ok) {
            throw new Error('Failed get Pagesetting List');
        }
        if (!response3.ok) {
            throw new Error('Failed Get Component List');
        }
        if (!response4.ok) {
            throw new Error('Failed Get Custom Function List');
        }
        if (!response5.ok) {
            throw new Error('Failed Get Folder List');
        }
        const data = await response.json();
        const folders = data.folders;
        const selectFolder = document.getElementById('js-press-folder-select-page');
        folders.forEach(option => {
            let foldername = option.folder_name;
            if (foldername.length > 25) {
                foldername = foldername.substring(0, 22)+"...";
            }
            const folder = document.createElement('option');
            folder.value = option.folder_key;
            folder.textContent = foldername;
            selectFolder.appendChild(folder);
            Myfolders.push(option)
        });

        const data2 = await response2.json();
        const pagesettings = data2.pagesettings;
        pagesettings.forEach(element => {
            MyPagesettings.push(element) 
        });

        const data3 = await response3.json();
        const components = data3.components;
        components.forEach(element => {
            MyComponents.push(element)
        });

        const data4 = await response4.json();
        const cf = data4.custom_function;
        cf.forEach(element => {
            MyCF.push(element)
        });

        const data5 = await response5.json();
        const CT = data5.data_tables;
        CT.forEach(element => {
            MyTables.push(element)
        });
        // console.log(MyTables)
    } catch (error) {
        // console.error('Error:', error);
        window.location.href ='/login'
        // Tindakan yang sesuai jika terjadi kesalahan, misalnya menampilkan pesan kesalahan ke pengguna
    }
});

const createPage = async ()=>{
    const dataPush = {};
    const popup = document.createElement('section');
    popup.id = 'js-container-popup';
    popup.classList.add('js-container-popup');
    popup.innerHTML = `
    <div id="js-wrapper-popup" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
        <p id="js-popup-text" class="js-popup-text" lazydev="18e5af308c51">
        Creating new Page Please Wait...
        </p>  
        </div>`;
    document.body.appendChild(popup);
    try {
        const response = await fetch('/api/adm/create-page', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataPush)
        });
    
        if (!response.ok) {
            const json = await response.json();
            throw new Error(json.msg);
        }
        // const json = await response.json();
        // console.log(json)
        window.location.reload(); 
    } catch (error) {
        popup.innerHTML = `
        <div id="js-wrapper-popup" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
        <p id="js-popup-text" class="js-popup-text" lazydev="18e5af308c51">
        ${error}
        </p>
  
        <div id="button-box-wrapper" class="button-box-wrapper" lazydev="18e5af3d95b1">
  
        <button id="js-popup-button-false" class="js-popup-button-false" lazydev="18e5af87d291" type="button">
        <icon id="icon-18e5af87d291" class="fa fa-ban" style="padding-right: 1em;">
        
        </icon>
  
        Close
        </button>
  
        
        </div>
  
        
        </div>`;
        const cancelw = document.getElementById('js-popup-button-false'); 
        cancelw.addEventListener('click', (event) => {
        event.preventDefault();
        deletePopup();
    });   
    }
}

function deletePopup(){
    const div = document.getElementById('js-wrapper-popup');
    div.setAttribute('class', 'js-wrapper-popup animated-scale-down')
    const popup = document.getElementById('js-container-popup');
    setTimeout(() => {
        popup.remove();
    }, 200);
}

document.getElementById('js-press-add-new-page').addEventListener('click',createPage);

document.addEventListener('DOMContentLoaded', ()=>{
    getData('',0,'all-folder');
    document.getElementById('js-press-folder-searchbutton-page').addEventListener('click',()=>{
        clearDataFolder();
        const keyword = document.getElementById('js-press-folder-search-page');
        const select = document.getElementById('js-press-folder-select-page');
        getData(keyword.value,0,select.value);
    })
    document.getElementById('js-press-folder-select-page').addEventListener('change',()=>{
        clearDataFolder();
        const keyword = document.getElementById('js-press-folder-search-page');
        const select = document.getElementById('js-press-folder-select-page');
        getData(keyword.value,0,select.value);
    })
    document.getElementById('js-press-folder-search-page').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            clearDataFolder();
            const keyword = document.getElementById('js-press-folder-search-page');
            const select = document.getElementById('js-press-folder-select-page');
            getData(keyword.value, 0, select.value);
        }
    });
    // document.getElementById('js-press-import').addEventListener('click',UploadJson);
});

function clearDataFolder(){
    renderedFile.splice(0, renderedFile.length);
    const lists = document.querySelectorAll('.js-press-page-list-container');
    lists.forEach(element => {
        element.remove();
    });
}

async function getData(keyword,offset,search) {
    // console.log(search)
    document.getElementById('loading-icon').classList.remove('none-mode');
    try {
        // Mengirim permintaan GET ke endpoint server
        const response = await fetch(`/api/adm/get-pages?keyword=${keyword}&dataoffset=${offset}&searchFolder=${search}`);
        
        if (!response.ok) {
            throw new Error('something went wrong');
        }
        
        const data = await response.json();
        
        // console.log(data)
        MakeAPagination(data)
        MakeAList(data.components)
    } catch (error) {
        console.error('Error:', error);
    }
} 

function MakeAPagination(Data){
    // console.log(Data)
    const totalPages = Math.ceil(Data.totalCount / Data.renderLimit);

        oldOffset = Data.offset;
    const thisPage = Data.newOffset / Data.renderLimit
    // console.log(`Halaman Saat ini = ${thisPage} Total Halaman ${totalPages}`);
    const OldJSPressPagination = document.querySelectorAll('.js-press-page-pagination');
    if(OldJSPressPagination){
        OldJSPressPagination.forEach(element => {
            element.remove();
        });
    }
    const paginationContainer = document.getElementById('js-press-page-pagination-container');
    if(totalPages > 2 && thisPage > 1){
    const FirstPage = document.createElement('div');
    FirstPage.classList.add('js-press-page-pagination');
    FirstPage.innerHTML = '<<';
    paginationContainer.appendChild(FirstPage);
    FirstPage.addEventListener('click',()=>{
        clearDataFolder();
        getData(Data.keyword,0,Data.folder_search);
    })
    }
    let page = thisPage;
    if(thisPage == 1){
        for (let i = 0; i < 5; i++) {
            if(page <= totalPages){
                let ThisPagination = page;
                const Pages = document.createElement('div');
                Pages.classList.add('js-press-page-pagination');
                Pages.classList.add(`pagination-${i}`);
                Pages.innerHTML = `${page}`;
            paginationContainer.appendChild(Pages);
            if(page != thisPage){
                Pages.addEventListener('click', ()=>{
                    clearDataFolder();
                    getData(Data.keyword,`${(ThisPagination * Data.renderLimit)-Data.renderLimit}`,Data.folder_search);
                })
            } else {
                Pages.classList.add('js-press-folder-pagination-container-rn');
            }
            page+=1;
            }
            
        }
    } else if(thisPage > 1 && thisPage < 3) {
        for (let i = 0; i < 5; i++) {
            if(page-1 <= totalPages){
                let ThisPagination = page-1;
                const Pages = document.createElement('div');
                Pages.classList.add('js-press-page-pagination');
                Pages.classList.add(`pagination-${i}`);
                Pages.innerHTML = `${page-1}`;
            paginationContainer.appendChild(Pages);
            
            if(page-1 != thisPage){
                Pages.addEventListener('click', ()=>{
                    clearDataFolder();
                    getData(Data.keyword,`${(ThisPagination * Data.renderLimit)-Data.renderLimit}`,Data.folder_search);
                })
            }else {
                Pages.classList.add('js-press-folder-pagination-container-rn');
            }
            page+=1;
            }
            
        }
    } else {
        for (let i = 0; i < 5; i++) {
            if(page-2 <= totalPages){
                let ThisPagination = page-2;
                const Pages = document.createElement('div');
                Pages.classList.add('js-press-page-pagination');
                Pages.classList.add(`pagination-${i}`);
                Pages.innerHTML = `${page-2}`;
            paginationContainer.appendChild(Pages);

            if(page-2 != thisPage){
                Pages.addEventListener('click', ()=>{
                    clearDataFolder();
                    getData(Data.keyword,`${(ThisPagination * Data.renderLimit)-Data.renderLimit}`,Data.folder_search);
                })
            }else {
                Pages.classList.add('js-press-folder-pagination-container-rn');
            }
            page+=1;
            }
            
        }  
    }

    if(totalPages > 2 && thisPage < totalPages){
    const LastPage = document.createElement('div');
    LastPage.classList.add('js-press-page-pagination');
    LastPage.innerHTML = '>>';
    paginationContainer.appendChild(LastPage);
    LastPage.addEventListener('click',()=>{
        clearDataFolder();
        getData(Data.keyword,`${(totalPages * Data.renderLimit)-Data.renderLimit}`,Data.folder_search);
    })
    }
    
}

function MakeAList(datarender){
    // console.log('folderlist')
    // console.log(renderedFolders)
    datarender.forEach(element => {
        renderedFile.push(element)
    });
    document.getElementById('loading-icon').classList.add('none-mode');
    const pagination = document.getElementById('js-press-page-pagination-container');
    renderedFile.forEach(Data => {
        // console.log(Data)
        let page_name = Data.name;
        const container = document.createElement('div');
        container.classList.add('js-press-page-list-container');
        container.id = 'js-press-page-list-container-'+Data.id;
        if(Data.homepage === true){
            container.classList.add('js-page-list-homepage-true')
            page_name = `${Data.name} <p style="font-weight: bold;">(Homepage)</p>`;
        }
        if(Data.page404 === true){
            container.classList.add('js-page-list-404-true')
            page_name = `${Data.name} <p style="font-weight: bold;">(Page 404)</p>`;
        }
        container.innerHTML = `
        <div id="div-18e08b991641-${Data.id}" class="DIV-18e08b991641">
        <span id="js-press-page-list-title-${Data.id}" class="js-press-page-list-title">
        
      ${page_name}
  
        </span>
  
        
        </div>
  
        <div id="js-press-page-list-action-${Data.id}" class="js-press-page-list-action">
        <span id="lazyid18e08a805dd1-${Data.id}" class="lazyclass18e08a805dd1">
        
      Actions
  
        </span>
  
        <div id="div-18e08a8f77f1-${Data.id}" class="DIV-18e08a8f77f1">
        <i id="js-press-page-list-view-${Data.id}" class="js-press-component-list-export  fa-solid fa-eye" lazydev="18e08ab35c71" title="View Page">
        
        </i>
        <i id="js-press-page-list-edit-${Data.id}" class="js-press-page-list-edit_detail  fa fa-edit" lazydev="18e08ab35c71" title="Edit Page">
        
        </i>
  
        <i id="js-press-page-list-homepage-${Data.id}" class="js-press-page-list-set-home  fas fa-home" lazydev="18e08b0aff51" title="Set As Homepage">
        
        </i>

        <i id="js-press-page-list-404-${Data.id}" class="js-press-page-list-set-404  fas fa-bomb" lazydev="18e08b0aff51" title="Set As Page 404">
        
        </i>

        <i id="js-press-page-list-duplicate-${Data.id}" class="js-press-component-list-duplicate  fa fa-copy" lazydev="18e08aee7651" title="Duplicate">
            
        </i>
  
        <i id="js-press-page-list-delete-${Data.id}" class="js-press-page-list-delete  fa fa-trash" lazydev="18e08b303151" title="Delete">
        
        </i>
  
        
        </div>
  
        
        </div>
        `;
        pagination.parentElement.insertBefore(container,pagination);
        
        const containerData = document.getElementById(`js-press-page-list-container-${Data.id}`);

        const viewbutton = document.getElementById(`js-press-page-list-view-${Data.id}`);
        viewbutton.addEventListener('click',()=>{
            const url = `/${Data.url}`;
            window.open(url, '_blank'); 
        })

        const duplicate_button = document.getElementById(`js-press-page-list-duplicate-${Data.id}`);
        if(Data.dynamic_page !== null){
            duplicate_button.remove();
        } else {
            duplicate_button.addEventListener('click', ()=>{
                DuplicateComponent(Data.id)
            })
        }

        const deleteTrigger = document.getElementById(`js-press-page-list-delete-${Data.id}`);
        DeleteComponent(deleteTrigger,Data,containerData)

        const homeTrigger = document.getElementById(`js-press-page-list-homepage-${Data.id}`);
        setHome(homeTrigger,Data)

        const page404trigger = document.getElementById(`js-press-page-list-404-${Data.id}`);
        set404(page404trigger,Data)

        const editTrigger = document.getElementById(`js-press-page-list-edit-${Data.id}`);
        editDetails(editTrigger,Data)

    });
}

function DeleteComponent(trigger,element,container){
    trigger.addEventListener('click', ()=>{
        const popup = document.createElement('section');
        popup.id = 'js-container-popup';
        popup.classList.add('js-container-popup');
        popup.innerHTML = `
        <div id="js-wrapper-popup" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
        <p id="js-popup-text" class="js-popup-text" lazydev="18e5af308c51">
        Are You Sure to Delete This Page?
        </p>
  
        <div id="button-box-wrapper" class="button-box-wrapper" lazydev="18e5af3d95b1">
        <button id="js-popup-button-true" class="js-popup-button-true" lazydev="18e5af550451" type="button">
        <icon id="icon-18e5af550451" class="fa fa-check" style="padding-right: 1em;">
        
        </icon>
  
        Submit
        </button>
  
        <button id="js-popup-button-false" class="js-popup-button-false" lazydev="18e5af87d291" type="button">
        <icon id="icon-18e5af87d291" class="fa fa-ban" style="padding-right: 1em;">
        
        </icon>
  
        Cancel
        </button>
  
        
        </div>
  
        
        </div>`;
        document.body.appendChild(popup);
        const cancelbutton = document.getElementById('js-popup-button-false');
        const submitButton = document.getElementById('js-popup-button-true');
        cancelbutton.addEventListener('click', deletePopup);
        submitButton.addEventListener('click', async()=>{
            const buttonDiv = document.getElementById('button-box-wrapper');
            buttonDiv.classList.add('none-mode');
            const popupText = document.getElementById('js-popup-text');
            popupText.textContent = 'Please Wait...'
            try {
                const response = await fetch(`/api/adm/del-page?CompID=${element.id}`, {
                    method: 'DELETE',
                });
        
                // Periksa apakah permintaan berhasil (status 200 OK)
                if (!response.ok) {
                    const responseData = await response.json(); 
                    // console.log(responseData.msg)
                    throw new Error(`Something went Wrong : ${responseData.msg}`);
                }
        
                const responseData = await response.json(); // Ambil data JSON dari respons
                if(response.ok){
                    container.remove();
                    popupText.textContent = `${responseData.msg}`;
                    setTimeout(() => {
                        deletePopup()
                    }, 500);
                }
            } catch (error) {
                // console.error('Terjadi kesalahan:', error);
                // console.log(error)
                popupText.textContent = `${error}`
                setTimeout(() => {
                    deletePopup()
                }, 1000);
            }
        })

    })
}
const DuplicateComponent = async (Component_ID)=>{
    const dataPush = {original_component_ID: Component_ID};
    const popup = document.createElement('section');
    popup.id = 'js-container-popup';
    popup.classList.add('js-container-popup');
    popup.innerHTML = `
    <div id="js-wrapper-popup" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
        <p id="js-popup-text" class="js-popup-text" lazydev="18e5af308c51">
        Duplicating Page, Please Wait...
        </p>  
        </div>`;
    document.body.appendChild(popup);
    try {
        const response = await fetch('/api/adm/dup-page', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataPush)
        });
    
        if (!response.ok) {
            const json = await response.json();
            throw new Error(json.msg);
        }
        // const json = await response.json();
        // console.log(json)
        window.location.reload(); 
    } catch (error) {
        popup.innerHTML = `
        <div id="js-wrapper-popup" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
        <p id="js-popup-text" class="js-popup-text" lazydev="18e5af308c51">
        ${error}
        </p>
  
        <div id="button-box-wrapper" class="button-box-wrapper" lazydev="18e5af3d95b1">
  
        <button id="js-popup-button-false" class="js-popup-button-false" lazydev="18e5af87d291" type="button">
        <icon id="icon-18e5af87d291" class="fa fa-ban" style="padding-right: 1em;">
        
        </icon>
  
        Close
        </button>
  
        
        </div>
  
        
        </div>`;
        const cancelw = document.getElementById('js-popup-button-false'); 
        cancelw.addEventListener('click', (event) => {
        event.preventDefault();
        deletePopup();
    });   
    }
}

function setHome(trigger,element){
    trigger.addEventListener('click', ()=>{
        if(element.homepage === true){
            const popup = document.createElement('section');
            popup.id = 'js-container-popup';
            popup.classList.add('js-container-popup');
            popup.innerHTML = `
            <div id="js-wrapper-popup" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
            <p id="js-popup-text" class="js-popup-text" lazydev="18e5af308c51">
            This Page is already a Homepage
            </p>
      
            <div id="button-box-wrapper" class="button-box-wrapper" lazydev="18e5af3d95b1">
      
            <button id="js-popup-button-false" class="js-popup-button-false" lazydev="18e5af87d291" type="button">
            <icon id="icon-18e5af87d291" class="fa fa-ban" style="padding-right: 1em;">
            
            </icon>
      
            Got it
            </button>
      
            
            </div>
      
            
            </div>`;
            document.body.appendChild(popup); 
            const cancelbutton = document.getElementById('js-popup-button-false');
            cancelbutton.addEventListener('click', deletePopup);
            return
        }
        const popup = document.createElement('section');
        popup.id = 'js-container-popup';
        popup.classList.add('js-container-popup');
        popup.innerHTML = `
        <div id="js-wrapper-popup" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
        <p id="js-popup-text" class="js-popup-text" lazydev="18e5af308c51">
        Are You Sure to set this page as HOMEPAGE ?
        </p>
  
        <div id="button-box-wrapper" class="button-box-wrapper" lazydev="18e5af3d95b1">
        <button id="js-popup-button-true" class="js-popup-button-true" lazydev="18e5af550451" type="button">
        <icon id="icon-18e5af550451" class="fa fa-check" style="padding-right: 1em;">
        
        </icon>
  
        Submit
        </button>
  
        <button id="js-popup-button-false" class="js-popup-button-false" lazydev="18e5af87d291" type="button">
        <icon id="icon-18e5af87d291" class="fa fa-ban" style="padding-right: 1em;">
        
        </icon>
  
        Cancel
        </button>
  
        
        </div>
  
        
        </div>`;
        document.body.appendChild(popup);
        const cancelbutton = document.getElementById('js-popup-button-false');
        const submitButton = document.getElementById('js-popup-button-true');
        cancelbutton.addEventListener('click', deletePopup);
        submitButton.addEventListener('click', async()=>{
            const buttonDiv = document.getElementById('button-box-wrapper');
            buttonDiv.classList.add('none-mode');
            const popupText = document.getElementById('js-popup-text');
            popupText.textContent = 'Please Wait...'
            try {
                const response = await fetch(`/api/adm/set-home?CompID=${element.id}`, {
                    method: 'PUT',
                });
        
                // Periksa apakah permintaan berhasil (status 200 OK)
                if (!response.ok) {
                    const responseData = await response.json(); 
                    // console.log(responseData.msg)
                    throw new Error(`Something went Wrong : ${responseData.msg}`);
                }
        
                const responseData = await response.json(); // Ambil data JSON dari respons
                if(response.ok){
                    renderedFile.forEach(data => {
                        if(data.homepage === true){
                            data.homepage = false;
                        const container = document.getElementById(`js-press-page-list-container-${data.id}`)
                        container.classList.remove('js-page-list-homepage-true')
                        const span = document.getElementById(`js-press-page-list-title-${data.id}`);
                        span.textContent = `${data.name}`
                        }
                    });
                    element.homepage = true;
                        const container = document.getElementById(`js-press-page-list-container-${element.id}`)
                        container.classList.add('js-page-list-homepage-true')
                        const span = document.getElementById(`js-press-page-list-title-${element.id}`);
                        span.innerHTML = `${element.name} <p style="font-weight: bold;">(Homepage)</p>`
                    popupText.textContent = `${responseData.msg}`;
                    setTimeout(() => {
                        deletePopup()
                    }, 500);
                    return
                }
            } catch (error) {
                // console.error('Terjadi kesalahan:', error);
                // console.log(error)
                popupText.textContent = `${error}`
                setTimeout(() => {
                    deletePopup()
                }, 1000);
            }
        })

    })
}
function set404(trigger,element){
    trigger.addEventListener('click', ()=>{
        if(element.page404 === true){
            const popup = document.createElement('section');
            popup.id = 'js-container-popup';
            popup.classList.add('js-container-popup');
            popup.innerHTML = `
            <div id="js-wrapper-popup" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
            <p id="js-popup-text" class="js-popup-text" lazydev="18e5af308c51">
            This Page is already a 404 Page
            </p>
      
            <div id="button-box-wrapper" class="button-box-wrapper" lazydev="18e5af3d95b1">
      
            <button id="js-popup-button-false" class="js-popup-button-false" lazydev="18e5af87d291" type="button">
            <icon id="icon-18e5af87d291" class="fa fa-ban" style="padding-right: 1em;">
            
            </icon>
      
            Got it
            </button>
      
            
            </div>
      
            
            </div>`;
            document.body.appendChild(popup); 
            const cancelbutton = document.getElementById('js-popup-button-false');
            cancelbutton.addEventListener('click', deletePopup);
            return
        }
        const popup = document.createElement('section');
        popup.id = 'js-container-popup';
        popup.classList.add('js-container-popup');
        popup.innerHTML = `
        <div id="js-wrapper-popup" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
        <p id="js-popup-text" class="js-popup-text" lazydev="18e5af308c51">
        Are You Sure to set this page as 404 Page ?
        </p>
  
        <div id="button-box-wrapper" class="button-box-wrapper" lazydev="18e5af3d95b1">
        <button id="js-popup-button-true" class="js-popup-button-true" lazydev="18e5af550451" type="button">
        <icon id="icon-18e5af550451" class="fa fa-check" style="padding-right: 1em;">
        
        </icon>
  
        Submit
        </button>
  
        <button id="js-popup-button-false" class="js-popup-button-false" lazydev="18e5af87d291" type="button">
        <icon id="icon-18e5af87d291" class="fa fa-ban" style="padding-right: 1em;">
        
        </icon>
  
        Cancel
        </button>
  
        
        </div>
  
        
        </div>`;
        document.body.appendChild(popup);
        const cancelbutton = document.getElementById('js-popup-button-false');
        const submitButton = document.getElementById('js-popup-button-true');
        cancelbutton.addEventListener('click', deletePopup);
        submitButton.addEventListener('click', async()=>{
            const buttonDiv = document.getElementById('button-box-wrapper');
            buttonDiv.classList.add('none-mode');
            const popupText = document.getElementById('js-popup-text');
            popupText.textContent = 'Please Wait...'
            try {
                const response = await fetch(`/api/adm/set-404?CompID=${element.id}`, {
                    method: 'PUT',
                });
        
                // Periksa apakah permintaan berhasil (status 200 OK)
                if (!response.ok) {
                    const responseData = await response.json(); 
                    // console.log(responseData.msg)
                    throw new Error(`Something went Wrong : ${responseData.msg}`);
                }
        
                const responseData = await response.json(); // Ambil data JSON dari respons
                if(response.ok){
                    renderedFile.forEach(data => {
                        if(data.page404 === true){
                            data.page404 = false;
                        const container = document.getElementById(`js-press-page-list-container-${data.id}`)
                        container.classList.remove('js-page-list-404-true')
                        const span = document.getElementById(`js-press-page-list-title-${data.id}`);
                        span.textContent = `${data.name}`
                        }
                    });
                    element.page404 = true;
                        const container = document.getElementById(`js-press-page-list-container-${element.id}`)
                        container.classList.add('js-page-list-404-true')
                        const span = document.getElementById(`js-press-page-list-title-${element.id}`);
                        span.innerHTML = `${element.name} <p style="font-weight: bold;">(Page 404)</p>`
                    popupText.textContent = `${responseData.msg}`;
                    setTimeout(() => {
                        deletePopup()
                    }, 500);
                    return
                }
            } catch (error) {
                // console.error('Terjadi kesalahan:', error);
                // console.log(error)
                popupText.textContent = `${error}`
                setTimeout(() => {
                    deletePopup()
                }, 1000);
            }
        })

    })
}
function editDetails(trigger,element){
    trigger.addEventListener('click', ()=>{
        const popup = document.createElement('section');
        popup.id = 'js-container-popup';
        popup.classList.add('js-container-popup');
        popup.innerHTML = `
        <div id="js-wrapper-popup" style="width: 20% !important" class="js-wrapper-popup js-wrapper-popup-edit-page js-popup-enterance-2" lazydev="18e517138541">
        <form id="editpopup" data-id="lazydev">

    <fieldset data-id="formFieldset" id="formfieldseteditpopup">

    <legend data-id="formlegend" id="formmakerlegendeditpopup">
Edit Page</legend>

<div style="width: 70%;">
<label style="width: 100%;">
Page Title</label>
<input  type="text" id="js-page-name-input" value="${element.name}" style="width: 100%;">
</div>

<div style="width: 25%; margin-left: 5px;">
<label style="width: 100%;">
Page Folder</label>

<select id="js-page-folder-input" style="width: 100%;">
</select>
</div>

<div style="width: 70%;">
<label style="width: 100%;">
Page URL</label>
<input  type="text" id="js-page-url-input" value="${element.url}" style="width: 100%;">
</div>

<div style="width: 25%; margin-left: 5px;">
<label style="width: 100%;">
Page Pagesetting</label>

<select id="js-page-pagesetting-input" style="width: 100%;">
</select>
</div>

<div style="width: 70%;">
<label style="width: 100%;">
Page Tags</label>
<input  type="text" id="js-page-tags-input" value="${element.tags}" placeholder="Separate By Space ( )" style="width: 100%;">
</div>

<div style="width: 25%; margin-left: 5px;">
<label style="width: 100%;">
Publicity</label>

<select id="js-page-publicity-input" value="${element.publicity}" style="width: 100%;">
<option value="true">Published</option>
<option value="false">Admin Only</option>
</select>
</div>

<div style="width: 100%;">
<label style="width: 100%;">
Page Description</label>
<textarea rows="4" id="js-page-desc-input" style="width: 100% !important;">${element.description}</textarea>
</div>

<div style="width: 70%;">
<label style="width: 100%;">
URL Query</label>
</div>

<div style="width: 25%; margin-left: 5px;">
<select id="js-page-url-query-input" value="${element.url_query}" style="width: 100%;">
<option value="false">false</option>
<option value="true">true</option>
</select>
</div>

<div id="js-page-component-div" class="js-page-component-div">
<div id="js-page-component-list-add" class="js-page-component-list-add">

<div class="js-press-page-component-container">
  <select id="js-press-page-component-folder-list" class="js-press-page-component-select">
  <option value="">All Folder</option>
  </select>
  <input id="js-press-page-component-name-search" type="text" style="margin-top: -2px; height: 22px;" class="js-press-page-component-search" placeholder="Search...">
</div>

<ul id="js-press-list-page" class="js-press-list-page">
  
</ul>
</div>

<div class="js-page-component-list-add">
<ul id="js-press-list-custom-function" class="js-press-list-page">
</div>

</ul>
</div>

<div id="dynamic-page-warning" class="none-mode" style="width: 80%; padding-left: 10px; margin-left: 5px; color: white; background-color: red;">Dynamic Table Already change, Save Page First or change it to previous table</div>
<div style="width: 30%; margin-left: 5px;">
<label style="width: 100%;">
Dynamic Page</label>

<select id="dynamic-page-input" style="width: 100%;">
<option value="false">false</option>
<option value="true">true</option>
</select>
</div>

<div id="dynamic-table-div" style="width: 50%; margin-left: 5px;">
<label style="width: 100%;">
Dynamic Table</label>

<select id="dynamic-table-input" style="width: 100%;">
<option value=""></option>
</select>
</div>

<div id="dynamic-page-button" class="dynamic-page-button" style="width: 5%; margin-left: 5px;">
<i class="fa-solid fa-database"></i>
</div>

<div data-id="buttondivz" id="SubmitDiveditpopup">

        <button  id="SubmitButtoneditpopup-true" type="submit">
Submit</button>
<button  id="SubmitButtoneditpopup-false" type="submit">
Cancel</button>

      </div>

    </fieldset>

  </form>

  
        
        </div>`;
        document.body.appendChild(popup);
        const publicityInput = document.getElementById(`js-page-publicity-input`);
        publicityInput.value = element.publicity;
        const url_query = document.getElementById('js-page-url-query-input');
        if(element.url_query === true){
            url_query.value = element.url_query;
        }

        document.getElementById('js-page-url-input').addEventListener('input',()=>{
            const urlInput = document.getElementById('js-page-url-input');
            let urlValue = urlInput.value;
            urlValue = urlValue.trim().replace(/[^a-zA-Z0-9-_\/]/g, '');
            if (urlValue.charAt(0) === '/') {
                urlValue = urlValue.slice(1);
            } else {
                urlValue = urlValue.replace(/^\/+/g, '');
            }
            urlInput.value = urlValue;
        })

        const component_folder = document.getElementById('js-press-page-component-folder-list');
        const folderInput = document.getElementById('js-page-folder-input');
        Myfolders.forEach(opt => {
            const folder = document.createElement('option');
                folder.value = opt.folder_key;
                folder.textContent = opt.folder_name;
                folderInput.appendChild(folder);
                if(opt.folder_key === element.folder){
                    folderInput.value = opt.folder_key
                }
        });
        Myfolders.forEach(opt => {
            const folder = document.createElement('option');
                folder.value = opt.folder_key;
                folder.textContent = opt.folder_name;
                component_folder.appendChild(folder);
        });

        const PsInput = document.getElementById('js-page-pagesetting-input');
        MyPagesettings.forEach(PS => {
            const option = document.createElement('option');
            option.value = PS.pagesetting_key;
            option.textContent = PS.pagesetting_name;
            PsInput.appendChild(option)
            if(PS.pagesetting_key === element.pagesetting){
                PsInput.value = PS.pagesetting_key
            }
        });

        const component_lists = document.getElementById('js-press-list-page');
        const cf_lists = document.getElementById('js-press-list-custom-function');
        const list_add = document.getElementById('js-page-component-list-add');
        const page_components = element.components.split('--');
        page_components.forEach(element => {
            MyComponents.forEach(compo => {
                if(compo.id === parseInt(element,10)){
                    add_component(compo)
                }
            })
        });
        // console.log(page_components)
        MyComponents.forEach(comp => {
            createList(comp);
        });

        const custom_functions = element.custom_function.split('--');
        const arrayCF = [];
        let number_cf = 1;
        custom_functions.forEach(arr => {
            const cf = arr.split('_');
            const array = {id: parseInt(cf[0], 10), placement:cf[1]}
            if(cf[1] && cf[1]!== ''){
                arrayCF.push(array)
            }
        });
        arrayCF.forEach(CF => {
            MyCF.forEach(cflist => {
                if(cflist.id === CF.id){
                    add_cf(cflist,CF.placement)
                }
            });
        });
        MyCF.forEach(comp => {
            createListCF(comp);
        });
        const custom_tables = document.getElementById('dynamic-table-input');
        const dynamic_page = document.getElementById('dynamic-page-input');
        const custom_tables_div = document.getElementById('dynamic-table-div');
        const dynamic_builder_button = document.getElementById('dynamic-page-button');
        let dynamic_button = false;
        let dynamic_page_value = '';

        MyTables.forEach(table => {
            const option = document.createElement('option');
            if(table.dynamic_page !== null && table.dynamic_page !== element.id){
                return
            }
            option.value = table.id;
            option.textContent = table.name;
            custom_tables.appendChild(option);
            if(table.id === element.dynamic_page){
                custom_tables.value = table.id
                dynamic_page_value = table.id
            }
        });

        if(element.dynamic_page === null){
            custom_tables_div.classList.add('none-mode');
            dynamic_builder_button.classList.add('none-mode');
        } else {
            dynamic_page.value = 'true';
            custom_tables.value = element.dynamic_page;
            dynamic_page_value = element.dynamic_page;
            custom_tables.addEventListener('input', changeDynamicPage);
            dynamic_button = true;
            dynamic_builder_button.addEventListener('click', windowLocationHref);
        }
        dynamic_page.addEventListener('input', ()=>{
            if(dynamic_page.value == 'true'){
                custom_tables_div.classList.remove('none-mode');
                custom_tables.addEventListener('input', changeDynamicPage);
                if(dynamic_button === true){
                    dynamic_builder_button.classList.remove('none-mode');
                    dynamic_builder_button.addEventListener('click', windowLocationHref);
                }
            } else {
                custom_tables_div.classList.add('none-mode');
                document.getElementById('dynamic-page-warning').setAttribute('class', 'none-mode');
                if(dynamic_button === true){
                    dynamic_builder_button.classList.add('none-mode');
                    dynamic_builder_button.removeEventListener('click', windowLocationHref);
                }
                custom_tables.removeEventListener('input', changeDynamicPage);
                dynamic_page_value = '';
            }
        })

        function changeDynamicPage(){
            dynamic_page_value = custom_tables.value;
            if(element.dynamic_page == dynamic_page_value){
                document.getElementById('dynamic-page-warning').classList.add('none-mode');
            }
        }
        function windowLocationHref(){
            if(element.dynamic_page == dynamic_page_value){
                window.location.href = `/dynamic-page-builder/?${element.id}`;
            }
            else {
                document.getElementById('dynamic-page-warning').classList.remove('none-mode');
            }
        }
        function createList(comp){
            const list = document.createElement('li');
            list.innerHTML = `
            <span class="js-press-page-component-name">${comp.component_name}</span>
            <i id="view-component-${comp.id}" class="fa-solid fa-eye icon-js-press js-press-page-icon" title="view component"></i>
            <i id="add-component-${comp.id}" class="fa-solid fa-circle-plus icon-js-press js-press-page-icon" title="add component to the page"></i>`;
            list.setAttribute('data-folder', comp.component_folder);
            list.setAttribute('data-name', comp.component_name);
            list.setAttribute('data-component', 'true')
            component_lists.appendChild(list);
            const view = document.getElementById(`view-component-${comp.id}`);
            view.addEventListener('click',()=>{
                const url = `/open-component/${comp.viewlink}`;
                window.open(url, '_blank'); 
            })
            const add = document.getElementById(`add-component-${comp.id}`);
            add.addEventListener('click',()=>{
                add_component(comp)
            })
        }
        function createListCF(comp){
            let cf_name = comp.name;
            if(cf_name.length > 45){
                const kataTerpotong = cf_name.substring(0, 40)+'...';
                cf_name = kataTerpotong
            }
            const list = document.createElement('li');
            list.innerHTML = `
            <span class="js-press-page-component-name">${cf_name}</span>
            <p class="js-press-page-cf-icon js-icon-add-${comp.id}" value="top head" title="add function to the top of the <head/>">+ Top head</p>
            <p class="js-press-page-cf-icon js-icon-add-${comp.id}" value="bot head" title="add function to the bottom of the <head/>">+ Bot head</p>
            <p class="js-press-page-cf-icon js-icon-add-${comp.id}" value="top body" title="add function to the top of the <body/>">+ Top Body</p>
            <p class="js-press-page-cf-icon js-icon-add-${comp.id}" value="bot body" title="add function to the bottom of the <body/>">+ Bot Body</p>`;
            list.setAttribute('data-id', comp.id);
            list.setAttribute('data-name', comp.name);
            list.setAttribute('data-component', 'true')
            cf_lists.appendChild(list);
            // const view = document.getElementById(`view-component-${comp.id}`);
            // view.addEventListener('click',()=>{
            //     const url = `/open-component/${comp.viewlink}`;
            //     window.open(url, '_blank'); 
            // })
            const icons = document.querySelectorAll(`.js-icon-add-${comp.id}`);
            icons.forEach(add => {
                add.addEventListener('click',()=>{
                    const value = add.getAttribute('value');
                    add_cf(comp,value)
                })
            });
        }
        function add_component(comp){
            const new_component = document.createElement('div');
            new_component.setAttribute('value', comp.id);
            new_component.classList.add('js-press-page-component-added-container')
            new_component.innerHTML = `
            <p class="js-press-page-component-added-span">${comp.component_name}</p>
            <i id="js-page-up-${comp.id}" class="fa-solid fa-chevron-up js-press-page-component-added-icon"></i>
            <i id="js-page-down-${comp.id}" class="fa-solid fa-chevron-down js-press-page-component-added-icon"></i>
            <i id="js-page-delete-${comp.id}" class="fa-solid fa-xmark js-press-page-component-added-icon"></i>`;
            list_add.parentElement.insertBefore(new_component,list_add);
            document.getElementById(`js-page-up-${comp.id}`).addEventListener('click',()=>{
                const parentElement = list_add.parentElement;
                const previousSibling = new_component.previousElementSibling;
            if (previousSibling) {
                parentElement.insertBefore(new_component, previousSibling);
            }
            })
            document.getElementById(`js-page-down-${comp.id}`).addEventListener('click',()=>{
                const parentElement = list_add.parentElement;
                const nextSibling = new_component.nextElementSibling;
                if (nextSibling !== list_add) {
                    parentElement.insertBefore(nextSibling,new_component);
                }
            })
            document.getElementById(`js-page-delete-${comp.id}`).addEventListener('click',()=>{
                new_component.remove();
            })
        }
        function add_cf(comp,placement){
            const new_component = document.createElement('div');
            let cf_name = comp.name;
            if(cf_name.length > 45){
                const kataTerpotong = cf_name.substring(0, 40)+'...';
                cf_name = kataTerpotong
            }
            new_component.setAttribute('value', comp.id+`_${placement}`);
            new_component.classList.add('js-press-page-cf-added-container')
            new_component.setAttribute('style', 'margin-left: 5px;')
            new_component.innerHTML = `
            <p class="js-press-page-component-added-span">${cf_name} ON <<bold>${placement}</bold>></p>
            <i id="js-cf-delete-${comp.id}-${number_cf}" class="fa-solid fa-xmark js-press-page-component-added-icon"></i>`;
            cf_lists.parentElement.insertBefore(new_component,cf_lists);
            
            document.getElementById(`js-cf-delete-${comp.id}-${number_cf}`).addEventListener('click',()=>{
                new_component.remove();
            })
            number_cf += 1;
        }
        const search_component = document.getElementById('js-press-page-component-name-search');
        component_folder.addEventListener('input',select_folder_component)
        search_component.addEventListener('input',select_folder_component)

        function select_folder_component(){
            const lists = document.querySelectorAll('[data-component]');
            lists.forEach(li => {
                li.setAttribute('class', '');
            }); 
            lists.forEach(li => {
                const data_folder = li.getAttribute('data-folder');
                const data_name = li.getAttribute('data-name');
                if(data_folder !== component_folder.value && component_folder.value !== ''){
                    li.setAttribute('class', 'none-mode');
                }
                if (!data_name.includes(search_component.value)) {
                    li.setAttribute('class', 'none-mode');
                }             
            }); 
        }

        let page_component = '';
        document.getElementById('SubmitButtoneditpopup-true').addEventListener('click', async(event) => {
            event.preventDefault();
            const component_selected = document.querySelectorAll('.js-press-page-component-added-container');
            component_selected.forEach(arr => {
                const value = arr.getAttribute('value');
                page_component += value+'--';
            });
            let list_cfs = '';
            const cf_selected = document.querySelectorAll('.js-press-page-cf-added-container');
            cf_selected.forEach(arr => {
                const value = arr.getAttribute('value');
                list_cfs += value+'--';
            });
            // console.log(list_cfs)
            let name_input = document.getElementById('js-page-name-input').value;
            if(name_input === ''){name_input = element.name}
            const folder_input = document.getElementById('js-page-folder-input');
            let url_input = document.getElementById('js-page-url-input').value;
            if(url_input === ''){url_input = element.url}
            const ps_input = document.getElementById('js-page-pagesetting-input');
            let tags_input = document.getElementById('js-page-tags-input').value;
            if(tags_input === ''){tags_input = ' ' }
            let desc_input = document.getElementById('js-page-desc-input').value;
            if(desc_input === ''){desc_input = ' ' }
            const publicity_input = document.getElementById('js-page-publicity-input');
            let url_queryInput = false;
            if(url_query.value === 'true'){
                url_queryInput = true
            }
            const dataPush = {
                compID : element.id,
                new_title : name_input,
                new_folder : folder_input.value,
                new_url : url_input,
                new_ps : ps_input.value,
                new_tags : tags_input,
                new_publicity : publicity_input.value,
                new_desc : desc_input,
                selected_component : page_component,
                selected_cf : list_cfs,
                dynamic_data : dynamic_page_value,
                URL_Query : url_queryInput,
            };
            popup.innerHTML = `<div id="js-wrapper-popup" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
            <p id="js-popup-text" class="js-popup-text" lazydev="18e5af308c51">
            Please Wait...
            </p>
            
            </div>`;
            // console.log(dataPush)
            try {
                const response = await fetch('/api/adm/update-page', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataPush)
                });
            
                if (!response.ok) {
                    const json = await response.json();
                    throw new Error(json.msg);
                }
                // const json = await response.json();
                // window.location.reload(); 
        
                const responseData = await response.json(); // Ambil data JSON dari respons
                if(response.ok){
                    document.getElementById(`js-press-page-list-title-${responseData.edited_page.id}`)
                    .textContent = `${responseData.edited_page.name}`;
                    document.getElementById(`js-popup-text`).textContent = `${responseData.msg}`
                    // console.log(responseData)
                    element.name = responseData.edited_page.name;
                    element.publicity = responseData.edited_page.publicity;
                    element.folder = responseData.edited_page.folder;
                    element.pagesetting = responseData.edited_page.pagesetting;
                    element.url = responseData.edited_page.url;
                    element.tags = responseData.edited_page.tags;
                    element.description = responseData.edited_page.description;
                    element.components = responseData.edited_page.components;
                    element.custom_function = responseData.edited_page.custom_function;
                    element.dynamic_page = responseData.edited_page.dynamic_page;
                    element.url_query = responseData.edited_page.URLQuery;

                    MyTables.forEach(table =>{
                        if(table.id === responseData.table.id){
                            table.dynamic_page = element.id;
                        }
                    })
                    // console.log(responseData.edited_page.dynamic_page)
                    // popuptext.textContent = `${responseData.msg}`;
                    setTimeout(() => {
                        deletePopup()
                    }, 1000);
                }
            } catch (error) {
                popup.innerHTML = `
        <div id="js-wrapper-popup" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
        <p id="js-popup-text" class="js-popup-text" lazydev="18e5af308c51">
        ${error}
        </p>
  
        <div id="button-box-wrapper" class="button-box-wrapper" lazydev="18e5af3d95b1">
  
        <button id="js-popup-button-false" class="js-popup-button-false" lazydev="18e5af87d291" type="button">
        <icon id="icon-18e5af87d291" class="fa fa-ban" style="padding-right: 1em;">
        
        </icon>
  
        Close
        </button>
  
        
        </div>
  
        
                </div>`;
        const cancelw = document.getElementById('js-popup-button-false'); 
        cancelw.addEventListener('click', (event) => {
        event.preventDefault();
        deletePopup();
    }); 
            }
        });
        document.getElementById('SubmitButtoneditpopup-false').addEventListener('click', (event) => {
            event.preventDefault();
            deletePopup();
        });
        
    })
}