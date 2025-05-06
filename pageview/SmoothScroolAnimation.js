
let leftStyle = '';
let topstyle = '';

export const smoothScrollContainer = ()=>{
    //-------------------------------------------------//
      const section = document.createElement('section');
      section.id = 'smooth-scroll-container'
      section.classList.add('smooth-scroll-container')
      section.innerHTML = `
      <div id="smooth-scroll-wrapper" class="smooth-scroll-wrapper" lazydev="18ff1fc0fe91">
      
      <form id="SmoothScrollJS">
      

        <fieldset id="formfieldsetSmoothScrollJS">
      

        <legend id="formmakerlegendSmoothScrollJS">
      
Smooth Scroll JS
      </legend>

<div style="width: 100%;">
      
<label id="framerate-lb" style="width: 100%;">Framerate</label>

<input type="range" min="0" max="2000" value="100" step="1" id="framerate-ss" style="width: 100%; margin-top : 8px;">
      
</div>

      
<div style="width: 100%;">
      
<label id="animation-time-lb" style="width: 100%;">Animation Time</label>

<input type="range" min="0" max="9999" value="1000" step="1" id="animation-time-ss" style="width: 100%; margin-top : 8px;">
      
</div>

      
<div style="width: 100%;">
      
<label id="step-size-lb" style="width: 100%;">Step Size</label>

<input type="range" min="0" max="9999" value="100" step="1" id="step-size-ss" style="width: 100%; margin-top : 8px;">
      
</div>

<div style="width: 100%; margin-top: 10px;">
<input type="checkbox" id="pulse-algorithm-ss" style="width: 5%;">  
<label id="pulse-algorithm-lb" style="width: 90%;">Pulse Algorithm</label>
</div>

<div style="width: 100%;">
      
<label id="pulse-scale-lb" style="width: 100%;">Step Size</label>

<input type="range" min="0" max="20" value="4" step="1" id="pulse-scale-ss" style="width: 100%; margin-top : 8px;">
      
</div>

<div style="width: 100%; margin-top: 10px;">
<input type="checkbox" id="pulse-normalize-ss" style="width: 5%;">  
<label id="pulse-normalize-lb" style="width: 90%;">Pulse Algorithm</label>
</div>


<div style="width: 100%;">
      
<label id="acceleration-delta-lb" style="width: 100%;">Acceleration Delta</label>
  
<input type="range" min="0" max="200" value="50" step="1" id="acceleration-delta-ss" style="width: 100%; margin-top : 8px;">
     
</div>

<div style="width: 100%;">
      
<label id="acceleration-max-lb" style="width: 100%;">Acceleration Max</label>
      
<input type="range" min="0" max="20" value="3" step="1" id="acceleration-max-ss" style="width: 100%; margin-top : 8px;">

</div>

<div style="width: 100%; margin-top: 10px;">
<input type="checkbox" id="keyboard-support-ss" style="width: 5%;">  
<label id="keyboard-support-lb" style="width: 90%;">Keyboard Support</label>
      
</div>

<div style="width: 100%;">
      
<label id="arrow-scroll-lb" style="width: 100%;">Arrow Scroll</label>
      
<input type="range" min="0" max="500" value="50" step="1" id="arrow-scroll-ss" style="width: 100%; margin-top : 8px;">

</div>


<div id="smooth-scroll-js-code" class="none-mode" style="width: 100%;">
      
<label id="arrow-scroll-lb" style="width: 90%;">Make Sure You Put This Code inside Pagesetting that already use SmoothScroll</label>
      
<textarea id="smooth-scroll-js-textarea" rows="18" style="width: 100%; margin-top : 8px; font-size: 16px; font-weight: bold;"></textarea>

</div>

<div id="SubmitDivSmoothScrollJS">
      

            <button id="SubmitButtonSmoothScrollJS" type="submit">
      
Get A Code
      </button>
      

          
      </div>


      

        
      </fieldset>

      

      
      </form>

      

    
      </div>
  
    `;
    document.body.appendChild(section)
    gsap.to(section, {width:700, opacity: 1, duration: 0.3});
    dragContainer(section)
    changeInput();
    // section.style.left = leftStyle;
    // section.style.top = topstyle;
    
  }
  function dragContainer(elementdrag) {
      const draggableElement = elementdrag;
      const elementDrag = draggableElement;
  
      let offsetX, offsetY, isDragging = false;
  
      
      function dragStart(event) {
         
          if (event.target !== draggableElement) {
              return;
          }
  
          isDragging = true;
  
        
          offsetX = event.clientX - draggableElement.getBoundingClientRect().left;
          offsetY = event.clientY - draggableElement.getBoundingClientRect().top;
      }
  
    
      function dragMove(event) {
          if (isDragging) {
            
              const width = window.innerWidth;
              const height = window.innerHeight;
  
              let newLeft = event.clientX - offsetX;
              let newTop = event.clientY - offsetY;
  
              if (newLeft <= 10) {
                  newLeft = 11;
              }
              if (newLeft >= width * 90 / 100) {
                  newLeft = width * 80 / 100;
              }
              if (newTop <= 1) {
                  newTop = 2;
              }
              if (newTop >= height * 90 / 100) {
                  newTop = height * 80 / 100;
              }
  
            
              draggableElement.style.left = newLeft + 'px';
              draggableElement.style.top = newTop + 'px';
          }
      }
  
    
      function dragEnd() {
          isDragging = false;
      }
  
      elementDrag.addEventListener('mousedown', dragStart);
      document.addEventListener('mousemove', dragMove);
      document.addEventListener('mouseup', dragEnd);
  }

  let framerate = `frameRate: 150,`;
  let AnimationTime = `animationTime: 1000,`;
  let stepSize = `stepSize: 100,`;
  let pulseAlgo = `pulseAlgorithm: 1,`;
  let pulseScale = `pulseScale: 4,`;
  let pulseNormalize = `pulseNormalize: 0,`;
  let accDelta = `accelerationDelta: 50,`;
  let accMax = `accelerationMax: 3,`;
  let keyboardSupport = `keyboardSupport: 1,`;
  let arrowScroll = `arrowScroll: 50,`;
  
  function changescrollSmoothJS(){
        const smoothScroll = `
SmoothScroll({
    ${framerate}
    ${AnimationTime}
    ${stepSize}
    ${pulseAlgo}
    ${pulseScale}
    ${pulseNormalize}
    ${accDelta}
    ${accMax}
    ${keyboardSupport}
    ${arrowScroll}
    fixedBackground: 0
});
`;
const codeDiv = document.getElementById('smooth-scroll-js-code');
const textarea = document.getElementById('smooth-scroll-js-textarea');
textarea.value = smoothScroll;
codeDiv.classList.remove('none-mode');
  }

