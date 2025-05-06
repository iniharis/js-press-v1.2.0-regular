
import { deleteselectorOption } from './selector.js';
import { layoutConstructor } from './formEditConstructor.js';
import { duplicateSelectorOptin } from './duplicate.js';
import { NewElementContainer } from './newElement.js'
import { moveElements } from './dragElement.js';
import {propertiesEditor} from './ElementBuilder.js';
import {dragTheElement} from './minimize.js';

let currentNav = 'lazydev-Navigator-anim';
// document.getElementById('Edit-Element').addEventListener('click', ()=>{
//     currentNav = 'lazydev-Navigator-anim';
// })
let navLeft = false;
let navTop = false;
function navigatorDrag(){
    let navHead = document.getElementById("navigator-head");
    let navigator = document.getElementById("lazydev-navigator");
    let closenavBar = document.getElementById("navigator-close");
    closenavBar.addEventListener("click", ()=>{
        navigatorOpenButton.addEventListener("click", navigatorAppend);
        gsap.to(navigator,{
            scale: 0.6, y:200, filter: 'blur(10px)', opacity: 0, duration: 0.3
        })
        setTimeout(() => {
            navigator.remove()
        }, 300);
 
    })
    let offsetX, offsetY, isDragging = false;
    dragTheElement(navigator);
//     navHead.addEventListener("dragstart", function(event) {
//         event.dataTransfer.setData("text/plain", ""); // Tidak ada data yang perlu di-set, tapi harus ada setData untuk membuat drag berfungsi di beberapa browser
//         offsetX = event.clientX - navHead.getBoundingClientRect().left;
//         offsetY = event.clientY - navHead.getBoundingClientRect().top;
//         isDragging = true;
//       });
//     // Event ketika elemen sedang didrag
//     document.addEventListener("drag", function(event) {
//     if (isDragging) {
//       navigator.style.left = (event.clientX - offsetX) + "px";
//       navigator.style.top = (event.clientY - offsetY) + "px";
//     }
//   });
//   // Event ketika proses drag berakhir
// document.addEventListener("dragend", function(event) {
//     isDragging = false;
//     navigator.style.left = (event.clientX - offsetX) + "px";
//     navigator.style.top = (event.clientY - offsetY) + "px";
//   });
}

let navigatorOpenButton = document.getElementById("open-navigator");
navigatorOpenButton.addEventListener("click", navigatorAppend);
let navigatorContents = `
<div id="navigator-head">
          <h3>Navigator</h3>
          <button id="navigator-close">Close</button>
        </div>
        <div id="navigator-body">
        </div>
`
function navigatorAppend(){
    
    navigatorOpenButton.removeEventListener("click", navigatorAppend);
    let navigatorPopup = document.createElement("DIV");
    navigatorPopup.id = "lazydev-navigator";
    navigatorPopup.innerHTML = navigatorContents;
    navigatorPopup.classList.add("lazydev-Navigator-anim");
    document.body.appendChild(navigatorPopup);
    if(navLeft !== false){
        navigatorPopup.style.left = `${navLeft}px`;
    }
    if(navTop !== false){
        navigatorPopup.style.top = `${navTop}px`;
    }
    document.getElementById('navigator-close').addEventListener('click',deleteAllHover);
    document.getElementById('navigator-close').addEventListener('click',getNavCurrentPosition);
    setTimeout(() => {
        navigatorPopup.classList.remove("lazydev-Navigator-anim");
        navigatorElements("container","navigator-body");
        navigatorDrag();
    }, 301);

}

