import {clientUrl} from '/utils-urlmain';

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
  height: 100% !important;
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

let gsapValue = '';
let gsapNumberID = '';
let leftStyle = '';
let topstyle = '';

const gsaptemplate = [
  {
    name : 'Gsap to Template',
    value: `gsap.to("#your-element-id", {
      duration: 2,
      delay: 0,
      x: 200,
      rotation: 360,
      backgroundColor: "blue",
      ease: "power2.inOut"
    });`
  },
  {
    name : 'Gsap from Template',
    value: `gsap.from("#your-element-id", {
      duration: 2,
      delay: 0,
      x: 200,
      rotation: 360,
      backgroundColor: "blue",
      ease: "power2.inOut"
    });`
  },
  {
    name : 'Gsap To Scrolltrigger Template',
    value: `gsap.registerPlugin(ScrollTrigger);

    gsap.to("#your-element-id", {
      scrollTrigger: {
        trigger: "#your-element-id",
        start: "top center",
        end: "bottom center",
        markers: false, // display marker for debug
        scrub: false,
      },
      duration: 2,
      x: 200,
      rotation: 360,
      backgroundColor: "blue",
      ease: "power2.inOut",
    });`
  },
  {
    name : 'Gsap From Scrolltrigger Template',
    value: `gsap.registerPlugin(ScrollTrigger);
    
    gsap.from("#your-element-id", {
      scrollTrigger: {
        trigger: "#your-element-id",
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
      duration: 2,
      x: 200,
      rotation: 360,
      backgroundColor: "blue",
      ease: "power2.inOut",
    });`
  },
  {
    name : 'Gsap Timeline Template',
    value: `gsap.registerPlugin(ScrollTrigger);


    const timeline1 = gsap.timeline({
      scrollTrigger: {
        trigger: "#your-element-id-1",
        start: "top center",
        end: "bottom center",
        scrub: true,
        markers: true,
      }
    });
  
    timeline1.to("#your-element-id-1", {
      duration: 2,
      x: -200,
      rotation: -360,
      backgroundColor: "red",
      ease: "back.out",
    })
    .to("#your-element-id-1", {
      duration: 2,
      x: 400,
      rotation: 360,
      backgroundColor: "blue",
      ease: "back.out",
    });`
  },
  {
    name : 'Gsap Timeline fromTo Template',
    value: `
    gsap.registerPlugin(ScrollTrigger);

  // Timeline 1
  const timeline1 = gsap.timeline({
    scrollTrigger: {
      trigger: "#your-element-id-1",
      start: "top center",
      end: "bottom center",
      scrub: true,
      markers: true,
    }
  });

  timeline1.fromTo("#your-element-id-1", {
    x: -200,
    rotation: -360,
    backgroundColor: "red",
  }, {
    duration: 2,
    x: 200,
    rotation: 360,
    backgroundColor: "blue",
    ease: "power2.inOut",
  });

  // Timeline 2
  const timeline2 = gsap.timeline({
    scrollTrigger: {
      trigger: "#your-element-id-2",
      start: "top center",
      end: "bottom center",
      scrub: true,
      markers: true,
    }
  });

  timeline2.fromTo("#your-element-id-2", {
    y: -200,
    rotation: -360,
    backgroundColor: "green",
  }, {
    duration: 2,
    y: 200,
    rotation: 360,
    backgroundColor: "purple",
    ease: "power2.inOut",
  });`
  }
]

