function generateUniqueRandomLetters() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let uniqueLetters = '';
  
    while (uniqueLetters.length < 3) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      const randomLetter = alphabet[randomIndex];
  
      if (!uniqueLetters.includes(randomLetter)) {
        uniqueLetters += randomLetter;
      }
    }
  
    return uniqueLetters;
  }

  export const getHexa = (id,dateorNumber,String)=>{
    const var1 = id;
    const var2 = generateUniqueRandomLetters();
    const var3 = dateorNumber.toString(16);
    const var4 = String;

    const result = var4 + var3 + var2 + var1;
    return result;

    
  }
  export const getHexaverA = (id,dateorNumber,String)=>{
    const var1 = id;
    const var2 = generateUniqueRandomLetters();
    const var3 = dateorNumber.toString(16);
    const var4 = String;

    const result = var4 + var3 + var1 + var2;
    return result;

    
  }
  export const getHexa2 = (dateorNumber)=>{
    const thisDate = Date.now();
    const var1 = generateUniqueRandomLetters();
    const var2 = thisDate.toString(16);

    const result = var1 + var2;
    return result;

    
  }