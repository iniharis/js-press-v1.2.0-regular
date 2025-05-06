
let userID = '';
let myToken = '';
let oldOffset = 0;

const getToken = async () => {
    // console.log(pathname)
    try {
        const response = await fetch(`/api/token-2`);
        const data = await response.json();
        const firstData = data[0];
        if(firstData){
            myToken = firstData.refresh_token;
            userID = firstData.id;
            const addButton = document.getElementById('add-new-folder-button');
            if(addButton){
                addButton.addEventListener('click', ()=>{
                    createFolder(userID)
                })
            }
            //-------------------------------------------//
            const searchButton = document.getElementById('js-press-folder-searchbutton-folder');
            searchButton.addEventListener('click', ()=>{
                clearDataFolder();
                const searchVal = document.getElementById('js-press-folder-search-folder');
                getFolders(searchVal.value,0);
            })
            document.getElementById('js-press-folder-search-folder').addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                clearDataFolder();
                const searchVal = document.getElementById('js-press-folder-search-folder');
                getFolders(searchVal.value,0);
                }
            });
        }
        // console.log(data[0])
        // console.log(`${userID} ${myToken}`)
        
    } catch (error) {
        // Tidak melakukan apa pun karena tidak ingin mencetak error ke konsol
    }
}
getToken();

function clearDataFolder(){
    const lists = document.querySelectorAll('.js-press-folder-list-container');
    lists.forEach(element => {
        element.remove();
    });
}

async function getFolders(keyword,offset) {
    document.getElementById('loading-icon').classList.remove('none-mode');
    try {
        // Mengirim permintaan GET ke endpoint server
        const response = await fetch(`/api/adm/get-folder?keyword=${keyword}&dataoffset=${offset}`);
        
        // Memeriksa apakah permintaan berhasil (status 200 OK)
        if (!response.ok) {
            throw new Error('Gagal mengambil data folder');
        }
        
        // Mendapatkan data JSON dari respon
        const data = await response.json();
        
        // Lakukan sesuatu dengan data (misalnya menampilkan di halaman)
        FolderPagination(data)
        FolderList(data.components)
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
    }
}

// Memanggil fungsi untuk mengambil folder saat halaman dimuat
document.addEventListener('DOMContentLoaded', ()=>{
    getFolders('',0);
});

