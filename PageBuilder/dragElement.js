import { selectorDesutructor,editSelector } from './selector.js';
import { PopupAppend, gsap100 } from './Animation.js'

let dragstates = "";
function moveElements(targetElement){
let PopupDiv = document.getElementById("Popup");
if(!PopupDiv){
    dragstates = "navigator";
    PopupAppend("navigator");
    gsap100();
    let maincontroller = document.getElementById("main-controller");
    gsap.to(maincontroller, { xPercent: -150, duration: 1,});
    let closenavBarButton = document.getElementById("navigator-close");
    closenavBarButton.click();

} else {
    dragstates = "current";
}
let target = targetElement;
let identity = target.getAttribute("data-identity");
if(identity === "Main Container" || identity === "Child Container" || identity === "Wrapper"){
    dragContainer(target)
} else {
    dragElement(target)
}
changePopuptext();
selectorDesutructor();


}

export {moveElements}

//membuat popup selector
let popupDragSelector = `

<div id="drag-before-this" class="drags" title="Move Before This">
<i class="fa-solid fa-caret-up"></i>
<p>Move Before This</p>
</div>

<div id="drag-after-this" class="drags" title="Move After This">
<i class="fa-solid fa-caret-down"></i>
<p>Move After This</p>
</div>

<div id="cancel-this-target" class="drags" title="Cancle">
<i class="fa-solid fa-ban"></i>
<p>Cancel</p>
</div>
`
;

let popupDragSelectorAppend = `

<div id="drag-before-this" class="drags" title="Move Before This">
<i class="fa-solid fa-caret-up"></i>
<p>Move Before This</p>
</div>

<div id="drag-after-this" class="drags" title="Move After This">
<i class="fa-solid fa-caret-down"></i>
<p>Move After This</p>
</div>

<div id="drag-inside-this" class="drags" title="Move Inside This">
<i class="fa-solid fa-caret-up"></i>
<p>Move Inside This</p>
</div>

<div id="cancel-this-target" class="drags" title="Cancle">
<i class="fa-solid fa-ban"></i>
<p>Cancel</p>
</div>
`
;

//membuat popup selector
let popupDragSelectorMainContainer = `
<div id="drag-inside-this" class="drags" title="Move Inside This">
<i class="fa-solid fa-caret-up"></i>
<p>Move Inside This</p>
</div>

<div id="cancel-this-target" class="drags" title="Cancel">
<i class="fa-solid fa-ban"></i>
<p>Cancel</p>
</div>
`
;

function changePopuptext(){
    let popuptext = document.getElementById("PopupText");
    popuptext.textContent = "Press Click to the target destination"
    }

function navistates(){
let closePopups = document.getElementById("ClosePopup-Button");
closePopups.click();
let navigatorOpenButtonDiv = document.getElementById("open-navigator");
navigatorOpenButtonDiv.click();
}

