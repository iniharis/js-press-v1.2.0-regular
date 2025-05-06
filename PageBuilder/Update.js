// import fetch from 'node-fetch'; // Menggunakan node-fetch di lingkungan Node.js
// const fetch = require('node-fetch');

function updateComponentfromBuilder(user, id, content, folder, page){
  // Data yang akan Anda kirim dalam permintaan
  const dataToSend = {
    userID: user,
    componentID: id,
    componentContent: content,
    componentFolder: folder,
    componentpagesetting: page,
  }; 

  // Membuat objek opsi untuk permintaan PUT
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataToSend),
  };

  // URL endpoint untuk permintaan PUT
  const url = 'update-component';

  // Melakukan permintaan PUT dengan 'fetch'
  fetch(url, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // console.log('Respons dari server:', data);
    })
    .catch((error) => {
      console.error('Terjadi kesalahan saat mengirim permintaan:', error.message);
    });
}

export {updateComponentfromBuilder}

