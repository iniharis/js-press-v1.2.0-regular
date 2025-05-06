import { propertiesEditor } from './ElementBuilder.js';
import {updateFontStyles} from './EditBody.js'
import {owner,ComponentList_Folder} from './importcontent.js';
import {pushAnimationConfig,pushCSSConfig} from './animatecontent.js';

export const getWebConfig = async ()=>{
  const response = await fetch('/api/adm/web-config');
  const data = await response.json();
  const webconfig = data.webConfig;
  // console.log(webconfig);
  pushGoogleFonts(webconfig.google_fonts);
  pushCSSConfig(webconfig.css_framework);
  pushAnimationConfig(webconfig.js_framework);
  fontAwesomeEdit(webconfig.font_awesome_cdn);
} 

export let font_awesome_cdn = `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css`;
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
let currentPageSetting = "";
/// Arrays

//Array Font Selected
var FontSelected = [" "];
export { FontSelected };

//Array Objek Color Pallate
let colorPalette = [ {
    name: 'Main Color',
    value: 'rgba(0, 255, 255, 0.842)'
  } ];

  export { colorPalette };

  function importFontandColorPalateSelected(Pagesetting){
    FontSelected.splice(0, FontSelected.length);
    FontSelected.push("");
    Pagesetting.font_selection.forEach(font => {
      FontSelected.push(font);
    });
    colorPalette.splice(0, colorPalette.length);
    Pagesetting.color_palatte.forEach(color => {
      colorPalette.push(color);
    });
    currentPageSetting = Pagesetting.pagesetting_name;
    updateFontStyles();
  }
  export {importFontandColorPalateSelected}

//Array Font
// export const FontOption = Lazydev_FontOption;
export const FontOption = [];
function pushGoogleFonts(GoogleFont){
  const fonts = GoogleFont.split(',');
  fonts.forEach(font => {
    if(font !== ""){
      FontOption.push(font)
    }
});
}

  //Array LazyDev With Function
let LazyIdNumber = 1;
let LazyDev = [];
let MainClassArray = [];
let CssIdArray = [];
export { LazyDev };
export { MainClassArray };
export { CssIdArray };

//dataGila();
//function dataGila(){
//  for (let i = 0; i < 10000; i++){
//    LazydevDataList();
//  }
//}

function LazydevDataList(){
  function dateToHexMain() {
    const currentTime = Date.now();
    const hexValue = currentTime.toString(16);
    return hexValue;
  }
  const hex = dateToHexMain();
  let LazyDevNewID = hex + `${owner}`;
  // LazyDevNewID = LazyDevNewID.replace("a", "");
  // LazyDevNewID = parseInt(LazyDevNewID);
  for (let i = 0; i < LazyDev.length; i++){
      if (LazyDevNewID === LazyDev[i]){
        LazydevDataList();
        return;
      }
  }
  LazyDev.push(LazyDevNewID);
  LazyIdNumber += 1;
  return LazyDevNewID; // Mengembalikan nilai LazyDevNewID
}
export { LazydevDataList };

function CSSIdCheckAndPush(CSSID){
  let NewCSSID = CSSID;
  for (let i = 0; i < CssIdArray.length; i++){
      if (NewCSSID === CssIdArray[i]){
          NewCSSID = "id" + Math.floor(Math.random() * 99) + 1;
          // console.log(NewCSSID);
          CSSIdCheckAndPush(NewCSSID);
          return;
      }
  }
  CssIdArray.push(NewCSSID);
  return NewCSSID; // Mengembalikan nilai NewCSSID
}
export { CSSIdCheckAndPush };

function CSSMainClassCheckAndPush(CSSClass){
  let NewCSSMainClass = CSSClass;
  for (let i = 0; i < MainClassArray.length; i++){
      if (NewCSSMainClass === MainClassArray[i]){
        NewCSSMainClass = "class" + Math.floor(Math.random() * 99) + 1;
          CSSIdCheckAndPush(NewCSSMainClass);
          return;
      }
  }
  MainClassArray.push(NewCSSMainClass);
  return NewCSSMainClass; // Mengembalikan nilai NewCSSMainClass
}
export { CSSMainClassCheckAndPush };

//Array Background Random Beserta Fungsinya
let randomBackgroundArray = [
  '#681313',   // Dark Red
  '#9336B4',   // Purple
  '#FF6384',   // Pink
  '#42A5F5',   // Blue
  '#FFCA28',   // Orange
  '#66BB6A',   // Green
  '#AB47BC',   // Purple
  '#FF7043',   // Coral
  '#26C6DA',   // Turquoise
  '#FFEE58',   // Yellow
  '#EC407A',   // Raspberry
  '#5C6BC0'    // Indigo
];

