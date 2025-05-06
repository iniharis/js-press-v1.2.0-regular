import {userID,page_key,defaultFolder,receiveMessage} from '/js-slicer/slicer_import.js';
import {clientUrl} from '/utils-urlmain';

let sliceRecord = [];
export const turnOff = (reaction) => {
    const turnOffButton = document.getElementById('turn-on-off-button-wrapper');
    turnOffButton.addEventListener('click', turnOffFunction);
    const lazydev = document.querySelectorAll('[lazydev]');
    activateSlicing(lazydev,true)
    if(reaction === 'react'){
        turnOffFunction();
        turnOn(reaction);
    }
    function turnOffFunction(){

    turnOffButton.removeEventListener('click', turnOffFunction);

    const pElement = document.getElementById('turn-off-slicer-p');
    pElement.textContent = 'Turn On Slicer';
    const iElement = document.getElementById('turn-slice-icon');
    iElement.setAttribute('class', 'slicer-icons fa-regular fa-circle');
    iElement.setAttribute('style', 'margin-top: -5%; color:rgba(0, 255, 255, 0.842);');

    lazydev.forEach(element => {

        const onClick = element.getAttribute('onClickLink');
        if(onClick && onClick !== ''){
              element.setAttribute('onclick', onClick);
            }

        const identity = element.getAttribute('data-identity');
        if(identity === 'Main Container' || identity === 'Child Container' 
        || identity === 'Wrapper')
    {
        if (element.classList.contains('slicer-idle')) {
            element.classList.remove('slicer-idle');
        }
        if (element.classList.contains('slicer-saved')) {
            element.classList.remove('slicer-saved');
        }
    }

    });
    turnOn();
    }
}

export const turnOn = (reaction) => {
    const turnOffButton = document.getElementById('turn-on-off-button-wrapper');
    turnOffButton.addEventListener('click', turnOnFunction);
    const lazydev = document.querySelectorAll('[lazydev]');
    activateSlicing(lazydev,false)
    if(reaction === 'react'){
        turnOnFunction();
    }
    function turnOnFunction(){

        turnOffButton.removeEventListener('click', turnOnFunction);

        const pElement = document.getElementById('turn-off-slicer-p');
        pElement.textContent = 'Turn Off Slicer';
        const iElement = document.getElementById('turn-slice-icon');
        iElement.setAttribute('class', 'slicer-icons fa-solid fa-circle');
        iElement.setAttribute('style', 'margin-top: -5%; color:rgba(244, 255, 92, 1);');

        lazydev.forEach(element => {
            
            const onClick = element.getAttribute('onClickLink');
            if(onClick && onClick !== ''){
              element.setAttribute('onclick', '');
            }

            const identity = element.getAttribute('data-identity');
        if(identity === 'Main Container' || identity === 'Child Container' || 
        identity === 'Wrapper')
    {
        const Slicemode = element.getAttribute('slice-mode')
        if (Slicemode === 'idle') {
            element.classList.add('slicer-idle');
        }
    }
        });
        turnOff();
        }
}

export const activateSlicing = (lazydev,command) => {
    if(command === true){
    lazydev.forEach(element => {
        const Slicemode = element.getAttribute('slice-mode');
        if (Slicemode === 'idle') {
            element.classList.add('slicer-idle');
            element.addEventListener('mouseenter', handleMouseEnter);
            element.addEventListener('click', handleClick);
            element.addEventListener('mouseleave', handleMouseLeave);
        }
    });
    }
    if(command === false){
        lazydev.forEach(element => {
            const Slicemode = element.getAttribute('slice-mode');
            if (Slicemode === 'idle') {
                element.classList.remove('slicer-idle');
                element.removeEventListener('mouseenter', handleMouseEnter);
                element.removeEventListener('click', handleClick);
                element.removeEventListener('mouseleave', handleMouseLeave);
            }
        });
    }
    }

function handleMouseEnter(){
    this.classList.add('slicer-handle-hover');
    var parentElement = this.parentNode;

    while (parentElement !== document.body) {
      parentElement.classList.remove('slicer-handle-hover');
      parentElement = parentElement.parentNode;
    }
}

