
import {
    frameworkIconClass,
    legendeditElement,
    //Content
    editFormimageSRC,
    editFormHeaderText,
    editFormContentText,
    contentText,
    editFormBoxSizing,
    labelFor,
    editAccesKey,
    editFormfontProperties,
    editFormeditAlternativeText,
    editFormeditEditonClickLink,
    editOnClickEvent,
    editFormeditTitleElement,
    submitType,
    htmlContent,
    innerHTMLUL,
    editListStyle,
    editSource,
    embedSourceType,
    checkAutoPlay,
    checkControl,
    checkLoop,
    checkFullscreen,
    editScrolling,
    editFrameBorder,
    tableContent,
    tableEditor,
      //Input
      editNameInput,
      editPlaceHolderInput,
      editMinInput,
      editMaxPInput,
      editStepInput,
      editMaxLenghtInput,
      editValueTextInput,
      editValueNumberInput,
      editColorValue,
      editRowsInput,
      editColsInput,
      editdefaultvalueDateInput,
      editMinateInput,
      editMaxDateInput,
      editdefaultvalueTimeInput,
      editMinTimeInput,
      editMaxTimeInput,
      editStepTimeInput,
      Selectoption,
      edit_Range_Apperance,
      textAreaValue,
      selectSize,
      autofocus,
      editAcceptInput,
      editMultipleCheck,
      editRequiredCheck,
      editreadonlyCheck,
      checked,
      editdisabledCheck,
      rangeStyle,
    //layout
        //FlexProperties
    editDisplay,
    editFormflexDirection,
    editFormJustifyContent,
    AlignItems,
    editFormAlignContent,
    editFormflexGap,
    editFormselectflexwrap,
        //FlexChildProperties
    editFormflexgrow,
    editFormflexOrder,
    editFormflexbasis,
    editFormflexShrink,
        //More Layout Setting
    editFormwidth,
    editFormheight,
    editFormoverflowX,
    editFormoverflowY,
    editFormhtmlTag,
    //style
    backgroundNone,
    editFormbackgroundColor,
    editFormadvanceBackground,
    outlineProperties,
    editFormborder,
    editFormborderRadius,
    editFormboxShadow,
    cssFilter,
    editFormfontFamily,
    editFormtextAlign,
    editFormfontColor,
    //Advance
    editFormMargin,
    editFormPadding,
    editCssPositioning,
    editFormElementID,
    editFormelementClass,
    editFormPosition,
    editFormCursor,
    editFormOpacity,
    editFormzIndex,
    editForClipPath,
    editFormTransition,
    editFormVisibility,
    editFormTransform,
    editFormAdditionalCSS,
    editCustomCSS,
    editFormCustomJavascript,
    editFormUsecolorPalatte,
    editUseFormColorEditor,
    Color_Palatte_Editor,
    Color_Palatte_Editor_withoutOP,
    classmode,
    openDesktop,
  } from './formEditElements.js';
  import { openColorPalateElementbgOpac, openColorEditorbgOpac, 
    openColorPalateElementbg,openColorEditorbg, fontOptions } from'./main.js';
  import { inputValueOfFormEdit } from'./formEditInputValue.js';
  import {closeAnim} from './Animation.js'

  const formEditor = document.createElement("form");
  formEditor.setAttribute("id", "FormEditElement");

    function standardAdvance(fieldset){
    let legend = legendeditElement;
    let formContent = legend +
    editFormMargin +
    editFormPadding +
    editCssPositioning +
    editFormElementID +
    editFormelementClass +
    editFormPosition+
    editFormCursor +
    editFormTransition+
    editFormOpacity+
    editForClipPath +
    editFormzIndex+
    editFormTransform+
    editFormAdditionalCSS +
    editCustomCSS +
    editFormCustomJavascript;

    fieldset.innerHTML = formContent;
     //Mengganti sebuah ID pada legend dan menggantik text Contentnya
     document.getElementById("formmakerlegendFormEditElement").textContent = "Advance Setting";
     document.getElementById("formmakerlegendFormEditElement").setAttribute("id", "Advance-Setting");
        return;
}

