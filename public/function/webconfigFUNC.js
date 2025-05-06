

document.addEventListener("DOMContentLoaded", async function() {
    try {
        const response = await fetch('/api/adm/web-config');
        if (!response.ok) {
            throw new Error('Gagal mengambil data web config');
        }
        const data = await response.json();
        WebConfigProcess(data.webConfig)
        // Misalnya, tampilkan data di halaman web
        // document.getElementById('web-config').innerText = JSON.stringify(data);
    } catch (error) {
        console.error('Ada kesalahan:', error);
        // window.location.href ='/login'
        // Tindakan yang sesuai jika terjadi kesalahan, misalnya menampilkan pesan kesalahan ke pengguna
    }
});
//=====================//
let dataIndexCss = 1;
let dataIndexJS = 1;
const WebConfigProcess = async(data)=>{
    // console.log(data);
    webConfigCSS(data.css_framework)
    webConfigJS(data.js_framework)
    const siteTitleInput = document.getElementById('js-press-config-input-title');
    const siteDescInput = document.getElementById('js-press-config-input-desc');
    const siteFaviconInput = document.getElementById('js-press-config-input-favicon');
    const siteLogoInput = document.getElementById('js-press-config-input-logo');
    const siteDateFormatInput = document.getElementById('js-press-config-input-date-format');
    const fontawesomeCDNinput = document.getElementById('js-press-config-input-font_awesome');
    const savebutton = document.getElementById('js-press-config-save-button');

    const siteFaviconPreview = document.getElementById('js-press-admin-config-image-img-favicon');
    const siteLogoPrev = document.getElementById('js-press-admin-config-image-img-logo');

    siteFaviconPreview.src = data.site_favicon;
    siteLogoPrev.src = data.site_logo;
    siteTitleInput.value = data.site_title;
    siteDescInput.value = data.site_description;
    siteDateFormatInput.value = data.date_format;
    fontawesomeCDNinput.value = data.font_awesome_cdn;

    // Webmail //
    const smtp_host = document.getElementById('js-press-config-smtp-host');
    const smtp_port = document.getElementById('js-press-config-smtp-port');
    const smtp_secure = document.getElementById('js-press-config-input-smtp-secure');
    const smtp_username = document.getElementById('js-press-config-smtp-username');
    const smtp_pass = document.getElementById('js-press-config-smtp-password');
    const mail_receiver = document.getElementById('js-press-config-mail-receiver');
    const save_smtp_config = document.getElementById('js-press-smtp-save-button');
    
    if(data.smtp_host !== null){
        smtp_host.value = data.mail_SMTP_HOST;
    }
    if(data.mail_SMTP_PORT !== null){
        smtp_port.value = data.mail_SMTP_PORT;
    }
    if(data.mail_SMTP_SECURE !== null){
        smtp_secure.value = data.mail_SMTP_SECURE;
    }
    if(data.mail_user !== null){
        smtp_username.value = data.mail_user;
    }
    if(data.mail_pass !== null){
        smtp_pass.value = data.mail_pass;
    }
    if(data.mail_receiver !== null){
        mail_receiver.value = data.mail_receiver;
    }

    //-------------------------//
    let dataURLFavicon = '';
    siteFaviconInput.addEventListener('change', (event) => {
        const reader = new FileReader();
        const file = event.target.files[0]; // Mengambil file yang dipilih oleh pengguna
        reader.onload = function(event) {
            dataURLFavicon = event.target.result;
            siteFaviconPreview.src = dataURLFavicon;
        };
        reader.readAsDataURL(file); // Membaca file sebagai data URL
    });
    let dataURLLogo = '';
    siteLogoInput.addEventListener('change', (event) => {
        const reader = new FileReader();
        const file = event.target.files[0]; // Mengambil file yang dipilih oleh pengguna
        reader.onload = function(event) {
            dataURLLogo = event.target.result;
            siteLogoPrev.src = dataURLLogo;
        };
        reader.readAsDataURL(file); // Membaca file sebagai data URL
    });
    savebutton.addEventListener('click', async () => {
        const dataPush = {
            update_title: siteTitleInput.value,
            update_desc: siteDescInput.value,
            update_favicon: dataURLFavicon,
            update_logo: dataURLLogo,
            update_date: siteDateFormatInput.value,
            update_fontawesome : fontawesomeCDNinput.value
        };
    
        try {
            const response = await fetch('/api/adm/web-config', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataPush)
            });
    
            if (!response.ok) {
                throw new Error('Failed Saving File');
            }
    
            window.location.reload();
            // console.log( await response.json())
    
            // Lakukan tindakan lanjutan jika diperlukan setelah data berhasil disimpan
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
            // Tindakan yang sesuai jika terjadi kesalahan, misalnya menampilkan pesan kesalahan ke pengguna
        }
    });
    save_smtp_config.addEventListener('click', async () => {
        const popup = document.createElement('section');
        popup.id = 'js-container-popup';
        popup.classList.add('js-container-popup');
        popup.innerHTML = `
        <div id="js-wrapper-popup" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
            <p id="js-popup-text" class="js-popup-text" lazydev="18e5af308c51">
            Saving SMTP Configuration, Please Wait...
            </p>  
            </div>`;
        document.body.appendChild(popup);

        const dataPush = {
            host: smtp_host.value,
            port: smtp_port.value,
            smtp_secure: smtp_secure.value,
            username : smtp_username.value,
            password : smtp_pass.value,
            mailReceiver : mail_receiver.value,
        };
    
        try {
            const response = await fetch('/api/adm/smtp-config', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataPush)
            });
    
            if (!response.ok) {
                const data = await response.json();
                throw new Error(`${data.message}`);
            }
    
            const data = await response.json();
            popup.innerHTML = `
            <div id="js-wrapper-popup" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
                <p id="js-popup-text" class="js-popup-text" lazydev="18e5af308c51">
                ${data.message}
                </p>  
                </div>`;
                setTimeout(() => {
                    deletePopup(); 
                }, 1000);
        } catch (error) {
            popup.innerHTML = `
        <div id="js-wrapper-popup" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
        <p id="js-popup-text" class="js-popup-text" lazydev="18e5af308c51">
        ${error}
        </p>
  
        <div id="button-box-wrapper" class="button-box-wrapper" lazydev="18e5af3d95b1">
  
        <button id="js-popup-button-false" class="js-popup-button-false" lazydev="18e5af87d291" type="button">
        <icon id="icon-18e5af87d291" class="fa fa-ban" style="padding-right: 1em;">
        
        </icon>
  
        Close
        </button>
  
        
        </div>
  
        
        </div>`;
        const cancelw = document.getElementById('js-popup-button-false'); 
        cancelw.addEventListener('click', (event) => {
        event.preventDefault();
        deletePopup();
    });   
  }
    });
    // Google Fonts
    const googleFontsTextarea = document.getElementById('js-google-fonts');

    // const googleFonts = data.google_fonts.split(',');
    const googleFonts = data.google_fonts;
    googleFontsTextarea.value = googleFonts;
    const saveFontsbutton = document.getElementById('js-press-font-save-button');
    saveFontsbutton.addEventListener('click', async ()=> {
        const popup = document.createElement('section');
        popup.id = 'js-container-popup';
        popup.classList.add('js-container-popup');
        popup.innerHTML = `
        <div id="js-wrapper-popup" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
            <p id="js-popup-text" class="js-popup-text" lazydev="18e5af308c51">
            Saving Google Fonts, Please Wait...
            </p>  
            </div>`;
        document.body.appendChild(popup);
        const newValue = document.getElementById('js-google-fonts');
        const dataPush = {
            update_google_font: newValue.value,
        };
        try {
            const response = await fetch('/api/adm/google-fonts', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataPush)
            });
    
            if (!response.ok) {
                throw new Error('Failed Saving File');
            }
    
            // window.location.reload();
            const data = await response.json();
            popup.innerHTML = `
            <div id="js-wrapper-popup" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
                <p id="js-popup-text" class="js-popup-text" lazydev="18e5af308c51">
                ${data.msg}
                </p>  
                </div>`;
                setTimeout(() => {
                    deletePopup(); 
                }, 1000);
        } catch (error) {
            popup.innerHTML = `
        <div id="js-wrapper-popup" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
        <p id="js-popup-text" class="js-popup-text" lazydev="18e5af308c51">
        ${error}
        </p>
  
        <div id="button-box-wrapper" class="button-box-wrapper" lazydev="18e5af3d95b1">
  
        <button id="js-popup-button-false" class="js-popup-button-false" lazydev="18e5af87d291" type="button">
        <icon id="icon-18e5af87d291" class="fa fa-ban" style="padding-right: 1em;">
        
        </icon>
  
        Close
        </button>
  
        
        </div>
  
        
        </div>`;
        const cancelw = document.getElementById('js-popup-button-false'); 
        cancelw.addEventListener('click', (event) => {
        event.preventDefault();
        deletePopup();
    });   
  }
})
    webConfigSelect();
}

