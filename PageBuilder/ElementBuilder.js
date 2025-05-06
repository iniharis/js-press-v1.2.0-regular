import { ProjectCSSMainTarget,getrandomNumberHex } from './main.js';
import { tabletResponsiveBreakPoint,mobileResponsiveBreakPoint } from './EditBody.js';
import {data_attribute} from './dataatribut.js'

function propertiesEditor(target){

let CSSTargetfromMain = ProjectCSSMainTarget;
let targetID = target.id;
let targetTagname = target.tagName;
let targetCSS = target.classList[0];
let targetidentity = target.getAttribute('data-identity');
let targetLazy = target.getAttribute("lazyDev");
let targetSelector = "";
if(CSSTargetfromMain == "CSS ID"){
    targetSelector = `#${targetID}`;
} if(CSSTargetfromMain == "LazyDev"){
    targetSelector = `[lazyDev="${targetLazy}"]`;
} if(CSSTargetfromMain == "Main CSS Class"){
    targetSelector = `.${targetCSS}`;
}
 
    //console.log(target.getAttribute("data-display"));
//let anotherClass = target.getAttribute("another-class");
let identities = target.getAttribute("data-identity");
let inputtype = "";
if(identities === "Formfield"){
    inputtype = target.getAttribute("type");
}
//-- ICON ------------//=============================================
let dataIconClass = target.getAttribute("icon-class");
// const oldIcon = document.getElementById(`icon-${targetLazy}`);
const oldIcon = target.querySelector(`[data-icon]`);
if (target.contains(oldIcon) && oldIcon.parentNode === target) {
    if(dataIconClass === ''){
        if(oldIcon){
            oldIcon.remove();
        }
    }
    if(oldIcon){
        oldIcon.remove();
    }
}


if(dataIconClass !== '' && targetidentity !== 'icon'){
    const icon = document.createElement('icon');
    icon.id = `icon-${targetLazy}`;
    icon.setAttribute('class', dataIconClass);
    icon.setAttribute('data-icon', 'true');
    const data_icon_position = target.getAttribute('data-icon-position');
    if(!data_icon_position || data_icon_position !== 'end'){
        const firstElement = target.firstChild;
        icon.setAttribute('style', 'padding-right: 1em;');
        target.insertBefore(icon, firstElement);
    }
    if(data_icon_position && data_icon_position === 'end'){
        icon.setAttribute('style', 'padding-left: 1em;');
        target.appendChild(icon);
    }
}
if(dataIconClass !== '' && targetidentity === 'icon'){
    const mainclass = target.getAttribute('mainclass');
    const targetanotherClass = target.getAttribute("another-class");
    target.setAttribute('class', `${mainclass} ${targetanotherClass} ${dataIconClass}`);
}

//--DATA GROUP-----------//=============================================
let triggerBackgroundAdvance = false;
let datacss_base_val = '';
let datacss_hover_val = '';
let datacss_active_val = '';
let datacss_tablet_val = '';
let datacss_mobile_val = '';
data_attribute_builder();
function data_attribute_builder(){
    data_attribute.forEach(data => {
    if(data.builderProcess === 'standard-one'){
        standard_one_Processor(data)
    }
    if(data.builderProcess === 'blank-one'){
        blank_one_Processor(data)
    }
    if(data.builderProcess === 'standard-two'){
        standard_two_Processor(data)
    }
    if(data.builderProcess === 'three-data-no-cssname-2-attribute-primary'){
        Primary2_Secondary1_process(data)
    }
    if(data.builderProcess === 'standard-two-special-one-check'){
        standard_two_Special1_Check_Processor(data)
    }
    if(data.builderProcess === 'standard-two-check'){
        standard_two_Check_Processor(data)
    }
    if(data.builderProcess === 'primary-two-one-check'){
        two_primary_one_Check_Processor(data)
    }
    if(data.builderProcess === 'data-background-advance'){
        dataBackgroundAdvance(data)
    }
    if(data.builderProcess === 'standard-one-check'){
        standard_one_Check_Processor(data)
    }
    if(data.builderProcess === 'standard-background-opacity-check'){
        standard_background_opacity_check(data)
    }
    if(data.builderProcess === 'parameter-four-check'){
        Parameter_standard_four_check(data)
    }
    if(data.builderProcess === 'box-shadow-check'){
        boxShadow_process(data)
    }
    if(data.builderProcess === 'element-transform-check'){
        element_transform_process(data)
    }
    });
//--------------------------------------//
function element_transform_process(data){
    data.classArr.forEach(element => {
     let dataClass = `-${element}`;
     if(element === '' || element === 'base'){
         dataClass = '';
     }
     
    let dataTransformCheck = target.getAttribute("data-transform-check"+dataClass);
    let dataTransformCheck_Val = "";
    if(dataTransformCheck == "true"){
    let translateX = target.getAttribute("data-transform-translate-x"+dataClass);
    if (translateX == ""){translateX = "0"};
    let translateY = target.getAttribute("data-transform-translate-y"+dataClass);
    if (translateY == ""){translateY = "0"};
    let translateZ = target.getAttribute("data-transform-translate-z"+dataClass);
    let translateZVal = "";
    if (translateZ !== ""){translateZVal = `translateZ(${translateZ}px)`};
    let translate_val = "";
    if(translateX !== "0" || translateY !== "0"|| translateZ !== ""){translate_val = `translateX(${translateX}%) translateY(${translateY}%) ${translateZVal}`};
    //
    let rotateZ = target.getAttribute("data-transform-rotate"+dataClass);
    let rotateZ_Val = "";
    if(rotateZ !== ""){rotateZ_Val = ` rotateZ(${rotateZ}deg)`};
    //
    let rotateY = target.getAttribute("data-transform-rotate-y"+dataClass);
    let rotateY_Val = "";
    if(rotateY !== ""){rotateY_Val = ` rotateY(${rotateY}deg)`};
    //
    let rotateX = target.getAttribute("data-transform-rotate-x"+dataClass);
    let rotateX_Val = "";
    if(rotateX !== ""){rotateX_Val = ` rotateX(${rotateX}deg)`};
    //
    let rotate_Val = "";
    if(rotateZ_Val !== "" || rotateY_Val !== "" || rotateX_Val !== ""){rotate_Val = rotateX_Val + rotateY_Val + rotateZ_Val};
    //====
    let scaleX = target.getAttribute("data-transform-scale-x"+dataClass);
    let scaleXVal ="";
    if (scaleX !== ""){scaleXVal = " scaleX(" + (scaleX/100) + ")"};
    let scaleY = target.getAttribute("data-transform-scale-y"+dataClass);
    let scaleYVal ="";
    if (scaleY !== ""){scaleYVal = " scaleY(" + (scaleY/100) + ")"};
    let scaleZ = target.getAttribute("data-transform-scale-z"+dataClass);
    let scaleZVal ="";
    if (scaleZ !== ""){scaleZVal = " scaleZ(" + (scaleZ/100) + ")"};
    let scale_Val = scaleXVal + scaleYVal + scaleZVal;
    //====
    let skewx = target.getAttribute("data-transform-skew-x"+dataClass);
    if (skewx == ""){skewx = "0"};
    let skewy = target.getAttribute("data-transform-skew-y"+dataClass);
    if (skewy == ""){skewy = "0"};
    let skewVal = "";
    if(skewx !== "0" || skewy !== "0"){skewVal = `skew(${skewx}deg, ${skewy}deg)`};
    let Matrix = target.getAttribute("data-transform-matrix"+dataClass);
    let Matrix_Val = "";
    if(Matrix !== ""){Matrix_Val = `matrix(${Matrix})`};
    let perspectiveX = target.getAttribute("data-transform-perspective-x"+dataClass);
    let perspectiveX_Val = "50";
    if(perspectiveX !== ""){perspectiveX_Val = perspectiveX};
    //--
    let perspectiveY = target.getAttribute("data-transform-perspective-y"+dataClass);
    let perspectiveY_Val = "50";
    if(perspectiveY !== ""){perspectiveY_Val = perspectiveY};
    let perspectiveOrigin = "";
    if(perspectiveX_Val !== "50" || perspectiveY_Val !== "50")
    {perspectiveOrigin = `\n perspective-origin: ${perspectiveX_Val}% ${perspectiveY_Val}%;`}
    let perspective = target.getAttribute("data-transform-perspective"+dataClass);
    let perspective_Val = "";
    if(perspective !== ""){perspective_Val = `\n perspective: ${perspective}px;`}
    dataTransformCheck_Val =
`\n transform: ${translate_val}${rotate_Val}${scale_Val}${skewVal}${Matrix_Val};${perspective_Val}${perspectiveOrigin}`;
    }
    let addedVal = dataTransformCheck_Val
     cssValAdder(addedVal,element);
    });
 }
//--------------------------------------//
function Parameter_standard_four_check(data){
    data.classArr.forEach(element => {
        let dataClass = `-${element}`;
        if(element === '' || element === 'base'){
            dataClass = '';
        }
        let data_attribute1 = data.data_attribute[0];
        let value1 = data.baseval[0];
        let targetAttribute1 = target.getAttribute(data_attribute1+dataClass);
        if (targetAttribute1 !== ""){value1 = targetAttribute1;};

        let data_attribute2 = data.data_attribute[1];
        let value2 = data.baseval[1];
        let targetAttribute2 = target.getAttribute(data_attribute2+dataClass);
        if (targetAttribute2 !== ""){value2 = targetAttribute2;};

        let data_attribute3 = data.data_attribute[2];
        let value3 = data.baseval[2];
        let targetAttribute3 = target.getAttribute(data_attribute3+dataClass);
        if (targetAttribute3 !== ""){value3 = targetAttribute3;};

        let data_attribute4 = data.data_attribute[3];
        let value4 = data.baseval[3];
        let targetAttribute4 = target.getAttribute(data_attribute4+dataClass);
        if (targetAttribute4 !== ""){value4 = targetAttribute4;};

        let data_attribute5 = data.data_attribute[4];
        let value5 = data.baseval[4];
        let targetAttribute5 = target.getAttribute(data_attribute5+dataClass);
        if (targetAttribute5 !== ""){value5 = targetAttribute5;};
//---------------------------------------------------------------------//
        let data_check = data.data_attribute[5];
        let valuecheck = data.baseval[5];
        let dataClasscheck = `-${element}`;
        if(element === '' || element === 'base'){
            dataClasscheck = '';
        }
        if(data.oneClassCheck === true){dataClasscheck = ''};
        let checkAttribute = target.getAttribute(data_check+dataClasscheck);
        if (checkAttribute !== ""){valuecheck = checkAttribute};
    
        let cssname = data.cssname;
        let cssSpecial = '';
        if(data.css_special){
            cssSpecial = data.css_special;
        }
     let addedVal = '';
     if(valuecheck === 'true'){
        addedVal = `\n ${cssname}: ${value2}${value1} ${value3}${value1} ${value4}${value1} ${value5}${value1} ;`;
     }
     cssValAdder(addedVal,element);
    });
}
//--------------------------------------//
function boxShadow_process(data){
    data.classArr.forEach(element => {
     let dataClass = `-${element}`;
     if(element === '' || element === 'base'){
         dataClass = '';
     }
     let dataBoxShadowCheck = target.getAttribute("data-box-shadow-check"+dataClass);
let boxShadow_Val = "";
if(dataBoxShadowCheck == "true"){
let dataBoxShadowHorizontal = 0 + target.getAttribute("data-box-shadow-horizontal"+dataClass)/50;
let dataBoxShadowVertical = 0 + target.getAttribute("data-box-shadow-vertical"+dataClass)/50;
let dataBoxShadowBlur = 0 + target.getAttribute("data-box-shadow-blur"+dataClass)/50;
let dataBoxShadowSpread = 0 + target.getAttribute("data-box-shadow-spread"+dataClass)/50;
let dataBoxShadowColor = target.getAttribute("data-box-shadow-color"+dataClass);
if(dataBoxShadowColor == ""){
    dataBoxShadowColor = "#2b2b2b";
}
let dataBoxShadowOpacity = target.getAttribute("data-box-shadow-opacity"+dataClass);
if(dataBoxShadowOpacity == ""){
    dataBoxShadowOpacity = "0.5";
}
let backgroundcolorValue = "rgba(" +
        parseInt(dataBoxShadowColor.slice(1, 3), 16) + ", " +
        parseInt(dataBoxShadowColor.slice(3, 5), 16) + ", " +
        parseInt(dataBoxShadowColor.slice(5, 7), 16) + ", " +
        dataBoxShadowOpacity + ")";
let dataBoxShadowSet = target.getAttribute("data-box-shadow-set"+dataClass);
if(dataBoxShadowSet !=="inset"){
    dataBoxShadowSet = "";
}
boxShadow_Val = `\n box-shadow: ${dataBoxShadowSet} ${dataBoxShadowHorizontal}em ${dataBoxShadowVertical}em ${dataBoxShadowBlur}em ${dataBoxShadowSpread}em ${backgroundcolorValue};`;
cssValAdder(boxShadow_Val,element);
}
    });
 }
//--------------------------------------//
function Primary2_Secondary1_process(data){
    data.classArr.forEach(element => {
        let dataClass1 = `-${element}`;
        if(element === '' || element === 'base'){
            dataClass1 = '';
        }
        let data_attribute1 = data.data_attribute[0];
        let value1 = data.baseval[0];
        let targetAttribute1 = target.getAttribute(data_attribute1+dataClass1);
        if (targetAttribute1 !== ""){value1 = targetAttribute1;};
    
        let dataClass2 = `-${element}`;
        if(element === '' || element === 'base'){
            dataClass2 = '';
        }
        let data_attribute2 = data.data_attribute[1];
        let value2 = data.baseval[1];
        let targetAttribute2 = target.getAttribute(data_attribute2+dataClass2);
        if (targetAttribute2 !== ""){value2 = targetAttribute2;};
    
        let dataClass3 = `-${element}`;
        if(element === '' || element === 'base'){
            dataClass3 = '';
        }
        let data_attribute3 = data.data_attribute[2];
        let value3 = data.baseval[2];
        let targetAttribute3 = target.getAttribute(data_attribute3+dataClass3);
        if (targetAttribute3 !== ""){value3 = targetAttribute3;};

        let addedVal = '';
        if(value1 !== "" && value1 !== ""){
        addedVal = `\n ${value1}: ${value2}${value3};`;}
        cssValAdder(addedVal,element);
       });
}
//--------------------------------------//        
function standard_one_Processor(data){
   data.classArr.forEach(element => {
    let dataClass1 = `-${element}`;
    if(element === '' || element === 'base'){
        dataClass1 = '';
    }
    let data_attribute1 = data.data_attribute[0];
    let value1 = data.baseval[0];
    let targetAttribute1 = target.getAttribute(data_attribute1+dataClass1);
   if (targetAttribute1 !== ""){value1 = targetAttribute1;};

   let cssname = data.cssname;

   let css_special = '';
   if(data.css_special){
    css_special = `${data.css_special}`
   }

   let css_before = '';
   if(data.css_before){
    css_before = `${data.css_before}`
   }

   let css_after = '';
   if(data.css_after){
    css_after = `${data.css_after}`
   }

    let addedVal = '';
    if(value1 !== ''){
        addedVal = `\n ${cssname}: ${css_before}${value1}${css_after}${css_special};`;
    }
     if(data.name === 'data-font-color' && value1 !== '' && targetidentity === 'Formfield'){
        // console.log(targetidentity)
        addedVal = `\n ${cssname}: ${css_before}${value1}${css_after}${css_special} !important;`;
    }
    cssValAdder(addedVal,element);
   });
}
//--------------------------------------//
function standard_one_Check_Processor(data){
    data.classArr.forEach(element => {
        let dataClass1 = `-${element}`;
        if(element === '' || element === 'base'){
            dataClass1 = '';
        }
        let data_attribute1 = data.data_attribute[0];
        let value1 = data.baseval[0];
        let targetAttribute1 = target.getAttribute(data_attribute1+dataClass1);
        if (targetAttribute1 !== ""){value1 = targetAttribute1;};

        let data_check = data.data_attribute[1];
        let valuecheck = data.baseval[1];
        let dataClasscheck = `-${element}`;
        if(element === '' || element === 'base'){
            dataClasscheck = '';
        }
        if(data.oneClassCheck){dataClasscheck = ''};
        let checkAttribute = target.getAttribute(data_check+dataClasscheck);
        if (checkAttribute !== ""){valuecheck = checkAttribute};
    
        let cssname = data.cssname;
        let cssSpecial = '';
        if(data.css_special){
            cssSpecial = data.css_special;
        }

     let addedVal = '';
     if(valuecheck === 'true'){
        if(value1 !== ''){
            addedVal = `\n ${cssname}: ${value1}${cssSpecial};`;
        }
     }
     cssValAdder(addedVal,element);
    });
 }
 function standard_background_opacity_check(data){
    data.classArr.forEach(element => {
        let dataClass = `-${element}`;
        if(element === '' || element === 'base'){
            dataClass = '';
        }
        let data_attribute1 = data.data_attribute[0];
        let color = data.baseval[0];
        let targetAttribute1 = target.getAttribute(data_attribute1+dataClass);
        if (targetAttribute1 !== ""){color = targetAttribute1;};
        let data_attribute2 = data.data_attribute[1];
        let opacity = data.baseval[1];
        let targetAttribute2 = target.getAttribute(data_attribute2+dataClass);
        if (targetAttribute2 !== ""){opacity = targetAttribute2;};

        if(color === '' && opacity === ''){
            return
        }

        let colorResult = "rgba(" +
                parseInt(color.slice(1, 3), 16) + ", " +
                parseInt(color.slice(3, 5), 16) + ", " +
                parseInt(color.slice(5, 7), 16) + ", " +
                opacity + ")";
        let cssname = data.cssname;
        let cssPropertiesColorResult = `\n ${cssname}: ${colorResult};`;

        let data_check = data.data_attribute[2];
        let value3 = data.baseval[2];
        let dataClasscheck = data_check+dataClass;
        if(data.oneClassCheck){dataClasscheck = data_check};
        let targetAttribute3 = target.getAttribute(dataClasscheck);
        if (targetAttribute3 !== ""){value3 = targetAttribute3;};

        let addedVal = '';
        if(value3 === 'true'){
            addedVal = cssPropertiesColorResult;
        }

     cssValAdder(addedVal,element);
    });
    }
//--------------------------------------//        
function blank_one_Processor(data){
    data.classArr.forEach(element => {
     let dataClass1 = `-${element}`;
     if(element === '' || element === 'base'){
         dataClass1 = '';
     }

     let data_attribute1 = data.data_attribute[0];
     let value1 = data.baseval[0];
     let targetAttribute1 = target.getAttribute(data_attribute1+dataClass1);
    if (targetAttribute1 !== ""){value1 = targetAttribute1;};

     let addedVal = '';
     if(value1 !== ''){
         addedVal = `\n ${value1};`;
     }
     cssValAdder(addedVal,element);
    });
 }
//--------------------------------------//
function standard_two_Check_Processor(data){
    data.classArr.forEach(element => {
        let dataClass1 = `-${element}`;
        if(element === '' || element === 'base'){
            dataClass1 = '';
        }
        let data_attribute1 = data.data_attribute[0];
        let value1 = data.baseval[0];
        let targetAttribute1 = target.getAttribute(data_attribute1+dataClass1);
        if (targetAttribute1 !== ""){value1 = targetAttribute1;};
    
        let dataClass2 = `-${element}`;
        if(element === '' || element === 'base'){
            dataClass2 = '';
        }
        let data_attribute2 = data.data_attribute[1];
        let value2 = data.baseval[1];
        let targetAttribute2 = target.getAttribute(data_attribute2+dataClass2);
        if (targetAttribute2 !== ""){value2 = targetAttribute2;};

        let data_check = data.data_attribute[2];
        let value3 = data.baseval[2];
        let dataClass3 = `-${element}`;
        if(element === '' || element === 'base'){
            dataClass3 = '';
        }
        let targetAttribute3 = target.getAttribute(data_check+dataClass3);
        if (targetAttribute3 !== ""){value3 = targetAttribute3;};
    
        let cssname = data.cssname;

     let addedVal = '';
     if(value3 === 'true'){
        if(value1 !== ''){
            addedVal = `\n ${cssname}: ${value1}${value2};`;
        }
     }
     cssValAdder(addedVal,element);
    });
 }
//--------------------------------------//
function two_primary_one_Check_Processor(data){
    data.classArr.forEach(element => {
        let dataClass1 = `-${element}`;
        if(element === '' || element === 'base'){
            dataClass1 = '';
        }
        let data_attribute1 = data.data_attribute[0];
        let value1 = data.baseval[0];
        let targetAttribute1 = target.getAttribute(data_attribute1+dataClass1);
        if (targetAttribute1 !== ""){value1 = targetAttribute1;};
    
        let dataClass2 = `-${element}`;
        if(element === '' || element === 'base'){
            dataClass2 = '';
        }
        let data_attribute2 = data.data_attribute[1];
        let value2 = data.baseval[1];
        let targetAttribute2 = target.getAttribute(data_attribute2+dataClass2);
        if (targetAttribute2 !== ""){value2 = targetAttribute2;};

        let data_check = data.data_attribute[2];
        let value3 = data.baseval[2];
        let targetAttribute3 = target.getAttribute(data_check);
        if (targetAttribute3 !== ""){value3 = targetAttribute3;};
    
        let cssname = data.cssname;

     let addedVal = '';
     if(value3 === 'true'){
        if(value1 !== '' && value2 !== ''){
            addedVal = `\n ${cssname}: ${value1}${value2};`;
        }
     }
     cssValAdder(addedVal,element);
    });
 }
//--------------------------------------//
function standard_two_Special1_Check_Processor(data){
    data.classArr.forEach(element => {
        let dataClass1 = `-${element}`;
        if(element === '' || element === 'base'){
            dataClass1 = '';
        }
        let data_attribute1 = data.data_attribute[0];
        let value1 = data.baseval[0];
        let targetAttribute1 = target.getAttribute(data_attribute1+dataClass1);
        if (targetAttribute1 !== ""){value1 = targetAttribute1;};
    
        let data_attribute2 = data.data_attribute[1];
        let value2 = data.baseval[1];
        let targetAttribute2 = target.getAttribute(data_attribute2);
        if (targetAttribute2 !== ""){value2 = targetAttribute2;};
    
        let cssname = data.cssname;
        let css_special = data.css_special;

     let addedVal = '';
     if(value1 !== ''){
         addedVal = `\n ${cssname}: ${value1};`;
         if(target.tagName == "TEXTAREA"){
            addedVal = `\n ${cssname}: ${value1} ${css_special};`;
        }
    if(value2 === 'true'){
        addedVal = ``;
    }
     }
     cssValAdder(addedVal,element);
    });
 }
//--------------------------------------//
 function dataBackgroundAdvance(data){
    if(triggerBackgroundAdvance){
        return
    }
    data.classArr.forEach(element => {
    let dataClass = `-${element}`;
    if(element === '' || element === 'base'){
        dataClass = '';
    }
    let dataBackgroundimage = target.getAttribute("data-background-image"+dataClass);
    let dataBackgroundimage_Val = "";
    if (dataBackgroundimage !== "") {
        
        dataBackgroundimage_Val = `\n background: url('${dataBackgroundimage}');`;
    
    }
    //=============================
    let databackgroundimageSize = target.getAttribute("data-background-image-size"+dataClass);
    let databackgroundimageSize_Val = "";
    if (databackgroundimageSize !== "") {
        databackgroundimageSize_Val = `\n background-size: ${databackgroundimageSize};`;
    
    }
    
    let databackgroundimagePositionX = target.getAttribute("data-background-image-position-x"+dataClass);
    if(databackgroundimagePositionX == ""){databackgroundimagePositionX="0"}
    let databackgroundimagePositionY = target.getAttribute("data-background-image-position-y"+dataClass);
    if(databackgroundimagePositionY == ""){databackgroundimagePositionY="0"}
    let databackgroundimagePosition_Val = "";
    if (databackgroundimageSize !== "") {
        databackgroundimagePosition_Val = `\n background-position: ${databackgroundimagePositionX}% ${databackgroundimagePositionY}%;`;
    
    }
    let databackgroundimageRepeat = target.getAttribute("data-background-image-repeat"+dataClass);
    let databackgroundimageRepeat_Val = "";
    if(databackgroundimageRepeat !== ""){
        databackgroundimageRepeat_Val = `\n background-repeat: ${databackgroundimageRepeat};`;
    }
    
    let gradient1 = target.getAttribute("data-background-gradient-result-1"+dataClass);
    let gradient1_Val = gradient1;
    let location1 = target.getAttribute("data-background-gradient-location-1"+dataClass);
    let location1_Val = location1;
    let gradient2 = target.getAttribute("data-background-gradient-result-2"+dataClass);
    let gradient2_Val = gradient2;
    let location2 = target.getAttribute("data-background-gradient-location-2"+dataClass);
    let location2_Val = location2;
    let gradientType = target.getAttribute("data-background-gradient-type"+dataClass);
    let gradientType_Val = gradientType;
    let gradientAngle = target.getAttribute("data-background-gradient-angle"+dataClass);
    let gradientAngle_Val = gradientAngle;
    let gradient_Val ="";
    if (gradient1 !== "" && gradient2 !== "" && gradientAngle !== ""){
        dataBackgroundimage_Val = ` url('${dataBackgroundimage}');`;
        let copyimage = dataBackgroundimage_Val;
        dataBackgroundimage_Val = "";
        gradient_Val = 
    `\n background-image: ${gradientType_Val}(${gradientAngle_Val}deg, ${gradient1_Val} ${location1_Val}%, ${gradient2_Val} ${location2_Val}%), ${copyimage};`;
    }
    let backgroundImage_Val =  dataBackgroundimage_Val + gradient_Val + databackgroundimageSize_Val + databackgroundimagePosition_Val + databackgroundimageRepeat_Val;
    const dataBackgroundNone = target.getAttribute('data-background-none');
    if(dataBackgroundNone === 'true'){backgroundImage_Val = ''};
    cssValAdder(backgroundImage_Val,element);
    });
    triggerBackgroundAdvance = true;
}
//--------------------------------------//
function standard_two_Processor(data){
   data.classArr.forEach(element => {
    let dataClass1 = `-${element}`;
    if(element === '' || element === 'base'){
        dataClass1 = '';
    }
    let data_attribute1 = data.data_attribute[0];
    let value1 = data.baseval[0];
    let targetAttribute1 = target.getAttribute(data_attribute1+dataClass1);
    if (targetAttribute1 !== ""){value1 = targetAttribute1;};
 
    let dataClass2 = `-${element}`;
    if(element === '' || element === 'base'){
        dataClass2 = '';
    }
    let data_attribute2 = data.data_attribute[1];
    let value2 = data.baseval[1];
    let targetAttribute2 = target.getAttribute(data_attribute2+dataClass2);
    if (targetAttribute2 !== ""){value2 = targetAttribute2;};
 
    let cssname = data.cssname;

    let cssSpecial = '';
    if(data.css_special){
        cssSpecial = data.css_special;
    }
    if(targetidentity === 'icon'){
        cssSpecial = ' !important';
    }
    if(target.tagName === 'TEXTAREA'){
        cssSpecial = ' !important';
    }


    let cssadditional = '';
    if(data.css_additional){
        cssadditional = data.css_additional;
    }

    let addedVal = '';
    if(value1 !== ''){
        addedVal = `\n ${cssname}: ${value1}${cssadditional}${value2}${cssadditional}${cssSpecial};`;
    }
    if(data.targetAttribute_oriented){
        addedVal = '';
        if(targetAttribute1 !== '' || targetAttribute2 !== ''){
            addedVal = `\n ${cssname}: ${value1}${cssadditional}${value2}${cssadditional}${cssSpecial};`;
        }
    }
    cssValAdder(addedVal,element);
   });
}
//--------------------------------------//
function cssValAdder(value,elementClass){
if(elementClass === 'base' || elementClass === ''){
    datacss_base_val += value;
}
if(elementClass === 'hover'){
    datacss_hover_val += value;
}
if(elementClass === 'active'){
    datacss_active_val += value;
}
if(elementClass === 'tablet'){
    datacss_tablet_val += value;
}
if(elementClass === 'mobile'){
    datacss_mobile_val  += value;
}
}
//--------------------------------------//
}

//--DATA GROUP END-----------//=============================================

//--DESKTOP-----------//=============================================
//======================

let dataBackgroundColorResult = target.getAttribute("data-background-color-result");
let dataBackgroundColorResult_Val_for_range = "";
if (dataBackgroundColorResult !== "") {
    dataBackgroundColorResult_Val_for_range = `\n background-color: ${dataBackgroundColorResult};`;
    if(target.tagName == "TEXTAREA"){
        dataBackgroundColorResult_Val_for_range = `\n background-color: ${dataBackgroundColorResult} !important;`;
    }
}

//=== Base //=========== 
// //======================================
let dataBorderRadiusCheck = target.getAttribute("data-border-radius-check");
let dataBorderRadiusCheck_Val = "";
if(dataBorderRadiusCheck == "true"){
    dataBorderRadiusCheck_Val = dataBorderRadiusCheck;
}
let dataBorderRadiusParameter = target.getAttribute("data-border-radius-parameter");
let dataBorderRadiusParameter_val = "";
if(dataBorderRadiusParameter !==""){
    dataBorderRadiusParameter_val = dataBorderRadiusParameter;
}
let dataBorderTopRight_val = "0";
let dataBorderBottomRight_val = "0";
let dataBorderTopLeft_val = "0";
let dataBorderBottomLeft_val = "0";
let data_border_Radius_Val = "";
if(targetidentity === '' && target.getAttribute('type') === 'range' && dataBorderRadiusCheck_Val == "true" && dataBorderRadiusParameter_val !== ""){
    let dataBorderRadiusTop = target.getAttribute("data-border-radius-top");
    dataBorderTopRight_val = 0 + dataBorderRadiusTop+dataBorderRadiusParameter_val + " ";
    let dataBorderRadiusRight = target.getAttribute("data-border-radius-right");
    dataBorderBottomRight_val =  0 + dataBorderRadiusRight+dataBorderRadiusParameter_val + " " ;
    let dataBorderRadiusBottom = target.getAttribute("data-border-radius-bottom");
    dataBorderTopLeft_val =  0 + dataBorderRadiusBottom+dataBorderRadiusParameter_val + " " ;
    let dataBorderRadiusLeft = target.getAttribute("data-border-radius-left");
    dataBorderBottomLeft_val =  0 + dataBorderRadiusLeft+dataBorderRadiusParameter_val;
    data_border_Radius_Val = `\n border-radius: ${dataBorderTopRight_val}${dataBorderBottomRight_val}${dataBorderTopLeft_val}${dataBorderBottomLeft_val};`;
}

//======================
//-- CSS FILTER -------//
let cssFilterCheck = target.getAttribute("data-css-filter-check");

let dataCssFilter_Val = basePseudoQueryBuilder("");
let dataCssFilterHover_Val = basePseudoQueryBuilder("-hover");
let dataCssFilterActive_Val = basePseudoQueryBuilder("-active");
let dataCssFilterTablet_Val = basePseudoQueryBuilder("-tablet");
let dataCssFilterMobile_Val = basePseudoQueryBuilder("-mobile");

function basePseudoQueryBuilder(arg){
let sephia = "data-css-filter-Sepia" + arg;
let saturate = "data-css-filter-Saturate" + arg;
let invert = "data-css-filter-Invert" + arg;
let hue = "data-css-filter-hue" + arg;
let greyscale = "data-css-filter-Greyscale" + arg;
let contrast = "data-css-filter-Contrast" + arg;
let bright = "data-css-filter-Brightness" + arg;
let blur = "data-css-filter-blur" + arg;


    let result = css_Filter(blur,bright,contrast,greyscale,hue,invert,saturate,sephia);
    return result
}

function css_Filter(blur,bright,contrast,greyscale,hue,invert,saturate,sephia){
let dataValueFilter = "";

if(cssFilterCheck === "true")
{
let blurData = target.getAttribute(blur);
let blurData_Val = "";

if(blurData !== ""){
    blurData_Val = ` blur(${blurData}px)`;
}

let brightData = target.getAttribute(bright);
let brightData_Val = "";

if(brightData !== ""){
    brightData_Val = ` brightness(${brightData}%)`;
}

let ContrastData = target.getAttribute(contrast);
let ContrastData_Val = "";

if(ContrastData !== ""){
    ContrastData_Val = ` contrast(${ContrastData}%)`;
}

let GreyscaleData = target.getAttribute(greyscale);
let GreyscaleData_Val = "";

if(GreyscaleData !== ""){
    GreyscaleData_Val = ` grayscale(${GreyscaleData}%)`;
}

let HueData = target.getAttribute(hue);
let HueData_Val = "";

if(HueData !== ""){
    HueData_Val = ` hue-rotate(${HueData}deg)`;
}

let InvertData = target.getAttribute(invert);
let InvertData_Val = "";

if(InvertData !== ""){
    InvertData_Val = ` invert(${InvertData}%)`;
}

let SaturateData = target.getAttribute(saturate);
let SaturateData_Val = "";

if(SaturateData !== ""){
    SaturateData_Val = ` saturate(${SaturateData})`;
}

let SepiaData = target.getAttribute(sephia);
let SepiaData_Val = "";

if(SepiaData !== ""){
    SepiaData_Val = ` sepia(${SepiaData})`;
}


if(
SepiaData !== "" ||
SaturateData !== "" ||
InvertData !== "" ||
HueData !== "" ||
GreyscaleData !== "" ||
ContrastData !== "" ||
brightData !== "" ||
blurData !== ""
)
{
    dataValueFilter = `\n filter: ${SepiaData_Val}${SaturateData_Val}${InvertData_Val}${HueData_Val}${GreyscaleData_Val}${ContrastData_Val}${brightData_Val}${blurData_Val};\n -webkit-filter: ${SepiaData_Val}${SaturateData_Val}${InvertData_Val}${HueData_Val}${GreyscaleData_Val}${ContrastData_Val}${brightData_Val}${blurData_Val};`;
}

else {
    dataValueFilter = "";
}

}
else 
{
    dataValueFilter = "";
}
return dataValueFilter;
}

if(cssFilterCheck !== "true"){
dataCssFilter_Val = "";
dataCssFilterHover_Val = "";
dataCssFilterActive_Val = "";
dataCssFilterTablet_Val = "";
dataCssFilterMobile_Val = "";
}
//-- CSS FILTER END -------//

let dataVisibilityCheck = target.getAttribute("data-visibility-check");
let dataVisibilityHideDesktop = target.getAttribute("data-visibility-hide-desktop");
let dataVisibilityHideTablet = target.getAttribute("data-visibility-hide-tablet");
let dataVisibilityHideMobile = target.getAttribute("data-visibility-hide-mobile");
//======================
let dataCustomJS = target.getAttribute("data-custom-js");
let dataJSVal = ``;
if(dataCustomJS !== ""){
    dataJSVal = `${dataCustomJS}`;
}

let dataCustomCSS = target.getAttribute("data-customCode-css");
let dataCustomCSS_Val = ``;
if(dataCustomCSS !== ""){
    dataCustomCSS_Val = dataCustomCSS;
}

let dataJSCombine = dataJSVal;
let dataCssIgnore = target.getAttribute("data-css-ignore");

//=============================
let dataTextShadowChecks = target.getAttribute("data-text-shadow-check");
let dataTextShadow_Val = "";
let dataTextShadowHover_Val = "";
if(dataTextShadowChecks === "true"){
    let dataFontShadow_Horizontal = target.getAttribute("data-text-shadow-horizontal");
    let dataFontShadow_Horizontal_Val = "0";
    if(dataFontShadow_Horizontal !== ""){
        dataFontShadow_Horizontal_Val = dataFontShadow_Horizontal;
    }
    let dataFontShadow_Vertical = target.getAttribute("data-text-shadow-vertical");
    let dataFontShadow_Vertical_Val = "0";
    if(dataFontShadow_Vertical !== ""){
        dataFontShadow_Vertical_Val = dataFontShadow_Vertical;
    }
    let dataFontShadow_Blur = target.getAttribute("data-text-shadow-blur");
    let dataFontShadow_Blur_Val = "0";
    if(dataFontShadow_Blur !== ""){
        dataFontShadow_Blur_Val = dataFontShadow_Blur;
    }
    let dataFontShadow_Color = target.getAttribute("data-text-shadow-color");
    let dataFontShadow_Color_Val = "#000000";
    if(dataFontShadow_Color !== ""){
        dataFontShadow_Color_Val = dataFontShadow_Color;
    }
    let dataFontShadow_Opacity = target.getAttribute("data-text-shadow-opacity");
    let dataFontShadow_Opacity_Val = "0.5";
    if(dataFontShadow_Opacity !== ""){
        dataFontShadow_Opacity_Val = dataFontShadow_Opacity;
    }
    let dataFontShadow_Color_And_Opacity_Val = "";
    if(dataFontShadow_Color_Val !== ""){
        dataFontShadow_Color_And_Opacity_Val = backgroundProcess(dataFontShadow_Color_Val,dataFontShadow_Opacity_Val);
    }
    dataTextShadow_Val = `\n text-shadow: ${dataFontShadow_Horizontal_Val}em ${dataFontShadow_Vertical_Val}em ${dataFontShadow_Blur_Val}em ${dataFontShadow_Color_And_Opacity_Val};`
    //====Hover
    let dataFontShadow_Hover_Horizontal = target.getAttribute("data-text-shadow-horizontal");
    let dataFontShadow_Hover_Horizontal_Val = "0";
    if(dataFontShadow_Hover_Horizontal !== ""){
        dataFontShadow_Hover_Horizontal_Val = dataFontShadow_Hover_Horizontal;
    }
    let dataFontShadow_Hover_Vertical = target.getAttribute("data-text-shadow-vertical");
    let dataFontShadow_Hover_Vertical_Val = "0";
    if(dataFontShadow_Hover_Vertical !== ""){
        dataFontShadow_Hover_Vertical_Val = dataFontShadow_Hover_Vertical;
    }
    let dataFontShadow_Hover_Blur = target.getAttribute("data-text-shadow-blur");
    let dataFontShadow_Hover_Blur_Val = "0";
    if(dataFontShadow_Hover_Blur !== ""){
        dataFontShadow_Hover_Blur_Val = dataFontShadow_Hover_Blur;
    }
    let dataFontShadow_Hover_Color = target.getAttribute("data-text-shadow-color");
    let dataFontShadow_Hover_Color_Val = "#000000";
    if(dataFontShadow_Hover_Color !== ""){
        dataFontShadow_Hover_Color_Val = dataFontShadow_Hover_Color;
    }
    let dataFontShadow_Hover_Opacity = target.getAttribute("data-text-shadow-opacity");
    let dataFontShadow_Hover_Opacity_Val = "0.5";
    if(dataFontShadow_Hover_Opacity !== ""){
        dataFontShadow_Hover_Opacity_Val = dataFontShadow_Hover_Opacity;
    }
    let dataFontShadow_Color_And_Opacity_Hover_Val = "";
    if(dataFontShadow_Hover_Color_Val !== ""){
        dataFontShadow_Color_And_Opacity_Hover_Val = backgroundProcess(dataFontShadow_Hover_Color_Val,dataFontShadow_Hover_Opacity_Val);
    }
    dataTextShadowHover_Val = `\n text-shadow: ${dataFontShadow_Hover_Horizontal_Val}em ${dataFontShadow_Hover_Vertical_Val}em ${dataFontShadow_Hover_Blur_Val}em ${dataFontShadow_Color_And_Opacity_Hover_Val};`


    function backgroundProcess(color,opacity){
        let bgColor = color;
        let bgopacity = opacity;
        let backgroundcolorValue = "rgba(" +
        parseInt(bgColor.slice(1, 3), 16) + ", " +
        parseInt(bgColor.slice(3, 5), 16) + ", " +
        parseInt(bgColor.slice(5, 7), 16) + ", " +
        bgopacity + ")";
        return backgroundcolorValue;
    }
}

let data_apperance = target.getAttribute("range-apperance");
let data_apperance_Val = "";
if (inputtype === "range") {
    data_apperance_Val = `\n -webkit-appearance: ${data_apperance};\n apperance: ${data_apperance};\n background: none;`;
}
let data_thumb_BG_ = "";
let data_thumb_BG_RBG = "";
let data_Radius_Thumb_Val = "";
let data_thumb_OTstyle_Val = "";
let data_thumb_OTcolor_Val = "";
let data_outline_OFfset_Val = "";
let data_OTsize_Val = "";
let data_border_none = "";

if(inputtype === "range"){

let data_OTsize = target.getAttribute("data-bullet-outline-size");
if (data_OTsize !== "") {
data_OTsize_Val = data_OTsize};

    let data_thumb_BG = target.getAttribute("data-bullet-color");

    if (data_thumb_BG !== "") {
    data_thumb_BG_ = data_thumb_BG};
    
    if (data_thumb_BG !== ""){
        data_thumb_BG_RBG = "rgba(" +
        parseInt(data_thumb_BG.slice(1, 3), 16) + ", " +
        parseInt(data_thumb_BG.slice(3, 5), 16) + ", " +
        parseInt(data_thumb_BG.slice(5, 7), 16) + ", " +
        "1" + ")";
    }
    
    
    let data_Radius_Thumb = target.getAttribute("data-bullet-radius");
    
    if (data_Radius_Thumb !== "") {
    data_Radius_Thumb_Val = data_Radius_Thumb};
    
    let data_thumb_OTstyle = target.getAttribute("data-bullet-outline-style");
    
    if (data_thumb_OTstyle !== "") {
    data_thumb_OTstyle_Val = data_thumb_OTstyle};
    
    let data_thumb_OTcolor = target.getAttribute("data-bullet-outline-color");
    
    if (data_thumb_OTcolor !== "") {
    data_thumb_OTcolor_Val = data_thumb_OTcolor};
    
    let data_outline_OFfset = target.getAttribute("data-bullet-outline-offset");
    
    
    if (data_outline_OFfset !== "") {
    data_outline_OFfset_Val = data_outline_OFfset
    };
    
   
    data_border_none = `\n  border: none;`
    
}
//----------------------------------------------------------------------------
//=== Base //=========== 
let Data_TH_Styling = target.getAttribute("data-th-styling");
let Data_TH_Styling_Val = "";
if (Data_TH_Styling !== "") {
Data_TH_Styling_Val = 
`
${targetSelector} th {
${Data_TH_Styling}
}`;


};
//=== Hover //=========== 
 let Data_TH_StylingHover = target.getAttribute("data-th-styling-hover");
let Data_TH_StylingHover_Val = "";
if (Data_TH_StylingHover !== "") {
Data_TH_StylingHover_Val =  
`
${targetSelector}:hover th {
${Data_TH_StylingHover}
}`;
};
//=== Active //=========== 
 let Data_TH_StylingActive = target.getAttribute("data-th-styling-active");
let Data_TH_StylingActive_Val = "";
if (Data_TH_StylingActive !== "") {
Data_TH_StylingActive_Val = 
`
${targetSelector}:active th {
${Data_TH_StylingActive}
   }`;
};
//=== Tablet //=========== 
 let Data_TH_StylingTablet = target.getAttribute("data-th-styling-tablet");
let Data_TH_StylingTablet_Val = "";
if (Data_TH_StylingTablet !== "") {
Data_TH_StylingTablet_Val = 
`
${targetSelector} th {
${Data_TH_StylingTablet}
   }`;
};
//=== Mobile //=========== 
 let Data_TH_StylingMobile = target.getAttribute("data-th-styling-mobile");
let Data_TH_StylingMobile_Val = "";
if (Data_TH_StylingMobile !== "") {
Data_TH_StylingMobile_Val = 
`
${targetSelector} th {
${Data_TH_StylingMobile}
   }`;

};

//----------------------------------------------------------------------------
//=== Base //=========== 
let Data_TR_Styling = target.getAttribute("data-tr-styling");
let Data_TR_Styling_Val = "";
if (Data_TR_Styling !== "") {
Data_TR_Styling_Val = 
`
${targetSelector} tr {
${Data_TR_Styling}
   }`;
};
//=== Hover //=========== 
 let Data_TR_StylingHover = target.getAttribute("data-tr-styling-hover");
let Data_TR_StylingHover_Val = "";
if (Data_TR_StylingHover !== "") {
Data_TR_StylingHover_Val = 
`
${targetSelector}:hover tr {
${Data_TR_StylingHover}
   }`;

};
//=== Active //=========== 
 let Data_TR_StylingActive = target.getAttribute("data-tr-styling-active");
let Data_TR_StylingActive_Val = "";
if (Data_TR_StylingActive !== "") {
Data_TR_StylingActive_Val = 
`
${targetSelector}:active tr {
${Data_TR_StylingActive}
   }`;

};
//=== Tablet //=========== 
 let Data_TR_StylingTablet = target.getAttribute("data-tr-styling-tablet");
let Data_TR_StylingTablet_Val = "";
if (Data_TR_StylingTablet !== "") {
Data_TR_StylingTablet_Val = 
`
${targetSelector} tr {
${Data_TR_StylingTablet}
   }`;
};
//=== Mobile //=========== 
 let Data_TR_StylingMobile = target.getAttribute("data-tr-styling-mobile");
let Data_TR_StylingMobile_Val = "";
if (Data_TR_StylingMobile !== "") {
Data_TR_StylingMobile_Val = 
`
${targetSelector} tr {
${Data_TR_StylingMobile}
   }`;

};

//----------------------------------------------------------------------------
//=== Base //=========== 
let Data_TD_Styling = target.getAttribute("data-td-styling");
let Data_TD_Styling_Val = "";
if (Data_TD_Styling !== "") {
Data_TD_Styling_Val = 
`
${targetSelector} td {
${Data_TD_Styling}
   }`;

};
//=== Hover //=========== 
 let Data_TD_StylingHover = target.getAttribute("data-td-styling-hover");
let Data_TD_StylingHover_Val = "";
if (Data_TD_StylingHover !== "") {
Data_TD_StylingHover_Val = 
`
${targetSelector}:hover td {
${Data_TD_StylingHover}
   }`;
};
//=== Active //=========== 
 let Data_TD_StylingActive = target.getAttribute("data-td-styling-active");
let Data_TD_StylingActive_Val = "";
if (Data_TD_StylingActive !== "") {
Data_TD_StylingActive_Val = 
`
${targetSelector}:active td {
${Data_TD_StylingActive}
   }`;
};
//=== Tablet //=========== 
 let Data_TD_StylingTablet = target.getAttribute("data-td-styling-tablet");
let Data_TD_StylingTablet_Val = "";
if (Data_TD_StylingTablet !== "") {
Data_TD_StylingTablet_Val = 
`
${targetSelector} td {
${Data_TD_StylingTablet}
   }`;
};
//=== Mobile //=========== 
 let Data_TD_StylingMobile = target.getAttribute("data-td-styling-mobile");
let Data_TD_StylingMobile_Val = "";
if (Data_TD_StylingMobile !== "") {
Data_TD_StylingMobile_Val = 
`
${targetSelector} td {
${Data_TD_StylingMobile}
   }`;
};

let dataTablebase = 
Data_TH_Styling_Val +
Data_TR_Styling_Val +
Data_TD_Styling_Val;

let dataTableHover = 
Data_TH_StylingHover_Val +
Data_TR_StylingHover_Val +
Data_TD_StylingHover_Val;

let dataTableActive = 
Data_TH_StylingActive_Val +
Data_TR_StylingActive_Val +
Data_TD_StylingActive_Val;

let dataTableTablet =
Data_TH_StylingTablet_Val +
Data_TR_StylingTablet_Val +
Data_TD_StylingTablet_Val;

let dataTableMobile = 
Data_TH_StylingMobile_Val +
Data_TR_StylingMobile_Val +
Data_TD_StylingMobile_Val;



let dataextendedCSS = "" + dataTablebase;
let dataextendedCSSHover = "" + dataTableHover;
let dataextendedCSSActive = "" + dataTableActive;
let dataextendedCSSTablet = "" + dataTableTablet;
let dataextendedCSSMobile = "" + dataTableMobile;

//----------------------------------------------------------------------------
//== DATA CSS //==========================================//
let dataCSS =
datacss_base_val + 
data_apperance_Val +
data_border_none + 
dataTextShadow_Val +
dataCssFilter_Val;

//=== Hover //===========
let dataCSSHover =
datacss_hover_val  +
dataTextShadowHover_Val +
dataCssFilterHover_Val;
//=== Active //===========
let dataCSSActive =
datacss_active_val   +
dataCssFilterActive_Val;
//=== Tablet //===========
let dataCSSTablet =
datacss_tablet_val    +
dataCssFilterTablet_Val;
//=== Mobile //===========
let dataCSSMobile =
datacss_mobile_val     +
dataCssFilterMobile_Val;
//==============================


//-------- range start
let data_range_Val = `

${targetSelector}::-webkit-slider-runnable-track {
    background-color: ${dataBackgroundColorResult_Val_for_range};
    border-radius: ${data_border_Radius_Val};
  }

  ${targetSelector}::-webkit-slider-thumb {
    ${data_apperance_Val}
    width: 1rem;
    height: 1rem;
    background: ${data_thumb_BG_};
    border-radius: ${data_Radius_Thumb_Val}%;
    cursor: pointer;
  }

  ${targetSelector}::-moz-range-thumb {
    width: 2rem;
    height: 2rem;
    background: ${data_thumb_BG_RBG};
    border-radius: ${data_Radius_Thumb_Val}%;
    cursor: pointer;
  }

  ${targetSelector}:active::-webkit-slider-thumb {
    outline: ${data_OTsize_Val}rem ${data_thumb_OTstyle_Val} ${data_thumb_OTcolor_Val};
    outline-offset: ${data_outline_OFfset_Val}rem;
  }

  ${targetSelector}:active::-webkit-slider-thumb {
    outline: ${data_OTsize_Val}rem ${data_thumb_OTstyle_Val} ${data_thumb_OTcolor_Val};
    outline-offset: ${data_outline_OFfset_Val}rem;
  }
`
let data_Range_CSS = "";
if(inputtype === "range"){

   let data_Range_CSS_Set = target.setAttribute("data-rangecss",data_range_Val);
   data_Range_CSS = target.getAttribute("data-rangecss");
   let elementRangeCSSs = document.getElementById("data_Range_textAreainput");
   if(elementRangeCSSs){
    elementRangeCSSs.value = data_Range_CSS;
   }
   
}


//---------Range end
//-----------------------------------------------------
let targetStyleTag = document.getElementById("styleid"+targetLazy);
targetStyleTag.innerHTML = "";
let targetcustomScriptTag = document.getElementById("scriptid"+targetLazy);
let functionName = getrandomNumberHex();
JSEditor(target,targetcustomScriptTag,dataJSCombine,functionName);
let dataCSSVal = "";

if(dataCSS !==""){
dataCSSVal = `
${targetSelector} {
${dataCSS}
}
${data_Range_CSS}
${dataextendedCSS}
`;}

if (dataCssIgnore == "true"){
    dataCSSVal = "";
}
// Hover //============
let dataCSSHoverVal = "";

if(dataCSSHover !==""){
dataCSSHoverVal = `
${targetSelector}:hover {
${dataCSSHover}
}
${dataextendedCSSHover}
`
;}

if (dataCssIgnore == "true"){
    dataCSSHoverVal = "";
}
// Active //===========
let dataCSSActiveVal = ``;

if(dataCSSActive !==""){
    dataCSSActiveVal = `
${targetSelector}:active {
${dataCSSActive}
}
${dataextendedCSSActive}
`;}

if (dataCssIgnore == "true"){
    dataCSSActive = "";
}
// Tablet //===========
let dataCSSTabletVal = "";

if(dataCSSTablet !==""){
    dataCSSTabletVal = `
@media screen and (max-width: ${tabletResponsiveBreakPoint}px) {
${targetSelector} {
${dataCSSTablet}
}
${dataextendedCSSTablet}
}`
};

if (dataCssIgnore == "true"){
    dataCSSTabletVal = "";
}
// Mobile //===========
let dataCSSMobileVal = "";

if(dataCSSMobile !==""){
    dataCSSMobileVal = `
@media screen and (max-width: ${mobileResponsiveBreakPoint}px) {
${targetSelector} {
${dataCSSMobile}
}
${dataextendedCSSMobile}
}`;
}

if (dataCssIgnore == "true"){
    dataCSSMobileVal = "";
}

targetStyleTag.innerHTML = 
dataCSSVal+
dataCSSHoverVal+
dataCSSActiveVal+
dataCSSTabletVal+
dataCSSMobileVal+
dataCustomCSS_Val;

}
//=================================================

    






export { propertiesEditor };
let newNumber = 1;
function JSEditor(target,jstag,datajs,numberid){
let oldjsFuncName = target.getAttribute("data-js-func");
if(oldjsFuncName){jstag.textContent = `delete window.${oldjsFuncName};`;}
target.setAttribute("data-js-func", "");
let gsap = target.getAttribute("data-gsap");
let jsCode = gsap + datajs;
let jsID = jstag.id;
let jsclone = document.createElement("script");
jsclone.id = jsID;
jsclone.textContent = `
function ${numberid}(){
    //--Start--//
    ${jsCode}
    //--End--//
};
${numberid}();
`;
jstag.parentNode.insertBefore(jsclone, jstag.nextSibling);
jstag.remove();
newNumber ++;
// console.log(jsclone);
target.setAttribute("data-js-func", numberid);
// return
}

export {JSEditor};