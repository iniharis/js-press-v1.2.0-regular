
import { FontSelected } from './main.js';
import { FontOption } from './main.js';
import { colorPalette } from './main.js';
import { ProjectCSSMainTarget } from './main.js';
import {closeBodyAnim} from './Animation.js'
import {animationArray,animationOptionList,animationPack,CSSFRAMEWORKArray,CSSFRAMEWORKOptionList,JSAnimationLinkPush} 
from './animatecontent.js';
import {propertiesEditor} from './ElementBuilder.js';
import {importJson} from './importcontent.js';
import {jsonExport} from './exportcontent.js';
import {createDynamic_Container} from './Custom_Data.js';

var timeline = gsap.timeline(); 

//fungsi prevent Default
function preventDefault(event) {
  event.preventDefault();
}

export let pagesetting_key = '';
let BodyBackgroundColorValueVal = "#e0e0e0";
let bgColorBody = "#e0e0e0";
let bgOpBody = 1;
let BodyMarginTopValueVal = 0;
let BodyMarginRightValueVal = 0;
let BodyMarginBottomValueVal = 0;
let BodyMarginLeftValueVal = 0;
let BodyPaddingTopValueVal = 0;
let BodyPaddingRightValueVal = 0;
let BodyPaddingBottomValueVal = 0;
let BodyPaddingLeftValueVal = 0;
let BodyFontVal = "b";
let BodyOverflowXValueVal = "hidden";
let BodyMarginParameterValueVal = "px";
let BodyPaddingParameterValueVal = "px";
let BodyAdditionalCssValueVal = `display: flex;
flex-direction: column;
min-height: 100vh;

`;
let ProjectCustomCSS = `
input:focus {
  outline: none; /* Menghapus border saat elemen dalam keadaan fokus */
}

@media only screen and (orientation: landscape) {
  html {
    font-size: 1vw; /* 1em for landscape mode */
  }
}

@media only screen and (orientation: portrait) {
  html {
    font-size: 2vh; /* 1em for potrait mode */
  }
}
@media only screen and (min-width: 768px) and (max-width: 1024px) {
html {
    font-size: 2vmin; /* 1em for Tablet mode */
  }
}
@media only screen and (min-aspect-ratio: 1/1) and (max-aspect-ratio: 1/1) {
 html {
    font-size: 4vmax;/* 1em for 1:1 Ratio mode */
  }
}

`; 
let styleEM = document.getElementById("Project-Custom-CSS-Style");
styleEM.innerHTML = ProjectCustomCSS;
//Responsive Form
let mobileResponsiveBreakPoint = 480;
export { mobileResponsiveBreakPoint };
let tabletResponsiveBreakPoint = 768;
export { tabletResponsiveBreakPoint };
//Advance Form
let bodyCustomJavascriptContent = " ";

export {BodyBackgroundColorValueVal,bgColorBody,bgOpBody,BodyMarginTopValueVal,BodyMarginRightValueVal,
  BodyMarginBottomValueVal,BodyMarginLeftValueVal,BodyPaddingTopValueVal,BodyPaddingRightValueVal,
  BodyPaddingBottomValueVal,BodyPaddingLeftValueVal,BodyFontVal,BodyOverflowXValueVal,BodyMarginParameterValueVal,
  BodyPaddingParameterValueVal,BodyAdditionalCssValueVal,ProjectCustomCSS,bodyCustomJavascriptContent
}

// Fungsi untuk mengubah opsi Margin yang terpilih
function changeSelectedMarginBody() {
    let marginParameterSelect = document.getElementById("BodyMarginParameterinput");

    // Mengubah opsi yang terpilih berdasarkan nilai BodyPaddingParameterValueVal
    for (let i = 0; i < marginParameterSelect.options.length; i++) {
      if (marginParameterSelect.options[i].value === BodyMarginParameterValueVal) {
        marginParameterSelect.selectedIndex = i;
        break;
      }
    }
  }
// Fungsi untuk mengubah opsi Target CSS yang terpilih dalam Tab Project
  function projectCssTargetSelected() {
    let projectSelectOption = document.getElementById("ProjectCSSTargetinput");

    // Mengubah opsi yang terpilih berdasarkan nilai BodyOverflowXValueVal
    for (let i = 0; i < projectSelectOption.options.length; i++) {
      if (projectSelectOption.options[i].value === ProjectCSSMainTarget) {
        projectSelectOption.selectedIndex = i;
        break;
      }
    }
  }

// Fungsi untuk mengubah opsi Padding yang terpilih
function changeSelectedPaddingBody() {
    let paddingParameterSelect = document.getElementById("BodyPaddingParameterinput");

    // Mengubah opsi yang terpilih berdasarkan nilai BodyPaddingParameterValueVal
    for (let i = 0; i < paddingParameterSelect.options.length; i++) {
      if (paddingParameterSelect.options[i].value === BodyPaddingParameterValueVal) {
        paddingParameterSelect.selectedIndex = i;
        break;
      }
    }
  }

// Fungsi untuk mengubah opsi Overflow-X yang terpilih
function overFlowXBody() {
    let overflowXParameterSelect = document.getElementById("bodyoverflowxinput");

    // Mengubah opsi yang terpilih berdasarkan nilai BodyOverflowXValueVal
    for (let i = 0; i < overflowXParameterSelect.options.length; i++) {
      if (overflowXParameterSelect.options[i].value === BodyOverflowXValueVal) {
        overflowXParameterSelect.selectedIndex = i;
        break;
      }
    }
  }

  // Fungsi untuk mengubah opsi Font-Family yang terpilih
function changeFontFamilyBody() {
  let bodyFontInput = document.getElementById("BodyFontinput");

  // Mengubah opsi yang terpilih berdasarkan nilai BodyPaddingParameterValueVal
  for (let i = 0; i < bodyFontInput.options.length; i++) {
    if (bodyFontInput.options[i].value === BodyFontVal) {
      bodyFontInput.selectedIndex = i;
      break;
    }
  }
}


// Mengubah Menu Container Menjadi Body Form
document.getElementById("Page-builder-setting").addEventListener("click", ChangemenutoBodyForm);

