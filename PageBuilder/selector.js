import {deletIDArray,deleteLazydev,deletCssMainClassArray,deleteElement} from './DeleteElement.js';
import { duplicateSelectorOptin } from './duplicate.js';
import { layoutConstructor } from './formEditConstructor.js';
import { NewElementContainer } from './newElement.js'
import { moveElements } from './dragElement.js';
import {copy_style,style_list,paste_style} from './copy_style.js';
import {DynamicContainer_editor,checkDynamicChild,resetDynamic_Content} from './Custom_Data.js';


//membuat popup selector
let popupselector = `
<div id="drag-element-selector" class="selectorchild" title="Move This Element"><i class="fa fa-arrows"></i></div>
<div id="add-element-selector" class="selectorchild" title="Add New Element"><i class="fa fa-plus"></i></div>
<div id="copy-element-selector" class="selectorchild" title="Copy Element"><i class="far fa-copy"></i></div>
<div id="copy_style-element-selector" class="selectorchild" title="Copy Style"><i class="fa-solid fa-paintbrush"></i></div>
<div id="paste_style-element-selector" class="selectorchild" title="Paste Style"><i class="fa-solid fa-palette"></i></div>
<div id="edit-element-selector" class="selectorchild" title="Edit Element"><i class="far fa-edit"></i></div>
<div id="fetch_list-element-selector" class="selectorchild" title="Create Custom Data List"><i class="fa-solid fa-database"></i></div>
<div id="unfetch-element-selector" class="selectorchild" title="Reset Custom Data List"><i class="fa-solid fa-delete-left"></i></div>
<div id="remove-element-selector" class="selectorchild" title="Remove Element"><i class="far fa-trash-alt"></i></div>
<div id="destroy-element-selector" class="selectorchild" title="Cancel Selector"><i class="fa fa-ban"></i></div>
`
;

function selectorDesutructor(){
  let selectorContainer = document.getElementById("selector-container");
  if(selectorContainer){
    selectorContainer.remove();
  }
}
export {selectorDesutructor};

//Fungsi-Fungsi yang ada dalam editSelector
function deleteselectorOption(target,dataFrom){
  let targetElement = target;
  let identity = targetElement.getAttribute("data-identity");
  let targetID = targetElement.getAttribute("id");
  let targetMainClass = targetElement.getAttribute("class");
  let targetlazy = targetElement.getAttribute("lazydev");
  
  if(identity === "Main Container" || identity === "Child Container" || identity === "Wrapper")
  {
  gsap.to(targetElement, {scale:0, duration:0.1});
  deleteElement(targetElement);
  }
  else {
    let targetCSS = document.getElementById("styleid"+targetlazy);
    let targetJS = document.getElementById("scriptid"+targetlazy);
    let targets = [targetElement, targetCSS, targetJS];
    targets.forEach(element => {
      gsap.to(element, {scale:0, duration:0.1});
      deleteElement(element);
    });
  }
  deletIDArray(targetID);
  deleteLazydev(targetlazy);
  deletCssMainClassArray(targetMainClass);
  if(!dataFrom){
    selectorDesutructor();
  }
  return;
}

export {deleteselectorOption};

// document.getElementById("Edit-Element").addEventListener("click", editSelector);

