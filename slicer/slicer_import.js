import {turnOff,deleteArrays} from '/js-slicer/slicer_function.js';

// window.addEventListener('message', receiveMessage);
document.addEventListener("DOMContentLoaded", async function() {
  getWebConfig();
  const currentUrl = window.location.href;
  const parts = currentUrl.split('/');
  const number = parts[parts.length - 1];
  try {
      const response = await fetch(`/api/adm/component-slicer?urlID=${number}&URL=${currentUrl}`);
      if (!response.ok) {
          throw new Error('Gagal mengambil data web config');
      }
      const data = await response.json();
      // console.log(data)
      receiveMessage(data)
  } catch (error) {
      // console.error('Error:', error);
      window.location.href ='/admin/component'
      // Tindakan yang sesuai jika terjadi kesalahan, misalnya menampilkan pesan kesalahan ke pengguna
  }
});

export let userID;
export let pagesetting;
export let page_key;
export let component;
let content_txt = '';
export let myFolders = [];
export let defaultFolder = '';
export const CSSFRAMEWORKArray = [];
export let CSSFrameworkSelected = [];

export const JSLibraryArray = [];
const animationArray = [];

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

export function receiveMessage(Data){
    // if (event.origin !== clientUrl) {
    //     return;
    //   }
      const dataFromParent = Data;
      // console.log(dataFromParent)
      let task = dataFromParent.task;
      if(task === "new-render"){
        userID = dataFromParent.owner;
        component = dataFromParent.component;
        content_txt = dataFromParent.content;
        // console.log(component)
        // pagesetting = JSON.parse(dataFromParent.pagesetting);
        pagesetting = dataFromParent.pagesetting
        page_key = pagesetting.pagesetting_key;
        // console.log(pagesetting);
        // console.log(page_key);
        CSSLINKPUSH();
        const folders = dataFromParent.folder;
        // console.log(folders);
        folders.forEach(folder => {
          myFolders.push(folder)
          if(folder.default_folder === true){
            defaultFolder = folder.folder_key;
            // console.log(defaultFolder)
          }
        });
      }
      if(task === "save-response-success"){
        deleteArrays();
        const message = dataFromParent.content;
        const button = document.getElementById('slicing-save-button');
        button.innerHTML = `<p>close</p>`;
        const text = document.getElementById('save-sliced-comp-9800');
        text.textContent = `${message}`;
        button.addEventListener('click',()=>{
          const container = document.getElementById('slice-save-container');
          container.remove();
        })
      }
      if(task === "error-response"){
        const message = dataFromParent.content;
        const button = document.getElementById('slicing-save-button');
        button.innerHTML = `<p>close</p>`;
        const text = document.getElementById('save-sliced-comp-9800');
        text.textContent = `${message}`;
        button.addEventListener('click',()=>{
          const container = document.getElementById('slice-save-container');
          container.remove();
        })
      }
}

const getWebConfig = async ()=>{
  const response = await fetch('/api/adm/web-config');
  const data = await response.json();
  const webconfig = data.webConfig;
  // console.log(webconfig);
  pushCSSConfig(webconfig.css_framework);
  pushAnimationConfig(webconfig.js_framework);
  fontAwesomeEdit(webconfig.font_awesome_cdn);
} 


let font_awesome_cdn = `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css`;
function fontAwesomeEdit(FA_cdn_link){
if(FA_cdn_link === ''){
  font_awesome_cdn = FA_cdn_link;
  return
}
if(FA_cdn_link === font_awesome_cdn){
  return
}
const link = document.createElement('link');
link.setAttribute('data-font-awesome', 'true');
link.setAttribute('rel', 'stylesheet');
link.setAttribute('href', `${FA_cdn_link}`);
const oldLink = document.querySelector('[data-font-awesome]');
if(oldLink){
  oldLink.remove();
}
document.head.appendChild(link)
font_awesome_cdn = FA_cdn_link;
}