function standardStyling(fieldset,IdTarget){
        let targetbgcolor = "data-background-color-input";
        let targetbgOP = "data-background-opacity-input";
        let targetResult = "data-background-color-result";
        let fontAtribute = "data-font-color";
        let target = document.getElementById(IdTarget);
        let identity = target.getAttribute("data-identity");
      let formContent = "";
      let legend = legendeditElement;
      switch (identity) {
        case `Header Text` :
          legend = legendeditElement;
          formContent = legend +
          editFormfontFamily +
          editFormtextAlign +
          editFormfontColor +
          editFormfontProperties +
          backgroundNone +
          editFormbackgroundColor +
          editFormadvanceBackground +
          outlineProperties +
          editFormborder +
          editFormborderRadius +
          editFormboxShadow +
          cssFilter;
        break;
        case `Content Text` :
          legend = legendeditElement;
          formContent = legend +
          editFormfontFamily +
          editFormtextAlign +
          editFormfontColor +
          editFormfontProperties +
          backgroundNone +
          editFormbackgroundColor +
          editFormadvanceBackground +
          outlineProperties +
          editFormborder +
          editFormborderRadius +
          editFormboxShadow +
          cssFilter;
        break;
        case `List` :
          legend = legendeditElement;
          formContent = legend +
          editFormfontFamily +
          editFormtextAlign +
          editFormfontColor +
          editFormfontProperties +
          backgroundNone +
          editFormbackgroundColor +
          editFormadvanceBackground +
          outlineProperties +
          editFormborder +
          editFormborderRadius +
          editFormboxShadow +
          cssFilter;
        case `Table` :
          legend = legendeditElement;
          formContent = legend +
          tableEditor +
          editFormfontFamily +
          editFormtextAlign +
          editFormfontColor +
          editFormfontProperties +
          backgroundNone +
          editFormbackgroundColor +
          editFormadvanceBackground +
          outlineProperties +
          editFormborder +
          editFormborderRadius +
          editFormboxShadow +
          cssFilter;
        break;
        case "Formfield":
          let type = target.getAttribute("type");
          switch (type) {
            case 'range':
              legend = legendeditElement;
              formContent = legend +
              rangeStyle +
              backgroundNone +
              editFormbackgroundColor +
              editFormadvanceBackground +
              outlineProperties +
              editFormborder +
              editFormborderRadius +
              editFormboxShadow +
              cssFilter +
              editFormfontFamily +
              editFormtextAlign +
              editFormfontColor;
              break;
          
            default:
                legend = legendeditElement;
                formContent = legend +
                editFormfontFamily +
                editFormtextAlign +
                editFormfontColor +
                editFormfontProperties +
                backgroundNone +
                editFormbackgroundColor +
                editFormadvanceBackground +
                outlineProperties +
                editFormborder +
                editFormborderRadius +
                editFormboxShadow +
                cssFilter;
              break;
          }
        break;
      default:
        legend = legendeditElement;
        formContent = legend +
        backgroundNone +
        editFormbackgroundColor +
        editFormadvanceBackground +
        outlineProperties +
        editFormborder +
        editFormborderRadius +
        editFormboxShadow +
        cssFilter +
        editFormfontFamily +
        editFormtextAlign +
        editFormfontColor +
        editFormfontProperties;
        break;
  }
        fieldset.innerHTML = formContent;

        fontOptions("elementFontFamilyinput");
        //Mengganti sebuah ID pada legend dan menggantik text Contentnya
        document.getElementById("formmakerlegendFormEditElement").textContent = "Styling Setting";
        document.getElementById("formmakerlegendFormEditElement").setAttribute("id", "styling-Setting");

        Color_Palatte_Editor(IdTarget,
          "data-background-color-input","data-background-opacity-input","data-background-color-result",
          "elementBackgroundColorinput","elementBackgroundOpacityinput","elementBackgroundColorresult",
          "Background-CE","formfieldsetFormEditElement","elementBackgroundColorDiv");
        
          Color_Palatte_Editor_withoutOP(
            IdTarget,"data-font-color",
            "elementfontcolorinput","elementfontcolor",
            "fontColor-CE","formfieldsetFormEditElement","elementfontcolor"
          );
        return;
}

