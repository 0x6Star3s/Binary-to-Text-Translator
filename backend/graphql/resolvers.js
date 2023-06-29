module.exports = {
    toBainery: ({text}, req) => {
      let binaryCode = ''
      for (let i = 0; i < text.length; i++) {
        const binaryFormat = text[i].charCodeAt(0).toString(2);
        binaryCode += binaryFormat.padStart(8, '0'); 
      }
      return {value: binaryCode};
    },
    formatBainery: ({value})=>{
      let text = '';
      for (let i = 0; i < value.length; i += 8) {
        const binaryChunk = value.substr(i, 8);
        const decimalValue = parseInt(binaryChunk, 2);
        const char = String.fromCharCode(decimalValue);
        text += char;
      }
      return {value: text}

    }
  }
  