const gsapAttribute = [
  {fieldname: "TRANSLATE", value:""},
  {fieldname: "translate-x", value:"x: 200"},
  {fieldname: "translate-x(in percent)", value:"x: '10%'"},
  {fieldname: "translate-y", value:"y: 200"},
  {fieldname: "translate-y(in percent)", value:"y: '10%'"},
  {fieldname: "translate-z", value:"z: 200"},
  {fieldname: "translate-z(in percent)", value:"z: '10%'"},
  {fieldname: "SCALE", value:""},
  {fieldname: "scale-x", value:"scaleX: 0.8"},
  {fieldname: "scale-y", value:"scaleY: 0.8"},
  {fieldname: "scale-z", value:"scaleZ: 0.8"},
  {fieldname: "ROTATE", value:""},
  {fieldname: "rotate-z", value:"rotateX: 180",},
  {fieldname: "rotate-y", value:"rotateY: 180",},
  {fieldname: "rotate-x", value:"rotateZ: 180",},
  {fieldname: "COLOR AND OPACITY", value:""},
  {fieldname: "Opacity", value:"opacity: 0.5"},
  {fieldname: "Border Radius", value:"borderRadius: borderRadius: '10px'"},
  {fieldname: "BackgroundColor", value:"backgroundColor: '#3498db'"},
  {fieldname: "Color", value:"color", type: "color: '#ffffff'"},
  {fieldname: "BorderColor", value:"borderColor: '#2980b9'"},
  {fieldname: "FILTER", value:""},
  {fieldname: "Blur", value:"blur: 0"},
  {fieldname: "Brightness", value:"brightness: 100"},
  {fieldname: "Contrast", value:"contrast: 100"},
  {fieldname: "Grayscale", value:"grayscale: 0"},
  {fieldname: "Hue Rotate", value:"hueRotate: 0"},
  {fieldname: "Invert", value:"invert: 0"},
  {fieldname: "Saturate", value:"saturate: 100"},
  {fieldname: "Sepia", value:"sepia: 0"},
  {fieldname: "EASING", value:""},
  { fieldname: "ease Linear", value: "ease: Linear" },
  { fieldname: "ease Power1", value: "ease: Power1.easeInOut" },
  { fieldname: "ease Power2", value: "ease: Power2.easeInOut" },
  { fieldname: "ease Power3", value: "ease: Power3.easeInOut" },
  { fieldname: "ease Power4", value: "ease: Power4.easeInOut" },
  { fieldname: "ease Back", value: "ease: Back.easeInOut" },
  { fieldname: "ease Elastic", value: "ease: Elastic.easeInOut" },
  { fieldname: "ease Bounce", value: "ease: Bounce.easeInOut" },
  { fieldname: "ease SlowMo", value: "ease: SlowMo.easeInOut" },
  { fieldname: "ease Stepped", value: "ease: Stepped.easeInOut" },
  { fieldname: "ease Circ", value: "ease: Circ.easeInOut" },
  { fieldname: "ease Expo", value: "ease: Expo.easeInOut" },
  { fieldname: "ease Sine", value: "ease: Sine.easeInOut" },
  { fieldname: "ease Quint", value: "ease: Quint.easeInOut" },
  { fieldname: "ease Quart", value: "ease: Quart.easeInOut" },
  { fieldname: "ease Cubic", value: "ease: Cubic.easeInOut" },
  { fieldname: "ease Quad", value: "ease: Quad.easeInOut" },
  { fieldname: "ease InOut", value: "ease: InOut.easeInOut" },
  { fieldname: "ease OutIn", value: "ease: OutIn.easeInOut" },
  { fieldname: "ease None", value: "ease: None" },
  { fieldname: "Pin", value: 'Pin: true' },
];

