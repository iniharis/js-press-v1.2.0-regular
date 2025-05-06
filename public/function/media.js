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
        const selectFolder = document.getElementById('js-press-folder-select-media');
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
        console.error('Ada kesalahan:', error);
        // window.location.href ='/login'
        // Tindakan yang sesuai jika terjadi kesalahan, misalnya menampilkan pesan kesalahan ke pengguna
    }
});

document.addEventListener('DOMContentLoaded', ()=>{
    getData('',0,'all-folder');
    document.getElementById('js-press-folder-searchbutton-media').addEventListener('click',()=>{
        clearDataFolder();
        const keyword = document.getElementById('js-press-folder-search-media');
        const select = document.getElementById('js-press-folder-select-media');
        getData(keyword.value,0,select.value);
    })
    document.getElementById('js-press-folder-search-media').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
        clearDataFolder();
        const keyword = document.getElementById('js-press-folder-search-media');
        const select = document.getElementById('js-press-folder-select-media');
        getData(keyword.value,0,select.value);
        }
    });
    document.getElementById('js-press-folder-select-media').addEventListener('change',()=>{
        clearDataFolder();
        const keyword = document.getElementById('js-press-folder-search-media');
        const select = document.getElementById('js-press-folder-select-media');
        getData(keyword.value,0,select.value);
    })
});

