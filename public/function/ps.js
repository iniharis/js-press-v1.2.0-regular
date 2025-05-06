
const fontsList = [];
const cssList = [];
const jsList = [];
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
            const addButton = document.getElementById('add-new-ps-button');
            if(addButton){
                addButton.addEventListener('click', ()=>{
                    createPS(userID)
                })
            }
            //-------------------------------------------//
            const searchButton = document.getElementById('js-press-folder-searchbutton-ps');
            searchButton.addEventListener('click', ()=>{
                clearDataFolder();
                const searchVal = document.getElementById('js-press-folder-search-ps');
                getFolders(searchVal.value,0);
            })
            document.getElementById('js-press-folder-search-ps').addEventListener('keydown', (e) => {
              if (e.key === 'Enter') {
                clearDataFolder();
                const searchVal = document.getElementById('js-press-folder-search-ps');
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

const createPS = async(userId)=>{
    try {
        const response = await fetch(`/api/adm/-ps?userID=${userId}`, {
            method: 'POST',
        });

        // Periksa apakah permintaan berhasil (status 200 OK)
        if (!response.ok) {
            throw new Error('Something went Wrong');
        }
        if(response.ok){
            window.location.reload();
        }

        const responseData = await response.json(); // Ambil data JSON dari respons
        // console.log(responseData.msg); // Output pesan sukses dari server
    } catch (error) {
        console.error('Something went Wrong:', error.message);
    }
}

const webConfig = async ()=>{
  const response = await fetch('/api/adm/web-config');
  const data = await response.json();
  const webconfig = data.webConfig;
  const fonts = webconfig.google_fonts.split(',');
  fonts.forEach(font => {
    if(font !== ""){
      fontsList.push(font)
    }
});
const datacss = JSON.parse(webconfig.css_framework);
datacss.forEach(anim => {
  let linkScript = `\n<link rel='stylesheet' href='${anim.rawLink}'>`;
  const newObject = {
    name : anim.name,
    value : anim.value,
    link : linkScript,
    rawLink : anim.rawLink
  }
  cssList.push(newObject)
});
const datajs = JSON.parse(webconfig.js_framework);
datajs.forEach(anim => {
  let linkScript = `
    `;
    const dataLinks = anim.link.split(',')
    dataLinks.forEach(element => {
      if(element !== ""){
        const link = `<script src="${element}"></script>\n`
      linkScript += link;
      }
    });
    const newObject = {
      name : anim.name,
      value : anim.value,
      link : linkScript,
    }
    jsList.push(newObject)
});
// console.log(jsList)
}

document.addEventListener('DOMContentLoaded', ()=>{
    webConfig();
    getFolders('',0);
});
async function getFolders(keyword,offset) {
    document.getElementById('loading-icon').classList.remove('none-mode');
    try {
        // Mengirim permintaan GET ke endpoint server
        const response = await fetch(`/api/adm/get-ps?keyword=${keyword}&dataoffset=${offset}`);
        
        // Memeriksa apakah permintaan berhasil (status 200 OK)
        if (!response.ok) {
            throw new Error('Gagal mengambil data folder');
        }
        
        // Mendapatkan data JSON dari respon
        const data = await response.json();
        
        // Lakukan sesuatu dengan data (misalnya menampilkan di halaman)
        // console.log(data.components)
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
    const OldJSPressPagination = document.querySelectorAll('.js-press-folder-pagination');
    if(OldJSPressPagination){
        OldJSPressPagination.forEach(element => {
            element.remove();
        });
    }
    const paginationContainer = document.getElementById('js-press-ps-pagination-container');
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

function MakeAList(renderedFile){
    // console.log('folderlist')
    // console.log(renderedFolders)
    document.getElementById('loading-icon').classList.add('none-mode');
    const pagination = document.getElementById('js-press-ps-pagination-container');
    renderedFile.forEach(Data => {
        const container = document.createElement('div');
        container.classList.add('js-press-folder-list-container');
        container.id = 'js-press-folder-list-container'+Data.id;
        container.innerHTML = `
        <div id="div-18e08b991641-${Data.id}" class="DIV-18e08b991641" lazydev="18e08b991641-${Data.id}">
        <span id="js-press-ps-list-title-${Data.id}" class="js-press-ps-list-title" lazydev="18e08a7545f1-${Data.id}">
        ${Data.pagesetting_name}
        </span>
  
        
        </div>
  
        <div id="js-press-ps-list-action-${Data.id}" class="js-press-ps-list-action" lazydev="18e08a7ebed1-${Data.id}">
            <span class="lazyclass18e08a805dd1" lazydev="18e08a805dd1">
            
          Actions
        
            </span>
        
            <div id="div-18e08a8f77f1-${Data.id}" class="DIV-18e08a8f77f1" lazydev="18e08a8f77f1-${Data.id}">
            <i id="js-press-ps-list-edit-${Data.id}" class="js-press-ps-list-edit  fa fa-edit" lazydev="18e08ab35c71-${Data.id}" title="Edit Pagesetting">
            
            </i>
        
            <i id="js-press-ps-list-delete-${Data.id}" class="js-press-ps-list-delete  fa fa-trash" lazydev="18e08b303151-${Data.id}" title="Delete">
            
            </i>
        
            
            </div>
        
            
            </div>
  
        
        </div>
        `;
        pagination.parentElement.insertBefore(container,pagination);
        const deleteFolder = document.getElementById(`js-press-ps-list-delete-${Data.id}`);
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
                    const response = await fetch(`/api/adm/delete-ps?dataId=${Data.id}`, {
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
            function deletePopup(){
                const div = document.getElementById('js-wrapper-popup');
                div.setAttribute('class', 'js-wrapper-popup animated-scale-down')
                const popup = document.getElementById('js-container-popup');
                setTimeout(() => {
                    popup.remove();
                }, 200);
            }

        })
        const EditFolder = document.getElementById(`js-press-ps-list-edit-${Data.id}`);
        EditFolder.addEventListener('click', async()=>{
            getPagesettingData(Data.id);
        })
    });
}

const getPagesettingData = async(dataID)=>{
    try {
        // Mengirim permintaan GET ke endpoint server
        const response = await fetch(`/api/adm/get-one-ps?dataID=${dataID}`);
        
        // Memeriksa apakah permintaan berhasil (status 200 OK)
        if (!response.ok) {
            throw new Error('Gagal mengambil data folder');
        }
        
        // Mendapatkan data JSON dari respon
        const data = await response.json();
        
        // Lakukan sesuatu dengan data (misalnya menampilkan di halaman)
        // console.log(data.PS);
        pagesettingForm(data.PS)
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
    }
}

const pagesettingForm = (PS)=>{
    const popup = document.createElement('section');
            popup.id = 'js-container-popup';
            popup.classList.add('js-container-popup');
            popup.innerHTML = `
            <div id="js-wrapper-popup" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
            <div id="lazyid6559" class="lazyclass6559" lazydev="6559">
      <div id="lazyid5863" class="lazyclass5863" lazydev="5863">
      <div id="lazyid163" class="lazyclass163" lazydev="163">
      <label id="lp-name-label" class="lp-name-label" lazydev="35" for="" accesskey="">
      Pagesetting Name :
      </label>

      <input type="text" id="lp-name" class="lp-name" lazydev="186">
      
      </div>

      <div id="lazyid619" class="lazyclass619" lazydev="619">
      <label id="lp-desc-label" class="lp-desc-label" lazydev="67" for="" accesskey="">
      Description :
      </label>

      <textarea id="lp-description" class="lp-description" lazydev="3916" rows="10">      
      </textarea>

      
      </div>

      <div id="lazyid6925" class="lazyclass6925" lazydev="6925">
      <label id="lp-label-tags" class="lp-label-tags" lazydev="9423" for="" accesskey="">
      Tags :
      </label>

      <textarea id="lp-input-tags" class="lp-input-tags" lazydev="7424" rows="10" placeholder="Separate by comma (,)">      
      </textarea>

      
      </div>

      
      </div>

      
      </div>

      <div id="lazyid951" class="lazyclass951" lazydev="951">
      <div id="lazyid993" class="lazyclass993" lazydev="993">
      <label id="lazyid531" class="lazyclass531" lazydev="531" for="" accesskey="">
      &lt;Body&gt; css :
      </label>

      <textarea id="lp-additional-css" class="lp-additional-css" lazydev="882" rows="20">      display: flex;
flex-direction: column;
min-height: 100vh;
        
        
          
      </textarea>

      
      </div>

      <div id="lazyid5060" class="lazyclass5060" lazydev="5060">
      <label id="lazyid6158" class="lazyclass6158" lazydev="6158" for="" accesskey="">
      Custom css:
      </label>

      <textarea id="lp-custom-css-input" class="lp-custom-css-input" lazydev="3459" rows="20">      @media only screen and (orientation: landscape) {
          html {
            font-size: 1vw; /* 1em for landscape mode */
          }
        }
        
        @media only screen and (orientation: portrait) {
          html {
            font-size: 1.4vh; /* 1em for potrait mode */
          }
        }
      </textarea>

      
      </div>

      <div id="lazyid7063" class="lazyclass7063" lazydev="7063">
      <label id="lp-custom-css-label" class="lp-custom-css-label" lazydev="561" for="" accesskey="">
      Custom js:
      </label>

      <textarea id="lp-custom-js-input" class="lp-custom-js-input" lazydev="4262" rows="20">      
      </textarea>

      
      </div>

      
      </div>

      <div id="lp-wrapper" class="lp-wrapper" lazydev="541">
      <div id="lazyid374" class="lazyclass374" lazydev="374">
      <div id="lp-left-container-2" class="lp-left-container-2" lazydev="7037">
      <div id="lp-css-framework-container" class="lp-css-framework-container" lazydev="516">
      <label id="lazyid941" class="lazyclass941" lazydev="941" for="" accesskey="">
      CSS Framework :
      </label>

      <div id="lazyid173" class="lazyclass173" lazydev="173">
      <input type="checkbox" id="lazyid494" class="input-css-framework" lazydev="494" value="Bootstrap450">
      <label id="lazyid285" class="cs-framework-label" lazydev="285" for="" accesskey="">
      Bootstrap 4.5.0
      </label>

      
      </div>

      <div id="lazyid129" class="lazyclass129" lazydev="129">
      <input type="checkbox" id="lazyid17" class="input-css-framework" lazydev="17" value="Bootstrap450">
      <label id="lazyid248" class="cs-framework-label" lazydev="248" for="" accesskey="">
      Video Js
      </label>

      
      </div>

      
      </div>

      <div id="lp-animation-framework-container" class="lp-animation-framework-container" lazydev="5917">
      <label id="lazyid8910" class="lazyclass8910" lazydev="8910" for="" accesskey="">
      Animation Framework :
      </label>

      <div id="lazyid2511" class="lazyclass2511" lazydev="2511">
      <input type="checkbox" id="lazyid9412" class="animation-framework-list" lazydev="9412" value="gsap">
      <label id="lazyid1113" class="animation-framework-label" lazydev="1113" for="" accesskey="">
      Gsap
      </label>

      
      </div>

      <div id="lazyid2514" class="lazyclass2514" lazydev="2514">
      <input type="checkbox" id="lazyid4515" class="animation-framework-list" lazydev="4515" value="SmoothScroll">
      <label id="lazyid9016" class="animation-framework-label" lazydev="9016" for="" accesskey="">
      Smooth Scroll js
      </label>

      
      </div>

      
      </div>

      
      </div>

      <div id="lp-left-container" class="lp-left-container" lazydev="6036">
      <div id="lazyid5422" class="lazyclass5422" lazydev="5422">
      <label id="lazyid7420" class="lazyclass7420" lazydev="7420" for="" accesskey="">
      Font Selection :
      </label>

      <select id="lp-font-body" class="lp-font-body" lazydev="83101" selectoption="{px,px},{em,em,selected},{rem,rem},{%,%},{vw,vw},{vh,vh},{vmin,vmin},{vmax,vmax}">
      <option value=""></option>
      </select>

      
      </div>

      
      </div>

      
      </div>

      <div id="lazyid955" class="lazyclass955" lazydev="955">
      <label id="lp-label-tablet" class="lp-label-tablet" lazydev="717" for="" accesskey="">
      Responsive BreakPoint
      </label>

      <div id="lazyid807" class="lazyclass807" lazydev="807">
      <div id="lp-tablet-icon" class="lp-tablet-icon" lazydev="706">
      <i class="fa-solid fa-tablet-screen-button">
      
      </i>

      
      </div>

      <input type="Number" id="lp-input-tablet" class="lp-input-number" lazydev="8826" value="900">
      <div id="lp-mobile-icon" class="lp-mobile-icon" lazydev="471">
      <i class="fa-solid fa-mobile-screen-button">
      
      </i>

      
      </div>

      <input type="Number" id="lp-input-mobile" class="lp-input-number" lazydev="1728" value="480">
      
      </div>

      <label id="lazyid151" class="lazyclass151" lazydev="151" for="" accesskey="">
      Spacing
      </label>

      <div id="lp-sapcing-container" class="lp-sapcing-container" lazydev="716">
      <div id="lazyid397" class="lazyclass397" lazydev="397">
      <label id="lazyid3429" class="lazyclass3429" lazydev="3429" for="" accesskey="">
      Padding :
      </label>

      <select id="lp-padding-parameter" class="lp-padding-parameter" lazydev="143" selectoption="{px,px},{em,em,selected},{rem,rem},{%,%},{vw,vw},{vh,vh},{vmin,vmin},{vmax,vmax}">
      <option value="px">
      px
      </option>

      <option value="em">
      em
      </option>

      <option value="rem">
      rem
      </option>

      <option value="%">
      %
      </option>

      <option value="vw">
      vw
      </option>

      <option value="vh">
      vh
      </option>

      <option value="vmin">
      vmin
      </option>

      <option value="vmax">
      vmax
      </option>

      
      </select>

      <div id="lazyid641" class="lazyclass641" lazydev="641">
      <input type="Number" id="lp-padding-top" class="lp-spacing-number" lazydev="6230" placeholder="Top">
      <input type="Number" id="lp-padding-right" class="lp-spacing-number" lazydev="7941" placeholder="Right">
      
      </div>

      <div id="lazyid764" class="lazyclass764" lazydev="764">
      <input type="Number" id="lp-padding-bottom" class="lp-spacing-number" lazydev="7140" placeholder="Bottom">
      <input type="Number" id="lp-padding-left" class="lp-spacing-number" lazydev="1139" placeholder="Left">
      
      </div>

      
      </div>

      <div id="lazyid532" class="lazyclass532" lazydev="532">
      <label id="lazyid1924" class="lazyclass1924" lazydev="1924" for="" accesskey="">
      Margin :
      </label>

      <select id="lp-margin-parameter" class="lp-margin-parameter" lazydev="9325" selectoption="{px,px},{em,em,selected},{rem,rem},{%,%},{vw,vw},{vh,vh},{vmin,vmin},{vmax,vmax}">
      <option value="px">
      px
      </option>

      <option value="em">
      em
      </option>

      <option value="rem">
      rem
      </option>

      <option value="%">
      %
      </option>

      <option value="vw">
      vw
      </option>

      <option value="vh">
      vh
      </option>

      <option value="vmin">
      vmin
      </option>

      <option value="vmax">
      vmax
      </option>

      
      </select>

      <div id="lazyid1626" class="lazyclass1626" lazydev="1626">
      <input type="Number" id="lp-margin-top" class="lp-spacing-number" lazydev="927" placeholder="Top">
      <input type="Number" id="lp-margin-right" class="lp-spacing-number" lazydev="5728" placeholder="Right">
      
      </div>

      <div id="lazyid1029" class="lazyclass1029" lazydev="1029">
      <input type="Number" id="lp-margin-bottom" class="lp-spacing-number" lazydev="5030" placeholder="Bottom">
      <input type="Number" id="lp-margin-left" class="lp-spacing-number" lazydev="5831" placeholder="Left">
      
      </div>

      
      </div>

      
      </div>

      <div id="lazyid71104" class="lazyclass71104" lazydev="71104">
      <label id="lazyid14102" class="lazyclass14102" lazydev="14102" for="" accesskey="">
      Css Target :
      </label>

      <select id="lp-css-target" class="lp-css-target" lazydev="22103" selectoption="{CSS ID,CSS ID},{LazyDev,LazyDev,selected},{Main CSS Class,Main CSS Class}">
      <option value="CSS ID">
      CSS ID
      </option>

      <option value="LazyDev">
      LazyDev
      </option>

      <option value="Main CSS Class">
      Main CSS Class
      </option>

      
      </select>

      
      </div>

      <div id="lazyid8057" class="lazyclass8057" lazydev="8057">
      <label id="lp-overflow-x-label" class="lp-overflow-x-label" lazydev="9551" for="" accesskey="">
      Overflow-x :
      </label>

      <select id="lp-overflow-x-input" class="lp-overflow-x-input" lazydev="1852" selectoption="{scroll,scroll},{hidden,hidden,selected},{visible,visible},{auto,auto}">
      <option value="scroll">
      scroll
      </option>

      <option value="hidden">
      hidden
      </option>

      <option value="visible">
      visible
      </option>

      <option value="auto">
      auto
      </option>

      
      </select>

      
      </div>

      
      </div>

      
      </div>

      <div id="lazyid8225" class="lazyclass8225" lazydev="8225">
      <label id="lazyid3518" class="lazyclass3518" lazydev="3518" for="" accesskey="">
      Saved Colors :
      </label>

      <select id="lp-color-choose" class="lp-color-choose" lazydev="4928" selectoption="{Main Color,Main Color},">
      <option value="Main Color">
      Main Color
      </option>

      
      </select>

      <div id="color-palatte-div" class="lazyclass3526" lazydev="3526">
      
      </div>

      <div id="lp-color-example-container-div" class="lp-color-example-container-div" lazydev="4229">
      <div id="lp-color-example-container" class="lp-color-example-container" lazydev="7530">
      
      </div>

      
      </div>

      <div id="lazyid5427" class="lazyclass5427" lazydev="5427">
      <div id='shadow-lp'></div>
      <div id="lp-color-name-input" class="lp-color-name-input" lazydev="4940">
      <label id="lazyid844" class="lazyclass844" lazydev="844" for="" accesskey="">
      Color Name :
      </label>

      <input type="text" id="lp-color-name-input-input" class="lp-color-name-input-input" lazydev="5045">
      
      </div>

      <div id="lazyid4448" class="lazyclass4448" lazydev="4448">
      <label id="lazyid8946" class="lazyclass8946" lazydev="8946" for="" accesskey="">
      Color RGB :
      </label>

      <input type="color" id="lp-color-name-input-color" class="lp-color-name-input-color" lazydev="2549" value="#71dcea">
      
      </div>

      <div id="lazyid5552" class="lazyclass5552" lazydev="5552">
      <label id="lp-color-name-input-opacity-label" class="lp-color-name-input-opacity-label" lazydev="2150" for="" accesskey="">
      Color Opacity : (1)
      </label>

      <input type="range" id="lp-color-name-input-opacity" class="lp-color-name-input-opacity" lazydev="9253" range-apperance="none" max="1" min="0" value="1" step="0.01">
      
      </div>

      <div id="lazyid6256" class="lazyclass6256" lazydev="6256">
      <label id="lazyid454" class="lazyclass454" lazydev="454" for="" accesskey="">
      Color Result (Rgba) :
      </label>

      <input type="text" id="lp-color-name-input-result" class="lp-color-name-input-result" lazydev="7757">
      
      </div>

      <div id="lp-color-name-input-save-button" class="lp-color-name-input-save-button" lazydev="5241">
      <h3 id="lazyid6358" class="lazyclass6358" lazydev="6358">
      
	Save Color

      </h3>

      
      </div>

      
      </div>

      
      </div>

      
      </section>

      <section id="lazyid256" class="lazyclass256" lazydev="256">
      <div id="lp-save-pagesetting-button" class="lp-save-pagesetting-button" lazydev="712">
      <h3 id="lazyid963" class="lazyclass963" lazydev="963">
      
	Save Pagesetting

      </h3>

      
      </div>

      <div id="lp-cancle-button" class="lp-cancle-button" lazydev="698">
      <h3 id="lazyid827" class="lazyclass827" lazydev="827">
      
	Cancel

      </h3>

      
      </div>
     </section>            
            </div>`;
            document.body.appendChild(popup);
            pagesettingFUNC(PS);
}

const pagesettingFUNC = (PS)=>{
  let FontOption = fontsList;

let animationFramework = jsList;

let animationSelected = [];

function animationAppend(anim){
let animationsaved = anim.split(',');
animationsaved = animationsaved.filter(item => item.trim() !== "");
const container = document.getElementById('lp-animation-framework-container');
container.innerHTML = `<label id="lazyid8910" class="lazyclass8910" lazydev="8910" for="" accesskey="">
Animation Framework :
</label>`;
animationFramework.forEach(element => {
const div = document.createElement('div');
div.setAttribute('class', 'lazyclass2511');
div.innerHTML = `
<input type="checkbox" id="check-${element.value}" class="animation-framework-list" lazydev="9412" value="${element.value}">
      <label id="check-${element.value}" class="animation-framework-label" lazydev="1113" for="" accesskey="">
      ${element.name}
      </label>
`;
container.appendChild(div);
let checkbox = document.getElementById(`check-${element.value}`);
div.addEventListener('click', function(){
let checklist = checkbox.checked;
if (checklist === true) {
    animationSelected.push(element.value);
  } else {
    animationSelected = animationSelected.filter(selected => selected !== element.value);
  }
  animationSelected = [...new Set(animationSelected)];
});
animationsaved.forEach(item => {
    if(item === element.value){
        let checkbox = document.getElementById(`check-${element.value}`);
        checkbox.click();
    }
});
});
}

let cssFrameWork = cssList; 

let CSSSELECTED = [];

function cssAppend(css){
    let cssSaved = css.split(',');
    cssSaved = cssSaved.filter(item => item.trim() !== "");

    const container = document.getElementById('lp-css-framework-container');
    container.innerHTML = `<label id="lazyid941" class="lazyclass941" lazydev="941" for="" accesskey="">
    CSS Framework :
    </label>`;
    cssFrameWork.forEach(element => {
    const div = document.createElement('div');
    div.setAttribute('class', 'lazyclass173');
    div.innerHTML = `
    <input type="checkbox" id="check-${element.value}" class="input-css-framework" lazydev="494" value="${element.value}">
      <label id="check-${element.value}" class="cs-framework-label" lazydev="285" for="" accesskey="">
      ${element.name}
      </label>
    `;
    container.appendChild(div);
    let checkbox = document.getElementById(`check-${element.value}`);
    div.addEventListener('click', function(){
    let checklist = checkbox.checked;
    if (checklist === true) {
        CSSSELECTED.push(element.value);
      } else {
        CSSSELECTED = CSSSELECTED.filter(selected => selected !== element.value);
      }
      CSSSELECTED = [...new Set(CSSSELECTED)];
    });
    cssSaved.forEach(item => {
        if(item === element.value){
            let checkbox = document.getElementById(`check-${element.value}`);
            checkbox.click();
        }
    });
    });
}

let selectedFonts = [""];
let bodyvalue = '';

function appendFont(container,fonts){
let bodyfontSelected = document.getElementById('lp-font-body');
bodyfontSelected.addEventListener('change',bodyfontchange)
function bodyfontchange(){
    bodyvalue = bodyfontSelected.value;
}
FontOption.forEach(font => {
const fontId = font.replace(/ /g, '-');
let newFont = document.createElement('div');
newFont.setAttribute('class', 'lp-font-selection-container');
newFont.innerHTML = `
<input type="checkbox" id="lp-checkbox-font-${fontId}" value="${font}" class="lp-checkbox-font">
<label id="lp-font-selection-list-label" class="lp-font-selection-list-label">
      ${font}
</label>
`;
let checkbox = newFont.querySelector(`#lp-checkbox-font-${fontId}`);
 if (fonts.includes(font)) {
    checkbox.checked = true; // Mencentang checkbox jika font ada dalam array fonts
    selectedFonts.push(font);
  } else {
    newFont.setAttribute('style', 'order: 1'); // Mengatur style flex-box order menjadi 1
  }
  checkbox.addEventListener('click', function(){
    bodyfontchange();
    let checklist = checkbox.checked;
    addRemoveFontOption(checklist,font)
})
container.appendChild(newFont);
});
bodyFontOption();
}

function addRemoveFontOption(checklist,font){
if(checklist === true){
    selectedFonts.push(font);
    bodyFontOption();
} else {
    selectedFonts = selectedFonts.filter(selectedFont => selectedFont !== font);
    bodyFontOption();
}
}

function bodyFontOption(){
    const bodyfont = document.getElementById('lp-font-body');
    bodyfont.innerHTML = '';
    selectedFonts.forEach(font => {
    const option = document.createElement('option');
    option.value = font;
    option.textContent = font;
    bodyfont.appendChild(option);
    });
    bodyfont.value = bodyvalue;
}

let ColorPallate = [];
let ID = 0;
let pageid = 0;
let pageKey = "";
const getBodyResult = ()=>{
  let colorPackaged;
  ColorPallate.forEach(element => {
    if(element.bodycolor === true){
      const elementId = 'cp-'+element.id;
      const target = document.getElementById('cp-'+element.id);
      const hex = rgbToHex(target.getAttribute('rgb'));
      const opacity = target.getAttribute('opacity');
      const color_val = hexToRgba(hex, opacity);
      colorPackaged = {color: hex, op: opacity, val: color_val}
    }
  });
  return colorPackaged
}
let Token = "";
const deleteColorPalatte = ()=> {
  ColorPallate = [];
}
let numid = 1;
const addColorPalate = (colorPalatte)=> {
  const oldClass = document.querySelectorAll('.lp-color-container-list');
  if(oldClass && oldClass.length > 0){
    oldClass.forEach(element => {
      element.remove();
    });
  }
  const section = document.getElementById('color-palatte-div');
  colorPalatte.forEach(element => {
  addnewdivColor(element,'start');
  });
  const addnewbutton = document.createElement('div');
  addnewbutton.setAttribute('class','lp-color-container-list');
  addnewbutton.id = `add-new-color-button-lp`
  addnewbutton.innerHTML = `
  <div id="button-add-color-lp" class="button-add-color-lp" lazydev="652">
  <i style="font-size: 1.5rem; padding-bottom: 3%;" class="fa-solid fa-plus"></i>
  <p style="margin-top: 2px;">Add new Color</p>
  </div>`;
  section.appendChild(addnewbutton);
  addnewbutton.addEventListener('click', createNewColor);
}

const editPageSettingForm = (pagesetting,userID)=> {
  ID = userID;
  pageid = pagesetting.id;
  pageKey = pagesetting.pagesetting_key;
    let psname = document.getElementById('lp-name');
    psname.value = pagesetting.pagesetting_name;
    let psdesc = document.getElementById('lp-description');
    psdesc.value = pagesetting.description;
    let pstags = document.getElementById('lp-input-tags');
    pstags.value = pagesetting.tags;
    //----css js--//
    let cssbody = document.getElementById('lp-additional-css');
    cssbody.value = pagesetting.additional_css;
    let customcss = document.getElementById('lp-custom-css-input');
    customcss.value = pagesetting.custom_css;
    let customjs = document.getElementById('lp-custom-js-input');
    customjs.value = pagesetting.custom_js;
    //---font--//
    let fontContainer = document.getElementById('lazyid5422');
    const bodyfont = document.getElementById('lp-font-body');
    bodyfont.value = pagesetting.body_font;
    bodyvalue = pagesetting.body_font;
    let fontSelection = pagesetting.font_selection.split(',');
    let fonts = [];
    fontSelection.forEach(font => {
        if(font !== ''){
            fonts.push(font)
        }
    });
    // console.log(fonts)
    appendFont(fontContainer,fonts);
    let animations = pagesetting.animation_array;
    animationAppend(animations);
    let cssframework = pagesetting.css_framework;
    cssAppend(cssframework);
    //--responsive and spacing --//
    //---responsive--//
    document.getElementById('lp-input-tablet').value = pagesetting.tablet_breakpoint;
    document.getElementById('lp-input-mobile').value = pagesetting.mobile_breakpoint;
    // //--padding--//
    document.getElementById('lp-padding-parameter').value = pagesetting.padding_parameter;
    document.getElementById('lp-padding-top').value = pagesetting.padding_top;
    document.getElementById('lp-padding-right').value = pagesetting.padding_right;
    document.getElementById('lp-padding-bottom').value = pagesetting.padding_bottom;
    document.getElementById('lp-padding-left').value = pagesetting.padding_left;
    //--margin--//
    document.getElementById('lp-margin-parameter').value = pagesetting.margin_parameter;
    document.getElementById('lp-margin-top').value = pagesetting.margin_top;
    document.getElementById('lp-margin-right').value = pagesetting.margin_right;
    document.getElementById('lp-margin-bottom').value = pagesetting.margin_bottom;
    document.getElementById('lp-margin-left').value = pagesetting.margin_left;
    //--css target and overflow--//
    document.getElementById('lp-css-target').value = pagesetting.css_target;
    document.getElementById('lp-overflow-x-input').value = pagesetting.overflow_x;
    //---Color Palatte//
    const bodyColor = {name: 'Body color', value: pagesetting.background_val, bodycolor: true};
    ColorPallate.push(bodyColor);
    let colorPalatte = pagesetting.color_palatte;
    colorPalatte = colorPalatte.split('|');
    colorPalatte = colorPalatte.filter(item => item.trim() !== "").map(item => JSON.parse(item));
    colorPalatte.forEach(color => {
    ColorPallate.push(color)
    });
    // ColorPallate = colorPalatte;
    addColorPalate(ColorPallate);
}
editPageSettingForm(PS,PS.owner)

const saveExportForm = async()=> {
  const colorBody = getBodyResult();
  const desc = document.getElementById('lp-description').value;
  const tags = document.getElementById('lp-input-tags').value;
  const IDS = PS.id;
  const key = pageKey;
  const pagename = document.getElementById('lp-name').value;
  const bodyfont = document.getElementById('lp-font-body').value;
  const overflowX = document.getElementById('lp-overflow-x-input').value;
  const bgcolor = colorBody.color;
  const bgop = colorBody.op;
  const bgval = colorBody.val;
  const mPar = document.getElementById('lp-margin-parameter').value;
  const mTop = document.getElementById('lp-margin-top').value;
  const mRight = document.getElementById('lp-margin-right').value;
  const mBottom = document.getElementById('lp-margin-bottom').value;
  const mLeft = document.getElementById('lp-margin-left').value;
  const pPar = document.getElementById('lp-padding-parameter').value;
  const pTop = document.getElementById('lp-padding-top').value;
  const pRight = document.getElementById('lp-padding-right').value;
  const pBottom = document.getElementById('lp-padding-bottom').value;
  const pLeft = document.getElementById('lp-padding-left').value;
  const addCSS = document.getElementById('lp-additional-css').value;
  const mobile = document.getElementById('lp-input-mobile').value;
  const tablet = document.getElementById('lp-input-tablet').value;
  let fonts = "";
  selectedFonts.forEach(font => {
    fonts += font+",";
  });
  let palattes = "";
  ColorPallate.forEach(element => {
    if(!element.bodycolor){
    let updateColor = `{"name": "${element.name}", "value": "${element.value}"}|`;
    palattes +=updateColor
    }
    ColorPallate = [];
  });
  const css = document.getElementById('lp-custom-css-input').value;
  const js = document.getElementById('lp-custom-js-input').value;
  let cssFramework = "";
  CSSSELECTED.forEach(element => {
    let updateFramework = element+",";
    cssFramework+=updateFramework
  });
  let animateArray = "";
  animationSelected.forEach(element => {
    let animation = element+",";
    animateArray+=animation
  });
  const cssTarget = document.getElementById('lp-css-target').value;

  const dataPush = {
    IDS,
    pageid,
    key,
     pagename,
     desc,
     tags,
     bodyfont,
     overflowX,
     bgcolor,
     bgop,
     bgval,
     mPar,
     mTop,
     mRight,
     mBottom,
     mLeft,
     pPar,
     pTop,
     pRight,
     pBottom,
     pLeft,
     addCSS,
     mobile,
     tablet,
     fonts,
     palattes,
     css,
     js,
     cssFramework,
     animateArray,
     cssTarget,
};

const requestOptions = {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json', // Atur tipe konten sesuai kebutuhan Anda
    },
    body: JSON.stringify(dataPush),
};
const popup = document.getElementById('js-container-popup');
popup.innerHTML = `
<div id="js-wrapper-popup" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
            <p id="js-popup-text" class="js-popup-text" lazydev="18e5af308c51">
            Saving... Please Wait!
            </p>
      
            
            </div>
`;
fetch('/api/adm/-ps', requestOptions)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const PagesettingName = document.getElementById(`js-press-ps-list-title-${IDS}`);
        PagesettingName.textContent = pagename;
        deletePopup();
    })
    .catch(error => {
        console.error('There was an error!', error);
    });

}

function addnewdivColor(element,phase){
  const section = document.getElementById('color-palatte-div');
  element.id = numid;
      let div = document.createElement('div');
      div.id = 'cp-'+element.id;
      div.setAttribute('numid', element.id);
      div.setAttribute('name', element.name);
      div.setAttribute('rgb', rgbaToRgb(element.value));
      div.setAttribute('opacity', getOpacityFromRgba(element.value));
      div.setAttribute('class', 'lp-color-container-list');
      div.innerHTML = `
    <div style="background-color: ${element.value} !important;" id="lp-color-sample-list" class="lp-color-sample-list" lazydev="9332">
    
    </div>

    <label id="lp-color-title-list" class="lp-color-title-list" lazydev="5135" for="" accesskey="">
        ${element.name}
    </label>

    <div id="lazyid9336" class="lazyclass9336" lazydev="9336">
        <label id="lp-color-edit-list-${element.id}" class="lp-color-edit-list" lazydev="7837" for="" accesskey="">
            Edit
        </label>

        <label id="lp-color-delete-list-${element.id}" class="lp-color-delete-list" lazydev="9139" for="" accesskey="">
            Delete
        </label>
    </div>

      `;
      section.appendChild(div);
      if(phase === 'start'){section.appendChild(div);}
      if(phase === 'add'){
        const lastChild = document.getElementById('add-new-color-button-lp'); 
        section.insertBefore(div, lastChild);}
      div.addEventListener('mouseover', () => {
        const ball = document.getElementById('lp-color-example-container');
        ball.setAttribute('style', `background-color: ${element.value} !important`)
    });
  //   div.addEventListener('mouseout', () => {
  //     const ball = document.getElementById('lp-color-example-container');
  //     ball.setAttribute('style', `background-color: rgba(0, 255, 255, 1);`)
  // });
  const elID = element.id;
  const deletebutton = document.getElementById(`lp-color-delete-list-${element.id}`);
  deletebutton.addEventListener('click', ()=>{
    ColorPallate = ColorPallate.filter(element => element.id !== elID);
    div.remove();
  });
  if(element.bodycolor === true){
    deletebutton.remove();
  }
  const editButton = document.getElementById(`lp-color-edit-list-${element.id}`);
  editButton.addEventListener('click', ()=>{
    const shadow = document.getElementById('shadow-lp');
    if(shadow){shadow.remove();}
    editCP(div,element);
  })
  numid ++;
}

function createNewColor(){
  const newColor = {name: 'New Color', value: 'rgba(0, 255, 255, 0.842)'}
  ColorPallate.push(newColor);
  addnewdivColor(newColor,'add');
}

const editCP = (cpId, element) => {
const ball = document.getElementById('lp-color-example-container');

let resultinput = document.getElementById('lp-color-name-input-result');
resultinput.value = element.value;

let nameinput = document.getElementById('lp-color-name-input-input');
nameinput.value = element.name;
nameinput.removeAttribute('readonly');
if(element.bodycolor === true){
  nameinput.setAttribute('readonly','');
}
let rgbinput = document.getElementById('lp-color-name-input-color');
rgbinput.value = rgbToHex(cpId.getAttribute('rgb'));
let rgblabel = document.getElementById('lazyid8946');
rgblabel.textContent = `Color HEX : ${rgbinput.value}`;

let opacityinput = document.getElementById('lp-color-name-input-opacity');
opacityinput.value = cpId.getAttribute('opacity');
let opacitylabel = document.getElementById('lp-color-name-input-opacity-label');
opacitylabel.textContent = `Color Opacity : (${opacityinput.value}) `;

rgbinput.addEventListener('input', ()=>{
  rgblabel.textContent = `Color HEX : ${rgbinput.value}`;
  let rgbval = hexToRgba(rgbinput.value,opacityinput.value);
  resultinput.value = rgbval;
  ball.setAttribute('style', `background-color: ${rgbval};`)
})

opacityinput.addEventListener('input', ()=>{
  opacitylabel.textContent = `Color Opacity : (${opacityinput.value}) `;
  let rgbval = hexToRgba(rgbinput.value,opacityinput.value);
  resultinput.value = rgbval;
  ball.setAttribute('style', `background-color: ${rgbval};`)
})

resultinput.addEventListener('change', ()=>{
  const ball = document.getElementById('lp-color-example-container');
  let checker = checkHexorRGBA(resultinput.value);
  if(checker === `unknown`){
    rgbinput.value =  `#00FFFF`;
    rgblabel.textContent = `Color HEX : #00FFFF`;
    opacitylabel.textContent = `Color Opacity : (1) `;
    opacityinput.value = 1;
    resultinput.value = `rgba(0, 255, 255, 1);`;
    ball.setAttribute('style', `background-color: rgba(0, 255, 255, 1);`);
    return
  }

  if(checker === `hex`){
    const value = hexToRgbOpacity(resultinput.value);
    // console.log(value)
    let rgbhex = rgbToHex(value.rgb);
    rgbinput.value = rgbhex;
    rgblabel.textContent = `Color HEX : ${rgbhex}`;
    opacitylabel.textContent = `Color Opacity : ${value.opacity} `;
    opacityinput.value =  value.opacity;
    resultinput.value = value.rgba;
    ball.setAttribute('style', `background-color: ${value.rgba};`);
  }

  if(checker === `rgb`){
    let rgbhex = rgbToHex(resultinput.value);
    rgbinput.value = rgbhex;
    rgblabel.textContent = `Color HEX : ${rgbhex}`;
    opacityinput.value = 1;
    opacitylabel.textContent = `Color Opacity : 1 `;
    resultinput.value = rgbToRgba(resultinput.value);
    ball.setAttribute('style', `background-color: ${resultinput.value};`);
    return
  }

  if(checker === `rgba`){
    let rgbhex = rgbToHex(resultinput.value);
    rgbinput.value = rgbhex;
    rgblabel.textContent = `Color HEX : ${rgbhex}`;
    let opval = getOpacityFromRgba(resultinput.value);
    opacityinput.value = opval;
    opacitylabel.textContent = `Color Opacity : ${opval} `;
    ball.setAttribute('style', `background-color: ${resultinput.value};`);
    return
  }


})
const container = document.getElementById('lazyid5427');
let savebutton = document.getElementById('lp-color-name-input-save-button');
let allsavebutton = document.querySelectorAll('.lp-color-name-input-save-button');
savebutton.addEventListener('click', () => {
  const shadow = document.createElement('div');
  shadow.id = 'shadow-lp';
  container.appendChild(shadow);
  savebutton.remove();
  if(allsavebutton.length >= 1){
    allsavebutton.forEach(element => {
      element.remove();
    });
  }
  const elid = element.id;
  ColorPallate.forEach(color => {
      if (color.id === elid) {
          color.value = resultinput.value;
          color.name = nameinput.value;
      }
  });
  addColorPalate(ColorPallate);
  let addsave = document.createElement('div');
  addsave.setAttribute('class', 'lp-color-name-input-save-button');
  addsave.setAttribute('id', 'lp-color-name-input-save-button');
  addsave.innerHTML = `<h3 class="lazyclass6358">Save Color</h3>`;
  container.appendChild(addsave);
});

}

function hexToRgbOpacity(hex) {
  // Menghapus tanda "#" jika ada
  hex = hex.replace(/^#/, '');

  // Mendapatkan nilai merah, hijau, dan biru dari string hex
  var red = parseInt(hex.substring(0, 2), 16);
  var green = parseInt(hex.substring(2, 4), 16);
  var blue = parseInt(hex.substring(4, 6), 16);

  // Menghitung nilai opasitas (alpha) dari hex (0-255) ke rentang 0-1
  let opacity = 1;
  if (hex.length >= 7) {
      opacity = parseInt(hex.substring(6, 8), 16) / 255;
      opacity = parseFloat(opacity.toFixed(2));
  }

  // Mengembalikan objek dengan nilai rgba, rgb, dan opacity
  var rgbaValue = 'rgba(' + red + ', ' + green + ', ' + blue + ', ' + opacity + ')';
  var rgbValue = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
  
  return {
      rgba: rgbaValue,
      rgb: rgbValue,
      opacity: opacity
  };
}

function rgbToRgba(rgbValue) {
  // Ambil nilai merah, hijau, dan biru dari string RGB
  var rgbArray = rgbValue.match(/\d+/g);
  
  // Konversi nilai merah, hijau, dan biru ke format RGBA dengan opasitas 1
  var rgbaValue = 'rgba(' + rgbArray[0] + ', ' + rgbArray[1] + ', ' + rgbArray[2] + ', 1)';
  
  return rgbaValue;
}

function checkHexorRGBA(value) {
  // Pemeriksaan apakah nilai adalah format hex
  if (/^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}|[A-Fa-f0-9]{8})$/.test(value)) {
    return 'hex';
}
  // Pemeriksaan apakah nilai adalah format rgb
  else if (/^rgb\(\s?\d+\s?,\s?\d+\s?,\s?\d+\s?\)$/.test(value)) {
      return 'rgb';
  }
  // Pemeriksaan apakah nilai adalah format rgba
  else if (/^rgba\(\s?\d+\s?,\s?\d+\s?,\s?\d+\s?,\s?(\d+(\.\d+)?)\s?\)$/.test(value)) {
      return 'rgba';
  } else {
      return 'unknown';
  }
}

function hexToRgba(hex, opacity) {
  // Menghapus tanda "#" jika ada
  hex = hex.replace(/^#/, '');

  // Ambil nilai merah, hijau, dan biru dari string hex
  var red = parseInt(hex.substring(0, 2), 16);
  var green = parseInt(hex.substring(2, 4), 16);
  var blue = parseInt(hex.substring(4, 6), 16);

  // Pastikan nilai opasitas berada dalam rentang 0 hingga 1
  var validOpacity = Math.min(1, Math.max(0, opacity));

  // Gabungkan nilai merah, hijau, biru, dan opasitas dalam format "rgba()"
  var rgbaValue = 'rgba(' + red + ', ' + green + ', ' + blue + ', ' + validOpacity + ')';

  return rgbaValue;
}

function rgbToHex(rgb) {
  // Ambil nilai merah, hijau, dan biru dari string RGB
  var rgbArray = rgb.match(/\d+/g);
  
  // Konversi nilai merah, hijau, dan biru ke format heksadesimal
  var red = parseInt(rgbArray[0]).toString(16).padStart(2, '0');
  var green = parseInt(rgbArray[1]).toString(16).padStart(2, '0');
  var blue = parseInt(rgbArray[2]).toString(16).padStart(2, '0');
  
  // Gabungkan nilai heksadesimal merah, hijau, dan biru
  var hexValue = '#' + red + green + blue;
  
  return hexValue;
}

function getOpacityFromRgba(rgbaValue) {
  // Mengambil nilai alpha dari RGBA
  var alpha = rgbaValue.match(/[\d\.]+(?=\))/)[0];
  
  // Mengembalikan nilai alpha sebagai angka
  return parseFloat(alpha);
}


function rgbaToRgb(rgbaValue) {
  // Mengambil nilai RGBA
  var rgba = rgbaValue.match(/\d+(\.\d+)?/g).map(parseFloat);
  
  // Mengambil nilai RGB
  var newRed = rgba[0];
  var newGreen = rgba[1];
  var newBlue = rgba[2];
  
  // Mengembalikan nilai RGB baru sebagai string
  return 'rgb(' + newRed + ', ' + newGreen + ', ' + newBlue + ')';
}
function deletePopup(){
        const popupText = document.getElementById('js-popup-text');
        const div = document.getElementById('js-wrapper-popup');
        div.setAttribute('class', 'js-wrapper-popup animated-scale-down')
        const popup = document.getElementById('js-container-popup');
        setTimeout(() => {
            popup.remove();
        }, 200);
    } 
document.getElementById('lp-cancle-button').addEventListener('click',deletePopup);
document.getElementById('lp-save-pagesetting-button').addEventListener('click',()=>{
    saveExportForm();
});
}
//