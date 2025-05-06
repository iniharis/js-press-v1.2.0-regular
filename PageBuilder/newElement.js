import {addNewElementContainerAnim, addNewElementContainerAnimEnd} from "./Animation.js"
import { LazydevDataList } from './main.js';
import {editSelector} from './selector.js'
import { CSSIdCheckAndPush } from './main.js';
import { CSSMainClassCheckAndPush } from './main.js';
import { SeElementtAttributes } from './dataatribut.js';
import { propertiesEditor } from './ElementBuilder.js';
import {MyComponentList,parentElementAppendChange} from './importcontent.js'
import {AskComponentContent} from './exportcontent.js';
import {builtInComponent} from './built_in_object.js';
import {AppendBuiltInElement} from './built_in_container_function.js'

let state = "";
let closePopupButtonstate = document.getElementById("ClosePopup-Button");
if(closePopupButtonstate){
  closePopupButtonstate.addEventListener("click", ()=>{
    
    return state = "";
  })
}
export {state};
const newContainerDiv = `
<div id="add-new-element-head">
  <div>
    <h3 id="new-element-title">Add New Elements </h3>
    <div id="new-element-close">
      <div  id="new-element-close-container">
      <i class="fas fa-times"></i>
      <span>Close</span>
      </div>
    </div>
  </div>
</div>
<div id="add-new-element-body">
  <div id="new-element-menu">
    <h5 id="html-elements" class="menu-item">HTML Elements</h5>
    <h5 id="Builtin-modules" class="menu-item">Built-in Component</h5>
    <h5 id="My-component" class="menu-item">My Component</h5>
  </div>
  <div id="search-bar-new-element">
    <input type="text" placeholder="Search" id="search-bar-new-element-input">
  </div>
  <div id="add-new-element-content">
  <div id="html-elements-object" class="element-object-container none-mode">
  </div>
  <div id="Builtin-modules-object" class="element-object-container none-mode">
  </div>
  <div id="My-component-object" class="element-object-container none-mode">
  </div>

  </div>
</div>
`;
const htmlObject = [
  {
      name: "H1 Header",
      identity: "Header Text",
      tagName: "H1",
  },
  {
    name: "HTML Content",
    identity: "HTML",
    tagName: "DIV",
},
  {
    name: "H2 Header",
    identity: "Header Text",
    tagName: "H2",
},
{
  name: "H3 Header",
  identity: "Header Text",
  tagName: "H3",
},
{
  name: "H4 Header",
  identity: "Header Text",
  tagName: "H4",
},
{
  name: "H5 Header",
  identity: "Header Text",
  tagName: "H5",
},
{
  name: "H6 Header",
  identity: "Header Text",
  tagName: "H6",
},
  {
    name: "Paragraph",
    identity: "Content Text",
    tagName: "P",
},
{
  name: "Span",
  identity: "Content Text",
  tagName: "SPAN",
},
{
  name: "label",
  identity: "Content Text",
  tagName: "LABEL",
},
{
  name: "A Href",
  identity: "Content Text",
  tagName: "A",
},
//List
{
  name: "Unordered List 1",
  identity: "List",
  tagName: "UL",
},
{
  name: "Unordered List 2",
  identity: "List",
  tagName: "UL",
},
{
  name: "Ordered List",
  identity: "List",
  tagName: "OL",
},
{
  name: "legend",
  identity: "Content Text",
  tagName: "LEGEND",
},
{
  name: "Button",
  identity: "Submit",
  tagName: "BUTTON",
},
//FormField
{
  name: "Input Text",
  identity: "Formfield",
  tagName: "INPUT",
},
{
  name: "Input Number",
  identity: "Formfield",
  tagName: "INPUT",
},
{
  name: "Select Field",
  identity: "Formfield",
  tagName: "SELECT",
},
{
  name: "Input Radio",
  identity: "Formfield",
  tagName: "INPUT",
},
{
  name: "Input Search",
  identity: "Formfield",
  tagName: "INPUT",
},
{
  name: "Input Range",
  identity: "Formfield",
  tagName: "INPUT",
},
{
  name: "Input Checkbox",
  identity: "Formfield",
  tagName: "INPUT",
},
{
  name: "Input Email",
  identity: "Formfield",
  tagName: "INPUT",
},
{
  name: "Input Password",
  identity: "Formfield",
  tagName: "INPUT",
},
{
  name: "TextArea",
  identity: "Formfield",
  tagName: "TEXTAREA",
},
{
  name: "Input Url",
  identity: "Formfield",
  tagName: "INPUT",
},
{
  name: "Input File",
  identity: "Formfield",
  tagName: "INPUT",
},
{
  name: "Input Date",
  identity: "Formfield",
  tagName: "INPUT",
},
{
  name: "Input Time",
  identity: "Formfield",
  tagName: "INPUT",
},
{
  name: "Input Color",
  identity: "Formfield",
  tagName: "INPUT",
},
//--------------------
{
  name: "Div",
  identity: "Wrapper",
  tagName: "DIV",
},
{
  name: "Section",
  identity: "Wrapper",
  tagName: "SECTION",
},
{
  name: "Sidebar",
  identity: "Wrapper",
  tagName: "ASIDE",
},
{
  name: "Main",
  identity: "Wrapper",
  tagName: "MAIN",
},
{
  name: "Canvas",
  identity: "Wrapper",
  tagName: "CANVAS",
},
{
  name: "Navbar",
  identity: "Wrapper",
  tagName: "nav",
},
{
  name: "Fieldset",
  identity: "Wrapper",
  tagName: "fieldset",
},
{
  name: "Form",
  identity: "Wrapper",
  tagName: "FORM",
},
{
  name: "A Href Container",
  identity: "Wrapper",
  tagName: "A",
},
{
  name: "Image",
  identity: "Image",
  tagName: "img",
},
{
  name: "icon",
  identity: "icon",
  tagName: "i",
},
{
  name: "Table1",
  identity: "Table",
  tagName: "TABLE",
},
{
  name: "Table2",
  identity: "Table",
  tagName: "TABLE",
},
// Media
{
  name: "Video Js",
  identity: "HTML",
  tagName: "DIV",
},
{
  name: "embed",
  identity: "HTML",
  tagName: "DIV",
},
//Iframe
{
  name: "Plain Iframe",
  identity: "Iframe",
  tagName: "iframe",
},
{
  name: "Youtube",
  identity: "Iframe",
  tagName: "iframe",
},
];
// Fungsi ======
let AddNewElements = document.querySelector("#Add-Element");
// AddNewElements.addEventListener("click", addNewElementContainerfunc);
AddNewElements.addEventListener("click", PopupElement);

