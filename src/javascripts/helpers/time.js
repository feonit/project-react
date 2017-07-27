export function subzero(num){
    return (''+num).length == 1 ? '0'+num : num;
}

export function reverseDate(str, devider){
    devider = devider || '-'
    return str.split('-').reverse().join(devider)
}