function dragElement(targetElement,Laststates){
    let target = targetElement;
    target.remove();
    dragSelector(target);

//-----------------------------------------------
//-------SELECTOR FUNCTION--------//
function dragSelector(draggedElement){
    let lazyDevElements = document.querySelectorAll('[lazyDev]');
  lazyDevElements.forEach(function (element) {
    element.addEventListener('mouseenter', handleMouseEnterdrag);

    element.addEventListener('click', dragElementSelected);

    element.addEventListener('mouseleave', handleMouseLeavedrag);
  });


//-------handleMouseEnterDrag FUNCTION--------//
function handleMouseEnterdrag(event) {
    this.classList.add('hoverTargetContainer');
    var parentElement = this.parentNode;
  
    while (parentElement !== document.body) {
      parentElement.classList.remove('hoverTargetContainer');
      parentElement = parentElement.parentNode;
    }
  }
//-------handleMouseEnterDrag END --------//

//-------handleMouseLeavedrag FUNCTION--------//
function handleMouseLeavedrag(event) {
    this.classList.remove('hoverTargetContainer');
  }
//-------handleMouseLeavedrag END --------//

//-------handleClickdrag FUNCTION--------//
// Memberikan Target
function dragElementSelected(event){
    event.stopPropagation(); // Menghentikan penyebaran event
    let elements = document.querySelectorAll('[lazyDev]');
    elements.forEach(element => 
      { 
    element.removeEventListener("click", dragElementSelected); 
    element.removeEventListener('mouseenter', handleMouseEnterdrag);
    element.removeEventListener('mouseleave', handleMouseLeavedrag);
    
    
    });
    let CX = event.clientX;
    let CY = event.clientY;
    let targetID = event.target.id;
    let elementdrag = draggedElement;
    moveElementFilter2(elementdrag,targetID,CX,CY);
    Closebutton();
    return 
  }
//-------handleClickdrag END --------//
function Closebutton(){
    let elements = document.querySelectorAll('[lazyDev]');
      elements.forEach(element => {
        element.removeEventListener("mouseenter", dragElementSelected);
        element.removeEventListener("mouseleave", handleMouseEnterdrag);
        element.removeEventListener("click", dragElementSelected); 
        element.classList.remove('hoverTargetContainer');
      });
    
  }

return
}

//-------SELECTOR FUNCTION END --------//    

    return
}


function moveElementFilter2(targetElement,targetMoveID,ClientX,ClientY){
    let target = targetElement;
    // let identity = targetElement.getAttribute("data-identity");
    let movetarget = document.getElementById(targetMoveID);
    let moveidentity = movetarget.getAttribute("data-identity");
        
    if(moveidentity === "Main Container"){
        appendToContainer(target,movetarget,ClientX,ClientY);
        return
    }
    else if(moveidentity === "Child Container" || moveidentity === "Wrapper"){
        appendAndDrag(target,movetarget,ClientX,ClientY);
        return
    }
    
    
    else {
        dragOnly(target,movetarget,ClientX,ClientY);
        return
    }
    
    }

