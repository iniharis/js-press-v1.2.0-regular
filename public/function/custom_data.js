const add_custom_table = document.getElementById('Add-custom-table')
const new_data_button = document.getElementById('add-new-post-button');
add_custom_table.addEventListener('click',()=>{
    window.location.href = '/admin/custom-table-form'
})

let table_choosen;
let table_text;
let data_limit = 6;
//------------------------------------------------------------------------------------//
document.addEventListener("DOMContentLoaded", async function() {
    try {
        const response = await fetch('/api/adm/get-table');

        if (!response.ok) {
            throw new Error('Failed Get Custom Table');
        }
        const data = await response.json();
        custom_tables(data.custom_table)
        if(data.custom_table.length >= 1){
            edit_delete_custom_Table();
        }
        LoadContent()
        // console.log(MyCF)
    } catch (error) {
        // console.error('Error:', error);
        window.location.href ='/login'
        // Tindakan yang sesuai jika terjadi kesalahan, misalnya menampilkan pesan kesalahan ke pengguna
    }
});
function LoadContent(){
    const keyword = document.getElementById('js-press-folder-search-post');
    getData('',0);
    document.getElementById('js-press-folder-searchbutton-post').addEventListener('click',()=>{
        clearDataFolder();
        getData(keyword.value,0);
    })
    document.getElementById('js-press-folder-search-post').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            clearDataFolder();
            getData(keyword.value,0);
        }
    });
}
//------------------------------------------------------------------------------------//
const custom_tables = (datas)=>{
    const select = document.createElement('select');
    select.id = 'select_custom_table';
    select.classList.add('lazyclass18e12916f801');
    add_custom_table.parentElement.insertBefore(select,add_custom_table);
    select.addEventListener('input', ()=>{
        const keyword_input = document.getElementById('js-press-folder-search-post');
        table_choosen = select.value;
        new_data_button.setAttribute('href', `/admin/custom-data-form/${table_choosen}/new_data`);
        datas.forEach(data => {
            if(data.id == select.value){
                table_text = data.name
            }
        });
        clearDataFolder();
        getData(keyword_input.value,0);
    })
    let index = 0;
    datas.forEach(data => {
    if(index === 0){
        select.value = data.id
        table_choosen = data.id
        new_data_button.setAttribute('href', `/admin/custom-data-form/${table_choosen}/new_data`);
        table_text = data.name
    }
    const option = document.createElement('option');
    option.value = data.id;
    option.textContent = data.name;
    select.appendChild(option);
    index += 1;
});
new_row_text_content(select)
}