async function getData(keyword,offset,search) {
    // console.log(search)
    document.getElementById('loading-icon').classList.remove('none-mode');
    try {
        // Mengirim permintaan GET ke endpoint server
        const response = await fetch(`/api/adm/get-media?keyword=${keyword}&dataoffset=${offset}&searchFolder=${search}`);
        
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

function MakeAPagination(Data){
    // console.log(Data)
    const totalPages = Math.ceil(Data.totalCount / Data.renderLimit);

        oldOffset = Data.offset;
    const thisPage = Data.newOffset / Data.renderLimit
    // console.log(`Halaman Saat ini = ${thisPage} Total Halaman ${totalPages}`);
    const OldJSPressPagination = document.querySelectorAll('.js-press-media-pagination');
    if(OldJSPressPagination){
        OldJSPressPagination.forEach(element => {
            element.remove();
        });
    }
    const paginationContainer = document.getElementById('js-press-media-pagination-container');
    if(totalPages > 2 && thisPage > 1){
    const FirstPage = document.createElement('div');
    FirstPage.classList.add('js-press-media-pagination');
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
                Pages.classList.add('js-press-media-pagination');
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
                Pages.classList.add('js-press-media-pagination');
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
                Pages.classList.add('js-press-media-pagination');
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
    LastPage.classList.add('js-press-media-pagination');
    LastPage.innerHTML = '>>';
    paginationContainer.appendChild(LastPage);
    LastPage.addEventListener('click',()=>{
        clearDataFolder();
        getData(Data.keyword,`${(totalPages * Data.renderLimit)-Data.renderLimit}`,Data.folder_search);
    })
    }
    
}

function MakeAList(renderedFile){
    // console.log('folderlist')
    // console.log(renderedFolders)
    document.getElementById('loading-icon').classList.add('none-mode');
    const pagination = document.getElementById('js-press-media-pagination-container');
    renderedFile.forEach(Data => {
        const container = document.createElement('div');
        container.classList.add('js-press-admin-media');
        container.id = 'js-press-admin-media-'+Data.id;
        const url = `${window.location.origin}/admin/media`;
        const baseUrl = new URL(url).origin;
        container.setAttribute('style', `background: url('${baseUrl}/${Data.media_url}') !important; background-size: cover !important;`)
        container.innerHTML = `
        <i id="js-press-media-list-view-${Data.id}" class="js-press-media-list-view  fa-regular fa-eye" lazydev="18e17e0a9e41" title="View">
            
            </i>
      
            <i id="js-press-media-list-edit-${Data.id}" class="js-press-media-list-edit  fas fa-tools" lazydev="18e17e0dc4c1" title="Edit Media">
            
            </i>
      
            <i id="js-press-media-list-delete-${Data.id}" class="js-press-media-list-delete  fa fa-trash" lazydev="18e08b303151" title="Delete">
            
            </i>
        `;
        pagination.parentElement.insertBefore(container,pagination);
        const viewMedia = document.getElementById('js-image-zoom');
        const view = document.getElementById('js-press-media-list-view-'+Data.id);
        const deleteTrigger = document.getElementById(`js-press-media-list-delete-${Data.id}`);
        const editTrigger = document.getElementById(`js-press-media-list-edit-${Data.id}`);
        openMedia(view,viewMedia,Data)
        const containerData = document.getElementById(`js-press-admin-media-${Data.id}`);
        DeleteMedia(deleteTrigger,Data,containerData)
        editMedia(editTrigger,Data)
    });
}
function clearDataFolder(){
    const lists = document.querySelectorAll('.js-press-admin-media');
    lists.forEach(element => {
        element.remove();
    });
}

function editMedia(trigger,element){
    trigger.addEventListener('click', ()=>{
        const popup = document.createElement('section');
        popup.id = 'js-container-popup';
        popup.classList.add('js-container-popup');
        popup.innerHTML = `
        <div id="js-wrapper-popup" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
        <form id="editpopup" data-id="lazydev">

    <fieldset data-id="formFieldset" id="formfieldseteditpopup">

    <legend data-id="formlegend" id="formmakerlegendeditpopup">
Edit Media</legend>

<div style="width: 70%;">
<label style="width: 100%;">
Media Name</label>
<input  type="text" id="js-media-name-input" value="${element.media_name}" name="FolderName" style="width: 100%;">
</div>

<div style="width: 25%; margin-left: 5px;">
<label style="width: 100%;">
Media Folder</label>

<select id="js-media-folder-input" style="width: 100%;">
</select>
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
        const nameInput = document.getElementById('js-media-name-input');
        nameInput.addEventListener('input', ()=>{
            const modifiedValue = nameInput.value.replace(/ /g, '_');
            nameInput.value = modifiedValue;
        })
        const folderInput = document.getElementById('js-media-folder-input');
        Myfolders.forEach(opt => {
            const folder = document.createElement('option');
                folder.value = opt.folder_key;
                folder.textContent = opt.folder_name;
                folderInput.appendChild(folder);
                if(opt.folder_key === element.media_folder){
                    folderInput.value = opt.folder_key
                }
        });

        document.getElementById('SubmitButtoneditpopup-true').addEventListener('click', async(event) => {
            event.preventDefault();
            popup.innerHTML = `<div id="js-wrapper-popup" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
            <p id="js-popup-text" class="js-popup-text" lazydev="18e5af308c51">
            Please Wait...
            </p>
            
            </div>`;
            try {
                const response = await fetch(`/api/adm/put-media?mediaID=${element.id}&newName=${nameInput.value}&newFolder=${folderInput.value}`, {
                    method: 'PUT',
                });
        
                // Periksa apakah permintaan berhasil (status 200 OK)
                if (!response.ok) {
                    const responseData = await response.json(); 
                    throw new Error(`Error : ${responseData.msg}`);
                }
        
                const responseData = await response.json(); // Ambil data JSON dari respons
                if(response.ok){
                    document.getElementById(`js-popup-text`).textContent = `${responseData.msg}`
                    // console.log(responseData)
                    element.media_folder = responseData.media.media_folder
                    element.media_name = responseData.media.media_name
                    element.media_url = responseData.media.media_url
                    // popuptext.textContent = `${responseData.msg}`;
                    setTimeout(() => {
                        deletePopup()
                    }, 1000);
                }
            } catch (error) {
                const popuptext = document.getElementById('js-popup-text')
                // console.error('Terjadi kesalahan:', error);
                // console.log(error)
                popuptext.textContent = `${error}`
                setTimeout(() => {
                    deletePopup()
                }, 1000);
            }
        });
        document.getElementById('SubmitButtoneditpopup-false').addEventListener('click', (event) => {
            event.preventDefault();
            deletePopup();
        });
        function deletePopup(){
            const div = document.getElementById('js-wrapper-popup');
            div.setAttribute('class', 'js-wrapper-popup animated-scale-down')
            const popup = document.getElementById('js-container-popup');
            setTimeout(() => {
                popup.remove();
            }, 200);
        }
        
    })
}
function DeleteMedia(trigger,element,container){
    trigger.addEventListener('click', ()=>{
        const popup = document.createElement('section');
        popup.id = 'js-container-popup';
        popup.classList.add('js-container-popup');
        popup.innerHTML = `
        <div id="js-wrapper-popup" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
        <p id="js-popup-text" class="js-popup-text" lazydev="18e5af308c51">
        Are You Sure to Delete This Media?
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
                const response = await fetch(`/api/adm/del-media?mediaID=${element.id}&url=${element.media_url}`, {
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
                }, 500);
            }
        })
        function deletePopup(){
            const div = document.getElementById('js-wrapper-popup');
            div.setAttribute('class', 'js-wrapper-popup animated-scale-down')
            const popup = document.getElementById('js-container-popup');
            setTimeout(() => {
                popup.remove();
            }, 200);
        }

    })
}