function appendAndDrag(dataMove,dataTarget,CoordinateX,CoordinateY){
    let MCPopup = document.createElement("SECTION")
    MCPopup.setAttribute("id","drag-container");

    // Mengatur margin left dan margin top sesuai dengan kondisi x
    let x = CoordinateX;
    let y = CoordinateY;
    if (x < 0.5 * window.innerWidth) {
        x += 0;
        } else {
        x -= 200;
        }
        if (y < 0.1 * window.innerHeight) {
            y += 50;
            } else if(y > 0.9 * window.innerHeight) {
            y -= 50;
            } else {
                y += 0;
            }
    
    // Mengatur margin left dan margin top sesuai dengan x dan y 
    MCPopup.style.marginLeft = `${x}px`;
    MCPopup.style.marginTop = `${y}px`;
    
    MCPopup.innerHTML = popupDragSelectorAppend;
    document.body.appendChild(MCPopup);
        
    let appendButton = document.getElementById("drag-inside-this");
    appendButton.addEventListener("click",()=>
    {

        let ElementLazy = dataMove.getAttribute("lazydev");
        let Estyle = document.getElementById("styleid" + ElementLazy);
        let Escript = document.getElementById("scriptid" + ElementLazy);
        Escript.remove();
        Estyle.remove();
        let newEScript = document.createElement("script");
        newEScript.id = Escript.id;
        let newEStyle = document.createElement("Style");
        newEStyle.id = Estyle.id;
        newEScript.innerHTML = Escript.innerHTML;
        newEStyle.innerHTML = Estyle.innerHTML;

        dataTarget.appendChild(dataMove);
        dataTarget.appendChild(newEStyle);
        dataTarget.appendChild(newEScript);
        // console.log(newEStyle.id,newEScript);
        
        MCPopup.remove();
        let popuptext = document.getElementById("PopupText");
        popuptext.textContent = `Click The Element Target`;
        if(dragstates === "navigator"){
            navistates();
            dragstates = "";
            return
        }
        return editSelector();
    })

    let beforeButton = document.getElementById("drag-before-this");
    beforeButton.addEventListener("click", ()=>
    {
        let ElementLazy = dataMove.getAttribute("lazydev");
        let Estyle = document.getElementById("styleid" + ElementLazy);
        let Escript = document.getElementById("scriptid" + ElementLazy);
        Escript.remove();
        Estyle.remove();
        let newEScript = document.createElement("script");
        newEScript.id = Escript.id;
        let newEStyle = document.createElement("Style");
        newEStyle.id = Estyle.id;
        newEScript.innerHTML = Escript.innerHTML;
        newEStyle.innerHTML = Estyle.innerHTML;

        dataTarget.parentNode.insertBefore(dataMove, dataTarget);
        dataTarget.parentNode.insertBefore(newEStyle, dataTarget);
        dataTarget.parentNode.insertBefore(newEScript, dataTarget);
        
        MCPopup.remove();
        let popuptext = document.getElementById("PopupText");
        popuptext.textContent = `Click The Element Target`;
        if(dragstates === "navigator"){
            navistates();
            dragstates = "";
            return
        }
        return editSelector();
    })

    let afterButton = document.getElementById("drag-after-this");
    afterButton.addEventListener("click", ()=>
    {
        let ElementLazy = dataMove.getAttribute("lazydev");
        let Estyle = document.getElementById("styleid" + ElementLazy);
        let Escript = document.getElementById("scriptid" + ElementLazy);
        Escript.remove();
        Estyle.remove();
        let newEScript = document.createElement("script");
        newEScript.id = Escript.id;
        let newEStyle = document.createElement("Style");
        newEStyle.id = Estyle.id;
        newEScript.innerHTML = Escript.innerHTML;
        newEStyle.innerHTML = Estyle.innerHTML;

        dataTarget.insertAdjacentElement('afterend', newEScript);
        dataTarget.insertAdjacentElement('afterend', newEStyle);
        dataTarget.insertAdjacentElement('afterend', dataMove);
        
        MCPopup.remove();
        let popuptext = document.getElementById("PopupText");
        popuptext.textContent = `Click The Element Target`;
        if(dragstates === "navigator"){
            navistates();
            dragstates = "";
            return
        }
        return editSelector();
    })
    let cancelButton = document.getElementById("cancel-this-target");

    cancelButton.addEventListener("click", ()=>
    {
        MCPopup.remove();
        dragElement(dataMove);
    })
}

