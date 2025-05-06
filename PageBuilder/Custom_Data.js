import {PopupAppend,gsap100,AnimasiSetting,closeAnim,editDynamicAnim} from './Animation.js';
import {isDescendantOrSelf,isAncestorOrSelf} from './main.js';
import {propertiesEditor} from './ElementBuilder.js';
let already_fetch = false;
const data_Tables = [];
let table_choosen = '';
let data_choosen = '';
let main_container = '';
let container_list_choosen = '';
let loadmore_element_choosen = '';
let advance_querry = [];
let data_fields = [];
let dynamic_target = '';
let url_querry = null;
async function fetch_Data_Table() {
    try {
        const response = await fetch('/api/adm/get-table-on-pagebuilder');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        else {
            already_fetch = true;
        }
        const data = await response.json();
        const tables = data.data_tables;
        tables.forEach(element => {
            element.custom_fields = JSON.parse(element.custom_fields);
            element.data.content = JSON.parse(element.data.content);
            data_Tables.push(element);
        });
        return
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        // Anda bisa menangani error di sini, seperti melemparkan error lagi atau memberikan pesan kesalahan kepada pengguna
        return null;
    }
}

export function checkFetch(){
    if(already_fetch === false){
        fetch_Data_Table();
    }
}

export function createDynamic_Container(){
    animation_Popup();
    DynamicContainer_Selector();
}

function animation_Popup(){
    PopupAppend();
    let PopupText = document.getElementById("PopupText");
    let maincontroller = document.getElementById("main-controller");
    gsap.to(maincontroller, { xPercent: -150, duration: 1,});
    PopupText.textContent = "Click The Container Target";
    gsap100();
    document.getElementById("ClosePopup-Button").addEventListener("click", AnimasiSetting);
}

function DynamicContainer_Selector(){
    let targetElement;
    const lazyDevElements = document.querySelectorAll('[lazyDev]');
    let closeButton = document.getElementById("ClosePopup-Button");
    closeButton.addEventListener('click', stop_Selector);
    function Closepopup(){
        document.getElementById('ClosePopup-Button').click();
        stop_Selector();
    }
    function stop_Selector() {
        lazyDevElements.forEach(function (element) {
            const identity = element.getAttribute('data-identity');
            if(identity === 'Main Container' || identity === 'Child Container' || identity === 'Wrapper'){
                element.removeEventListener('mouseenter', handleMouseEnter);
        
                element.removeEventListener('click', handleClick);
            
                element.removeEventListener('mouseleave', handleMouseLeave);

                element.classList.remove('hoverTargetContainer');
            }
          });
      }

    lazyDevElements.forEach(function (element) {
        const identity = element.getAttribute('data-identity');
        if(identity === 'Main Container' || identity === 'Child Container' || identity === 'Wrapper'){
            element.addEventListener('mouseenter', handleMouseEnter);
    
            element.addEventListener('click', handleClick);
        
            element.addEventListener('mouseleave', handleMouseLeave);
        }
      });
      function handleMouseEnter(event) {
        this.classList.add('hoverTargetContainer');
        targetElement = this;
        var parentElement = this.parentNode;
    
        while (parentElement !== document.body) {
          parentElement.classList.remove('hoverTargetContainer');
          parentElement = parentElement.parentNode;
        }
      }
      function handleMouseLeave(event) {
        targetElement.classList.remove('hoverTargetContainer');
      }
      function handleClick(event) {
        event.stopPropagation();
        let legit = false;
        const targetChild = targetElement.querySelectorAll('[lazyDev]');
        const PopupText = document.getElementById("PopupText");
        targetChild.forEach(child => {
            const identity = child.getAttribute('data-identity');
            if(identity === 'Main Container' || identity === 'Child Container' || identity === 'Wrapper'){
                legit = true;
            }
        });
        if(legit === false){
            PopupText.textContent = 'Container Need atleast 1 Child Container/Wrapper (div,section, etc)';
            setTimeout(() => {
                PopupText.textContent = '';
                setTimeout(() => {
                    PopupText.textContent = 'Click The Container Target';
                }, 100);
            }, 1000);
            return
        }
        Closepopup();
        DynamicContainer_editor(targetElement)
      }
}

