import {closeLoadingScreen,table,dynamicContent,page,receiveMessage,scriptObject} from '/js-dynamic_page/builder_import.js';

let dynamic_target = "";
let data_fields = [];
let dynamicArrays = [];
const pages = [];
let page_redirect = null;
let fristRender = true;

export const addBuilderCLass = () => {
    let dataTarget = '';
    const lazydev = document.querySelectorAll('[lazydev]');
    lazydev.forEach(element => {
      const identity = element.getAttribute('data-identity');
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('click', handleClick);
      element.addEventListener('mouseleave', handleMouseLeave);
    });
    if(fristRender){
        getAllPage();
        closeLoadingScreen();
        AddDynamic_Content()
        if (Object.keys(scriptObject).length !== 0) {
            ExportObject();
        }
        fristRender = false;
        document.getElementById('slicer-save-component').addEventListener('click', exportFunction);
        document.getElementById('builder-options-button').addEventListener('click', BlankToRedirectFunction);
    }
    //----------------------------------//
    function handleMouseEnter(event) {
        this.classList.add('lazydev-selected-hover');
        dataTarget = this;
        var parentElement = this.parentNode;
    
        while (parentElement !== document.body) {
          parentElement.classList.remove('lazydev-selected-hover');
          parentElement = parentElement.parentNode;
        }
      }
      function handleMouseLeave(event) {
        dataTarget.classList.remove('lazydev-selected-hover');
      }
      function handleClick(event) {
        event.stopPropagation();
        dataTarget.classList.remove('lazydev-selected-hover');
        lazydev.forEach(element => {
            element.removeEventListener('mouseenter', handleMouseEnter);
            element.removeEventListener('click', handleClick);
            element.removeEventListener('mouseleave', handleMouseLeave);
          });
          Display_Data_Content(dataTarget)
      }
    //----------------------------------//
  }

const ExportObject = ()=>{
    let field;
    scriptObject.forEach(obj => {
    const element = document.querySelector(`[lazydev="${obj.lazydev}"]`);
    field = getField(obj);
    if(element){
        dynamic_target = element;
        switch (obj.postType) {
                case 'text':
                text();
                break;
                case 'textContent':
                    textContent();
                break;
                case 'href':
                    href();
                break;
                case 'onClick':
                    onClick();
                break;
                case 'changetitle':
                    changetitle();
                break;
                case 'changeplaceholder':
                    changeplaceholder();
                break;
                case 'changeval':
                    changeval();
                break;
                case 'changeBgImage':
                    changeBgImage();
                break;
                case 'changeBgSrc':
                    changeBgSrc();
                break;
                case 'changeBgColor':
                    changeBgColor();
                break;
                case 'changeBorderColor':
                    changeBorderColor();
                break;
                case 'changeFontColor':
                    changeFontColor();
                break;
                case 'truedisplayNone':
                    truedisplayNone();
                break;
                case 'falsedisplayNone':
                    falsedisplayNone();
                break;

        
            default:
                break;
        }
    }
    });
    function text(){
        let New_content = field.value.replace(/<\/?p>/g, '');
        let old_content = dynamic_target.innerHTML;
        dynamic_target.innerHTML = `${New_content}`; 
        dynamic_target.setAttribute('data-dynamic-post', `${field.name}`);
        dynamic_target.setAttribute('data-dynamic-post-type', 'text');
        dynamic_target.setAttribute('data-dynamic-post-value', New_content);
        dynamic_target.setAttribute('data-dynamic-post-old', old_content);
    }
    function textContent(){
        let old_content = dynamic_target.textContent;
        dynamic_target.textContent = `${field.value}`; 
        dynamic_target.setAttribute('data-dynamic-post', `${field.name}`);
        dynamic_target.setAttribute('data-dynamic-post-type', 'textContent');
        dynamic_target.setAttribute('data-dynamic-post-value', field.value);
        dynamic_target.setAttribute('data-dynamic-post-old', old_content);
        document.getElementById('cancel-this-target').click();
    }
    function href(){
        dynamic_target.setAttribute('data-dynamic-post', `${field.name}`)
        dynamic_target.setAttribute('data-dynamic-post-type', 'href')
        dynamic_target.setAttribute('data-dynamic-post-value', field.value);
        dynamic_target.setAttribute('data-dynamic-post-old', '');
    }
    function onClick(){
        dynamic_target.setAttribute('data-dynamic-post', `${field.name}`)
        dynamic_target.setAttribute('data-dynamic-post-type', 'onClick')
        dynamic_target.setAttribute('data-dynamic-post-value', `window.location.href='${field.value}';`);
        dynamic_target.setAttribute('data-dynamic-post-old', '');
    }
    function changetitle(){
        let old_content = '';
        if(dynamic_target.hasAttribute('title')){
            old_content = dynamic_target.getAttribute('title')
        }
        dynamic_target.setAttribute('title',field.value);
        dynamic_target.setAttribute('data-dynamic-post', `${field.name}`)
        dynamic_target.setAttribute('data-dynamic-post-type', 'changetitle')
        dynamic_target.setAttribute('data-dynamic-post-value', field.value);
        dynamic_target.setAttribute('data-dynamic-post-old', old_content);
    }
    function changeplaceholder(){
        let old_content = '';
        if(dynamic_target.hasAttribute('placeholder')){
            old_content = dynamic_target.getAttribute('placeholder')
        }
        dynamic_target.setAttribute('placeholder',field.value);
        dynamic_target.setAttribute('data-dynamic-post', `${field.name}`)
        dynamic_target.setAttribute('data-dynamic-post-type', 'changeplaceholder')
        dynamic_target.setAttribute('data-dynamic-post-value', field.value);
        dynamic_target.setAttribute('data-dynamic-post-old', old_content);
    }
    function changeval(){
        let old_content = '';
        if(dynamic_target.hasAttribute('value')){
            old_content = dynamic_target.getAttribute('value')
        }
        dynamic_target.setAttribute('value',field.value);
        dynamic_target.setAttribute('data-dynamic-post', `${field.name}`)
        dynamic_target.setAttribute('data-dynamic-post-type', 'changeval')
        dynamic_target.setAttribute('data-dynamic-post-value', field.value);
        dynamic_target.setAttribute('data-dynamic-post-old', old_content);
    }
    function changeBgImage(){
        let old_content = '';
        if(dynamic_target.hasAttribute('style')){
            old_content = dynamic_target.getAttribute('style')
        }
        dynamic_target.setAttribute('style', `background: url('${field.value}'); background-size: cover;`);
        dynamic_target.setAttribute('data-dynamic-post', `${field.name}`)
        dynamic_target.setAttribute('data-dynamic-post-type', 'changeBgImage')
        dynamic_target.setAttribute('data-dynamic-post-value', field.value);
        dynamic_target.setAttribute('data-dynamic-post-old', old_content);
    }
    function changeBgSrc(){
        let old_content = '';
        if(dynamic_target.hasAttribute('src')){
            old_content = dynamic_target.getAttribute('src')
        }
        dynamic_target.setAttribute('src',field.value);
        dynamic_target.setAttribute('data-dynamic-post', `${field.name}`)
        dynamic_target.setAttribute('data-dynamic-post-type', 'changeBgSrc')
        dynamic_target.setAttribute('data-dynamic-post-value', field.value);
        dynamic_target.setAttribute('data-dynamic-post-old', old_content);
    }
    function changeBgColor(){
        let old_content = '';
        if(dynamic_target.hasAttribute('style')){
            old_content = dynamic_target.getAttribute('style')
        }
        dynamic_target.setAttribute('style', `background-color: ${field.value} !important;`);
        dynamic_target.setAttribute('data-dynamic-post', `${field.name}`)
        dynamic_target.setAttribute('data-dynamic-post-type', 'changeBgColor')
        dynamic_target.setAttribute('data-dynamic-post-value', field.value);
        dynamic_target.setAttribute('data-dynamic-post-old', old_content);
    }
    function changeBorderColor(){
        let old_content = '';
        if(dynamic_target.hasAttribute('style')){
            old_content = dynamic_target.getAttribute('style')
        }
        dynamic_target.setAttribute('style', `border-color: ${field.value} !important;`);
        dynamic_target.setAttribute('data-dynamic-post', `${field.name}`)
        dynamic_target.setAttribute('data-dynamic-post-type', 'changeBorderColor')
        dynamic_target.setAttribute('data-dynamic-post-value', field.value);
        dynamic_target.setAttribute('data-dynamic-post-old', old_content);
    }
    function changeFontColor(){
        let old_content = '';
            if(dynamic_target.hasAttribute('style')){
                old_content = dynamic_target.getAttribute('style')
            }
        dynamic_target.setAttribute('style', `color: ${field.value} !important;`);
        dynamic_target.setAttribute('data-dynamic-post', `${field.name}`)
        dynamic_target.setAttribute('data-dynamic-post-type', 'changeFontColor')
        dynamic_target.setAttribute('data-dynamic-post-value', field.value);
        dynamic_target.setAttribute('data-dynamic-post-old', old_content);
    }
    function truedisplayNone(){
        dynamic_target.setAttribute('data-dynamic-post', `${field.name}`)
        dynamic_target.setAttribute('data-dynamic-post-type', 'truedisplayNone')
        dynamic_target.setAttribute('data-dynamic-post-value', field.value);
    }
    function falsedisplayNone(){
        dynamic_target.setAttribute('data-dynamic-post', `${field.name}`)
        dynamic_target.setAttribute('data-dynamic-post-type', 'falsedisplayNone')
        dynamic_target.setAttribute('data-dynamic-post-value', field.value);
    }
    function getField(object){
        let field = {};
        data_fields.forEach(fld => {
            if(object.name === fld.name){
                field = fld;
            }
        });
        return field
    }
}

