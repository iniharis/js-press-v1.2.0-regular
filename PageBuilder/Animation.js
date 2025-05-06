import { mainContainerTarget } from './newChildContainer.js';
import { deleteSelectedElement } from './DeleteElement.js';
import { tabletResponsiveBreakPoint,mobileResponsiveBreakPoint } from './EditBody.js';
import { editSelector } from './selector.js';
import {animationArray} from './animatecontent.js';
import {font_awesome_cdn} from './main.js';


let editorValue = "";

export {editorValue};

//Prevent Default
function preventDefault(event) {
  event.preventDefault();
}

////
////
let contentWrapper = document.getElementById("container");
function gsap80(){
  gsap.to(contentWrapper, {
    marginLeft: "20%",
    width: "80%",
    duration: 0.3, // Durasi animasi dalam detik
    ease: "power2.out" // Efek easing untuk animasi
  });
}

export { gsap80 }
//------
function gsap95(){

  gsap.to(contentWrapper, {
    marginLeft: "5%",
    width: "95%",
    duration: 0.3, // Durasi animasi dalam detik
    ease: "power2.out" // Efek easing untuk animasi
  });
  setTimeout(() => {
    contentWrapper.setAttribute('style', 'margin-left: 5%;');
  }, 350);
}

export { gsap95 }
//------
function gsap100(){
  gsap.to(contentWrapper, {
    marginLeft: "0%",
    width: "100%",
    duration: 0.3, // Durasi animasi dalam detik
    ease: "power2.out" // Efek easing untuk animasi
  });
}

export { gsap100 }
//------


var timeline = gsap.timeline();


tippy('#Add-Container',{
    content: "Add New Container",
    placement: 'right',
    //animation: 'scale',
    hideOnClick: true,
    followCursor: 'vertical',
    theme: 'tomato',
  });

  tippy('#Add-built-in',{
    content: "Add Built-in Container",
    placement: 'right',
    //animation: 'scale',
    hideOnClick: true,
    followCursor: 'vertical',
    theme: 'tomato',
  });
  
  tippy('#Add-Div',{
    content: "Add New Child Container",
    placement: 'right',
   // animation: 'scale',
    hideOnClick: true,
    followCursor: 'vertical',
    theme: 'tomato',
  });

  tippy('#Add-Element',{
    content: "Add New Element",
    placement: 'right',
    //animation: 'scale',
    hideOnClick: true,
    followCursor: 'vertical',
    theme: 'tomato',
  });
  
  tippy('#Edit-Element',{
    content: "Open Selector",
    placement: 'right',
   // animation: 'scale',
    hideOnClick: true,
    followCursor: 'vertical',
    theme: 'tomato',
  });

  tippy('#Add-Component-Container',{
    content: "Add Components",
    placement: 'right',
    //animation: 'scale',
    hideOnClick: true,
    followCursor: 'vertical',
    theme: 'tomato',
  });
  
  tippy('#export-page',{
    content: "Export Your Work",
    placement: 'right',
   // animation: 'scale',
    hideOnClick: true,
    followCursor: 'vertical',
    theme: 'tomato',
  });
  
  tippy('#remove-element',{
    content: "Remove Element",
    placement: 'right',
  //  animation: 'scale',
    hideOnClick: true,
    followCursor: 'vertical',
    theme: 'tomato',
  });

  tippy('#Animate-Element',{
    content: "Animate Element",
    placement: 'right',
  //  animation: 'scale',
    hideOnClick: true,
    followCursor: 'vertical',
    theme: 'tomato',
  });
  
  tippy('#minimize-editor',{
    content: "Minimize Editor",
    placement: 'right',
   // animation: 'scale',
    hideOnClick: true,
    followCursor: 'vertical',
    theme: 'tomato',
  });
  
  tippy('#open-navigator',{
    content: "Open Navigator",
    placement: 'right',
   // animation: 'scale',
    hideOnClick: true,
    followCursor: 'vertical',
    theme: 'tomato',
  });
  
  tippy('#open-responsive',{
    content: "Responsive Preview",
    placement: 'right',
   // animation: 'scale',
    hideOnClick: true,
    followCursor: 'vertical',
    theme: 'tomato',
  });
  
  tippy('#Page-builder-setting',{
    content: "Setting",
    placement: 'right',
   // animation: 'scale',
    hideOnClick: true,
    followCursor: 'vertical',
    theme: 'tomato',
  });

    tippy('#drag-element-selector',{
      content: "Move This Element",
      placement: 'bottom',
      // animation: 'scale',
      // hideOnClick: true,
      // followCursor: 'horizontal',
      theme: 'tomato',
    });

    

  
    function StartingProjects(){
    // Hide the menu-controller initially
    gsap.to("#menu-controller", { display: "none" });
    //Open Project Settings
    addOverlay();
    OpenContainerProjectAwal(); ///ini tanda

    // Create the animation for the main-controller
    gsap.from("#main-controller", {
      x: -10,
      opacity: 0,
      duration: 1, // Animation duration in seconds
     
    });
    }

    export {StartingProjects}

  

  // //Opening
  // // Wait for the document to load
  // document.addEventListener("DOMContentLoaded", function () {
  //   // Hide the menu-controller initially
  //   gsap.to("#menu-controller", { display: "none" });
  //   //Open Project Settings
  //   addOverlay();
  //   OpenContainerProjectAwal(); ///ini tanda

  //   // Create the animation for the main-controller
  //   gsap.from("#main-controller", {
  //     x: -10,
  //     opacity: 0,
  //     duration: 1, // Animation duration in seconds
     
  //   });
  // });

