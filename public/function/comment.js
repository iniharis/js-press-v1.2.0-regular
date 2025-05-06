document.addEventListener('DOMContentLoaded', ()=>{
    getData('',0);
    document.getElementById('js-press-folder-searchbutton-comments').addEventListener('click',()=>{
        clearDataFolder();
        const keyword = document.getElementById('js-press-folder-search-comments');
        getData(keyword.value,0);
    })
    document.getElementById('js-press-folder-search-comments').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            clearDataFolder();
            const keyword = document.getElementById('js-press-folder-search-comments');
            getData(keyword.value,0);
        }
    });
});

async function getData(keyword,offset) {
    // console.log(search)
    document.getElementById('loading-icon').classList.remove('none-mode');
    try {
        // Mengirim permintaan GET ke endpoint server
        const response = await fetch(`/api/adm/get-comments?keyword=${keyword}&dataoffset=${offset}`);
        
        // Memeriksa apakah permintaan berhasil (status 200 OK)
        if (!response.ok) {
            throw new Error('something went wrong');
        }
        
        // Mendapatkan data JSON dari respon
        const data = await response.json();

        // console.log(data)
        MakeAPagination(data)
        MakeAList(data.components)
    } catch (error) {
        console.error('Error:', error);
    }
} 
//---------------------------//
function MakeAList(renderedFile){
    // console.log('folderlist')
    // console.log(renderedFolders)
    document.getElementById('loading-icon').classList.add('none-mode');
    const pagination = document.getElementById('js-press-comments-pagination-container');
    renderedFile.forEach(Data => {
        const container = document.createElement('div');
        container.classList.add('js-press-comments-list-container');
        container.id = 'js-press-comments-list-container-'+Data.id;
        container.innerHTML = `
        <div id="div-18e08b991641" class="DIV-18e08b991641" lazydev="18e08b991641">
            <span id="js-press-comments-list-title" class="js-press-comments-list-title" lazydev="18e08a7545f1">
            ${Data.content}
            </span>
      
            
            </div>
      
            <div id="js-press-comments-list-action-${Data.id}" class="js-press-comments-list-action" lazydev="18e08a7ebed1">
            <span id="lazyid18e08a805dd1" class="lazyclass18e08a805dd1" lazydev="18e08a805dd1">
            
          Actions
      
            </span>
      
            <div id="div-18e08a8f77f1" class="DIV-18e08a8f77f1" lazydev="18e08a8f77f1">
            <i id="js-press-comments-list-publish-${Data.id}" class="js-press-comments-list-publish  fa-solid fa-eye" lazydev="18e179dce611" title="Publish This Comment">
            
            </i>
      
            <i id="js-press-comments-list-unpublish-${Data.id}" class="js-press-comments-list-unpublish  fa fa-low-vision" lazydev="18e179f34491" title="Unpublish This Comment">
            
            </i>
      
            <i id="js-press-comments-list-delete-${Data.id}" class="js-press-comments-list-delete  fa fa-trash" lazydev="18e08b303151" title="Delete This Comment">
            
            </i>
      
            
            </div>
      
            
            </div>
        `;
        pagination.parentElement.insertBefore(container,pagination);
        const containerData = document.getElementById(`js-press-comments-list-container-${Data.id}`);
   
        const deleteTrigger = document.getElementById(`js-press-comments-list-delete-${Data.id}`);
        const publishTrigger = document.getElementById(`js-press-comments-list-publish-${Data.id}`);
        const UnpublishTrigger = document.getElementById(`js-press-comments-list-unpublish-${Data.id}`);
        DeleteComment(deleteTrigger,Data.id,containerData)
        PublishComment(publishTrigger,Data.id,UnpublishTrigger)
        UnpublishComment(UnpublishTrigger,Data.id,publishTrigger)

        if(Data.publicity === true){
            publishTrigger.classList.add('none-mode')
        } else {
            UnpublishTrigger.classList.add('none-mode')
        }
    });
}
function MakeAPagination(Data){
    // console.log(Data)
    const totalPages = Math.ceil(Data.totalCount / Data.renderLimit);

        oldOffset = Data.offset;
    const thisPage = Data.newOffset / Data.renderLimit
    // console.log(`Halaman Saat ini = ${thisPage} Total Halaman ${totalPages}`);
    const OldJSPressPagination = document.querySelectorAll('.js-press-comments-pagination');
    if(OldJSPressPagination){
        OldJSPressPagination.forEach(element => {
            element.remove();
        });
    }
    const paginationContainer = document.getElementById('js-press-comments-pagination-container');
    if(totalPages > 2 && thisPage > 1){
    const FirstPage = document.createElement('div');
    FirstPage.classList.add('js-press-comments-pagination');
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
                Pages.classList.add('js-press-comments-pagination');
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
                Pages.classList.add('js-press-comments-pagination');
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
                Pages.classList.add('js-press-comments-pagination');
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
    LastPage.classList.add('js-press-comments-pagination');
    LastPage.innerHTML = '>>';
    paginationContainer.appendChild(LastPage);
    LastPage.addEventListener('click',()=>{
        clearDataFolder();
        getData(Data.keyword,`${(totalPages * Data.renderLimit)-Data.renderLimit}`,Data.folder_search);
    })
    }
    
}
function clearDataFolder(){
    const lists = document.querySelectorAll('.js-press-comments-list-container');
    lists.forEach(element => {
        element.remove();
    });
}
//---------------------------//
function DeleteComment(trigger,element,container){
    trigger.addEventListener('click', ()=>{
        const popup = document.createElement('section');
        popup.id = 'js-container-popup';
        popup.classList.add('js-container-popup');
        popup.innerHTML = `
        <div id="js-wrapper-popup" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
        <p id="js-popup-text" class="js-popup-text" lazydev="18e5af308c51">
        Are You Sure to Delete This Comment?
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
                const response = await fetch(`/api/adm/del-comments?comment_id=${element}`, {
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
function PublishComment(trigger,element,otherTrigger){
    trigger.addEventListener('click', ()=>{
        const popup = document.createElement('section');
        popup.id = 'js-container-popup';
        popup.classList.add('js-container-popup');
        popup.innerHTML = `
        <div id="js-wrapper-popup" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
        <p id="js-popup-text" class="js-popup-text" lazydev="18e5af308c51">
        Are You Sure to Publish This Comment?
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
                const response = await fetch(`/api/adm/publish-comments?comment_id=${element}`, {
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
                    otherTrigger.classList.remove('none-mode')
                    trigger.classList.add('none-mode')
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
function UnpublishComment(trigger,element,otherTrigger){
    trigger.addEventListener('click', ()=>{
        const popup = document.createElement('section');
        popup.id = 'js-container-popup';
        popup.classList.add('js-container-popup');
        popup.innerHTML = `
        <div id="js-wrapper-popup" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
        <p id="js-popup-text" class="js-popup-text" lazydev="18e5af308c51">
        Are You Sure to Unpublish This Comment?
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
                const response = await fetch(`/api/adm/unpublish-comments?comment_id=${element}`, {
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
                    otherTrigger.classList.remove('none-mode')
                    trigger.classList.add('none-mode')
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
function deletePopup(){
    const div = document.getElementById('js-wrapper-popup');
    div.setAttribute('class', 'js-wrapper-popup animated-scale-down')
    const popup = document.getElementById('js-container-popup');
    setTimeout(() => {
        popup.remove();
    }, 200);
}
//----------------------------//