function navigatorElements(target,body){
    // Mendapatkan elemen container dan elemen navigator-body
const container = document.getElementById(target);
const navigatorBody = document.getElementById(body);

// Mendapatkan jumlah elemen anak di dalam container
const childCount = container.children.length;

// Menduplikasi elemen-navigator sebanyak elemen anak di dalam container
for (let i = 0; i < childCount; i++) {
    const lazydevValue = container.children[i].getAttribute("lazydev");
    
    let targetChild = false;
    const childWithLazydev = container.children[i].querySelectorAll('[lazydev]');
if (childWithLazydev.length > 0) {
    targetChild = true;
}

if (lazydevValue !== null){
    const random = getRandomNumber();
    const toolsID = `nav-container-tools-${[i]}-${random}`;
    const openID = `open-child-element-${[i]}-${random}`;
    let idChild = container.children[i].id;
    const targetContainer = document.getElementById(idChild);
    let lazyDevAttire = targetContainer.getAttribute('lazydev');
    let identity = container.children[i].getAttribute("data-identity");
  let elementNavigator = document.createElement("div");
  elementNavigator.className = "element-navigator-2";
  elementNavigator.id = `nav-container-${[i]}-${random}`;
  //------------------------------//
  const openChildAttr = targetContainer.getAttribute('data-open-child-navigator');
  let openChildIcon = 'open-child fa fa-chevron-right'
  if(openChildAttr === 'true'){
    openChildIcon = 'open-child fa fa-chevron-down'
  }
  if(identity !== 'Main Container'){
    elementNavigator.setAttribute('class', 'element-navigator-2-child');
    const parentOpenAttr = targetContainer.parentElement.getAttribute('data-open-child-navigator');
    if(parentOpenAttr !== 'true'){
        elementNavigator.style.display = 'none';
    }
  }


elementNavigator.innerHTML = `
<i id="${openID}" class="${openChildIcon}"></i>

      <span id="nav-container-id-${idChild}" class="nav-container-id">
      ${idChild}
      </span>

      <div id="${toolsID}" class="nav-container-tools">
      </div>

      <span class="nav-container-identity">
      ${identity}
      </span>
`;
navigatorBody.appendChild(elementNavigator);

if(lazyDevAttire === currentNav){
    document.getElementById(`${elementNavigator.id}`).scrollIntoView({ behavior: 'smooth' });
    document.getElementById(`nav-container-id-${idChild}`).innerHTML = `<strong style="color: blue;">${idChild}</strong>`
  }
const openChild = document.getElementById(openID);
if(targetChild){
    openChild.addEventListener('click', ()=>{
        const childEL = Array.from(elementNavigator.children);
        const childClass = openChild.getAttribute('class');
        if (childEL.length > 0) {
            const openAttr = targetContainer.getAttribute('data-open-child-navigator');
            if(openAttr === 'true'){
                targetContainer.setAttribute('data-open-child-navigator', 'false');
            } else {
                targetContainer.setAttribute('data-open-child-navigator', 'true');
            }
        }
        if(childClass === 'open-child fa fa-chevron-right'){
            openChild.setAttribute('class', `open-child fa fa-chevron-down`)
            childEL.forEach(child => {
                const classEl = child.getAttribute('class');
                if(classEl === 'element-navigator-2-child'){
                    child.style.display = 'flex';
                }
            }); 
        } else {
            openChild.setAttribute('class', `open-child fa fa-chevron-right`)
            childEL.forEach(child => {
                const classEl = child.getAttribute('class');
                if(classEl === 'element-navigator-2-child'){
                    child.style.display = 'none';
                }
            });
        }
        
    })
} else {
    openChild.setAttribute('class', 'open-child fa fa-ellipsis-h')
}

elementNavigator.addEventListener('mouseenter', () => {
    targetContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.scrollBy(0, -100);
    targetContainer.classList.add('hoverTargetContainer');
});

elementNavigator.addEventListener('mouseleave', () => {
    targetContainer.classList.remove('hoverTargetContainer');
});


// Membuat dan menambahkan elemen div2-navigator
  const div2Navigator = document.getElementById(toolsID);

  const icons = [
    {id : 'move-icon', class : "fa fa-arrows-alt"}, 
    {id : 'add-icon', class: "fa fa-plus"}, 
    {id : 'copy-icon', class: `fa fa-copy`}, 
    {id : 'edit-icon', class: `fa fa-edit`},
    {id : 'delete-icon', class: `fas fa-trash-alt`}, 
    {id : 'view-icon', class: `fa-solid fa-eye`},];
  icons.forEach(iconClass => {
    const icon = document.createElement("i");
    icon.setAttribute('class', `nav-icon ${iconClass.class}`);
    icon.id = `${iconClass.id}`;
    div2Navigator.appendChild(icon);
//Memberikan Event Listener----------------------------------------------------------------------
    //Memberikan Remove Listener
    if(iconClass.id === 'delete-icon'){
        let targetdelete = document.getElementById(idChild);
        icon.addEventListener("click", function(){
            deleteselectorOption(targetdelete,"Navigator");
            let closenavBarButton = document.getElementById("navigator-close");
            closenavBarButton.click();
            deleteAllHover();
            setCurrentNav(targetContainer);
            setTimeout(() => {
                navigatorAppend();
            }, 30);
        })
    }
    //Memberikan Edit Listener
    if(iconClass.id === 'edit-icon'){
        let targetedit = document.getElementById(idChild);
        icon.addEventListener("click", function(){
            layoutConstructor(targetedit,"navigator");
            let closenavBarButton = document.getElementById("navigator-close");
            closenavBarButton.click();
            setCurrentNav(targetContainer);
            setTimeout(() => {
                deleteAllHover();
                targetContainer.scrollIntoView({ behavior: 'smooth' });
            }, 500);
        })
    }
    //Memberikan Copy Listener
    if(iconClass.id === 'copy-icon'){
        let targetCopy = document.getElementById(idChild);
        icon.addEventListener("click", function(){
            duplicateSelectorOptin(targetCopy,"Navigator");
            let closenavBarButton = document.getElementById("navigator-close");
            closenavBarButton.click();
            deleteAllHover();
            setCurrentNav(targetContainer);
            setTimeout(() => {
                navigatorAppend();
            }, 30);
        })
    }
    //Memberikan AddNew Listener
    if(iconClass.id === 'add-icon'){
        let targetaddNew = document.getElementById(idChild);
        let targetidentity = container.children[i].getAttribute("data-identity");
        if(targetidentity === "Wrapper" || targetidentity === "Main Container" || targetidentity === "Child Container")
        {
            icon.addEventListener("click", function(){
                NewElementContainer(targetaddNew,"navigator");
                let closenavBarButton = document.getElementById("navigator-close");
                closenavBarButton.click();
                deleteAllHover();
                setCurrentNav(targetContainer);
            })


        } else {

            icon.classList.add("none-mode");
        }
    }
    //Memberikan Drag Listener
    if(iconClass.id === 'move-icon'){
        let targetaddDrag = document.getElementById(idChild);
        icon.addEventListener("click", function(){
            deleteAllHover();
            moveElements(targetaddDrag);
            setCurrentNav(targetContainer);
        })
    }
    if(iconClass.id === 'view-icon'){
        const dataDisplay = targetContainer.getAttribute('data-display');
        if(dataDisplay === 'none'){
            icon.setAttribute('class', 'nav-icon fa fa-eye-slash');
        }
        icon.addEventListener('click', ()=>{
            setCurrentNav(targetContainer);
            if(icon.getAttribute('class') === 'nav-icon fa-solid fa-eye'){
                icon.setAttribute('class', 'nav-icon fa fa-eye-slash');
                targetContainer.setAttribute('data-display', `none`);
                propertiesEditor(targetContainer);
            }
            else {
                icon.setAttribute('class', 'nav-icon fa-solid fa-eye');
                targetContainer.setAttribute('data-display', `flex`);
                propertiesEditor(targetContainer);
            }
        })
    }
  });
  
navigatorElements(idChild,`nav-container-${[i]}-${random}`);

}
    
}

}


