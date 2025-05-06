import {clientUrl} from '/utils-urlmain';
import { exporticon,exporticon2,exportCodeContainer,savePageorComponent,lazySavePageSuccess,animationArray,CSSFRAMEWORKArray } 
from './animatecontent.js';
import {projectName,getrandomNumberHex,activeFolder,myFolders,activeFolderChange,changeProjectName,
    FontSelected,colorPalette,
} 
from './main.js'
import {BodyBackgroundColorValueVal,bgColorBody,bgOpBody,BodyMarginTopValueVal,BodyMarginRightValueVal,
    BodyMarginBottomValueVal,BodyMarginLeftValueVal,BodyPaddingTopValueVal,BodyPaddingRightValueVal,
    BodyPaddingBottomValueVal,BodyPaddingLeftValueVal,BodyFontVal,BodyOverflowXValueVal,BodyMarginParameterValueVal,
    BodyPaddingParameterValueVal,BodyAdditionalCssValueVal,ProjectCustomCSS,
    mobileResponsiveBreakPoint,tabletResponsiveBreakPoint,bodyCustomJavascriptContent} from './EditBody.js'
import {owner,component_ID,PageSettingCollection,receiveMessage,contentName} from './importcontent.js'
import {check_dynamic_fetch,delete_functionfetchClass} from './Custom_Data.js';
import {removeDataNavigator,deleteAllHover} from './navigator.js';

let LazyexportButton = document.getElementById("export-page");
LazyexportButton.addEventListener("click", ExportThumbnail);
let copyContentSession = 1;

function ExportThumbnail(){
    let closenavBarButton = document.getElementById("navigator-close");
    if(closenavBarButton){
        closenavBarButton.click();
    }
    setTimeout(() => {
        deleteAllHover();
    }, 500);
    LazyexportButton.removeEventListener("click", ExportThumbnail);
    let exportContainer = document.createElement("DIV");
    exportContainer.id = "lazy-export-container";
    exportContainer.innerHTML = exporticon;
    document.body.appendChild(exportContainer);
    gsap.from(exportContainer,{
        x: "200px",
        scaleX: 0,
        duration: 0.5,
    }) 
    let saveLazyPage = document.getElementById('lazy-save-page-setting');
    saveLazyPage.addEventListener("click", savePageAppend);
    let saveLazyComponent = document.getElementById('lazy-save-as-component');
    saveLazyComponent.addEventListener("click", saveComponentAppend);
    let exportComponent = document.getElementById("lazy-export-component");
    exportComponent.addEventListener("click", exportasHTMLorHTMX);
    let closeExport = document.getElementById("cancel-export");
    closeExport.addEventListener("click", closeAppend)
}
//--------------------------------------------//
export function jsonExport(){
    const container = document.getElementById('container');
    const content = container.innerHTML;
    
    const jsonObj = {
        name: contentName,
        content: content
    };
    
    const jsonData = JSON.stringify(jsonObj);
    
    const blob = new Blob([jsonData], { type: 'application/json' });
    
    const url = window.URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `${contentName}.json`;
    
    document.body.appendChild(a);
    
    a.click();
    
    document.body.removeChild(a);
    
    window.URL.revokeObjectURL(url);
    
    closeAppend();
}
//--------------------------------------------//
function closeAppend(){
    let exportContainer = document.getElementById('lazy-export-container');
    gsap.to(exportContainer,{
        x: "100px",
        scaleX: 0,
        opacity: 0,
        duration: 0.3,
        onComplete: function(){
            exportContainer.remove(); 
            LazyexportButton.addEventListener("click", ExportThumbnail);
        }
    })   
}
function closeAppend2(){
    let exportContainer = document.getElementById('lazy-export-container');
    gsap.to(exportContainer,{
        x: "100px",
        scaleX: 0,
        opacity: 0,
        duration: 0.3,
        onComplete: function(){
            exportContainer.remove(); 
        }
    })   
}
//--------------------------------
function buttonSavepagePreventDefault(){
    const saveButton = document.getElementById('lazy-save-button');
    const cancelButton = document.getElementById('lazy-close-button');
  
    // Tambahkan event listener untuk tombol Save
    saveButton.addEventListener('click', function(event) {
      event.preventDefault(); // Mencegah aksi bawaan tombol
      // Tambahkan kode lain yang ingin Anda jalankan ketika tombol Save ditekan
      // Misalnya: Simpan data, kirim formulir, dll.
    });
  
    // Tambahkan event listener untuk tombol Cancel
    cancelButton.addEventListener('click', function(event) {
      event.preventDefault(); // Mencegah aksi bawaan tombol
      // Tambahkan kode lain yang ingin Anda jalankan ketika tombol Cancel ditekan
      // Misalnya: Tutup dialog, hapus input, dll.
    });
}

function savePageSuccess(){
    closePageButton();
    LazyexportButton.addEventListener("click", ExportThumbnail);
    let savePopup = document.createElement("DIV");
    savePopup.setAttribute("class", "lazy-save-success");
    savePopup.innerHTML = lazySavePageSuccess;
    document.body.appendChild(savePopup);
    let successword = document.getElementById("save-success-ok");
    successword.textContent = "Please Wait Saving On Process";
    gsap.from(savePopup, {
        scaleX: 0,
        duration: 0.3,
        delay: 0.2,
        onComplete: function(){
            document.getElementById("lazy-save-page-content-button").addEventListener("click", setToClose);
            setTimeout(() => {
                setToClose()
            }, 25000);
        }
    })
function setToClose(){
    let SavePopuptext = document.getElementById("lazy-save-page-content-id");
    gsap.to(SavePopuptext, {
        opacity: 0,
        duration: 0.3,
        onComplete: function(){
            gsap.to(savePopup, {
                scaleX: 0,
                duration: 0.2,
                onComplete: function(){
                    savePopup.remove();
                }
            })
        }
    })
}
}

function closePageButton(){
let container = document.querySelector(".lazy-save-file-container");
gsap.to(container,{
    y: "300px",
    scaleX: 0,
    opacity: 0.2,
    duration: 0.5,
    onComplete: function(){
        container.remove()
        LazyexportButton.addEventListener("click", ExportThumbnail);
    }
})
}

//-------------------------
function savePageAppend(){
    closeAppend2();
    let saveContainer = document.createElement("DIV");
    saveContainer.id = "lazy-save-page-setting-container";
    saveContainer.setAttribute("class", "lazy-save-file-container");
    saveContainer.innerHTML = savePageorComponent;
    document.body.appendChild(saveContainer);
    let pagesetting = document.getElementById("select-page-setting").getAttribute("text");
    let page_input = document.getElementById("page-name");
    page_input.value = pagesetting;
    let selectFolder = document.getElementById("folder-select");
    selectFolder.remove();
    buttonSavepagePreventDefault();
    document.getElementById('lazy-save-button').addEventListener("click", savePage)
    document.getElementById('lazy-close-button').addEventListener("click", closePageButton)
    gsap.from(saveContainer,{
        y: "500px",
        scaleX: 0,
        duration: 0.5,
    })
}