//================================================//
function Display_Data_Content(target){
    dynamic_target = target;
    let MCPopup;
    appendToContainer();
    //-------------------------------------------//
    function appendToContainer(){
        let DynamicHTML = `
    <div id="cancel-this-target" class="drags" title="Cancel">
    <p>Cancel</p>
    </div>
    `
        MCPopup = document.createElement("SECTION")
        MCPopup.setAttribute("id","drag-container");
        let x = 40;
        let y = 40;
        MCPopup.style.left = `${x}%`;
        MCPopup.style.top = `${y}%`;
        
        MCPopup.innerHTML = DynamicHTML;
        document.body.appendChild(MCPopup);
    
        let cancelButton = document.getElementById("cancel-this-target");
        cancelButton.addEventListener("click", ()=>
        {
            MCPopup.remove();
            dynamic_target = '';
            addBuilderCLass();
        })
        appendtoMCPopup();
       }
    function appendtoMCPopup(){
    let cancelButton = document.getElementById("cancel-this-target");
    const identity = target.getAttribute('data-identity');
    const tagname = target.tagname;
    data_fields.forEach(field => {
        if(!field.customFunc){
            return
        }
        field.customFunc.forEach(cf => {
            if(cf.name === identity){
                const new_menu = document.createElement('div');
                new_menu.classList.add('drags');
                new_menu.classList.add('lazydev-new_menu');
                new_menu.setAttribute('title', field.name);
                new_menu.innerHTML = `<p>${field.name}</p>`;
                cancelButton.parentElement.insertBefore(new_menu,cancelButton)
                new_menu.addEventListener('click',()=>{
                    delete_new_menu()
                    cf.func();
                    // field.customFunc.forEach(element => {
                    //     element.func();
                    // });
                })
            }
        });
    });
    function delete_new_menu(){
        const allmenu = document.querySelectorAll('.lazydev-new_menu');
                allmenu.forEach(menu => {
                menu.remove();
                });
    }
    }
    //-------------------------------------------//
    }
