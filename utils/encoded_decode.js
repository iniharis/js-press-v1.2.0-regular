
export const decoded_function = (oldkeyword)=>{
    const newkeyword = encodingWORD(oldkeyword)
    // console.log("ini"+newkeyword)
    return newkeyword
        //-------------------------------//
        
}

export function encodingWORD(param){
    const keyword = param.split('')
    const keywordArray = [];

    for (let i = 0; i < keyword.length; i += 3) {
        const chunk = keyword.slice(i, i + 3).join('');
        keywordArray.push(chunk);
    }

    // console.log(keywordArray);
    
    let newArray = '';
    
    keywordArray.forEach(element => {
        let newElement = encodeChar(element);
        newArray+=newElement
    });
    // console.log("hasil"+newArray)
    return newArray
    }
    
    export const encoderArray = [
    { encode: '_fh', decode: '_' },
    { encode: 'bbw', decode: 'a' },
    { encode: 'ahf', decode: 'b' },
    { encode: 'xyz', decode: 'c' },
    { encode: 'ahc', decode: 'd' },
    { encode: 'ddf', decode: 'e' },
    { encode: 'ggi', decode: 'f' },
    { encode: 'pkj', decode: 'g' },
    { encode: 'moo', decode: 'h' },
    { encode: 'qqr', decode: 'i' },
    { encode: 'stx', decode: 'j' },
    { encode: 'vwx', decode: 'k' },
    { encode: 'yaz', decode: 'l' },
    { encode: '01e', decode: 'm' },
    { encode: '305', decode: 'n' },
    { encode: '679', decode: 'o' },
    { encode: '9bb', decode: 'p' },
    { encode: 'cdd', decode: 'q' },
    { encode: 'fgv', decode: 'r' },
    { encode: 'imk', decode: 's' },
    { encode: 'smn', decode: 't' },
    { encode: 'ops', decode: 'u' },
    { encode: 'rvt', decode: 'v' },
    { encode: 'uvw', decode: 'w' },
    { encode: 'vcc', decode: 'x' },
    { encode: 'abc', decode: 'y' },
    { encode: 'def', decode: 'z' },
    { encode: 'ghi', decode: '0' },
    { encode: 'jkl', decode: '1' },
    { encode: 'mno', decode: '2' },
    { encode: 'pqr', decode: '3' },
    { encode: 'stu', decode: '4' },
    { encode: 'xxx', decode: '5' },
    { encode: 'yxx', decode: '6' },
    { encode: '012', decode: '7' },
    { encode: '345', decode: '8' },
    { encode: '678', decode: '9' },
    ];
    function encodeChar(character){
        let decoded  = character;
        encoderArray.forEach(element => {
            if(element.encode === decoded){
              decoded = element.decode;
            }
        });
        // console.log(decoded)
        return decoded
    }

//--------------------------------------//
export function UniversalencodingWORD(keyword){
    const keywordArray = keyword.split('');
    const newArray = [];
    
    keywordArray.forEach((element) => {
        let newElement = UniversalencodeChar(element.toLowerCase());
        newArray.push(newElement);
    });
    let newkeyword = ''
    newArray.forEach(element => {
        newkeyword+=element
    });
    
    return newkeyword
    }
    
export function UniversalencodeChar(character){
        let encoded  = character;
        encoderArray.forEach(element => {
            if(element.decode === encoded){
                encoded = element.encode;
            }
        });
        return encoded
    }

export const EncryptURL = async (req,res)=>{
    const { keyword } = req.query;
    const URL = UniversalencodingWORD(keyword);
    res.json({ URL });
}
export const decryptURL = async (req,res)=>{
    const { keyword } = req.query;
    const parts = keyword.split("/");
    const lastPart = parts[parts.length - 1];
    const URL = encodingWORD(lastPart);
    res.json({ URL });  
}

//--------------------------------------//