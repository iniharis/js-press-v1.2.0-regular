import { LazydevDataList } from './main.js';
import { CSSIdCheckAndPush } from './main.js';
import { CSSMainClassCheckAndPush } from './main.js';
import { editSelector } from './selector.js';
import { selectorDesutructor } from './selector.js';
import { ProjectCSSMainTarget } from './main.js';
import { propertiesEditor } from './ElementBuilder.js';


function duplicateSelectorOptin(target,dataFrom) {
 // let parentTarget = target.parentElement;
  let elementTarget = target;
  let targetLazy = elementTarget.getAttribute("lazyDev");
  let scriptTarget = document.getElementById("scriptid"+targetLazy);
  let identity = elementTarget.getAttribute('data-identity');
  switch (identity) {
    case `Main Container`:
    case `Child Container`:
    case `Wrapper`:
  let elattr = elementTarget.attributes;
  let elHTML = elementTarget.innerHTML;
  let elTag = elementTarget.tagName;
  let clonedElement = document.createElement(elTag);
  for (var i = 0; i < elattr.length; i++) {
    var atribut = elattr[i];
    clonedElement.setAttribute(atribut.name, atribut.value);
  }
  clonedElement.innerHTML = elHTML;
  elementTarget.parentNode.insertBefore(clonedElement, elementTarget.nextSibling);
  let newelQuery = clonedElement.querySelectorAll('[lazyDev]');
  let lazyDevIds = [];

  for (var i = 0; i < newelQuery.length; i++) {
  var elemen = newelQuery[i];
  var tagName = elemen.tagName.toLowerCase();
  
  if (tagName !== 'style' && tagName !== 'script') {
    lazyDevIds.push(elemen.getAttribute("lazyDev"));
  }
}

lazyDevIds.push(clonedElement.getAttribute("lazyDev"));

lazyDevIds.forEach(element => {
  let lazyID = document.querySelectorAll(`[lazyDev="${element}"]`);
  let clonedTarget = lazyID[1];

  // Generate unique ID and class
    let LazyDevOperation = LazydevDataList();
    let UniqueNumber = LazyDevOperation;
    let UniqueElementID = CSSIdCheckAndPush(`lazyid-${UniqueNumber}`);
    let UniqueClass = CSSMainClassCheckAndPush(`lazyclass-${UniqueNumber}`);

    //   // Update ID and class of the cloned element
  clonedTarget.setAttribute("id", UniqueElementID);
  clonedTarget.setAttribute("lazyDev", UniqueNumber);
  clonedTarget.setAttribute("Mainclass", UniqueClass);
  SetClassDuplicate(clonedTarget);
  clonedTarget.classList.add('hoverTargetContainer');
  setTimeout(() => {
    clonedTarget.classList.remove('hoverTargetContainer');
  }, 400);

  let styleElement = document.querySelectorAll(`#styleid${element}`);
  let clonedStyle = styleElement[1];
  clonedStyle.id = "styleid"+UniqueNumber;
  let scriptElement = document.querySelectorAll(`#scriptid${element}`);
  let clonedScript = scriptElement[1];
  clonedScript.id = "scriptid"+UniqueNumber;

    propertiesEditor(clonedTarget); 

  // console.log(`${clonedTarget.id} ${clonedStyle.id} ${clonedScript.id}`);


});


      break;
  
    default:
      // Generate unique ID and class
    let LazyDevOperation = LazydevDataList();
    let UniqueNumber = LazyDevOperation;
    let UniqueElementID = CSSIdCheckAndPush(`lazyid${UniqueNumber}`);
    let UniqueClass = CSSMainClassCheckAndPush(`lazyclass${UniqueNumber}`);

  let elattr2 = elementTarget.attributes;
  let elHTML2 = elementTarget.innerHTML;
  let elTag2 = elementTarget.tagName;

      let clonedElement2 = document.createElement(elTag2);
      clonedElement2.innerHTML = elHTML2;
      for (var i = 0; i < elattr2.length; i++) {
        var atribut = elattr2[i];
        clonedElement2.setAttribute(atribut.name, atribut.value);
      }
      let lazyDev = clonedElement2.getAttribute("lazyDev");
      // Update ID and class of the cloned element
      clonedElement2.setAttribute("id", UniqueElementID);
      clonedElement2.setAttribute("lazyDev", UniqueNumber);
      clonedElement2.setAttribute("Mainclass", UniqueClass);
     SetClassDuplicate(clonedElement2);
     clonedElement2.classList.add('hoverTargetContainer');
      setTimeout(() => {
        clonedElement2.classList.remove('hoverTargetContainer');
      }, 400);

      let targetStyle = document.getElementById(`styleid${lazyDev}`);
      let styleclone = document.createElement(targetStyle.tagName);
      styleclone.innerHTML = targetStyle.innerHTML;
      styleclone.setAttribute("id", `styleid${UniqueNumber}`);
      let targetScript = document.getElementById(`scriptid${lazyDev}`);
      let scriptclone = document.createElement(targetScript.tagName);
      scriptclone.innerHTML = targetScript.innerHTML;
      scriptclone.setAttribute("id", `scriptid${UniqueNumber}`);

      elementTarget.parentNode.insertBefore(clonedElement2, scriptTarget.nextSibling);
      clonedElement2.parentNode.insertBefore(scriptclone, clonedElement2.nextSibling);
      clonedElement2.parentNode.insertBefore(styleclone, clonedElement2.nextSibling);
      // console.log(`${clonedElement2.id} ${styleclone.id} ${scriptclone.id}`);
      propertiesEditor(clonedElement2);
      break;
  }

function SetClassDuplicate(target){
  let MainClass = target.getAttribute("Mainclass");
  let otherClass = target.getAttribute("another-class");
  if(MainClass,otherClass){
      target.setAttribute("class",MainClass + " " + otherClass);
  }
  if(!otherClass){
      target.setAttribute("class",MainClass);
  }
  if(!MainClass){
      target.setAttribute("class",otherClass);
  }
}
if(!dataFrom){
  selectorDesutructor();
  let closeButton = document.getElementById("ClosePopup-Button");
  closeButton.click();
  setTimeout(() => {
    let edit = document.getElementById("Edit-Element");
    edit.click();
  }, 500);
}

    // uniqueElementIds = [];
    
  }

  export { duplicateSelectorOptin };

