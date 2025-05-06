
import {getrandomNumberHex} from './main.js'
import {pagesetting_key} from './EditBody.js'
import {component_ID} from './importcontent.js'
import {gsapWaring,SmoothWarning} from './animatecontent.js'
import {closeFunctionAnimationPlugin} from './animateElement.js'
import {propertiesEditor,JSEditor} from './ElementBuilder.js'
import {encoderArray} from '/utils-encoded_decode';
import {clientUrl} from '/utils-urlmain';
// console.log(encoderArray)

export function gsapAnimationFUNC() {
    const section = document.createElement('section');
    section.classList.add('gsap-animation-warning');
    section.id = 'gsap-animation-warning';
    section.innerHTML = gsapWaring;
    document.body.appendChild(section);

    //---------------------------------//
    const div = document.getElementById('div-18c677f43811');
    const children = div.querySelectorAll('*');
    gsap.from(div,{width:0, scaleX:0, duration: 0.5})
    children.forEach(element => {
        gsap.from(element,{opacity:0, scaleX:0, delay:0.3, duration: 0.3})
    });
    //---------------------------------//

    setTimeout(() => {
        const yesbutton = document.getElementById('open-gsap-editor-button');
        yesbutton.addEventListener('click', ()=>{
            // console.log(pagesetting_key)
            // console.log('--')
            // console.log(component_ID)
            const pagesettingkey = encodingWORD(pagesetting_key);
            const contentID = encodingWORD(component_ID);
            const message = 'gsap-animation'
            const idNumber = Date.now();
            const hyperlink = message + '--' + contentID + '--' + pagesettingkey + '--' + idNumber;
                // Menggunakan window.open untuk membuka tab baru dengan URL yang diinginkan
                window.open(`/open-component/${hyperlink}`, '_blank');
                closegsapWaring();
        })
        const nobutton = document.getElementById('gsap-cancel-editor-button');
        nobutton.addEventListener('click', closegsapWaring)

        function closegsapWaring(){
            closeFunctionAnimationPlugin();
            gsap.to(div,{width:0, scaleX:0, opacity:0, duration: 0.6, delay: 0.3})
            children.forEach(element => {
                gsap.to(element,{opacity:0, scaleX:0, duration: 0.4})
            });

            const section = document.getElementById('gsap-animation-warning');
            setTimeout(() => {
                section.remove();
            }, 601);
        }
    }, 50);
}


export function SmoothScroll() {
    const section = document.createElement('section');
    section.classList.add('gsap-animation-warning');
    section.id = 'gsap-animation-warning';
    section.innerHTML = SmoothWarning;
    document.body.appendChild(section);

    //---------------------------------//
    const div = document.getElementById('div-18c677f43811');
    const children = div.querySelectorAll('*');
    gsap.from(div,{width:0, scaleX:0, duration: 0.5})
    children.forEach(element => {
        gsap.from(element,{opacity:0, scaleX:0, delay:0.3, duration: 0.3})
    });
    //---------------------------------//

    setTimeout(() => {
        const yesbutton = document.getElementById('open-gsap-editor-button');
        yesbutton.addEventListener('click', ()=>{
            const pagesettingkey = encodingWORD(pagesetting_key);
            const contentID = encodingWORD(component_ID);
            const message = 'smooth-scroll'
            const idNumber = Date.now();
            const hyperlink = message + '--' + contentID + '--' + pagesettingkey + '--' + idNumber;
                // Menggunakan window.open untuk membuka tab baru dengan URL yang diinginkan
                window.open(`/open-component/${hyperlink}`, '_blank');
                closegsapWaring();
        })
        const nobutton = document.getElementById('gsap-cancel-editor-button');
        nobutton.addEventListener('click', closegsapWaring)

        function closegsapWaring(){
            closeFunctionAnimationPlugin();
            gsap.to(div,{width:0, scaleX:0, opacity:0, duration: 0.6, delay: 0.3})
            children.forEach(element => {
                gsap.to(element,{opacity:0, scaleX:0, duration: 0.4})
            });

            const section = document.getElementById('gsap-animation-warning');
            setTimeout(() => {
                section.remove();
            }, 601);
        }
    }, 50);
}

function encodingWORD(word){
    const keyword = word.toString();
    // console.log(keyword)
    const keywordArray = keyword.split('');
    const newArray = [];
    
    keywordArray.forEach((element) => {
        let newElement = encodeChar(element.toLowerCase());
        newArray.push(newElement);
    });
    let newkeyword = ''
    newArray.forEach(element => {
        newkeyword+=element
    });
    
    return newkeyword
    }
    
function encodeChar(character){
        let encoded  = character;
        encoderArray.forEach(element => {
            if(element.decode === encoded){
                encoded = element.encode;
            }
        });
        return encoded
    }
