import WebConfig from "../models/WebConfigModel.js";

export const get_webconfig_date_format = async()=>{
    let orderCriteria = [['createdAt', 'ASC']];
    try {
        const webConfig = await WebConfig.findOne({
            order: orderCriteria
        });
        return webConfig.date_format;
    } catch (error) {
        return
    }
}

export const get_date_format = (format,data)=>{
let formattedDate = '';
if(format === 'Short Date Format'){
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const date = new Date(data);

const day = date.getDate();
const month = months[date.getMonth()];
const year = date.getFullYear();

formattedDate = `${day}-${month}-${year}`;
}
if(format === 'Long Date Format'){
    const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const date = new Date(data);
    
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    formattedDate = `${month}-${day}-${year}`;
    }
if (format === 'ISO 8601') {
    const date = new Date(data);
    
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Tambahkan 1 karena bulan dimulai dari 0
    const year = date.getFullYear();
    
    formattedDate = `${year}-${month}-${day}`;
}
if (format === 'D-M-D-Y') {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    const date = new Date(data);
    const dayOfWeek = days[date.getDay()];
    const monthName = months[date.getMonth()];
    const dayOfMonth = date.getDate();
    const year = date.getFullYear();

    formattedDate = `${dayOfWeek} - ${monthName} ${dayOfMonth} ${year}`;
}

return formattedDate;
}