function FlexboxProperties(fieldset){
    let legend = legendeditElement;
    let formContent = legend + 
    editDisplay + 
    editFormflexDirection +
    editFormJustifyContent +
    AlignItems +
    editFormAlignContent +
    editFormflexgrow +
    editFormflexGap +
    editFormselectflexwrap;
    fieldset.innerHTML = formContent;
    //Mengganti sebuah ID pada legend dan menggantik text Contentnya
    document.getElementById("formmakerlegendFormEditElement").textContent = "Flexbox Setting";
    document.getElementById("formmakerlegendFormEditElement").setAttribute("id", "flexbox-Setting");
    return;
}

function FlexboxContentProperties(fieldset,IdTarget){
  let target = document.getElementById(IdTarget);
  // console.log(target);
  let identity = target.getAttribute("data-identity");
  let formContent;
  let legend = legendeditElement;
  switch (identity) {
    case `List`:
    case `Table`:
    case `HTML`:
    formContent = 
    legend +
    editDisplay + 
    editFormflexDirection +
    editFormJustifyContent +
    AlignItems +
    editFormAlignContent +
    editFormflexGap +
    editFormflexgrow +
    editFormflexOrder +
    editFormflexbasis +
    editFormselectflexwrap;
    break;
  
    default:
  formContent = 
  legend + 
  editDisplay + 
  editFormflexgrow +
  editFormflexOrder +
  editFormflexbasis +
  editFormflexShrink;
      break;
  }
  
  fieldset.innerHTML = formContent;
  //Mengganti sebuah ID pada legend dan menggantik text Contentnya
  document.getElementById("formmakerlegendFormEditElement").textContent = "Flexbox Setting";
  document.getElementById("formmakerlegendFormEditElement").setAttribute("id", "flexbox-Setting");
  return;
}

function FlexboxChildProperties(fieldset){
  let legend = legendeditElement;
  let formContent = legend + 
  editDisplay + 
  editFormflexDirection +
  editFormJustifyContent +
  AlignItems +
  editFormAlignContent +
  editFormflexGap +
  editFormflexgrow +
  editFormflexOrder +
  editFormflexbasis +
  editFormflexShrink +
  editFormselectflexwrap;
  fieldset.innerHTML = formContent;
  //Mengganti sebuah ID pada legend dan menggantik text Contentnya
  document.getElementById("formmakerlegendFormEditElement").textContent = "Flexbox Setting";
  document.getElementById("formmakerlegendFormEditElement").setAttribute("id", "flexbox-Setting");
  return;
}

function standardLayout(fieldset,idtarget){
  let target = document.getElementById(idtarget);
  let identity = target.getAttribute("data-identity");
  let formContent = "";
  let legend = legendeditElement;
  switch (identity) {
    case 'Image':
      formContent = legend + 
      editFormBoxSizing +
      editFormwidth +
      editFormheight +
      editFormoverflowX +
      editFormoverflowY;
      break;
      case 'Main Container':
      case 'Child Container':
      case 'Wrapper':
        formContent = legend + 
        editFormBoxSizing +
        editFormwidth +
        editFormheight +
        editFormoverflowX +
        editFormoverflowY +
        editFormhtmlTag +
        editOnClickEvent +
        editFormeditTitleElement;
        // editFormeditEditonClickLink;
      break;
      case 'Submit':
        formContent = legend + 
        editFormBoxSizing +
        editFormwidth +
        editFormheight +
        editFormoverflowX +
        editFormoverflowY +
        editFormhtmlTag +
        editOnClickEvent +
        editFormeditTitleElement;
      break;
    default:
    formContent = legend + 
    editFormBoxSizing +
    editFormwidth +
    editFormheight +
    editFormoverflowX +
    editFormoverflowY +
    editFormeditTitleElement;
    // editFormeditEditonClickLink;
      break;
  }  
  
    fieldset.innerHTML = formContent;
    //Mengganti sebuah ID pada legend dan menggantik text Contentnya
    document.getElementById("formmakerlegendFormEditElement").textContent = "Layout Setting";
    document.getElementById("formmakerlegendFormEditElement").setAttribute("id", "styling-Setting");
    return;
}