function findLazyDevParent(targetCheck) {
  let currentElement = targetCheck;
  
  while (currentElement) {
    if (currentElement.hasAttribute("lazyDev")) {
      return currentElement;
    }
    
    currentElement = currentElement.parentElement;
  }
  
  return currentElement.parentElement.id; // Jika tidak ditemukan elemen induk dengan atribut "data-lazyDev"
}
// Fungsi dikirim lewat Animation.js
function editSelector(){
    let lazyDevElements = document.querySelectorAll('[lazyDev]');
  lazyDevElements.forEach(function (element) {
    const isDynamic = checkDynamicChild(element,'selector');
    if(!isDynamic){
      element.addEventListener('mouseenter', handleMouseEnter);

      element.addEventListener('click', handleClick);
  
      element.addEventListener('mouseleave', handleMouseLeave);
    }
  });

  let closeButton = document.getElementById("ClosePopup-Button");
  closeButton.addEventListener('click', stopDeleteSelectedElement);
  let target;
  function handleMouseEnter(event) {
    this.classList.add('hoverTargetContainer');
    var parentElement = this.parentNode;
    target = this;

    while (parentElement !== document.body) {
      parentElement.classList.remove('hoverTargetContainer');
      parentElement = parentElement.parentNode;
    }
  }

  function handleClick(event) {
    event.stopPropagation();
    let oldSelector = document.getElementById("selector-container");
    if(oldSelector){
        gsap.to(oldSelector,{scale:0, duration:0.2, oncomplete:function(){
            oldSelector.remove();
        }});
        
    }
    
    let targetElement = findLazyDevParent(target);
    let id = targetElement.getAttribute("id");
    let newSelector = document.createElement("section");
    newSelector.setAttribute("id","selector-container");
    // Mendapatkan koordinat kursor saat mengklik elemen
        let x = event.clientX;
        let y = event.clientY;
        // Mengatur margin left dan margin top sesuai dengan kondisi x
        if (x < 0.5 * window.innerWidth) {
            x += 0;
            } else {
            x -= 200;
            }
            if (y < 0.1 * window.innerHeight) {
                y += 50;
                } else if(y > 0.9 * window.innerHeight) {
                y -= 50;
                } else {
                    y += 0;
                }

    // Mengatur margin left dan margin top sesuai dengan x dan y 
        newSelector.style.marginLeft = `${x}px`;
        newSelector.style.marginTop = `${y}px`;

    newSelector.innerHTML = popupselector;
    document.body.appendChild(newSelector);
    let legit_dynamic_container = false;
    check_Possible_Dynamic_Content();
    function check_Possible_Dynamic_Content(){
      const identity = targetElement.getAttribute('data-identity');
        if(identity === 'Main Container' || identity === 'Child Container' || identity === 'Wrapper'){
          const targetChild = targetElement.querySelectorAll('[lazyDev]');
          targetChild.forEach(child => {
              const identity = child.getAttribute('data-identity');
              if(identity === 'Main Container' || identity === 'Child Container' || identity === 'Wrapper'){
                legit_dynamic_container = true;
              }
          });
        }
        if(legit_dynamic_container === false){
          document.getElementById('fetch_list-element-selector').remove();
        }
    }
    function addEventListeners(targetElement) {
      document.getElementById("remove-element-selector").addEventListener("click", function() {
        deleteselectorOption(targetElement);
      });
      document.getElementById("add-element-selector").addEventListener("click", function(){
        let state = "selectorJS";
        let targetElementIdentity = targetElement.getAttribute('data-identity');
        if(targetElementIdentity === "Main Container" || targetElementIdentity === "Child Container" ||
        targetElementIdentity === "Wrapper"){
          NewElementContainer(targetElement,state);
          newSelector.remove();
          stopDeleteSelectedElement();
          state = "";
        } else {
          let textChange = document.getElementById('PopupText');
          gsap.to(textChange, {opacity: 0, duration: 0.3});
          setTimeout(() => {
            textChange.textContent = "This is Not Container"
          }, 200);
          gsap.to(textChange, {opacity: 1, duration: 0.3, delay:0.3,})
          setTimeout(() => {
            gsap.to(textChange, {opacity: 0, duration: 0.3});
            setTimeout(() => {
              textChange.textContent = "Click The Element Target"
            }, 300);
            gsap.to(textChange, {opacity: 1, duration: 0.3, delay:0.3,})
          }, 1000);
          // stopDeleteSelectedElement();
        }
      });
      document.getElementById("drag-element-selector").addEventListener("click", function() {
        moveElements(targetElement);  
        stopDeleteSelectedElement();
      });
      document.getElementById("copy-element-selector").addEventListener("click", function() {
        duplicateSelectorOptin(event.target);  
      }); 
      document.getElementById('copy_style-element-selector').addEventListener('click', ()=>{
        selectorDesutructor();
        copy_style(targetElement);
      })
      document.getElementById('paste_style-element-selector').addEventListener('click', ()=>{
        selectorDesutructor();
        paste_style(targetElement);
      })
      if(style_list.length < 1){
        document.getElementById('paste_style-element-selector').remove();
      }
      document.getElementById("edit-element-selector").addEventListener("click", function() {
        layoutConstructor(targetElement);
      });
      if(legit_dynamic_container){
        document.getElementById('fetch_list-element-selector').addEventListener('click', ()=>{
          selectorDesutructor();
          DynamicContainer_editor(targetElement,'selector')
        })
      }
      document.getElementById("destroy-element-selector").addEventListener("click", cencelFunction);
      dynamicDataCheck();   
    }
    function dynamicDataCheck(){
      if(!targetElement.hasAttribute('data-dynamic')){
        document.getElementById('unfetch-element-selector').remove();
      } else {
        document.getElementById("add-element-selector").remove();
        document.getElementById("copy-element-selector").remove();
        document.getElementById("edit-element-selector").remove();
        document.getElementById('unfetch-element-selector').addEventListener('click', ()=>{
          resetDynamic_Content(targetElement);
          cencelFunction();
          document.getElementById('ClosePopup-Button').click();
          setTimeout(() => {
            document.getElementById('Edit-Element').click();
          }, 500);
        })
      }
    }    
    addEventListeners(targetElement);
  }

  function handleMouseLeave(event) {
    this.classList.remove('hoverTargetContainer');
  }

  function stopDeleteSelectedElement() {
    lazyDevElements.forEach(function (element) {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('click', handleClick);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.classList.remove('el-lazydev-opacity');
      let selectorContainer = document.getElementById("selector-container");
      let elements = document.querySelectorAll('.hoverTargetContainer');
        elements.forEach(function(element) {
          element.classList.remove('hoverTargetContainer');
        });
    });
    let dragSDSE = document.getElementById("drag-element-selector");
    if(dragSDSE){
      dragSDSE.removeEventListener("click", moveElements);
    }
    let removeSDSE = document.getElementById("remove-element-selector");
    if(removeSDSE){
      removeSDSE.removeEventListener("click", deleteselectorOption);
    }
    let copySDSE = document.getElementById("copy-element-selector");
    if(copySDSE){
      copySDSE.removeEventListener("click", duplicateSelectorOptin);
    }
   let selectorSDSE =  document.getElementById("selector-container");
   if(selectorSDSE){
    selectorSDSE.remove();
   }
    closeButton.removeEventListener('click', stopDeleteSelectedElement);
  }
  return;
}
export { editSelector };

function cencelFunction() {
  if(document.getElementById("remove-element-selector")){
    document.getElementById("remove-element-selector").removeEventListener("click", deleteselectorOption);
  }
  if(document.getElementById("copy-element-selector")){
    document.getElementById("copy-element-selector").removeEventListener("click", duplicateSelectorOptin);
  }
  document.getElementById("selector-container").remove();
return;
}

export { cencelFunction };