function ChangemenutoBodyForm(){
  document.getElementById("close-menu").addEventListener("click", closeBodyAnim);
    let BodyMenu = `
      <div id="BodyFormLayout">Layout</div>
      <div id="stylesetup">Style Setup</div>
      <div id="BodyFormAdvance">Project</div>
    `;

    let bodyMenuContainer = document.getElementById("menu-tab");
    //Menghapus Elemen Sebelumnya
    bodyMenuContainer.innerHTML = "";
    bodyMenuContainer.innerHTML = BodyMenu;
    
    let bodyForm = `

    <form id="BodySetting" data-id="lazydev">
      <fieldset id="formfieldset">
        <legend id="formmakerlegend">Project Setting</legend>

        <div id="BodyFont" inputid="inputid17" style="width: 100%; opacity: 1;">
          <label id="BodyFontlabel" for="BodyFontinput" labelid="label17" style="width: 40% !important;">Body Font </label>
          <select fieldid="field17" id="BodyFontinput" name="BodyFontinput" style="width: 55% !important;">
          <option value="Georgia">Georgia</option>
          </select>
        </div>
    
        <div id="bodyoverflowx" inputid="inputid3" style="width: 100%;">
          <label id="bodyoverflowxlabel" for="NewField3" labelid="label3" style="width: 45% !important;">Overflow-x</label>
          <select fieldid="field3" id="bodyoverflowxinput" name="NewField3" style="width: 50% !important;">
            <option value="hidden">hidden</option>
            <option value="scroll">scroll</option>
            <option value="visible">visible</option>
            <option value="auto">auto</option>
          </select>
        </div>
        <div id="Bodybackgroundcolor" inputid="inputid4" style="width: 100%;">
          <label id="Bodybackgroundcolorlabel" for="BodyBackgroundColor" labelid="label4" style="width: 45% !important;">Background Color</label>
          <input fieldid="field4" type="text" value="${BodyBackgroundColorValueVal}" id="Bodybackgroundcolorinput" name="BodyBackgroundColor" style="width: 50% !important;" readonly>
        <button id="openColorPalBody" type="button">Use Color Palatte</button>
        <button id="opencolorEditorBody" style="transform: scale(0);" type="button">Open color editor</button>
          </div>
        <div class="bodycolEditorDiv" style="width: 100% !important;">
        <input fieldid="field4" type="color" value="${bgColorBody}" id="BodybackgroundcolorcolorInput" name="BodyBackgroundColor">
        </div>
        <div class="bodycolEditorDiv" style="width: 100% !important;">
        <label >Opacity</label>
        <input type="range" max="1" step="0.01" min="0" value="${bgOpBody}" id="backgroundBodyOpacityNumber">
        </div>
        <hr inputid="inputid16" fieldid="field16" style="border-top: 1px solid rgba(163, 163, 163, 0.45); border-right: none; border-bottom: none; border-left: none; border-image: initial; margin: 10px 0px; opacity: 1;">
        <p inputid="inputid12" fieldid="field12" style="font-size: 14px; opacity: 1; color: rgb(219, 219, 219);">Margin</p>
        <hr inputid="inputid13" fieldid="field13" style="border-top: 1px solid rgba(199, 199, 199, 0.38); border-right: none; border-bottom: none; border-left: none; border-image: initial; margin: 10px 0px; opacity: 1;">
        <div id="BodyMarginParameter" inputid="inputid11" style="width: 100%; opacity: 1;">
          <label id="BodyMarginParameterlabel" for="NewField11" labelid="label11" style="width: 60% !important;">Margin Parameter</label>
          <select fieldid="field11" id="BodyMarginParameterinput" name="NewField11" value="${BodyMarginParameterValueVal}" style="width: 30% !important;">
            <option value="px">px</option>
            <option value="%">%</option>
            <option value="em">em</option>
            <option value="vw">vw</option>
            <option value="vh">vh</option>
          </select>
        </div>
        <div id="BodyMarginTop" inputid="inputid7" style="width: 25% !important; opacity: 1;">
          <label id="BodyMarginToplabel" for="MarginTop" labelid="label7" style="width: 100%;">Top</label>
          <input fieldid="field7" type="number" id="BodyMarginTopinput" name="MarginTop" max="1000" value="${BodyMarginTopValueVal}" step="1" style="width: 100%;" min="0">
        </div>
        <div id="BodyMarginRight" inputid="inputid8" style="width: 25% !important; opacity: 1;">
          <label id="BodyMarginRightlabel" for="MarginRight" labelid="label8" style="width: 100%;">Right</label>
          <input fieldid="field8" type="number" id="BodyMarginRightinput" name="MarginRight" max="1000" value="${BodyMarginRightValueVal}" step="1" style="width: 100%;" min="0">
        </div>
        <div id="BodyMarginBottom" inputid="inputid9" style="width: 25% !important; opacity: 1;">
          <label id="BodyMarginBottomlabel" for="MarginBottom" labelid="label9" style="width: 100%;">Bottom</label>
          <input fieldid="field9" type="number" id="BodyMarginBottominput" name="MarginBottom" max="1000" value="${BodyMarginBottomValueVal}" step="1" min="0" style="width: 100%;">
        </div>
        <div id="BodyMarginLeft" inputid="inputid10" style="width: 25% !important; opacity: 1;">
          <label id="BodyMarginLeftlabel" for="MarginLeft" labelid="label10" style="width: 100%;">Left</label>
          <input fieldid="field10" type="number" id="BodyMarginLeftinput" name="MarginLeft" max="1000" value="${BodyMarginLeftValueVal}" step="1" min="0" style="width: 100%;">
        </div>
        <hr inputid="inputid14" fieldid="field14" style="border-top: 1px solid rgba(194, 194, 194, 0.39); border-right: none; border-bottom: none; border-left: none; border-image: initial; margin: 10px 0px; opacity: 1;">
        <p inputid="inputid15" fieldid="field15" style="font-size: 14px; color: rgb(194, 194, 194); opacity: 1;">Padding</p>
        <hr inputid="inputid18" fieldid="field18" style="border-top: 1px solid rgba(186, 186, 186, 0.47); border-right: none; border-bottom: none; border-left: none; border-image: initial; margin: 10px 0px; opacity: 1;">
        <div id="BodyPaddingParameter" inputid="inputid17" style="width: 100%; opacity: 1;">
          <label id="BodyPaddingParameterlabel" for="NewField17" labelid="label17" style="width: 60% !important;">Padding Parameter</label>
          <select fieldid="field17" id="BodyPaddingParameterinput" name="NewField17" style="width: 30% !important;">
            <option value="px">px</option>
            <option value="%">%</option>
            <option value="em">em</option>
            <option value="vw">vw</option>
            <option value="vh">vh</option>
          </select>
        </div>
        <div id="BodyPaddingTop" inputid="inputid19" style="width: 25% !important;">
          <label id="BodyPaddingToplabel" for="PaddingTop" labelid="label19" style="width: 100%;">Top</label>
          <input fieldid="field19" type="number" id="BodyPaddingTopinput" name="PaddingTop" max="1000" value="${BodyPaddingTopValueVal}" step="1" min="0" style="width: 100%;">
        </div>
        <div id="BodyPaddingRight" inputid="inputid20" style="width: 25% !important;">
          <label id="BodyPaddingRightlabel" for="PaddingRight" labelid="label20" style="width: 100%;">Right</label>
          <input fieldid="field20" type="number" id="BodyPaddingRightinput" name="PaddingRight" max="1010" value="${BodyPaddingRightValueVal}" step="1" min="0" style="width: 100%;">
        </div>
        <div id="BodyPaddingBottom" inputid="inputid21" style="width: 25% !important;">
          <label id="BodyPaddingBottomlabel" for="PaddingBottom" labelid="label21" style="width: 100%;">Bottom</label>
          <input fieldid="field21" type="number" id="BodyPaddingBottominput" name="PaddingBottom" max="1000" value="${BodyPaddingBottomValueVal}" step="1" min="0" style="width: 100%;">
        </div>
        <div id="BodyPaddingLeft" inputid="inputid22" style="width: 25% !important;">
          <label id="BodyPaddingLeftlabel" for="PaddingLeft" labelid="label22" style="width: 100%;">Left</label>
          <input fieldid="field22" type="number" id="BodyPaddingLeftinput" name="PaddingLeft" max="1000" value="${BodyPaddingLeftValueVal}" step="1" min="0" style="width: 100%;">
        </div>
        <hr inputid="inputid14" fieldid="field14" style="border-top: 1px solid rgba(194, 194, 194, 0.39); border-right: none; border-bottom: none; border-left: none; border-image: initial; margin: 10px 0px; opacity: 1;">

        <div id="BodyCustomCss">
          <label>Body Additional</label>
          <textarea id="BodyCustomCssinput" rows="6">${BodyAdditionalCssValueVal}
          </textarea>
        </div>
        
      </fieldset> 
    </form>
    `;

    let menuContainer = document.getElementById("content-menu-controller");
    menuContainer.innerHTML = bodyForm;
    let HeadTitleChange = document.getElementById("head-menu-title");
    HeadTitleChange.textContent = "Project Setting";
    changeSelectedMarginBody();
    changeSelectedPaddingBody();
    overFlowXBody();
    populateSelectOptions();
    changeFontFamilyBody();
    //Tambahkan Event Listener Untuk Merubah Tab  
    document.getElementById("BodyFormAdvance").addEventListener("click", AdvanceBodyChange);
    document.getElementById("BodyFormLayout").addEventListener("click", layoutBodyChange);
    document.getElementById("stylesetup").addEventListener("click", StyleSetupChange);

// Mengambil elemen berdasarkan ID dan menambahkan event listener "click"

document.getElementById("BodybackgroundcolorcolorInput").addEventListener("input", EditBodySetting);
document.getElementById("backgroundBodyOpacityNumber").addEventListener("input", EditBodySetting);
document.getElementById("BodyMarginTopinput").addEventListener("input", EditBodySetting);
document.getElementById("BodyMarginRightinput").addEventListener("input", EditBodySetting);
document.getElementById("BodyMarginBottominput").addEventListener("input", EditBodySetting);
document.getElementById("BodyMarginLeftinput").addEventListener("input", EditBodySetting);
document.getElementById("BodyPaddingTopinput").addEventListener("input", EditBodySetting);
document.getElementById("BodyPaddingRightinput").addEventListener("input", EditBodySetting);
document.getElementById("BodyPaddingBottominput").addEventListener("input", EditBodySetting);
document.getElementById("BodyPaddingLeftinput").addEventListener("input", EditBodySetting);
document.getElementById("bodyoverflowxinput").addEventListener("input", EditBodySetting);
document.getElementById("BodyMarginParameterinput").addEventListener("input", EditBodySetting);
document.getElementById("BodyPaddingParameterinput").addEventListener("input", EditBodySetting);
document.getElementById("BodyCustomCssinput").addEventListener("input", EditBodySetting);
document.getElementById("BodyFontinput").addEventListener("input", EditBodySetting);
document.getElementById("openColorPalBody").addEventListener("click", function(event) {
  event.preventDefault();
  openColorPalateElement('Bodybackgroundcolorinput','BodybackgroundcolorcolorInput', 'backgroundBodyOpacityNumber', 'openColorPalBody', 'opencolorEditorBody', 'opencolorEditorBody');
});
document.getElementById("opencolorEditorBody").addEventListener("click", function(event) {
  event.preventDefault();
  openColorEditor('BodybackgroundcolorcolorInput', 'backgroundBodyOpacityNumber', 'openColorPalBody', 'opencolorEditorBody');
});
//document.getElementById("BodyFontinput").addEventListener("input", ubahFontBody);

} 