function pushCSSConfig(data){
  const dataanimation = JSON.parse(data)
  dataanimation.forEach(anim => {
    let linkScript = `\n<link rel='stylesheet' href='${anim.rawLink}'>`;
    const newObject = {
      name : anim.name,
      value : anim.value,
      link : linkScript,
      rawLink : anim.rawLink
    }
    CSSFRAMEWORKArray.push(newObject)
  });
  // console.log(CSSFRAMEWORKOptionList)
}
function pushAnimationConfig(data){
  const dataanimation = JSON.parse(data)
  dataanimation.forEach(anim => {
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
      rawLink : dataLinks,
    }
    // console.log(newObject)
    JSLibraryArray.push(newObject)
  });
  // console.log(JSLibraryArray)
}

function JSAnimationLinkPush(){
  const jslibrary = document.querySelectorAll('[data-js-framework]');
  let noGsap = false;
  // console.log(JSLibraryArray)
  if (animationArray.some(data => data.rawLink.some(link => link.includes('gsap')))) {
    // console.log('Data dengan kata "gsap" ada dalam animationArray.');
    noGsap = false;
} else {
  noGsap = true;
  // console.log('gaada');
}
  if(jslibrary){
    jslibrary.forEach(element => {
      element.remove();
    });
  }
  animationArray.forEach(element => {
    // console.log(element)
    if(element.rawLink){
      element.rawLink.forEach(anim => {
        const script = document.createElement('script');
          script.setAttribute('src',anim);
          script.setAttribute('data-js-framework','true');
          document.head.appendChild(script);
      });
    }
  });
  if(noGsap === true){
    const script = document.createElement('script');
          script.setAttribute('src','https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js');
          script.setAttribute('data-js-framework','true');
    const script2 = document.createElement('script');
          script2.setAttribute('src','https://cdnjs.cloudflare.com/ajax/libs/gsap/3.8.0/ScrollTrigger.min.js');
          script2.setAttribute('data-js-framework','true');
          document.head.appendChild(script);
          document.head.appendChild(script2);
  }
  // console.log(animationArray)
}

function CSSLINKPUSH(){
  // console.log(pagesetting)
  const bodyCSSFrameworkArray = pagesetting.css_framework.split(',');
  bodyCSSFrameworkArray.forEach(framework => {
    CSSFRAMEWORKArray.forEach(element => {
      if(framework === element.value){
        CSSFrameworkSelected.push(element)
      }
    });
  });
  const psanim = pagesetting.animation_array.split(',');
  psanim.forEach(anim => {
    JSLibraryArray.forEach(element => {
      if(element.value === anim){
        let newAnimationArray = 
        { name: element.name, value: element.value, link: element.link, rawLink : element.rawLink};
        animationArray.push(newAnimationArray)
      }
    });
    // console.log(animationArray)
  });
  // console.log(CSSFrameworkSelected)
  var elements = document.querySelectorAll('[data-css-framework]');
  for (var i = 0; i < elements.length; i++) {
  elements[i].parentNode.removeChild(elements[i]);
  }
  
  CSSFrameworkSelected.forEach(function(animation) {
  let animationValue = animation.value;
  let animationrawLink = animation.rawLink;
  let newLink = document.createElement("link");
    newLink.id = animationValue;
    newLink.setAttribute("rel", "stylesheet");
    newLink.setAttribute("href", animationrawLink);
    newLink.setAttribute("data-css-framework", "true");
    let linkfont = document.getElementById("fontStyles");
    linkfont.parentElement.insertBefore(newLink, linkfont);
  
  });
  fontAppend();
    }

const fontAppend = () => {
  JSAnimationLinkPush();
   const FontSelected = pagesetting.font_selection.split(',').filter(item => item.trim() !== "");
  //  console.log(FontSelected)
   FontSelected.forEach(function(font) {
     var a = `https://fonts.googleapis.com/css2?family=`;
     var b = font;
     var c = `:wght@100;200;300;400;500;600;700;800;900&amp;display=swap`;
     var link = document.createElement("link");
     link.rel = "stylesheet";
     link.href = a + b + c;
     link.setAttribute("data-font-styles", "true");
     document.head.appendChild(link);
   });
   cssPageSetting();
}