function handleMouseLeave(){
    this.classList.remove('slicer-handle-hover'); 
}
const slicerForm = `
<form id="slicer-slice-form" class="slicer-slice-form">
<fieldset id="slicer-slice-fieldset" class="slicer-slice-fieldset" lazydev="833">

<label class="slicer-label-name" for="" accesskey="">
Component ID
</label>

<input type="text" id='slicer-id' readonly class="slicer-name-input" lazydev="275" value="Component ID">

<label id="slicer-label-name" class="slicer-label-name" for="" accesskey="">
Component Name
</label>

<input type="text" id="slicer-name-input" class="slicer-name-input" lazydev="275" placeholder="Component Name">


<legend id="slicer-slice-legend" class="slicer-slice-legend">
Slice Component
</legend>

<div id="lazyid499" class="lazyclass499">
<div id="slice-saveslice-button" class="slice-saveslice-button">
<label id="slice-save-button-label" class="slice-save-button-label" for="" accesskey="">
Slice
</label>


</div>

<div id="slice-cancel-button" class="lazyclass6015">
<label id="slice-cancel-label-button" class="slice-cancel-label-button" for="" accesskey="">
Cancel
</label>


</div>


</div>


</fieldset>


</form>`;
const arrayForm = `
<div id="slicer-list-container" class="slicer-list-container enterence2-animation" lazydev="981">
<div id="sliced-items-head" class="sliced-items-head" lazydev="112">
<h4 id="slicer-h3-sliced" class="slicer-h3-sliced" lazydev="314">
<p style="text-align: left;">

Sliced Components

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

let elementTarget = '';
export const openSlicerForm = (id) => {
    elementTarget = id;
    const form = document.createElement('section');
    form.id = 'slice-option-container';
    form.setAttribute('class','slice-option-container');
    form.innerHTML = slicerForm;
    document.body.appendChild(form);
    //---------------------------------------------
    const slicerIDinput = document.getElementById('slicer-id');
    slicerIDinput.value = elementTarget.id;
    const slicebutton = document.getElementById('slice-saveslice-button');
    slicebutton.addEventListener('click', sliceFunction);
    slicebutton.addEventListener('click', removeForm);
    const cancelbutton = document.getElementById('slice-cancel-button');
    cancelbutton.addEventListener('click', removeForm);
    //----------------------------------------------
    function removeForm(){
        form.classList.add('opacity-animation');
        setTimeout(() => {
            form.remove();
        }, 210);
    }
    }
function handleClick(event){
    event.stopPropagation();
    const elementId = this.id;
    const target = document.getElementById(elementId)
    openSlicerForm(target);
}

let countid = 1;
function sliceFunction(){
let newName = document.getElementById('slicer-name-input').value;
if(newName === ''){
    newName = convertToHexadecimal();
}
// const optionselected = document.getElementById('slicer-option-input').value;
//-------------------------------------------------------------------//
const child = Array.prototype.slice.call(elementTarget.children);
const tagName = elementTarget.tagName;
const attributes = elementTarget.attributes;
elementTarget.classList.remove('slicer-idle');
let effectTime = 0;

//------------------------------------------------------//

let newElement = document.createElement(tagName);
    for (let i = 0; i < attributes.length; i++) {
        const attributeName = attributes[i].name;
        const attributeValue = attributes[i].value;
        newElement.setAttribute(attributeName, attributeValue);
    }

    let elementContent = ``;

    elementTarget.removeEventListener('mouseenter', handleMouseEnter);
    elementTarget.removeEventListener('click', handleClick);
    elementTarget.removeEventListener('mouseleave', handleMouseLeave);
    newElement.removeAttribute('slice-mode');

    child.forEach(element => {
        const slicestatus = element.getAttribute('slice-mode');
        if(slicestatus){
            element.removeAttribute('slice-mode');
            element.removeEventListener('mouseenter', handleMouseEnter);
            element.removeEventListener('click', handleClick);
            element.removeEventListener('mouseleave', handleMouseLeave);
            element.classList.remove('slicer-idle');
        }
    elementContent += '\n' + element.outerHTML + '\n';
    slicedEffect(element,effectTime);
    effectTime += 100;
        });
        elementContent = elementContent.replace(/slice-mode="idle"|slicer-idle/g, '');
        newElement.innerHTML = elementContent;
        const slicePush = {id: countid, name: newName, content: newElement}
        sliceRecord.push(slicePush);
        countid ++;
        slicedEffect(elementTarget,effectTime);

// console.log(sliceRecord);
turnOff('react');
}


function slicedEffect(element,timeout){
let time = timeout;
if(!timeout){
    time = 100;
}
setTimeout(() => {
    element.classList.add('success-sliced');
    setTimeout(() => {
        element.remove();
    }, 600);
}, time);
}
let numbercount = 1;
function convertToHexadecimal() {
    // Mengonversi Date.now() ke angka heksadesimal
    const hexValue = Date.now().toString(16);
    const sliced = `Sliced Component ${userID}${numbercount}${hexValue}`;
    numbercount += 1;
    return sliced;
}

function slicerArray(){
document.getElementById('slicer-array').addEventListener('click', ()=>{
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
    }, 500);
})
if(sliceRecord.length >= 1){
sliceRecord.forEach(array => {
    const item = document.createElement('div');
    item.id = 'slicer-arrays-container';
    item.setAttribute('array', array.id);
    item.classList.add('slicer-arrays-container');
    item.innerHTML = `<h4 id="lazyid208" class="lazyclass208" lazydev="208">

    ${array.name}
    
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
        previewSlicedElement (array)
    });
    const deletE = document.getElementById(`slicer-button-delete-${array.id}`);
    deletE.addEventListener('click', ()=>{
        sliceRecord = sliceRecord.filter(slice => slice.id !== (array.id));
        item.remove();
    })
});
}
})
}
slicerArray();

