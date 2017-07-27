export function objPropsToArr(obj){
    // реструктуризация
    var arr = [];
    for (var id in obj){
        arr.push(obj[id])
    }
    return arr;
}