//Animasi Open Project Setting Awal //
function OpenContainerProjectAwal(){
  gsap.to("#Project-Setting", {opacity:1, xPercent: 140, scale:1, delay: 0.3, duration: 1.5, ease: "power2.out"});
}

function addOverlay() {
  var overlay = document.createElement("div");
  overlay.setAttribute("id", "overlay-fixed-container");
  overlay.style.position = "fixed";
  overlay.style.zIndex = "9994";
  overlay.style.height = "100vh";
  overlay.style.width = "100%";
  overlay.style.backgroundColor = "black";
  overlay.style.opacity = "0";

  document.body.appendChild(overlay);
  document.getElementById("SubmitButtonProjectSetting").addEventListener("click", removeOverlay);
  function removeOverlay(){
    let overlays = document.getElementById("overlay-fixed-container");
    gsap.to(overlays, {opacity:0, duration:0.5, oncomplete: function(){
      overlays.remove();
    }});
    document.getElementById("SubmitButtonProjectSetting").removeEventListener("click", removeOverlay);
  }
  gsap.to(overlay, { opacity: 0.1, duration: 0.5, ease: "power2.out" });
}



//Animasi di container responsive
let resButton = document.querySelector("#open-responsive");
resButton.addEventListener("click", openResponsive);

function openResponsive(){
  resButton.removeEventListener("click", openResponsive);
  let viewportWidth = window.innerWidth;
  let viewportHeight = window.innerHeight;
  let tabletwidth = tabletResponsiveBreakPoint;
  let mobilewidth = mobileResponsiveBreakPoint;
  let rangeValue =  viewportWidth.toString();
 //Mode Lama let rangeMax = (viewportWidth * 3).toString();
 let rangeMax = (viewportWidth).toString();
  let rangeMin = "150";
  let rangeStep = (viewportWidth / 300).toString();

let resDiv = document.createElement("DIV");
resDiv.id = "responsive-container";
let resHTML = `
<div>

  <div class="preview" id="res-start">
    <i class="fas fa-play" title="Start Responsive Preview" ></i>
    <p >preview</p>
  </div>

<p style="padding-top: 10px; padding-left: 4px;" id="textWidth">viewport width : 1560px</p>
<i class="fa-solid fa-display res-icon" title="desktop" id="res-desktop"></i>
<i class="fa-solid fa-tablet-screen-button res-icon"title="tablet" id="res-tablet"></i>
<i class="fa-solid fa-mobile-screen res-icon"title="mobile"id="res-mobile"></i>
  <div id="res-close"><p id="close-res">X</p>
  </div>
</div>



<div>
<input type="range" id="res-range" min="${rangeMin}" max="${rangeMax}" value="${rangeValue}" step="${rangeStep}">
</div>`;
resDiv.innerHTML = resHTML;
document.body.appendChild(resDiv);
// 
let range = document.querySelector("#res-range");
let numericValue = range.value;
let textviewPort = document.querySelector("#textWidth");
textviewPort.textContent = `viewport width : ${rangeValue}px`;
//

range.addEventListener("input", ()=>{
let inputValue = range.value;
numericValue = parseInt(inputValue.replace(/,/g, "").split(".")[0]);
  textviewPort.textContent = `viewport width : ${numericValue}px`
  
})

let desktop = document.getElementById("res-desktop");
desktop.addEventListener("click", function(){
  changeviewport(window.innerWidth);
  range.value = window.innerWidth;
  let textviewPort = document.querySelector("#textWidth");
  textviewPort.textContent = `viewport width : ${window.innerWidth}px`;
})

let tablet = document.getElementById("res-tablet");
tablet.addEventListener("click", function(){
  changeviewport(tabletwidth);
  range.value = tabletwidth;
  let textviewPort = document.querySelector("#textWidth");
  textviewPort.textContent = `viewport width : ${tabletwidth}px`;
})

let phone = document.getElementById("res-mobile");
phone.addEventListener("click", function(){
  changeviewport(mobilewidth);
  range.value = mobilewidth;
  let textviewPort = document.querySelector("#textWidth");
  textviewPort.textContent = `viewport width : ${mobilewidth}px`;
})

function changeviewport(width){
  let link = ``;
  const linkFonts = document.querySelectorAll('link[data-font-styles="true"]');
  const linkCSS = document.querySelectorAll('[data-css-framework]');

  if(font_awesome_cdn !== ''){
    link += `\n<link data-font-awesome="true" rel="stylesheet" href="${font_awesome_cdn}">\n`
  }

  linkFonts.forEach((linkElement) => {
    link += linkElement.outerHTML;
  });
  linkCSS.forEach((linkElement) => {
    link += linkElement.outerHTML;
  });
  animationArray.forEach(element => {
    link += element.link;
  });

  let bodyStyle = document.querySelector("#bodyStyle").innerHTML;
  let customStyle = document.querySelector("#Project-Custom-CSS-Style").innerHTML;
  let newbodyStyle = `<style>${bodyStyle}</style><style>${customStyle}</style>`;
  let oldContainer = document.querySelector("#container");
  let newContainer = `<div id="container">${oldContainer.innerHTML}</div>`;
  newContainer = newContainer.replace(/\bdata-href/g, 'href');
  newContainer = newContainer.replace(/\bdata-onclick/g, 'onclick')
  newContainer = newContainer.replace(/href-target/g, 'target');

  let htmlStyle = "";
  if(width > window.innerWidth){
    let zoomMath = window.innerWidth / width;
    htmlStyle = `<style>html{
      width: ${width};
      zoom: ${zoomMath};
    }</style>`
  } else if(width <= window.innerWidth){
    htmlStyle = "";
  }

  let myWindow = window.open("", "", `width=${width}, height=${viewportHeight}`);

  myWindow.focus();  
  let newWindowDocument = myWindow.document;
  newWindowDocument.open();
  newWindowDocument.write(`
    <html>
      <head>
      <meta name="viewport" content="width=${width}, initial-scale=1.0">
      <title>Preview</title>
      
      <link rel="stylesheet" href="https://unpkg.com/tippy.js@6/animations/scale.css"/>
      ${link}
      </head>
      <body>
        ${newContainer}
        ${newbodyStyle}
        ${htmlStyle}
      </body>
    </html>
  `);
  newWindowDocument.close();
  htmlStyle = "";
}



//Start Button
  let resStart = document.getElementById("res-start");
  resStart.addEventListener("click", function(){
    changeviewport(range.value);
  });
  
  //Close Button
let closeRes = document.querySelector("#close-res");
closeRes.addEventListener("click", () => {
let resDiv = document.querySelector("#responsive-container");
gsap.to(resDiv, {
  y: "-120%",
  duration: 0.5,
  onComplete: function() {
    resDiv.remove();
    resButton.addEventListener("click", openResponsive);
  }
});

})
}