//===============================================================================
function contentSwitch(IdTarget,fieldset){
  let target = document.getElementById(IdTarget);
  let identity = target.getAttribute("data-identity");
  let tagName = target.tagName;
  let legend = legendeditElement;
  let formContent = "";
  switch (identity) {
    case 'Wrapper':
      switch (tagName) {
        case `A`:
          formContent = 
            legend + 
            editFormeditEditonClickLink;
          break;
      
        default:
          break;
      }
      break;
    case `Submit`:
            formContent = 
            legend + 
            submitType +
            editValueTextInput +
            editNameInput +
            // editFormeditEditonClickLink +
            editdisabledCheck +
            contentText;
    break;
    case 'HTML':
      formContent = 
      legend + 
      editFormhtmlTag +
      htmlContent;
      break;
    case 'Media':
      formContent = 
      legend + 
      editSource +
      embedSourceType +
      checkAutoPlay+
      checkControl +
      checkLoop;
      break;
    case 'Iframe':
      formContent = 
      legend + 
      editSource +
      editFrameBorder +
      checkAutoPlay+
      checkControl +
      checkLoop;
      break;
    case 'Table':
      formContent = 
      legend + 
      tableContent;
      break;
    case 'List':
      formContent = 
      legend + 
      innerHTMLUL+
      editListStyle;
      break;
    case 'Image':
      formContent = 
      legend + 
      editFormimageSRC +
      editFormeditTitleElement +
      // editFormeditEditonClickLink +
      editFormeditAlternativeText;
      break;
      case `Header Text` :
      formContent = 
      legend + 
      editFormHeaderText;
      break;
      case `Content Text` :
        switch (tagName) {
          case `LABEL`:
            formContent = 
            legend + 
            contentText +
            labelFor +
            editAccesKey;
            break;
            case `LEGEND`:
            formContent = 
            legend + 
            contentText;
            break;
            case `A`:
            formContent = 
            legend + 
            contentText+
            editFormeditEditonClickLink;
            break;
          default:
            formContent = 
            legend + 
            editFormContentText;
            break;
        }
      case `Formfield` :
        switch (tagName) {
          case `TEXTAREA`:
            formContent = 
            legend + 
            textAreaValue +
            editPlaceHolderInput +
            editNameInput +
            editMaxLenghtInput +
            editRowsInput +
            editColsInput +
            editRequiredCheck +
            editreadonlyCheck +
            editdisabledCheck;
            break;
          case `SELECT`:
            formContent = 
            legend + 
            editNameInput +
            selectSize +
            Selectoption +
            editMultipleCheck +
            autofocus +
            editreadonlyCheck +
            editdisabledCheck;
            break;
            case `INPUT`:
              let type = target.getAttribute("type");
              switch (type) {
                case "text":
                  formContent = 
                  legend + 
                  editValueTextInput +
                  editPlaceHolderInput +
                  editNameInput +
                  editMaxLenghtInput +
                  editRequiredCheck +
                  editreadonlyCheck +
                  editdisabledCheck;
                break;
                case "email":
                  formContent = 
                  legend + 
                  editValueTextInput +
                  editPlaceHolderInput +
                  editNameInput +
                  editRequiredCheck +
                  editreadonlyCheck +
                  editdisabledCheck;
                break;
                case "password":
                  formContent = 
                  legend + 
                  editValueTextInput +
                  editPlaceHolderInput +
                  editNameInput +
                  editRequiredCheck +
                  editreadonlyCheck +
                  editdisabledCheck;
                break;
                case "url":
                  formContent = 
                  legend + 
                  editValueTextInput +
                  editPlaceHolderInput +
                  editNameInput +
                  editRequiredCheck +
                  editreadonlyCheck +
                  editdisabledCheck;
                break;
                case "file":
                  formContent = 
                  legend + 
                  editAcceptInput +
                  editPlaceHolderInput +
                  editNameInput +
                  editMultipleCheck +
                  editRequiredCheck +
                  editreadonlyCheck +
                  editdisabledCheck;
                break;
                case "date":
                  formContent = 
                  legend + 
                  editPlaceHolderInput +
                  editNameInput +
                  editdefaultvalueDateInput +
                  editMinateInput +
                  editMaxDateInput +
                  editRequiredCheck +
                  editreadonlyCheck +
                  editdisabledCheck;
                break;
                case "time":
                  formContent = 
                  legend + 
                  editPlaceHolderInput +
                  editNameInput +
                  editdefaultvalueTimeInput +
                  editMinTimeInput +
                  editMaxTimeInput +
                  editStepTimeInput +
                  editRequiredCheck +
                  editreadonlyCheck +
                  editdisabledCheck;
                break;
                case "color":
                  formContent = 
                  legend + 
                  editNameInput +
                  editColorValue +
                  editreadonlyCheck +
                  editdisabledCheck;
                break;
                case "radio":
                  formContent = 
                  legend + 
                  editNameInput +
                  editValueTextInput +
                  checked +
                  editRequiredCheck +
                  editreadonlyCheck +
                  autofocus +
                  editdisabledCheck;
                break;
                case "checkbox":
                  formContent = 
                  legend + 
                  editNameInput +
                  editValueTextInput +
                  checked +
                  editRequiredCheck +
                  editreadonlyCheck +
                  autofocus +
                  editdisabledCheck;
                break;
                case "range":
                  formContent = 
                  legend +
                  editNameInput +
                  editValueNumberInput +
                  editMinInput +
                  editMaxPInput +
                  editStepInput +
                  edit_Range_Apperance +
                  editRequiredCheck +
                  editreadonlyCheck +
                  editdisabledCheck;
                break;
              
                default:
                  //ini input Number
                  formContent = 
                  legend +
                  editValueNumberInput +
                  editMinInput +
                  editMaxPInput +
                  editStepInput +
                  editPlaceHolderInput +
                  editNameInput +
                  editRequiredCheck +
                  editreadonlyCheck +
                  editdisabledCheck;
                  break;
              }
        
          default:
            break;
        }
        //---------------
    default:
      break;
  }
  fieldset.innerHTML = formContent;
  StyleULCheck(target);
  document.getElementById("formmakerlegendFormEditElement").textContent = "Content Setting";
  document.getElementById("formmakerlegendFormEditElement").setAttribute("id", "content-Setting");
  return;
}

