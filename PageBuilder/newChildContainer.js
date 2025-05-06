import { LazydevDataList } from './main.js';
import { getRandomBackground } from './main.js';
import { ProjectCSSMainTarget } from './main.js';
import { CSSIdCheckAndPush } from './main.js';
import { CSSMainClassCheckAndPush } from './main.js';
import { SeElementtAttributes } from './dataatribut.js';
import { propertiesEditor } from './ElementBuilder.js';

//Menambahkan Evenetlistener fungsi AddNewChildContainer ke Main Container
function mainContainerTarget(event){
    let mainContainerSelectors = document.querySelectorAll('[data-identity="Main Container"]');
    
    mainContainerSelectors.forEach(function(mainContainer){
        mainContainer.addEventListener("click", AddNewChildContainer);
        mainContainer.classList.add('hoverTargetContainer');
    });
    
    let CloseButton = document.getElementById("ClosePopup-Button");
    CloseButton.addEventListener("click", function(){
        let removemainContainerSelectors = document.querySelectorAll('[data-identity="Main Container"]');
        removemainContainerSelectors.forEach(function(mainContainer){
            mainContainer.removeEventListener("click", AddNewChildContainer);
            mainContainer.classList.remove('hoverTargetContainer');
        });
    });
}
export { mainContainerTarget };

function AddNewChildContainer(event){
//Container Yang diklik
let target = event.target;
if (event.target.getAttribute('data-identity') !== "Main Container"){
    target = findingmainContainerParent(target);
} 
 //Nomor Unik
 let LazyDevOperation = LazydevDataList();
 let UniqueNumber = LazyDevOperation;
 let UniqueElementID = CSSIdCheckAndPush(`child-${UniqueNumber}`);
 let UniqueClass = CSSMainClassCheckAndPush(`child-${UniqueNumber}`);
 //Membuat Div Baru
 let NewContainer = document.createElement("div");
 NewContainer.setAttribute("data-identity", "Child Container");
 NewContainer.setAttribute("id", UniqueElementID);
 NewContainer.setAttribute("class", UniqueClass);
 NewContainer.setAttribute("Mainclass", UniqueClass);
 NewContainer.classList.add("ChildContainerAnim");
 NewContainer.setAttribute("lazyDev", UniqueNumber);
 NewContainer.setAttribute("data-change", UniqueNumber);
 
 let NewStyle = document.createElement("Style");
     NewStyle.setAttribute("id", "styleid" + UniqueNumber);
      let getBackground = "rgba(67, 163, 163, 0.53)";//getRandomBackground();
      let newBackground = getBackground;
     let cssTarget = ProjectCSSMainTarget;
     let csschoosen;
     switch (cssTarget) {
         case "CSS ID":
             csschoosen = `#${UniqueElementID}`;
           break;
         case "LazyDev":
             csschoosen = `[lazyDev="${UniqueNumber}"]`;
           break;
         case "Main CSS Class":
             csschoosen = `.${UniqueClass}`;
           break;
         default:
           console.log("Error");
       }
 
 let NewScript = document.createElement("script");
     NewScript.setAttribute("id", "scriptid" + UniqueNumber);
 
 let styleinnerHTML = `
 ${csschoosen} {
     display: flex;
     flex-direction: column;
     flex-grow: 1;
     gap: 1em;
     padding: 1%;
     background-color: ${newBackground};
 }
 `;
 
 NewStyle.innerHTML = styleinnerHTML;
 NewContainer.appendChild(NewStyle);
 NewContainer.appendChild(NewScript);

 // Mendapatkan referensi ke elemen <body>
 target.appendChild(NewContainer);
 
 let lazydev = UniqueNumber;
 //Menjalankan fungsi dibawah untuk Menambah Data Styling Attribute
SeElementtAttributes(lazydev);
propertiesEditor(NewContainer);
   setTimeout(() => {
     NewContainer.classList.remove("ChildContainerAnim");
   }, 800);
   return;
}
export function BuiltInAddNewChildContainer(target){
   //Nomor Unik
   let LazyDevOperation = LazydevDataList();
   let UniqueNumber = LazyDevOperation;
   let UniqueElementID = CSSIdCheckAndPush(`child-${UniqueNumber}`);
   let UniqueClass = CSSMainClassCheckAndPush(`child-${UniqueNumber}`);
   //Membuat Div Baru
   let NewContainer = document.createElement("div");
   NewContainer.setAttribute("data-identity", "Child Container");
   NewContainer.setAttribute("id", UniqueElementID);
   NewContainer.setAttribute("class", UniqueClass);
   NewContainer.setAttribute("Mainclass", UniqueClass);
   NewContainer.classList.add("ChildContainerAnim");
   NewContainer.setAttribute("lazyDev", UniqueNumber);
   NewContainer.setAttribute("data-change", UniqueNumber);
   
   let NewStyle = document.createElement("Style");
       NewStyle.setAttribute("id", "styleid" + UniqueNumber);
        let getBackground = "rgba(67, 163, 163, 0.53)";//getRandomBackground();
        let newBackground = getBackground;
       let cssTarget = ProjectCSSMainTarget;
       let csschoosen;
       switch (cssTarget) {
           case "CSS ID":
               csschoosen = `#${UniqueElementID}`;
             break;
           case "LazyDev":
               csschoosen = `[lazyDev="${UniqueNumber}"]`;
             break;
           case "Main CSS Class":
               csschoosen = `.${UniqueClass}`;
             break;
           default:
             console.log("Error");
         }
   
   let NewScript = document.createElement("script");
       NewScript.setAttribute("id", "scriptid" + UniqueNumber);
   
   let styleinnerHTML = `
   ${csschoosen} {
       display: flex;
       flex-direction: column;
       flex-grow: 1;
       gap: 1em;
       padding: 1%;
       background-color: ${newBackground};
   }
   `;
   
   NewStyle.innerHTML = styleinnerHTML;
   NewContainer.appendChild(NewStyle);
   NewContainer.appendChild(NewScript);
  
   // Mendapatkan referensi ke elemen <body>
   target.appendChild(NewContainer);
   
   let lazydev = UniqueNumber;
   //Menjalankan fungsi dibawah untuk Menambah Data Styling Attribute
  SeElementtAttributes(lazydev);
     setTimeout(() => {
       NewContainer.classList.remove("ChildContainerAnim");
     }, 800);
     return;
  }
//Fungsi untuk Mencari Main Container
function findingmainContainerParent(element) {
    let parent = element.parentElement;
  
    while (parent) {
      if (parent.getAttribute('data-identity') === 'Main Container') {
        return parent;
      }
      parent = parent.parentElement;
    }
  
    return null; // Jika tidak ditemukan elemen parent dengan atribut yang sesuai
  }
  