const webConfigCSS = (dataString)=>{
const data = JSON.parse(dataString);
// console.log(data)
const container = document.getElementById('css-framework-list-container');
    data.forEach(element => {
        createDataFramework(element)
    });
    const addbutton = document.getElementById('js-press-css-add-button');
    addbutton.addEventListener('click', ()=>{
        const data ={name : 'New Css', value:'',rawLink:""}
        createDataFramework(data);
    })
    const savebutton = document.getElementById('js-press-css-save-button');
    savebutton.addEventListener('click',()=>{
    const allcss = document.querySelectorAll('.js-container-list-css');
    const dataCSSFramework = [];
    allcss.forEach(element => {
        const dataIndex = element.getAttribute('index');
        const namevalue = document.getElementById(`js-container-list-input-name-${dataIndex}`);
        const Valvalue = document.getElementById(`js-container-list-input-value-${dataIndex}`);
        const linkvalue = document.getElementById(`js-container-list-input-link-${dataIndex}`);
        if(Valvalue.value === ''){
            element.remove();
            return
        }
        const dataPush = {
            name: namevalue.value,
            value: Valvalue.value,
            rawLink: linkvalue.value
        }
        dataCSSFramework.forEach(link => {
            if(link.value === dataPush.value){
            element.remove();
            return
            }
        });
        dataCSSFramework.push(dataPush)
    });
    const frameworkString = JSON.stringify(dataCSSFramework);
    const dataPush = {
        update_css : frameworkString
    }
    Pushdata(dataPush,'/api/adm/web-css')
    })
function createDataFramework(element){
    let jsIndex = `${dataIndexCss}-css`;
    const div = document.createElement('div');
    div.classList.add('js-container-list');
    div.classList.add('js-container-list-css');
    div.id = `css-container-list-${jsIndex}`;
    div.setAttribute('index',jsIndex)
    div.innerHTML = `
    <h4 id="js-framework-title-${jsIndex}" class="js-framework-title" lazydev="18ea7d720261">
                        
                      ${element.name}
                  
                        </h4>
                  
                        <div id="js-framework-config-list-${jsIndex}" class="js-framework-config-list" lazydev="18ea7df47401">
                        Show Framework
                  <i id="js-open-framework-button-${jsIndex}" class="fa fa-chevron-down">
                        
                        </i>
                  
                        
                        </div>
                  
                        <div id="js-container-list-content-${jsIndex}" data-hide="true" class="js-container-list-content none-mode" lazydev="18ea7e432471">
                            <button id="delete-framework-button-${jsIndex}" class="delete-framework-button" lazydev="18ea8087cf61" type="button">
                                <icon id="icon-18ea8087cf61" class="fa-solid fa-trash-can" style="padding-right: 1em;">
                                
                                </icon>
                          
                                Delete Framework
                                </button>
                        <label id="js-container-list-label" class="js-container-list-label" lazydev="18ea7e5bcb11" for="" accesskey="">
                        Css Framework name :
                        </label>
                  
                        <input type="text" value="${element.name}" id="js-container-list-input-name-${jsIndex}" class="js-container-list-input-text js-css-name-input" lazydev="18ea7e657af1">
                        <label id="lazyid18ea7e6cc1e1" class="lazyclass18ea7e6cc1e1 js-container-list-label" lazydev="18ea7e6cc1e1" for="" accesskey="">
                        Css Framework Value :
                        </label>
                  
                        <input type="text" value="${element.value}" id="js-container-list-input-value-${jsIndex}" class="js-container-list-input-text js-css-name-value" lazydev="18ea7e882fd1">
                        <label id="lazyid18ea7e9b5fd1" class="lazyclass18ea7e9b5fd1 js-container-list-label" lazydev="18ea7e9b5fd1" for="" accesskey="">
                        Css Framework Links :
                        </label>
                  
                        <input type="text" value="${element.rawLink}" id="js-container-list-input-link-${jsIndex}" class="lazyclass18ea800593e1 js-container-list-input-text js-css-link-input" lazydev="18ea800593e1" placeholder="Only 1 link allowed">
                        
                        </div>
                    `;
    container.appendChild(div);
    const showbutton = document.getElementById(`js-framework-config-list-${jsIndex}`);
    showbutton.addEventListener('click',()=>{
    const DataFramework = document.getElementById(`js-container-list-content-${jsIndex}`);
    const hide = DataFramework.getAttribute('data-hide');
    if(hide === 'true'){
        DataFramework.setAttribute('data-hide', 'false');
        DataFramework.classList.remove('none-mode')
        showbutton.innerHTML = `Hide Framework
        <i id="js-open-framework-button-${jsIndex}" class="fa fa-chevron-up">
              
              </i>`
    } else {
        DataFramework.setAttribute('data-hide', 'true');
        DataFramework.classList.add('none-mode')
        showbutton.innerHTML = `Show Framework
        <i id="js-open-framework-button-${jsIndex}" class="fa fa-chevron-down">
              
              </i>`
    }
    })
    const deletebutton = document.getElementById(`delete-framework-button-${jsIndex}`);
    deletebutton.addEventListener('click', ()=>{
        div.remove();
    })
    const nameinput = document.getElementById(`js-container-list-input-name-${jsIndex}`);
    nameinput.addEventListener('input',()=>{
        const newVal = replaceName(nameinput.value);
        nameinput.value = newVal;
        document.getElementById(`js-framework-title-${jsIndex}`).textContent = newVal;
    })
    const valueinput = document.getElementById(`js-container-list-input-value-${jsIndex}`);
    valueinput.addEventListener('input', ()=>{
        const newVal = replaceValue(valueinput.value);
        valueinput.value = newVal;
    })
    const linkinput = document.getElementById(`js-container-list-input-link-${jsIndex}`);
    linkinput.addEventListener('input', ()=>{
        const newVal = replacelink(linkinput.value);
        linkinput.value = newVal;
    })
    dataIndexCss += 1;
}
// console.log(dataJSON)

}
const webConfigJS = (dataString)=>{
    const data = JSON.parse(dataString);
    // console.log(data)
    const container = document.getElementById('js-framework-list-container');
    data.forEach(element => {
        createDataFramework(element)
    });
    const addbutton = document.getElementById('js-press-js-add-button');
    addbutton.addEventListener('click', ()=>{
        const data ={name : 'New Library', value:'',link:""}
        createDataFramework(data);
    })
    const savebutton = document.getElementById('js-press-js-save-button');
    savebutton.addEventListener('click',async()=>{
    const allcss = document.querySelectorAll('.js-container-list-js');
    const dataCSSFramework = [];
    allcss.forEach(element => {
        const dataIndex = element.getAttribute('index');
        const namevalue = document.getElementById(`js-container-list-input-name-${dataIndex}`);
        const Valvalue = document.getElementById(`js-container-list-input-value-${dataIndex}`);
        const linkvalue = document.getElementById(`js-framework-link-textarea-${dataIndex}`);
        if(Valvalue.value === ''){
            element.remove();
            return
        }
        const dataPush = {
            name: namevalue.value,
            value: Valvalue.value,
            link: linkvalue.value
        }
        dataCSSFramework.forEach(link => {
            if(link.value === dataPush.value){
            element.remove();
            return
            }
        });
        dataCSSFramework.push(dataPush)
    });
    const frameworkString = JSON.stringify(dataCSSFramework);
    const dataPush = {
        update_js : frameworkString
    }
    Pushdata(dataPush,'/api/adm/web-js')
    })
    function createDataFramework(element){
        let jsIndex = `${dataIndexJS}-js`;
        const div = document.createElement('div');
        div.classList.add('js-container-list');
        div.classList.add('js-container-list-js');
        div.id = `js-container-list-${jsIndex}`;
        div.setAttribute('index',jsIndex)
        div.innerHTML = `
        <h4 id="js-framework-title-${jsIndex}" class="js-framework-title" lazydev="18ea7d720261">
                        
                      ${element.name}
                  
                        </h4>
                  
                        <div id="js-framework-config-list-${jsIndex}" class="js-framework-config-list" lazydev="18ea7df47401">
                        Show Library
                  <i id="js-open-framework-button-${jsIndex}" class="fa fa-chevron-down">
                        
                        </i>
                  
                        
                        </div>
                  
                        <div id="js-container-list-content-${jsIndex}" data-hide="true" class="js-container-list-content none-mode" lazydev="18ea7e432471">
                            <button id="delete-framework-button-${jsIndex}" class="delete-framework-button" lazydev="18ea8087cf61" type="button">
                                <icon class="fa-solid fa-trash-can" style="padding-right: 1em;">
                                
                                </icon>
                          
                                Delete Framework
                                </button>
                        <label class="js-container-list-label">
                        Js Framework name :
                        </label>
                  
                        <input type="text" value="${element.name}" id="js-container-list-input-name-${jsIndex}" class="js-container-list-input-text">
                        <label class="js-container-list-label">
                        Js Framework Value :
                        </label>
                  
                        <input type="text" value="${element.value}" id="js-container-list-input-value-${jsIndex}" class="lazyclass18ea7e882fd1 js-container-list-input-text" lazydev="18ea7e882fd1">
                        <label class="js-container-list-label" lazydev="18ea7e9b5fd1">
                        Js Framework Links :
                        </label>
                  
                        <textarea id="js-framework-link-textarea-${jsIndex}" class="js-framework-link-textarea" rows="4" placeholder="separate by comma (,)">${element.link}</textarea>
                  
                        
                        </div>
                        `;
        container.appendChild(div);
        const showbutton = document.getElementById(`js-framework-config-list-${jsIndex}`);
        showbutton.addEventListener('click',()=>{
        const DataFramework = document.getElementById(`js-container-list-content-${jsIndex}`);
        const hide = DataFramework.getAttribute('data-hide');
        if(hide === 'true'){
            DataFramework.setAttribute('data-hide', 'false');
            DataFramework.classList.remove('none-mode')
            showbutton.innerHTML = `Hide Library
            <i id="js-open-framework-button-${jsIndex}" class="fa fa-chevron-up">
                  
                  </i>`
        } else {
            DataFramework.setAttribute('data-hide', 'true');
            DataFramework.classList.add('none-mode')
            showbutton.innerHTML = `Show Library
            <i id="js-open-framework-button-${jsIndex}" class="fa fa-chevron-down">
                  
                  </i>`
        }
        })
        const deletebutton = document.getElementById(`delete-framework-button-${jsIndex}`);
        deletebutton.addEventListener('click', ()=>{
            div.remove();
        })
        const nameinput = document.getElementById(`js-container-list-input-name-${jsIndex}`);
        nameinput.addEventListener('input',()=>{
            const newVal = replaceName(nameinput.value);
            nameinput.value = newVal;
            document.getElementById(`js-framework-title-${jsIndex}`).textContent = newVal;
        })
        const valueinput = document.getElementById(`js-container-list-input-value-${jsIndex}`);
        valueinput.addEventListener('input', ()=>{
            const newVal = replaceValue(valueinput.value);
            valueinput.value = newVal;
        })
        const linkinput = document.getElementById(`js-framework-link-textarea-${jsIndex}`);
        linkinput.addEventListener('input', ()=>{
            const newVal = replacelink(linkinput.value);
            linkinput.value = newVal;
        })
        dataIndexJS += 1;
    }
    }