function changeviewport2(width){
  let viewportWidth = window.innerWidth;
  let viewportHeight = window.innerHeight;
  let link = ``;
  const linkElements = document.querySelectorAll('link[data-font-styles="true"]');
  
  linkElements.forEach((linkElement) => {
    link += linkElement.outerHTML;
  });
  let bodyStyle = document.querySelector("#bodyStyle").innerHTML;
  let customStyle = document.querySelector("#Project-Custom-CSS-Style").innerHTML;
  let customJS = document.querySelector("#bodyScript").innerHTML;
  let newbodyStyle = `<style>${bodyStyle}</style><style>${customStyle}</style><script>${customJS}</script>`;
  let oldContainer = document.querySelector("#container");
  let newContainer = `<div id="container">${oldContainer.innerHTML}</div>`;
  newContainer = newContainer.replace(/\bdata-href/g, 'href');
  newContainer = newContainer.replace(/href-target/g, 'target');

  let htmlStyle = "";
  if(width > window.innerWidth){
    let zoomMath = window.innerWidth / width;
    htmlStyle = `<style>html{
      width: ${width};
      zoom: ${zoomMath};
    }</style>`
  } else if(width <= window.innerWidth){
    htmlStyle = "";
  }

  let myWindow = window.open("", "", `width=${width}, height=${viewportHeight}`);

  myWindow.focus();  
  let newWindowDocument = myWindow.document;
  newWindowDocument.open();
  newWindowDocument.write(`
    <html>
      <head>
      <meta name="viewport" content="width=${width}, initial-scale=1.0">
      <title>Preview</title>
      <link href="https://vjs.zencdn.net/8.3.0/video-js.css" rel="stylesheet" />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js"></script>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
      <link rel="stylesheet" href="https://unpkg.com/tippy.js@6/animations/scale.css"/>
      ${link}
      </head>
      <body>
        ${newContainer}
        ${newbodyStyle}
        ${htmlStyle}
        <script src="https://vjs.zencdn.net/8.3.0/video.min.js"></script>
      </body>
    </html>
  `);
  newWindowDocument.close();
  htmlStyle = "";
}

