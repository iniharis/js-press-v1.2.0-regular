let fieldset_count = 0;
let custom_table_name = '';
let table_ID = 0;
const table_name_input = document.getElementById('js-ct-name');
table_name_input.addEventListener('input', ()=>{
    custom_table_name = table_name_input.value
})
let custom_table_type = 'custom_post';
const table_type_input = document.getElementById('js-ct-type');
table_type_input.addEventListener('input', ()=>{
    custom_table_type = table_type_input.value
})
const Fieldset_Table = [];
const fieldsetsOption = [
    {
        value : 'Text',
        class : 'fieldset-18f19073eb41',
        content : `
        <legend id="legend-18f1907e6ca1" class="LEGEND-18f1907e6ca1" lazydev="18f1907e6ca1">
        Fieldset_text Fieldsets(text)
        </legend>
        <div id="custom_fieldset_option" class="custom_fieldset_option" lazydev="18f1972bd4f1">
            <i id="option-go-up" class="option-go-up  fa fa-chevron-up" lazydev="18f197386311">
            
            </i>
      
            <i id="option-go-down" class="option-go-down fa fa-chevron-down" lazydev="18f1977a3b71">
            
            </i>
      
            <i id="option-delete" class="option-delete  fa-solid fa-xmark" lazydev="18f1977adbe1">
            
            </i>
      
            
        </div>
        <label id="lazyid18f19038aea1" class="lazyclass18f19038aea1" lazydev="18f19038aea1" for="" accesskey="">
        Fieldset name : 
        </label>
  
        <input type="text" id="lazyid18f1903c0721" class="lazyclass18f1903c0721" lazydev="18f1903c0721">
        <label id="lazyid18f1905d43a1" class="lazyclass18f1905d43a1" lazydev="18f1905d43a1" for="" accesskey="">
        Fieldset label : 
        </label>
  
        <input type="text" id="lazyid18f1906340a1" class="lazyclass18f1906340a1" lazydev="18f1906340a1">
        <label id="lazyid18f190488211" class="lazyclass18f190488211" lazydev="18f190488211" for="" accesskey="">
        Mandatory : 
        </label>
  
        <select id="lazyid18f1904a6891" class="lazyclass18f1904a6891" lazydev="18f1904a6891" selectoption="{true,TRUE,selected},{false,FALSE}">
        <option value="true">
        TRUE
        </option>
  
        <option value="false">
        FALSE
        </option>
  
        
        </select>
  
        <label id="lazyid18f191c08a11" class="lazyclass18f191c08a11" lazydev="18f191c08a11" for="" accesskey="">
        Default value : 
        </label>
  
        <input type="text" id="lazyid18f191c14a11" class="lazyclass18f191c14a11" lazydev="18f191c14a11">
        `,
    },{
        value : 'Number',
        class : 'lazyclass18f1913459d1',
        content : `
        <legend id="lazyid18f191345841" class="lazyclass18f191345841" lazydev="18f191345841">
        Fieldset_number Fieldsets(number)
        </legend>

        <div id="custom_fieldset_option" class="custom_fieldset_option" lazydev="18f1972bd4f1">
            <i id="option-go-up" class="option-go-up  fa fa-chevron-up" lazydev="18f197386311">
            
            </i>
      
            <i id="option-go-down" class="option-go-down fa fa-chevron-down" lazydev="18f1977a3b71">
            
            </i>
      
            <i id="option-delete" class="option-delete  fa-solid fa-xmark" lazydev="18f1977adbe1">
            
            </i>
      
            
        </div>
  
        <label id="lazyid18f191345881" class="lazyclass18f191345881" lazydev="18f191345881" for="" accesskey="">
        Fieldset name : 
        </label>
  
        <input type="text" id="lazyid18f1913458c1" class="lazyclass18f1913458c1" lazydev="18f1913458c1">
        <label id="lazyid18f191c6e011" class="lazyclass18f191c6e011" lazydev="18f191c6e011" for="" accesskey="">
        Fieldset label : 
        </label>
  
        <input type="text" id="lazyid18f191cb8711" class="lazyclass18f191cb8711" lazydev="18f191cb8711">
        <label id="lazyid18f191345901" class="lazyclass18f191345901" lazydev="18f191345901" for="" accesskey="">
        Mandatory : 
        </label>
  
        <select id="lazyid18f191345941" class="lazyclass18f191345941" lazydev="18f191345941" selectoption="{true,TRUE,selected},{false,FALSE}">
        <option value="true">
        TRUE
        </option>
  
        <option value="false">
        FALSE
        </option>
  
        
        </select>
  
        <label id="lazyid18f191345971" class="lazyclass18f191345971" lazydev="18f191345971" for="" accesskey="">
        Minimum value : 
        </label>
  
        <input type="Number" id="input-18f1913d81a1" class="INPUT-18f1913d81a1" lazydev="18f1913d81a1">
        <label id="lazyid18f1914ece11" class="lazyclass18f1914ece11" lazydev="18f1914ece11" for="" accesskey="">
        Maximum value : 
        </label>
  
        <input type="Number" id="lazyid18f1914f5911" class="lazyclass18f1914f5911" lazydev="18f1914f5911">
        <label id="lazyid18f1914529a1" class="lazyclass18f1914529a1" lazydev="18f1914529a1" for="" accesskey="">
        Default value : 
        </label>
  
        <input type="Number" id="lazyid18f191461091" class="lazyclass18f191461091" lazydev="18f191461091">`
    },
    {
        value : 'Email',
        class : 'lazyclass18f1917ddd11',
        content : `
        <legend id="lazyid18f1917ddba1" class="lazyclass18f1917ddba1" lazydev="18f1917ddba1">
        Fieldset_text Fieldsets(email)
        </legend>

        <div id="custom_fieldset_option" class="custom_fieldset_option" lazydev="18f1972bd4f1">
            <i id="option-go-up" class="option-go-up  fa fa-chevron-up" lazydev="18f197386311">
            
            </i>
      
            <i id="option-go-down" class="option-go-down fa fa-chevron-down" lazydev="18f1977a3b71">
            
            </i>
      
            <i id="option-delete" class="option-delete  fa-solid fa-xmark" lazydev="18f1977adbe1">
            
            </i>
      
            
        </div>
  
        <label id="lazyid18f1917ddbd1" class="lazyclass18f1917ddbd1" lazydev="18f1917ddbd1" for="" accesskey="">
        Fieldset name : 
        </label>
  
        <input type="text" id="lazyid18f1917ddc11" class="lazyclass18f1917ddc11" lazydev="18f1917ddc11">
        <label id="lazyid18f191d61191" class="lazyclass18f191d61191" lazydev="18f191d61191" for="" accesskey="">
        Fieldset label : 
        </label>
  
        <input type="text" id="lazyid18f191d6a391" class="lazyclass18f191d6a391" lazydev="18f191d6a391">
        <label id="lazyid18f1917ddc41" class="lazyclass18f1917ddc41" lazydev="18f1917ddc41" for="" accesskey="">
        Mandatory : 
        </label>
  
        <select id="lazyid18f1917ddc71" class="lazyclass18f1917ddc71" lazydev="18f1917ddc71" selectoption="{true,TRUE,selected},{false,FALSE}">
        <option value="true">
        TRUE
        </option>
  
        <option value="false">
        FALSE
        </option>
  
        
        </select>
  
        <label id="lazyid18f1917ddcb1" class="lazyclass18f1917ddcb1" lazydev="18f1917ddcb1" for="" accesskey="">
        Default value : 
        </label>
  
        <input type="email" id="input-18f191840b91" class="INPUT-18f191840b91" lazydev="18f191840b91">`
    },
    {
        value : 'Select',
        class : 'lazyclass18f191e196a1',
        content : `
        <legend id="lazyid18f191e194c1" class="lazyclass18f191e194c1" lazydev="18f191e194c1">
        Fieldset_name Fieldsets(select)
        </legend>

        <div id="custom_fieldset_option" class="custom_fieldset_option" lazydev="18f1972bd4f1">
            <i id="option-go-up" class="option-go-up  fa fa-chevron-up" lazydev="18f197386311">
            
            </i>
      
            <i id="option-go-down" class="option-go-down fa fa-chevron-down" lazydev="18f1977a3b71">
            
            </i>
      
            <i id="option-delete" class="option-delete  fa-solid fa-xmark" lazydev="18f1977adbe1">
            
            </i>
      
            
        </div>
  
        <label id="lazyid18f191e19501" class="lazyclass18f191e19501" lazydev="18f191e19501" for="" accesskey="">
        Fieldset name : 
        </label>
  
        <input type="text" id="lazyid18f191e19531" class="lazyclass18f191e19531" lazydev="18f191e19531">
        <label id="lazyid18f191e19561" class="lazyclass18f191e19561" lazydev="18f191e19561" for="" accesskey="">
        Fieldset label : 
        </label>
  
        <input type="text" id="lazyid18f191e195a1" class="lazyclass18f191e195a1" lazydev="18f191e195a1">
        
  
        <div id="div-18f1925ddb21" class="DIV-18f1925ddb21" lazydev="18f1925ddb21">
        <button id="lazyid18f1924bcdb1" class="lazyclass18f1924bcdb1" lazydev="18f1924bcdb1" type="button">
        <icon id="icon-18f1924bcdb1" class="fa fa-bars" style="padding-right: 1em;">
        
        </icon>
  
        ADD OPTIONS
        </button>
  
        
        </div>
  
        `
    },
    {
        value : 'Password',
        class : 'lazyclass18f1927ac6c1',
        content : `
        <legend id="lazyid18f1927ac4c1" class="lazyclass18f1927ac4c1" lazydev="18f1927ac4c1">
        Fieldset_text Fieldsets(password)
        </legend>

        <div id="custom_fieldset_option" class="custom_fieldset_option" lazydev="18f1972bd4f1">
            <i id="option-go-up" class="option-go-up  fa fa-chevron-up" lazydev="18f197386311">
            
            </i>
      
            <i id="option-go-down" class="option-go-down fa fa-chevron-down" lazydev="18f1977a3b71">
            
            </i>
      
            <i id="option-delete" class="option-delete  fa-solid fa-xmark" lazydev="18f1977adbe1">
            
            </i>
      
            
        </div>
  
        <label id="lazyid18f1927ac511" class="lazyclass18f1927ac511" lazydev="18f1927ac511" for="" accesskey="">
        Fieldset name : 
        </label>
  
        <input type="text" id="lazyid18f1927ac541" class="lazyclass18f1927ac541" lazydev="18f1927ac541">
        <label id="lazyid18f1927ac581" class="lazyclass18f1927ac581" lazydev="18f1927ac581" for="" accesskey="">
        Fieldset label : 
        </label>
  
        <input type="text" id="lazyid18f1927ac5b1" class="lazyclass18f1927ac5b1" lazydev="18f1927ac5b1">
        <label id="lazyid18f1927ac5e1" class="lazyclass18f1927ac5e1" lazydev="18f1927ac5e1" for="" accesskey="">
        Mandatory : 
        </label>
  
        <select id="lazyid18f1927ac621" class="lazyclass18f1927ac621" lazydev="18f1927ac621" selectoption="{true,TRUE,selected},{false,FALSE}">
        <option value="true">
        TRUE
        </option>
  
        <option value="false">
        FALSE
        </option>
  
        
        </select>
  
        <label id="lazyid18f1927ac661" class="lazyclass18f1927ac661" lazydev="18f1927ac661" for="" accesskey="">
        Default value : 
        </label>
  
        <input type="text" id="lazyid18f1927ac691" class="lazyclass18f1927ac691" lazydev="18f1927ac691">
        `
    },
    {
        value : 'Checkbox',
        class : 'lazyclass18f192ecbdb1',
        content : `
        <legend id="lazyid18f192ecbbb1" class="lazyclass18f192ecbbb1" lazydev="18f192ecbbb1">
        Fieldset_text Fieldsets(Checkbox)
        </legend>

        <div id="custom_fieldset_option" class="custom_fieldset_option" lazydev="18f1972bd4f1">
            <i id="option-go-up" class="option-go-up  fa fa-chevron-up" lazydev="18f197386311">
            
            </i>
      
            <i id="option-go-down" class="option-go-down fa fa-chevron-down" lazydev="18f1977a3b71">
            
            </i>
      
            <i id="option-delete" class="option-delete  fa-solid fa-xmark" lazydev="18f1977adbe1">
            
            </i>
      
            
        </div>
  
        <label id="lazyid18f192ecbbf1" class="lazyclass18f192ecbbf1" lazydev="18f192ecbbf1" for="" accesskey="">
        Fieldset name : 
        </label>
  
        <input type="text" id="lazyid18f192ecbc21" class="lazyclass18f192ecbc21" lazydev="18f192ecbc21">
        <label id="lazyid18f192ecbc51" class="lazyclass18f192ecbc51" lazydev="18f192ecbc51" for="" accesskey="">
        Fieldset label : 
        </label>
  
        <input type="text" id="lazyid18f192ecbc91" class="lazyclass18f192ecbc91" lazydev="18f192ecbc91">
        <label id="lazyid18f1927ac5e1" class="lazyclass18f1927ac5e1" lazydev="18f1927ac5e1" for="" accesskey="">
        Default Value : 
        </label>
  
        <select id="lazyid18f1927ac621" class="lazyclass18f1927ac621" lazydev="18f1927ac621" selectoption="{true,TRUE,selected},{false,FALSE}">
        <option value="false">
        FALSE
        </option>
        <option value="true">
        TRUE
        </option>
  
        
        </select>
        `
    },
    {
        value : 'Media',
        class : 'lazyclass18f192f7f541',
        content : `
        <legend id="lazyid18f192f7f3c1" class="lazyclass18f192f7f3c1" lazydev="18f192f7f3c1">
        Fieldset_text Fieldsets(Media)
        </legend>

        <div id="custom_fieldset_option" class="custom_fieldset_option" lazydev="18f1972bd4f1">
            <i id="option-go-up" class="option-go-up  fa fa-chevron-up" lazydev="18f197386311">
            
            </i>
      
            <i id="option-go-down" class="option-go-down fa fa-chevron-down" lazydev="18f1977a3b71">
            
            </i>
      
            <i id="option-delete" class="option-delete  fa-solid fa-xmark" lazydev="18f1977adbe1">
            
            </i>
      
            
        </div>
  
        <label id="lazyid18f192f7f401" class="lazyclass18f192f7f401" lazydev="18f192f7f401" for="" accesskey="">
        Fieldset name : 
        </label>
  
        <input type="text" id="lazyid18f192f7f431" class="lazyclass18f192f7f431" lazydev="18f192f7f431">
        <label id="lazyid18f192f7f461" class="lazyclass18f192f7f461" lazydev="18f192f7f461" for="" accesskey="">
        Fieldset label : 
        </label>
  
        <input type="text" id="lazyid18f192f7f4a1" class="lazyclass18f192f7f4a1" lazydev="18f192f7f4a1">
        <label id="lazyid18f192f7f4d1" class="lazyclass18f192f7f4d1" lazydev="18f192f7f4d1" for="" accesskey="">
        Mandatory : 
        </label>
  
        <select id="lazyid18f192f7f511" class="lazyclass18f192f7f511" lazydev="18f192f7f511" selectoption="{true,TRUE},{false,FALSE,selected}">
        <option value="false">
        FALSE
        </option>
        <option value="true">
        TRUE
        </option>
  
        
        </select>
  `
    },
    {
        value : 'Textarea',
        class : 'lazyclass18f1930b5ab1',
        content : `
        <legend id="lazyid18f1930b58b1" class="lazyclass18f1930b58b1" lazydev="18f1930b58b1">
        Fieldset_text Fieldsets(textarea)
        </legend>

        <div id="custom_fieldset_option" class="custom_fieldset_option" lazydev="18f1972bd4f1">
            <i id="option-go-up" class="option-go-up  fa fa-chevron-up" lazydev="18f197386311">
            
            </i>
      
            <i id="option-go-down" class="option-go-down fa fa-chevron-down" lazydev="18f1977a3b71">
            
            </i>
      
            <i id="option-delete" class="option-delete  fa-solid fa-xmark" lazydev="18f1977adbe1">
            
            </i>
      
            
        </div>
  
        <label id="lazyid18f1930b58f1" class="lazyclass18f1930b58f1" lazydev="18f1930b58f1" for="" accesskey="">
        Fieldset name : 
        </label>
  
        <input type="text" id="lazyid18f1930b5921" class="lazyclass18f1930b5921" lazydev="18f1930b5921">
        <label id="lazyid18f1930b5961" class="lazyclass18f1930b5961" lazydev="18f1930b5961" for="" accesskey="">
        Fieldset label : 
        </label>
  
        <input type="text" id="lazyid18f1930b59a1" class="lazyclass18f1930b59a1" lazydev="18f1930b59a1">
        <label id="lazyid18f1930b59d1" class="lazyclass18f1930b59d1" lazydev="18f1930b59d1" for="" accesskey="">
        Mandatory : 
        </label>
  
        <select id="lazyid18f1930b5a11" class="lazyclass18f1930b5a11" lazydev="18f1930b5a11" selectoption="{true,TRUE,selected},{false,FALSE}">
        <option value="true">
        TRUE
        </option>
  
        <option value="false">
        FALSE
        </option>
  
        
        </select>
  
        <label id="lazyid18f1930b5a41" class="lazyclass18f1930b5a41" lazydev="18f1930b5a41" for="" accesskey="">
        Default value : 
        </label>
  
        <textarea id="textarea-18f1931c6991" class="TEXTAREA-18f1931c6991" lazydev="18f1931c6991" rows="4">      
        </textarea>`
    },
    {
        value : 'Color',
        class : 'lazyclass18f193501c71',
        content : `
        <legend id="lazyid18f193501a61" class="lazyclass18f193501a61" lazydev="18f193501a61">
        Fieldset_text Fieldsets(Color)
        </legend>

        <div id="custom_fieldset_option" class="custom_fieldset_option" lazydev="18f1972bd4f1">
            <i id="option-go-up" class="option-go-up  fa fa-chevron-up" lazydev="18f197386311">
            
            </i>
      
            <i id="option-go-down" class="option-go-down fa fa-chevron-down" lazydev="18f1977a3b71">
            
            </i>
      
            <i id="option-delete" class="option-delete  fa-solid fa-xmark" lazydev="18f1977adbe1">
            
            </i>
      
            
        </div>
  
        <label id="lazyid18f193501aa1" class="lazyclass18f193501aa1" lazydev="18f193501aa1" for="" accesskey="">
        Fieldset name : 
        </label>
  
        <input type="text" id="lazyid18f193501ae1" class="lazyclass18f193501ae1" lazydev="18f193501ae1">
        <label id="lazyid18f193501b21" class="lazyclass18f193501b21" lazydev="18f193501b21" for="" accesskey="">
        Fieldset label : 
        </label>
  
        <input type="text" id="lazyid18f193501b51" class="lazyclass18f193501b51" lazydev="18f193501b51">
        <label id="lazyid18f193501b91" class="lazyclass18f193501b91" lazydev="18f193501b91" for="" accesskey="">
        Mandatory : 
        </label>
  
        <select id="lazyid18f193501bc1" class="lazyclass18f193501bc1" lazydev="18f193501bc1" selectoption="{true,TRUE,selected},{false,FALSE}">
        <option value="true">
        TRUE
        </option>
  
        <option value="false">
        FALSE
        </option>
  
        
        </select>
  
        <label id="lazyid18f193501c01" class="lazyclass18f193501c01" lazydev="18f193501c01" for="" accesskey="">
        Default value : 
        </label>
  
        <input type="color" id="input-18f1935a26a1" class="INPUT-18f1935a26a1" lazydev="18f1935a26a1">
        `
    },
    {
        value : 'WYSIWYG',
        class : 'lazyclass18f193700e41',
        content : `<fieldset id="lazyid18f193700e41" class="lazyclass18f193700e41" lazydev="18f193700e41">
        <legend id="lazyid18f193700c41" class="lazyclass18f193700c41" lazydev="18f193700c41">
        Fieldset_text Fieldsets(WYSIWYG)
        </legend>

        <div id="custom_fieldset_option" class="custom_fieldset_option" lazydev="18f1972bd4f1">
            <i id="option-go-up" class="option-go-up  fa fa-chevron-up" lazydev="18f197386311">
            
            </i>
      
            <i id="option-go-down" class="option-go-down fa fa-chevron-down" lazydev="18f1977a3b71">
            
            </i>
      
            <i id="option-delete" class="option-delete  fa-solid fa-xmark" lazydev="18f1977adbe1">
            
            </i>
      
            
        </div>
  
        <label id="lazyid18f193700c81" class="lazyclass18f193700c81" lazydev="18f193700c81" for="" accesskey="">
        Fieldset name : 
        </label>
  
        <input type="text" id="lazyid18f193700cb1" class="lazyclass18f193700cb1" lazydev="18f193700cb1">
        <label id="lazyid18f193700cf1" class="lazyclass18f193700cf1" lazydev="18f193700cf1" for="" accesskey="">
        Fieldset label : 
        </label>
  
        <input type="text" id="lazyid18f193700d21" class="lazyclass18f193700d21" lazydev="18f193700d21">
        <label id="lazyid18f193700d61" class="lazyclass18f193700d61" lazydev="18f193700d61" for="" accesskey="">
        Mandatory : 
        </label>
  
        <select id="lazyid18f193700da1" class="lazyclass18f193700da1" lazydev="18f193700da1" selectoption="{true,TRUE,selected},{false,FALSE}">
        <option value="true">
        TRUE
        </option>
  
        <option value="false">
        FALSE
        </option>
  
        
        </select>`
    },
    // {
    //     value : 'WYSIWYG',
    //     class : 'lazyid18f1917ddd11',
    //     content : ``
    // },
];
//--------------------------------------------------------------//
document.addEventListener("DOMContentLoaded", async function() {
    add_fieldset();
    const url = window.location.href.split('/');
    if(!url[5] || url[5] == ''){
        document.getElementById('save-custom-table').addEventListener('click', ()=>{
            save_custom_table('new-save');
        });
    } else {
        document.getElementById('custom_table_legend').textContent = 'Edit Custom Table'
        try {
            const response = await fetch(`/api/adm/get-one-table?table_id=${url[5]}`);
    
            if (!response.ok) {
                const data = await response.json();
                throw new Error(`Failed Get Custom Table ${data.msg}`);
            }
            const data = await response.json();
            const custom_table = data.custom_table
            custom_table_name = custom_table.name;
            table_name_input.value = custom_table.name;
            custom_table_type = custom_table.type;
            table_type_input.value = custom_table.type;
            const custom_fields = JSON.parse(custom_table.custom_fields);
            table_ID = custom_table.id;
            custom_fields.forEach(element => {
                fieldsetsOption.forEach(fs => {
                    if(element.type === fs.value){
                        const append = appendFieldset(fs,'edit-mode')
                        Fieldset_Table.push(element)
                        edit_fieldset_table(element.type,append,element)
                    }
                });
            });
            document.getElementById('save-custom-table').addEventListener('click', ()=>{
                save_custom_table('edit-save');
            });
        } catch (error) {
                const popup = document.createElement('section');
                popup.id = 'js-container-popup';
                popup.classList.add('js-container-popup');
                popup.innerHTML = `
                <div id="js-wrapper-popup" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
                    <p id="js-popup-text" class="js-popup-text" lazydev="18e5af308c51">
                    ${error}
                    </p>
                    
                    </div>`;
                document.body.appendChild(popup);
                setTimeout(() => {
                    deletePopup();
                }, 15000);
        }
    }

});
//--------------------------------------------------------------//
function add_fieldset(){
    const addbutton = document.getElementById('add-new-fieldset');
    addbutton.addEventListener('click', createFieldset)
}

