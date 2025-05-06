let MyAdmin = '';
document.addEventListener('DOMContentLoaded', ()=>{
    getData('',0,);
    document.getElementById('js-press-folder-searchbutton-users').addEventListener('click',()=>{
        clearDataFolder();
        getData(document.getElementById('js-press-folder-search-users').value,0);
    })
    document.getElementById('js-press-folder-search-users').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            clearDataFolder();
            getData(document.getElementById('js-press-folder-search-users').value,0);
        }
    });
    document.getElementById('add-new-users-button').addEventListener('click',()=>{
        const data = {
            avatar : 'Default-avatar.jpg',
            name: "",
            role : 'Administrator',
            username: '',
            email : '',
            password : ''
        }
        createUserForm(data,'create');
    })
});

async function getData(keyword,offset) {
 
    document.getElementById('loading-icon').classList.remove('none-mode');
    try {
        // Mengirim permintaan GET ke endpoint server
        const response = await fetch(`/api/adm/get-users?keyword=${keyword}&dataoffset=${offset}`);
        
        // Memeriksa apakah permintaan berhasil (status 200 OK)
        if (!response.ok) {
            throw new Error('Gagal mengambil data folder');
        }
        
        // Mendapatkan data JSON dari respon
        const data = await response.json();
        MyAdmin = data.user;
        // Lakukan sesuatu dengan data (misalnya menampilkan di halaman)
        // console.log(data)
        MakeAPagination(data)
        MakeAList(data.components)
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
    }
} 
function MakeAPagination(Data){
    // console.log(Data)
    const totalPages = Math.ceil(Data.totalCount / Data.renderLimit);

        oldOffset = Data.offset;
    const thisPage = Data.newOffset / Data.renderLimit
    // console.log(`Halaman Saat ini = ${thisPage} Total Halaman ${totalPages}`);
    const OldJSPressPagination = document.querySelectorAll('.js-press-user-pagination');
    if(OldJSPressPagination){
        OldJSPressPagination.forEach(element => {
            element.remove();
        });
    }
    const paginationContainer = document.getElementById('js-press-user-pagination-container');
    if(totalPages > 2 && thisPage > 1){
    const FirstPage = document.createElement('div');
    FirstPage.classList.add('js-press-user-pagination');
    FirstPage.innerHTML = '<<';
    paginationContainer.appendChild(FirstPage);
    FirstPage.addEventListener('click',()=>{
        clearDataFolder();
        getData(Data.keyword,0);
    })
    }
    let page = thisPage;
    if(thisPage == 1){
        for (let i = 0; i < 5; i++) {
            if(page <= totalPages){
                let ThisPagination = page;
                const Pages = document.createElement('div');
                Pages.classList.add('js-press-user-pagination');
                Pages.classList.add(`pagination-${i}`);
                Pages.innerHTML = `${page}`;
            paginationContainer.appendChild(Pages);
            if(page != thisPage){
                Pages.addEventListener('click', ()=>{
                    clearDataFolder();
                    getData(Data.keyword,`${(ThisPagination * Data.renderLimit)-Data.renderLimit}`);
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
                Pages.classList.add('js-press-user-pagination');
                Pages.classList.add(`pagination-${i}`);
                Pages.innerHTML = `${page-1}`;
            paginationContainer.appendChild(Pages);
            
            if(page-1 != thisPage){
                Pages.addEventListener('click', ()=>{
                    clearDataFolder();
                    getData(Data.keyword,`${(ThisPagination * Data.renderLimit)-Data.renderLimit}`);
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
                Pages.classList.add('js-press-user-pagination');
                Pages.classList.add(`pagination-${i}`);
                Pages.innerHTML = `${page-2}`;
            paginationContainer.appendChild(Pages);

            if(page-2 != thisPage){
                Pages.addEventListener('click', ()=>{
                    clearDataFolder();
                    getData(Data.keyword,`${(ThisPagination * Data.renderLimit)-Data.renderLimit}`);
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
    LastPage.classList.add('js-press-user-pagination');
    LastPage.innerHTML = '>>';
    paginationContainer.appendChild(LastPage);
    LastPage.addEventListener('click',()=>{
        clearDataFolder();
        getData(Data.keyword,`${(totalPages * Data.renderLimit)-Data.renderLimit}`);
    })
    }
    
}

function MakeAList(renderedFile){
    // console.log('folderlist')
    // console.log(renderedFolders)
    document.getElementById('loading-icon').classList.add('none-mode');
    const pagination = document.getElementById('js-press-user-pagination-container');
    renderedFile.forEach(Data => {
        const container = document.createElement('div');
        container.classList.add('js-press-users-list-container');
        container.id = 'js-press-users-list-container'+Data.id;
        container.innerHTML = `
        <div id="users-list-wrapper-${Data.id}" class="users-list-wrapper" lazydev="18e08b991641">
            <img id="js-press-admin-users-picture-${Data.id}" class="js-press-admin-users-picture" lazydev="18e17bb42511" src="/Media/avatar/${Data.avatar}">
            <span id="js-press-user-list-title-${Data.id}" class="js-press-user-list-title" lazydev="18e08a7545f1">
            
            ${Data.name}
      
            </span>
      
            
            </div>
      
            <div id="js-press-user-list-action" class="js-press-user-list-action" lazydev="18e08a7ebed1">
            <span id="lazyid18e08a805dd1-${Data.id}" class="lazyclass18e08a805dd1" lazydev="18e08a805dd1">
            
          Actions
      
            </span>
      
            <div id="div-18e08a8f77f1" class="DIV-18e08a8f77f1" lazydev="18e08a8f77f1">
            <i id="js-press-user-list-edit-${Data.id}" class="js-press-user-list-edit  fa fa-address-card" lazydev="18e08ab35c71" title="Edit User">
            
            </i>
      
            <i id="js-press-user-list-delete-${Data.id}" class="js-press-user-list-delete  fa fa-trash" lazydev="18e08b303151" title="Delete">
            
            </i>
      
            
            </div>
      
            
            </div>
        `;
        pagination.parentElement.insertBefore(container,pagination);
        const deleteFolder = document.getElementById(`js-press-user-list-delete-${Data.id}`);
        deleteFolder.addEventListener('click', ()=>{
            const popup = document.createElement('section');
            popup.id = 'js-container-popup';
            popup.classList.add('js-container-popup');
            popup.innerHTML = `
            <div id="js-wrapper-popup" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
            <p id="js-popup-text" class="js-popup-text" lazydev="18e5af308c51">
            Are You Sure to Delete This User?
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
            // console.log(MyAdmin)
            submitButton.addEventListener('click', async()=>{
                const buttonDiv = document.getElementById('button-box-wrapper');
                buttonDiv.classList.add('none-mode');
                const popupText = document.getElementById('js-popup-text');
                popupText.textContent = 'Please Wait...'
                try {
                    const response = await fetch(`/api/adm/del-users?userID=${Data.id}&MyID=${MyAdmin.id}`, {
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
                    }, 800);
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
        const EditFolder = document.getElementById(`js-press-user-list-edit-${Data.id}`);
        EditFolder.addEventListener('click', async()=>{
            createUserForm(Data,'edit');
        })
    });
}

function createUserForm(data,state){
    let FormTitle = "Create User"
    if(state === 'edit'){
        FormTitle = 'Edit User'
    }
    let readonly = '';
    if(state === 'edit'){
        readonly = 'readonly'
    }
    const popup = document.createElement('section');
    popup.id = 'js-container-popup';
    popup.classList.add('js-container-popup');
    popup.innerHTML = `
    <section id="user-form-container" class="user-form-container js-popup-enterance-2">
    <h1 id="user-form-title" class="user-form-title">
        ${FormTitle}
    </h1>

    <img id="user-form-avatar-cover" class="user-form-avatar-cover" src="/Media/avatar/${data.avatar}">
    <div id="div-18e798363361" class="DIV-18e798363361">
        <label id="label-18e7983fbf61" class="user-form-label" for="" accesskey="">
            Profile Avatar
        </label>
        <input type="file" id="user-form-input-avatar" class="user-form-input-avatar">
    </div>

    <div id="div-18e7984e6b71" class="DIV-18e7984e6b71">
        <label id="user-form-label-fullname" class="LABEL-18e798638d01 user-form-label" for="" accesskey="">
            Fullname
        </label>
        <input type="text" id="user-form-input-fullname" value="${data.name}" class="user-form-input-text">
    </div>

    <div id="lazyid18e798813b61" class="lazyclass18e798813b61">
        <label id="lazyid18e798813af1" class="lazyclass18e798813af1 user-form-label" for="" accesskey="">
            User Role
        </label>
        <select id="user-form-input-role" class="SELECT-18e798869571 user-form-input-text" value="${data.role}" selectoption="{Admin,Admin},{Member,Member,selected}">
            <option value="Administrator">Administrator</option>
            <option value="Regular Member">Regular Member</option>
        </select>
    </div>

    <div id="lazyid18e798a52a91" class="lazyclass18e798a52a91">
        <label id="lazyid18e798a52a21" class="lazyclass18e798a52a21 user-form-label" for="" accesskey="">
            Username
        </label>
        <input type="text" ${readonly} id="user-form-input-username" value="${data.username}" class="lazyclass18e798a52a61 user-form-input-text">
    </div>

    <div id="lazyid18e798c1a4e1" class="lazyclass18e798c1a4e1">
        <label id="lazyid18e798c1a461" class="lazyclass18e798c1a461 user-form-label" for="" accesskey="">
            Email
        </label>
        <input type="text" id="user-form-input-email" value="${data.email}" class="lazyclass18e798c1a4a1 user-form-input-text">
    </div>

    <div id="lazyid18e798a768f1" class="lazyclass18e798a768f1">
        <label id="lazyid18e798a76881" class="lazyclass18e798a76881 user-form-label" for="" accesskey="">
            Password
        </label>
        <input type="password" id="user-form-input-password" value="${data.password}" class="INPUT-18e798d44ef1 user-form-input-text">
    </div>

    <div id="lazyid18e798dbdd11" class="lazyclass18e798dbdd11">
        <label id="lazyid18e798dbdca1" class="lazyclass18e798dbdca1 user-form-label" for="" accesskey="">
            re-type Password
        </label>
        <input type="password" id="user-form-input-retype-password" value="${data.password}" class="lazyclass18e798dbdce1 user-form-input-text">
    </div>
    <p id="error-message" class="error-message none-mode"></p>
    <div id="lazy-button-02" class="lazyclass18dd05f375d1">
        <button id="user-form-save" class="lazyclass18dd05f375a1" type="button">
            Save Profile
        </button>
    </div>

    <div id="lazy-button-05" class="lazyclass18dd06a5d071">
        <button id="user-form-cancel" class="lazyclass18dd06a5d031" type="button">
            Cancel
        </button>
    </div>
</section>

`;
    document.body.appendChild(popup);
    const select = document.getElementById('user-form-input-role');
    const role = data.role;

for (let option of select.options) {
    if (option.value === role) {
        option.selected = true;
        break;
    }
}

    const deletebutton = document.getElementById('user-form-cancel');
    deletebutton.addEventListener('click', deletePopup);
    let dataMedia = '';
    let dataExtention = '';
    const uploadinput = document.getElementById('user-form-input-avatar');
    uploadinput.addEventListener('change', (event) => {
        const reader = new FileReader();
        const file = event.target.files[0];
        const fileName = file.name;
        const fileExtension = fileName.split('.').pop();
        reader.onload = function(event) {
            dataMedia = event.target.result;
            dataExtention = fileExtension;
            document.getElementById('user-form-avatar-cover').setAttribute('src', dataMedia);
        };
        reader.readAsDataURL(file);

    });
    const submit = document.getElementById('user-form-save');
    submit.addEventListener('click',async()=>{
        if(state === 'create'){
            const dataPush = {
                namedata: document.getElementById('user-form-input-fullname').value,
                roledata: document.getElementById('user-form-input-role').value,
                usernamedata: document.getElementById('user-form-input-username').value,
                emaildata : document.getElementById('user-form-input-email').value,
                passworddata : document.getElementById('user-form-input-password').value,
                repassworddata : document.getElementById('user-form-input-retype-password').value,
                dataImage: dataMedia,
                ext : dataExtention,
            };
            createNewUser(dataPush)
        } else {
            const dataPush = {
                userID : data.id,
                namedata: document.getElementById('user-form-input-fullname').value,
                roledata: document.getElementById('user-form-input-role').value,
                usernamedata: data.username,
                emaildata : document.getElementById('user-form-input-email').value,
                passworddata : document.getElementById('user-form-input-password').value,
                repassworddata : document.getElementById('user-form-input-retype-password').value,
                dataImage: dataMedia,
                ext : dataExtention,
            };
            // console.log(dataPush) 
            let edit = await editUser(dataPush,data);
            if(edit.msg === 'Success'){
            data.name = edit.user.name;
            data.role = edit.user.role;
            data.email = edit.user.email;
            data.password = edit.user.password;
            data.avatar = edit.user.avatar;
            document.getElementById(`js-press-user-list-title-${data.id}`).textContent = `${edit.user.name}`;
            document.getElementById(`js-press-admin-users-picture-${data.id}`).setAttribute('src',dataMedia)
            document.getElementById(`user-form-avatar-cover`).setAttribute('src',dataMedia)
            }
        }
    })
    const createNewUser = async(dataPush)=>{
        document.getElementById('user-form-save').classList.add('none-mode')
        document.getElementById('user-form-cancel').classList.add('none-mode')
        try {
            const response = await fetch('/api/adm/create-users', {
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
            const json = await response.json();
            if(json.msg === 'Success'){
                window.location.reload();
            }
            // console.log( await response.json())
    
            // Lakukan tindakan lanjutan jika diperlukan setelah data berhasil disimpan
        } catch (error) {
            document.getElementById('user-form-save').classList.remove('none-mode')
            document.getElementById('user-form-cancel').classList.remove('none-mode')
            document.getElementById('error-message').classList.remove('none-mode')
            document.getElementById('error-message').textContent = `${error}`
            // Tindakan yang sesuai jika terjadi kesalahan, misalnya menampilkan pesan kesalahan ke pengguna
        }
    }
    const editUser = async(dataPush)=>{
        document.getElementById('user-form-save').classList.add('none-mode')
        document.getElementById('user-form-cancel').classList.add('none-mode')
        try {
            const response = await fetch('/api/adm/edit-users', {
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
            const json = await response.json();
            if(json.msg === 'Success'){
                // window.location.reload();
            document.getElementById('error-message').classList.remove('none-mode')
            document.getElementById('error-message').classList.add('success-message')
            document.getElementById('error-message').textContent = `User Updated`
            deletePopup();
            // console.log(json.user)
            let new_data = json;
            return new_data;
            }
    
            // Lakukan tindakan lanjutan jika diperlukan setelah data berhasil disimpan
        } catch (error) {
            document.getElementById('user-form-save').classList.remove('none-mode')
            document.getElementById('user-form-cancel').classList.remove('none-mode')
            document.getElementById('error-message').classList.remove('none-mode')
            document.getElementById('error-message').textContent = `${error}`;
            // Tindakan yang sesuai jika terjadi kesalahan, misalnya menampilkan pesan kesalahan ke pengguna
        }
    }
}

function deletePopup(){
                const div = document.getElementById('user-form-container');
                div.setAttribute('class', 'user-form-container animated-scale-down')
                const popup = document.getElementById('js-container-popup');
                setTimeout(() => {
                    popup.remove();
                }, 200);
}

function clearDataFolder(){
    const lists = document.querySelectorAll('.js-press-users-list-container');
    lists.forEach(element => {
        element.remove();
    });
}