export {changeviewport2};

///



//Animasi Close Project Setting
document.getElementById("SubmitButtonProjectSetting").addEventListener("click", preventDefault);
document.getElementById("SubmitButtonProjectSetting").addEventListener("click", function(){
   
    gsap.to("#Project-Setting", { opacity: 0, xPercent: 0, scale: 0.6, delay: 0, duration: 0.9, ease: "power2.out" });
    gsap.to("#Project-Setting", { display: "none",delay: 1.6, });
   
})

//Animasi Close Menu

// document.getElementById("close-menu").addEventListener("click", function(){
//   closemenufuncAnim();
// })

function closeAnim(){
  editorValue = "from-constructor";
  closemenufuncAnim();
  document.getElementById("close-menu").removeEventListener("click", closeAnim);

}
export {closeAnim};
function closeBodyAnim(){
 
    editorValue = "from-body";
    closemenufuncAnim();
    document.getElementById("close-menu").removeEventListener("click", closeBodyAnim);
  
}
export {closeBodyAnim};


function closemenufuncAnim(){

  let menuController = document.getElementById("menu-controller");
    let maincontroller = document.getElementById("main-controller");
  document.getElementById("menu-tab").remove();
  let classmode = document.getElementById("class-mode");
  if(classmode){classmode.remove();}
  document.getElementById("content-menu-controller").remove();
  //Membuat Elemen Baru
  // Membuat elemen div dengan id "menu-tab"
  let menuTab = document.createElement('div');
  menuTab.id = 'menu-tab';
  menuController.appendChild(menuTab);
  let contentMenuController = document.createElement('div');
  contentMenuController.id = "content-menu-controller";
  menuController.appendChild(contentMenuController);
    gsap.to(maincontroller, { xPercent: 0, duration: 0.5});
    gsap.to(menuController, {x: -400, duration: 1, oncomplete: 
    gsap.to(menuController, {display: "none"})
    
});
maincontroller.style.width = "5vw";
  // gsap95();
  gsap100();
  
if(editorValue === "from-constructor"){

  document.getElementById("Edit-Element").click();
}
editorValue = "";
}






  //Animasi Setting
  document.getElementById("Page-builder-setting").addEventListener("click", AnimasiSetting);
  
  export function AnimasiSetting(){
    let menuController = document.getElementById("menu-controller");
    let maincontroller = document.getElementById("main-controller");
    maincontroller.style.width = "25vw";
    gsap.to(maincontroller, { xPercent: -20, duration: 1,});
    gsap.to(menuController, {display: "flex", oncomplete: 
    gsap.to(menuController, { x: 0, duration: 1,})
});
  }