function dragOnly(dataMove,dataTarget,CoordinateX,CoordinateY){
    let MCPopup = document.createElement("SECTION")
    MCPopup.setAttribute("id","drag-container");

    // Mengatur margin left dan margin top sesuai dengan kondisi x
    let x = CoordinateX;
    let y = CoordinateY;
    if (x < 0.5 * window.innerWidth) {
        x += 0;
        } else {
        x -= 200;
        }
        if (y < 0.1 * window.innerHeight) {
            y += 50;
            } else if(y > 0.9 * window.innerHeight) {
            y -= 50;
            } else {
                y += 0;
            }
    
    // Mengatur margin left dan margin top sesuai dengan x dan y 
    MCPopup.style.marginLeft = `${x}px`;
    MCPopup.style.marginTop = `${y}px`;
    
    MCPopup.innerHTML = popupDragSelector;
    document.body.appendChild(MCPopup);

    let beforeButton = document.getElementById("drag-before-this");
    beforeButton.addEventListener("click", ()=>
    {
        let ElementLazy = dataMove.getAttribute("lazydev");
        let Estyle = document.getElementById("styleid" + ElementLazy);
        let Escript = document.getElementById("scriptid" + ElementLazy);
        Escript.remove();
        Estyle.remove();
        let newEScript = document.createElement("script");
        newEScript.id = Escript.id;
        let newEStyle = document.createElement("Style");
        newEStyle.id = Estyle.id;
        newEScript.innerHTML = Escript.innerHTML;
        newEStyle.innerHTML = Estyle.innerHTML;

        dataTarget.parentNode.insertBefore(dataMove, dataTarget);
        dataTarget.parentNode.insertBefore(newEStyle, dataTarget);
        dataTarget.parentNode.insertBefore(newEScript, dataTarget);
        
        MCPopup.remove();
        let popuptext = document.getElementById("PopupText");
        popuptext.textContent = `Click The Element Target`;
        if(dragstates === "navigator"){
            navistates();
            dragstates = "";
            return
        }
        return editSelector();
    })

    let afterButton = document.getElementById("drag-after-this");
    afterButton.addEventListener("click", ()=>
    {
        let ElementLazy = dataMove.getAttribute("lazydev");
        let Estyle = document.getElementById("styleid" + ElementLazy);
        let Escript = document.getElementById("scriptid" + ElementLazy);
        Escript.remove();
        Estyle.remove();
        let newEScript = document.createElement("script");
        newEScript.id = Escript.id;
        let newEStyle = document.createElement("Style");
        newEStyle.id = Estyle.id;
        newEScript.innerHTML = Escript.innerHTML;
        newEStyle.innerHTML = Estyle.innerHTML;
        let dataTargetLazy = dataTarget.getAttribute("lazydev");
        let scriptTarget = document.getElementById("scriptid" + dataTargetLazy);

        scriptTarget.insertAdjacentElement('afterend', newEScript);
        scriptTarget.insertAdjacentElement('afterend', newEStyle);
        scriptTarget.insertAdjacentElement('afterend', dataMove);
        
        MCPopup.remove();
        let popuptext = document.getElementById("PopupText");
        popuptext.textContent = `Click The Element Target`;
        if(dragstates === "navigator"){
            navistates();
            dragstates = "";
            return
        }
        return editSelector();
    })
    let cancelButton = document.getElementById("cancel-this-target");

    cancelButton.addEventListener("click", ()=>
    {
        MCPopup.remove();
        dragElement(dataMove);
    })

}
    
    
   function appendToContainer(dataMove,dataTarget,CoordinateX,CoordinateY){
    let MCPopup = document.createElement("SECTION")
    MCPopup.setAttribute("id","drag-container");

    // Mengatur margin left dan margin top sesuai dengan kondisi x
    let x = CoordinateX;
    let y = CoordinateY;
    if (x < 0.5 * window.innerWidth) {
        x += 0;
        } else {
        x -= 200;
        }
        if (y < 0.1 * window.innerHeight) {
            y += 50;
            } else if(y > 0.9 * window.innerHeight) {
            y -= 50;
            } else {
                y += 0;
            }
    
    // Mengatur margin left dan margin top sesuai dengan x dan y 
    MCPopup.style.marginLeft = `${x}px`;
    MCPopup.style.marginTop = `${y}px`;
    
    MCPopup.innerHTML = popupDragSelectorMainContainer;
    document.body.appendChild(MCPopup);

    let appendButton = document.getElementById("drag-inside-this");
    let cancelButton = document.getElementById("cancel-this-target");
    appendButton.addEventListener("click",()=>
    {

        let ElementLazy = dataMove.getAttribute("lazydev");
        let Estyle = document.getElementById("styleid" + ElementLazy);
        let Escript = document.getElementById("scriptid" + ElementLazy);
        Escript.remove();
        Estyle.remove();
        let newEScript = document.createElement("script");
        newEScript.id = Escript.id;
        let newEStyle = document.createElement("Style");
        newEStyle.id = Estyle.id;
        newEScript.innerHTML = Escript.innerHTML;
        newEStyle.innerHTML = Estyle.innerHTML;

        dataTarget.appendChild(dataMove);
        dataTarget.appendChild(newEStyle);
        dataTarget.appendChild(newEScript);
        // console.log(newEStyle.id,newEScript);
        
        MCPopup.remove();
        let popuptext = document.getElementById("PopupText");
        popuptext.textContent = `Click The Element Target`;
        if(dragstates === "navigator"){
            navistates();
            dragstates = "";
            return
        }
        return editSelector();
    })
    cancelButton.addEventListener("click", ()=>
    {
        MCPopup.remove();
        dragElement(dataMove);
    })

   }