const cssPageSetting = ()=> {
  let additionalCSS = pagesetting.additional_css;
  //----------------------------------------------
  let bodyFont = '';
  let pagesettingbodyfont = pagesetting.body_font;
  if(pagesettingbodyfont !== ''){
    bodyFont = `font-family: ${pagesettingbodyfont};\n`;
  }
  //---------------------------------------------
  let overFlowX = '';
  let bodyOverflowX = pagesetting.overflow_x;
  if(bodyOverflowX !== ''){
    overFlowX = `overflow-x: ${bodyOverflowX};\n`
  }
  let background = '';
  let bodyBackground = pagesetting.background_val;
  if(bodyBackground !== ''){
    background = `background-color: ${bodyBackground};\n`
  }
  //---------------------------------------------
  let bodyMarginParam = pagesetting.margin_parameter;
  let marginTop = pagesetting.margin_top;
  let marginRight = pagesetting.margin_right;
  let marginBottom = pagesetting.margin_bottom;
  let marginLeft = pagesetting.margin_left;
  let margin = `margin: ${marginTop}${bodyMarginParam} ${marginRight}${bodyMarginParam} ${marginBottom}${bodyMarginParam} ${marginLeft}${bodyMarginParam};\n`;
  //---------------------------------------------
  let bodyPaddingParam = pagesetting.padding_parameter;
  let paddingTop = pagesetting.padding_top;
  let paddingRight = pagesetting.padding_right;
  let paddingBottom = pagesetting.padding_bottom;
  let paddingLeft = pagesetting.padding_left;
  let padding = `padding: ${paddingTop}${bodyPaddingParam} ${paddingRight}${bodyPaddingParam} ${paddingBottom}${bodyPaddingParam} ${paddingLeft}${bodyPaddingParam};\n`;
  //---------------------------------------------
  const bodyCss = margin + padding + background + overFlowX + bodyFont + additionalCSS;
  //---------------------------------------------
  let bodyStyle = document.createElement('style');
  bodyStyle.id = 'bodyStyle';
  bodyStyle.innerHTML = `body {\n` + bodyCss + '}';
  document.body.appendChild(bodyStyle);
  //---------------------------------------------
  const customCSS = document.getElementById('custom-css');
  customCSS.innerHTML = pagesetting.custom_css;
  if(customCSS === ''){
    // console.log('oje')
    customCSS = `@media only screen and (orientation: landscape) {
      html {
        font-size: 1vw;
      }
    }
    
    @media only screen and (orientation: portrait) {
      html {
        font-size: 2vh;
      }
    }`
  }
  const customJS = document.getElementById('custom-js');
  setTimeout(() => {
    customJS.innerHTML = pagesetting.custom_js;
  }, 100);
  //---------------------------------------------
  editinnerHTML();
  //---------------------------------------------
}

const editinnerHTML = () => {
  // const content = component.content;
  const content = content_txt;
  const container = document.getElementById('slice-window-container');
  container.innerHTML = content;
  ExecutingScriptTag(container);
  addSlicerClass();
}

const addSlicerClass = () => {
  const lazydev = document.querySelectorAll('[lazydev]');
  lazydev.forEach(element => {
    const identity = element.getAttribute('data-identity');

    const onClickLink = element.getAttribute('onClickLink');
    if (onClickLink && onClickLink !== '') {
        element.removeAttribute('onclick');
    }
    if(identity === 'Main Container' || identity === 'Child Container' 
    || identity === 'Wrapper')
    {
      element.setAttribute('slice-mode', 'idle');
      element.classList.add('slicer-idle');
      // console.log(element.id+ " " + identity)
    }
  });
  turnOff();
  closeLoadingScreen();
}

const closeLoadingScreen = () => {
  setTimeout(() => {
    const loadingSection = document.getElementById('slicer-fixed-loading');
  loadingSection.classList.add('slicer-prepare-end');
  setTimeout(() => {
    loadingSection.remove();
  }, 2100);
  }, 1000);
}