function PopupElement(){
  state = "newElementJS"
  let content = `
  <div class="wrapper">
    <div id="text-wrapper" class="text-wrapper">
      <p class="popup-text">Select Container Target</p>
    </div>
    <div class="button-wrapper" id="close-button-popup-elements">
      <button class="close-button"><i class="fas fa-times"></i></button>
    </div>
  </div>`
  let Popupnew = document.createElement("SECTION");
  Popupnew.id = "Add-New-Element-Popup-Button"
  Popupnew.classList.add("popup-elements");
  Popupnew.innerHTML = content;
  document.body.appendChild(Popupnew);


  document.getElementById("close-button-popup-elements").addEventListener("click", ()=>{
    // gsap.to("#add-new-element-container", {scale: 1, opacity: 1, duration: 0.4});
    gsap.to(Popupnew, {translateY: -40, opacity: 0, duration: 0.2});
    document.getElementById("Add-New-Element-Popup-Button").remove();
    addNewElementContainerAnimEnd();
    state = ""; //disini
    document.getElementById("Add-Element").addEventListener("click", addNewElementContainerAnim);
  })
  Selector();
}
//=======================================


//-- FUNGSI UNTUK SELECTOR DAN EFEK HANDLE

function Selector(){
Closebutton();
// const container = document.getElementById('container');
let elements = document.querySelectorAll('[data-identity="Main Container"], [data-identity="Child Container"], [data-identity="Wrapper"]');
elements.forEach(element => {
  element.addEventListener("mouseenter", handleHover); 
  element.addEventListener("mouseleave", handleOut);
  //element.addEventListener("mouseleave", handleOut);
  element.addEventListener("click", ContainerSelected); //oke
  
});
//----- Efek Handler Mouseover dan Mouseout--------
function handleHover(event) {
  this.classList.add('hoverTargetContainer');
  var parentElement = this.parentNode;

  while (parentElement !== document.body) {
    parentElement.classList.remove('hoverTargetContainer');
    parentElement = parentElement.parentNode;
  }
}

function handleOut(event) {
  this.classList.remove('hoverTargetContainer');
}

function Closebutton(){
  document.getElementById("close-button-popup-elements").addEventListener("click", ()=>{
    elements.forEach(element => {
      element.removeEventListener("mouseenter", handleHover);
      element.removeEventListener("mouseleave", handleOut);
      element.classList.remove('hoverTargetContainer');
    });
  })
}
function ClosePopupSelector(){
  elements.forEach(element => {
    element.removeEventListener("mouseenter", handleHover);
    element.removeEventListener("mouseleave", handleOut);
    element.classList.remove('hoverTargetContainer');
    element.removeEventListener("click", ContainerSelected);
  });
  let newPopups = document.querySelector("#Add-New-Element-Popup-Button");
  if(newPopups){
    gsap.to(newPopups, {translateY: -40, opacity: 0, duration: 0.2});
    document.getElementById("Add-New-Element-Popup-Button").remove();
  }
}
//------------------------

// Memberikan Target
function ContainerSelected(event){
  event.stopPropagation(); // Menghentikan penyebaran event
  elements.forEach(element => 
    { element.removeEventListener("click", ContainerSelected); });
  let target = event.target;
  // let ID = target.id;
  // console.log(ID);
  // let button = document.getElementById("close-button-popup-elements");
  ClosePopupSelector();
  NewElementContainer(target,state);
  // if(button){button.click();}
  // return membuatH1(ID);
  return 
}

return 
}