function changeInput(){
      
      const FRLabel = document.getElementById('framerate-lb');
      const FRInput = document.getElementById('framerate-ss');
      FRLabel.textContent = `Framerate (${FRInput.value})`;
      FRInput.addEventListener('input',()=>{
            FRLabel.textContent = `Framerate (${FRInput.value})`;
            framerate = `frameRate: ${FRInput.value},`;
      })

      const ATLabel = document.getElementById('animation-time-lb');
      const ATInput = document.getElementById('animation-time-ss');
      ATLabel.textContent = `Animation Time (${ATInput.value})`;
      ATInput.addEventListener('input',()=>{
            ATLabel.textContent = `Animation Time (${ATInput.value})`;
            AnimationTime = `animationTime: ${ATInput.value},`;
      });
      
      const SSLabel = document.getElementById('step-size-lb');
      const SSInput = document.getElementById('step-size-ss');
      SSLabel.textContent = `Step Size (${SSInput.value})`;
      SSInput.addEventListener('input',()=>{
            SSLabel.textContent = `Step Size (${SSInput.value})`;
            stepSize = `stepSize: ${SSInput.value},`;
      });
      
      const PulseAlgortihm = document.getElementById('pulse-algorithm-ss');
      PulseAlgortihm.addEventListener('input', ()=>{
            if(PulseAlgortihm.checked === true){
                  pulseAlgo = `pulseAlgorithm: 1,`;
            } else {
                  pulseAlgo = `pulseAlgorithm: 0,`;
            }
      })
      PulseAlgortihm.click();

      const PSLabel = document.getElementById('pulse-scale-lb');
      const PSInput = document.getElementById('pulse-scale-ss');
      PSLabel.textContent = `Pulse Scale (${PSInput.value})`;
      PSInput.addEventListener('input',()=>{
            PSLabel.textContent = `Pulse Scale (${PSInput.value})`;
            pulseScale = `pulseScale: ${PSInput.value},`;
      });

      const PNInput = document.getElementById('pulse-normalize-ss');
      PNInput.addEventListener('input', ()=>{
            if(PNInput.checked === true){
                  pulseNormalize = `pulseNormalize: 1,`;
            } else {
                  pulseNormalize = `pulseNormalize: 0,`;
            }
      })
      PNInput.click();

      const ADLabel = document.getElementById('acceleration-delta-lb');
      const ADInput = document.getElementById('acceleration-delta-ss');
      ADLabel.textContent = `Acceleration Delta (${ADInput.value})`;
      ADInput.addEventListener('input',()=>{
            ADLabel.textContent = `Acceleration Delta (${ADInput.value})`;
            accDelta = `accelerationDelta: ${ADInput.value},`;
      });

      const AMLabel = document.getElementById('acceleration-max-lb');
      const AMInput = document.getElementById('acceleration-max-ss');
      AMLabel.textContent = `Acceleration Max (${ADInput.value})`;
      AMInput.addEventListener('input',()=>{
            AMInput.textContent = `Acceleration Max (${ADInput.value})`;
            accMax = `accelerationMax: ${ADInput.value},`;
      });
      
      const KSInput = document.getElementById('keyboard-support-ss');
      KSInput.addEventListener('input', ()=>{
            if(KSInput.checked === true){
                  keyboardSupport = `keyboardSupport: 1,`;
            } else {
                  keyboardSupport = `keyboardSupport: 0,`;
            }
      })
      KSInput.click();

      const ASLabel = document.getElementById('arrow-scroll-lb');
      const ASInput = document.getElementById('arrow-scroll-ss');
      ASLabel.textContent = `Arrow Scroll (${ADInput.value})`;
      ASInput.addEventListener('input',()=>{
            ASInput.textContent = `Arrow Scroll (${ADInput.value})`;
            arrowScroll = `arrowScroll: ${ADInput.value},`;
      });

      const submit = document.getElementById('SubmitButtonSmoothScrollJS');
      submit.addEventListener('click', (event) => {
      event.preventDefault();
      changescrollSmoothJS();
});


}
  