function savePage(){
    let page_input_Val = document.getElementById("page-name").value;
    let pagesettingvalue= document.getElementById("select-page-setting").value;
    PageSettingCollection.forEach(options => {
        if(options.pagesetting_key === pagesettingvalue){
            options.pagesetting_name = page_input_Val;
            document.getElementById(options.pagesetting_key).textContent = page_input_Val;
          }
    });
    //-------------------//
    savePageSuccess();
    let uID = owner;
    let savedFonts = ``;
    FontSelected.forEach(element => {
        if(element !==""){
        let updateFont = element+","
        savedFonts+=updateFont
        }
    });
    let savedColor = ``;
    colorPalette.forEach(element => {
        if(element !== ""){
            let updateColor = `{"name": "${element.name}", "value": "${element.value}"}|`;
            savedColor +=updateColor
        }
    });
    let savedCSS = ``;
    CSSFRAMEWORKArray.forEach(element => {
        if(element !== ""){
        let updateFramework = element.value+",";
        savedCSS+=updateFramework
        }
    });
    let savedAnimate = ``;
    animationArray.forEach(element => {
        if(element !== ""){
        let animation = element.value+",";
        savedAnimate+=animation
        }
    });
    let targetcss = document.getElementById('ProjectCSSTargetinput').value;
        //------------------------------//
        const dataToSend = {
IDS: uID,
key: pagesettingvalue,
pagename: page_input_Val,
bodyfont: BodyFontVal,
overflowX: BodyOverflowXValueVal,
bgcolor: bgColorBody,
bgop: bgOpBody,
bgval: BodyBackgroundColorValueVal,
mPar: BodyMarginParameterValueVal,
mTop: BodyMarginTopValueVal,
mRight: BodyMarginRightValueVal,
mBottom: BodyMarginBottomValueVal,
mLeft: BodyMarginLeftValueVal,
pPar: BodyPaddingParameterValueVal,
pTop: BodyPaddingTopValueVal,
pRight: BodyPaddingRightValueVal,
pBottom: BodyPaddingBottomValueVal,
pLeft: BodyPaddingLeftValueVal,
addCSS: BodyAdditionalCssValueVal,
mobile: mobileResponsiveBreakPoint,
tablet: tabletResponsiveBreakPoint,
fonts: savedFonts,
palattes: savedColor,
css: ProjectCustomCSS,
js: bodyCustomJavascriptContent,
cssFramework: savedCSS,
animateArray: savedAnimate,
cssTarget: targetcss,
          }; 
          saveComponentOnEditor(dataToSend,`/api/adm/-ps-save-on-editor`,'PUT')
        //   console.log(kontolMemek)
        //    window.parent.postMessage(dataToSend, clientUrl);
    //-------------------//

}

function saveComponentAppend(){
    closeAppend2();
    let saveContainer = document.createElement("DIV");
    saveContainer.id = "lazy-save-Component-container";
    saveContainer.setAttribute("class", "lazy-save-file-container");
    saveContainer.innerHTML = savePageorComponent;
    document.body.appendChild(saveContainer);
    let legend = document.getElementById('lazy-save-legend');
    legend.textContent = "Save Component"
    let page_label = document.getElementById("page-name-label");
    page_label.textContent = "Component Name";
    let page_input = document.getElementById("page-name");
    page_input.value = projectName;
    //-----//
    let selectFolder = document.getElementById("folder-select");
    myFolders.forEach(folder => {
        let option = document.createElement("option");
        option.setAttribute("value", folder.key);
        option.textContent = folder.name;
        selectFolder.appendChild(option)
    });
    selectFolder.value = activeFolder;
    selectFolder.addEventListener("change", createNewFolder);
    createNewFolder(selectFolder);
    buttonSavepagePreventDefault();
    // document.getElementById('lazy-save-button').addEventListener("click", savePageSuccess)
    document.getElementById('lazy-save-button').addEventListener("click", saveComponent)
    document.getElementById('lazy-close-button').addEventListener("click", closePageButton)
    gsap.from(saveContainer,{
        y: "500px",
        scaleX: 0,
        duration: 0.5,
    })
}
function createNewFolder(){
    let selectFolderVal = document.getElementById("folder-select").value;
    let targetDiv = document.getElementById("new-folder-div");
if(selectFolderVal === "create-new"){
    targetDiv.classList.remove("none-mode");
}
if(selectFolderVal !== "create-new"){
    targetDiv.setAttribute("class", "none-mode");
}

}

export function AskComponentContent(CID){
    let savePopup = document.createElement("DIV");
    savePopup.id = "lazy-save-success";
    savePopup.setAttribute("class", "lazy-save-success");
    savePopup.innerHTML = lazySavePageSuccess;
    document.body.appendChild(savePopup);
    let successword = document.getElementById("save-success-ok");
    successword.textContent = "Please Wait Component Is Loading";
    gsap.from(savePopup, {
        scaleX: 0,
        duration: 0.3,
        delay: 0.2,
    });

    const dataToSend = {
        componentID: CID,
      }; 
      saveComponentOnEditor(dataToSend,`/api/adm/get-component-on-editor`,'POST')
    //   window.parent.postMessage(dataToSend, clientUrl);
//-------------
}