function StyleULCheck(target){
    
  if(target.tagName === "UL"){
    let styleOL = document.querySelector("#style-for-OL");
    styleOL.remove();
  } else if (target.tagName === "OL"){
    let styleUL = document.querySelector("#style-for-UL");
    styleUL.remove();
  }
return
}

//=====Layout=====================================================================
function ContentLayout(IdTarget){
  let container = document.getElementById("content-menu-controller");
    gsap.to(container, { opacity: 0, duration: 0.2, onComplete: function() {
        let createForm = formEditor;
        createForm.innerHTML = frameworkIconClass;
        container.appendChild(createForm);

    let flex = document.createElement("fieldset");
    flex.setAttribute("id", "formfieldsetFormEditElement");
    let layout = document.createElement("fieldset");
    layout.setAttribute("id", "formfieldsetFormEditElement");
    let content = document.createElement("fieldset");
    content.setAttribute("id", "formfieldsetFormEditElement");
    
    createForm.appendChild(content);
    createForm.appendChild(flex);
    createForm.appendChild(layout);
    
    contentSwitch(IdTarget,content);
    FlexboxContentProperties(flex,IdTarget);
    standardLayout(layout,IdTarget);
    inputValueOfFormEdit(IdTarget);
    gsap.to(container,{opacity: 1, duration: 0.2, delay: 0.4});
    openDesktop();
    }});
}
//========================================================
function MainContainerLayout(IdTarget){
    let container = document.getElementById("content-menu-controller");
    gsap.to(container, { opacity: 0, duration: 0.2, onComplete: function() {
        let createForm = formEditor;
        createForm.innerHTML = frameworkIconClass;
        container.appendChild(createForm);

    let flex = document.createElement("fieldset");
    flex.setAttribute("id", "formfieldsetFormEditElement");
    let layout = document.createElement("fieldset");
    layout.setAttribute("id", "formfieldsetFormEditElement");

    createForm.appendChild(flex);
    createForm.appendChild(layout);

    FlexboxProperties(flex);
    standardLayout(layout,IdTarget);
    inputValueOfFormEdit(IdTarget);
    gsap.to(container,{opacity: 1, duration: 0.2, delay: 0.4});
    openDesktop();
    }});
}
//---------------------------------