//-----------------------------------//
function createGsapCode(AllArray){
    
    AllArray.forEach(element => {
        setAttrGsap(element)
    });
    AllArray.forEach(element => {
        GsapGenerator(element);
    });
}
export {createGsapCode}

function setAttrGsap(element){
    let whereToPut = "#gsapBody";
if(element.putCode !== "Body"){
    whereToPut = element.putCode;
}
let selector = document.querySelector(whereToPut);
if(!selector){return}
else{
    selector.setAttribute("data-gsap", "");
}

}
function GsapGenerator(element){
let gsapOutput = "";
let GsapSetup = "";
let gsapArray = [];
//--------------
let GsapID = element.id;
if(GsapID){GsapSetup += GsapID};
let timeline = element.timeline;
let GSAPorTL = "gsap";
if(element.timeline === "true")
{
    GSAPorTL = "timeline" + getrandomNumberHex();
}
let trigger = element.StartTrigger;
let gsapMode = element.trigger;
let gsapFROMorTO = element.fromTo;
let whereToPut = element.putCode;
let gsapSelector = document.querySelector(whereToPut);
if(!gsapSelector){return}

let gsapAttribute = gsapSelector.getAttribute("data-gsap");

let Start = "";
let End = "";
let ToggleActions = "";
let Pin = "";
let PinSpacing = "";
let MarkerStart = "";
let MarkerEnd = "";
let Marker = "";
let Scrub = "";
let animation = "";
let scrollTriggerElements = "";
if(gsapMode === "Scrolltrigger"){

trigger = `trigger : "${element.StartTrigger}",`;

if(element.Start !== undefined){Start = `start: "${element.Start}",`;}

if(element.End !== undefined){End = `end: "${element.End}",`;}

if(element.ToggleActions !== undefined){ToggleActions =  `toggleActions: "${element.ToggleActions}",`;}

if(element.MarkerStart)
Marker = `
markers: {
    start: "${element.MarkerStart}",
    end: "${element.MarkerEnd}",
  },`;

if(element.Scrub){Scrub = `scrub: ${element.Scrub},`;}
scrollTriggerElements = 
`
${trigger}
${Start}
${End}
${ToggleActions}
${Marker}
${Scrub}

`;
}

let timelineScrollTrigger = "";
if(timeline === "true"){
    timelineScrollTrigger = `

const ${GSAPorTL} = gsap.timeline({
    scrollTrigger: {
        ${scrollTriggerElements}
    }
  });
    `

}

let yoyo = "";
if(element.yoyo){yoyo = `yoyo: true,`}

let onEnter = "";
if(element.onEnter){onEnter = `onEnter: function()=>{
    ${element.onEnter}},`};
let onLeave = "";
if(element.onLeave){onLeave = `onLeave:function()=>{
    ${element.onLeave},`};
let onEnterBack = "";
if(element.onEnterBack){onEnterBack = `onEnterBack: function()=>{
    ${element.onEnterBack},`};
let onLeaveBack = "";
if(element.onLeaveBack){onLeaveBack = `onLeaveBack: function()=>{
    ${element.onLeaveBack},`};
let onUpdate = "";
if(element.onUpdate){onUpdate = `onUpdate: function()=>{
    ${element.onUpdate},`};
let functionX = "";
if(element.function){functionX = `${element.function}`};

let timelines = element.arrays;

if(gsapMode === "Scrolltrigger" && timeline !== "true"){
    timelines.forEach(arr => {
        let str = `scrollTrigger: {${scrollTriggerElements}},
        `
        gsapTimelineCreator(arr,gsapFROMorTO,GSAPorTL,gsapArray,str)
    });
}

else if(gsapMode === "Scrolltrigger" && timeline === "true"){
    let str = timelineScrollTrigger;
    gsapArray.push(str);
    timelines.forEach(arr => {
        gsapTimelineCreator(arr,gsapFROMorTO,GSAPorTL,gsapArray)
    });
}

else {
    timelines.forEach(arr => {
        gsapTimelineCreator(arr,gsapFROMorTO,GSAPorTL,gsapArray)
    });
}




let newAttribute = "";
gsapArray.forEach(gsap => {
    newAttribute = newAttribute + gsap;
});




let newAttributes = gsapAttribute + newAttribute;
gsapSelector.setAttribute("data-gsap", newAttributes);



if(gsapSelector !== "#gsapBody"){
    let functionName = getrandomNumberHex();
    let lazydev = gsapSelector.getAttribute("lazyDev");
    let lazytag = document.getElementById("scriptid"+lazydev);
    let jsval = gsapSelector.getAttribute("data-custom-js");
    JSEditor(gsapSelector,lazytag,jsval,functionName);
}
else {
    let functionName = getrandomNumberHex();
    JSEditor(gsapSelector,gsapSelector,"",functionName)
}
}