//===================================================================================  
//Popup Section

function PopupAppend(state){
  let innerElement =  `
  <p id="PopupText"></p>
<div id="ClosePopup-container">
  <button id="ClosePopup-Button">CLOSE</button>
</div>
  `
  let popupElement = document.createElement("SECTION");
  popupElement.id = "Popup";
  document.body.appendChild(popupElement);
  popupElement.innerHTML = innerElement;
  gsap.from(popupElement,{
    yPercent: -20, opacity: 0, duration: 1, ease: "circ.easeOut"
  });
  document.addEventListener('mousemove', setPopupPosition);
  document.getElementById("ClosePopup-Button").addEventListener("click", ()=>{
    gsap.to(Popup, { xPercent: 20,opacity: 0,duration: 1.2, ease: "circ.easeOut"});
    if(state){
      let maincontrollezr = document.getElementById("main-controller");
      gsap.to(maincontrollezr, { xPercent: 0, duration: 1,});
      let navigatorOpenButtonDiv = document.getElementById("open-navigator");
      navigatorOpenButtonDiv.click();
    }
    setTimeout(() => {
      popupElement.remove();
      container.style.transform = 'translateY(0)';
      document.removeEventListener('mousemove', setPopupPosition);
    }, 120);
    
  })
}
export { PopupAppend };
function setPopupPosition(event) {
  // Mendapatkan posisi vertikal kursor
  const mouseY = event.clientY;
  // Menentukan batas atas dan bawah untuk mengaktifkan perubahan posisi element
  const upperBound = window.innerHeight * 0.15;  // 1vh di atas monitor
  // Mendapatkan referensi element dengan id 'Popup'
  const container = document.getElementById('container');

  // Mengubah posisi element jika kursor berada di antara batas yang ditentukan
  if (mouseY <= upperBound) {
      // Mengangkat element 5vh ke atas
      container.style.transform = 'translateY(5vh)';
  } else {
      // Mengembalikan element ke posisi semula
      container.style.transform = 'translateY(0)';
  }
}
  //Animasi Buka Child Container
  document.getElementById("Add-Div").addEventListener("click", AnimAddNewChildContainer);

  function AnimAddNewChildContainer(){
    PopupAppend();
    mainContainerTarget();
    let PopupText = document.getElementById("PopupText");
    let maincontroller = document.getElementById("main-controller");
    gsap.to(maincontroller, { xPercent: -150, duration: 1,});
    PopupText.textContent = "Click The Container Target";
    gsap100();
    document.getElementById("ClosePopup-Button").addEventListener("click", closePopupButton);
  }
  document.getElementById("Animate-Element").addEventListener("click", AnimateElement);
  function AnimateElement(){
    let maincontrollerz = document.getElementById("main-controller");
    gsap.to(maincontrollerz, { xPercent: -150, duration: 1,});
    gsap100();
    
  }
  