function ChildContainerLayout(IdTarget){
  let thisTarget = document.getElementById(IdTarget);
  let targetTagname = thisTarget.tagName;
  let container = document.getElementById("content-menu-controller");
  gsap.to(container, { opacity: 0, duration: 0.2, onComplete: function() {
      let createForm = formEditor;
      createForm.innerHTML = frameworkIconClass;
      container.appendChild(createForm);

  let flex = document.createElement("fieldset");
  flex.setAttribute("id", "formfieldsetFormEditElement");
  let layout = document.createElement("fieldset");
  layout.setAttribute("id", "formfieldsetFormEditElement");
  let content;
  if(targetTagname === 'A'){
    content = document.createElement("fieldset");
    content.setAttribute("id", "formfieldsetFormEditElement");
    createForm.appendChild(content);
  }

  createForm.appendChild(flex);
  createForm.appendChild(layout);
  if(targetTagname === 'A'){
    contentSwitch(IdTarget,content);
  }
  FlexboxChildProperties(flex);
  standardLayout(layout,IdTarget);
  inputValueOfFormEdit(IdTarget);
  gsap.to(container,{opacity: 1, duration: 0.2, delay: 0.4});
  openDesktop();
  }});
}
//=====Style=====================================================================
///===========================
function MainContainerStyle(IdTarget){
    let container = document.getElementById("content-menu-controller");
    gsap.to(container, { opacity: 0, duration: 0.2, onComplete: function() {
        let createForm = formEditor;
        createForm.innerHTML = '';
        container.appendChild(createForm);

        let style = document.createElement("fieldset");
        style.setAttribute("id", "formfieldsetFormEditElement");

        createForm.appendChild(style);

        standardStyling(style,IdTarget);
        inputValueOfFormEdit(IdTarget);
        gsap.to(container,{opacity: 1, duration: 0.2, delay: 0.4});
        openDesktop();
    }});
}
//=====Advance=====================================================================
function MainContainerAdvance(IdTarget){
    let container = document.getElementById("content-menu-controller");
    gsap.to(container, { opacity: 0, duration: 0.2, onComplete: function() {
    let createForm = formEditor;
    createForm.innerHTML = '';
    container.appendChild(createForm);
    
    let Advance = document.createElement("fieldset");
    Advance.setAttribute("id", "formfieldsetFormEditElement");

    createForm.appendChild(Advance);

    standardAdvance(Advance);
    inputValueOfFormEdit(IdTarget);
    gsap.to(container,{opacity: 1, duration: 0.2, delay: 0.4});
    openDesktop();
}});
    }