export function DynamicContainer_editor(target,state){
    main_container = target;
    table_choosen = '';
    data_choosen = '';
    container_list_choosen = '';
    loadmore_element_choosen = '';
    target.setAttribute('data-dynamic', true);
    const targetChild = target.querySelectorAll('[lazydev]');
    targetChild.forEach(chld => {
        chld.setAttribute('data-dynamic-child', true);
        chld.classList.remove('el-lazydev-opacity');
    });
    target.classList.add('lazydev-dynamic-container')
    const lazydev = document.querySelectorAll('[lazydev]');
    lazydev.forEach(el => {
          if (!isDescendantOrSelf(el, target) && !isAncestorOrSelf(el, target)) {
            el.classList.add('el-lazydev-opacity');
          }
    });
    AnimasiSetting();
    if(state === 'selector'){
        document.getElementById('ClosePopup-Button').click();
        document.getElementById('close-menu').addEventListener('click', closeAnim);
    }
    document.getElementById('close-menu').addEventListener('click', ()=>{
        target.classList.remove('lazydev-dynamic-container');
        if(container_list_choosen){
            container_list_choosen.classList.remove('lazydev-container-list');
        }
        if(loadmore_element_choosen){
            loadmore_element_choosen.classList.remove('lazydev-loadmore-el');
        }
        lazydev.forEach(el => {
            if (!isDescendantOrSelf(el, target) && !isAncestorOrSelf(el, target)) {
                el.classList.remove('el-lazydev-opacity');
              }
        });
    });
    let label_container_list;
    let label_loadmore;
    let loadmore_set;
    let entry = 1;
    createInnerHTML();
    changeTable();
    DynamicEditor_Setup();
    //-----------------------------------------//
    function createInnerHTML(){
    let HeadTitle = document.getElementById("head-menu-title");
    HeadTitle.textContent = `${target.id}`;
    let BodyMenu = `
      <div id="Custom-Container">Custom Container</div>
    `;

    let bodyMenuContainer = document.getElementById("menu-tab");
    bodyMenuContainer.innerHTML = BodyMenu;
    let bodyForm = `

    <form id="BodySetting" data-id="lazydev">
      <fieldset id="formfieldset">
        <legend id="formmakerlegend">Dynamic Content</legend>

        <div style="width: 100%;">
          <label style="width: 45% !important;">Custom Table</label>
          <select id="custom_table" style="width: 50% !important;">
            <option value="">No Data</option>
          </select>
        </div>

        <div>
        <label id="container-set-label" style="width: 100% !important;"><span style="color: white;">Container List :</span> <span style="color: red;">Not Set</span></label>

        <button class="none-mode container-set" style="width: 100% !important;" id="lazydev-set-list" type="button">Set Container List</button>
        <button class="none-mode dynamic-div" style="width: 100% !important;" id="lazydev-edit-dynamic-content" type="button">Edit Dynamic Content</button>
        </div>
        <div class="none-mode dynamic-div">
        <label id="loadmore-set-label" style="width: 100% !important";><span style="color: white;">Loadmore Element :</span> <span style="color: red;">Not Set</span></label>
        <button style="width: 100% !important;" id="lazydev-set-loadmore" type="button">Set Loadmore Element</button>
        </div>
        <div class="none-mode dynamic-div">
        <label  style="width: 45% !important;">Data Per Session</label>
        <input  style="width: 50% !important;" type="number" step="1" min="1" value="10"  id="lazydev-data-per-session">
        </div>
        <div class="none-mode dynamic-div">
        <label  style="width: 45% !important;">Data Offset</label>
        <input  style="width: 50% !important;" type="number" step="1" min="0" value="0"  id="lazydev-data-offset-start">
        </div>
        <div class="none-mode dynamic-div" style="width: 100%;">
          <label style="width: 45% !important;">Custom Table</label>
          <select id="order-query-select" style="width: 50% !important;">
            <option value="CreatedAt Desc">CreatedAt Desc</option>
            <option value="CreatedAt Asc">CreatedAt Asc</option>
            <option value="UpdatedAt Desc">UpdatedAt Desc</option>
            <option value="UpdatedAt Asc">UpdatedAt Asc</option>
            <option value="Title A-Z">Title A-Z</option>
            <option value="Title Z-A">Title Z-A</option>
            <option value="Random">Random</option>
          </select>
        </div>
        <div class="none-mode dynamic-div" title="Set Dynamic Content to Respond to URL Query (Page Also need to Set as URL Query)">
        <input id="url-query-check" style="width: 5% !important;" type="checkbox">
        <label style="width: 90% !important;">URL Query</label>
        </div>
        <div class="none-mode dynamic-div">
        <input id="advance-query-check" style="width: 5% !important;" type="checkbox">
        <label style="width: 90% !important;">Advance Query</label>


        <div id="advance-query-div" class="advance-query none-mode">
        <button style="width: 100% !important;" id="lazydev-add-custom_querry">Add Custom Query</button>
        </div>

        </div>
        
      </fieldset> 
    </form>
    `;

    let menuContainer = document.getElementById("content-menu-controller");
    menuContainer.innerHTML = bodyForm;
    label_container_list = document.getElementById('container-set-label');
    label_loadmore = document.getElementById('loadmore-set-label');
    loadmore_set = document.getElementById('lazydev-set-loadmore');
    const selectTable = document.getElementById('custom_table');
        data_Tables.forEach(tables => {
            const option = document.createElement('option');
            option.value = tables.id;
            option.textContent = tables.name;
            selectTable.appendChild(option)
        });
    }
    function DynamicEditor_Setup(){
    if(target.hasAttribute('data-dynamic-table')){
        const data_table = target.getAttribute('data-dynamic-table');
        const selectTable = document.getElementById('custom_table');
        data_Tables.forEach(table => {
            if(`${table.id}` == `${data_table}`){
                for (let i = 0; i < selectTable.options.length; i++) {
                    if (selectTable.options[i].value === data_table) {
                        selectTable.selectedIndex = i;
                      break;
                    }
                  }
                table_choosen = table;
                data_choosen = table.data;
                const container_set = document.querySelector('.container-set')
                container_set.classList.remove('none-mode')
                const setContainerListButton = document.getElementById('lazydev-set-list');
                setContainerListButton.addEventListener('click', setContainerList)
                AddDynamic_Content();
            }
        });
    }
    if(target.hasAttribute('data-list')){
        const data_list = target.getAttribute('data-list');
        const data_element = document.getElementById(data_list);
        container_list_choosen = data_element;
        container_list_choosen.classList.add('lazydev-container-list');
        label_container_list.innerHTML = `<span style="color: white;">Container List :</span> <span style="color: green;">${data_element.id}</span>`;
        const dynamic_div = document.querySelectorAll('.dynamic-div');
            dynamic_div.forEach(div => {
                div.classList.remove('none-mode');
            });
            loadmore_set.addEventListener('click', setLoadmoreElement);
            document.getElementById('lazydev-data-per-session').addEventListener('input',setRenderLimit);
            document.getElementById('url-query-check').addEventListener('input',setURLQuery);
            document.getElementById('lazydev-data-offset-start').addEventListener('input', setOffsetStart);
            document.getElementById('lazydev-edit-dynamic-content').addEventListener('click', Dynamic_content_Selector);
            document.getElementById('advance-query-check').addEventListener('click', setAdvanceQuerry);
            document.getElementById('order-query-select').addEventListener('input', setOrderQuery);
    }
    if(target.hasAttribute('data-loadmore')){
        const data_load = target.getAttribute('data-loadmore');
        const data_element = document.getElementById(data_load);
        loadmore_element_choosen = data_element;
        label_loadmore.innerHTML = `<span style="color: white;">Loadmore Element :</span> <span style="color: green;">${data_element.id}</span>`;
        loadmore_element_choosen.classList.add('lazydev-loadmore-el')
    } document.getElementById('lazydev-data-offset-start').addEventListener('input', setOffsetStart);
    if(target.hasAttribute('data-render-limit')){
        const renderValue = document.getElementById('lazydev-data-per-session');
        const data_render = target.getAttribute('data-render-limit');
        renderValue.value = data_render;
    }
    if(target.hasAttribute('data-offset-start')){
        const renderValue = document.getElementById('lazydev-data-offset-start');
        const data_render = target.getAttribute('data-offset-start');
        renderValue.value = data_render;
    }
    if(target.hasAttribute('data-order-query')){
        const renderValue = document.getElementById('order-query-select');
        const data_render = target.getAttribute('data-order-query');
        renderValue.value = data_render;
    }
    if(target.hasAttribute('data-url-query')){
        const renderValue = document.getElementById('url-query-check');
        const data_render = target.getAttribute('data-url-query');
        if(data_render === 'true'){
            renderValue.checked = true;
        }
    }
    if(target.hasAttribute('data-advance-querry')){
        const data_AQ = target.getAttribute('data-advance-querry');
        const AQ_checklist = document.getElementById('advance-query-check');
        if(data_AQ == true || data_AQ == 'true'){
            AQ_checklist.checked = true;
            setAdvanceQuerry();
        } else {
            AQ_checklist.checked = false;
        }
    }
    if(target.hasAttribute('data-saved-querry')){
        const attr = target.getAttribute('data-saved-querry');
        const arr = JSON.parse(attr);
        arr.forEach(aq => {
            addAdvanceQuerry(aq)
        });
    }
    }
    function changeTable(){
        const select_table = document.getElementById('custom_table');
        const setContainerListButton = document.getElementById('lazydev-set-list');
        const AQ_checklist = document.getElementById('advance-query-check');
        select_table.addEventListener('input', ()=>{
            const container_set = document.querySelector('.container-set')
            if(select_table.value !== ''){
                container_set.classList.remove('none-mode')
                setContainerListButton.addEventListener('click', setContainerList)
                AQ_checklist.addEventListener('click', setAdvanceQuerry);
            data_Tables.forEach(table => {
                if(table.id == select_table.value){
                    table_choosen = table;
                    data_choosen = table.data;
                    target.setAttribute('data-dynamic-table', table.id);
                    AddDynamic_Content();
                }
            });
            } else {
                container_set.classList.add('none-mode')
                setContainerListButton.removeEventListener('click', setContainerList)
                AQ_checklist.removeEventListener('click', setAdvanceQuerry);
                table_choosen = '';
                data_choosen = '';
            }
        })
    }
    function setContainerList(){
        editDynamicAnim();
        document.getElementById('ClosePopup-Button').addEventListener('click', removeEL)
        let dataTarget = '';
        const targetChild = target.querySelectorAll('[lazydev]')
        targetChild.forEach(child => {
            const child_identity = child.getAttribute('data-identity')
            if(child_identity === 'Main Container' 
            || child_identity === 'Child Container'
            || child_identity === 'Wrapper'){
                if(child !== container_list_choosen 
                    && !isDescendantOrSelf(child, container_list_choosen)  
                    && !isDescendantOrSelf(child, loadmore_element_choosen)){
                    child.classList.add('lazydev-container-child');
                
                    child.addEventListener('mouseenter', handleMouseEnter);
        
                    child.addEventListener('click', handleClick);
            
                    child.addEventListener('mouseleave', handleMouseLeave);
                }
            }
        });

        //-----------------------//
        function handleMouseEnter(event) {
            this.classList.add('lazydev-container-child-hover');
            dataTarget = this;
            var parentElement = this.parentNode;
        
            while (parentElement !== document.body) {
              parentElement.classList.remove('lazydev-container-child-hover');
              parentElement = parentElement.parentNode;
            }
          }
          function handleMouseLeave(event) {
            dataTarget.classList.remove('lazydev-container-child-hover');
            dataTarget.classList.add('lazydev-container-child');
          }
          function handleClick(event) {
            event.stopPropagation();
            if(container_list_choosen !== ''){
                container_list_choosen.classList.remove('lazydev-container-list');
            }
            container_list_choosen = dataTarget;
            container_list_choosen.setAttribute('data-list', 'true');
            target.setAttribute('data-list', container_list_choosen.id);
            target.setAttribute('data-offset-start', 0);
            target.setAttribute('data-render-limit', 10);
            label_container_list.innerHTML = `<span style="color: white;">Container List :</span> <span style="color: green;">${dataTarget.id}</span>`;
            document.getElementById('ClosePopup-Button').click();
            container_list_choosen.classList.add('lazydev-container-list')
            const dynamic_div = document.querySelectorAll('.dynamic-div');
            dynamic_div.forEach(div => {
                div.classList.remove('none-mode');
            });
            loadmore_set.addEventListener('click', setLoadmoreElement);
            document.getElementById('lazydev-data-per-session').addEventListener('input',setRenderLimit);
            document.getElementById('lazydev-data-offset-start').addEventListener('input', setOffsetStart);
            document.getElementById('lazydev-edit-dynamic-content').addEventListener('click', Dynamic_content_Selector);
            document.getElementById('advance-query-check').addEventListener('click', setAdvanceQuerry);
            document.getElementById('order-query-select').addEventListener('input', setOrderQuery);
          }
          function removeEL(){
            document.getElementById('ClosePopup-Button').removeEventListener('click', removeEL)
            targetChild.forEach(child => {
                const child_identity = child.getAttribute('data-identity')
                if(child_identity === 'Main Container' 
                || child_identity === 'Child Container'
                || child_identity === 'Wrapper'){
                    child.classList.remove('lazydev-container-child');
                    child.classList.remove('lazydev-container-child-hover');
                    
                    child.removeEventListener('mouseenter', handleMouseEnter);
        
                    child.removeEventListener('click', handleClick);
            
                    child.removeEventListener('mouseleave', handleMouseLeave);
                }
            });
          }
        //-----------------------//
    }
    function setLoadmoreElement(){
        editDynamicAnim();
        document.getElementById('PopupText').textContent = 'Click The Element Target as Loadmore Element';
        let dataTarget = '';
        const targetChild = target.querySelectorAll('[lazydev]')
        targetChild.forEach(child => {
            if(!isDescendantOrSelf(child, container_list_choosen) && child !== loadmore_element_choosen){
                child.classList.add('lazydev-loadmore-child');
                
                child.addEventListener('mouseenter', handleMouseEnter);
    
                child.addEventListener('click', handleClick);
        
                child.addEventListener('mouseleave', handleMouseLeave);
            }
        });

        //-----------------------//
        function handleMouseEnter(event) {
            this.classList.add('lazydev-loadmore-child-hover');
            dataTarget = this;
            var parentElement = this.parentNode;
        
            while (parentElement !== document.body) {
              parentElement.classList.remove('lazydev-loadmore-child-hover');
              parentElement = parentElement.parentNode;
            }
          }
          function handleMouseLeave(event) {
            dataTarget.classList.remove('lazydev-loadmore-child-hover');
            dataTarget.classList.add('lazydev-loadmore-child');
          }
          function handleClick(event) {
            event.stopPropagation();
            if(loadmore_element_choosen !== ''){
                loadmore_element_choosen.classList.remove('lazydev-container-list');
            }
            loadmore_element_choosen = dataTarget;
            loadmore_element_choosen.setAttribute('data-loadmore', 'true');
            target.setAttribute('data-loadmore', loadmore_element_choosen.id);
            label_loadmore.innerHTML = `<span style="color: white;">Loadmore Element :</span> <span style="color: green;">${dataTarget.id}</span>`;
            document.getElementById('ClosePopup-Button').click();
            dataTarget.classList.add('lazydev-loadmore-el')
            dataTarget.classList.remove('lazydev-loadmore-child');
            dataTarget.classList.remove('lazydev-loadmore-child-hover');
            removeEL()
          }
          function removeEL(){
            document.getElementById('ClosePopup-Button').removeEventListener('click', removeEL)
            targetChild.forEach(child => {
                if(child !== container_list_choosen){
                    child.classList.remove('lazydev-loadmore-child');
                    
                    child.removeEventListener('mouseenter', handleMouseEnter);
        
                    child.removeEventListener('click', handleClick);
            
                    child.removeEventListener('mouseleave', handleMouseLeave);
                }
            });
          }
        //-----------------------//
    }
    function setRenderLimit(){
        const renderValue = document.getElementById('lazydev-data-per-session');
        target.setAttribute('data-render-limit', renderValue.value)
    }
    function setOffsetStart(){
        const renderValue = document.getElementById('lazydev-data-offset-start');
        target.setAttribute('data-offset-start', renderValue.value)
    }
    function setURLQuery(){
        const URL_checklist = document.getElementById('url-query-check');
        if(URL_checklist.checked === true && table_choosen !== ''){
            target.setAttribute('data-url-query', 'true');
        } else {
            target.removeAttribute('data-url-query');
        }
    }
    function setOrderQuery(){
        const orderSelect = document.getElementById('order-query-select');
        target.setAttribute('data-order-query', orderSelect.value);
    }
    function setAdvanceQuerry(){
        const AQ_checklist = document.getElementById('advance-query-check');
        const AQ_Div = document.getElementById('advance-query-div');
        const add_querry = document.getElementById('lazydev-add-custom_querry');
        if(AQ_checklist.checked === true && table_choosen !== ''){
            AQ_Div.classList.remove('none-mode')
            target.setAttribute('data-advance-querry', 'true');
            add_querry.addEventListener('click', function(event) {
                event.preventDefault();
            });
            add_querry.addEventListener('click',addAdvanceQuerry);

        } else {
            AQ_Div.classList.add('none-mode');
            target.removeAttribute('data-advance-querry');
            add_querry.addEventListener('click',addAdvanceQuerry);
        }
    }
    function addAdvanceQuerry(saved_querry){
        //-------------------------//
        if(entry <2){
            document.getElementById('close-menu').addEventListener('click', setAQDataAttribute);
        }
        //-------------------------//
        let saved_field = 'title';
        let saved_condition = 'Include';
        let saved_value = '';
        let saved_type = 'text';
        if(!saved_querry.isTrusted){
            saved_field = saved_querry.field;
            saved_condition = saved_querry.condition;
            saved_value = saved_querry.value;
            saved_type = saved_querry.type;
        }
        const add_querry = document.getElementById('lazydev-add-custom_querry');
        const parentDiv = document.getElementById('advance-query-div');
        const div = document.createElement('div');
        div.classList.add('advance-query-child');
        div.innerHTML = `
        <select id="querry-select-${entry}" style="width: 90% !important;" class="margin-top-aq"></select>

        <select id="querry-condition-${entry}" style="width: 90% !important;" class="margin-top-aq">
        <option value="Include">Equal</option>
        <option value="Exclude">Not Equal</option>
        </select>

        <input id="querry-value-${entry}" style="width: 90% !important;" type="text" class="margin-top-aq">
        <button style="width: 100% !important;" id="delete-custom_querry-${entry}">Delete Querry</button>
        </div>`;
        parentDiv.insertBefore(div,add_querry);
        //----------------------------------------------------//
        const querrySelect = document.getElementById(`querry-select-${entry}`);
        const conditionSelect = document.getElementById(`querry-condition-${entry}`);
        const querryval = document.getElementById(`querry-value-${entry}`);
        const deleteQuerry = document.getElementById(`delete-custom_querry-${entry}`);
        //----------------------------------------------------//
        const tableQuerry = [];
        const querry_Table = table_choosen.custom_fields;
        const titleQuerry = {name : "title", value : 'title',type: 'text'};
        tableQuerry.push(titleQuerry)
        querry_Table.forEach(field => {
            if(field.type !== 'Password' &&  field.type !== 'Media' && field.type !== "WYSIWYG" && field.type !== "Color"){
                let type = 'text';
                if(field.type === 'Number'){
                    type = 'number'
                }
                const new_querry = {name : field.name, value : field.name, type};
                tableQuerry.push(new_querry)
            }
        });
        tableQuerry.forEach(querry => {
            const option = document.createElement('option');
            option.textContent = querry.name;
            option.value = querry.value;
            querrySelect.appendChild(option);
        });
        const new_advance_querry = {id : entry, field : saved_field, condition : saved_condition, value: saved_value,type: saved_type};
        advance_querry.push(new_advance_querry);
        //----------------------------------------------------//
        querrySelect.addEventListener('input', ()=>{
            new_advance_querry.field = querrySelect.value;
            tableQuerry.forEach(querry => {
                if(querry.name === new_advance_querry.field){
                    new_advance_querry.type = querry.type;
                }
            });
        })
        conditionSelect.addEventListener('input', ()=>{
            new_advance_querry.condition = conditionSelect.value;
        })
        querryval.addEventListener('input', ()=>{
            new_advance_querry.value = querryval.value;
        })
        deleteQuerry.addEventListener('click', function(event) {
            event.preventDefault();
            const index = advance_querry.findIndex(querry => querry.id === new_advance_querry.id);
            if (index !== -1) {
                advance_querry.splice(index, 1);
                div.remove();
            }
        });
        //----------------------------------------------------//
        if(!saved_querry.isTrusted){
            querryval.value = saved_querry.value;
            for (let i = 0; i < querrySelect.options.length; i++) {
                if (querrySelect.options[i].value === saved_querry.field) {
                    querrySelect.selectedIndex = i;
                  break;
                }
              }
            for (let i = 0; i < conditionSelect.options.length; i++) {
                if (conditionSelect.options[i].value === saved_querry.condition) {
                    conditionSelect.selectedIndex = i;
                  break;
                }
              }
        }
        //----------------------------------------------------//
        entry += 1;
    }
    function setAQDataAttribute(){
        document.getElementById('close-menu').removeEventListener('click', setAQDataAttribute);
        const newParse = JSON.stringify(advance_querry);
        target.setAttribute('data-saved-querry', newParse);
        advance_querry = [];
    }
    //-----------------------------------------//
}