const edit_delete_custom_Table = ()=>{
const delete_table = document.getElementById('delete-custom-table');
delete_table.classList.remove('none-mode');
const edit_table = document.getElementById('edit-custom-table');
edit_table.classList.remove('none-mode');

delete_table.addEventListener('click', async()=>{
    const popup = document.createElement('section');
    popup.id = 'js-container-popup';
    popup.classList.add('js-container-popup');
    popup.innerHTML = `
    <div id="js-wrapper-popup" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
    <p id="js-popup-text" class="js-popup-text" lazydev="18e5af308c51">
    Are You Sure to Delete This Custom Table?
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
            const response = await fetch(`/api/adm/del-table?table_id=${table_choosen}`, {
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
                popupText.textContent = `${responseData.msg}`;
                setTimeout(() => {
                    deletePopup()
                    window.location.reload();
                }, 500);
            }
        } catch (error) {
            // console.error('Terjadi kesalahan:', error);
            // console.log(error)
            popupText.textContent = `${error}`
            setTimeout(() => {
                deletePopup()
            }, 3500);
        }
    })
})

edit_table.addEventListener('click', ()=>{
    window.location.href = `/admin/custom-table-form/${table_choosen}`
})
}
//------------------------------------------------------------------------------------//
function deletePopup(){
    const div = document.getElementById('js-wrapper-popup');
    div.setAttribute('class', 'js-wrapper-popup animated-scale-down')
    const popup = document.getElementById('js-container-popup');
    setTimeout(() => {
        popup.remove();
    }, 200);
}
//------------------------------------------------------------------------------------//
function new_row_text_content(select){
const add_button = document.getElementById('add-new-post-button');
let newHTML = `<icon class="fa-solid fa-file-circle-plus" style="padding-right: 1em;"></icon>Add New ${table_text}`
    add_button.innerHTML = newHTML;
select.addEventListener('input',()=>{
    let newHTML = `
    <icon class="fa-solid fa-file-circle-plus" style="padding-right: 1em;"></icon>Add New ${table_text}`
    add_button.innerHTML = newHTML;
})

}

//------------------------------------------------------------------------------------//
async function getData(keyword,offset) {
    // console.log(search)
    document.getElementById('loading-icon').classList.remove('none-mode');
    try {
        // Mengirim permintaan GET ke endpoint server
        const response = await fetch(`/api/adm/get-custom-data-adm?keyword=${keyword}&dataoffset=${offset}&table_id=${table_choosen}&dataLimit=${data_limit}`);
        
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

function MakeAList(renderedFile){
    document.getElementById('loading-icon').classList.add('none-mode');
    const pagination = document.getElementById('js-press-post-pagination-container');
    renderedFile.forEach(Data => {
        const container = document.createElement('div');
        container.classList.add('js-press-post-list-container');
        container.id = 'js-press-post-list-container-'+Data.id;
        container.innerHTML = `
        <div id="div-18e08b991641" class="DIV-18e08b991641" lazydev="18e08b991641">
          <span id="js-press-post-list-title-${Data.id}" class="js-press-post-list-title" lazydev="18e08a7545f1">
          
        ${Data.title}
          </span>
    
          
          </div>
    
          <div id="js-press-post-list-action" class="js-press-post-list-action" lazydev="18e08a7ebed1">
          <span id="lazyid18e08a805dd1" class="lazyclass18e08a805dd1" lazydev="18e08a805dd1">
          
        Actions
    
          </span>
    
          <div id="div-18e08a8f77f1" class="DIV-18e08a8f77f1" lazydev="18e08a8f77f1">
          <i id="js-press-post-list-view-${Data.id}" class="js-press-component-list-export  fa-solid fa-eye" lazydev="18e08aee7651" title="View Page">
          
          </i>

          <a href="/admin/custom-data-form/${table_choosen}/${Data.id}" id="js-press-post-list-edit-${Data.id}" class="js-press-post-list-edit  fa fa-edit" lazydev="18e08ab35c71" title="Edit Data">
          
          </a>
    
          <i id="js-press-post-list-duplicate-${Data.id}" class="js-press-post-list-duplicate  fa fa-copy" lazydev="18e08aee7651" title="Duplicate">
          
          </i>
    
          <i id="js-press-post-list-delete-${Data.id}" class="js-press-post-list-delete  fa fa-trash" lazydev="18e08b303151" title="Delete">
          
          </i>
    
          
          </div>
    
          
          </div>
        `;
        pagination.parentElement.insertBefore(container,pagination);
        const deleteTrigger = document.getElementById(`js-press-post-list-delete-${Data.id}`);
        const duplicateTrigger = document.getElementById(`js-press-post-list-duplicate-${Data.id}`);
        if(!Data.url){
            const viewpage = document.getElementById(`js-press-post-list-view-${Data.id}`);
            viewpage.remove();
        }
        if(Data.url){
            const viewpage = document.getElementById(`js-press-post-list-view-${Data.id}`);
            viewpage.addEventListener('click',()=>{
                const url = `${Data.url}`;
                window.open(url, '_blank'); 
            })
        }
        DeleteData(deleteTrigger,Data.id,container)
        duplicateTrigger.addEventListener('click',()=>{
            DuplicateData(Data.id);
        })
    });
}

function MakeAPagination(Data){
    // console.log(Data)
    const totalPages = Math.ceil(Data.totalCount / Data.renderLimit);

        oldOffset = Data.offset;
    const thisPage = Data.newOffset / Data.renderLimit
    // console.log(`Halaman Saat ini = ${thisPage} Total Halaman ${totalPages}`);
    const OldJSPressPagination = document.querySelectorAll('.js-press-post-pagination');
    if(OldJSPressPagination){
        OldJSPressPagination.forEach(element => {
            element.remove();
        });
    }
    const paginationContainer = document.getElementById('js-press-post-pagination-container');
    if(totalPages > 2 && thisPage > 1){
    const FirstPage = document.createElement('div');
    FirstPage.classList.add('js-press-post-pagination');
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
                Pages.classList.add('js-press-post-pagination');
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
                Pages.classList.add('js-press-post-pagination');
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
                Pages.classList.add('js-press-post-pagination');
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
    LastPage.classList.add('js-press-post-pagination');
    LastPage.innerHTML = '>>';
    paginationContainer.appendChild(LastPage);
    LastPage.addEventListener('click',()=>{
        clearDataFolder();
        getData(Data.keyword,`${(totalPages * Data.renderLimit)-Data.renderLimit}`,Data.folder_search);
    })
    }
    
}

function clearDataFolder(){
    const lists = document.querySelectorAll('.js-press-post-list-container');
    lists.forEach(element => {
        element.remove();
    });
}
//------------------------------------------------------------------------------------//
function DeleteData(trigger,element,container){
    trigger.addEventListener('click', ()=>{
        const popup = document.createElement('section');
        popup.id = 'js-container-popup';
        popup.classList.add('js-container-popup');
        popup.innerHTML = `
        <div id="js-wrapper-popup" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
        <p id="js-popup-text" class="js-popup-text" lazydev="18e5af308c51">
        Are You Sure to Delete This Data?
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
                const response = await fetch(`/api/adm/del-di?data_id=${element}`, {
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
                popupText.innerHTML = `${error}`
                    setTimeout(() => {
                      const errorbutton = document.getElementById('js-popup-button-error');
                      if(errorbutton){
                        document.getElementById(`js-popup-button-error`).addEventListener('click',deletePopup)
                      } else {
                        setTimeout(() => {
                          deletePopup();
                        }, 2000);
                      }
                    }, 200);
            }
        })

    })
}
const DuplicateData = async (Component_ID)=>{
    const dataPush = {data_id: Component_ID};
    const popup = document.createElement('section');
    popup.id = 'js-container-popup';
    popup.classList.add('js-container-popup');
    popup.innerHTML = `
    <div id="js-wrapper-popup" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
        <p id="js-popup-text" class="js-popup-text" lazydev="18e5af308c51">
        Duplicating Data, Please Wait...
        </p>  
        </div>`;
    document.body.appendChild(popup);
    try {
        const response = await fetch('/api/adm/dup-data', {
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
//------------------------------------------------------------------------------------//