export function GsapMessage(message){
const oldsection = document.getElementById('copied-to-clipboard-message-lazydev');
if(!oldsection){
const section = document.createElement('section');
section.classList.add('copied-to-clipboard-message-lazydev')
section.id = 'copied-to-clipboard-message-lazydev'
section.innerHTML = `
    <h1 id="copied-to-clipboard-message-lazydev-text" class="copied-to-clipboard-message-lazydev-text">
        ${message}
    </h1>
    <style>
        
.copied-to-clipboard-message-lazydev {

  display: flex;
  width: 100vw;
  height: 8vh;
  gap: 1em;
  flex-grow: 1;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  flex-direction: row;
  overflow-x: hidden;
  overflow-y: hidden;
  background-color: rgba(0, 51, 51, 1);
  padding-top: 5px;
  padding-right: 5px;
  padding-bottom: 5px;
  padding-left: 5px;
  position: fixed;
  transition: 0.2s;
  z-index: 5000;
  color: #f0f0f0;
  opacity: 0;
 }
 
 
 
 .copied-to-clipboard-message-lazydev-text {
 
  flex-grow: 1;
  padding-top: 1%;
  padding-right: 1%;
  padding-bottom: 1%;
  padding-left: 1%;
  text-align: center;
  color: #f0f0f0;
  font-size: 18px;
 }
 
 
    </style>

`
document.body.appendChild(section)
gsap.to(section, {opacity: 1, duration: 0.2});
setTimeout(() => {
  deletemessage();
}, 950);
}
if(oldsection){
  deletemessage();
  setTimeout(() => {
    GsapMessage(message);
  }, 220);
}
function deletemessage(){
  const deletesection = document.getElementById('copied-to-clipboard-message-lazydev');
  gsap.to(deletesection, {opacity: 0, duration: 0.2});
  setTimeout(() => {
    deletesection.remove();
  }, 220);
}
}

export function copyfunction(copyvalue,message){
  const tempInput = document.createElement('input');
  tempInput.value = copyvalue;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);
  GsapMessage(message);
}