function createFieldset(){
    const select_value = document.getElementById('select-fieldsets').value;
    fieldsetsOption.forEach(fs => {
        if(select_value === fs.value){
            appendFieldset(fs)
        }
    });
}

function appendFieldset(fieldset,mode){
const div = document.getElementById('js-fieldset-div')
const set = document.createElement('fieldset');
set.id = `fieldset-${fieldset_count}`;
set.classList.add(fieldset.class);
set.innerHTML = fieldset.content;

div.parentElement.insertBefore(set,div)
fieldset_count += 1;
if(mode === 'edit-mode'){
    return set
}
add_fieldset_table(fieldset.value,set)
}

function add_fieldset_table(value,div){
const set = {}
switch (value) {
    case 'Text':
        set.type = 'Text';
        set.name = '';
        set.label = '';
        set.mandatory = true;
        set.value = '';
        break;
    case 'Number':
        set.type = 'Number';
        set.name = '';
        set.label = '';
        set.mandatory = true;
        set.min = '';
        set.max = '';
        set.value = '';
        break;
    case 'Email':
        set.type = 'Email';
        set.name = '';
        set.label = '';
        set.mandatory = true;
        set.value = '';
        break;
    case 'Select':
        set.type = 'Select';
        set.name = '';
        set.label = '';
        set.options = [];
        break;
    case 'Password':
        set.type = 'Password';
        set.name = '';
        set.label = '';
        set.mandatory = true;
        set.value = '';
        break;
    case 'Checkbox':
        set.type = 'Checkbox';
        set.name = '';
        set.label = '';
        set.value = false;
        break;
    case 'Media':
        set.type = 'Media';
        set.name = '';
        set.label = '';
        set.mandatory = false;
        break;
    case 'Textarea':
        set.type = 'Textarea';
        set.name = '';
        set.label = '';
        set.mandatory = true;
        set.value = '';
        break;
    case 'Color':
        set.type = 'Color';
        set.name = '';
        set.label = '';
        set.mandatory = true;
        set.value = '';
        break;
    case 'WYSIWYG':
        set.type = 'WYSIWYG';
        set.name = '';
        set.label = '';
        set.mandatory = true;
        break;
    default:
        // Jika nilai tidak valid, keluar dari fungsi
        return;
}
Fieldset_Table.push(set)
edit_fieldset_table(value,div,set)
}

