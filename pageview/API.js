
export const getPSbyEncode = async (keyword) => {
    try {
      const response = await fetch(`/api/adm/get-one-ps-encode?encoded=${keyword}`);
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const getdata = data.page_setting;
      // console.log(getdata)
      return getdata;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Re-throw the error to handle it in the calling code
    }
  };
  
  export const getcomponentbyEncode = async (keyword) => {
    try {
      const response = await fetch(`/api/adm/component-view?encoded=${keyword}`);
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Re-throw the error to handle it in the calling code
    }
  };