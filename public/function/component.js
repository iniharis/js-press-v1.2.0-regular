
// Folders
const Myfolders = [];
document.addEventListener("DOMContentLoaded", async function() {
    try {
        const response = await fetch('/api/adm/get-all-folder');
        if (!response.ok) {
            throw new Error('Gagal mengambil data web config');
        }
        const data = await response.json();
        const folders = data.folders;
        const selectFolder = document.getElementById('js-press-folder-select');
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
    } catch (error) {
        console.error('Error:', error);
        window.location.href ='/login'
        // Tindakan yang sesuai jika terjadi kesalahan, misalnya menampilkan pesan kesalahan ke pengguna
    }
});

const createComponent = async ()=>{
    const dataPush = {};
    const popup = document.createElement('section');
    popup.id = 'js-container-popup';
    popup.classList.add('js-container-popup');
    popup.innerHTML = `
    <div id="js-wrapper-popup" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
        <p id="js-popup-text" class="js-popup-text" lazydev="18e5af308c51">
        Creating new Component Please Wait...
        </p>  
        </div>`;
    document.body.appendChild(popup);
    try {
        const response = await fetch('/api/adm/component', {
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
document.getElementById('Add-new-Component').addEventListener('click',createComponent);

document.addEventListener('DOMContentLoaded', ()=>{
    getData('',0,'all-folder');
    document.getElementById('lazyid18e08dc683a1').addEventListener('click',()=>{
        clearDataFolder();
        const keyword = document.getElementById('input-18e08d9525c1');
        const select = document.getElementById('js-press-folder-select');
        getData(keyword.value,0,select.value);
    })
    document.getElementById('js-press-folder-select').addEventListener('change',()=>{
        clearDataFolder();
        const keyword = document.getElementById('input-18e08d9525c1');
        const select = document.getElementById('js-press-folder-select');
        getData(keyword.value,0,select.value);
    })
    document.getElementById('input-18e08d9525c1').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            clearDataFolder();
            const keyword = document.getElementById('input-18e08d9525c1');
            const select = document.getElementById('js-press-folder-select');
            getData(keyword.value, 0, select.value);
        }
    });
    
    document.getElementById('js-press-import').addEventListener('click',UploadJson);
});

function clearDataFolder(){
    const lists = document.querySelectorAll('.js-press-component-list-container');
    lists.forEach(element => {
        element.remove();
    });
}

async function getData(keyword,offset,search) {
    // console.log(search)
    document.getElementById('loading-icon').classList.remove('none-mode');
    try {
        // Mengirim permintaan GET ke endpoint server
        const response = await fetch(`/api/adm/component?keyword=${keyword}&dataoffset=${offset}&searchFolder=${search}`);
        
        // Memeriksa apakah permintaan berhasil (status 200 OK)
        if (!response.ok) {
            throw new Error('something went wrong');
        }
        
        // Mendapatkan data JSON dari respon
        const data = await response.json();
        
        // Lakukan sesuatu dengan data (misalnya menampilkan di halaman)
        // console.log(data)
        MakeAPagination(data)
        MakeAList(data.components)
    } catch (error) {
        console.error('Error:', error);
    }
} 

function MakeAList(renderedFile){
    // console.log('folderlist')
    // console.log(renderedFolders)
    document.getElementById('loading-icon').classList.add('none-mode');
    const pagination = document.getElementById('js-press-component-pagination-container');
    renderedFile.forEach(Data => {
        let component_name = Data.component_name;
        const container = document.createElement('div');
        container.classList.add('js-press-component-list-container');
        container.id = 'js-press-component-list-container-'+Data.id;
        container.innerHTML = `
        <div class="DIV-18e08b991641">
        <span id="js-press-component-list-title-${Data.id}" class="js-press-component-list-title" lazydev="18e08a7545f1">
        ${component_name}
            </span>
      
            
            </div>
      
            <div id="js-press-component-list-action-${Data.id}" class="js-press-component-list-action" lazydev="18e08a7ebed1">
            <span id="lazyid18e08a805dd1-${Data.id}" class="lazyclass18e08a805dd1" lazydev="18e08a805dd1">
            
          Actions
      
            </span>
      
            <div id="div-18e08a8f77f1-${Data.id}" class="DIV-18e08a8f77f1" lazydev="18e08a8f77f1">
            <i id="js-press-component-list-view-${Data.id}" class="js-press-component-list-export  fa-solid fa-eye" title="View Component">
            
            </i>
            <i id="js-press-component-list-edit_detail-${Data.id}" class="js-press-component-list-edit_detail  fa fa-edit" lazydev="18e08ab35c71" title="Edit Detail">
            
            </i>
      
            <i id="js-press-component-list-open_editor-${Data.id}" class="js-press-component-list-open_editor  fas fa-pen-nib" lazydev="18e08b0aff51" title="Open Editor">
            
            </i>
      
            <i id="js-slicer-${Data.id}" class="lazyclass18e0d71f9481  fa fa-cut" lazydev="18e0d71f9481" title="Open Slicer">
            
            </i>
      
            <i id="js-press-component-list-duplicate-${Data.id}" class="js-press-component-list-duplicate  fa fa-copy" lazydev="18e08aee7651" title="Duplicate">
            
            </i>
      
            <i id="js-press-component-list-export-${Data.id}" class="js-press-component-list-export  fa fa-paper-plane" lazydev="18e08af33661" title="Export">
            
            </i>
      
            <i id="js-press-component-list-delete-${Data.id}" class="js-press-component-list-delete  fa fa-trash" lazydev="18e08b303151" title="Delete">
            
            </i>
      
            
            </div>
      
            
            </div>
        `;
        pagination.parentElement.insertBefore(container,pagination);
        const containerData = document.getElementById(`js-press-component-list-container-${Data.id}`);

        const duplicate_button = document.getElementById(`js-press-component-list-duplicate-${Data.id}`);
        duplicate_button.addEventListener('click', ()=>{
            DuplicateComponent(Data.id)
        })

        const exportTrigger = document.getElementById(`js-press-component-list-export-${Data.id}`);
        exportTrigger.addEventListener('click', async()=>{
    const popup = document.createElement('section');
    popup.id = 'js-container-popup';
    popup.classList.add('js-container-popup');
    popup.innerHTML = `
    <div id="js-wrapper-popup" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
        <p id="js-popup-text" class="js-popup-text" lazydev="18e5af308c51">
        Exporting Component Please Wait...
        </p>  
        </div>`;
    document.body.appendChild(popup);
    try {
        const response = await fetch(`/api/adm/component-export?DataID=${Data.id}`, {
            method: 'GET',
        });
    
        if (!response.ok) {
            const json = await response.json();
            throw new Error(json.msg);
        }
        const json = await response.json();
        // console.log(json.component)
        jsonExport(json.component,json.dataContent)
        deletePopup();
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
        })
        const deleteTrigger = document.getElementById(`js-press-component-list-delete-${Data.id}`);
        DeleteComponent(deleteTrigger,Data,containerData)

        const editTrigger = document.getElementById(`js-press-component-list-edit_detail-${Data.id}`);
        editDetails(editTrigger,Data)

        const openEditor = document.getElementById(`js-press-component-list-open_editor-${Data.id}`);
        openEditor.addEventListener('click', ()=>{
            const url = `/component-builder/${Data.id}`;
            window.open(url, '_blank'); 
        });

        const openSlicer = document.getElementById(`js-slicer-${Data.id}`);
        openSlicer.addEventListener('click', ()=>{
            const url = `/component-slicer/${Data.id}`;
            window.open(url, '_blank'); 
        });

        const openComponent = document.getElementById(`js-press-component-list-view-${Data.id}`);
        openComponent.addEventListener('click', ()=>{
            const url = `/open-component/${Data.viewlink}`;
            window.open(url, '_blank'); 
        });
        // editDetails() 
    });
}

function MakeAPagination(Data){
    // console.log(Data)
    const totalPages = Math.ceil(Data.totalCount / Data.renderLimit);

        oldOffset = Data.offset;
    const thisPage = Data.newOffset / Data.renderLimit
    // console.log(`Halaman Saat ini = ${thisPage} Total Halaman ${totalPages}`);
    const OldJSPressPagination = document.querySelectorAll('.js-press-component-pagination');
    if(OldJSPressPagination){
        OldJSPressPagination.forEach(element => {
            element.remove();
        });
    }
    const paginationContainer = document.getElementById('js-press-component-pagination-container');
    if(totalPages > 2 && thisPage > 1){
    const FirstPage = document.createElement('div');
    FirstPage.classList.add('js-press-component-pagination');
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
                Pages.classList.add('js-press-component-pagination');
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
                Pages.classList.add('js-press-component-pagination');
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
                Pages.classList.add('js-press-component-pagination');
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
    LastPage.classList.add('js-press-component-pagination');
    LastPage.innerHTML = '>>';
    paginationContainer.appendChild(LastPage);
    LastPage.addEventListener('click',()=>{
        clearDataFolder();
        getData(Data.keyword,`${(totalPages * Data.renderLimit)-Data.renderLimit}`,Data.folder_search);
    })
    }
    
}
//----------------//
const DuplicateComponent = async (Component_ID)=>{
    const dataPush = {original_component_ID: Component_ID};
    const popup = document.createElement('section');
    popup.id = 'js-container-popup';
    popup.classList.add('js-container-popup');
    popup.innerHTML = `
    <div id="js-wrapper-popup" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
        <p id="js-popup-text" class="js-popup-text" lazydev="18e5af308c51">
        Duplicating Component, Please Wait...
        </p>  
        </div>`;
    document.body.appendChild(popup);
    try {
        const response = await fetch('/api/adm/dup-component', {
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
function DeleteComponent(trigger,element,container){
    trigger.addEventListener('click', ()=>{
        const popup = document.createElement('section');
        popup.id = 'js-container-popup';
        popup.classList.add('js-container-popup');
        popup.innerHTML = `
        <div id="js-wrapper-popup" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
        <p id="js-popup-text" class="js-popup-text" lazydev="18e5af308c51">
        Are You Sure to Delete This Component?
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
                const response = await fetch(`/api/adm/del-component?CompID=${element.id}`, {
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
function editDetails(trigger,element){
    trigger.addEventListener('click', ()=>{
        const popup = document.createElement('section');
        popup.id = 'js-container-popup';
        popup.classList.add('js-container-popup');
        popup.innerHTML = `
        <div id="js-wrapper-popup" style="width: 20% !important" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
        <form id="editpopup" data-id="lazydev">

    <fieldset data-id="formFieldset" id="formfieldseteditpopup">

    <legend data-id="formlegend" id="formmakerlegendeditpopup">
Edit Details</legend>

<div style="width: 70%;">
<label style="width: 100%;">
Component Name</label>
<input  type="text" id="js-component-name-input" value="${element.component_name}" name="FolderName" style="width: 100%;">
</div>

<div style="width: 25%; margin-left: 5px;">
<label style="width: 100%;">
Component Folder</label>

<select id="js-component-folder-input" style="width: 100%;">
</select>
</div>

<div style="width: 100%;">
<label style="width: 100%;">
Component Tags</label>
<input  type="text" id="js-component-tags-input" value="${element.tags}" placeholder="Separate By Space ( )" style="width: 100%;">
</div>

<div style="width: 100%;">
<label style="width: 100%;">
Component Description</label>
<textarea rows="10" id="js-component-desc-input" style="width: 100% !important;">${element.description}</textarea>
</div>

<div data-id="buttondivz" id="SubmitDiveditpopup">

        <button data-id="buttoninputzzz" id="SubmitButtoneditpopup-true" type="submit">
Submit</button>
<button data-id="buttoninputzzz" id="SubmitButtoneditpopup-false" type="submit">
Cancel</button>

      </div>

    </fieldset>

  </form>

  
        
        </div>`;
        document.body.appendChild(popup);
        // const nameInput = document.getElementById('js-media-name-input');
        // nameInput.addEventListener('input', ()=>{
        //     const modifiedValue = nameInput.value.replace(/ /g, '_');
        //     nameInput.value = modifiedValue;
        // })
        const folderInput = document.getElementById('js-component-folder-input');
        Myfolders.forEach(opt => {
            const folder = document.createElement('option');
                folder.value = opt.folder_key;
                folder.textContent = opt.folder_name;
                folderInput.appendChild(folder);
                if(opt.folder_key === element.component_folder){
                    folderInput.value = opt.folder_key
                }
        });

        document.getElementById('SubmitButtoneditpopup-true').addEventListener('click', async(event) => {
            event.preventDefault();
            const name_input = document.getElementById('js-component-name-input');
            const folder_input = folderInput.value;
            const tags_input = document.getElementById('js-component-tags-input');
            const desc_input = document.getElementById('js-component-desc-input');
            const dataPush = {
                compID : element.id,
                newName : name_input.value + " ",
                newFolder : folder_input,
                newTags : tags_input.value + " ",
                newDesc : desc_input.value + " ",
            };
            popup.innerHTML = `<div id="js-wrapper-popup" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
            <p id="js-popup-text" class="js-popup-text" lazydev="18e5af308c51">
            Please Wait...
            </p>
            
            </div>`;
            // console.log(dataPush)
            try {
                const response = await fetch('/api/adm/edit-component', {
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
                    document.getElementById(`js-press-component-list-title-${responseData.edited_component.id}`)
                    .textContent = `${responseData.edited_component.component_name}`;
                    document.getElementById(`js-popup-text`).textContent = `${responseData.msg}`
                    // console.log(responseData)
                    element.component_folder = responseData.edited_component.component_folder
                    element.component_name = responseData.edited_component.component_name
                    element.tags = responseData.edited_component.tags
                    element.description = responseData.edited_component.description
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
function jsonExport(Data,dataContent){
    const jsonObj = {
        name: Data.component_name,
        content: dataContent
    };
    
    const jsonData = JSON.stringify(jsonObj);
    
    const blob = new Blob([jsonData], { type: 'application/json' });
    
    const url = window.URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `${Data.component_name}.json`;
    
    document.body.appendChild(a);
    
    a.click();
    
    document.body.removeChild(a);
    
    window.URL.revokeObjectURL(url);
}
function UploadJson(){
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.addEventListener('change', function(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
  
      reader.onload = function(e) {
        try {
          const jsonData = JSON.parse(e.target.result);
          importJson(jsonData)
        //   importJson(jsonData);
        } catch (error) {
          console.error('Error parsing JSON file:', error);
        }
      };
  
      reader.readAsText(file);
    });
  
    input.click();
  }

const importJson = async (data)=>{
    const dataPush = {importedname: data.name,importedcontent : data.content};
    const popup = document.createElement('section');
    popup.id = 'js-container-popup';
    popup.classList.add('js-container-popup');
    popup.innerHTML = `
    <div id="js-wrapper-popup" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
        <p id="js-popup-text" class="js-popup-text" lazydev="18e5af308c51">
        Importing Component, Please Wait...
        </p>  
        </div>`;
    document.body.appendChild(popup);
    try {
        const response = await fetch('/api/adm/component-import', {
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
//----------------//