export const createGsapContainer = ()=>{
  //-------------------------------------------------//
    const section = document.createElement('section');
    section.id = 'gsap-animation-container'
    section.classList.add('gsap-animation-container')
    section.innerHTML = `
    <div id="gsap-animation-head" class="gsap-animation-head">
    <h4 id="h4-18c71b1a4381" class="H4-18c71b1a4381">
      Gsap Animation
    </h4>
  </div>

  <div id="gsap-animation-body" class="gsap-animation-body">
    <div id="gsap-animation-selector-container" class="gsap-animation-selector-container">
      <div id="gsap-selector-target-icon-container" class="gsap-selector-target-icon-container">
        <div id="gsap-selector-feature" class="gsap-selector-feature" title="target the element using selector">
          <i class="fa-regular fa-circle-dot"></i>
          Use Selector
        </div>

        <select id="select-gsap-template" class="select-gsap-template" selectoption="{gsap.from,Gsap from Template},{gsap.from.ST,Gsap from Scrolltrigger Template},{timeline.from.ST,Timeline from Template},{timeline.from.ST,Timeline from Scrolltrigger Template},{gsap.to,Gsap to Template, selected},{gsap.to.ST,Gsap to Scrolltrigger Template},{timeline.to.ST,Timeline to Template},{timeline.to.ST,Timeline to Scrolltrigger Template},">
          <option value="">Use Gsap Template</option>
        </select>

        <select id="add-gsap-attribute" class="add-gsap-attribute" selectoption="{filter,filter},{xpercent, x (in percent}">
          <option value="filter">Add Gsap Attributes</option>
        </select>
        <div id="gsap-color-picker" class="gsap-selector-feature" title="target the element using selector">
        <i class="fa-solid fa-palette"></i>
          Color picker
        </div>
      </div>

      <div id="gsap-submit-wrapper" class="gsap-submit-wrapper">
        <textarea id="gsap-textarea-code" class="gsap-textarea-code gsap-textarea" rows="12"></textarea>
        <button id="gsap-submit-button" class="gsap-submit-button" type="button">Save and Preview</button>
      </div>
    </div>
  </div>

  `
  document.body.appendChild(section)
  gsap.to(section, {width:700, opacity: 1, duration: 0.3});
  section.style.left = leftStyle;
  section.style.top = topstyle;
  //-------------------------------------------------//
  const textarea = document.getElementById('gsap-textarea-code');
  textarea.value = gsapValue;
  //-------------------------------------------------//
  const templateselect = document.getElementById('select-gsap-template');
  gsaptemplate.forEach(option => {
    const input = document.createElement('option');
    input.value = option.value;
    input.textContent = option.name;
    templateselect.appendChild(input);
  });
  templateselect.addEventListener('change', ()=>{
    const selectvalue = templateselect.value;
    if(selectvalue !== ''){
      textarea.value += `\n `+selectvalue+`\n `;
      gsapValue = textarea.value;
    }
  })
  //-------------------------------------------------//
  const colorpicker = document.getElementById('gsap-color-picker');
  colorpicker.addEventListener('click', ()=>{
    const colorpickercontainer = document.getElementById('color-picker-gsap-container');
    if(!colorpickercontainer){
      const cpcontainer = document.createElement('section');
      cpcontainer.id = `color-picker-gsap-container`;
      cpcontainer.classList.add('color-picker-gsap-container');
      cpcontainer.innerHTML = `
    <div id="gsap-lazydev-color-sample" class="gsap-lazydev-color-sample">
    </div>

    <div id="gsap-lazydev-color-input-container" class="gsap-lazydev-color-input-container">
        <label id="lazydev-label-gsap-color" class="lazydev-label-gsap-color" for="" accesskey="">Color</label>
        <input type="color" id="lazydev-input-gsap-color" class="lazydev-input-gsap-color" value="#4b92aa">
        
        <label id="lazydev-label-gsap-opacity" class="lazydev-label-gsap-opacity" for="" accesskey="">Opacity</label>
        <input type="range" id="lazydev-input-gsap-opacity" class="lazydev-input-gsap-opacity" range-apperance="" min="0" max="1" step="0.01" value="1">
        
        <label id="lazyid18c85f12bd41" class="lazyclass18c85f12bd41" for="" accesskey="">Result</label>
        <input type="text" id="lazydev-label-gsap-result" class="lazydev-label-gsap-result" readonly="">
        
        <button id="lazydev-label-gsap-button-copy" class="lazydev-label-gsap-button-copy" type="button">Copy and Close</button>
    </div>
    <style>
     
.color-picker-gsap-container {

  display: flex;
  width: 300px;
  opacity: 0;
  min-height: 100px;
  gap: 0.2em;
  flex-grow: 1;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  flex-direction: row;
  overflow-x: hidden;
  background-color: rgba(18, 38, 38, 1);
  padding-top: 5px;
  padding-right: 5px;
  padding-bottom: 5px;
  padding-left: 5px;
  top: 200px;
  left: 500px;
  position: fixed;
  transition: 0.2s;
  z-index: 5002;
 }
 
 
 
 .gsap-lazydev-color-sample {
 
  display: flex;
  height: 172px;
  gap: 1em;
  flex-grow: 01;
  justify-content: flex-start;
  flex-direction: column;
  background-color: rgba(0, 255, 255, 1);
  padding-top: 1%;
  padding-right: 1%;
  padding-bottom: 1%;
  padding-left: 1%;
  cursor: move;
 }
 
 
 
 .gsap-lazydev-color-input-container {
 
  display: flex;
  width: 60%;
  min-height: 100px;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  padding-top: 1%;
  padding-right: 1%;
  padding-bottom: 1%;
  padding-left: 1%;
  cursor: auto;
  color: #e6e6e6;
 }
 
 
 
 .lazydev-label-gsap-color {
 
  width: 40%;
  padding-top: 1%;
  padding-right: 1%;
  padding-bottom: 1%;
  padding-left: 1%;
 }
 
 
 
 .lazydev-input-gsap-color {
 
  width: 60%;
  cursor: pointer;
  border-style: none;
  border-color: rgba(0, 0, 0, 1);
 }
 
 
 
 .lazydev-input-gsap-color:hover {
 
  border-color: rgba(0, 0, 0, 1);
 }
 
 
 .lazydev-input-gsap-color:active {
 
  border-color: rgba(0, 0, 0, 1);
 }
 
 
 @media screen and (max-width: 900px) {
 .lazydev-input-gsap-color {
 
  border-color: rgba(0, 0, 0, 1);
 }
 
 }
 @media screen and (max-width: 600px) {
 .lazydev-input-gsap-color {
 
  border-color: rgba(0, 0, 0, 1);
 }
 
 }
 .lazydev-label-gsap-opacity {
 
  width: 100%;
  padding-top: 1%;
  padding-right: 1%;
  padding-bottom: 1%;
  padding-left: 1%;
 }
 
 
 
 .lazydev-input-gsap-opacity {
 
  background-color: #e51f1f;
  border-radius: 0.5em 0.5em 0.5em 0.5em ;
  -webkit-appearance: ;
  apperance: ;
  background: none;
   border: none;
 }
 
 
 .lazydev-input-gsap-opacity::-webkit-slider-runnable-track {
     background-color: 
  background-color: #e51f1f;;
     border-radius: ;
   }
 
   .lazydev-input-gsap-opacity::-webkit-slider-thumb {
     
  -webkit-appearance: ;
  apperance: ;
  background: none;
     width: 1rem;
     height: 1rem;
     background: #ac3e3e;
     border-radius: 50%;
     cursor: pointer;
   }
 
   .lazydev-input-gsap-opacity::-moz-range-thumb {
     width: 2rem;
     height: 2rem;
     background: rgba(172, 62, 62, 1);
     border-radius: 50%;
     cursor: pointer;
   }
 
   .lazydev-input-gsap-opacity:active::-webkit-slider-thumb {
     outline: 0.25rem solid #ca1616;
     outline-offset: 0.5rem;
   }
 
   .lazydev-input-gsap-opacity:active::-webkit-slider-thumb {
     outline: 0.25rem solid #ca1616;
     outline-offset: 0.5rem;
   }
 
 
             
 #lazydev-input-gsap-opacity{
   -webkit-appearance: none;
   appearance: none;
   width: 100%!important;
   height: 10px;
   background: none;
   outline: 0px solid #000000;
   border: none;
 }
 
 #lazydev-input-gsap-opacity::-webkit-slider-runnable-track {
   background-color: #c2c2c2;
   border-radius: 10px;
 }
 
 #lazydev-input-gsap-opacity::-webkit-slider-thumb {
   -webkit-appearance: none;
   appearance: none;
   width: 10px;
   height: 10px;
   background: rgb(105, 105, 105);
   border-radius: 50%;
   cursor: pointer;
 }
 
 #lazydev-input-gsap-opacity:focus::-webkit-slider-thumb {
   outline: 1px solid #8b8b8b;
   outline-offset: 1px;
 }
 
 #lazydev-input-gsap-opacity::-moz-range-thumb {
   width: 20px;
   height: 20px;
   background: rgb(105, 105, 105);
   border-radius: 50%;
   cursor: pointer;
 }
 
 #lazydev-input-gsap-opacity:focus::-moz-range-thumb{
   outline: 3px solid #969696;
   outline-offset: 0.125rem;
 }
 .lazyclass18c85f12bd41 {
 
  width: 100%;
  padding-top: 1%;
  padding-right: 1%;
  padding-bottom: 1%;
  padding-left: 1%;
 }
 
 
 
 .lazydev-label-gsap-button-copy {
 
  background-color: #e51f1f;
  margin-top: 3px;
  border-style: none;
  border-color: rgba(0, 0, 0, 1);
  border-radius: 12px 12px 12px 12px ;
  color: #f0f0f0;
 }
 
 
 
 .lazydev-label-gsap-button-copy:hover {
 
  background-color: rgba(184, 15, 15, 0.84);
  border-color: rgba(0, 0, 0, 1);
 }
 
 
 .lazydev-label-gsap-button-copy:active {
 
  border-color: rgba(0, 0, 0, 1);
 }
 
 
 @media screen and (max-width: 900px) {
 .lazydev-label-gsap-button-copy {
 
  border-color: rgba(0, 0, 0, 1);
 }
 
 }
 @media screen and (max-width: 600px) {
 .lazydev-label-gsap-button-copy {
 
  border-color: rgba(0, 0, 0, 1);
 }
 
 }
    </style>
      `;
      document.body.appendChild(cpcontainer);
      gsap.to(cpcontainer,{opacity:1, duration: 0.2});
      //--------------------------------------//
      const sample = document.getElementById('gsap-lazydev-color-sample');
      dragContainer(cpcontainer,sample);
      //--------------------------------------//
      const color = document.getElementById('lazydev-input-gsap-color');
      color.addEventListener('input', backgroundProcess);
      const opacity = document.getElementById('lazydev-input-gsap-opacity');
      opacity.addEventListener('input', backgroundProcess);
      const result = document.getElementById('lazydev-label-gsap-result');
      function backgroundProcess(){
        let bgColor = color.value;
        let bgopacity = opacity.value;
        let backgroundcolorValue = "rgba(" +
        parseInt(bgColor.slice(1, 3), 16) + ", " +
        parseInt(bgColor.slice(3, 5), 16) + ", " +
        parseInt(bgColor.slice(5, 7), 16) + ", " +
        bgopacity + ")";

      result.value = backgroundcolorValue;
      sample.setAttribute("style", `background-color: ${backgroundcolorValue} !important;`);
      
    }
    //-----------------------------------------------------------------------//
      const copyandclose = document.getElementById('lazydev-label-gsap-button-copy');
      copyandclose.addEventListener('click', ()=>{
        copyfunction(result.value,'Color copied to clipboard')
        gsap.to(cpcontainer,{scaleY:0, opacity: 0, duration: 0.2});
        setTimeout(() => {
          cpcontainer.remove();
        }, 250);
      })
      //--------------------------------------//
    }
  })
  //-------------------------------------------------//
  const gsapattr = document.getElementById('add-gsap-attribute');
  gsapAttribute.forEach(option => {
    const input = document.createElement('option');
    input.value = option.value;
    input.textContent = option.fieldname;
    gsapattr.appendChild(input);
  });
  gsapattr.addEventListener('change', ()=>{
    const selectvalue = gsapattr.value;
    if(selectvalue !== ''){
      // gsapValue = `\n `+selectvalue+',';
      copyfunction(gsapattr.value+',',`${selectvalue} copied to clipboard`)
    }
  })
  //-------------------------------------------------//
  const selectorbutton = document.getElementById('gsap-selector-feature');
  selectorbutton.addEventListener('click', useSelectorFUNC);
  const elementHead = document.getElementById('gsap-animation-head')
  dragContainer(section,elementHead)
  //-------------------------------------------------//
  const submit = document.getElementById('gsap-submit-button');
  submit.addEventListener('click', ()=>{
    const newgsapScript = `${textarea.value}`;
    const newGsap = JSON.stringify({serialNumber: gsapNumberID, script: newgsapScript, datatopstyle:topstyle,dataleftStyle:leftStyle})
    gsap.to(section, {width:0, opacity: 0, duration: 0.3});
    section.remove();
    localStorage.setItem('Lazydev-gsap-animation', newGsap);
    const dataToSend = {task: "ask-reload",}; 
    window.location.reload();
    // window.parent.postMessage(dataToSend, clientUrl);
  });
}