export function checkDynamicChild(target,state){
if(state === 'selector'){
    let dynamic_child = false;
    if(target.hasAttribute('data-dynamic-child')){
        target.classList.add('el-lazydev-opacity');
        dynamic_child = true;
    }
    return dynamic_child
}
}

export function resetDynamic_Content(target){
    target.removeAttribute('data-dynamic', true);
    const targetChild = target.querySelectorAll('[lazydev]');
    targetChild.forEach(chld => {
        chld.removeAttribute('data-dynamic-child');
        chld.classList.remove('el-lazydev-opacity');
    });
    if(target.hasAttribute('data-dynamic-table')){
        target.removeAttribute('data-dynamic-table');
    }
    if(target.hasAttribute('data-list')){
        const data_list = target.getAttribute('data-list');
        const data_element = document.getElementById(data_list);
        data_element.removeAttribute('data-list');
        target.removeAttribute('data-list');
        
    }
    if(target.hasAttribute('data-loadmore')){
        const data_load = target.getAttribute('data-loadmore');
        const data_element = document.getElementById(data_load);
        data_element.removeAttribute('data-loadmore');
        target.removeAttribute('data-loadmore');
    }
    if(target.hasAttribute('data-render-limit')){
        target.removeAttribute('data-render-limit');
    }
    if(target.hasAttribute('data-offset-start')){
        target.removeAttribute('data-offset-start');
    }
    if(target.hasAttribute('data-advance-querry')){
        target.removeAttribute('data-advance-querry');
    }
    if(target.hasAttribute('data-saved-querry')){
        target.removeAttribute('data-saved-querry');
    }
    main_container = '';
    table_choosen = '';
    data_choosen = '';
    container_list_choosen = '';
    loadmore_element_choosen = '';
}