function importSetting(pagesetting){
//---//
// console.log(pagesetting)
pagesetting_key = pagesetting.pagesetting_key;
BodyBackgroundColorValueVal = pagesetting.background_val;
bgColorBody = pagesetting.background_color;
bgOpBody = pagesetting.background_opacity;
BodyMarginTopValueVal = pagesetting.margin_top;
BodyMarginRightValueVal = pagesetting.margin_right;
BodyMarginBottomValueVal = pagesetting.margin_bottom;
BodyMarginLeftValueVal = pagesetting.margin_left;
BodyPaddingTopValueVal = pagesetting.padding_top;
BodyPaddingRightValueVal = pagesetting.padding_right;
BodyPaddingBottomValueVal = pagesetting.padding_bottom;
BodyPaddingLeftValueVal = pagesetting.padding_left;
BodyOverflowXValueVal = pagesetting.overflow_x;
BodyMarginParameterValueVal = pagesetting.margin_parameter;
BodyPaddingParameterValueVal = pagesetting.padding_parameter;
BodyAdditionalCssValueVal = pagesetting.additional_css; // Additional CSS
BodyFontVal = pagesetting.body_font;
//-----//
mobileResponsiveBreakPoint = pagesetting.mobile_breakpoint;
tabletResponsiveBreakPoint = pagesetting.tablet_breakpoint;
// console.log(pagesetting.tablet_breakpoint + "px")
//---//
ProjectCustomCSS = pagesetting.custom_css;
styleEM.innerHTML = pagesetting.custom_css;
//---//
let scriptContainer = document.getElementById("bodyScript");
bodyCustomJavascriptContent = pagesetting.custom_js;
setTimeout(() => {
  scriptContainer.innerHTML = pagesetting.custom_js;
}, 100);
//---//
changebodyStyleStylePageSetting();
function changebodyStyleStylePageSetting(){
let bodycss = document.getElementById("bodyStyle");

  let bodyStyle = `
  body {
    margin-top: ${BodyMarginTopValueVal}${BodyMarginParameterValueVal};
    margin-right: ${BodyMarginRightValueVal}${BodyMarginParameterValueVal};
    margin-bottom: ${BodyMarginBottomValueVal}${BodyMarginParameterValueVal};
    margin-left: ${BodyMarginLeftValueVal}${BodyMarginParameterValueVal};
    padding-top: ${BodyPaddingTopValueVal}${BodyPaddingParameterValueVal};
    padding-right: ${BodyPaddingRightValueVal}${BodyPaddingParameterValueVal};
    padding-bottom: ${BodyPaddingBottomValueVal}${BodyPaddingParameterValueVal};
    padding-left: ${BodyPaddingLeftValueVal}${BodyPaddingParameterValueVal};
    background-color: ${BodyBackgroundColorValueVal};
    overflow-x: ${BodyOverflowXValueVal};
    font-family: ${BodyFontVal};
    ${BodyAdditionalCssValueVal}
  }
`;
bodycss.innerHTML = bodyStyle;
}
  

}

export {importSetting};
  
  // Membuat fungsi EditBodySetting
