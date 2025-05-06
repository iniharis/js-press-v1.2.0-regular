import {propertiesEditor} from './ElementBuilder.js';

export const style_list = [];
const Excluded_attr = ['id', 'class', 'Mainclass', 'another-class','lazydev','data-identity'];

let first_open = true;

function delete_style_list_onClose_selector(){
    const closebutton = document.getElementById('ClosePopup-Button');
    if(first_open === true){
        closebutton.addEventListener('click', ()=>{
            style_list.length = 0;
            first_open = true;
        })
    }
    first_open = false;
}

export function copy_style(target) {
    delete_style_list_onClose_selector();
    style_list.length = 0;
    
    for (let i = 0; i < target.attributes.length; i++) {
        const attr = target.attributes[i];
        
        if (!Excluded_attr.includes(attr.name)) {
            style_list.push({ name: attr.name, value: attr.value });
        }
    }
    const oldText = document.getElementById('PopupText').textContent;
    document.getElementById('PopupText').textContent = 'Style Copied';
    setTimeout(() => {
        document.getElementById('PopupText').textContent = oldText;  
    }, 1000);
}

export function paste_style(target) {
    style_list.forEach(item => {
        if (!Excluded_attr.includes(item.name)) {
            if (target.hasAttribute(item.name)) {
                target.setAttribute(item.name, item.value);
            }
        }
    });
    propertiesEditor(target);
    const oldText = document.getElementById('PopupText').textContent;
    document.getElementById('PopupText').textContent = 'Style Paste Succesful';
    setTimeout(() => {
        document.getElementById('PopupText').textContent = oldText;  
    }, 1000);
}