//==========================================================================


function dragContainer(targetElement){
    let target = targetElement;
    target.remove();
    dragSelector(target);
    // document.addEventListener('mousemove', appender);

//-------SELECTOR FUNCTION--------//
function dragSelector(draggedElement){
    let lazyDevElements = document.querySelectorAll('[lazyDev]');
  lazyDevElements.forEach(function (element) {
    element.addEventListener('mouseenter', handleMouseEnterdrag);

    element.addEventListener('click', dragElementSelected);

    element.addEventListener('mouseleave', handleMouseLeavedrag);
  });


//-------handleMouseEnterDrag FUNCTION--------//
function handleMouseEnterdrag(event) {
    this.classList.add('hoverTargetContainer');
    var parentElement = this.parentNode;
  
    while (parentElement !== document.body) {
      parentElement.classList.remove('hoverTargetContainer');
      parentElement = parentElement.parentNode;
    }
  }
//-------handleMouseEnterDrag END --------//

//-------handleMouseLeavedrag FUNCTION--------//
function handleMouseLeavedrag(event) {
    this.classList.remove('hoverTargetContainer');
  }
//-------handleMouseLeavedrag END --------//

//-------handleClickdrag FUNCTION--------//
// Memberikan Target
function dragElementSelected(event){
    event.stopPropagation(); // Menghentikan penyebaran event
    let elements = document.querySelectorAll('[lazyDev]');
    elements.forEach(element => 
      { 
    element.removeEventListener("click", dragElementSelected); 
    element.removeEventListener('mouseenter', handleMouseEnterdrag);
    element.removeEventListener('mouseleave', handleMouseLeavedrag);
    
    
    });
    let CX = event.clientX;
    let CY = event.clientY;
    let targetID = event.target.id;
    let elementdrag = draggedElement;
    moveElementFilter(elementdrag,targetID,CX,CY);
    Closebutton();
    return 
  }
//-------handleClickdrag END --------//
function Closebutton(){
    let elements = document.querySelectorAll('[lazyDev]');
      elements.forEach(element => {
        element.removeEventListener("mouseenter", dragElementSelected);
        element.removeEventListener("mouseleave", handleMouseEnterdrag);
        element.removeEventListener("click", dragElementSelected); 
        element.classList.remove('hoverTargetContainer');
      });
    
  }

return
}

//-------SELECTOR FUNCTION END --------//

return
}



function moveElementFilter(targetElement,targetMoveID,ClientX,ClientY){
let target = targetElement;
let identity = targetElement.getAttribute("data-identity");
let movetarget = document.getElementById(targetMoveID);
let moveidentity = movetarget.getAttribute("data-identity");
    
if(identity === "Main Container" && moveidentity !== "Main Container"){
    let popuptext = document.getElementById("PopupText");
    popuptext.textContent = `${targetMoveID} is not a Main Container`;
    setTimeout(() => {
    dragContainer(target);
    changePopuptext();
    }, 500);
    return
}
else if(identity !== "Main Container" && moveidentity === "Main Container"){
    dragtoMaincontainer(target,movetarget,ClientX,ClientY);
    return
}


else if(identity === "Main Container" && moveidentity === "Main Container"){
    dragMaintoMain(target,movetarget,ClientX,ClientY);
    return
} else {
    dragAndAppend(target,movetarget,ClientX,ClientY);
    return
}


}