function EditBodySetting() {

  
    //Mengambil Container Style Body
let bodycss = document.getElementById("bodyStyle");    
    // Menggunakan variabel let untuk mengambil nilai .value
let bg = document.getElementById("Bodybackgroundcolorinput");
let bgColor =  document.getElementById("BodybackgroundcolorcolorInput").value;
let bgopacity = document.getElementById("backgroundBodyOpacityNumber").value;

let backgroundcolorValue = "rgba(" +
parseInt(bgColor.slice(1, 3), 16) + ", " +
parseInt(bgColor.slice(3, 5), 16) + ", " +
parseInt(bgColor.slice(5, 7), 16) + ", " +
bgopacity + ")";

bg.value = backgroundcolorValue;

let marginTopValue = document.getElementById("BodyMarginTopinput").value;
let marginRightValue = document.getElementById("BodyMarginRightinput").value;
let marginBottomValue = document.getElementById("BodyMarginBottominput").value;
let marginLeftValue = document.getElementById("BodyMarginLeftinput").value;
let paddingTopValue = document.getElementById("BodyPaddingTopinput").value;
let paddingRightValue = document.getElementById("BodyPaddingRightinput").value;
let paddingBottomValue = document.getElementById("BodyPaddingBottominput").value;
let paddingLeftValue = document.getElementById("BodyPaddingLeftinput").value;
let overflowXValue = document.getElementById("bodyoverflowxinput").value;
let marginParameterValue = document.getElementById("BodyMarginParameterinput").value;
let paddingParameterValue = document.getElementById("BodyPaddingParameterinput").value;
let BodyAdditionalCssValue = document.getElementById("BodyCustomCssinput").value;
let NewBodyFont = document.getElementById("BodyFontinput").value; 
let bodyStyle = `
  body {
    margin-top: ${marginTopValue}${marginParameterValue};
    margin-right: ${marginRightValue}${marginParameterValue};
    margin-bottom: ${marginBottomValue}${marginParameterValue};
    margin-left: ${marginLeftValue}${marginParameterValue};
    padding-top: ${paddingTopValue}${paddingParameterValue};
    padding-right: ${paddingRightValue}${paddingParameterValue};
    padding-bottom: ${paddingBottomValue}${paddingParameterValue};
    padding-left: ${paddingLeftValue}${paddingParameterValue};
    background-color: ${backgroundcolorValue};
    overflow-x: ${overflowXValue};
    font-family: ${NewBodyFont};
    ${BodyAdditionalCssValue}
  }
`;
  

bodycss.innerHTML = bodyStyle;
BodyBackgroundColorValueVal = backgroundcolorValue;
bgColorBody = bgColor;
bgOpBody = bgopacity;
BodyMarginTopValueVal = marginTopValue;
BodyMarginRightValueVal = marginRightValue;
BodyMarginBottomValueVal = marginBottomValue;
BodyMarginLeftValueVal = marginLeftValue;
BodyPaddingTopValueVal = paddingTopValue;
BodyPaddingRightValueVal = paddingRightValue;
BodyPaddingBottomValueVal = paddingBottomValue;
BodyPaddingLeftValueVal = paddingLeftValue;
BodyOverflowXValueVal = overflowXValue;
BodyMarginParameterValueVal = marginParameterValue;
BodyPaddingParameterValueVal = paddingParameterValue;
BodyAdditionalCssValueVal = BodyAdditionalCssValue; // Additional CSS
BodyFontVal = NewBodyFont;
  }

//Tab1 (Layout)
function layoutBodyChange(){
  
  let mainController = document.getElementById("content-menu-controller");

  // Animasi opacity 0 selama 1 detik sebelum mengubah innerHTML
  gsap.to(mainController, { opacity: 0, duration: 0.2, onComplete: function() {
    ChangemenutoBodyForm();
    

  //Tambah Event Listener
 
    
    // Animasi opacity 1 selama 1 detik setelah mengubah innerHTML
    gsap.to(mainController, { opacity: 1, duration: 0.2 });
    
  }});

}




//Tab2 (Responsive)
function StyleSetupChange(){
  let mainController = document.getElementById("content-menu-controller");
  let Responsive = `
  <form id="Body-responsive-Form" data-id="lazydev">
  <fieldset id="formfieldset2">
    <legend id="formmakerlegend2">Responsive Breakpoint</legend>

    <div id="MobileResponsive" inputid="inputid1" style="width: 100% !important;">
      <label id="MobileResponsivelabel" for="Mobile Responsive" labelid="label1" style="width: 100% !important;">
        Mobile Responsive Breakpoint:  (px)
      </label>
      <input fieldid="field1" type="number" min="0" value="${mobileResponsiveBreakPoint}" id="MobileResponsiveinput" name="Mobile Responsive" style="width: 100% !important;">
    </div>

    <div id="TabletResponsive" inputid="inputid2" style="width: 100% !important;">
      <label id="TabletResponsivelabel" for="Tablet Responsive Breakpoint" labelid="label2" style="width: 100% !important;">
        Tablet Responsive Breakpoint:  (px)
      </label>
      <input fieldid="field2" type="number" min="0" value="${tabletResponsiveBreakPoint}" id="TabletResponsiveinput" name="Tablet Responsive Breakpoint" style="width: 100% !important;">
    </div>

    <div id="submitDivAdvance">
      <button id="submitDivButtonAdvance" type="submit">Save Setting</button>
    </div>
  </fieldset>
</form>


<form id="PilihanFontSetting" data-id="lazydev">

<fieldset id="formfieldset4" class="formfieldset4">

<legend id="formmakerlegend4" class="formmakerlegend4">
Font Selection</legend>

</fieldset>

<fieldset id="colorpalattesetup" class="formfieldset4" style="margin-bottom: 20px; margin-top: 20px; height: 250px !important; 
overflow-y: auto !important;">
<legend id="colorpalattesetupLeged" class="formmakerlegend4">
Color Palatte Setup</legend>



<div style="padding-bottom: 10px !important;">
<label style="padding-bottom: 2px !important;">Color Name :</label>
<input type="text" id="pallateName" placeholder="type color name here" required>
</div>

<div>
<input type="color" id="colorpalatteinput" style="width: 45% !important;" >
<input type="text" id="colorpalatteresult" style="width: 43% !important; transform: translateY(-5px); padding-bottom: 2px" readonly>
</div>
<div>
<label>Opacity</label>
<input type="range" id="colorpalatteOpacityLevel" min="0" value="1" max="1" step="0.01" style="width: 90% !important;">


<button id="saveColorPalate">Save Color Palatte</button>

</fieldset>


</form>




`;

// Animasi opacity 0 selama 1 detik sebelum mengubah innerHTML
gsap.to(mainController, { opacity: 0, duration: 0.2, onComplete: function() {
  mainController.innerHTML = Responsive;
 // Memanggil fungsi untuk membuat checkbox
createFontCheckboxes();
//Memanggil FUngsi untuk men check checkbox 
setCheckedFonts();
createColorPaletteElements();
  //menambahkan EventListener untuk membaca input Custom CSS 
  // document.getElementById("submitDivButtonAdvance").addEventListener("click", preventDefault);
  document.getElementById("submitDivButtonAdvance").addEventListener("click", responsiveChanger);
  document.getElementById("colorpalatteinput").addEventListener("change", colorPalateGabungWarna);
  document.getElementById("colorpalatteOpacityLevel").addEventListener("input", colorPalateGabungWarna);
  document.getElementById("saveColorPalate").addEventListener("click", preventDefault);
  document.getElementById("saveColorPalate").addEventListener("click", simpancolorPalate);
  
  // Animasi opacity 1 selama 1 detik setelah mengubah innerHTML
  gsap.to(mainController, { opacity: 1, duration: 0.2 });
}});



}