//================================================//
//--------------------------------------------//
function AddDynamic_Content(){
    data_fields = [];
    let table_choosen = table;
    let data_title = 'Lorem Ipsum';
    if(table_choosen.data.title !== '' && table_choosen.data.title !== null){
        data_title = table_choosen.data.title
    }
    const title = {type : 'title',name: 'title', value: data_title, customFunc : [
        {
            name : 'Header Text',
            func : ()=>{
                text(title,'Header Text')
                }
        }]};
    data_fields.push(title)
    let data_url = null;
    if(table_choosen.data.url !== null){
        data_url = table_choosen.data.url;
        const url = {type : 'url',name: 'url', value: data_url, identity : ['Header Text','Content Text','List','Submit','Wrapper','Child Container','Main Container','Image']};
        data_fields.push(url)
    }
    const allField = table_choosen.custom_fields;
    allField.forEach(field => {
        if (field.type === "Text") {
            const dataField_value = data_choosen_checkVal(field);
            const newField = {
                type: 'Text',
                name: field.name,
                value: dataField_value,
                customFunc: [
                    {
                        name : 'Header Text',
                        func : ()=>{
                            text(newField,'Header Text')
                            changetitle(newField,'A Title');
                            }
                    },
                    {
                        name : 'Content Text',
                        func : ()=>{
                            let tagname = dynamic_target.tagName;
                            if(tagname === 'A'){
                                href(newField,'Link');
                                text(newField,'Content Text');
                            } else {
                                text(newField,'Content Text');
                            }
                            }
                    },
                    {
                        name : 'Formfield',
                        func : ()=>{
                            let typeName = dynamic_target.getAttribute('type').toLowerCase();
                            if(typeName === 'text' || typeName === 'search' || typeName === 'email' || typeName === 'password' || typeName === 'url' ){
                                changeplaceholder(newField,'As Placeholder');
                                changeval(newField,'As Value');
                            } else {
                                noChange('There is nothing we can do');
                            }
                            }
                    },
                    {
                        name : 'Submit',
                        func : ()=>{
                            onClick(newField,'onClick Link Event');
                            textContent(newField,'Content Text');
                            }
                    },
                    {
                        name : 'Wrapper',
                        func : ()=>{
                            onClick(newField,'onClick Link Event');
                            changetitle(newField,'A Title');
                            }
                    },
                    {
                        name : 'Child Container',
                        func : ()=>{
                            onClick(newField,'onClick Link Event');
                            changetitle(newField,'A Title');
                            }
                    },
                    {
                        name : 'Main Container',
                        func : ()=>{
                            onClick(newField,'onClick Link Event');
                            changetitle(newField,'A Title');
                            }
                    },
                    {
                        name : 'Image',
                        func : ()=>{
                            onClick(newField,'onClick Link Event');
                            changetitle(newField,'A Title');
                            }
                    },

                ],

            };
            data_fields.push(newField);
        }
        else if (field.type === "Number") {
            const dataField_value = data_choosen_checkVal(field);
            const newField = {
                type: 'Number',
                name: field.name,
                value: dataField_value,
                customFunc: [
                    {
                        name : 'Header Text',
                        func : ()=>{
                            text(newField,'Header Text')
                            }
                    },
                    {
                        name : 'Content Text',
                        func : ()=>{
                            text(newField,'Content Text');
                            }
                    },
                    {
                        name : 'Formfield',
                        func : ()=>{
                            let typeName = dynamic_target.getAttribute('type').toLowerCase();
                            if(typeName === 'number' ){
                                changeplaceholder(newField,'As Placeholder');
                                changeval(newField,'As Value');
                            } else {
                                noChange('There is nothing we can do');
                            }
                            }
                    },
                    {
                        name : 'Submit',
                        func : ()=>{
                            textContent(newField,'Content Text');
                            }
                    },

                ],
            };
            data_fields.push(newField);
        }
        else if (field.type === "Email") {
            const dataField_value = data_choosen_checkVal(field);
            const newField = {
                type: 'Email',
                name: field.name,
                value: dataField_value,
                customFunc: [
                    {
                        name : 'Header Text',
                        func : ()=>{
                            text(newField,'Header Text')
                            }
                    },
                    {
                        name : 'Content Text',
                        func : ()=>{
                            text(newField,'Content Text');
                            }
                    },
                    {
                        name : 'Formfield',
                        func : ()=>{
                            let typeName = dynamic_target.getAttribute('type').toLowerCase();
                            if(typeName === 'email' || typeName === 'text' ){
                                changeplaceholder(newField,'As Placeholder');
                                changeval(newField,'As Value');
                            } else {
                                noChange('There is nothing we can do');
                            }
                            }
                    },

                ],
            };
            data_fields.push(newField);
        }
        else if (field.type === "Select") {
            const dataField_value = data_choosen_checkVal(field);
            const newField = {
                type: 'Select',
                name: field.name,
                value: dataField_value,
                customFunc: [
                    {
                        name : 'Header Text',
                        func : ()=>{
                            text(newField,'Header Text')
                            }
                    },
                    {
                        name : 'Content Text',
                        func : ()=>{
                            text(newField,'Content Text');
                            }
                    },
                    {
                        name : 'Formfield',
                        func : ()=>{
                            let typeName = dynamic_target.getAttribute('type').toLowerCase();
                            let tagname = dynamic_target.tagName.toLowerCase();
                            if(typeName === 'email' || typeName === 'text' ){
                                changeval(newField,'As Value');
                            } else if(tagname === 'select'){
                                changeval(newField,'As Value');
                            } else {
                                noChange('There is nothing we can do');
                            }
                            }
                    },

                ],
            };
            data_fields.push(newField);
        }
        else if (field.type === "Password") {
            const dataField_value = data_choosen_checkVal(field);
            const newField = {
                type: 'Password',
                name: field.name,
                value: dataField_value,
                customFunc: [
                    {
                        name : 'Formfield',
                        func : ()=>{
                            let typeName = dynamic_target.getAttribute('type').toLowerCase();
                            if(typeName === 'password'){
                                changeval(newField,'As Value');
                            } else {
                                noChange('There is nothing we can do');
                            }
                            }
                    },

                ],
            };
            data_fields.push(newField);
        }
        else if (field.type === "Checkbox") {
            const dataField_value = data_choosen_checkVal(field);
            const newField = {
                type: 'Checkbox',
                name: field.name,
                value: dataField_value,
                customFunc: [
                    {
                        name : 'Header Text',
                        func : ()=>{
                            falsedisplayNone(newField,'Hide when value is false')
                            truedisplayNone(newField,'Hide when value is true')
                            }
                    },
                    {
                        name : 'Content Text',
                        func : ()=>{
                            falsedisplayNone(newField,'Hide when value is false')
                            truedisplayNone(newField,'Hide when value is true')
                            }
                    },
                    {
                        name : 'Submit',
                        func : ()=>{
                            falsedisplayNone(newField,'Hide when value is false')
                            truedisplayNone(newField,'Hide when value is true')
                            }
                    },
                    {
                        name : 'Wrapper',
                        func : ()=>{
                            falsedisplayNone(newField,'Hide when value is false')
                            truedisplayNone(newField,'Hide when value is true')
                            }
                    },
                    {
                        name : 'Child Container',
                        func : ()=>{
                            falsedisplayNone(newField,'Hide when value is false')
                            truedisplayNone(newField,'Hide when value is true')
                            }
                    },
                    {
                        name : 'Main Container',
                        func : ()=>{
                            falsedisplayNone(newField,'Hide when value is false')
                            truedisplayNone(newField,'Hide when value is true')
                            }
                    },
                    {
                        name : 'Image',
                        func : ()=>{
                            falsedisplayNone(newField,'Hide when value is false')
                            truedisplayNone(newField,'Hide when value is true')
                            }
                    },

                ],
            };
            data_fields.push(newField);
        }
        else if (field.type === "Media") {
            const dataField_value = data_choosen_checkVal(field);
            const newField = {
                type: 'Media',
                name: field.name,
                value: dataField_value,
                customFunc: [
                    {
                        name : 'Content Text',
                        func : ()=>{
                            let tagname = dynamic_target.tagName;
                            if(tagname === 'A'){
                                href(newField,'Link');
                            } else {
                                noChange('There is nothing we can do');
                            }
                            }
                    },
                    {
                        name : 'Formfield',
                        func : ()=>{
                            let typeName = dynamic_target.getAttribute('type').toLowerCase();
                            if(typeName === 'file'|| typeName === 'url' ){
                                changeval(newField,'As Value');
                            } else {
                                noChange('There is nothing we can do');
                            }
                            }
                    },
                    {
                        name : 'Submit',
                        func : ()=>{
                            onClick(newField,'onClick Link Event');
                            }
                    },
                    {
                        name : 'Child Container',
                        func : ()=>{
                            onClick(newField,'onClick Link Event');
                            changeBgImage(newField,'Background Image');
                            }
                    },
                    {
                        name : 'Wrapper',
                        func : ()=>{
                            onClick(newField,'onClick Link Event');
                            changeBgImage(newField,'Background Image');
                            }
                    },
                    {
                        name : 'Main Container',
                        func : ()=>{
                            onClick(newField,'onClick Link Event');
                            changeBgImage(newField,'Background Image');
                            }
                    },
                    {
                        name : 'Image',
                        func : ()=>{
                            onClick(newField,'onClick Link Event');
                            changeBgSrc(newField,'Image Source');
                            }
                    },

                ],
            };
            data_fields.push(newField);
        }
        else if (field.type === "Textarea") {
            const dataField_value = data_choosen_checkVal(field);
            const newField = {
                type: 'Textarea',
                name: field.name,
                value: dataField_value,
                customFunc: [
                    {
                        name : 'Content Text',
                        func : ()=>{
                            text(newField,'Content Text');
                            }
                    },
                    {
                        name : 'Formfield',
                        func : ()=>{
                            let typeName = dynamic_target.getAttribute('type').toLowerCase();
                            if(typeName === 'text' || typeName === 'search' || typeName === 'email' || typeName === 'password' || typeName === 'url' ){
                                changeplaceholder(newField,'As Placeholder');
                                changeval(newField,'As Value');
                            } else {
                                noChange('There is nothing we can do');
                            }
                            }
                    },

                ],
            };
            data_fields.push(newField);
        }
        else if (field.type === "Color") {
            const dataField_value = data_choosen_checkVal(field);
            const newField = {
                type: 'Color',
                name: field.name,
                value: dataField_value,
                customFunc: [
                    {
                        name : 'Header Text',
                        func : ()=>{
                            changeBgColor(newField,'Background Color')
                            changeBorderColor(newField,'Border Color')
                            changeFontColor(newField,'Font Color')
                            }
                    },
                    {
                        name : 'Content Text',
                        func : ()=>{
                            changeBgColor(newField,'Background Color')
                            changeBorderColor(newField,'Border Color')
                            changeFontColor(newField,'Font Color')
                            }
                    },
                    {
                        name : 'Submit',
                        func : ()=>{
                            changeBgColor(newField,'Background Color')
                            changeBorderColor(newField,'Border Color')
                            changeFontColor(newField,'Font Color')
                            }
                    },
                    {
                        name : 'Wrapper',
                        func : ()=>{
                            changeBgColor(newField,'Background Color')
                            changeBorderColor(newField,'Border Color')
                            changeFontColor(newField,'Font Color')
                            }
                    },
                    {
                        name : 'Child Container',
                        func : ()=>{
                            changeBgColor(newField,'Background Color')
                            changeBorderColor(newField,'Border Color')
                            changeFontColor(newField,'Font Color')
                            }
                    },
                    {
                        name : 'Main Container',
                        func : ()=>{
                            changeBgColor(newField,'Background Color')
                            changeBorderColor(newField,'Border Color')
                            changeFontColor(newField,'Font Color')
                            }
                    },
                    {
                        name : 'Image',
                        func : ()=>{
                            changeBgColor(newField,'Background Color')
                            changeBorderColor(newField,'Border Color')
                            }
                    },

                ],
            };
            data_fields.push(newField);
        }
        else if (field.type === "WYSIWYG") {
            const dataField_value = data_choosen_checkVal(field);
            const newField = {
                type: 'WYSIWYG',
                name: field.name,
                value: dataField_value,
                customFunc: [
                    {
                        name : 'Header Text',
                        func : ()=>{
                            text(newField,'Header Text')
                            }
                    },
                    {
                        name : 'Content Text',
                        func : ()=>{
                            text(newField,'Content Text')
                            }
                    },
                ],
            };
            data_fields.push(newField);
        }
         else {
            
        }
    });
    function text(field,text){
        let cancelButton = document.getElementById("cancel-this-target");
        const new_menu = document.createElement('div');
        new_menu.classList.add('drags');
        new_menu.classList.add('lazydev-new_menu');
        new_menu.setAttribute('title', field.name);
        new_menu.innerHTML = `<p>set ${field.name} for ${text}</p>`;
        cancelButton.parentElement.insertBefore(new_menu,cancelButton)
        new_menu.addEventListener('click', ()=>{
        let New_content = field.value.replace(/<\/?p>/g, '');
        let old_content = dynamic_target.innerHTML;
        dynamic_target.innerHTML = `${New_content}`; 
        dynamic_target.setAttribute('data-dynamic-post', `${field.name}`);
        dynamic_target.setAttribute('data-dynamic-post-type', 'text');
        dynamic_target.setAttribute('data-dynamic-post-value', New_content);
        dynamic_target.setAttribute('data-dynamic-post-old', old_content);
        document.getElementById('cancel-this-target').click();
        })
    }
    function textContent(field,text){
        let cancelButton = document.getElementById("cancel-this-target");
        const new_menu = document.createElement('div');
        new_menu.classList.add('drags');
        new_menu.classList.add('lazydev-new_menu');
        new_menu.setAttribute('title', field.name);
        new_menu.innerHTML = `<p>set ${field.name} for ${text}</p>`;
        cancelButton.parentElement.insertBefore(new_menu,cancelButton)
        console.log(field.name)
        new_menu.addEventListener('click', ()=>{
        let old_content = dynamic_target.textContent;
        dynamic_target.textContent = `${field.value}`; 
        dynamic_target.setAttribute('data-dynamic-post', `${field.name}`);
        dynamic_target.setAttribute('data-dynamic-post-type', 'textContent');
        dynamic_target.setAttribute('data-dynamic-post-value', field.value);
        dynamic_target.setAttribute('data-dynamic-post-old', old_content);
        document.getElementById('cancel-this-target').click();
        })
    }
    function href(field,text){
        let cancelButton = document.getElementById("cancel-this-target");
        const new_menu = document.createElement('div');
        new_menu.classList.add('drags');
        new_menu.classList.add('lazydev-new_menu');
        new_menu.setAttribute('title', field.name);
        new_menu.innerHTML = `<p>set ${field.name} for ${text}</p>`;
        cancelButton.parentElement.insertBefore(new_menu,cancelButton)
        new_menu.addEventListener('click', ()=>{
        dynamic_target.setAttribute('data-dynamic-post', `${field.name}`)
        dynamic_target.setAttribute('data-dynamic-post-type', 'href')
        dynamic_target.setAttribute('data-dynamic-post-value', field.value);
        dynamic_target.setAttribute('data-dynamic-post-old', '');
        document.getElementById('cancel-this-target').click();
        })
    }
    function onClick(field,text){
        let cancelButton = document.getElementById("cancel-this-target");
        const new_menu = document.createElement('div');
        new_menu.classList.add('drags');
        new_menu.classList.add('lazydev-new_menu');
        new_menu.setAttribute('title', field.name);
        new_menu.innerHTML = `<p>set ${field.name} for ${text}</p>`;
        cancelButton.parentElement.insertBefore(new_menu,cancelButton)
        new_menu.addEventListener('click', ()=>{
        dynamic_target.setAttribute('data-dynamic-post', `${field.name}`)
        dynamic_target.setAttribute('data-dynamic-post-type', 'onClick')
        dynamic_target.setAttribute('data-dynamic-post-value', `window.location.href='${field.value}';`);
        dynamic_target.setAttribute('data-dynamic-post-old', '');
        document.getElementById('cancel-this-target').click();
        })
    }
    function changetitle(field,text){
        let cancelButton = document.getElementById("cancel-this-target");
        const new_menu = document.createElement('div');
        new_menu.classList.add('drags');
        new_menu.classList.add('lazydev-new_menu');
        new_menu.setAttribute('title', field.name);
        new_menu.innerHTML = `<p>set ${field.name} for ${text}</p>`;
        cancelButton.parentElement.insertBefore(new_menu,cancelButton)
        new_menu.addEventListener('click', ()=>{
        let old_content = '';
        if(dynamic_target.hasAttribute('title')){
            old_content = dynamic_target.getAttribute('title')
        }
        dynamic_target.setAttribute('title',field.value);
        dynamic_target.setAttribute('data-dynamic-post', `${field.name}`)
        dynamic_target.setAttribute('data-dynamic-post-type', 'changetitle')
        dynamic_target.setAttribute('data-dynamic-post-value', field.value);
        dynamic_target.setAttribute('data-dynamic-post-old', old_content);
        document.getElementById('cancel-this-target').click();
        })
    }
    function changeplaceholder(field,text){
        let cancelButton = document.getElementById("cancel-this-target");
        const new_menu = document.createElement('div');
        new_menu.classList.add('drags');
        new_menu.classList.add('lazydev-new_menu');
        new_menu.setAttribute('title', field.name);
        new_menu.innerHTML = `<p>set ${field.name} for ${text}</p>`;
        cancelButton.parentElement.insertBefore(new_menu,cancelButton)
        new_menu.addEventListener('click', ()=>{
        let old_content = '';
        if(dynamic_target.hasAttribute('placeholder')){
            old_content = dynamic_target.getAttribute('placeholder')
        }
        dynamic_target.setAttribute('placeholder',field.value);
        dynamic_target.setAttribute('data-dynamic-post', `${field.name}`)
        dynamic_target.setAttribute('data-dynamic-post-type', 'changeplaceholder')
        dynamic_target.setAttribute('data-dynamic-post-value', field.value);
        dynamic_target.setAttribute('data-dynamic-post-old', old_content);
        document.getElementById('cancel-this-target').click();
        })
    }
    function changeval(field,text){
        let cancelButton = document.getElementById("cancel-this-target");
        const new_menu = document.createElement('div');
        new_menu.classList.add('drags');
        new_menu.classList.add('lazydev-new_menu');
        new_menu.setAttribute('title', field.name);
        new_menu.innerHTML = `<p>set ${field.name} for ${text}</p>`;
        cancelButton.parentElement.insertBefore(new_menu,cancelButton)
        new_menu.addEventListener('click', ()=>{
        let old_content = '';
        if(dynamic_target.hasAttribute('value')){
            old_content = dynamic_target.getAttribute('value')
        }
        dynamic_target.setAttribute('value',field.value);
        dynamic_target.setAttribute('data-dynamic-post', `${field.name}`)
        dynamic_target.setAttribute('data-dynamic-post-type', 'changeval')
        dynamic_target.setAttribute('data-dynamic-post-value', field.value);
        dynamic_target.setAttribute('data-dynamic-post-old', old_content);
        document.getElementById('cancel-this-target').click();
        })
    }
    function changeBgImage(field,text){
        let cancelButton = document.getElementById("cancel-this-target");
        const new_menu = document.createElement('div');
        new_menu.classList.add('drags');
        new_menu.classList.add('lazydev-new_menu');
        new_menu.setAttribute('title', field.name);
        new_menu.innerHTML = `<p>set ${field.name} for ${text}</p>`;
        cancelButton.parentElement.insertBefore(new_menu,cancelButton)
        new_menu.addEventListener('click', ()=>{
        let old_content = '';
        if(dynamic_target.hasAttribute('style')){
            old_content = dynamic_target.getAttribute('style')
        }
        dynamic_target.setAttribute('style', `background: url('${field.value}'); background-size: cover;`);
        dynamic_target.setAttribute('data-dynamic-post', `${field.name}`)
        dynamic_target.setAttribute('data-dynamic-post-type', 'changeBgImage')
        dynamic_target.setAttribute('data-dynamic-post-value', field.value);
        dynamic_target.setAttribute('data-dynamic-post-old', old_content);
        document.getElementById('cancel-this-target').click();
        })
    }
    function changeBgSrc(field,text){
        let cancelButton = document.getElementById("cancel-this-target");
        const new_menu = document.createElement('div');
        new_menu.classList.add('drags');
        new_menu.classList.add('lazydev-new_menu');
        new_menu.setAttribute('title', field.name);
        new_menu.innerHTML = `<p>set ${field.name} for ${text}</p>`;
        cancelButton.parentElement.insertBefore(new_menu,cancelButton)
        new_menu.addEventListener('click', ()=>{
        let old_content = '';
        if(dynamic_target.hasAttribute('src')){
            old_content = dynamic_target.getAttribute('src')
        }
        dynamic_target.setAttribute('src',field.value);
        dynamic_target.setAttribute('data-dynamic-post', `${field.name}`)
        dynamic_target.setAttribute('data-dynamic-post-type', 'changeBgSrc')
        dynamic_target.setAttribute('data-dynamic-post-value', field.value);
        dynamic_target.setAttribute('data-dynamic-post-old', old_content);
        document.getElementById('cancel-this-target').click();
        })
    }
    function changeBgColor(field,text){
        let cancelButton = document.getElementById("cancel-this-target");
        const new_menu = document.createElement('div');
        new_menu.classList.add('drags');
        new_menu.classList.add('lazydev-new_menu');
        new_menu.setAttribute('title', field.name);
        new_menu.innerHTML = `<p>set ${field.name} for ${text}</p>`;
        cancelButton.parentElement.insertBefore(new_menu,cancelButton)
        new_menu.addEventListener('click', ()=>{
        let old_content = '';
        if(dynamic_target.hasAttribute('style')){
            old_content = dynamic_target.getAttribute('style')
        }
        dynamic_target.setAttribute('style', `background-color: ${field.value} !important;`);
        dynamic_target.setAttribute('data-dynamic-post', `${field.name}`)
        dynamic_target.setAttribute('data-dynamic-post-type', 'changeBgColor')
        dynamic_target.setAttribute('data-dynamic-post-value', field.value);
        dynamic_target.setAttribute('data-dynamic-post-old', old_content);
        document.getElementById('cancel-this-target').click();
        })
    }
    function changeBorderColor(field,text){
        let cancelButton = document.getElementById("cancel-this-target");
        const new_menu = document.createElement('div');
        new_menu.classList.add('drags');
        new_menu.classList.add('lazydev-new_menu');
        new_menu.setAttribute('title', field.name);
        new_menu.innerHTML = `<p>set ${field.name} for ${text}</p>`;
        cancelButton.parentElement.insertBefore(new_menu,cancelButton)
        new_menu.addEventListener('click', ()=>{
        let old_content = '';
        if(dynamic_target.hasAttribute('style')){
            old_content = dynamic_target.getAttribute('style')
        }
        dynamic_target.setAttribute('style', `border-color: ${field.value} !important;`);
        dynamic_target.setAttribute('data-dynamic-post', `${field.name}`)
        dynamic_target.setAttribute('data-dynamic-post-type', 'changeBorderColor')
        dynamic_target.setAttribute('data-dynamic-post-value', field.value);
        dynamic_target.setAttribute('data-dynamic-post-old', old_content);
        document.getElementById('cancel-this-target').click();
        })
    }
    function changeFontColor(field,text){
        let cancelButton = document.getElementById("cancel-this-target");
        const new_menu = document.createElement('div');
        new_menu.classList.add('drags');
        new_menu.classList.add('lazydev-new_menu');
        new_menu.setAttribute('title', field.name);
        new_menu.innerHTML = `<p>set ${field.name} for ${text}</p>`;
        cancelButton.parentElement.insertBefore(new_menu,cancelButton)
        new_menu.addEventListener('click', ()=>{
        let old_content = '';
            if(dynamic_target.hasAttribute('style')){
                old_content = dynamic_target.getAttribute('style')
            }
        dynamic_target.setAttribute('style', `color: ${field.value} !important;`);
        dynamic_target.setAttribute('data-dynamic-post', `${field.name}`)
        dynamic_target.setAttribute('data-dynamic-post-type', 'changeFontColor')
        dynamic_target.setAttribute('data-dynamic-post-value', field.value);
        dynamic_target.setAttribute('data-dynamic-post-old', old_content);
        document.getElementById('cancel-this-target').click();
        })
    }
    function truedisplayNone(field,text){
        let cancelButton = document.getElementById("cancel-this-target");
        const new_menu = document.createElement('div');
        new_menu.classList.add('drags');
        new_menu.classList.add('lazydev-new_menu');
        new_menu.setAttribute('title', field.name);
        new_menu.innerHTML = `<p>set ${field.name} for ${text}</p>`;
        cancelButton.parentElement.insertBefore(new_menu,cancelButton)
        new_menu.addEventListener('click', ()=>{
        dynamic_target.setAttribute('data-dynamic-post', `${field.name}`)
        dynamic_target.setAttribute('data-dynamic-post-type', 'truedisplayNone')
        dynamic_target.setAttribute('data-dynamic-post-value', field.value);
        document.getElementById('cancel-this-target').click();
        })
    }
    function falsedisplayNone(field,text){
        let cancelButton = document.getElementById("cancel-this-target");
        const new_menu = document.createElement('div');
        new_menu.classList.add('drags');
        new_menu.classList.add('lazydev-new_menu');
        new_menu.setAttribute('title', field.name);
        new_menu.innerHTML = `<p>set ${field.name} for ${text}</p>`;
        cancelButton.parentElement.insertBefore(new_menu,cancelButton)
        new_menu.addEventListener('click', ()=>{
        dynamic_target.setAttribute('data-dynamic-post', `${field.name}`)
        dynamic_target.setAttribute('data-dynamic-post-type', 'falsedisplayNone')
        dynamic_target.setAttribute('data-dynamic-post-value', field.value);
        document.getElementById('cancel-this-target').click();
        })
    }
    function noChange(text){
        let cancelButton = document.getElementById("cancel-this-target");
        const new_menu = document.createElement('div');
        new_menu.classList.add('drags');
        new_menu.classList.add('lazydev-new_menu');
        new_menu.innerHTML = `<p>${text}</p>`;
        cancelButton.parentElement.insertBefore(new_menu,cancelButton)
        new_menu.addEventListener('click', ()=>{
        document.getElementById('cancel-this-target').click();
        })
    }
}
function data_choosen_checkVal(field){
const data_field = dynamicContent.content;
let value = field.name;
data_field.forEach(element => {
    if(element.name === field.name){
        if(element.value !== ''){
            value = element.value
        }
    }
});
return value
}
//--------------------------------------------//
function dynamicArray(){
let viewID = '';
const arrayForm = `
<div id="slicer-list-container" class="slicer-list-container enterence2-animation" lazydev="981">
<div id="sliced-items-head" class="sliced-items-head" lazydev="112">
<h4 id="slicer-h3-sliced" class="slicer-h3-sliced" lazydev="314">
<p style="text-align: left;">

Dynamic Content

</p>


</h4>

<div id="close-icon-container" class="close-icon-container" lazydev="416">
<i class="fa-regular fa-circle-xmark">

</i>


</div>


</div>

<div id="sliced-items-body" class="sliced-items-body" lazydev="213">

</div>


</div>`;
    document.getElementById('slicer-array').addEventListener('click', ()=>{
    listDynamaicElement();
    const form = document.createElement('section');
    form.id = `slicer-array-wrapper`;
    form.classList.add('slicer-array-wrapper');
    form.classList.add('enterence-animation');
    form.innerHTML = arrayForm;
    document.body.appendChild(form);
    setTimeout(() => {
        form.classList.remove('enterence-animation');
    }, 550);
    const close = document.getElementById('close-icon-container');
    close.addEventListener('click', ()=> {
        const wrapper = document.getElementById('slicer-list-container');
        form.classList.add('exit-animation');
        wrapper.classList.add('exit-animation2');
        setTimeout(() => {
            form.remove();
            if(viewID){
                viewID.classList.remove('lazydev-selected-hover');
            }
        }, 500);
    })
    if(dynamicArrays.length >= 1){
        dynamicArrays.forEach(array => {
        const item = document.createElement('div');
        item.setAttribute('array', array.id);
        item.classList.add('slicer-arrays-container');
        item.innerHTML = `<h4 id="lazyid208" class="lazyclass208" lazydev="208">
    
        ${array.id}
        
        </h4>
        
        <div id="slicer-wrapper-11" class="slicer-wrapper-11" lazydev="419">
    <paragraph id="slicer-button-view-${array.id}" class="slicer-button-view" lazydev="2212">
    
    view
    
    </p>
    
    
    </paragraph>
    
    
    </div>
        
        
        <div id="lazyid4214" class="lazyclass4214" lazydev="4214">
        <paragraph id="slicer-button-delete-${array.id}" class="slicer-button-delete" lazydev="2913">
        <p class="" style="">
        
        delete
        
        </p>
        
        
        </paragraph>
        
        
        </div>`;
        const container = document.getElementById('sliced-items-body');
        container.appendChild(item);
        const view = document.getElementById(`slicer-button-view-${array.id}`);
        view.addEventListener('click', ()=>{
            if(viewID){
                viewID.classList.remove('lazydev-selected-hover');
            }
            viewID = document.getElementById(array.id);
            viewID.classList.add('lazydev-selected-hover');
        });
        const deletE = document.getElementById(`slicer-button-delete-${array.id}`);
        deletE.addEventListener('click', ()=>{
            deleteSet(array)
            if(viewID && viewID === document.getElementById(array.id)){
                viewID.classList.remove('lazydev-selected-hover');
                viewID = '';
            }
            item.remove();
        })
    });
    }
    })
    }