export { randomBackgroundArray };
function getRandomBackground() {
    let randomIndex = Math.floor(Math.random() * randomBackgroundArray.length);
    let randomBackground = randomBackgroundArray[randomIndex];
    return randomBackground;
  }

  export { getRandomBackground };

///End Arrays


//Project Setting
let myFolders = [];
let activeFolder = "";
let projectName;
let projectFilePath;
let ProjectCSSMainTarget;
export {projectName};
export { ProjectCSSMainTarget };
export {myFolders};
export {activeFolder};

function activeFolderChange(folder){
  activeFolder = folder;
}

export {activeFolderChange}

function changeProjectName(newName){
  projectName = newName;
}

export const cssProjectMainTarget=(cssTarget)=>{
  ProjectCSSMainTarget = cssTarget;
}

export {changeProjectName}

// document.getElementById("SubmitButtonProjectSetting").addEventListener("click", projectSaved);
function changeCSS(){
  const lazydev = document.querySelectorAll('[lazydev]');
  lazydev.forEach(element => {
    propertiesEditor(element)
  });
}

function addfolder(folders,contentFolder){
const importedFolder = JSON.parse(folders);
importedFolder.forEach(element => {
  const Folder = {name: element.folder_name, key: element.folder_key}
  myFolders.push(Folder)
});
activeFolder = contentFolder;
ComponentList_Folder();
}
export {addfolder}
function updateAddFolder(Fname,Fkey){
  const Folder = {name: Fname, key: Fkey};
  myFolders.push(Folder);
  activeFolder = Fkey;
  // console.log(myFolders)
}
export {updateAddFolder}



export function projectSaved(){
let projectNameInput = document.getElementById("ProjectNameInputinput").value;
// let projectFilePathInput = document.getElementById("FilePathinput").value;
let ProjectCSSMainTargetInput = document.getElementById("ProjectCSSTargetinput").value;

projectName = projectNameInput;
// projectFilePath = projectFilePathInput;
ProjectCSSMainTarget = ProjectCSSMainTargetInput;
changeCSS();
} 

//Project Setting legend Label
document.getElementById("ProjectNameInputinput").addEventListener("input", changeProjectNameLabel);

function changeProjectNameLabel() {
let projectNames = document.getElementById("ProjectNameInputinput").value;
let formLegend = document.getElementById("formmakerlegendProjectSetting");
let ProjectNameChanges = "Project Setting (" + projectNames + ")"
formLegend.textContent = ProjectNameChanges;
}

//Color Palatte global Function