//Tab3 (Advance)
function AdvanceBodyChange() {
  let mainController = document.getElementById("content-menu-controller");
  let AdvanceContent = `<div id="BodyAdvanceSetting">
  <div id="ProjectSettingz" class="ProjectSettingz"> <p>Project Setting</p><hr class="white-hr">
  <button id="OpenProjectSetting">Open Project Setting</button><hr class="white-hr">
  </div>
  <div id="ProjectCustomCSS" class="ProjectSettingz" > <p>Custom CSS</p><hr class="white-hr">
  <button id="openCSSBody">Edit CSS Body{}</button><hr class="white-hr">
  </div>
  <div id="ProjectCustomJS" class="ProjectSettingz" > <p>Custom JS</p><hr class="white-hr">
  <button id="openJSBody">Edit JS Body</></button><hr class="white-hr">
  </div>
  <div id="Export-Json-Lazydev" class="ProjectSettingz" > <p>Export Json</p><hr class="white-hr">
  <button id="Export-Json-Lazydev-button">Export Json File</button><hr class="white-hr">
  </div>
  <div id="Import-Json-Lazydev" class="ProjectSettingz" > <p>Import Json</p><hr class="white-hr">
  <button id="Import-Json-Lazydev-button">Import Json File</button><hr class="white-hr">
  </div>
  <div id="ProjectCSSFramework" class="ProjectSettingz" > <p>CSS Framework</p><hr class="white-hr">
  <button id="openCSSFramework">Add CSS Framework</button><hr class="white-hr">
  </div>
  <div id="ProjectBodyAddAnimations" class="ProjectSettingz" > <p>Animation</p><hr class="white-hr">
  <button id="openAnimation">Add Animation Plugins</button><hr class="white-hr">
  </div>
  <div class="ProjectSettingz" > <p>Custom Data</p><hr class="white-hr">
  <button id="createDynamic-container">Create Dynamic Container</button><hr class="white-hr">
  </div>
  <div class="none-mode">
  <label id="customJavascriptLabel">Custom Javascript</label>
  <hr class="white-hr">
  <textarea id="BodyCustomJavascript" rows="6">${bodyCustomJavascriptContent}</textarea>
  <button id="saveJavascript">Save</button>
  <hr class="white-hr">
</div>
`;

  // Animasi opacity 0 selama 1 detik sebelum mengubah innerHTML
  gsap.to(mainController, { opacity: 0, duration: 0.2, onComplete: function() {
    mainController.innerHTML = AdvanceContent;
    //menambahkan EventListener untuk membaca input Custom CSS 
    projectCssTargetSelected();
    document.getElementById("saveJavascript").addEventListener("click", bodyCustomJavascript);
    document.getElementById("OpenProjectSetting").addEventListener("click", preventDefault);
    document.getElementById("OpenProjectSetting").addEventListener("click", openProjectSetting);
    document.getElementById("openCSSFramework").addEventListener("click", preventDefault);
    document.getElementById("openCSSFramework").addEventListener("click", opencssFramework);
    document.getElementById("openCSSBody").addEventListener("click", preventDefault);
    document.getElementById("openCSSBody").addEventListener("click", openCustomCSSbody);
    document.getElementById("openJSBody").addEventListener("click", preventDefault);
    document.getElementById("openJSBody").addEventListener("click", openCustomJSbody);
    document.getElementById("openAnimation").addEventListener("click", preventDefault);
    document.getElementById("openAnimation").addEventListener("click", openAnimationsOptionPlugin);
    document.getElementById("createDynamic-container").addEventListener("click", preventDefault);
    document.getElementById("createDynamic-container").addEventListener("click", createDynamic_Container);
    document.getElementById("Export-Json-Lazydev-button").addEventListener("click", preventDefault);
    document.getElementById("Export-Json-Lazydev-button").addEventListener("click", jsonExport);
    document.getElementById('Import-Json-Lazydev-button').addEventListener("click", preventDefault);
    document.getElementById('Import-Json-Lazydev-button').addEventListener("click", UploadJson);
    // Animasi opacity 1 selama 1 detik setelah mengubah innerHTML
    gsap.to(mainController, { opacity: 1, duration: 0.2 });
  }});
}

function UploadJson(){
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
      try {
        const jsonData = JSON.parse(e.target.result);
        importJson(jsonData);
      } catch (error) {
        console.error('Error parsing JSON file:', error);
      }
    };

    reader.readAsText(file);
  });

  input.click();
}

function opencssFramework(){
  let newSection = document.createElement("SECTION");
  newSection.setAttribute("id", "body-custom-css-editor");
  newSection.innerHTML = animationPack;
  newSection.classList.add("new-Anim-Fade");
  document.body.appendChild(newSection);
  animationCheckboxList();
  setTimeout(() => {
    newSection.classList.remove("new-Anim-Fade");
  }, 500);
  let saveButton = document.getElementById("SubmitButtonAnimationPack");
  saveButton.addEventListener("click", preventDefault);
  saveButton.addEventListener("click", SaveAnimationSetSetting);

  function SaveAnimationSetSetting(){
    gsap.to(newSection, {opacity: 0, duration: 0.3})
    setTimeout(() => {
      newSection.remove();
    }, 301);
}
//----
function animationCheckboxList(){
let legend = document.getElementById("formmakerlegendAnimationPack");
legend.textContent = "CSS Framework Pack";

CSSFRAMEWORKOptionList.forEach((animation, index) => {
  let newDIv = document.createElement("DIV");
  newDIv.id = animation.value;
  newDIv.classList.add("checkbox-AnimationPack");
  newDIv.setAttribute("data-id","checkboxInput");
  newDIv.style.width = "100%";
  let divContent = `
  <label id="${animation.value}label" for="${animation.value}" style="width: 90% !important;">${animation.name}</label>
<input fieldid="field1" type="checkbox" id="${animation.value}input" value="${animation.value}" name="${animation.value}" class="checkboxAnim" style="width: 10% !important;">
  `;
  newDIv.innerHTML = divContent;
  let animSubmit = document.getElementById("SubmitButtonAnimationPack");
  animSubmit.parentElement.insertBefore(newDIv,animSubmit);
  let checkboxid = document.getElementById(`${animation.value}input`);
  checkboxid.addEventListener("change", function() {
    if (checkboxid.checked === true) {
      // Ketika checkbox dicentang, tambahkan elemen baru ke animationArray
      let animationName = animation.name;
      let animationValue = animation.value;
      let animationScript = animation.link;
      let animationrawLink = animation.rawLink;
      let newAnimationArray = { name: animationName, value: animationValue, link: animationScript,rawLink: animationrawLink};
      CSSFRAMEWORKArray.push(newAnimationArray);
      CSSLINKPUSH();
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
  });
      }
    } else {
      // Ketika checkbox tidak dicentang, cari indeks elemen yang akan dihapus
      let animationName = animation.name;
      let animationValue = animation.value;
      let indexToRemove = -1; // Inisialisasi indeks untuk elemen yang akan dihapus
  
      for (let i = 0; i < CSSFRAMEWORKArray.length; i++) {
        if (CSSFRAMEWORKArray[i].name === animationName && CSSFRAMEWORKArray[i].value === animationValue) {
          // Jika ditemukan elemen dengan name dan value yang sama, simpan indeksnya
          indexToRemove = i;
          break;
        }
      }
  
      // Hapus elemen dari animationArray berdasarkan indeks yang ditemukan
      if (indexToRemove !== -1) {
        CSSFRAMEWORKArray.splice(indexToRemove, 1);
        let removeLink = document.getElementById(animationValue);
        if(removeLink){removeLink.remove();}
        // console.log(CSSFRAMEWORKArray);
      }
    }
  });
  
});
let checkboxes = document.querySelectorAll(".checkboxAnim");
checkboxes.forEach(checkboxcontent => {
  for (let i = 0; i < CSSFRAMEWORKArray.length; i++) {
    const element = CSSFRAMEWORKArray[i];
    let elementValue = element.value;
    if(elementValue === checkboxcontent.value){
      checkboxcontent.checked = true;
    }
    
  }
});

}

}