function FolderList(renderedFolders){
    // console.log('folderlist')
    // console.log(renderedFolders)
    document.getElementById('loading-icon').classList.add('none-mode');
    const pagination = document.getElementById('js-press-folder-pagination-container');
    renderedFolders.forEach(folders => {
        const container = document.createElement('div');
        container.classList.add('js-press-folder-list-container');
        container.id = 'js-press-folder-list-container'+folders.id;
        container.innerHTML = `
        <div id="div-18e08b991641-${folders.id}" class="DIV-18e08b991641" lazydev="18e08b991641-${folders.id}">
        <span id="js-press-folder-list-title-${folders.id}" class="js-press-folder-list-title" lazydev="18e08a7545f1-${folders.id}">
        ${folders.folder_name}
        </span>
  
        
        </div>
  
        <div id="js-press-folder-list-action-${folders.id}" class="js-press-folder-action" lazydev="18e08a7ebed1-${folders.id}">
        <span id="lazyid18e08a805dd1-${folders.id}" class="lazyclass18e08a805dd1" lazydev="18e08a805dd1-${folders.id}">
        
    Actions
  
        </span>
  
        <div id="div-18e08a8f77f1-${folders.id}" class="DIV-18e08a8f77f1" lazydev="18e08a8f77f1-${folders.id}">
        <i id="js-press-folder-list-edit-${folders.id}" class="js-press-folder-list-edit  fa fa-edit" lazydev="18e08ab35c71-${folders.id}" title="Edit Folder">
        
        </i>
  
        <i id="js-press-folder-list-delete-${folders.id}" class="js-press-folder-list-delete  fa fa-trash" lazydev="18e08b303151" title="Delete">
        
        </i>
  
        
        </div>
  
        
        </div>
        `;
        pagination.parentElement.insertBefore(container,pagination);
        const deleteFolder = document.getElementById(`js-press-folder-list-delete-${folders.id}`);
        deleteFolder.addEventListener('click', ()=>{
            const popup = document.createElement('section');
            popup.id = 'js-container-popup';
            popup.classList.add('js-container-popup');
            popup.innerHTML = `
            <div id="js-wrapper-popup" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
            <p id="js-popup-text" class="js-popup-text" lazydev="18e5af308c51">
            Are You Sure to Delete This Folder?
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
                    const response = await fetch(`/api/adm/delete-folder?folderID=${folders.id}`, {
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
                const popupText = document.getElementById('js-popup-text');
                const div = document.getElementById('js-wrapper-popup');
                div.setAttribute('class', 'js-wrapper-popup animated-scale-down')
                const popup = document.getElementById('js-container-popup');
                setTimeout(() => {
                    popup.remove();
                }, 200);
            }

        })
        const EditFolder = document.getElementById(`js-press-folder-list-edit-${folders.id}`);
        EditFolder.addEventListener('click', ()=>{
            const popup = document.createElement('section');
            popup.id = 'js-container-popup';
            popup.classList.add('js-container-popup');
            popup.innerHTML = `
            <div id="js-wrapper-popup" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
            <form id="editpopup" data-id="lazydev">

        <fieldset data-id="formFieldset" id="formfieldseteditpopup">

        <legend data-id="formlegend" id="formmakerlegendeditpopup">
Edit Folder</legend>


          
          <div id="jsFolderName" inputid="inputid1" style="width: 100%;">
<label id="jsFolderNamelabel" for="FolderName" labelid="label1" style="width: 100%;">
Folder Name</label>
<input fieldid="field1" type="text" id="jsFolderNameinput" value="${folders.folder_name}" name="FolderName" style="width: 100%;">
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
            document.getElementById('SubmitButtoneditpopup-true').addEventListener('click', async(event) => {
                const newName = document.getElementById('jsFolderNameinput');
                const newFolder_name = `${newName.value}`;
                event.preventDefault();
                popup.innerHTML = `<div id="js-wrapper-popup" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
                <p id="js-popup-text" class="js-popup-text" lazydev="18e5af308c51">
                Please Wait...
                </p>
                
                </div>`;
                try {
                    const response = await fetch(`/api/adm/edit-folder?folderID=${folders.id}&newName=${newFolder_name}`, {
                        method: 'PUT',
                    });
            
                    // Periksa apakah permintaan berhasil (status 200 OK)
                    if (!response.ok) {
                        const responseData = await response.json(); 
                        throw new Error(`Error : ${responseData.msg}`);
                    }
            
                    const responseData = await response.json(); // Ambil data JSON dari respons
                    if(response.ok){
                        document.getElementById(`js-press-folder-list-title-${folders.id}`).textContent = `${responseData.new_name}`
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
                // Lakukan tindakan lain yang Anda inginkan setelah mencegah aksi default
            });
            document.getElementById('SubmitButtoneditpopup-false').addEventListener('click', (event) => {
                event.preventDefault();
                deletePopup();
                // Lakukan tindakan lain yang Anda inginkan setelah mencegah aksi default
            });
            function deletePopup(){
                const popupText = document.getElementById('js-popup-text');
                const div = document.getElementById('js-wrapper-popup');
                div.setAttribute('class', 'js-wrapper-popup animated-scale-down')
                const popup = document.getElementById('js-container-popup');
                setTimeout(() => {
                    popup.remove();
                }, 200);
            }
            
        })
    });
}

function FolderPagination(Data){
    // console.log(Data)
    const totalPages = Math.ceil(Data.totalCount / Data.renderLimit);

        oldOffset = Data.offset;
    const thisPage = Data.newOffset / Data.renderLimit
    // console.log(`Halaman Saat ini = ${thisPage} Total Halaman ${totalPages}`);
    const OldJSPressPagination = document.querySelectorAll('.js-press-folder-pagination');
    if(OldJSPressPagination){
        OldJSPressPagination.forEach(element => {
            element.remove();
        });
    }
    const paginationContainer = document.getElementById('js-press-folder-pagination-container');
    if(totalPages > 2 && thisPage > 1){
    const FirstPage = document.createElement('div');
    FirstPage.classList.add('js-press-folder-pagination');
    FirstPage.innerHTML = '<<';
    paginationContainer.appendChild(FirstPage);
    FirstPage.addEventListener('click',()=>{
        clearDataFolder();
        getFolders(Data.keyword,0);
    })
    }
    let page = thisPage;
    if(thisPage == 1){
        for (let i = 0; i < 5; i++) {
            if(page <= totalPages){
                let ThisPagination = page;
                const Pages = document.createElement('div');
                Pages.classList.add('js-press-folder-pagination');
                Pages.classList.add(`pagination-${i}`);
                Pages.innerHTML = `${page}`;
            paginationContainer.appendChild(Pages);
            if(page != thisPage){
                Pages.addEventListener('click', ()=>{
                    clearDataFolder();
                    getFolders(Data.keyword,`${(ThisPagination * Data.renderLimit)-Data.renderLimit}`);
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
                Pages.classList.add('js-press-folder-pagination');
                Pages.classList.add(`pagination-${i}`);
                Pages.innerHTML = `${page-1}`;
            paginationContainer.appendChild(Pages);
            
            if(page-1 != thisPage){
                Pages.addEventListener('click', ()=>{
                    clearDataFolder();
                    getFolders(Data.keyword,`${(ThisPagination * Data.renderLimit)-Data.renderLimit}`);
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
                Pages.classList.add('js-press-folder-pagination');
                Pages.classList.add(`pagination-${i}`);
                Pages.innerHTML = `${page-2}`;
            paginationContainer.appendChild(Pages);

            if(page-2 != thisPage){
                Pages.addEventListener('click', ()=>{
                    clearDataFolder();
                    getFolders(Data.keyword,`${(ThisPagination * Data.renderLimit)-Data.renderLimit}`);
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
    LastPage.classList.add('js-press-folder-pagination');
    LastPage.innerHTML = '>>';
    paginationContainer.appendChild(LastPage);
    LastPage.addEventListener('click',()=>{
        clearDataFolder();
        getFolders(Data.keyword,`${(totalPages * Data.renderLimit)-Data.renderLimit}`);
    })
    }
    
}

async function createFolder(owner) {
    try {
        const response = await fetch(`/api/adm/create-folder?owner=${owner}`, {
            method: 'POST',
        });

        // Periksa apakah permintaan berhasil (status 200 OK)
        if (!response.ok) {
            throw new Error('Gagal membuat folder');
        }
        if(response.ok){
            window.location.reload();
        }

        const responseData = await response.json(); // Ambil data JSON dari respons
        // console.log(responseData.msg); // Output pesan sukses dari server
    } catch (error) {
        console.error('Terjadi kesalahan:', error.message);
    }
}




