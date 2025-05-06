import { LazydevDataList } from './main.js';
import { CSSIdCheckAndPush } from './main.js';
import { CSSMainClassCheckAndPush } from './main.js';
import { propertiesEditor } from './ElementBuilder.js';
import {builtInObject} from './built_in_object.js'
import {AddNewMainContainer} from './newMainContainer.js';
import {BuiltInAddNewChildContainer} from './newChildContainer.js'
import {data_attribute,SeElementtAttributes} from './dataatribut.js';

let numberingContainerIndex = 0;
export function builtIn_Container(){
    document.getElementById('Add-built-in').addEventListener('click', builtInContainer_func);
}

function builtInContainer_func(){
const builtInHTML = `  
<div id="built-in-wrapper" class="built-in-wrapper">

<div id="built-in-head" class="built-in-head">
<div id="built-in-head-title-container" class="built-in-head-title-container">Built-in Container</div>
<div id="built-in-head-Close-container" class="built-in-head-Close-container">
<i class="fa-solid fa-xmark"></i>
</div>
</div>

<div id="built-in-body" class="built-in-body">
</div>


</div>`;
const section = document.createElement('section');
section.id = 'built-in-page-container';
section.setAttribute('class', 'built-in-page-container');
document.body.appendChild(section);
//-----------------------------------------//
gsap.from(section, { opacity: 0, duration: 0.3, ease: "power2.easeIn" });
setTimeout(() => {
    section.innerHTML = builtInHTML;
    gsap.from('#built-in-wrapper', { scaleY: 0, duration: 0.3, ease: "power2.easeIn" });
    addOnBuiltIn();
}, 310);
//-----------------------------------------//
setTimeout(() => {
    const closebutton = document.getElementById('built-in-head-Close-container');
    closebutton.addEventListener('click', closeBuiltinContainer);
}, 310);
//-----------------------------------------//
function closeBuiltinContainer(){
gsap.to('#built-in-wrapper', { scaleY: 0, duration: 0.3, ease: "power2.easeIn" });
gsap.to(section, { opacity: 0, duration: 0.3, delay:0.1, ease: "power2.easeIn" });
setTimeout(() => {
    section.remove();
}, 410);
}
//-----------------------------------------//
}

function addOnBuiltIn(){
    const wrapperBody = document.getElementById('built-in-body');
    //-----------------------------------------//
    builtInObject.forEach(arr => {
        const div = document.createElement('div');
        div.classList.add('built-in-container-example');
        wrapperBody.appendChild(div);
        //-----------------------------------------//
        arr.object.forEach(object => {
            const child = document.createElement('div');
            child.classList.add(object);
            div.appendChild(child);
        });
        //-----------------------------------------//
        if(arr.html !== ''){
            ObjectEventListener(div,arr.html);
        }
    });
}

function ObjectEventListener(element,html){
element.addEventListener('click',()=>{
    //-----------------------------------------//
    AddNewMainContainer();
    const container = document.getElementById('container');
    const lastChild = container.lastChild;
    //-----------------------------------------//
    lastChild.setAttribute('data-background-none', 'true');
    lastChild.setAttribute("data-width-select", "width");
    lastChild.setAttribute("data-width-Parameter", "%");
    lastChild.setAttribute("data-width-value", "100");
    lastChild.setAttribute("data-flex-gap", "0.25"); 
    lastChild.setAttribute("data-padding-check", "true");
    lastChild.setAttribute("data-padding-parameter", "%");
    lastChild.setAttribute("data-padding-top", "0.25");
    lastChild.setAttribute("data-padding-right", "");
    lastChild.setAttribute("data-padding-bottom", "0.25");
    lastChild.setAttribute("data-padding-left", "");
    propertiesEditor(lastChild);
    //-----------------------------------------//
    html.forEach(element => {
        BuiltInAddNewChildContainer(lastChild);
        const thisElement = lastChild.lastChild;
        thisElement.setAttribute("data-background-color-input", "#bdbdbd");
        thisElement.setAttribute("data-background-opacity-input", "0.53");
        thisElement.setAttribute("data-background-color-result", "rgba(189, 189, 189, 0.53)");
        element.forEach(object => {
            thisElement.setAttribute(object.data, object.value);
        });
        propertiesEditor(thisElement);
    });
    //-----------------------------------------//
})
}

export function AppendBuiltInElement(target,object){
const newElement = document.createElement(object.tagname);
const lazydev = object.lazydev;

newElement.setAttribute('lazydev', lazydev);

newElement.innerHTML = object.content;
target.appendChild(newElement);

SeElementtAttributes(lazydev);

const data_attr = object.dataattribute;
data_attr.forEach(data => {
    newElement.setAttribute(data.name,data.value)
});
propertiesEditor(newElement);
}