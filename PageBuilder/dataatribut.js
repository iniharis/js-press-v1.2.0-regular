
import {createClassObject} from './formEditElements.js'

export const data_attribute = [
{name: 'title',classAsk:''},
{name: 'another-class',classAsk:''},
{name: 'alt',classAsk:''},
{name: 'icon-class',classAsk:''},
{name: 'data-css-ignore',classAsk:''},
  {name: 'data-display', 
  cssname: 'display', 
  classAsk:'allclass',
  builderProcess: 'standard-one',
  data_attribute: ['data-display'], 
  baseval: [''],
},
  {name: 'data-width-select',
  classAsk:'allclass',
  builderProcess: 'three-data-no-cssname-2-attribute-primary',
  data_attribute: ['data-width-select','data-width-value','data-width-Parameter'], 
  baseval: ['','','%'],
},
{name: 'data-width-value',classAsk:'allclass'},
{name: 'data-width-Parameter',classAsk:'allclass'},
{name: 'data-height-select',
classAsk:'allclass',
builderProcess: 'three-data-no-cssname-2-attribute-primary',
data_attribute: ['data-height-select','data-height-value','data-height-Parameter'], 
baseval: ['','','%'],
},
{name: 'data-height-value',classAsk:'allclass'},
{name: 'data-height-Parameter',classAsk:'allclass'},
{name: 'data-flex-gap', 
cssname: 'gap', 
classAsk:'allclass',
builderProcess: 'standard-two', 
data_attribute: ['data-flex-gap','data-flex-gap-parameter'],
baseval: ['','em'],
},
{name: 'data-flex-gap-parameter',classAsk:'allclass'},
{name: 'data-flex-grow', 
  cssname: 'flex-grow', 
  classAsk:'allclass',
  builderProcess: 'standard-one',
  data_attribute: ['data-flex-grow'], 
  baseval: [''],
},
{name: 'data-flex-basis', 
cssname: 'flex-basis', 
classAsk:'allclass',
builderProcess: 'standard-two', 
data_attribute: ['data-flex-basis','data-flex-basis-parameter'],
baseval: ['','%'],
},
{name: 'data-flex-basis-parameter',classAsk:'allclass'},
{name: 'data-flex-wrap', 
  cssname: 'flex-wrap', 
  classAsk:'allclass',
  builderProcess: 'standard-one',
  data_attribute: ['data-flex-wrap'], 
  baseval: [''],
},
{name: 'data-justify-content', 
  cssname: 'justify-content', 
  classAsk:'allclass',
  builderProcess: 'standard-one',
  data_attribute: ['data-justify-content'], 
  baseval: [''],
},
{name: 'data-align-items', 
  cssname: 'align-items', 
  classAsk:'allclass',
  builderProcess: 'standard-one',
  data_attribute: ['data-align-items'], 
  baseval: [''],
},
{name: 'data-align-content', 
  cssname: 'align-content', 
  classAsk:'allclass',
  builderProcess: 'standard-one',
  data_attribute: ['data-align-content'], 
  baseval: [''],
},
{name: 'data-flex-shrink', 
  cssname: 'flex-shrink', 
  classAsk:'allclass',
  builderProcess: 'standard-one',
  data_attribute: ['data-flex-shrink'], 
  baseval: [''],
},
{name: 'data-flex-order', 
  cssname: 'order', 
  classAsk:'allclass',
  builderProcess: 'standard-one',
  data_attribute: ['data-flex-order'], 
  baseval: [''],
},
{name: 'data-flex-direction', 
  cssname: 'flex-direction', 
  classAsk:'allclass',
  builderProcess: 'standard-one',
  data_attribute: ['data-flex-direction'], 
  baseval: [''],
},
{name: 'data-overflow-x', 
  cssname: 'overflow-x', 
  classAsk:'allclass',
  builderProcess: 'standard-one',
  data_attribute: ['data-overflow-x'], 
  baseval: [''],
},
{name: 'data-overflow-y', 
  cssname: 'overflow-y', 
  classAsk:'allclass',
  builderProcess: 'standard-one',
  data_attribute: ['data-overflow-y'], 
  baseval: [''],
},
{name: 'data-background-color-result', 
  cssname: 'background-color',
  css_special: '!important', 
  classAsk:'allclass',
  builderProcess: 'standard-two-special-one-check',
  data_attribute: ['data-background-color-result','data-background-none'],
  baseval: ['',''],
},
{name: 'data-background-color-input',classAsk:'allclass'},
{name: 'data-background-opacity-input',classAsk:'allclass'},
{name: 'data-background-none',classAsk:''},
{name: 'data-margin-parameter',classAsk:'allclass'},
{name: 'data-margin-check',classAsk:'allclass'},

{name: 'data-margin-top', 
  cssname: 'margin-top',
  classAsk:'allclass',
  builderProcess: 'standard-two-check',
  data_attribute: ['data-margin-top','data-margin-parameter','data-margin-check'],
  baseval: ['','px',''],
},
{name: 'data-margin-right', 
  cssname: 'margin-right',
  classAsk:'allclass',
  builderProcess: 'standard-two-check',
  data_attribute: ['data-margin-right','data-margin-parameter','data-margin-check'],
  baseval: ['','px',''],
},
{name: 'data-margin-bottom', 
  cssname: 'margin-bottom',
  classAsk:'allclass',
  builderProcess: 'standard-two-check',
  data_attribute: ['data-margin-bottom','data-margin-parameter','data-margin-check'],
  baseval: ['','px',''],
},
{name: 'data-margin-left', 
  cssname: 'margin-left',
  classAsk:'allclass',
  builderProcess: 'standard-two-check',
  data_attribute: ['data-margin-left','data-margin-parameter','data-margin-check'],
  baseval: ['','px',''],
},
{name: 'data-padding-parameter',classAsk:'allclass'},
{name: 'data-padding-check',classAsk:'allclass'},

{name: 'data-padding-top', 
  cssname: 'padding-top',
  classAsk:'allclass',
  builderProcess: 'standard-two-check',
  data_attribute: ['data-padding-top','data-padding-parameter','data-padding-check'],
  baseval: ['','px',''],
},
{name: 'data-padding-right', 
  cssname: 'padding-right',
  classAsk:'allclass',
  builderProcess: 'standard-two-check',
  data_attribute: ['data-padding-right','data-padding-parameter','data-padding-check'],
  baseval: ['','px',''],
},
{name: 'data-padding-bottom', 
  cssname: 'padding-bottom',
  classAsk:'allclass',
  builderProcess: 'standard-two-check',
  data_attribute: ['data-padding-bottom','data-padding-parameter','data-padding-check'],
  baseval: ['','px',''],
},
{name: 'data-padding-left', 
  cssname: 'padding-left',
  classAsk:'allclass',
  builderProcess: 'standard-two-check',
  data_attribute: ['data-padding-left','data-padding-parameter','data-padding-check'],
  baseval: ['','px',''],
},
{name: 'data-position-check',classAsk:''},
{name: 'data-position-parameter',classAsk:'allclass'},

{name: 'data-position-top', 
  cssname: 'top',
  classAsk:'allclass',
  builderProcess: 'primary-two-one-check',
  data_attribute: ['data-position-top','data-position-parameter','data-position-check'],
  baseval: ['','',''],
},
{name: 'data-position-right', 
  cssname: 'right',
  classAsk:'allclass',
  builderProcess: 'primary-two-one-check',
  data_attribute: ['data-position-right','data-position-parameter','data-position-check'],
  baseval: ['','',''],
},
{name: 'data-position-bottom', 
  cssname: 'bottom',
  classAsk:'allclass',
  builderProcess: 'primary-two-one-check',
  data_attribute: ['data-position-bottom','data-position-parameter','data-position-check'],
  baseval: ['','',''],
},
{name: 'data-position-left', 
  cssname: 'left',
  classAsk:'allclass',
  builderProcess: 'primary-two-one-check',
  data_attribute: ['data-position-left','data-position-parameter','data-position-check'],
  baseval: ['','',''],
},
{name: 'data-element-position', 
  cssname: 'position', 
  classAsk:'allclass',
  builderProcess: 'standard-one',
  data_attribute: ['data-element-position'], 
  baseval: [''],
},
{name: 'data-element-transition', 
  cssname: 'transition', 
  classAsk:'base',
  css_special: 's',
  builderProcess: 'standard-one',
  data_attribute: ['data-element-transition'], 
  baseval: [''],
},
{name: 'data-element-cursor', 
  cssname: 'cursor', 
  classAsk:'allclass',
  builderProcess: 'standard-one',
  data_attribute: ['data-element-cursor'], 
  baseval: [''],
},
{name: 'data-element-opacity', 
  cssname: 'opacity', 
  classAsk:'allclass',
  builderProcess: 'standard-one',
  data_attribute: ['data-element-opacity'], 
  baseval: [''],
},
{name: 'data-element-z-index', 
  cssname: 'z-index', 
  classAsk:'allclass',
  builderProcess: 'standard-one',
  data_attribute: ['data-element-z-index'], 
  baseval: [''],
},
{name: 'data-element-clip-path', 
  cssname: 'clip-path', 
  classAsk:'allclass',
  builderProcess: 'standard-one',
  data_attribute: ['data-element-clip-path'], 
  baseval: [''],
},
{name: 'data-custom-css', 
  classAsk:'allclass',
  builderProcess: 'blank-one',
  data_attribute: ['data-custom-css'], 
  baseval: [''],
},
{name: 'data-visibility-check',classAsk:''},
{name: 'data-visibility-hide',classAsk:'alldevice'},
{name: 'data-custom-js',classAsk:''},
{name: 'data-customCode-css',classAsk:''},

{name: 'data-background-image',classAsk:'allclass',builderProcess: 'data-background-advance'},
{name: 'data-background-image-size',classAsk:'allclass',builderProcess: 'data-background-advance'},
{name: 'data-background-image-position-x',classAsk:'allclass',builderProcess: 'data-background-advance'},
{name: 'data-background-image-position-y',classAsk:'allclass',builderProcess: 'data-background-advance'},
{name: 'data-background-image-repeat',classAsk:'allclass',builderProcess: 'data-background-advance'},
{name: 'data-background-gradient-result-1',classAsk:'allclass',builderProcess: 'data-background-advance'},
{name: 'data-background-gradient-location-1',classAsk:'allclass',builderProcess: 'data-background-advance'},
{name: 'data-background-gradient-result-2',classAsk:'allclass',builderProcess: 'data-background-advance'},
{name: 'data-background-gradient-location-2',classAsk:'allclass',builderProcess: 'data-background-advance'},
{name: 'data-background-gradient-type',classAsk:'allclass',builderProcess: 'data-background-advance'},
{name: 'data-background-gradient-angle',classAsk:'allclass',builderProcess: 'data-background-advance'},

{name: 'data-outline-check',classAsk:''},

{name: 'data-outline-style', 
  cssname: 'outline-style', 
  classAsk:'',
  builderProcess: 'standard-one-check',
  data_attribute: ['data-outline-style','data-outline-check'], 
  baseval: ['',''],
},
{name: 'data-outline-width', 
  cssname: 'outline-width', 
  css_special: 'em', 
  classAsk:'',
  builderProcess: 'standard-one-check',
  data_attribute: ['data-outline-width','data-outline-check'], 
  baseval: ['0.25',''],
},
{name: 'data-outline-offset', 
  cssname: 'outline-offset',
  css_special: 'em',  
  classAsk:'',
  builderProcess: 'standard-one-check',
  data_attribute: ['data-outline-offset','data-outline-check'], 
  baseval: ['',''],
},
{name: 'data-outline-color', 
  cssname: 'outline-color', 
  classAsk:'',
  builderProcess: 'standard-background-opacity-check',
  data_attribute: ['data-outline-color','data-outline-opacity','data-outline-check'], 
  baseval: ['#000000','1',''],
},
{name: 'data-outline-opacity',classAsk:''},
{name: 'data-outline-check',classAsk:''},

{name: 'data-outline-style', 
  cssname: 'outline-style', 
  classAsk:'',
  builderProcess: 'standard-one-check',
  data_attribute: ['data-outline-style','data-outline-check'], 
  baseval: ['',''],
},
{name: 'data-border-parameter',classAsk:'allclass'},
{name: 'data-border-check',classAsk:''},

{name: 'data-border-type', 
  cssname: 'border-style', 
  classAsk:'allclass',
  oneClassCheck: true,
  builderProcess: 'standard-one-check',
  data_attribute: ['data-border-type','data-border-check'], 
  baseval: ['',''],
},
{name: 'data-border-top', 
  cssname: 'border-top-width', 
  classAsk:'allclass',
  oneClassCheck: true,
  builderProcess: 'primary-two-one-check',
  data_attribute: ['data-border-top','data-border-parameter','data-border-check'],
  baseval: ['','rem',''],
},
{name: 'data-border-right', 
  cssname: 'border-right-width', 
  classAsk:'allclass',
  oneClassCheck: true,
  builderProcess: 'primary-two-one-check',
  data_attribute: ['data-border-right','data-border-parameter','data-border-check'],
  baseval: ['','rem',''],
},
{name: 'data-border-bottom', 
  cssname: 'border-bottom-width', 
  classAsk:'allclass',
  oneClassCheck: true,
  builderProcess: 'primary-two-one-check',
  data_attribute: ['data-border-bottom','data-border-parameter','data-border-check'],
  baseval: ['','rem',''],
},
{name: 'data-border-left', 
  cssname: 'border-left-width', 
  classAsk:'allclass',
  oneClassCheck: true,
  builderProcess: 'primary-two-one-check',
  data_attribute: ['data-border-left','data-border-parameter','data-border-check'],
  baseval: ['','rem',''],
},
{name: 'data-border-color', 
  cssname: 'border-color', 
  classAsk:'allclass',
  oneClassCheck: true,
  builderProcess: 'standard-background-opacity-check',
  data_attribute: ['data-border-color','data-border-opacity','data-border-check'], 
  baseval: ['','1',''],
},
{name: 'data-border-opacity',classAsk:'allclass'},

{name: 'data-border-radius-parameter',classAsk:'allclass'},
{name: 'data-border-radius-top',classAsk:'allclass'},
{name: 'data-border-radius-right',classAsk:'allclass'},
{name: 'data-border-radius-bottom',classAsk:'allclass'},
{name: 'data-border-radius-left',classAsk:'allclass'},

{name: 'data-border-radius-check', 
  cssname: 'border-radius', 
  classAsk:'allclass',
  builderProcess: 'parameter-four-check',
  data_attribute: ['data-border-radius-parameter','data-border-radius-top','data-border-radius-right','data-border-radius-bottom','data-border-radius-left','data-border-radius-check'], 
  baseval: ['px','0','0','0','0',''],
},
{name: 'data-box-shadow-horizontal',classAsk:'allclass'},
{name: 'data-box-shadow-vertical',classAsk:'allclass'},
{name: 'data-box-shadow-blur',classAsk:'allclass'},
{name: 'data-box-shadow-spread',classAsk:'allclass'},
{name: 'data-box-shadow-color',classAsk:'allclass'},
{name: 'data-box-shadow-opacity',classAsk:'allclass'},
{name: 'data-box-shadow-set',classAsk:'allclass'},
{name: 'data-box-shadow-check',classAsk:'allclass',builderProcess: 'box-shadow-check',},
{name: 'data-css-filter-check',classAsk:''},
{name: 'data-css-filter-blur',classAsk:'allclass'},
{name: 'data-css-filter-Brightness',classAsk:'allclass'},
{name: 'data-css-filter-Contrast',classAsk:'allclass'},
{name: 'data-css-filter-Greyscale',classAsk:'allclass'},
{name: 'data-css-filter-hue',classAsk:'allclass'},
{name: 'data-css-filter-Invert',classAsk:'allclass'},
{name: 'data-css-filter-Saturate',classAsk:'allclass'},
{name: 'data-css-filter-Sepia',classAsk:'allclass'},

{name: 'data-font-family', 
  cssname: 'font-family', 
  classAsk:'base',
  builderProcess: 'standard-one',
  data_attribute: ['data-font-family'], 
  baseval: [''],
},
{name: 'data-text-align', 
  cssname: 'text-align', 
  classAsk:'allclass',
  builderProcess: 'standard-one',
  data_attribute: ['data-text-align'], 
  baseval: [''],
},
{name: 'data-font-color', 
  cssname: 'color', 
  classAsk:'allclass',
  builderProcess: 'standard-one',
  data_attribute: ['data-font-color'],
  baseval: [''],
},
{name: 'data-font-weight', 
  cssname: 'font-weight', 
  classAsk:'allclass',
  builderProcess: 'standard-one',
  data_attribute: ['data-font-weight'], 
  baseval: [''],
},
{name: 'data-font-style', 
  cssname: 'font-style', 
  classAsk:'basehover',
  builderProcess: 'standard-one',
  data_attribute: ['data-font-style'], 
  baseval: [''],
},
{name: 'data-text-decoration', 
  cssname: 'text-decoration', 
  classAsk:'basehover',
  builderProcess: 'standard-one',
  data_attribute: ['data-text-decoration'], 
  baseval: [''],
},
{name: 'data-text-transform', 
  cssname: 'text-transform', 
  classAsk:'basehover',
  builderProcess: 'standard-one',
  data_attribute: ['data-text-transform'], 
  baseval: [''],
},
{name: 'data-font-smoothing', 
  cssname: 'font-smoothing', 
  classAsk:'base',
  builderProcess: 'standard-one',
  data_attribute: ['data-font-smoothing'], 
  baseval: [''],
},
{name: 'data-font-size', 
cssname: 'font-size', 
classAsk:'allclass',
builderProcess: 'standard-two', 
data_attribute: ['data-font-size','data-font-parameter'],
baseval: ['','px'],
},
{name: 'data-font-parameter',classAsk:'allclass'},

{name: 'data-word-spacing', 
  cssname: 'word-spacing', 
  classAsk:'basehover',
  css_special: 'em',
  builderProcess: 'standard-one',
  data_attribute: ['data-word-spacing'], 
  baseval: [''],
},
{name: 'data-line-height', 
  cssname: 'line-height', 
  classAsk:'base',
  css_special: 'em',
  builderProcess: 'standard-one',
  data_attribute: ['data-line-height'], 
  baseval: [''],
},
{name: 'data-letter-spacing', 
  cssname: 'letter-spacing', 
  classAsk:'base',
  css_special: 'em',
  builderProcess: 'standard-one',
  data_attribute: ['data-letter-spacing'], 
  baseval: [''],
},
{name: 'data-text-shadow-check',classAsk:'base'},
{name: 'data-text-shadow-horizontal',classAsk:'base'},
{name: 'data-text-shadow-vertical',classAsk:'base'},
{name: 'data-text-shadow-blur',classAsk:'base'},
{name: 'data-text-shadow-color',classAsk:'base'},
{name: 'data-text-shadow-opacity',classAsk:'base'},

{name: 'data-image-render', 
  cssname: 'image-rendering', 
  classAsk:'base',
  builderProcess: 'standard-one',
  data_attribute: ['data-image-render'], 
  baseval: [''],
},
{name: 'data-image-orientation', 
  cssname: 'image-orientation', 
  classAsk:'base',
  builderProcess: 'standard-one',
  data_attribute: ['data-image-orientation'], 
  baseval: [''],
},

{name: 'data-object-fit', 
  cssname: 'object-fit', 
  classAsk:'alldevice',
  builderProcess: 'standard-one',
  data_attribute: ['data-object-fit'], 
  baseval: [''],
},

{name: 'data-image-x-axis', 
cssname: 'object-position',
css_additional: '% ',
classAsk:'alldevice',
targetAttribute_oriented: true,
builderProcess: 'standard-two', 
data_attribute: ['data-image-x-axis','data-image-y-axis'],
baseval: ['0','0'],
},
{name: 'data-image-y-axis',classAsk:'alldevice'},

{name: 'data-list-image', 
  cssname: 'list-style-image', 
  classAsk:'base',
  css_before:`url('`,
  css_after: `')`,
  builderProcess: 'standard-one',
  data_attribute: ['data-list-image'], 
  baseval: [''],
},
{name: 'data-list-position', 
  cssname: 'list-style-position', 
  classAsk:'base',
  builderProcess: 'standard-one',
  data_attribute: ['data-list-position'], 
  baseval: [''],
},
{name: 'data-list-style', 
  cssname: 'list-style-type', 
  classAsk:'base',
  builderProcess: 'standard-one',
  data_attribute: ['data-list-style'], 
  baseval: [''],
},
{name: 'data-list-style2', 
  cssname: 'list-style-type', 
  classAsk:'base',
  builderProcess: 'standard-one',
  data_attribute: ['data-list-style2'], 
  baseval: [''],
},

{name: 'data-transform-check',classAsk:'allclass',builderProcess: 'element-transform-check'},
{name: 'data-transform-translate-x',classAsk:'allclass'},
{name: 'data-transform-translate-y',classAsk:'allclass'},
{name: 'data-transform-translate-z',classAsk:'allclass'},
{name: 'data-transform-rotate',classAsk:'allclass'},
{name: 'data-transform-rotate-y',classAsk:'allclass'},
{name: 'data-transform-rotate-x',classAsk:'allclass'},
{name: 'data-transform-scale-x',classAsk:'allclass'},
{name: 'data-transform-scale-y',classAsk:'allclass'},
{name: 'data-transform-scale-z',classAsk:'allclass'},
{name: 'data-transform-skew-x',classAsk:'allclass'},
{name: 'data-transform-skew-y',classAsk:'allclass'},
{name: 'data-transform-perspective',classAsk:'allclass'},
{name: 'data-transform-perspective-x',classAsk:'allclass'},
{name: 'data-transform-perspective-y',classAsk:'allclass'},
{name: 'data-transform-matrix',classAsk:'allclass'},

{name: 'data-table-collapse-', 
  cssname: 'border-collapse', 
  classAsk:'base',
  builderProcess: 'standard-one',
  data_attribute: ['data-table-collapse-'], 
  baseval: [''],
},
{name: 'data-th-styling',classAsk:'allclass'},
{name: 'data-tr-styling',classAsk:'allclass'},
{name: 'data-td-styling',classAsk:'allclass'},
{name: 'data-gsap',classAsk:'base'},

{name: 'data-box-sizing', 
  cssname: 'box-sizing', 
  classAsk:'base',
  builderProcess: 'standard-one',
  data_attribute: ['data-box-sizing'], 
  baseval: [''],
},
];

