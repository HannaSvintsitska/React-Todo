function getCorrectLetter (letter, num) {
    const letterCode = letter.charCodeAt(0);
    if ( letter >= 'a' && letter <= 'z' ) { 
        const firstCode = num >= 0 ? 'a'.charCodeAt(0): 'z'.charCodeAt(0);
        return String.fromCharCode(firstCode + (letterCode - firstCode + num) % 26)
    }
    if ( letter >= 'A' && letter <= 'Z' ) {
        const firstCode = num >= 0 ? 'A'.charCodeAt(0): 'Z'.charCodeAt(0);
        return String.fromCharCode(firstCode + (letterCode - firstCode + num) % 26)
    }
    return letter;
}

export function CaesarCipher( str, num ) { 
    let newStr = '';
    if( str == null ) {
        return str;
    }

    for( let i = 0; i < str.length; i++ ) {
        newStr += getCorrectLetter(str[i], num)
    }

    return newStr;
}


// keep this function call here
// console.log(CaesarCipher());