function dragAndAppend(dataMove,dataTarget,CoordinateX,CoordinateY){
    let MCPopup = document.createElement("SECTION")
    MCPopup.setAttribute("id","drag-container");

    // Mengatur margin left dan margin top sesuai dengan kondisi x
    let x = CoordinateX;
    let y = CoordinateY;
    if (x < 0.5 * window.innerWidth) {
        x += 0;
        } else {
        x -= 200;
        }
        if (y < 0.1 * window.innerHeight) {
            y += 50;
            } else if(y > 0.9 * window.innerHeight) {
            y -= 50;
            } else {
                y += 0;
            }
    
    // Mengatur margin left dan margin top sesuai dengan x dan y 
    MCPopup.style.marginLeft = `${x}px`;
    MCPopup.style.marginTop = `${y}px`;
    
    MCPopup.innerHTML = popupDragSelectorAppend;
    document.body.appendChild(MCPopup);
        
    let appendButton = document.getElementById("drag-inside-this");
    appendButton.addEventListener("click",()=>
    {
        dataTarget.appendChild(dataMove);
        
        MCPopup.remove();
        let popuptext = document.getElementById("PopupText");
        popuptext.textContent = `Click The Element Target`;
        if(dragstates === "navigator"){
            navistates();
            dragstates = "";
            return
        }
        return editSelector();
    })

    let beforeButton = document.getElementById("drag-before-this");
    beforeButton.addEventListener("click", ()=>
    {
        dataTarget.parentNode.insertBefore(dataMove, dataTarget);
        
        MCPopup.remove();
        let popuptext = document.getElementById("PopupText");
        popuptext.textContent = `Click The Element Target`;
        if(dragstates === "navigator"){
            navistates();
            dragstates = "";
            return
        }
        return editSelector();
    })

    let afterButton = document.getElementById("drag-after-this");
    afterButton.addEventListener("click", ()=>
    {
        dataTarget.insertAdjacentElement('afterend', dataMove);
        
        MCPopup.remove();
        let popuptext = document.getElementById("PopupText");
        popuptext.textContent = `Click The Element Target`;
        if(dragstates === "navigator"){
            navistates();
            dragstates = "";
            return
        }
        return editSelector();
    })
    let cancelButton = document.getElementById("cancel-this-target");

    cancelButton.addEventListener("click", ()=>
    {
        MCPopup.remove();
        dragElement(dataMove);
    })
}

//---------------------------------------------------------------------------------------
function dragMaintoMain(dataMove,dataTarget,CoordinateX,CoordinateY){
    let MCPopup = document.createElement("SECTION")
    MCPopup.setAttribute("id","drag-container");

    // Mengatur margin left dan margin top sesuai dengan kondisi x
    let x = CoordinateX;
    let y = CoordinateY;
    if (x < 0.5 * window.innerWidth) {
        x += 0;
        } else {
        x -= 200;
        }
        if (y < 0.1 * window.innerHeight) {
            y += 50;
            } else if(y > 0.9 * window.innerHeight) {
            y -= 50;
            } else {
                y += 0;
            }
    
    // Mengatur margin left dan margin top sesuai dengan x dan y 
    MCPopup.style.marginLeft = `${x}px`;
    MCPopup.style.marginTop = `${y}px`;
    
    MCPopup.innerHTML = popupDragSelector;
    document.body.appendChild(MCPopup);

    let beforeButton = document.getElementById("drag-before-this"); 
    
    beforeButton.addEventListener("click", ()=>
    {
        dataTarget.parentNode.insertBefore(dataMove, dataTarget);
        MCPopup.remove();
        let popuptext = document.getElementById("PopupText");
        popuptext.textContent = `Click The Element Target`;
        if(dragstates === "navigator"){
            navistates();
            dragstates = "";
            return
        }
        return editSelector();
    })

    let afterButton  = document.getElementById("drag-after-this");
    afterButton.addEventListener("click", ()=>
    {
        dataTarget.insertAdjacentElement('afterend', dataMove);
        MCPopup.remove();
        let popuptext = document.getElementById("PopupText");
        popuptext.textContent = `Click The Element Target`;
        if(dragstates === "navigator"){
            navistates();
            dragstates = "";
            return
        }
        return editSelector();
    })
    let cancelButton = document.getElementById("cancel-this-target");

    cancelButton.addEventListener("click", ()=>
    {
        MCPopup.remove();
        dragContainer(dataMove);
    })

}
//---------------------------------------------------------------------------------------