function useSelectorFUNC(state){
const container = document.getElementById('gsap-animation-container');
gsap.to(container, {width:0, opacity: 0, duration: 0.3});
setTimeout(() => {
  container.remove();
  if(state !== 'end'){
  SelectorFUNC()
  }
  else{
    setTimeout(() => {
      createGsapContainer()
    }, 20);
  }
}, 330);
}

function SelectorFUNC(state){

  function selectorStart(){
    //========================================
    const lazydev = document.querySelectorAll('[lazydev]');
    lazydev.forEach(element => {
      element.classList.add('container-idle');
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('click', handleClick);
      element.addEventListener('mouseleave', handleMouseLeave);
    });
    }
    selectorStart()
    function selectorEnd(){
    //========================================
    const lazydev = document.querySelectorAll('[lazydev]');
    lazydev.forEach(element => {
      element.classList.remove('container-idle');
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('click', handleClick);
      element.removeEventListener('mouseleave', handleMouseLeave);
    });
    }
    
    function handleClick(event){
        event.stopPropagation();
        this.classList.remove('container-handle-hover');
        const newselector = `"#${this.id}"`;
        copyfunction(newselector,'Element ID Copied to Clipboard')
        // selectorArray.push(newselector)
        selectorEnd();
        createGsapContainer();
        // selectorbutton.click();
        // selectorbutton.addEventListener('click', selector)
        // selectContainer(this);
    }
    function handleMouseEnter(){
        this.classList.add('container-handle-hover');
        var parentElement = this.parentNode;
    
        while (parentElement !== document.body) {
          parentElement.classList.remove('container-handle-hover');
          parentElement = parentElement.parentNode;
        }
    }
    
    function handleMouseLeave(){
        this.classList.remove('container-handle-hover'); 
    }
}