function openMedia(trigger,image,element){
    const canvas = document.querySelector('.js-canvas');
    trigger.addEventListener('click', ()=>{
        image.setAttribute('src', `/${element.media_url}`);
        canvas.classList.add('js-fade-in');
        canvas.classList.remove('js-hidden-canvas');
      })
    const closebutton = document.querySelector('.js-close-button');
    closebutton.addEventListener('click', ()=>{
      canvas.classList.remove('js-fade-in');
      canvas.classList.add('js-hidden-canvas');
    })
  }
document.getElementById('add-new-media-button').addEventListener('click',uploadMedia);
function uploadMedia(){
    const popup = document.createElement('section');
    popup.id = 'js-container-popup';
    popup.classList.add('js-container-popup');
    popup.innerHTML = `
    <div id="js-wrapper-popup" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
    <form id="editpopup" data-id="lazydev">

<fieldset data-id="formFieldset" id="formfieldseteditpopup">

<legend data-id="formlegend" id="formmakerlegendeditpopup">
Edit Media</legend>

<div style="width: 100%;">
<input type="file" id="js-media-upload-input" style="width: 100%;">
</div>
  
<div style="width: 50%;">
<label style="width: 100%;">
Media Name</label>
<input readonly type="text" id="js-media-name-input" value="" name="FolderName" style="width: 100%;">
</div>

<div style="width: 25%; margin-left: 5px;">
<label style="width: 100%;">
Media Extention</label>
<input readonly type="text" id="js-media-extention-input" value="" name="FolderName" style="width: 100%;">
</div>
<div style="width: 25%; margin-left: 5px;">
<label style="width: 100%;">
Media Folder</label>

<select id="js-media-folder-input" style="width: 100%;">
</select>
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
    let dataMedia = '';
    const extentionInput = document.getElementById('js-media-extention-input');
    const nameInput = document.getElementById('js-media-name-input');
    const uploadinput = document.getElementById('js-media-upload-input');
    const folderInput = document.getElementById('js-media-folder-input');
    nameInput.addEventListener('input', ()=>{
        const modifiedValue = nameInput.value.replace(/ /g, '_');
        nameInput.value = modifiedValue;
    })
    Myfolders.forEach(element => {
        const folder = document.createElement('option');
            folder.value = element.folder_key;
            folder.textContent = element.folder_name;
            folderInput.appendChild(folder);
    });
    const submit = document.getElementById('SubmitButtoneditpopup-true');
    submit.addEventListener('click', (event) => {
        event.preventDefault();
        uploadMedia();
    }); 
    const cancel = document.getElementById('SubmitButtoneditpopup-false'); 
    cancel.addEventListener('click', (event) => {
        event.preventDefault();
        deletePopup();
    });   
    const uploadMedia = async()=>{
        if(dataMedia === ''){
            return
        }
        const dataPush = {
            name: nameInput.value,
            extention: extentionInput.value,
            dataImage: dataMedia,
            folder: folderInput.value,
        };
        // console.log(dataPush)
        try {
            const response = await fetch('/api/adm/new-media', {
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
    
            window.location.reload();
            // console.log( await response.json())
    
            // Lakukan tindakan lanjutan jika diperlukan setelah data berhasil disimpan
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
  
        Cancel
        </button>
  
        
        </div>
  
        
        </div>`;
        const cancelw = document.getElementById('js-popup-button-false'); 
        cancelw.addEventListener('click', (event) => {
        event.preventDefault();
        deletePopup();
    });   
            // Tindakan yang sesuai jika terjadi kesalahan, misalnya menampilkan pesan kesalahan ke pengguna
        }
    }  
    uploadinput.addEventListener('change', (event) => {
        const reader = new FileReader();
        const file = event.target.files[0]; // Mengambil file yang dipilih oleh pengguna
        const fileName = file.name;
        const fileNameParts = fileName.split('.');
        const modifiedValue = fileNameParts[0].replace(/ /g, '_'); 
        const fileExtension = fileName.split('.').pop();
        reader.onload = function(event) {
            dataMedia = event.target.result;
            nameInput.removeAttribute('readonly');
            nameInput.value = modifiedValue;
            extentionInput.removeAttribute('readonly');
            extentionInput.value = fileExtension;      
            // siteFaviconPreview.src = dataURLFavicon;
        };
        reader.readAsDataURL(file); // Membaca file sebagai data URL
    });
    function deletePopup(){
        const div = document.getElementById('js-wrapper-popup');
        div.setAttribute('class', 'js-wrapper-popup animated-scale-down')
        const popup = document.getElementById('js-container-popup');
        setTimeout(() => {
            popup.remove();
        }, 200);
    }
}