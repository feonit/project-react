var checkSnils = function (checkedValue,fieldName){
    var checkSum = parseInt(checkedValue.slice(9),10);

    //строка как массив(для старых браузеров)
    checkedValue = "" + checkedValue;
    checkedValue = checkedValue.split('');

    var sum = (checkedValue[0]*9 + checkedValue[1]*8 + checkedValue[2]*7 + checkedValue[3]*6 + checkedValue[4]*5 + checkedValue[5]*4 + checkedValue[6]*3 + checkedValue[7]*2 + checkedValue[8]*1);

    if(sum < 100 && sum == checkSum){
        return true;
    }else if((sum == 100 || sum == 101) && checkSum == 0){
        return true;
    }else if(sum > 101 && (sum%101 == checkSum || (sum%101 == 100 && checkSum == 0))){
        return true;
    }else{
        return false;
    }
}

var generateString11 = function (){return (parseInt(Math.random()*Math.pow(10,11), 10)+'')}

var getRandomSnils = function (){
    var i = 0, gen, check = false; while(!check){
        gen = generateString11();
        check = checkSnils(gen);
        i++;
    }
    return gen;
}

export default getRandomSnils