// Fungsi untuk mendapatkan angka acak antara 1 hingga 100 (ganti batas sesuai kebutuhan)
function getRandomNumber() {


    let math = Math.floor(Math.random() * 100000) + 1;

    // Mendapatkan waktu saat ini (dalam milidetik sejak 1 Januari 1970)
  const currentTimeInMilliseconds = new Date().getTime();
  
  // Mendapatkan angka acak berdasarkan waktu saat ini
  const randomNumber = currentTimeInMilliseconds + math;
  const toStringNumber = randomNumber.toString();

  return toStringNumber;
  }
export function deleteAllHover(){
    const lazyDevAtt = document.querySelectorAll('[lazydev]');
        lazyDevAtt.forEach(element => {
            element.classList.remove('hoverTargetContainer')
        });
}
function getNavCurrentPosition(){
    const navigator = document.getElementById('lazydev-navigator');
    if(navigator){
        const rect = navigator.getBoundingClientRect();
        navLeft = rect.left;
        navTop = rect.top;
    }
}
function setCurrentNav(targetContainer){
    let lazyDevAttire = targetContainer.getAttribute('lazydev');
    currentNav = lazyDevAttire;
}
const dataNavigator = [];
export function removeDataNavigator(){
deleteAllHover();
const lazydev = document.querySelectorAll('[lazydev]');
lazydev.forEach(element => {
    const thisElement = element.getAttribute('lazydev');
    let dataOpenNav = '';
    if (element.hasAttribute('data-open-child-navigator')) {
        dataOpenNav = element.getAttribute('data-open-child-navigator');
        element.removeAttribute('data-open-child-navigator');
    }
    const elementSaved = {
        dataOpenChildNav : dataOpenNav,
        lazydev : thisElement,
    }
    dataNavigator.push(elementSaved)
});
}
export function setDataNavigator() {
    for (let i = dataNavigator.length - 1; i >= 0; i--) {
        const element = dataNavigator[i];
        const target = document.querySelector(`[lazydev="${element.lazydev}"]`);
        if (target) {
            if (element.dataOpenChildNav !== '') {
                target.setAttribute('data-open-child-navigator', element.dataOpenChildNav);
            }
        }

        dataNavigator.splice(i, 1);
    }
}