function listDynamaicElement(){
    dynamicArrays = [];
    const dynamics = document.querySelectorAll('[data-dynamic-post]');
    if(dynamics){
        dynamics.forEach(element => {
            const elementID = element.id;
            const lazydev = element.getAttribute('lazydev');
            const postType = element.getAttribute('data-dynamic-post-type');
            const postValue = element.getAttribute('data-dynamic-post-value');
            const oldVal = element.getAttribute('data-dynamic-post-old');
            const name = element.getAttribute('data-dynamic-post');
            const new_Array = {
                id: elementID,lazydev,postType,postValue,oldVal,name
            }
            dynamicArrays.push(new_Array)
        });
    }
}
function deleteSet(array){
let target = document.getElementById(array.id)
let postType = array.postType;
if(postType === 'text'){
    target.innerHTML = `${target.getAttribute('data-dynamic-post-old')}`;
}
if(postType === 'textContent'){
    target.textContent = `${target.getAttribute('data-dynamic-post-old')}`;
}
if(postType === 'changetitle'){
    if(target.getAttribute('data-dynamic-post-old') !== ''){
        target.title = `${target.getAttribute('data-dynamic-post-old')}`;
    } else {
        target.removeAttribute('title')
    }
}
if(postType === 'changeplaceholder'){
    if(target.getAttribute('data-dynamic-post-old') !== ''){
        target.setAttribute('placeholder',`${target.getAttribute('data-dynamic-post-old')}`);
    } else {
        target.removeAttribute('placeholder')
    }
}
if(postType === 'changeval'){
    target.value = `${target.getAttribute('data-dynamic-post-old')}`;
}
if(postType === 'changeBgSrc'){
    target.setAttribute('src',`${target.getAttribute('data-dynamic-post-old')}`);
}
if(postType === 'changeBgImage'
|| postType === 'changeBgColor' 
|| postType === 'changeBorderColor' 
|| postType === 'changeFontColor' 
){
    target.removeAttribute('style');
}
target.removeAttribute('data-dynamic-post');
target.removeAttribute('data-dynamic-post-type');
target.removeAttribute('data-dynamic-post-value');
target.removeAttribute('data-dynamic-post-old');
}
    dynamicArray();

