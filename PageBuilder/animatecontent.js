import {CSSFrameworkPluginList} from '/utils-pagebuilderArrays';
// const latestGsap = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js';
// const latestST = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.8.0/ScrollTrigger.min.js';
const animationArray = [
  // {name: "", value:""},
{name: "Gsap Animation", value:"gsap",link:`
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.8.0/ScrollTrigger.min.js"></script>`}]; 
export {animationArray};
// export const animationOptionList = JsAnimationPluginList;
export const animationOptionList = [];

export function pushAnimationConfig(data){
  const dataanimation = JSON.parse(data)
  dataanimation.forEach(anim => {
    let linkScript = `
    `;
    const dataLinks = anim.link.split(',')
    dataLinks.forEach(element => {
      if(element !== ""){
        const link = `<script src="${element}"></script>\n`
      linkScript += link;
      }
    });
    const newObject = {
      name : anim.name,
      value : anim.value,
      link : linkScript,
      rawLink : dataLinks,
    }
    // console.log(newObject)
    animationOptionList.push(newObject)
  });
  // console.log(animationOptionList)
}

const CSSFRAMEWORKArray = [
{name: 'Bootstrap 4.5.0', value:'Bootstrap450',link:`
<link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css'>
`,  rawLink: 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css'},
{name: 'Video Js', value:'videojs830', link:`<link href='https://vjs.zencdn.net/8.3.0/video-js.css' rel='stylesheet'>
`, rawLink: 'https://vjs.zencdn.net/8.3.0/video-js.css'},

]; 
export {CSSFRAMEWORKArray};

function importCSSAndAnimation(PageSetting){
  animationArray.splice(0, animationArray.length);
  PageSetting.animation_array.forEach(anim => {
    animationOptionList.forEach(element => {
      if(element.value === anim){
        let newAnimationArray = 
        { name: element.name, value: element.value, link: element.link, rawLink : element.rawLink};
        animationArray.push(newAnimationArray)
      }
    });
    // console.log(animationArray)
  });
  CSSFRAMEWORKArray.splice(0, CSSFRAMEWORKArray.length);
  PageSetting.css_framework.forEach(css => {
    CSSFRAMEWORKOptionList.forEach(element => {
      if(element.value === css){
        let newAnimationArray = { 
          name: element.name, 
          value: element.value, 
          link: element.link,
          rawLink: element.rawLink
        };
        CSSFRAMEWORKArray.push(newAnimationArray)
      }
    });
  });
  CSSLINKPUSH();
  JSAnimationLinkPush();
//-----------------------------
function CSSLINKPUSH(){
var elements = document.querySelectorAll('[data-css-framework]');
for (var i = 0; i < elements.length; i++) {
elements[i].parentNode.removeChild(elements[i]);
}

CSSFRAMEWORKArray.forEach(function(animation) {
let animationValue = animation.value;
let animationrawLink = animation.rawLink;
let newLink = document.createElement("link");
  newLink.id = animationValue;
  newLink.setAttribute("rel", "stylesheet");
  newLink.setAttribute("href", animationrawLink);
  newLink.setAttribute("data-css-framework", "true");
  let linkfont = document.getElementById("fontStyles");
  linkfont.parentElement.insertBefore(newLink, linkfont);
  // console.log(CSSFRAMEWORKArray);

});
  }
// console.log(animationArray)
// console.log(CSSFRAMEWORKArray)
}

export function JSAnimationLinkPush(){
  const jslibrary = document.querySelectorAll('[data-js-framework]');
  let noGsap = false;
  if (animationArray.some(data => data.rawLink.some(link => link.includes('gsap')))) {
    // console.log('Data dengan kata "gsap" ada dalam animationArray.');
    noGsap = false;
} else {
  noGsap = true;
}
  if(jslibrary){
    jslibrary.forEach(element => {
      element.remove();
    });
  }
  animationArray.forEach(element => {
    // console.log(element)
    if(element.rawLink){
      element.rawLink.forEach(anim => {
        const script = document.createElement('script');
          script.setAttribute('src',anim);
          script.setAttribute('data-js-framework','true');
          document.head.appendChild(script);
      });
    }
  });
  if(noGsap === true){
    const script = document.createElement('script');
          script.setAttribute('src','https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js');
          script.setAttribute('data-js-framework','true');
          document.head.appendChild(script);
  }
}

export {importCSSAndAnimation}

// export const CSSFRAMEWORKOptionList =  CSSFrameworkPluginList;
export const CSSFRAMEWORKOptionList =  [];
export function pushCSSConfig(data){
  const dataanimation = JSON.parse(data)
  dataanimation.forEach(anim => {
    let linkScript = `\n<link rel='stylesheet' href='${anim.rawLink}'>`;
    const newObject = {
      name : anim.name,
      value : anim.value,
      link : linkScript,
      rawLink : anim.rawLink
    }
    CSSFRAMEWORKOptionList.push(newObject)
  });
  // console.log(CSSFRAMEWORKOptionList)
}

const scrollTrigger = {Name: "ScrollTrigger",field: [
  {fieldname: "Trigger", ST: "true", type: "text"},
  {fieldname: "Start", ST: "true", type: "text", value:"top 80%"},
  {fieldname: "End", ST: "true", type: "text", value:"top 20%"},
  {fieldname: "ToggleActions", ST: "true", type: "text", value:"play pause resume reverse"},
  {fieldname: "Scrub", ST: "true", type: "number", value:"1", min: "0", max: "1", step: "0.1"},
  {fieldname: "Marker", ST: "true", type: "text", gsapMarker: true, value:"top 50%", value2:"top 20%"},
]}; export {scrollTrigger};

const FunctionAndProperties = {Name: "Properties.",field: [
  {fieldname: "Yoyo", value:"yoyo", type: "select", option:["true", "false"] },
  {fieldname: "onEnter", value:"onEnter", type: "textarea"},
  {fieldname: "onLeave", value:"onLeave", type: "textarea"},
  {fieldname: "onEnterBack", value:"onEnterBack", type: "textarea"},
  {fieldname: "onLeaveBack", value:"onLeaveBack", type: "textarea"},
  {fieldname: "onUpdate", value:"onUpdate", type: "textarea", behavior: "self"},
  {fieldname: "Other Function", value:"function", type: "textarea", behavior: "special"},
]}; export {FunctionAndProperties};


const gsapAnimationField =[
{Name: "Selector & Duration",field: [
  {fieldname: "Object-to-manipulate", value:"manipulateObject", type: "select", option:[], selector: "true" },
  {fieldname: "Duration", type: "number", val: "duration", value:"0.5", min: "0", max: "9999", step: "0.1"},
  {fieldname: "Delay", type: "number", val: "delay", value:"0.5", min: "0", max: "9999", step: "0.1"},
]},
{Name: "Translate",field: [
  {fieldname: "translate-x", value:"x", type: "range&Parameter", min:"-2000", max:"2000", step:"10" },
  {fieldname: "translate-y", value:"y", type: "range&Parameter", min:"-2000", max:"2000", step:"10" },
  {fieldname: "translate-z", value:"z", type: "range&Parameter", min:"-2000", max:"2000", step:"10" }
]},
{Name: "Scale",field: [
  {fieldname: "scale-x", value:"scaleX", type: "range", min:"0", max:"10", step:"0.01" },
  {fieldname: "scale-y", value:"scaleY", type: "range", min:"0", max:"10", step:"0.01" },
  {fieldname: "scale-z", value:"scaleZ", type: "range", min:"0", max:"10", step:"0.01" },
]},
{Name: "Rotate",field: [
  {fieldname: "rotate-z", value:"rotateX", type: "range", min:"0", max:"359", step:"1" },
  {fieldname: "rotate-y", value:"rotateY", type: "range", min:"0", max:"359", step:"1" },
  {fieldname: "rotate-x", value:"rotateZ", type: "range", min:"0", max:"359", step:"1" },
]},
{Name: "Skew",field: [
  {fieldname: "Skew-x", value:"skewX", type: "range&Parameter", min:"-2000", max:"2000", step:"10" },
  {fieldname: "Skew-y", value:"skewY", type: "range&Parameter", min:"-2000", max:"2000", step:"10" }
]},
{Name: "Color & Opacity",field: [
  {fieldname: "Opacity", value:"opacity", type: "range", min:"0", max:"1", step:"0.01" },
  {fieldname: "Border Radius", value:"borderRadius", type: "range", min:"0", max:"100", step:"1" },
  {fieldname: "BackgroundColor", value:"backgroundColor", type: "colorOpac", min:"0", max:"359", step:"1" },
  {fieldname: "Color", value:"color", type: "colorOpac", min:"0", max:"359", step:"1" },
  {fieldname: "BorderColor", value:"borderColor", type: "colorOpac", min:"0", max:"359", step:"1" },
]},
{Name: "Filter",field: [
  {fieldname: "Blur", value:"blur", type: "range", min:"0", max:"50", step:"1" },
  {fieldname: "Brightness", value:"brightness", type: "range", min:"0", max:"309", step:"1" },
  {fieldname: "Contrast", value:"contrast", type: "range", min:"0", max:"359", step:"1" },
  {fieldname: "Grayscale", value:"grayscale", type: "range", min:"0", max:"100", step:"1" },
  {fieldname: "Hue Rotate", value:"hue-rotate", type: "range", min:"0", max:"359", step:"1" },
  {fieldname: "Invert", value:"invert", type: "range", min:"0", max:"100", step:"1" },
  {fieldname: "Saturate", value:"saturate", type: "range", min:"0", max:"3", step:"0.01" },
  {fieldname: "Sepia", value:"sepia", type: "range", min:"0", max:"1", step:"0.01" },
]},
{Name: "Misc.",field: [
  {fieldname: "Pin", type: "select", option:["true", "false"] },
  {fieldname: "PinSpacing", type: "select", option:["margin", "padding"] },
  {fieldname: "Once", value:"once", type: "select", option:["true", "false"] },
  {fieldname: "Id", value:"id", type: "text"},
  {fieldname: "invalidateOnRefresh", value:"invalidateOnRefresh", type: "select", option:["true", "false"] },
  {fieldname: "Snap", value:"snap", type: "select", option:["1", "top", "left"] },
]},

]; export { gsapAnimationField };

const gsapAnimationForm = 
`

<form id="GsapAnimationEditor" data-id="lazydev">

<fieldset data-id="formFieldset" id="formfieldsetGsapAnimationEditor">

<legend data-id="formlegend" id="formmakerlegendGsapAnimationEditor">
Gsap Animation Editor</legend>

<div id="IDS"></div>
  
  <div id="Newfield1" inputid="inputid1" class="radio-GsapAnimationEditor" data-id="radioinput" style="width: 100%;">
<input id="radio-Lazy-GsapTo" type="radio" name="option" value="Gsap.To">
<label>
Gsap.To</label>
<input id="radio-Lazy-gsapFrom" type="radio" name="option" value="Gsap.From">
<label>
Gsap.From</label>
</div>
<div id="Newfield2" inputid="inputid2" style="width: 100%;">
<label id="NewField2" for="NewFIeld2" labelid="label2" style="width: 50% !important;">
Put Code On :</label>
<select fieldid="field2" id="Gsap-PutCode-SelectorGsap" name="NewFIeld2" style="width: 45% !important;">
<option value="#gsapBody">
Body</option>
</select>
</div>

<div id="GsapTrigger" inputid="inputid5" style="width: 100%;">
<label id="GsapTriggerlabel" for="NewFIeld5" labelid="label5" style="width: 50% !important;">
Trigger :</label>
<select fieldid="field5" id="GsapTriggerinput" name="NewFIeld5" style="width: 45% !important;">
<option value="enterance">
Enterance</option>
<option value="Scrolltrigger">
Scrolltrigger</option>
<option value="onClick">
onClick</option>
<option value="onHover">
onHover</option>
<option value="onInput">
onInput</option>
<option value="drag">
drag</option>
</select>
</div>


<section class="none-mode">

<div>
<paragraph inputid="inputid3" fieldid="field3" style="font-size: 14px; margin-left: -2%; color: rgb(255, 255, 255);">
Position Properties</paragraph>
</div>


<hr inputid="inputid4" fieldid="field4" style="border-top: 1px solid rgba(255, 255, 255, 0.28); border-right: none; border-bottom: none; border-left: none; border-image: initial; margin: 10px 0px; opacity: 1;">

<div id="gsapX" inputid="inputid5" class="checkbox-GsapAnimationEditor" data-id="checkboxInput" style="width: 30% !important;">

<label id="gsapXlabel" for="NewFIeld5" labelid="label5" style="width: 100%;">
TranslateX</label>

<input fieldid="field5" type="checkbox" id="gsapXinput" name="NewFIeld5" style="width: 100%;">

</div>

<div id="gsapXRange" inputid="inputid7" style="width: 80% !important;">
<label id="gsapXRangelabel" for="NewFIeld7" labelid="label7" style="width: 100% !important;">
Translate X ()</label>
<input fieldid="field7" type="range" min="1" max="100" value="50" step="1" id="gsapXRangeinput" name="NewFIeld7" style="width: 90% !important;">
</div>

<div id="Newfield8" inputid="inputid8" style="width: 20% !important;">
<label id="NewField8" for="NewFIeld8" labelid="label8" style="width: 0%; display: none;">
select Field 8</label>
<select fieldid="field8" id="NewField8" name="NewFIeld8" style="width: 100%;">
<option value="px">
px</option>
<option value="%">
%</option>
</select>
</div>

<div id="Newfield9" inputid="inputid9" style="width: 100%;">
<label id="NewField9" for="NewFIeld9" labelid="label9" style="width: 45% !important;">
Number</label>
<input fieldid="field9" type="number" min="0" id="NewField9" name="NewFIeld9" style="width: 50% !important;">
</div>

<div id="Newfield10" inputid="inputid10" style="width: 100%;">
<label id="NewField10" for="NewFIeld10" labelid="label10" style="width: 45% !important;">
Text</label>
<input fieldid="field10" type="text" id="NewField10" name="NewFIeld10" style="width: 50% !important;">
</div>

<div id="Newfield11" inputid="inputid11" style="width: 80% !important;">
<label id="NewField11" for="NewFIeld11" labelid="label11" style="width: 85% !important;">
Background-Color</label>
<input fieldid="field11" type="color" value="#c512ad" id="NewField11" name="NewFIeld11" style="width: 10% !important;">
</div>
<div id="Newfield13" inputid="inputid13" style="width: 20% !important;">
<label id="NewField13" for="NewFIeld13" labelid="label13" style="width: 100% !important;">
Opacity</label>
<input fieldid="field13" type="range" min="1" max="100" value="50" step="1" id="NewField13" name="NewFIeld13" style="width: 100% !important;">
</div>

<div data-id="buttondivz" id="SubmitDivGsapAnimationEditor" style="opacity: 1;">

    <button data-id="buttoninputzzz" id="SubmitButtonGsapAnimationEditor" type="submit">
Submit</button>

  </div>

</section>


</fieldset>

</form>

<style>

#GsapAnimationEditor {
  background: rgba(21, 33, 41, 1)!important;
    display: block;
    width: 100%!important;
    box-shadow: 10px 10px 17px -9px rgba(49,37,50,0.58) ;
    padding-right: 2%;
    padding-left: 2%;
    padding-bottom: 5%;
    
}

#formfieldsetGsapAnimationEditor {
  border: 1px groove #c4c4c4;
  border-radius: 1%;
    padding-top: 5%;
    padding-right: 5%;
    padding-bottom: 10%;
    padding-left: 5%;
}

#formmakerlegendGsapAnimationEditor {
  font-size: 17px;
  color: #b3b3b3;
  font-family: Georgia;
}

#GsapAnimationEditor div {
    display: inline-block;
    width:100%;
    font-size: 12px;
    margin-top: 4%;
    margin-bottom: 1%;
    margin-left: -2%;
}

#GsapAnimationEditor label {
  width:100%; 
  display: inline-block;
  color: #b3b3b3;
  font-family: Georgia;
  font-style:normal;
  font-size: 12px;
  font-weight: 100;
  margin-top: 0%;
  margin-bottom: 0%;
  word-spacing: 0;
}

#GsapAnimationEditor input, textarea {
  width:90%;
  display: inline-block;
  font-size: 12px;
  font-family: Georgia;
  font-style: normal;
  font-weight: 100;
  color: #d9d9d9;
  background-color: rgba(40, 
61, 
83, 0.99);
  border: 1px none #c4c4c4;
  border-radius: 8px;
  margin-top: 0%;
  word-spacing: 0px;
  margin-bottom: 1%;
}

#GsapAnimationEditor input[type="file"] {
  color: #4b4b4b;
  background-color: rgba(201, 
201, 
201, 0.99);
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  
}

#GsapAnimationEditor input[type="date"] {

  color: #4b4b4b;
  background-color: rgba(201, 
201, 
201, 0.99);
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  cursor: pointer;
}

#GsapAnimationEditor input[type="color"] {

  color: #c9c9c9;
  background-color: rgba(29, 
45, 
53, 0.99);
  border: 1px none #c4c4c4;
  border-radius: 16px;
  cursor: pointer;
}

#GsapAnimationEditor textarea {
  width:100%; /* Nanti Hapus semua bracket */
}

#GsapAnimationEditor select {
  width:100%;
  display: inline-block;
  color: #b3b3b3;
  background-color: rgba(50, 
57, 
78, 0.99);
  border: 1px none #c4c4c4;
  padding-top: 1%;
  padding-bottom: 1%;
  padding-left: 10%;
  border-radius: 11px;
  cursor: pointer;
}

#SubmitDivGsapAnimationEditor {
  width:100%!important;
}

#GsapAnimationEditor button {
 
  width: 100%;
  font-family: Georgia;
  padding: 10px 20px;
  background-color: rgba(2, 
74, 
110, 0.99);
  color: wheat;
  border: none;
  padding: 5px 5px 5px 5px;
  border-radius: 1px 1px 1px 1px;
  font-size: 16px;
  font-style: normal;
  font-weight: 100;
  word-spacing: 0px;
  cursor: pointer;
  transition: all 0.3s;
}

#GsapAnimationEditor button:hover {

  background-color: rgba(0, 
25, 
51, 0.99);
  color: #dedede;
}

#GsapAnimationEditor input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  width: 100%!important;
  height: 1px;
  background: none;
  outline: 0px solid #f3e6eb;
  border: none;
}

#GsapAnimationEditor input[type="range"]::-webkit-slider-runnable-track {
  background-color: #c2c2c2;
  border-radius: 10px;
}

#GsapAnimationEditor input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 10px;
  height: 10px;
  background: #696969;
  border-radius: 50%;
  cursor: pointer;
}

#GsapAnimationEditor input[type="range"]:focus::-webkit-slider-thumb {
  outline: 0px solid #6b1137;
  outline-offset: 1px;
}

#GsapAnimationEditor input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: rgb(105, 105, 105);
  border-radius: 50%;
  cursor: pointer;
}

#GsapAnimationEditor input[type="range"]:focus::-moz-range-thumb{
  outline: 0px solid #6b1137;
  outline-offset: 1px;
}

.checkbox-GsapAnimationEditor {
  display: inline-flex !important;
  flex-direction: row!important;
  align-items: flex-start!important;
  margin-bottom: 10px;
}

.checkbox-GsapAnimationEditor label {
  width:90%!important;
  display: inline-block;
  margin-left: 10px;
}

.checkbox-GsapAnimationEditor input[type="checkbox"] {
  width: 10%!important;
  display: inline-block;
  order: -1;
  margin-right: 5px;
}

.radio-GsapAnimationEditor {
  display: flex!important;
  flex-wrap: wrap;
  width: 100%!important;
  flex-direction: row!important;
  align-items: flex-start!important;
  align-content: center;
  margin-bottom: 10px;
}

.radio-GsapAnimationEditor label {
  display: inline-block;
  width: 35%!important;
}

.radio-GsapAnimationEditor input[type="radio"] {
  width: 10%!important;
  display: inline-block;
  margin-right: 5px;
}

@media screen and (max-width: 768px) {

  #formmakerlegendGsapAnimationEditor {
    font-size: 17px;
  }

  #GsapAnimationEditor label {
    font-size: 12px;
  }
  
  #GsapAnimationEditor input, textarea {

    font-size: 12px;
  }

  #GsapAnimationEditor button {
 
    font-size: 16px;
  }

  .radio-GsapAnimationEditor label {
    display: inline-block;
    width: 80%!important;
  }
  
  
}

@media screen and (max-width: 480px) {
  
  #formmakerlegendGsapAnimationEditor {
    font-size: 17px;
  }

  #GsapAnimationEditor label {
    font-size: 12px;
  }
  
  #GsapAnimationEditor input, textarea {

    font-size: 12px;
  }

  #GsapAnimationEditor button {
 
    font-size: 16px;
  }

  .radio-GsapAnimationEditor label {
    display: inline-block;
    width: 80%!important;
  }
  
  
}




</style>
`;
export { gsapAnimationForm };


const animationContainerContent = 
`
<div id="animate-head" class="head-anim-class">
    <h3 class="animhead-h3">Animation</h3><button id="animhead-button-trigger" class="animhead-button">Close</button>
  </div>
  <div id="animate-body" class="body-anim-class">
<section id="animation-option-container" class="animation-option-container">
    <h1 id="lazydev-choose-animation-title" class="lazydev-choose-animation-title">
        Choose Animation
    </h1>

    <select id="lazydev-choose-animation" class="lazydev-choose-animation">
    </select>

    <button id="animation-option-submit" class="animation-option-submit" type="button">
        Submit
    </button>
</section>
  </div>
`;
export {animationContainerContent};

export const gsapWaring = `
    <div id="div-18c677f43811" class="DIV-18c677f43811">
        <h1 id="h1-18c6780b4d81" class="H1-18c6780b4d81">
            Attention
        </h1>

        <p id="p-18c6783bf471" class="P-18c6783bf471">
            We will direct you to a new tab with the GSAP animation page. Please ensure you have saved this page before clicking the
            <strong><i>'Open GSAP Editor'</i></strong> button to ensure the rendered page matches the current state of this page.&nbsp;
        </p>

        <div id="div-18c6785dcb11" class="DIV-18c6785dcb11">
            <button id="open-gsap-editor-button" class="open-gsap-editor-button" type="button">
                <icon id="icon-18c67865ee71" class="fas fa-chevron-right" style="padding-right: 1em;"></icon>
                Open Gsap Editor
            </button>

            <button id="gsap-cancel-editor-button" class="gsap-cancel-editor-button" type="button">
                Don't Open Editor
            </button>
        </div>
    </div>

`;

export const SmoothWarning = `
    <div id="div-18c677f43811" class="DIV-18c677f43811">
        <h1 id="h1-18c6780b4d81" class="H1-18c6780b4d81">
            Attention
        </h1>

        <p id="p-18c6783bf471" class="P-18c6783bf471">
            We will direct you to a new tab with the Smooth Scroll animation page. Please ensure you have saved this page before clicking the
            <strong><i>'Open Smooth Scroll Editor'</i></strong> button to ensure the rendered page matches the current state of this page.&nbsp;
        </p>

        <div id="div-18c6785dcb11" class="DIV-18c6785dcb11">
            <button id="open-gsap-editor-button" class="open-gsap-editor-button" type="button">
                <icon id="icon-18c67865ee71" class="fas fa-chevron-right" style="padding-right: 1em;"></icon>
                Open Smooth Scroll Editor
            </button>

            <button id="gsap-cancel-editor-button" class="gsap-cancel-editor-button" type="button">
                Don't Open Editor
            </button>
        </div>
    </div>

`;

export const createAnimation = 
`

<form id="GsapAnimationGenerator" data-id="lazydev">

<fieldset data-id="formFieldset" id="formfieldsetGsapAnimationGenerator">

<legend data-id="formlegend" id="formmakerlegendGsapAnimationGenerator">
Create Animation</legend>


  
  <div id="gsapSelector" inputid="inputid1" style="width: 100%;">
<label id="gsapSelectorlabel" for="gsapSelector" labelid="label1" style="width: 30% !important;">
Selector :</label>
<input fieldid="field1" type="text" id="gsapSelectorinput" name="gsapSelector" style="width: 67% !important;">
</div>
<div id="Newfield2" inputid="inputid2" style="width: 100% !important;">
<button button="2" style="width: 100%; font-size: 12px;">
Open Selector Tools</button>
</div>
<div id="AnimationName" inputid="inputid3" style="width: 100%;">
<label id="AnimationNamelabel" for="Animation Name" labelid="label3" style="width: 50% !important;">
Animation Name :</label>
<input fieldid="field3" type="text" id="AnimationNameinput" name="Animation Name" style="width: 45% !important;">
</div>
<div id="gsaptimeline" inputid="inputid4" style="width: 100%;">
<label id="gsaptimelinelabel" for="NewFIeld4" labelid="label4" style="width: 50% !important;">
Gsap Timeline :</label>
<select fieldid="field4" id="gsaptimelineinput" name="NewFIeld4" style="width: 45% !important;">
<option value="false">
false</option>
<option value="true">
true</option>
</select>
</div>
<div id="GsapTrigger" inputid="inputid5" style="width: 100%;">
<label id="GsapTriggerlabel" for="NewFIeld5" labelid="label5" style="width: 50% !important;">
Trigger :</label>
<select fieldid="field5" id="GsapTriggerinput" name="NewFIeld5" style="width: 45% !important;">
<option value="enterance">
enterance</option>
<option value="Scrolltrigger">
Scrolltrigger</option>
<option value="onClick">
onClick</option>
<option value="onHover">
onHover</option>
<option value="onInput">
onInput</option>
<option value="drag">
drag</option>
</select>
</div>
<div id="SaveGsap" inputid="inputid6" style="width: 100%;">
<button id="savegsap" button="6" style="width: 100%;">
Save</button>
</div>

</fieldset>

</form>
<style>
#GsapAnimationGenerator {
  background: rgba(3, 3, 3, 0.99)!important;
    display: block;
    width: 100%!important;
    box-shadow: 10px 10px 17px -9px rgba(49,37,50,0.28) ;
    padding-left: 1rem;
    padding-right: 1rem;
    min-height: 60vh;
    
}

#formfieldsetGsapAnimationGenerator {
  border: 1px solid #808080;
  border-radius: 1%;
    padding-top: 5%;
    padding-right: 5%;
    padding-bottom: 5%;
    padding-left: 5%;
}

#formmakerlegendGsapAnimationGenerator {
  font-size: 17px;
  color: #4b4b4b;
  font-family: Georgia;
}

#GsapAnimationGenerator div {
    display: inline-block;
    width:100%;
    font-size: 12px;
    margin-top: 1%;
    margin-bottom: 1%;
    margin-left: -2%;
}

#GsapAnimationGenerator label {
  width:100%; 
  display: inline-block;
  color: #a8a8a8;
  font-family: Georgia;
  font-style:normal;
  font-size: 12px;
  font-weight: 100;
  margin-top: 0%;
  margin-bottom: 0%;
  word-spacing: 0;
}

#GsapAnimationGenerator input, textarea {
  width:90%;
  display: inline-block;
  font-size: 12px;
  font-family: Georgia;
  font-style: normal;
  font-weight: 100;
  color: #d9d9d9;
  background-color: rgba(8, 
8, 
8, 0.99);
  border: 1px solid #808080;
  border-radius: 1px;
  margin-top: 0%;
  word-spacing: 0px;
  margin-bottom: 1%;
}

#GsapAnimationGenerator input[type="file"] {
  color: #4b4b4b;
  background-color: rgba(201, 
201, 
201, 0.99);
  border: 1px solid #808080;
  border-radius: 5px;
  
}

#GsapAnimationGenerator input[type="date"] {

  color: #4b4b4b;
  background-color: rgba(201, 
201, 
201, 0.99);
  border: 1px solid #808080;
  border-radius: 5px;
  cursor: pointer;
}

#GsapAnimationGenerator input[type="color"] {

  color: #c9c9c9;
  background-color: rgba(201, 
201, 
201, 0.99);
  border: 1px solid #808080;
  border-radius: 5px;
  cursor: pointer;
}

#GsapAnimationGenerator textarea {
  width:100%; /* Nanti Hapus semua bracket */
}

#GsapAnimationGenerator select {
  width:100%;
  display: inline-block;
  color: #303030;
  background-color: rgba(201, 
201, 
201, 0.99);
  border: 1px solid #808080;
  padding-top: 1%;
  padding-bottom: 1%;
  border-radius: 5px;
  cursor: pointer;
}

#SubmitDivGsapAnimationGenerator {
  width:100%!important;
}

#GsapAnimationGenerator button {
 
  width: 100%;
  font-family: Georgia;
  padding: 10px 20px;
  background-color: rgba(3, 
37, 
48, 0.99);
  color: #bfbfbf;
  border: none;
  padding: 5px 5px 5px 5px;
  border-radius: 1px 1px 1px 1px;
  font-size: 16px;
  font-style: normal;
  font-weight: 100;
  word-spacing: 0px;
  cursor: pointer;
}

#GsapAnimationGenerator button:hover {

  background-color: rgba(34, 
154, 
206, 0.99);
  color: #3d3d3d;
}

#GsapAnimationGenerator input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  width: 100%!important;
  height: 1px;
  background: none;
  outline: 0px solid #f3e6eb;
  border: none;
}

#GsapAnimationGenerator input[type="range"]::-webkit-slider-runnable-track {
  background-color: #c2c2c2;
  border-radius: 10px;
}

#GsapAnimationGenerator input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 10px;
  height: 10px;
  background: #696969;
  border-radius: 50%;
  cursor: pointer;
}

#GsapAnimationGenerator input[type="range"]:focus::-webkit-slider-thumb {
  outline: 0px solid #6b1137;
  outline-offset: 1px;
}

#GsapAnimationGenerator input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: rgb(105, 105, 105);
  border-radius: 50%;
  cursor: pointer;
}

#GsapAnimationGenerator input[type="range"]:focus::-moz-range-thumb{
  outline: 0px solid #6b1137;
  outline-offset: 1px;
}

.checkbox-GsapAnimationGenerator {
  display: inline-flex !important;
  flex-direction: row!important;
  align-items: flex-start!important;
  margin-bottom: 10px;
}

.checkbox-GsapAnimationGenerator label {
  width:90%!important;
  display: inline-block;
  margin-left: 10px;
}

.checkbox-GsapAnimationGenerator input[type="checkbox"] {
  width: 10%!important;
  display: inline-block;
  order: -1;
  margin-right: 5px;
}

.radio-GsapAnimationGenerator {
  display: flex!important;
  flex-wrap: wrap;
  width: 100%!important;
  flex-direction: row!important;
  align-items: flex-start!important;
  align-content: center;
  margin-bottom: 10px;
}

.radio-GsapAnimationGenerator label {
  display: inline-block;
  width: 80%!important;
}

.radio-GsapAnimationGenerator input[type="radio"] {
  width: 10%!important;
  display: inline-block;
  margin-right: 5px;
}

@media screen and (max-width: 768px) {

  #formmakerlegendGsapAnimationGenerator {
    font-size: 17px;
  }

  #GsapAnimationGenerator label {
    font-size: 12px;
  }
  
  #GsapAnimationGenerator input, textarea {

    font-size: 12px;
  }

  #GsapAnimationGenerator button {
 
    font-size: 16px;
  }

  .radio-GsapAnimationGenerator label {
    display: inline-block;
    width: 80%!important;
  }
  
  
}

@media screen and (max-width: 480px) {
  
  #formmakerlegendGsapAnimationGenerator {
    font-size: 17px;
  }

  #GsapAnimationGenerator label {
    font-size: 12px;
  }
  
  #GsapAnimationGenerator input, textarea {

    font-size: 12px;
  }

  #GsapAnimationGenerator button {
 
    font-size: 16px;
  }

  .radio-GsapAnimationGenerator label {
    display: inline-block;
    width: 80%!important;
  }
  
  
}



</style>

`;

export const animationPack = `

<form id="AnimationPack" data-id="lazydev">

<fieldset data-id="formFieldset" id="formfieldsetAnimationPack">

<legend data-id="formlegend" id="formmakerlegendAnimationPack">
Animation Pack</legend>

<div data-id="buttondivz" id="SubmitDivAnimationPack">

    <button data-id="buttoninputzzz" id="SubmitButtonAnimationPack" type="submit">
Save Setting</button>

  </div>

</fieldset>

</form>
<style>

#AnimationPack {
    background: rgba(7, 29, 26, 0.99)!important;
      display: block;
      width: 100%!important;
      box-shadow: 10px 10px 17px -9px rgba(49,37,50,0.28) ;
      padding: 1.3rem;

      
  }

  #formfieldsetAnimationPack {
    border: 1px solid #808080;
    border-radius: 1%;
      padding-top: 5%;
      padding-right: 5%;
      padding-bottom: 5%;
      padding-left: 5%;
  }

  #formmakerlegendAnimationPack {
    font-size: 17px;
    color: #c2c2c2;
    font-family: Georgia;
  }
  
  #AnimationPack div {
      display: inline-block;
      width:100%;
      font-size: 12px;
      margin-top: 1%;
      margin-bottom: 1%;
      margin-left: -2%;
  }
  
  #AnimationPack label {
    width:100%; 
    display: inline-block;
    color: #c2c2c2;
    font-family: Georgia;
    font-style:normal;
    font-size: 12px;
    font-weight: 100;
    margin-top: 0%;
    margin-bottom: 0%;
    word-spacing: 0;
  }
  
  #AnimationPack input, textarea {
    width:90%;
    display: inline-block;
    font-size: 12px;
    font-family: Georgia;
    font-style: normal;
    font-weight: 100;
    color: #a6a6a6;
    background-color: rgba(204, 
204, 
204, 0.99);
    border: 1px solid #808080;
    border-radius: 1px;
    margin-top: 0%;
    word-spacing: 0px;
    margin-bottom: 1%;
  }
  
  #AnimationPack input[type="file"] {
    color: #4b4b4b;
    background-color: rgba(201, 
201, 
201, 0.99);
    border: 1px solid #808080;
    border-radius: 5px;
    
  }
  
  #AnimationPack input[type="date"] {
  
    color: #4b4b4b;
    background-color: rgba(201, 
201, 
201, 0.99);
    border: 1px solid #808080;
    border-radius: 5px;
    cursor: pointer;
  }
  
  #AnimationPack input[type="color"] {
  
    color: #c9c9c9;
    background-color: rgba(201, 
201, 
201, 0.99);
    border: 1px solid #808080;
    border-radius: 5px;
    cursor: pointer;
  }
  
  #AnimationPack textarea {
    width:100%; /* Nanti Hapus semua bracket */
  }
  
  #AnimationPack select {
    width:100%;
    display: inline-block;
    color: #303030;
    background-color: rgba(201, 
201, 
201, 0.99);
    border: 1px solid #808080;
    padding-top: 1%;
    padding-bottom: 1%;
    border-radius: 5px;
    cursor: pointer;
  }
  
  #SubmitDivAnimationPack {
    width:100%!important;
  }
  
  #AnimationPack button {
    margin-top: 1.3rem;
    width: 100%;
    font-family: Georgia;
    padding: 10px 20px;
    background-color: rgba(1, 
75, 
63, 0.99);
    color: #ffffff;
    border: none;
    padding: 5px 5px 5px 5px;
    border-radius: 1px 1px 1px 1px;
    font-size: 16px;
    font-style: normal;
    font-weight: 100;
    word-spacing: 0px;
    cursor: pointer;
  }
  
  #AnimationPack button:hover {
  
    background-color: rgba(33, 
177, 
196, 0.99);
    color: #000000;
  }
  
  #AnimationPack input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    width: 100%!important;
    height: 1px;
    background: none;
    outline: 0px solid #f3e6eb;
    border: none;
  }
  
  #AnimationPack input[type="range"]::-webkit-slider-runnable-track {
    background-color: #c2c2c2;
    border-radius: 10px;
  }
  
  #AnimationPack input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 10px;
    height: 10px;
    background: #696969;
    border-radius: 50%;
    cursor: pointer;
  }
  
  #AnimationPack input[type="range"]:focus::-webkit-slider-thumb {
    outline: 0px solid #6b1137;
    outline-offset: 1px;
  }
  
  #AnimationPack input[type="range"]::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: rgb(105, 105, 105);
    border-radius: 50%;
    cursor: pointer;
  }
  
  #AnimationPack input[type="range"]:focus::-moz-range-thumb{
    outline: 0px solid #6b1137;
    outline-offset: 1px;
  }
  
  .checkbox-AnimationPack {
    display: inline-flex !important;
    flex-direction: row!important;
    align-items: flex-start!important;
    margin-bottom: 10px;
  }
  
  .checkbox-AnimationPack label {
    width:90%!important;
    display: inline-block;
    margin-left: 10px;
  }
  
  .checkbox-AnimationPack input[type="checkbox"] {
    width: 10%!important;
    display: inline-block;
    order: -1;
    margin-right: 5px;
  }
  
  .radio-AnimationPack {
    display: flex!important;
    flex-wrap: wrap;
    width: 100%!important;
    flex-direction: row!important;
    align-items: flex-start!important;
    align-content: center;
    margin-bottom: 10px;
  }
  
  .radio-AnimationPack label {
    display: inline-block;
    width: 80%!important;
  }
  
  .radio-AnimationPack input[type="radio"] {
    width: 10%!important;
    display: inline-block;
    margin-right: 5px;
  }
  
  @media screen and (max-width: 768px) {

    #formmakerlegendAnimationPack {
      font-size: 17px;
    }

    #AnimationPack label {
      font-size: 12px;
    }
    
    #AnimationPack input, textarea {
  
      font-size: 12px;
    }

    #AnimationPack button {
   
      font-size: 16px;
    }

    .radio-AnimationPack label {
      display: inline-block;
      width: 80%!important;
    }
    
    
  }

  @media screen and (max-width: 480px) {
    
    #formmakerlegendAnimationPack {
      font-size: 17px;
    }

    #AnimationPack label {
      font-size: 12px;
    }
    
    #AnimationPack input, textarea {
  
      font-size: 12px;
    }

    #AnimationPack button {
   
      font-size: 16px;
    }

    .radio-AnimationPack label {
      display: inline-block;
      width: 80%!important;
    }
    
    
  }
  
  
  
  
</style>


`;

//======================================================
const exporticon = `
<div class="export-option" id="lazy-save-page-setting" title="Save Page Setting">
    <i class="fas fa-solid fa-screwdriver-wrench"></i>
  </div>
  <div class="export-option" id="lazy-save-as-component" title="Save Component">
  <i class="fa-solid fa-floppy-disk"></i>
  </div>
  <div class="export-option" id="lazy-export-component" title="Export as HTML/JSX">
    <i class="fas fa-solid fa-scroll"></i>
  </div>
  <div class="export-option close-lazy-export" id="cancel-export" title="Close">
  <i class="fa-solid fa-rectangle-xmark"></i>
  </div>
`; 
export {exporticon};

const exporticon2 = `
<div class="export-option" id="lazy-export-as-html" title="Export As HTML">
  <i class="fa-brands fa-html5"></i>
  </div>
  <div class="export-option" id="lazy-export-as-jsx" title="Export as JSX">
    <i class="fa-brands fa-react"></i>
  </div>
  <div class="export-option close-lazy-export" id="cancel-export" title="Close">
  <i class="fa-solid fa-rectangle-xmark"></i>
  </div>
`; 
export {exporticon2};

const savePageorComponent = `
<form class="lazy-save-form" >
    <fieldset class="lazy-save-fieldset">
      
  <legend id="lazy-save-legend" style="padding-left: 0.3rem;">Save Page Setting</legend>
  <div style="background-color: #2b2b2b;">
    <label for="folder-select">Choose Folder:</label>
    <select id="folder-select">
      <option value="create-new">Create New Folder</option>
    </select>

    <div id="new-folder-div" class="none-mode">
    <label for="new-folder">Create New Folder:</label>
    <input type="text" id="new-folder" placeholder="Name your folder">
    </div>

    <label id="page-name-label" for="page-name">Page Name:</label>
    <input type="text" id="page-name">
  </div>

  <div class="lazy-div-export-button-container">
    <button id="lazy-save-button" class="save-button">Save</button>
    <button id="lazy-close-button" class="cancel-button">Cancel</button>
  </div>
    </fieldset>
  </form>
`; 
export {savePageorComponent};

const lazySavePageSuccess = `
<div id="lazy-save-page-content-id" class="lazy-save-page-content">
    <h4 id="save-success-ok"></h4>
    <button class="none-mode" id="lazy-save-page-content-button" >OK</button>
  </div>
`; export {lazySavePageSuccess};

const exportCodeContainer =`
<div id="lazy-export-component-container-child">
  <section class="lazy-export-component-head">
    <h2 class="lazy-export-component-title">Export Component</h2>
    <div id="lazy-export-component-head-Copy"><H4 id="lazy-export-component-head-Copy-h4">COPY</H4></div>
    <div id="lazy-export-component-head-Close"><i class="fa-solid fa-xmark"></i></div>
  </section>
  <section class="download-component-as-zip">
    <div class="lazy-zip-download-button" id="lazy-zip-download-button-with-image">Download As Zip With Images</div>
    <div class="lazy-zip-download-button"  id="lazy-zip-download-button-without-image">Download As Zip Without Images</div>
  </section>
  <section class="lazy-export-component-body">
  <div class="lazy-export-component-body-tab">
    <div id="lazy-code-tab-1" class="lazy-code-tab"><p class="lazy-code-text" id="lazy-code-text-html">HTML</p></div>
    <div id="lazy-code-tab-2" class="lazy-code-tab"><p class="lazy-code-text">CSS</p></div>
    <div id="lazy-code-tab-3" class="lazy-code-tab"><p class="lazy-code-text">JS</p></div>
  </div>
  <div class="lazy-export-component-body-content">
    <textarea id="lazy-export-component-body-textarea" rows="20" readonly>Ini Kontol</textarea>
  </div>
  </section>

  </div>
`; 
export {exportCodeContainer};