//=====================//
function webConfigSelect(){
    const select = document.getElementById('web-config-select');
    select.addEventListener('input',()=>{
        const fieldsets = document.querySelectorAll('.js-press-web-configuration-fieldset');
        fieldsets.forEach(element => {
            element.classList.add('none-mode')
        });

        const selected = select.value;
        document.getElementById(`${selected}`).classList.remove('none-mode');
    })
}
function deletePopup(){
    const div = document.getElementById('js-wrapper-popup');
    div.setAttribute('class', 'js-wrapper-popup animated-scale-down')
    const popup = document.getElementById('js-container-popup');
    setTimeout(() => {
        popup.remove();
    }, 200);
}
async function Pushdata(dataPush,api){
    const popup = document.createElement('section');
    popup.id = 'js-container-popup';
    popup.classList.add('js-container-popup');
    popup.innerHTML = `
    <div id="js-wrapper-popup" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
        <p id="js-popup-text" class="js-popup-text" lazydev="18e5af308c51">
        Saving Google Fonts, Please Wait...
        </p>  
        </div>`;
    document.body.appendChild(popup);
    try {
        const response = await fetch(`${api}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataPush)
        });

        if (!response.ok) {
            throw new Error('Failed Saving File');
        }

        // window.location.reload();
        const data = await response.json();
        popup.innerHTML = `
        <div id="js-wrapper-popup" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
            <p id="js-popup-text" class="js-popup-text" lazydev="18e5af308c51">
            ${data.msg}
            </p>  
            </div>`;
            setTimeout(() => {
                deletePopup(); 
            }, 1000);
    } catch (error) {
        popup.innerHTML = `
    <div id="js-wrapper-popup" class="js-wrapper-popup js-popup-enterance-2" lazydev="18e517138541">
    <p id="js-popup-text" class="js-popup-text" lazydev="18e5af308c51">
    ${error}
    </p>

    <div id="button-box-wrapper" class="button-box-wrapper" lazydev="18e5af3d95b1">

    <button id="js-popup-button-false" class="js-popup-button-false" lazydev="18e5af87d291" type="button">
    <icon id="icon-18e5af87d291" class="fa fa-ban" style="padding-right: 1em;">
    
    </icon>

    Close
    </button>

    
    </div>

    
    </div>`;
    const cancelw = document.getElementById('js-popup-button-false'); 
    cancelw.addEventListener('click', (event) => {
    event.preventDefault();
    deletePopup();
}); 
}
}
function replaceName(string){
    let newString = string.replace(/,/g, '');
    if(newString === ''){
        newString = "Framework/Library Name"
    }
    return newString
}
function replacelink(string) {
    let newString = string.replace(/\s/g, '');
    return newString;
}
function replaceValue(string){
    let newString = string.replace(/[^a-zA-Z0-9]/g, '');
    return newString;
}
//=====================//