function dragContainer(elementdrag,dragEl){
  // Dapatkan elemen yang ingin di-drag
const draggableElement = elementdrag;
const elementDrag = dragEl;

let offsetX, offsetY, isDragging = false;

// Fungsi untuk menangani peristiwa 'mousedown'
function dragStart(event) {
    isDragging = true;

    // Simpan posisi awal mouse terhadap elemen
    offsetX = event.clientX - draggableElement.getBoundingClientRect().left;
    offsetY = event.clientY - draggableElement.getBoundingClientRect().top;
}

// Fungsi untuk menangani peristiwa 'mousemove'
function dragMove(event) {
    if (isDragging) {
        // Hitung posisi baru elemen berdasarkan pergerakan mouse
        const width = window.innerWidth;
        const height = window.innerHeight;

        let newLeft = event.clientX - offsetX;
        let newTop = event.clientY - offsetY;

        if(newLeft <= 10){
            newLeft = 11
        }
        if(newLeft >= width*90/100){
            newLeft = width*80/100
        }
        if(newTop <= 1){
            newTop = 2
        }
        if(newTop >= height*90/100){
            newTop = height*80/100
        }

        // Setel posisi elemen
        draggableElement.style.left = newLeft + 'px';
        leftStyle = newLeft + 'px';
        draggableElement.style.top = newTop + 'px';
        topstyle = newTop + 'px';
    }
}

// Fungsi untuk menangani peristiwa 'mouseup'
function dragEnd() {
    isDragging = false;
}

// Tambahkan event listener untuk memulai drag
elementDrag.addEventListener('mousedown', dragStart);

// Tambahkan event listener untuk bergerak selama drag
document.addEventListener('mousemove', dragMove);

// Tambahkan event listener untuk mengakhiri drag
document.addEventListener('mouseup', dragEnd);
}

export function gsapAppendScript(IDnumber){
  gsapNumberID = IDnumber;
  let gsapStorage = localStorage.getItem('Lazydev-gsap-animation');
  if(gsapStorage){
    const gsapStorageString = JSON.parse(gsapStorage);
    if(gsapNumberID !== gsapStorageString.serialNumber){
      localStorage.removeItem('Lazydev-gsap-animation');
      return
    } 
    const script = document.createElement('script');
    script.innerHTML = gsapStorageString.script;
    gsapValue = gsapStorageString.script;
    leftStyle = gsapStorageString.dataleftStyle;
    topstyle = gsapStorageString.datatopstyle;
    document.body.appendChild(script);
  }
}