function openColorPalateElementbgOpac(targetElement,targetbgcolor,targetbgOP,targetbgResult,
  bgResult,bginput,opacityinput,palatteButton,editorButton,whereToPut){
  colorPalette.forEach((color) => {
    let colorElement = document.createElement('div');
    colorElement.classList.add(`c-01`);
    colorElement.style.backgroundColor = color.value;

    let nameElementDiv = document.createElement('div');
    nameElementDiv.classList.add(`c-02`);
    let nameElement = document.createElement('p');
    nameElement.textContent = color.name;
    nameElementDiv.appendChild(nameElement);

    let colorPaletteItem = document.createElement('div');
    colorPaletteItem.classList.add('color-palatte-collection');
    colorPaletteItem.classList.add('colorpalate-destroy');
    colorPaletteItem.addEventListener("click", function(){
      let target = document.getElementById(targetElement);
      let background = document.getElementById(bgResult);
      let BackgroundColor = document.getElementById(bginput);
      let BackgroundOpacity = document.getElementById(opacityinput);
      background.value = color.value;
      let rgbaValues = color.value.substring(color.value.indexOf("(") + 1, color.value.lastIndexOf(")")).split(",");
      let red = parseInt(rgbaValues[0].trim());
      let green = parseInt(rgbaValues[1].trim());
      let blue = parseInt(rgbaValues[2].trim());
      var hexValue = "#" + ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1);
      // console.log(hexValue);
      BackgroundColor.value = hexValue;
      BackgroundOpacity.value = parseFloat(color.value.slice(color.value.lastIndexOf(",") + 1));
      target.setAttribute(targetbgcolor, hexValue);
      target.setAttribute(targetbgOP, BackgroundOpacity.value);
      target.setAttribute(targetbgResult, hexValue);
      propertiesEditor(target);
      gsap.to(this, {backgroundColor: 'rgba(0, 255, 255, 0.842)', scale: 0.9, opacity: 0.7, duration: 0.1, yoyo: true, repeat: 1});
      //Memanggil Fungsi Edit
      //EditBodySetting();
    })
    colorPaletteItem.appendChild(colorElement);
    colorPaletteItem.appendChild(nameElementDiv);

    // Menempatkan colorPaletteItem setelah elemen dengan id "colorpalattesetupLeged"
    let ElementBefore = document.getElementById(whereToPut);
    ElementBefore.insertAdjacentElement('afterend', colorPaletteItem);
    gsap.from(colorPaletteItem,{opacity:0, scale: 0, duration:0.3, ease: "power2.out",});
  })
  //Menghilangkan Color Input dan Opacity Input
  let colorInput = document.getElementById(bginput).parentElement;
  let opacityInput = document.getElementById(opacityinput).parentElement;
  let result = document.getElementById(bgResult).parentElement;
  gsap.to(colorInput, {scale:0, duration: 0.1});
  gsap.to(colorInput, {display: "none",});
  gsap.to(opacityInput, {scale:0, duration: 0.1});
  gsap.to(opacityInput, {display: "none",});
  gsap.to(result, {opacity:0, duration: 0.1});
  //Menghilangkan Button Palatte dan membuka Button Color Editor 
  let palate = document.getElementById(palatteButton).parentElement;
  let editor = document.getElementById(editorButton).parentElement;
  gsap.to(palate, {scale:0, duration: 0.1});
  gsap.to(editor, {display: "inline-block", duration: 0.1,});
  gsap.to(editor, {scale:1, duration: 0.2, delay:0.2});
  gsap.to(result, {opacity:1, duration: 0.3, delay: 1});
  gsap.to(palate, {display: "none", delay: 0.02});
}
export{ openColorPalateElementbgOpac };
//-----------------------------------------
function openColorEditorbgOpac(bginput,opacityinput,palatteButton,editorButton){
  let colorPaletteElements = document.querySelectorAll('.colorpalate-destroy');

  colorPaletteElements.forEach(function(element) {
    element.remove();
  });

//Membuka Color Input dan Opacity Input
let colorInput = document.getElementById(bginput).parentElement;
let opacityInput = document.getElementById(opacityinput).parentElement;
gsap.to(colorInput, {display: "inline-block"});
gsap.to(colorInput, {scale:1, duration: 0.3});
gsap.to(opacityInput, {display: "inline-block"});
gsap.to(opacityInput, {scale:1, duration: 0.3});
//Menghilangkan Button Palatte dan membuka Button Color Editor
let palate = document.getElementById(palatteButton).parentElement;
let editor = document.getElementById(editorButton).parentElement;
gsap.to(palate, {display: "inline-block"});
gsap.to(palate, {scale:1, duration: 0.1});
gsap.to(editor, {scale:0, duration: 0.2, delay:0.1});
gsap.to(editor, {display: "none"});
}