const previewSlicedElement =(element)=>{
    // console.log(element.content)
    let elementString = element.content.outerHTML;
  let viewportWidth = window.innerWidth;
  let viewportHeight = window.innerHeight;
  const width = viewportWidth;
  let link = ``;
  const linkElements = document.querySelectorAll('link[data-font-styles="true"]');
  
  linkElements.forEach((linkElement) => {
    link += linkElement.outerHTML;
  });
  let bodyStyle = document.querySelector("#bodyStyle").innerHTML;
  let customStyle = document.querySelector("#custom-css").innerHTML;
  let customJS = document.querySelector("#custom-js").innerHTML;
  let newbodyStyle = `<style>${bodyStyle}</style><style>${customStyle}</style><script>${customJS}</script>`;
  let oldContainer = document.querySelector("#container");
  let newContainer = `<div id="container">${elementString}</div>`;
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
        <script>
        const lazyDevContainer = document.getElementById('container');
        function ExecutingScriptTag(lazyDevContainer){
            const scriptTag = lazyDevContainer.querySelectorAll('script');
            scriptTag.forEach(script => {
              const newScript = document.createElement('script');
              newScript.innerHTML = script.innerHTML;
              if (script.id) {
                newScript.id = script.id;
              }
              script.parentElement.insertBefore(newScript,script);
              script.remove();
            });
            }
            ExecutingScriptTag(lazyDevContainer);
        </script>
        <script src="https://vjs.zencdn.net/8.3.0/video.min.js"></script>
      </body>
    </html>
  `);
  newWindowDocument.close();
  htmlStyle = "";
}

const saveform = `
<div id="slice-save-wrapper" class="slice-save-wrapper">
<h5 id="save-sliced-comp-9800" class="lazyclass633">

Saving sliced components... please wait

</h5>

<div id="slicing-save-button" class="slicing-save-button">
<i id="slice-saving-icon" class="fa-solid fa-spinner">

</i>


</div>


</div>`

document.getElementById('slicer-save-component').addEventListener('click', exportFunction);
function exportFunction(){
    editRecords();
    let container = document.createElement('section');
    container.id = 'slice-save-container';
    container.classList.add('slice-save-container');
    container.innerHTML = saveform;
    document.body.appendChild(container);
    sendData();
}

const editRecords=()=>{
    sliceRecord.forEach(element => {
        const div = document.createElement('div');
        document.body.appendChild(div);
        div.textContent = element.content.outerHTML;
        element.content = div.textContent;
        div.remove();
        element.pagesetting = page_key;
        element.component_folder = defaultFolder;
        element.owner = userID;
        element.publicity = `private`;
    });
    // console.log(sliceRecord);
}

const sendData =()=>{
    const dataToSend = {
        data : sliceRecord,
    }
    saveSlicedComponent(dataToSend,`/api/adm/component-slicer`,'POST')
}
const saveSlicedComponent = async (dataToSend,api,method) => {

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

export const deleteArrays = () => {
    sliceRecord.forEach(element => {
        sliceRecord = sliceRecord.filter(slice => slice.id !== (element.id));
    });
}