//=====TAB=====================================================================
function MainContainerTab(IdTarget){
    let BodyMenu = `
      <div id="Layout-Editor">Layout</div>
      <div id="Style-Editor">Style</div>
      <div id="Advance-Editor">Advance</div>
    `;
    let bodyMenuContainer = document.getElementById("menu-tab");
    //Menghapus Elemen Sebelumnya
    bodyMenuContainer.innerHTML = "";
    bodyMenuContainer.innerHTML = BodyMenu;
    //Memberikan Event Listener beserta Idtarget
    document.getElementById("Layout-Editor").addEventListener("click", function(){
    MainContainerLayout(IdTarget);
      });
    document.getElementById("Style-Editor").addEventListener("click", function(){
      MainContainerStyle(IdTarget);
      });
    document.getElementById("Advance-Editor").addEventListener("click", function(){
      MainContainerAdvance(IdTarget);
      });
}
//-----------------------------------------------------------
function ChildContainerTab(IdTarget){
  let BodyMenu = `
    <div id="Layout-Editor">Layout</div>
    <div id="Style-Editor">Style</div>
    <div id="Advance-Editor">Advance</div>
  `;
  let bodyMenuContainer = document.getElementById("menu-tab");
  //Menghapus Elemen Sebelumnya
  bodyMenuContainer.innerHTML = "";
  bodyMenuContainer.innerHTML = BodyMenu;
  //Memberikan Event Listener beserta Idtarget
  document.getElementById("Layout-Editor").addEventListener("click", function(){
    ChildContainerLayout(IdTarget);
    });
  document.getElementById("Style-Editor").addEventListener("click", function(){
    MainContainerStyle(IdTarget);
    });
  document.getElementById("Advance-Editor").addEventListener("click", function(){
    MainContainerAdvance(IdTarget);
    });
}
//---------------------------------------------------
export function ContentTab(IdTarget){
  let BodyMenu = `
    <div id="Layout-Editor">Layout</div>
    <div id="Style-Editor">Style</div>
    <div id="Advance-Editor">Advance</div>
  `;
  let bodyMenuContainer = document.getElementById("menu-tab");
  //Menghapus Elemen Sebelumnya
  bodyMenuContainer.innerHTML = "";
  bodyMenuContainer.innerHTML = BodyMenu;
  //Memberikan Event Listener beserta Idtarget
  document.getElementById("Layout-Editor").addEventListener("click", function(){
    ContentLayout(IdTarget);
    });
  document.getElementById("Style-Editor").addEventListener("click", function(){
    MainContainerStyle(IdTarget);
    });
  document.getElementById("Advance-Editor").addEventListener("click", function(){
    MainContainerAdvance(IdTarget);
    });
}
//===================================================
function layoutConstructor(target,state){
  let maincontroller = document.getElementById("main-controller");
  maincontroller.style.width = "25vw";
  //Memberikan Informasi State 
  document.getElementById("close-menu").addEventListener("click", closeAnim);
  gsap.to("#container", {
    marginLeft: "20%",
    width: "80%",
    delay: 0.5,
    duration: 0.5, // Durasi animasi dalam detik
    ease: "power1.easeInOut" // Efek easing untuk animasi
  });
    //Menghapus Elemen Konten Sebelumnya
    let container = document.getElementById("content-menu-controller");
    container.innerHTML = "";

    let closeButton = document.getElementById("ClosePopup-Button");
    if(closeButton){
      closeButton.click();
    }
    let elementtarget = target;
    let IdTarget = target.getAttribute("id");
    let elementIdentity = elementtarget.getAttribute("data-identity");
    let menu = document.getElementById("menu-controller");
    let HeadTitleChange = document.getElementById("head-menu-title");
    HeadTitleChange.textContent = IdTarget;

  
  switch (elementIdentity) {
    case "Main Container":
        MainContainerLayout(IdTarget);
        MainContainerTab(IdTarget);
        classmode();
      break;
    case "Child Container":
      ChildContainerLayout(IdTarget);
      ChildContainerTab(IdTarget);
      classmode();
      break;
    case "Wrapper":
      ChildContainerLayout(IdTarget);
      ChildContainerTab(IdTarget);
      classmode();
      break;
    case "List":
      ContentLayout(IdTarget);
      ContentTab(IdTarget);
      classmode();
      break;
    case "Image":
      ContentLayout(IdTarget);
      ContentTab(IdTarget);
      classmode();
      break;
      case "Header Text":
        ContentLayout(IdTarget);
        ContentTab(IdTarget);
        classmode();
        break;
      case "Content Text":
        ContentLayout(IdTarget);
        ContentTab(IdTarget);
        classmode();
        break;
      case "Formfield":
        ContentLayout(IdTarget);
        ContentTab(IdTarget);
        classmode();
        break;
      case "Submit":
        ContentLayout(IdTarget);
        ContentTab(IdTarget);
        classmode();
        break;
        case "icon":
          ChildContainerLayout(IdTarget);
          ChildContainerTab(IdTarget);
          classmode();
        break;
        case "HTML":
        case "Table":
        case "Media":
        case "Iframe":
      ContentLayout(IdTarget);
      ContentTab(IdTarget);
      classmode();
      break;
      
    default:
      // Kode yang akan dieksekusi jika elementtarget tidak cocok dengan kasus apa pun
      // console.log("Nilai elementtarget tidak dikenali");
      // Tambahkan kode lain yang ingin dieksekusi
      break;
  }

  //Animasi

gsap.to(maincontroller, { xPercent: -20, duration: 1,});
    gsap.to(menu, {display: "flex", oncomplete: 
    gsap.to(menu, { x: 0, duration: 1,})
}); 

if(state === 'navigator'){
  let closeEditorMenu = document.getElementById("close-menu");
  closeEditorMenu.addEventListener("click",stateNavigator);
}

if(state === 'change-id'){
  const advenceButton = document.getElementById('Advance-Editor');
  setTimeout(() => {
    advenceButton.click();
  }, 50);
}

function stateNavigator(){
  let closeEditorMenu = document.getElementById("close-menu");
  closeEditorMenu.removeEventListener("click",stateNavigator);
  // console.log('state-navigator-active')
  setTimeout(() => {
    let closePopupButton = document.getElementById("ClosePopup-Button");
    closePopupButton.click();
    let navigatorOpenButtonDiv = document.getElementById("open-navigator");
    navigatorOpenButtonDiv.click();
  }, 1);
}

}
export { layoutConstructor };
