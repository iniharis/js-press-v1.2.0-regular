import { LazyDev } from './main.js';
import { CssIdArray } from './main.js';
import { MainClassArray } from './main.js';
import { editSelector } from './selector.js';

function deleteSelectedElement() {
  let lazyDevElements = document.querySelectorAll('[lazyDev]');
  lazyDevElements.forEach(function (element) {
    element.addEventListener('mouseenter', handleMouseEnterdelete);

    element.addEventListener('click', handleClickdelete);

    element.addEventListener('mouseleave', handleMouseLeavedelete);
  });

  let closeButton = document.getElementById("ClosePopup-Button");
  closeButton.addEventListener('click', stopDeleteSelectedElement);

  function handleMouseEnterdelete(event) {
    this.classList.add('hoverTargetContainer');
    var parentElement = this.parentNode;

    while (parentElement !== document.body) {
      parentElement.classList.remove('hoverTargetContainer');
      parentElement = parentElement.parentNode;
    }
  }

  function handleClickdelete(event) {
    event.stopPropagation();
    var targetElement = event.target;
    targetElement.classList.remove('hoverTargetContainer');
    //Hapus Array LazyDev
    let lazyDevData = targetElement.getAttribute('lazydev');
      deleteLazydev(lazyDevData);
    //Hapus Array ID
    let idData = targetElement.getAttribute('id');
      deletIDArray(idData);
    //Hapus Array MainClass
    let classData = targetElement.getAttribute('class');
      deletCssMainClassArray(classData);
      deleteElement(targetElement);

    
  }

  function handleMouseLeavedelete(event) {
    this.classList.remove('hoverTargetContainer');
  }

  function stopDeleteSelectedElement() {
    lazyDevElements.forEach(function (element) {
      element.removeEventListener('mouseenter', handleMouseEnterdelete);
      element.removeEventListener('click', handleClickdelete);
      element.removeEventListener('mouseleave', handleMouseLeavedelete);
    });

    closeButton.removeEventListener('click', stopDeleteSelectedElement);
  }
} 

export {deleteSelectedElement}

function deleteElement(target){
  target.remove();
}

export {deleteElement}

function deleteLazydev(target){
  let targetInterger = parseInt(target);
  let index = LazyDev.indexOf(targetInterger);
  if (index !== -1) {
    LazyDev.splice(index, 1);
}
}
export {deleteLazydev}

function deletIDArray(target) {
  let index = CssIdArray.indexOf(target);
  if (index !== -1) {
    CssIdArray.splice(index, 1);
  }
}
export {deletIDArray}

function deletCssMainClassArray(target){
  let index = MainClassArray.indexOf(target);
  if (index !== -1) {
    MainClassArray.splice(index, 1);
    // console.log(CssIdArray, MainClassArray, LazyDev);
}
}

export {deletCssMainClassArray}

// function changeBackground(){
//   const images = document.querySelectorAll('.js-image-gallery-thumb');
//   const canvas = document.querySelector('.js-canvas');
//   images.forEach(img => {
//     img.addEventListener('click', ()=>{
//       const zoomImg = document.querySelector('.js-zoom-this-image');
//       const source = img.getAttribute('src');
//       zoomImg.setAttribute('src',source);
//       canvas.classList.add('js-fade-in');
//       canvas.classList.remove('js-hidden-canvas');
//     })
//   });
//   const closebutton = document.querySelector('.js-close-button');
//   closebutton.addEventListener('click', ()=>{
//     canvas.classList.remove('js-fade-in');
//     canvas.classList.add('js-hidden-canvas');
//   })
// }
// changeBackground();