function edit_fieldset_table(value,div,set){
    if(value === 'Text'){
       const fieldname =  div.querySelector('.lazyclass18f1903c0721');
       fieldname.value = set.name;
       fieldname.addEventListener('input', ()=>{
        set.name = fieldname.value;
       })
       const fieldlabel = div.querySelector('.lazyclass18f1906340a1');
       fieldlabel.value = set.label;
       fieldlabel.addEventListener('input', ()=>{
        set.label = fieldlabel.value;
       })
       const fieldmandatory = div.querySelector('.lazyclass18f1904a6891');
       fieldmandatory.value = set.mandatory;
       fieldmandatory.addEventListener('input', ()=>{
        if(fieldmandatory.value === 'false'){
            set.mandatory = false;
        } else {
            set.mandatory = true;
        }
        
        // console.log(Fieldset_Table)
       })
       const field_default = div.querySelector('.lazyclass18f191c14a11');
       field_default.value = set.value;
       field_default.addEventListener('change', ()=>{
        set.value = field_default.value;
       })
    }
    if(value === 'Number'){
        const fieldname =  div.querySelector('.lazyclass18f1913458c1');
        fieldname.value = set.name;
        fieldname.addEventListener('input', ()=>{
         set.name = fieldname.value;
        })
        const fieldlabel = div.querySelector('.lazyclass18f191cb8711');
        fieldlabel.value = set.label;
        fieldlabel.addEventListener('input', ()=>{
         set.label = fieldlabel.value;
        })
        const fieldmandatory = div.querySelector('.lazyclass18f191345941');
        fieldmandatory.value = set.mandatory;
        fieldmandatory.addEventListener('input', ()=>{
         if(fieldmandatory.value === 'false'){
             set.mandatory = false;
         } else {
             set.mandatory = true;
         }
        })

        const field_min = div.querySelector('.INPUT-18f1913d81a1');
        field_min.value = set.min;
        field_min.addEventListener('input', ()=>{
         set.min = parseInt(field_min.value,10);
        }) 

        const field_max = div.querySelector('.lazyclass18f1914f5911');
        field_max.value = set.max;
        field_max.addEventListener('input', ()=>{
         set.max = parseInt(field_max.value,10);
        }) 

        const field_default = div.querySelector('.lazyclass18f191461091');
        field_default.value = parseInt(set.value,10);
        field_default.addEventListener('input', ()=>{
         set.value = parseInt(field_default.value,10);
        }) 
    }
    if(value === 'Email'){
       const fieldname =  div.querySelector('.lazyclass18f1917ddc11');
       fieldname.value = set.name;
       fieldname.addEventListener('input', ()=>{
        set.name = fieldname.value;
       })
       const fieldlabel = div.querySelector('.lazyclass18f191d6a391');
       fieldlabel.value = set.label;
       fieldlabel.addEventListener('input', ()=>{
        set.label = fieldlabel.value;
       })
       const fieldmandatory = div.querySelector('.lazyclass18f1917ddc71');
       fieldmandatory.value = set.mandatory;
       fieldmandatory.addEventListener('input', ()=>{
        if(fieldmandatory.value === 'false'){
            set.mandatory = false;
        } else {
            set.mandatory = true;
        }
       })
       const field_default = div.querySelector('.INPUT-18f191840b91');
       field_default.value = set.value;
       field_default.addEventListener('input', ()=>{
        set.value = field_default.value;
       })
    }
    if(value === 'Select'){
        const fieldname =  div.querySelector('.lazyclass18f191e19531');
        fieldname.value = set.name;
        fieldname.addEventListener('input', ()=>{
         set.name = fieldname.value;
        })
        const fieldlabel = div.querySelector('.lazyclass18f191e195a1');
        fieldlabel.value = set.label;
        fieldlabel.addEventListener('input', ()=>{
         set.label = fieldlabel.value;
        })
        const option_button = div.querySelector('.lazyclass18f1924bcdb1');
        option_button.addEventListener('click', ()=>{
            const options = {value : '', text : ''}
            set.options.push(options)
            new_option(options,div)
        })
        set.options.forEach(opt => {
            new_option(opt,div) 
        });
    }

    if(value === 'Password'){
        const fieldname =  div.querySelector('.lazyclass18f1927ac541');
        fieldname.value = set.name;
        fieldname.addEventListener('input', ()=>{
         set.name = fieldname.value;
        })
        const fieldlabel = div.querySelector('.lazyclass18f1927ac5b1');
        fieldlabel.value = set.label;
        fieldlabel.addEventListener('input', ()=>{
         set.label = fieldlabel.value;
        })
        const fieldmandatory = div.querySelector('.lazyclass18f1927ac621');
        fieldmandatory.value = set.mandatory;
        fieldmandatory.addEventListener('input', ()=>{
         if(fieldmandatory.value === 'false'){
             set.mandatory = false;
         } else {
             set.mandatory = true;
         }
        })
        const field_default = div.querySelector('.lazyclass18f1927ac691');
        field_default.value = set.value;
        field_default.addEventListener('input', ()=>{
         set.value = field_default.value;
        })
    }
    if(value === 'Checkbox'){
        const fieldname =  div.querySelector('.lazyclass18f192ecbc21');
        fieldname.value = set.name;
        fieldname.addEventListener('input', ()=>{
         set.name = fieldname.value;
        })
        const fieldlabel = div.querySelector('.lazyclass18f192ecbc91');
        fieldlabel.value = set.label;
        fieldlabel.addEventListener('input', ()=>{
         set.label = fieldlabel.value;
        })
        const default_value = div.querySelector('.lazyclass18f1927ac621');
        default_value.value = set.value;
        default_value.addEventListener('input', ()=>{
         if(default_value.value === 'false'){
             set.value = false;
         } else {
             set.value = true;
         }
        })
    }
    if(value === 'Media'){
        const fieldname =  div.querySelector('.lazyclass18f192f7f431');
        fieldname.value = set.name;
        fieldname.addEventListener('input', ()=>{
         set.name = fieldname.value;
        })
        const fieldlabel = div.querySelector('.lazyclass18f192f7f4a1');
        fieldlabel.value = set.label;
        fieldlabel.addEventListener('input', ()=>{
         set.label = fieldlabel.value;
        })
        const fieldmandatory = div.querySelector('.lazyclass18f192f7f511');
        fieldmandatory.value = set.mandatory;
        fieldmandatory.addEventListener('input', ()=>{
         if(fieldmandatory.value === 'false'){
             set.mandatory = false;
         } else {
             set.mandatory = true;
         }
        })
    }
    if(value === 'Textarea'){
        const fieldname =  div.querySelector('.lazyclass18f1930b5921');
        fieldname.value = set.name;
        fieldname.addEventListener('input', ()=>{
         set.name = fieldname.value;
        })
        const fieldlabel = div.querySelector('.lazyclass18f1930b59a1');
        fieldlabel.value = set.label;
        fieldlabel.addEventListener('input', ()=>{
         set.label = fieldlabel.value;
        })
        const fieldmandatory = div.querySelector('.lazyclass18f1930b5a11');
        fieldmandatory.value = set.mandatory;
        fieldmandatory.addEventListener('input', ()=>{
         if(fieldmandatory.value === 'false'){
             set.mandatory = false;
         } else {
             set.mandatory = true;
         }
        })
        const field_default = div.querySelector('.TEXTAREA-18f1931c6991');
        field_default.value = set.value;
        field_default.addEventListener('input', ()=>{
         set.value = field_default.value;
        })
    }
    if(value === 'Color'){
        const fieldname =  div.querySelector('.lazyclass18f193501ae1');
        fieldname.value = set.name;
        fieldname.addEventListener('input', ()=>{
         set.name = fieldname.value;
        })
        const fieldlabel = div.querySelector('.lazyclass18f193501b51');
        fieldlabel.value = set.label;
        fieldlabel.addEventListener('input', ()=>{
         set.label = fieldlabel.value;
        })
        const fieldmandatory = div.querySelector('.lazyclass18f193501bc1');
        fieldmandatory.addEventListener('input', ()=>{
         if(fieldmandatory.value === 'false'){
             set.mandatory = false;
         } else {
             set.mandatory = true;
         }
        })
        const field_default = div.querySelector('.INPUT-18f1935a26a1');
        field_default.value = set.value;
        field_default.addEventListener('input', ()=>{
         set.value = field_default.value;
        })
    }
    if(value === 'WYSIWYG'){
        const fieldname =  div.querySelector('.lazyclass18f193700cb1');
        fieldname.value = set.name;
        fieldname.addEventListener('input', ()=>{
         set.name = fieldname.value;
        })
        const fieldlabel = div.querySelector('.lazyclass18f193700d21');
        fieldlabel.value = set.label;
        fieldlabel.addEventListener('input', ()=>{
         set.label = fieldlabel.value;
        })
        const fieldmandatory = div.querySelector('.lazyclass18f193700da1');
        fieldmandatory.value = set.mandatory;
        fieldmandatory.addEventListener('input', ()=>{
         if(fieldmandatory.value === 'false'){
             set.mandatory = false;
         } else {
             set.mandatory = true;
         }
        })
    }

const deleteset = div.querySelector('.option-delete');
deleteset.addEventListener('click',()=>{
    const indexToRemove = Fieldset_Table.findIndex(item => item === set);
if (indexToRemove !== -1) {
    Fieldset_Table.splice(indexToRemove, 1);
}
div.remove();
})
const upset = div.querySelector('.option-go-up');
upset.addEventListener('click', ()=>{
    const index = Fieldset_Table.findIndex(item => item === set);
    if (index > 0) { 
        const temp = Fieldset_Table[index - 1];
        Fieldset_Table[index - 1] = set;
        Fieldset_Table[index] = temp;
        const prevDiv = div.previousElementSibling;
        div.parentElement.insertBefore(div, prevDiv);
    }
})
const downset = div.querySelector('.option-go-down');
downset.addEventListener('click', ()=>{
    const index = Fieldset_Table.findIndex(item => item === set);
    if (index < Fieldset_Table.length - 1) {
        const temp = Fieldset_Table[index + 1];
        Fieldset_Table[index + 1] = set;
        Fieldset_Table[index] = temp;
        const nextDiv = div.nextElementSibling;
        div.parentElement.insertBefore(nextDiv, div);
    }
})
}

