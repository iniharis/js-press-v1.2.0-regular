import {animationContainerContent,animationArray,} from './animatecontent.js'
import {gsap100,gsap95} from './Animation.js'
import {dragTheElement} from './minimize.js'
import {gsapAnimationFUNC,SmoothScroll} from './animateElementGsap.js'


let animationEditButton = document.querySelector("#Animate-Element");
animationEditButton.addEventListener("click", AnimationContainer);

function AnimationContainer(state){
    animationEditButton.removeEventListener("click", AnimationContainer);
    let animContainer = document.createElement("SECTION");
    animContainer.id = "animate-container";
    animContainer.classList.add("container-anim-class");
    animContainer.classList.add("animation-container-anim");
    animContainer.innerHTML = animationContainerContent;
    document.body.appendChild(animContainer);

    let divAnimationList = document.getElementById("lazydev-choose-animation");
    divAnimationList.innerHTML = '';
    animationArray.forEach(element => {
        let newOption = document.createElement("OPTION");
        newOption.value = element.value;
        newOption.textContent = element.name;
        divAnimationList.appendChild(newOption);

    });
    const submitButton = document.getElementById('animation-option-submit');
    add_animation_event(divAnimationList,submitButton)
    dragTheElement(animContainer);
    buttonCloseAnimate();
    setTimeout(() => {
        animContainer.classList.remove("animation-container-anim");
    }, 1000);
}

function buttonCloseAnimate(){
    document.getElementById("animhead-button-trigger").addEventListener("click", closeFunctionAnimationPlugin)
}

export function closeFunctionAnimationPlugin(){
    let anim = document.getElementById('animate-container');

    gsap95();
        let maincontrollerz = document.getElementById("main-controller");
      gsap.to(maincontrollerz, { xPercent: 0, duration: 1,});
        gsap.to(anim,{opacity: 0, scaleX:0, duration:0.5 })
        setTimeout(() => {
            anim.remove();
            animationEditButton.addEventListener("click", AnimationContainer);
        }, 501);
}

function add_animation_event(select,button){
button.addEventListener('click',()=>{
    if(select.value === 'gsap'){
        gsapAnimationFUNC();
    }
    else if(select.value === 'SmoothScroll'){
        SmoothScroll();
    }
    else {
        return
    }
})
}