//Animasi Tutup Child Container
export function closePopupButton(){
  let maincontroller = document.getElementById("main-controller");
  gsap.to(maincontroller, { xPercent: 0, duration: 1,});
  gsap95();
}
//================================================================================
//Animasi Drag
//document.getElementById("Popup").addEventListener("mouseenter", startDrag);

function startDrag(e) {
  e.preventDefault(); // Menghindari seleksi teks saat drag
  let popupDrag = document.getElementById("Popup");
  let startY = e.clientY;
  let initialTop = popupDrag.offsetTop;
  let windowHeight = window.innerHeight;
  let maxHeight = 0.75 * windowHeight; // Maksimum 75% dari tinggi viewport

  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", stopDrag);
  popupDrag.addEventListener("mouseleave", stopDrag);

  function drag(e) {
    let currentY = e.clientY - startY;
    let newTop = initialTop + currentY;

    // Batasan pergerakan pada sumbu Y
    if (newTop > maxHeight) {
      newTop = maxHeight;
    } else if (newTop < 0) {
      newTop = 0;
    }

    popupDrag.style.top = newTop + "px";
  }

  function stopDrag() {
    document.removeEventListener("mousemove", drag);
    document.removeEventListener("mouseup", stopDrag);
    popupDrag.removeEventListener("mouseleave", stopDrag);
  }
}






document.getElementById("remove-element").addEventListener("click", removeElements);

//Animasi Remove Element
function removeElements(){
  PopupAppend();
  deleteSelectedElement(event);
    let PopupText = document.getElementById("PopupText");
    let maincontroller = document.getElementById("main-controller");
    gsap.to(maincontroller, { xPercent: -150, duration: 1,});
    PopupText.textContent = "Click Target To Remove";
    gsap100();
    document.getElementById("ClosePopup-Button").addEventListener("click", closePopupButton);
}
document.getElementById("Edit-Element").addEventListener("click", editElementAnim);

function editElementAnim(){
  PopupAppend();
  let PopupText = document.getElementById("PopupText");
  let maincontroller = document.getElementById("main-controller");
  gsap.to(maincontroller, { xPercent: -150, duration: 1,});
  PopupText.textContent = "Click The Element Target";
  gsap100();
  editSelector();
  document.getElementById("ClosePopup-Button").addEventListener("click", closePopupButton);
}
export {editElementAnim};

export function editDynamicAnim(){
  PopupAppend();
  let PopupText = document.getElementById("PopupText");
  let maincontroller = document.getElementById("main-controller");
  gsap.to(maincontroller, { xPercent: -150, duration: 1,});
  PopupText.textContent = "Click The Container List Target";
  gsap100();
  document.getElementById("ClosePopup-Button").addEventListener("click", closePopupButton);
}
//Add New Elements
let AddNewElements = document.querySelector("#Add-Element");
AddNewElements.addEventListener("click", addNewElementContainerAnim);

function addNewElementContainerAnim(){
  AddNewElements.removeEventListener("click", addNewElementContainerAnim);
    let maincontroller = document.getElementById("main-controller");
    gsap.to(maincontroller, { xPercent: -20, duration: 1,});
    setTimeout(() => {
      gsap.to(maincontroller, { display: "none", duration: 0.1,});
    }, 1000);
    gsap100();
}

export { addNewElementContainerAnim };

function addNewElementContainerAnimEnd(){
    let maincontroller = document.getElementById("main-controller");
    gsap.to(maincontroller, { display: "flex", duration: 0.1,});
    setTimeout(() => {
      gsap.to(maincontroller, { xPercent: 0, duration: 1,});
    }, 100);
    gsap95();
}

export { addNewElementContainerAnimEnd };