function new_option(options,parent_div){
const div = document.createElement('div');
div.classList.add('DIV-18f191edb121');
div.innerHTML = `
<div id="div-18f1920822f1" class="DIV-18f1920822f1" lazydev="18f1920822f1">
<label id="lazyid18f1922fb811" class="lazyclass18f1922fb811" lazydev="18f1922fb811" for="" accesskey="">
Option value
</label>

<input type="text" class="lazyclass18f19233ee11" value=${options.value}>

</div>

<div id="lazyid18f1922ddff1" class="lazyclass18f1922ddff1" lazydev="18f1922ddff1">
<label id="lazyid18f192394491" class="lazyclass18f192394491" lazydev="18f192394491" for="" accesskey="">
Option text
</label>

<input type="text" class="lazyclass18f1923ace91" value=${options.text}>

</div>`;

const add_div = parent_div.querySelector('.DIV-18f1925ddb21'); 
add_div.parentElement.insertBefore(div,add_div);

const opt_value = div.querySelector('.lazyclass18f19233ee11');
opt_value.addEventListener('input', ()=>{
    options.value = opt_value.value
})
const opt_text = div.querySelector('.lazyclass18f1923ace91');
opt_text.addEventListener('input', ()=>{
    options.text = opt_text.value
})

}

async function save_custom_table(command){
const custom_field_set = JSON.stringify(Fieldset_Table);

const popup = document.createElement('section');
            popup.id = 'js-container-popup';
            popup.classList.add('js-container-popup');
            popup.innerHTML = `
            <div id="js-wrapper-popup" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
                <p id="js-popup-text" class="js-popup-text" lazydev="18e5af308c51">
                Please Wait...
                </p>
                
                </div>`;
            document.body.appendChild(popup);
            if(command == 'new-save'){
                const dataPush = {
                    table_name : custom_table_name,
                    table_type : custom_table_type,
                    fieldsets : custom_field_set,
                }
                try {
                    const response = await fetch('/api/adm/create-table', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(dataPush)
                    });
            
                    if (!response.ok) {
                        const json = await response.json();
                        throw new Error(json.msg);
                    }
                    if(response.ok){
                        window.location.href = '/admin/post';
                    }
                    // console.log( await response.json())
            
                    // Lakukan tindakan lanjutan jika diperlukan setelah data berhasil disimpan
                } catch (error) {
                        const popuptext = document.getElementById('js-popup-text')
                        popuptext.textContent = `${error}`
                        setTimeout(() => {
                            deletePopup()
                        }, 2000);
                    }
            }
            if(command === 'edit-save'){
                const dataPush = {
                    table_name : custom_table_name,
                    table_type : custom_table_type,
                    fieldsets : custom_field_set,
                    table_id : table_ID
                }
                // console.log(dataPush)
                try {
                    const response = await fetch('/api/adm/edit-table', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(dataPush)
                    });
            
                    if (!response.ok) {
                        const json = await response.json();
                        throw new Error(json.msg);
                    }
                    if(response.ok){
                        const json = await response.json();
                        const popuptext = document.getElementById('js-popup-text')
                        popuptext.textContent = `${json.msg}`
                        setTimeout(() => {
                            deletePopup()
                        }, 2000);
                    }
                    // console.log( await response.json())
            
                    // Lakukan tindakan lanjutan jika diperlukan setelah data berhasil disimpan
                } catch (error) {
                        const popuptext = document.getElementById('js-popup-text')
                        popuptext.textContent = `${error}`
                        setTimeout(() => {
                            deletePopup()
                        }, 2000);
                    }
            }
}

function deletePopup(){
    const div = document.getElementById('js-wrapper-popup');
    div.setAttribute('class', 'js-wrapper-popup animated-scale-down')
    const popup = document.getElementById('js-container-popup');
    setTimeout(() => {
        popup.remove();
    }, 200);
}