async function saveComponent(){
    removeDataNavigator();
    let page_input_Val = document.getElementById("page-name").value;
    changeProjectName(page_input_Val);
    let selectFolderVal = document.getElementById("folder-select").value;
    let selectPageSettingVal= document.getElementById("select-page-setting").value;
    let uID = owner;
    let cID = component_ID;
    let cContent = document.getElementById("container").innerHTML;
    let cFolder;
    let cpagesetting =selectPageSettingVal;
    const dataPage = await downloadZipNoImageFuncstate('save-component');
    // console.log(dataPage)
    if(selectFolderVal !== "create-new"){
        savePageSuccess();
        activeFolderChange(selectFolderVal);
        cFolder = selectFolderVal;
        //------------------------------//
        const dataToSend = {
            componentID: cID,
            componentContent: cContent,
            componentFolder: cFolder,
            componentpagesetting: cpagesetting,
            componentName: page_input_Val,
            dataHTML : dataPage.newHTML,
            dataCss : dataPage.styleValue,
            dataJs : dataPage.ScriptValue,
          }; 
        //   window.parent.postMessage(dataToSend, clientUrl);
        saveComponentOnEditor(dataToSend,`/api/adm/save-component-on-editor`,'PUT')
    //-------------
    }
    if(selectFolderVal === "create-new"){
        savePageSuccess();
        let newFolderVal = document.getElementById("new-folder").value;
        cFolder = newFolderVal;
        //------------------------------//
        const dataToSend = {
            userID: uID,
            componentID: cID,
            componentName: page_input_Val,
            componentContent: cContent,
            componentFolder: cFolder,
            componentpagesetting: cpagesetting,
            dataHTML : dataPage.newHTML,
            dataCss : dataPage.styleValue,
            dataJs : dataPage.ScriptValue,
          }; 
        //   window.parent.postMessage(dataToSend, clientUrl);
        saveComponentOnEditor(dataToSend,`/api/adm/save-component-and-folder-on-editor`,'PUT')
    //------------- 
    }
}
const saveComponentOnEditor = async (dataToSend,api,method) => {

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

function exportasHTMLorHTMX(){
    let exportContainer = document.getElementById('lazy-export-container');
    gsap.to(exportContainer,{
        opacity: 0,
        duration: 0.3,
        onComplete: function(){
            exportContainer.innerHTML = "";
            exportContainer.innerHTML = exporticon2;
            //-----------------------------------------------//
            let closeExport = document.getElementById("cancel-export");
            closeExport.addEventListener("click", closeAppend)
            let htmlButton = document.getElementById('lazy-export-as-html');
            htmlButton.addEventListener("click", function(){
                exportHTML("HTML")
            })
            let jsxButton = document.getElementById('lazy-export-as-jsx');
            jsxButton.addEventListener("click", function(){
                exportHTML("JSX")
            })
            gsap.to(exportContainer, {
                opacity: 1,
                duration: 0.3, 
            })
            //-----------------------------------------------//
        }
    })  
}

function exportHTML(state){
    closeAppend2();
let codeContainer = document.createElement("DIV");
codeContainer.setAttribute("class", "lazy-export-component-container");
codeContainer.id = "lazy-dev-code-export-container";
codeContainer.innerHTML = exportCodeContainer;
document.body.appendChild(codeContainer);

if(state === "HTML"){
ExporthtmlContent();
downloadZipNoImageFunc();
downloadZipIncImageFunc();
}

else if(state === "JSX"){
   let htmlText = document.getElementById("lazy-code-text-html");
   htmlText.textContent = "JSX";
   ExportjsxContent();
   downloadZipNoImageFuncJSX();
   downloadZipIncImageFuncJSX();
}

let ButtonTab = document.querySelectorAll(".lazy-code-tab");
ButtonTab.forEach(element => {
    element.addEventListener("click", ()=>{
        ButtonTab.forEach(element => {
            element.setAttribute("class", "lazy-code-tab");

        });
        element.setAttribute("class", "lazy-code-tab2")
    })
});

//-------------------------------------

let codeChild = document.getElementById("lazy-export-component-container-child");
gsap.from(codeContainer,{
    scaleX: 0,
    duration: 0.3,
})
gsap.from(codeChild, {
    opacity: 0,
    duration: 0.5,
    delay: 0.3
})


//==================================================================
copybuttonFunction();


//=====================================
let closeButton = document.getElementById("lazy-export-component-head-Close");
closeButton.addEventListener("click", ()=>{
    copyContentSession = 1;
    gsap.to(codeContainer,{
        scaleX: 0,
        duration: 0.3,
        onComplete: ()=>{
            codeContainer.remove();
            LazyexportButton.addEventListener("click", ExportThumbnail);
        }
    })
    gsap.to(codeChild, {
        opacity: 0,
        duration: 0.298,
    })   
})

}

//------------------------------------------------
function ExporthtmlContent(){
let codeContent = document.getElementById("lazy-export-component-body-textarea");
let container = document.getElementById("container");
let tabHTML = document.getElementById("lazy-code-tab-1");
let tabCSS = document.getElementById("lazy-code-tab-2");
let tabJS = document.getElementById("lazy-code-tab-3");

tabHTML.addEventListener("click", ()=>{
let htmlValue = "";

let newContainer = document.createElement("div");
newContainer.innerHTML = container.innerHTML;

let elementz = newContainer.querySelectorAll("*");

elementz.forEach(element => {
    elementModifier(element);
    // htmlValue += modifiedElement;
});

newContainer.innerHTML = newContainer.innerHTML.replace
(/<style\b[^>]*>([\s\S]*?)<\/style>/gi, '')
.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gi, '')
.replace(/\bdata-href/g, 'href')
.replace(/\bdata-onClick/g, 'onclick')
.replace(/href-target/g, 'target')
.replace(/\bdata-[^" ]+"[^"]*"/g, '')
.replace(/>/g, '>\n      ')
.replace(/(<\/[^>]+>)/g, '\n      $1\n')
// .replace(/\blazydev="[^"]*"/g, '')
.replace(/\another-class="[^"]*"/g, '')
.replace(/\bmainclass="[^"]*"/g, '');

newContainer.style.display = "none";
document.body.appendChild(newContainer);
// htmlValue = newContainer.innerHTML;

htmlValue = newContainer.innerHTML;

let AnimationScript = "";
animationArray.forEach(Anim => {
    if(Anim.name !== "")
    {
        let links = Anim.link;
        AnimationScript += `${links}`;
    }
});
CSSFRAMEWORKArray.forEach(Anim => {
    let links = Anim.link;
    AnimationScript += `${links}`;
});

let Fonts = ``;
  const FontElement = document.querySelectorAll('link[data-font-styles="true"]');
  
  FontElement.forEach((FontElement) => {
    Fonts += FontElement.outerHTML + "\n";
  });

let newHTML = `
<html>

<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${projectName}</title>
${AnimationScript}
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
${Fonts}
</head>
      <body>
      <div id="container">
      ${htmlValue}
      </div>
      </body>
</html>
`;
codeContent.value = newHTML;
copybuttonFunction(codeContent.value);
if(newContainer){
    newContainer.remove()
}

})
tabCSS.addEventListener("click", ()=>{
let styleValue = "";
let bodystyle = document.getElementById("bodyStyle");
let customCSS = document.getElementById("Project-Custom-CSS-Style");
let styleTag = container.querySelectorAll('style');

styleValue += `${bodystyle.innerHTML}`;
styleValue += `${customCSS.innerHTML}`;

styleTag.forEach(style => {
    styleValue += `${style.innerHTML}`;
});

codeContent.value = styleValue;
copybuttonFunction(codeContent.value);

})
tabJS.addEventListener("click", ()=>{
let ScriptValue = "";
let ScriptTag = container.querySelectorAll('script');

ScriptTag.forEach(script => {
let ScriptContent = removePatternFromString(script.innerHTML);
ScriptValue += `${ScriptContent}`;
});

codeContent.value = ScriptValue;
copybuttonFunction(codeContent.value);

})
tabHTML.click();
setTimeout(() => {
    copybuttonFunction(codeContent.value);
}, 1);
}

function ExportjsxContent(){
let codeContent = document.getElementById("lazy-export-component-body-textarea");
let container = document.getElementById("container");
let tabHTML = document.getElementById("lazy-code-tab-1");
let tabHTML2 = document.createElement("DIV");
tabHTML2.innerHTML = `<p class="lazy-code-text" id="lazy-code-text-html">JSX (Compact)</p>`;
tabHTML2.setAttribute("class", "lazy-code-tab");
tabHTML2.setAttribute("id", "lazy-code-tab-4");
let tabCSS = document.getElementById("lazy-code-tab-2");
tabCSS.parentElement.insertBefore(tabHTML2,tabCSS);
let tabJS = document.getElementById("lazy-code-tab-3");

tabHTML2.addEventListener("click", ()=>{
    let htmlValue = "";

    let newContainer = document.createElement("div");
    newContainer.innerHTML = container.innerHTML;
    
    let elementz = newContainer.querySelectorAll("*");
    
    elementz.forEach(element => {
        elementModifier(element);
    });
    elementz.forEach(element => {
        jsxClassName(element)
    });
    
    newContainer.innerHTML = newContainer.innerHTML.replace
    (/<style\b[^>]*>([\s\S]*?)<\/style>/gi, '')
    .replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gi, '')
    .replace(/\bdata-href/g, 'href')
    .replace(/\bdata-onClick/g, 'onclick')
    .replace(/href-target/g, 'target')
    .replace(/\bdata-[^" ]+"[^"]*"/g, '')
    .replace(/>/g, '>\n      ')
    .replace(/(<\/[^>]+>)/g, '\n      $1\n')
    .replace(/\another-class="[^"]*"/g, '')
    .replace(/\bmainclass="[^"]*"/g, '');
    
    newContainer.style.display = "none";
    document.body.appendChild(newContainer);
    
    htmlValue = newContainer.innerHTML;
    
    let AnimationScript = "";
    animationArray.forEach(Anim => {
        if(Anim.name !== "")
        {
            let links = Anim.link;
            AnimationScript += `${links}`;
        }
    });
    CSSFRAMEWORKArray.forEach(Anim => {
        let links = Anim.link;
        AnimationScript += `${links}`;
    });
    
    let Fonts = ``;
      const FontElement = document.querySelectorAll('link[data-font-styles="true"]');
      
      FontElement.forEach((FontElement) => {
        Fonts += FontElement.outerHTML + "\n";
      });
    
    let newHTML = `
    <>
        ${htmlValue}
    </>
    `;

    codeContent.value = newHTML;
    codeContent.value = codeContent.value
    .replace(/\bclassname\b/g, 'className');

const selfClosingElements = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'];

let updatedHTML = codeContent.value;
selfClosingElements.forEach(element => {
    const regex = new RegExp(`<${element}([^>]*)>`, 'g');
    updatedHTML = updatedHTML.replace(regex, `<${element}$1/>`);
});

let projectAPP = "App";
if(projectName !== ""){
let cleanedName = projectName.replace(/^[0-9]+|[^\w\s]/g, '');
let projectNewName = cleanedName.replace(/\s+/g, '_');
projectAPP = projectNewName;
}

let reactCreate = 
`
import React from 'react';
const ${projectAPP} = () => {
    return (
        ${updatedHTML}
    );
};

export default ${projectAPP};
`;


codeContent.value = reactCreate;


    
    //-------------------------
    copybuttonFunction(codeContent.value);
    if(newContainer){
        newContainer.remove()
    }
})

tabHTML.addEventListener("click", ()=>{
    let htmlValue = "";

    let newContainer = document.createElement("div");
    newContainer.innerHTML = container.innerHTML;
    
    let elementz = newContainer.querySelectorAll("*");
    
    elementz.forEach(element => {
        elementModifier(element);
        // htmlValue += modifiedElement;
    });
    elementz.forEach(element => {
        jsxClassName(element)
    });
    
    newContainer.innerHTML = newContainer.innerHTML.replace
    (/<style\b[^>]*>([\s\S]*?)<\/style>/gi, '')
    .replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gi, '')
    .replace(/\bdata-href/g, 'href')
    .replace(/\bdata-onClick/g, 'onclick')
    .replace(/href-target/g, 'target')
    .replace(/\bdata-[^" ]+"[^"]*"/g, '')
    .replace(/>/g, '>\n      ')
    .replace(/(<\/[^>]+>)/g, '\n      $1\n')
    .replace(/\another-class="[^"]*"/g, '')
    .replace(/\bmainclass="[^"]*"/g, '');
    
    newContainer.style.display = "none";
    document.body.appendChild(newContainer);
    
    htmlValue = newContainer.innerHTML;
    
    let AnimationScript = "";
    animationArray.forEach(Anim => {
        if(Anim.name !== "")
        {
            let links = Anim.link;
            AnimationScript += `${links}`;
        }
    });
    CSSFRAMEWORKArray.forEach(Anim => {
        let links = Anim.link;
        AnimationScript += `${links}`;
    });
    
    let Fonts = ``;
      const FontElement = document.querySelectorAll('link[data-font-styles="true"]');
      
      FontElement.forEach((FontElement) => {
        Fonts += FontElement.outerHTML + "\n";
      });
    
    let newHTML = `
    <html>
    
    <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectName}</title>
    ${AnimationScript}
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    ${Fonts}
    </head>
          <body>
          <div id="container">
          ${htmlValue}
          </div>
          </body>
    </html>
    `;

    codeContent.value = newHTML;
    codeContent.value = codeContent.value
    .replace(/\bclassname\b/g, 'className');


const selfClosingElements = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'];

let updatedHTML = codeContent.value;
selfClosingElements.forEach(element => {
    const regex = new RegExp(`<${element}([^>]*)>`, 'g');
    updatedHTML = updatedHTML.replace(regex, `<${element}$1/>`);
});

let projectAPP = "App";
if(projectName !== ""){
let cleanedName = projectName.replace(/^[0-9]+|[^\w\s]/g, '');
let projectNewName = cleanedName.replace(/\s+/g, '_');
projectAPP = projectNewName;
}

let reactCreate = 
`
import React from 'react';
const ${projectAPP} = () => {
    return (
        ${updatedHTML}
    );
};

export default ${projectAPP};
`;


codeContent.value = reactCreate;

    
    //-------------------------
    copybuttonFunction(codeContent.value);
    if(newContainer){
        newContainer.remove()
    }
})
tabCSS.addEventListener("click", ()=>{
let styleValue = "";
let bodystyle = document.getElementById("bodyStyle");
let customCSS = document.getElementById("Project-Custom-CSS-Style");
let styleTag = container.querySelectorAll('style');

styleValue += `${bodystyle.innerHTML}`;
styleValue += `${customCSS.innerHTML}`;

styleTag.forEach(style => {
    styleValue += `${style.innerHTML}`;
});

codeContent.value = styleValue;
copybuttonFunction(codeContent.value);
})
tabJS.addEventListener("click", ()=>{
let ScriptValue = "";
let ScriptTag = container.querySelectorAll('script');

ScriptTag.forEach(script => {
let ScriptContent = removePatternFromString(script.innerHTML);
ScriptValue += `${ScriptContent}`;
});

codeContent.value = ScriptValue;
copybuttonFunction(codeContent.value);
})

tabHTML.click();
setTimeout(() => {
    copybuttonFunction(codeContent.value);
}, 1);

}
//===== Misc. //=============================//

function jsxClassName(element){
let oldClass = element.getAttribute("class");
if(oldClass){
    element.setAttribute("className",oldClass);
    element.removeAttribute("class");
}
}

function elementModifier(element){
    element.removeAttribute('icon-class');


let onClickAttr = element.getAttribute("onclick");
if (onClickAttr !== null && onClickAttr === "") {
    element.removeAttribute("onclick");
  }
let onClickAttrData = element.getAttribute("data-onClick");
if (onClickAttrData && onClickAttrData === "") {
    element.removeAttribute("data-onClick");
  }
let altAttr = element.getAttribute("alt");
if (altAttr !== null && altAttr === "") {
    element.removeAttribute("alt");
  }
let tittleattr = element.getAttribute("title");

if (tittleattr !== null && tittleattr === "") {
    element.removeAttribute("title");
  }
return

}


function removePatternFromString(funcString) {
    const startPattern = "//--Start--//";
    const endPattern = "//--End--//";
  
    const startIndex = funcString.indexOf(startPattern);
    const endIndex = funcString.indexOf(endPattern) + endPattern.length;
  
    if (startIndex !== -1 && endIndex !== -1) {
      return funcString.substring(startIndex + startPattern.length, endIndex - endPattern.length);
    }
  
    // Jika pattern tidak ditemukan, kembalikan string asli
    return funcString;
  }

function copybuttonFunction(textarea){

let copyButton = document.getElementById("lazy-export-component-head-Copy");
if(copyContentSession > 1){
    copyButton.removeEventListener("click", copyselection);
}
let codeContent = textarea;

copyButton.addEventListener("click", copyselection);
copyContentSession ++;
function copyselection(){
    
// Buat elemen textarea sementara
let tempTextArea = document.createElement("textarea");
  
// Tetapkan nilai textarea sementara dengan teks dari codeContent
tempTextArea.value = codeContent;

// Sembunyikan elemen textarea sementara dari tampilan
tempTextArea.style.position = "fixed";
tempTextArea.style.top = "-9999px";
tempTextArea.style.left = "-9999px";

// Tambahkan elemen textarea sementara ke dalam dokumen
document.body.appendChild(tempTextArea);

// Pilih teks dalam elemen textarea sementara
tempTextArea.select();

// Salin teks ke clipboard
document.execCommand("copy");

// Hapus elemen textarea sementara dari dokumen
document.body.removeChild(tempTextArea);
let copytext = document.getElementById('lazy-export-component-head-Copy-h4');
copytext.textContent = "Copied!";

  setTimeout(() => {
    copytext.textContent = "Copy";
  }, 2000); // Reset the button text after 2 seconds
}
}

// Download Zip Without Image //=======
// Fungsi downloadZipNoImageFunc sedikit Berbeda dair Lazydev
function downloadZipNoImageFunc(state){
    let buttonDownloadZip = document.getElementById("lazy-zip-download-button-without-image");
    buttonDownloadZip.addEventListener('click', async () => {
        downloadZipNoImageFuncstate();
    })
    }

async function downloadZipNoImageFuncstate (state){
 check_dynamic_fetch();
//--------------------------------------------------------------------------------------------//
let container = document.getElementById("container");
//---------------------------------------------------------------------------//

    let proName = `index`;
    if(projectName !== ""){proName = `${projectName}`}
    const cleanedProjectName = proName.replace(/[^a-zA-Z0-9_]/g, "_");
//---------------------------------------------------------------------------//
// HTML File

   let htmlValue = "";

    let newContainer = document.createElement("div");
    newContainer.innerHTML = container.innerHTML;
    
    let elementz = newContainer.querySelectorAll("*");
    
    elementz.forEach(element => {
        elementModifier(element);
        // htmlValue += modifiedElement;
    });
    // elementz.forEach(element => {
    //     jsxClassName(element)
    // });
    
    newContainer.innerHTML = newContainer.innerHTML.replace
    (/<style\b[^>]*>([\s\S]*?)<\/style>/gi, '')
    .replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gi, '')
    .replace(/\bdata-href/g, 'href')
    .replace(/\bdata-onClick/g, 'onclick')
    .replace(/href-target/g, 'target')
    .replace(/\bdata-[^" ]+"[^"]*"/g, '')
    .replace(/>/g, '>\n      ')
    .replace(/(<\/[^>]+>)/g, '\n      $1\n')
    // .replace(/\blazydev="[^"]*"/g, '')
    .replace(/\another-class="[^"]*"/g, '')
    .replace(/\bmainclass="[^"]*"/g, '');
    
    newContainer.style.display = "none";
    document.body.appendChild(newContainer);
    // htmlValue = newContainer.innerHTML;
    
    htmlValue = newContainer.innerHTML;
    
    let AnimationScript = "";
    animationArray.forEach(Anim => {
        if(Anim.name !== "")
        {
            let links = Anim.link;
            AnimationScript += `${links}`;
        }
    });
    CSSFRAMEWORKArray.forEach(Anim => {
        let links = Anim.link;
        AnimationScript += `${links}`;
    });
    
    let Fonts = ``;
      const FontElement = document.querySelectorAll('link[data-font-styles="true"]');
      
      FontElement.forEach((FontElement) => {
        Fonts += FontElement.outerHTML + "\n";
      });
    
    let newHTML = `
<html>

<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${projectName}</title>
${AnimationScript}
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<link rel="stylesheet" href="style.css">
${Fonts}
</head>
      <body>
      <div id="container">
      ${htmlValue}
      </div>
      <script src="script.js"></script>
      </body>
</html>
`;

if(state && state === 'save-component'){
    newHTML = `
    ${htmlValue}
    `
}

    // codeContent.value = newHTML;
    // codeContent.value = codeContent.value
    // .replace(/\bclassname\b/g, 'className');

const selfClosingElements = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'];


let styleValue = "";
let bodystyle = document.getElementById("bodyStyle");
let customCSS = document.getElementById("Project-Custom-CSS-Style");
let styleTag = container.querySelectorAll('style');

if(!state){
styleValue += `${bodystyle.innerHTML}`;
styleValue += `${customCSS.innerHTML}`;
}

styleTag.forEach(style => {
    styleValue += `${style.innerHTML}`;
});


let ScriptValue = "";
let ScriptTag = container.querySelectorAll('script');

ScriptTag.forEach(script => {
let ScriptContent = removePatternFromString(script.innerHTML);
ScriptValue += `${ScriptContent}`;
});


//-----------------------

if(state && state === 'save-component'){
    const save = {
        newHTML,styleValue,ScriptValue
    }
    delete_functionfetchClass();
    return save
}

const files = [
    { name: `${cleanedProjectName}.html`, content: newHTML },
    { name: "style.css", content: styleValue },
    { name: "script.js", content: ScriptValue }
];

//--- download function -- //
const zip = new JSZip();
    const folder = zip.folder('my_files');

    for (const file of files) {
        folder.file(file.name, file.content);
    }

    zip.generateAsync({ type: 'blob' })
        .then(function (zipBlob) {
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(zipBlob);
            downloadLink.download = 'my_files.zip';

            downloadLink.click();
            URL.revokeObjectURL(downloadLink.href);
        });
}

function downloadZipIncImageFunc(){
    let buttonDownloadZip = document.getElementById("lazy-zip-download-button-with-image");
    buttonDownloadZip.addEventListener('click', async () => {
//--------------------------------------------------------------------------------------------//
    let container = document.getElementById("container");
//---------------------------------------------------------------------------//
    // let ContentHTML = document.createElement("TEXTAREA");

    let proName = `index`;
    if(projectName !== ""){proName = `${projectName}`}
    const cleanedProjectName = proName.replace(/[^a-zA-Z0-9_]/g, "_");
    let mediaFolder = [];
//---------------------------------------------------------------------------//
// HTML File

let htmlValue = "";

let newContainer = document.createElement("div");
newContainer.innerHTML = container.innerHTML;

let elementz = newContainer.querySelectorAll("*");
let imagesElement = newContainer.querySelectorAll("img");
let imageIndex = 1;
let imageTime = getrandomNumberHex("IMG");

function mediaPushLoop(img) {
    let mediasource = img.getAttribute("src");
    if (mediasource !== "") {
            let urlWithoutParams = mediasource.split('?')[0];
            let extension = urlWithoutParams.split('.').pop();
            let mediaName = "media" + imageIndex + imageTime + "." + extension;
            let mediaFrom = "html";
            let newImage = { name: mediaName, from: mediaFrom, content: mediasource};
            mediaFolder.push(newImage);
            imageIndex++;
    }
}

function removeDuplicateContent(mediaArray) {
    const seenContents = new Set();

    return mediaArray.filter(media => {
        if (!seenContents.has(media.content)) {
            seenContents.add(media.content);
            return true;
        }
        return false;
    });
}

// Pastikan untuk memanggil mediaPushLoop setelah definisinya


function mediaChangeLoop(media,imagesElement){
    let source = media.content;
    imagesElement.forEach(element => {
        let mediaUrl = element.getAttribute("src");
        if(mediaUrl){
            if(mediaUrl === source)
        {
            element.setAttribute("src", "media/" + media.name);
        }
        }
    });
}

if(imagesElement.length > 0)
{
    imagesElement.forEach(img => {
        mediaPushLoop(img)
    });
}

mediaFolder = removeDuplicateContent(mediaFolder);

if(imagesElement.length > 0){
    mediaFolder.forEach(media => {
        mediaChangeLoop(media,imagesElement);
    });
}

elementz.forEach(element => {
    elementModifier(element);
    // htmlValue += modifiedElement;
});

newContainer.innerHTML = newContainer.innerHTML.replace
(/<style\b[^>]*>([\s\S]*?)<\/style>/gi, '')
.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gi, '')
.replace(/\bdata-href/g, 'href')
.replace(/\bdata-onClick/g, 'onclick')
.replace(/href-target/g, 'target')
.replace(/\bdata-[^" ]+"[^"]*"/g, '')
.replace(/>/g, '>\n      ')
.replace(/(<\/[^>]+>)/g, '\n      $1\n')
// .replace(/\blazydev="[^"]*"/g, '')
.replace(/\another-class="[^"]*"/g, '')
.replace(/\bmainclass="[^"]*"/g, '');

newContainer.style.display = "none";
document.body.appendChild(newContainer);
// htmlValue = newContainer.innerHTML;

htmlValue = newContainer.innerHTML;

let AnimationScript = "";
animationArray.forEach(Anim => {
    if(Anim.name !== "")
    {
        let links = Anim.link;
        AnimationScript += `${links}`;
    }
});
CSSFRAMEWORKArray.forEach(Anim => {
    let links = Anim.link;
    AnimationScript += `${links}`;
});

let Fonts = ``;
  const FontElement = document.querySelectorAll('link[data-font-styles="true"]');
  
  FontElement.forEach((FontElement) => {
    Fonts += FontElement.outerHTML + "\n";
  });

let newHTML = `
<html>

<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${projectName}</title>
${AnimationScript}
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<link rel="stylesheet" href="style.css">
${Fonts}
</head>
      <body>
      <div id="container">
      ${htmlValue}
      </div>
      <script src="script.js"></script>
      </body>
</html>
`;

const imgTags = newHTML.match(/<img[^>]+>/g);
const srcRegex = /src=['"]([^'"]+)['"]/;

//-----------------------------------------------------------------//
let styleValue = "";
let bodystyle = document.getElementById("bodyStyle");
let customCSS = document.getElementById("Project-Custom-CSS-Style");
let styleTag = container.querySelectorAll('style');

styleValue += `${bodystyle.innerHTML}`;
styleValue += `${customCSS.innerHTML}`;

styleTag.forEach(style => {
    styleValue += `${style.innerHTML}`;
});

const urlRegex = /background:\s*url\(['"]([^'"]+)['"]\)/g;
let match;
while ((match = urlRegex.exec(styleValue)) !== null) {
  const url = match[1];
  let urlWithoutParams = url.split('?')[0];
  let extension = urlWithoutParams.split('.').pop();
  let mediaName = "media" + imageIndex  + imageTime + "." + extension;
  let mediaFrom = "css";
  let newImage = {name: `${mediaName}`, from: mediaFrom, content: url};
  mediaFolder.push(newImage);
  imageIndex ++;
  
}

mediaFolder = removeDuplicateContent(mediaFolder);

if(mediaFolder.length > 0){
    mediaFolder.forEach(media => {
        let mediaContent = media.content;
        if (styleValue.includes(mediaContent)) {
            styleValue = styleValue.replace(media.content, "media/" + media.name);
          }
    });
}

let ScriptValue = "";
let ScriptTag = container.querySelectorAll('script');

ScriptTag.forEach(script => {
let ScriptContent = removePatternFromString(script.innerHTML);
ScriptValue += `${ScriptContent}`;
});

//-----------------------



const zip = new JSZip();
const folder = zip.folder('my_files');
const mediaSubFolder = folder.folder('media');

const mediaPromises = mediaFolder.map(media => {
    return fetch(media.content)
        .then(response => response.blob())
        .then(blob => {
            return blobToBase64(blob); // Konversi blob ke base64
        })
        .then(base64Data => {
            mediaSubFolder.file(media.name, base64Data, { base64: true }); // Menambahkan sebagai base64
        })
        .catch(error => {
            console.error(`Terjadi kesalahan saat mengunduh ${media.name}:`, error);
        });
});

// Fungsi untuk mengubah blob ke base64
function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

Promise.all(mediaPromises)
    .then(() => {
        // Tambahkan konten file HTML, CSS, dan JS
        const files = [
            { name: `${cleanedProjectName}.html`, content: newHTML },
            { name: "style.css", content: styleValue },
            { name: "script.js", content: ScriptValue }
        ];

        files.forEach(file => {
            folder.file(file.name, file.content);
        });

        // Setelah selesai, menghasilkan file ZIP
        return zip.generateAsync({ type: 'blob' });
    })
    .then(zipBlob => {
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(zipBlob);
        downloadLink.download = 'my_files.zip';

        downloadLink.click();
        URL.revokeObjectURL(downloadLink.href);
    });

    })
    }

function downloadZipNoImageFuncJSX(){
let buttonDownloadZip = document.getElementById("lazy-zip-download-button-without-image");
    buttonDownloadZip.addEventListener('click', async () => {
//--------------------------------------------------------------------------------------------//
    let container = document.getElementById("container");
    let codeContent = document.getElementById("lazy-export-component-body-textarea");
//---------------------------------------------------------------------------//

    let proName = `index`;
    if(projectName !== ""){proName = `${projectName}`}
    const cleanedProjectName = proName.replace(/[^a-zA-Z0-9_]/g, "_");
//---------------------------------------------------------------------------//
// HTML File
function jsxIndex(){
    let htmlValue = "";

    let newContainer = document.createElement("div");
    newContainer.innerHTML = container.innerHTML;
    
    let elementz = newContainer.querySelectorAll("*");
    
    elementz.forEach(element => {
        elementModifier(element);
        // htmlValue += modifiedElement;
    });
    elementz.forEach(element => {
        jsxClassName(element)
    });
    
    newContainer.innerHTML = newContainer.innerHTML.replace
    (/<style\b[^>]*>([\s\S]*?)<\/style>/gi, '')
    .replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gi, '')
    .replace(/\bdata-href/g, 'href')
    .replace(/\bdata-onClick/g, 'onclick')
    .replace(/href-target/g, 'target')
    .replace(/\bdata-[^" ]+"[^"]*"/g, '')
    .replace(/>/g, '>\n      ')
    .replace(/(<\/[^>]+>)/g, '\n      $1\n')
    // .replace(/\blazydev="[^"]*"/g, '')
    .replace(/\another-class="[^"]*"/g, '')
    .replace(/\bmainclass="[^"]*"/g, '');
    
    newContainer.style.display = "none";
    document.body.appendChild(newContainer);
    // htmlValue = newContainer.innerHTML;
    
    htmlValue = newContainer.innerHTML;
    
    let AnimationScript = "";
    animationArray.forEach(Anim => {
        if(Anim.name !== "")
        {
            let links = Anim.link;
            AnimationScript += `${links}`;
        }
    });
    CSSFRAMEWORKArray.forEach(Anim => {
        let links = Anim.link;
        AnimationScript += `${links}`;
    });
    
    let Fonts = ``;
      const FontElement = document.querySelectorAll('link[data-font-styles="true"]');
      
      FontElement.forEach((FontElement) => {
        Fonts += FontElement.outerHTML + "\n";
      });
    let newHTML = `
    <html>
    
    <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectName}</title>
    ${AnimationScript}
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    ${Fonts}
    </head>
          <body>
          <div id="container">
          ${htmlValue}
          </div>
          </body>
    </html>
    `;

    codeContent.value = newHTML;
    codeContent.value = codeContent.value
    .replace(/\bclassname\b/g, 'className');
    
// const updatedHTML = codeContent.value.replace(/<img([^>]*)>/g, '<img$1/>');

// codeContent.value = updatedHTML;

const selfClosingElements = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'];

let updatedHTML = codeContent.value;
selfClosingElements.forEach(element => {
    const regex = new RegExp(`<${element}([^>]*)>`, 'g');
    updatedHTML = updatedHTML.replace(regex, `<${element}$1/>`);
});

let projectAPP = "App";
if(projectName !== ""){
let cleanedName = projectName.replace(/^[0-9]+|[^\w\s]/g, '');
let projectNewName = cleanedName.replace(/\s+/g, '_');
projectAPP = projectNewName;
}

let reactCreate = 
`
import React from 'react';
const ${projectAPP} = () => {
    return (
        ${updatedHTML}
    );
};

export default ${projectAPP};
`;

return reactCreate;
}

function jsxCompile(){
   let htmlValue = "";

    let newContainer = document.createElement("div");
    newContainer.innerHTML = container.innerHTML;
    
    let elementz = newContainer.querySelectorAll("*");
    
    elementz.forEach(element => {
        elementModifier(element);
        // htmlValue += modifiedElement;
    });
    elementz.forEach(element => {
        jsxClassName(element)
    });
    
    newContainer.innerHTML = newContainer.innerHTML.replace
    (/<style\b[^>]*>([\s\S]*?)<\/style>/gi, '')
    .replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gi, '')
    .replace(/\bdata-href/g, 'href')
    .replace(/\bdata-onClick/g, 'onclick')
    .replace(/href-target/g, 'target')
    .replace(/\bdata-[^" ]+"[^"]*"/g, '')
    .replace(/>/g, '>\n      ')
    .replace(/(<\/[^>]+>)/g, '\n      $1\n')
    // .replace(/\blazydev="[^"]*"/g, '')
    .replace(/\another-class="[^"]*"/g, '')
    .replace(/\bmainclass="[^"]*"/g, '');
    
    newContainer.style.display = "none";
    document.body.appendChild(newContainer);
    // htmlValue = newContainer.innerHTML;
    
    htmlValue = newContainer.innerHTML;
    
    let AnimationScript = "";
    animationArray.forEach(Anim => {
        if(Anim.name !== "")
        {
            let links = Anim.link;
            AnimationScript += `${links}`;
        }
    });
    CSSFRAMEWORKArray.forEach(Anim => {
        let links = Anim.link;
        AnimationScript += `${links}`;
    });
    
    let Fonts = ``;
      const FontElement = document.querySelectorAll('link[data-font-styles="true"]');
      
      FontElement.forEach((FontElement) => {
        Fonts += FontElement.outerHTML + "\n";
      });
    
    let newHTML = `
    <>
        ${htmlValue}
    </>
    `;

    codeContent.value = newHTML;
    codeContent.value = codeContent.value
    .replace(/\bclassname\b/g, 'className');

const selfClosingElements = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'];

let updatedHTML = codeContent.value;
selfClosingElements.forEach(element => {
    const regex = new RegExp(`<${element}([^>]*)>`, 'g');
    updatedHTML = updatedHTML.replace(regex, `<${element}$1/>`);
});

let projectAPP = "App";
if(projectName !== ""){
let cleanedName = projectName.replace(/^[0-9]+|[^\w\s]/g, '');
let projectNewName = cleanedName.replace(/\s+/g, '_');
projectAPP = projectNewName;
}

let reactCreate = 
`
import React from 'react';
const ${projectAPP} = () => {
    return (
        ${updatedHTML}
    );
};

export default ${projectAPP};
`;

return reactCreate;
}


let styleValue = "";
let bodystyle = document.getElementById("bodyStyle");
let customCSS = document.getElementById("Project-Custom-CSS-Style");
let styleTag = container.querySelectorAll('style');

styleValue += `${bodystyle.innerHTML}`;
styleValue += `${customCSS.innerHTML}`;

styleTag.forEach(style => {
    styleValue += `${style.innerHTML}`;
});


let ScriptValue = "";
let ScriptTag = container.querySelectorAll('script');

ScriptTag.forEach(script => {
let ScriptContent = removePatternFromString(script.innerHTML);
ScriptValue += `${ScriptContent}`;
});


//-----------------------
let jsxContent = jsxIndex();
let jsxCompileContent = jsxCompile();
const files = [
    { name: `${cleanedProjectName}.jsx`, content: jsxContent },
    { name: `${cleanedProjectName}_Compact.jsx`, content: jsxCompileContent },
    { name: "style.css", content: styleValue },
    { name: "script.js", content: ScriptValue }
];

//--- download function -- //
const zip = new JSZip();
    const folder = zip.folder('my_files');

    for (const file of files) {
        folder.file(file.name, file.content);
    }

    zip.generateAsync({ type: 'blob' })
        .then(function (zipBlob) {
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(zipBlob);
            downloadLink.download = 'my_files.zip';

            downloadLink.click();
            URL.revokeObjectURL(downloadLink.href);
        });

        codeContent.value = jsxIndex();


    })

}
function downloadZipIncImageFuncJSX(){
    let codeContent = document.getElementById("lazy-export-component-body-textarea");
    let buttonDownloadZip = document.getElementById("lazy-zip-download-button-with-image");
    buttonDownloadZip.addEventListener('click', async () => {
//--------------------------------------------------------------------------------------------//
    let container = document.getElementById("container");
//---------------------------------------------------------------------------//
    // let ContentHTML = document.createElement("TEXTAREA");

    let proName = `index`;
    if(projectName !== ""){proName = `${projectName}`}
    const cleanedProjectName = proName.replace(/[^a-zA-Z0-9_]/g, "_");
    let mediaFolder = [];
//---------------------------------------------------------------------------//
// HTML File

let htmlValue = "";

let newContainer = document.createElement("div");
newContainer.innerHTML = container.innerHTML;

let elementz = newContainer.querySelectorAll("*");
let imagesElement = newContainer.querySelectorAll("img");
let imageIndex = 1;
let imageTime = getrandomNumberHex("IMG");

function mediaPushLoop(img) {
    let mediasource = img.getAttribute("src");
    if (mediasource !== "") {
            let urlWithoutParams = mediasource.split('?')[0];
            let extension = urlWithoutParams.split('.').pop();
            let mediaName = "media" + imageIndex + imageTime + "." + extension;
            let mediaFrom = "html";
            let newImage = { name: mediaName, from: mediaFrom, content: mediasource};
            mediaFolder.push(newImage);
            imageIndex++;
    }
}

function removeDuplicateContent(mediaArray) {
    const seenContents = new Set();

    return mediaArray.filter(media => {
        if (!seenContents.has(media.content)) {
            seenContents.add(media.content);
            return true;
        }
        return false;
    });
}

// Pastikan untuk memanggil mediaPushLoop setelah definisinya


function mediaChangeLoop(media,imagesElement){
    let source = media.content;
    imagesElement.forEach(element => {
        let mediaUrl = element.getAttribute("src");
        if(mediaUrl){
            if(mediaUrl === source)
        {
            element.setAttribute("src", "media/" + media.name);
        }
        }
    });
}

if(imagesElement.length > 0)
{
    imagesElement.forEach(img => {
        mediaPushLoop(img)
    });
}

mediaFolder = removeDuplicateContent(mediaFolder);

if(imagesElement.length > 0){
    mediaFolder.forEach(media => {
        mediaChangeLoop(media,imagesElement);
    });
}

elementz.forEach(element => {
    elementModifier(element);
    // htmlValue += modifiedElement;
});

elementz.forEach(element => {
    jsxClassName(element)
});

newContainer.innerHTML = newContainer.innerHTML.replace
(/<style\b[^>]*>([\s\S]*?)<\/style>/gi, '')
.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gi, '')
.replace(/\bdata-href/g, 'href')
.replace(/\bdata-onClick/g, 'onclick')
.replace(/href-target/g, 'target')
.replace(/\bdata-[^" ]+"[^"]*"/g, '')
.replace(/>/g, '>\n      ')
.replace(/(<\/[^>]+>)/g, '\n      $1\n')
// .replace(/\blazydev="[^"]*"/g, '')
.replace(/\another-class="[^"]*"/g, '')
.replace(/\bmainclass="[^"]*"/g, '');

newContainer.style.display = "none";
document.body.appendChild(newContainer);
// htmlValue = newContainer.innerHTML;

htmlValue = newContainer.innerHTML;

let AnimationScript = "";
animationArray.forEach(Anim => {
    if(Anim.name !== "")
    {
        let links = Anim.link;
        AnimationScript += `${links}`;
    }
});
CSSFRAMEWORKArray.forEach(Anim => {
    let links = Anim.link;
    AnimationScript += `${links}`;
});

let Fonts = ``;
  const FontElement = document.querySelectorAll('link[data-font-styles="true"]');
  
  FontElement.forEach((FontElement) => {
    Fonts += FontElement.outerHTML + "\n";
  });
function NewHTML1(Data){
    let newHTML = `
    <>
        ${htmlValue}
    </>
    `;
if(Data === "JSX"){
newHTML = `
<html>

<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${projectName}</title>
${AnimationScript}
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<link rel="stylesheet" href="style.css">
${Fonts}
</head>
      <body>
      <div id="container">
      ${htmlValue}
      </div>
      <script src="script.js"></script>
      </body>
</html>
`;
}
codeContent.value = newHTML;
    codeContent.value = codeContent.value
.replace(/\bclassname\b/g, 'className');
const selfClosingElements = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'];

let updatedHTML = codeContent.value;
selfClosingElements.forEach(element => {
    const regex = new RegExp(`<${element}([^>]*)>`, 'g');
    updatedHTML = updatedHTML.replace(regex, `<${element}$1/>`);
});

let projectAPP = "App";
if(projectName !== ""){
let cleanedName = projectName.replace(/^[0-9]+|[^\w\s]/g, '');
let projectNewName = cleanedName.replace(/\s+/g, '_');
projectAPP = projectNewName;
}

let reactCreate = 
`
import React from 'react';
const ${projectAPP} = () => {
    return (
        ${updatedHTML}
    );
};

export default ${projectAPP};
`;

return reactCreate;

}
//-----------------------------------------------------------------//
let styleValue = "";
let bodystyle = document.getElementById("bodyStyle");
let customCSS = document.getElementById("Project-Custom-CSS-Style");
let styleTag = container.querySelectorAll('style');

styleValue += `${bodystyle.innerHTML}`;
styleValue += `${customCSS.innerHTML}`;

styleTag.forEach(style => {
    styleValue += `${style.innerHTML}`;
});

const urlRegex = /background:\s*url\(['"]([^'"]+)['"]\)/g;
let match;
while ((match = urlRegex.exec(styleValue)) !== null) {
  const url = match[1];
  let urlWithoutParams = url.split('?')[0];
  let extension = urlWithoutParams.split('.').pop();
  let mediaName = "media" + imageIndex  + imageTime + "." + extension;
  let mediaFrom = "css";
  let newImage = {name: `${mediaName}`, from: mediaFrom, content: url};
  mediaFolder.push(newImage);
  imageIndex ++;
  
}

mediaFolder = removeDuplicateContent(mediaFolder);

if(mediaFolder.length > 0){
    mediaFolder.forEach(media => {
        let mediaContent = media.content;
        if (styleValue.includes(mediaContent)) {
            styleValue = styleValue.replace(media.content, "media/" + media.name);
          }
    });
}

let ScriptValue = "";
let ScriptTag = container.querySelectorAll('script');

ScriptTag.forEach(script => {
let ScriptContent = removePatternFromString(script.innerHTML);
ScriptValue += `${ScriptContent}`;
});

//-----------------------



const zip = new JSZip();
const folder = zip.folder('my_files');
const mediaSubFolder = folder.folder('media');

const mediaPromises = mediaFolder.map(media => {
    return fetch(media.content)
        .then(response => response.blob())
        .then(blob => {
            return blobToBase64(blob); // Konversi blob ke base64
        })
        .then(base64Data => {
            mediaSubFolder.file(media.name, base64Data, { base64: true }); // Menambahkan sebagai base64
        })
        .catch(error => {
            console.error(`Terjadi kesalahan saat mengunduh ${media.name}:`, error);
        });
});

// Fungsi untuk mengubah blob ke base64
function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}
let jsxContent = NewHTML1("JSX");
let jsxCompile = NewHTML1("Compile");
Promise.all(mediaPromises)
    .then(() => {
        // Tambahkan konten file HTML, CSS, dan JS
        const files = [
            { name: `${cleanedProjectName}.jsx`, content: jsxContent },
            { name: `${cleanedProjectName}_Compile.jsx`, content: jsxCompile },
            { name: "style.css", content: styleValue },
            { name: "script.js", content: ScriptValue }
        ];

        files.forEach(file => {
            folder.file(file.name, file.content);
        });

        // Setelah selesai, menghasilkan file ZIP
        return zip.generateAsync({ type: 'blob' });
    })
    .then(zipBlob => {
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(zipBlob);
        downloadLink.download = 'my_files.zip';

        downloadLink.click();
        URL.revokeObjectURL(downloadLink.href);
    });

    })
}
//--- Save Component ----//