export{ openColorEditorbgOpac };
//-------------------------
function openColorPalateElementbg(targetElement,targetcolor,
  bginput,bgInputDiv,
  palatteButton,editorButton,whereToPut){
  colorPalette.forEach((color) => {
    let colorElement = document.createElement('div');
    colorElement.classList.add(`c-01`);
    colorElement.style.backgroundColor = color.value;

    let nameElementDiv = document.createElement('div');
    nameElementDiv.classList.add(`c-02`);
    let nameElement = document.createElement('p');
    nameElement.textContent = color.name;
    nameElementDiv.appendChild(nameElement);

    let colorPaletteItem = document.createElement('div');
    colorPaletteItem.classList.add('color-palatte-collection');
    colorPaletteItem.classList.add('colorpalate-destroy');
    colorPaletteItem.addEventListener("click", function(){
      //let background = document.getElementById(bgResult);
      let colortoChange = document.getElementById(bginput);
      //let BackgroundOpacity = document.getElementById(opacityinput);
      //background.value = color.value;
      let rgbaValues = color.value.substring(color.value.indexOf("(") + 1, color.value.lastIndexOf(")")).split(",");
      let red = parseInt(rgbaValues[0].trim());
      let green = parseInt(rgbaValues[1].trim());
      let blue = parseInt(rgbaValues[2].trim());
      var hexValue = "#" + ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1);
      // console.log(hexValue);
      colortoChange.value = hexValue;
      let target = document.getElementById(targetElement);
      target.setAttribute(targetcolor, hexValue);
      propertiesEditor(target);
      gsap.to(this, {backgroundColor: 'rgba(0, 255, 255, 0.842)', scale: 0.9, opacity: 0.7, duration: 0.1, yoyo: true, repeat: 1});
    })
    colorPaletteItem.appendChild(colorElement);
    colorPaletteItem.appendChild(nameElementDiv);

    // Menempatkan colorPaletteItem setelah elemen dengan id "colorpalattesetupLeged"
    let ElementBefore = document.getElementById(whereToPut);
    ElementBefore.insertAdjacentElement('afterend', colorPaletteItem);
    gsap.from(colorPaletteItem,{opacity:0, scale: 0, duration:0.3, ease: "power2.out",});
  })
  //Menghilangkan Color Input dan Opacity Input
  let colorInput = document.getElementById(bgInputDiv);
  //let opacityInput = document.getElementById(opacityinput).parentElement;
  //let result = document.getElementById(bgResult).parentElement;
  gsap.to(colorInput, {scale:0, duration: 0.1});
  gsap.to(colorInput, {display: "none",});
  //gsap.to(opacityInput, {scale:0, duration: 0.1});
  //gsap.to(opacityInput, {display: "none",});
  //gsap.to(result, {opacity:0, duration: 0.1});
  //Menghilangkan Button Palatte dan membuka Button Color Editor 
  let palate = document.getElementById(palatteButton).parentElement;
  let editor = document.getElementById(editorButton).parentElement;
  gsap.to(palate, {scale:0, duration: 0.1});
  gsap.to(editor, {display: "inline-block", duration: 0.1,});
  gsap.to(editor, {scale:1, duration: 0.2, delay:0.2});
  //gsap.to(result, {opacity:1, duration: 0.3, delay: 1});
}
export{ openColorPalateElementbg };

function openColorEditorbg(bginput,palatteButton,editorButton){
  let colorPaletteElements = document.querySelectorAll('.colorpalate-destroy');

  colorPaletteElements.forEach(function(element) {
    element.remove();
  });

//Membuka Color Input dan Opacity Input
let colorInput = document.getElementById(bginput);
//let opacityInput = document.getElementById(opacityinput).parentElement;
gsap.to(colorInput, {display: "inline-block"});
gsap.to(colorInput, {scale:1, duration: 0.3});
//gsap.to(opacityInput, {display: "inline-block"});
//gsap.to(opacityInput, {scale:1, duration: 0.3});
//Menghilangkan Button Palatte dan membuka Button Color Editor
let palate = document.getElementById(palatteButton).parentElement;
let editor = document.getElementById(editorButton).parentElement;
gsap.to(palate, {display: "inline-block"});
gsap.to(palate, {scale:1, duration: 0.1});
gsap.to(editor, {scale:0, duration: 0.2, delay:0.1});
gsap.to(editor, {display: "none"});
}

export{ openColorEditorbg };

function fontOptions(targetElement) {
  var selectElement = document.getElementById(targetElement);

  // Hapus opsi yang ada sebelumnya, jika ada
  selectElement.innerHTML = '';

  FontSelected.forEach(function(font) {
    var option = document.createElement('option');
    option.value = font;
    option.textContent = font;
    selectElement.appendChild(option);
  });
  
}
export{ fontOptions };

function getrandomNumberHex(konstanta){
  let a1 = getMillisecondsToTargetDate(2023, 5, 21)
  let b1 = Math.floor(Math.random() * 900) + 100;
  let a = a1.toString();
  // console.log(a);
  let b = b1.toString();
  // console.log(b);
  let c = a+b;
  // console.log(c);
  let hexaValue = parseInt(c, 10).toString(16);
  let constant = "newFunc";
  if(konstanta){
    if(konstanta !== ""){
      constant = konstanta;
    }
  }
  let hex = constant + hexaValue + "";
  // console.log(hex);
  return hex
}
export {getrandomNumberHex}
 
function getMillisecondsToTargetDate(year, month, day) {
  const startDate = new Date(year, month - 1, day);
  const timestamp = startDate.getTime();
  const currentTime = new Date().getTime();
  const differenceInMilliseconds = currentTime - timestamp;
  return differenceInMilliseconds;
}

export function isDescendantOrSelf(el, target) {
  let current = el;
  while (current !== null) {
    if (current === target) return true;
    current = current.parentElement;
  }
  return false;
}
export function isAncestorOrSelf(el, target) {
  let current = target;
  while (current !== null) {
    if (current === el) return true;
    current = current.parentElement;
  }
  return false;
}