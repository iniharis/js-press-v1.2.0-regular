import { LazyDev } from './main.js';
import { LazydevDataList } from './main.js';
import { randomBackgroundArray } from './main.js';
import { getRandomBackground } from './main.js';
import { ProjectCSSMainTarget } from './main.js';
import { CSSIdCheckAndPush } from './main.js';
import { CSSMainClassCheckAndPush } from './main.js';
import { SeElementtAttributes } from './dataatribut.js';
import { propertiesEditor } from './ElementBuilder.js';


document.getElementById("Add-Container").addEventListener("click", AddNewMainContainer);
export function AddNewMainContainer(){
//Nomor Unik
let LazyDevOperation = LazydevDataList();
let UniqueNumber = LazyDevOperation;
let UniqueElementID = CSSIdCheckAndPush(`container-${UniqueNumber}`);
let UniqueClass = CSSMainClassCheckAndPush(`container-${UniqueNumber}`);
//Membuat Section Baru
let NewContainer = document.createElement("section");
NewContainer.setAttribute("data-identity", "Main Container");
NewContainer.setAttribute("id", UniqueElementID);
NewContainer.setAttribute("class", UniqueClass);
NewContainer.setAttribute("Mainclass", UniqueClass);
NewContainer.classList.add("sectionAnimation");
NewContainer.setAttribute("lazyDev", UniqueNumber);
NewContainer.setAttribute("data-change", UniqueNumber);



let NewStyle = document.createElement("Style");
    NewStyle.setAttribute("id", "styleid" + UniqueNumber);
    let getBackground = getRandomBackground();
    let newBackground = "rgba(18, 38, 38, 1)";//getBackground;
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
    flex-direction: row;
    gap: 1em;
    overflow-x: hidden;
    background-color: ${newBackground};
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
    padding: 5px;
}
`;
NewStyle.innerHTML = styleinnerHTML;
NewContainer.appendChild(NewStyle);
NewContainer.appendChild(NewScript);
// Mendapatkan referensi ke elemen <div id="container">
let container = document.getElementById("container");
container.appendChild(NewContainer);
window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth"
  });
  setTimeout(() => {
    NewContainer.classList.remove("sectionAnimation");
  }, 800);
//Setup Data Atribut
let lazydev = UniqueNumber;
 //Menjalankan fungsi dibawah untuk Menambah Data Styling Attribute
SeElementtAttributes(lazydev, newBackground);
propertiesEditor(NewContainer);
}