document.getElementById('Add-Component-Container').addEventListener('click', AddNewElementToContainer);
function AddNewElementToContainer(){
  let target = document.getElementById('container');
  let newContainers = document.createElement("DIV");
  newContainers.id = "add-new-element-container";
  document.body.appendChild(newContainers);
  newContainers.innerHTML = newContainerDiv;
  gsap.from(newContainers, { translateY: 150, opacity: 0, duration: 0.4, });
  //------------------------------------------//
  const title = document.getElementById('new-element-title');
  title.textContent = 'Add Component';
  contentRenderer(target);
  const ElementRemove = ['saved-component-object', 'Builtin-modules-object', 'html-elements-object',]
  ElementRemove.forEach(arr => {
    const element = document.getElementById(arr);
    if(element){
      element.remove();
    }
  });
  const Menu = document.getElementById('new-element-menu');
  Menu.innerHTML = `<h5 id="My-component" class="menu-item-2">Components list</h5>`;
  //------------------------------------------//
  const Mycomponent = document.getElementById('My-component-object');
  Mycomponent.setAttribute('class', 'element-object-container');
  //--------------------------------------------/
  const close = document.getElementById('new-element-close-container');
  close.addEventListener('click', ()=>{
    gsap.to(newContainers, { translateY: 150, opacity: 0, duration: 0.4, });
    setTimeout(() => {
      newContainers.remove();
    }, 410);
  })
}
function NewElementContainer(target,newState)
{
  // console.log(MyComponentList)
  state = newState;
  if(state === ""){
    return;
  }
  let newContainers = document.createElement("DIV");
  newContainers.id = "add-new-element-container";
  document.body.appendChild(newContainers);
  newContainers.innerHTML = newContainerDiv;

  if(state === "selectorJS"){
    let popUpSelectors = document.getElementById("Popup");
    gsap.to(popUpSelectors, {y: -40, duration: 0.4});
  }
  else if(state === "navigator"){
    
  }
   else {

  }

  //Memberikan fungsi kepada tombol Close
  document.querySelector("#new-element-close-container").addEventListener("click", ()=> 
  {
    if (state === "newElementJS") {
      PopupElement();
    } else if(state === "selectorJS") {
      let popUpSelectors = document.getElementById("Popup");
      gsap.to(popUpSelectors, {y: 0, duration: 0.4});
      editSelector();
    }
     else if(state === "navigator"){
      let OpenNavigator = document.getElementById("open-navigator");
      OpenNavigator.click();
     }
    gsap.to(newContainers, { translateY: 150, opacity: 0, duration: 0.4, 
    onComplete: removeContainer, delay: 0.1 });
      function removeContainer()
      {
      newContainers.remove();
      }
      state = "";

      return;
 
  })

 
  // Animasi masuk
  gsap.from(newContainers, { translateY: 250, opacity: 0, duration: 0.5 });
  //------------------------------------------------------
  let menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach(element => 
  {
    let elementID = element.id;
    element.addEventListener("click", ()=> 
    {
        openElementContent(elementID);
        addActiveEffect(element);
    })
  });
    let htmlElementButton = document.querySelector("#html-elements");
    htmlElementButton.click();
//------------------------------------------------------------------------------

  //Fungsi Untuk Membuat Menu Menjadi Terlihat Ketika di Klik---------------------------------------
  function addActiveEffect(element){
    let menuItems = document.querySelectorAll(".menu-item");
    
    menuItems.forEach(element => {
        element.classList.remove("active-object");
    });
    
    element.classList.add("active-object");
    }
    //--------------------------------------------------------------------

    //Fungsi Untuk Membuka 
    function openElementContent(elementID){
  
      let elementSelected = document.getElementById(elementID + "-object");
      //memberikan Animasi
      gsap.to("#add-new-element-content", {opacity: 0,duration: 0.2 });

      function openElementNext(){
      let objectsElements = document.querySelectorAll(".element-object-container");
      objectsElements.forEach(element => {
          element.classList.add("none-mode");
      });
      if(elementSelected){
        elementSelected.classList.remove("none-mode");
        gsap.to("#add-new-element-content", {opacity: 1,duration: 0.2, });
      }
      }
  
      setTimeout(openElementNext, 200);
  }
  //----------------------------------
  // Memanggil Fungsi Render Konten
  contentRenderer(target);
  
  // let targetID = target.id
  // console.log(targetID);
}

