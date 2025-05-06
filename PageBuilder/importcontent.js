import {StartingProjects,gsap95} from './Animation.js'
import {projectSaved,addfolder,importFontandColorPalateSelected,updateAddFolder,cssProjectMainTarget,myFolders} from './main.js'
import {importCSSAndAnimation} from './animatecontent.js'
import {importSetting,openProjectSetting} from './EditBody.js'
import { minimizeEditor } from './minimize.js';
import {builtIn_Container} from './built_in_container_function.js'
import {getWebConfig} from './main.js';
import {checkFetch} from './Custom_Data.js';
import {setDataNavigator} from './navigator.js'

const Minbutton = document.getElementById('minimize-editor');
Minbutton.addEventListener('click', minimizeEditor);


export let contentName = "";
let PageSettingCollection = [];
export let MyComponentList = "";
let pagesettingstart = "";
let owner = "";
let component_ID = "";
let parentElementAppend = "";
export {component_ID,PageSettingCollection}
export {owner}
// Di dalam halaman ${clientUrl}/component-builder (di dalam iframe)
// window.addEventListener('message', receiveMessage);
document.addEventListener("DOMContentLoaded", async function() {
  getWebConfig();
  checkFetch();
  const currentUrl = window.location.href;
  const parts = currentUrl.split('/');
  const number = parts[parts.length - 1];
  try {
      const response = await fetch(`/api/adm/component-editor?urlID=${number}`);
      if (!response.ok) {
          throw new Error('Gagal mengambil data web config');
      }
      if(response.ok){
        closeLoadingScreen();
      }
      const data = await response.json();
      // console.log(data)
      receiveMessage(data)
  } catch (error) {
      // console.error('Error:', error);
      // window.close();
      window.location.href ='/admin/component'
      // Tindakan yang sesuai jika terjadi kesalahan, misalnya menampilkan pesan kesalahan ke pengguna
  }
});

export function ExecutingScriptTag(element){
  const scriptTag = element.querySelectorAll('script');
  scriptTag.forEach(script => {
    const newScript = document.createElement('script');
    newScript.innerHTML = script.innerHTML;
    if (script.id) {
      newScript.id = script.id;
    }
    script.parentElement.insertBefore(newScript,script);
    script.remove();
  });
  }

export function receiveMessage(Data) {
  // Periksa origin pesan untuk keamanan
  // if (event.origin !== clientUrl) {
  //   return;
  // }

  // Menerima pesan dari dokumen utama (komponen React)
  // const dataFromParent = event.data;
  const dataFromParent = Data;
  let task = dataFromParent.task;
  if(task === "new-render"){
  // console.log(dataFromParent)
  gsap95();
  builtIn_Container();
  component_ID = dataFromParent.component_id;
  owner = dataFromParent.owner;
  contentName = dataFromParent.name;
  PageSettingCollection = JSON.parse(dataFromParent.PSList);
  // console.log(dataFromParent)
  pagesettingstart = dataFromParent.pagesetting;
  MyComponentList = dataFromParent.componentList;
  addfolder(dataFromParent.folder,dataFromParent.component_folder);
  // console.log(MyComponentList);
  const container = document.getElementById('container');
//   console.log(dataFromParent.key);
  container.innerHTML = dataFromParent.dataContent;
  ExecutingScriptTag(container);
  setTimeout(() => {
    container.removeAttribute("class");
  }, 3100);
  editPageSettingArray();
  ProjectStart();
  }
  if(task === 'component-rendered'){
    let popup = document.getElementById('lazy-save-success');
    gsap.to(popup, {scaleX: 0,duration: 0.3,})
    setTimeout(() => {
      popup.remove();
    }, 310);
    parentElementAppend.innerHTML += dataFromParent.content;
    if(parentElementAppend.id === 'container'){
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
      });
    }
    const lastChild = parentElementAppend.lastChild;
    gsap.from(lastChild, {scaleX: 0, opacity: 0, duration:0.3});
    // console.log(dataFromParent.content);
  }
  if(task === "save-response"){
    let saveText = document.getElementById('save-success-ok');
    saveText.textContent = dataFromParent.content;
    let button = document.getElementById('lazy-save-page-content-button');
    button.setAttribute("class","");
    setDataNavigator();
  }
  if(task === "save-response-folder"){
    let saveText = document.getElementById('save-success-ok');
    saveText.textContent = dataFromParent.content;
    let button = document.getElementById('lazy-save-page-content-button');
    button.setAttribute("class","");
    updateAddFolder(dataFromParent.foldername,dataFromParent.folderkey)
    setDataNavigator();
  }
  if(task === "save-response-page"){
    let saveText = document.getElementById('save-success-ok');
    saveText.textContent = dataFromParent.content;
    let button = document.getElementById('lazy-save-page-content-button');
    button.setAttribute("class","");
  }
  if(task === "error-response"){
    let saveText = document.getElementById('save-success-ok');
    saveText.textContent = dataFromParent.content;
    let button = document.getElementById('lazy-save-page-content-button');
    button.setAttribute("class","");
    setDataNavigator();
  }
 
}