export function openProjectSetting(){

 gsap.to("#Project-Setting", {display: "flex", duration: 0.1,});
  gsap.to("#Project-Setting", {opacity:1, xPercent: 140, scale:1, delay: 0.3, duration: 1, ease: "power2.out"});


}

function openCustomCSSbody(){
let newContainer = document.createElement("SECTION");
newContainer.setAttribute("id", "body-custom-css-editor");
let custombodyCSScontainer = `<form id="BodyCustomCSS" data-id="lazydev">

<fieldset data-id="formFieldset" id="formfieldsetBodyCustomCSS">

<legend data-id="formlegend" id="formmakerlegendBodyCustomCSS">
Body Custom CSS</legend>


  
  <div id="Newfield2" inputid="inputid2" style="width: 100%; opacity: 1;">
<label id="NewField2" for="NewFIeld2" labelid="label2" style="width: 0% !important; display: none;">
Textarea Field 2</label>
<textarea fieldid="field2" id="bodyFormCustomCSSEditor" name="NewFIeld2" rows="20" style="width: 564px; height: 230px;">
${ProjectCustomCSS}</textarea>
</div>
<div id="Savebodycustomcss" inputid="inputid1" style="width: 69% !important;">
<button button="1" style="width: 100%; font-size: 17px;">
Save</button>
</div>

<div id="CloseElementEditor" inputid="inputid1" style="width: 30% !important; margin-left: 1% !important;">
<button id="CloseElementEditor-button" style="width: 100%; font-size: 17px;">Close</button>
</div>

</fieldset>

</form>`;
newContainer.innerHTML = custombodyCSScontainer;
document.body.appendChild(newContainer);
let bodyCSSTextarea = document.getElementById("bodyFormCustomCSSEditor");
gsap.from(newContainer,{scale:0, y: 350, opacity:0, duration:0.5,});
  //========================================//
  const buttonClose = document.getElementById('CloseElementEditor');
      buttonClose.addEventListener("click", function(event) {
        event.preventDefault();});
      buttonClose.addEventListener('click', ()=>{
        EndEditor();
      })
  //====================================================// 
let buttonSave = document.getElementById("Savebodycustomcss");
buttonSave.addEventListener("click", preventDefault);
buttonSave.addEventListener("click", ()=> {
  ProjectCustomCSS = bodyCSSTextarea.value
  styleEM.innerHTML = ProjectCustomCSS;
  EndEditor();
})
function EndEditor(){
  gsap.to(newContainer, {scale:0, opacity:0, y: -250, duration: 0.4, onComplete: ()=>{
    newContainer.remove();
  }})
}
};

function openCustomJSbody(){
  let newContainer = document.createElement("SECTION");
  newContainer.setAttribute("id", "body-custom-css-editor");
  let custombodyJScontainer = `<form id="BodyCustomCSS" data-id="lazydev">
  
  <fieldset data-id="formFieldset" id="formfieldsetBodyCustomCSS">
  
  <legend data-id="formlegend" id="formmakerlegendBodyCustomCSS">
  Body Custom JS</legend>
  
  
    
    <div id="Newfield2" inputid="inputid2" style="width: 100%; opacity: 1;">
  <label id="NewField2" for="NewFIeld2" labelid="label2" style="width: 0% !important; display: none;">
  Textarea Field 2</label>
  <textarea fieldid="field2" id="bodyFormCustomJSEditor" name="NewFIeld2" rows="11" style="width: 564px; height: 230px;">
  ${bodyCustomJavascriptContent}</textarea>
  </div>
  <div id="SavebodycustomJS" inputid="inputid1" style="width: 69% !important;">
  <button button="1" style="width: 100%; font-size: 17px;">
  Save</button>
  </div>

  <div id="CloseElementEditor" inputid="inputid1" style="width: 30% !important; margin-left: 1% !important;">
      <button id="CloseElementEditor-button" style="width: 100%; font-size: 17px;">Close</button>
  </div>
  
  </fieldset>
  
  </form>`;
  newContainer.innerHTML = custombodyJScontainer;
  document.body.appendChild(newContainer);
  let bodyCSSTextarea = document.getElementById("bodyFormCustomJSEditor");
  gsap.from(newContainer,{scale:0, y: 350, opacity:0, duration:0.5,}); 
  //=================================//
  let scriptContainer = document.getElementById("bodyScript");
  //========================================//
  const buttonClose = document.getElementById('CloseElementEditor');
      buttonClose.addEventListener("click", function(event) {
        event.preventDefault();});
      buttonClose.addEventListener('click', ()=>{
        EndEditor();
      })
  //====================================================//
  let buttonSave = document.getElementById("SavebodycustomJS");
  buttonSave.addEventListener("click", preventDefault);
  buttonSave.addEventListener("click", ()=> {
    bodyCustomJavascriptContent = bodyCSSTextarea.value
    scriptContainer.innerHTML = bodyCustomJavascriptContent;
    EndEditor();
  })
  function EndEditor(){
    gsap.to(newContainer, {scale:0, opacity:0, y: -250, duration: 0.4, onComplete: ()=>{
      newContainer.remove();
    }})
  }
  };

function bodyCustomJavascript(){
let newbodyScript = document.getElementById("BodyCustomJavascript").value;
let scriptContainer = document.getElementById("bodyScript");
scriptContainer.innerHTML = newbodyScript;
bodyCustomJavascriptContent = newbodyScript;

}