export {NewElementContainer};

//==============================================================
//Merender Konten
function contentRenderer(target){
 
  let htmlElement = document.getElementById("html-elements-object");
  htmlObject.forEach(element => {
    let ElementObject = document.createElement("BUTTON");
    let contents = `<i class="fas fa-code"></i> ${element.name} // ${element.identity}`;
    //----
    ElementObject.setAttribute("type", "button");
    ElementObject.setAttribute("data-name", `${element.name}`);
    ElementObject.setAttribute("data-content", `${element.tagName}`);
    ElementObject.setAttribute("data-IdSet", `${element.identity}`);
    ElementObject.classList.add("element-object");
    ElementObject.addEventListener("click", ()=> {appendElement(target,element.tagName,element.identity,element.name)});
    //----
    htmlElement.appendChild(ElementObject);
    ElementObject.innerHTML = contents; 
  });
  //----
  let BuiltInModule = document.getElementById("Builtin-modules-object");
  builtInComponent.forEach(element => {
    let ElementObject = document.createElement("BUTTON");
    let contents = `<i class="fas fa-code"></i> ${element.name} // ${element.alt}`;
    //----
    ElementObject.setAttribute("type", "button");
    ElementObject.setAttribute("data-name", `${element.name}`);
    ElementObject.setAttribute("data-content", `${element.keyword}`);
    ElementObject.setAttribute("data-IdSet", `${element.keyword}`);
    ElementObject.classList.add("element-object");
    ElementObject.addEventListener("click", ()=> {
      // console.log(element.id);
      AppendBuiltInElement(target,element)
      // AskComponentContent(element.id);
    });
    //----
    BuiltInModule.appendChild(ElementObject);
    ElementObject.innerHTML = contents; 
  });
  //----
  let MyComponent = document.getElementById("My-component-object");
  MyComponentList.forEach(element => {
    let ElementObject = document.createElement("BUTTON");
    let contents = `<i class="fas fa-code"></i> ${element.component_name} // ${element.folder}`;
    //----
    ElementObject.setAttribute("type", "button");
    ElementObject.setAttribute("data-name", `${element.component_name}`);
    ElementObject.setAttribute("data-content", `${element.folder}`);
    ElementObject.setAttribute("data-IdSet", `${element.folder}`);
    ElementObject.classList.add("element-object");
    ElementObject.addEventListener("click", ()=> {
      // console.log(element.id);
      parentElementAppendChange(target);
      AskComponentContent(element.id);
    });
    //----
    MyComponent.appendChild(ElementObject);
    ElementObject.innerHTML = contents; 
  });
  //---
   //Memberikan fungsi Search
   let searchinput = document.querySelector("#search-bar-new-element-input");

   const parentSearch = [htmlElement,MyComponent,BuiltInModule];
  
   searchinput.addEventListener("input", ()=>{
    let dataSearch = searchinput.value.toLowerCase();
    parentSearch.forEach(parent => {
      let elements = parent.children;
    for (let i = 0; i < elements.length; i++) {
      let element = elements[i];
      let dataContent = element.getAttribute("data-content").toLowerCase();
      let dataName = element.getAttribute("data-name").toLowerCase();
      let dataIdset = element.getAttribute("data-idset").toLowerCase();
      // console.log(dataContent)
      if (dataContent.includes(dataSearch) || dataIdset.includes(dataSearch) || dataName.includes(dataSearch)) 
      {
        // Tampilkan elemen yang cocok dengan kriteria pencarian
        element.style.display = "block";
      } else {
        // Sembunyikan elemen yang tidak cocok dengan kriteria pencarian
        element.style.display = "none";
      }
    }
    });
    //---------------------------//
   })
  }