function dragtoMaincontainer(dataMove,dataTarget,CoordinateX,CoordinateY){
    // let identityData = dataMove.getAttribute("data-identity");
    let MCPopup = document.createElement("SECTION")
    MCPopup.setAttribute("id","drag-container");
    // Mendapatkan koordinat kursor saat mengklik elemen
    // Mengatur margin left dan margin top sesuai dengan kondisi x
    let x = CoordinateX;
    let y = CoordinateY;
    if (x < 0.5 * window.innerWidth) {
        x += 0;
        } else {
        x -= 200;
        }
        if (y < 0.1 * window.innerHeight) {
            y += 50;
            } else if(y > 0.9 * window.innerHeight) {
            y -= 50;
            } else {
                y += 0;
            }
    
    // Mengatur margin left dan margin top sesuai dengan x dan y 
    MCPopup.style.marginLeft = `${x}px`;
    MCPopup.style.marginTop = `${y}px`;
    
    MCPopup.innerHTML = popupDragSelectorMainContainer;
    document.body.appendChild(MCPopup);

    let appendButton = document.getElementById("drag-inside-this");
    let cancelButton = document.getElementById("cancel-this-target");
    appendButton.addEventListener("click",()=>
    {
        let moveelement = document.createElement(dataMove.tagName);
        moveelement.innerHTML = dataMove.innerHTML;
        const atributDataMove = dataMove.attributes;

        // Salin atribut dari dataMove ke moveelement
            for (const atribut of atributDataMove) {
            moveelement.setAttribute(atribut.name, atribut.value);
            }
        dataTarget.appendChild(moveelement);
        
        MCPopup.remove();
        let popuptext = document.getElementById("PopupText");
        popuptext.textContent = `Click The Element Target`;
        if(dragstates === "navigator"){
            navistates();
            dragstates = "";
            return
        }
        return editSelector();
    })
    cancelButton.addEventListener("click", ()=>
    {
        MCPopup.remove();
        dragContainer(dataMove);
    })
    }

//---------------------------------------------------------------------------------------
    // if (identityData === "Child Container" || identityData === "Wrapper")
    // {
    // let moveelement = document.createElement(dataMove.tagName);
    // moveelement.innerHTML = dataMove.innerHTML;
    // const atributDataMove = dataMove.attributes;

    // // Salin atribut dari dataMove ke moveelement
    //     for (const atribut of atributDataMove) {
    //     moveelement.setAttribute(atribut.name, atribut.value);
    //     }
    // dataTarget.appendChild(moveelement);
    // }
    // else {
    //     let moveelement = document.createElement(dataMove.tagName);
    // moveelement.innerHTML = dataMove.innerHTML;
    // const atributDataMove = dataMove.attributes;

        // let ElementLazy = dataMove.getAttribute("lazydev");
        // let Escript = document.getElementById("styleid" + ElementLazy);
        // let Estyle = document.getElementById("scriptid" + ElementLazy);
        // // Salin atribut dari dataMove ke moveelement
        // for (const atribut of atributDataMove) {
        //     moveelement.setAttribute(atribut.name, atribut.value);
        //     }
        
        // Escript.remove();
        // Estyle.remove();
        // let newEScript = document.createElement("script");
        // newEScript.id = Escript.id;
        // let newEStyle = document.createElement("Style");
        // newEStyle.id = Estyle.id;
        // newEScript.innerHTML = Escript.innerHTML;
        // newEStyle.innerHTML = Estyle.innerHTML;

        // dataTarget.appendChild(moveelement);
        // dataTarget.appendChild(newEStyle);
        // dataTarget.appendChild(newEScript);
        // console.log(newEStyle.id,newEScript);
    // } 