function responsiveChanger(event){
  event.preventDefault();
  let newmobileResponsive = document.getElementById("MobileResponsiveinput").value;
  let newmTabletResposinve = document.getElementById("TabletResponsiveinput").value;
  mobileResponsiveBreakPoint = newmobileResponsive;
  tabletResponsiveBreakPoint = newmTabletResposinve;
  const lazydevElement = document.querySelectorAll('[lazyDev]');
    lazydevElement.forEach(element => {
    propertiesEditor(element);
  });
  }


//FUngsi Memanggil Array FontOption dan memasukannya kedalam Font Selected

function createFontCheckboxes() {
  var fieldset = document.getElementById("formfieldset4");
  var legend = document.getElementById("formmakerlegend4");

  // Membuat elemen checkbox untuk setiap font dalam array FontOption
  for (var i = 0; i < FontOption.length; i++) {
    var font = FontOption[i];

    var div = document.createElement("div");
    div.className = "checkbox-formgenerator";
    div.style.width = "100%";

    var label = document.createElement("label");
    label.style.width = "100%";
    label.textContent = font;

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = font;
    checkbox.style.width = "100%";

    // Menambahkan event listener untuk checkbox
    checkbox.addEventListener("change", function(event) {
      var selectedFont = event.target.value;
      if (event.target.checked) {
        // Menambahkan font ke dalam array FontSelected jika checkbox terpilih
        FontSelected.push(selectedFont);
        updateFontStyles();
        // console.log(FontSelected)
      } else {
        // Menghapus font dari array FontSelected jika checkbox tidak terpilih
        var fontIndex = FontSelected.indexOf(selectedFont);
        if (fontIndex !== -1) {
          FontSelected.splice(fontIndex, 1);
          updateFontStyles();
        }
      }
    });

    div.appendChild(label);
    div.appendChild(checkbox);

    fieldset.insertBefore(div, legend.nextSibling);
  }
 
}

//FUngsi Membuat Checkbox Checked
function setCheckedFonts() {
  var fieldset = document.getElementById('formfieldset4');
  var checkboxes = fieldset.getElementsByTagName('input');

  for (var i = 0; i < checkboxes.length; i++) {
      var checkbox = checkboxes[i];
      var checkboxValue = checkbox.value;

      if (FontSelected.indexOf(checkboxValue) !== -1) {
          checkbox.checked = true;
      }
  }
}





//fungsi menambahkan Array FontSelected Ke Select id BodyFontinput

function populateSelectOptions() {
  var selectElement = document.getElementById('BodyFontinput');

  // Hapus opsi yang ada sebelumnya, jika ada
  selectElement.innerHTML = '';

  FontSelected.forEach(function(font) {
    var option = document.createElement('option');
    option.value = font;
    option.textContent = font;
    selectElement.appendChild(option);
  });
}

function ubahFontBody() {
  var fontStyles = document.getElementById('fontStyles');
  var existingLink = document.querySelector('link[data-font-styles]');
  var inputanBody = document.getElementById("BodyFontinput").value;
  
  if (existingLink) {
    existingLink.setAttribute('href', `https://fonts.googleapis.com/css2?family=${inputanBody}:wght@100;200;300;400;500;600;700;800;900&display=swap`);
  } else {
    var newLink = document.createElement('link');
    newLink.setAttribute('rel', 'stylesheet');
    newLink.setAttribute('href', `https://fonts.googleapis.com/css2?family=${inputanBody}:wght@100;200;300;400;500;600;700;800;900&display=swap`);
    newLink.setAttribute('data-font-styles', true);
    fontStyles.appendChild(newLink);
  }
}

//Merubah <style> dengan id fontStyles di head
function updateFontStyles() {
  // Menghapus semua elemen dengan atribut 'data-font-styles'
  var elements = document.querySelectorAll('[data-font-styles]');
  for (var i = 0; i < elements.length; i++) {
    elements[i].parentNode.removeChild(elements[i]);
  }

  FontSelected.forEach(function(font) {
    var a = `https://fonts.googleapis.com/css2?family=`;
    var b = font;
    var c = `:wght@100;200;300;400;500;600;700;800;900&amp;display=swap`;
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = a + b + c;
    link.setAttribute("data-font-styles", "true");
    document.head.appendChild(link);
  });
}

export {updateFontStyles}

function colorPalateGabungWarna(){
  let warna = document.getElementById("colorpalatteinput").value;
  let opasitas = document.getElementById("colorpalatteOpacityLevel").value;
  let pembacaHasil = document.getElementById("colorpalatteresult");
  
  let kodeWarna = "rgba(" +
    parseInt(warna.slice(1, 3), 16) + ", " +
    parseInt(warna.slice(3, 5), 16) + ", " +
    parseInt(warna.slice(5, 7), 16) + ", " +
    opasitas + ")";

    pembacaHasil.value = kodeWarna;
}
let initial = 1;
function simpancolorPalate(){
  let ColorName = document.getElementById("pallateName").value;
  let colorCodeSaved = document.getElementById("colorpalatteresult").value;
  if (ColorName == ""){ColorName = "Color " + initial};
  if (colorCodeSaved == ""){colorCodeSaved = "rgba(0, 255, 255, 0.842)"};

  let newColorPalate = { name: ColorName, value: colorCodeSaved };
  colorPalette.push(newColorPalate);
  createColorPaletteElements();
  initial += 1;
}

function openColorPalateElement(bgResult,bginput,opacityinput,palatteButton,editorButton,whereToPut){
  colorPalette.forEach((color) => {
    let colorElement = document.createElement('div');
    colorElement.classList.add(`c-01`);
    colorElement.style.backgroundColor = color.value;

    let nameElementDiv = document.createElement('div');
    nameElementDiv.classList.add(`c-02`);
    let nameElement = document.createElement('p');
    nameElement.textContent = color.name;
    nameElementDiv.appendChild(nameElement);

    let colorPaletteItem = document.createElement('div');
    colorPaletteItem.classList.add('color-palatte-collection');
    colorPaletteItem.classList.add('colorpalate-destroy');
    colorPaletteItem.addEventListener("click", function(){
      let background = document.getElementById(bgResult);
      let BackgroundColor = document.getElementById(bginput);
      let BackgroundOpacity = document.getElementById(opacityinput);
      background.value = color.value;
      let rgbaValues = color.value.substring(color.value.indexOf("(") + 1, color.value.lastIndexOf(")")).split(",");
      let red = parseInt(rgbaValues[0].trim());
      let green = parseInt(rgbaValues[1].trim());
      let blue = parseInt(rgbaValues[2].trim());
      var hexValue = "#" + ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1);
      // console.log(hexValue);
      BackgroundColor.value = hexValue;
      BackgroundOpacity.value = parseFloat(color.value.slice(color.value.lastIndexOf(",") + 1));
      EditBodySetting();
    })
    colorPaletteItem.appendChild(colorElement);
    colorPaletteItem.appendChild(nameElementDiv);

    // Menempatkan colorPaletteItem setelah elemen dengan id "colorpalattesetupLeged"
    let ElementBefore = document.getElementById(whereToPut);
    ElementBefore.insertAdjacentElement('afterend', colorPaletteItem);
    gsap.from(colorPaletteItem,{opacity:0, scale: 0, duration:0.3, ease: "power2.out",});
  })
  //Menghilangkan Color Input dan Opacity Input
  let colorInput = document.getElementById(bginput);
  let opacityInput = document.getElementById(opacityinput);
  gsap.to(colorInput, {scale:0, duration: 0.3});
  gsap.to(opacityInput, {scale:0, duration: 0.3});
  //Menghilangkan Button Palatte dan membuka Button Color Editor
  let palate = document.getElementById(palatteButton);
  let editor = document.getElementById(editorButton);
  gsap.to(palate, {scale:0, duration: 0.1});
  gsap.to(editor, {scale:1, duration: 0.2, delay:0.1});
}
export{ openColorPalateElement };