//=================================================================

 //====== FUngsi Untuk Append Element ==============================
 function appendElement(targetContainer,tagName,Identity,name){
  //Nomor Unik
let LazyDevOperation = LazydevDataList();
let UniqueNumber = LazyDevOperation;
let UniqueElementID = CSSIdCheckAndPush(`${tagName.toLowerCase()}-${UniqueNumber}`);
let UniqueClass = CSSMainClassCheckAndPush(`${tagName}-${UniqueNumber}`);
let elementName = name;
//Membuat Div Baru 
let NewContainer = document.createElement(tagName);
switch (Identity) {
  case `List`:
    switch (elementName) {
      case `Unordered List 1`:
        NewContainer.innerHTML = `
<li id="list-item-1">List item 1</li>
<li id="list-item-2">List item 2</li>
<li id="list-item-3">List item 3</li>
`;
        break;
        case `Unordered List 2`:
          NewContainer.innerHTML = `
  <li id="list-item-1">List item 1</li>
  <li id="list-item-2">List item 2
    <ul>
      <li id="sublist-item-2-1">Sublist item 2.1</li>
      <li id="sublist-item-2-2">Sublist item 2.2</li>
    </ul>
  </li>
  <li id="list-item-3">List item 3</li>
  `;
          break;
          case `Ordered List`:
            NewContainer.innerHTML = `
    <li>List item 1</li>
    <li>List item 2</li>
    <li>List item 3</li>
    `;
            break;
    
      default:
        break;
    }
        break;
//----------------------------------------
  case `Submit`:
          NewContainer.textContent = "Submit";
        break;
  case `Table`:
    switch (elementName) {
      case `Table1`:
        NewContainer.innerHTML = `
<tr>
<th>Name</th>
<th colspan="2">Contact Info</th>
</tr>
      
<tr>
<td>John Doe</td>
<td>john@example.com</td>
<td>555-1234</td>
</tr>

<tr>
<td>John Doe</td>
<td>john@example.com</td>
<td>555-1234</td>
</tr>

<tr>
<td>John Doe</td>
<td>john@example.com</td>
<td>555-1234</td>
</tr>`;
        break;
      case `Table2`:
        NewContainer.innerHTML = `
<tr id="row1">
<th id="row1col1">Title</th>
<th id="row1col2">Author</th>
<th id="row1col3">Year Published</th>
</tr>

<tr id="row2">
<td id="row2col1">Harry Potter</td>
<td id="row2col2">J.K. Rowling</td>
<td id="row2col3">1997</td>
</tr>

<tr id="row3">
<td id="row3col1">To Kill a Mockingbird</td>
<td id="row3col2">Harper Lee</td>
<td id="row3col3">1960</td>
</tr>`;
        break;
    
      default:
        break;
    }
//---------------------------------------
        break;
  case `HTML`:
    switch (elementName) {
      case `Video Js`:
        NewContainer.innerHTML = `<video class="video-js" 
preload="auto" 
autoplay="true" 
loop="true"
controls="true" 
style=
"width: 100%; 
height: 80vh;" 
data-setup="{}"> 
        
<source src="https://joy1.videvo.net/videvo_files/video/free/video0469/large_watermarked/_import_6174f791da08f5.28309324_preview.mp4" type="video/mp4"> 
        
<p class="vjs-no-js"> To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a> </p> 
</video>`;
        break;
        case `embed`:
          NewContainer.innerHTML = `<embed src="https://www.youtube.com/embed/RzVvThhjAKw" width="100%" height="615">`;
          break;
    
      default:
        NewContainer.textContent = "Write code here";
        break;
    }
        break;
  case `Iframe`:
    switch (elementName) {
      case `Plain Iframe`:
        NewContainer.setAttribute("src", "https://assets.pinterest.com/ext/embed.html?id=615304367855000036");
        NewContainer.setAttribute("frameborder", "0");
        NewContainer.setAttribute("scrolling", "no");
        break;
      case `Youtube`:
        NewContainer.setAttribute("src", "https://www.youtube.com/embed/3_LrurSczvA");
        NewContainer.setAttribute("frameborder", "0");
        NewContainer.setAttribute("scrolling", "no");
        break;
      default:
        break;
    }
  case `Formfield`:
      switch (elementName) {
        case `Input Text`:
          NewContainer.setAttribute("type", "text");
        break;
        case `Select Field`:
          let options = `
          <option value="Value1">Name1</option>
          <option value="Value2" selected>Name2</option>
          <option value="Value3">Name3</option>`
          NewContainer.innerHTML = options;
        break;
        case `Input Number`:
          NewContainer.setAttribute("type", "Number");
        break;
        case `Input Email`:
          NewContainer.setAttribute("type", "email");
        break;
        case `Input Password`:
          NewContainer.setAttribute("type", "password");
        break;
        case `Input Url`:
          NewContainer.setAttribute("type", "url");
        break;
        case `Input Search`:
          NewContainer.setAttribute("type", "search");
        break;
        case `Input File`:
          NewContainer.setAttribute("type", "file");
        break;
        case `Input Date`:
          NewContainer.setAttribute("type", "date");
        break;
        case `Input Time`:
          NewContainer.setAttribute("type", "time");
        break;
        case `Input Color`:
          NewContainer.setAttribute("type", "color");
        break;
        case `Input Radio`:
          NewContainer.setAttribute("type", "radio");
        break;
        case `Input Checkbox`:
          NewContainer.setAttribute("type", "checkbox");
        break;
        case `Input Range`:
          NewContainer.setAttribute("type", "range");
        break;
      
        default:
          break;
      }
    break;

  default:
    break;
}
NewContainer.setAttribute("data-identity", Identity);
NewContainer.setAttribute("id", UniqueElementID);
NewContainer.setAttribute("class", UniqueClass);
NewContainer.setAttribute("Mainclass", UniqueClass);
if(Identity === 'icon'){
  NewContainer.setAttribute("class", UniqueClass+" fas fa-chevron-right");
  NewContainer.setAttribute('icon-class', 'fas fa-chevron-right');
}
NewContainer.classList.add("ChildContainerAnim");
NewContainer.setAttribute("lazyDev", UniqueNumber);
NewContainer.setAttribute("data-change", UniqueNumber);

let NewStyle = document.createElement("Style");
   NewStyle.setAttribute("id", "styleid" + UniqueNumber);
   NewStyle.innerHTML = "";

let NewScript = document.createElement("script");
   NewScript.setAttribute("id", "scriptid" + UniqueNumber);
   NewScript.innerHTML = "";
   if(
    NewContainer.getAttribute('data-identity') === "Wrapper")
   {
    NewContainer.appendChild(NewStyle);
    NewContainer.appendChild(NewScript);
    targetContainer.appendChild(NewContainer);
   } else 
   {
   targetContainer.appendChild(NewContainer);
   targetContainer.appendChild(NewStyle);
   targetContainer.appendChild(NewScript);
   }
  //Mengirimkan Element Untuk di Identifikasi dan diproses lebih lanjut
  elementModifier(NewContainer);
}