//==================================================//
function Dynamic_content_Selector(){
editDynamicAnim();
let PopupText = document.getElementById("PopupText");
PopupText.textContent = "Click The Child Of The Target";
document.getElementById("ClosePopup-Button").addEventListener("click", ()=>{
    main_container.classList.add('lazydev-dynamic-container');
    container_list_choosen.classList.add('lazydev-container-list');
    container_list_choosen.classList.remove('lazydev-container-list-selector');
    if(loadmore_element_choosen){
        loadmore_element_choosen.classList.add('lazydev-loadmore-el');
    }
});
//-------------------------------------------//
main_container.classList.remove('lazydev-dynamic-container');
container_list_choosen.classList.remove('lazydev-container-list');
// container_list_choosen.classList.add('lazydev-container-list-selector');
if(loadmore_element_choosen){
    loadmore_element_choosen.classList.remove('lazydev-loadmore-el');
}
//-------------------------------------------//
let dataTarget = '';
//-------------------------------------------//
container_list_choosen.classList.add('lazydev-loadmore-child');

container_list_choosen.addEventListener('mouseenter', handleMouseEnter);

container_list_choosen.addEventListener('click', handleClick);

container_list_choosen.addEventListener('mouseleave', handleMouseLeave);

const targetChild = container_list_choosen.querySelectorAll('[lazydev]')
        targetChild.forEach(child => {
            child.classList.add('lazydev-loadmore-child');

            child.addEventListener('mouseenter', handleMouseEnter);
    
            child.addEventListener('click', handleClick);
        
            child.addEventListener('mouseleave', handleMouseLeave);
        });
        document.getElementById('ClosePopup-Button').addEventListener('click', removeEL)
        //-----------------------//
        function handleMouseEnter(event) {
            this.classList.add('lazydev-loadmore-child-hover');
            dataTarget = this;
            var parentElement = this.parentNode;
        
            while (parentElement !== document.body) {
              parentElement.classList.remove('lazydev-loadmore-child-hover');
              parentElement = parentElement.parentNode;
            }
          }
          function handleMouseLeave(event) {
            dataTarget.classList.remove('lazydev-loadmore-child-hover');
            dataTarget.classList.add('lazydev-loadmore-child');
          }
          function handleClick(event) {
            event.stopPropagation();
            removeEL();
            const CX = event.clientX;
            const CY = event.clientY;
            Display_Data_Content(dataTarget,CX,CY);
          }
          function removeEL(){
            document.getElementById('ClosePopup-Button').removeEventListener('click', removeEL)
            targetChild.forEach(child => {
                child.classList.remove('lazydev-loadmore-child');

                child.classList.remove('lazydev-loadmore-child-hover');

                child.removeEventListener('mouseenter', handleMouseEnter);
        
                child.removeEventListener('click', handleClick);
            
                child.removeEventListener('mouseleave', handleMouseLeave);
            });
            container_list_choosen.classList.remove('lazydev-loadmore-child');

            container_list_choosen.removeEventListener('mouseenter', handleMouseEnter);

            container_list_choosen.removeEventListener('click', handleClick);

            container_list_choosen.removeEventListener('mouseleave', handleMouseLeave);
          }
        //-----------------------//
}
function Display_Data_Content(target,CoordinateX,CoordinateY){
dynamic_target = target;
document.getElementById('Popup').remove();
let MCPopup;
appendToContainer();
//-------------------------------------------//
function appendToContainer(){
    let DynamicHTML = `
<div id="cancel-this-target" class="drags" title="Cancel">
<i class="fa-solid fa-ban"></i>
<p>Cancel</p>
</div>
`
    MCPopup = document.createElement("SECTION")
    MCPopup.setAttribute("id","drag-container");
    let x = 50;
    let y = 0;
    // if (x < 0.5 * window.innerWidth) {
    //     x += 0;
    //     } else {
    //     x -= 200;
    //     }
    //     if (y < 0.5 * window.innerHeight) {
    //         y += 50;
    //         } else if(y > 0.5 * window.innerHeight) {
    //         y -= 350;
    //         } else {
    //             y += 0;
    //         }
    MCPopup.style.marginLeft = `${x}%`;
    MCPopup.style.marginTop = `${y}px`;
    
    MCPopup.innerHTML = DynamicHTML;
    document.body.appendChild(MCPopup);

    let cancelButton = document.getElementById("cancel-this-target");
    cancelButton.addEventListener("click", ()=>
    {
        MCPopup.remove();
        dynamic_target = '';
        Dynamic_content_Selector();
    })
    appendtoMCPopup();
   }
function appendtoMCPopup(){
let cancelButton = document.getElementById("cancel-this-target");
const identity = target.getAttribute('data-identity');
const tagname = target.tagname;
data_fields.forEach(field => {
    //nanti hapus
    if(!field.customFunc){
        return
    }
    //nanti hapus
    field.customFunc.forEach(cf => {
        if(cf.name === identity){
            const new_menu = document.createElement('div');
            new_menu.classList.add('drags');
            new_menu.classList.add('lazydev-new_menu');
            new_menu.setAttribute('title', field.name);
            new_menu.innerHTML = `<p>${field.name}</p>`;
            cancelButton.parentElement.insertBefore(new_menu,cancelButton)
            new_menu.addEventListener('click',()=>{
                delete_new_menu()
                cf.func();
                // field.customFunc.forEach(element => {
                //     element.func();
                // });
            })
        }
    });
});
function delete_new_menu(){
    const allmenu = document.querySelectorAll('.lazydev-new_menu');
            allmenu.forEach(menu => {
            menu.remove();
            });
}
}
//-------------------------------------------//
}
function AddDynamic_Content(){
    data_fields = [];
    let data_title = 'Lorem Ipsum';
    if(table_choosen.data.title !== '' && table_choosen.data.title !== null){
        data_title = table_choosen.data.title
    }
    const title = {type : 'title',name: 'title', value: data_title, customFunc : [
        {
            name : 'Header Text',
            func : ()=>{
                text(title,'Header Text')
                }
        },
        {
            name : 'Content Text',
            func : ()=>{
                text(title,'Content Text')
                }
        },
    ]};
    data_fields.push(title)
    let data_url = null;
    if(table_choosen.data.url !== null){
        // console.log(table_choosen.data)
        data_url = table_choosen.data.url;
        const url = {name: 'URL',type : 'url',name: 'url', value: data_url, customFunc : [
            {
                name : 'Content Text',
                func : ()=>{
                    let tagname = dynamic_target.tagName;
                    if(tagname === 'A'){
                        href(url,'Link');
                    }
                    if(tagname === 'BUTTON'){
                        onClick(url,'onClick Link Event');
                    }
                    }
            },
            {
                name : 'Wrapper',
                func : ()=>{
                    let tagname = dynamic_target.tagName;
                    if(tagname === 'A'){
                        href(url,'Link');
                    }
                    }
            },
            {
                name : 'Child Container',
                func : ()=>{
                    let tagname = dynamic_target.tagName;
                    if(tagname === 'A'){
                        href(url,'Link');
                    }
                    }
            },
        ]
        };
        data_fields.push(url)
    }
    const allField = table_choosen.custom_fields;
    allField.forEach(field => {
        if (field.type === "Text") {
            const dataField_value = data_choosen_checkVal(field);
            const newField = {
                type: 'Text',
                name: field.name,
                value: dataField_value,
                customFunc: [
                    {
                        name : 'Header Text',
                        func : ()=>{
                            text(newField,'Header Text')
                            changetitle(newField,'A Title');
                            }
                    },
                    {
                        name : 'Content Text',
                        func : ()=>{
                            let tagname = dynamic_target.tagName;
                            if(tagname === 'A'){
                                href(newField,'Link');
                                text(newField,'Content Text');
                            } else {
                                text(newField,'Content Text');
                            }
                            }
                    },
                    {
                        name : 'Formfield',
                        func : ()=>{
                            let typeName = dynamic_target.getAttribute('type').toLowerCase();
                            if(typeName === 'text' || typeName === 'search' || typeName === 'email' || typeName === 'password' || typeName === 'url' ){
                                changeplaceholder(newField,'As Placeholder');
                                changeval(newField,'As Value');
                            } else {
                                noChange('There is nothing we can do');
                            }
                            }
                    },
                    {
                        name : 'Submit',
                        func : ()=>{
                            onClick(newField,'onClick Link Event');
                            textContent(newField,'Content Text');
                            }
                    },
                    {
                        name : 'Wrapper',
                        func : ()=>{
                            onClick(newField,'onClick Link Event');
                            changetitle(newField,'A Title');
                            }
                    },
                    {
                        name : 'Child Container',
                        func : ()=>{
                            onClick(newField,'onClick Link Event');
                            changetitle(newField,'A Title');
                            }
                    },
                    {
                        name : 'Main Container',
                        func : ()=>{
                            onClick(newField,'onClick Link Event');
                            changetitle(newField,'A Title');
                            }
                    },
                    {
                        name : 'Image',
                        func : ()=>{
                            onClick(newField,'onClick Link Event');
                            changetitle(newField,'A Title');
                            }
                    },

                ],

            };
            data_fields.push(newField);
        }
        else if (field.type === "Number") {
            const dataField_value = data_choosen_checkVal(field);
            const newField = {
                type: 'Number',
                name: field.name,
                value: dataField_value,
                customFunc: [
                    {
                        name : 'Header Text',
                        func : ()=>{
                            text(newField,'Header Text')
                            }
                    },
                    {
                        name : 'Content Text',
                        func : ()=>{
                            text(newField,'Content Text');
                            }
                    },
                    {
                        name : 'Formfield',
                        func : ()=>{
                            let typeName = dynamic_target.getAttribute('type').toLowerCase();
                            if(typeName === 'number' ){
                                changeplaceholder(newField,'As Placeholder');
                                changeval(newField,'As Value');
                            } else {
                                noChange('There is nothing we can do');
                            }
                            }
                    },
                    {
                        name : 'Submit',
                        func : ()=>{
                            textContent(newField,'Content Text');
                            }
                    },

                ],
            };
            data_fields.push(newField);
        }
        else if (field.type === "Email") {
            const dataField_value = data_choosen_checkVal(field);
            const newField = {
                type: 'Email',
                name: field.name,
                value: dataField_value,
                customFunc: [
                    {
                        name : 'Header Text',
                        func : ()=>{
                            text(newField,'Header Text')
                            }
                    },
                    {
                        name : 'Content Text',
                        func : ()=>{
                            text(newField,'Content Text');
                            }
                    },
                    {
                        name : 'Formfield',
                        func : ()=>{
                            let typeName = dynamic_target.getAttribute('type').toLowerCase();
                            if(typeName === 'email' || typeName === 'text' ){
                                changeplaceholder(newField,'As Placeholder');
                                changeval(newField,'As Value');
                            } else {
                                noChange('There is nothing we can do');
                            }
                            }
                    },

                ],
            };
            data_fields.push(newField);
        }
        else if (field.type === "Select") {
            const dataField_value = data_choosen_checkVal(field);
            const newField = {
                type: 'Select',
                name: field.name,
                value: dataField_value,
                customFunc: [
                    {
                        name : 'Header Text',
                        func : ()=>{
                            text(newField,'Header Text')
                            }
                    },
                    {
                        name : 'Content Text',
                        func : ()=>{
                            text(newField,'Content Text');
                            }
                    },
                    {
                        name : 'Formfield',
                        func : ()=>{
                            let typeName = dynamic_target.getAttribute('type').toLowerCase();
                            let tagname = dynamic_target.tagName.toLowerCase();
                            if(typeName === 'email' || typeName === 'text' ){
                                changeval(newField,'As Value');
                            } else if(tagname === 'select'){
                                changeval(newField,'As Value');
                            } else {
                                noChange('There is nothing we can do');
                            }
                            }
                    },

                ],
            };
            data_fields.push(newField);
        }
        else if (field.type === "Password") {
            const dataField_value = data_choosen_checkVal(field);
            const newField = {
                type: 'Password',
                name: field.name,
                value: dataField_value,
                customFunc: [
                    {
                        name : 'Formfield',
                        func : ()=>{
                            let typeName = dynamic_target.getAttribute('type').toLowerCase();
                            if(typeName === 'password'){
                                changeval(newField,'As Value');
                            } else {
                                noChange('There is nothing we can do');
                            }
                            }
                    },

                ],
            };
            data_fields.push(newField);
        }
        else if (field.type === "Checkbox") {
            const dataField_value = data_choosen_checkVal(field);
            const newField = {
                type: 'Checkbox',
                name: field.name,
                value: dataField_value,
                customFunc: [
                    {
                        name : 'Header Text',
                        func : ()=>{
                            falsedisplayNone(newField,'Hide when value is false')
                            truedisplayNone(newField,'Hide when value is true')
                            }
                    },
                    {
                        name : 'Content Text',
                        func : ()=>{
                            falsedisplayNone(newField,'Hide when value is false')
                            truedisplayNone(newField,'Hide when value is true')
                            }
                    },
                    {
                        name : 'Submit',
                        func : ()=>{
                            falsedisplayNone(newField,'Hide when value is false')
                            truedisplayNone(newField,'Hide when value is true')
                            }
                    },
                    {
                        name : 'Wrapper',
                        func : ()=>{
                            falsedisplayNone(newField,'Hide when value is false')
                            truedisplayNone(newField,'Hide when value is true')
                            }
                    },
                    {
                        name : 'Child Container',
                        func : ()=>{
                            falsedisplayNone(newField,'Hide when value is false')
                            truedisplayNone(newField,'Hide when value is true')
                            }
                    },
                    {
                        name : 'Main Container',
                        func : ()=>{
                            falsedisplayNone(newField,'Hide when value is false')
                            truedisplayNone(newField,'Hide when value is true')
                            }
                    },
                    {
                        name : 'Image',
                        func : ()=>{
                            falsedisplayNone(newField,'Hide when value is false')
                            truedisplayNone(newField,'Hide when value is true')
                            }
                    },

                ],
            };
            data_fields.push(newField);
        }
        else if (field.type === "Media") {
            const dataField_value = data_choosen_checkVal(field);
            const newField = {
                type: 'Media',
                name: field.name,
                value: dataField_value,
                customFunc: [
                    {
                        name : 'Content Text',
                        func : ()=>{
                            let tagname = dynamic_target.tagName;
                            if(tagname === 'A'){
                                href(newField,'Link');
                            } else {
                                noChange('There is nothing we can do');
                            }
                            }
                    },
                    {
                        name : 'Formfield',
                        func : ()=>{
                            let typeName = dynamic_target.getAttribute('type').toLowerCase();
                            if(typeName === 'file'|| typeName === 'url' ){
                                changeval(newField,'As Value');
                            } else {
                                noChange('There is nothing we can do');
                            }
                            }
                    },
                    {
                        name : 'Submit',
                        func : ()=>{
                            onClick(newField,'onClick Link Event');
                            }
                    },
                    {
                        name : 'Child Container',
                        func : ()=>{
                            onClick(newField,'onClick Link Event');
                            changeBgImage(newField,'Background Image');
                            }
                    },
                    {
                        name : 'Wrapper',
                        func : ()=>{
                            onClick(newField,'onClick Link Event');
                            changeBgImage(newField,'Background Image');
                            }
                    },
                    {
                        name : 'Main Container',
                        func : ()=>{
                            onClick(newField,'onClick Link Event');
                            changeBgImage(newField,'Background Image');
                            }
                    },
                    {
                        name : 'Image',
                        func : ()=>{
                            onClick(newField,'onClick Link Event');
                            changeBgSrc(newField,'Image Source');
                            }
                    },

                ],
            };
            data_fields.push(newField);
        }
        else if (field.type === "Textarea") {
            const dataField_value = data_choosen_checkVal(field);
            const newField = {
                type: 'Textarea',
                name: field.name,
                value: dataField_value,
                customFunc: [
                    {
                        name : 'Content Text',
                        func : ()=>{
                            text(newField,'Content Text');
                            }
                    },
                    {
                        name : 'Formfield',
                        func : ()=>{
                            let typeName = dynamic_target.getAttribute('type').toLowerCase();
                            if(typeName === 'text' || typeName === 'search' || typeName === 'email' || typeName === 'password' || typeName === 'url' ){
                                changeplaceholder(newField,'As Placeholder');
                                changeval(newField,'As Value');
                            } else {
                                noChange('There is nothing we can do');
                            }
                            }
                    },

                ],
            };
            data_fields.push(newField);
        }
        else if (field.type === "Color") {
            const dataField_value = data_choosen_checkVal(field);
            const newField = {
                type: 'Color',
                name: field.name,
                value: dataField_value,
                customFunc: [
                    {
                        name : 'Header Text',
                        func : ()=>{
                            changeBgColor(newField,'Background Color')
                            changeBorderColor(newField,'Border Color')
                            changeFontColor(newField,'Font Color')
                            }
                    },
                    {
                        name : 'Content Text',
                        func : ()=>{
                            changeBgColor(newField,'Background Color')
                            changeBorderColor(newField,'Border Color')
                            changeFontColor(newField,'Font Color')
                            }
                    },
                    {
                        name : 'Submit',
                        func : ()=>{
                            changeBgColor(newField,'Background Color')
                            changeBorderColor(newField,'Border Color')
                            changeFontColor(newField,'Font Color')
                            }
                    },
                    {
                        name : 'Wrapper',
                        func : ()=>{
                            changeBgColor(newField,'Background Color')
                            changeBorderColor(newField,'Border Color')
                            changeFontColor(newField,'Font Color')
                            }
                    },
                    {
                        name : 'Child Container',
                        func : ()=>{
                            changeBgColor(newField,'Background Color')
                            changeBorderColor(newField,'Border Color')
                            changeFontColor(newField,'Font Color')
                            }
                    },
                    {
                        name : 'Main Container',
                        func : ()=>{
                            changeBgColor(newField,'Background Color')
                            changeBorderColor(newField,'Border Color')
                            changeFontColor(newField,'Font Color')
                            }
                    },
                    {
                        name : 'Image',
                        func : ()=>{
                            changeBgColor(newField,'Background Color')
                            changeBorderColor(newField,'Border Color')
                            }
                    },

                ],
            };
            data_fields.push(newField);
        }
        else if (field.type === "WYSIWYG") {
            const dataField_value = data_choosen_checkVal(field);
            const newField = {
                type: 'WYSIWYG',
                name: field.name,
                value: dataField_value,
                customFunc: [
                    {
                        name : 'Header Text',
                        func : ()=>{
                            text(newField,'Header Text')
                            }
                    },
                    {
                        name : 'Content Text',
                        func : ()=>{
                            text(newField,'Content Text')
                            }
                    },
                ],
            };
            data_fields.push(newField);
        }
         else {
            
        }
    });
    function text(field,text){
        let cancelButton = document.getElementById("cancel-this-target");
        const new_menu = document.createElement('div');
        new_menu.classList.add('drags');
        new_menu.classList.add('lazydev-new_menu');
        new_menu.setAttribute('title', field.name);
        new_menu.innerHTML = `<p>set ${field.name} for ${text}</p>`;
        cancelButton.parentElement.insertBefore(new_menu,cancelButton)
        new_menu.addEventListener('click', ()=>{
        let New_content = field.value.replace(/<\/?p>/g, '');
        dynamic_target.innerHTML = `${New_content}`; 
        dynamic_target.setAttribute('data-dynamic-content', `${field.name}`);
        dynamic_target.setAttribute('data-dynamic-content-type', 'text');
        document.getElementById('cancel-this-target').click();
        })
    }
    function textContent(field,text){
        let cancelButton = document.getElementById("cancel-this-target");
        const new_menu = document.createElement('div');
        new_menu.classList.add('drags');
        new_menu.classList.add('lazydev-new_menu');
        new_menu.setAttribute('title', field.name);
        new_menu.innerHTML = `<p>set ${field.name} for ${text}</p>`;
        cancelButton.parentElement.insertBefore(new_menu,cancelButton)
        new_menu.addEventListener('click', ()=>{
        dynamic_target.textContent = `${field.value}`; 
        dynamic_target.setAttribute('data-dynamic-content', `${field.name}`);
        dynamic_target.setAttribute('data-dynamic-content-type', 'textContent')
        propertiesEditor(dynamic_target);
        document.getElementById('cancel-this-target').click();
        })
    }
    function href(field,text){
        let cancelButton = document.getElementById("cancel-this-target");
        const new_menu = document.createElement('div');
        new_menu.classList.add('drags');
        new_menu.classList.add('lazydev-new_menu');
        new_menu.setAttribute('title', field.name);
        new_menu.innerHTML = `<p>set ${field.name} for ${text}</p>`;
        cancelButton.parentElement.insertBefore(new_menu,cancelButton)
        new_menu.addEventListener('click', ()=>{
        dynamic_target.setAttribute('data-href',field.value);
        dynamic_target.setAttribute('data-dynamic-content', `${field.name}`)
        dynamic_target.setAttribute('data-dynamic-content-type', 'href')
        propertiesEditor(dynamic_target);
        document.getElementById('cancel-this-target').click();
        })
    }
    function onClick(field,text){
        let cancelButton = document.getElementById("cancel-this-target");
        const new_menu = document.createElement('div');
        new_menu.classList.add('drags');
        new_menu.classList.add('lazydev-new_menu');
        new_menu.setAttribute('title', field.name);
        new_menu.innerHTML = `<p>set ${field.name} for ${text}</p>`;
        cancelButton.parentElement.insertBefore(new_menu,cancelButton)
        new_menu.addEventListener('click', ()=>{
        dynamic_target.setAttribute('data-onClick',`window.location.href='${field.value}';`);
        dynamic_target.setAttribute('data-dynamic-content', `${field.name}`)
        dynamic_target.setAttribute('data-dynamic-content-type', 'onClick')
        propertiesEditor(dynamic_target);
        document.getElementById('cancel-this-target').click();
        })
    }
    function changetitle(field,text){
        let cancelButton = document.getElementById("cancel-this-target");
        const new_menu = document.createElement('div');
        new_menu.classList.add('drags');
        new_menu.classList.add('lazydev-new_menu');
        new_menu.setAttribute('title', field.name);
        new_menu.innerHTML = `<p>set ${field.name} for ${text}</p>`;
        cancelButton.parentElement.insertBefore(new_menu,cancelButton)
        new_menu.addEventListener('click', ()=>{
        dynamic_target.setAttribute('title',field.value);
        dynamic_target.setAttribute('data-dynamic-content', `${field.name}`)
        dynamic_target.setAttribute('data-dynamic-content-type', 'changetitle')
        propertiesEditor(dynamic_target);
        document.getElementById('cancel-this-target').click();
        })
    }
    function changeplaceholder(field,text){
        let cancelButton = document.getElementById("cancel-this-target");
        const new_menu = document.createElement('div');
        new_menu.classList.add('drags');
        new_menu.classList.add('lazydev-new_menu');
        new_menu.setAttribute('title', field.name);
        new_menu.innerHTML = `<p>set ${field.name} for ${text}</p>`;
        cancelButton.parentElement.insertBefore(new_menu,cancelButton)
        new_menu.addEventListener('click', ()=>{
        dynamic_target.setAttribute('placeholder',field.value);
        dynamic_target.setAttribute('data-dynamic-content', `${field.name}`)
        dynamic_target.setAttribute('data-dynamic-content-type', 'changeplaceholder')
        propertiesEditor(dynamic_target);
        document.getElementById('cancel-this-target').click();
        })
    }
    function changeval(field,text){
        let cancelButton = document.getElementById("cancel-this-target");
        const new_menu = document.createElement('div');
        new_menu.classList.add('drags');
        new_menu.classList.add('lazydev-new_menu');
        new_menu.setAttribute('title', field.name);
        new_menu.innerHTML = `<p>set ${field.name} for ${text}</p>`;
        cancelButton.parentElement.insertBefore(new_menu,cancelButton)
        new_menu.addEventListener('click', ()=>{
        dynamic_target.setAttribute('value',field.value);
        dynamic_target.setAttribute('data-dynamic-content', `${field.name}`)
        dynamic_target.setAttribute('data-dynamic-content-type', 'changeval')
        propertiesEditor(dynamic_target);
        document.getElementById('cancel-this-target').click();
        })
    }
    function changeBgImage(field,text){
        let cancelButton = document.getElementById("cancel-this-target");
        const new_menu = document.createElement('div');
        new_menu.classList.add('drags');
        new_menu.classList.add('lazydev-new_menu');
        new_menu.setAttribute('title', field.name);
        new_menu.innerHTML = `<p>set ${field.name} for ${text}</p>`;
        cancelButton.parentElement.insertBefore(new_menu,cancelButton)
        new_menu.addEventListener('click', ()=>{
        dynamic_target.setAttribute('data-background-image',field.value);
        dynamic_target.setAttribute('data-dynamic-content', `${field.name}`)
        dynamic_target.setAttribute('data-dynamic-content-type', 'changeBgImage')
        propertiesEditor(dynamic_target);
        document.getElementById('cancel-this-target').click();
        })
    }
    function changeBgSrc(field,text){
        let cancelButton = document.getElementById("cancel-this-target");
        const new_menu = document.createElement('div');
        new_menu.classList.add('drags');
        new_menu.classList.add('lazydev-new_menu');
        new_menu.setAttribute('title', field.name);
        new_menu.innerHTML = `<p>set ${field.name} for ${text}</p>`;
        cancelButton.parentElement.insertBefore(new_menu,cancelButton)
        new_menu.addEventListener('click', ()=>{
        dynamic_target.setAttribute('src',field.value);
        dynamic_target.setAttribute('data-dynamic-content', `${field.name}`)
        dynamic_target.setAttribute('data-dynamic-content-type', 'changeBgSrc')
        propertiesEditor(dynamic_target);
        document.getElementById('cancel-this-target').click();
        })
    }
    function changeBgColor(field,text){
        let cancelButton = document.getElementById("cancel-this-target");
        const new_menu = document.createElement('div');
        new_menu.classList.add('drags');
        new_menu.classList.add('lazydev-new_menu');
        new_menu.setAttribute('title', field.name);
        new_menu.innerHTML = `<p>set ${field.name} for ${text}</p>`;
        cancelButton.parentElement.insertBefore(new_menu,cancelButton)
        new_menu.addEventListener('click', ()=>{
        dynamic_target.setAttribute('data-background-color-result',field.value);
        dynamic_target.setAttribute('data-dynamic-content', `${field.name}`)
        dynamic_target.setAttribute('data-dynamic-content-type', 'changeBgColor')
        propertiesEditor(dynamic_target);
        document.getElementById('cancel-this-target').click();
        })
    }
    function changeBorderColor(field,text){
        let cancelButton = document.getElementById("cancel-this-target");
        const new_menu = document.createElement('div');
        new_menu.classList.add('drags');
        new_menu.classList.add('lazydev-new_menu');
        new_menu.setAttribute('title', field.name);
        new_menu.innerHTML = `<p>set ${field.name} for ${text}</p>`;
        cancelButton.parentElement.insertBefore(new_menu,cancelButton)
        new_menu.addEventListener('click', ()=>{
        dynamic_target.setAttribute('data-border-color',field.value);
        dynamic_target.setAttribute('data-dynamic-content', `${field.name}`)
        dynamic_target.setAttribute('data-dynamic-content-type', 'changeBorderColor')
        propertiesEditor(dynamic_target);
        document.getElementById('cancel-this-target').click();
        })
    }
    function changeFontColor(field,text){
        let cancelButton = document.getElementById("cancel-this-target");
        const new_menu = document.createElement('div');
        new_menu.classList.add('drags');
        new_menu.classList.add('lazydev-new_menu');
        new_menu.setAttribute('title', field.name);
        new_menu.innerHTML = `<p>set ${field.name} for ${text}</p>`;
        cancelButton.parentElement.insertBefore(new_menu,cancelButton)
        new_menu.addEventListener('click', ()=>{
        dynamic_target.setAttribute('data-font-color',field.value);
        dynamic_target.setAttribute('data-dynamic-content', `${field.name}`)
        dynamic_target.setAttribute('data-dynamic-content-type', 'changeFontColor')
        propertiesEditor(dynamic_target);
        document.getElementById('cancel-this-target').click();
        })
    }
    function truedisplayNone(field,text){
        let cancelButton = document.getElementById("cancel-this-target");
        const new_menu = document.createElement('div');
        new_menu.classList.add('drags');
        new_menu.classList.add('lazydev-new_menu');
        new_menu.setAttribute('title', field.name);
        new_menu.innerHTML = `<p>set ${field.name} for ${text}</p>`;
        cancelButton.parentElement.insertBefore(new_menu,cancelButton)
        new_menu.addEventListener('click', ()=>{
            // if(field.value == true){
            //     dynamic_target.setAttribute('data-display','none');
            // }
        dynamic_target.setAttribute('data-dynamic-content', `${field.name}`)
        dynamic_target.setAttribute('data-dynamic-content-type', 'truedisplayNone')
        propertiesEditor(dynamic_target);
        document.getElementById('cancel-this-target').click();
        })
    }
    function falsedisplayNone(field,text){
        let cancelButton = document.getElementById("cancel-this-target");
        const new_menu = document.createElement('div');
        new_menu.classList.add('drags');
        new_menu.classList.add('lazydev-new_menu');
        new_menu.setAttribute('title', field.name);
        new_menu.innerHTML = `<p>set ${field.name} for ${text}</p>`;
        cancelButton.parentElement.insertBefore(new_menu,cancelButton)
        new_menu.addEventListener('click', ()=>{
            // if(field.value == false){
            //     dynamic_target.setAttribute('data-display','none');
            // }
        dynamic_target.setAttribute('data-dynamic-content', `${field.name}`)
        dynamic_target.setAttribute('data-dynamic-content-type', 'falsedisplayNone')
        propertiesEditor(dynamic_target);
        document.getElementById('cancel-this-target').click();
        })
    }
    function noChange(text){
        let cancelButton = document.getElementById("cancel-this-target");
        const new_menu = document.createElement('div');
        new_menu.classList.add('drags');
        new_menu.classList.add('lazydev-new_menu');
        new_menu.innerHTML = `<p>${text}</p>`;
        cancelButton.parentElement.insertBefore(new_menu,cancelButton)
        new_menu.addEventListener('click', ()=>{
        document.getElementById('cancel-this-target').click();
        })
    }
}
function data_choosen_checkVal(field){
const data_field = data_choosen.content;
let value = field.name;
data_field.forEach(element => {
    if(element.name === field.name){
        if(element.value !== ''){
            value = element.value
        }
    }
});
return value
}
//==================================================//
export function check_dynamic_fetch(){
    const dynamic_containers = document.querySelectorAll('[data-dynamic]');
    dynamic_containers.forEach(element => {
        if(element.getAttribute('data-dynamic') == 'true'){
            set_dynamic_fetch(element)
        }
    });
}
function set_dynamic_fetch(target){
if(!target.hasAttribute('data-list')){
    return
}
let custom_query = target.getAttribute('data-saved-querry');
if(custom_query === null){
    custom_query = '[]'
}
const tabledID = target.getAttribute('data-dynamic-table');
const container_list = target.getAttribute('data-list');
let loadmore_element = 'const loadmore = ""';
if(target.hasAttribute('data-loadmore')){
    loadmore_element = `const loadmore = document.getElementById('${target.getAttribute('data-loadmore')}');`
}
const render_limit = target.getAttribute('data-render-limit');
const offset = target.getAttribute('data-offset-start');
const advance_querry = target.getAttribute('data-advance-querry');
//-----------------------//

function saveElementToObject(element) {
    const obj = {
        type: element.tagName.toLowerCase(),
        attributes: {}
    };

    // Simpan semua atribut elemen
    Array.from(element.attributes).forEach(attr => {
        obj.attributes[attr.name] = attr.value;
    });

    // Simpan innerHTML dan textContent jika ada
    if (element.innerHTML) {
        obj.innerHTML = element.innerHTML;
    } else if (element.textContent) {
        obj.textContent = element.textContent;
    }

    // Rekursif untuk children
    if (element.children.length > 0) {
        obj.children = Array.from(element.children).map(child => saveElementToObject(child));
    }

    return obj;
}

function createElementFromObject(obj) {
    console.log(contents)
    
    const element = document.createElement(obj.type);

    if (obj.attributes) {
        Object.keys(obj.attributes).forEach(attr => {
            element.setAttribute(attr, obj.attributes[attr]);
        });
    }

    element.innerHTML = obj.innerHTML;
    target.insertBefore(element,list);

    // Rekursif untuk children
    if (obj.children) {
        const dynamic = element.querySelectorAll('[data-dynamic-content-type]');
        dynamic.forEach(child => {
            const name = child.getAttribute('data-dynamic-content');
            const type = child.getAttribute('data-dynamic-content-type');
            let styleVal = '';
            if(name === 'title' && type === 'text'){
                child.innerHTML = contents.title;
            } else {
                const content = getcontents();
                console.log(content)
                if(type === 'text'){
                    child.innerHTML = content.value;
                } else if(type === 'changeBgSrc'){
                    child.setAttribute('src', content.value);
                } else if(type === 'href'){
                    child.setAttribute('href', content.value);
                }
                else if(type === 'onClick'){
                    child.setAttribute('href', content.value);
                }
                else if(type === 'changetitle'){
                    child.setAttribute('title', content.value);
                }
                else if(type === 'changeplaceholder'){
                    child.setAttribute('placeholder', content.value);
                }
                else if(type === 'changeval'){
                    child.setAttribute('value', content.value);
                }
                else if(type === 'changeBgImage'){
                    styleVal += `background: url('${content.value}');`
                }
                else if(type === 'changeBgColor'){
                    styleVal += `background-color: ${content.value};`
                }
                else if(type === 'changeBorderColor'){
                    styleVal += `border-color: ${content.value};`
                }
                else if(type === 'truedisplayNone'){
                    if(value == 'true'){
                        styleVal += `display: none;`
                    }
                }
                else if(type === 'falsedisplayNone'){
                    if(value != 'true'){
                        styleVal += `display: none;`
                    }
                }
                if(styleVal !== ''){
                    child.setAttribute('style', styleVal);
                }

                function getcontents(){
                    let elem = {};
                    contents.content.forEach(el => {
                        if(el.name === name){
                            elem = el;
                        }
                    });
                    return elem
                }
            }
            console.log(name+ " "+type)
        });
    }
}

const savedStructure = saveElementToObject(document.getElementById(container_list));
const jsonString = JSON.stringify(savedStructure);
const encodedString = btoa(jsonString);

const sub = "`";
let dataoffset = '${dataoffset}'
let renderLimit = '${renderLimit}';
let search = '';
if(target.hasAttribute('data-url-query')){
    search = '${searchQuery}'
}
let search_query = '';
if(target.hasAttribute('data-url-query')){
    search_query = `
let searchQuery = '';
        const search = window.location.search.substring(1).split('&');
        const dataSearch = [];
        let searchIndex = 1;
        search.forEach(element => {
            let field, value, condition;
            if (element.includes('!=')) {
                [field, value] = element.split('!=');
                condition = 'exclude';
            } else if (element.includes('=')) {
                [field, value] = element.split('=');
                condition = 'include';
            }
            
            const decodedValue = decodeURIComponent(value);
            const searchQuery = 
            {id:searchIndex,field:field,condition,value:decodedValue,}
            if(condition !== undefined){
                dataSearch.push(searchQuery)
            }
            searchIndex += 1;
        });
        if(dataSearch.length > 0){
            let stringsearch = JSON.stringify(dataSearch);
            searchQuery = '&searchquery='+stringsearch;
        }
`;
}
let orderset = '&orderQuery=CreatedAt Desc';
if(target.hasAttribute('data-order-query')){
    let orderget = target.getAttribute('data-order-query')
    orderset = `&orderQuery=${orderget}`;
}
const contentValue = '${content.value}'
let dollarOpen = '${';

const queryString = `?tableid=${tabledID}&filters=${custom_query}&Offset=${dataoffset}&renderlimit=${renderLimit}&${search}${orderset}`;
const url = `/public_api/get-custom-content${queryString}`;


  let functionfetch = `
  <script class="functionfetch">
  (() => {
    function createLoading(){
        const div = document.createElement('div');
        div.id = 'render-loading-container';
        div.classList.add('render-loading-container');
        div.innerHTML = ${sub}
        <i class="rotating-icon rotating-render fas fa-circle-notch"></i>
        <style>
         
    .render-loading-container {
    
    display: flex;
    width: 100%;
    min-height: 100px;
    gap: 1em;
    flex-grow: 1;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    flex-direction: row;
    overflow-x: hidden;
    padding-top: 5px;
    padding-right: 5px;
    padding-bottom: 5px;
    padding-left: 5px;
    transition: 0.2s;
    box-sizing: border-box;
    }
    
    
    
    .rotating-icon {
    
    opacity: 0.3;
    color: #008080;
    font-weight: Bold;
    font-size: 3vw !important;
    }
    
    
    .rotating-render {
     animation: rotate 2s linear infinite;
    }
    
    @keyframes rotate {
     from {
         transform: rotate(0deg);
     }
     to {
         transform: rotate(360deg);
     }
    }
        </style>
        ${sub};
        target.appendChild(div);
        return div;
    };
      const target = document.getElementById('${target.id}');
        const list = document.getElementById('${container_list}');
        ${loadmore_element}
        let renderLimit = ${render_limit};
        let dataoffset = ${offset};
        list.setAttribute('style', 'display: none;')
        const encodedString = 
        ${sub}${encodedString}${sub};
        const decodedString = atob(encodedString);
        const parsedObject = JSON.parse(decodedString);
        let contents = '';
    
        
      async function fetchData() {
        ${search_query}
        const queryString = ${sub}${queryString}${sub}
        const url = ${sub}${url}${sub}
        let loading = createLoading();
        if(loadmore){
            loadmore.style.display = 'none';
            loadmore.removeEventListener('click', fetchData);
        }
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Network response was not ok');
            loading.remove();
          }
          const data = await response.json();
          dataoffset = data.nextoffset;
          loading.remove();
          if(loadmore){
            loadmore.style.display = '';
            if(data.total > data.nextoffset){
                loadmore.addEventListener('click', fetchData);
            } else {
                loadmore.remove();
            }
        }
          data.data.forEach(data => {
            data.content = JSON.parse(data.content);
            contents = data;
            createElementFromObject(parsedObject)
          });
        } catch (error) {
          console.error('Fetch error:', error);
        }
      }
      function createElementFromObject(obj) {
        
        const element = document.createElement(obj.type);
    
        if (obj.attributes) {
            Object.keys(obj.attributes).forEach(attr => {
                element.setAttribute(attr, obj.attributes[attr]);
            });
        }
    
        element.innerHTML = obj.innerHTML;
        target.insertBefore(element,list);
    
        // Rekursif untuk children
        if (obj.children) {
            const dynamic = element.querySelectorAll('[data-dynamic-content-type]');
            dynamic.forEach(child => {
                const name = child.getAttribute('data-dynamic-content');
                const type = child.getAttribute('data-dynamic-content-type');
                let styleVal = '';
                if(name === 'title' && type === 'text'){
                    child.innerHTML = contents.title;
                }else if(name === 'url'){
                    child.setAttribute('href', contents.url);
                } else {
                    const content = getcontents();
                    if(type === 'text'){
                        child.innerHTML = content.value;
                    } else if(type === 'changeBgSrc'){
                        child.setAttribute('src', content.value);
                    } else if(type === 'href'){
                        child.setAttribute('href', content.value);
                    }
                    else if(type === 'onClick'){
                        child.addEventListener('click', ()=>{window.location.href=${sub}${contentValue}${sub}});
                    }
                    else if(type === 'changeFontColor'){
                        styleVal += ${sub}color: ${contentValue};${sub}
                    }
                    else if(type === 'changetitle'){
                        child.setAttribute('title', content.value);
                    }
                    else if(type === 'changeplaceholder'){
                        child.setAttribute('placeholder', content.value);
                    }
                    else if(type === 'changeval'){
                        child.setAttribute('value', content.value);
                    }
                    else if(type === 'changeBgImage'){
                        styleVal += ${sub}background: url('${contentValue}'); background-size: cover; ${sub}
                    }
                    else if(type === 'changeBgColor'){
                        styleVal += ${sub}background-color: ${contentValue};${sub}
                    }
                    else if(type === 'changeBorderColor'){
                        styleVal += ${sub}border-color: ${contentValue};${sub}
                    }
                    else if(type === 'truedisplayNone'){
                        if(content.value == true){
                            styleVal += ${sub}display: none;${sub}
                        }
                    }
                    else if(type === 'falsedisplayNone'){
                        if(content.value == false){
                            styleVal += ${sub}display: none !important;${sub}
                        }
                    }
                    if(styleVal !== ''){
                        child.setAttribute('style', styleVal);
                    }
    
                    function getcontents(){
                        let elem = {};
                        contents.content.forEach(el => {
                            if(el.name === name){
                                elem = el;
                            }
                        });
                        return elem
                    }
                }
            });
        }
    }
      fetchData();
})();
  </script>
  `;
  target.innerHTML += functionfetch;
//   const fetchScript = document.createElement('script');
//   fetchScript.classList.add('functionfetch');
//   fetchScript.innerHTML = functionfetch;
//   target.appendChild(fetchScript)
//-----------------------//

}
export function delete_functionfetchClass(){
    const CF = document.querySelectorAll('.functionfetch');
    CF.forEach(element => {
        element.remove();
    });
}
//==================================================//