//--------------------------------------------//
function exportFunction(){
    let container = document.createElement('section');
    container.id = 'export-dynamic-script';
    container.classList.add('slice-save-container');
    container.innerHTML = `
    <div id="slice-save-wrapper" class="slice-save-wrapper">
    <h5 id="save-sliced-comp-9800" class="lazyclass633">
    
    Saving Page... please wait
    
    </h5>
    
    <div id="slicing-save-button" class="slicing-save-button">
    <i id="slice-saving-icon" class="fa-solid fa-spinner">
    
    </i>
    
    
    </div>
    
    
    </div>`;
    document.body.appendChild(container);
    listDynamaicElement();
    const DynamicObjects = JSON.stringify(dynamicArrays);
    const createFetch = createFetchFunction(DynamicObjects);
    sendData(DynamicObjects,createFetch);
}
function createFetchFunction(DynamicObjects){
    let url = window.location.href;
if (url.endsWith('/')) {
    url = url.slice(0, -1);
}
const dataURL = url.split('/');
const dataURL2 = dataURL[dataURL.length - 1];
const sub = "`";
const URL1 = "${dataURL1}" 
const URL2 = "${dataURL2}" 
const datamsg = '${data.msg}';
const subopen = '`${';
const subclose = '}`';
const nonsubOpen = '${';
const nonsubClose = '}';
const slash = '\\'; 


    return `
<script>
    let data = <%- jsonData %>;
    document.body.style.display = 'none';
    const parsedObject = ${DynamicObjects};
    let data_fields = [];

const ExportObject = (scriptObject)=>{
    let field;
    let dynamic_target;
    scriptObject.forEach(obj => {
    const element = document.querySelector(${sub}[lazydev="${nonsubOpen}obj.lazydev}"]${sub});
    field = getField(obj);
    if(element){
        dynamic_target = element;
        switch (obj.postType) {
                case 'text':
                text();
                break;
                case 'textContent':
                    textContent();
                break;
                case 'href':
                    href();
                break;
                case 'onClick':
                    onClick();
                break;
                case 'changetitle':
                    changetitle();
                break;
                case 'changeplaceholder':
                    changeplaceholder();
                break;
                case 'changeval':
                    changeval();
                break;
                case 'changeBgImage':
                    changeBgImage();
                break;
                case 'changeBgSrc':
                    changeBgSrc();
                break;
                case 'changeBgColor':
                    changeBgColor();
                break;
                case 'changeBorderColor':
                    changeBorderColor();
                break;
                case 'changeFontColor':
                    changeFontColor();
                break;
                case 'truedisplayNone':
                    truedisplayNone();
                break;
                case 'falsedisplayNone':
                    falsedisplayNone();
                break;

        
            default:
                break;
        }
    }
    });
    function text(){
        dynamic_target.innerHTML = ${subopen}field.value.replace(/<${slash}/?p>/g, '')${subclose}; 
    }
    function textContent(){
        let old_content = dynamic_target.textContent;
        dynamic_target.textContent = ${subopen}field.value${subclose}; 
    }
    function href(){
        dynamic_target.setAttribute('href', field.value);
    }
    function onClick(){
        dynamic_target.setAttribute('onClick', ${sub}window.location.href='${nonsubOpen}field.value${nonsubClose}';${sub});
    }
    function changetitle(){
        dynamic_target.setAttribute('title',field.value);
    }
    function changeplaceholder(){
        dynamic_target.setAttribute('placeholder',field.value);
    }
    function changeval(){
        dynamic_target.setAttribute('value',field.value);
    }
    function changeBgImage(){
        dynamic_target.setAttribute('style', ${sub}background: url('${nonsubOpen}field.value${nonsubClose}'); background-size: cover;${sub});
    }
    function changeBgSrc(){
        dynamic_target.setAttribute('src',field.value);
    }
    function changeBgColor(){
        dynamic_target.setAttribute('style', ${sub}background-color: ${nonsubOpen}field.value${nonsubClose} !important;${sub});
    }
    function changeBorderColor(){
        dynamic_target.setAttribute('style', ${sub}border-color: ${nonsubOpen}field.value${nonsubClose} !important;${sub});
    }
    function changeFontColor(){
        dynamic_target.setAttribute('style', ${sub}color: ${nonsubOpen}field.value${nonsubClose} !important;${sub});
    }
    function truedisplayNone(){
        if(field.value == true){
            dynamic_target.setAttribute('style', ${sub}display: none !important;${sub});
        }
    }
    function falsedisplayNone(){
        if(field.value == false){
            dynamic_target.setAttribute('style', ${sub}display: none !important;${sub});
        }
    }
    function getField(object){
        let field = {};
        data_fields.forEach(fld => {
            if(object.name === fld.name){
                field = fld;
            }
        });
        return field
    }
}

if(data){
    if(!data.content.content){
        data = ''
    }
    else {
    const contentArray = JSON.parse(data.content.content);
    const title = {name: 'title', value: data.content.title,};
    data_fields = contentArray;
    document.title = data.content.title;
    data_fields.push(title)
    }
}

            document.addEventListener("DOMContentLoaded", async function() {
                if(data && data !== ''){
                    ExportObject(parsedObject);
                }
                document.body.style.display = '';
            })     

</script>`;
}
const sendData =(object,dataScript)=>{
    const dataToSend = {
        id : page.id,
        dynamicScript : dataScript,
        dynamic_object : object,
        redirectPage : page_redirect,
    }
    // console.log(dataToSend)
    save_dynamic_Page(dataToSend,`/api/adm/update-page-dynamic`,'PUT')
}
const save_dynamic_Page = async (dataToSend,api,method) => {

    try {
        const response = await fetch(api, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        });

        if (!response.ok) {
            const errorMessage = await response.json();
            receiveMessage(errorMessage)
            throw new Error(errorMessage);
        }

        const responseData = await response.json();
        receiveMessage(responseData)
        // console.log(responseData);
    } catch (error) {
        // console.error('Error:', error.message);
        receiveMessage(error)
        // console.log(error)
    }
};
//--------------------------------------------//
export async function getAllPage(){
    try {
      const response = await fetch(`/api/adm/get-pages-dynamic-builder`);
    if (!response.ok) {
        const data = await response.json();
        throw new Error(`${data.msg}`);
    }
    const data = await response.json();
    data.data_pages.forEach(PG => {
      if(PG.id !== page.id){
        pages.push(PG)
      }
    });
    if(page.redirect !== null){
      page_redirect = page.redirect
    }
    } catch (error) {
      window.location.href ='/admin/page'
    }
  }