//==================================================================

//===== Memodifikasi Element

//=== ELEMENT MODIFIER ===== //
function elementModifier(targetElement){
  let lazyDev = targetElement.getAttribute("lazyDev");
  let identity = targetElement.getAttribute("data-identity");
  let tagName = targetElement.tagName;
  SeElementtAttributes(lazyDev);
  switch (identity) {
    case 'Header Text':
      targetElement.textContent = "Lorem Ipsum Dolor Sit Amet";
      break;
    case 'Content Text':
      switch (tagName) {
        case `LEGEND`:
          targetElement.textContent = "New Legend Text";
          break;
        case `LABEL`:
            targetElement.textContent = "New Label";
          break;
          case `A`:
            targetElement.textContent = "New Link";
          break;
        default:
          targetElement.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
          break;
      }
      break;
    case 'Image':
      // Tindakan yang akan diambil jika value adalah 'option3'
      targetElement.setAttribute("src", "https://via.placeholder.com/300x300");
      break;
    default:
      // Tidak ada tindakan yang diambil 
      break;
  }
  setTimeout(() => {
    targetElement.classList.remove("ChildContainerAnim");
  }, 1000);
  propertiesEditor(targetElement);
}

// function getAttributeInfo(idtarget,component_name,data_keyword,info) {
//   const target = document.getElementById(idtarget);
//   const innerHTMLTarget = target.innerHTML;
//   const dataLazydev = target.getAttribute('lazydev');