function gsapTimelineCreator(el,gsap,timeline,gsapArray,st){
    let gsapFromTo = ".to"
    if(gsap === "Gsap.From"){gsapFromTo = ".from"}
    let target = el.manipulateObject;
    let duration = el.duration;
    if(!el.duration){duration = "duration: 0.5,\n"}
    if(el.duration){duration = `duration: ${duration},\n`;}
    let delay = "";
    if(el.delay){delay = `delay: ${el.delay},\n`};

let xVal = "";
if(el.xVal){
    let x = el.xVal+el.xParameter;
    xVal = `x: "${x}",\n`
};

let yVal = "";
if(el.yVal){
    let y = el.yVal+el.yParameter;
    yVal = `y:"${y}",\n`
};

let zVal = "";
if(el.zVal){
    let z = el.zVal+el.zParameter;
    zVal = `z:"${z}",\n`
};

let scaleX = "";
if(el.scaleX){scaleX = `scaleX:${el.scaleX},\n`};
let scaleY = "";
if(el.scaleY){scaleY = `scaleY:${el.scaleY},\n`};
let scaleZ = "";
if(el.scaleZ){scaleZ = `scaleZ:${el.scaleZ},\n`};
let rotateX = "";
if(el.rotateX){rotateX = `rotateX: "${el.rotateX}deg",\n`};
let rotateY = "";
if(el.rotateY){rotateY = `rotateY: "${el.rotateY}deg",\n`};
let rotateZ = "";
if(el.rotateZ){rotateZ = `rotateZ: "${el.rotateZ}deg",\n`};

let skewXVal = "";
if(el.skewXVal){
    let prop = el.skewXVal+el.skewXParameter;
    skewXVal = `skewX: "${prop}",\n`
};

let skewYVal = "";
if(el.skewYVal){
    let prop = el.skewYVal+el.skewYParameter;
    skewYVal = `skewY: "${prop}",\n`
};

let opacity = "";
if(el.opacity){opacity = `opacity: ${el.opacity},\n`};
let borderRadius = "";
if(el.borderRadius){borderRadius = `borderRadius: "${el.borderRadius}",\n`};

let backgroundColorresult = "";
if(el.backgroundColorresult){backgroundColorresult = `backgroundColor: "${el.backgroundColorresult}",\n`};

let colorresult = "";
if(el.colorresult){colorresult = `color: "${el.colorresult}",\n`};

let borderColorresult = "";
if(el.borderColorresult){borderColorresult = `borderColor: "${el.borderColorresult}",\n`};

let filter = "";
let blur = "";
if(el.blur){blur = ` blur:${el.blur}`};
let brightness = "";
if(el.brightness){brightness = ` brightness:${el.brightness}`};
let contrast = "";
if(el.contrast){contrast = ` contrast:${el.contrast}`};
let grayscale = "";
if(el.grayscale){grayscale = ` grayscale:${el.grayscale}`};
let hue = "";
if(el.hue){hue = ` hue:${el.hue}`};
let invert = "";
if(el.invert){invert = ` invert:${el.invert}`};
let saturate = "";
if(el.saturate){saturate = ` saturate:${el.saturate}`};
let sepia = "";
if(el.sepia){sepia = ` sepia:${el.sepia}`};
if
(el.blur || el.brightness || el.contrast ||  el.grayscale ||  el.hue ||  el.invert ||  el.saturate || el.sepia)
{
    filter = `filter: "${blur}${brightness}${contrast}${grayscale}${hue}${invert}${saturate}${sepia}",`
}
let Pin = "";
if(el.Pin){Pin = `pin: ${el.Pin},`};
let PinSpacing = ""
if(el.PinSpacing){PinSpacing = `pinSpacing: "${el.PinSpacing}",`}
let Once = "";
if(el.Once){Once = `Once: ${el.Once},`};
let id = "";
if(el.id){id = `id: ${el.id},`};
let invalidateOnRefresh = "";
if(el.invalidateOnRefresh){invalidateOnRefresh = `invalidateOnRefresh: ${el.invalidateOnRefresh},`};
let Snap = "";
if(el.Snap){Snap = `Snap: ${el.Snap},`};

let gsapProperties = 
id +
invalidateOnRefresh +
Snap +
xVal +
yVal +
zVal +
scaleX +
scaleY +
scaleZ +
rotateX +
rotateY +
rotateZ +
skewXVal +
skewYVal +
opacity +
borderRadius +
backgroundColorresult +
colorresult +
borderColorresult +
filter +
duration +
delay +
Once;
if(st === undefined){st = ""}
let gsapDone = `${timeline}${gsapFromTo}("${target}", {
    ${st}
    ${gsapProperties}
}); \n`
gsapArray.push(gsapDone);
}