function BlankToRedirectFunction(){
    const arrayForm = `
<div id="slicer-list-container" class="slicer-list-container enterence2-animation" lazydev="981">
<div id="sliced-items-head" class="sliced-items-head" lazydev="112">
<h4 id="slicer-h3-sliced" class="slicer-h3-sliced" lazydev="314">
<p style="text-align: left;">

Page Options

</p>


</h4>

<div id="close-icon-container" class="close-icon-container" lazydev="416">
<i class="fa-regular fa-circle-xmark">

</i>


</div>


</div>

<div id="options-items-body" class="sliced-items-body" lazydev="213">
<div class="slicer-arrays-container">
<input id="redirect-true-checkbox" type="checkbox" style="cursor:pointer;"><label class="label-body-option">Redirect Page if it's root</label>
</div>

<div id="div-redirect-options" class="slicer-arrays-container">
<label class="label-body-option">Redirect To</label>
<select id="options-select-redirect" style="cursor:pointer; flex-grow: 1;">
<option value=""></option>
</select>
</div>

</div>
</div>


</div>`;
    const form = document.createElement('section');
    form.id = `slicer-array-wrapper`;
    form.classList.add('slicer-array-wrapper');
    form.classList.add('enterence-animation');
    form.innerHTML = arrayForm;
    document.body.appendChild(form);
    setTimeout(() => {
        form.classList.remove('enterence-animation');
    }, 550);
    const selectRedirect = document.getElementById('options-select-redirect');
    const divRedirect = document.getElementById('div-redirect-options');
    const checkboxRedirect = document.getElementById('redirect-true-checkbox');
    pages.forEach(pg=>{
        const option = document.createElement('option');
        option.value = pg.id;
        option.textContent = pg.name;
        selectRedirect.appendChild(option);
    })
    if(page_redirect !== null){
        selectRedirect.value = page_redirect;
        checkboxRedirect.checked = true;
    } else if(page_redirect === null) {
        divRedirect.classList.add('none-mode');
    }
    selectRedirect.addEventListener('input', ()=>{
        if(selectRedirect.value === ''){
            page_redirect = null;
        } else {
            page_redirect = parseInt(selectRedirect.value,10);
        }
    })
    checkboxRedirect.addEventListener('input', ()=>{
        if(checkboxRedirect.checked){
            divRedirect.classList.remove('none-mode');
        } else if(!checkboxRedirect.checked){
            divRedirect.classList.add('none-mode');
            page_redirect = null;
        }
    })
    const close = document.getElementById('close-icon-container');
    close.addEventListener('click', ()=> {
        const wrapper = document.getElementById('slicer-list-container');
        form.classList.add('exit-animation');
        wrapper.classList.add('exit-animation2');
        setTimeout(() => {
            form.remove();
        }, 500);
    })
}
//--------------------------------------------//