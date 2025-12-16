function findPrefix(strs) {
    if (strs.length == 0) return "";
    
    let shortestWord = strs[0];
    for (let i = 1; i < strs.length; i++) {
        if (strs[i].length < shortestWord.length) {
            shortestWord = strs[i];
        }
    }
    
    for (let i = shortestWord.length; i >= 2; i--) {
        let prefix = shortestWord.substring(shortestWord.length - i);
        let isCommon = true;
        
        for (let j = 0; j < strs.length; j++) {
            if (!strs[j].endsWith(prefix)) {
                isCommon = false;
                break;
            }
        }
        
        if (isCommon) {
            return prefix;
        }
    }
    return "";
}

strs = ["цветок","поток","хлопок"]
const result = findPrefix(strs);
console.log(result)

strs = ["собака","гоночная машина","машина"]
const result2 = findPrefix(strs);
console.log(result2)