const data_attribute_add_class=()=>{
  data_attribute.forEach(element => {
    element.classArr = createClassObject(element.classAsk);
  });
  // console.log(data_attribute);
}

data_attribute_add_class();

function SeElementtAttributes(lazydev,dataBackground){
   let target = document.querySelector(`[lazydev="${lazydev}"]`);
   let identityTarget = target.getAttribute('data-identity');
   let tagName =  target.tagName;
//--- AUTO ADD---//
   //--------------------------------------------------------------//
   data_attribute.forEach(data => {
    data.classArr.forEach(element => {
      let dataname = `${data.name}-${element}`;
      if(element === 'base' || element === ''){
        dataname = `${data.name}`;
      }
      target.setAttribute(dataname, "");
    });
   });
//--------------------------------------------------------------//
   //tambahkan atribut kosong
            //base
            // target.setAttribute("onclick", "");
            //
            //Tablet
            //
            //Mobile
            //
            //hover
            //
            //Active
            //


    switch(identityTarget){
        case "Main Container":
            target.setAttribute("data-box-sizing", "border-box");
            target.setAttribute("data-display", "flex");
            target.setAttribute("data-flex-direction", "row");
            target.setAttribute("data-flex-gap", "1");
            target.setAttribute("data-flex-grow", "1");
            target.setAttribute("data-width-select", "width");
            target.setAttribute("data-width-Parameter", "%");
            target.setAttribute("data-width-value", "100");
            target.setAttribute("data-height-select", "min-height");
            target.setAttribute("data-height-Parameter", "px");
            target.setAttribute("data-height-value", "100");
            target.setAttribute("data-overflow-x", "hidden");
            target.setAttribute("data-overflow-y", "");
            target.setAttribute("data-flex-wrap", "wrap"); // Belum ada Flex Wrap
            target.setAttribute("data-justify-content", "flex-start");
            target.setAttribute("data-align-items", "flex-start");
            target.setAttribute("data-align-content", "flex-start");
            target.setAttribute("data-background-color-input", `${dataBackground}`);
            target.setAttribute("data-background-opacity-input", `1`);
            target.setAttribute("data-background-color-result", `${dataBackground}`);
            target.setAttribute("data-padding-check", "true");
            target.setAttribute("data-padding-parameter", "px");
            target.setAttribute("data-padding-top", "5");
            target.setAttribute("data-padding-right", "5");
            target.setAttribute("data-padding-bottom", "5");
            target.setAttribute("data-padding-left", "5");
            target.setAttribute("data-element-transition", "0.2");
            target.setAttribute("data-onClick", "");

          break;
      
        case "Child Container":
            target.setAttribute("data-box-sizing", "border-box");
            target.setAttribute("data-display", "flex");
            target.setAttribute("data-flex-direction", "column");
            target.setAttribute("data-justify-content", "flex-start");
            target.setAttribute("data-flex-gap", "1");
            target.setAttribute("data-flex-grow", "1");
            target.setAttribute("data-flex-shrink", "");
            target.setAttribute("data-flex-order", "");
            target.setAttribute("data-height-select", "");
            target.setAttribute("data-height-Parameter", "");
            target.setAttribute("data-height-value", "");
            target.setAttribute("data-background-color-input", `#43a3a3`);
            target.setAttribute("data-background-opacity-input", `0.53`);
            target.setAttribute("data-background-color-result", `rgba(67, 163, 163, 0.53)`);
            target.setAttribute("data-padding-check", "true");
            target.setAttribute("data-padding-parameter", "%");
            target.setAttribute("data-padding-right", "1");
            target.setAttribute("data-padding-top", "1");
            target.setAttribute("data-padding-bottom", "1");
            target.setAttribute("data-padding-left", "1");
            target.setAttribute("data-onClick", "");

          break;
          case "Wrapper":
            target.setAttribute("data-onClick", "");
          case "HTML":
            target.setAttribute("data-display", "flex");
            target.setAttribute("data-box-sizing", "border-box");
            target.setAttribute("data-flex-direction", "column");
            target.setAttribute("data-justify-content", "center");
            target.setAttribute("data-align-items", "center");
            target.setAttribute("data-flex-gap", "1");
            target.setAttribute("data-flex-grow", "1");
            target.setAttribute("data-flex-shrink", "");
            target.setAttribute("data-flex-order", "");
            target.setAttribute("data-height-select", "min-height");
            target.setAttribute("data-height-Parameter", "vh");
            target.setAttribute("data-height-value", "30");
            target.setAttribute("data-background-color-input", `#00ffff`);
            target.setAttribute("data-background-opacity-input", `0.842`);
            target.setAttribute("data-background-color-result", `rgba(0, 255, 255, 0.842)`);
            target.setAttribute("data-padding-check", "true");
            target.setAttribute("data-padding-parameter", "%");
            target.setAttribute("data-padding-right", "1");
            target.setAttribute("data-padding-top", "1");
            target.setAttribute("data-padding-bottom", "1");
            target.setAttribute("data-padding-left", "1");

          break;
          case "Image":
            target.setAttribute("data-display", "block");
            target.setAttribute("data-width-select", "width");
            target.setAttribute("data-width-Parameter", "px");
            target.setAttribute("data-width-value", "300");
            target.setAttribute("data-height-select", "height");
            target.setAttribute("data-height-Parameter", "px");
            target.setAttribute("data-height-value", "300");
            break;
          case "Table":
              target.setAttribute("data-display", "block");
              target.setAttribute("data-width-select", "width");
              target.setAttribute("data-width-Parameter", "%");
              target.setAttribute("data-width-value", "100");
              target.setAttribute("data-border-check", "true");
              target.setAttribute("data-border-type", "solid");
              target.setAttribute("data-border-top", "1");
              target.setAttribute("data-border-right", "1");
              target.setAttribute("data-border-bottom", "1");
              target.setAttribute("data-border-left", "1");
              target.setAttribute("data-border-color", "#ccc");
              target.setAttribute("data-border-opacity", "1");
              target.setAttribute("data-border-parameter", "px");
              target.setAttribute("data-margin-check", "true");
              target.setAttribute("data-margin-parameter", "px");
              target.setAttribute("data-margin-top", "10");
              target.setAttribute("data-margin-right", "10");
              target.setAttribute("data-margin-bottom", "10");
              target.setAttribute("data-margin-left", "10");
              target.setAttribute("data-th-styling", `
background-color: #333;
color: white;
padding: 10px;
text-align: left;
border: 1px solid #ccc;
padding: 8px;
width: 10%;`);
              target.setAttribute("data-tr-styling", "background-color: rgba(194, 193, 193, 1);");
              target.setAttribute("data-td-styling", `border: 2px solid #cccccc;
padding: 1px;
width: auto;`);

          break;
          case `Iframe`:
            target.setAttribute("data-width-select", "max-width");
            target.setAttribute("data-width-Parameter", "%");
            target.setAttribute("data-width-value", "100");
            target.setAttribute("data-height-select", "height");
            target.setAttribute("data-height-Parameter", "px");
            target.setAttribute("data-height-value", "438");
          break;
          case "Header Text":
            target.setAttribute("data-width-select", "max-width");
            target.setAttribute("data-width-Parameter", "%");
            target.setAttribute("data-width-value", "100");
            target.setAttribute("data-padding-parameter", "%");
            target.setAttribute("data-padding-check", "true");
            target.setAttribute("data-padding-right", "1");
            target.setAttribute("data-padding-top", "1");
            target.setAttribute("data-padding-bottom", "1");
            target.setAttribute("data-padding-left", "1");
            switch (tagName) {
              case `A`:
                target.setAttribute("data-href", "");
                target.setAttribute("data-href-target", "");
                break;
            
              default:
                break;
            }
            
          break;
          case "icon":
            target.setAttribute("data-font-size", "35");
            target.setAttribute("data-font-parameter", "px");
          break;
          case "Content Text":
            target.setAttribute("data-width-select", "max-width");
            target.setAttribute("data-width-Parameter", "%");
            target.setAttribute("data-width-value", "100");
            target.setAttribute("data-padding-parameter", "%");
            target.setAttribute("data-padding-check", "true");
            target.setAttribute("data-padding-right", "1");
            target.setAttribute("data-padding-top", "1");
            target.setAttribute("data-padding-bottom", "1");
            target.setAttribute("data-padding-left", "1");

          break;
          case "Submit":
            target.setAttribute("type", "button");
            target.setAttribute("data-onClick", "");
          break;
          case "List":
            target.setAttribute("data-list-image", "");
            target.setAttribute("data-list-position", "");
          break;

          case "Formfield":
            let type = target.getAttribute("type");
            switch (type) {
              case "range":
                target.setAttribute("data-rangecss", "");
                target.setAttribute("range-apperance", "none");
                target.setAttribute("data-width-select", "width");
                target.setAttribute("data-width-Parameter", "%");
                target.setAttribute("data-width-value", "100");
                target.setAttribute("data-height-select", "height");
                target.setAttribute("data-height-Parameter", "px");
                target.setAttribute("data-height-value", "10");
                target.setAttribute("data-background-color-result", "rgba(255, 255, 255, 0.83)");
                target.setAttribute("data-border-radius-check", "true");
                target.setAttribute("data-border-radius-parameter", "em");
                target.setAttribute("data-border-radius-top", "0.5");
                target.setAttribute("data-border-radius-right", "0.5");
                target.setAttribute("data-border-radius-bottom", "0.5");
                target.setAttribute("data-border-radius-left", "0.5");
                target.setAttribute("data-outline-check", "true");
                target.setAttribute("data-outline-color", "#ea3e80");
                target.setAttribute("data-outline-opacity", "1");
                target.setAttribute("data-outline-style", "solid");
                target.setAttribute("data-outline-width", "0");
                //
                target.setAttribute("data-bullet-color", "#13c3c0");
                target.setAttribute("data-bullet-radius", "50");
                target.setAttribute("data-bullet-outline-size", "0.25");
                target.setAttribute("data-bullet-outline-style", "solid");
                target.setAttribute("data-bullet-outline-color", "#00B39590");
                target.setAttribute("data-bullet-outline-offset", "0.25");
                //
                break;
            
              default:
                break;
            }
          break;
      
        default:
          // console.log("Ini bukan Main Container atau Child Container");
          break;
      }
      //=======================================================================
      //Berdasarkan TagName
      switch (tagName) {
        case `LABEL`:
          target.setAttribute("for", "");
          target.setAttribute("accesskey", "");
          break;
          case `TEXTAREA`:
            target.setAttribute("data-width-select", "width");
            target.setAttribute("data-width-Parameter", "%");
            target.setAttribute("data-width-value", "100");
            target.setAttribute("data-height-select", "height");
            target.setAttribute("data-height-Parameter", "px");
            target.setAttribute("data-height-value", "200");
            break;
          case `SELECT`:
            target.setAttribute("selectoption", "{Value1,Name1},{Value2,Name2,selected},{Value3,Name3}");
            break;
          case `UL`:
            target.setAttribute("data-list-style", "square");
          break;
          case `OL`:
            target.setAttribute("data-list-style2", "decimal");
          break;
        default:
          break;
       }
}

export { SeElementtAttributes };