function openColorEditor(bginput,opacityinput,palatteButton,editorButton){
  let colorPaletteElements = document.querySelectorAll('.colorpalate-destroy');

  colorPaletteElements.forEach(function(element) {
    element.remove();
  });

//Membuka Color Input dan Opacity Input
let colorInput = document.getElementById(bginput);
let opacityInput = document.getElementById(opacityinput);
gsap.to(colorInput, {scale:1, duration: 0.3});
gsap.to(opacityInput, {scale:1, duration: 0.3});
//Menghilangkan Button Palatte dan membuka Button Color Editor
let palate = document.getElementById(palatteButton);
let editor = document.getElementById(editorButton);
gsap.to(palate, {scale:1, duration: 0.1});
gsap.to(editor, {scale:0, duration: 0.2, delay:0.1});
}

export{ openColorEditor };

function createColorPaletteElements() {
  //Menghapus semua Div dengan class "color-palatte-collection"
  let colorPaletteElements = document.querySelectorAll('.color-palatte-collection');

  colorPaletteElements.forEach(function(element) {
    element.remove();
  });

  // Membuat elemen untuk setiap objek dalam colorPalette
  colorPalette.forEach((color, index) => {
    let colorElement = document.createElement('div');
    colorElement.classList.add(`c-01`);
    colorElement.style.backgroundColor = color.value;

    let nameElementDiv = document.createElement('div');
    nameElementDiv.classList.add(`c-02`);
    let nameElement = document.createElement('p');
    nameElement.textContent = color.name;
    nameElementDiv.appendChild(nameElement);

    let deleteElementDiv = document.createElement('div');
    deleteElementDiv.classList.add(`c-03`);
    let deleteElement = document.createElement('p');
    deleteElement.textContent = 'x';
    deleteElementDiv.appendChild(deleteElement);
    deleteElementDiv.addEventListener("click", function(){
      // Menghapus objek dari array colorPalette berdasarkan indeks
  colorPalette.splice(index, 1);
  // Memanggil fungsi untuk memperbarui tampilan elemen-elemen color palette setelah menghapus objek
  createColorPaletteElements();
    })

    let colorPaletteItem = document.createElement('div');
    colorPaletteItem.classList.add('color-palatte-collection');
    colorPaletteItem.appendChild(colorElement);
    colorPaletteItem.appendChild(nameElementDiv);
    colorPaletteItem.appendChild(deleteElementDiv);

    // Menempatkan colorPaletteItem setelah elemen dengan id "colorpalattesetupLeged"
    let setupLegedElement = document.getElementById('colorpalattesetupLeged');
    setupLegedElement.insertAdjacentElement('afterend', colorPaletteItem);
    gsap.from(colorPaletteItem,{opacity:0, scale: 0, duration:0.3, ease: "power2.out",});
  });
}
//-------
function openAnimationsOptionPlugin(){
  let newSection = document.createElement("SECTION");
  newSection.setAttribute("id", "body-custom-css-editor");
  newSection.innerHTML = animationPack;
  newSection.classList.add("new-Anim-Fade");
  document.body.appendChild(newSection);
  animationCheckboxList();
  setTimeout(() => {
    newSection.classList.remove("new-Anim-Fade");
  }, 500);
  let saveButton = document.getElementById("SubmitButtonAnimationPack");
  saveButton.addEventListener("click", preventDefault);
  saveButton.addEventListener("click", SaveAnimationSetSetting);

  function SaveAnimationSetSetting(){
    JSAnimationLinkPush();
    gsap.to(newSection, {opacity: 0, duration: 0.3})
    setTimeout(() => {
      newSection.remove();
    }, 301);
  }



  function animationCheckboxList(){

    animationOptionList.forEach((animation, index) => {
      let newDIv = document.createElement("DIV");
      newDIv.id = animation.value;
      newDIv.classList.add("checkbox-AnimationPack");
      newDIv.setAttribute("data-id","checkboxInput");
      newDIv.style.width = "100%";
      let divContent = `
      <label id="${animation.value}label" for="${animation.value}" style="width: 90% !important;">${animation.name}</label>
<input fieldid="field1" type="checkbox" id="${animation.value}input" value="${animation.value}" name="${animation.value}" class="checkboxAnim" style="width: 10% !important;">
      `;
      newDIv.innerHTML = divContent;
      let animSubmit = document.getElementById("SubmitButtonAnimationPack");
      animSubmit.parentElement.insertBefore(newDIv,animSubmit);
      let checkboxid = document.getElementById(`${animation.value}input`);
      checkboxid.addEventListener("change", function() {
        if (checkboxid.checked === true) {
          // Ketika checkbox dicentang, tambahkan elemen baru ke animationArray
          let animationName = animation.name;
          let animationValue = animation.value;
          let animationScript = animation.link;
          let newAnimationArray = { name: animationName, value: animationValue, link: animationScript, rawLink : animation.rawLink};
          animationArray.push(newAnimationArray);
        } else {
          // Ketika checkbox tidak dicentang, cari indeks elemen yang akan dihapus
          let animationName = animation.name;
          let animationValue = animation.value;
          let indexToRemove = -1; // Inisialisasi indeks untuk elemen yang akan dihapus
      
          for (let i = 0; i < animationArray.length; i++) {
            if (animationArray[i].name === animationName && animationArray[i].value === animationValue) {
              // Jika ditemukan elemen dengan name dan value yang sama, simpan indeksnya
              indexToRemove = i;
              break;
            }
          }
      
          // Hapus elemen dari animationArray berdasarkan indeks yang ditemukan
          if (indexToRemove !== -1) {
            animationArray.splice(indexToRemove, 1);
          }
        }
      });
      
    });
    let checkboxes = document.querySelectorAll(".checkboxAnim");
    checkboxes.forEach(checkboxcontent => {
      for (let i = 0; i < animationArray.length; i++) {
        const element = animationArray[i];
        let elementValue = element.value;
        if(elementValue === checkboxcontent.value){
          checkboxcontent.checked = true;
        }
        
      }
    });
    
  }
}