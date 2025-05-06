//--------------------------------------------------------------//
let custom_table_name;
let custom_table_type;
let custom_table_field;
let table_ID;
let data_title = '';
let data_url = null;
let data_id = 'new';
const field_set_content = [];
const myFolders = [];
const title_input = document.getElementById('js-cd-title-input');
const url_input = document.getElementById('js-cd-url-input');
const legend = document.getElementById('js-custom-data-list-legend');
//--------------------------------------------------------------//
document.addEventListener("DOMContentLoaded", async function() {
    title_input.addEventListener('input', ()=>{
        data_title = title_input.value;
    })
    getFolders('',0)
    const url = window.location.href.split('/');
    if(!url[5] || url[5] == ''){
        window.location.href = '/admin/post'
    } 
    else {
        try {
            const response = await fetch(`/api/adm/get-custom-data?table_id=${url[5]}&data_id=${url[6]}`);
            if (!response.ok) {
                const data = await response.json();
                throw new Error(`Failed Get Custom Table ${data.msg}`);
            }
            const data = await response.json();
            const custom_table = data.custom_table;
            custom_table_field = JSON.parse(custom_table.custom_fields);
            custom_table_name = custom_table.name;
            let data_content = data.data;
            if(data.data !== 'new-data'){
                // console.log(data.data)
                const content = JSON.parse(data_content.content);
                data_content = content;
                data_title = data_content.title;
                title_input.value = data.data.title;
                data_id = data.data.id;
                if(custom_table.type === 'custom_post'){
                    data_url = data.data.url;
                    if(custom_table.dynamic_page !== null){
                        document.getElementById('Add-custom-table').classList.remove('none-mode');
                        document.getElementById('Add-custom-table').addEventListener('click',()=>{
                            const url = `${data.data.urlPage}`;
                            window.open(url, '_blank'); 
                        })
                    }
                    url_input.value = data.data.url;
                }
                legend.textContent = `Edit ${custom_table_name}`
                document.title = `Edit ${custom_table_name}`
            } else {
                document.getElementById('Add-custom-table').remove();
                legend.textContent = `New ${custom_table_name}`
                document.title = `New ${custom_table_name}`
            }
            if(custom_table.type === 'custom_post'){
                url_input.addEventListener('input',()=>{
                    let urlValue = url_input.value;
                    urlValue = urlValue.trim().replace(/[^a-zA-Z0-9-_\/]/g, '');
                    urlValue = urlValue.replace('/','')
                    if (urlValue.charAt(0) === '/') {
                urlValue = urlValue.slice(1);
                 } else {
                urlValue = urlValue.replace(/^\/+/g, '');
                }
                url_input.value = urlValue;
                    data_url = url_input.value;
                })
            } else {
                url_input.remove();
                data_url = null;
                document.getElementById('js-cd-url-label').remove();
            }
            table_ID = custom_table.id;
            custom_table_type = custom_table.type;
            const custom_fields = JSON.parse(custom_table.custom_fields);
            // console.log(data)
            // console.log(custom_fields)
            custom_fields.forEach(element => {
                createInput(element,data_content)
            });
            // console.log(field_set_content)
            document.getElementById('js-cd-save-button').addEventListener('click', ()=>{
                let checkdata = true;
                let checkText = ''
                field_set_content.forEach(content => {
                    custom_table_field.forEach(field => {
                    if(field.name === content.name && content.value === ''){
                        checkText += `${field.name} is required(*)`;
                        checkdata = false;
                    }
                });
            });
            if(checkdata === false){
                        const popup = document.createElement('section')
                        popup.id = 'js-container-popup';
                        popup.classList.add('js-container-popup');
                        popup.innerHTML = `
                <div id="js-wrapper-popup" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
                    <p id="js-popup-text" class="js-popup-text" lazydev="18e5af308c51">
                    ${checkText}
                    </p>
                    
                    </div>`;
                    document.body.appendChild(popup);
                    setTimeout(() => {
                        deletePopup()
                    }, 2000);
                    return
            } else {
                save_data();
            }
            })
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
async function getFolders(keyword,offset) {
    try {
        const response = await fetch(`/api/adm/get-folder?keyword=${keyword}&dataoffset=${offset}`);
        
        if (!response.ok) {
            throw new Error('Gagal mengambil data folder');
        }

        const data = await response.json();
        data.components.forEach(folder => {
            myFolders.push(folder)
        });
        // console.log(myFolders)
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
    }
}
//--------------------------------------------------------------//
function createInput(fields,data){
const field_type = fields.type;
const field_name = fields.name;
const dataSet = match_DataContent(field_name,data);
const div_button = document.getElementById('js-cd-save-div');
const label = create_label(fields.label,div_button);
// console.log(dataSet)
let input;
    switch (field_type) {
        case 'Text':
            input = document.createElement('input');
            input.setAttribute('type','text');
            input.classList.add('js-cd-text-input');
            if(fields.mandatory === true){
                input.setAttribute('required','true')
                label.textContent = `${label.textContent} (*required)`
            }
            if(dataSet.value !== ''){
                input.value = dataSet.value;
            }else {
                input.value = fields.value;
                dataSet.value = fields.value;
            }
            div_button.parentElement.insertBefore(input,div_button)
            input.addEventListener('input',()=>{
                dataSet.value = input.value
            })
            break;
        case 'Number':
            input = document.createElement('input');
            input.setAttribute('type','number');
            input.setAttribute('min',fields.min)
            input.setAttribute('max',fields.max)
            input.classList.add('js-cd-number-input');
            if(fields.mandatory === true){
                input.setAttribute('required','true')
                label.textContent = `${label.textContent} (*required)`
            }
            if(dataSet.value !== ''){
                input.value = dataSet.value;
            } else {
                input.value = fields.value;
                dataSet.value = fields.value;
            }
            div_button.parentElement.insertBefore(input,div_button)
            input.addEventListener('input',()=>{
                if(input.value < fields.min){
                    input.value =  fields.min
                }
                if(input.value > fields.max){
                    input.value =  fields.max
                }
                dataSet.value = input.value
            })
            break;
        case 'Email':
            input = document.createElement('input');
            input.setAttribute('type','email');
            input.classList.add('js-cd-email-input');
            if(fields.mandatory === true){
                input.setAttribute('required','true')
                label.textContent = `${label.textContent} (*required)`
            }
            if(dataSet.value !== ''){
                input.value = dataSet.value;
            }else {
                input.value = fields.value;
                dataSet.value = fields.value;
            }
            div_button.parentElement.insertBefore(input,div_button)
            input.addEventListener('input',()=>{
                dataSet.value = input.value
            })
            break;
        case 'Select':
            input = document.createElement('select');
            input.classList.add('js-cd-select-input');
            div_button.parentElement.insertBefore(input,div_button)
            fields.options.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt.value;
            option.textContent = opt.text;
            input.appendChild(option)
            });
            if(dataSet.value !== ''){
                input.value = dataSet.value;
            } else {
                dataSet.value = input.value;
            }
            input.addEventListener('input',()=>{
                dataSet.value = input.value
            })
            break;
        case 'Password':
            input = document.createElement('input');
            input.setAttribute('type','password');
            input.classList.add('js-cd-password-input');
            if(fields.mandatory === true){
                input.setAttribute('required','true')
                label.textContent = `${label.textContent} (*required)`
            }
            if(dataSet.value !== ''){
                input.value = dataSet.value;
            }else {
                input.value = fields.value;
                dataSet.value = fields.value;
            }
            div_button.parentElement.insertBefore(input,div_button)
            input.addEventListener('input',()=>{
                dataSet.value = input.value
            })
            break;
        case 'Checkbox':
            input = document.createElement('div');
            input.classList.add('js-cd-checkbox-div');
            input.innerHTML = `
            <input type="checkbox" id="${fields.name}-input" class="js-cd-checkbox-input">
            ${label.outerHTML}`;
            div_button.parentElement.insertBefore(input,div_button);
            const checkbox = document.getElementById(`${fields.name}-input`);
            if(dataSet.value !== ''){
                checkbox.checked = dataSet.value;
            } else {
                dataSet.value = checkbox.checked;
            }
            label.remove();
            checkbox.addEventListener('change',()=>{
                dataSet.value = checkbox.checked
            })
            break;
        case 'Media':
            input = document.createElement('button');
            input.classList.add('js-cd-media-button');
            input.setAttribute('element_id','media-file-upload-src-img');
            input.innerHTML = `<icon class="fas fa-images" style="padding-right: 1em;"></icon>Open Media Manager`;
            div_button.parentElement.insertBefore(input,div_button);
            const element_media = media_dataset(dataSet,input);
            if(fields.mandatory === true){
                dataSet.mandatory = true;
            }
            input.addEventListener('click',(event)=>{
                event.preventDefault();
                mediaUpload(element_media,dataSet,input)
            })
            break;
        case 'Textarea':
            input = document.createElement('textarea');
            input.classList.add('js-cd-textarea-input');
            if(fields.mandatory === true){
                input.setAttribute('required','true')
                label.textContent = `${label.textContent} (*required)`
            }
            if(dataSet.value !== ''){
                input.value = dataSet.value;
            }else {
                input.value = fields.value;
                dataSet.value = fields.value;
            }
            div_button.parentElement.insertBefore(input,div_button)
            input.addEventListener('input',()=>{
                dataSet.value = input.value
            })
            break;
        case 'Color':
            input = document.createElement('input');
            input.setAttribute('type','color');
            input.classList.add('js-cd-color-input');
            if(fields.mandatory === true){
                input.setAttribute('required','true')
                label.textContent = `${label.textContent} (*required)`
            }
            if(dataSet.value !== ''){
                input.value = dataSet.value;
            }else {
                input.value = fields.value;
                dataSet.value = fields.value;
            }
            div_button.parentElement.insertBefore(input,div_button)
            input.addEventListener('input',()=>{
                dataSet.value = input.value
            })
            break;
        case 'WYSIWYG':
            input = document.createElement('textarea');
            input.id = field_name;
            input.classList.add('js-cd-textarea-input');
            if(fields.mandatory === true){
                input.setAttribute('required','true')
                label.textContent = `${label.textContent} (*required)`
            }
            if(dataSet.value !== ''){
                input.value = dataSet.value;
            }else {
                input.value = fields.value;
            }
            div_button.parentElement.insertBefore(input,div_button);
            let targetValue = dataSet.value;
            sceditor.create(input, {
                format: 'xhtml',
                  plugins: 'undo',
                toolbar: `bold,italic,underline,left,center,right,justify,image,horizontalrule,size,link,unlink,maximize`,
                  height: "100%",
                  id: "headerText-id",
                  toolbarContainer: document.getElementById('#js-toolbar-comment'),
                style: 'https://cdn.jsdelivr.net/npm/sceditor@3/minified/themes/content/default.min.css'
            });
            sceditor.instance(input).val(targetValue);
            const body = sceditor.instance(input).getBody();
            body.addEventListener('input', ()=>{
                let value_data = sceditor.instance(input).val()
                dataSet.value = value_data
            })
            break;
        default:
            // Jika nilai tidak valid, keluar dari fungsi
            return;
    }
    field_set_content.push(dataSet)
}
//--------------------------------------------------------------//
function media_dataset(dataSet,input){
const oldElement = document.getElementById(dataSet.name)
if(oldElement){
    oldElement.remove();
}
if(dataSet.value !== ''){
    const img = document.createElement('img');
    img.id = dataSet.name;
    img.classList.add('js-cd-img-preview');
    img.setAttribute('src', dataSet.value);
    img.setAttribute('data_media', 'true');
    input.parentElement.insertBefore(img,input);
    return img
} else {
    return 'no-data'
}

}
function mediaUpload(element,dataset,input){
    const old_container = document.getElementById('js-press-media-fixed-container');
    if(old_container){
      old_container.remove();
    }
    const container = document.createElement('section');
    container.classList.add('js-press-media-fixed-container');
    container.id = 'js-press-media-fixed-container';
    container.innerHTML = `
    <div id="js-press-media-wrapper" class="js-press-media-wrapper fadeInSlideUp">
    <div id="js-press-media-head" class="js-press-media-head">
      <button id="upload-media" class="lazyclass18ee0b5e9f51" type="button">
        <icon id="icon-18ee0b5e9f51" class="fa fa-upload" style="padding-right: 1em;"></icon>
        Upload
      </button>
      <select id="select-media-folder" value="all-folder" class="SELECT-18ee08c432e1" selectoption="{,All Folder,selected}">
        <option value="all-folder">All Folder</option>
      </select>
      <input type="search" id="search-media-keyword" class="INPUT-18ee08c4f1d1" placeholder="keyword">
      <div id="js-press-media-close-button" class="DIV-18ee08c647c1" title="Close">
        <i class="fa fa-close"></i>
      </div>
    </div>
    <div id="js-press-media-body" class="js-press-media-body">
      <div id="js-press-upload-div" class="js-press-upload-div none-mode">
        <input type="file" id="upload-media-js" class="INPUT-18ee0bb19ef1">
        <div id="close-upload-head" class="close-upload-head">X</div>
        <label id="label-18ee0bcf7871" class="LABEL-18ee0bcf7871" for="" accesskey="">
          Media Name :
        </label>
        <input type="text" id="js-media-name" readonly="true" class="INPUT-18ee0bb7a571">
        <label id="lazyid18ee0bf8fb61" class="lazyclass18ee0bf8fb61" for="" accesskey="">
          Media Extension :
        </label>
        <input type="text" id="js-media-ext" readonly="true" class="lazyclass18ee0bf63d61">
        <label id="lazyid18ee0bf463e1" class="lazyclass18ee0bf463e1" for="" accesskey="">
          Media Folder :
        </label>
        <select id="select-upload-folder" class="lazyclass18ee0c030d61">
        </select>
        <div id="js-upload-error" class="js-upload-error"></div>
        <button id="upload-media-to-server" class="lazyclass18ee0c42b461" type="button">
          <icon id="icon-18ee0c42b461" class="fa fa-upload" style="padding-right: 1em;"></icon>
          Upload Media
        </button>
      </div>
      <div id="loadmore-div" class="lazyclass18dd05f375d1 none-mode">
        <button id="loadmore-button" class="lazyclass18dd05f375a1" type="button">
          <icon id="icon-18dd05f375a1" class="fas fa-circle-notch" style="padding-right: 1em;"></icon>
          Loadmore
        </button>
      </div>
      <div id="loading-icon" class="DIV-18ee0c7e3f61">
        <i class="fas fa-circle-notch js-press-cb-media-loading-rotating"></i>
      </div>
      <div id="error-div" class="lazyclass18ee0cf845f1 none-mode">
        Error : Something gone wrong
      </div>
    </div>
  </div>
  `;
    document.body.appendChild(container);
    // document.getElementById('close-menu').addEventListener('click', ()=>{
    //   if(container){
    //     container.remove();
    //   }
    // })
    const wrapper = document.getElementById('js-press-media-wrapper');
    // dragTheElement(container);
    //------------------------------------------//
    let offset = 0;
    let total_data = 0
    const upload_js = document.getElementById('upload-media-js');
    const nameInput = document.getElementById('js-media-name');
    const extentionInput = document.getElementById('js-media-ext');
    const select_folder_media = document.getElementById('select-upload-folder');
    upload_js.addEventListener('change', (event)=>{
      const reader = new FileReader();
        const file = event.target.files[0]; // Mengambil file yang dipilih oleh pengguna
        const fileName = file.name;
        const fileNameParts = fileName.split('.'); 
        const modifiedValue = fileNameParts[0].replace(/ /g, '_');
        const fileExtension = fileName.split('.').pop();
        reader.onload = function(event) {
            dataMedia = event.target.result;
            nameInput.removeAttribute('readonly');
            nameInput.value = modifiedValue;
            extentionInput.removeAttribute('readonly');
            extentionInput.value = fileExtension;      
            // siteFaviconPreview.src = dataURLFavicon;
        };
        reader.readAsDataURL(file);
    });
    const searchinput = document.getElementById('search-media-keyword');
    const selectfolder = document.getElementById('select-media-folder');
    const media_body = document.getElementById('js-press-media-body');
    const loadmore_div = document.getElementById('loadmore-div');
    const loadmore = document.getElementById('loadmore-button');
    const loading_icon = document.getElementById('loading-icon');
    const upload_head = document.getElementById('upload-media');
    const upload_div = document.getElementById('js-press-upload-div');
    const close_upload_head = document.getElementById('close-upload-head');
    const error_upload = document.getElementById('js-upload-error');
    let dataMedia = '';
    nameInput.addEventListener('input', ()=>{
      const modifiedValue = nameInput.value.replace(/ /g, '_');
      nameInput.value = modifiedValue;
  })
    loadmore.addEventListener('click',()=>{
      if(total_data > offset){
        const img = document.querySelectorAll('.img-18ee09852ae1');
        img.forEach(image => {
          image.classList.add('none-mode')
        });
        loadmore_div.classList.add('none-mode')
        getData();
      }
    });
    upload_head.addEventListener('click', ()=>{
      upload_div.classList.remove('none-mode')
    })
    close_upload_head.addEventListener('click',()=>{
      upload_div.classList.add('none-mode')
    })
    getData();
    setTimeout(() => {
      wrapper.classList.remove('fadeInSlideUp');
    }, 500);
    //------------------------------------------//
    myFolders.forEach(folder => {
      const option = document.createElement('option');
      option.id = 'media-folder-'+folder.folder_key;
      option.setAttribute('value', folder.folder_key);
      option.textContent = folder.folder_name;
      selectfolder.appendChild(option)
    });
    myFolders.forEach(folder => {
      const option = document.createElement('option');
      option.id = 'media-folder-'+folder.folder_key;
      option.setAttribute('value', folder.folder_key);
      option.textContent = folder.folder_name;
      select_folder_media.appendChild(option)
    });
    //------------------------------------------//
    const closebutton = document.getElementById('js-press-media-close-button');
    closebutton.addEventListener('click',()=>{
      wrapper.classList.add('fadeOutSlideDown');
      setTimeout(() => {
        container.remove();
      }, 500);
    })
    const upload_to_server = document.getElementById('upload-media-to-server');
    upload_to_server.addEventListener('click', upload_new_media)
    //------------------------------------------//
    async function getData() {
      const folder = selectfolder.value;
      const keyword = searchinput.value;
      loading_icon.classList.remove('none-mode');
      try {
          // Mengirim permintaan GET ke endpoint server
          const response = await fetch(`/api/adm/get-media?keyword=${keyword}&dataoffset=${offset}&searchFolder=${folder}`);
          
          // Memeriksa apakah permintaan berhasil (status 200 OK)
          if (!response.ok) {
              throw new Error('something went wrong');
          }
          
          const data = await response.json();
          const img = document.querySelectorAll('.img-18ee09852ae1');
              img.forEach(image => {
                image.classList.remove('none-mode')
              });
          total_data = data.totalCount;
          offset = data.newOffset;
          loading_icon.classList.add('none-mode');
          imgList(data.components)
          if(data.newOffset < data.totalCount){
            loadmore_div.classList.remove('none-mode')
          }
          // console.log(data)
  
      } catch (error) {
        const error_div = document.getElementById('error-div');
        error_div.classList.remove('none-mode');
        error_div.innerHTML = `${error}`;
          console.error('Error:', error);
      }
  } 
  function imgList(data_){
    const urlRoot = window.location.origin;
    data_.forEach(data => {
      const img = document.createElement('img');
      img.classList.add('img-18ee09852ae1');
      img.setAttribute('src', `${urlRoot}/`+data.media_url);
      if (loadmore_div && loadmore_div.parentElement) {
        loadmore_div.parentElement.insertBefore(img, loadmore_div);
        img.addEventListener('click',()=>{
            dataset.value = `${urlRoot}/`+data.media_url;
            if(element === 'no-data'){
                let new_element = media_dataset(dataset,input)
                element = new_element;
            } else {
                element.setAttribute('src', `${urlRoot}/`+data.media_url)
            }
        })
      } else {
        console.error('something went wrong');
      }
  });
  }
  async function upload_new_media(){
    error_upload.innerHTML = "";
    if(dataMedia === ''){
      error_upload.innerHTML = `<p>Error No Image Data</p>`
      return
  }
  const dataPush = {
      name: nameInput.value,
      extention: extentionInput.value,
      dataImage: dataMedia,
      folder: select_folder_media.value,
  };
  loading_icon.classList.remove('none-mode');
  upload_div.classList.add('none-mode')
  loadmore_div.setAttribute('class', 'lazyclass18dd05f375d1 none-mode');
  const img = document.querySelectorAll('.img-18ee09852ae1');
              img.forEach(image => {
                image.classList.add('none-mode')
              });
  // console.log(dataPush)
   try {
              const response = await fetch('/api/adm/new-media', {
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
              loading_icon.classList.add('none-mode');
              // window.location.reload();
              mediaUpload(element,dataset)
              // Lakukan tindakan lanjutan jika diperlukan setelah data berhasil disimpan
          } catch (error) {
            loading_icon.classList.remove('none-mode');
            upload_div.classList.remove('none-mode')
            error_upload.innerHTML = `<p>${error}</p>`
          }
  }
  
  }
//--------------------------------------------------------------//
function match_DataContent(field_name,data){
    let data_target;
    if(data !== 'new-data'){
        data_target = {name : field_name, value: ''};
        data.forEach(element => {
            if(element.name === field_name){
                data_target = element
            }
        });
        return data_target
    } else {
        const set = {name : field_name, value: ''}
        return set
    }
}
function create_label (data_label,div){
    const label = document.createElement('label');
    label.classList.add('js-cd-title-label');
    label.textContent = `${data_label} :`;
    div.parentElement.insertBefore(label,div)
    return label
}
//--------------------------------------------------------------//
async function save_data(){
const content = JSON.stringify(field_set_content);
const popup = document.createElement('section')
popup.id = 'js-container-popup';
popup.classList.add('js-container-popup');
if(custom_table_type === 'custom_post' && data_url === null){
    popup.innerHTML = `
    <div id="js-wrapper-popup" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
        <p id="js-popup-text" class="js-popup-text" lazydev="18e5af308c51">
        URL input cannot be blanked
        </p>
        
        </div>`;
    document.body.appendChild(popup);
    setTimeout(() => {
        deletePopup()
    }, 2000);
    return
}
if(data_title === ''){
    popup.innerHTML = `
    <div id="js-wrapper-popup" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
        <p id="js-popup-text" class="js-popup-text" lazydev="18e5af308c51">
        Title cannot be blanked
        </p>
        
        </div>`;
    document.body.appendChild(popup);
    setTimeout(() => {
        deletePopup()
    }, 2000);
    return
}
const dataPush = {
    input_table : table_ID, 
    input_title: data_title, 
    input_url : data_url, 
    input_content: content,
    input_ID : data_id}
// console.log(dataPush)
popup.innerHTML = `
    <div id="js-wrapper-popup" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
        <p id="js-popup-text" class="js-popup-text" lazydev="18e5af308c51">
        Please wait....
        </p>
        
        </div>`;
document.body.appendChild(popup);
try {
    const response = await fetch('/api/adm/create-data', {
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
        const json = await response.json();
        window.location.href = `/admin/custom-data-form${json.msg}`;
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
//--------------------------------------------------------------//
function deletePopup(){
    const div = document.getElementById('js-wrapper-popup');
    div.setAttribute('class', 'js-wrapper-popup animated-scale-down')
    const popup = document.getElementById('js-container-popup');
    setTimeout(() => {
        popup.remove();
    }, 200);
}
//--------------------------------------------------------------//