//   if (target) {
//     const attributes = target.attributes;
//     const attributeInfo = [];

//     for (let i = 0; i < attributes.length; i++) {
//       const attributeName = attributes[i].name;
//       const attributeValue = attributes[i].value;

//       if(attributeValue !== ''){
//         attributeInfo.push({
//           name: attributeName,
//           value: attributeValue,
//         });
//       }
//     }
//     const newElement = {
//       name: component_name,
//       keyword: data_keyword,
//       lazydev: dataLazydev,
//       alt: info,
//       content: innerHTMLTarget,
//       dataattribute : attributeInfo,
//     }
//     // console.log(newElement)
//   } else {
//     console.error(`Element with id '${idtarget}' not found.`);
//     return null;
//   }
// }
      

function getAttributeInfo(idtarget,component_name,data_keyword,info) {
  const target = document.getElementById(idtarget);
  const innerHTMLTarget = target.innerHTML;
  const dataLazydev = target.getAttribute('lazydev');

  if (target) {
    const attributes = target.attributes;
    const attributeInfo = [];

    for (let i = 0; i < attributes.length; i++) {
      const attributeName = attributes[i].name;
      const attributeValue = attributes[i].value;

      if(attributeValue !== ''){
        attributeInfo.push({
          name: attributeName,
          value: attributeValue,
        });
      }
    }
    const newElement = {
      name: component_name,
      keyword: data_keyword,
      lazydev: dataLazydev,
      alt: info,
      content: innerHTMLTarget,
      dataattribute : attributeInfo,
    }
    console.log(newElement)
  } else {
    console.error(`Element with id '${idtarget}' not found.`);
    return null;
  }
}
// getAttributeInfo('js-press-comment-section','Comment Section','Comment','Function to see and make a comment');
// getAttributeInfo('hero-page-theme-02','Hero Theme 02','Hero section page','Hero Section');