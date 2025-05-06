//------------------------------------------//
document.addEventListener('DOMContentLoaded', ()=>{
    getData('',0);
    document.getElementById('js-press-folder-searchbutton-custom_function').addEventListener('click',()=>{
        clearDataFolder();
        const keyword = document.getElementById('js-press-folder-search-custom_function');
        getData(keyword.value,0);
    })
    document.getElementById('js-press-folder-search-custom_function').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            clearDataFolder();
            const keyword = document.getElementById('js-press-folder-search-custom_function').value;
            getData(keyword,0);
        }
    });
});
//------------------------------------------//
const creteFunction = async ()=>{
    const dataPush = {};
    const popup = document.createElement('section');
    popup.id = 'js-container-popup';
    popup.classList.add('js-container-popup');
    popup.innerHTML = `
    <div id="js-wrapper-popup" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
        <p id="js-popup-text" class="js-popup-text" lazydev="18e5af308c51">
        Creating new Function file Please Wait...
        </p>  
        </div>`;
    document.body.appendChild(popup);
    try {
        const response = await fetch('/api/adm/create-cf', {
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
document.getElementById('create-new-function').addEventListener('click',creteFunction);
//------------------------------------------//
async function getData(keyword,offset) {
    // console.log(search)
    document.getElementById('loading-icon').classList.remove('none-mode');
    try {
        // Mengirim permintaan GET ke endpoint server
        const response = await fetch(`/api/adm/get-cf?keyword=${keyword}&dataoffset=${offset}`);
        
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
function deletePopup(){
    const div = document.getElementById('js-wrapper-popup');
    div.setAttribute('class', 'js-wrapper-popup animated-scale-down')
    const popup = document.getElementById('js-container-popup');
    setTimeout(() => {
        popup.remove();
    }, 200);
}
function clearDataFolder(){
    const lists = document.querySelectorAll('.js-press-custom_function-list-container');
    lists.forEach(element => {
        element.remove();
    });
}
//------------------------------------------//
function MakeAList(renderedFile){

    document.getElementById('loading-icon').classList.add('none-mode');
    const pagination = document.getElementById('js-press-custom_function-pagination-container');
    renderedFile.forEach(Data => {
        let component_name = Data.name;
        const container = document.createElement('div');
        container.classList.add('js-press-custom_function-list-container');
        container.id = 'js-press-custom_function-list-container-'+Data.id;
        container.innerHTML = `
        <div id="div-18e08b991641" class="DIV-18e08b991641">
        <span id="js-press-custom_function-list-title-${Data.id}" class="js-press-custom_function-list-title">
        
    ${component_name}
        </span>
  
        
        </div>
  
        <div id="js-press-custom_function-list-action-${Data.id}" class="js-press-custom_function-list-action">
        <span id="lazyid18e08a805dd1-${Data.id}" class="lazyclass18e08a805dd1">
        
    Actions
  
        </span>
  
        <div id="div-18e08a8f77f1-${Data.id}" class="DIV-18e08a8f77f1">
        <i id="js-press-custom_function-list-edit-${Data.id}" class="js-press-custom_function-list-edit  fa fa-edit" title="Edit Function">
        
        </i>
  
        <i id="js-press-custom_function-list-duplicate-${Data.id}" class="js-press-custom_function-list-duplicate  fa fa-copy" title="Duplicate Function">
        
        </i>
  
        <i id="js-press-custom_function-list-delete-${Data.id}" class="js-press-custom_function-list-delete  fa fa-trash" title="Delete Function">
        
        </i>
  
        
        </div>
  
        
        </div>
        `;
        pagination.parentElement.insertBefore(container,pagination);
        const deleteTrigger = document.getElementById(`js-press-custom_function-list-delete-${Data.id}`);
        DeleteFunction(deleteTrigger,Data,container)

        const DuplicateTrigger = document.getElementById(`js-press-custom_function-list-duplicate-${Data.id}`);
        DuplicateFunction(DuplicateTrigger,Data)
        const editTrigger = document.getElementById(`js-press-custom_function-list-edit-${Data.id}`);
        editDetails(editTrigger,Data)

    });
}
function MakeAPagination(Data){
    // console.log(Data)
    const totalPages = Math.ceil(Data.totalCount / Data.renderLimit);

        oldOffset = Data.offset;
    const thisPage = Data.newOffset / Data.renderLimit
    // console.log(`Halaman Saat ini = ${thisPage} Total Halaman ${totalPages}`);
    const OldJSPressPagination = document.querySelectorAll('.js-press-custom_function-pagination');
    if(OldJSPressPagination){
        OldJSPressPagination.forEach(element => {
            element.remove();
        });
    }
    const paginationContainer = document.getElementById('js-press-custom_function-pagination-container');
    if(totalPages > 2 && thisPage > 1){
    const FirstPage = document.createElement('div');
    FirstPage.classList.add('js-press-custom_function-pagination');
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
                Pages.classList.add('js-press-custom_function-pagination');
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
                Pages.classList.add('js-press-custom_function-pagination');
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
                Pages.classList.add('js-press-custom_function-pagination');
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
    LastPage.classList.add('js-press-custom_function-pagination');
    LastPage.innerHTML = '>>';
    paginationContainer.appendChild(LastPage);
    LastPage.addEventListener('click',()=>{
        clearDataFolder();
        getData(Data.keyword,`${(totalPages * Data.renderLimit)-Data.renderLimit}`,Data.folder_search);
    })
    }
    
}
//------------------------------------------//
function DeleteFunction(trigger,element,container){
    trigger.addEventListener('click', ()=>{
        const popup = document.createElement('section');
        popup.id = 'js-container-popup';
        popup.classList.add('js-container-popup');
        popup.innerHTML = `
        <div id="js-wrapper-popup" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
        <p id="js-popup-text" class="js-popup-text" lazydev="18e5af308c51">
        Are You Sure to Delete This Custom Function?
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
                const response = await fetch(`/api/adm/del-cf?function_id=${element.id}`, {
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
//------------------------------------------//
function DuplicateFunction(trigger,element){
    trigger.addEventListener('click', ()=>{
        const popup = document.createElement('section');
        popup.id = 'js-container-popup';
        popup.classList.add('js-container-popup');
        popup.innerHTML = `
        <div id="js-wrapper-popup" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
        <p id="js-popup-text" class="js-popup-text" lazydev="18e5af308c51">
        Are You Sure to Duplicate This Custom Function?
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
                const response = await fetch(`/api/adm/duplicate-cf?function_id=${element.id}`, {
                    method: 'POST',
                });
        
                // Periksa apakah permintaan berhasil (status 200 OK)
                if (!response.ok) {
                    const responseData = await response.json(); 
                    // console.log(responseData.msg)
                    throw new Error(`Something went Wrong : ${responseData.msg}`);
                }
        
                if(response.ok){
                    window.location.reload(); 
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
//------------------------------------------//
function editDetails(trigger,element){
const getDetail = async()=>{
    const popup = document.getElementById('js-container-popup')
    try {
        const response = await fetch(`/api/adm/get-cf-code?function_id=${element.id}`);
        if (!response.ok) {const json = await response.json(); throw new Error(json.msg);}
        const data = await response.json();
        // console.log(data);
        popup.innerHTML = `
        <div id="js-wrapper-popup" style="width: 20% !important" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
        <form id="editpopup" data-id="lazydev">

    <fieldset data-id="formFieldset" id="formfieldseteditpopup">

    <legend data-id="formlegend" id="formmakerlegendeditpopup">
Edit Details</legend>

<div style="width: 100%;">
<label style="width: 100%;">
Function Name</label>
<input  type="text" id="js-function-name-input" value="${data.detail.name}" name="FolderName" style="width: 100%;">
</div>

<div style="width: 100%;">
<label style="width: 100%;">
Function Code</label>

<textarea id="js-function-code-input" class="js-function-code-input" style="width: 100%;" rows="15">
${data.detail.code}
</textarea>
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
        button_function();
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
const button_function = async()=>{
    const popup = document.getElementById('js-container-popup')
    document.getElementById('SubmitButtoneditpopup-true').addEventListener('click', async(event) => {
        event.preventDefault();
        const name_input = document.getElementById('js-function-name-input');
        const code_input = document.getElementById('js-function-code-input');
        const dataPush = {
            function_id : element.id,
            newName : name_input.value,
            newCode : code_input.value,
        };
        popup.innerHTML = `<div id="js-wrapper-popup" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
        <p id="js-popup-text" class="js-popup-text" lazydev="18e5af308c51">
        Please Wait...
        </p>
        
        </div>`;
        // console.log(dataPush)
        try {
            const response = await fetch('/api/adm/edit-cf', {
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
    
            const responseData = await response.json(); // Ambil data JSON dari respons
            if(response.ok){
                document.getElementById(`js-press-custom_function-list-title-${element.id}`)
                .textContent = `${name_input.value}`;
                document.getElementById(`js-popup-text`).textContent = `${responseData.msg}`
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
}
    trigger.addEventListener('click', ()=>{
        const popup = document.createElement('section');
        popup.id = 'js-container-popup';
        popup.classList.add('js-container-popup');
        popup.innerHTML = `
        <div id="js-wrapper-popup" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
        <p id="js-popup-text" class="js-popup-text" lazydev="18e5af308c51">
        Rendering file, Please wait...
        </p>
        </div>`;
        document.body.appendChild(popup);
        setTimeout(() => {
            getDetail();
        }, 100);
    })
}
//------------------------------------------//