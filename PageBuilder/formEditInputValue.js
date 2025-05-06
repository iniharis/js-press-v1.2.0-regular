import { propertiesEditor } from './ElementBuilder.js';
import {layoutConstructor} from './formEditConstructor.js';
import {bootstrapclasses,iconFontawesome,fieldIDArray} from './formEditElements.js'
import { CssIdArray, MainClassArray,myFolders } from './main.js';
import {dragTheElement} from './minimize.js'
import {CSSFRAMEWORKArray} from './animatecontent.js'
import {owner} from './importcontent.js';
function inputValueOfFormEdit(elementTarget){
let target = document.getElementById(elementTarget);
let targetidentity = target.getAttribute('data-identity');
// console.log(targetidentity);
// console.log(fieldIDArray)
//---- Framewrok dan icon -----//
const uploadMedia = document.querySelectorAll('.js-media-file');
uploadMedia.forEach(element => {
  element.addEventListener('click', (event) => {
    event.preventDefault();
    mediaUpload(element,target);
  });
});
const addFontIcon = document.getElementById('lazydev-form-icon-add-wrapper');
const fontPositionOption = document.getElementById('lazydev-form-icon-position-wrapper');
if(addFontIcon){
  switch (targetidentity) {
    case 'Header Text':
    case 'Submit':
      iconPositionselectlogic();
        break;
    case 'HTML':
    case 'icon':
        fontPositionOption.remove();
        break;
    default:
        addFontIcon.remove();
        fontPositionOption.remove();
        break;
}

const iconAddButton = document.getElementById('lazydev-form-icon-add-button');
if(iconAddButton){
  iconAddButton.addEventListener('click', ()=>{
    IconClasses('fontawesome-icon');
  })
}

}

const addclasses = document.getElementById('lazydev-form-class-add-wrapper');
if(addclasses){
let removebutton = true;
const availableFramework = ["Bootstrap450"];

CSSFRAMEWORKArray.forEach(framework => {
    if (availableFramework.includes(framework.value)) {
        removebutton = false;
    }
});

if (removebutton) {
    addclasses.remove();
    
}
if(!removebutton){
  const addClassbutton = document.getElementById('lazydev-form-class-add-button');
  addClassbutton.addEventListener('click', ()=>{
    IconClasses('framework-class');
  })
}

}

function iconPositionselectlogic(){
  const iconpositionselect = document.getElementById('lazydev-form-position-select');
  const iconposition = target.getAttribute('data-icon-position');
  if(iconposition){
    iconpositionselect.value = iconposition;
  }
  iconpositionselect.addEventListener('change', ()=>{
    target.setAttribute('data-icon-position', iconpositionselect.value);
    propertiesEditor(target);
  })
}

function IconClasses(state){
  const wrap = document.createElement('section');
  wrap.classList.add('lazydev-container-hider');
  document.body.appendChild(wrap);
  const section = document.createElement('section');
  section.classList.add('class-adder-container');
  section.innerHTML = `
  <div id="class-adder-head" class="class-adder-head" lazydev="18c38def5261">
  <div id="class-adder-title" class="class-adder-title" lazydev="18c38e16a9e1">
  Framework Classlist
  </div>
  
  <input type="search" id="class-adder-search" class="class-adder-search" lazydev="18c3902f9001" placeholder="Search ....">
  <div id="class-adder-close" class="class-adder-close" lazydev="18c38e2c7361">
  Close
  </div>
  
  
  </div>

  <div id="class-adder-added-list" class="class-adder-added-list">
  </div>

  
  <div id="class-adder-body" class="class-adder-body" lazydev="18c38dfc15f1">  
  
  </div>
  `;
  document.body.appendChild(section);
  //----------------------------------------------//
  gsap.to(section, {
    opacity: 1,
    y:0,
    scaleX: 1,
    duration: 0.3,
    ease: 'ease-in'
});

  //----------------------------------------------//
  const buttonClose = document.getElementById('class-adder-close');
  buttonClose.addEventListener('click', ()=>{
    gsap.to(section, {
      opacity: 0,
      y: '60%',
      scaleX: 0,
      duration: 0.3,
      ease: 'ease-in'
  });
  setTimeout(() => {
    section.remove();
    wrap.remove();
  }, 300);
  })
  //----------------------------------------------//
  dragElement();
  function dragElement(){
const headwrapper = document.getElementById('class-adder-head');
const draggableElement = section;
let offsetX, offsetY, isDragging = false;

// Fungsi untuk menangani peristiwa 'mousedown'
function dragStart(event) {
    isDragging = true;

    // Simpan posisi awal mouse terhadap elemen
    offsetX = event.clientX - draggableElement.getBoundingClientRect().left;
    offsetY = event.clientY - draggableElement.getBoundingClientRect().top;
}

// Fungsi untuk menangani peristiwa 'mousemove'
function dragMove(event) {
    if (isDragging) {
        // Hitung posisi baru elemen berdasarkan pergerakan mouse
        const width = window.innerWidth;
        const height = window.innerHeight;

        let newLeft = event.clientX - offsetX;
        let newTop = event.clientY - offsetY;

        if(newLeft <= 0){
            newLeft = 1
        }
        if(newLeft >= width*90/100){
            newLeft = width*80/100
        }
        if(newTop <= 1){
            newTop = 2
        }
        if(newTop >= height*90/100){
            newTop = height*80/100
        }

        // Setel posisi elemen
        draggableElement.style.left = newLeft + 'px';
        draggableElement.style.top = newTop + 'px';
    }
}

// Fungsi untuk menangani peristiwa 'mouseup'
function dragEnd() {
    isDragging = false;
}

// Tambahkan event listener untuk memulai drag
headwrapper.addEventListener('mousedown', dragStart);

// Tambahkan event listener untuk bergerak selama drag
document.addEventListener('mousemove', dragMove);

// Tambahkan event listener untuk mengakhiri drag
document.addEventListener('mouseup', dragEnd);

  }
  //----------------------------------------------//
  if(state === 'framework-class'){
    otherClassFunc();
    const bodysection = document.getElementById('class-adder-body');
    bootstrapclasses.forEach(element => {
      //----------------------------------------------//
      let newkeyword = '';
      newkeyword += element.value;
      element.category.forEach(cat => {
        newkeyword += ` ${cat}`;
      });
      //----------------------------------------------//
      const newclass = document.createElement('div');
      newclass.classList.add('class-adder-class-list');
      newclass.setAttribute('title', element.value);
      newclass.setAttribute('keyword', newkeyword);
      newclass.textContent = `.${element.value}`;
      bodysection.appendChild(newclass);
      //----------------------------------------------//
      newclass.addEventListener('click', ()=>{
        const anotherclass = target.getAttribute('another-class');
        const other_class = target.getAttribute("another-class").split(' ');
        if (!other_class.includes(element.value)) {
        let newvalue = element.value;
        if(anotherclass !== ''){
        newvalue = anotherclass + " " + element.value;
        }
        target.setAttribute('another-class', newvalue);
        SetClass();
        propertiesEditor(target);
        otherClassFunc();
        }
      })
      //----------------------------------------------//
    });
  //----------------------------------------------//
  searchInputClass('class-adder-class-list');
  }
  //----------------------------------------------//
  if(state === 'fontawesome-icon'){
    fontIcon();
    const bodysection = document.getElementById('class-adder-body');
    iconFontawesome.forEach(element => {
      //----------------------------------------------//
      let newkeyword = '';
      newkeyword += element.value;
      element.category.forEach(cat => {
        newkeyword += ` ${cat}`;
      });
      //----------------------------------------------//
      const newclass = document.createElement('div');
      newclass.classList.add('class-adder-icon-list');
      newclass.setAttribute('title', element.value);
      newclass.setAttribute('keyword', newkeyword);
      newclass.innerHTML = `<i class="${element.value}"></i>`;
      bodysection.appendChild(newclass);
      //----------------------------------------------//
      newclass.addEventListener('click', ()=>{
      if(targetidentity !== 'HTML' || targetidentity !== 'icon'){
        target.setAttribute('icon-class', element.value);
        propertiesEditor(target);
        fontIcon();
      }
      if(targetidentity === 'icon'){
        target.setAttribute('icon-class', element.value);
        SetClass();
        propertiesEditor(target);
      }
      if(targetidentity === 'HTML'){
        if(element.value !== ''){
        let htmlCodeEditorinner = document.getElementById("html-inner-content");
        const icon = `\n<i class="${element.value}"></i>`;
        htmlCodeEditorinner.value += icon;
        target.innerHTML += icon;
        }
      }
      })
      //----------------------------------------------//
    });
    searchInputClass('class-adder-icon-list');
  }
  function searchInputClass(classselect){
    const searchinput = document.getElementById('class-adder-search');
    searchinput.addEventListener('input', () => {
      const searchvalue = searchinput.value.trim().toLowerCase();
      const newclass = document.querySelectorAll(`.${classselect}`);
  
      // Hapus semua kelas 'none-mode'
      newclass.forEach(element => {
          element.classList.remove('none-mode');
      });
  
      // Tambahkan kelas 'none-mode' sesuai kondisi pencarian
      if (searchvalue !== '') {
          newclass.forEach(element => {
              const keyword = element.getAttribute('keyword');
              if (!keyword.includes(searchvalue)) {
                  element.classList.add('none-mode');
              }
          });
      }
  });
  }
  function otherClassFunc(){
  let countStart = 1;
  const oldElement = document.querySelectorAll('.lazy-class-added-list');
  if(oldElement){
    oldElement.forEach(element => {
      element.remove();
    });
  }
  //-------------------------------------------//
  const classcontainer = document.getElementById('class-adder-added-list');
  let otherClassAtt = target.getAttribute("another-class").split(' ');
  otherClassAtt = otherClassAtt.filter(item => item !== "");
  // console.log(otherClassAtt);
  otherClassAtt.forEach(element => {
    const ElClass = document.createElement('div');
    ElClass.setAttribute('class', 'lazy-class-added-list');
    ElClass.innerHTML = `
    <div id="lazy-class-added-name" data-class="${element}" class="lazy-class-added-name">
            .${element}
    </div>
    <div id="lazy-class-added-delete-${countStart}" class="lazy-class-added-delete" title="delete" onclicklink="">
            x
    </div>
    `;
    classcontainer.appendChild(ElClass);
  //-------------------------------------------//
    const deleteclass = document.getElementById(`lazy-class-added-delete-${countStart}`);
    deleteclass.addEventListener('click', ()=>{
      ElClass.remove();
      let newattribute = "";
      const newElement = document.querySelectorAll('.lazy-class-added-name');
      newElement.forEach(elementclass => {
        const classattribute = elementclass.getAttribute('data-class');
        newattribute += classattribute+" ";
      });
      target.setAttribute('another-class', newattribute);
      SetClass();
      propertiesEditor(target);
      otherClassFunc();
    })
    countStart ++;
  });
  }
  function fontIcon(){
    let countStart = 1;
    const oldElement = document.querySelectorAll('.lazy-class-added-list');
    if(oldElement){
      oldElement.forEach(element => {
        element.remove();
      });
    }
    //-------------------------------------------//
    const classcontainer = document.getElementById('class-adder-added-list');
    let otherClassAtt = target.getAttribute("icon-class");
    // console.log(otherClassAtt);
    if(otherClassAtt !== ''){
    const ElClass = document.createElement('div');
    ElClass.setAttribute('class', 'lazy-class-added-list');
    ElClass.innerHTML = `
    <div id="lazy-class-added-name" data-class="${otherClassAtt}" class="lazy-class-added-name">
            .${otherClassAtt}
    </div>
    <div id="lazy-class-added-delete-${countStart}" class="lazy-class-added-delete" title="delete" onclicklink="">
            x
    </div>
    `;
    classcontainer.appendChild(ElClass);
  //-------------------------------------------//
    const deleteclass = document.getElementById(`lazy-class-added-delete-${countStart}`);
    deleteclass.addEventListener('click', ()=>{
      target.setAttribute('icon-class', '');
      propertiesEditor(target);
      fontIcon();
    })
    countStart ++;
    }
    }
  }

//------------------Deklarasi Input------------------------------------------------------
//LAYOUT--------------------------------------------
    //FlexBox Properties------------------
let editDisplayinput = document.getElementById("editDisplayinput");
if(editDisplayinput){
    let ValueEditDisplayinput = target.getAttribute("data-display");
    for (let i = 0; i < editDisplayinput.options.length; i++) {
      if (editDisplayinput.options[i].value === ValueEditDisplayinput) {
        editDisplayinput.selectedIndex = i;
        break;
      }
    }
    editDisplayinput.addEventListener("change", function(){
    target.setAttribute("data-display",editDisplayinput.value);
    propertiesEditor(target);
    })
}
//-----------------------------------------------
let selectFlexDirectioninput = document.getElementById("SelectFlexDirectioninput");
if (selectFlexDirectioninput) {
    let valueselectFlexDirectioninput = target.getAttribute("data-flex-direction");
    for (let i = 0; i < selectFlexDirectioninput.options.length; i++) {
      if (selectFlexDirectioninput.options[i].value === valueselectFlexDirectioninput) {
        selectFlexDirectioninput.selectedIndex = i;
        break;
      }
    }
    selectFlexDirectioninput.addEventListener("change", function(){
        target.setAttribute("data-flex-direction",selectFlexDirectioninput.value);
        propertiesEditor(target);})
}
//----------------------------------------------
let selectJustifyContentinput = document.getElementById("selectustifycontentinput");
if (selectJustifyContentinput) {
    let targetValue = target.getAttribute("data-justify-content");
    for (let i = 0; i < selectJustifyContentinput.options.length; i++) {
      if (selectJustifyContentinput.options[i].value === targetValue) {
        selectJustifyContentinput.selectedIndex = i;
        break;
      }
    }
    selectJustifyContentinput.addEventListener("change", function(){
        target.setAttribute("data-justify-content",selectJustifyContentinput.value);
        propertiesEditor(target);})
}
//------------------------------
let selectAlignItemsinput = document.getElementById("select-align-items-input");

if (selectAlignItemsinput) {
    let targetValue = target.getAttribute("data-align-items");
    for (let i = 0; i < selectAlignItemsinput.options.length; i++) {
    if (selectAlignItemsinput.options[i].value === targetValue) {
    selectAlignItemsinput.selectedIndex = i;
    break;}
    }
        selectAlignItemsinput.addEventListener("change", function(){
            target.setAttribute("data-align-items",selectAlignItemsinput.value);
            propertiesEditor(target);})
    }
//--------------------------------------
let selectAlignContentinput = document.getElementById("select-align-content-input");

if (selectAlignContentinput) {
    let targetValue = target.getAttribute("data-align-content");
    for (let i = 0; i < selectAlignContentinput.options.length; i++) {
    if (selectAlignContentinput.options[i].value === targetValue) {
    selectAlignContentinput.selectedIndex = i;
    break;}
    }
        selectAlignContentinput.addEventListener("change", function(){
            target.setAttribute("data-align-content",selectAlignContentinput.value);
            propertiesEditor(target);})
    }
//----------------------------------------------
let selectFlexGAP = document.getElementById("selectflex-gap");

if(selectFlexGAP){
  let targetValue = target.getAttribute("data-flex-gap");
  selectFlexGAP.value = targetValue;
  selectFlexGAP.addEventListener("input", function(){
    
    target.setAttribute("data-flex-gap",selectFlexGAP.value);
    propertiesEditor(target);})
  }
  //----------------------
  let selectFlexWRAP = document.getElementById("selectflexwrapinput");
  
if (selectFlexWRAP) {
  let targetValue = target.getAttribute("data-flex-wrap");
  for (let i = 0; i < selectFlexWRAP.options.length; i++) {
  if (selectFlexWRAP.options[i].value === targetValue) {
  selectFlexWRAP.selectedIndex = i;
  break;}
  }
      selectFlexWRAP.addEventListener("change", function(){
          target.setAttribute("data-flex-wrap",selectFlexWRAP.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------

    //FlexBox Child Properties
let selectFlexGrowinput = document.getElementById("select-flex-grow-input");
if(selectFlexGrowinput){
    let targetValue = target.getAttribute("data-flex-grow");
    selectFlexGrowinput.value = targetValue;
    selectFlexGrowinput.addEventListener("input", function(){
        target.setAttribute("data-flex-grow",selectFlexGrowinput.value);
            propertiesEditor(target);})
}
//----------------------

let selectFlexorder = document.getElementById("select-flex-order-input");
if(selectFlexorder){
let targetValue = target.getAttribute("data-flex-order");
selectFlexorder.value = targetValue;
selectFlexorder.addEventListener("input", function(){
  
  target.setAttribute("data-flex-order",selectFlexorder.value);
  propertiesEditor(target);})
}
//----------------------
// Hover //============
let selectFlexorder_Hover = document.getElementById("select-flex-order-input-hover");
if(selectFlexorder_Hover){
let targetValue = target.getAttribute("data-flex-order-hover");
selectFlexorder_Hover.value = targetValue;
selectFlexorder_Hover.addEventListener("input", function(){
  
  target.setAttribute("data-flex-order-hover",selectFlexorder_Hover.value);
  propertiesEditor(target);})
}
//----------------------
// Active //===========
let selectFlexorder_Active = document.getElementById("select-flex-order-input-active");
if(selectFlexorder_Active){
let targetValue = target.getAttribute("data-flex-order-active");
selectFlexorder_Active.value = targetValue;
selectFlexorder_Active.addEventListener("input", function(){
  
  target.setAttribute("data-flex-order-active",selectFlexorder_Active.value);
  propertiesEditor(target);})
}
//----------------------
// Tablet //===========
let selectFlexorder_Tablet = document.getElementById("select-flex-order-input-tablet");
if(selectFlexorder_Tablet){
let targetValue = target.getAttribute("data-flex-order-tablet");
selectFlexorder_Tablet.value = targetValue;
selectFlexorder_Tablet.addEventListener("input", function(){
  
  target.setAttribute("data-flex-order-tablet",selectFlexorder_Tablet.value);
  propertiesEditor(target);})
}
//----------------------
// Mobile //===========
let selectFlexorder_Mobile = document.getElementById("select-flex-order-input-mobile");
if(selectFlexorder_Mobile){
let targetValue = target.getAttribute("data-flex-order-mobile");
selectFlexorder_Mobile.value = targetValue;
selectFlexorder_Mobile.addEventListener("input", function(){
  
  target.setAttribute("data-flex-order-mobile",selectFlexorder_Mobile.value);
  propertiesEditor(target);})
}
//----------------------

fieldIDArray.forEach(element => {
  if(element.process === 'standard-input'){
    standardInputProcess(element);
  }
  if(element.process === 'standard-select'){
    standardSelectProcess(element)
  }
});

function standardInputProcess(element){
let targetElement = document.getElementById(element.elementID);
if(targetElement){
  let targetValue = target.getAttribute(element.data);
  targetElement.value = targetValue;
  targetElement.addEventListener("input", function(){
      
    target.setAttribute(element.data,targetElement.value);
    propertiesEditor(target);})
}
}

function standardSelectProcess(element){
  let targetElement = document.getElementById(element.elementID);

if (targetElement) {
    let targetValue = target.getAttribute(element.data);
    for (let i = 0; i < targetElement.options.length; i++) {
    if (targetElement.options[i].value === targetValue) {
      targetElement.selectedIndex = i;
    break;}
    }
    targetElement.addEventListener("change", function(){
            target.setAttribute(element.data,targetElement.value);
            propertiesEditor(target);})
    }
}

    //--------------------------------------------------
let flexShrinkEditinput = document.getElementById("flex-shrink-edit-input");

if(flexShrinkEditinput){
    let targetValue = target.getAttribute("data-flex-shrink");
    flexShrinkEditinput.value = targetValue;
    flexShrinkEditinput.addEventListener("input", function(){
      
      target.setAttribute("data-flex-shrink",flexShrinkEditinput.value);
      propertiesEditor(target);})
    }
    //----------------------

    //Layout Properties
let WidthProperties = document.getElementById("width-value-select");

if (WidthProperties) {
    let targetValue = target.getAttribute("data-width-select");
    for (let i = 0; i < WidthProperties.options.length; i++) {
    if (WidthProperties.options[i].value === targetValue) {
    WidthProperties.selectedIndex = i;
    break;}
    }
        WidthProperties.addEventListener("change", function(){
            target.setAttribute("data-width-select",WidthProperties.value);
            propertiesEditor(target);})
    }
    //--------------------------------------------------
let selectElementWidthinput = document.getElementById("selectElementWidthinput");

if (selectElementWidthinput) {
    let targetValue = target.getAttribute("data-width-Parameter");
    for (let i = 0; i < selectElementWidthinput.options.length; i++) {
    if (selectElementWidthinput.options[i].value === targetValue) {
    selectElementWidthinput.selectedIndex = i;
    break;}
    }
        selectElementWidthinput.addEventListener("change", function(){
            target.setAttribute("data-width-Parameter",selectElementWidthinput.value);
            propertiesEditor(target);})
    }
//----------------------------------------------
let widthElementEditNumber = document.getElementById("WidthElementEditinput");
if(widthElementEditNumber){
    let targetValue = target.getAttribute("data-width-value");
    widthElementEditNumber.value = targetValue;
    widthElementEditNumber.addEventListener("input", function(){
        target.setAttribute("data-width-value",widthElementEditNumber.value);
            propertiesEditor(target);})
}
//----------------------
let HeightProperties = document.getElementById("height-value-select");

if (HeightProperties) {
    let targetValue = target.getAttribute("data-height-select");
    for (let i = 0; i < HeightProperties.options.length; i++) {
    if (HeightProperties.options[i].value === targetValue) {
    HeightProperties.selectedIndex = i;
    break;}
    }
        HeightProperties.addEventListener("change", function(){
            target.setAttribute("data-height-select",HeightProperties.value);
            propertiesEditor(target);})
    }
    //--------------------------------------------------
let selectElementHeightinput = document.getElementById("selectElementHeightinput");

if (selectElementHeightinput) {
    let targetValue = target.getAttribute("data-height-Parameter");
    for (let i = 0; i < selectElementHeightinput.options.length; i++) {
    if (selectElementHeightinput.options[i].value === targetValue) {
    selectElementHeightinput.selectedIndex = i;
    break;}
    }
        selectElementHeightinput.addEventListener("change", function(){
            target.setAttribute("data-height-Parameter",selectElementHeightinput.value);
            propertiesEditor(target);})
    }
    //--------------------------------------------------
let heightElementEditinput = document.getElementById("heightElementEditinput");

if(heightElementEditinput){
    let targetValue = target.getAttribute("data-height-value");
    heightElementEditinput.value = targetValue;
    heightElementEditinput.addEventListener("input", function(){
      
      target.setAttribute("data-height-value",heightElementEditinput.value);
      propertiesEditor(target);})
    }
    //----------------------
let elementOverflowXinput = document.getElementById("elementoverflow-xinput");

if(elementOverflowXinput){
    let targetValue = target.getAttribute("data-overflow-x");
    elementOverflowXinput.value = targetValue;
    elementOverflowXinput.addEventListener("input", function(){
      
      target.setAttribute("data-overflow-x",elementOverflowXinput.value);
      propertiesEditor(target);})
    }
    //----------------------
let elementOverflowYinput = document.getElementById("Elementoverflow-yinput");

if(elementOverflowYinput){
    let targetValue = target.getAttribute("data-overflow-y");
    elementOverflowYinput.value = targetValue;
    elementOverflowYinput.addEventListener("input", function(){
      
      target.setAttribute("data-overflow-y",elementOverflowYinput.value);
      propertiesEditor(target);})
    }
    //----------------------
let elementHtmlTaginput = document.getElementById("ElementHtmlTaginput");

if (elementHtmlTaginput) {
    let targetValue = target.tagName;
    for (let i = 0; i < elementHtmlTaginput.options.length; i++) {
    if (elementHtmlTaginput.options[i].value === targetValue) {
    elementHtmlTaginput.selectedIndex = i;
    break;}
    }
    elementHtmlTaginput.addEventListener("change", function() {
        const mainElement = document.createElement(elementHtmlTaginput.value);
  // Menyalin atribut dari elemen <section> ke elemen <main>
  Array.from(target.attributes).forEach(attr => {
    mainElement.setAttribute(attr.name, attr.value);
  });
  // Menyalin konten dari elemen <section> ke elemen <main>
  mainElement.innerHTML = target.innerHTML;
  // Menggantikan elemen <section> dengan elemen <main>
  target.parentNode.replaceChild(mainElement, target);
  target.remove();
  target = mainElement;
       
    });
  }
//--------------------------------------------------
//STYLING
    //Background Properties
    //background-none
    let backgroundNoneCheck = document.getElementById("background-none-input");

    if (backgroundNoneCheck) {
      let targetValue = target.getAttribute("data-background-none");
      if (targetValue === "true") {
        backgroundNoneCheck.checked = true;
      } else {
        backgroundNoneCheck.checked = false;
      }
    
      backgroundNoneCheck.addEventListener("change", function() {
        target.setAttribute("data-background-none", backgroundNoneCheck.checked);
        propertiesEditor(target);
      });
    }
//------------------------------------   

    advanceCheckbox();
    function advanceCheckbox() {
      let advanceBgCheckbox = document.getElementById("advance-background");
      if (advanceBgCheckbox) {
        let elements = document.getElementById("advance-mode-background-div");
        if (advanceBgCheckbox.checked) {
          elements.classList.remove("none-mode");
        } else {
          elements.classList.add("none-mode");
        }
        advanceBgCheckbox.addEventListener("change", advanceCheckbox);
      }
    }
    
    
let elementBackgroundColorinput = document.getElementById("elementBackgroundColorinput");

if(elementBackgroundColorinput){
    let targetValue = target.getAttribute("data-background-color-input");
    elementBackgroundColorinput.value = targetValue;
    elementBackgroundColorinput.addEventListener("input", function(){
      backgroundProcess()
      target.setAttribute("data-background-color-input",elementBackgroundColorinput.value);
      propertiesEditor(target);})
    }
    //----------------------
let elementBackgroundOpacityinput = document.getElementById("elementBackgroundOpacityinput");

if(elementBackgroundOpacityinput){
    let targetValue = target.getAttribute("data-background-opacity-input");
    elementBackgroundOpacityinput.value = targetValue;
    elementBackgroundOpacityinput.addEventListener("input", function(){
      backgroundProcess()
      target.setAttribute("data-background-opacity-input",elementBackgroundOpacityinput.value);
      propertiesEditor(target);})
    }
    //----------------------
let elementBackgroundColorresult = document.getElementById("elementBackgroundColorresult");

if(elementBackgroundColorresult){
    let targetValue = target.getAttribute("data-background-color-result");
    elementBackgroundColorresult.value = targetValue;
    elementBackgroundColorresult.addEventListener("change", function(){
      target.setAttribute("data-background-color-result",elementBackgroundColorresult.value);
      propertiesEditor(target);})
    }
    function backgroundProcess(){
        let bgColor = elementBackgroundColorinput.value;
        let bgopacity = elementBackgroundOpacityinput.value;
        let backgroundcolorValue = "rgba(" +
        parseInt(bgColor.slice(1, 3), 16) + ", " +
        parseInt(bgColor.slice(3, 5), 16) + ", " +
        parseInt(bgColor.slice(5, 7), 16) + ", " +
        bgopacity + ")";

      elementBackgroundColorresult.value = backgroundcolorValue;
      target.setAttribute("data-background-color-result",elementBackgroundColorresult.value);
    }
    //----------------------

//Advance Background----------------------------------------------------------------
let backgroundUrlInput = document.getElementById("background-url-input");
if (backgroundUrlInput) {
  let targetValue = target.getAttribute("data-background-image");
  backgroundUrlInput.value = targetValue;
  backgroundUrlInput.addEventListener("input", function() {
    let inputValue = backgroundUrlInput.value;
    inputValue = inputValue.replace(/"/g, ""); // Menghilangkan tanda kutip ("") dari string
    target.setAttribute("data-background-image", inputValue);
    propertiesEditor(target);
  });
}
let backgroundSizeInput = document.getElementById("background-size-input");
if (backgroundSizeInput) {
let targetValue = target.getAttribute("data-background-image-size");
for (let i = 0; i < backgroundSizeInput.options.length; i++) {
if (backgroundSizeInput.options[i].value === targetValue) {
backgroundSizeInput.selectedIndex = i;
break;}
}
    backgroundSizeInput.addEventListener("change", function(){
        target.setAttribute("data-background-image-size",backgroundSizeInput.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
let backgroundPositionXInput = document.getElementById("background-position-x-input");
if (backgroundPositionXInput) {
let targetValue = target.getAttribute("data-background-image-position-x");
backgroundPositionXInput.value = targetValue;
backgroundPositionXInput.addEventListener("input", function(){
        target.setAttribute("data-background-image-position-x",backgroundPositionXInput.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
let backgroundPositionYInput = document.getElementById("background-position-y-input");
if (backgroundPositionYInput) {
let targetValue = target.getAttribute("data-background-image-position-y");
backgroundPositionYInput.value = targetValue;
backgroundPositionYInput.addEventListener("input", function(){
        target.setAttribute("data-background-image-position-y",backgroundPositionYInput.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
let backgroundRepeat = document.getElementById("background-repeat-input");
if (backgroundRepeat) {
let targetValue = target.getAttribute("data-background-image-repeat");
for (let i = 0; i < backgroundRepeat.options.length; i++) {
if (backgroundRepeat.options[i].value === targetValue) {
backgroundRepeat.selectedIndex = i;
break;}
}
    backgroundRepeat.addEventListener("change", function(){
        target.setAttribute("data-background-image-repeat",backgroundRepeat.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
    
let gradientColor1Input = document.getElementById("gradient-color-1-input");
if(gradientColor1Input){
let targetValue = target.getAttribute("data-background-gradient-color-1");
gradientColor1Input.value = targetValue;
gradientColor1Input.addEventListener("click", firstGradient);
gradientColor1Input.addEventListener("input", function(){
  target.setAttribute("data-background-gradient-color-1",gradientColor1Input.value);
  backgroundGradientProcess1();
  })
}
//----------------------

let gradientOp1Input = document.getElementById("gradient-op-1-input");
if(gradientOp1Input){
let targetValue = target.getAttribute("data-background-gradient-op-1");
gradientOp1Input.value = targetValue;
gradientOp1Input.addEventListener("input", function(){
  
  target.setAttribute("data-background-gradient-op-1",gradientOp1Input.value);
  backgroundGradientProcess1();
  })
}

function backgroundGradientProcess1(){
  let bgColor = gradientColor1Input.value;
  let bgopacity = gradientOp1Input.value;
  let backgroundcolorValue = "rgba(" +
  parseInt(bgColor.slice(1, 3), 16) + ", " +
  parseInt(bgColor.slice(3, 5), 16) + ", " +
  parseInt(bgColor.slice(5, 7), 16) + ", " +
  bgopacity + ")";

target.setAttribute("data-background-gradient-result-1",backgroundcolorValue);
propertiesEditor(target);
}
//----------------------
    
let gradientLocation1Input = document.getElementById("gradient-location-1-input");
let gradientLocation1Number = document.getElementById("gradient-location-1-number");
    if(gradientLocation1Input){
    let targetValue = target.getAttribute("data-background-gradient-location-1");
    gradientLocation1Number.value = targetValue;

    gradientLocation1Input.value = targetValue;
    gradientLocation1Input.addEventListener("input", function(){
      
      target.setAttribute("data-background-gradient-location-1",gradientLocation1Input.value);
      gradientLocation1Number.value = gradientLocation1Input.value;
      propertiesEditor(target);})
    }
    //----------------------
    //2

    let gradientColor2Input = document.getElementById("gradient-color-2-input");
    if(gradientColor2Input){
    let targetValue = target.getAttribute("data-background-gradient-color-2");
    gradientColor2Input.value = targetValue;
    gradientColor2Input.addEventListener("input", function(){
      
      target.setAttribute("data-background-gradient-color-2",gradientColor2Input.value);
      backgroundGradientProcess2();
      })
    }
    //----------------------
    
    let gradientOp2Input = document.getElementById("gradient-op-2-input");
    if(gradientOp2Input){
    let targetValue = target.getAttribute("data-background-gradient-op-2");
    gradientOp2Input.value = targetValue;
    gradientOp2Input.addEventListener("input", function(){
      
      target.setAttribute("data-background-gradient-op-2",gradientOp2Input.value);
      backgroundGradientProcess2();
      })
    }
    
    function backgroundGradientProcess2(){
      let bgColor = gradientColor2Input.value;
      let bgopacity = gradientOp2Input.value;
      let backgroundcolorValue = "rgba(" +
      parseInt(bgColor.slice(1, 3), 16) + ", " +
      parseInt(bgColor.slice(3, 5), 16) + ", " +
      parseInt(bgColor.slice(5, 7), 16) + ", " +
      bgopacity + ")";
    
    target.setAttribute("data-background-gradient-result-2",backgroundcolorValue);
    propertiesEditor(target);
    }
    //----------------------
        
    let gradientLocation2Input = document.getElementById("gradient-location-2-input");
    let gradientLocation2Number = document.getElementById("gradient-location-2-number");
        if(gradientLocation2Input){
        
        let targetValue = target.getAttribute("data-background-gradient-location-2");
        gradientLocation2Number.value = targetValue;
    
        gradientLocation2Input.value = targetValue;
        gradientLocation2Input.addEventListener("input", function(){
          
          target.setAttribute("data-background-gradient-location-2",gradientLocation2Input.value);
          gradientLocation2Number.value = gradientLocation2Input.value;
          propertiesEditor(target);})
        }
        //----------------------
    
 
let gradientTypeInput = document.getElementById("gradient-type-input");
if (gradientTypeInput) {
let targetValue = target.getAttribute("data-background-gradient-type");
for (let i = 0; i < gradientTypeInput.options.length; i++) {
if (gradientTypeInput.options[i].value === targetValue) {
gradientTypeInput.selectedIndex = i;
break;}
}
    gradientTypeInput.addEventListener("change", function(){
        target.setAttribute("data-background-gradient-type",gradientTypeInput.value);
        propertiesEditor(target);})
}
//--------------------------------------------------

let gradientAngleInput = document.getElementById("gradient-angle-input");
let gradientAngleNumber = document.getElementById("gradient-angle-number");
if(gradientAngleInput){
let targetValue = target.getAttribute("data-background-gradient-angle");
gradientAngleNumber.value = targetValue;
gradientAngleInput.value = targetValue;
gradientAngleInput.addEventListener("input", function(){
  
  target.setAttribute("data-background-gradient-angle",gradientAngleInput.value);
  gradientAngleNumber.value = gradientAngleInput.value;
  propertiesEditor(target);})
}
//----------------------
let clearGradientbutton = document.getElementById("clear-gradient-setting");
if(clearGradientbutton){
  clearGradientbutton.addEventListener("click", function(event){
    event.preventDefault();
  });
  clearGradientbutton.addEventListener("click", clearGradient);
}
function clearGradient(){
            target.setAttribute("data-background-gradient-color-1", ``);
            target.setAttribute("data-background-gradient-op-1", ``);
            target.setAttribute("data-background-gradient-result-1", ``);
            target.setAttribute("data-background-gradient-location-1", ``);
            target.setAttribute("data-background-gradient-color-2", ``);
            target.setAttribute("data-background-gradient-op-2", ``);
            target.setAttribute("data-background-gradient-result-2", ``);
            target.setAttribute("data-background-gradient-location-2", ``);
            target.setAttribute("data-background-gradient-type", ``);
            target.setAttribute("data-background-gradient-angle", ``);

gradientColor1Input.value = "";
gradientOp1Input.value = "";
gradientLocation1Input.value = "";
gradientLocation1Number.value = "";
gradientColor2Input.value = "";
gradientOp2Input.value = "";
gradientLocation2Input.value = "";
gradientLocation2Number.value = "";
gradientTypeInput.value = "";
gradientAngleInput.value = "";
gradientAngleNumber.value = "";
propertiesEditor(target);
}

function firstGradient(){
  let attributeS1 = target.getAttribute("data-background-gradient-color-1");
  let attributeS2 = target.getAttribute("data-background-gradient-op-1");
  let attributeS3 = target.getAttribute("data-background-gradient-result-1");
  let attributeS4 = target.getAttribute("data-background-gradient-location-1");
  let attributeS5 = target.getAttribute("data-background-gradient-color-2");
  let attributeS6 = target.getAttribute("data-background-gradient-op-2");
  let attributeS7 = target.getAttribute("data-background-gradient-result-2");
  let attributeS8 = target.getAttribute("data-background-gradient-location-2");
  let attributeS9 = target.getAttribute("data-background-gradient-type");
  let attributeS10 = target.getAttribute("data-background-gradient-angle");

  let gradientAttr = attributeS1 + attributeS2 +  attributeS3 +  attributeS4 + 
  attributeS5 +  attributeS6 +  attributeS7 +  attributeS8 +  attributeS9 +  attributeS10;
  if (gradientAttr === ""){
    target.setAttribute("data-background-gradient-color-1", `red`);
            target.setAttribute("data-background-gradient-op-1", `1`);
            target.setAttribute("data-background-gradient-result-1", `red`);
            target.setAttribute("data-background-gradient-location-1", `10`);
            target.setAttribute("data-background-gradient-color-2", `blue`);
            target.setAttribute("data-background-gradient-op-2", `0.4`);
            target.setAttribute("data-background-gradient-result-2", `blue`);
            target.setAttribute("data-background-gradient-location-2", `90`);
            target.setAttribute("data-background-gradient-type", `linear-gradient`);
            target.setAttribute("data-background-gradient-angle", `10`);
            inputValueOfFormEdit(target);
  } 
}

//Proses Perubahan
//hover
let backgroundUrlInput_hover = document.getElementById("background-url-input-hover");
if (backgroundUrlInput_hover) {
  let targetValue = target.getAttribute("data-background-image-hover");
  backgroundUrlInput_hover.value = targetValue;
  backgroundUrlInput_hover.addEventListener("input", function() {
    let inputValue = backgroundUrlInput_hover.value;
    inputValue = inputValue.replace(/"/g, ""); // Menghilangkan tanda kutip ("") dari string
    target.setAttribute("data-background-image-hover", inputValue);
    propertiesEditor(target);
  });
}
let backgroundSizeInput_hover = document.getElementById("background-size-input-hover");
if (backgroundSizeInput_hover) {
let targetValue = target.getAttribute("data-background-image-size-hover");
for (let i = 0; i < backgroundSizeInput_hover.options.length; i++) {
if (backgroundSizeInput_hover.options[i].value === targetValue) {
backgroundSizeInput_hover.selectedIndex = i;
break;}
}
    backgroundSizeInput_hover.addEventListener("change", function(){
        target.setAttribute("data-background-image-size-hover",backgroundSizeInput_hover.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
let backgroundPositionXInput_hover = document.getElementById("background-position-x-input-hover");
if (backgroundPositionXInput_hover) {
let targetValue = target.getAttribute("data-background-image-position-x-hover");
backgroundPositionXInput_hover.value = targetValue;
backgroundPositionXInput_hover.addEventListener("input", function(){
        target.setAttribute("data-background-image-position-x-hover",backgroundPositionXInput_hover.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
let backgroundPositionYInput_hover = document.getElementById("background-position-y-input-hover");
if (backgroundPositionYInput_hover) {
let targetValue = target.getAttribute("data-background-image-position-y-hover");
backgroundPositionYInput_hover.value = targetValue;
backgroundPositionYInput_hover.addEventListener("input", function(){
        target.setAttribute("data-background-image-position-y-hover",backgroundPositionYInput_hover.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
let backgroundRepeat_hover = document.getElementById("background-repeat-input-hover");
if (backgroundRepeat_hover) {
let targetValue = target.getAttribute("data-background-image-repeat-hover");
for (let i = 0; i < backgroundRepeat_hover.options.length; i++) {
if (backgroundRepeat_hover.options[i].value === targetValue) {
backgroundRepeat_hover.selectedIndex = i;
break;}
}
backgroundRepeat_hover.addEventListener("change", function(){
        target.setAttribute("data-background-image-repeat-hover",backgroundRepeat_hover.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
    
let gradientColor1Input_hover = document.getElementById("gradient-color-1-input-hover");
if(gradientColor1Input_hover){
let targetValue = target.getAttribute("data-background-gradient-color-1-hover");
gradientColor1Input_hover.value = targetValue;
gradientColor1Input_hover.addEventListener("click", firstGradient_hover);
gradientColor1Input_hover.addEventListener("input", function(){
  target.setAttribute("data-background-gradient-color-1-hover",gradientColor1Input_hover.value);
  backgroundGradientProcess1_hover();
  })
}
//----------------------

let gradientOp1Input_hover = document.getElementById("gradient-op-1-input-hover");
if(gradientOp1Input_hover){
let targetValue = target.getAttribute("data-background-gradient-op-1-hover");
gradientOp1Input_hover.value = targetValue;
gradientOp1Input_hover.addEventListener("input", function(){
  
  target.setAttribute("data-background-gradient-op-1-hover",gradientOp1Input_hover.value);
  backgroundGradientProcess1_hover();
  })
}

function backgroundGradientProcess1_hover(){
  let bgColor = gradientColor1Input_hover.value;
  let bgopacity = gradientOp1Input_hover.value;
  let backgroundcolorValue = "rgba(" +
  parseInt(bgColor.slice(1, 3), 16) + ", " +
  parseInt(bgColor.slice(3, 5), 16) + ", " +
  parseInt(bgColor.slice(5, 7), 16) + ", " +
  bgopacity + ")";

target.setAttribute("data-background-gradient-result-1-hover",backgroundcolorValue);
propertiesEditor(target);
}
//----------------------
    
let gradientLocation1Input_hover = document.getElementById("gradient-location-1-input-hover");
let gradientLocation1Number_hover = document.getElementById("gradient-location-1-number-hover");
    if(gradientLocation1Input_hover){
    let targetValue = target.getAttribute("data-background-gradient-location-1-hover");
    gradientLocation1Number_hover.value = targetValue;

    gradientLocation1Input_hover.value = targetValue;
    gradientLocation1Input_hover.addEventListener("input", function(){
      
      target.setAttribute("data-background-gradient-location-1-hover",gradientLocation1Input_hover.value);
      gradientLocation1Number_hover.value = gradientLocation1Input_hover.value;
      propertiesEditor(target);})
    }
    //----------------------
    //2

    let gradientColor2Input_hover = document.getElementById("gradient-color-2-input-hover");
    if(gradientColor2Input_hover){
    let targetValue = target.getAttribute("data-background-gradient-color-2-hover");
    gradientColor2Input_hover.value = targetValue;
    gradientColor2Input_hover.addEventListener("input", function(){
      
      target.setAttribute("data-background-gradient-color-2-hover",gradientColor2Input_hover.value);
      backgroundGradientProcess2_hover();
      })
    }
    //----------------------
    
    let gradientOp2Input_hover = document.getElementById("gradient-op-2-input-hover");
    if(gradientOp2Input_hover){
    let targetValue = target.getAttribute("data-background-gradient-op-2-hover");
    gradientOp2Input_hover.value = targetValue;
    gradientOp2Input_hover.addEventListener("input", function(){
      
      target.setAttribute("data-background-gradient-op-2-hover",gradientOp2Input_hover.value);
      backgroundGradientProcess2_hover();
      })
    }
    
    function backgroundGradientProcess2_hover(){
      let bgColor = gradientColor2Input_hover.value;
      let bgopacity = gradientOp2Input_hover.value;
      let backgroundcolorValue = "rgba(" +
      parseInt(bgColor.slice(1, 3), 16) + ", " +
      parseInt(bgColor.slice(3, 5), 16) + ", " +
      parseInt(bgColor.slice(5, 7), 16) + ", " +
      bgopacity + ")";
    
    target.setAttribute("data-background-gradient-result-2-hover",backgroundcolorValue);
    propertiesEditor(target);
    }
    //----------------------
        
    let gradientLocation2Input_hover = document.getElementById("gradient-location-2-input-hover");
    let gradientLocation2Number_hover = document.getElementById("gradient-location-2-number-hover");
        if(gradientLocation2Input_hover){
        
        let targetValue = target.getAttribute("data-background-gradient-location-2-hover");
        gradientLocation2Number_hover.value = targetValue;
    
        gradientLocation2Input_hover.value = targetValue;
        gradientLocation2Input_hover.addEventListener("input", function(){
          
          target.setAttribute("data-background-gradient-location-2-hover",gradientLocation2Input_hover.value);
          gradientLocation2Number_hover.value = gradientLocation2Input_hover.value;
          propertiesEditor(target);})
        }
        //----------------------
    
 
let gradientTypeInput_hover = document.getElementById("gradient-type-input-hover");
if (gradientTypeInput_hover) {
let targetValue = target.getAttribute("data-background-gradient-type-hover");
for (let i = 0; i < gradientTypeInput_hover.options.length; i++) {
if (gradientTypeInput_hover.options[i].value === targetValue) {
gradientTypeInput.selectedIndex = i;
break;}
}
    gradientTypeInput.addEventListener("change-hover", function(){
        target.setAttribute("data-background-gradient-type-hover",gradientTypeInput_hover.value);
        propertiesEditor(target);})
}
//--------------------------------------------------

let gradientAngleInput_hover = document.getElementById("gradient-angle-input-hover");
let gradientAngleNumber_hover = document.getElementById("gradient-angle-number-hover");
if(gradientAngleInput_hover){
let targetValue = target.getAttribute("data-background-gradient-angle-hover");
gradientAngleNumber_hover.value = targetValue;
gradientAngleInput_hover.value = targetValue;
gradientAngleInput_hover.addEventListener("input", function(){
  
  target.setAttribute("data-background-gradient-angle-hover",gradientAngleInput_hover.value);
  gradientAngleNumber_hover.value = gradientAngleInput_hover.value;
  propertiesEditor(target);})
}
//----------------------
let clearGradientbutton_hover = document.getElementById("clear-gradient-setting-hover");
if(clearGradientbutton_hover){
  clearGradientbutton_hover.addEventListener("click", function(event){
    event.preventDefault();
  });
  clearGradientbutton_hover.addEventListener("click", clearGradient_hover);
}
function clearGradient_hover(){
            target.setAttribute("data-background-gradient-color-1-hover", ``);
            target.setAttribute("data-background-gradient-op-1-hover", ``);
            target.setAttribute("data-background-gradient-result-1-hover", ``);
            target.setAttribute("data-background-gradient-location-1-hover", ``);
            target.setAttribute("data-background-gradient-color-2-hover", ``);
            target.setAttribute("data-background-gradient-op-2-hover", ``);
            target.setAttribute("data-background-gradient-result-2-hover", ``);
            target.setAttribute("data-background-gradient-location-2-hover", ``);
            target.setAttribute("data-background-gradient-type-hover", ``);
            target.setAttribute("data-background-gradient-angle-hover", ``);

gradientColor1Input_hover.value = "";
gradientOp1Input_hover.value = "";
gradientLocation1Input_hover.value = "";
gradientLocation1Number_hover.value = "";
gradientColor2Input_hover.value = "";
gradientOp2Input_hover.value = "";
gradientLocation2Input_hover.value = "";
gradientLocation2Number_hover.value = "";
gradientTypeInput_hover.value = "";
gradientAngleInput_hover.value = "";
gradientAngleNumber_hover.value = "";
propertiesEditor(target);
}

function firstGradient_hover(){
  let attributeS1 = target.getAttribute("data-background-gradient-color-1-hover");
  let attributeS2 = target.getAttribute("data-background-gradient-op-1-hover");
  let attributeS3 = target.getAttribute("data-background-gradient-result-1-hover");
  let attributeS4 = target.getAttribute("data-background-gradient-location-1-hover");
  let attributeS5 = target.getAttribute("data-background-gradient-color-2-hover");
  let attributeS6 = target.getAttribute("data-background-gradient-op-2-hover");
  let attributeS7 = target.getAttribute("data-background-gradient-result-2-hover");
  let attributeS8 = target.getAttribute("data-background-gradient-location-2-hover");
  let attributeS9 = target.getAttribute("data-background-gradient-type-hover");
  let attributeS10 = target.getAttribute("data-background-gradient-angle-hover");

  let gradientAttr = attributeS1 + attributeS2 +  attributeS3 +  attributeS4 + 
  attributeS5 +  attributeS6 +  attributeS7 +  attributeS8 +  attributeS9 +  attributeS10;
  if (gradientAttr === ""){
    target.setAttribute("data-background-gradient-color-1-hover", `red`);
            target.setAttribute("data-background-gradient-op-1-hover", `1`);
            target.setAttribute("data-background-gradient-result-1-hover", `red`);
            target.setAttribute("data-background-gradient-location-1-hover", `10`);
            target.setAttribute("data-background-gradient-color-2-hover", `blue`);
            target.setAttribute("data-background-gradient-op-2-hover", `0.4`);
            target.setAttribute("data-background-gradient-result-2-hover", `blue`);
            target.setAttribute("data-background-gradient-location-2-hover", `90`);
            target.setAttribute("data-background-gradient-type-hover", `linear-gradient`);
            target.setAttribute("data-background-gradient-angle-hover", `10`);
            inputValueOfFormEdit(target);
  } 
}
//active
let backgroundUrlInput_active = document.getElementById("background-url-input-active");
if (backgroundUrlInput_active) {
  let targetValue = target.getAttribute("data-background-image-active");
  backgroundUrlInput_active.value = targetValue;
  backgroundUrlInput_active.addEventListener("input", function() {
    let inputValue = backgroundUrlInput_active.value;
    inputValue = inputValue.replace(/"/g, ""); // Menghilangkan tanda kutip ("") dari string
    target.setAttribute("data-background-image-active", inputValue);
    propertiesEditor(target);
  });
}
let backgroundSizeInput_active = document.getElementById("background-size-input-active");
if (backgroundSizeInput_active) {
let targetValue = target.getAttribute("data-background-image-size-active");
for (let i = 0; i < backgroundSizeInput_active.options.length; i++) {
if (backgroundSizeInput_active.options[i].value === targetValue) {
backgroundSizeInput_active.selectedIndex = i;
break;}
}
    backgroundSizeInput_active.addEventListener("change", function(){
        target.setAttribute("data-background-image-size-active",backgroundSizeInput_active.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
let backgroundPositionXInput_active = document.getElementById("background-position-x-input-active");
if (backgroundPositionXInput_active) {
let targetValue = target.getAttribute("data-background-image-position-x-active");
backgroundPositionXInput_active.value = targetValue;
backgroundPositionXInput_active.addEventListener("input", function(){
        target.setAttribute("data-background-image-position-x-active",backgroundPositionXInput_active.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
let backgroundPositionYInput_active = document.getElementById("background-position-y-input-active");
if (backgroundPositionYInput_active) {
let targetValue = target.getAttribute("data-background-image-position-y-active");
backgroundPositionYInput_active.value = targetValue;
backgroundPositionYInput_active.addEventListener("input", function(){
        target.setAttribute("data-background-image-position-y-active",backgroundPositionYInput_active.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
let backgroundRepeat_active = document.getElementById("background-repeat-input-active");
if (backgroundRepeat_active) {
let targetValue = target.getAttribute("data-background-image-repeat-active");
for (let i = 0; i < backgroundRepeat_active.options.length; i++) {
if (backgroundRepeat_active.options[i].value === targetValue) {
backgroundRepeat_active.selectedIndex = i;
break;}
}
backgroundRepeat_active.addEventListener("change", function(){
        target.setAttribute("data-background-image-repeat-active",backgroundRepeat_active.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
    
let gradientColor1Input_active = document.getElementById("gradient-color-1-input-active");
if(gradientColor1Input_active){
let targetValue = target.getAttribute("data-background-gradient-color-1-active");
gradientColor1Input_active.value = targetValue;
gradientColor1Input_active.addEventListener("click", firstGradient_active);
gradientColor1Input_active.addEventListener("input", function(){
  target.setAttribute("data-background-gradient-color-1-active",gradientColor1Input_active.value);
  backgroundGradientProcess1_active();
  })
}
//----------------------

let gradientOp1Input_active = document.getElementById("gradient-op-1-input-active");
if(gradientOp1Input_active){
let targetValue = target.getAttribute("data-background-gradient-op-1-active");
gradientOp1Input_active.value = targetValue;
gradientOp1Input_active.addEventListener("input", function(){
  
  target.setAttribute("data-background-gradient-op-1-active",gradientOp1Input_active.value);
  backgroundGradientProcess1_active();
  })
}

function backgroundGradientProcess1_active(){
  let bgColor = gradientColor1Input_active.value;
  let bgopacity = gradientOp1Input_active.value;
  let backgroundcolorValue = "rgba(" +
  parseInt(bgColor.slice(1, 3), 16) + ", " +
  parseInt(bgColor.slice(3, 5), 16) + ", " +
  parseInt(bgColor.slice(5, 7), 16) + ", " +
  bgopacity + ")";

target.setAttribute("data-background-gradient-result-1-active",backgroundcolorValue);
propertiesEditor(target);
}
//----------------------
    
let gradientLocation1Input_active = document.getElementById("gradient-location-1-input-active");
let gradientLocation1Number_active = document.getElementById("gradient-location-1-number-active");
    if(gradientLocation1Input_active){
    let targetValue = target.getAttribute("data-background-gradient-location-1-active");
    gradientLocation1Number_active.value = targetValue;

    gradientLocation1Input_active.value = targetValue;
    gradientLocation1Input_active.addEventListener("input", function(){
      
      target.setAttribute("data-background-gradient-location-1-active",gradientLocation1Input_active.value);
      gradientLocation1Number_active.value = gradientLocation1Input_active.value;
      propertiesEditor(target);})
    }
    //----------------------
    //2

    let gradientColor2Input_active = document.getElementById("gradient-color-2-input-active");
    if(gradientColor2Input_active){
    let targetValue = target.getAttribute("data-background-gradient-color-2-active");
    gradientColor2Input_active.value = targetValue;
    gradientColor2Input_active.addEventListener("input", function(){
      
      target.setAttribute("data-background-gradient-color-2-active",gradientColor2Input_active.value);
      backgroundGradientProcess2_active();
      })
    }
    //----------------------
    
    let gradientOp2Input_active = document.getElementById("gradient-op-2-input-active");
    if(gradientOp2Input_active){
    let targetValue = target.getAttribute("data-background-gradient-op-2-active");
    gradientOp2Input_active.value = targetValue;
    gradientOp2Input_active.addEventListener("input", function(){
      
      target.setAttribute("data-background-gradient-op-2-active",gradientOp2Input_active.value);
      backgroundGradientProcess2_active();
      })
    }
    
    function backgroundGradientProcess2_active(){
      let bgColor = gradientColor2Input_active.value;
      let bgopacity = gradientOp2Input_active.value;
      let backgroundcolorValue = "rgba(" +
      parseInt(bgColor.slice(1, 3), 16) + ", " +
      parseInt(bgColor.slice(3, 5), 16) + ", " +
      parseInt(bgColor.slice(5, 7), 16) + ", " +
      bgopacity + ")";
    
    target.setAttribute("data-background-gradient-result-2-active",backgroundcolorValue);
    propertiesEditor(target);
    }
    //----------------------
        
    let gradientLocation2Input_active = document.getElementById("gradient-location-2-input-active");
    let gradientLocation2Number_active = document.getElementById("gradient-location-2-number-active");
        if(gradientLocation2Input_active){
        
        let targetValue = target.getAttribute("data-background-gradient-location-2-active");
        gradientLocation2Number_active.value = targetValue;
    
        gradientLocation2Input_active.value = targetValue;
        gradientLocation2Input_active.addEventListener("input", function(){
          
          target.setAttribute("data-background-gradient-location-2-active",gradientLocation2Input_active.value);
          gradientLocation2Number_active.value = gradientLocation2Input_active.value;
          propertiesEditor(target);})
        }
        //----------------------
    
 
let gradientTypeInput_active = document.getElementById("gradient-type-input-active");
if (gradientTypeInput_active) {
let targetValue = target.getAttribute("data-background-gradient-type-active");
for (let i = 0; i < gradientTypeInput_active.options.length; i++) {
if (gradientTypeInput_active.options[i].value === targetValue) {
gradientTypeInput.selectedIndex = i;
break;}
}
    gradientTypeInput.addEventListener("change-active", function(){
        target.setAttribute("data-background-gradient-type-active",gradientTypeInput_active.value);
        propertiesEditor(target);})
}
//--------------------------------------------------

let gradientAngleInput_active = document.getElementById("gradient-angle-input-active");
let gradientAngleNumber_active = document.getElementById("gradient-angle-number-active");
if(gradientAngleInput_active){
let targetValue = target.getAttribute("data-background-gradient-angle-active");
gradientAngleNumber_active.value = targetValue;
gradientAngleInput_active.value = targetValue;
gradientAngleInput_active.addEventListener("input", function(){
  
  target.setAttribute("data-background-gradient-angle-active",gradientAngleInput_active.value);
  gradientAngleNumber_active.value = gradientAngleInput_active.value;
  propertiesEditor(target);})
}
//----------------------
let clearGradientbutton_active = document.getElementById("clear-gradient-setting-active");
if(clearGradientbutton_active){
  clearGradientbutton_active.addEventListener("click", function(event){
    event.preventDefault();
  });
  clearGradientbutton_active.addEventListener("click", clearGradient_active);
}
function clearGradient_active(){
            target.setAttribute("data-background-gradient-color-1-active", ``);
            target.setAttribute("data-background-gradient-op-1-active", ``);
            target.setAttribute("data-background-gradient-result-1-active", ``);
            target.setAttribute("data-background-gradient-location-1-active", ``);
            target.setAttribute("data-background-gradient-color-2-active", ``);
            target.setAttribute("data-background-gradient-op-2-active", ``);
            target.setAttribute("data-background-gradient-result-2-active", ``);
            target.setAttribute("data-background-gradient-location-2-active", ``);
            target.setAttribute("data-background-gradient-type-active", ``);
            target.setAttribute("data-background-gradient-angle-active", ``);

gradientColor1Input_active.value = "";
gradientOp1Input_active.value = "";
gradientLocation1Input_active.value = "";
gradientLocation1Number_active.value = "";
gradientColor2Input_active.value = "";
gradientOp2Input_active.value = "";
gradientLocation2Input_active.value = "";
gradientLocation2Number_active.value = "";
gradientTypeInput_active.value = "";
gradientAngleInput_active.value = "";
gradientAngleNumber_active.value = "";
propertiesEditor(target);
}

function firstGradient_active(){
  let attributeS1 = target.getAttribute("data-background-gradient-color-1-active");
  let attributeS2 = target.getAttribute("data-background-gradient-op-1-active");
  let attributeS3 = target.getAttribute("data-background-gradient-result-1-active");
  let attributeS4 = target.getAttribute("data-background-gradient-location-1-active");
  let attributeS5 = target.getAttribute("data-background-gradient-color-2-active");
  let attributeS6 = target.getAttribute("data-background-gradient-op-2-active");
  let attributeS7 = target.getAttribute("data-background-gradient-result-2-active");
  let attributeS8 = target.getAttribute("data-background-gradient-location-2-active");
  let attributeS9 = target.getAttribute("data-background-gradient-type-active");
  let attributeS10 = target.getAttribute("data-background-gradient-angle-active");

  let gradientAttr = attributeS1 + attributeS2 +  attributeS3 +  attributeS4 + 
  attributeS5 +  attributeS6 +  attributeS7 +  attributeS8 +  attributeS9 +  attributeS10;
  if (gradientAttr === ""){
    target.setAttribute("data-background-gradient-color-1-active", `red`);
            target.setAttribute("data-background-gradient-op-1-active", `1`);
            target.setAttribute("data-background-gradient-result-1-active", `red`);
            target.setAttribute("data-background-gradient-location-1-active", `10`);
            target.setAttribute("data-background-gradient-color-2-active", `blue`);
            target.setAttribute("data-background-gradient-op-2-active", `0.4`);
            target.setAttribute("data-background-gradient-result-2-active", `blue`);
            target.setAttribute("data-background-gradient-location-2-active", `90`);
            target.setAttribute("data-background-gradient-type-active", `linear-gradient`);
            target.setAttribute("data-background-gradient-angle-active", `10`);
            inputValueOfFormEdit(target);
  } 
}
//tablet
let backgroundUrlInput_tablet = document.getElementById("background-url-input-tablet");
if (backgroundUrlInput_tablet) {
  let targetValue = target.getAttribute("data-background-image-tablet");
  backgroundUrlInput_tablet.value = targetValue;
  backgroundUrlInput_tablet.addEventListener("input", function() {
    let inputValue = backgroundUrlInput_tablet.value;
    inputValue = inputValue.replace(/"/g, ""); // Menghilangkan tanda kutip ("") dari string
    target.setAttribute("data-background-image-tablet", inputValue);
    propertiesEditor(target);
  });
}
let backgroundSizeInput_tablet = document.getElementById("background-size-input-tablet");
if (backgroundSizeInput_tablet) {
let targetValue = target.getAttribute("data-background-image-size-tablet");
for (let i = 0; i < backgroundSizeInput_tablet.options.length; i++) {
if (backgroundSizeInput_tablet.options[i].value === targetValue) {
backgroundSizeInput_tablet.selectedIndex = i;
break;}
}
    backgroundSizeInput_tablet.addEventListener("change", function(){
        target.setAttribute("data-background-image-size-tablet",backgroundSizeInput_tablet.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
let backgroundPositionXInput_tablet = document.getElementById("background-position-x-input-tablet");
if (backgroundPositionXInput_tablet) {
let targetValue = target.getAttribute("data-background-image-position-x-tablet");
backgroundPositionXInput_tablet.value = targetValue;
backgroundPositionXInput_tablet.addEventListener("input", function(){
        target.setAttribute("data-background-image-position-x-tablet",backgroundPositionXInput_tablet.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
let backgroundPositionYInput_tablet = document.getElementById("background-position-y-input-tablet");
if (backgroundPositionYInput_tablet) {
let targetValue = target.getAttribute("data-background-image-position-y-tablet");
backgroundPositionYInput_tablet.value = targetValue;
backgroundPositionYInput_tablet.addEventListener("input", function(){
        target.setAttribute("data-background-image-position-y-tablet",backgroundPositionYInput_tablet.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
let backgroundRepeat_tablet = document.getElementById("background-repeat-input-tablet");
if (backgroundRepeat_tablet) {
let targetValue = target.getAttribute("data-background-image-repeat-tablet");
for (let i = 0; i < backgroundRepeat_tablet.options.length; i++) {
if (backgroundRepeat_tablet.options[i].value === targetValue) {
backgroundRepeat_tablet.selectedIndex = i;
break;}
}
backgroundRepeat_tablet.addEventListener("change", function(){
        target.setAttribute("data-background-image-repeat-tablet",backgroundRepeat_tablet.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
    
let gradientColor1Input_tablet = document.getElementById("gradient-color-1-input-tablet");
if(gradientColor1Input_tablet){
let targetValue = target.getAttribute("data-background-gradient-color-1-tablet");
gradientColor1Input_tablet.value = targetValue;
gradientColor1Input_tablet.addEventListener("click", firstGradient_tablet);
gradientColor1Input_tablet.addEventListener("input", function(){
  target.setAttribute("data-background-gradient-color-1-tablet",gradientColor1Input_tablet.value);
  backgroundGradientProcess1_tablet();
  })
}
//----------------------

let gradientOp1Input_tablet = document.getElementById("gradient-op-1-input-tablet");
if(gradientOp1Input_tablet){
let targetValue = target.getAttribute("data-background-gradient-op-1-tablet");
gradientOp1Input_tablet.value = targetValue;
gradientOp1Input_tablet.addEventListener("input", function(){
  
  target.setAttribute("data-background-gradient-op-1-tablet",gradientOp1Input_tablet.value);
  backgroundGradientProcess1_tablet();
  })
}

function backgroundGradientProcess1_tablet(){
  let bgColor = gradientColor1Input_tablet.value;
  let bgopacity = gradientOp1Input_tablet.value;
  let backgroundcolorValue = "rgba(" +
  parseInt(bgColor.slice(1, 3), 16) + ", " +
  parseInt(bgColor.slice(3, 5), 16) + ", " +
  parseInt(bgColor.slice(5, 7), 16) + ", " +
  bgopacity + ")";

target.setAttribute("data-background-gradient-result-1-tablet",backgroundcolorValue);
propertiesEditor(target);
}
//----------------------
    
let gradientLocation1Input_tablet = document.getElementById("gradient-location-1-input-tablet");
let gradientLocation1Number_tablet = document.getElementById("gradient-location-1-number-tablet");
    if(gradientLocation1Input_tablet){
    let targetValue = target.getAttribute("data-background-gradient-location-1-tablet");
    gradientLocation1Number_tablet.value = targetValue;

    gradientLocation1Input_tablet.value = targetValue;
    gradientLocation1Input_tablet.addEventListener("input", function(){
      
      target.setAttribute("data-background-gradient-location-1-tablet",gradientLocation1Input_tablet.value);
      gradientLocation1Number_tablet.value = gradientLocation1Input_tablet.value;
      propertiesEditor(target);})
    }
    //----------------------
    //2

    let gradientColor2Input_tablet = document.getElementById("gradient-color-2-input-tablet");
    if(gradientColor2Input_tablet){
    let targetValue = target.getAttribute("data-background-gradient-color-2-tablet");
    gradientColor2Input_tablet.value = targetValue;
    gradientColor2Input_tablet.addEventListener("input", function(){
      
      target.setAttribute("data-background-gradient-color-2-tablet",gradientColor2Input_tablet.value);
      backgroundGradientProcess2_tablet();
      })
    }
    //----------------------
    
    let gradientOp2Input_tablet = document.getElementById("gradient-op-2-input-tablet");
    if(gradientOp2Input_tablet){
    let targetValue = target.getAttribute("data-background-gradient-op-2-tablet");
    gradientOp2Input_tablet.value = targetValue;
    gradientOp2Input_tablet.addEventListener("input", function(){
      
      target.setAttribute("data-background-gradient-op-2-tablet",gradientOp2Input_tablet.value);
      backgroundGradientProcess2_tablet();
      })
    }
    
    function backgroundGradientProcess2_tablet(){
      let bgColor = gradientColor2Input_tablet.value;
      let bgopacity = gradientOp2Input_tablet.value;
      let backgroundcolorValue = "rgba(" +
      parseInt(bgColor.slice(1, 3), 16) + ", " +
      parseInt(bgColor.slice(3, 5), 16) + ", " +
      parseInt(bgColor.slice(5, 7), 16) + ", " +
      bgopacity + ")";
    
    target.setAttribute("data-background-gradient-result-2-tablet",backgroundcolorValue);
    propertiesEditor(target);
    }
    //----------------------
        
    let gradientLocation2Input_tablet = document.getElementById("gradient-location-2-input-tablet");
    let gradientLocation2Number_tablet = document.getElementById("gradient-location-2-number-tablet");
        if(gradientLocation2Input_tablet){
        
        let targetValue = target.getAttribute("data-background-gradient-location-2-tablet");
        gradientLocation2Number_tablet.value = targetValue;
    
        gradientLocation2Input_tablet.value = targetValue;
        gradientLocation2Input_tablet.addEventListener("input", function(){
          
          target.setAttribute("data-background-gradient-location-2-tablet",gradientLocation2Input_tablet.value);
          gradientLocation2Number_tablet.value = gradientLocation2Input_tablet.value;
          propertiesEditor(target);})
        }
        //----------------------
    
 
let gradientTypeInput_tablet = document.getElementById("gradient-type-input-tablet");
if (gradientTypeInput_tablet) {
let targetValue = target.getAttribute("data-background-gradient-type-tablet");
for (let i = 0; i < gradientTypeInput_tablet.options.length; i++) {
if (gradientTypeInput_tablet.options[i].value === targetValue) {
gradientTypeInput.selectedIndex = i;
break;}
}
    gradientTypeInput.addEventListener("change-tablet", function(){
        target.setAttribute("data-background-gradient-type-tablet",gradientTypeInput_tablet.value);
        propertiesEditor(target);})
}
//--------------------------------------------------

let gradientAngleInput_tablet = document.getElementById("gradient-angle-input-tablet");
let gradientAngleNumber_tablet = document.getElementById("gradient-angle-number-tablet");
if(gradientAngleInput_tablet){
let targetValue = target.getAttribute("data-background-gradient-angle-tablet");
gradientAngleNumber_tablet.value = targetValue;
gradientAngleInput_tablet.value = targetValue;
gradientAngleInput_tablet.addEventListener("input", function(){
  
  target.setAttribute("data-background-gradient-angle-tablet",gradientAngleInput_tablet.value);
  gradientAngleNumber_tablet.value = gradientAngleInput_tablet.value;
  propertiesEditor(target);})
}
//----------------------
let clearGradientbutton_tablet = document.getElementById("clear-gradient-setting-tablet");
if(clearGradientbutton_tablet){
  clearGradientbutton_tablet.addEventListener("click", function(event){
    event.preventDefault();
  });
  clearGradientbutton_tablet.addEventListener("click", clearGradient_tablet);
}
function clearGradient_tablet(){
            target.setAttribute("data-background-gradient-color-1-tablet", ``);
            target.setAttribute("data-background-gradient-op-1-tablet", ``);
            target.setAttribute("data-background-gradient-result-1-tablet", ``);
            target.setAttribute("data-background-gradient-location-1-tablet", ``);
            target.setAttribute("data-background-gradient-color-2-tablet", ``);
            target.setAttribute("data-background-gradient-op-2-tablet", ``);
            target.setAttribute("data-background-gradient-result-2-tablet", ``);
            target.setAttribute("data-background-gradient-location-2-tablet", ``);
            target.setAttribute("data-background-gradient-type-tablet", ``);
            target.setAttribute("data-background-gradient-angle-tablet", ``);

gradientColor1Input_tablet.value = "";
gradientOp1Input_tablet.value = "";
gradientLocation1Input_tablet.value = "";
gradientLocation1Number_tablet.value = "";
gradientColor2Input_tablet.value = "";
gradientOp2Input_tablet.value = "";
gradientLocation2Input_tablet.value = "";
gradientLocation2Number_tablet.value = "";
gradientTypeInput_tablet.value = "";
gradientAngleInput_tablet.value = "";
gradientAngleNumber_tablet.value = "";
propertiesEditor(target);
}

function firstGradient_tablet(){
  let attributeS1 = target.getAttribute("data-background-gradient-color-1-tablet");
  let attributeS2 = target.getAttribute("data-background-gradient-op-1-tablet");
  let attributeS3 = target.getAttribute("data-background-gradient-result-1-tablet");
  let attributeS4 = target.getAttribute("data-background-gradient-location-1-tablet");
  let attributeS5 = target.getAttribute("data-background-gradient-color-2-tablet");
  let attributeS6 = target.getAttribute("data-background-gradient-op-2-tablet");
  let attributeS7 = target.getAttribute("data-background-gradient-result-2-tablet");
  let attributeS8 = target.getAttribute("data-background-gradient-location-2-tablet");
  let attributeS9 = target.getAttribute("data-background-gradient-type-tablet");
  let attributeS10 = target.getAttribute("data-background-gradient-angle-tablet");

  let gradientAttr = attributeS1 + attributeS2 +  attributeS3 +  attributeS4 + 
  attributeS5 +  attributeS6 +  attributeS7 +  attributeS8 +  attributeS9 +  attributeS10;
  if (gradientAttr === ""){
    target.setAttribute("data-background-gradient-color-1-tablet", `red`);
            target.setAttribute("data-background-gradient-op-1-tablet", `1`);
            target.setAttribute("data-background-gradient-result-1-tablet", `red`);
            target.setAttribute("data-background-gradient-location-1-tablet", `10`);
            target.setAttribute("data-background-gradient-color-2-tablet", `blue`);
            target.setAttribute("data-background-gradient-op-2-tablet", `0.4`);
            target.setAttribute("data-background-gradient-result-2-tablet", `blue`);
            target.setAttribute("data-background-gradient-location-2-tablet", `90`);
            target.setAttribute("data-background-gradient-type-tablet", `linear-gradient`);
            target.setAttribute("data-background-gradient-angle-tablet", `10`);
            inputValueOfFormEdit(target);
  } 
}
//mobile
let backgroundUrlInput_mobile = document.getElementById("background-url-input-mobile");
if (backgroundUrlInput_mobile) {
  let targetValue = target.getAttribute("data-background-image-mobile");
  backgroundUrlInput_mobile.value = targetValue;
  backgroundUrlInput_mobile.addEventListener("input", function() {
    let inputValue = backgroundUrlInput_mobile.value;
    inputValue = inputValue.replace(/"/g, ""); // Menghilangkan tanda kutip ("") dari string
    target.setAttribute("data-background-image-mobile", inputValue);
    propertiesEditor(target);
  });
}
let backgroundSizeInput_mobile = document.getElementById("background-size-input-mobile");
if (backgroundSizeInput_mobile) {
let targetValue = target.getAttribute("data-background-image-size-mobile");
for (let i = 0; i < backgroundSizeInput_mobile.options.length; i++) {
if (backgroundSizeInput_mobile.options[i].value === targetValue) {
backgroundSizeInput_mobile.selectedIndex = i;
break;}
}
    backgroundSizeInput_mobile.addEventListener("change", function(){
        target.setAttribute("data-background-image-size-mobile",backgroundSizeInput_mobile.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
let backgroundPositionXInput_mobile = document.getElementById("background-position-x-input-mobile");
if (backgroundPositionXInput_mobile) {
let targetValue = target.getAttribute("data-background-image-position-x-mobile");
backgroundPositionXInput_mobile.value = targetValue;
backgroundPositionXInput_mobile.addEventListener("input", function(){
        target.setAttribute("data-background-image-position-x-mobile",backgroundPositionXInput_mobile.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
let backgroundPositionYInput_mobile = document.getElementById("background-position-y-input-mobile");
if (backgroundPositionYInput_mobile) {
let targetValue = target.getAttribute("data-background-image-position-y-mobile");
backgroundPositionYInput_mobile.value = targetValue;
backgroundPositionYInput_mobile.addEventListener("input", function(){
        target.setAttribute("data-background-image-position-y-mobile",backgroundPositionYInput_mobile.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
let backgroundRepeat_mobile = document.getElementById("background-repeat-input-mobile");
if (backgroundRepeat_mobile) {
let targetValue = target.getAttribute("data-background-image-repeat-mobile");
for (let i = 0; i < backgroundRepeat_mobile.options.length; i++) {
if (backgroundRepeat_mobile.options[i].value === targetValue) {
backgroundRepeat_mobile.selectedIndex = i;
break;}
}
backgroundRepeat_mobile.addEventListener("change", function(){
        target.setAttribute("data-background-image-repeat-mobile",backgroundRepeat_mobile.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
    
let gradientColor1Input_mobile = document.getElementById("gradient-color-1-input-mobile");
if(gradientColor1Input_mobile){
let targetValue = target.getAttribute("data-background-gradient-color-1-mobile");
gradientColor1Input_mobile.value = targetValue;
gradientColor1Input_mobile.addEventListener("click", firstGradient_mobile);
gradientColor1Input_mobile.addEventListener("input", function(){
  target.setAttribute("data-background-gradient-color-1-mobile",gradientColor1Input_mobile.value);
  backgroundGradientProcess1_mobile();
  })
}
//----------------------

let gradientOp1Input_mobile = document.getElementById("gradient-op-1-input-mobile");
if(gradientOp1Input_mobile){
let targetValue = target.getAttribute("data-background-gradient-op-1-mobile");
gradientOp1Input_mobile.value = targetValue;
gradientOp1Input_mobile.addEventListener("input", function(){
  
  target.setAttribute("data-background-gradient-op-1-mobile",gradientOp1Input_mobile.value);
  backgroundGradientProcess1_mobile();
  })
}

function backgroundGradientProcess1_mobile(){
  let bgColor = gradientColor1Input_mobile.value;
  let bgopacity = gradientOp1Input_mobile.value;
  let backgroundcolorValue = "rgba(" +
  parseInt(bgColor.slice(1, 3), 16) + ", " +
  parseInt(bgColor.slice(3, 5), 16) + ", " +
  parseInt(bgColor.slice(5, 7), 16) + ", " +
  bgopacity + ")";

target.setAttribute("data-background-gradient-result-1-mobile",backgroundcolorValue);
propertiesEditor(target);
}
//----------------------
    
let gradientLocation1Input_mobile = document.getElementById("gradient-location-1-input-mobile");
let gradientLocation1Number_mobile = document.getElementById("gradient-location-1-number-mobile");
    if(gradientLocation1Input_mobile){
    let targetValue = target.getAttribute("data-background-gradient-location-1-mobile");
    gradientLocation1Number_mobile.value = targetValue;

    gradientLocation1Input_mobile.value = targetValue;
    gradientLocation1Input_mobile.addEventListener("input", function(){
      
      target.setAttribute("data-background-gradient-location-1-mobile",gradientLocation1Input_mobile.value);
      gradientLocation1Number_mobile.value = gradientLocation1Input_mobile.value;
      propertiesEditor(target);})
    }
    //----------------------
    //2

    let gradientColor2Input_mobile = document.getElementById("gradient-color-2-input-mobile");
    if(gradientColor2Input_mobile){
    let targetValue = target.getAttribute("data-background-gradient-color-2-mobile");
    gradientColor2Input_mobile.value = targetValue;
    gradientColor2Input_mobile.addEventListener("input", function(){
      
      target.setAttribute("data-background-gradient-color-2-mobile",gradientColor2Input_mobile.value);
      backgroundGradientProcess2_mobile();
      })
    }
    //----------------------
    
    let gradientOp2Input_mobile = document.getElementById("gradient-op-2-input-mobile");
    if(gradientOp2Input_mobile){
    let targetValue = target.getAttribute("data-background-gradient-op-2-mobile");
    gradientOp2Input_mobile.value = targetValue;
    gradientOp2Input_mobile.addEventListener("input", function(){
      
      target.setAttribute("data-background-gradient-op-2-mobile",gradientOp2Input_mobile.value);
      backgroundGradientProcess2_mobile();
      })
    }
    
    function backgroundGradientProcess2_mobile(){
      let bgColor = gradientColor2Input_mobile.value;
      let bgopacity = gradientOp2Input_mobile.value;
      let backgroundcolorValue = "rgba(" +
      parseInt(bgColor.slice(1, 3), 16) + ", " +
      parseInt(bgColor.slice(3, 5), 16) + ", " +
      parseInt(bgColor.slice(5, 7), 16) + ", " +
      bgopacity + ")";
    
    target.setAttribute("data-background-gradient-result-2-mobile",backgroundcolorValue);
    propertiesEditor(target);
    }
    //----------------------
        
    let gradientLocation2Input_mobile = document.getElementById("gradient-location-2-input-mobile");
    let gradientLocation2Number_mobile = document.getElementById("gradient-location-2-number-mobile");
        if(gradientLocation2Input_mobile){
        
        let targetValue = target.getAttribute("data-background-gradient-location-2-mobile");
        gradientLocation2Number_mobile.value = targetValue;
    
        gradientLocation2Input_mobile.value = targetValue;
        gradientLocation2Input_mobile.addEventListener("input", function(){
          
          target.setAttribute("data-background-gradient-location-2-mobile",gradientLocation2Input_mobile.value);
          gradientLocation2Number_mobile.value = gradientLocation2Input_mobile.value;
          propertiesEditor(target);})
        }
        //----------------------
    
 
let gradientTypeInput_mobile = document.getElementById("gradient-type-input-mobile");
if (gradientTypeInput_mobile) {
let targetValue = target.getAttribute("data-background-gradient-type-mobile");
for (let i = 0; i < gradientTypeInput_mobile.options.length; i++) {
if (gradientTypeInput_mobile.options[i].value === targetValue) {
gradientTypeInput.selectedIndex = i;
break;}
}
    gradientTypeInput.addEventListener("change-mobile", function(){
        target.setAttribute("data-background-gradient-type-mobile",gradientTypeInput_mobile.value);
        propertiesEditor(target);})
}
//--------------------------------------------------

let gradientAngleInput_mobile = document.getElementById("gradient-angle-input-mobile");
let gradientAngleNumber_mobile = document.getElementById("gradient-angle-number-mobile");
if(gradientAngleInput_mobile){
let targetValue = target.getAttribute("data-background-gradient-angle-mobile");
gradientAngleNumber_mobile.value = targetValue;
gradientAngleInput_mobile.value = targetValue;
gradientAngleInput_mobile.addEventListener("input", function(){
  
  target.setAttribute("data-background-gradient-angle-mobile",gradientAngleInput_mobile.value);
  gradientAngleNumber_mobile.value = gradientAngleInput_mobile.value;
  propertiesEditor(target);})
}
//----------------------
let clearGradientbutton_mobile = document.getElementById("clear-gradient-setting-mobile");
if(clearGradientbutton_mobile){
  clearGradientbutton_mobile.addEventListener("click", function(event){
    event.preventDefault();
  });
  clearGradientbutton_mobile.addEventListener("click", clearGradient_mobile);
}
function clearGradient_mobile(){
            target.setAttribute("data-background-gradient-color-1-mobile", ``);
            target.setAttribute("data-background-gradient-op-1-mobile", ``);
            target.setAttribute("data-background-gradient-result-1-mobile", ``);
            target.setAttribute("data-background-gradient-location-1-mobile", ``);
            target.setAttribute("data-background-gradient-color-2-mobile", ``);
            target.setAttribute("data-background-gradient-op-2-mobile", ``);
            target.setAttribute("data-background-gradient-result-2-mobile", ``);
            target.setAttribute("data-background-gradient-location-2-mobile", ``);
            target.setAttribute("data-background-gradient-type-mobile", ``);
            target.setAttribute("data-background-gradient-angle-mobile", ``);

gradientColor1Input_mobile.value = "";
gradientOp1Input_mobile.value = "";
gradientLocation1Input_mobile.value = "";
gradientLocation1Number_mobile.value = "";
gradientColor2Input_mobile.value = "";
gradientOp2Input_mobile.value = "";
gradientLocation2Input_mobile.value = "";
gradientLocation2Number_mobile.value = "";
gradientTypeInput_mobile.value = "";
gradientAngleInput_mobile.value = "";
gradientAngleNumber_mobile.value = "";
propertiesEditor(target);
}

function firstGradient_mobile(){
  let attributeS1 = target.getAttribute("data-background-gradient-color-1-mobile");
  let attributeS2 = target.getAttribute("data-background-gradient-op-1-mobile");
  let attributeS3 = target.getAttribute("data-background-gradient-result-1-mobile");
  let attributeS4 = target.getAttribute("data-background-gradient-location-1-mobile");
  let attributeS5 = target.getAttribute("data-background-gradient-color-2-mobile");
  let attributeS6 = target.getAttribute("data-background-gradient-op-2-mobile");
  let attributeS7 = target.getAttribute("data-background-gradient-result-2-mobile");
  let attributeS8 = target.getAttribute("data-background-gradient-location-2-mobile");
  let attributeS9 = target.getAttribute("data-background-gradient-type-mobile");
  let attributeS10 = target.getAttribute("data-background-gradient-angle-mobile");

  let gradientAttr = attributeS1 + attributeS2 +  attributeS3 +  attributeS4 + 
  attributeS5 +  attributeS6 +  attributeS7 +  attributeS8 +  attributeS9 +  attributeS10;
  if (gradientAttr === ""){
    target.setAttribute("data-background-gradient-color-1-mobile", `red`);
            target.setAttribute("data-background-gradient-op-1-mobile", `1`);
            target.setAttribute("data-background-gradient-result-1-mobile", `red`);
            target.setAttribute("data-background-gradient-location-1-mobile", `10`);
            target.setAttribute("data-background-gradient-color-2-mobile", `blue`);
            target.setAttribute("data-background-gradient-op-2-mobile", `0.4`);
            target.setAttribute("data-background-gradient-result-2-mobile", `blue`);
            target.setAttribute("data-background-gradient-location-2-mobile", `90`);
            target.setAttribute("data-background-gradient-type-mobile", `linear-gradient`);
            target.setAttribute("data-background-gradient-angle-mobile", `10`);
            inputValueOfFormEdit(target);
  } 
}
//sampe sini

  
//Outline Properties
let elementOutline_Check = document.getElementById("outlineCheckinput");
if (elementOutline_Check) {
  let outline_Container = document.getElementById("outline-content");
  let targetValue = target.getAttribute("data-outline-check");
  if (targetValue === "true") {
    elementOutline_Check.checked = true;
  } else {
    elementOutline_Check.checked = false;
    outline_Container.classList.add("none-mode");
  }

  elementOutline_Check.addEventListener("change", function() {
    target.setAttribute("data-outline-check", elementOutline_Check.checked);
    if (elementOutline_Check.checked === true) {
      outline_Container.classList.remove("none-mode");
    } else {
      outline_Container.classList.add("none-mode");
    }
    propertiesEditor(target);
  });
}
//------------------------------------

let element_outline_Style = document.getElementById("Outline-Styleinput");
if (element_outline_Style) {
let targetValue = target.getAttribute("data-outline-style");
for (let i = 0; i < element_outline_Style.options.length; i++) {
if (element_outline_Style.options[i].value === targetValue) {
element_outline_Style.selectedIndex = i;
break;}
}
    element_outline_Style.addEventListener("change", function(){
        target.setAttribute("data-outline-style",element_outline_Style.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
// Hover //===========
let element_outline_Style_Hover = document.getElementById("Outline-Styleinput-hover");
if (element_outline_Style_Hover) {
let targetValue = target.getAttribute("data-outline-style-hover");
for (let i = 0; i < element_outline_Style_Hover.options.length; i++) {
if (element_outline_Style_Hover.options[i].value === targetValue) {
element_outline_Style_Hover.selectedIndex = i;
break;}
}
    element_outline_Style_Hover.addEventListener("change", function(){
        target.setAttribute("data-outline-style-hover",element_outline_Style_Hover.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
// Active //===========
let element_outline_Style_Active = document.getElementById("Outline-Styleinput-active");
if (element_outline_Style_Active) {
let targetValue = target.getAttribute("data-outline-style-active");
for (let i = 0; i < element_outline_Style_Active.options.length; i++) {
if (element_outline_Style_Active.options[i].value === targetValue) {
element_outline_Style_Active.selectedIndex = i;
break;}
}
    element_outline_Style_Active.addEventListener("change", function(){
        target.setAttribute("data-outline-style-active",element_outline_Style_Active.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
// Tablet //===========
let element_outline_Style_Tablet = document.getElementById("Outline-Styleinput-tablet");
if (element_outline_Style_Tablet) {
let targetValue = target.getAttribute("data-outline-style-tablet");
for (let i = 0; i < element_outline_Style_Tablet.options.length; i++) {
if (element_outline_Style_Tablet.options[i].value === targetValue) {
element_outline_Style_Tablet.selectedIndex = i;
break;}
}
    element_outline_Style_Tablet.addEventListener("change", function(){
        target.setAttribute("data-outline-style-tablet",element_outline_Style_Tablet.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
// Mobile //===========
let element_outline_Style_Mobile = document.getElementById("Outline-Styleinput-mobile");
if (element_outline_Style_Mobile) {
let targetValue = target.getAttribute("data-outline-style-mobile");
for (let i = 0; i < element_outline_Style_Mobile.options.length; i++) {
if (element_outline_Style_Mobile.options[i].value === targetValue) {
element_outline_Style_Mobile.selectedIndex = i;
break;}
}
    element_outline_Style_Mobile.addEventListener("change", function(){
        target.setAttribute("data-outline-style-mobile",element_outline_Style_Mobile.value);
        propertiesEditor(target);})
}
//--------------------------------------------------


let element_outline_Color = document.getElementById("edit-Outline-Colorinput");
if(element_outline_Color){
let targetValue = target.getAttribute("data-outline-color");
element_outline_Color.value = targetValue;
element_outline_Color.addEventListener("input", function(){
  
  target.setAttribute("data-outline-color",element_outline_Color.value);
  propertiesEditor(target);})
}
//----------------------
// Hover //============
let element_outline_Color_Hover = document.getElementById("edit-Outline-Colorinput-hover");
if(element_outline_Color_Hover){
let targetValue = target.getAttribute("data-outline-color-hover");
element_outline_Color_Hover.value = targetValue;
element_outline_Color_Hover.addEventListener("input", function(){
  
  target.setAttribute("data-outline-color-hover",element_outline_Color_Hover.value);
  propertiesEditor(target);})
}
//----------------------
// Active //===========
let element_outline_Color_Active = document.getElementById("edit-Outline-Colorinput-active");
if(element_outline_Color_Active){
let targetValue = target.getAttribute("data-outline-color-active");
element_outline_Color_Active.value = targetValue;
element_outline_Color_Active.addEventListener("input", function(){
  
  target.setAttribute("data-outline-color-active",element_outline_Color_Active.value);
  propertiesEditor(target);})
}
//----------------------
// Tablet //===========
let element_outline_Color_Tablet = document.getElementById("edit-Outline-Colorinput-tablet");
if(element_outline_Color_Tablet){
let targetValue = target.getAttribute("data-outline-color-tablet");
element_outline_Color_Tablet.value = targetValue;
element_outline_Color_Tablet.addEventListener("input", function(){
  
  target.setAttribute("data-outline-color-tablet",element_outline_Color_Tablet.value);
  propertiesEditor(target);})
}
//----------------------
// Mobile //===========
let element_outline_Color_Mobile = document.getElementById("edit-Outline-Colorinput-mobile");
if(element_outline_Color_Mobile){
let targetValue = target.getAttribute("data-outline-color-mobile");
element_outline_Color_Mobile.value = targetValue;
element_outline_Color_Mobile.addEventListener("input", function(){
  
  target.setAttribute("data-outline-color-mobile",element_outline_Color_Mobile.value);
  propertiesEditor(target);})
}
//----------------------

let element_outline_opacity = document.getElementById("edit-Outline-Opacityinput");
if(element_outline_opacity){
let targetValue = target.getAttribute("data-outline-opacity");
element_outline_opacity.value = targetValue;
element_outline_opacity.addEventListener("input", function(){
  
  target.setAttribute("data-outline-opacity",element_outline_opacity.value);
  propertiesEditor(target);})
}
//----------------------
// Hover //============
let element_outline_opacity_Hover = document.getElementById("edit-Outline-Opacityinput-hover");
if(element_outline_opacity_Hover){
let targetValue = target.getAttribute("data-outline-opacity-hover");
element_outline_opacity_Hover.value = targetValue;
element_outline_opacity_Hover.addEventListener("input", function(){
  
  target.setAttribute("data-outline-opacity-hover",element_outline_opacity_Hover.value);
  propertiesEditor(target);})
}
//----------------------
// Active //===========
let element_outline_opacity_Active = document.getElementById("edit-Outline-Opacityinput-active");
if(element_outline_opacity_Active){
let targetValue = target.getAttribute("data-outline-opacity-active");
element_outline_opacity_Active.value = targetValue;
element_outline_opacity_Active.addEventListener("input", function(){
  
  target.setAttribute("data-outline-opacity-active",element_outline_opacity_Active.value);
  propertiesEditor(target);})
}
//----------------------
// Tablet //===========
let element_outline_opacity_Tablet = document.getElementById("edit-Outline-Opacityinput-tablet");
if(element_outline_opacity_Tablet){
let targetValue = target.getAttribute("data-outline-opacity-tablet");
element_outline_opacity_Tablet.value = targetValue;
element_outline_opacity_Tablet.addEventListener("input", function(){
  
  target.setAttribute("data-outline-opacity-tablet",element_outline_opacity_Tablet.value);
  propertiesEditor(target);})
}
//----------------------
// Mobile //===========
let element_outline_opacity_Mobile = document.getElementById("edit-Outline-Opacityinput-mobile");
if(element_outline_opacity_Mobile){
let targetValue = target.getAttribute("data-outline-opacity-mobile");
element_outline_opacity_Mobile.value = targetValue;
element_outline_opacity_Mobile.addEventListener("input", function(){
  
  target.setAttribute("data-outline-opacity-mobile",element_outline_opacity_Mobile.value);
  propertiesEditor(target);})
}
//----------------------

let element_outline_width = document.getElementById("edit-Outline-Widthinput");
if(element_outline_width){
let targetValue = target.getAttribute("data-outline-width");
element_outline_width.value = targetValue;
element_outline_width.addEventListener("input", function(){
  
  target.setAttribute("data-outline-width",element_outline_width.value);
  propertiesEditor(target);})
}
//----------------------
// Hover //============
let element_outline_width_Hover = document.getElementById("edit-Outline-Widthinput-hover");
if(element_outline_width_Hover){
let targetValue = target.getAttribute("data-outline-width-hover");
element_outline_width_Hover.value = targetValue;
element_outline_width_Hover.addEventListener("input", function(){
  
  target.setAttribute("data-outline-width-hover",element_outline_width_Hover.value);
  propertiesEditor(target);})
}
//----------------------
// Active //===========
let element_outline_width_Active = document.getElementById("edit-Outline-Widthinput-active");
if(element_outline_width_Active){
let targetValue = target.getAttribute("data-outline-width-active");
element_outline_width_Active.value = targetValue;
element_outline_width_Active.addEventListener("input", function(){
  
  target.setAttribute("data-outline-width-active",element_outline_width_Active.value);
  propertiesEditor(target);})
}
//----------------------
// Tablet //===========
let element_outline_width_Tablet = document.getElementById("edit-Outline-Widthinput-tablet");
if(element_outline_width_Tablet){
let targetValue = target.getAttribute("data-outline-width-tablet");
element_outline_width_Tablet.value = targetValue;
element_outline_width_Tablet.addEventListener("input", function(){
  
  target.setAttribute("data-outline-width-tablet",element_outline_width_Tablet.value);
  propertiesEditor(target);})
}
//----------------------
// Mobile //===========
let element_outline_width_Mobile = document.getElementById("edit-Outline-Widthinput-mobile");
if(element_outline_width_Mobile){
let targetValue = target.getAttribute("data-outline-width-mobile");
element_outline_width_Mobile.value = targetValue;
element_outline_width_Mobile.addEventListener("input", function(){
  
  target.setAttribute("data-outline-width-mobile",element_outline_width_Mobile.value);
  propertiesEditor(target);})
}
//----------------------

let element_outline_Offset = document.getElementById("edit-Outline-offsetinput");
if(element_outline_Offset){
let targetValue = target.getAttribute("data-outline-offset");
element_outline_Offset.value = targetValue;
element_outline_Offset.addEventListener("input", function(){
  
  target.setAttribute("data-outline-offset",element_outline_Offset.value);
  propertiesEditor(target);})
}
//----------------------
// Hover //============
let element_outline_Offset_Hover = document.getElementById("edit-Outline-offsetinput-hover");
if(element_outline_Offset_Hover){
let targetValue = target.getAttribute("data-outline-offset-hover");
element_outline_Offset_Hover.value = targetValue;
element_outline_Offset_Hover.addEventListener("input", function(){
  
  target.setAttribute("data-outline-offset-hover",element_outline_Offset_Hover.value);
  propertiesEditor(target);})
}
//----------------------
// Active //===========
let element_outline_Offset_Active = document.getElementById("edit-Outline-offsetinput-active");
if(element_outline_Offset_Active){
let targetValue = target.getAttribute("data-outline-offset-active");
element_outline_Offset_Active.value = targetValue;
element_outline_Offset_Active.addEventListener("input", function(){
  
  target.setAttribute("data-outline-offset-active",element_outline_Offset_Active.value);
  propertiesEditor(target);})
}
//----------------------
// Tablet //===========
let element_outline_Offset_Tablet = document.getElementById("edit-Outline-offsetinput-tablet");
if(element_outline_Offset_Tablet){
let targetValue = target.getAttribute("data-outline-offset-tablet");
element_outline_Offset_Tablet.value = targetValue;
element_outline_Offset_Tablet.addEventListener("input", function(){
  
  target.setAttribute("data-outline-offset-tablet",element_outline_Offset_Tablet.value);
  propertiesEditor(target);})
}
//----------------------
// Mobile //===========
let element_outline_Offset_Mobile = document.getElementById("edit-Outline-offsetinput-mobile");
if(element_outline_Offset_Mobile){
let targetValue = target.getAttribute("data-outline-offset-mobile");
element_outline_Offset_Mobile.value = targetValue;
element_outline_Offset_Mobile.addEventListener("input", function(){
  
  target.setAttribute("data-outline-offset-mobile",element_outline_Offset_Mobile.value);
  propertiesEditor(target);})
}
//----------------------


//==============================================================
    //Border Properties
    let elementBorder_Check = document.getElementById("borderCheckInput");
    if (elementBorder_Check) {
      let outline_Container = document.getElementById("border-content");
      let targetValue = target.getAttribute("data-border-check");
      if (targetValue === "true") {
        elementBorder_Check.checked = true;
      } else {
        elementBorder_Check.checked = false;
        outline_Container.classList.add("none-mode");
      }
    
      elementBorder_Check.addEventListener("change", function() {
        target.setAttribute("data-border-check", elementBorder_Check.checked);
        if (elementBorder_Check.checked === true) {
          outline_Container.classList.remove("none-mode");
        } else {
          outline_Container.classList.add("none-mode");
        }
        propertiesEditor(target);
      });
    }
    //------------------------------------


let elementBorderTypeinput = document.getElementById("elementBorderTypeinput");

if (elementBorderTypeinput) {
    let targetValue = target.getAttribute("data-border-type");
    for (let i = 0; i < elementBorderTypeinput.options.length; i++) {
    if (elementBorderTypeinput.options[i].value === targetValue) {
    elementBorderTypeinput.selectedIndex = i;
    break;}
    }
        elementBorderTypeinput.addEventListener("change", function(){
            target.setAttribute("data-border-type",elementBorderTypeinput.value);
            propertiesEditor(target);})
    }
    //--------------------------------------------------
    let elementBorderColorinput = document.getElementById("elementBorderColorinput");

    if (elementBorderColorinput) {
        let targetValue = target.getAttribute("data-border-color");
        elementBorderColorinput.value = targetValue;
        elementBorderColorinput.addEventListener("change", function(){

                target.setAttribute("data-border-color",elementBorderColorinput.value);
                propertiesEditor(target);})
        }
        //--------------------------------------------------

        let element_border_Opacity = document.getElementById("edit-border-opacityinput");
        if(element_border_Opacity){
        let targetValue = target.getAttribute("data-border-opacity");
        element_border_Opacity.value = targetValue;
        element_border_Opacity.addEventListener("input", function(){
          
          target.setAttribute("data-border-opacity",element_border_Opacity.value);
          propertiesEditor(target);})
        }
        //----------------------
        // Hover //============
        let element_border_Opacity_Hover = document.getElementById("edit-border-opacityinput-hover");
        if(element_border_Opacity_Hover){
        let targetValue = target.getAttribute("data-border-opacity-hover");
        element_border_Opacity_Hover.value = targetValue;
        element_border_Opacity_Hover.addEventListener("input", function(){
          
          target.setAttribute("data-border-opacity-hover",element_border_Opacity_Hover.value);
          propertiesEditor(target);})
        }
        //----------------------
        // Active //===========
        let element_border_Opacity_Active = document.getElementById("edit-border-opacityinput-active");
        if(element_border_Opacity_Active){
        let targetValue = target.getAttribute("data-border-opacity-active");
        element_border_Opacity_Active.value = targetValue;
        element_border_Opacity_Active.addEventListener("input", function(){
          
          target.setAttribute("data-border-opacity-active",element_border_Opacity_Active.value);
          propertiesEditor(target);})
        }
        //----------------------
        // Tablet //===========
        let element_border_Opacity_Tablet = document.getElementById("edit-border-opacityinput-tablet");
        if(element_border_Opacity_Tablet){
        let targetValue = target.getAttribute("data-border-opacity-tablet");
        element_border_Opacity_Tablet.value = targetValue;
        element_border_Opacity_Tablet.addEventListener("input", function(){
          
          target.setAttribute("data-border-opacity-tablet",element_border_Opacity_Tablet.value);
          propertiesEditor(target);})
        }
        //----------------------
        // Mobile //===========
        let element_border_Opacity_Mobile = document.getElementById("edit-border-opacityinput-mobile");
        if(element_border_Opacity_Mobile){
        let targetValue = target.getAttribute("data-border-opacity-mobile");
        element_border_Opacity_Mobile.value = targetValue;
        element_border_Opacity_Mobile.addEventListener("input", function(){
          
          target.setAttribute("data-border-opacity-mobile",element_border_Opacity_Mobile.value);
          propertiesEditor(target);})
        }
        //----------------------
        


let element_border_Top = document.getElementById("Border-input-topinput");
if(element_border_Top){
let targetValue = target.getAttribute("data-border-top");
element_border_Top.value = targetValue;
element_border_Top.addEventListener("input", function(){
  
  target.setAttribute("data-border-top",element_border_Top.value);
  propertiesEditor(target);})
}
//----------------------
// Hover //============
let element_border_Top_Hover = document.getElementById("Border-input-topinput-hover");
if(element_border_Top_Hover){
let targetValue = target.getAttribute("data-border-top-hover");
element_border_Top_Hover.value = targetValue;
element_border_Top_Hover.addEventListener("input", function(){
  
  target.setAttribute("data-border-top-hover",element_border_Top_Hover.value);
  propertiesEditor(target);})
}
//----------------------
// Active //===========
let element_border_Top_Active = document.getElementById("Border-input-topinput-active");
if(element_border_Top_Active){
let targetValue = target.getAttribute("data-border-top-active");
element_border_Top_Active.value = targetValue;
element_border_Top_Active.addEventListener("input", function(){
  
  target.setAttribute("data-border-top-active",element_border_Top_Active.value);
  propertiesEditor(target);})
}
//----------------------
// Tablet //===========
let element_border_Top_Tablet = document.getElementById("Border-input-topinput-tablet");
if(element_border_Top_Tablet){
let targetValue = target.getAttribute("data-border-top-tablet");
element_border_Top_Tablet.value = targetValue;
element_border_Top_Tablet.addEventListener("input", function(){
  
  target.setAttribute("data-border-top-tablet",element_border_Top_Tablet.value);
  propertiesEditor(target);})
}
//----------------------
// Mobile //===========
let element_border_Top_Mobile = document.getElementById("Border-input-topinput-mobile");
if(element_border_Top_Mobile){
let targetValue = target.getAttribute("data-border-top-mobile");
element_border_Top_Mobile.value = targetValue;
element_border_Top_Mobile.addEventListener("input", function(){
  
  target.setAttribute("data-border-top-mobile",element_border_Top_Mobile.value);
  propertiesEditor(target);})
}
//----------------------

let element_border_Right = document.getElementById("Border-input-Rightinput");
if(element_border_Right){
let targetValue = target.getAttribute("data-border-right");
element_border_Right.value = targetValue;
element_border_Right.addEventListener("input", function(){
  
  target.setAttribute("data-border-right",element_border_Right.value);
  propertiesEditor(target);})
}
//----------------------
// Hover //============
let element_border_Right_Hover = document.getElementById("Border-input-Rightinput-hover");
if(element_border_Right_Hover){
let targetValue = target.getAttribute("data-border-right-hover");
element_border_Right_Hover.value = targetValue;
element_border_Right_Hover.addEventListener("input", function(){
  
  target.setAttribute("data-border-right-hover",element_border_Right_Hover.value);
  propertiesEditor(target);})
}
//----------------------
// Active //===========
let element_border_Right_Active = document.getElementById("Border-input-Rightinput-active");
if(element_border_Right_Active){
let targetValue = target.getAttribute("data-border-right-active");
element_border_Right_Active.value = targetValue;
element_border_Right_Active.addEventListener("input", function(){
  
  target.setAttribute("data-border-right-active",element_border_Right_Active.value);
  propertiesEditor(target);})
}
//----------------------
// Tablet //===========
let element_border_Right_Tablet = document.getElementById("Border-input-Rightinput-tablet");
if(element_border_Right_Tablet){
let targetValue = target.getAttribute("data-border-right-tablet");
element_border_Right_Tablet.value = targetValue;
element_border_Right_Tablet.addEventListener("input", function(){
  
  target.setAttribute("data-border-right-tablet",element_border_Right_Tablet.value);
  propertiesEditor(target);})
}
//----------------------
// Mobile //===========
let element_border_Right_Mobile = document.getElementById("Border-input-Rightinput-mobile");
if(element_border_Right_Mobile){
let targetValue = target.getAttribute("data-border-right-mobile");
element_border_Right_Mobile.value = targetValue;
element_border_Right_Mobile.addEventListener("input", function(){
  
  target.setAttribute("data-border-right-mobile",element_border_Right_Mobile.value);
  propertiesEditor(target);})
}
//----------------------

let element_border_Bottom = document.getElementById("Border-input-Bottominput");
if(element_border_Bottom){
let targetValue = target.getAttribute("data-border-bottom");
element_border_Bottom.value = targetValue;
element_border_Bottom.addEventListener("input", function(){
  
  target.setAttribute("data-border-bottom",element_border_Bottom.value);
  propertiesEditor(target);})
}
//----------------------
// Hover //============
let element_border_Bottom_Hover = document.getElementById("Border-input-Bottominput-hover");
if(element_border_Bottom_Hover){
let targetValue = target.getAttribute("data-border-bottom-hover");
element_border_Bottom_Hover.value = targetValue;
element_border_Bottom_Hover.addEventListener("input", function(){
  
  target.setAttribute("data-border-bottom-hover",element_border_Bottom_Hover.value);
  propertiesEditor(target);})
}
//----------------------
// Active //===========
let element_border_Bottom_Active = document.getElementById("Border-input-Bottominput-active");
if(element_border_Bottom_Active){
let targetValue = target.getAttribute("data-border-bottom-active");
element_border_Bottom_Active.value = targetValue;
element_border_Bottom_Active.addEventListener("input", function(){
  
  target.setAttribute("data-border-bottom-active",element_border_Bottom_Active.value);
  propertiesEditor(target);})
}
//----------------------
// Tablet //===========
let element_border_Bottom_Tablet = document.getElementById("Border-input-Bottominput-tablet");
if(element_border_Bottom_Tablet){
let targetValue = target.getAttribute("data-border-bottom-tablet");
element_border_Bottom_Tablet.value = targetValue;
element_border_Bottom_Tablet.addEventListener("input", function(){
  
  target.setAttribute("data-border-bottom-tablet",element_border_Bottom_Tablet.value);
  propertiesEditor(target);})
}
//----------------------
// Mobile //===========
let element_border_Bottom_Mobile = document.getElementById("Border-input-Bottominput-mobile");
if(element_border_Bottom_Mobile){
let targetValue = target.getAttribute("data-border-bottom-mobile");
element_border_Bottom_Mobile.value = targetValue;
element_border_Bottom_Mobile.addEventListener("input", function(){
  
  target.setAttribute("data-border-bottom-mobile",element_border_Bottom_Mobile.value);
  propertiesEditor(target);})
}
//----------------------


let element_border_Left = document.getElementById("Border-input-leftinput");
if(element_border_Left){
let targetValue = target.getAttribute("data-border-left");
element_border_Left.value = targetValue;
element_border_Left.addEventListener("input", function(){
  
  target.setAttribute("data-border-left",element_border_Left.value);
  propertiesEditor(target);})
}
//----------------------
// Hover //============
let element_border_Left_Hover = document.getElementById("Border-input-leftinput-hover");
if(element_border_Left_Hover){
let targetValue = target.getAttribute("data-border-left-hover");
element_border_Left_Hover.value = targetValue;
element_border_Left_Hover.addEventListener("input", function(){
  
  target.setAttribute("data-border-left-hover",element_border_Left_Hover.value);
  propertiesEditor(target);})
}
//----------------------
// Active //===========
let element_border_Left_Active = document.getElementById("Border-input-leftinput-active");
if(element_border_Left_Active){
let targetValue = target.getAttribute("data-border-left-active");
element_border_Left_Active.value = targetValue;
element_border_Left_Active.addEventListener("input", function(){
  
  target.setAttribute("data-border-left-active",element_border_Left_Active.value);
  propertiesEditor(target);})
}
//----------------------
// Tablet //===========
let element_border_Left_Tablet = document.getElementById("Border-input-leftinput-tablet");
if(element_border_Left_Tablet){
let targetValue = target.getAttribute("data-border-left-tablet");
element_border_Left_Tablet.value = targetValue;
element_border_Left_Tablet.addEventListener("input", function(){
  
  target.setAttribute("data-border-left-tablet",element_border_Left_Tablet.value);
  propertiesEditor(target);})
}
//----------------------
// Mobile //===========
let element_border_Left_Mobile = document.getElementById("Border-input-leftinput-mobile");
if(element_border_Left_Mobile){
let targetValue = target.getAttribute("data-border-left-mobile");
element_border_Left_Mobile.value = targetValue;
element_border_Left_Mobile.addEventListener("input", function(){
  
  target.setAttribute("data-border-left-mobile",element_border_Left_Mobile.value);
  propertiesEditor(target);})
}
//----------------------

let elementBorderParamsinput = document.getElementById("elementBorderParamsinput");

if (elementBorderParamsinput) {
    let targetValue = target.getAttribute("data-border-parameter");
    for (let i = 0; i < elementBorderParamsinput.options.length; i++) {
    if (elementBorderParamsinput.options[i].value === targetValue) {
    elementBorderParamsinput.selectedIndex = i;
    break;}
    }
        elementBorderParamsinput.addEventListener("change", function(){
            target.setAttribute("data-border-parameter",elementBorderParamsinput.value);
            propertiesEditor(target);})
    }
    //--------------------------------------------------
    //Border Radius Properties
    let elementBorderRadiusCheck = document.getElementById("elementBorderRadiusinput");

    if (elementBorderRadiusCheck) {
      let targetValue = target.getAttribute("data-border-radius-check");
      if (targetValue === "true") {
        elementBorderRadiusCheck.checked = true;
      } else {
        elementBorderRadiusCheck.checked = false;
      }
    
      elementBorderRadiusCheck.addEventListener("change", function() {
        target.setAttribute("data-border-radius-check", elementBorderRadiusCheck.checked);
        propertiesEditor(target);
      });
    }
//------------------------------------    
let elementRadiusParaminput = document.getElementById("elementRadiusParaminput");

if (elementRadiusParaminput) {
    let targetValue = target.getAttribute("data-border-radius-parameter");
    for (let i = 0; i < elementRadiusParaminput.options.length; i++) {
    if (elementRadiusParaminput.options[i].value === targetValue) {
    elementRadiusParaminput.selectedIndex = i;
    break;}
    }
        elementRadiusParaminput.addEventListener("change", function(){
            target.setAttribute("data-border-radius-parameter",elementRadiusParaminput.value);
            propertiesEditor(target);})
    }
    //--------------------------------------------------
let elementRadiusTopinput = document.getElementById("elementRadiusTopinput");

if(elementRadiusTopinput){
    let targetValue = target.getAttribute("data-border-radius-top");
    elementRadiusTopinput.value = targetValue;
    elementRadiusTopinput.addEventListener("input", function(){
      
      target.setAttribute("data-border-radius-top",elementRadiusTopinput.value);
      propertiesEditor(target);})
    }
    //----------------------
let elementRadiusRightinput = document.getElementById("elementRadiusRightinput");

if(elementRadiusRightinput){
    let targetValue = target.getAttribute("data-border-radius-right");
    elementRadiusRightinput.value = targetValue;
    elementRadiusRightinput.addEventListener("input", function(){
      
      target.setAttribute("data-border-radius-right",elementRadiusRightinput.value);
      propertiesEditor(target);})
    }
    //----------------------
let elementRadiusBottominput = document.getElementById("elementRadiusBottominput");

if(elementRadiusBottominput){
    let targetValue = target.getAttribute("data-border-radius-bottom");
    elementRadiusBottominput.value = targetValue;
    elementRadiusBottominput.addEventListener("input", function(){
      
      target.setAttribute("data-border-radius-bottom",elementRadiusBottominput.value);
      propertiesEditor(target);})
    }
    //----------------------
let elementRadiusLeftinput = document.getElementById("elementRadiusLeftinput");

if(elementRadiusLeftinput){
    let targetValue = target.getAttribute("data-border-radius-left");
    elementRadiusLeftinput.value = targetValue;
    elementRadiusLeftinput.addEventListener("input", function(){
      
      target.setAttribute("data-border-radius-left",elementRadiusLeftinput.value);
      propertiesEditor(target);})
    }
    //----------------------
    //Box Shadow Properties
let checkElementBoxShadowinput = document.getElementById("checkElementBoxShadowinput");
if (checkElementBoxShadowinput) {
  let targetValue = target.getAttribute("data-box-shadow-check");
  if (targetValue === "true") {
    checkElementBoxShadowinput.checked = true;
  } else {
    checkElementBoxShadowinput.checked = false;
  }

  checkElementBoxShadowinput.addEventListener("change", function() {
    target.setAttribute("data-box-shadow-check", checkElementBoxShadowinput.checked);
    propertiesEditor(target);
  });
}
//------------------------------------    
let elementHorizontalShadowLengthInput = document.getElementById("elementHorizontalShadowLengthInput");

if(elementHorizontalShadowLengthInput){
    let targetValue = target.getAttribute("data-box-shadow-horizontal");
    elementHorizontalShadowLengthInput.value = targetValue;
    elementHorizontalShadowLengthInput.addEventListener("input", function(){
      
      target.setAttribute("data-box-shadow-horizontal",elementHorizontalShadowLengthInput.value);
      propertiesEditor(target);})
    }
    //----------------------
let elementVerticalshadowlengthinput = document.getElementById("elementVerticalshadowlengthinput");

if(elementVerticalshadowlengthinput){
    let targetValue = target.getAttribute("data-box-shadow-vertical");
    elementVerticalshadowlengthinput.value = targetValue;
    elementVerticalshadowlengthinput.addEventListener("input", function(){
      
      target.setAttribute("data-box-shadow-vertical",elementVerticalshadowlengthinput.value);
      propertiesEditor(target);})
    }
    //----------------------
let elementBlurRadiusInput = document.getElementById("elementBlurRadiusInput");

if(elementBlurRadiusInput){
    let targetValue = target.getAttribute("data-box-shadow-blur");
    elementBlurRadiusInput.value = targetValue;
    elementBlurRadiusInput.addEventListener("input", function(){
      
      target.setAttribute("data-box-shadow-blur",elementBlurRadiusInput.value);
      propertiesEditor(target);})
    }
    //----------------------
let elementSpreadRadiusInput = document.getElementById("elementSpreadRadiusInput");

if(elementSpreadRadiusInput){
    let targetValue = target.getAttribute("data-box-shadow-spread");
    elementSpreadRadiusInput.value = targetValue;
    elementSpreadRadiusInput.addEventListener("input", function(){
      
      target.setAttribute("data-box-shadow-spread",elementSpreadRadiusInput.value);
      propertiesEditor(target);})
    }
    //----------------------
let shadowColorInput = document.getElementById("shadowColorInput");

if(shadowColorInput){
    let targetValue = target.getAttribute("data-box-shadow-color");
    shadowColorInput.value = targetValue;
    shadowColorInput.addEventListener("input", function(){
      
      target.setAttribute("data-box-shadow-color",shadowColorInput.value);
      propertiesEditor(target);})
    }
    //----------------------
let elementShadowOpacityInput = document.getElementById("elementShadowOpacityInput");

if(elementShadowOpacityInput){
    let targetValue = target.getAttribute("data-box-shadow-opacity");
    elementShadowOpacityInput.value = targetValue;
    elementShadowOpacityInput.addEventListener("input", function(){
      
      target.setAttribute("data-box-shadow-opacity",elementShadowOpacityInput.value);
      propertiesEditor(target);})
    }
    //----------------------
let elementShadowInsetOutsetinput = document.getElementById("elementShadowInsetOutsetinput");

if(elementShadowInsetOutsetinput){
    let targetValue = target.getAttribute("data-box-shadow-set");
    elementShadowInsetOutsetinput.value = targetValue;
    elementShadowInsetOutsetinput.addEventListener("input", function(){
      
      target.setAttribute("data-box-shadow-set",elementShadowInsetOutsetinput.value);
      propertiesEditor(target);})
    }
    //----------------------
//Font Family
let elementFontFamilyinput = document.getElementById("elementFontFamilyinput");

if (elementFontFamilyinput) {
    let targetValue = target.getAttribute("data-font-family");
    for (let i = 0; i < elementFontFamilyinput.options.length; i++) {
    if (elementFontFamilyinput.options[i].value === targetValue) {
    elementFontFamilyinput.selectedIndex = i;
    break;}
    }
        elementFontFamilyinput.addEventListener("change", function(){
            target.setAttribute("data-font-family",elementFontFamilyinput.value);
            propertiesEditor(target);})
    }
    //--------------------------------------------------
let elementTextAligninput = document.getElementById("elementTextAligninput");

if (elementTextAligninput) {
    let targetValue = target.getAttribute("data-text-align");
    for (let i = 0; i < elementTextAligninput.options.length; i++) {
    if (elementTextAligninput.options[i].value === targetValue) {
    elementTextAligninput.selectedIndex = i;
    break;}
    }
        elementTextAligninput.addEventListener("change", function(){
            target.setAttribute("data-text-align",elementTextAligninput.value);
            propertiesEditor(target);})
    }
    //--------------------------------------------------
let elementFontColorinput = document.getElementById("elementfontcolorinput");

if(elementFontColorinput){
    let targetValue = target.getAttribute("data-font-color");
    elementFontColorinput.value = targetValue;
    elementFontColorinput.addEventListener("input", function(){
      
      target.setAttribute("data-font-color",elementFontColorinput.value);
      propertiesEditor(target);})
    }
    //----------------------
//ADVANCE
    //Margin And Padding Properties
let checkElementMargininput = document.getElementById("Check-element-Margin-input");
if (checkElementMargininput) {
    let targetValue = target.getAttribute("data-margin-check");
    if (targetValue === "true") {
        checkElementMargininput.checked = true;
    } else {
        checkElementMargininput.checked = false;
    }
  
    checkElementMargininput.addEventListener("change", function() {
      target.setAttribute("data-margin-check", checkElementMargininput.checked);
      propertiesEditor(target);
    });
  }
  //------------------------------------    
let elementMarginParaminput = document.getElementById("element-Margin-Param-input");

if (elementMarginParaminput) {
    let targetValue = target.getAttribute("data-margin-parameter");
    for (let i = 0; i < elementMarginParaminput.options.length; i++) {
    if (elementMarginParaminput.options[i].value === targetValue) {
    elementMarginParaminput.selectedIndex = i;
    break;}
    }
        elementMarginParaminput.addEventListener("change", function(){
            target.setAttribute("data-margin-parameter",elementMarginParaminput.value);
            propertiesEditor(target);})
    }
    //--------------------------------------------------
let elementMarginTopinput = document.getElementById("element-Margin-Top-input");

if(elementMarginTopinput){
    let targetValue = target.getAttribute("data-margin-top");
    elementMarginTopinput.value = targetValue;
    elementMarginTopinput.addEventListener("input", function(){
      
      target.setAttribute("data-margin-top",elementMarginTopinput.value);
      propertiesEditor(target);})
    }
    //----------------------
let elementMarginRightinput = document.getElementById("element-Margin-Right-input");

if(elementMarginRightinput){
    let targetValue = target.getAttribute("data-margin-right");
    elementMarginRightinput.value = targetValue;
    elementMarginRightinput.addEventListener("input", function(){
      
      target.setAttribute("data-margin-right",elementMarginRightinput.value);
      propertiesEditor(target);})
    }
    //----------------------
let elementMarginBottominput = document.getElementById("element-Margin-Bottom-input");

if(elementMarginBottominput){
    let targetValue = target.getAttribute("data-margin-bottom");
    elementMarginBottominput.value = targetValue;
    elementMarginBottominput.addEventListener("input", function(){
      
      target.setAttribute("data-margin-bottom",elementMarginBottominput.value);
      propertiesEditor(target);})
    }
    //----------------------
let elementMarginLeftinput = document.getElementById("element-Margin-Left-input");

if(elementMarginLeftinput){
    let targetValue = target.getAttribute("data-margin-left");
    elementMarginLeftinput.value = targetValue;
    elementMarginLeftinput.addEventListener("input", function(){
      
      target.setAttribute("data-margin-left",elementMarginLeftinput.value);
      propertiesEditor(target);})
    }
    //----------------------
let checkElementPaddinginput = document.getElementById("Check-element-Padding-input");
if (checkElementPaddinginput) {
    let targetValue = target.getAttribute("data-padding-check");
    if (targetValue === "true") {
        checkElementPaddinginput.checked = true;
    } else {
        checkElementPaddinginput.checked = false;
    }
  
    checkElementPaddinginput.addEventListener("change", function() {
      target.setAttribute("data-padding-check", checkElementPaddinginput.checked);
      propertiesEditor(target);
    });
  }
  //------------------------------------    
let elementPaddingParaminput = document.getElementById("element-Padding-Param-input");

if (elementPaddingParaminput) {
    let targetValue = target.getAttribute("data-padding-parameter");
    for (let i = 0; i < elementPaddingParaminput.options.length; i++) {
    if (elementPaddingParaminput.options[i].value === targetValue) {
    elementPaddingParaminput.selectedIndex = i;
    break;}
    }
        elementPaddingParaminput.addEventListener("change", function(){
            target.setAttribute("data-padding-parameter",elementPaddingParaminput.value);
            propertiesEditor(target);})
    }
    //--------------------------------------------------
let elementPaddingTopinput = document.getElementById("element-Padding-Top-input");

if(elementPaddingTopinput){
    let targetValue = target.getAttribute("data-padding-top");
    elementPaddingTopinput.value = targetValue;
    elementPaddingTopinput.addEventListener("input", function(){
      
      target.setAttribute("data-padding-top",elementPaddingTopinput.value);
      propertiesEditor(target);})
    }
    //----------------------
let elementPaddingRightinput = document.getElementById("element-Padding-Right-input");

if(elementPaddingRightinput){
    let targetValue = target.getAttribute("data-padding-right");
    elementPaddingRightinput.value = targetValue;
    elementPaddingRightinput.addEventListener("input", function(){
      
      target.setAttribute("data-padding-right",elementPaddingRightinput.value);
      propertiesEditor(target);})
    }
    //----------------------
let elementPaddingBottominput = document.getElementById("element-Padding-Bottom-input");

if(elementPaddingBottominput){
    let targetValue = target.getAttribute("data-padding-bottom");
    elementPaddingBottominput.value = targetValue;
    elementPaddingBottominput.addEventListener("input", function(){
      
      target.setAttribute("data-padding-bottom",elementPaddingBottominput.value);
      propertiesEditor(target);})
    }
    //----------------------
let elementPaddingLeftinput = document.getElementById("element-Padding-Left-input");

if(elementPaddingLeftinput){
    let targetValue = target.getAttribute("data-padding-left");
    elementPaddingLeftinput.value = targetValue;
    elementPaddingLeftinput.addEventListener("input", function(){
      
      target.setAttribute("data-padding-left",elementPaddingLeftinput.value);
      propertiesEditor(target);})
    }
    //----------------------

    //Data-Atribute
let elementIdInput = document.getElementById("elementt-Id-Input");

if(elementIdInput){
    let targetValue = target.getAttribute("id");
    let oldValue = `${targetValue}`;
    elementIdInput.value = targetValue;
    elementIdInput.addEventListener("change", function(){
    // Menghapus karakter yang tidak diizinkan dalam ID
    let validId = elementIdInput.value.replace(/[^A-Za-z0-9-_]/g, '');

  // Memastikan ID tidak diawali dengan angka
  if (/^[0-9]/.test(validId)) {
    validId = 'id-' + validId;
  }
  elementIdInput.value = validId;
        checkUniqueId();
        function checkUniqueId() {
            let inputValue = elementIdInput.value;
            // Memeriksa apakah nilai sudah ada dalam CssIdArray
            if (CssIdArray.includes(inputValue)) {
              let count = 1;
              let hex = dateToHex();
              let newId = "id" + hex + owner + count;
          
            // Menghapus nilai lama dari CssIdArray
            let index = CssIdArray.indexOf(oldValue);
            CssIdArray.splice(index, 1);
            CssIdArray.push(newId);
            elementIdInput.value = newId;
            // Lakukan tindakan selanjutnya dengan nilai unik inputValue
            target.setAttribute("id",newId);
            propertiesEditor(target);
            layoutConstructor(target,'change-id');
            }
            else {
              let index = CssIdArray.indexOf(oldValue);
              CssIdArray.splice(index, 1);
              CssIdArray.push(inputValue);
              // Lakukan tindakan selanjutnya dengan nilai unik inputValue
              target.setAttribute("id",elementIdInput.value);
              propertiesEditor(target);
              layoutConstructor(target,'change-id');
            }
            // console.log(CssIdArray)
          }

          function dateToHex() {
            const currentTime = Date.now();
            const hexValue = currentTime.toString(16);
            return hexValue;
          }
      })
    }
    //----------------------
let elementMainClassInput = document.getElementById("element-MainClass-Input");

if(elementMainClassInput){
    let targetValue = target.getAttribute("Mainclass");
    elementMainClassInput.value = targetValue;
    elementMainClassInput.addEventListener("input", function(){
         // Menghapus karakter yang tidak diizinkan dalam ID
    let validId = elementMainClassInput.value.replace(/[^A-Za-z0-9-_]/g, '');

    // Memastikan ID tidak diawali dengan angka
    if (/^[0-9]/.test(validId)) {
      validId = 'id-' + validId;
    }
    elementMainClassInput.value = validId;
        checkUniqueMainClass();
        function checkUniqueMainClass() {
            let inputValue = elementMainClassInput.value;
            let oldValue = elementMainClassInput.value;
            // Memeriksa apakah nilai sudah ada dalam CssIdArray
            if (MainClassArray.includes(inputValue)) {
              let uniqueIdFound = false;
              let count = 1;
          
              while (!uniqueIdFound) {
                let newId = "LazyClass" + Math.floor(Math.random() * 99) + count;
                count++;
          
                if (!MainClassArray.includes(newId)) {
                  inputValue = newId;
                  uniqueIdFound = true;
                }
              }
            }
          
            // Menambahkan nilai ke dalam MainClassArray
            MainClassArray.push(inputValue);
          
            // Menghapus nilai lama dari MainClassArray
            let index = MainClassArray.indexOf(oldValue);
            MainClassArray.splice(index, 1);
            elementMainClassInput.value = inputValue;
        }
    
      target.setAttribute("Mainclass",elementMainClassInput.value);
      SetClass();
      propertiesEditor(target);})
    }
    //----------------------
let elementOtherClassInput = document.getElementById("element-Other-Class-input");

if(elementOtherClassInput){
    let targetValue = target.getAttribute("another-class");
    elementOtherClassInput.value = targetValue;
    elementOtherClassInput.addEventListener("input", function(){
      
      target.setAttribute("another-class",elementOtherClassInput.value);
      SetClass();
      propertiesEditor(target);})
    }
    //----------------------

function SetClass(){
    let MainClass = target.getAttribute("Mainclass");
    let otherClass = target.getAttribute("another-class");
    if(targetidentity === 'icon'){
      otherClass = "";
      const targetanotherClass = target.getAttribute("another-class");
      const targeticonClass = target.getAttribute("icon-class");
      otherClass = targeticonClass + " " + targetanotherClass;
    }
    if(MainClass,otherClass){
        target.setAttribute("class",MainClass + " " + otherClass);
    }
    if(!otherClass){
        target.setAttribute("class",MainClass);
    }
    if(!MainClass){
        target.setAttribute("class",otherClass);
    }
}

    //Advance Properties
let elementPositionInput = document.getElementById("element-Position-Input");

if (elementPositionInput) {
    let targetValue = target.getAttribute("data-element-position");
    for (let i = 0; i < elementPositionInput.options.length; i++) {
    if (elementPositionInput.options[i].value === targetValue) {
    elementPositionInput.selectedIndex = i;
    break;}
    }
        elementPositionInput.addEventListener("change", function(){
            target.setAttribute("data-element-position",elementPositionInput.value);
            propertiesEditor(target);})
    }
    //--------------------------------------------------
let elementCursorInput = document.getElementById("element-Cursor-Input");

if (elementCursorInput) {
    let targetValue = target.getAttribute("data-element-cursor");
    for (let i = 0; i < elementCursorInput.options.length; i++) {
    if (elementCursorInput.options[i].value === targetValue) {
    elementCursorInput.selectedIndex = i;
    break;}
    }
        elementCursorInput.addEventListener("change", function(){
            target.setAttribute("data-element-cursor",elementCursorInput.value);
            propertiesEditor(target);})
    }
    //--------------------------------------------------
let elementTransitionInput = document.getElementById("element-transition-Input");

if(elementTransitionInput){
  let targetValue = target.getAttribute("data-element-transition");
  elementTransitionInput.value = targetValue;
  elementTransitionInput.addEventListener("input", function(){
    if(elementTransitionInput.value < 0 ){elementTransitionInput.value = ""}
    target.setAttribute("data-element-transition",elementTransitionInput.value);
    propertiesEditor(target);})
  }
  //----------------------
let cssDestroy = document.getElementById("Check-styling-destroy");
if (cssDestroy) {
    let targetValue = target.getAttribute("data-css-ignore");
    if (targetValue === "true") {
        cssDestroy.checked = true;
    } else {
        cssDestroy.checked = false;
    }
  
    cssDestroy.addEventListener("change", function() {
      target.setAttribute("data-css-ignore", cssDestroy.checked);
      propertiesEditor(target);
    });
  }
  //------------------------------------    
let elementZIndexInput = document.getElementById("element-Z-Index-Input");

if(elementZIndexInput){
    let targetValue = target.getAttribute("data-element-z-index");
    elementZIndexInput.value = targetValue;
    elementZIndexInput.addEventListener("input", function(){
      if(elementZIndexInput.value > 5000){
        elementZIndexInput.value = 5000;
      }
      target.setAttribute("data-element-z-index",elementZIndexInput.value);
      propertiesEditor(target);})
    }
    //----------------------
//opacity

let elementOpacityInput = document.getElementById("element-opacity-Input");
if(elementOpacityInput){
let targetValue = target.getAttribute("data-element-opacity");
elementOpacityInput.value = targetValue;
elementOpacityInput.addEventListener("input", function(){
  
  target.setAttribute("data-element-opacity",elementOpacityInput.value);
  propertiesEditor(target);})
}
//----------------------
// Hover //============
let elementOpacityInput_Hover = document.getElementById("element-opacity-Input-hover");
if(elementOpacityInput_Hover){
let targetValue = target.getAttribute("data-element-opacity-hover");
elementOpacityInput_Hover.value = targetValue;
elementOpacityInput_Hover.addEventListener("input", function(){
  
  target.setAttribute("data-element-opacity-hover",elementOpacityInput_Hover.value);
  propertiesEditor(target);})
}
//----------------------
// Active //===========
let elementOpacityInput_Active = document.getElementById("element-opacity-Input-active");
if(elementOpacityInput_Active){
let targetValue = target.getAttribute("data-element-opacity-active");
elementOpacityInput_Active.value = targetValue;
elementOpacityInput_Active.addEventListener("input", function(){
  
  target.setAttribute("data-element-opacity-active",elementOpacityInput_Active.value);
  propertiesEditor(target);})
}
//----------------------
// Tablet //===========
let elementOpacityInput_Tablet = document.getElementById("element-opacity-Input-tablet");
if(elementOpacityInput_Tablet){
let targetValue = target.getAttribute("data-element-opacity-tablet");
elementOpacityInput_Tablet.value = targetValue;
elementOpacityInput_Tablet.addEventListener("input", function(){
  
  target.setAttribute("data-element-opacity-tablet",elementOpacityInput_Tablet.value);
  propertiesEditor(target);})
}
//----------------------
// Mobile //===========
let elementOpacityInput_Mobile = document.getElementById("element-opacity-Input-mobile");
if(elementOpacityInput_Mobile){
let targetValue = target.getAttribute("data-element-opacity-mobile");
elementOpacityInput_Mobile.value = targetValue;
elementOpacityInput_Mobile.addEventListener("input", function(){
  
  target.setAttribute("data-element-opacity-mobile",elementOpacityInput_Mobile.value);
  propertiesEditor(target);})
}
//----------------------

// Transform Properties

//Transform Porpoerties untuk semua pseudo-class langsung ditulis dibawah

let checkElementTransform = document.getElementById("Check-Element-Transform-Input");
if (checkElementTransform) {
    let targetValue = target.getAttribute("data-transform-check");
    if (targetValue === "true") {
      checkElementTransform.checked = true;
    } else {
      checkElementTransform.checked = false;
    }
  
    checkElementTransform.addEventListener("change", function() {
      target.setAttribute("data-transform-check", checkElementTransform.checked);
      propertiesEditor(target);
    });
  }//=========================================
  //=== Hover ==================================
let checkElementTransform_Hover = document.getElementById("Check-Element-Transform-Input-hover");
if (checkElementTransform_Hover) {
    let targetValue = target.getAttribute("data-transform-check-hover");
    if (targetValue === "true") {
      checkElementTransform_Hover.checked = true;
    } else {
      checkElementTransform_Hover.checked = false;
    }
  
    checkElementTransform_Hover.addEventListener("change", function() {
      target.setAttribute("data-transform-check-hover", checkElementTransform_Hover.checked);
      propertiesEditor(target);
    });
  }//=========================================
  //=== Active =================================
  let checkElementTransform_Active = document.getElementById("Check-Element-Transform-Input-active");
if (checkElementTransform_Active) {
    let targetValue = target.getAttribute("data-transform-check-active");
    if (targetValue === "true") {
      checkElementTransform_Active.checked = true;
    } else {
      checkElementTransform_Active.checked = false;
    }
  
    checkElementTransform_Active.addEventListener("change", function() {
      target.setAttribute("data-transform-check-active", checkElementTransform_Active.checked);
      propertiesEditor(target);
    });
  }//=========================================
  //=== Tablet =================================
let checkElementTransform_Tablet = document.getElementById("Check-Element-Transform-Input-tablet");
if (checkElementTransform_Tablet) {
    let targetValue = target.getAttribute("data-transform-check-tablet");
    if (targetValue === "true") {
      checkElementTransform_Tablet.checked = true;
    } else {
      checkElementTransform_Tablet.checked = false;
    }
  
    checkElementTransform_Tablet.addEventListener("change", function() {
      target.setAttribute("data-transform-check-tablet", checkElementTransform_Tablet.checked);
      propertiesEditor(target);
    });
  }//=========================================
  //=== Mobile =================================
  let checkElementTransform_Mobile = document.getElementById("Check-Element-Transform-Input-mobile");
if (checkElementTransform_Mobile) {
    let targetValue = target.getAttribute("data-transform-check-mobile");
    if (targetValue === "true") {
      checkElementTransform_Mobile.checked = true;
    } else {
      checkElementTransform_Mobile.checked = false;
    }
  
    checkElementTransform_Mobile.addEventListener("change", function() {
      target.setAttribute("data-transform-check-mobile", checkElementTransform_Mobile.checked);
      propertiesEditor(target);
    });
  }//=========================================
  if(checkElementTransform || checkElementTransform_Hover || checkElementTransform_Active || 
    checkElementTransform_Tablet || checkElementTransform_Mobile){
      checkElementTransform.addEventListener("change", checkedTransform);
      checkElementTransform_Hover.addEventListener("change", checkedTransform);
      checkElementTransform_Active.addEventListener("change", checkedTransform);
      checkElementTransform_Tablet.addEventListener("change", checkedTransform);
      checkElementTransform_Mobile.addEventListener("change", checkedTransform);
      checkedTransform();
    function checkedTransform(){
      if(checkElementTransform.checked === true ||
        checkElementTransform_Hover.checked === true ||
        checkElementTransform_Active.checked === true ||
        checkElementTransform_Tablet.checked === true ||
        checkElementTransform_Mobile.checked === true){
          let transFormDiv = document.getElementById("transform-element-open-hide");
          transFormDiv.setAttribute("class","");

      } else {
        let transFormDiv = document.getElementById("transform-element-open-hide");
          transFormDiv.setAttribute("class","none-mode");
      }
    }
  }
  //------------------------------------   

  let elementTranslateX_Input = document.getElementById("element-translate-x-Input");
  if(elementTranslateX_Input){
  let targetValue = target.getAttribute("data-transform-translate-x");
  elementTranslateX_Input.value = targetValue;
  elementTranslateX_Input.addEventListener("input", function(){
    
    target.setAttribute("data-transform-translate-x",elementTranslateX_Input.value);
    propertiesEditor(target);})
  }
  //----------------------
  // Hover //============
  let elementTranslateX_Input_Hover = document.getElementById("element-translate-x-Input-hover");
  if(elementTranslateX_Input_Hover){
  let targetValue = target.getAttribute("data-transform-translate-x-hover");
  elementTranslateX_Input_Hover.value = targetValue;
  elementTranslateX_Input_Hover.addEventListener("input", function(){
    
    target.setAttribute("data-transform-translate-x-hover",elementTranslateX_Input_Hover.value);
    propertiesEditor(target);})
  }
  //----------------------
  // Active //===========
  let elementTranslateX_Input_Active = document.getElementById("element-translate-x-Input-active");
  if(elementTranslateX_Input_Active){
  let targetValue = target.getAttribute("data-transform-translate-x-active");
  elementTranslateX_Input_Active.value = targetValue;
  elementTranslateX_Input_Active.addEventListener("input", function(){
    
    target.setAttribute("data-transform-translate-x-active",elementTranslateX_Input_Active.value);
    propertiesEditor(target);})
  }
  //----------------------
  // Tablet //===========
  let elementTranslateX_Input_Tablet = document.getElementById("element-translate-x-Input-tablet");
  if(elementTranslateX_Input_Tablet){
  let targetValue = target.getAttribute("data-transform-translate-x-tablet");
  elementTranslateX_Input_Tablet.value = targetValue;
  elementTranslateX_Input_Tablet.addEventListener("input", function(){
    
    target.setAttribute("data-transform-translate-x-tablet",elementTranslateX_Input_Tablet.value);
    propertiesEditor(target);})
  }
  //----------------------
  // Mobile //===========
  let elementTranslateX_Input_Mobile = document.getElementById("element-translate-x-Input-mobile");
  if(elementTranslateX_Input_Mobile){
  let targetValue = target.getAttribute("data-transform-translate-x-mobile");
  elementTranslateX_Input_Mobile.value = targetValue;
  elementTranslateX_Input_Mobile.addEventListener("input", function(){
    
    target.setAttribute("data-transform-translate-x-mobile",elementTranslateX_Input_Mobile.value);
    propertiesEditor(target);})
  }
  //----------------------

  let elementTranslateY_Input = document.getElementById("element-translate-y-Input");
  if(elementTranslateY_Input){
  let targetValue = target.getAttribute("data-transform-translate-y");
  elementTranslateY_Input.value = targetValue;
  elementTranslateY_Input.addEventListener("input", function(){
    
    target.setAttribute("data-transform-translate-y",elementTranslateY_Input.value);
    propertiesEditor(target);})
  }
  //----------------------
  // Hover //============
  let elementTranslateY_Input_Hover = document.getElementById("element-translate-y-Input-hover");
  if(elementTranslateY_Input_Hover){
  let targetValue = target.getAttribute("data-transform-translate-y-hover");
  elementTranslateY_Input_Hover.value = targetValue;
  elementTranslateY_Input_Hover.addEventListener("input", function(){
    
    target.setAttribute("data-transform-translate-y-hover",elementTranslateY_Input_Hover.value);
    propertiesEditor(target);})
  }
  //----------------------
  // Active //===========
  let elementTranslateY_Input_Active = document.getElementById("element-translate-y-Input-active");
  if(elementTranslateY_Input_Active){
  let targetValue = target.getAttribute("data-transform-translate-y-active");
  elementTranslateY_Input_Active.value = targetValue;
  elementTranslateY_Input_Active.addEventListener("input", function(){
    
    target.setAttribute("data-transform-translate-y-active",elementTranslateY_Input_Active.value);
    propertiesEditor(target);})
  }
  //----------------------
  // Tablet //===========
  let elementTranslateY_Input_Tablet = document.getElementById("element-translate-y-Input-tablet");
  if(elementTranslateY_Input_Tablet){
  let targetValue = target.getAttribute("data-transform-translate-y-tablet");
  elementTranslateY_Input_Tablet.value = targetValue;
  elementTranslateY_Input_Tablet.addEventListener("input", function(){
    
    target.setAttribute("data-transform-translate-y-tablet",elementTranslateY_Input_Tablet.value);
    propertiesEditor(target);})
  }
  //----------------------
  // Mobile //===========
  let elementTranslateY_Input_Mobile = document.getElementById("element-translate-y-Input-mobile");
  if(elementTranslateY_Input_Mobile){
  let targetValue = target.getAttribute("data-transform-translate-y-mobile");
  elementTranslateY_Input_Mobile.value = targetValue;
  elementTranslateY_Input_Mobile.addEventListener("input", function(){
    
    target.setAttribute("data-transform-translate-y-mobile",elementTranslateY_Input_Mobile.value);
    propertiesEditor(target);})
  }
  //----------------------

  let elementRotate_Input = document.getElementById("element-rotate-Input");
  if(elementRotate_Input){
  let targetValue = target.getAttribute("data-transform-rotate");
  elementRotate_Input.value = targetValue;
  elementRotate_Input.addEventListener("input", function(){
    
    target.setAttribute("data-transform-rotate",elementRotate_Input.value);
    propertiesEditor(target);})
  }
  //----------------------
  // Hover //============
  let elementRotate_Input_Hover = document.getElementById("element-rotate-Input-hover");
  if(elementRotate_Input_Hover){
  let targetValue = target.getAttribute("data-transform-rotate-hover");
  elementRotate_Input_Hover.value = targetValue;
  elementRotate_Input_Hover.addEventListener("input", function(){
    
    target.setAttribute("data-transform-rotate-hover",elementRotate_Input_Hover.value);
    propertiesEditor(target);})
  }
  //----------------------
  // Active //===========
  let elementRotate_Input_Active = document.getElementById("element-rotate-Input-active");
  if(elementRotate_Input_Active){
  let targetValue = target.getAttribute("data-transform-rotate-active");
  elementRotate_Input_Active.value = targetValue;
  elementRotate_Input_Active.addEventListener("input", function(){
    
    target.setAttribute("data-transform-rotate-active",elementRotate_Input_Active.value);
    propertiesEditor(target);})
  }
  //----------------------
  // Tablet //===========
  let elementRotate_Input_Tablet = document.getElementById("element-rotate-Input-tablet");
  if(elementRotate_Input_Tablet){
  let targetValue = target.getAttribute("data-transform-rotate-tablet");
  elementRotate_Input_Tablet.value = targetValue;
  elementRotate_Input_Tablet.addEventListener("input", function(){
    
    target.setAttribute("data-transform-rotate-tablet",elementRotate_Input_Tablet.value);
    propertiesEditor(target);})
  }
  //----------------------
  // Mobile //===========
  let elementRotate_Input_Mobile = document.getElementById("element-rotate-Input-mobile");
  if(elementRotate_Input_Mobile){
  let targetValue = target.getAttribute("data-transform-rotate-mobile");
  elementRotate_Input_Mobile.value = targetValue;
  elementRotate_Input_Mobile.addEventListener("input", function(){
    
    target.setAttribute("data-transform-rotate-mobile",elementRotate_Input_Mobile.value);
    propertiesEditor(target);})
  }
  //----------------------


  let elementRotateY = document.getElementById("element-rotate-Y-Input");
  if(elementRotateY){
  let targetValue = target.getAttribute("data-transform-rotate-y");
  elementRotateY.value = targetValue;
  elementRotateY.addEventListener("input", function(){
    
    target.setAttribute("data-transform-rotate-y",elementRotateY.value);
    propertiesEditor(target);})
  }
  //----------------------
  // Hover //============
  let elementRotateY_Hover = document.getElementById("element-rotate-Y-Input-hover");
  if(elementRotateY_Hover){
  let targetValue = target.getAttribute("data-transform-rotate-y-hover");
  elementRotateY_Hover.value = targetValue;
  elementRotateY_Hover.addEventListener("input", function(){
    
    target.setAttribute("data-transform-rotate-y-hover",elementRotateY_Hover.value);
    propertiesEditor(target);})
  }
  //----------------------
  // Active //===========
  let elementRotateY_Active = document.getElementById("element-rotate-Y-Input-active");
  if(elementRotateY_Active){
  let targetValue = target.getAttribute("data-transform-rotate-y-active");
  elementRotateY_Active.value = targetValue;
  elementRotateY_Active.addEventListener("input", function(){
    
    target.setAttribute("data-transform-rotate-y-active",elementRotateY_Active.value);
    propertiesEditor(target);})
  }
  //----------------------
  // Tablet //===========
  let elementRotateY_Tablet = document.getElementById("element-rotate-Y-Input-tablet");
  if(elementRotateY_Tablet){
  let targetValue = target.getAttribute("data-transform-rotate-y-tablet");
  elementRotateY_Tablet.value = targetValue;
  elementRotateY_Tablet.addEventListener("input", function(){
    
    target.setAttribute("data-transform-rotate-y-tablet",elementRotateY_Tablet.value);
    propertiesEditor(target);})
  }
  //----------------------
  // Mobile //===========
  let elementRotateY_Mobile = document.getElementById("element-rotate-Y-Input-mobile");
  if(elementRotateY_Mobile){
  let targetValue = target.getAttribute("data-transform-rotate-y-mobile");
  elementRotateY_Mobile.value = targetValue;
  elementRotateY_Mobile.addEventListener("input", function(){
    
    target.setAttribute("data-transform-rotate-y-mobile",elementRotateY_Mobile.value);
    propertiesEditor(target);})
  }
  //----------------------


  let elementRotateX = document.getElementById("element-rotate-X-Input");
  if(elementRotateX){
  let targetValue = target.getAttribute("data-transform-rotate-x");
  elementRotateX.value = targetValue;
  elementRotateX.addEventListener("input", function(){
    
    target.setAttribute("data-transform-rotate-x",elementRotateX.value);
    propertiesEditor(target);})
  }
  //----------------------
  // Hover //============
  let elementRotateX_Hover = document.getElementById("element-rotate-X-Input-hover");
  if(elementRotateX_Hover){
  let targetValue = target.getAttribute("data-transform-rotate-x-hover");
  elementRotateX_Hover.value = targetValue;
  elementRotateX_Hover.addEventListener("input", function(){
    
    target.setAttribute("data-transform-rotate-x-hover",elementRotateX_Hover.value);
    propertiesEditor(target);})
  }
  //----------------------
  // Active //===========
  let elementRotateX_Active = document.getElementById("element-rotate-X-Input-active");
  if(elementRotateX_Active){
  let targetValue = target.getAttribute("data-transform-rotate-x-active");
  elementRotateX_Active.value = targetValue;
  elementRotateX_Active.addEventListener("input", function(){
    
    target.setAttribute("data-transform-rotate-x-active",elementRotateX_Active.value);
    propertiesEditor(target);})
  }
  //----------------------
  // Tablet //===========
  let elementRotateX_Tablet = document.getElementById("element-rotate-X-Input-tablet");
  if(elementRotateX_Tablet){
  let targetValue = target.getAttribute("data-transform-rotate-x-tablet");
  elementRotateX_Tablet.value = targetValue;
  elementRotateX_Tablet.addEventListener("input", function(){
    
    target.setAttribute("data-transform-rotate-x-tablet",elementRotateX_Tablet.value);
    propertiesEditor(target);})
  }
  //----------------------
  // Mobile //===========
  let elementRotateX_Mobile = document.getElementById("element-rotate-X-Input-mobile");
  if(elementRotateX_Mobile){
  let targetValue = target.getAttribute("data-transform-rotate-x-mobile");
  elementRotateX_Mobile.value = targetValue;
  elementRotateX_Mobile.addEventListener("input", function(){
    
    target.setAttribute("data-transform-rotate-x-mobile",elementRotateX_Mobile.value);
    propertiesEditor(target);})
  }
  //----------------------
  

  
let elementTranslateX = document.getElementById("element-translate-z-Input");
if(elementTranslateX){
let targetValue = target.getAttribute("data-transform-translate-z");
elementTranslateX.value = targetValue;
elementTranslateX.addEventListener("input", function(){
  
  target.setAttribute("data-transform-translate-z",elementTranslateX.value);
  propertiesEditor(target);})
}
//----------------------
// Hover //============
let elementTranslateX_Hover = document.getElementById("element-translate-z-Input-hover");
if(elementTranslateX_Hover){
let targetValue = target.getAttribute("data-transform-translate-z-hover");
elementTranslateX_Hover.value = targetValue;
elementTranslateX_Hover.addEventListener("input", function(){
  
  target.setAttribute("data-transform-translate-z-hover",elementTranslateX_Hover.value);
  propertiesEditor(target);})
}
//----------------------
// Active //===========
let elementTranslateX_Active = document.getElementById("element-translate-z-Input-active");
if(elementTranslateX_Active){
let targetValue = target.getAttribute("data-transform-translate-z-active");
elementTranslateX_Active.value = targetValue;
elementTranslateX_Active.addEventListener("input", function(){
  
  target.setAttribute("data-transform-translate-z-active",elementTranslateX_Active.value);
  propertiesEditor(target);})
}
//----------------------
// Tablet //===========
let elementTranslateX_Tablet = document.getElementById("element-translate-z-Input-tablet");
if(elementTranslateX_Tablet){
let targetValue = target.getAttribute("data-transform-translate-z-tablet");
elementTranslateX_Tablet.value = targetValue;
elementTranslateX_Tablet.addEventListener("input", function(){
  
  target.setAttribute("data-transform-translate-z-tablet",elementTranslateX_Tablet.value);
  propertiesEditor(target);})
}
//----------------------
// Mobile //===========
let elementTranslateX_Mobile = document.getElementById("element-translate-z-Input-mobile");
if(elementTranslateX_Mobile){
let targetValue = target.getAttribute("data-transform-translate-z-mobile");
elementTranslateX_Mobile.value = targetValue;
elementTranslateX_Mobile.addEventListener("input", function(){
  
  target.setAttribute("data-transform-translate-z-mobile",elementTranslateX_Mobile.value);
  propertiesEditor(target);})
}
//----------------------


  let elementScale_Input = document.getElementById("element-scale-x-Input");
  if(elementScale_Input){
  let targetValue = target.getAttribute("data-transform-scale-x");
  elementScale_Input.value = targetValue;
  elementScale_Input.addEventListener("input", function(){
    
    target.setAttribute("data-transform-scale-x",elementScale_Input.value);
    propertiesEditor(target);})
  }
  //----------------------
  // Hover //============
  let elementScale_Input_Hover = document.getElementById("element-scale-x-Input-hover");
  if(elementScale_Input_Hover){
  let targetValue = target.getAttribute("data-transform-scale-x-hover");
  elementScale_Input_Hover.value = targetValue;
  elementScale_Input_Hover.addEventListener("input", function(){
    
    target.setAttribute("data-transform-scale-x-hover",elementScale_Input_Hover.value);
    propertiesEditor(target);})
  }
  //----------------------
  // Active //===========
  let elementScale_Input_Active = document.getElementById("element-scale-x-Input-active");
  if(elementScale_Input_Active){
  let targetValue = target.getAttribute("data-transform-scale-x-active");
  elementScale_Input_Active.value = targetValue;
  elementScale_Input_Active.addEventListener("input", function(){
    
    target.setAttribute("data-transform-scale-x-active",elementScale_Input_Active.value);
    propertiesEditor(target);})
  }
  //----------------------
  // Tablet //===========
  let elementScale_Input_Tablet = document.getElementById("element-scale-x-Input-tablet");
  if(elementScale_Input_Tablet){
  let targetValue = target.getAttribute("data-transform-scale-x-tablet");
  elementScale_Input_Tablet.value = targetValue;
  elementScale_Input_Tablet.addEventListener("input", function(){
    
    target.setAttribute("data-transform-scale-x-tablet",elementScale_Input_Tablet.value);
    propertiesEditor(target);})
  }
  //----------------------
  // Mobile //===========
  let elementScale_Input_Mobile = document.getElementById("element-scale-x-Input-mobile");
  if(elementScale_Input_Mobile){
  let targetValue = target.getAttribute("data-transform-scale-x-mobile");
  elementScale_Input_Mobile.value = targetValue;
  elementScale_Input_Mobile.addEventListener("input", function(){
    
    target.setAttribute("data-transform-scale-x-mobile",elementScale_Input_Mobile.value);
    propertiesEditor(target);})
  }
  //----------------------

  let ScaleY = document.getElementById("element-scale-y-Input");
  if(ScaleY){
  let targetValue = target.getAttribute("data-transform-scale-y");
  ScaleY.value = targetValue;
  ScaleY.addEventListener("input", function(){
    
    target.setAttribute("data-transform-scale-y",ScaleY.value);
    propertiesEditor(target);})
  }
  //----------------------
  // Hover //============
  let ScaleY_Hover = document.getElementById("element-scale-y-Input-hover");
  if(ScaleY_Hover){
  let targetValue = target.getAttribute("data-transform-scale-y-hover");
  ScaleY_Hover.value = targetValue;
  ScaleY_Hover.addEventListener("input", function(){
    
    target.setAttribute("data-transform-scale-y-hover",ScaleY_Hover.value);
    propertiesEditor(target);})
  }
  //----------------------
  // Active //===========
  let ScaleY_Active = document.getElementById("element-scale-y-Input-active");
  if(ScaleY_Active){
  let targetValue = target.getAttribute("data-transform-scale-y-active");
  ScaleY_Active.value = targetValue;
  ScaleY_Active.addEventListener("input", function(){
    
    target.setAttribute("data-transform-scale-y-active",ScaleY_Active.value);
    propertiesEditor(target);})
  }
  //----------------------
  // Tablet //===========
  let ScaleY_Tablet = document.getElementById("element-scale-y-Input-tablet");
  if(ScaleY_Tablet){
  let targetValue = target.getAttribute("data-transform-scale-y-tablet");
  ScaleY_Tablet.value = targetValue;
  ScaleY_Tablet.addEventListener("input", function(){
    
    target.setAttribute("data-transform-scale-y-tablet",ScaleY_Tablet.value);
    propertiesEditor(target);})
  }
  //----------------------
  // Mobile //===========
  let ScaleY_Mobile = document.getElementById("element-scale-y-Input-mobile");
  if(ScaleY_Mobile){
  let targetValue = target.getAttribute("data-transform-scale-y-mobile");
  ScaleY_Mobile.value = targetValue;
  ScaleY_Mobile.addEventListener("input", function(){
    
    target.setAttribute("data-transform-scale-y-mobile",ScaleY_Mobile.value);
    propertiesEditor(target);})
  }
  //----------------------
  
  
let elementScaleX = document.getElementById("element-scale-z-Input");
if(elementScaleX){
let targetValue = target.getAttribute("data-transform-scale-z");
elementScaleX.value = targetValue;
elementScaleX.addEventListener("input", function(){
  
  target.setAttribute("data-transform-scale-z",elementScaleX.value);
  propertiesEditor(target);})
}
//----------------------
// Hover //============
let elementScaleX_Hover = document.getElementById("element-scale-z-Input-hover");
if(elementScaleX_Hover){
let targetValue = target.getAttribute("data-transform-scale-z-hover");
elementScaleX_Hover.value = targetValue;
elementScaleX_Hover.addEventListener("input", function(){
  
  target.setAttribute("data-transform-scale-z-hover",elementScaleX_Hover.value);
  propertiesEditor(target);})
}
//----------------------
// Active //===========
let elementScaleX_Active = document.getElementById("element-scale-z-Input-active");
if(elementScaleX_Active){
let targetValue = target.getAttribute("data-transform-scale-z-active");
elementScaleX_Active.value = targetValue;
elementScaleX_Active.addEventListener("input", function(){
  
  target.setAttribute("data-transform-scale-z-active",elementScaleX_Active.value);
  propertiesEditor(target);})
}
//----------------------
// Tablet //===========
let elementScaleX_Tablet = document.getElementById("element-scale-z-Input-tablet");
if(elementScaleX_Tablet){
let targetValue = target.getAttribute("data-transform-scale-z-tablet");
elementScaleX_Tablet.value = targetValue;
elementScaleX_Tablet.addEventListener("input", function(){
  
  target.setAttribute("data-transform-scale-z-tablet",elementScaleX_Tablet.value);
  propertiesEditor(target);})
}
//----------------------
// Mobile //===========
let elementScaleX_Mobile = document.getElementById("element-scale-z-Input-mobile");
if(elementScaleX_Mobile){
let targetValue = target.getAttribute("data-transform-scale-z-mobile");
elementScaleX_Mobile.value = targetValue;
elementScaleX_Mobile.addEventListener("input", function(){
  
  target.setAttribute("data-transform-scale-z-mobile",elementScaleX_Mobile.value);
  propertiesEditor(target);})
}
//----------------------


let elementPerspective = document.getElementById("element-perspective-Input");
if(elementPerspective){
let targetValue = target.getAttribute("data-transform-perspective");
elementPerspective.value = targetValue;
elementPerspective.addEventListener("input", function(){
  
  target.setAttribute("data-transform-perspective",elementPerspective.value);
  propertiesEditor(target);})
}
//----------------------
// Hover //============
let elementPerspective_Hover = document.getElementById("element-perspective-Input-hover");
if(elementPerspective_Hover){
let targetValue = target.getAttribute("data-transform-perspective-hover");
elementPerspective_Hover.value = targetValue;
elementPerspective_Hover.addEventListener("input", function(){
  
  target.setAttribute("data-transform-perspective-hover",elementPerspective_Hover.value);
  propertiesEditor(target);})
}
//----------------------
// Active //===========
let elementPerspective_Active = document.getElementById("element-perspective-Input-active");
if(elementPerspective_Active){
let targetValue = target.getAttribute("data-transform-perspective-active");
elementPerspective_Active.value = targetValue;
elementPerspective_Active.addEventListener("input", function(){
  
  target.setAttribute("data-transform-perspective-active",elementPerspective_Active.value);
  propertiesEditor(target);})
}
//----------------------
// Tablet //===========
let elementPerspective_Tablet = document.getElementById("element-perspective-Input-tablet");
if(elementPerspective_Tablet){
let targetValue = target.getAttribute("data-transform-perspective-tablet");
elementPerspective_Tablet.value = targetValue;
elementPerspective_Tablet.addEventListener("input", function(){
  
  target.setAttribute("data-transform-perspective-tablet",elementPerspective_Tablet.value);
  propertiesEditor(target);})
}
//----------------------
// Mobile //===========
let elementPerspective_Mobile = document.getElementById("element-perspective-Input-mobile");
if(elementPerspective_Mobile){
let targetValue = target.getAttribute("data-transform-perspective-mobile");
elementPerspective_Mobile.value = targetValue;
elementPerspective_Mobile.addEventListener("input", function(){
  
  target.setAttribute("data-transform-perspective-mobile",elementPerspective_Mobile.value);
  propertiesEditor(target);})
}
//----------------------


let elementPerspectiveX = document.getElementById("element-perspective-origin-x-Input");
if(elementPerspectiveX){
let targetValue = target.getAttribute("data-transform-perspective-x");
elementPerspectiveX.value = targetValue;
elementPerspectiveX.addEventListener("input", function(){
  
  target.setAttribute("data-transform-perspective-x",elementPerspectiveX.value);
  propertiesEditor(target);})
}
//----------------------
// Hover //============
let elementPerspectiveX_Hover = document.getElementById("element-perspective-origin-x-Input-hover");
if(elementPerspectiveX_Hover){
let targetValue = target.getAttribute("data-transform-perspective-x-hover");
elementPerspectiveX_Hover.value = targetValue;
elementPerspectiveX_Hover.addEventListener("input", function(){
  
  target.setAttribute("data-transform-perspective-x-hover",elementPerspectiveX_Hover.value);
  propertiesEditor(target);})
}
//----------------------
// Active //===========
let elementPerspectiveX_Active = document.getElementById("element-perspective-origin-x-Input-active");
if(elementPerspectiveX_Active){
let targetValue = target.getAttribute("data-transform-perspective-x-active");
elementPerspectiveX_Active.value = targetValue;
elementPerspectiveX_Active.addEventListener("input", function(){
  
  target.setAttribute("data-transform-perspective-x-active",elementPerspectiveX_Active.value);
  propertiesEditor(target);})
}
//----------------------
// Tablet //===========
let elementPerspectiveX_Tablet = document.getElementById("element-perspective-origin-x-Input-tablet");
if(elementPerspectiveX_Tablet){
let targetValue = target.getAttribute("data-transform-perspective-x-tablet");
elementPerspectiveX_Tablet.value = targetValue;
elementPerspectiveX_Tablet.addEventListener("input", function(){
  
  target.setAttribute("data-transform-perspective-x-tablet",elementPerspectiveX_Tablet.value);
  propertiesEditor(target);})
}
//----------------------
// Mobile //===========
let elementPerspectiveX_Mobile = document.getElementById("element-perspective-origin-x-Input-mobile");
if(elementPerspectiveX_Mobile){
let targetValue = target.getAttribute("data-transform-perspective-x-mobile");
elementPerspectiveX_Mobile.value = targetValue;
elementPerspectiveX_Mobile.addEventListener("input", function(){
  
  target.setAttribute("data-transform-perspective-x-mobile",elementPerspectiveX_Mobile.value);
  propertiesEditor(target);})
}
//----------------------


let elementPerspectiveY = document.getElementById("element-perspective-origin-y-Input");
if(elementPerspectiveY){
let targetValue = target.getAttribute("data-transform-perspective-y");
elementPerspectiveY.value = targetValue;
elementPerspectiveY.addEventListener("input", function(){
  
  target.setAttribute("data-transform-perspective-y",elementPerspectiveY.value);
  propertiesEditor(target);})
}
//----------------------
// Hover //============
let elementPerspectiveY_Hover = document.getElementById("element-perspective-origin-y-Input-hover");
if(elementPerspectiveY_Hover){
let targetValue = target.getAttribute("data-transform-perspective-y-hover");
elementPerspectiveY_Hover.value = targetValue;
elementPerspectiveY_Hover.addEventListener("input", function(){
  
  target.setAttribute("data-transform-perspective-y-hover",elementPerspectiveY_Hover.value);
  propertiesEditor(target);})
}
//----------------------
// Active //===========
let elementPerspectiveY_Active = document.getElementById("element-perspective-origin-y-Input-active");
if(elementPerspectiveY_Active){
let targetValue = target.getAttribute("data-transform-perspective-y-active");
elementPerspectiveY_Active.value = targetValue;
elementPerspectiveY_Active.addEventListener("input", function(){
  
  target.setAttribute("data-transform-perspective-y-active",elementPerspectiveY_Active.value);
  propertiesEditor(target);})
}
//----------------------
// Tablet //===========
let elementPerspectiveY_Tablet = document.getElementById("element-perspective-origin-y-Input-tablet");
if(elementPerspectiveY_Tablet){
let targetValue = target.getAttribute("data-transform-perspective-y-tablet");
elementPerspectiveY_Tablet.value = targetValue;
elementPerspectiveY_Tablet.addEventListener("input", function(){
  
  target.setAttribute("data-transform-perspective-y-tablet",elementPerspectiveY_Tablet.value);
  propertiesEditor(target);})
}
//----------------------
// Mobile //===========
let elementPerspectiveY_Mobile = document.getElementById("element-perspective-origin-y-Input-mobile");
if(elementPerspectiveY_Mobile){
let targetValue = target.getAttribute("data-transform-perspective-y-mobile");
elementPerspectiveY_Mobile.value = targetValue;
elementPerspectiveY_Mobile.addEventListener("input", function(){
  
  target.setAttribute("data-transform-perspective-y-mobile",elementPerspectiveY_Mobile.value);
  propertiesEditor(target);})
}
//----------------------


  let elementSkew_X_Input = document.getElementById("element-skew-x-Input");
  if(elementSkew_X_Input){
  let targetValue = target.getAttribute("data-transform-skew-x");
  elementSkew_X_Input.value = targetValue;
  elementSkew_X_Input.addEventListener("input", function(){
    
    target.setAttribute("data-transform-skew-x",elementSkew_X_Input.value);
    propertiesEditor(target);})
  }
  //----------------------
  // Hover //============
  let elementSkew_X_Input_Hover = document.getElementById("element-skew-x-Input-hover");
  if(elementSkew_X_Input_Hover){
  let targetValue = target.getAttribute("data-transform-skew-x-hover");
  elementSkew_X_Input_Hover.value = targetValue;
  elementSkew_X_Input_Hover.addEventListener("input", function(){
    
    target.setAttribute("data-transform-skew-x-hover",elementSkew_X_Input_Hover.value);
    propertiesEditor(target);})
  }
  //----------------------
  // Active //===========
  let elementSkew_X_Input_Active = document.getElementById("element-skew-x-Input-active");
  if(elementSkew_X_Input_Active){
  let targetValue = target.getAttribute("data-transform-skew-x-active");
  elementSkew_X_Input_Active.value = targetValue;
  elementSkew_X_Input_Active.addEventListener("input", function(){
    
    target.setAttribute("data-transform-skew-x-active",elementSkew_X_Input_Active.value);
    propertiesEditor(target);})
  }
  //----------------------
  // Tablet //===========
  let elementSkew_X_Input_Tablet = document.getElementById("element-skew-x-Input-tablet");
  if(elementSkew_X_Input_Tablet){
  let targetValue = target.getAttribute("data-transform-skew-x-tablet");
  elementSkew_X_Input_Tablet.value = targetValue;
  elementSkew_X_Input_Tablet.addEventListener("input", function(){
    
    target.setAttribute("data-transform-skew-x-tablet",elementSkew_X_Input_Tablet.value);
    propertiesEditor(target);})
  }
  //----------------------
  // Mobile //===========
  let elementSkew_X_Input_Mobile = document.getElementById("element-skew-x-Input-mobile");
  if(elementSkew_X_Input_Mobile){
  let targetValue = target.getAttribute("data-transform-skew-x-mobile");
  elementSkew_X_Input_Mobile.value = targetValue;
  elementSkew_X_Input_Mobile.addEventListener("input", function(){
    
    target.setAttribute("data-transform-skew-x-mobile",elementSkew_X_Input_Mobile.value);
    propertiesEditor(target);})
  }
  //----------------------

  let elementSkew_Y_Input = document.getElementById("element-skew-y-Input");
  if(elementSkew_Y_Input){
  let targetValue = target.getAttribute("data-transform-skew-y");
  elementSkew_Y_Input.value = targetValue;
  elementSkew_Y_Input.addEventListener("input", function(){
    
    target.setAttribute("data-transform-skew-y",elementSkew_Y_Input.value);
    propertiesEditor(target);})
  }
  //----------------------
  // Hover //============
  let elementSkew_Y_Input_Hover = document.getElementById("element-skew-y-Input-hover");
  if(elementSkew_Y_Input_Hover){
  let targetValue = target.getAttribute("data-transform-skew-y-hover");
  elementSkew_Y_Input_Hover.value = targetValue;
  elementSkew_Y_Input_Hover.addEventListener("input", function(){
    
    target.setAttribute("data-transform-skew-y-hover",elementSkew_Y_Input_Hover.value);
    propertiesEditor(target);})
  }
  //----------------------
  // Active //===========
  let elementSkew_Y_Input_Active = document.getElementById("element-skew-y-Input-active");
  if(elementSkew_Y_Input_Active){
  let targetValue = target.getAttribute("data-transform-skew-y-active");
  elementSkew_Y_Input_Active.value = targetValue;
  elementSkew_Y_Input_Active.addEventListener("input", function(){
    
    target.setAttribute("data-transform-skew-y-active",elementSkew_Y_Input_Active.value);
    propertiesEditor(target);})
  }
  //----------------------
  // Tablet //===========
  let elementSkew_Y_Input_Tablet = document.getElementById("element-skew-y-Input-tablet");
  if(elementSkew_Y_Input_Tablet){
  let targetValue = target.getAttribute("data-transform-skew-y-tablet");
  elementSkew_Y_Input_Tablet.value = targetValue;
  elementSkew_Y_Input_Tablet.addEventListener("input", function(){
    
    target.setAttribute("data-transform-skew-y-tablet",elementSkew_Y_Input_Tablet.value);
    propertiesEditor(target);})
  }
  //----------------------
  // Mobile //===========
  let elementSkew_Y_Input_Mobile = document.getElementById("element-skew-y-Input-mobile");
  if(elementSkew_Y_Input_Mobile){
  let targetValue = target.getAttribute("data-transform-skew-y-mobile");
  elementSkew_Y_Input_Mobile.value = targetValue;
  elementSkew_Y_Input_Mobile.addEventListener("input", function(){
    
    target.setAttribute("data-transform-skew-y-mobile",elementSkew_Y_Input_Mobile.value);
    propertiesEditor(target);})
  }
  //----------------------

  let elementMatrix_Input = document.getElementById("element-matrix-Input");
  if(elementMatrix_Input){
  let targetValue = target.getAttribute("data-transform-matrix");
  elementMatrix_Input.value = targetValue;
  elementMatrix_Input.addEventListener("input", function(){
    
    target.setAttribute("data-transform-matrix",elementMatrix_Input.value);
    propertiesEditor(target);})
  }
  //----------------------
  // Hover //============
  let elementMatrix_Input_Hover = document.getElementById("element-matrix-Input-hover");
  if(elementMatrix_Input_Hover){
  let targetValue = target.getAttribute("data-transform-matrix-hover");
  elementMatrix_Input_Hover.value = targetValue;
  elementMatrix_Input_Hover.addEventListener("input", function(){
    
    target.setAttribute("data-transform-matrix-hover",elementMatrix_Input_Hover.value);
    propertiesEditor(target);})
  }
  //----------------------
  // Active //===========
  let elementMatrix_Input_Active = document.getElementById("element-matrix-Input-active");
  if(elementMatrix_Input_Active){
  let targetValue = target.getAttribute("data-transform-matrix-active");
  elementMatrix_Input_Active.value = targetValue;
  elementMatrix_Input_Active.addEventListener("input", function(){
    
    target.setAttribute("data-transform-matrix-active",elementMatrix_Input_Active.value);
    propertiesEditor(target);})
  }
  //----------------------
  // Tablet //===========
  let elementMatrix_Input_Tablet = document.getElementById("element-matrix-Input-tablet");
  if(elementMatrix_Input_Tablet){
  let targetValue = target.getAttribute("data-transform-matrix-tablet");
  elementMatrix_Input_Tablet.value = targetValue;
  elementMatrix_Input_Tablet.addEventListener("input", function(){
    
    target.setAttribute("data-transform-matrix-tablet",elementMatrix_Input_Tablet.value);
    propertiesEditor(target);})
  }
  //----------------------
  // Mobile //===========
  let elementMatrix_Input_Mobile = document.getElementById("element-matrix-Input-mobile");
  if(elementMatrix_Input_Mobile){
  let targetValue = target.getAttribute("data-transform-matrix-mobile");
  elementMatrix_Input_Mobile.value = targetValue;
  elementMatrix_Input_Mobile.addEventListener("input", function(){
    
    target.setAttribute("data-transform-matrix-mobile",elementMatrix_Input_Mobile.value);
    propertiesEditor(target);})
  }
  //----------------------
            




    //Visibilites Properties
let checkElementVisibilityInput = document.getElementById("Check-Element-Visibility-Input");
if (checkElementVisibilityInput) {
    let targetValue = target.getAttribute("data-visibility-check");
    if (targetValue === "true") {
        checkElementVisibilityInput.checked = true;
    } else {
        checkElementVisibilityInput.checked = false;
    }
  
    checkElementVisibilityInput.addEventListener("change", function() {
      target.setAttribute("data-visibility-check", checkElementVisibilityInput.checked);
      propertiesEditor(target);
    });
  }
  //------------------------------------    
let elementHideOnDesktopInput = document.getElementById("element-Hide-On-Desktop-Input");
if (elementHideOnDesktopInput) {
    let targetValue = target.getAttribute("data-visibility-hide-desktop");
    if (targetValue === "true") {
        elementHideOnDesktopInput.checked = true;
    } else {
        elementHideOnDesktopInput.checked = false;
    }
  
    elementHideOnDesktopInput.addEventListener("change", function() {
      target.setAttribute("data-visibility-hide-desktop", elementHideOnDesktopInput.checked);
      propertiesEditor(target);
    });
  }
  //------------------------------------    
  let elementHideOnTabletInput = document.getElementById("element-Hide-On-Tablet-Input");
  if (elementHideOnTabletInput) {
      let targetValue = target.getAttribute("data-visibility-hide-tablet");
      if (targetValue === "true") {
          elementHideOnTabletInput.checked = true;
      } else {
          elementHideOnTabletInput.checked = false;
      }
    
      elementHideOnTabletInput.addEventListener("change", function() {
        target.setAttribute("data-visibility-hide-tablet", elementHideOnTabletInput.checked);
        propertiesEditor(target);
      });
    }
    //------------------------------------    
let elementHideOnMobileInput = document.getElementById("element-Hide-On-Mobile-Input");
if (elementHideOnMobileInput) {
    let targetValue = target.getAttribute("data-visibility-hide-mobile");
    if (targetValue === "true") {
        elementHideOnMobileInput.checked = true;
    } else {
        elementHideOnMobileInput.checked = false;
    }
  
    elementHideOnMobileInput.addEventListener("change", function() {
      target.setAttribute("data-visibility-hide-mobile", elementHideOnMobileInput.checked);
      propertiesEditor(target);
    });
  }
  //------------------------------------    
    //Custom Code Properties
let elementCustomCSSInput = document.getElementById("element-Custom-CSS-Input");

if(elementCustomCSSInput){
    let targetValue = target.getAttribute("data-custom-css");
    elementCustomCSSInput.value = targetValue;
    elementCustomCSSInput.addEventListener("input", function(){
      
      target.setAttribute("data-custom-css",elementCustomCSSInput.value);
      propertiesEditor(target);})
    }
    //----------------------
let customCSScode = document.querySelector("#element-Custom-cssCode-Input");
if(customCSScode){
  customCSScode.addEventListener("click", function(event) {
    event.preventDefault();});
  customCSScode.addEventListener("click", ()=> {
    createCodeEditor('custom css', target);
  })
}

let elementCustomJavascriptInput = document.getElementById("element-Custom-Javascript-Input");

if(elementCustomJavascriptInput){
    elementCustomJavascriptInput.addEventListener("click", function(event) {
      event.preventDefault();});
    elementCustomJavascriptInput.addEventListener('click', ()=>{
      createCodeEditor('javascript', target);
    })
    
    }
    function createCodeEditor(state,target){
      let targetValue = '';
      let legendText = '';
      let elementID = target.id;
      if(state === 'javascript'){
        targetValue = target.getAttribute("data-custom-js");
        legendText = `${elementID} Custom Javascript`;
      }
      if(state === 'custom css'){
        targetValue = target.getAttribute("data-customCode-css");
        legendText = `${elementID} Custom CSS`;
      }
      //======================//
      let newContainer = document.createElement("SECTION");
      newContainer.setAttribute("id", "body-custom-css-editor");
      let custombodyJScontainer = `<form id="BodyCustomCSS" data-id="lazydev">
      
      <fieldset data-id="formFieldset" id="formfieldsetBodyCustomCSS">
      
      <legend data-id="formlegend" id="formmakerlegendBodyCustomCSS">
      ${legendText}</legend>
      
      
        
        <div id="Newfield2" inputid="inputid2" style="width: 100%; opacity: 1;">
      <label id="NewField2" for="NewFIeld2" labelid="label2" style="width: 0% !important; display: none;">
      Textarea Field 2</label>
      <textarea fieldid="field2" id="bodyFormCustomElementEditor" name="NewFIeld2" rows="11" style="width: 564px; height: 230px;">
      ${targetValue}</textarea>
      </div>
      <div id="SavebodycustomElementEditor" inputid="inputid1" style="width: 69% !important;">
      <button button="1" style="width: 100%; font-size: 17px;">
      Save</button>
      </div>
      <div id="CloseElementEditor" inputid="inputid1" style="width: 30% !important; margin-left: 1% !important;">
      <button id="CloseElementEditor-button" style="width: 100%; font-size: 17px;">
      Close</button>
      </div>
      </fieldset>
      
      </form>`;
      newContainer.innerHTML = custombodyJScontainer;
      document.body.appendChild(newContainer);
      //======================//
      let TextareaElement = document.getElementById("bodyFormCustomElementEditor");
      gsap.from(newContainer,{scale:0, y: 350, opacity:0, duration:0.5,});
      //=================================================// 
      let buttonSave = document.getElementById("SavebodycustomElementEditor");
      const buttonClose = document.getElementById('CloseElementEditor');
      buttonClose.addEventListener("click", function(event) {
        event.preventDefault();});
      buttonClose.addEventListener('click', ()=>{
        closeEndEditor();
      })
      buttonSave.addEventListener("click", function(event) {
        event.preventDefault();});
      buttonSave.addEventListener("click", ()=> {
        if(state === 'javascript'){
          target.setAttribute('data-custom-js', TextareaElement.value);
        }
        if(state === 'custom css'){
          target.setAttribute('data-customCode-css', TextareaElement.value);
        }
        closeEndEditor();
        propertiesEditor(target);
      })
      function closeEndEditor(){
        gsap.to(newContainer, {scale:0, opacity:0, y: -250, duration: 0.4, onComplete: ()=>{
          newContainer.remove();
        }})
      }
    }
    //----------------------
// //======// _hover //====================================================// _hover //=====================

let editDisplayinput__hover = document.getElementById("editDisplayinput-hover");

if (editDisplayinput__hover) {
  let targetValue_hover = target.getAttribute("data-display-hover");
  for (let i = 0; i < editDisplayinput__hover.options.length; i++) {
    if (editDisplayinput__hover.options[i].value === targetValue_hover) {
      editDisplayinput__hover.selectedIndex = i;
      break;
    }
  }
  editDisplayinput__hover.addEventListener("change", function(){
    target.setAttribute("data-display-hover", editDisplayinput__hover.value);
    propertiesEditor(target);
  });
}

  //--------------------------------------------------
let SelectFlexDirectioninput__hover = document.getElementById("SelectFlexDirectioninput-hover");

if (SelectFlexDirectioninput__hover) {
  let targetValue = target.getAttribute("data-flex-direction-hover");
  for (let i = 0; i < SelectFlexDirectioninput__hover.options.length; i++) {
  if (SelectFlexDirectioninput__hover.options[i].value === targetValue) {
    SelectFlexDirectioninput__hover.selectedIndex = i;
  break;}
  }
    SelectFlexDirectioninput__hover.addEventListener("change", function(){
          target.setAttribute("data-flex-direction-hover",SelectFlexDirectioninput__hover.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
  let selectustifycontentinput__hover = document.getElementById("selectustifycontentinput-hover");

if (selectustifycontentinput__hover) {
  let targetValue = target.getAttribute("data-justify-content-hover");
  for (let i = 0; i < selectustifycontentinput__hover.options.length; i++) {
  if (selectustifycontentinput__hover.options[i].value === targetValue) {
    selectustifycontentinput__hover.selectedIndex = i;
  break;}
  }
          selectustifycontentinput__hover.addEventListener("change", function(){
          target.setAttribute("data-justify-content-hover",selectustifycontentinput__hover.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
  let select_align_items_input__hover = document.getElementById("select-align-items-input-hover");

if (select_align_items_input__hover) {
  let targetValue = target.getAttribute("data-align-items-hover");
  for (let i = 0; i < select_align_items_input__hover.options.length; i++) {
  if (select_align_items_input__hover.options[i].value === targetValue) {
    select_align_items_input__hover.selectedIndex = i;
  break;}
  }
  select_align_items_input__hover.addEventListener("change", function(){
          target.setAttribute("data-align-items-hover",select_align_items_input__hover.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
  let select_align_content_input__hover = document.getElementById("select-align-content-input-hover");

if (select_align_content_input__hover) {
  let targetValue = target.getAttribute("data-align-content-hover");
  for (let i = 0; i < select_align_content_input__hover.options.length; i++) {
  if (select_align_content_input__hover.options[i].value === targetValue) {
    select_align_content_input__hover.selectedIndex = i;
  break;}
  }
  select_align_content_input__hover.addEventListener("change", function(){
          target.setAttribute("data-align-content-hover",select_align_content_input__hover.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
  let selectFlexGAP_hover = document.getElementById("selectflex-gap-hover");

  if(selectFlexGAP_hover){
    let targetValue = target.getAttribute("data-flex-gap-hover");
    selectFlexGAP_hover.value = targetValue;
    selectFlexGAP_hover.addEventListener("input", function(){
      
      target.setAttribute("data-flex-gap-hover",selectFlexGAP_hover.value);
      propertiesEditor(target);})
    }
    //----------------------
    let selectFlexWRAP_hover = document.getElementById("selectflexwrapinput-hover");
    
  if (selectFlexWRAP_hover) {
    let targetValue = target.getAttribute("data-flex-wrap-hover");
    for (let i = 0; i < selectFlexWRAP_hover.options.length; i++) {
    if (selectFlexWRAP_hover.options[i].value === targetValue) {
      selectFlexWRAP_hover.selectedIndex = i;
    break;}
    }
    selectFlexWRAP_hover.addEventListener("change", function(){
            target.setAttribute("data-flex-wrap-hover",selectFlexWRAP_hover.value);
            propertiesEditor(target);})
    }
    //--------------------------------------------------
  let select_flex_grow_input__hover = document.getElementById("select-flex-grow-input-hover");

if (select_flex_grow_input__hover) {
  let targetValue = target.getAttribute("data-flex-grow-hover");
  select_flex_grow_input__hover.value = targetValue;
  select_flex_grow_input__hover.addEventListener("change", function(){
          target.setAttribute("data-flex-grow-hover",select_flex_grow_input__hover.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
  //----------------------
  let flex_shrink_edit_input__hover = document.getElementById("flex-shrink-edit-input-hover");

if(flex_shrink_edit_input__hover){
  let targetValue = target.getAttribute("data-flex-shrink-hover");
  flex_shrink_edit_input__hover.value = targetValue;
  flex_shrink_edit_input__hover.addEventListener("input", function(){
    
    target.setAttribute("data-flex-shrink-hover",flex_shrink_edit_input__hover.value);
    propertiesEditor(target);})
  }
  //---------------------- 
  let selectWidth__hover = document.getElementById("width-value-select-hover");

if (selectWidth__hover) {
  let targetValue = target.getAttribute("data-width-select-hover");
  for (let i = 0; i < selectWidth__hover.options.length; i++) {
  if (selectWidth__hover.options[i].value === targetValue) {
    selectWidth__hover.selectedIndex = i;
  break;}
  }
  selectWidth__hover.addEventListener("change", function(){
          target.setAttribute("data-width-select-hover",selectWidth__hover.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
  let selectElementWidthinput__hover = document.getElementById("selectElementWidthinput-hover");

if (selectElementWidthinput__hover) {
  let targetValue = target.getAttribute("data-width-Parameter-hover");
  for (let i = 0; i < selectElementWidthinput__hover.options.length; i++) {
  if (selectElementWidthinput__hover.options[i].value === targetValue) {
    selectElementWidthinput__hover.selectedIndex = i;
  break;}
  }
  selectElementWidthinput__hover.addEventListener("change", function(){
          target.setAttribute("data-width-Parameter-hover",selectElementWidthinput__hover.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
  let WidthElementEditinput__hover = document.getElementById("WidthElementEditinput-hover");

if(WidthElementEditinput__hover){
  let targetValue = target.getAttribute("data-width-value-hover");
  WidthElementEditinput__hover.value = targetValue;
  WidthElementEditinput__hover.addEventListener("input", function(){
    
    target.setAttribute("data-width-value-hover",WidthElementEditinput__hover.value);
    propertiesEditor(target);})
  }
  //----------------------
  let selectElementHeightinput__hover = document.getElementById("height-value-select-hover");

if (selectElementHeightinput__hover) {
  let targetValue = target.getAttribute("data-height-select-hover");
  for (let i = 0; i < selectElementHeightinput__hover.options.length; i++) {
  if (selectElementHeightinput__hover.options[i].value === targetValue) {
    selectElementHeightinput__hover.selectedIndex = i;
  break;}
  }
  selectElementHeightinput__hover.addEventListener("change", function(){
          target.setAttribute("data-height-select-hover",selectElementHeightinput__hover.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
  let selectElementHeightunit__hover = document.getElementById("selectElementHeightinput-hover");

if (selectElementHeightunit__hover) {
  let targetValue = target.getAttribute("data-height-Parameter-hover");
  for (let i = 0; i < selectElementHeightunit__hover.options.length; i++) {
  if (selectElementHeightunit__hover.options[i].value === targetValue) {
    selectElementHeightunit__hover.selectedIndex = i;
  break;}
  }
  selectElementHeightunit__hover.addEventListener("change", function(){
          target.setAttribute("data-height-Parameter-hover",selectElementHeightunit__hover.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
  let elementHeightinput__hover = document.getElementById("heightElementEditinput-hover");

if(elementHeightinput__hover){
  let targetValue = target.getAttribute("data-height-value-hover");
  elementHeightinput__hover.value = targetValue;
  elementHeightinput__hover.addEventListener("input", function(){
    
    target.setAttribute("data-height-value-hover",elementHeightinput__hover.value);
    propertiesEditor(target);})
  }
  //----------------------
let element_overflow_x__hover = document.getElementById("elementoverflow-xinput-hover");

if (element_overflow_x__hover) {
  let targetValue = target.getAttribute("data-overflow-x-hover");
  for (let i = 0; i < element_overflow_x__hover.options.length; i++) {
  if (element_overflow_x__hover.options[i].value === targetValue) {
    element_overflow_x__hover.selectedIndex = i;
  break;}
  }
      element_overflow_x__hover.addEventListener("change", function(){
          target.setAttribute("data-overflow-x-hover",element_overflow_x__hover.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
let element_overflow_y__hover = document.getElementById("Elementoverflow-yinput-hover");

if (element_overflow_y__hover) {
  let targetValue = target.getAttribute("data-overflow-y-hover");
  for (let i = 0; i < element_overflow_y__hover.options.length; i++) {
  if (element_overflow_y__hover.options[i].value === targetValue) {
    element_overflow_y__hover.selectedIndex = i;
  break;}
  }
          element_overflow_y__hover.addEventListener("change", function(){
          target.setAttribute("data-overflow-y-hover",element_overflow_y__hover.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
  let elementBackgroundColorinput__hover = document.getElementById("elementBackgroundColorinput-hover");

  if(elementBackgroundColorinput__hover){
    let targetValue = target.getAttribute("data-background-color-input-hover");
    elementBackgroundColorinput__hover.value = targetValue;
    elementBackgroundColorinput__hover.addEventListener("input", function(){
      backgroundProcess__hover();
      target.setAttribute("data-background-color-input-hover",elementBackgroundColorinput__hover.value);
      propertiesEditor(target);})
    }
    //----------------------
  let elementBackgroundOpacityinput__hover = document.getElementById("elementBackgroundOpacityinput-hover");
  
  if(elementBackgroundOpacityinput__hover){
    let targetValue = target.getAttribute("data-background-opacity-input-hover");
    elementBackgroundOpacityinput__hover.value = targetValue;
    elementBackgroundOpacityinput__hover.addEventListener("input", function(){
      backgroundProcess__hover();
      target.setAttribute("data-background-opacity-input-hover",elementBackgroundOpacityinput__hover.value);
      propertiesEditor(target);})
    }
    //----------------------
    let elementBackgroundColorresult__hover = document.getElementById("elementBackgroundColorresult-hover");
  
    if(elementBackgroundColorresult__hover){
        let targetValue = target.getAttribute("data-background-color-result-hover");
        elementBackgroundColorresult__hover.value = targetValue;
        elementBackgroundColorresult__hover.addEventListener("change", function(){
          target.setAttribute("data-background-color-result-hover",elementBackgroundColorresult__hover.value);
          propertiesEditor(target);})
        }
        function backgroundProcess__hover(){
            let bgColor = elementBackgroundColorinput__hover.value;
            let bgopacity = elementBackgroundOpacityinput__hover.value;
            let backgroundcolorValue = "rgba(" +
            parseInt(bgColor.slice(1, 3), 16) + ", " +
            parseInt(bgColor.slice(3, 5), 16) + ", " +
            parseInt(bgColor.slice(5, 7), 16) + ", " +
            bgopacity + ")";
    
            elementBackgroundColorresult__hover.value = backgroundcolorValue;
          target.setAttribute("data-background-color-result-hover",elementBackgroundColorresult__hover.value);
        }
    //----------------------

let elementBorderTypeinput__hover = document.getElementById("elementBorderTypeinput-hover");

if (elementBorderTypeinput__hover) {
  let targetValue = target.getAttribute("data-border-type-hover");
  for (let i = 0; i < elementBorderTypeinput__hover.options.length; i++) {
  if (elementBorderTypeinput__hover.options[i].value === targetValue) {
    elementBorderTypeinput__hover.selectedIndex = i;
  break;}
  }
      elementBorderTypeinput__hover.addEventListener("change", function(){
          target.setAttribute("data-border-type-hover",elementBorderTypeinput__hover.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
  let elementBorderColorinput_Hover = document.getElementById("elementBorderColorinput-hover");

    if (elementBorderColorinput_Hover) {
        let targetValue = target.getAttribute("data-border-color-hover");
        elementBorderColorinput_Hover.value = targetValue;
        elementBorderColorinput_Hover.addEventListener("change", function(){

                target.setAttribute("data-border-color-hover",elementBorderColorinput_Hover.value);
                propertiesEditor(target);})
        }
        //--------------------------------------------------
let elementBorderParamsinput__hover = document.getElementById("elementBorderParamsinput-hover");

if (elementBorderParamsinput__hover) {
  let targetValue = target.getAttribute("data-border-parameter-hover");
  for (let i = 0; i < elementBorderParamsinput__hover.options.length; i++) {
  if (elementBorderParamsinput__hover.options[i].value === targetValue) {
    elementBorderParamsinput__hover.selectedIndex = i;
  break;}
  }
          elementBorderParamsinput__hover.addEventListener("change", function(){
          target.setAttribute("data-border-parameter-hover",elementBorderParamsinput__hover.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
//Border Radius
let elementBorderRadiusinput__hover = document.getElementById("elementBorderRadiusinput-hover");
if (elementBorderRadiusinput__hover) {
  let targetValue = target.getAttribute("data-border-radius-check-hover");
  if (targetValue === "true") {
    elementBorderRadiusinput__hover.checked = true;
  } else {
    elementBorderRadiusinput__hover.checked = false;
  }

  elementBorderRadiusinput__hover.addEventListener("change", function() {
    target.setAttribute("data-border-radius-check-hover", elementBorderRadiusinput__hover.checked);
    propertiesEditor(target);
  });
}
//------------------------------------
let elementRadiusParaminput__hover =    document.getElementById("elementRadiusParaminput-hover");

if (elementRadiusParaminput__hover) {
  let targetValue = target.getAttribute("data-border-radius-parameter-hover");
  for (let i = 0; i < elementRadiusParaminput__hover.options.length; i++) {
  if (elementRadiusParaminput__hover.options[i].value === targetValue) {
    elementRadiusParaminput__hover.selectedIndex = i;
  break;}
  }
      elementRadiusParaminput__hover.addEventListener("change", function(){
          target.setAttribute("data-border-radius-parameter-hover",elementRadiusParaminput__hover.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
let elementRadiusTopinput__hover = document.getElementById("elementRadiusTopinput-hover");

if(elementRadiusTopinput__hover){
  let targetValue = target.getAttribute("data-border-radius-top-hover");
  elementRadiusTopinput__hover.value = targetValue;
  elementRadiusTopinput__hover.addEventListener("input", function(){
    
    target.setAttribute("data-border-radius-top-hover",elementRadiusTopinput__hover.value);
    propertiesEditor(target);})
  }
  //----------------------
let elementRadiusRightinput__hover = document.getElementById("elementRadiusRightinput-hover");

if(elementRadiusRightinput__hover){
  let targetValue = target.getAttribute("data-border-radius-right-hover");
  elementRadiusRightinput__hover.value = targetValue;
  elementRadiusRightinput__hover.addEventListener("input", function(){
    
    target.setAttribute("data-border-radius-right-hover",elementRadiusRightinput__hover.value);
    propertiesEditor(target);})
  }
  //----------------------
let elementRadiusBottominput__hover = document.getElementById("elementRadiusBottominput-hover");

if(elementRadiusBottominput__hover){
  let targetValue = target.getAttribute("data-border-radius-bottom-hover");
  elementRadiusBottominput__hover.value = targetValue;
  elementRadiusBottominput__hover.addEventListener("input", function(){
    
    target.setAttribute("data-border-radius-bottom-hover",elementRadiusBottominput__hover.value);
    propertiesEditor(target);})
  }
  //----------------------
let elementRadiusLeftinput__hover = document.getElementById("elementRadiusLeftinput-hover");

if(elementRadiusLeftinput__hover){
  let targetValue = target.getAttribute("data-border-radius-left-hover");
  elementRadiusLeftinput__hover.value = targetValue;
  elementRadiusLeftinput__hover.addEventListener("input", function(){
    
    target.setAttribute("data-border-radius-left-hover",elementRadiusLeftinput__hover.value);
    propertiesEditor(target);})
  }
  //----------------------



let checkElementBoxShadowinput__hover = document.getElementById("checkElementBoxShadowinput-hover");
if (checkElementBoxShadowinput__hover) {
  let targetValue = target.getAttribute("data-box-shadow-check-hover");
  if (targetValue === "true") {
    checkElementBoxShadowinput__hover.checked = true;
  } else {
    checkElementBoxShadowinput__hover.checked = false;
  }

  checkElementBoxShadowinput__hover.addEventListener("change", function() {
    target.setAttribute("data-box-shadow-check-hover", checkElementBoxShadowinput__hover.checked);
    propertiesEditor(target);
  });
}
//------------------------------------    
let elementHorizontalShadowLengthInput__hover = document.getElementById("elementHorizontalShadowLengthInput-hover");

if(elementHorizontalShadowLengthInput__hover){
  let targetValue = target.getAttribute("data-box-shadow-horizontal-hover");
  elementHorizontalShadowLengthInput__hover.value = targetValue;
  elementHorizontalShadowLengthInput__hover.addEventListener("input", function(){
    
    target.setAttribute("data-box-shadow-horizontal-hover",elementHorizontalShadowLengthInput__hover.value);
    propertiesEditor(target);})
  }
  //----------------------
let elementVerticalshadowlengthinput__hover = document.getElementById("elementVerticalshadowlengthinput-hover");

if(elementVerticalshadowlengthinput__hover){
  let targetValue = target.getAttribute("data-box-shadow-vertical-hover");
  elementVerticalshadowlengthinput__hover.value = targetValue;
  elementVerticalshadowlengthinput__hover.addEventListener("input", function(){
    
    target.setAttribute("data-box-shadow-vertical-hover",elementVerticalshadowlengthinput__hover.value);
    propertiesEditor(target);})
  }
  //----------------------
let elementBlurRadiusInput__hover = document.getElementById("elementBlurRadiusInput-hover");

if(elementBlurRadiusInput__hover){
  let targetValue = target.getAttribute("data-box-shadow-blur-hover");
  elementBlurRadiusInput__hover.value = targetValue;
  elementBlurRadiusInput__hover.addEventListener("input", function(){
    
    target.setAttribute("data-box-shadow-blur-hover",elementBlurRadiusInput__hover.value);
    propertiesEditor(target);})
  }
  //----------------------
let elementSpreadRadiusInput__hover = document.getElementById("elementSpreadRadiusInput-hover");

if(elementSpreadRadiusInput__hover){
  let targetValue = target.getAttribute("data-box-shadow-spread-hover");
  elementSpreadRadiusInput__hover.value = targetValue;
  elementSpreadRadiusInput__hover.addEventListener("input", function(){
    
    target.setAttribute("data-box-shadow-spread-hover",elementSpreadRadiusInput__hover.value);
    propertiesEditor(target);})
  }
  //----------------------
let shadowColorInput__hover = document.getElementById("shadowColorInput-hover");

if(shadowColorInput__hover){
  let targetValue = target.getAttribute("data-box-shadow-color-hover");
  shadowColorInput__hover.value = targetValue;
  shadowColorInput__hover.addEventListener("input", function(){
    
    target.setAttribute("data-box-shadow-color-hover",shadowColorInput__hover.value);
    propertiesEditor(target);})
  }
  //----------------------
let elementShadowOpacityInput__hover = document.getElementById("elementShadowOpacityInput-hover");

if(elementShadowOpacityInput__hover){
let targetValue = target.getAttribute("data-box-shadow-opacity-hover");
elementShadowOpacityInput__hover.value = targetValue;
elementShadowOpacityInput__hover.addEventListener("input", function(){
  
  target.setAttribute("data-box-shadow-opacity-hover",elementShadowOpacityInput__hover.value);
  propertiesEditor(target);})
}
//----------------------
let elementShadowInsetOutsetinput__hover = document.getElementById("elementShadowInsetOutsetinput-hover");

if (elementShadowInsetOutsetinput__hover) {
  let targetValue = target.getAttribute("data-box-shadow-set-hover");
  for (let i = 0; i < elementShadowInsetOutsetinput__hover.options.length; i++) {
  if (elementShadowInsetOutsetinput__hover.options[i].value === targetValue) {
    elementShadowInsetOutsetinput__hover.selectedIndex = i;
  break;}
  }
  elementShadowInsetOutsetinput__hover.addEventListener("change", function(){
          target.setAttribute("data-box-shadow-set-hover",elementShadowInsetOutsetinput__hover.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
let elementTextAligninput__hover = document.getElementById("elementTextAligninput-hover");

if (elementTextAligninput__hover) {
  let targetValue = target.getAttribute("data-text-align-hover");
  for (let i = 0; i < elementTextAligninput__hover.options.length; i++) {
  if (elementTextAligninput__hover.options[i].value === targetValue) {
    elementTextAligninput__hover.selectedIndex = i;
  break;}
  }
  elementTextAligninput__hover.addEventListener("change", function(){
          target.setAttribute("data-text-align-hover",elementTextAligninput__hover.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
let elementfontcolorinput__hover = document.getElementById("elementfontcolorinput-hover");

if(elementfontcolorinput__hover){
  let targetValue = target.getAttribute("data-font-color-hover");
  elementfontcolorinput__hover.value = targetValue;
  elementfontcolorinput__hover.addEventListener("input", function(){
    
    target.setAttribute("data-font-color-hover",elementfontcolorinput__hover.value);
    propertiesEditor(target);})
  }
  //----------------------
let Check_element_Margin_input__hover = document.getElementById("Check-element-Margin-input-hover");
if (Check_element_Margin_input__hover) {
  let targetValue = target.getAttribute("data-margin-check-hover");
  if (targetValue === "true") {
    Check_element_Margin_input__hover.checked = true;
  } else {
    Check_element_Margin_input__hover.checked = false;
  }

  Check_element_Margin_input__hover.addEventListener("change", function() {
    target.setAttribute("data-margin-check-hover", Check_element_Margin_input__hover.checked);
    propertiesEditor(target);
  });
}
//------------------------------------
let element_Margin_Param_input__hover = document.getElementById("element-Margin-Param-input-hover");

if (element_Margin_Param_input__hover) {
  let targetValue = target.getAttribute("data-margin-parameter-hover");
  for (let i = 0; i < element_Margin_Param_input__hover.options.length; i++) {
  if (element_Margin_Param_input__hover.options[i].value === targetValue) {
    element_Margin_Param_input__hover.selectedIndex = i;
  break;}
  }
  element_Margin_Param_input__hover.addEventListener("change", function(){
          target.setAttribute("data-margin-parameter-hover",element_Margin_Param_input__hover.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
let element_Margin_Top_input__hover = document.getElementById("element-Margin-Top-input-hover");

if(element_Margin_Top_input__hover){
  let targetValue = target.getAttribute("data-margin-top-hover");
  element_Margin_Top_input__hover.value = targetValue;
  element_Margin_Top_input__hover.addEventListener("input", function(){
    
    target.setAttribute("data-margin-top-hover",element_Margin_Top_input__hover.value);
    propertiesEditor(target);})
  }
  //----------------------
let element_Margin_Right_input__hover = document.getElementById("element-Margin-Right-input-hover");

if(element_Margin_Right_input__hover){
  let targetValue = target.getAttribute("data-margin-right-hover");
  element_Margin_Right_input__hover.value = targetValue;
  element_Margin_Right_input__hover.addEventListener("input", function(){
    
    target.setAttribute("data-margin-right-hover",element_Margin_Right_input__hover.value);
    propertiesEditor(target);})
  }
  //----------------------
let element_Margin_Bottom_input__hover = document.getElementById("element-Margin-Bottom-input-hover");

if(element_Margin_Bottom_input__hover){
  let targetValue = target.getAttribute("data-margin-bottom-hover");
  element_Margin_Bottom_input__hover.value = targetValue;
  element_Margin_Bottom_input__hover.addEventListener("input", function(){
    
    target.setAttribute("data-margin-bottom-hover",element_Margin_Bottom_input__hover.value);
    propertiesEditor(target);})
  }
  //----------------------
let element_Margin_Left_input__hover = document.getElementById("element-Margin-Left-input-hover");

if(element_Margin_Left_input__hover){
  let targetValue = target.getAttribute("data-margin-left-hover");
  element_Margin_Left_input__hover.value = targetValue;
  element_Margin_Left_input__hover.addEventListener("input", function(){
    
    target.setAttribute("data-margin-left-hover",element_Margin_Left_input__hover.value);
    propertiesEditor(target);})
  }
  //----------------------
let Check_element_Padding_input__hover = document.getElementById("Check-element-Padding-input-hover");
if (Check_element_Padding_input__hover) {
  let targetValue = target.getAttribute("data-padding-check-hover");
  if (targetValue == "true") {
    Check_element_Padding_input__hover.checked = true;
  } else {
    Check_element_Padding_input__hover.checked = false;
  }

  Check_element_Padding_input__hover.addEventListener("change", function() {
    target.setAttribute("data-padding-check-hover", Check_element_Padding_input__hover.checked);
    propertiesEditor(target);
  });
}
//------------------------------------
let element_Padding_Param_input__hover = document.getElementById("element-Padding-Param-input-hover");

if (element_Padding_Param_input__hover) {
  let targetValue = target.getAttribute("data-padding-parameter-hover");
  for (let i = 0; i < element_Padding_Param_input__hover.options.length; i++) {
  if (element_Padding_Param_input__hover.options[i].value === targetValue) {
    element_Padding_Param_input__hover.selectedIndex = i;
  break;}
  }
  element_Padding_Param_input__hover.addEventListener("change", function(){
          target.setAttribute("data-padding-parameter-hover",element_Padding_Param_input__hover.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
let element_Padding_Top_input__hover = document.getElementById("element-Padding-Top-input-hover");

if(element_Padding_Top_input__hover){
  let targetValue = target.getAttribute("data-padding-top-hover");
  element_Padding_Top_input__hover.value = targetValue;
  element_Padding_Top_input__hover.addEventListener("input", function(){
    
    target.setAttribute("data-padding-top-hover",element_Padding_Top_input__hover.value);
    propertiesEditor(target);})
  }
  //----------------------
let element_Padding_Right_input__hover = document.getElementById("element-Padding-Right-input-hover");

if(element_Padding_Right_input__hover){
  let targetValue = target.getAttribute("data-padding-right-hover");
  element_Padding_Right_input__hover.value = targetValue;
  element_Padding_Right_input__hover.addEventListener("input", function(){
    
    target.setAttribute("data-padding-right-hover",element_Padding_Right_input__hover.value);
    propertiesEditor(target);})
  }
  //----------------------
let element_Padding_Bottom_input__hover = document.getElementById("element-Padding-Bottom-input-hover");

if(element_Padding_Bottom_input__hover){
  let targetValue = target.getAttribute("data-padding-bottom-hover");
  element_Padding_Bottom_input__hover.value = targetValue;
  element_Padding_Bottom_input__hover.addEventListener("input", function(){
    
    target.setAttribute("data-padding-bottom-hover",element_Padding_Bottom_input__hover.value);
    propertiesEditor(target);})
  }
  //----------------------
let element_Padding_Left_input__hover = document.getElementById("element-Padding-Left-input-hover");

if(element_Padding_Left_input__hover){
  let targetValue = target.getAttribute("data-padding-left-hover");
  element_Padding_Left_input__hover.value = targetValue;
  element_Padding_Left_input__hover.addEventListener("input", function(){
    
    target.setAttribute("data-padding-left-hover",element_Padding_Left_input__hover.value);
    propertiesEditor(target);})
  }
  //----------------------
let element_Position_Input__hover = document.getElementById("element-Position-Input-hover");

if (element_Position_Input__hover) {
  let targetValue = target.getAttribute("data-element-position-hover");
  for (let i = 0; i < element_Position_Input__hover.options.length; i++) {
  if (element_Position_Input__hover.options[i].value === targetValue) {
    element_Position_Input__hover.selectedIndex = i;
  break;}
  }
  element_Position_Input__hover.addEventListener("change", function(){
          target.setAttribute("data-element-position-hover",element_Position_Input__hover.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
let element_Cursor_Input__hover = document.getElementById("element-Cursor-Input-hover");

if (element_Cursor_Input__hover) {
  let targetValue = target.getAttribute("data-element-cursor-hover");
  for (let i = 0; i < element_Cursor_Input__hover.options.length; i++) {
  if (element_Cursor_Input__hover.options[i].value === targetValue) {
    element_Cursor_Input__hover.selectedIndex = i;
  break;}
  }
  element_Cursor_Input__hover.addEventListener("change", function(){
          target.setAttribute("data-element-cursor-hover",element_Cursor_Input__hover.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
let element_Z_Index_Input__hover = document.getElementById("element-Z-Index-Input-hover");


if(element_Z_Index_Input__hover){
  let targetValue = target.getAttribute("data-element-z-index-hover");
  element_Z_Index_Input__hover.value = targetValue;
  element_Z_Index_Input__hover.addEventListener("input", function(){
    if(element_Z_Index_Input__hover.value > 5000){
      element_Z_Index_Input__hover.value = 5000;
    }
    target.setAttribute("data-element-z-index-hover",element_Z_Index_Input__hover.value);
    propertiesEditor(target);})
  }
  //----------------------
let element_Custom_CSS_Input__hover = document.getElementById("element-Custom-CSS-Input-hover");

if(element_Custom_CSS_Input__hover){
  let targetValue = target.getAttribute("data-custom-css-hover");
  element_Custom_CSS_Input__hover.value = targetValue;
  element_Custom_CSS_Input__hover.addEventListener("input", function(){
    
    target.setAttribute("data-custom-css-hover",element_Custom_CSS_Input__hover.value);
    propertiesEditor(target);})
  }
  //----------------------
// //======// _active //====================================================// _active //=====================

let editDisplayinput__active = document.getElementById("editDisplayinput-active");

if (editDisplayinput__active) {
  let targetValue_active = target.getAttribute("data-display-active");
  for (let i = 0; i < editDisplayinput__active.options.length; i++) {
    if (editDisplayinput__active.options[i].value === targetValue_active) {
      editDisplayinput__active.selectedIndex = i;
      break;
    }
  }
  editDisplayinput__active.addEventListener("change", function(){
    target.setAttribute("data-display-active", editDisplayinput__active.value);
    propertiesEditor(target);
  });
}

  //--------------------------------------------------
let SelectFlexDirectioninput__active = document.getElementById("SelectFlexDirectioninput-active");

if (SelectFlexDirectioninput__active) {
  let targetValue = target.getAttribute("data-flex-direction-active");
  for (let i = 0; i < SelectFlexDirectioninput__active.options.length; i++) {
  if (SelectFlexDirectioninput__active.options[i].value === targetValue) {
    SelectFlexDirectioninput__active.selectedIndex = i;
  break;}
  }
    SelectFlexDirectioninput__active.addEventListener("change", function(){
          target.setAttribute("data-flex-direction-active",SelectFlexDirectioninput__active.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
  let selectustifycontentinput__active = document.getElementById("selectustifycontentinput-active");

if (selectustifycontentinput__active) {
  let targetValue = target.getAttribute("data-justify-content-active");
  for (let i = 0; i < selectustifycontentinput__active.options.length; i++) {
  if (selectustifycontentinput__active.options[i].value === targetValue) {
    selectustifycontentinput__active.selectedIndex = i;
  break;}
  }
          selectustifycontentinput__active.addEventListener("change", function(){
          target.setAttribute("data-justify-content-active",selectustifycontentinput__active.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
  let select_align_items_input__active = document.getElementById("select-align-items-input-active");

if (select_align_items_input__active) {
  let targetValue = target.getAttribute("data-align-items-active");
  for (let i = 0; i < select_align_items_input__active.options.length; i++) {
  if (select_align_items_input__active.options[i].value === targetValue) {
    select_align_items_input__active.selectedIndex = i;
  break;}
  }
  select_align_items_input__active.addEventListener("change", function(){
          target.setAttribute("data-align-items-active",select_align_items_input__active.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
  let select_align_content_input__active = document.getElementById("select-align-content-input-active");

if (select_align_content_input__active) {
  let targetValue = target.getAttribute("data-align-content-active");
  for (let i = 0; i < select_align_content_input__active.options.length; i++) {
  if (select_align_content_input__active.options[i].value === targetValue) {
    select_align_content_input__active.selectedIndex = i;
  break;}
  }
  select_align_content_input__active.addEventListener("change", function(){
          target.setAttribute("data-align-content-active",select_align_content_input__active.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
  let selectFlexGAP_active = document.getElementById("selectflex-gap-active");

  if(selectFlexGAP_active){
    let targetValue = target.getAttribute("data-flex-gap-active");
    selectFlexGAP_active.value = targetValue;
    selectFlexGAP_active.addEventListener("input", function(){
      
      target.setAttribute("data-flex-gap-active",selectFlexGAP_active.value);
      propertiesEditor(target);})
    }
    //----------------------
    let selectFlexWRAP_active = document.getElementById("selectflexwrapinput-active");
    
  if (selectFlexWRAP_active) {
    let targetValue = target.getAttribute("data-flex-wrap-active");
    for (let i = 0; i < selectFlexWRAP_active.options.length; i++) {
    if (selectFlexWRAP_active.options[i].value === targetValue) {
      selectFlexWRAP_active.selectedIndex = i;
    break;}
    }
    selectFlexWRAP_active.addEventListener("change", function(){
            target.setAttribute("data-flex-wrap-active",selectFlexWRAP_active.value);
            propertiesEditor(target);})
    }
    //--------------------------------------------------
  let select_flex_grow_input__active = document.getElementById("select-flex-grow-input-active");

if (select_flex_grow_input__active) {
  let targetValue = target.getAttribute("data-flex-grow-active");
  select_flex_grow_input__active.value = targetValue;
 
  select_flex_grow_input__active.addEventListener("change", function(){
          target.setAttribute("data-flex-grow-active",select_flex_grow_input__active.value);
          propertiesEditor(target);})
        }
  //--------------------------------------------------
  let flex_shrink_edit_input__active = document.getElementById("flex-shrink-edit-input-active");

if(flex_shrink_edit_input__active){
  let targetValue = target.getAttribute("data-flex-shrink-active");
  flex_shrink_edit_input__active.value = targetValue;
  flex_shrink_edit_input__active.addEventListener("input", function(){
    
    target.setAttribute("data-flex-shrink-active",flex_shrink_edit_input__active.value);
    propertiesEditor(target);})
  }
  //---------------------- 
  let selectWidth__active = document.getElementById("width-value-select-active");

if (selectWidth__active) {
  let targetValue = target.getAttribute("data-width-select-active");
  for (let i = 0; i < selectWidth__active.options.length; i++) {
  if (selectWidth__active.options[i].value === targetValue) {
    selectWidth__active.selectedIndex = i;
  break;}
  }
  selectWidth__active.addEventListener("change", function(){
          target.setAttribute("data-width-select-active",selectWidth__active.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
  let selectElementWidthinput__active = document.getElementById("selectElementWidthinput-active");

if (selectElementWidthinput__active) {
  let targetValue = target.getAttribute("data-width-Parameter-active");
  for (let i = 0; i < selectElementWidthinput__active.options.length; i++) {
  if (selectElementWidthinput__active.options[i].value === targetValue) {
    selectElementWidthinput__active.selectedIndex = i;
  break;}
  }
  selectElementWidthinput__active.addEventListener("change", function(){
          target.setAttribute("data-width-Parameter-active",selectElementWidthinput__active.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
  let WidthElementEditinput__active = document.getElementById("WidthElementEditinput-active");

if(WidthElementEditinput__active){
  let targetValue = target.getAttribute("data-width-value-active");
  WidthElementEditinput__active.value = targetValue;
  WidthElementEditinput__active.addEventListener("input", function(){
    
    target.setAttribute("data-width-value-active",WidthElementEditinput__active.value);
    propertiesEditor(target);})
  }
  //----------------------
  let selectElementHeightinput__active = document.getElementById("height-value-select-active");

if (selectElementHeightinput__active) {
  let targetValue = target.getAttribute("data-height-select-active");
  for (let i = 0; i < selectElementHeightinput__active.options.length; i++) {
  if (selectElementHeightinput__active.options[i].value === targetValue) {
    selectElementHeightinput__active.selectedIndex = i;
  break;}
  }
  selectElementHeightinput__active.addEventListener("change", function(){
          target.setAttribute("data-height-select-active",selectElementHeightinput__active.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
  let selectElementHeightunit__active = document.getElementById("selectElementHeightinput-active");

if (selectElementHeightunit__active) {
  let targetValue = target.getAttribute("data-height-Parameter-active");
  for (let i = 0; i < selectElementHeightunit__active.options.length; i++) {
  if (selectElementHeightunit__active.options[i].value === targetValue) {
    selectElementHeightunit__active.selectedIndex = i;
  break;}
  }
  selectElementHeightunit__active.addEventListener("change", function(){
          target.setAttribute("data-height-Parameter-active",selectElementHeightunit__active.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
  let elementHeightinput__active = document.getElementById("heightElementEditinput-active");

if(elementHeightinput__active){
  let targetValue = target.getAttribute("data-height-value-active");
  elementHeightinput__active.value = targetValue;
  elementHeightinput__active.addEventListener("input", function(){
    
    target.setAttribute("data-height-value-active",elementHeightinput__active.value);
    propertiesEditor(target);})
  }
  //----------------------
let element_overflow_x__active = document.getElementById("elementoverflow-xinput-active");

if (element_overflow_x__active) {
  let targetValue = target.getAttribute("data-overflow-x-active");
  for (let i = 0; i < element_overflow_x__active.options.length; i++) {
  if (element_overflow_x__active.options[i].value === targetValue) {
    element_overflow_x__active.selectedIndex = i;
  break;}
  }
      element_overflow_x__active.addEventListener("change", function(){
          target.setAttribute("data-overflow-x-active",element_overflow_x__active.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
let element_overflow_y__active = document.getElementById("Elementoverflow-yinput-active");

if (element_overflow_y__active) {
  let targetValue = target.getAttribute("data-overflow-y-active");
  for (let i = 0; i < element_overflow_y__active.options.length; i++) {
  if (element_overflow_y__active.options[i].value === targetValue) {
    element_overflow_y__active.selectedIndex = i;
  break;}
  }
          element_overflow_y__active.addEventListener("change", function(){
          target.setAttribute("data-overflow-y-active",element_overflow_y__active.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
  let elementBackgroundColorinput__active = document.getElementById("elementBackgroundColorinput-active");

  if(elementBackgroundColorinput__active){
    let targetValue = target.getAttribute("data-background-color-input-active");
    elementBackgroundColorinput__active.value = targetValue;
    elementBackgroundColorinput__active.addEventListener("input", function(){
      backgroundProcess__active();
      target.setAttribute("data-background-color-input-active",elementBackgroundColorinput__active.value);
      propertiesEditor(target);})
    }
    //----------------------
  let elementBackgroundOpacityinput__active = document.getElementById("elementBackgroundOpacityinput-active");
  
  if(elementBackgroundOpacityinput__active){
    let targetValue = target.getAttribute("data-background-opacity-input-active");
    elementBackgroundOpacityinput__active.value = targetValue;
    elementBackgroundOpacityinput__active.addEventListener("input", function(){
      backgroundProcess__active();
      target.setAttribute("data-background-opacity-input-active",elementBackgroundOpacityinput__active.value);
      propertiesEditor(target);})
    }
    //----------------------
    let elementBackgroundColorresult__active = document.getElementById("elementBackgroundColorresult-active");
  
    if(elementBackgroundColorresult__active){
        let targetValue = target.getAttribute("data-background-color-result-active");
        elementBackgroundColorresult__active.value = targetValue;
        elementBackgroundColorresult__active.addEventListener("change", function(){
          target.setAttribute("data-background-color-result-active",elementBackgroundColorresult__active.value);
          propertiesEditor(target);})
        }
        function backgroundProcess__active(){
            let bgColor = elementBackgroundColorinput__active.value;
            let bgopacity = elementBackgroundOpacityinput__active.value;
            let backgroundcolorValue = "rgba(" +
            parseInt(bgColor.slice(1, 3), 16) + ", " +
            parseInt(bgColor.slice(3, 5), 16) + ", " +
            parseInt(bgColor.slice(5, 7), 16) + ", " +
            bgopacity + ")";
    
            elementBackgroundColorresult__active.value = backgroundcolorValue;
          target.setAttribute("data-background-color-result-active",elementBackgroundColorresult__active.value);
        }
    //----------------------

let elementBorderTypeinput__active = document.getElementById("elementBorderTypeinput-active");

if (elementBorderTypeinput__active) {
  let targetValue = target.getAttribute("data-border-type-active");
  for (let i = 0; i < elementBorderTypeinput__active.options.length; i++) {
  if (elementBorderTypeinput__active.options[i].value === targetValue) {
    elementBorderTypeinput__active.selectedIndex = i;
  break;}
  }
      elementBorderTypeinput__active.addEventListener("change", function(){
          target.setAttribute("data-border-type-active",elementBorderTypeinput__active.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
  let elementBorderColorinput_Active = document.getElementById("elementBorderColorinput-active");

    if (elementBorderColorinput_Active) {
        let targetValue = target.getAttribute("data-border-color-active");
        elementBorderColorinput_Active.value = targetValue;
        elementBorderColorinput_Active.addEventListener("change", function(){

                target.setAttribute("data-border-color-active",elementBorderColorinput_Active.value);
                propertiesEditor(target);})
        }
        //--------------------------------------------------
let elementBorderParamsinput__active = document.getElementById("elementBorderParamsinput-active");

if (elementBorderParamsinput__active) {
  let targetValue = target.getAttribute("data-border-parameter-active");
  for (let i = 0; i < elementBorderParamsinput__active.options.length; i++) {
  if (elementBorderParamsinput__active.options[i].value === targetValue) {
    elementBorderParamsinput__active.selectedIndex = i;
  break;}
  }
          elementBorderParamsinput__active.addEventListener("change", function(){
          target.setAttribute("data-border-parameter-active",elementBorderParamsinput__active.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
//Border Radius
let elementBorderRadiusinput__active = document.getElementById("elementBorderRadiusinput-active");
if (elementBorderRadiusinput__active) {
  let targetValue = target.getAttribute("data-border-radius-check-active");
  if (targetValue === "true") {
    elementBorderRadiusinput__active.checked = true;
  } else {
    elementBorderRadiusinput__active.checked = false;
  }

  elementBorderRadiusinput__active.addEventListener("change", function() {
    target.setAttribute("data-border-radius-check-active", elementBorderRadiusinput__active.checked);
    propertiesEditor(target);
  });
}
//------------------------------------
let elementRadiusParaminput__active =    document.getElementById("elementRadiusParaminput-active");

if (elementRadiusParaminput__active) {
  let targetValue = target.getAttribute("data-border-radius-parameter-active");
  for (let i = 0; i < elementRadiusParaminput__active.options.length; i++) {
  if (elementRadiusParaminput__active.options[i].value === targetValue) {
    elementRadiusParaminput__active.selectedIndex = i;
  break;}
  }
      elementRadiusParaminput__active.addEventListener("change", function(){
          target.setAttribute("data-border-radius-parameter-active",elementRadiusParaminput__active.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
let elementRadiusTopinput__active = document.getElementById("elementRadiusTopinput-active");

if(elementRadiusTopinput__active){
  let targetValue = target.getAttribute("data-border-radius-top-active");
  elementRadiusTopinput__active.value = targetValue;
  elementRadiusTopinput__active.addEventListener("input", function(){
    
    target.setAttribute("data-border-radius-top-active",elementRadiusTopinput__active.value);
    propertiesEditor(target);})
  }
  //----------------------
let elementRadiusRightinput__active = document.getElementById("elementRadiusRightinput-active");

if(elementRadiusRightinput__active){
  let targetValue = target.getAttribute("data-border-radius-right-active");
  elementRadiusRightinput__active.value = targetValue;
  elementRadiusRightinput__active.addEventListener("input", function(){
    
    target.setAttribute("data-border-radius-right-active",elementRadiusRightinput__active.value);
    propertiesEditor(target);})
  }
  //----------------------
let elementRadiusBottominput__active = document.getElementById("elementRadiusBottominput-active");

if(elementRadiusBottominput__active){
  let targetValue = target.getAttribute("data-border-radius-bottom-active");
  elementRadiusBottominput__active.value = targetValue;
  elementRadiusBottominput__active.addEventListener("input", function(){
    
    target.setAttribute("data-border-radius-bottom-active",elementRadiusBottominput__active.value);
    propertiesEditor(target);})
  }
  //----------------------
let elementRadiusLeftinput__active = document.getElementById("elementRadiusLeftinput-active");

if(elementRadiusLeftinput__active){
  let targetValue = target.getAttribute("data-border-radius-left-active");
  elementRadiusLeftinput__active.value = targetValue;
  elementRadiusLeftinput__active.addEventListener("input", function(){
    
    target.setAttribute("data-border-radius-left-active",elementRadiusLeftinput__active.value);
    propertiesEditor(target);})
  }
  //----------------------
let checkElementBoxShadowinput__active = document.getElementById("checkElementBoxShadowinput-active");
if (checkElementBoxShadowinput__active) {
  let targetValue = target.getAttribute("data-box-shadow-check-active");
  if (targetValue === "true") {
    checkElementBoxShadowinput__active.checked = true;
  } else {
    checkElementBoxShadowinput__active.checked = false;
  }

  checkElementBoxShadowinput__active.addEventListener("change", function() {
    target.setAttribute("data-box-shadow-check-active", checkElementBoxShadowinput__active.checked);
    propertiesEditor(target);
  });
}
//------------------------------------    
let elementHorizontalShadowLengthInput__active = document.getElementById("elementHorizontalShadowLengthInput-active");

if(elementHorizontalShadowLengthInput__active){
  let targetValue = target.getAttribute("data-box-shadow-horizontal-active");
  elementHorizontalShadowLengthInput__active.value = targetValue;
  elementHorizontalShadowLengthInput__active.addEventListener("input", function(){
    
    target.setAttribute("data-box-shadow-horizontal-active",elementHorizontalShadowLengthInput__active.value);
    propertiesEditor(target);})
  }
  //----------------------
let elementVerticalshadowlengthinput__active = document.getElementById("elementVerticalshadowlengthinput-active");

if(elementVerticalshadowlengthinput__active){
  let targetValue = target.getAttribute("data-box-shadow-vertical-active");
  elementVerticalshadowlengthinput__active.value = targetValue;
  elementVerticalshadowlengthinput__active.addEventListener("input", function(){
    
    target.setAttribute("data-box-shadow-vertical-active",elementVerticalshadowlengthinput__active.value);
    propertiesEditor(target);})
  }
  //----------------------
let elementBlurRadiusInput__active = document.getElementById("elementBlurRadiusInput-active");

if(elementBlurRadiusInput__active){
  let targetValue = target.getAttribute("data-box-shadow-blur-active");
  elementBlurRadiusInput__active.value = targetValue;
  elementBlurRadiusInput__active.addEventListener("input", function(){
    
    target.setAttribute("data-box-shadow-blur-active",elementBlurRadiusInput__active.value);
    propertiesEditor(target);})
  }
  //----------------------
let elementSpreadRadiusInput__active = document.getElementById("elementSpreadRadiusInput-active");

if(elementSpreadRadiusInput__active){
  let targetValue = target.getAttribute("data-box-shadow-spread-active");
  elementSpreadRadiusInput__active.value = targetValue;
  elementSpreadRadiusInput__active.addEventListener("input", function(){
    
    target.setAttribute("data-box-shadow-spread-active",elementSpreadRadiusInput__active.value);
    propertiesEditor(target);})
  }
  //----------------------
let shadowColorInput__active = document.getElementById("shadowColorInput-active");

if(shadowColorInput__active){
  let targetValue = target.getAttribute("data-box-shadow-color-active");
  shadowColorInput__active.value = targetValue;
  shadowColorInput__active.addEventListener("input", function(){
    
    target.setAttribute("data-box-shadow-color-active",shadowColorInput__active.value);
    propertiesEditor(target);})
  }
  //----------------------
let elementShadowOpacityInput__active = document.getElementById("elementShadowOpacityInput-active");

if(elementShadowOpacityInput__active){
let targetValue = target.getAttribute("data-box-shadow-opacity-active");
elementShadowOpacityInput__active.value = targetValue;
elementShadowOpacityInput__active.addEventListener("input", function(){
  
  target.setAttribute("data-box-shadow-opacity-active",elementShadowOpacityInput__active.value);
  propertiesEditor(target);})
}
//----------------------
let elementShadowInsetOutsetinput__active = document.getElementById("elementShadowInsetOutsetinput-active");

if (elementShadowInsetOutsetinput__active) {
  let targetValue = target.getAttribute("data-box-shadow-set-active");
  for (let i = 0; i < elementShadowInsetOutsetinput__active.options.length; i++) {
  if (elementShadowInsetOutsetinput__active.options[i].value === targetValue) {
    elementShadowInsetOutsetinput__active.selectedIndex = i;
  break;}
  }
  elementShadowInsetOutsetinput__active.addEventListener("change", function(){
          target.setAttribute("data-box-shadow-set-active",elementShadowInsetOutsetinput__active.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
let elementTextAligninput__active = document.getElementById("elementTextAligninput-active");

if (elementTextAligninput__active) {
  let targetValue = target.getAttribute("data-text-align-active");
  for (let i = 0; i < elementTextAligninput__active.options.length; i++) {
  if (elementTextAligninput__active.options[i].value === targetValue) {
    elementTextAligninput__active.selectedIndex = i;
  break;}
  }
  elementTextAligninput__active.addEventListener("change", function(){
          target.setAttribute("data-text-align-active",elementTextAligninput__active.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
let elementfontcolorinput__active = document.getElementById("elementfontcolorinput-active");

if(elementfontcolorinput__active){
  let targetValue = target.getAttribute("data-font-color-active");
  elementfontcolorinput__active.value = targetValue;
  elementfontcolorinput__active.addEventListener("input", function(){
    
    target.setAttribute("data-font-color-active",elementfontcolorinput__active.value);
    propertiesEditor(target);})
  }
  //----------------------
let Check_element_Margin_input__active = document.getElementById("Check-element-Margin-input-active");
if (Check_element_Margin_input__active) {
  let targetValue = target.getAttribute("data-margin-check-active");
  if (targetValue === "true") {
    Check_element_Margin_input__active.checked = true;
  } else {
    Check_element_Margin_input__active.checked = false;
  }

  Check_element_Margin_input__active.addEventListener("change", function() {
    target.setAttribute("data-margin-check-active", Check_element_Margin_input__active.checked);
    propertiesEditor(target);
  });
}
//------------------------------------
let element_Margin_Param_input__active = document.getElementById("element-Margin-Param-input-active");

if (element_Margin_Param_input__active) {
  let targetValue = target.getAttribute("data-margin-parameter-active");
  for (let i = 0; i < element_Margin_Param_input__active.options.length; i++) {
  if (element_Margin_Param_input__active.options[i].value === targetValue) {
    element_Margin_Param_input__active.selectedIndex = i;
  break;}
  }
  element_Margin_Param_input__active.addEventListener("change", function(){
          target.setAttribute("data-margin-parameter-active",element_Margin_Param_input__active.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
let element_Margin_Top_input__active = document.getElementById("element-Margin-Top-input-active");

if(element_Margin_Top_input__active){
  let targetValue = target.getAttribute("data-margin-top-active");
  element_Margin_Top_input__active.value = targetValue;
  element_Margin_Top_input__active.addEventListener("input", function(){
    
    target.setAttribute("data-margin-top-active",element_Margin_Top_input__active.value);
    propertiesEditor(target);})
  }
  //----------------------
let element_Margin_Right_input__active = document.getElementById("element-Margin-Right-input-active");

if(element_Margin_Right_input__active){
  let targetValue = target.getAttribute("data-margin-right-active");
  element_Margin_Right_input__active.value = targetValue;
  element_Margin_Right_input__active.addEventListener("input", function(){
    
    target.setAttribute("data-margin-right-active",element_Margin_Right_input__active.value);
    propertiesEditor(target);})
  }
  //----------------------
let element_Margin_Bottom_input__active = document.getElementById("element-Margin-Bottom-input-active");

if(element_Margin_Bottom_input__active){
  let targetValue = target.getAttribute("data-margin-bottom-active");
  element_Margin_Bottom_input__active.value = targetValue;
  element_Margin_Bottom_input__active.addEventListener("input", function(){
    
    target.setAttribute("data-margin-bottom-active",element_Margin_Bottom_input__active.value);
    propertiesEditor(target);})
  }
  //----------------------
let element_Margin_Left_input__active = document.getElementById("element-Margin-Left-input-active");

if(element_Margin_Left_input__active){
  let targetValue = target.getAttribute("data-margin-left-active");
  element_Margin_Left_input__active.value = targetValue;
  element_Margin_Left_input__active.addEventListener("input", function(){
    
    target.setAttribute("data-margin-left-active",element_Margin_Left_input__active.value);
    propertiesEditor(target);})
  }
  //----------------------
let Check_element_Padding_input__active = document.getElementById("Check-element-Padding-input-active");
if (Check_element_Padding_input__active) {
  let targetValue = target.getAttribute("data-padding-check-active");
  if (targetValue === "true") {
    Check_element_Padding_input__active.checked = true;
  } else {
    Check_element_Padding_input__active.checked = false;
  }

  Check_element_Padding_input__active.addEventListener("change", function() {
    target.setAttribute("data-padding-check-active", Check_element_Padding_input__active.checked);
    propertiesEditor(target);
  });
}
//------------------------------------
let element_Padding_Param_input__active = document.getElementById("element-Padding-Param-input-active");

if (element_Padding_Param_input__active) {
  let targetValue = target.getAttribute("data-padding-parameter-active");
  for (let i = 0; i < element_Padding_Param_input__active.options.length; i++) {
  if (element_Padding_Param_input__active.options[i].value === targetValue) {
    element_Padding_Param_input__active.selectedIndex = i;
  break;}
  }
  element_Padding_Param_input__active.addEventListener("change", function(){
          target.setAttribute("data-padding-parameter-active",element_Padding_Param_input__active.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
let element_Padding_Top_input__active = document.getElementById("element-Padding-Top-input-active");

if(element_Padding_Top_input__active){
  let targetValue = target.getAttribute("data-padding-top-active");
  element_Padding_Top_input__active.value = targetValue;
  element_Padding_Top_input__active.addEventListener("input", function(){
    
    target.setAttribute("data-padding-top-active",element_Padding_Top_input__active.value);
    propertiesEditor(target);})
  }
  //----------------------
let element_Padding_Right_input__active = document.getElementById("element-Padding-Right-input-active");

if(element_Padding_Right_input__active){
  let targetValue = target.getAttribute("data-padding-right-active");
  element_Padding_Right_input__active.value = targetValue;
  element_Padding_Right_input__active.addEventListener("input", function(){
    
    target.setAttribute("data-padding-right-active",element_Padding_Right_input__active.value);
    propertiesEditor(target);})
  }
  //----------------------
let element_Padding_Bottom_input__active = document.getElementById("element-Padding-Bottom-input-active");

if(element_Padding_Bottom_input__active){
  let targetValue = target.getAttribute("data-padding-bottom-active");
  element_Padding_Bottom_input__active.value = targetValue;
  element_Padding_Bottom_input__active.addEventListener("input", function(){
    
    target.setAttribute("data-padding-bottom-active",element_Padding_Bottom_input__active.value);
    propertiesEditor(target);})
  }
  //----------------------
let element_Padding_Left_input__active = document.getElementById("element-Padding-Left-input-active");

if(element_Padding_Left_input__active){
  let targetValue = target.getAttribute("data-padding-left-active");
  element_Padding_Left_input__active.value = targetValue;
  element_Padding_Left_input__active.addEventListener("input", function(){
    
    target.setAttribute("data-padding-left-active",element_Padding_Left_input__active.value);
    propertiesEditor(target);})
  }
  //----------------------
let element_Position_Input__active = document.getElementById("element-Position-Input-active");

if (element_Position_Input__active) {
  let targetValue = target.getAttribute("data-element-position-active");
  for (let i = 0; i < element_Position_Input__active.options.length; i++) {
  if (element_Position_Input__active.options[i].value === targetValue) {
    element_Position_Input__active.selectedIndex = i;
  break;}
  }
  element_Position_Input__active.addEventListener("change", function(){
          target.setAttribute("data-element-position-active",element_Position_Input__active.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
let element_Cursor_Input__active = document.getElementById("element-Cursor-Input-active");

if (element_Cursor_Input__active) {
  let targetValue = target.getAttribute("data-element-cursor-active");
  for (let i = 0; i < element_Cursor_Input__active.options.length; i++) {
  if (element_Cursor_Input__active.options[i].value === targetValue) {
    element_Cursor_Input__active.selectedIndex = i;
  break;}
  }
  element_Cursor_Input__active.addEventListener("change", function(){
          target.setAttribute("data-element-cursor-active",element_Cursor_Input__active.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
let element_Z_Index_Input__active = document.getElementById("element-Z-Index-Input-active");


if(element_Z_Index_Input__active){
  let targetValue = target.getAttribute("data-element-z-index-active");
  element_Z_Index_Input__active.value = targetValue;
  element_Z_Index_Input__active.addEventListener("input", function(){
    if(element_Z_Index_Input__active.value > 5000){
      element_Z_Index_Input__active.value = 5000;
    }
    target.setAttribute("data-element-z-index-active",element_Z_Index_Input__active.value);
    propertiesEditor(target);})
  }
  //----------------------
let element_Custom_CSS_Input__active = document.getElementById("element-Custom-CSS-Input-active");

if(element_Custom_CSS_Input__active){
  let targetValue = target.getAttribute("data-custom-css-active");
  element_Custom_CSS_Input__active.value = targetValue;
  element_Custom_CSS_Input__active.addEventListener("input", function(){
    
    target.setAttribute("data-custom-css-active",element_Custom_CSS_Input__active.value);
    propertiesEditor(target);})
  }
  //----------------------
//======// TABLET //====================================================// TABLET //=====================
let editDisplayinput_tablet = document.getElementById("editDisplayinput-tablet");

if (editDisplayinput_tablet) {
  let targetValue = target.getAttribute("data-display-tablet");
  for (let i = 0; i < editDisplayinput_tablet.options.length; i++) {
  if (editDisplayinput_tablet.options[i].value === targetValue) {
  editDisplayinput_tablet.selectedIndex = i;
  break;}
  }
      editDisplayinput_tablet.addEventListener("change", function(){
          target.setAttribute("data-display-tablet",editDisplayinput_tablet.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
let SelectFlexDirectioninput_tablet = document.getElementById("SelectFlexDirectioninput-tablet");

if (SelectFlexDirectioninput_tablet) {
  let targetValue = target.getAttribute("data-flex-direction-tablet");
  for (let i = 0; i < SelectFlexDirectioninput_tablet.options.length; i++) {
  if (SelectFlexDirectioninput_tablet.options[i].value === targetValue) {
  SelectFlexDirectioninput_tablet.selectedIndex = i;
  break;}
  }
      SelectFlexDirectioninput_tablet.addEventListener("change", function(){
          target.setAttribute("data-flex-direction-tablet",SelectFlexDirectioninput_tablet.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
let selectustifycontentinput_tablet = document.getElementById("selectustifycontentinput-tablet");

if (selectustifycontentinput_tablet) {
  let targetValue = target.getAttribute("data-justify-content-tablet");
  for (let i = 0; i < selectustifycontentinput_tablet.options.length; i++) {
  if (selectustifycontentinput_tablet.options[i].value === targetValue) {
  selectustifycontentinput_tablet.selectedIndex = i;
  break;}
  }
      selectustifycontentinput_tablet.addEventListener("change", function(){
          target.setAttribute("data-justify-content-tablet",selectustifycontentinput_tablet.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
let select_align_items_input_tablet = document.getElementById("select-align-items-input-tablet");

if (select_align_items_input_tablet) {
  let targetValue = target.getAttribute("data-align-items-tablet");
  for (let i = 0; i < select_align_items_input_tablet.options.length; i++) {
  if (select_align_items_input_tablet.options[i].value === targetValue) {
  select_align_items_input_tablet.selectedIndex = i;
  break;}
  }
      select_align_items_input_tablet.addEventListener("change", function(){
          target.setAttribute("data-align-items-tablet",select_align_items_input_tablet.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
let select_align_content_input_tablet = document.getElementById("select-align-content-input-tablet");

if (select_align_content_input_tablet) {
  let targetValue = target.getAttribute("data-align-content-tablet");
  for (let i = 0; i < select_align_content_input_tablet.options.length; i++) {
  if (select_align_content_input_tablet.options[i].value === targetValue) {
  select_align_content_input_tablet.selectedIndex = i;
  break;}
  }
      select_align_content_input_tablet.addEventListener("change", function(){
          target.setAttribute("data-align-content-tablet",select_align_content_input_tablet.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
  let selectFlexGAPTablet = document.getElementById("selectflex-gap-tablet");

  if(selectFlexGAPTablet){
    let targetValue = target.getAttribute("data-flex-gap-tablet");
    selectFlexGAPTablet.value = targetValue;
    selectFlexGAPTablet.addEventListener("input", function(){
      
      target.setAttribute("data-flex-gap-tablet",selectFlexGAPTablet.value);
      propertiesEditor(target);})
    }
    //----------------------
    let selectFlexWRAPTablet = document.getElementById("selectflexwrapinput-tablet");
    
  if (selectFlexWRAPTablet) {
    let targetValue = target.getAttribute("data-flex-wrap-tablet");
    for (let i = 0; i < selectFlexWRAPTablet.options.length; i++) {
    if (selectFlexWRAPTablet.options[i].value === targetValue) {
      selectFlexWRAPTablet.selectedIndex = i;
    break;}
    }
    selectFlexWRAPTablet.addEventListener("change", function(){
            target.setAttribute("data-flex-wrap-tablet",selectFlexWRAPTablet.value);
            propertiesEditor(target);})
    }
    //--------------------------------------------------
let select_flex_grow_input_tablet = document.getElementById("select-flex-grow-input-tablet");

if (select_flex_grow_input_tablet) {
  let targetValue = target.getAttribute("data-flex-grow-tablet");
  select_flex_grow_input_tablet.value = targetValue;
  
      select_flex_grow_input_tablet.addEventListener("change", function(){
          target.setAttribute("data-flex-grow-tablet",select_flex_grow_input_tablet.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
let flex_shrink_edit_input_tablet = document.getElementById("flex-shrink-edit-input-tablet");

if(flex_shrink_edit_input_tablet){
  let targetValue = target.getAttribute("data-flex-shrink-tablet");
  flex_shrink_edit_input_tablet.value = targetValue;
  flex_shrink_edit_input_tablet.addEventListener("input", function(){
    
    target.setAttribute("data-flex-shrink-tablet",flex_shrink_edit_input_tablet.value);
    propertiesEditor(target);})
  }
  //----------------------height-value-select-mobile  
let selectWidth_tablet = document.getElementById("width-value-select-tablet");

if (selectWidth_tablet) {
  let targetValue = target.getAttribute("data-width-select-tablet");
  for (let i = 0; i < selectWidth_tablet.options.length; i++) {
  if (selectWidth_tablet.options[i].value === targetValue) {
  selectWidth_tablet.selectedIndex = i;
  break;}
  }
      selectWidth_tablet.addEventListener("change", function(){
          target.setAttribute("data-width-select-tablet",selectWidth_tablet.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
let selectElementWidthinput_tablet = document.getElementById("selectElementWidthinput-tablet");

if (selectElementWidthinput_tablet) {
  let targetValue = target.getAttribute("data-width-Parameter-tablet");
  for (let i = 0; i < selectElementWidthinput_tablet.options.length; i++) {
  if (selectElementWidthinput_tablet.options[i].value === targetValue) {
  selectElementWidthinput_tablet.selectedIndex = i;
  break;}
  }
      selectElementWidthinput_tablet.addEventListener("change", function(){
          target.setAttribute("data-width-Parameter-tablet",selectElementWidthinput_tablet.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
let WidthElementEditinput_tablet = document.getElementById("WidthElementEditinput-tablet");

if(WidthElementEditinput_tablet){
  let targetValue = target.getAttribute("data-width-value-tablet");
  WidthElementEditinput_tablet.value = targetValue;
  WidthElementEditinput_tablet.addEventListener("input", function(){
    
    target.setAttribute("data-width-value-tablet",WidthElementEditinput_tablet.value);
    propertiesEditor(target);})
  }
  //----------------------
let selectElementHeightinput_tablet = document.getElementById("height-value-select-tablet");

if (selectElementHeightinput_tablet) {
  let targetValue = target.getAttribute("data-height-select-tablet");
  for (let i = 0; i < selectElementHeightinput_tablet.options.length; i++) {
  if (selectElementHeightinput_tablet.options[i].value === targetValue) {
  selectElementHeightinput_tablet.selectedIndex = i;
  break;}
  }
      selectElementHeightinput_tablet.addEventListener("change", function(){
          target.setAttribute("data-height-select-tablet",selectElementHeightinput_tablet.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
let selectElementHeightunit_tablet = document.getElementById("selectElementHeightinput-tablet");

if (selectElementHeightunit_tablet) {
  let targetValue = target.getAttribute("data-height-Parameter-tablet");
  for (let i = 0; i < selectElementHeightunit_tablet.options.length; i++) {
  if (selectElementHeightunit_tablet.options[i].value === targetValue) {
  selectElementHeightunit_tablet.selectedIndex = i;
  break;}
  }
      selectElementHeightunit_tablet.addEventListener("change", function(){
          target.setAttribute("data-height-Parameter-tablet",selectElementHeightunit_tablet.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
let elementHeightinput_tablet = document.getElementById("heightElementEditinput-tablet");

if(elementHeightinput_tablet){
  let targetValue = target.getAttribute("data-height-value-tablet");
  elementHeightinput_tablet.value = targetValue;
  elementHeightinput_tablet.addEventListener("input", function(){
    
    target.setAttribute("data-height-value-tablet",elementHeightinput_tablet.value);
    propertiesEditor(target);})
  }
  //----------------------
let element_overflow_x_Tablet = document.getElementById("elementoverflow-xinput-tablet");

if (element_overflow_x_Tablet) {
  let targetValue = target.getAttribute("data-overflow-x-tablet");
  for (let i = 0; i < element_overflow_x_Tablet.options.length; i++) {
  if (element_overflow_x_Tablet.options[i].value === targetValue) {
  element_overflow_x_Tablet.selectedIndex = i;
  break;}
  }
      element_overflow_x_Tablet.addEventListener("change", function(){
          target.setAttribute("data-overflow-x-tablet",element_overflow_x_Tablet.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
let element_overflow_y_Tablet = document.getElementById("Elementoverflow-yinput-tablet");

if (element_overflow_y_Tablet) {
  let targetValue = target.getAttribute("data-overflow-y-tablet");
  for (let i = 0; i < element_overflow_y_Tablet.options.length; i++) {
  if (element_overflow_y_Tablet.options[i].value === targetValue) {
  element_overflow_y_Tablet.selectedIndex = i;
  break;}
  }
      element_overflow_y_Tablet.addEventListener("change", function(){
          target.setAttribute("data-overflow-y-tablet",element_overflow_y_Tablet.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
let elementBackgroundColorinput_tablet = document.getElementById("elementBackgroundColorinput-tablet");

if(elementBackgroundColorinput_tablet){
  let targetValue = target.getAttribute("data-background-color-input-tablet");
  elementBackgroundColorinput_tablet.value = targetValue;
  elementBackgroundColorinput_tablet.addEventListener("input", function(){
    backgroundProcess_Tablet();
    target.setAttribute("data-background-color-input-tablet",elementBackgroundColorinput_tablet.value);
    propertiesEditor(target);})
  }
  //----------------------
let elementBackgroundOpacityinput_tablet = document.getElementById("elementBackgroundOpacityinput-tablet");

if(elementBackgroundOpacityinput_tablet){
  let targetValue = target.getAttribute("data-background-opacity-input-tablet");
  elementBackgroundOpacityinput_tablet.value = targetValue;
  elementBackgroundOpacityinput_tablet.addEventListener("input", function(){
    backgroundProcess_Tablet();
    target.setAttribute("data-background-opacity-input-tablet",elementBackgroundOpacityinput_tablet.value);
    propertiesEditor(target);})
  }
  //----------------------
  let elementBackgroundColorresult_tablet = document.getElementById("elementBackgroundColorresult-tablet");

  if(elementBackgroundColorresult_tablet){
      let targetValue = target.getAttribute("data-background-color-result-tablet");
      elementBackgroundColorresult_tablet.value = targetValue;
      elementBackgroundColorresult_tablet.addEventListener("change", function(){
        target.setAttribute("data-background-color-result-tablet",elementBackgroundColorresult_tablet.value);
        propertiesEditor(target);})
      }
      function backgroundProcess_Tablet(){
          let bgColor = elementBackgroundColorinput_tablet.value;
          let bgopacity = elementBackgroundOpacityinput_tablet.value;
          let backgroundcolorValue = "rgba(" +
          parseInt(bgColor.slice(1, 3), 16) + ", " +
          parseInt(bgColor.slice(3, 5), 16) + ", " +
          parseInt(bgColor.slice(5, 7), 16) + ", " +
          bgopacity + ")";
  
          elementBackgroundColorresult_tablet.value = backgroundcolorValue;
        target.setAttribute("data-background-color-result-tablet",elementBackgroundColorresult_tablet.value);
      }
  //----------------------

let elementBorderTypeinput_tablet = document.getElementById("elementBorderTypeinput-tablet");

if (elementBorderTypeinput_tablet) {
  let targetValue = target.getAttribute("data-border-type-tablet");
  for (let i = 0; i < elementBorderTypeinput_tablet.options.length; i++) {
  if (elementBorderTypeinput_tablet.options[i].value === targetValue) {
  elementBorderTypeinput_tablet.selectedIndex = i;
  break;}
  }
      elementBorderTypeinput_tablet.addEventListener("change", function(){
          target.setAttribute("data-border-type-tablet",elementBorderTypeinput_tablet.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
  let elementBorderColorinput_Tablet = document.getElementById("elementBorderColorinput-tablet");

    if (elementBorderColorinput_Tablet) {
        let targetValue = target.getAttribute("data-border-color-tablet");
        elementBorderColorinput_Tablet.value = targetValue;
        elementBorderColorinput_Tablet.addEventListener("change", function(){

                target.setAttribute("data-border-color-tablet",elementBorderColorinput_Tablet.value);
                propertiesEditor(target);})
        }
        //--------------------------------------------------
let elementBorderParamsinput_tablet = document.getElementById("elementBorderParamsinput-tablet");

if (elementBorderParamsinput_tablet) {
  let targetValue = target.getAttribute("data-border-parameter-tablet");
  for (let i = 0; i < elementBorderParamsinput_tablet.options.length; i++) {
  if (elementBorderParamsinput_tablet.options[i].value === targetValue) {
  elementBorderParamsinput_tablet.selectedIndex = i;
  break;}
  }
      elementBorderParamsinput_tablet.addEventListener("change", function(){
          target.setAttribute("data-border-parameter-tablet",elementBorderParamsinput_tablet.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
//Border Radius
let elementBorderRadiusinput_tablet = document.getElementById("elementBorderRadiusinput-tablet");
if (elementBorderRadiusinput_tablet) {
  let targetValue = target.getAttribute("data-border-radius-check-tablet");
  if (targetValue === "true") {
    elementBorderRadiusinput_tablet.checked = true;
  } else {
    elementBorderRadiusinput_tablet.checked = false;
  }

  elementBorderRadiusinput_tablet.addEventListener("change", function() {
    target.setAttribute("data-border-radius-check-tablet", elementBorderRadiusinput_tablet.checked);
    propertiesEditor(target);
  });
}
//------------------------------------
let elementRadiusParaminput_tablet =    document.getElementById("elementRadiusParaminput-tablet");

if (elementRadiusParaminput_tablet) {
  let targetValue = target.getAttribute("data-border-radius-parameter-tablet");
  for (let i = 0; i < elementRadiusParaminput_tablet.options.length; i++) {
  if (elementRadiusParaminput_tablet.options[i].value === targetValue) {
  elementRadiusParaminput_tablet.selectedIndex = i;
  break;}
  }
      elementRadiusParaminput_tablet.addEventListener("change", function(){
          target.setAttribute("data-border-radius-parameter-tablet",elementRadiusParaminput_tablet.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
let elementRadiusTopinput_tablet = document.getElementById("elementRadiusTopinput-tablet");

if(elementRadiusTopinput_tablet){
  let targetValue = target.getAttribute("data-border-radius-top-tablet");
  elementRadiusTopinput_tablet.value = targetValue;
  elementRadiusTopinput_tablet.addEventListener("input", function(){
    
    target.setAttribute("data-border-radius-top-tablet",elementRadiusTopinput_tablet.value);
    propertiesEditor(target);})
  }
  //----------------------
let elementRadiusRightinput_tablet = document.getElementById("elementRadiusRightinput-tablet");

if(elementRadiusRightinput_tablet){
  let targetValue = target.getAttribute("data-border-radius-right-tablet");
  elementRadiusRightinput_tablet.value = targetValue;
  elementRadiusRightinput_tablet.addEventListener("input", function(){
    
    target.setAttribute("data-border-radius-right-tablet",elementRadiusRightinput_tablet.value);
    propertiesEditor(target);})
  }
  //----------------------
let elementRadiusBottominput_tablet = document.getElementById("elementRadiusBottominput-tablet");

if(elementRadiusBottominput_tablet){
  let targetValue = target.getAttribute("data-border-radius-bottom-tablet");
  elementRadiusBottominput_tablet.value = targetValue;
  elementRadiusBottominput_tablet.addEventListener("input", function(){
    
    target.setAttribute("data-border-radius-bottom-tablet",elementRadiusBottominput_tablet.value);
    propertiesEditor(target);})
  }
  //----------------------
let elementRadiusLeftinput_tablet = document.getElementById("elementRadiusLeftinput-tablet");

if(elementRadiusLeftinput_tablet){
  let targetValue = target.getAttribute("data-border-radius-left-tablet");
  elementRadiusLeftinput_tablet.value = targetValue;
  elementRadiusLeftinput_tablet.addEventListener("input", function(){
    
    target.setAttribute("data-border-radius-left-tablet",elementRadiusLeftinput_tablet.value);
    propertiesEditor(target);})
  }
  //----------------------
let checkElementBoxShadowinput_tablet = document.getElementById("checkElementBoxShadowinput-tablet");
if (checkElementBoxShadowinput_tablet) {
  let targetValue = target.getAttribute("data-box-shadow-check-tablet");
  if (targetValue === "true") {
    checkElementBoxShadowinput_tablet.checked = true;
  } else {
    checkElementBoxShadowinput_tablet.checked = false;
  }

  checkElementBoxShadowinput_tablet.addEventListener("change", function() {
    target.setAttribute("data-box-shadow-check-tablet", checkElementBoxShadowinput_tablet.checked);
    propertiesEditor(target);
  });
}
//------------------------------------    
let elementHorizontalShadowLengthInput_tablet = document.getElementById("elementHorizontalShadowLengthInput-tablet");

if(elementHorizontalShadowLengthInput_tablet){
  let targetValue = target.getAttribute("data-box-shadow-horizontal-tablet");
  elementHorizontalShadowLengthInput_tablet.value = targetValue;
  elementHorizontalShadowLengthInput_tablet.addEventListener("input", function(){
    
    target.setAttribute("data-box-shadow-horizontal-tablet",elementHorizontalShadowLengthInput_tablet.value);
    propertiesEditor(target);})
  }
  //----------------------
let elementVerticalshadowlengthinput_tablet = document.getElementById("elementVerticalshadowlengthinput-tablet");

if(elementVerticalshadowlengthinput_tablet){
  let targetValue = target.getAttribute("data-box-shadow-vertical-tablet");
  elementVerticalshadowlengthinput_tablet.value = targetValue;
  elementVerticalshadowlengthinput_tablet.addEventListener("input", function(){
    
    target.setAttribute("data-box-shadow-vertical-tablet",elementVerticalshadowlengthinput_tablet.value);
    propertiesEditor(target);})
  }
  //----------------------
let elementBlurRadiusInput_tablet = document.getElementById("elementBlurRadiusInput-tablet");

if(elementBlurRadiusInput_tablet){
  let targetValue = target.getAttribute("data-box-shadow-blur-tablet");
  elementBlurRadiusInput_tablet.value = targetValue;
  elementBlurRadiusInput_tablet.addEventListener("input", function(){
    
    target.setAttribute("data-box-shadow-blur-tablet",elementBlurRadiusInput_tablet.value);
    propertiesEditor(target);})
  }
  //----------------------
let elementSpreadRadiusInput_tablet = document.getElementById("elementSpreadRadiusInput-tablet");

if(elementSpreadRadiusInput_tablet){
  let targetValue = target.getAttribute("data-box-shadow-spread-tablet");
  elementSpreadRadiusInput_tablet.value = targetValue;
  elementSpreadRadiusInput_tablet.addEventListener("input", function(){
    
    target.setAttribute("data-box-shadow-spread-tablet",elementSpreadRadiusInput_tablet.value);
    propertiesEditor(target);})
  }
  //----------------------
let shadowColorInput_tablet = document.getElementById("shadowColorInput-tablet");

if(shadowColorInput_tablet){
  let targetValue = target.getAttribute("data-box-shadow-color-tablet");
  shadowColorInput_tablet.value = targetValue;
  shadowColorInput_tablet.addEventListener("input", function(){
    
    target.setAttribute("data-box-shadow-color-tablet",shadowColorInput_tablet.value);
    propertiesEditor(target);})
  }
  //----------------------
let elementShadowOpacityInput_tablet = document.getElementById("elementShadowOpacityInput-tablet");

if(elementShadowOpacityInput_tablet){
let targetValue = target.getAttribute("data-box-shadow-opacity-tablet");
elementShadowOpacityInput_tablet.value = targetValue;
elementShadowOpacityInput_tablet.addEventListener("input", function(){
  
  target.setAttribute("data-box-shadow-opacity-tablet",elementShadowOpacityInput_tablet.value);
  propertiesEditor(target);})
}
//----------------------
let elementShadowInsetOutsetinput_tablet = document.getElementById("elementShadowInsetOutsetinput-tablet");

if (elementShadowInsetOutsetinput_tablet) {
  let targetValue = target.getAttribute("data-box-shadow-set-tablet");
  for (let i = 0; i < elementShadowInsetOutsetinput_tablet.options.length; i++) {
  if (elementShadowInsetOutsetinput_tablet.options[i].value === targetValue) {
  elementShadowInsetOutsetinput_tablet.selectedIndex = i;
  break;}
  }
      elementShadowInsetOutsetinput_tablet.addEventListener("change", function(){
          target.setAttribute("data-box-shadow-set-tablet",elementShadowInsetOutsetinput_tablet.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
let elementTextAligninput_tablet = document.getElementById("elementTextAligninput-tablet");

if (elementTextAligninput_tablet) {
  let targetValue = target.getAttribute("data-text-align-tablet");
  for (let i = 0; i < elementTextAligninput_tablet.options.length; i++) {
  if (elementTextAligninput_tablet.options[i].value === targetValue) {
  elementTextAligninput_tablet.selectedIndex = i;
  break;}
  }
      elementTextAligninput_tablet.addEventListener("change", function(){
          target.setAttribute("data-text-align-tablet",elementTextAligninput_tablet.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
let elementfontcolorinput_tablet = document.getElementById("elementfontcolorinput-tablet");

if(elementfontcolorinput_tablet){
  let targetValue = target.getAttribute("data-font-color-tablet");
  elementfontcolorinput_tablet.value = targetValue;
  elementfontcolorinput_tablet.addEventListener("input", function(){
    
    target.setAttribute("data-font-color-tablet",elementfontcolorinput_tablet.value);
    propertiesEditor(target);})
  }
  //----------------------
let Check_element_Margin_input_tablet = document.getElementById("Check-element-Margin-input-tablet");
if (Check_element_Margin_input_tablet) {
  let targetValue = target.getAttribute("data-margin-check-tablet");
  if (targetValue === "true") {
    Check_element_Margin_input_tablet.checked = true;
  } else {
    Check_element_Margin_input_tablet.checked = false;
  }

  Check_element_Margin_input_tablet.addEventListener("change", function() {
    target.setAttribute("data-margin-check-tablet", Check_element_Margin_input_tablet.checked);
    propertiesEditor(target);
  });
}
//------------------------------------
let element_Margin_Param_input_tablet = document.getElementById("element-Margin-Param-input-tablet");

if (element_Margin_Param_input_tablet) {
  let targetValue = target.getAttribute("data-margin-parameter-tablet");
  for (let i = 0; i < element_Margin_Param_input_tablet.options.length; i++) {
  if (element_Margin_Param_input_tablet.options[i].value === targetValue) {
  element_Margin_Param_input_tablet.selectedIndex = i;
  break;}
  }
      element_Margin_Param_input_tablet.addEventListener("change", function(){
          target.setAttribute("data-margin-parameter-tablet",element_Margin_Param_input_tablet.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
let element_Margin_Top_input_tablet = document.getElementById("element-Margin-Top-input-tablet");

if(element_Margin_Top_input_tablet){
  let targetValue = target.getAttribute("data-margin-top-tablet");
  element_Margin_Top_input_tablet.value = targetValue;
  element_Margin_Top_input_tablet.addEventListener("input", function(){
    
    target.setAttribute("data-margin-top-tablet",element_Margin_Top_input_tablet.value);
    propertiesEditor(target);})
  }
  //----------------------
let element_Margin_Right_input_tablet = document.getElementById("element-Margin-Right-input-tablet");

if(element_Margin_Right_input_tablet){
  let targetValue = target.getAttribute("data-margin-right-tablet");
  element_Margin_Right_input_tablet.value = targetValue;
  element_Margin_Right_input_tablet.addEventListener("input", function(){
    
    target.setAttribute("data-margin-right-tablet",element_Margin_Right_input_tablet.value);
    propertiesEditor(target);})
  }
  //----------------------
let element_Margin_Bottom_input_tablet = document.getElementById("element-Margin-Bottom-input-tablet");

if(element_Margin_Bottom_input_tablet){
  let targetValue = target.getAttribute("data-margin-bottom-tablet");
  element_Margin_Bottom_input_tablet.value = targetValue;
  element_Margin_Bottom_input_tablet.addEventListener("input", function(){
    
    target.setAttribute("data-margin-bottom-tablet",element_Margin_Bottom_input_tablet.value);
    propertiesEditor(target);})
  }
  //----------------------
let element_Margin_Left_input_tablet = document.getElementById("element-Margin-Left-input-tablet");

if(element_Margin_Left_input_tablet){
  let targetValue = target.getAttribute("data-margin-left-tablet");
  element_Margin_Left_input_tablet.value = targetValue;
  element_Margin_Left_input_tablet.addEventListener("input", function(){
    
    target.setAttribute("data-margin-left-tablet",element_Margin_Left_input_tablet.value);
    propertiesEditor(target);})
  }
  //----------------------
let Check_element_Padding_input_tablet = document.getElementById("Check-element-Padding-input-tablet");
if (Check_element_Padding_input_tablet) {
  let targetValue = target.getAttribute("data-padding-check-tablet");
  if (targetValue === "true") {
    Check_element_Padding_input_tablet.checked = true;
  } else {
    Check_element_Padding_input_tablet.checked = false;
  }

  Check_element_Padding_input_tablet.addEventListener("change", function() {
    target.setAttribute("data-padding-check-tablet", Check_element_Padding_input_tablet.checked);
    propertiesEditor(target);
  });
}
//------------------------------------
let element_Padding_Param_input_tablet = document.getElementById("element-Padding-Param-input-tablet");

if (element_Padding_Param_input_tablet) {
  let targetValue = target.getAttribute("data-padding-parameter-tablet");
  for (let i = 0; i < element_Padding_Param_input_tablet.options.length; i++) {
  if (element_Padding_Param_input_tablet.options[i].value === targetValue) {
  element_Padding_Param_input_tablet.selectedIndex = i;
  break;}
  }
      element_Padding_Param_input_tablet.addEventListener("change", function(){
          target.setAttribute("data-padding-parameter-tablet",element_Padding_Param_input_tablet.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
let element_Padding_Top_input_tablet = document.getElementById("element-Padding-Top-input-tablet");

if(element_Padding_Top_input_tablet){
  let targetValue = target.getAttribute("data-padding-top-tablet");
  element_Padding_Top_input_tablet.value = targetValue;
  element_Padding_Top_input_tablet.addEventListener("input", function(){
    
    target.setAttribute("data-padding-top-tablet",element_Padding_Top_input_tablet.value);
    propertiesEditor(target);})
  }
  //----------------------
let element_Padding_Right_input_tablet = document.getElementById("element-Padding-Right-input-tablet");

if(element_Padding_Right_input_tablet){
  let targetValue = target.getAttribute("data-padding-right-tablet");
  element_Padding_Right_input_tablet.value = targetValue;
  element_Padding_Right_input_tablet.addEventListener("input", function(){
    
    target.setAttribute("data-padding-right-tablet",element_Padding_Right_input_tablet.value);
    propertiesEditor(target);})
  }
  //----------------------
let element_Padding_Bottom_input_tablet = document.getElementById("element-Padding-Bottom-input-tablet");

if(element_Padding_Bottom_input_tablet){
  let targetValue = target.getAttribute("data-padding-bottom-tablet");
  element_Padding_Bottom_input_tablet.value = targetValue;
  element_Padding_Bottom_input_tablet.addEventListener("input", function(){
    
    target.setAttribute("data-padding-bottom-tablet",element_Padding_Bottom_input_tablet.value);
    propertiesEditor(target);})
  }
  //----------------------
let element_Padding_Left_input_tablet = document.getElementById("element-Padding-Left-input-tablet");

if(element_Padding_Left_input_tablet){
  let targetValue = target.getAttribute("data-padding-left-tablet");
  element_Padding_Left_input_tablet.value = targetValue;
  element_Padding_Left_input_tablet.addEventListener("input", function(){
    
    target.setAttribute("data-padding-left-tablet",element_Padding_Left_input_tablet.value);
    propertiesEditor(target);})
  }
  //----------------------
let element_Position_Input_tablet = document.getElementById("element-Position-Input-tablet");

if (element_Position_Input_tablet) {
  let targetValue = target.getAttribute("data-element-position-tablet");
  for (let i = 0; i < element_Position_Input_tablet.options.length; i++) {
  if (element_Position_Input_tablet.options[i].value === targetValue) {
  element_Position_Input_tablet.selectedIndex = i;
  break;}
  }
      element_Position_Input_tablet.addEventListener("change", function(){
          target.setAttribute("data-element-position-tablet",element_Position_Input_tablet.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
let element_Cursor_Input_tablet = document.getElementById("element-Cursor-Input-tablet");

if (element_Cursor_Input_tablet) {
  let targetValue = target.getAttribute("data-element-cursor-tablet");
  for (let i = 0; i < element_Cursor_Input_tablet.options.length; i++) {
  if (element_Cursor_Input_tablet.options[i].value === targetValue) {
  element_Cursor_Input_tablet.selectedIndex = i;
  break;}
  }
      element_Cursor_Input_tablet.addEventListener("change", function(){
          target.setAttribute("data-element-cursor-tablet",element_Cursor_Input_tablet.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
let element_Z_Index_Input_tablet = document.getElementById("element-Z-Index-Input-tablet");


if(element_Z_Index_Input_tablet){
  let targetValue = target.getAttribute("data-element-z-index-tablet");
  element_Z_Index_Input_tablet.value = targetValue;
  element_Z_Index_Input_tablet.addEventListener("input", function(){
    if(element_Z_Index_Input_tablet.value > 5000){
      element_Z_Index_Input_tablet.value = 5000;
    }
    target.setAttribute("data-element-z-index-tablet",element_Z_Index_Input_tablet.value);
    propertiesEditor(target);})
  }
  //----------------------
let element_Custom_CSS_Input_tablet = document.getElementById("element-Custom-CSS-Input-tablet");

if(element_Custom_CSS_Input_tablet){
  let targetValue = target.getAttribute("data-custom-css-tablet");
  element_Custom_CSS_Input_tablet.value = targetValue;
  element_Custom_CSS_Input_tablet.addEventListener("input", function(){
    
    target.setAttribute("data-custom-css-tablet",element_Custom_CSS_Input_tablet.value);
    propertiesEditor(target);})
  }
  //----------------------

// //======// MOBILE //====================================================// MOBILE //=====================

let editDisplayinput_mobile = document.getElementById("editDisplayinput-mobile");

if (editDisplayinput_mobile) {
  let targetValueMobile = target.getAttribute("data-display-mobile");
  for (let i = 0; i < editDisplayinput_mobile.options.length; i++) {
    if (editDisplayinput_mobile.options[i].value === targetValueMobile) {
      editDisplayinput_mobile.selectedIndex = i;
      break;
    }
  }
  editDisplayinput_mobile.addEventListener("change", function(){
    target.setAttribute("data-display-mobile", editDisplayinput_mobile.value);
    propertiesEditor(target);
  });
}

  //--------------------------------------------------
let SelectFlexDirectioninput_mobile = document.getElementById("SelectFlexDirectioninput-mobile");

if (SelectFlexDirectioninput_mobile) {
  let targetValue = target.getAttribute("data-flex-direction-mobile");
  for (let i = 0; i < SelectFlexDirectioninput_mobile.options.length; i++) {
  if (SelectFlexDirectioninput_mobile.options[i].value === targetValue) {
    SelectFlexDirectioninput_mobile.selectedIndex = i;
  break;}
  }
    SelectFlexDirectioninput_mobile.addEventListener("change", function(){
          target.setAttribute("data-flex-direction-mobile",SelectFlexDirectioninput_mobile.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
  let selectustifycontentinput_mobile = document.getElementById("selectustifycontentinput-mobile");

if (selectustifycontentinput_mobile) {
  let targetValue = target.getAttribute("data-justify-content-mobile");
  for (let i = 0; i < selectustifycontentinput_mobile.options.length; i++) {
  if (selectustifycontentinput_mobile.options[i].value === targetValue) {
    selectustifycontentinput_mobile.selectedIndex = i;
  break;}
  }
          selectustifycontentinput_mobile.addEventListener("change", function(){
          target.setAttribute("data-justify-content-mobile",selectustifycontentinput_mobile.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
  let select_align_items_input_mobile = document.getElementById("select-align-items-input-mobile");

if (select_align_items_input_mobile) {
  let targetValue = target.getAttribute("data-align-items-mobile");
  for (let i = 0; i < select_align_items_input_mobile.options.length; i++) {
  if (select_align_items_input_mobile.options[i].value === targetValue) {
    select_align_items_input_mobile.selectedIndex = i;
  break;}
  }
  select_align_items_input_mobile.addEventListener("change", function(){
          target.setAttribute("data-align-items-mobile",select_align_items_input_mobile.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
  let select_align_content_input_mobile = document.getElementById("select-align-content-input-mobile");

if (select_align_content_input_mobile) {
  let targetValue = target.getAttribute("data-align-content-mobile");
  for (let i = 0; i < select_align_content_input_mobile.options.length; i++) {
  if (select_align_content_input_mobile.options[i].value === targetValue) {
    select_align_content_input_mobile.selectedIndex = i;
  break;}
  }
  select_align_content_input_mobile.addEventListener("change", function(){
          target.setAttribute("data-align-content-mobile",select_align_content_input_mobile.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
  let selectFlexGAPMobile = document.getElementById("selectflex-gap-mobile");

  if(selectFlexGAPMobile){
    let targetValue = target.getAttribute("data-flex-gap-mobile");
    selectFlexGAPMobile.value = targetValue;
    selectFlexGAPMobile.addEventListener("input", function(){
      
      target.setAttribute("data-flex-gap-mobile",selectFlexGAPMobile.value);
      propertiesEditor(target);})
    }
    //----------------------
    let selectFlexWRAPMobile = document.getElementById("selectflexwrapinput-mobile");
    
  if (selectFlexWRAPMobile) {
    let targetValue = target.getAttribute("data-flex-wrap-mobile");
    for (let i = 0; i < selectFlexWRAPMobile.options.length; i++) {
    if (selectFlexWRAPMobile.options[i].value === targetValue) {
      selectFlexWRAPMobile.selectedIndex = i;
    break;}
    }
    selectFlexWRAPMobile.addEventListener("change", function(){
            target.setAttribute("data-flex-wrap-mobile",selectFlexWRAPMobile.value);
            propertiesEditor(target);})
    }
    //--------------------------------------------------
  let select_flex_grow_input_mobile = document.getElementById("select-flex-grow-input-mobile");

if (select_flex_grow_input_mobile) {
  let targetValue = target.getAttribute("data-flex-grow-mobile");
  select_flex_grow_input_mobile.value = targetValue;
  select_flex_grow_input_mobile.addEventListener("change", function(){
          target.setAttribute("data-flex-grow-mobile",select_flex_grow_input_mobile.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
  let flex_shrink_edit_input_mobile = document.getElementById("flex-shrink-edit-input-mobile");

if(flex_shrink_edit_input_mobile){
  let targetValue = target.getAttribute("data-flex-shrink-mobile");
  flex_shrink_edit_input_mobile.value = targetValue;
  flex_shrink_edit_input_mobile.addEventListener("input", function(){
    
    target.setAttribute("data-flex-shrink-mobile",flex_shrink_edit_input_mobile.value);
    propertiesEditor(target);})
  }
  //---------------------- 
  let selectWidth_mobile = document.getElementById("width-value-select-mobile");

if (selectWidth_mobile) {
  let targetValue = target.getAttribute("data-width-select-mobile");
  for (let i = 0; i < selectWidth_mobile.options.length; i++) {
  if (selectWidth_mobile.options[i].value === targetValue) {
    selectWidth_mobile.selectedIndex = i;
  break;}
  }
  selectWidth_mobile.addEventListener("change", function(){
          target.setAttribute("data-width-select-mobile",selectWidth_mobile.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
  let selectElementWidthinput_mobile = document.getElementById("selectElementWidthinput-mobile");

if (selectElementWidthinput_mobile) {
  let targetValue = target.getAttribute("data-width-Parameter-mobile");
  for (let i = 0; i < selectElementWidthinput_mobile.options.length; i++) {
  if (selectElementWidthinput_mobile.options[i].value === targetValue) {
    selectElementWidthinput_mobile.selectedIndex = i;
  break;}
  }
  selectElementWidthinput_mobile.addEventListener("change", function(){
          target.setAttribute("data-width-Parameter-mobile",selectElementWidthinput_mobile.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
  let WidthElementEditinput_mobile = document.getElementById("WidthElementEditinput-mobile");

if(WidthElementEditinput_mobile){
  let targetValue = target.getAttribute("data-width-value-mobile");
  WidthElementEditinput_mobile.value = targetValue;
  WidthElementEditinput_mobile.addEventListener("input", function(){
    
    target.setAttribute("data-width-value-mobile",WidthElementEditinput_mobile.value);
    propertiesEditor(target);})
  }
  //----------------------
  let selectElementHeightinput_mobile = document.getElementById("height-value-select-mobile");

if (selectElementHeightinput_mobile) {
  let targetValue = target.getAttribute("data-height-select-mobile");
  for (let i = 0; i < selectElementHeightinput_mobile.options.length; i++) {
  if (selectElementHeightinput_mobile.options[i].value === targetValue) {
    selectElementHeightinput_mobile.selectedIndex = i;
  break;}
  }
  selectElementHeightinput_mobile.addEventListener("change", function(){
          target.setAttribute("data-height-select-mobile",selectElementHeightinput_mobile.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
  let selectElementHeightunit_mobile = document.getElementById("selectElementHeightinput-mobile");

if (selectElementHeightunit_mobile) {
  let targetValue = target.getAttribute("data-height-Parameter-mobile");
  for (let i = 0; i < selectElementHeightunit_mobile.options.length; i++) {
  if (selectElementHeightunit_mobile.options[i].value === targetValue) {
    selectElementHeightunit_mobile.selectedIndex = i;
  break;}
  }
  selectElementHeightunit_mobile.addEventListener("change", function(){
          target.setAttribute("data-height-Parameter-mobile",selectElementHeightunit_mobile.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
  let elementHeightinput_mobile = document.getElementById("heightElementEditinput-mobile");

if(elementHeightinput_mobile){
  let targetValue = target.getAttribute("data-height-value-mobile");
  elementHeightinput_mobile.value = targetValue;
  elementHeightinput_mobile.addEventListener("input", function(){
    
    target.setAttribute("data-height-value-mobile",elementHeightinput_mobile.value);
    propertiesEditor(target);})
  }
  //----------------------
let element_overflow_x_Mobile = document.getElementById("elementoverflow-xinput-mobile");

if (element_overflow_x_Mobile) {
  let targetValue = target.getAttribute("data-overflow-x-mobile");
  for (let i = 0; i < element_overflow_x_Mobile.options.length; i++) {
  if (element_overflow_x_Mobile.options[i].value === targetValue) {
    element_overflow_x_Mobile.selectedIndex = i;
  break;}
  }
      element_overflow_x_Mobile.addEventListener("change", function(){
          target.setAttribute("data-overflow-x-mobile",element_overflow_x_Mobile.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
let element_overflow_y_Mobile = document.getElementById("Elementoverflow-yinput-mobile");

if (element_overflow_y_Mobile) {
  let targetValue = target.getAttribute("data-overflow-y-mobile");
  for (let i = 0; i < element_overflow_y_Mobile.options.length; i++) {
  if (element_overflow_y_Mobile.options[i].value === targetValue) {
    element_overflow_y_Mobile.selectedIndex = i;
  break;}
  }
          element_overflow_y_Mobile.addEventListener("change", function(){
          target.setAttribute("data-overflow-y-mobile",element_overflow_y_Mobile.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
  let elementBackgroundColorinput_Mobile = document.getElementById("elementBackgroundColorinput-mobile");

  if(elementBackgroundColorinput_Mobile){
    let targetValue = target.getAttribute("data-background-color-input-mobile");
    elementBackgroundColorinput_Mobile.value = targetValue;
    elementBackgroundColorinput_Mobile.addEventListener("input", function(){
      backgroundProcess_Mobile();
      target.setAttribute("data-background-color-input-mobile",elementBackgroundColorinput_Mobile.value);
      propertiesEditor(target);})
    }
    //----------------------
  let elementBackgroundOpacityinput_Mobile = document.getElementById("elementBackgroundOpacityinput-mobile");
  
  if(elementBackgroundOpacityinput_Mobile){
    let targetValue = target.getAttribute("data-background-opacity-input-mobile");
    elementBackgroundOpacityinput_Mobile.value = targetValue;
    elementBackgroundOpacityinput_Mobile.addEventListener("input", function(){
      backgroundProcess_Mobile();
      target.setAttribute("data-background-opacity-input-mobile",elementBackgroundOpacityinput_Mobile.value);
      propertiesEditor(target);})
    }
    //----------------------
    let elementBackgroundColorresult_Mobile = document.getElementById("elementBackgroundColorresult-mobile");
  
    if(elementBackgroundColorresult_Mobile){
        let targetValue = target.getAttribute("data-background-color-result-mobile");
        elementBackgroundColorresult_Mobile.value = targetValue;
        elementBackgroundColorresult_Mobile.addEventListener("change", function(){
          target.setAttribute("data-background-color-result-mobile",elementBackgroundColorresult_Mobile.value);
          propertiesEditor(target);})
        }
        function backgroundProcess_Mobile(){
            let bgColor = elementBackgroundColorinput_Mobile.value;
            let bgopacity = elementBackgroundOpacityinput_Mobile.value;
            let backgroundcolorValue = "rgba(" +
            parseInt(bgColor.slice(1, 3), 16) + ", " +
            parseInt(bgColor.slice(3, 5), 16) + ", " +
            parseInt(bgColor.slice(5, 7), 16) + ", " +
            bgopacity + ")";
    
            elementBackgroundColorresult_Mobile.value = backgroundcolorValue;
          target.setAttribute("data-background-color-result-mobile",elementBackgroundColorresult_Mobile.value);
        }
    //----------------------

let elementBorderTypeinput_Mobile = document.getElementById("elementBorderTypeinput-mobile");

if (elementBorderTypeinput_Mobile) {
  let targetValue = target.getAttribute("data-border-type-mobile");
  for (let i = 0; i < elementBorderTypeinput_Mobile.options.length; i++) {
  if (elementBorderTypeinput_Mobile.options[i].value === targetValue) {
    elementBorderTypeinput_Mobile.selectedIndex = i;
  break;}
  }
      elementBorderTypeinput_Mobile.addEventListener("change", function(){
          target.setAttribute("data-border-type-mobile",elementBorderTypeinput_Mobile.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
  let elementBorderColorinput_Mobile = document.getElementById("elementBorderColorinput-mobile");

    if (elementBorderColorinput_Mobile) {
        let targetValue = target.getAttribute("data-border-color-mobile");
        elementBorderColorinput_Mobile.value = targetValue;
        elementBorderColorinput_Mobile.addEventListener("change", function(){

                target.setAttribute("data-border-color-mobile",elementBorderColorinput_Mobile.value);
                propertiesEditor(target);})
        }
        //--------------------------------------------------
let elementBorderParamsinput_Mobile = document.getElementById("elementBorderParamsinput-mobile");

if (elementBorderParamsinput_Mobile) {
  let targetValue = target.getAttribute("data-border-parameter-mobile");
  for (let i = 0; i < elementBorderParamsinput_Mobile.options.length; i++) {
  if (elementBorderParamsinput_Mobile.options[i].value === targetValue) {
    elementBorderParamsinput_Mobile.selectedIndex = i;
  break;}
  }
          elementBorderParamsinput_Mobile.addEventListener("change", function(){
          target.setAttribute("data-border-parameter-mobile",elementBorderParamsinput_Mobile.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
//Border Radius
let elementBorderRadiusinput_Mobile = document.getElementById("elementBorderRadiusinput-mobile");
if (elementBorderRadiusinput_Mobile) {
  let targetValue = target.getAttribute("data-border-radius-check-mobile");
  if (targetValue === "true") {
    elementBorderRadiusinput_Mobile.checked = true;
  } else {
    elementBorderRadiusinput_Mobile.checked = false;
  }

  elementBorderRadiusinput_Mobile.addEventListener("change", function() {
    target.setAttribute("data-border-radius-check-mobile", elementBorderRadiusinput_Mobile.checked);
    propertiesEditor(target);
  });
}
//------------------------------------
let elementRadiusParaminput_Mobile =    document.getElementById("elementRadiusParaminput-mobile");

if (elementRadiusParaminput_Mobile) {
  let targetValue = target.getAttribute("data-border-radius-parameter-mobile");
  for (let i = 0; i < elementRadiusParaminput_Mobile.options.length; i++) {
  if (elementRadiusParaminput_Mobile.options[i].value === targetValue) {
    elementRadiusParaminput_Mobile.selectedIndex = i;
  break;}
  }
      elementRadiusParaminput_Mobile.addEventListener("change", function(){
          target.setAttribute("data-border-radius-parameter-mobile",elementRadiusParaminput_Mobile.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
let elementRadiusTopinput_Mobile = document.getElementById("elementRadiusTopinput-mobile");

if(elementRadiusTopinput_Mobile){
  let targetValue = target.getAttribute("data-border-radius-top-mobile");
  elementRadiusTopinput_Mobile.value = targetValue;
  elementRadiusTopinput_Mobile.addEventListener("input", function(){
    
    target.setAttribute("data-border-radius-top-mobile",elementRadiusTopinput_Mobile.value);
    propertiesEditor(target);})
  }
  //----------------------
let elementRadiusRightinput_Mobile = document.getElementById("elementRadiusRightinput-mobile");

if(elementRadiusRightinput_Mobile){
  let targetValue = target.getAttribute("data-border-radius-right-mobile");
  elementRadiusRightinput_Mobile.value = targetValue;
  elementRadiusRightinput_Mobile.addEventListener("input", function(){
    
    target.setAttribute("data-border-radius-right-mobile",elementRadiusRightinput_Mobile.value);
    propertiesEditor(target);})
  }
  //----------------------
let elementRadiusBottominput_Mobile = document.getElementById("elementRadiusBottominput-mobile");

if(elementRadiusBottominput_Mobile){
  let targetValue = target.getAttribute("data-border-radius-bottom-mobile");
  elementRadiusBottominput_Mobile.value = targetValue;
  elementRadiusBottominput_Mobile.addEventListener("input", function(){
    
    target.setAttribute("data-border-radius-bottom-mobile",elementRadiusBottominput_Mobile.value);
    propertiesEditor(target);})
  }
  //----------------------
let elementRadiusLeftinput_Mobile = document.getElementById("elementRadiusLeftinput-mobile");

if(elementRadiusLeftinput_Mobile){
  let targetValue = target.getAttribute("data-border-radius-left-mobile");
  elementRadiusLeftinput_Mobile.value = targetValue;
  elementRadiusLeftinput_Mobile.addEventListener("input", function(){
    
    target.setAttribute("data-border-radius-left-mobile",elementRadiusLeftinput_Mobile.value);
    propertiesEditor(target);})
  }
  //----------------------
let checkElementBoxShadowinput_Mobile = document.getElementById("checkElementBoxShadowinput-mobile");
if (checkElementBoxShadowinput_Mobile) {
  let targetValue = target.getAttribute("data-box-shadow-check-mobile");
  if (targetValue === "true") {
    checkElementBoxShadowinput_Mobile.checked = true;
  } else {
    checkElementBoxShadowinput_Mobile.checked = false;
  }

  checkElementBoxShadowinput_Mobile.addEventListener("change", function() {
    target.setAttribute("data-box-shadow-check-mobile", checkElementBoxShadowinput_Mobile.checked);
    propertiesEditor(target);
  });
}
//------------------------------------    
let elementHorizontalShadowLengthInput_Mobile = document.getElementById("elementHorizontalShadowLengthInput-mobile");

if(elementHorizontalShadowLengthInput_Mobile){
  let targetValue = target.getAttribute("data-box-shadow-horizontal-mobile");
  elementHorizontalShadowLengthInput_Mobile.value = targetValue;
  elementHorizontalShadowLengthInput_Mobile.addEventListener("input", function(){
    
    target.setAttribute("data-box-shadow-horizontal-mobile",elementHorizontalShadowLengthInput_Mobile.value);
    propertiesEditor(target);})
  }
  //----------------------
let elementVerticalshadowlengthinput_Mobile = document.getElementById("elementVerticalshadowlengthinput-mobile");

if(elementVerticalshadowlengthinput_Mobile){
  let targetValue = target.getAttribute("data-box-shadow-vertical-mobile");
  elementVerticalshadowlengthinput_Mobile.value = targetValue;
  elementVerticalshadowlengthinput_Mobile.addEventListener("input", function(){
    
    target.setAttribute("data-box-shadow-vertical-mobile",elementVerticalshadowlengthinput_Mobile.value);
    propertiesEditor(target);})
  }
  //----------------------
let elementBlurRadiusInput_Mobile = document.getElementById("elementBlurRadiusInput-mobile");

if(elementBlurRadiusInput_Mobile){
  let targetValue = target.getAttribute("data-box-shadow-blur-mobile");
  elementBlurRadiusInput_Mobile.value = targetValue;
  elementBlurRadiusInput_Mobile.addEventListener("input", function(){
    
    target.setAttribute("data-box-shadow-blur-mobile",elementBlurRadiusInput_Mobile.value);
    propertiesEditor(target);})
  }
  //----------------------
let elementSpreadRadiusInput_Mobile = document.getElementById("elementSpreadRadiusInput-mobile");

if(elementSpreadRadiusInput_Mobile){
  let targetValue = target.getAttribute("data-box-shadow-spread-mobile");
  elementSpreadRadiusInput_Mobile.value = targetValue;
  elementSpreadRadiusInput_Mobile.addEventListener("input", function(){
    
    target.setAttribute("data-box-shadow-spread-mobile",elementSpreadRadiusInput_Mobile.value);
    propertiesEditor(target);})
  }
  //----------------------
let shadowColorInput_Mobile = document.getElementById("shadowColorInput-mobile");

if(shadowColorInput_Mobile){
  let targetValue = target.getAttribute("data-box-shadow-color-mobile");
  shadowColorInput_Mobile.value = targetValue;
  shadowColorInput_Mobile.addEventListener("input", function(){
    
    target.setAttribute("data-box-shadow-color-mobile",shadowColorInput_Mobile.value);
    propertiesEditor(target);})
  }
  //----------------------
let elementShadowOpacityInput_Mobile = document.getElementById("elementShadowOpacityInput-mobile");

if(elementShadowOpacityInput_Mobile){
let targetValue = target.getAttribute("data-box-shadow-opacity-mobile");
elementShadowOpacityInput_Mobile.value = targetValue;
elementShadowOpacityInput_Mobile.addEventListener("input", function(){
  
  target.setAttribute("data-box-shadow-opacity-mobile",elementShadowOpacityInput_Mobile.value);
  propertiesEditor(target);})
}
//----------------------
let elementShadowInsetOutsetinput_Mobile = document.getElementById("elementShadowInsetOutsetinput-mobile");

if (elementShadowInsetOutsetinput_Mobile) {
  let targetValue = target.getAttribute("data-box-shadow-set-mobile");
  for (let i = 0; i < elementShadowInsetOutsetinput_Mobile.options.length; i++) {
  if (elementShadowInsetOutsetinput_Mobile.options[i].value === targetValue) {
    elementShadowInsetOutsetinput_Mobile.selectedIndex = i;
  break;}
  }
  elementShadowInsetOutsetinput_Mobile.addEventListener("change", function(){
          target.setAttribute("data-box-shadow-set-mobile",elementShadowInsetOutsetinput_Mobile.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
let elementTextAligninput_Mobile = document.getElementById("elementTextAligninput-mobile");

if (elementTextAligninput_Mobile) {
  let targetValue = target.getAttribute("data-text-align-mobile");
  for (let i = 0; i < elementTextAligninput_Mobile.options.length; i++) {
  if (elementTextAligninput_Mobile.options[i].value === targetValue) {
    elementTextAligninput_Mobile.selectedIndex = i;
  break;}
  }
  elementTextAligninput_Mobile.addEventListener("change", function(){
          target.setAttribute("data-text-align-mobile",elementTextAligninput_Mobile.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
let elementfontcolorinput_Mobile = document.getElementById("elementfontcolorinput-mobile");

if(elementfontcolorinput_Mobile){
  let targetValue = target.getAttribute("data-font-color-mobile");
  elementfontcolorinput_Mobile.value = targetValue;
  elementfontcolorinput_Mobile.addEventListener("input", function(){
    
    target.setAttribute("data-font-color-mobile",elementfontcolorinput_Mobile.value);
    propertiesEditor(target);})
  }
  //----------------------
let Check_element_Margin_input_Mobile = document.getElementById("Check-element-Margin-input-mobile");
if (Check_element_Margin_input_Mobile) {
  let targetValue = target.getAttribute("data-margin-check-mobile");
  if (targetValue === "true") {
    Check_element_Margin_input_Mobile.checked = true;
  } else {
    Check_element_Margin_input_Mobile.checked = false;
  }

  Check_element_Margin_input_Mobile.addEventListener("change", function() {
    target.setAttribute("data-margin-check-mobile", Check_element_Margin_input_Mobile.checked);
    propertiesEditor(target);
  });
}
//------------------------------------
let element_Margin_Param_input_Mobile = document.getElementById("element-Margin-Param-input-mobile");

if (element_Margin_Param_input_Mobile) {
  let targetValue = target.getAttribute("data-margin-parameter-mobile");
  for (let i = 0; i < element_Margin_Param_input_Mobile.options.length; i++) {
  if (element_Margin_Param_input_Mobile.options[i].value === targetValue) {
    element_Margin_Param_input_Mobile.selectedIndex = i;
  break;}
  }
  element_Margin_Param_input_Mobile.addEventListener("change", function(){
          target.setAttribute("data-margin-parameter-mobile",element_Margin_Param_input_Mobile.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
let element_Margin_Top_input_Mobile = document.getElementById("element-Margin-Top-input-mobile");

if(element_Margin_Top_input_Mobile){
  let targetValue = target.getAttribute("data-margin-top-mobile");
  element_Margin_Top_input_Mobile.value = targetValue;
  element_Margin_Top_input_Mobile.addEventListener("input", function(){
    
    target.setAttribute("data-margin-top-mobile",element_Margin_Top_input_Mobile.value);
    propertiesEditor(target);})
  }
  //----------------------
let element_Margin_Right_input_Mobile = document.getElementById("element-Margin-Right-input-mobile");

if(element_Margin_Right_input_Mobile){
  let targetValue = target.getAttribute("data-margin-right-mobile");
  element_Margin_Right_input_Mobile.value = targetValue;
  element_Margin_Right_input_Mobile.addEventListener("input", function(){
    
    target.setAttribute("data-margin-right-mobile",element_Margin_Right_input_Mobile.value);
    propertiesEditor(target);})
  }
  //----------------------
let element_Margin_Bottom_input_Mobile = document.getElementById("element-Margin-Bottom-input-mobile");

if(element_Margin_Bottom_input_Mobile){
  let targetValue = target.getAttribute("data-margin-bottom-mobile");
  element_Margin_Bottom_input_Mobile.value = targetValue;
  element_Margin_Bottom_input_Mobile.addEventListener("input", function(){
    
    target.setAttribute("data-margin-bottom-mobile",element_Margin_Bottom_input_Mobile.value);
    propertiesEditor(target);})
  }
  //----------------------
let element_Margin_Left_input_Mobile = document.getElementById("element-Margin-Left-input-mobile");

if(element_Margin_Left_input_Mobile){
  let targetValue = target.getAttribute("data-margin-left-mobile");
  element_Margin_Left_input_Mobile.value = targetValue;
  element_Margin_Left_input_Mobile.addEventListener("input", function(){
    
    target.setAttribute("data-margin-left-mobile",element_Margin_Left_input_Mobile.value);
    propertiesEditor(target);})
  }
  //----------------------
let Check_element_Padding_input_Mobile = document.getElementById("Check-element-Padding-input-mobile");
if (Check_element_Padding_input_Mobile) {
  let targetValue = target.getAttribute("data-padding-check-mobile");
  if (targetValue === "true") {
    Check_element_Padding_input_Mobile.checked = true;
  } else {
    Check_element_Padding_input_Mobile.checked = false;
  }

  Check_element_Padding_input_Mobile.addEventListener("change", function() {
    target.setAttribute("data-padding-check-mobile", Check_element_Padding_input_Mobile.checked);
    propertiesEditor(target);
  });
}
//------------------------------------
let element_Padding_Param_input_Mobile = document.getElementById("element-Padding-Param-input-mobile");

if (element_Padding_Param_input_Mobile) {
  let targetValue = target.getAttribute("data-padding-parameter-mobile");
  for (let i = 0; i < element_Padding_Param_input_Mobile.options.length; i++) {
  if (element_Padding_Param_input_Mobile.options[i].value === targetValue) {
    element_Padding_Param_input_Mobile.selectedIndex = i;
  break;}
  }
  element_Padding_Param_input_Mobile.addEventListener("change", function(){
          target.setAttribute("data-padding-parameter-mobile",element_Padding_Param_input_Mobile.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
let element_Padding_Top_input_Mobile = document.getElementById("element-Padding-Top-input-mobile");

if(element_Padding_Top_input_Mobile){
  let targetValue = target.getAttribute("data-padding-top-mobile");
  element_Padding_Top_input_Mobile.value = targetValue;
  element_Padding_Top_input_Mobile.addEventListener("input", function(){
    
    target.setAttribute("data-padding-top-mobile",element_Padding_Top_input_Mobile.value);
    propertiesEditor(target);})
  }
  //----------------------
let element_Padding_Right_input_Mobile = document.getElementById("element-Padding-Right-input-mobile");

if(element_Padding_Right_input_Mobile){
  let targetValue = target.getAttribute("data-padding-right-mobile");
  element_Padding_Right_input_Mobile.value = targetValue;
  element_Padding_Right_input_Mobile.addEventListener("input", function(){
    
    target.setAttribute("data-padding-right-mobile",element_Padding_Right_input_Mobile.value);
    propertiesEditor(target);})
  }
  //----------------------
let element_Padding_Bottom_input_Mobile = document.getElementById("element-Padding-Bottom-input-mobile");

if(element_Padding_Bottom_input_Mobile){
  let targetValue = target.getAttribute("data-padding-bottom-mobile");
  element_Padding_Bottom_input_Mobile.value = targetValue;
  element_Padding_Bottom_input_Mobile.addEventListener("input", function(){
    
    target.setAttribute("data-padding-bottom-mobile",element_Padding_Bottom_input_Mobile.value);
    propertiesEditor(target);})
  }
  //----------------------
let element_Padding_Left_input_Mobile = document.getElementById("element-Padding-Left-input-mobile");

if(element_Padding_Left_input_Mobile){
  let targetValue = target.getAttribute("data-padding-left-mobile");
  element_Padding_Left_input_Mobile.value = targetValue;
  element_Padding_Left_input_Mobile.addEventListener("input", function(){
    
    target.setAttribute("data-padding-left-mobile",element_Padding_Left_input_Mobile.value);
    propertiesEditor(target);})
  }
  //----------------------
let element_Position_Input_Mobile = document.getElementById("element-Position-Input-mobile");

if (element_Position_Input_Mobile) {
  let targetValue = target.getAttribute("data-element-position-mobile");
  for (let i = 0; i < element_Position_Input_Mobile.options.length; i++) {
  if (element_Position_Input_Mobile.options[i].value === targetValue) {
    element_Position_Input_Mobile.selectedIndex = i;
  break;}
  }
  element_Position_Input_Mobile.addEventListener("change", function(){
          target.setAttribute("data-element-position-mobile",element_Position_Input_Mobile.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
let element_Cursor_Input_Mobile = document.getElementById("element-Cursor-Input-mobile");

if (element_Cursor_Input_Mobile) {
  let targetValue = target.getAttribute("data-element-cursor-mobile");
  for (let i = 0; i < element_Cursor_Input_Mobile.options.length; i++) {
  if (element_Cursor_Input_Mobile.options[i].value === targetValue) {
    element_Cursor_Input_Mobile.selectedIndex = i;
  break;}
  }
  element_Cursor_Input_Mobile.addEventListener("change", function(){
          target.setAttribute("data-element-cursor-mobile",element_Cursor_Input_Mobile.value);
          propertiesEditor(target);})
  }
  //--------------------------------------------------
let element_Z_Index_Input_Mobile = document.getElementById("element-Z-Index-Input-mobile");


if(element_Z_Index_Input_Mobile){
  let targetValue = target.getAttribute("data-element-z-index-mobile");
  element_Z_Index_Input_Mobile.value = targetValue;
  element_Z_Index_Input_Mobile.addEventListener("input", function(){
    if(element_Z_Index_Input_Mobile.value > 5000){
      element_Z_Index_Input_Mobile.value = 5000;
    }
    target.setAttribute("data-element-z-index-mobile",element_Z_Index_Input_Mobile.value);
    propertiesEditor(target);})
  }
  //----------------------
let element_Custom_CSS_Input_Mobile = document.getElementById("element-Custom-CSS-Input-mobile");

if(element_Custom_CSS_Input_Mobile){
  let targetValue = target.getAttribute("data-custom-css-mobile");
  element_Custom_CSS_Input_Mobile.value = targetValue;
  element_Custom_CSS_Input_Mobile.addEventListener("input", function(){
    
    target.setAttribute("data-custom-css-mobile",element_Custom_CSS_Input_Mobile.value);
    propertiesEditor(target);})
  }
  //----------------------

// Content
let imageInput = document.getElementById("image-src-input");
if(imageInput){
let targetValue = target.getAttribute("src");
imageInput.value = targetValue;
imageInput.addEventListener("input", function(){
  
  target.setAttribute("src",imageInput.value);
  propertiesEditor(target);})
}
//----------------------
//image Render
let eLementimagerender = document.getElementById("editimagerenderinginput");
if (eLementimagerender) {
let targetValue = target.getAttribute("data-image-render");
for (let i = 0; i < eLementimagerender.options.length; i++) {
if (eLementimagerender.options[i].value === targetValue) {
eLementimagerender.selectedIndex = i;
break;}
}
    eLementimagerender.addEventListener("change", function(){
        target.setAttribute("data-image-render",eLementimagerender.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
//Image Orientation
let elementImageOrientation = document.getElementById("editimageorientationinput");
if (elementImageOrientation) {
let targetValue = target.getAttribute("data-image-orientation");
for (let i = 0; i < elementImageOrientation.options.length; i++) {
if (elementImageOrientation.options[i].value === targetValue) {
elementImageOrientation.selectedIndex = i;
break;}
}
    elementImageOrientation.addEventListener("change", function(){
        target.setAttribute("data-image-orientation",elementImageOrientation.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
//Object Fit

let elementObjectFit = document.getElementById("editobject-fitinput");
if (elementObjectFit) {
let targetValue = target.getAttribute("data-object-fit");
for (let i = 0; i < elementObjectFit.options.length; i++) {
if (elementObjectFit.options[i].value === targetValue) {
elementObjectFit.selectedIndex = i;
break;}
}
    elementObjectFit.addEventListener("change", function(){
        target.setAttribute("data-object-fit",elementObjectFit.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
// Tablet //===========
let elementObjectFit_Tablet = document.getElementById("editobject-fitinput-tablet");
if (elementObjectFit_Tablet) {
let targetValue = target.getAttribute("data-object-fit-tablet");
for (let i = 0; i < elementObjectFit_Tablet.options.length; i++) {
if (elementObjectFit_Tablet.options[i].value === targetValue) {
elementObjectFit_Tablet.selectedIndex = i;
break;}
}
    elementObjectFit_Tablet.addEventListener("change", function(){
        target.setAttribute("data-object-fit-tablet",elementObjectFit_Tablet.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
// Mobile //===========
let elementObjectFit_Mobile = document.getElementById("editobject-fitinput-mobile");
if (elementObjectFit_Mobile) {
let targetValue = target.getAttribute("data-object-fit-mobile");
for (let i = 0; i < elementObjectFit_Mobile.options.length; i++) {
if (elementObjectFit_Mobile.options[i].value === targetValue) {
elementObjectFit_Mobile.selectedIndex = i;
break;}
}
    elementObjectFit_Mobile.addEventListener("change", function(){
        target.setAttribute("data-object-fit-mobile",elementObjectFit_Mobile.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
//Image Position

let elementImagePosition = document.getElementById("editimagepositionxinput");
if(elementImagePosition){
let targetValue = target.getAttribute("data-image-x-axis");
elementImagePosition.value = targetValue;
elementImagePosition.addEventListener("input", function(){
  
  target.setAttribute("data-image-x-axis",elementImagePosition.value);
  propertiesEditor(target);})
}


let elementImagePositionY = document.getElementById("editimagepositionyinput");
if(elementImagePositionY){
let targetValue = target.getAttribute("data-image-y-axis");
elementImagePositionY.value = targetValue;
elementImagePositionY.addEventListener("input", function(){
  
  target.setAttribute("data-image-y-axis",elementImagePositionY.value);
  propertiesEditor(target);})
}
//----------------------
//----------------------

// Tablet //===========
let elementImagePosition_Tablet = document.getElementById("editimagepositionxinput-tablet");
if(elementImagePosition_Tablet){
let targetValue = target.getAttribute("data-image-x-axis-tablet");
elementImagePosition_Tablet.value = targetValue;
elementImagePosition_Tablet.addEventListener("input", function(){
  
  target.setAttribute("data-image-x-axis-tablet",elementImagePosition_Tablet.value);
  propertiesEditor(target);})
}

let elementImagePositionY_Tablet = document.getElementById("editimagepositionyinput-tablet");
if(elementImagePositionY_Tablet){
let targetValue = target.getAttribute("data-image-y-axis-tablet");
elementImagePositionY_Tablet.value = targetValue;
elementImagePositionY_Tablet.addEventListener("input", function(){
  
  target.setAttribute("data-image-y-axis-tablet",elementImagePositionY_Tablet.value);
  propertiesEditor(target);})
}

//----------------------
// Mobile //===========
let elementImagePosition_Mobile = document.getElementById("editimagepositionxinput-mobile");
if(elementImagePosition_Mobile){
let targetValue = target.getAttribute("data-image-x-axis-mobile");
elementImagePosition_Mobile.value = targetValue;
elementImagePosition_Mobile.addEventListener("input", function(){
  
  target.setAttribute("data-image-x-axis-mobile",elementImagePosition_Mobile.value);
  propertiesEditor(target);})
}

let elementImagePositionY_Mobile = document.getElementById("editimagepositionyinput-mobile");
if(elementImagePositionY_Mobile){
let targetValue = target.getAttribute("data-image-y-axis-mobile");
elementImagePositionY_Mobile.value = targetValue;
elementImagePositionY_Mobile.addEventListener("input", function(){
  
  target.setAttribute("data-image-y-axis-mobile",elementImagePositionY_Mobile.value);
  propertiesEditor(target);})
}

//----------------------

//Text Content


let elementTextContent = document.getElementById("contentTextInputText");
if(elementTextContent){
let targetValue = target.textContent;
elementTextContent.value = targetValue;
elementTextContent.addEventListener("input", function(){

  target.textContent = elementTextContent.value;})
}
//----------------------

let elementULHTML = document.getElementById("edit-innerhtml-ul-input");
if(elementULHTML){
let targetValue = target.innerHTML;
elementULHTML.value = targetValue;
elementULHTML.addEventListener("input", ()=>{
  target.innerHTML = elementULHTML.value;
})
}
//-----------------------
let elementFor = document.getElementById("label-for-input");
if(elementFor){
let targetValue = target.getAttribute("for");
elementFor.value = targetValue;
elementFor.addEventListener("input", function(){
  
  target.setAttribute("for",elementFor.value);
  propertiesEditor(target);})
}
//----------------------

let elementAccesskey = document.getElementById("label-acceskey-input");
if(elementAccesskey){
let targetValue = target.getAttribute("accesskey");
elementAccesskey.value = targetValue;
elementAccesskey.addEventListener("input", function(){
  
  target.setAttribute("accesskey",elementAccesskey.value);
  propertiesEditor(target);})
}
//----------------------

//=========================
let HeadertextContent = document.getElementById("HeaderText");
if(HeadertextContent){
let targetValue = target.innerHTML;
setTimeout(() => {
// Replace the textarea #example with SCEditor
var textarea = document.getElementById('HeaderTextinput');
var editor = sceditor.create(textarea, {
	format: 'xhtml',
  plugins: 'undo',
	toolbar: `bold,italic,underline,left,center,right,justify,image,`,
  height: "100%",
  id: "headerText-id",
  toolbarContainer: document.getElementById('#toolbarText'),
	style: 'https://cdn.jsdelivr.net/npm/sceditor@3/minified/themes/content/default.min.css'
});
sceditor.instance(textarea).val(targetValue);
var body = sceditor.instance(textarea).getBody();
// var valueVal = editor.getBody().html();
body.addEventListener("input", function(){
  let value = sceditor.instance(textarea).val().replace(/<\/?p>/g, '');
  target.innerHTML = value;
  propertiesEditor(target);
})
}, 100);
}

//-----------------------------
//----------------------
let ContentextContent = document.getElementById("ContentsText");
if(ContentextContent){
let targetValue = target.innerHTML;
setTimeout(() => {
// Replace the textarea #example with SCEditor
var textarea = document.getElementById('ContentsTextinput');
var editor = sceditor.create(textarea, {
	format: 'xhtml',
  plugins: 'undo',
	toolbar: `bold,italic,underline,left,center,right,justify, 
  |bulletlist,orderedlist,table,code,image,
  |date,time,color,horizontalrule,maximize,
  `,
  height: "100%",
  id: "contentText-id",
  toolbarContainer: document.getElementById('#toolbarText'),
	style: 'https://cdn.jsdelivr.net/npm/sceditor@3/minified/themes/content/default.min.css'
});
sceditor.instance(textarea).val(targetValue);
var body = sceditor.instance(textarea).getBody();
// var valueVal = editor.getBody().html();
body.addEventListener("input", function(){
  let value = sceditor.instance(textarea).val().replace(/<\/?p>/g, '');
  target.innerHTML = value;
  propertiesEditor(target);
})
}, 100);
}
//-------------------------------------------------
//FONT PROPERTIES
TextShadows()
function TextShadows(){
  let TextshadowinputChecker = document.getElementById("Text-shadowinput");
if (TextshadowinputChecker) {
  let DivafterCheck = document.getElementById("FontafterChecked");
  let targetValue = target.getAttribute("data-text-shadow-check");
  DivafterCheck.classList.add("none-mode");

  if (targetValue === "true") {
    TextshadowinputChecker.checked = true;
    DivafterCheck.classList.remove("none-mode");
  } else {
    TextshadowinputChecker.checked = false;
    DivafterCheck.classList.add("none-mode");
  }
  //-----------------------------------------------------------------
    TextshadowinputChecker.addEventListener("change", function() {
      target.setAttribute("data-text-shadow-check", TextshadowinputChecker.checked);
      TextShadows();
      propertiesEditor(target);
    });
  }//=========================================
}
//font Size

let element_Font_Size = document.getElementById("fontsizeinput");
if(element_Font_Size){
let targetValue = target.getAttribute("data-font-size");
element_Font_Size.value = targetValue;
element_Font_Size.addEventListener("input", function(){
  
  target.setAttribute("data-font-size",element_Font_Size.value);
  propertiesEditor(target);})
}
//----------------------
// Hover //============
let element_Font_Size_Hover = document.getElementById("fontsizeinput-hover");
if(element_Font_Size_Hover){
let targetValue = target.getAttribute("data-font-size-hover");
element_Font_Size_Hover.value = targetValue;
element_Font_Size_Hover.addEventListener("input", function(){
  
  target.setAttribute("data-font-size-hover",element_Font_Size_Hover.value);
  propertiesEditor(target);})
}
//----------------------
// Active //===========
let element_Font_Size_Active = document.getElementById("fontsizeinput-active");
if(element_Font_Size_Active){
let targetValue = target.getAttribute("data-font-size-active");
element_Font_Size_Active.value = targetValue;
element_Font_Size_Active.addEventListener("input", function(){
  
  target.setAttribute("data-font-size-active",element_Font_Size_Active.value);
  propertiesEditor(target);})
}
//----------------------
// Tablet //===========
let element_Font_Size_Tablet = document.getElementById("fontsizeinput-tablet");
if(element_Font_Size_Tablet){
let targetValue = target.getAttribute("data-font-size-tablet");
element_Font_Size_Tablet.value = targetValue;
element_Font_Size_Tablet.addEventListener("input", function(){
  
  target.setAttribute("data-font-size-tablet",element_Font_Size_Tablet.value);
  propertiesEditor(target);})
}
//----------------------
// Mobile //===========
let element_Font_Size_Mobile = document.getElementById("fontsizeinput-mobile");
if(element_Font_Size_Mobile){
let targetValue = target.getAttribute("data-font-size-mobile");
element_Font_Size_Mobile.value = targetValue;
element_Font_Size_Mobile.addEventListener("input", function(){
  
  target.setAttribute("data-font-size-mobile",element_Font_Size_Mobile.value);
  propertiesEditor(target);})
}
//----------------------

let element_Font_Parameter = document.getElementById("fontsizeparaminput");
if (element_Font_Parameter) {
let targetValue = target.getAttribute("data-font-parameter");
for (let i = 0; i < element_Font_Parameter.options.length; i++) {
if (element_Font_Parameter.options[i].value === targetValue) {
element_Font_Parameter.selectedIndex = i;
break;}
}
    element_Font_Parameter.addEventListener("change", function(){
        target.setAttribute("data-font-parameter",element_Font_Parameter.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
// Hover //===========
let element_Font_Parameter_Hover = document.getElementById("fontsizeparaminput-hover");
if (element_Font_Parameter_Hover) {
let targetValue = target.getAttribute("data-font-parameter-hover");
for (let i = 0; i < element_Font_Parameter_Hover.options.length; i++) {
if (element_Font_Parameter_Hover.options[i].value === targetValue) {
element_Font_Parameter_Hover.selectedIndex = i;
break;}
}
    element_Font_Parameter_Hover.addEventListener("change", function(){
        target.setAttribute("data-font-parameter-hover",element_Font_Parameter_Hover.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
// Active //===========
let element_Font_Parameter_Active = document.getElementById("fontsizeparaminput-active");
if (element_Font_Parameter_Active) {
let targetValue = target.getAttribute("data-font-parameter-active");
for (let i = 0; i < element_Font_Parameter_Active.options.length; i++) {
if (element_Font_Parameter_Active.options[i].value === targetValue) {
element_Font_Parameter_Active.selectedIndex = i;
break;}
}
    element_Font_Parameter_Active.addEventListener("change", function(){
        target.setAttribute("data-font-parameter-active",element_Font_Parameter_Active.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
// Tablet //===========
let element_Font_Parameter_Tablet = document.getElementById("fontsizeparaminput-tablet");
if (element_Font_Parameter_Tablet) {
let targetValue = target.getAttribute("data-font-parameter-tablet");
for (let i = 0; i < element_Font_Parameter_Tablet.options.length; i++) {
if (element_Font_Parameter_Tablet.options[i].value === targetValue) {
element_Font_Parameter_Tablet.selectedIndex = i;
break;}
}
    element_Font_Parameter_Tablet.addEventListener("change", function(){
        target.setAttribute("data-font-parameter-tablet",element_Font_Parameter_Tablet.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
// Mobile //===========
let element_Font_Parameter_Mobile = document.getElementById("fontsizeparaminput-mobile");
if (element_Font_Parameter_Mobile) {
let targetValue = target.getAttribute("data-font-parameter-mobile");
for (let i = 0; i < element_Font_Parameter_Mobile.options.length; i++) {
if (element_Font_Parameter_Mobile.options[i].value === targetValue) {
element_Font_Parameter_Mobile.selectedIndex = i;
break;}
}
    element_Font_Parameter_Mobile.addEventListener("change", function(){
        target.setAttribute("data-font-parameter-mobile",element_Font_Parameter_Mobile.value);
        propertiesEditor(target);})
}
//--------------------------------------------------



let element_Font_Weight = document.getElementById("font-weightinput");
if (element_Font_Weight) {
let targetValue = target.getAttribute("data-font-weight");
for (let i = 0; i < element_Font_Weight.options.length; i++) {
if (element_Font_Weight.options[i].value === targetValue) {
element_Font_Weight.selectedIndex = i;
break;}
}
    element_Font_Weight.addEventListener("change", function(){
        target.setAttribute("data-font-weight",element_Font_Weight.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
// Hover //===========
let element_Font_Weight_Hover = document.getElementById("font-weightinput-hover");
if (element_Font_Weight_Hover) {
let targetValue = target.getAttribute("data-font-weight-hover");
for (let i = 0; i < element_Font_Weight_Hover.options.length; i++) {
if (element_Font_Weight_Hover.options[i].value === targetValue) {
element_Font_Weight_Hover.selectedIndex = i;
break;}
}
    element_Font_Weight_Hover.addEventListener("change", function(){
        target.setAttribute("data-font-weight-hover",element_Font_Weight_Hover.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
// Active //===========
let element_Font_Weight_Active = document.getElementById("font-weightinput-active");
if (element_Font_Weight_Active) {
let targetValue = target.getAttribute("data-font-weight-active");
for (let i = 0; i < element_Font_Weight_Active.options.length; i++) {
if (element_Font_Weight_Active.options[i].value === targetValue) {
element_Font_Weight_Active.selectedIndex = i;
break;}
}
    element_Font_Weight_Active.addEventListener("change", function(){
        target.setAttribute("data-font-weight-active",element_Font_Weight_Active.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
// Tablet //===========
let element_Font_Weight_Tablet = document.getElementById("font-weightinput-tablet");
if (element_Font_Weight_Tablet) {
let targetValue = target.getAttribute("data-font-weight-tablet");
for (let i = 0; i < element_Font_Weight_Tablet.options.length; i++) {
if (element_Font_Weight_Tablet.options[i].value === targetValue) {
element_Font_Weight_Tablet.selectedIndex = i;
break;}
}
    element_Font_Weight_Tablet.addEventListener("change", function(){
        target.setAttribute("data-font-weight-tablet",element_Font_Weight_Tablet.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
// Mobile //===========
let element_Font_Weight_Mobile = document.getElementById("font-weightinput-mobile");
if (element_Font_Weight_Mobile) {
let targetValue = target.getAttribute("data-font-weight-mobile");
for (let i = 0; i < element_Font_Weight_Mobile.options.length; i++) {
if (element_Font_Weight_Mobile.options[i].value === targetValue) {
element_Font_Weight_Mobile.selectedIndex = i;
break;}
}
    element_Font_Weight_Mobile.addEventListener("change", function(){
        target.setAttribute("data-font-weight-mobile",element_Font_Weight_Mobile.value);
        propertiesEditor(target);})
}
//--------------------------------------------------




let element_Font_Style = document.getElementById("font-styleinput");
if (element_Font_Style) {
let targetValue = target.getAttribute("data-font-style");
for (let i = 0; i < element_Font_Style.options.length; i++) {
if (element_Font_Style.options[i].value === targetValue) {
element_Font_Style.selectedIndex = i;
break;}
}
    element_Font_Style.addEventListener("change", function(){
        target.setAttribute("data-font-style",element_Font_Style.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
// Hover //===========
let element_Font_Style_Hover = document.getElementById("font-styleinput-hover");
if (element_Font_Style_Hover) {
let targetValue = target.getAttribute("data-font-style-hover");
for (let i = 0; i < element_Font_Style_Hover.options.length; i++) {
if (element_Font_Style_Hover.options[i].value === targetValue) {
element_Font_Style_Hover.selectedIndex = i;
break;}
}
    element_Font_Style_Hover.addEventListener("change", function(){
        target.setAttribute("data-font-style-hover",element_Font_Style_Hover.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
// Active //===========
let element_Font_Style_Active = document.getElementById("font-styleinput-active");
if (element_Font_Style_Active) {
let targetValue = target.getAttribute("data-font-style-active");
for (let i = 0; i < element_Font_Style_Active.options.length; i++) {
if (element_Font_Style_Active.options[i].value === targetValue) {
element_Font_Style_Active.selectedIndex = i;
break;}
}
    element_Font_Style_Active.addEventListener("change", function(){
        target.setAttribute("data-font-style-active",element_Font_Style_Active.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
// Tablet //===========
let element_Font_Style_Tablet = document.getElementById("font-styleinput-tablet");
if (element_Font_Style_Tablet) {
let targetValue = target.getAttribute("data-font-style-tablet");
for (let i = 0; i < element_Font_Style_Tablet.options.length; i++) {
if (element_Font_Style_Tablet.options[i].value === targetValue) {
element_Font_Style_Tablet.selectedIndex = i;
break;}
}
    element_Font_Style_Tablet.addEventListener("change", function(){
        target.setAttribute("data-font-style-tablet",element_Font_Style_Tablet.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
// Mobile //===========
let element_Font_Style_Mobile = document.getElementById("font-styleinput-mobile");
if (element_Font_Style_Mobile) {
let targetValue = target.getAttribute("data-font-style-mobile");
for (let i = 0; i < element_Font_Style_Mobile.options.length; i++) {
if (element_Font_Style_Mobile.options[i].value === targetValue) {
element_Font_Style_Mobile.selectedIndex = i;
break;}
}
    element_Font_Style_Mobile.addEventListener("change", function(){
        target.setAttribute("data-font-style-mobile",element_Font_Style_Mobile.value);
        propertiesEditor(target);})
}
//--------------------------------------------------


let element_Font_Decoration = document.getElementById("text-decorationinput");
if (element_Font_Decoration) {
let targetValue = target.getAttribute("data-text-decoration");
for (let i = 0; i < element_Font_Decoration.options.length; i++) {
if (element_Font_Decoration.options[i].value === targetValue) {
element_Font_Decoration.selectedIndex = i;
break;}
}
    element_Font_Decoration.addEventListener("change", function(){
        target.setAttribute("data-text-decoration",element_Font_Decoration.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
// Hover //===========
let element_Font_Decoration_Hover = document.getElementById("text-decorationinput-hover");
if (element_Font_Decoration_Hover) {
let targetValue = target.getAttribute("data-text-decoration-hover");
for (let i = 0; i < element_Font_Decoration_Hover.options.length; i++) {
if (element_Font_Decoration_Hover.options[i].value === targetValue) {
element_Font_Decoration_Hover.selectedIndex = i;
break;}
}
    element_Font_Decoration_Hover.addEventListener("change", function(){
        target.setAttribute("data-text-decoration-hover",element_Font_Decoration_Hover.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
// Active //===========
let element_Font_Decoration_Active = document.getElementById("text-decorationinput-active");
if (element_Font_Decoration_Active) {
let targetValue = target.getAttribute("data-text-decoration-active");
for (let i = 0; i < element_Font_Decoration_Active.options.length; i++) {
if (element_Font_Decoration_Active.options[i].value === targetValue) {
element_Font_Decoration_Active.selectedIndex = i;
break;}
}
    element_Font_Decoration_Active.addEventListener("change", function(){
        target.setAttribute("data-text-decoration-active",element_Font_Decoration_Active.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
// Tablet //===========
let element_Font_Decoration_Tablet = document.getElementById("text-decorationinput-tablet");
if (element_Font_Decoration_Tablet) {
let targetValue = target.getAttribute("data-text-decoration-tablet");
for (let i = 0; i < element_Font_Decoration_Tablet.options.length; i++) {
if (element_Font_Decoration_Tablet.options[i].value === targetValue) {
element_Font_Decoration_Tablet.selectedIndex = i;
break;}
}
    element_Font_Decoration_Tablet.addEventListener("change", function(){
        target.setAttribute("data-text-decoration-tablet",element_Font_Decoration_Tablet.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
// Mobile //===========
let element_Font_Decoration_Mobile = document.getElementById("text-decorationinput-mobile");
if (element_Font_Decoration_Mobile) {
let targetValue = target.getAttribute("data-text-decoration-mobile");
for (let i = 0; i < element_Font_Decoration_Mobile.options.length; i++) {
if (element_Font_Decoration_Mobile.options[i].value === targetValue) {
element_Font_Decoration_Mobile.selectedIndex = i;
break;}
}
    element_Font_Decoration_Mobile.addEventListener("change", function(){
        target.setAttribute("data-text-decoration-mobile",element_Font_Decoration_Mobile.value);
        propertiesEditor(target);})
}
//--------------------------------------------------


let element_Font_Transform = document.getElementById("text-transforminput");
if (element_Font_Transform) {
let targetValue = target.getAttribute("data-text-transform");
for (let i = 0; i < element_Font_Transform.options.length; i++) {
if (element_Font_Transform.options[i].value === targetValue) {
element_Font_Transform.selectedIndex = i;
break;}
}
    element_Font_Transform.addEventListener("change", function(){
        target.setAttribute("data-text-transform",element_Font_Transform.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
// Hover //===========
let element_Font_Transform_Hover = document.getElementById("text-transforminput-hover");
if (element_Font_Transform_Hover) {
let targetValue = target.getAttribute("data-text-transform-hover");
for (let i = 0; i < element_Font_Transform_Hover.options.length; i++) {
if (element_Font_Transform_Hover.options[i].value === targetValue) {
element_Font_Transform_Hover.selectedIndex = i;
break;}
}
    element_Font_Transform_Hover.addEventListener("change", function(){
        target.setAttribute("data-text-transform-hover",element_Font_Transform_Hover.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
// Active //===========
let element_Font_Transform_Active = document.getElementById("text-transforminput-active");
if (element_Font_Transform_Active) {
let targetValue = target.getAttribute("data-text-transform-active");
for (let i = 0; i < element_Font_Transform_Active.options.length; i++) {
if (element_Font_Transform_Active.options[i].value === targetValue) {
element_Font_Transform_Active.selectedIndex = i;
break;}
}
    element_Font_Transform_Active.addEventListener("change", function(){
        target.setAttribute("data-text-transform-active",element_Font_Transform_Active.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
// Tablet //===========
let element_Font_Transform_Tablet = document.getElementById("text-transforminput-tablet");
if (element_Font_Transform_Tablet) {
let targetValue = target.getAttribute("data-text-transform-tablet");
for (let i = 0; i < element_Font_Transform_Tablet.options.length; i++) {
if (element_Font_Transform_Tablet.options[i].value === targetValue) {
element_Font_Transform_Tablet.selectedIndex = i;
break;}
}
    element_Font_Transform_Tablet.addEventListener("change", function(){
        target.setAttribute("data-text-transform-tablet",element_Font_Transform_Tablet.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
// Mobile //===========
let element_Font_Transform_Mobile = document.getElementById("text-transforminput-mobile");
if (element_Font_Transform_Mobile) {
let targetValue = target.getAttribute("data-text-transform-mobile");
for (let i = 0; i < element_Font_Transform_Mobile.options.length; i++) {
if (element_Font_Transform_Mobile.options[i].value === targetValue) {
element_Font_Transform_Mobile.selectedIndex = i;
break;}
}
    element_Font_Transform_Mobile.addEventListener("change", function(){
        target.setAttribute("data-text-transform-mobile",element_Font_Transform_Mobile.value);
        propertiesEditor(target);})
}
//--------------------------------------------------


let element_Letter_Spacing = document.getElementById("letter-spacinginput");
if(element_Letter_Spacing){
let targetValue = target.getAttribute("data-letter-spacing");
element_Letter_Spacing.value = targetValue;
element_Letter_Spacing.addEventListener("input", function(){
  
  target.setAttribute("data-letter-spacing",element_Letter_Spacing.value);
  propertiesEditor(target);})
}
//----------------------
// Hover //============
let element_Letter_Spacing_Hover = document.getElementById("letter-spacinginput-hover");
if(element_Letter_Spacing_Hover){
let targetValue = target.getAttribute("data-letter-spacing-hover");
element_Letter_Spacing_Hover.value = targetValue;
element_Letter_Spacing_Hover.addEventListener("input", function(){
  
  target.setAttribute("data-letter-spacing-hover",element_Letter_Spacing_Hover.value);
  propertiesEditor(target);})
}
//----------------------
// Active //===========
let element_Letter_Spacing_Active = document.getElementById("letter-spacinginput-active");
if(element_Letter_Spacing_Active){
let targetValue = target.getAttribute("data-letter-spacing-active");
element_Letter_Spacing_Active.value = targetValue;
element_Letter_Spacing_Active.addEventListener("input", function(){
  
  target.setAttribute("data-letter-spacing-active",element_Letter_Spacing_Active.value);
  propertiesEditor(target);})
}
//----------------------
// Tablet //===========
let element_Letter_Spacing_Tablet = document.getElementById("letter-spacinginput-tablet");
if(element_Letter_Spacing_Tablet){
let targetValue = target.getAttribute("data-letter-spacing-tablet");
element_Letter_Spacing_Tablet.value = targetValue;
element_Letter_Spacing_Tablet.addEventListener("input", function(){
  
  target.setAttribute("data-letter-spacing-tablet",element_Letter_Spacing_Tablet.value);
  propertiesEditor(target);})
}
//----------------------
// Mobile //===========
let element_Letter_Spacing_Mobile = document.getElementById("letter-spacinginput-mobile");
if(element_Letter_Spacing_Mobile){
let targetValue = target.getAttribute("data-letter-spacing-mobile");
element_Letter_Spacing_Mobile.value = targetValue;
element_Letter_Spacing_Mobile.addEventListener("input", function(){
  
  target.setAttribute("data-letter-spacing-mobile",element_Letter_Spacing_Mobile.value);
  propertiesEditor(target);})
}
//----------------------

let element_Text_Shadow_Horizontal = document.getElementById("horizontal-offset-input");
if(element_Text_Shadow_Horizontal){
let targetValue = target.getAttribute("data-text-shadow-horizontal");
element_Text_Shadow_Horizontal.value = targetValue;
element_Text_Shadow_Horizontal.addEventListener("input", function(){
  
  target.setAttribute("data-text-shadow-horizontal",element_Text_Shadow_Horizontal.value);
  propertiesEditor(target);})
}
//----------------------
// Hover //============
let element_Text_Shadow_Horizontal_Hover = document.getElementById("horizontal-offset-input-hover");
if(element_Text_Shadow_Horizontal_Hover){
let targetValue = target.getAttribute("data-text-shadow-horizontal-hover");
element_Text_Shadow_Horizontal_Hover.value = targetValue;
element_Text_Shadow_Horizontal_Hover.addEventListener("input", function(){
  
  target.setAttribute("data-text-shadow-horizontal-hover",element_Text_Shadow_Horizontal_Hover.value);
  propertiesEditor(target);})
}
//----------------------
// Active //===========
let element_Text_Shadow_Horizontal_Active = document.getElementById("horizontal-offset-input-active");
if(element_Text_Shadow_Horizontal_Active){
let targetValue = target.getAttribute("data-text-shadow-horizontal-active");
element_Text_Shadow_Horizontal_Active.value = targetValue;
element_Text_Shadow_Horizontal_Active.addEventListener("input", function(){
  
  target.setAttribute("data-text-shadow-horizontal-active",element_Text_Shadow_Horizontal_Active.value);
  propertiesEditor(target);})
}
//----------------------
// Tablet //===========
let element_Text_Shadow_Horizontal_Tablet = document.getElementById("horizontal-offset-input-tablet");
if(element_Text_Shadow_Horizontal_Tablet){
let targetValue = target.getAttribute("data-text-shadow-horizontal-tablet");
element_Text_Shadow_Horizontal_Tablet.value = targetValue;
element_Text_Shadow_Horizontal_Tablet.addEventListener("input", function(){
  
  target.setAttribute("data-text-shadow-horizontal-tablet",element_Text_Shadow_Horizontal_Tablet.value);
  propertiesEditor(target);})
}
//----------------------
// Mobile //===========
let element_Text_Shadow_Horizontal_Mobile = document.getElementById("horizontal-offset-input-mobile");
if(element_Text_Shadow_Horizontal_Mobile){
let targetValue = target.getAttribute("data-text-shadow-horizontal-mobile");
element_Text_Shadow_Horizontal_Mobile.value = targetValue;
element_Text_Shadow_Horizontal_Mobile.addEventListener("input", function(){
  
  target.setAttribute("data-text-shadow-horizontal-mobile",element_Text_Shadow_Horizontal_Mobile.value);
  propertiesEditor(target);})
}
//----------------------

let element_Text_Shadow_Vertical = document.getElementById("vertical-offsetinput");
if(element_Text_Shadow_Vertical){
let targetValue = target.getAttribute("data-text-shadow-vertical");
element_Text_Shadow_Vertical.value = targetValue;
element_Text_Shadow_Vertical.addEventListener("input", function(){
  
  target.setAttribute("data-text-shadow-vertical",element_Text_Shadow_Vertical.value);
  propertiesEditor(target);})
}
//----------------------
// Hover //============
let element_Text_Shadow_Vertical_Hover = document.getElementById("vertical-offsetinput-hover");
if(element_Text_Shadow_Vertical_Hover){
let targetValue = target.getAttribute("data-text-shadow-vertical-hover");
element_Text_Shadow_Vertical_Hover.value = targetValue;
element_Text_Shadow_Vertical_Hover.addEventListener("input", function(){
  
  target.setAttribute("data-text-shadow-vertical-hover",element_Text_Shadow_Vertical_Hover.value);
  propertiesEditor(target);})
}
//----------------------
// Active //===========
let element_Text_Shadow_Vertical_Active = document.getElementById("vertical-offsetinput-active");
if(element_Text_Shadow_Vertical_Active){
let targetValue = target.getAttribute("data-text-shadow-vertical-active");
element_Text_Shadow_Vertical_Active.value = targetValue;
element_Text_Shadow_Vertical_Active.addEventListener("input", function(){
  
  target.setAttribute("data-text-shadow-vertical-active",element_Text_Shadow_Vertical_Active.value);
  propertiesEditor(target);})
}
//----------------------
// Tablet //===========
let element_Text_Shadow_Vertical_Tablet = document.getElementById("vertical-offsetinput-tablet");
if(element_Text_Shadow_Vertical_Tablet){
let targetValue = target.getAttribute("data-text-shadow-vertical-tablet");
element_Text_Shadow_Vertical_Tablet.value = targetValue;
element_Text_Shadow_Vertical_Tablet.addEventListener("input", function(){
  
  target.setAttribute("data-text-shadow-vertical-tablet",element_Text_Shadow_Vertical_Tablet.value);
  propertiesEditor(target);})
}
//----------------------
// Mobile //===========
let element_Text_Shadow_Vertical_Mobile = document.getElementById("vertical-offsetinput-mobile");
if(element_Text_Shadow_Vertical_Mobile){
let targetValue = target.getAttribute("data-text-shadow-vertical-mobile");
element_Text_Shadow_Vertical_Mobile.value = targetValue;
element_Text_Shadow_Vertical_Mobile.addEventListener("input", function(){
  
  target.setAttribute("data-text-shadow-vertical-mobile",element_Text_Shadow_Vertical_Mobile.value);
  propertiesEditor(target);})
}
//----------------------

let element_Text_Shadow_Blur = document.getElementById("blurradiusinput");
if(element_Text_Shadow_Blur){
let targetValue = target.getAttribute("data-text-shadow-blur");
element_Text_Shadow_Blur.value = targetValue;
element_Text_Shadow_Blur.addEventListener("input", function(){
  
  target.setAttribute("data-text-shadow-blur",element_Text_Shadow_Blur.value);
  propertiesEditor(target);})
}
//----------------------
// Hover //============
let element_Text_Shadow_Blur_Hover = document.getElementById("blurradiusinput-hover");
if(element_Text_Shadow_Blur_Hover){
let targetValue = target.getAttribute("data-text-shadow-blur-hover");
element_Text_Shadow_Blur_Hover.value = targetValue;
element_Text_Shadow_Blur_Hover.addEventListener("input", function(){
  
  target.setAttribute("data-text-shadow-blur-hover",element_Text_Shadow_Blur_Hover.value);
  propertiesEditor(target);})
}
//----------------------
// Active //===========
let element_Text_Shadow_Blur_Active = document.getElementById("blurradiusinput-active");
if(element_Text_Shadow_Blur_Active){
let targetValue = target.getAttribute("data-text-shadow-blur-active");
element_Text_Shadow_Blur_Active.value = targetValue;
element_Text_Shadow_Blur_Active.addEventListener("input", function(){
  
  target.setAttribute("data-text-shadow-blur-active",element_Text_Shadow_Blur_Active.value);
  propertiesEditor(target);})
}
//----------------------
// Tablet //===========
let element_Text_Shadow_Blur_Tablet = document.getElementById("blurradiusinput-tablet");
if(element_Text_Shadow_Blur_Tablet){
let targetValue = target.getAttribute("data-text-shadow-blur-tablet");
element_Text_Shadow_Blur_Tablet.value = targetValue;
element_Text_Shadow_Blur_Tablet.addEventListener("input", function(){
  
  target.setAttribute("data-text-shadow-blur-tablet",element_Text_Shadow_Blur_Tablet.value);
  propertiesEditor(target);})
}
//----------------------
// Mobile //===========
let element_Text_Shadow_Blur_Mobile = document.getElementById("blurradiusinput-mobile");
if(element_Text_Shadow_Blur_Mobile){
let targetValue = target.getAttribute("data-text-shadow-blur-mobile");
element_Text_Shadow_Blur_Mobile.value = targetValue;
element_Text_Shadow_Blur_Mobile.addEventListener("input", function(){
  
  target.setAttribute("data-text-shadow-blur-mobile",element_Text_Shadow_Blur_Mobile.value);
  propertiesEditor(target);})
}
//----------------------

let element_Text_Shadow_Color = document.getElementById("textShadowcolorinput");
if(element_Text_Shadow_Color){
let targetValue = target.getAttribute("data-text-shadow-color");
element_Text_Shadow_Color.value = targetValue;
element_Text_Shadow_Color.addEventListener("input", function(){
  
  target.setAttribute("data-text-shadow-color",element_Text_Shadow_Color.value);
  propertiesEditor(target);})
}
//----------------------
// Hover //============
let element_Text_Shadow_Color_Hover = document.getElementById("textShadowcolorinput-hover");
if(element_Text_Shadow_Color_Hover){
let targetValue = target.getAttribute("data-text-shadow-color-hover");
element_Text_Shadow_Color_Hover.value = targetValue;
element_Text_Shadow_Color_Hover.addEventListener("input", function(){
  
  target.setAttribute("data-text-shadow-color-hover",element_Text_Shadow_Color_Hover.value);
  propertiesEditor(target);})
}
//----------------------
// Active //===========
let element_Text_Shadow_Color_Active = document.getElementById("textShadowcolorinput-active");
if(element_Text_Shadow_Color_Active){
let targetValue = target.getAttribute("data-text-shadow-color-active");
element_Text_Shadow_Color_Active.value = targetValue;
element_Text_Shadow_Color_Active.addEventListener("input", function(){
  
  target.setAttribute("data-text-shadow-color-active",element_Text_Shadow_Color_Active.value);
  propertiesEditor(target);})
}
//----------------------
// Tablet //===========
let element_Text_Shadow_Color_Tablet = document.getElementById("textShadowcolorinput-tablet");
if(element_Text_Shadow_Color_Tablet){
let targetValue = target.getAttribute("data-text-shadow-color-tablet");
element_Text_Shadow_Color_Tablet.value = targetValue;
element_Text_Shadow_Color_Tablet.addEventListener("input", function(){
  
  target.setAttribute("data-text-shadow-color-tablet",element_Text_Shadow_Color_Tablet.value);
  propertiesEditor(target);})
}
//----------------------
// Mobile //===========
let element_Text_Shadow_Color_Mobile = document.getElementById("textShadowcolorinput-mobile");
if(element_Text_Shadow_Color_Mobile){
let targetValue = target.getAttribute("data-text-shadow-color-mobile");
element_Text_Shadow_Color_Mobile.value = targetValue;
element_Text_Shadow_Color_Mobile.addEventListener("input", function(){
  
  target.setAttribute("data-text-shadow-color-mobile",element_Text_Shadow_Color_Mobile.value);
  propertiesEditor(target);})
}
//----------------------

let element_Text_Shadow_Opacity = document.getElementById("textshadowOpacityinput");
if(element_Text_Shadow_Opacity){
let targetValue = target.getAttribute("data-text-shadow-opacity");
element_Text_Shadow_Opacity.value = targetValue;
element_Text_Shadow_Opacity.addEventListener("input", function(){
  
  target.setAttribute("data-text-shadow-opacity",element_Text_Shadow_Opacity.value);
  propertiesEditor(target);})
}
//----------------------
// Hover //============
let element_Text_Shadow_Opacity_Hover = document.getElementById("textshadowOpacityinput-hover");
if(element_Text_Shadow_Opacity_Hover){
let targetValue = target.getAttribute("data-text-shadow-opacity-hover");
element_Text_Shadow_Opacity_Hover.value = targetValue;
element_Text_Shadow_Opacity_Hover.addEventListener("input", function(){
  
  target.setAttribute("data-text-shadow-opacity-hover",element_Text_Shadow_Opacity_Hover.value);
  propertiesEditor(target);})
}
//----------------------
// Active //===========
let element_Text_Shadow_Opacity_Active = document.getElementById("textshadowOpacityinput-active");
if(element_Text_Shadow_Opacity_Active){
let targetValue = target.getAttribute("data-text-shadow-opacity-active");
element_Text_Shadow_Opacity_Active.value = targetValue;
element_Text_Shadow_Opacity_Active.addEventListener("input", function(){
  
  target.setAttribute("data-text-shadow-opacity-active",element_Text_Shadow_Opacity_Active.value);
  propertiesEditor(target);})
}
//----------------------
// Tablet //===========
let element_Text_Shadow_Opacity_Tablet = document.getElementById("textshadowOpacityinput-tablet");
if(element_Text_Shadow_Opacity_Tablet){
let targetValue = target.getAttribute("data-text-shadow-opacity-tablet");
element_Text_Shadow_Opacity_Tablet.value = targetValue;
element_Text_Shadow_Opacity_Tablet.addEventListener("input", function(){
  
  target.setAttribute("data-text-shadow-opacity-tablet",element_Text_Shadow_Opacity_Tablet.value);
  propertiesEditor(target);})
}
//----------------------
// Mobile //===========
let element_Text_Shadow_Opacity_Mobile = document.getElementById("textshadowOpacityinput-mobile");
if(element_Text_Shadow_Opacity_Mobile){
let targetValue = target.getAttribute("data-text-shadow-opacity-mobile");
element_Text_Shadow_Opacity_Mobile.value = targetValue;
element_Text_Shadow_Opacity_Mobile.addEventListener("input", function(){
  
  target.setAttribute("data-text-shadow-opacity-mobile",element_Text_Shadow_Opacity_Mobile.value);
  propertiesEditor(target);})
}
//----------------------

let element_Font_Line_Height = document.getElementById("line-heightinput");
if(element_Font_Line_Height){
let targetValue = target.getAttribute("data-line-height");
element_Font_Line_Height.value = targetValue;
element_Font_Line_Height.addEventListener("input", function(){
  
  target.setAttribute("data-line-height",element_Font_Line_Height.value);
  propertiesEditor(target);})
}
//----------------------
// Hover //============
let element_Font_Line_Height_Hover = document.getElementById("line-heightinput-hover");
if(element_Font_Line_Height_Hover){
let targetValue = target.getAttribute("data-line-height-hover");
element_Font_Line_Height_Hover.value = targetValue;
element_Font_Line_Height_Hover.addEventListener("input", function(){
  
  target.setAttribute("data-line-height-hover",element_Font_Line_Height_Hover.value);
  propertiesEditor(target);})
}
//----------------------
// Active //===========
let element_Font_Line_Height_Active = document.getElementById("line-heightinput-active");
if(element_Font_Line_Height_Active){
let targetValue = target.getAttribute("data-line-height-active");
element_Font_Line_Height_Active.value = targetValue;
element_Font_Line_Height_Active.addEventListener("input", function(){
  
  target.setAttribute("data-line-height-active",element_Font_Line_Height_Active.value);
  propertiesEditor(target);})
}
//----------------------
// Tablet //===========
let element_Font_Line_Height_Tablet = document.getElementById("line-heightinput-tablet");
if(element_Font_Line_Height_Tablet){
let targetValue = target.getAttribute("data-line-height-tablet");
element_Font_Line_Height_Tablet.value = targetValue;
element_Font_Line_Height_Tablet.addEventListener("input", function(){
  
  target.setAttribute("data-line-height-tablet",element_Font_Line_Height_Tablet.value);
  propertiesEditor(target);})
}
//----------------------
// Mobile //===========
let element_Font_Line_Height_Mobile = document.getElementById("line-heightinput-mobile");
if(element_Font_Line_Height_Mobile){
let targetValue = target.getAttribute("data-line-height-mobile");
element_Font_Line_Height_Mobile.value = targetValue;
element_Font_Line_Height_Mobile.addEventListener("input", function(){
  
  target.setAttribute("data-line-height-mobile",element_Font_Line_Height_Mobile.value);
  propertiesEditor(target);})
}
//----------------------

let element_Font_Word_Spacing = document.getElementById("word-spacinginput");
if(element_Font_Word_Spacing){
let targetValue = target.getAttribute("data-word-spacing");
element_Font_Word_Spacing.value = targetValue;
element_Font_Word_Spacing.addEventListener("input", function(){
  
  target.setAttribute("data-word-spacing",element_Font_Word_Spacing.value);
  propertiesEditor(target);})
}
//----------------------
// Hover //============
let element_Font_Word_Spacing_Hover = document.getElementById("word-spacinginput-hover");
if(element_Font_Word_Spacing_Hover){
let targetValue = target.getAttribute("data-word-spacing-hover");
element_Font_Word_Spacing_Hover.value = targetValue;
element_Font_Word_Spacing_Hover.addEventListener("input", function(){
  
  target.setAttribute("data-word-spacing-hover",element_Font_Word_Spacing_Hover.value);
  propertiesEditor(target);})
}
//----------------------
// Active //===========
let element_Font_Word_Spacing_Active = document.getElementById("word-spacinginput-active");
if(element_Font_Word_Spacing_Active){
let targetValue = target.getAttribute("data-word-spacing-active");
element_Font_Word_Spacing_Active.value = targetValue;
element_Font_Word_Spacing_Active.addEventListener("input", function(){
  
  target.setAttribute("data-word-spacing-active",element_Font_Word_Spacing_Active.value);
  propertiesEditor(target);})
}
//----------------------
// Tablet //===========
let element_Font_Word_Spacing_Tablet = document.getElementById("word-spacinginput-tablet");
if(element_Font_Word_Spacing_Tablet){
let targetValue = target.getAttribute("data-word-spacing-tablet");
element_Font_Word_Spacing_Tablet.value = targetValue;
element_Font_Word_Spacing_Tablet.addEventListener("input", function(){
  
  target.setAttribute("data-word-spacing-tablet",element_Font_Word_Spacing_Tablet.value);
  propertiesEditor(target);})
}
//----------------------
// Mobile //===========
let element_Font_Word_Spacing_Mobile = document.getElementById("word-spacinginput-mobile");
if(element_Font_Word_Spacing_Mobile){
let targetValue = target.getAttribute("data-word-spacing-mobile");
element_Font_Word_Spacing_Mobile.value = targetValue;
element_Font_Word_Spacing_Mobile.addEventListener("input", function(){
  
  target.setAttribute("data-word-spacing-mobile",element_Font_Word_Spacing_Mobile.value);
  propertiesEditor(target);})
}
//----------------------

let element_Font_Smoothing = document.getElementById("font-smoothinginput");
if (element_Font_Smoothing) {
let targetValue = target.getAttribute("data-font-smoothing");
for (let i = 0; i < element_Font_Smoothing.options.length; i++) {
if (element_Font_Smoothing.options[i].value === targetValue) {
element_Font_Smoothing.selectedIndex = i;
break;}
}
    element_Font_Smoothing.addEventListener("change", function(){
        target.setAttribute("data-font-smoothing",element_Font_Smoothing.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
// Hover //===========
let element_Font_Smoothing_Hover = document.getElementById("font-smoothinginput-hover");
if (element_Font_Smoothing_Hover) {
let targetValue = target.getAttribute("data-font-smoothing-hover");
for (let i = 0; i < element_Font_Smoothing_Hover.options.length; i++) {
if (element_Font_Smoothing_Hover.options[i].value === targetValue) {
element_Font_Smoothing_Hover.selectedIndex = i;
break;}
}
    element_Font_Smoothing_Hover.addEventListener("change", function(){
        target.setAttribute("data-font-smoothing-hover",element_Font_Smoothing_Hover.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
// Active //===========
let element_Font_Smoothing_Active = document.getElementById("font-smoothinginput-active");
if (element_Font_Smoothing_Active) {
let targetValue = target.getAttribute("data-font-smoothing-active");
for (let i = 0; i < element_Font_Smoothing_Active.options.length; i++) {
if (element_Font_Smoothing_Active.options[i].value === targetValue) {
element_Font_Smoothing_Active.selectedIndex = i;
break;}
}
    element_Font_Smoothing_Active.addEventListener("change", function(){
        target.setAttribute("data-font-smoothing-active",element_Font_Smoothing_Active.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
// Tablet //===========
let element_Font_Smoothing_Tablet = document.getElementById("font-smoothinginput-tablet");
if (element_Font_Smoothing_Tablet) {
let targetValue = target.getAttribute("data-font-smoothing-tablet");
for (let i = 0; i < element_Font_Smoothing_Tablet.options.length; i++) {
if (element_Font_Smoothing_Tablet.options[i].value === targetValue) {
element_Font_Smoothing_Tablet.selectedIndex = i;
break;}
}
    element_Font_Smoothing_Tablet.addEventListener("change", function(){
        target.setAttribute("data-font-smoothing-tablet",element_Font_Smoothing_Tablet.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
// Mobile //===========
let element_Font_Smoothing_Mobile = document.getElementById("font-smoothinginput-mobile");
if (element_Font_Smoothing_Mobile) {
let targetValue = target.getAttribute("data-font-smoothing-mobile");
for (let i = 0; i < element_Font_Smoothing_Mobile.options.length; i++) {
if (element_Font_Smoothing_Mobile.options[i].value === targetValue) {
element_Font_Smoothing_Mobile.selectedIndex = i;
break;}
}
    element_Font_Smoothing_Mobile.addEventListener("change", function(){
        target.setAttribute("data-font-smoothing-mobile",element_Font_Smoothing_Mobile.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
//alt
let ElementAlternativeText = document.getElementById("editAlternativeTextinput");
if(ElementAlternativeText){
let targetValue = target.getAttribute("alt");
ElementAlternativeText.value = targetValue;
ElementAlternativeText.addEventListener("input", function(){
  
  target.setAttribute("alt",ElementAlternativeText.value);
  propertiesEditor(target);})
}
//----------------------
//Title
let ElementTitle = document.getElementById("editTitleElementinput");
if(ElementTitle){
let targetValue = target.getAttribute("title");
ElementTitle.value = targetValue;
ElementTitle.addEventListener("input", function(){
  
  target.setAttribute("title",ElementTitle.value);
  propertiesEditor(target);})
}
//----------------------
//onClick Event
//Link onClick
let ElementonClickEvent = document.getElementById("EditonClickLinkinput");
if(ElementonClickEvent){
let targetValue = target.getAttribute("data-href");
ElementonClickEvent.value = targetValue;
ElementonClickEvent.addEventListener("input", function(){
  target.setAttribute('data-href', ElementonClickEvent.value);
  propertiesEditor(target);
  })
}
let hrefTarget = document.getElementById('lazydev-target-blank');
if(hrefTarget){
  let targetValue = target.getAttribute("data-href-target");
  for (let i = 0; i < hrefTarget.options.length; i++) {
    if (hrefTarget.options[i].value === targetValue) {
      hrefTarget.selectedIndex = i;
    break;}
    }
    hrefTarget.addEventListener("input", function(){
      target.setAttribute('data-href-target', hrefTarget.value);
      propertiesEditor(target);
      })
}
let onCLickTarget = document.getElementById('edit-onClickEvent');
if(onCLickTarget){
let targetValue = target.getAttribute("data-onClick");
onCLickTarget.value = targetValue;
onCLickTarget.addEventListener("input", function(){
  target.setAttribute('data-onClick', onCLickTarget.value);
  propertiesEditor(target);
  })
}
// let ElementonClickEvent = document.getElementById("EditonClickLinkinput");
// if(ElementonClickEvent){
// let targetValue = target.getAttribute("onclick");
// ElementonClickEvent.value = targetValue;
// ElementonClickEvent.addEventListener("input", function(){
//   target.setAttribute('onClickLink', '');
//   let linkEvent = "";
//   if(ElementonClickEvent.value !== ""){
//   linkEvent = `location.href='${ElementonClickEvent.value}';`
//   }
//   target.setAttribute("onclick",linkEvent);
//   target.setAttribute("onClickLink",linkEvent);
//   propertiesEditor(target);
//   })
// }
//----------------------
//=== INPUT SELECT AND TEXTAREA

let elementtextAreaValue = document.getElementById("edit-textArea-value-input");
if(elementtextAreaValue){
  let targetValue = target.innerHTML;
  elementtextAreaValue.value = targetValue;
  elementtextAreaValue.addEventListener("input", ()=>{
    target.innerHTML =  elementtextAreaValue.value;
  })

}
//------------------------------------------------------------------------------------------

let elementEditNameInput = document.getElementById("edit-name-input");
if(elementEditNameInput){
  let targetValue = target.getAttribute("name");
  elementEditNameInput.value = targetValue;
  elementEditNameInput.addEventListener("input", ()=>{
    target.setAttribute("name", elementEditNameInput.value);
    if(elementEditNameInput.value == ""){
      target.removeAttribute("name");
  }
  })

}
//------------------------------------------------------------------------------------------
let elementeditPlaceHolderInput = document.getElementById("edit-placeholder-input");
if(elementeditPlaceHolderInput){
  let targetValue = target.getAttribute("placeholder");
  elementeditPlaceHolderInput.value = targetValue;
  elementeditPlaceHolderInput.addEventListener("input", ()=>{
    target.setAttribute("placeholder", elementeditPlaceHolderInput.value);
    if(elementeditPlaceHolderInput.value == ""){
      target.removeAttribute("placeholder");
  }
  })

}
//------------------------------------------------------------------------------------------
let ElementeditMinInput = document.getElementById("edit-min-input");
if(ElementeditMinInput){
  let targetValue = target.getAttribute("min");
  ElementeditMinInput.value = targetValue;
  ElementeditMinInput.addEventListener("input", ()=>{
    target.setAttribute("min", ElementeditMinInput.value);
    if(ElementeditMinInput.value == ""){
      target.removeAttribute("min");
  }
  })

}
//------------------------------------------------------------------------------------------
let ElementeditMaxInput = document.getElementById("edit-max-input");
if(ElementeditMaxInput){
  let targetValue = target.getAttribute("max");
  ElementeditMaxInput.value = targetValue;
  ElementeditMaxInput.addEventListener("input", ()=>{
    target.setAttribute("max", ElementeditMaxInput.value);
    if(ElementeditMaxInput.value == ""){
      target.removeAttribute("max");
  }
  })

}
//------------------------------------------------------------------------------------------
let ElementStepInput = document.getElementById("edit-step-input");
if(ElementStepInput){
  let targetValue = target.getAttribute("step");
  ElementStepInput.value = targetValue;
  ElementStepInput.addEventListener("input", ()=>{
    target.setAttribute("step", ElementStepInput.value);
    if(ElementStepInput.value == ""){
      target.removeAttribute("step");
  }
  })

}
//------------------------------------------------------------------------------------------

let elementMaxLenghtInput = document.getElementById("edit-maxlenght-input");
if(elementMaxLenghtInput){
  let targetValue = target.getAttribute("maxlength");
  elementMaxLenghtInput.value = targetValue;
  elementMaxLenghtInput.addEventListener("input", ()=>{
    target.setAttribute("maxlength", elementMaxLenghtInput.value);
    if(elementMaxLenghtInput.value == ""){
      target.removeAttribute("maxlength");
  }
  })

}
//------------------------------------------------------------------------------------------

let elementValueTextInput = document.getElementById("edit-value-text-input");
if(elementValueTextInput){
  let targetValue = target.getAttribute("value");
  elementValueTextInput.value = targetValue;
  elementValueTextInput.addEventListener("input", ()=>{
    target.setAttribute("value", elementValueTextInput.value);
    if(elementValueTextInput.value == ""){
      target.removeAttribute("value");
  }
  })

}
//------------------------------------------------------------------------------------------

let elementValueNumberInput = document.getElementById("edit-value-number-input");
if(elementValueNumberInput){
  let targetValue = target.getAttribute("value");
  elementValueNumberInput.value = targetValue;
  elementValueNumberInput.addEventListener("input", ()=>{
    target.setAttribute("value", elementValueNumberInput.value);
    if(elementValueNumberInput.value == ""){
      target.removeAttribute("value");
  }
  })

}
//------------------------------------------------------------------------------------------

let elementRowsInput = document.getElementById("edit-rows-input");
if(elementRowsInput){
  let targetValue = target.getAttribute("rows");
  elementRowsInput.value = targetValue;
  elementRowsInput.addEventListener("input", ()=>{
    target.setAttribute("rows", elementRowsInput.value);
    if(elementRowsInput.value == ""){
      target.removeAttribute("rows");
  }
  })

}
//------------------------------------------------------------------------------------------

let elementColsInput = document.getElementById("edit-cols-input");
if(elementColsInput){
  let targetValue = target.getAttribute("cols");
  elementColsInput.value = targetValue;
  elementColsInput.addEventListener("input", ()=>{
    target.setAttribute("cols", elementColsInput.value);
    if(elementColsInput.value == ""){
      target.removeAttribute("cols");
  }
  })

}
//------------------------------------------------------------------------------------------

let elementdefaultvalueDateInput = document.getElementById("edit-value-date-input");
if(elementdefaultvalueDateInput){
  let targetValue = target.getAttribute("value");
  elementdefaultvalueDateInput.value = targetValue;
  elementdefaultvalueDateInput.addEventListener("input", ()=>{
    target.setAttribute("value", elementdefaultvalueDateInput.value);
    if(elementdefaultvalueDateInput.value == ""){
      target.removeAttribute("value");
  }
  })

}
//------------------------------------------------------------------------------------------

let elementMinateInput = document.getElementById("edit-min-date-input");
if(elementMinateInput){
  let targetValue = target.getAttribute("min");
  elementMinateInput.value = targetValue;
  elementMinateInput.addEventListener("input", ()=>{
    target.setAttribute("min", elementMinateInput.value);
    if(elementMinateInput.value == ""){
      target.removeAttribute("min");
  }
  })

}
//------------------------------------------------------------------------------------------

let elementMaxdateInput = document.getElementById("edit-max-date-input");
if(elementMaxdateInput){
  let targetValue = target.getAttribute("max");
  elementMaxdateInput.value = targetValue;
  elementMaxdateInput.addEventListener("input", ()=>{
    target.setAttribute("max", elementMaxdateInput.value);
    if(elementMaxdateInput.value == ""){
      target.removeAttribute("max");
  }
  })

}
//------------------------------------------------------------------------------------------

let elementdefaultvalueTimeInput = document.getElementById("edit-value-time-input");
if(elementdefaultvalueTimeInput){
  let targetValue = target.getAttribute("value");
  elementdefaultvalueTimeInput.value = targetValue;
  elementdefaultvalueTimeInput.addEventListener("input", ()=>{
    target.setAttribute("value", elementdefaultvalueTimeInput.value);
    if(elementdefaultvalueTimeInput.value == ""){
      target.removeAttribute("value");
  }
  })

}
//------------------------------------------------------------------------------------------

let elementMinTimeInput = document.getElementById("edit-min-time-input");
if(elementMinTimeInput){
  let targetValue = target.getAttribute("min");
  elementMinTimeInput.value = targetValue;
  elementMinTimeInput.addEventListener("input", ()=>{
    target.setAttribute("min", elementMinTimeInput.value);
    if(elementMinTimeInput.value == ""){
      target.removeAttribute("min");
  }
  })

}
//------------------------------------------------------------------------------------------

let elementMaxTimeInput = document.getElementById("edit-max-time-input");
if(elementMaxTimeInput){
  let targetValue = target.getAttribute("max");
  elementMaxTimeInput.value = targetValue;
  elementMaxTimeInput.addEventListener("input", ()=>{
    target.setAttribute("max", elementMaxTimeInput.value);
    if(elementMaxTimeInput.value == ""){
      target.removeAttribute("max");
  }
  })

}
//------------------------------------------------------------------------------------------

let elementStepTimeInput = document.getElementById("edit-step-time-input");
if(elementStepTimeInput){
  let targetValue = target.getAttribute("step");
  elementStepTimeInput.value = targetValue;
  elementStepTimeInput.addEventListener("input", ()=>{
    target.setAttribute("step", elementStepTimeInput.value);
    if(elementStepTimeInput.value == ""){
      target.removeAttribute("step");
  }
  })

}
//------------------------------------------------------------------------------------------

let elementAcceptInput = document.getElementById("edit-accept-input");
if(elementAcceptInput){
  let targetValue = target.getAttribute("accept");
  elementAcceptInput.value = targetValue;
  elementAcceptInput.addEventListener("input", ()=>{
    target.setAttribute("accept", elementAcceptInput.value);
    if(elementAcceptInput.value == ""){
      target.removeAttribute("accept");
  }
  })

}
//------------------------------------------------------------------------------------------

let elementColorValue = document.getElementById("edit-color-input");
if(elementColorValue){
  let targetValue = target.getAttribute("value");
  elementColorValue.value = targetValue;
  elementColorValue.addEventListener("input", ()=>{
    target.setAttribute("value", elementColorValue.value);
    if(elementColorValue.value == ""){
      target.removeAttribute("value");
  }

  })

}
//------------------------------------------------------------------------------------------

let rangeApperance = document.getElementById("range-apperance");
if (rangeApperance) {
let targetValue = target.getAttribute("range-apperance");
for (let i = 0; i < rangeApperance.options.length; i++) {
if (rangeApperance.options[i].value === targetValue) {
rangeApperance.selectedIndex = i;
break;}
}
    rangeApperance.addEventListener("change", function(){
        target.setAttribute("range-apperance",rangeApperance.value);
        propertiesEditor(target);})
}
//--------------------------------------------------

//Range Parameter

let ThumbColor = document.getElementById("thumbColorinput");
if(ThumbColor){
let targetValue = target.getAttribute("data-bullet-color");
ThumbColor.value = targetValue;
ThumbColor.addEventListener("input", function(){
  
  target.setAttribute("data-bullet-color",ThumbColor.value);
  propertiesEditor(target);})
}
//----------------------

let ThumbRadius = document.getElementById("data_Radius_Thumbinput");
if(ThumbRadius){
let targetValue = target.getAttribute("data-bullet-radius");
ThumbRadius.value = targetValue;
ThumbRadius.addEventListener("input", function(){
  
  target.setAttribute("data-bullet-radius",ThumbRadius.value);
  propertiesEditor(target);})
}
//----------------------

let ThumbOTStyle = document.getElementById("data_thumb_OTstyleinput");
if(ThumbOTStyle){
let targetValue = target.getAttribute("data-bullet-outline-style");
ThumbOTStyle.value = targetValue;
ThumbOTStyle.addEventListener("input", function(){
  
  target.setAttribute("data-bullet-outline-style",ThumbOTStyle.value);
  propertiesEditor(target);})
}
//----------------------

let ThumbOTcolor = document.getElementById("data_thumb_OTcolorinput");
if(ThumbOTcolor){
let targetValue = target.getAttribute("data-bullet-outline-color");
ThumbOTcolor.value = targetValue;
ThumbOTcolor.addEventListener("input", function(){
  
  target.setAttribute("data-bullet-outline-color",ThumbOTcolor.value);
  propertiesEditor(target);})
}
//----------------------

let ThumbOToffset = document.getElementById("data_outline_OFfsetinput");
if(ThumbOToffset){
let targetValue = target.getAttribute("data-bullet-outline-offset");
ThumbOToffset.value = targetValue;
ThumbOToffset.addEventListener("input", function(){
  
  target.setAttribute("data-bullet-outline-offset",ThumbOToffset.value);
  propertiesEditor(target);})
}
//----------------------


let elementOutlineSizeThumb = document.getElementById("Outline_Sizeinput");
if(elementOutlineSizeThumb){
let targetValue = target.getAttribute("data-bullet-outline-size");
elementOutlineSizeThumb.value = targetValue;
elementOutlineSizeThumb.addEventListener("input", function(){
  
  target.setAttribute("data-bullet-outline-size",elementOutlineSizeThumb.value);
  propertiesEditor(target);})
}
//----------------------


let elementRangeCSS = document.getElementById("data_Range_textAreainput");
if(elementRangeCSS){
let targetValue = target.getAttribute("data-rangecss");
elementRangeCSS.value = targetValue;
elementRangeCSS.addEventListener("change", function(){
  
  target.setAttribute("data-rangecss",elementRangeCSS.value);
  propertiesEditor(target);})
}
//----------------------

//---- range end ------------------
let elementMultipleCheck = document.getElementById("editMultipleFileinput");
if(elementMultipleCheck){
  multipleChecker();
  function multipleChecker(){
  let targetValue = target.hasAttribute("multiple");
  if (targetValue) {
    elementMultipleCheck.checked = true;
  } else {
    elementMultipleCheck.checked = false;
  }
  elementMultipleCheck.addEventListener("click", () => {
    if (elementMultipleCheck.checked === true) {
      target.setAttribute("multiple", "");
    } else {
      target.removeAttribute("multiple");
    }
  });
  }

}
//------------------------------------------------------------------------------------------

let elementSelectoption = document.getElementById("edit-select-option-input");
if (elementSelectoption) {
  let targetValue = target.getAttribute("selectoption");
  elementSelectoption.value = targetValue;
  elementSelectoption.addEventListener("input", () => {
    target.setAttribute("selectoption", elementSelectoption.value);
    let targetNewVal = elementSelectoption.value;
    let arrayNewVal = targetNewVal.split("},{");
    
    // Menghapus semua option yang ada sebelumnya
    while (target.firstChild) {
      target.firstChild.remove();
    }

    arrayNewVal.forEach(item => {
      let [value, name, selected] = item.replace("{", "").replace("}", "").split(",");
      let option = document.createElement("option");
      option.value = value.trim();
      option.textContent = name.trim();

      // Memeriksa apakah opsi harus terpilih atau tidak
      if (selected && selected.trim() === "selected") {
        option.selected = true;
      }

      target.appendChild(option);
    });
  });
}
//----------------------------------------------------------------------------------------------------

let elementSelectSize = document.getElementById("edit-select-size-input");
if(elementSelectSize){
  let targetValue = target.getAttribute("size");
  elementSelectSize.value = targetValue;
  elementSelectSize.addEventListener("input", ()=>{
    target.setAttribute("size", elementSelectSize.value);
    if(elementSelectSize.value == ""){
      target.removeAttribute("size");
  }
  })

}
//------------------------------------------------------------------------------------------

let elementChecked = document.getElementById("edit-checked-edit");
if(elementChecked){
  autoChecked();
  function autoChecked(){
  let targetValue = target.hasAttribute("checked");
  if (targetValue) {
    elementChecked.checked = true;
  } else {
    elementChecked.checked = false;
  }
  elementChecked.addEventListener("click", () => {
    if (elementChecked.checked === true) {
      target.setAttribute("checked", "");
    } else {
      target.removeAttribute("checked");
    }
  });
  }

}
//------------------------------------------------------------------------------------------

let elementautoFocus = document.getElementById("edit-autofocus-edit");
if(elementautoFocus){
  autoChecked();
  function autoChecked(){
  let targetValue = target.hasAttribute("autofocus");
  if (targetValue) {
    elementautoFocus.checked = true;
  } else {
    elementautoFocus.checked = false;
  }
  elementautoFocus.addEventListener("click", () => {
    if (elementautoFocus.checked === true) {
      target.setAttribute("autofocus", "");
    } else {
      target.removeAttribute("autofocus");
    }
  });
  }

}
//------------------------------------------------------------------------------------------

let elementeditRequiredCheck = document.getElementById("edit-required-edit");
if(elementeditRequiredCheck){
  autoChecked();
  function autoChecked(){
  let targetValue = target.hasAttribute("required");
  if (targetValue) {
    elementeditRequiredCheck.checked = true;
  } else {
    elementeditRequiredCheck.checked = false;
  }
  elementeditRequiredCheck.addEventListener("click", () => {
    if (elementeditRequiredCheck.checked === true) {
      target.setAttribute("required", "");
    } else {
      target.removeAttribute("required");
    }
  });
  }

}
//------------------------------------------------------------------------------------------

let elementReadonlyCheck = document.getElementById("edit-readonly-edit");
if(elementReadonlyCheck){
  autoChecked();
  function autoChecked(){
  let targetValue = target.hasAttribute("readonly");
  if (targetValue) {
    elementReadonlyCheck.checked = true;
  } else {
    elementReadonlyCheck.checked = false;
  }
  elementReadonlyCheck.addEventListener("click", () => {
    if (elementReadonlyCheck.checked === true) {
      target.setAttribute("readonly", "");
    } else {
      target.removeAttribute("readonly");
    }
  });
  }

}
//------------------------------------------------------------------------------------------
let elementdisabledCheck = document.getElementById("edit-disabled-edit");
if(elementdisabledCheck){
  autoChecked();
  function autoChecked(){
  let targetValue = target.hasAttribute("disabled");
  if (targetValue) {
    elementdisabledCheck.checked = true;
  } else {
    elementdisabledCheck.checked = false;
  }
  elementdisabledCheck.addEventListener("click", () => {
    if (elementdisabledCheck.checked === true) {
      target.setAttribute("disabled", "");
    } else {
      target.removeAttribute("disabled");
    }
  });
  }

}
//------------------------------------------------------------------------------------------

let elementSubmitType = document.getElementById("submit-type");
if (elementSubmitType) {
let targetValue = target.getAttribute("type");
for (let i = 0; i < elementSubmitType.options.length; i++) {
if (elementSubmitType.options[i].value === targetValue) {
elementSubmitType.selectedIndex = i;
break;}
}
    elementSubmitType.addEventListener("change", function(){
        target.setAttribute("type",elementSubmitType.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
let elementListStyle = document.getElementById("edit-listStyle-input");
if (elementListStyle) {
let targetValue = target.getAttribute("data-list-style");
for (let i = 0; i < elementListStyle.options.length; i++) {
if (elementListStyle.options[i].value === targetValue) {
elementListStyle.selectedIndex = i;
break;}
}
    elementListStyle.addEventListener("change", function(){
        target.setAttribute("data-list-style",elementListStyle.value);
        propertiesEditor(target);})
}
//--------------------------------------------------

let elementListStyleOL = document.getElementById("edit-listStyleOL-input");
if (elementListStyleOL) {
let targetValue = target.getAttribute("data-list-style2");
for (let i = 0; i < elementListStyleOL.options.length; i++) {
if (elementListStyleOL.options[i].value === targetValue) {
elementListStyleOL.selectedIndex = i;
break;}
}
    elementListStyleOL.addEventListener("change", function(){
        target.setAttribute("data-list-style2",elementListStyleOL.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
let htmlCodeEditor = document.getElementById("html-inner-content");
if(htmlCodeEditor){
  let targetValue = target.innerHTML;
  htmlCodeEditor.value = targetValue;
  htmlCodeEditor.addEventListener("input", function(){
    target.innerHTML = htmlCodeEditor.value;
  })
}

let editListImage = document.getElementById("list-style-image-input");
if(editListImage){
let targetValue = target.getAttribute("data-list-image");
editListImage.value = targetValue;
editListImage.addEventListener("input", function(){
  
  target.setAttribute("data-list-image",editListImage.value);
  propertiesEditor(target);})
}
//----------------------

let elementListPosition = document.getElementById("list-style-position-input");
if (elementListPosition) {
let targetValue = target.getAttribute("data-list-position");
for (let i = 0; i < elementListPosition.options.length; i++) {
if (elementListPosition.options[i].value === targetValue) {
elementListPosition.selectedIndex = i;
break;}
}
    elementListPosition.addEventListener("change", function(){
        target.setAttribute("data-list-position",elementListPosition.value);
        propertiesEditor(target);})
}
//--------------------------------------------------


let elementTableCollapse = document.getElementById("border-collapse-input");
if (elementTableCollapse) {
let targetValue = target.getAttribute("data-table-collapse-");
for (let i = 0; i < elementTableCollapse.options.length; i++) {
if (elementTableCollapse.options[i].value === targetValue) {
elementTableCollapse.selectedIndex = i;
break;}
}
    elementTableCollapse.addEventListener("change", function(){
        target.setAttribute("data-table-collapse-",elementTableCollapse.value);
        propertiesEditor(target);})
}
//--------------------------------------------------

let elementStyling_Th = document.getElementById("th-styling-input");
if(elementStyling_Th){
let targetValue = target.getAttribute("data-th-styling");
elementStyling_Th.value = targetValue;
elementStyling_Th.addEventListener("input", function(){
  
  target.setAttribute("data-th-styling",elementStyling_Th.value);
  propertiesEditor(target);})
}
//----------------------
// Hover //============
let elementStyling_Th_Hover = document.getElementById("th-styling-input-hover");
if(elementStyling_Th_Hover){
let targetValue = target.getAttribute("data-th-styling-hover");
elementStyling_Th_Hover.value = targetValue;
elementStyling_Th_Hover.addEventListener("input", function(){
  
  target.setAttribute("data-th-styling-hover",elementStyling_Th_Hover.value);
  propertiesEditor(target);})
}
//----------------------
// Active //===========
let elementStyling_Th_Active = document.getElementById("th-styling-input-active");
if(elementStyling_Th_Active){
let targetValue = target.getAttribute("data-th-styling-active");
elementStyling_Th_Active.value = targetValue;
elementStyling_Th_Active.addEventListener("input", function(){
  
  target.setAttribute("data-th-styling-active",elementStyling_Th_Active.value);
  propertiesEditor(target);})
}
//----------------------
// Tablet //===========
let elementStyling_Th_Tablet = document.getElementById("th-styling-input-tablet");
if(elementStyling_Th_Tablet){
let targetValue = target.getAttribute("data-th-styling-tablet");
elementStyling_Th_Tablet.value = targetValue;
elementStyling_Th_Tablet.addEventListener("input", function(){
  
  target.setAttribute("data-th-styling-tablet",elementStyling_Th_Tablet.value);
  propertiesEditor(target);})
}
//----------------------
// Mobile //===========
let elementStyling_Th_Mobile = document.getElementById("th-styling-input-mobile");
if(elementStyling_Th_Mobile){
let targetValue = target.getAttribute("data-th-styling-mobile");
elementStyling_Th_Mobile.value = targetValue;
elementStyling_Th_Mobile.addEventListener("input", function(){
  
  target.setAttribute("data-th-styling-mobile",elementStyling_Th_Mobile.value);
  propertiesEditor(target);})
}
//----------------------

//---------------------------------------------

let elementStyling_Tr = document.getElementById("tr-styling-input");
if(elementStyling_Tr){
let targetValue = target.getAttribute("data-tr-styling");
elementStyling_Tr.value = targetValue;
elementStyling_Tr.addEventListener("input", function(){
  
  target.setAttribute("data-tr-styling",elementStyling_Tr.value);
  propertiesEditor(target);})
}
//----------------------
// Hover //============
let elementStyling_Tr_Hover = document.getElementById("tr-styling-input-hover");
if(elementStyling_Tr_Hover){
let targetValue = target.getAttribute("data-tr-styling-hover");
elementStyling_Tr_Hover.value = targetValue;
elementStyling_Tr_Hover.addEventListener("input", function(){
  
  target.setAttribute("data-tr-styling-hover",elementStyling_Tr_Hover.value);
  propertiesEditor(target);})
}
//----------------------
// Active //===========
let elementStyling_Tr_Active = document.getElementById("tr-styling-input-active");
if(elementStyling_Tr_Active){
let targetValue = target.getAttribute("data-tr-styling-active");
elementStyling_Tr_Active.value = targetValue;
elementStyling_Tr_Active.addEventListener("input", function(){
  
  target.setAttribute("data-tr-styling-active",elementStyling_Tr_Active.value);
  propertiesEditor(target);})
}
//----------------------
// Tablet //===========
let elementStyling_Tr_Tablet = document.getElementById("tr-styling-input-tablet");
if(elementStyling_Tr_Tablet){
let targetValue = target.getAttribute("data-tr-styling-tablet");
elementStyling_Tr_Tablet.value = targetValue;
elementStyling_Tr_Tablet.addEventListener("input", function(){
  
  target.setAttribute("data-tr-styling-tablet",elementStyling_Tr_Tablet.value);
  propertiesEditor(target);})
}
//----------------------
// Mobile //===========
let elementStyling_Tr_Mobile = document.getElementById("tr-styling-input-mobile");
if(elementStyling_Tr_Mobile){
let targetValue = target.getAttribute("data-tr-styling-mobile");
elementStyling_Tr_Mobile.value = targetValue;
elementStyling_Tr_Mobile.addEventListener("input", function(){
  
  target.setAttribute("data-tr-styling-mobile",elementStyling_Tr_Mobile.value);
  propertiesEditor(target);})
}
//----------------------


//---------------------------------------------

let elementStyling_Td = document.getElementById("td-styling-input");
if(elementStyling_Td){
let targetValue = target.getAttribute("data-td-styling");
elementStyling_Td.value = targetValue;
elementStyling_Td.addEventListener("input", function(){
  
  target.setAttribute("data-td-styling",elementStyling_Td.value);
  propertiesEditor(target);})
}
//----------------------
// Hover //============
let elementStyling_Td_Hover = document.getElementById("td-styling-input-hover");
if(elementStyling_Td_Hover){
let targetValue = target.getAttribute("data-td-styling-hover");
elementStyling_Td_Hover.value = targetValue;
elementStyling_Td_Hover.addEventListener("input", function(){
  
  target.setAttribute("data-td-styling-hover",elementStyling_Td_Hover.value);
  propertiesEditor(target);})
}
//----------------------
// Active //===========
let elementStyling_Td_Active = document.getElementById("td-styling-input-active");
if(elementStyling_Td_Active){
let targetValue = target.getAttribute("data-td-styling-active");
elementStyling_Td_Active.value = targetValue;
elementStyling_Td_Active.addEventListener("input", function(){
  
  target.setAttribute("data-td-styling-active",elementStyling_Td_Active.value);
  propertiesEditor(target);})
}
//----------------------
// Tablet //===========
let elementStyling_Td_Tablet = document.getElementById("td-styling-input-tablet");
if(elementStyling_Td_Tablet){
let targetValue = target.getAttribute("data-td-styling-tablet");
elementStyling_Td_Tablet.value = targetValue;
elementStyling_Td_Tablet.addEventListener("input", function(){
  
  target.setAttribute("data-td-styling-tablet",elementStyling_Td_Tablet.value);
  propertiesEditor(target);})
}
//----------------------
// Mobile //===========
let elementStyling_Td_Mobile = document.getElementById("td-styling-input-mobile");
if(elementStyling_Td_Mobile){
let targetValue = target.getAttribute("data-td-styling-mobile");
elementStyling_Td_Mobile.value = targetValue;
elementStyling_Td_Mobile.addEventListener("input", function(){
  
  target.setAttribute("data-td-styling-mobile",elementStyling_Td_Mobile.value);
  propertiesEditor(target);})
}
//----------------------


//---------------------------------------------

let editSource = document.getElementById("edit-source-input");
if(editSource){
let targetValue = target.getAttribute("src");
editSource.value = targetValue;
editSource.addEventListener("input", function(){
  
  target.setAttribute("src",editSource.value);
  propertiesEditor(target);})
}
//----------------------


let elementframeBorder = document.getElementById("embed-frameborder-input");
if(elementframeBorder){
let targetValue = target.getAttribute("frameborder");
elementframeBorder.value = targetValue;
elementframeBorder.addEventListener("input", function(){
  
  target.setAttribute("frameborder",elementframeBorder.value);
  propertiesEditor(target);})
}
//----------------------
let elementAutoPlay = document.getElementById("embed-autoplay-input");
if(elementAutoPlay){
  autoChecked();
  function autoChecked(){
  let targetValue = target.hasAttribute("autoplay");
  if (targetValue) {
    elementAutoPlay.checked = true;
  } else {
    elementAutoPlay.checked = false;
  }
  elementAutoPlay.addEventListener("click", () => {
    if (elementAutoPlay.checked === true) {
      target.setAttribute("autoplay", "");
    } else {
      target.removeAttribute("autoplay");
    }
  });
  }

}
//------------------------------------------------------------------------------------------

let elementLoops = document.getElementById("embed-loop-input");
if(elementLoops){
  autoChecked();
  function autoChecked(){
  let targetValue = target.hasAttribute("loop");
  if (targetValue) {
    elementLoops.checked = true;
  } else {
    elementLoops.checked = false;
  }
  elementLoops.addEventListener("click", () => {
    if (elementLoops.checked === true) {
      target.setAttribute("loop", "");
    } else {
      target.removeAttribute("loop");
    }
  });
  }

}
//------------------------------------------------------------------------------------------


let elementControls = document.getElementById("embed-controls-input");
if(elementControls){
  autoChecked();
  function autoChecked(){
  let targetValue = target.hasAttribute("controls");
  if (targetValue) {
    elementControls.checked = true;
  } else {
    elementControls.checked = false;
  }
  elementControls.addEventListener("click", () => {
    if (elementControls.checked === true) {
      target.setAttribute("controls", "");
    } else {
      target.removeAttribute("controls");
    }
  });
  }

}
//------------------------------------------------------------------------------------------

//CSS Filter
let checkCSSFilter = document.getElementById("css-Filter-Checkbox");
if(checkCSSFilter){
  cssFilterValueText();
  let targetValue = target.getAttribute("data-css-filter-check");
  let filterDiv = document.getElementById("css-filter-div");
  if(targetValue === "true"){
    checkCSSFilter.checked = true;
    filterDiv.classList.remove("none-mode");
  } else {
    checkCSSFilter.checked = false;
    filterDiv.classList.add("none-mode");
  }
  checkCSSFilter.addEventListener("change", function(){
    target.setAttribute("data-css-filter-check", checkCSSFilter.checked);
    if(checkCSSFilter.checked === true){
      filterDiv.classList.remove("none-mode");
    } else {
      filterDiv.classList.add("none-mode");
    }
    // console.log(targetValue);
    propertiesEditor(target);
  })
}

//CSS Filter Label Text

function cssFilterValueText(){

let blur = "filter-css-blur";
let Brightness = "filter-css-Brightness";
let Contrast = "filter-css-Contrast";
let Greyscale = "filter-css-Greyscale";
let hue = "filter-css-hue";
let Invert = "filter-css-Invert";
let Saturate = "filter-css-Saturate";
let Sepia = "filter-css-Sepia";

let basePseudoMedia = [blur, Brightness, Contrast, Greyscale, hue, Invert, Saturate, Sepia];


    let base = "";
    let hover = "-hover";
    let active = "-active";
    let tablet = "-tablet";
    let mobile = "-mobile";

    let label = "-label"
    let input = "-input"


    basePseudoMedia.forEach(element => {
     let baseInput = element+input+base;
     let HoverInput = element+input+hover;
     let ActiveInput = element+input+active;
     let TabletInput = element+input+tablet;
     let MobileInput = element+input+mobile;
     let labelInput = element+label;
     
     let inputs = [baseInput, HoverInput, ActiveInput, TabletInput, MobileInput];

     inputs.forEach(input => {
       propertiesAndBase(input, labelInput);
     });

    });

    function propertiesAndBase(input,label){
    let inputElement = document.getElementById(input);
    let labelElement = document.getElementById(label);

    if(inputElement.style.display !== "none"){

        inputElement.addEventListener("input", function(){
          labelChange();
          function labelChange(){
            if(labelElement.id === "filter-css-blur-label"){
              labelElement.textContent = `Blur (${inputElement.value}px) `;
            }
            if(labelElement.id === "filter-css-Brightness-label"){
              labelElement.textContent = `Brightness (${inputElement.value}%) `;
            }
            if(labelElement.id === "filter-css-Contrast-label"){
              labelElement.textContent = `Contrast (${inputElement.value}%) `;
            }
            if(labelElement.id === "filter-css-Greyscale-label"){
              labelElement.textContent = `Greyscale (${inputElement.value}%) `;
            }
            if(labelElement.id === "filter-css-hue-label"){
              labelElement.textContent = `Hue-rotate (${inputElement.value}deg) `;
            }
            if(labelElement.id === "filter-css-Invert-label"){
              labelElement.textContent = `Invert (${inputElement.value}%) `;
            }
            if(labelElement.id === "filter-css-Saturate-label"){
              labelElement.textContent = `Saturate ( ${inputElement.value} ) `;
            }
            if(labelElement.id === "filter-css-Sepia-label"){
              labelElement.textContent = `Sepia ( ${inputElement.value} ) `;
            }
          }
        })
    }

    }
    
    }


let editCSS_Blur = document.getElementById("filter-css-blur-input");
if(editCSS_Blur){
let targetValue = target.getAttribute("data-css-filter-blur");
editCSS_Blur.value = targetValue;
editCSS_Blur.addEventListener("input", function(){
  
  target.setAttribute("data-css-filter-blur",editCSS_Blur.value);
  propertiesEditor(target);})
}
//----------------------
// Hover //============
let editCSS_Blur_Hover = document.getElementById("filter-css-blur-input-hover");
if(editCSS_Blur_Hover){
let targetValue = target.getAttribute("data-css-filter-blur-hover");
editCSS_Blur_Hover.value = targetValue;
editCSS_Blur_Hover.addEventListener("input", function(){
  
  target.setAttribute("data-css-filter-blur-hover",editCSS_Blur_Hover.value);
  propertiesEditor(target);})
}
//----------------------
// Active //===========
let editCSS_Blur_Active = document.getElementById("filter-css-blur-input-active");
if(editCSS_Blur_Active){
let targetValue = target.getAttribute("data-css-filter-blur-active");
editCSS_Blur_Active.value = targetValue;
editCSS_Blur_Active.addEventListener("input", function(){
  
  target.setAttribute("data-css-filter-blur-active",editCSS_Blur_Active.value);
  propertiesEditor(target);})
}
//----------------------
// Tablet //===========
let editCSS_Blur_Tablet = document.getElementById("filter-css-blur-input-tablet");
if(editCSS_Blur_Tablet){
let targetValue = target.getAttribute("data-css-filter-blur-tablet");
editCSS_Blur_Tablet.value = targetValue;
editCSS_Blur_Tablet.addEventListener("input", function(){
  
  target.setAttribute("data-css-filter-blur-tablet",editCSS_Blur_Tablet.value);
  propertiesEditor(target);})
}
//----------------------
// Mobile //===========
let editCSS_Blur_Mobile = document.getElementById("filter-css-blur-input-mobile");
if(editCSS_Blur_Mobile){
let targetValue = target.getAttribute("data-css-filter-blur-mobile");
editCSS_Blur_Mobile.value = targetValue;
editCSS_Blur_Mobile.addEventListener("input", function(){
  
  target.setAttribute("data-css-filter-blur-mobile",editCSS_Blur_Mobile.value);
  propertiesEditor(target);})
}
//----------------------


let editCSS_Brightness = document.getElementById("filter-css-Brightness-input");
if(editCSS_Brightness){
let targetValue = target.getAttribute("data-css-filter-Brightness");
editCSS_Brightness.value = targetValue;
editCSS_Brightness.addEventListener("input", function(){
  
  target.setAttribute("data-css-filter-Brightness",editCSS_Brightness.value);
  propertiesEditor(target);})
}
//----------------------
// Hover //============
let editCSS_Brightness_Hover = document.getElementById("filter-css-Brightness-input-hover");
if(editCSS_Brightness_Hover){
let targetValue = target.getAttribute("data-css-filter-Brightness-hover");
editCSS_Brightness_Hover.value = targetValue;
editCSS_Brightness_Hover.addEventListener("input", function(){
  
  target.setAttribute("data-css-filter-Brightness-hover",editCSS_Brightness_Hover.value);
  propertiesEditor(target);})
}
//----------------------
// Active //===========
let editCSS_Brightness_Active = document.getElementById("filter-css-Brightness-input-active");
if(editCSS_Brightness_Active){
let targetValue = target.getAttribute("data-css-filter-Brightness-active");
editCSS_Brightness_Active.value = targetValue;
editCSS_Brightness_Active.addEventListener("input", function(){
  
  target.setAttribute("data-css-filter-Brightness-active",editCSS_Brightness_Active.value);
  propertiesEditor(target);})
}
//----------------------
// Tablet //===========
let editCSS_Brightness_Tablet = document.getElementById("filter-css-Brightness-input-tablet");
if(editCSS_Brightness_Tablet){
let targetValue = target.getAttribute("data-css-filter-Brightness-tablet");
editCSS_Brightness_Tablet.value = targetValue;
editCSS_Brightness_Tablet.addEventListener("input", function(){
  
  target.setAttribute("data-css-filter-Brightness-tablet",editCSS_Brightness_Tablet.value);
  propertiesEditor(target);})
}
//----------------------
// Mobile //===========
let editCSS_Brightness_Mobile = document.getElementById("filter-css-Brightness-input-mobile");
if(editCSS_Brightness_Mobile){
let targetValue = target.getAttribute("data-css-filter-Brightness-mobile");
editCSS_Brightness_Mobile.value = targetValue;
editCSS_Brightness_Mobile.addEventListener("input", function(){
  
  target.setAttribute("data-css-filter-Brightness-mobile",editCSS_Brightness_Mobile.value);
  propertiesEditor(target);})
}
//----------------------


let editCSS_Contrast = document.getElementById("filter-css-Contrast-input");
if(editCSS_Contrast){
let targetValue = target.getAttribute("data-css-filter-Contrast");
editCSS_Contrast.value = targetValue;
editCSS_Contrast.addEventListener("input", function(){
  
  target.setAttribute("data-css-filter-Contrast",editCSS_Contrast.value);
  propertiesEditor(target);})
}
//----------------------
// Hover //============
let editCSS_Contrast_Hover = document.getElementById("filter-css-Contrast-input-hover");
if(editCSS_Contrast_Hover){
let targetValue = target.getAttribute("data-css-filter-Contrast-hover");
editCSS_Contrast_Hover.value = targetValue;
editCSS_Contrast_Hover.addEventListener("input", function(){
  
  target.setAttribute("data-css-filter-Contrast-hover",editCSS_Contrast_Hover.value);
  propertiesEditor(target);})
}
//----------------------
// Active //===========
let editCSS_Contrast_Active = document.getElementById("filter-css-Contrast-input-active");
if(editCSS_Contrast_Active){
let targetValue = target.getAttribute("data-css-filter-Contrast-active");
editCSS_Contrast_Active.value = targetValue;
editCSS_Contrast_Active.addEventListener("input", function(){
  
  target.setAttribute("data-css-filter-Contrast-active",editCSS_Contrast_Active.value);
  propertiesEditor(target);})
}
//----------------------
// Tablet //===========
let editCSS_Contrast_Tablet = document.getElementById("filter-css-Contrast-input-tablet");
if(editCSS_Contrast_Tablet){
let targetValue = target.getAttribute("data-css-filter-Contrast-tablet");
editCSS_Contrast_Tablet.value = targetValue;
editCSS_Contrast_Tablet.addEventListener("input", function(){
  
  target.setAttribute("data-css-filter-Contrast-tablet",editCSS_Contrast_Tablet.value);
  propertiesEditor(target);})
}
//----------------------
// Mobile //===========
let editCSS_Contrast_Mobile = document.getElementById("filter-css-Contrast-input-mobile");
if(editCSS_Contrast_Mobile){
let targetValue = target.getAttribute("data-css-filter-Contrast-mobile");
editCSS_Contrast_Mobile.value = targetValue;
editCSS_Contrast_Mobile.addEventListener("input", function(){
  
  target.setAttribute("data-css-filter-Contrast-mobile",editCSS_Contrast_Mobile.value);
  propertiesEditor(target);})
}
//----------------------


let editCSS_grayscale = document.getElementById("filter-css-Greyscale-input");
if(editCSS_grayscale){
let targetValue = target.getAttribute("data-css-filter-Greyscale");
editCSS_grayscale.value = targetValue;
editCSS_grayscale.addEventListener("input", function(){
  
  target.setAttribute("data-css-filter-Greyscale",editCSS_grayscale.value);
  propertiesEditor(target);})
}
//----------------------
// Hover //============
let editCSS_grayscale_Hover = document.getElementById("filter-css-Greyscale-input-hover");
if(editCSS_grayscale_Hover){
let targetValue = target.getAttribute("data-css-filter-Greyscale-hover");
editCSS_grayscale_Hover.value = targetValue;
editCSS_grayscale_Hover.addEventListener("input", function(){
  
  target.setAttribute("data-css-filter-Greyscale-hover",editCSS_grayscale_Hover.value);
  propertiesEditor(target);})
}
//----------------------
// Active //===========
let editCSS_grayscale_Active = document.getElementById("filter-css-Greyscale-input-active");
if(editCSS_grayscale_Active){
let targetValue = target.getAttribute("data-css-filter-Greyscale-active");
editCSS_grayscale_Active.value = targetValue;
editCSS_grayscale_Active.addEventListener("input", function(){
  
  target.setAttribute("data-css-filter-Greyscale-active",editCSS_grayscale_Active.value);
  propertiesEditor(target);})
}
//----------------------
// Tablet //===========
let editCSS_grayscale_Tablet = document.getElementById("filter-css-Greyscale-input-tablet");
if(editCSS_grayscale_Tablet){
let targetValue = target.getAttribute("data-css-filter-Greyscale-tablet");
editCSS_grayscale_Tablet.value = targetValue;
editCSS_grayscale_Tablet.addEventListener("input", function(){
  
  target.setAttribute("data-css-filter-Greyscale-tablet",editCSS_grayscale_Tablet.value);
  propertiesEditor(target);})
}
//----------------------
// Mobile //===========
let editCSS_grayscale_Mobile = document.getElementById("filter-css-Greyscale-input-mobile");
if(editCSS_grayscale_Mobile){
let targetValue = target.getAttribute("data-css-filter-Greyscale-mobile");
editCSS_grayscale_Mobile.value = targetValue;
editCSS_grayscale_Mobile.addEventListener("input", function(){
  
  target.setAttribute("data-css-filter-Greyscale-mobile",editCSS_grayscale_Mobile.value);
  propertiesEditor(target);})
}
//----------------------


let editCSS_Hue = document.getElementById("filter-css-hue-input");
if(editCSS_Hue){
let targetValue = target.getAttribute("data-css-filter-hue");
editCSS_Hue.value = targetValue;
editCSS_Hue.addEventListener("input", function(){
  
  target.setAttribute("data-css-filter-hue",editCSS_Hue.value);
  propertiesEditor(target);})
}
//----------------------
// Hover //============
let editCSS_Hue_Hover = document.getElementById("filter-css-hue-input-hover");
if(editCSS_Hue_Hover){
let targetValue = target.getAttribute("data-css-filter-hue-hover");
editCSS_Hue_Hover.value = targetValue;
editCSS_Hue_Hover.addEventListener("input", function(){
  
  target.setAttribute("data-css-filter-hue-hover",editCSS_Hue_Hover.value);
  propertiesEditor(target);})
}
//----------------------
// Active //===========
let editCSS_Hue_Active = document.getElementById("filter-css-hue-input-active");
if(editCSS_Hue_Active){
let targetValue = target.getAttribute("data-css-filter-hue-active");
editCSS_Hue_Active.value = targetValue;
editCSS_Hue_Active.addEventListener("input", function(){
  
  target.setAttribute("data-css-filter-hue-active",editCSS_Hue_Active.value);
  propertiesEditor(target);})
}
//----------------------
// Tablet //===========
let editCSS_Hue_Tablet = document.getElementById("filter-css-hue-input-tablet");
if(editCSS_Hue_Tablet){
let targetValue = target.getAttribute("data-css-filter-hue-tablet");
editCSS_Hue_Tablet.value = targetValue;
editCSS_Hue_Tablet.addEventListener("input", function(){
  
  target.setAttribute("data-css-filter-hue-tablet",editCSS_Hue_Tablet.value);
  propertiesEditor(target);})
}
//----------------------
// Mobile //===========
let editCSS_Hue_Mobile = document.getElementById("filter-css-hue-input-mobile");
if(editCSS_Hue_Mobile){
let targetValue = target.getAttribute("data-css-filter-hue-mobile");
editCSS_Hue_Mobile.value = targetValue;
editCSS_Hue_Mobile.addEventListener("input", function(){
  
  target.setAttribute("data-css-filter-hue-mobile",editCSS_Hue_Mobile.value);
  propertiesEditor(target);})
}
//----------------------


let editCSS_Invert = document.getElementById("filter-css-Invert-input");
if(editCSS_Invert){
let targetValue = target.getAttribute("data-css-filter-Invert");
editCSS_Invert.value = targetValue;
editCSS_Invert.addEventListener("input", function(){
  
  target.setAttribute("data-css-filter-Invert",editCSS_Invert.value);
  propertiesEditor(target);})
}
//----------------------
// Hover //============
let editCSS_Invert_Hover = document.getElementById("filter-css-Invert-input-hover");
if(editCSS_Invert_Hover){
let targetValue = target.getAttribute("data-css-filter-Invert-hover");
editCSS_Invert_Hover.value = targetValue;
editCSS_Invert_Hover.addEventListener("input", function(){
  
  target.setAttribute("data-css-filter-Invert-hover",editCSS_Invert_Hover.value);
  propertiesEditor(target);})
}
//----------------------
// Active //===========
let editCSS_Invert_Active = document.getElementById("filter-css-Invert-input-active");
if(editCSS_Invert_Active){
let targetValue = target.getAttribute("data-css-filter-Invert-active");
editCSS_Invert_Active.value = targetValue;
editCSS_Invert_Active.addEventListener("input", function(){
  
  target.setAttribute("data-css-filter-Invert-active",editCSS_Invert_Active.value);
  propertiesEditor(target);})
}
//----------------------
// Tablet //===========
let editCSS_Invert_Tablet = document.getElementById("filter-css-Invert-input-tablet");
if(editCSS_Invert_Tablet){
let targetValue = target.getAttribute("data-css-filter-Invert-tablet");
editCSS_Invert_Tablet.value = targetValue;
editCSS_Invert_Tablet.addEventListener("input", function(){
  
  target.setAttribute("data-css-filter-Invert-tablet",editCSS_Invert_Tablet.value);
  propertiesEditor(target);})
}
//----------------------
// Mobile //===========
let editCSS_Invert_Mobile = document.getElementById("filter-css-Invert-input-mobile");
if(editCSS_Invert_Mobile){
let targetValue = target.getAttribute("data-css-filter-Invert-mobile");
editCSS_Invert_Mobile.value = targetValue;
editCSS_Invert_Mobile.addEventListener("input", function(){
  
  target.setAttribute("data-css-filter-Invert-mobile",editCSS_Invert_Mobile.value);
  propertiesEditor(target);})
}
//----------------------


let editCSS_Saturate = document.getElementById("filter-css-Saturate-input");
if(editCSS_Saturate){
let targetValue = target.getAttribute("data-css-filter-Saturate");
editCSS_Saturate.value = targetValue;
editCSS_Saturate.addEventListener("input", function(){
  
  target.setAttribute("data-css-filter-Saturate",editCSS_Saturate.value);
  propertiesEditor(target);})
}
//----------------------
// Hover //============
let editCSS_Saturate_Hover = document.getElementById("filter-css-Saturate-input-hover");
if(editCSS_Saturate_Hover){
let targetValue = target.getAttribute("data-css-filter-Saturate-hover");
editCSS_Saturate_Hover.value = targetValue;
editCSS_Saturate_Hover.addEventListener("input", function(){
  
  target.setAttribute("data-css-filter-Saturate-hover",editCSS_Saturate_Hover.value);
  propertiesEditor(target);})
}
//----------------------
// Active //===========
let editCSS_Saturate_Active = document.getElementById("filter-css-Saturate-input-active");
if(editCSS_Saturate_Active){
let targetValue = target.getAttribute("data-css-filter-Saturate-active");
editCSS_Saturate_Active.value = targetValue;
editCSS_Saturate_Active.addEventListener("input", function(){
  
  target.setAttribute("data-css-filter-Saturate-active",editCSS_Saturate_Active.value);
  propertiesEditor(target);})
}
//----------------------
// Tablet //===========
let editCSS_Saturate_Tablet = document.getElementById("filter-css-Saturate-input-tablet");
if(editCSS_Saturate_Tablet){
let targetValue = target.getAttribute("data-css-filter-Saturate-tablet");
editCSS_Saturate_Tablet.value = targetValue;
editCSS_Saturate_Tablet.addEventListener("input", function(){
  
  target.setAttribute("data-css-filter-Saturate-tablet",editCSS_Saturate_Tablet.value);
  propertiesEditor(target);})
}
//----------------------
// Mobile //===========
let editCSS_Saturate_Mobile = document.getElementById("filter-css-Saturate-input-mobile");
if(editCSS_Saturate_Mobile){
let targetValue = target.getAttribute("data-css-filter-Saturate-mobile");
editCSS_Saturate_Mobile.value = targetValue;
editCSS_Saturate_Mobile.addEventListener("input", function(){
  
  target.setAttribute("data-css-filter-Saturate-mobile",editCSS_Saturate_Mobile.value);
  propertiesEditor(target);})
}
//----------------------


let editCSS_Sepia = document.getElementById("filter-css-Sepia-input");
if(editCSS_Sepia){
let targetValue = target.getAttribute("data-css-filter-Sepia");
editCSS_Sepia.value = targetValue;
editCSS_Sepia.addEventListener("input", function(){
  
  target.setAttribute("data-css-filter-Sepia",editCSS_Sepia.value);
  propertiesEditor(target);})
}
//----------------------
// Hover //============
let editCSS_Sepia_Hover = document.getElementById("filter-css-Sepia-input-hover");
if(editCSS_Sepia_Hover){
let targetValue = target.getAttribute("data-css-filter-Sepia-hover");
editCSS_Sepia_Hover.value = targetValue;
editCSS_Sepia_Hover.addEventListener("input", function(){
  
  target.setAttribute("data-css-filter-Sepia-hover",editCSS_Sepia_Hover.value);
  propertiesEditor(target);})
}
//----------------------
// Active //===========
let editCSS_Sepia_Active = document.getElementById("filter-css-Sepia-input-active");
if(editCSS_Sepia_Active){
let targetValue = target.getAttribute("data-css-filter-Sepia-active");
editCSS_Sepia_Active.value = targetValue;
editCSS_Sepia_Active.addEventListener("input", function(){
  
  target.setAttribute("data-css-filter-Sepia-active",editCSS_Sepia_Active.value);
  propertiesEditor(target);})
}
//----------------------
// Tablet //===========
let editCSS_Sepia_Tablet = document.getElementById("filter-css-Sepia-input-tablet");
if(editCSS_Sepia_Tablet){
let targetValue = target.getAttribute("data-css-filter-Sepia-tablet");
editCSS_Sepia_Tablet.value = targetValue;
editCSS_Sepia_Tablet.addEventListener("input", function(){
  
  target.setAttribute("data-css-filter-Sepia-tablet",editCSS_Sepia_Tablet.value);
  propertiesEditor(target);})
}
//----------------------
// Mobile //===========
let editCSS_Sepia_Mobile = document.getElementById("filter-css-Sepia-input-mobile");
if(editCSS_Sepia_Mobile){
let targetValue = target.getAttribute("data-css-filter-Sepia-mobile");
editCSS_Sepia_Mobile.value = targetValue;
editCSS_Sepia_Mobile.addEventListener("input", function(){
  
  target.setAttribute("data-css-filter-Sepia-mobile",editCSS_Sepia_Mobile.value);
  propertiesEditor(target);})
}
//----------------------


//------------------------------------------------------------------------------------------
//CSS Positioning
let cssPositioningCheck = document.getElementById("CSSPositioninput");
if(cssPositioningCheck){
  let targetValue = target.getAttribute("data-position-check");
  let positioningDiv = document.getElementById("css-positioning-after-check");
  if(targetValue === "true"){
    cssPositioningCheck.checked = true;
    positioningDiv.classList.remove("none-mode");
  } else {
    cssPositioningCheck.checked = false;
    positioningDiv.classList.add("none-mode");
  }
  cssPositioningCheck.addEventListener("change", function(){
    target.setAttribute("data-position-check", cssPositioningCheck.checked);
    if(cssPositioningCheck.checked === true){
      positioningDiv.classList.remove("none-mode");
    } else {
      positioningDiv.classList.add("none-mode");
    }
  })
}


let elementPositionParameter = document.getElementById("CSSPositioningUnitinput");
if (elementPositionParameter) {
let targetValue = target.getAttribute("data-position-parameter");
for (let i = 0; i < elementPositionParameter.options.length; i++) {
if (elementPositionParameter.options[i].value === targetValue) {
elementPositionParameter.selectedIndex = i;
break;}
}
    elementPositionParameter.addEventListener("change", function(){
        target.setAttribute("data-position-parameter",elementPositionParameter.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
// Hover //===========
let elementPositionParameter_Hover = document.getElementById("CSSPositioningUnitinput-hover");
if (elementPositionParameter_Hover) {
let targetValue = target.getAttribute("data-position-parameter-hover");
for (let i = 0; i < elementPositionParameter_Hover.options.length; i++) {
if (elementPositionParameter_Hover.options[i].value === targetValue) {
elementPositionParameter_Hover.selectedIndex = i;
break;}
}
    elementPositionParameter_Hover.addEventListener("change", function(){
        target.setAttribute("data-position-parameter-hover",elementPositionParameter_Hover.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
// Active //===========
let elementPositionParameter_Active = document.getElementById("CSSPositioningUnitinput-active");
if (elementPositionParameter_Active) {
let targetValue = target.getAttribute("data-position-parameter-active");
for (let i = 0; i < elementPositionParameter_Active.options.length; i++) {
if (elementPositionParameter_Active.options[i].value === targetValue) {
elementPositionParameter_Active.selectedIndex = i;
break;}
}
    elementPositionParameter_Active.addEventListener("change", function(){
        target.setAttribute("data-position-parameter-active",elementPositionParameter_Active.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
// Tablet //===========
let elementPositionParameter_Tablet = document.getElementById("CSSPositioningUnitinput-tablet");
if (elementPositionParameter_Tablet) {
let targetValue = target.getAttribute("data-position-parameter-tablet");
for (let i = 0; i < elementPositionParameter_Tablet.options.length; i++) {
if (elementPositionParameter_Tablet.options[i].value === targetValue) {
elementPositionParameter_Tablet.selectedIndex = i;
break;}
}
    elementPositionParameter_Tablet.addEventListener("change", function(){
        target.setAttribute("data-position-parameter-tablet",elementPositionParameter_Tablet.value);
        propertiesEditor(target);})
}
//--------------------------------------------------
// Mobile //===========
let elementPositionParameter_Mobile = document.getElementById("CSSPositioningUnitinput-mobile");
if (elementPositionParameter_Mobile) {
let targetValue = target.getAttribute("data-position-parameter-mobile");
for (let i = 0; i < elementPositionParameter_Mobile.options.length; i++) {
if (elementPositionParameter_Mobile.options[i].value === targetValue) {
elementPositionParameter_Mobile.selectedIndex = i;
break;}
}
    elementPositionParameter_Mobile.addEventListener("change", function(){
        target.setAttribute("data-position-parameter-mobile",elementPositionParameter_Mobile.value);
        propertiesEditor(target);})
}
//--------------------------------------------------


let elementPosition_Top = document.getElementById("PositioningTopinput");
if(elementPosition_Top){
let targetValue = target.getAttribute("data-position-top");
elementPosition_Top.value = targetValue;
elementPosition_Top.addEventListener("input", function(){
  
  target.setAttribute("data-position-top",elementPosition_Top.value);
  propertiesEditor(target);})
}
//----------------------
// Hover //============
let elementPosition_Top_Hover = document.getElementById("PositioningTopinput-hover");
if(elementPosition_Top_Hover){
let targetValue = target.getAttribute("data-position-top-hover");
elementPosition_Top_Hover.value = targetValue;
elementPosition_Top_Hover.addEventListener("input", function(){
  
  target.setAttribute("data-position-top-hover",elementPosition_Top_Hover.value);
  propertiesEditor(target);})
}
//----------------------
// Active //===========
let elementPosition_Top_Active = document.getElementById("PositioningTopinput-active");
if(elementPosition_Top_Active){
let targetValue = target.getAttribute("data-position-top-active");
elementPosition_Top_Active.value = targetValue;
elementPosition_Top_Active.addEventListener("input", function(){
  
  target.setAttribute("data-position-top-active",elementPosition_Top_Active.value);
  propertiesEditor(target);})
}
//----------------------
// Tablet //===========
let elementPosition_Top_Tablet = document.getElementById("PositioningTopinput-tablet");
if(elementPosition_Top_Tablet){
let targetValue = target.getAttribute("data-position-top-tablet");
elementPosition_Top_Tablet.value = targetValue;
elementPosition_Top_Tablet.addEventListener("input", function(){
  
  target.setAttribute("data-position-top-tablet",elementPosition_Top_Tablet.value);
  propertiesEditor(target);})
}
//----------------------
// Mobile //===========
let elementPosition_Top_Mobile = document.getElementById("PositioningTopinput-mobile");
if(elementPosition_Top_Mobile){
let targetValue = target.getAttribute("data-position-top-mobile");
elementPosition_Top_Mobile.value = targetValue;
elementPosition_Top_Mobile.addEventListener("input", function(){
  
  target.setAttribute("data-position-top-mobile",elementPosition_Top_Mobile.value);
  propertiesEditor(target);})
}
//----------------------

let elementPosition_Right = document.getElementById("PositioningRightinput");
if(elementPosition_Right){
let targetValue = target.getAttribute("data-position-right");
elementPosition_Right.value = targetValue;
elementPosition_Right.addEventListener("input", function(){
  
  target.setAttribute("data-position-right",elementPosition_Right.value);
  propertiesEditor(target);})
}
//----------------------
// Hover //============
let elementPosition_Right_Hover = document.getElementById("PositioningRightinput-hover");
if(elementPosition_Right_Hover){
let targetValue = target.getAttribute("data-position-right-hover");
elementPosition_Right_Hover.value = targetValue;
elementPosition_Right_Hover.addEventListener("input", function(){
  
  target.setAttribute("data-position-right-hover",elementPosition_Right_Hover.value);
  propertiesEditor(target);})
}
//----------------------
// Active //===========
let elementPosition_Right_Active = document.getElementById("PositioningRightinput-active");
if(elementPosition_Right_Active){
let targetValue = target.getAttribute("data-position-right-active");
elementPosition_Right_Active.value = targetValue;
elementPosition_Right_Active.addEventListener("input", function(){
  
  target.setAttribute("data-position-right-active",elementPosition_Right_Active.value);
  propertiesEditor(target);})
}
//----------------------
// Tablet //===========
let elementPosition_Right_Tablet = document.getElementById("PositioningRightinput-tablet");
if(elementPosition_Right_Tablet){
let targetValue = target.getAttribute("data-position-right-tablet");
elementPosition_Right_Tablet.value = targetValue;
elementPosition_Right_Tablet.addEventListener("input", function(){
  
  target.setAttribute("data-position-right-tablet",elementPosition_Right_Tablet.value);
  propertiesEditor(target);})
}
//----------------------
// Mobile //===========
let elementPosition_Right_Mobile = document.getElementById("PositioningRightinput-mobile");
if(elementPosition_Right_Mobile){
let targetValue = target.getAttribute("data-position-right-mobile");
elementPosition_Right_Mobile.value = targetValue;
elementPosition_Right_Mobile.addEventListener("input", function(){
  
  target.setAttribute("data-position-right-mobile",elementPosition_Right_Mobile.value);
  propertiesEditor(target);})
}
//----------------------

let elementPosition_Bottom = document.getElementById("PositioningBottominput");
if(elementPosition_Bottom){
let targetValue = target.getAttribute("data-position-bottom");
elementPosition_Bottom.value = targetValue;
elementPosition_Bottom.addEventListener("input", function(){
  
  target.setAttribute("data-position-bottom",elementPosition_Bottom.value);
  propertiesEditor(target);})
}
//----------------------
// Hover //============
let elementPosition_Bottom_Hover = document.getElementById("PositioningBottominput-hover");
if(elementPosition_Bottom_Hover){
let targetValue = target.getAttribute("data-position-bottom-hover");
elementPosition_Bottom_Hover.value = targetValue;
elementPosition_Bottom_Hover.addEventListener("input", function(){
  
  target.setAttribute("data-position-bottom-hover",elementPosition_Bottom_Hover.value);
  propertiesEditor(target);})
}
//----------------------
// Active //===========
let elementPosition_Bottom_Active = document.getElementById("PositioningBottominput-active");
if(elementPosition_Bottom_Active){
let targetValue = target.getAttribute("data-position-bottom-active");
elementPosition_Bottom_Active.value = targetValue;
elementPosition_Bottom_Active.addEventListener("input", function(){
  
  target.setAttribute("data-position-bottom-active",elementPosition_Bottom_Active.value);
  propertiesEditor(target);})
}
//----------------------
// Tablet //===========
let elementPosition_Bottom_Tablet = document.getElementById("PositioningBottominput-tablet");
if(elementPosition_Bottom_Tablet){
let targetValue = target.getAttribute("data-position-bottom-tablet");
elementPosition_Bottom_Tablet.value = targetValue;
elementPosition_Bottom_Tablet.addEventListener("input", function(){
  
  target.setAttribute("data-position-bottom-tablet",elementPosition_Bottom_Tablet.value);
  propertiesEditor(target);})
}
//----------------------
// Mobile //===========
let elementPosition_Bottom_Mobile = document.getElementById("PositioningBottominput-mobile");
if(elementPosition_Bottom_Mobile){
let targetValue = target.getAttribute("data-position-bottom-mobile");
elementPosition_Bottom_Mobile.value = targetValue;
elementPosition_Bottom_Mobile.addEventListener("input", function(){
  
  target.setAttribute("data-position-bottom-mobile",elementPosition_Bottom_Mobile.value);
  propertiesEditor(target);})
}
//----------------------


let elementPosition_Left = document.getElementById("PositioningLeftinput");
if(elementPosition_Left){
let targetValue = target.getAttribute("data-position-left");
elementPosition_Left.value = targetValue;
elementPosition_Left.addEventListener("input", function(){
  
  target.setAttribute("data-position-left",elementPosition_Left.value);
  propertiesEditor(target);})
}
//----------------------
// Hover //============
let elementPosition_Left_Hover = document.getElementById("PositioningLeftinput-hover");
if(elementPosition_Left_Hover){
let targetValue = target.getAttribute("data-position-left-hover");
elementPosition_Left_Hover.value = targetValue;
elementPosition_Left_Hover.addEventListener("input", function(){
  
  target.setAttribute("data-position-left-hover",elementPosition_Left_Hover.value);
  propertiesEditor(target);})
}
//----------------------
// Active //===========
let elementPosition_Left_Active = document.getElementById("PositioningLeftinput-active");
if(elementPosition_Left_Active){
let targetValue = target.getAttribute("data-position-left-active");
elementPosition_Left_Active.value = targetValue;
elementPosition_Left_Active.addEventListener("input", function(){
  
  target.setAttribute("data-position-left-active",elementPosition_Left_Active.value);
  propertiesEditor(target);})
}
//----------------------
// Tablet //===========
let elementPosition_Left_Tablet = document.getElementById("PositioningLeftinput-tablet");
if(elementPosition_Left_Tablet){
let targetValue = target.getAttribute("data-position-left-tablet");
elementPosition_Left_Tablet.value = targetValue;
elementPosition_Left_Tablet.addEventListener("input", function(){
  
  target.setAttribute("data-position-left-tablet",elementPosition_Left_Tablet.value);
  propertiesEditor(target);})
}
//----------------------
// Mobile //===========
let elementPosition_Left_Mobile = document.getElementById("PositioningLeftinput-mobile");
if(elementPosition_Left_Mobile){
let targetValue = target.getAttribute("data-position-left-mobile");
elementPosition_Left_Mobile.value = targetValue;
elementPosition_Left_Mobile.addEventListener("input", function(){
  
  target.setAttribute("data-position-left-mobile",elementPosition_Left_Mobile.value);
  propertiesEditor(target);})
}
//----------------------

let clip_path_Guide = document.getElementById("clip-path-guide");
let clippathDIv = document.getElementById("clip-path-editor-id");

if (clippathDIv) {
  clip_path_Guide.classList.add("none-mode");
  let clipPathChild = Array.from(clippathDIv.children); // Konversi HTMLCollection menjadi array
  clipPathChild.forEach(element => {
    element.addEventListener("focus", () => {
      clip_path_Guide.classList.remove("none-mode");
    });
    element.addEventListener("blur", () => {
      setTimeout(() => {
        clip_path_Guide.classList.add("none-mode");
      }, 100);
    });
  });
}



let edit_Clip_Path = document.getElementById("clip-path-Input");
if(edit_Clip_Path){
let targetValue = target.getAttribute("data-element-clip-path");
edit_Clip_Path.value = targetValue;
edit_Clip_Path.addEventListener("input", function(){
  
  target.setAttribute("data-element-clip-path",edit_Clip_Path.value);
  propertiesEditor(target);})
}
//----------------------
// Hover //============
let edit_Clip_Path_Hover = document.getElementById("clip-path-Input-hover");
if(edit_Clip_Path_Hover){
let targetValue = target.getAttribute("data-element-clip-path-hover");
edit_Clip_Path_Hover.value = targetValue;
edit_Clip_Path_Hover.addEventListener("input", function(){
  
  target.setAttribute("data-element-clip-path-hover",edit_Clip_Path_Hover.value);
  propertiesEditor(target);})
}
//----------------------
// Active //===========
let edit_Clip_Path_Active = document.getElementById("clip-path-Input-active");
if(edit_Clip_Path_Active){
let targetValue = target.getAttribute("data-element-clip-path-active");
edit_Clip_Path_Active.value = targetValue;
edit_Clip_Path_Active.addEventListener("input", function(){
  
  target.setAttribute("data-element-clip-path-active",edit_Clip_Path_Active.value);
  propertiesEditor(target);})
}
//----------------------
// Tablet //===========
let edit_Clip_Path_Tablet = document.getElementById("clip-path-Input-tablet");
if(edit_Clip_Path_Tablet){
let targetValue = target.getAttribute("data-element-clip-path-tablet");
edit_Clip_Path_Tablet.value = targetValue;
edit_Clip_Path_Tablet.addEventListener("input", function(){
  
  target.setAttribute("data-element-clip-path-tablet",edit_Clip_Path_Tablet.value);
  propertiesEditor(target);})
}
//----------------------
// Mobile //===========
let edit_Clip_Path_Mobile = document.getElementById("clip-path-Input-mobile");
if(edit_Clip_Path_Mobile){
let targetValue = target.getAttribute("data-element-clip-path-mobile");
edit_Clip_Path_Mobile.value = targetValue;
edit_Clip_Path_Mobile.addEventListener("input", function(){
  
  target.setAttribute("data-element-clip-path-mobile",edit_Clip_Path_Mobile.value);
  propertiesEditor(target);})
}
//----------------------





















//=== END ===----------------------------------
}

function mediaUpload(element,target_lazydev){
  const old_container = document.getElementById('js-press-media-fixed-container');
  if(old_container){
    old_container.remove();
  }
  const element_id = element.id;
  const dataupload = element.getAttribute('data-upload')
  const container = document.createElement('section');
  container.classList.add('js-press-media-fixed-container');
  container.id = 'js-press-media-fixed-container';
  container.innerHTML = `
  <div id="js-press-media-wrapper" class="js-press-media-wrapper fadeInSlideUp">
  <div id="js-press-media-head" class="js-press-media-head">
    <button id="upload-media" class="lazyclass18ee0b5e9f51" type="button">
      <icon id="icon-18ee0b5e9f51" class="fa fa-upload" style="padding-right: 1em;"></icon>
      Upload
    </button>
    <select id="select-media-folder" value="all-folder" class="SELECT-18ee08c432e1" selectoption="{,All Folder,selected}">
      <option value="all-folder">All Folder</option>
    </select>
    <input type="search" id="search-media-keyword" class="INPUT-18ee08c4f1d1" placeholder="keyword">
    <div id="js-press-media-close-button" class="DIV-18ee08c647c1" title="Close">
      <i class="fa fa-close"></i>
    </div>
  </div>
  <div id="js-press-media-body" class="js-press-media-body">
    <div id="js-press-upload-div" class="js-press-upload-div none-mode">
      <input type="file" id="upload-media-js" class="INPUT-18ee0bb19ef1">
      <div id="close-upload-head" class="close-upload-head">X</div>
      <label id="label-18ee0bcf7871" class="LABEL-18ee0bcf7871" for="" accesskey="">
        Media Name :
      </label>
      <input type="text" id="js-media-name" readonly="true" class="INPUT-18ee0bb7a571">
      <label id="lazyid18ee0bf8fb61" class="lazyclass18ee0bf8fb61" for="" accesskey="">
        Media Extension :
      </label>
      <input type="text" id="js-media-ext" readonly="true" class="lazyclass18ee0bf63d61">
      <label id="lazyid18ee0bf463e1" class="lazyclass18ee0bf463e1" for="" accesskey="">
        Media Folder :
      </label>
      <select id="select-upload-folder" class="lazyclass18ee0c030d61">
      </select>
      <div id="js-upload-error" class="js-upload-error"></div>
      <button id="upload-media-to-server" class="lazyclass18ee0c42b461" type="button">
        <icon id="icon-18ee0c42b461" class="fa fa-upload" style="padding-right: 1em;"></icon>
        Upload Media
      </button>
    </div>
    <div id="loadmore-div" class="lazyclass18dd05f375d1 none-mode">
      <button id="loadmore-button" class="lazyclass18dd05f375a1" type="button">
        <icon id="icon-18dd05f375a1" class="fas fa-circle-notch" style="padding-right: 1em;"></icon>
        Loadmore
      </button>
    </div>
    <div id="loading-icon" class="DIV-18ee0c7e3f61">
      <i class="fas fa-circle-notch js-press-cb-media-loading-rotating"></i>
    </div>
    <div id="error-div" class="lazyclass18ee0cf845f1 none-mode">
      Error : Something gone wrong
    </div>
  </div>
</div>
`;
  document.body.appendChild(container);
  document.getElementById('close-menu').addEventListener('click', ()=>{
    if(container){
      container.remove();
    }
  })
  const wrapper = document.getElementById('js-press-media-wrapper');
  dragTheElement(container);
  //------------------------------------------//
  let offset = 0;
  let total_data = 0
  const upload_js = document.getElementById('upload-media-js');
  const nameInput = document.getElementById('js-media-name');
  const extentionInput = document.getElementById('js-media-ext');
  const select_folder_media = document.getElementById('select-upload-folder');
  upload_js.addEventListener('change', (event)=>{
    const reader = new FileReader();
      const file = event.target.files[0]; // Mengambil file yang dipilih oleh pengguna
      const fileName = file.name;
      const fileNameParts = fileName.split('.'); 
      const modifiedValue = fileNameParts[0].replace(/ /g, '_');
      const fileExtension = fileName.split('.').pop();
      reader.onload = function(event) {
          dataMedia = event.target.result;
          nameInput.removeAttribute('readonly');
          nameInput.value = modifiedValue;
          extentionInput.removeAttribute('readonly');
          extentionInput.value = fileExtension;      
          // siteFaviconPreview.src = dataURLFavicon;
      };
      reader.readAsDataURL(file);
  });
  const searchinput = document.getElementById('search-media-keyword');
  const selectfolder = document.getElementById('select-media-folder');
  const media_body = document.getElementById('js-press-media-body');
  const loadmore_div = document.getElementById('loadmore-div');
  const loadmore = document.getElementById('loadmore-button');
  const loading_icon = document.getElementById('loading-icon');
  const upload_head = document.getElementById('upload-media');
  const upload_div = document.getElementById('js-press-upload-div');
  const close_upload_head = document.getElementById('close-upload-head');
  const error_upload = document.getElementById('js-upload-error');
  let dataMedia = '';
  nameInput.addEventListener('input', ()=>{
    const modifiedValue = nameInput.value.replace(/ /g, '_');
    nameInput.value = modifiedValue;
})
  loadmore.addEventListener('click',()=>{
    if(total_data > offset){
      const img = document.querySelectorAll('.img-18ee09852ae1');
      img.forEach(image => {
        image.classList.add('none-mode')
      });
      loadmore_div.classList.add('none-mode')
      getData();
    }
  });
  upload_head.addEventListener('click', ()=>{
    upload_div.classList.remove('none-mode')
  })
  close_upload_head.addEventListener('click',()=>{
    upload_div.classList.add('none-mode')
  })
  getData();
  setTimeout(() => {
    wrapper.classList.remove('fadeInSlideUp');
  }, 500);
  //------------------------------------------//
  myFolders.forEach(folder => {
    const option = document.createElement('option');
    option.id = 'media-folder-'+folder.key;
    option.setAttribute('value', folder.key);
    option.textContent = folder.name;
    selectfolder.appendChild(option)
  });
  myFolders.forEach(folder => {
    const option = document.createElement('option');
    option.id = 'media-folder-'+folder.key;
    option.setAttribute('value', folder.key);
    option.textContent = folder.name;
    select_folder_media.appendChild(option)
  });
  //------------------------------------------//
  const closebutton = document.getElementById('js-press-media-close-button');
  closebutton.addEventListener('click',()=>{
    wrapper.classList.add('fadeOutSlideDown');
    setTimeout(() => {
      container.remove();
    }, 500);
  })
  const upload_to_server = document.getElementById('upload-media-to-server');
  upload_to_server.addEventListener('click', upload_new_media)
  //------------------------------------------//
  async function getData() {
    const folder = selectfolder.value;
    const keyword = searchinput.value;
    loading_icon.classList.remove('none-mode');
    try {
        // Mengirim permintaan GET ke endpoint server
        const response = await fetch(`/api/adm/get-media?keyword=${keyword}&dataoffset=${offset}&searchFolder=${folder}`);
        
        // Memeriksa apakah permintaan berhasil (status 200 OK)
        if (!response.ok) {
            throw new Error('something went wrong');
        }
        
        const data = await response.json();
        const img = document.querySelectorAll('.img-18ee09852ae1');
            img.forEach(image => {
              image.classList.remove('none-mode')
            });
        total_data = data.totalCount;
        offset = data.newOffset;
        loading_icon.classList.add('none-mode');
        imgList(data.components)
        if(data.newOffset < data.totalCount){
          loadmore_div.classList.remove('none-mode')
        }
        // console.log(data)

    } catch (error) {
      const error_div = document.getElementById('error-div');
      error_div.classList.remove('none-mode');
      error_div.innerHTML = `${error}`;
        console.error('Error:', error);
    }
} 
function imgList(data_){
  const urlRoot = window.location.origin;
  data_.forEach(data => {
    const img = document.createElement('img');
    img.classList.add('img-18ee09852ae1');
    img.setAttribute('src', `${urlRoot}/`+data.media_url);
    if (loadmore_div && loadmore_div.parentElement) {
      loadmore_div.parentElement.insertBefore(img, loadmore_div);
      img.addEventListener('click',()=>{
        if(element_id === 'media-file-upload-src-img' && dataupload === 'image-src-input'){
          const input_media = document.getElementById(dataupload);
          input_media.value = img.src;
          target_lazydev.setAttribute("src",img.src);
          propertiesEditor(target_lazydev);
        } else if(element_id === 'media-file-upload-bg-img' && dataupload === 'background-url-input'){
          const input_media = document.getElementById(dataupload);
          input_media.value = img.src;
          target_lazydev.setAttribute("data-background-image",img.src);
          propertiesEditor(target_lazydev);
        }
      })
    } else {
      console.error('something went wrong');
    }
});
}
async function upload_new_media(){
  error_upload.innerHTML = "";
  if(dataMedia === ''){
    error_upload.innerHTML = `<p>Error No Image Data</p>`
    return
}
const dataPush = {
    name: nameInput.value,
    extention: extentionInput.value,
    dataImage: dataMedia,
    folder: select_folder_media.value,
};
loading_icon.classList.remove('none-mode');
upload_div.classList.add('none-mode')
loadmore_div.setAttribute('class', 'lazyclass18dd05f375d1 none-mode');
const img = document.querySelectorAll('.img-18ee09852ae1');
            img.forEach(image => {
              image.classList.add('none-mode')
            });
// console.log(dataPush)
 try {
            const response = await fetch('/api/adm/new-media', {
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
            loading_icon.classList.add('none-mode');
            // window.location.reload();
            mediaUpload(element,target_lazydev)
            // Lakukan tindakan lanjutan jika diperlukan setelah data berhasil disimpan
        } catch (error) {
          loading_icon.classList.remove('none-mode');
          upload_div.classList.remove('none-mode')
          error_upload.innerHTML = `<p>${error}</p>`
        }
}

}

export { inputValueOfFormEdit };
