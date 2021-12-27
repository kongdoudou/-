function curry(fn, ...arg1) {
    function inner (...args){
        return function(...arguments){
            let currentArg = [...args, ...arguments];
            return currentArg.length >= fn.length ? fn(...currentArg) : inner(...currentArg);
        }
    }
    return inner();
}


function sum(a,b,c) {
    return a+b+c
}

// let summary = curry(sum);
// console.log(summary(1,2,3));

let ary1 = [4,4,2,3];
let ary2 = [4,4,5];

let common = ary1.filter(item => ary2.indexOf(item) == -1);
let common2 = ary2.filter(item => ary1.indexOf(item) == -1);
console.log([...common, ...common2]);