export function importJson(Data){
  const container = document.getElementById('container');
  // console.log(Data)
  container.innerHTML = Data.content;
  contentName = Data.name;
  document.getElementById("ProjectNameInputinput").value = contentName;
  ExecutingScriptTag(container);
  openProjectSetting();
}

export function parentElementAppendChange(new_element){
  parentElementAppend = new_element;
}

export function ComponentList_Folder(){
  myFolders.forEach(folder => {
    MyComponentList.forEach(element => {
      if(folder.key === element.component_folder){
        element.folder = folder.name;
        // console.log(element.folder);
      }
    });
  });
}

function ProjectStart(){
    document.getElementById("ProjectNameInputinput").value = contentName;
    let pagesettingvalue= document.getElementById("select-page-setting").value;
    let pageSettings= document.getElementById("select-page-setting");
    PageSettingCollection.forEach(options => {
      if(options.pagesetting_key === pagesettingvalue){
        let targetCSS = document.getElementById('ProjectCSSTargetinput');
        targetCSS.value = options.css_target;
        cssProjectMainTarget(options.css_target)
      }
    });
    pageSettings.addEventListener('change', () => {
      pagesettingvalue = pageSettings.value; // Update nilai pagesettingvalue saat terjadi perubahan
    
      PageSettingCollection.forEach(options => {
        if (options.pagesetting_key === pagesettingvalue) {
          let targetCSS = document.getElementById('ProjectCSSTargetinput'); // Ganti 'ProjectCSSTargetinput' dengan ID elemen input yang sesuai.
          targetCSS.value = options.css_target;
          cssProjectMainTarget(targetCSS.value); // Mengirim nilai yang baru ke fungsi cssProjectMainTarget
        }
      });
    });
    
    document.getElementById("SubmitButtonProjectSetting").addEventListener('click', importPageSetting);
    importPageSetting();
    StartingProjects();
} 

function importPageSetting(){
  let pagesettingvalue= document.getElementById("select-page-setting").value;
  PageSettingCollection.forEach(options => {
    if(options.pagesetting_key === pagesettingvalue){
      importFontandColorPalateSelected(options)
      importCSSAndAnimation(options)
      importSetting(options)
      let pagesetting = document.getElementById("select-page-setting");
    pagesetting.setAttribute("text", options.pagesetting_name)
    }
    projectSaved();
  });
}

function editPageSettingArray(){
  PageSettingCollection.forEach(pageSetting => {
  pageSetting.css_framework = pageSetting.css_framework.split(',');
  pageSetting.color_palatte = pageSetting.color_palatte.split('|');
  pageSetting.color_palatte = pageSetting.color_palatte
  .filter(item => item.trim() !== "") // Menghapus string kosong
  .map(item => JSON.parse(item)); // Mengurai string JSON menjadi objek
  pageSetting.animation_array = pageSetting.animation_array.split(',');
  pageSetting.animation_array = pageSetting.animation_array.filter(item => item.trim() !== "");
  pageSetting.font_selection = pageSetting.font_selection.split(',');
  pageSetting.font_selection = pageSetting.font_selection.filter(item => item.trim() !== "")


// console.log(PageSettingCollection);
  });
  addPageSettingOption();
}

function addPageSettingOption(){
// console.log(PageSettingCollection);
let selectinput= document.getElementById("select-page-setting");
selectinput.innerHTML = "";
PageSettingCollection.forEach(pageSetting => {
  let pageName = pageSetting.pagesetting_name;
  let key = pageSetting.pagesetting_key
  let option = document.createElement('option');
  option.setAttribute('id', key);
  option.setAttribute('value', key);
  option.textContent = pageName;
  selectinput.appendChild(option);
});
let options = selectinput.options;
for (var i = 0; i < options.length; i++) {
  let optionValue = options[i].getAttribute("value");
  if(optionValue === pagesettingstart){
    options[i].selected = true;
  }
}
}

const closeLoadingScreen = () => {
  const loadingSection = document.getElementById('slicer-fixed-loading');
  loadingSection.classList.add('slicer-prepare-end');
  setTimeout(() => {
    loadingSection.remove();
  }, 310);
}